import { CurriculumLesson } from './curriculumDatabase';
import { InteractiveLabId } from '../components/curriculum/PrincipleLabWidget';
import { ConceptCheckItem } from '../components/curriculum/ConceptCheckDeck';
import { VideoResourceItem } from '../components/curriculum/VideoIllustrationCard';

export const EXTRA_LESSONS_PART2: Record<string, CurriculumLesson[]> = {
  'cur-mod-05': [
    {
      id: 'les-cur-mod-05-05',
      moduleId: 'cur-mod-05',
      title: '🎞️ BÀI 5.5: QUẢN LÝ MÀU SẮC BLENDER 5.X (AGX VS FILMIC) & PHƠI SÁNG',
      readTime: '6 phút đọc',
      summary: 'Vì sao AgX thay thế Filmic thành chuẩn mặc định mới trong Blender 4.0–5.3: giữ trọn sắc độ vùng sáng gắt mà không bị bệt trắng hay lệch màu neon.',
      keyShortcuts: ['Z'],
      category: 'Lighting & Render',
      level: 5,
      challengeRef: 'task-studio-lamp',
      contentMarkdown: `# 🎞️ BÀI 5.5: QUẢN LÝ MÀU SẮC BLENDER 5.X (AGX VS FILMIC)

---

## 1. SỰ KHÁC BIỆT GIỮA STANDARD, FILMIC VÀ AGX

Khi bạn đặt một ngọn đèn mạnh chiếu vào vật liệu đỏ rực hoặc đèn neon:
- **Standard:** Đạt ngưỡng trắng \`1.0\` sẽ bị "cháy kẹt" bệt phẳng, mất hoàn toàn chi tiết khối.
- **Filmic:** Mở rộng dải sáng (Dynamic Range) nhưng có nhược điểm là làm **lệch tông màu** khi ánh sáng mạnh (màu đỏ dễ ngả vàng gắt, màu xanh dương ngả tím giả tạo).
- **AgX (Mặc định Blender 5.3):** Giảm bão hòa một cách tự nhiên tiến về màu trắng sáng giống cảm biến máy ảnh điện ảnh thật, giữ nguyên sắc thái mượt mà ở vùng quá sáng.

---

## 2. THIẾT LẬP VIEW TRANSFORM CHUẨN CHỤP STUDIO

1. Vào **Render Properties → Color Management**.
2. Giữ *View Transform:* **\`AgX\`**.
3. Chỉnh **Look:**
   - \`None\` hoặc \`Medium Contrast\` cho ảnh sạch trung tính.
   - \`Medium High Contrast\` / \`Punchy\` khi muốn ảnh nổi khối ngay không cần hậu kỳ nhiều.
4. Bật công cụ soi phơi sáng **False Color** trong *View Transform* tạm thời: màu **xám/xanh lá** là vùng sáng đúng chuẩn; màu **đỏ rực** là vùng bị cháy sáng cần hạ công suất đèn!`,
    },
  ],
  'cur-mod-06': [
    {
      id: 'les-cur-mod-06-04',
      moduleId: 'cur-mod-06',
      title: '🖌️ BÀI 6.4: WEIGHT PAINTING & XỬ LÝ LỖI GẮN DA (SKINNING)',
      readTime: '6 phút đọc',
      summary: 'Hiểu bản chất ảnh hưởng xương lên đỉnh lưới (Weight 0.0–1.0), dùng Gradient/Smooth/Auto Normalize để sửa vai, hông và cánh tay robot không bị kéo rách.',
      keyShortcuts: ['Ctrl + P', 'F'],
      category: 'Rigging & Animation',
      level: 6,
      challengeRef: 'task-robo-arm',
      contentMarkdown: `# 🖌️ BÀI 6.4: WEIGHT PAINTING & XỬ LÝ LỖI GẮN DA (SKINNING)

---

## 1. BẢN CHẤT CỦA WEIGHT PAINT (THANG MÀU 0.0 ĐẾN 1.0)

Mỗi xương trong Armature liên kết với một **Vertex Group** cùng tên trên nhân vật. Trong chế độ **Weight Paint**:
- **Màu Đỏ (Weight = 1.0):** Đỉnh bám theo xương này **100%**, xương đi đâu đỉnh đi đó.
- **Màu Xanh Lá / Vàng (Weight = 0.5):** Đỉnh chịu ảnh hưởng chia đôi giữa 2 xương ở vùng khớp (khuỷu tay, đầu gối).
- **Màu Xanh Dương Đậm (Weight = 0.0):** Xương chuyển động hoàn toàn không tác động tới đỉnh này.

---

## 2. QUY TRÌNH CHẨN ĐOÁN & SỬA LỖI ĐỈNH BỊ KÉO LỆCH

1. Chọn mô hình ở chế độ \`Ctrl + Click\` vào xương trong Pose Mode (hoặc chọn Armature trước → Shift-chọn Mesh → **Weight Paint**).
2. Bật tùy chọn **\`Auto Normalize\`** ở bảng *Tool Options* bên phải — cực kỳ quan trọng để đảm bảo tổng trọng số trên 1 đỉnh luôn bằng \`1.0\`.
3. Với **cánh tay robot cứng (Mechanical Rig):** KHÔNG dùng *Automatic Weights* làm mềm da; chọn từng cụm đỉnh ở Edit Mode rồi dùng **Assign \`1.0\`** trực tiếp vào Vertex Group của khớp xương tương ứng, hoặc gắn *Parent → Bone* trực tiếp!`,
    },
    {
      id: 'les-cur-mod-06-05',
      moduleId: 'cur-mod-06',
      title: '🦴 BÀI 6.5: RIGIFY META-RIG & ACTION SLOTS MỚI TRONG BLENDER 5.3',
      readTime: '6 phút đọc',
      summary: 'Cách khớp bộ xương mẫu Rigify tạo tay điều khiển IK/FK tự động trong 1 phút và tận dụng Action Slots mới của Blender 4.4–5.3 cho nhiều đối tượng cùng lúc.',
      keyShortcuts: ['Tab', 'G', 'I'],
      category: 'Rigging & Animation',
      level: 6,
      challengeRef: 'task-robo-arm',
      contentMarkdown: `# 🦴 BÀI 6.5: RIGIFY META-RIG & ACTION SLOTS TRONG BLENDER 5.3

---

## 1. TẠO BỘ XƯƠNG CHUYÊN NGHIỆP BẰNG RIGIFY ADDON

Thay vì mất hàng ngày tự gắn từng Constraint IK/FK, Blender tích hợp sẵn **Rigify**:
1. Bật Addon **\`Rigify\`** trong *Edit → Preferences → Add-ons*.
2. Nhấn \`Shift + A\` → **Armature → Human (Meta-Rig)**.
3. Vào Edit Mode (\`Tab\`), bật đối xứng trục X, kéo các khớp xương Meta-Rig khớp đúng tâm đầu gối, khuỷu tay, vai và ngón tay của nhân vật.
4. Vào *Object Data Properties (icon người xanh)* → bấm nút **Generate Rig**. Blender tự động sinh toàn bộ cần điều khiển IK/FK, lăn bàn chân (Foot Roll) và bảng gạt chuyển chế độ sẵn sàng!

---

## 2. TÍNH NĂNG MỚI: ACTION SLOTS TRONG BLENDER 5.3

Trong các phiên bản Blender cũ, mỗi đối tượng (Nhân vật, Đèn, Camera, Thanh kiếm) phải lưu tách ra nhiều **Action** rời rạc khiến quản lý hoạt cảnh cực kỳ rối.
Từ **Blender 4.4 – 5.3**, một **Action** duy nhất có thể chứa nhiều **Slots** (ví dụ \`Slot_Robot\`, \`Slot_Camera\`, \`Slot_Spotlight\`):
- Giúp đóng gói trọn vẹn một phân cảnh hoạt họa vào duy nhất một Action để dễ chuyển đổi trong NLA Editor hoặc tái sử dụng giữa nhiều cảnh.`,
    },
  ],
  'cur-mod-07': [
    {
      id: 'les-cur-mod-07-03',
      moduleId: 'cur-mod-07',
      title: '🌊 BÀI 7.3: MÔ PHỎNG VẬT LÝ (CLOTH, RIGID BODY) & KHÓA CACHE ỔN ĐỊNH',
      readTime: '6 phút đọc',
      summary: 'Cách thiết lập vải mềm (Cloth Simulation) bay tự nhiên không xuyên rách, Rigid Body va chạm sụp đổ và quy trình Bake Cache trước khi bấm Render.',
      keyShortcuts: ['Space', 'Ctrl + A'],
      category: 'Geometry Nodes & Physics',
      level: 7,
      challengeRef: 'task-geo-island',
      contentMarkdown: `# 🌊 BÀI 7.3: MÔ PHỎNG VẬT LÝ (CLOTH, RIGID BODY) & CACHE

---

## 1. BÍ QUYẾT ĐỂ CLOTH SIMULATION KHÔNG BỊ XUYÊN THỦNG & RÁCH VẢI

1. **Apply Scale (\`Ctrl + A\`) bắt buộc:** Vải có Scale sai sẽ tính sai trọng lượng và lực đàn hồi ngay lập tức!
2. **Mật độ lưới đủ mịn & đều (Quads):** Vải cần *Subdivide* đều (ít nhất 20×20 ô cho khăn bàn nhỏ).
3. **Bật Self Collisions:** Trong *Physics Properties → Cloth → Collisions*, tích **\`Self Collisions\`** để nếp vải tự va chạm gấp nếp lên chính nó thay vì tự đâm xuyên qua nhau.
4. **Độ dày Collision trên vật va chạm:** Tăng nhẹ *Thickness Outer* (\`0.01–0.02m\`) trên mặt bàn để khăn không lún xuyên mép cạnh.

---

## 2. LUÔN BAKE CACHE TRƯỚC KHI BẤM RENDER HOẠT CẢNH

Mô phỏng vật lý tính theo từng khung hình nối tiếp từ Frame 1. Nếu bạn tua nhảy thẳng tới Frame 120 rồi bấm F12, vải có thể đứng im hoặc vỡ vụn!
- Vào mục **Cache** của Physics hoặc *Scene Properties → Rigid Body World* → bấm **\`Bake All Dynamics\`** để đóng băng đường chạy vật lý ổn định 100%.`,
    },
  ],
  'cur-mod-08': [
    {
      id: 'les-cur-mod-08-02',
      moduleId: 'cur-mod-08',
      title: '🔥 BÀI 8.2: BAKING NORMAL MAP HIGH-TO-LOW & RAY DISTANCE CAGE',
      readTime: '7 phút đọc',
      summary: 'Quy trình chuẩn công nghiệp nướng hàng triệu chi tiết lồi lõm từ High-Poly sang tấm bản đồ Normal Map nhẹ tênh cho Game Asset bằng Ray Distance / Cage.',
      keyShortcuts: ['Ctrl + T', 'Tab'],
      category: 'Game Asset Pipeline',
      level: 8,
      challengeRef: 'task-sci-fi-crate',
      contentMarkdown: `# 🔥 BÀI 8.2: BAKING NORMAL MAP HIGH-TO-LOW & RAY DISTANCE

---

## 1. TẠI SAO GAME AAA DÙNG HIGH-TO-LOW BAKING?

Một hòm tiếp tế Sci-Fi điêu khắc đủ ốc vít, vết móp và rãnh khắc chi tiết có thể nặng **500.000 tam giác**. Game Engine chỉ cho phép hòm đó nặng **1.500–3.000 tam giác**.
Kỹ thuật **Bake Normal Map** cho phép Cycles bắn tia từ bề mặt **Low-Poly** dò chạm vào **High-Poly** để ghi toàn bộ độ nghiêng ánh sáng vào một file ảnh tím-xanh (\`Normal Map\`).

---

## 2. QUY TRÌNH BAKE 5 BƯỚC KHÔNG BỊ LỖI CHÁY RĂNG CƯA

1. Đặt **High-Poly** và **Low-Poly** nằm **trùng khít tại cùng một tọa độ** $(0, 0, 0)$.
2. Đảm bảo **Low-Poly đã trải UV sạch** và bật **Shade Smooth** (kết hợp tách đảo UV ở các góc gắt 90°).
3. Tạo material cho Low-Poly với node \`Image Texture\` mới (để **Color Space: \`Non-Color\`**, **chưa nối vào đâu cả** — chỉ click chọn để kích hoạt!).
4. Đổi Render Engine sang **Cycles**, xuống mục **Bake**:
   - Bake Type: **\`Normal\`**.
   - Tích chọn **\`Selected to Active\`**.
   - Tăng **Extrusion (hoặc Max Ray Distance)** vừa đủ bao phủ lớp lồi cao nhất của High-Poly (VD: \`0.03m\`) để tia không bị hụt gây ra các mảng màu xanh lá/vàng lỗi!
5. Chọn High-Poly trước → \`Shift\`-chọn Low-Poly sau → bấm **Bake**, sau đó nhớ **\`Image → Save\`** file Normal vừa nướng!`,
    },
    {
      id: 'les-cur-mod-08-03',
      moduleId: 'cur-mod-08',
      title: '📦 BÀI 8.3: XUẤT .FBX / .GLTF CHUẨN HỆ TRỤC SANG UNREAL ENGINE 5 & UNITY',
      readTime: '6 phút đọc',
      summary: 'Checklist 6 bước kiểm tra Pivot, Apply Transforms, Armature Axis và đóng gói file .FBX / .GLTF để mô hình nhập sang UE5/Unity đứng đúng hướng, không lệch tỷ lệ 100x.',
      keyShortcuts: ['Ctrl + A', 'M'],
      category: 'Game Asset Pipeline',
      level: 8,
      challengeRef: 'task-geo-island',
      contentMarkdown: `# 📦 BÀI 8.3: XUẤT .FBX / .GLTF CHUẨN HỆ TRỤC SANG UE5 & UNITY

---

## 1. SỰ KHÁC BIỆT HỆ TRỤC TỌA ĐỘ GIỮA CÁC ENGINE

| Phần mềm | Trục Ngửa Lên (Up Axis) | Quy ước Đơn vị | Định dạng ưu tiên |
| :--- | :--- | :--- | :--- |
| **Blender 5.3** | \`+Z Up\`, \`-Y Forward\` | 1 unit = 1 mét | \`.blend\` / \`.glb\` |
| **Unreal Engine 5** | \`+Z Up\` | 1 unit = 1 cm | **\`.FBX\`** / **\`.GLTF\`** |
| **Unity / Godot / Web** | \`+Y Up\` | 1 unit = 1 mét | **\`.GLB / .GLTF\`** hoặc **\`.FBX\`** |

---

## 2. CHECKLIST XUẤT FILE SẠCH KHÔNG LỖI SCALE 100X

1. **Apply All Transforms (\`Ctrl + A\`):** Đặt Location/Rotation = 0 và Scale = \`(1, 1, 1)\` cho cả Mesh lẫn Armature (xương).
2. **Đưa Pivot Origin về đáy chân đế:** Để khi kéo đồ vật vào Unreal/Unity, mô hình tự đứng chạm đất.
3. **Chọn riêng đối tượng cần xuất:** Khi bấm *File → Export → FBX / glTF 2.0*, tích chọn **\`Limit to: Selected Objects\`** để không xuất nhầm Camera, Đèn hay khối dao Boolean.
4. **Cài đặt FBX cho Unity:** Đặt *Apply Scalings* thành **\`FBX Units Scale\`** và kiểm tra phần *Geometry → Smoothing* chọn **\`Face\`**.
5. **Ưu tiên \`.GLB\` (.glTF Binary):** Khi đưa sang **Godot, Three.js Web** hoặc tái sử dụng vật liệu PBR Principled BSDF, \`.GLB\` đóng gói tự động Texture + PBR Sockets sạch và ít lỗi hệ trục nhất!`,
    },
  ],
};

export const UPGRADED_CONTENT_PART2: Record<
  string,
  { title?: string; readTime?: string; summary?: string; keyShortcuts?: string[]; contentMarkdown: string }
> = {
  'les-cur-mod-05-03': {
    readTime: '6 phút đọc',
    summary: 'Hiểu tác động tâm lý của tiêu cự ống kính (24mm góc rộng vs 85mm chân dung), thiết lập xóa phông Depth of Field và bố cục quy tắc 1/3.',
    keyShortcuts: ['Numpad 0', 'Ctrl + Alt + Numpad 0', 'G', 'Z'],
    contentMarkdown: `# 📷 BÀI 5.3: CAMERA, TIÊU CỰ ỐNG KÍNH (FOV) & BỐ CỤC THỊ GIÁC

---

## 1. PHÍM TẮT ĐIỀU KHIỂN CAMERA CỰC NHANH

- **\`Numpad 0\`:** Nhìn qua khung kính Camera đang kích hoạt.
- **\`Ctrl + Alt + Numpad 0\`:** Kéo Camera bay ngay tới đúng góc nhìn hiện tại trên Viewport (rất tiện để chốt góc chụp!).
- **Khóa Camera theo góc nhìn:** Bấm \`N\` → tab **View → tích \`Camera to View\`** để dùng chuột giữa xoay chỉnh khung hình trực tiếp như game FPS (nhớ bỏ tích sau khi chọn xong!).

---

## 2. CHỌN TIÊU CỰ ỐNG KÍNH (FOCAL LENGTH) ĐÚNG BẢN CHẤT

| Tiêu cự | Góc nhìn & Hiệu ứng phối cảnh | Ứng dụng tốt nhất |
| :--- | :--- | :--- |
| **18mm – 24mm (Góc rộng)** | Kéo sâu không gian, đồ vật ở gần rìa hơi biến dạng lớn hơn | Nội thất hẹp, kiến trúc hoành tráng, cảnh phong cảnh |
| **35mm – 50mm (Tiêu chuẩn)** | Gần nhất với tỷ lệ nhìn tự nhiên của mắt người | Phim điện ảnh đời thường, giới thiệu phòng Isometric |
| **85mm – 135mm (Tele / Chân dung)** | Nén chiều sâu, giữ tỷ lệ mũi/cằm không bị phình méo | Render sản phẩm cao cấp, tượng điêu khắc & chân dung nhân vật |

---

## 3. ĐỘ SÂU TRƯỜNG ẢNH (DEPTH OF FIELD) & BỐ CỤC

- Tích chọn **Depth of Field** trong *Camera Properties*, dùng ống hút *Focus on Object* chấm thẳng vào chủ thể chính, và hạ **F-Stop** xuống khoảng \`2.8\` – \`4.0\` (tránh hạ thấp quá mức \`0.1\` khiến mô hình nhìn bị bé như đồ chơi mô hình!).`,
  },
  'les-cur-mod-05-04': {
    readTime: '6 phút đọc',
    summary: 'Tận dụng Compositor theo thời gian thực ngay trong Viewport Blender 5.3 (tab Effects mới, Glare/Bloom, Mist Pass chiều sâu và Color Balance).',
    keyShortcuts: ['F12'],
    contentMarkdown: `# ✨ BÀI 5.4: COMPOSITOR & EFFECTS TAB MỚI TRONG BLENDER 5.3

---

## 1. VIEWPORT COMPOSITOR & BƯỚC TIẾN BLENDER 5.3

Trong các bản Blender cũ, muốn chỉnh ánh sáng lóe (Glare) hay chỉnh màu (Color Balance), bạn phải render xong F12 mới thấy được kết quả. Hiện nay **Viewport Compositor** (nút dropdown góc trên phải Viewport → *Compositor: Always*) cho phép bạn xem mọi hiệu ứng hậu kỳ trực tiếp ở tốc độ thực!
Đặc biệt trên **Blender 5.3**, tab Compositor được tối ưu giao diện gọn gàng hơn với các bộ lọc hiệu ứng trực quan.

---

## 2. BỘ 4 NODE HẬU KỲ ĐẮT GIÁ NHẤT

1. **Glare Node (Đổi kiểu sang *Fog Glow* hoặc *Bloom*):** Tạo quầng sáng dịu lan quanh đèn bàn, bóng neon hay các điểm phản xạ kim loại gắt. Đặt *Threshold* vừa đủ cao (\`1.0+\`) để chỉ vùng thật sáng mới phát quầng.
2. **Denoise Node:** Dùng thuật toán OpenImageDenoise làm sạch hạt nhiễu Render Cycles mà vẫn giữ được chi tiết sắc nét thông qua *Normal* và *Albedo Pass*.
3. **Mist Pass (Sương mù chiều sâu):** Bật *Mist Pass* trong *View Layer Properties*, nối vào *Mix Color* phủ lớp khí quyển mờ nhẹ ở hậu cảnh xa để tạo tách lớp không gian 3D.
4. **Lens Distortion & Color Balance:** Thêm một lượng cực nhỏ *Dispersion* (\`0.005–0.01\`) để giả lập viền quang học ống kính thật, sau đó cân chỉnh sáng/tối bằng bánh xe *Lift / Gamma / Gain*.`,
  },
  'les-cur-mod-06-01': {
    readTime: '6 phút đọc',
    summary: 'Nắm vững nguyên lý đặt Keyframe (I), đọc chuyển động trên Dope Sheet và làm chủ đường cong gia tốc Ease In/Out trên Graph Editor.',
    keyShortcuts: ['I', 'Space', 'T', 'V'],
    contentMarkdown: `# 🎬 BÀI 6.1: ANIMATION CƠ BẢN — KEYFRAMING & GRAPH EDITOR CURVES

---

## 1. BỐ CỤC LÀM HOẠT HỌA CHUẨN TRONG WORKSPACE ANIMATION

- **Timeline / Dope Sheet:** Quản lý vị trí thời gian của các mốc **Keyframe** (bấm phím **\`I\`** ở Viewport hoặc bấm nút chấm nhỏ cạnh thông số Location/Rotation/Scale). Bấm \`Space\` để phát thử.
- **Graph Editor:** Nơi quyết định chuyển động trông **"sống động như Pixar"** hay **"cứng đờ như robot"** thông qua hình dáng các đường cong F-Curve!

---

## 2. HIỂU ĐƯỜNG CONG F-CURVE & GIA TỐC TỰ NHIÊN

| Kiểu đường cong (\`T\` trong Graph Editor) | Quy luật tốc độ | Cảm giác thị giác |
| :--- | :--- | :--- |
| **Linear** | Vận tốc không đổi từ đầu đến cuối | Máy móc băng chuyền chạy đều, thiếu trọng lượng |
| **Bezier (Mặc định)** | Chậm lúc khởi đầu, nhanh ở giữa, chậm dần khi dừng (**Ease In / Ease Out**) | Chuyển động có quán tính tự nhiên ngoài đời thực |
| **Constant** | Nhảy cóc tức thời không nội suy giữa các frame | Phong cách Stop-Motion / Spider-Verse hoặc ẩn hiện bật tắt đột ngột |

> 💡 **Kỹ thuật tạo lực nảy (Anticipation & Overshoot):** Trước khi cánh tay robot vung lên đánh xuống, cho nó hơi lùi nhẹ về sau 3–4 frame rồi vọt lố qua điểm đích một chút trước khi dừng hẳn!`,
  },
};

export const LAB_MAP_PART2: Record<string, InteractiveLabId> = {
  'les-cur-mod-05-01': 'studio-lighting-fov',
  'les-cur-mod-05-03': 'studio-lighting-fov',
  'les-cur-mod-05-05': 'studio-lighting-fov',
  'les-cur-mod-06-01': 'animation-curves-ik',
  'les-cur-mod-06-02': 'animation-curves-ik',
  'les-cur-mod-06-03': 'animation-curves-ik',
  'les-cur-mod-07-01': 'geonodes-scatter',
  'les-cur-mod-07-02': 'geonodes-scatter',
  'les-cur-mod-08-02': 'bevel-normals',
};

export const CONCEPT_CHECKS_PART2: Record<string, ConceptCheckItem[]> = {
  'les-cur-mod-05-01': [
    {
      id: 'cc-05-01-a',
      prompt: 'Trong thiết lập ánh sáng Studio 3 điểm, nguồn sáng nào đóng vai trò vẽ đường viền sáng mảnh tách lưng/vai chủ thể khỏi nền tối?',
      options: ['Key Light (Đèn chính)', 'Fill Light (Đèn phụ)', 'Rim / Back Light (Đèn ven phía sau)'],
      correctIndex: 2,
      explanation: 'Rim Light đặt phía sau góc chéo giúp tạo viền sáng sắc nét tách hẳn hình khối vật thể khỏi hậu cảnh tối.',
    },
    {
      id: 'cc-05-01-b',
      prompt: 'Muốn bóng đổ (Shadow) trên sàn nhà của chiếc đèn bàn mềm mại dịu mắt thay vì viền đen sắc như dao cắt, bạn điều chỉnh thông số nào của Area Light?',
      options: [
        'Tăng kích thước Size của bóng đèn lên lớn hơn',
        'Thu nhỏ Size của bóng đèn về gần 0.01m',
        'Chuyển màu đèn sang màu đen',
      ],
      correctIndex: 0,
      explanation: 'Theo quy luật vật lý, nguồn sáng có bề mặt phát sáng càng lớn (như Softbox hoặc bầu trời nhiều mây) thì viền bóng đổ càng mềm.',
    },
  ],
  'les-cur-mod-05-02': [
    {
      id: 'cc-05-02-a',
      prompt: 'Để một ngọn đèn trang trí chỉ chiếu sáng riêng lên nhân vật mà KHÔNG làm cháy sáng bức tường phía sau, bạn dùng tính năng nào của Blender 5.3?',
      options: ['Light Linking', 'Voxel Remesh', 'Solidify Modifier'],
      correctIndex: 0,
      explanation: 'Light Linking (hỗ trợ cả trên Cycles và EEVEE Next trong Blender 5.3) cho phép chỉ định chính xác đèn chiếu hoặc không chiếu lên từng Collection/Object.',
    },
  ],
  'les-cur-mod-05-03': [
    {
      id: 'cc-05-03-a',
      prompt: 'Khi chụp ảnh chân dung nhân vật hoặc trưng bày một sản phẩm đơn lẻ cao cấp, dải tiêu cự nào ít gây biến dạng phình mũi/méo cạnh nhất?',
      options: ['18mm (Góc siêu rộng)', '85mm – 105mm (Tele chân dung)', '10mm (Fisheye)'],
      correctIndex: 1,
      explanation: 'Tiêu cự dài (85mm) nén chiều sâu và thu hẹp góc nhìn, giữ nguyên tỷ lệ chuẩn khối khuôn mặt/sản phẩm thay vì phóng to bất thường các phần gần ống kính.',
    },
  ],
  'les-cur-mod-05-04': [
    {
      id: 'cc-05-04-a',
      prompt: 'Khi dùng Glare Node (kiểu Fog Glow) mà toàn bộ bức ảnh bị mờ mịt trắng xóa thay vì chỉ lóe sáng ở bóng đèn, cần chỉnh thông số nào?',
      options: [
        'Tăng giá trị Threshold lên cao (VD: 1.0 – 2.0) để lọc riêng vùng sáng mạnh',
        'Giảm Threshold xuống 0.0',
        'Đổi Input sang Alpha',
      ],
      correctIndex: 0,
      explanation: 'Threshold là ngưỡng độ sáng tối thiểu để hiệu ứng Glare kích hoạt. Để quá thấp sẽ khiến mọi điểm ảnh trung tính đều phát sáng mờ.',
    },
  ],
  'les-cur-mod-05-05': [
    {
      id: 'cc-05-05-a',
      prompt: 'Vì sao AgX được chọn thay thế Filmic trong Blender 5.3?',
      options: [
        'AgX xử lý các nguồn sáng rực mạnh giảm bão hòa tự nhiên về trắng mà không bị lệch tông màu kỳ quặc ở vùng Highlight.',
        'AgX tự động dựng thêm lưới 3D cho cảnh.',
        'Filmic chỉ chạy được trên hệ điều hành Linux.',
      ],
      correctIndex: 0,
      explanation: 'AgX khắc phục lỗi ngả màu gắt (hue skew) của Filmic dưới ánh đèn neon/lửa mạnh, cho dải màu chuyển êm mượt hơn nhiều.',
    },
  ],
  'les-cur-mod-06-01': [
    {
      id: 'cc-06-01-a',
      prompt: 'Muốn quả bóng rơi xuống chạm đất hoặc cánh tay robot dừng chuyển động một cách có quán tính tự nhiên, dạng đường cong nào phù hợp nhất?',
      options: ['Linear (Đường thẳng)', 'Bezier Ease In-Out', 'Constant (Bậc thang)'],
      correctIndex: 1,
      explanation: 'Vật thể ngoài đời thực luôn cần thời gian tăng tốc và giảm tốc khi dừng — đường cong chữ S của Bezier mô phỏng chính xác điều đó.',
    },
  ],
  'les-cur-mod-06-02': [
    {
      id: 'cc-06-02-a',
      prompt: 'Trong Pose Mode, bạn bấm Alt + G, Alt + R, Alt + S nhằm mục đích gì?',
      options: [
        'Đưa toàn bộ xương đang chọn về tư thế nghỉ ban đầu (Rest Pose)',
        'Xóa toàn bộ hệ thống xương khỏi cảnh',
        'Xuất file .FBX ngay lập tức',
      ],
      correctIndex: 0,
      explanation: 'Alt + G/R/S hoàn trả vị trí, góc xoay, tỷ lệ xương về trạng thái mặc định 0 giúp bạn dễ kiểm tra hoặc bắt đầu tạo dáng mới.',
    },
  ],
  'les-cur-mod-06-03': [
    {
      id: 'cc-06-03-a',
      prompt: 'Sự khác biệt cốt lõi giữa FK (Forward Kinematics) và IK (Inverse Kinematics) khi diễn hoạt chân nhân vật đi bộ là gì?',
      options: [
        'IK cho phép kéo trực tiếp bàn chân chạm đất để khớp đùi và đầu gối tự động co gập theo; FK phải xoay tuần tự từ hông → đùi → cẳng chân.',
        'FK chỉ dùng cho đèn chiếu sáng còn IK chỉ dùng cho vật liệu.',
        'IK không cần xương Armature vẫn chạy được.',
      ],
      correctIndex: 0,
      explanation: 'IK cực kỳ lợi hại khi bàn chân/tay cần bám chặt mặt đất hoặc nắm tay nắm cửa cố định, trong khi FK tự nhiên hơn cho vung tay đánh đấm trên không.',
    },
  ],
  'les-cur-mod-06-04': [
    {
      id: 'cc-06-04-a',
      prompt: 'Khi gắn xương cho một cánh tay robot bằng các khớp sắt cứng (không co giãn như da người), cách gắn nào sạch và chính xác nhất?',
      options: [
        'Gắn cứng từng bộ phận vào đúng xương (Bone Parenting) hoặc Assign Weight = 1.0 vào Vertex Group tương ứng.',
        'Dùng Smooth Weight Brush bôi nhòe khắp cả cánh tay.',
        'Dùng Dyntopo trên cánh tay trước khi gắn xương.',
      ],
      correctIndex: 0,
      explanation: 'Kim loại cứng không được phép uốn cong dẻo như da thịt! Gán trọng số 1.0 (hoặc Parent thẳng vào Bone) đảm bảo khớp máy xoay cứng cáp tuyệt đối.',
    },
  ],
  'les-cur-mod-06-05': [
    {
      id: 'cc-06-05-a',
      prompt: 'Action Slots (trong Blender 4.4–5.3) giải quyết vấn đề gì trong quy trình làm phim hoạt hình?',
      options: [
        'Cho phép lưu dữ liệu chuyển động của nhiều đối tượng khác nhau (Nhân vật, Đạo cụ, Camera) gọn vào cùng một Action duy nhất.',
        'Tự động vẽ texture cho nhân vật.',
        'Giảm số lượng đỉnh trên lưới đi 10 lần.',
      ],
      correctIndex: 0,
      explanation: 'Thay vì tạo 3–4 Action rời rạc cho một tương tác giữa nhân vật và đạo cụ, các Slot nằm chung trong một Action giúp đồng bộ cực kỳ gọn.',
    },
  ],
  'les-cur-mod-07-01': [
    {
      id: 'cc-07-01-a',
      prompt: 'Trong Geometry Nodes, hình dáng ổ cắm hình THOI (Diamond socket) đại diện cho điều gì?',
      options: [
        'Một trường dữ liệu động (Field) có thể mang giá trị khác nhau cho từng đỉnh hoặc từng điểm.',
        'Một giá trị hằng số duy nhất không đổi cho toàn cảnh.',
        'Ổ cắm bị lỗi không nối dây được.',
      ],
      correctIndex: 0,
      explanation: 'Ổ cắm tròn chứa 1 giá trị đơn cố định (Single Value), còn ổ cắm hình thoi là Field được đánh giá riêng biệt trên từng phần tử hình học.',
    },
  ],
  'les-cur-mod-07-02': [
    {
      id: 'cc-07-02-a',
      prompt: 'Tại sao việc rải 10.000 gốc cây bằng node "Instance on Points" lại mượt gấp hàng trăm lần so với nhân bản vật thể thật bằng Shift + D?',
      options: [
        'Vì GPU chỉ cần lưu dữ liệu lưới 1 cây gốc duy nhất rồi tái sử dụng tọa độ ma trận cho 10.000 bản sao (Instancing).',
        'Vì Instance on Points tự động xóa hết lá cây khi không nhìn tới.',
        'Vì Geometry Nodes chỉ dùng hình vuông 4 cạnh.',
      ],
      correctIndex: 0,
      explanation: 'Instancing giúp giảm bộ nhớ VRAM từ hàng gigabyte xuống chỉ vài megabyte dù hiển thị cả khu rừng.',
    },
  ],
  'les-cur-mod-07-03': [
    {
      id: 'cc-07-03-a',
      prompt: 'Nếu tấm vải Cloth Simulation liên tục bị tụt rơi xuống hoặc rách xuyên qua chính nó khi chạm bàn, 2 kiểm tra nào cần làm đầu tiên?',
      options: [
        'Apply Scale (Ctrl + A) cho cả vải & bàn, và bật Self Collisions trong mục Cloth.',
        'Chuyển sang tab Texture Paint và tô màu đỏ lên vải.',
        'Tắt toàn bộ đèn trong phòng.',
      ],
      correctIndex: 0,
      explanation: 'Scale chưa Apply làm lực hấp dẫn và độ dày va chạm sai lệch, còn thiếu Self Collisions khiến vải tự cắt qua chính nếp gấp của nó.',
    },
  ],
  'les-cur-mod-08-01': [
    {
      id: 'cc-08-01-a',
      prompt: 'Chữ "LODs" (Levels of Detail) trong tối ưu Game Assets có nghĩa là gì?',
      options: [
        'Tạo nhiều phiên bản giảm dần số tam giác của cùng một vật thể để tự động tráo đổi khi camera ở xa.',
        'Tăng độ phân giải ảnh texture lên 16K ở mọi khoảng cách.',
        'Khóa không cho người chơi xoay góc nhìn.',
      ],
      correctIndex: 0,
      explanation: 'Một ngôi nhà khi đứng gần có thể cần 8.000 tris (LOD0), nhưng ở xa 100m chỉ cần khối hộp 150 tris (LOD2) giúp game giữ vững 60+ FPS.',
    },
  ],
  'les-cur-mod-08-02': [
    {
      id: 'cc-08-02-a',
      prompt: 'Trong lúc Bake Normal Map theo chế độ Selected to Active, điều gì xảy ra nếu Ray Distance / Extrusion quá nhỏ (chưa bọc qua chỗ lồi của High-Poly)?',
      options: [
        'Tia dò bị cắt ngang làm xuất hiện các vệt mảng vàng/xanh lá lỗi trên bản đồ Normal.',
        'Mô hình tự động xóa sạch UV.',
        'Blender bật chế độ Cycles lên 10000 samples.',
      ],
      correctIndex: 0,
      explanation: 'Mọi phần của High-Poly nhô vượt ra ngoài vùng Extrusion sẽ không được tia quét tới chính xác, tạo vệt lỗi rất rõ khi lên đèn.',
    },
  ],
  'les-cur-mod-08-03': [
    {
      id: 'cc-08-03-a',
      prompt: 'Trước khi xuất file .FBX hoặc .GLB đưa vào Unity / Unreal Engine 5, thao tác bắt buộc nào giúp tránh lỗi vật thể bị phóng to 100 lần hoặc nằm ngang?',
      options: [
        'Apply All Transforms (Ctrl + A) để Reset Scale về (1, 1, 1) và Rotation về (0, 0, 0).',
        'Xóa toàn bộ vật liệu trước khi xuất.',
        'Đổi tên file thành lowercase_only.',
      ],
      correctIndex: 0,
      explanation: 'Khác biệt đơn vị mét vs centimet (100x) giữa Blender và Game Engine sẽ cộng hưởng nghiêm trọng nếu Object chưa Apply Transforms.',
    },
  ],
  'les-cur-mod-09-01': [
    {
      id: 'cc-09-01-a',
      prompt: 'Đâu là nguồn tải miễn phí 100% (bản quyền CC0 thương mại) uy tín cho cả HDRI chiếu sáng 16K lẫn Texture PBR sạch?',
      options: ['Poly Haven & AmbientCG', 'Ảnh chụp màn hình độ phân giải thấp từ tìm kiếm ngẫu nhiên', 'Trang web không rõ bản quyền'],
      correctIndex: 0,
      explanation: 'Poly Haven và AmbientCG cung cấp tài nguyên PBR + HDRI chuẩn vật lý 100% CC0 hoàn toàn miễn phí cho học tập và dự án thương mại.',
    },
  ],
};

export const VIDEOS_PART2: Record<string, VideoResourceItem[]> = {
  'les-cur-mod-05-01': [
    {
      title: 'Fundamentals of Lighting in Blender',
      channel: 'Blender Guru',
      youtubeId: 'ENnEYoUpFfU',
      startSeconds: 58,
      durationLabel: '43 phút (Các mốc cốt lõi)',
      focusPoints: [
        'Vị trí đặt Key/Fill/Rim để tạo khối 3D thay vì làm phẳng bề mặt.',
        'Quy luật suy giảm ánh sáng (Falloff) và kích thước nguồn sáng mềm.',
      ],
      chapters: [
        { label: 'Positioning', startSeconds: 58, timeText: '00:58' },
        { label: 'Staging', startSeconds: 312, timeText: '05:12' },
        { label: 'Falloff', startSeconds: 671, timeText: '11:11' },
        { label: 'Size & Softness', startSeconds: 1092, timeText: '18:12' },
        { label: 'Color & Polish', startSeconds: 1497, timeText: '24:57' },
      ],
    },
  ],
  'les-cur-mod-05-03': [
    {
      title: 'Fundamentals of Lighting — Staging & Camera Framing',
      channel: 'Blender Guru',
      youtubeId: 'ENnEYoUpFfU',
      startSeconds: 312,
      durationLabel: 'Từ mốc 05:12',
      focusPoints: ['Phối hợp góc đặt máy ảnh và ánh sáng tách lớp tiền cảnh/hậu cảnh.'],
      chapters: [{ label: 'Staging', startSeconds: 312, timeText: '05:12' }],
    },
  ],
  'les-cur-mod-05-04': [
    {
      title: 'New Compositor and Effects Tab in Blender 5.3!',
      channel: 'Ryan King Art',
      youtubeId: 'wprKPpSoz8s',
      startSeconds: 0,
      durationLabel: 'Blender 5.3 Update',
      focusPoints: ['Trải nghiệm tab Compositor & Effects mới trực tiếp trên Blender 5.3.'],
    },
    {
      title: 'Compositing for Beginners (Blender Tutorial)',
      channel: 'Ryan King Art',
      youtubeId: 'JgQvvd1jryw',
      startSeconds: 578,
      durationLabel: '38 phút (Mốc Viewport & Glare)',
      focusPoints: [
        'Bật Viewport Compositing theo thời gian thực và dùng Glare, Denoise, Color Balance.',
      ],
      chapters: [
        { label: 'Open Compositor', startSeconds: 120, timeText: '02:00' },
        { label: 'Viewport Compositing', startSeconds: 578, timeText: '09:38' },
        { label: 'Glare Node', startSeconds: 749, timeText: '12:29' },
        { label: 'Denoise Node', startSeconds: 1197, timeText: '19:57' },
        { label: 'Color Balance', startSeconds: 1421, timeText: '23:41' },
      ],
    },
  ],
  'les-cur-mod-05-05': [
    {
      title: "Blender 5.0's New Color System Changes Everything!",
      channel: 'SouthernShotty',
      youtubeId: 'LLDm9k-xUQ4',
      startSeconds: 0,
      durationLabel: 'Color Management 5.x',
      focusPoints: ['Hệ thống màu sắc thế hệ mới của Blender 5 và cách AgX giữ màu tự nhiên.'],
    },
    {
      title: 'The Secret Ingredient to Photorealism',
      channel: 'Blender Guru',
      youtubeId: 'm9AT7H4GGrA',
      startSeconds: 0,
      durationLabel: 'HDR & Dynamic Range',
      focusPoints: ['Tại sao dải tương phản sáng rộng quyết định độ chân thực ảnh render.'],
    },
  ],
  'les-cur-mod-06-02': [
    {
      title: 'EASY Rigging with Blender Rigify — Ch2: Rigging Basics',
      channel: 'CGDive',
      youtubeId: 'FhF54DZY34U',
      startSeconds: 666,
      durationLabel: 'Từ mốc 11:06',
      focusPoints: ['Cấu trúc xương Armature, quan hệ cha con và Pose Mode căn bản.'],
      chapters: [{ label: 'Ch2: Rigging Basics', startSeconds: 666, timeText: '11:06' }],
    },
  ],
  'les-cur-mod-06-03': [
    {
      title: 'EASY Rigging with Blender Rigify — Ch3: Simple Human Rig',
      channel: 'CGDive',
      youtubeId: 'FhF54DZY34U',
      startSeconds: 2837,
      durationLabel: 'Từ mốc 47:17',
      focusPoints: ['Thiết lập cần điều khiển IK chân tay và Pole Target chỉnh hướng đầu gối.'],
      chapters: [{ label: 'Ch3: Simple Human Rig', startSeconds: 2837, timeText: '47:17' }],
    },
  ],
  'les-cur-mod-06-04': [
    {
      title: '[Blender 4.0 RIGIFY] #4: Complex Human Rig & Weight Painting',
      channel: 'CGDive',
      youtubeId: 'dXElhdXgFD8',
      startSeconds: 0,
      durationLabel: '59 phút (Rig & Weight Paint)',
      focusPoints: ['Xử lý lỗi Bone Heat và tinh chỉnh Weight Painting cho khớp nối sạch sẽ.'],
    },
  ],
  'les-cur-mod-06-05': [
    {
      title: 'EASY Rigging with Blender Rigify — Full Course',
      channel: 'CGDive',
      youtubeId: 'FhF54DZY34U',
      startSeconds: 3657,
      durationLabel: 'Từ mốc 1:00:57',
      focusPoints: ['Khớp Meta-Rig khuôn mặt & cơ thể rồi Generate bộ điều khiển Rigify hoàn chỉnh.'],
      chapters: [
        { label: 'Ch4: Complex Human', startSeconds: 3657, timeText: '1:00:57' },
        { label: 'Ch6: Custom Rigs', startSeconds: 9575, timeText: '2:39:35' },
      ],
    },
  ],
  'les-cur-mod-07-01': [
    {
      title: "I'll teach you Geometry Nodes",
      channel: 'Default Cube',
      youtubeId: 'JU70u6cJZqI',
      startSeconds: 140,
      durationLabel: '50 phút (Mốc nền tảng)',
      focusPoints: ['Mở Spreadsheet Editor quan sát trực tiếp tọa độ đỉnh chạy qua luồng Node.'],
      chapters: [
        { label: 'Workspace Setup', startSeconds: 140, timeText: '02:20' },
        { label: 'What are GeoNodes?', startSeconds: 475, timeText: '07:55' },
        { label: 'Advanced Node Groups', startSeconds: 2004, timeText: '33:24' },
      ],
    },
  ],
  'les-cur-mod-07-02': [
    {
      title: 'Supercharge Your Geometry Nodes Workflow - Blender Tutorial',
      channel: 'Erindale',
      youtubeId: 'xBM4BPpfbUg',
      startSeconds: 0,
      durationLabel: 'GeoNodes Workflow',
      focusPoints: ['Tổ chức Node Tree khoa học và dùng phím tắt tăng tốc dựng cảnh quan thủ tục.'],
    },
  ],
  'les-cur-mod-08-01': [
    {
      title: 'Blender to Unity - Generic Character Setup: #1 Rigging & FBX Export',
      channel: 'CGDive',
      youtubeId: 'z3cdbYTl3Ms',
      startSeconds: 0,
      durationLabel: '19 phút (Game Pipeline)',
      focusPoints: ['Tối ưu hóa Rig & lưới sạch trước khi đóng gói xuất vào Game Engine.'],
    },
  ],
  'les-cur-mod-08-03': [
    {
      title: 'Blender to Unity - FBX Export Pipeline',
      channel: 'CGDive',
      youtubeId: 'z3cdbYTl3Ms',
      startSeconds: 0,
      durationLabel: '19 phút (Export Setup)',
      focusPoints: ['Thiết lập thông số Export FBX chuẩn hệ trục & baking animation an toàn.'],
    },
  ],
};
