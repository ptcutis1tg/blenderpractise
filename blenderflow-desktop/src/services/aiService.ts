import { Roadmap } from '../types';

export interface AIConfig {
  provider: 'gemini' | 'ollama' | 'offline_local';
  apiKey: string;
  model: string;
  ollamaEndpoint: string;
  ollamaModel?: string;
}

const DEFAULT_AI_CONFIG: AIConfig = {
  provider: 'offline_local',
  apiKey: '',
  model: 'gemini-1.5-flash',
  ollamaEndpoint: 'http://localhost:11434',
  ollamaModel: 'llama3',
};

const AI_CONFIG_KEY = 'blenderflow_ai_config_v1';

// Rich offline Blender 5.3 Knowledge Base for 100% offline support
const OFFLINE_KNOWLEDGE_BASE: Record<string, string> = {
  normals: `### 🛠️ Flipped Normals (Face Orientation Error)
**Triệu chứng:** Mặt lưới bị tối đen bất thường, modifier Solidify hoặc Subdivision Surface bị lồi lõm ngược hướng.
**Cách khắc phục trong Blender 5.3:**
1. Vào **Edit Mode** (\`Tab\`), chọn toàn bộ mặt lưới bằng phím **\`A\`**.
2. Nhấn tổ hợp phím **\`Alt + N\`** để mở menu Normals.
3. Chọn **\`Recalculate Outside\`** (Phím tắt: **\`Shift + N\`**).
4. *Kiểm tra:* Bật overlay **Face Orientation** ở menu Viewport Overlays (mặt màu Xanh dương là đúng, màu Đỏ là bị lật).`,

  ngons: `### 🛠️ N-gons to Quads Conversion
**Nguyên tắc:** N-gon là mặt đa giác có trên 4 đỉnh. N-gon gây lỗi biến dạng khi uốn cong (Deformation) và lỗi bóng (Shading Artifacts) khi dùng Subdivision.
**Cách xử lý về Quads:**
1. **Dùng dao cắt (Knife Tool):** Bấm **\`K\`**, click nối từ đỉnh này sang đỉnh đối diện để chia N-gon thành các mặt 4 đỉnh (Quads). Bấm **\`Space\`** hoặc **\`Enter\`** để chốt đường cắt.
2. **Nối 2 đỉnh:** Chọn 2 đỉnh đối diện và bấm **\`J\`** (Connect Vertex Path).
3. **Triangulate rồi gộp:** Chọn mặt N-gon bấm **\`Ctrl + T\`** (chia thành tam giác), sau đó bấm **\`Alt + J\`** (Tris to Quads) để Blender tự động gộp thành mặt 4 cạnh.`,

  bevel: `### 🛠️ Bevel Bị Méo / Dẹt / Không Đều (Bevel Scale Distortion)
**Nguyên tắc:** Khi bạn Scale đối tượng ở Object Mode mà chưa áp dụng Transform, kích thước tỷ lệ (Scale) sẽ bị lệch (ví dụ X: 1.0, Y: 2.5, Z: 0.3) khiến cạnh vát Bevel bị dẹt hình oval.
**Cách khắc phục:**
1. Trở về **Object Mode** (\`Tab\`).
2. Chọn vật thể và nhấn **\`Ctrl + A\`** (Apply Menu).
3. Chọn **\`Apply All Transforms\`** (hoặc chỉ chọn **\`Rotation & Scale\`**).
4. Quay lại Edit Mode, Bevel sẽ tròn đều góc 45 độ chuẩn xác!`,

  doubles: `### 🛠️ Trùng Đỉnh / Hở Cạnh (Double Vertices & Non-manifold)
**Triệu chứng:** Khi Extrude (\`E\`) rồi bấm chuột phải hủy, các đỉnh mới vẫn bị tạo chồng lên đỉnh cũ, gây lỗi kéo mặt và shading đen.
**Cách khắc phục:**
1. Vào **Edit Mode**, bấm **\`A\`** để chọn toàn bộ lưới.
2. Bấm phím **\`M\`** (Merge Menu).
3. Chọn **\`By Distance\`** (Mặc định ngưỡng khoảng cách 0.0001m).
4. Blender sẽ thông báo ở thanh đáy: *"Removed X vertices"*.`,

  loopcut: `### 🛠️ Vòng Cắt (Loop Cut - Ctrl + R) Bị Dừng Lại Giữa Chừng
**Nguyên tắc:** Lệnh Loop Cut (\`Ctrl + R\`) chỉ có thể chạy xuyên qua các mặt Đa giác 4 đỉnh (Quads). Nếu gặp tam giác (Triangle), N-gon hoặc điểm tụ (Pole có >= 5 cạnh), vòng cắt sẽ bị ngắt lập tức.
**Cách sửa:**
- Kiểm tra lại các mặt lưới tại vị trí bị ngắt để loại bỏ tam giác hoặc chuyển hướng Edge Flow.`,

  boolean: `### 🛠️ Lỗi Rách Lưới Khi Dùng Boolean Modifier
**Giải pháp chuẩn:**
1. Đổi Solver từ **\`Fast\`** sang **\`Exact\`** trong bảng thuộc tính Boolean.
2. Thêm **\`Bevel Modifier\`** sau Boolean với Limit Method đặt là **\`Weight\`** hoặc **\`Angle (30°)\`**.
3. Thêm **\`Weighted Normal Modifier\`** ở cuối danh sách modifier và tích chọn **\`Keep Sharp\`** để khử toàn bộ lỗi bóng méo.`,
};

export class AIService {
  static getConfig(): AIConfig {
    const raw = localStorage.getItem(AI_CONFIG_KEY);
    if (!raw) return DEFAULT_AI_CONFIG;
    try {
      return { ...DEFAULT_AI_CONFIG, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_AI_CONFIG;
    }
  }

  static saveConfig(config: AIConfig): void {
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
  }

  private static resolveOfflineAnswer(query: string): string {
    const qLower = query.toLowerCase();
    if (qLower.includes('normal') || qLower.includes('lật mặt') || qLower.includes('đen mặt')) {
      return OFFLINE_KNOWLEDGE_BASE.normals;
    }
    if (qLower.includes('ngon') || qLower.includes('n-gon') || qLower.includes('quad') || qLower.includes('4 đỉnh')) {
      return OFFLINE_KNOWLEDGE_BASE.ngons;
    }
    if (qLower.includes('bevel') || qLower.includes('vát') || qLower.includes('dẹt') || qLower.includes('méo') || qLower.includes('scale')) {
      return OFFLINE_KNOWLEDGE_BASE.bevel;
    }
    if (qLower.includes('trùng') || qLower.includes('double') || qLower.includes('dính đỉnh') || qLower.includes('merge')) {
      return OFFLINE_KNOWLEDGE_BASE.doubles;
    }
    if (qLower.includes('loop cut') || qLower.includes('ctrl r') || qLower.includes('vòng cắt')) {
      return OFFLINE_KNOWLEDGE_BASE.loopcut;
    }
    if (qLower.includes('boolean') || qLower.includes('đục lỗ') || qLower.includes('rách lưới')) {
      return OFFLINE_KNOWLEDGE_BASE.boolean;
    }

    return `### 💡 Khuyến Nghị Kỹ Thuật 3D Blender 5.3 (Offline Assistant)
Về câu hỏi: *"${query}"*

**Quy tắc vàng khi dựng hình Hard-Surface:**
1. **Luôn kiểm tra Scale:** Trước khi vát cạnh hoặc thêm modifier, hãy bấm \`Ctrl + A\` -> *Apply All Transforms*.
2. **Khử trùng đỉnh:** Bấm \`A\` -> \`M\` -> *By Distance* định kỳ để tránh vertex rác.
3. **Chuẩn hóa Quads:** Giữ tỷ lệ Quads 100% để bề mặt phản chiếu ánh sáng mượt mà dưới shader PBR.
4. **Shading:** Sử dụng kết hợp *Shade Auto Smooth* và *Weighted Normal Modifier*.

*(Để nhận câu trả lời AI mở rộng không giới hạn, bạn có thể nhập Gemini API Key hoặc kết nối Local Ollama trong mục Settings).*`;
  }

  /**
   * AI 3D Topology Doctor: Supports Gemini API, Local Ollama, and Offline Knowledge Base
   */
  static async diagnoseIssue(query: string): Promise<string> {
    const config = this.getConfig();

    const prompt = `You are an elite 3D Blender 5.3 Hard-Surface & Topology Engineer.
The user is asking for troubleshooting help: "${query}".
Answer concisely in clear Vietnamese with Markdown formatting.
Provide exact Blender 5.3 keyboard shortcuts, step-by-step resolution, and quad topology principles.`;

    // 1. Online Gemini Provider
    if (config.provider === 'gemini' && config.apiKey) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        }
      } catch (err) {
        console.warn('[AIService] Gemini API call failed, falling back to offline KB:', err);
      }
    }

    // 2. Local Ollama Provider
    if (config.provider === 'ollama' && config.ollamaEndpoint) {
      try {
        const base = config.ollamaEndpoint.replace(/\/+$/, '');
        const res = await fetch(`${base}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: config.ollamaModel || 'llama3',
            prompt,
            stream: false,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.response) return data.response;
        }
      } catch (err) {
        console.warn('[AIService] Ollama API call failed, falling back to offline KB:', err);
      }
    }

    // 3. Offline Knowledge Base (Smart keyword lookup fallback)
    return this.resolveOfflineAnswer(query);
  }

  /**
   * Builds offline curated template fallback with accurate module/lesson counts
   */
  private static buildOfflineRoadmapTemplate(safeTopic: string): Roadmap {
    const id = `roadmap-${Date.now()}`;
    return {
      id,
      title: `Offline Template: ${safeTopic}`,
      category: 'Modeling',
      description: `Offline structured Blender 5.3 starter template for "${safeTopic}" (nhập Gemini API Key hoặc kết nối Ollama trong Settings để tạo lộ trình AI chuyên sâu).`,
      totalLessons: 5,
      completedLessons: 0,
      progressPercent: 0,
      lastStudied: 'Just created',
      modules: [
        {
          id: `${id}-m1`,
          roadmapId: id,
          title: `Module 1: Reference Analysis & Blocking ${safeTopic}`,
          orderIndex: 1,
          description: `Analyze silhouettes, import reference boards, and establish correct real-world proportions.`,
          progressPercent: 0,
          isCompleted: false,
          isLocked: false,
          lessons: [
            { id: `${id}-l1`, moduleId: `${id}-m1`, title: `1.1 Reference Alignment & Scale Setup`, orderIndex: 1, readTime: '6 min', hotkeys: ['Shift + A -> Image', 'N'], isCompleted: false },
            { id: `${id}-l2`, moduleId: `${id}-m1`, title: `1.2 Primary Forms Blocking with Primitives`, orderIndex: 2, readTime: '8 min', hotkeys: ['S', 'G', 'R'], isCompleted: false },
          ],
          practiceTasks: [
            {
              id: `${id}-p1`,
              moduleId: `${id}-m1`,
              title: `Challenge 01: ${safeTopic} Base Mesh Blocking`,
              type: '3d_challenge',
              modifiers: 'Mirror, Bevel',
              isCompleted: false,
              checklist: [
                { id: `${id}-c1`, stepNumber: 1, title: 'Import orthographic reference planes', hotkeyHint: 'Numpad 1, 3', isDone: false },
                { id: `${id}-c2`, stepNumber: 2, title: 'Block major volumes using scaled cubes', hotkeyHint: 'Shift + A', isDone: false },
              ],
            },
          ],
        },
        {
          id: `${id}-m2`,
          roadmapId: id,
          title: `Module 2: Secondary Details & Quad Edge Flow`,
          orderIndex: 2,
          description: `Carve surface recesses, inset panels, and apply non-destructive modifiers.`,
          progressPercent: 0,
          isCompleted: false,
          isLocked: false,
          lessons: [
            { id: `${id}-l3`, moduleId: `${id}-m2`, title: `2.1 Beveling and Corner Quad Redirects`, orderIndex: 1, readTime: '10 min', hotkeys: ['Ctrl + B', 'K'], isCompleted: false },
            { id: `${id}-l4`, moduleId: `${id}-m2`, title: `2.2 Clean Booleans with Weighted Normal`, orderIndex: 2, readTime: '12 min', hotkeys: ['Fast vs Exact'], isCompleted: false },
          ],
          practiceTasks: [],
        },
      ],
    };
  }

  /**
   * AI Roadmap Generator: Uses Gemini/Ollama if configured, otherwise returns smart offline template
   */
  static async generateCustomRoadmap(topic: string): Promise<Roadmap> {
    const safeTopic = topic.trim() || 'Custom 3D Project';
    const config = this.getConfig();

    const jsonPrompt = `Generate a JSON object (no markdown fences) for a Blender 5.3 learning roadmap on "${safeTopic}".
Schema:
{
  "title": "string",
  "category": "Modeling" | "Shading" | "Lighting" | "Animation",
  "description": "string",
  "modules": [
    {
      "title": "Module 1: ...",
      "description": "string",
      "lessons": [{ "title": "string", "readTime": "8 min", "hotkeys": ["Tab", "E"] }],
      "practiceTitle": "Challenge: ..."
    }
  ]
}
Keep strictly 2 modules, 2 lessons per module.`;

    let rawText: string | null = null;

    if (config.provider === 'gemini' && config.apiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: jsonPrompt }] }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || null;
        }
      } catch {
        // Fallback below
      }
    } else if (config.provider === 'ollama' && config.ollamaEndpoint) {
      try {
        const base = config.ollamaEndpoint.replace(/\/+$/, '');
        const res = await fetch(`${base}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: config.ollamaModel || 'llama3',
            prompt: jsonPrompt,
            stream: false,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          rawText = data.response || null;
        }
      } catch {
        // Fallback below
      }
    }

    if (rawText) {
      try {
        const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed && Array.isArray(parsed.modules) && parsed.modules.length > 0) {
          const id = `roadmap-${Date.now()}`;
          const validCat = ['Modeling', 'Shading', 'Lighting', 'Animation'].includes(parsed.category)
            ? parsed.category
            : 'Modeling';

          const modules = parsed.modules.map((m: any, mIdx: number) => {
            const modId = `${id}-m${mIdx + 1}`;
            const lessons = (m.lessons || []).map((l: any, lIdx: number) => ({
              id: `${modId}-l${lIdx + 1}`,
              moduleId: modId,
              title: l.title || `Lesson ${mIdx + 1}.${lIdx + 1}`,
              orderIndex: lIdx + 1,
              readTime: l.readTime || '8 min',
              hotkeys: Array.isArray(l.hotkeys) ? l.hotkeys : ['Tab'],
              isCompleted: false,
            }));

            const practiceTasks =
              mIdx === 0
                ? [
                    {
                      id: `${id}-p1`,
                      moduleId: modId,
                      title: m.practiceTitle || `Challenge: ${safeTopic}`,
                      type: '3d_challenge' as const,
                      expectedVertices: 120,
                      expectedFaces: 112,
                      modifiers: 'Mirror, Bevel',
                      isCompleted: false,
                      checklist: [
                        { id: `${id}-s1`, stepNumber: 1, title: `Block primary silhouette of ${safeTopic}`, hotkeyHint: 'Shift + A, S', isDone: false },
                        { id: `${id}-s2`, stepNumber: 2, title: 'Refine edge loops and apply Bevel modifier', hotkeyHint: 'Ctrl + R, Ctrl + B', isDone: false },
                      ],
                    },
                  ]
                : [];

            return {
              id: modId,
              roadmapId: id,
              title: m.title || `Module ${mIdx + 1}`,
              orderIndex: mIdx + 1,
              description: m.description || `Core skills for ${safeTopic}`,
              progressPercent: 0,
              isCompleted: false,
              isLocked: false,
              lessons,
              practiceTasks,
            };
          });

          const totalLessons = modules.reduce((acc: number, m: any) => acc + m.lessons.length + m.practiceTasks.length, 0);

          return {
            id,
            title: parsed.title || `AI Curated: ${safeTopic}`,
            category: validCat,
            description: parsed.description || `AI-generated Blender 5.3 roadmap for ${safeTopic}.`,
            totalLessons,
            completedLessons: 0,
            progressPercent: 0,
            lastStudied: 'Just created',
            modules,
          };
        }
      } catch {
        // Fallback to clean offline template
      }
    }

    return this.buildOfflineRoadmapTemplate(safeTopic);
  }
}
