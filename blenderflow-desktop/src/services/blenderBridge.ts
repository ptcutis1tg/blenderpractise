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

export const BLENDER_EXE_PATH = 'C:\\Program Files\\Blender Foundation\\Blender 5.3\\blender.exe';
export const STARTER_BLEND_PATH = 'C:\\Users\\Admin\\Desktop\\CODE\\blenderflow-desktop\\starter_assets\\challenge_04_chair_starter.blend';

export class BlenderBridgeService {
  static getStarterBlendPath(blendFileName?: string): string {
    return STARTER_BLEND_PATH;
  }

  static async launchBlender(filePath?: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/launch-blender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: filePath || STARTER_BLEND_PATH }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return { success: true, message: data.message || 'Blender 5.3 launched successfully!' };
      }
      return { success: false, message: data.error || 'Failed to start Blender process.' };
    } catch (err: any) {
      console.warn('[BlenderBridge] Direct API call error, using fallback launcher:', err);
      return {
        success: false,
        message: 'Could not connect to Vite dev server API. Please run "open_starter_in_blender.bat" or restart "npm run dev".',
      };
    }
  }

  static async fetchTelemetry(): Promise<MeshTelemetry | null> {
    try {
      const response = await fetch('/api/mesh-telemetry');
      if (response.ok) {
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
    const hasBevel = (telemetry.modifiers || []).some(m => m.toLowerCase().includes('bevel'));

    const suggestions: string[] = [];

    // Calculate score based on real Blender mesh
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

    // If Blender is not connected or telemetry file is not found
    return {
      tested: true,
      passed: false,
      score: 0,
      isLiveBlender: false,
      message: 'CHƯA NHẬN ĐƯỢC DỮ LIỆU TỪ BLENDER 5.3! Vui lòng khởi chạy Blender và bấm "Sync Mesh to BlenderFlow" trong Addon.',
      metrics: {
        expectedVertices,
        actualVertices: 0,
        expectedQuads: expectedFaces,
        actualQuads: 0,
        ngons: 0,
      },
      suggestions: [
        '1. Bấm nút màu cam "Launch & Work in Blender 5.3" ở trên để mở file challenge.',
        '2. Trong Blender, bấm phím N ở 3D Viewport để mở thanh công cụ bên phải.',
        '3. Chọn tab "BlenderFlow" và bấm nút "Sync Mesh to BlenderFlow".',
        '4. Sau khi đồng bộ thành công, quay lại đây bấm nút "Kiểm tra & Chấm điểm Topology" để nhận kết quả chấm điểm thật 100%!',
      ],
    };
  }
}
