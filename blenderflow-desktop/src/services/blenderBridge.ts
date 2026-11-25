export interface MeshTelemetry {
  object_name?: string;
  objectName?: string;
  vertices: number;
  faces: number;
  quads: number;
  triangles: number;
  ngons: number;
  modifiers: string[];
  is_all_quads?: boolean;
  isAllQuads?: boolean;
  quad_percentage?: number;
}

export interface VerificationResult {
  tested: boolean;
  passed: boolean;
  score: number;
  message: string;
  isLiveBlender?: boolean;
  metrics: {
    expectedVertices: number;
    actualVertices: number;
    expectedQuads: number;
    actualQuads: number;
    ngons: number;
  };
  suggestions: string[];
}

export interface BridgeStatus {
  serverAvailable: boolean;
  isWebMode: boolean;
  blenderInstalled: boolean;
  blenderPath?: string;
  starterAssetExists: boolean;
  telemetryAvailable: boolean;
  lanUrl: string;
}

export const BLENDER_EXE_PATH = 'C:\\Program Files\\Blender Foundation\\Blender 5.3\\blender.exe';
export const STARTER_BLEND_PATH = 'starter_assets/challenge_04_chair_starter.blend';

export class BlenderBridgeService {
  static getStarterBlendPath(blendFileName?: string): string {
    if (!blendFileName) return STARTER_BLEND_PATH;
    return blendFileName;
  }

  /**
   * Checks whether local Vite Blender Bridge middleware is active and Blender is installed
   */
  static async checkBridgeStatus(): Promise<BridgeStatus> {
    try {
      const res = await fetch('/api/bridge-status');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        return {
          serverAvailable: Boolean(data.serverAvailable),
          isWebMode: false,
          blenderInstalled: Boolean(data.blenderInstalled),
          blenderPath: data.blenderPath,
          starterAssetExists: Boolean(data.starterAssetExists),
          telemetryAvailable: Boolean(data.telemetryAvailable),
          lanUrl: data.lanUrl || window.location.origin,
        };
      }
    } catch {
      // Static web / GitHub Pages / disconnected
    }

    return {
      serverAvailable: false,
      isWebMode: true,
      blenderInstalled: false,
      starterAssetExists: false,
      telemetryAvailable: false,
      lanUrl: typeof window !== 'undefined' ? window.location.origin : '',
    };
  }

  static async launchBlender(filePath?: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/launch-blender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: filePath || STARTER_BLEND_PATH }),
      });
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        return {
          success: false,
          message: 'Tính năng mở trực tiếp Blender 5.3 chỉ hoạt động khi chạy ứng dụng trên máy tính cá nhân qua Vite Local Server.',
        };
      }
      const data = await response.json();
      if (response.ok && data.success) {
        return { success: true, message: data.message || 'Blender 5.3 launched successfully!' };
      }
      return { success: false, message: data.error || 'Failed to start Blender process.' };
    } catch (err: any) {
      console.warn('[BlenderBridge] Direct API call error, using fallback launcher:', err);
      return {
        success: false,
        message: 'Không kết nối được tới Local Bridge Server. Hãy chạy "start_blenderflow_desktop.bat" trên PC có cài Blender.',
      };
    }
  }

  static async fetchTelemetry(): Promise<MeshTelemetry | null> {
    try {
      const response = await fetch('/api/mesh-telemetry');
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.success && data.telemetry) {
          return data.telemetry as MeshTelemetry;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Evaluates live mesh topology strictly received from Blender 5.3 Addon
   */
  static verifyLiveMeshTopology(
    telemetry: MeshTelemetry,
    expectedVertices = 148,
    expectedFaces = 136
  ): VerificationResult {
    const actualVerts = telemetry.vertices || 0;
    const actualQuads = telemetry.quads || 0;
    const ngons = telemetry.ngons || 0;
    const isAllQuads = telemetry.is_all_quads || (ngons === 0 && (telemetry.triangles || 0) === 0);
    const hasBevel = (telemetry.modifiers || []).some((m) => m.toLowerCase().includes('bevel'));

    const suggestions: string[] = [];

    let score = 0;
    if (isAllQuads) {
      score += 50;
      suggestions.push('✓ Chuẩn Quad 100%: Lưới không chứa bất kỳ N-gon hoặc Triangle nào.');
    } else {
      score += Math.max(0, 50 - ngons * 15);
      suggestions.push(`⚠️ Phát hiện ${ngons} mặt N-gons! Hãy dùng phím K (Knife) hoặc J (Join) để chia về Quad 4 đỉnh.`);
    }

    if (actualVerts >= expectedVertices * 0.85 && actualVerts <= expectedVertices * 1.3) {
      score += 30;
      suggestions.push(`✓ Mật độ đỉnh tối ưu: Đạt ${actualVerts} vertices (kỳ vọng ~${expectedVertices}).`);
    } else {
      score += 15;
      suggestions.push(`ℹ️ Mật độ đỉnh hiện tại: ${actualVerts} verts so với tiêu chuẩn ${expectedVertices}.`);
    }

    if (hasBevel) {
      score += 20;
      suggestions.push('✓ Đã áp dụng Bevel Modifier chuẩn xác để làm mềm cạnh.');
    } else {
      suggestions.push('⚠️ Thiếu Bevel Modifier: Cạnh sắc chưa được vát nhẹ để bắt sáng.');
    }

    const passed = score >= 80;

    return {
      tested: true,
      passed,
      score,
      isLiveBlender: true,
      message: passed
        ? `KIỂM ĐỊNH LƯỚI BLENDER 5.3 THÀNH CÔNG (${score}/100 điểm)! Lưới "${telemetry.object_name || 'Active Mesh'}" đạt chuẩn Quad Topology.`
        : `KIỂM ĐỊNH LƯỚI BLENDER 5.3 CHƯA ĐẠT (${score}/100 điểm): Cần chỉnh sửa thêm theo góp ý bên dưới.`,
      metrics: {
        expectedVertices,
        actualVertices: actualVerts,
        expectedQuads: expectedFaces,
        actualQuads,
        ngons,
      },
      suggestions,
    };
  }

  /**
   * Strict verification: Requires Blender 5.3 Addon live sync as per user decision (Q2. B)
   */
  static async verifyTopologyStrict(
    taskId: string,
    completedSteps: number,
    totalSteps: number,
    expectedVertices = 148,
    expectedFaces = 136
  ): Promise<VerificationResult> {
    const liveTelemetry = await this.fetchTelemetry();

    if (liveTelemetry) {
      return this.verifyLiveMeshTopology(liveTelemetry, expectedVertices, expectedFaces);
    }

    return {
      tested: true,
      passed: false,
      score: 0,
      isLiveBlender: false,
      message: 'CHƯA NHẬN ĐƯỢC DỮ LIỆU TỪ BLENDER 5.3! Vui lòng khởi chạy Blender và bấm "Sync Topology to App" trong Addon.',
      metrics: {
        expectedVertices,
        actualVertices: 0,
        expectedQuads: expectedFaces,
        actualQuads: 0,
        ngons: 0,
      },
      suggestions: [
        '1. Bấm nút màu cam "Launch & Work in Blender 5.3" ở trên để mở file challenge trên PC.',
        '2. Trong Blender, bấm phím N ở 3D Viewport để mở thanh công cụ bên phải.',
        '3. Chọn tab "BlenderFlow" và bấm nút "Sync Topology to App".',
        '4. Sau khi đồng bộ thành công, quay lại đây bấm nút "Validate Active Mesh" để nhận kết quả chấm điểm thật 100%!',
      ],
    };
  }
}
