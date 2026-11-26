// Auto-generated from c:\Users\Admin\Desktop\CODE\blender_curriculum_database\
// Comprehensive Blender 3D Curriculum Database

export interface CurriculumLesson {
  id: string;
  moduleId: string;
  title: string;
  readTime: string;
  summary: string;
  keyShortcuts: string[];
  contentMarkdown: string;
  category: string;
  level: number;
  challengeRef?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  vietnameseTitle: string;
  level: number;
  levelBadge: string;
  category: string;
  description: string;
  lessons: CurriculumLesson[];
}

export const BLENDER_CURRICULUM_MODULES: CurriculumModule[] = [
  {
    "id": "cur-mod-00",
    "title": "Master Roadmap & Strategy",
    "vietnameseTitle": "Lộ trình Tổng quan 24 Tuần & Chiến lược Học",
    "level": 0,
    "levelBadge": "Level 0: Tổng quan",
    "category": "Roadmap & Strategy",
    "description": "Toàn cảnh lộ trình 24 tuần từ con số 0 đến 3D Artist chuyên nghiệp, 4 giai đoạn tâm lý và giải pháp phá vỡ Tutorial Hell.",
    "lessons": [
      {
        "id": "les-cur-mod-00-01",
        "moduleId": "cur-mod-00",
        "title": "🚀 LỘ TRÌNH TOÀN DIỆN: TỪ SỐ 0 ĐẾN 3D ARTIST CHUYÊN NGHIỆP TRONG BLENDER",
        "readTime": "9 phút đọc",
        "summary": "G1\"Giai đoạn 1: Bỡ ngỡ (Tuần 1-2)<br>Choáng ngợp bởi giao diện và phím tắt\" --> G2\"Giai đoạn 2: Bắt chước (Tuần 3-6)<br>Làm theo các bài hướng dẫn kinh điển\"...",
        "keyShortcuts": [
          "Z",
          "G",
          "R",
          "S",
          "E",
          "I"
        ],
        "contentMarkdown": "# 🚀 LỘ TRÌNH TOÀN DIỆN: TỪ SỐ 0 ĐẾN 3D ARTIST CHUYÊN NGHIỆP TRONG BLENDER\n\n---\n\n## 1. 4 GIAI ĐOẠN TÂM LÝ & BẪY HỌC TẬP CẦN VƯỢT QUA\n\n```mermaid\nflowchart TD\n    G1[\"Giai đoạn 1: Bỡ ngỡ (Tuần 1-2)<br>Choáng ngợp bởi giao diện và phím tắt\"] --> G2[\"Giai đoạn 2: Bắt chước (Tuần 3-6)<br>Làm theo các bài hướng dẫn kinh điển\"]\n    G2 --> G3[\"Giai đoạn 3: Vùng sa mạc thử thách (Tuần 7-12)<br>Tự làm sản phẩm riêng, đối mặt lỗi lưới & bóng méo\"]\n    G3 --> G4[\"Giai đoạn 4: Thuần thục & Chuyên biệt hóa (Tháng 3+)<br>Phản xạ phím tắt, tư duy hình học và phong cách riêng\"]\n```\n\n### ⚠️ Các cạm bẫy lớn nhất của người tự học (Tutorial Hell)\n1. **Bẫy xem thụ động**: Xem hàng chục video YouTube nhưng không trực tiếp mở Blender lên dựng lại. *Cách khắc phục: Tỷ lệ 30% Xem - 70% Thực hành.*\n2. **Quên áp dụng Scale (Ctrl + A)**: Đây là nguyên nhân số 1 khiến Bevel méo, Texture bị kéo giãn và Physic rơi lệch.\n3. **Lạm dụng Subdivision Surface**: Thêm modifier làm mịn bề mặt lên một lưới có N-gons hoặc tam giác không kiểm soát, dẫn đến lỗi nhăn nhúm (Pinching).\n4. **Không dùng ảnh tham chiếu (Reference)**: Dựng hình hoàn toàn bằng trí nhớ mà không có ảnh góc nhìn Orthographic phía trước/bên hông.\n\n---\n\n## 2. KẾ HOẠCH HỌC TẬP 24 TUẦN THEO TỪNG CỘT MỐC\n\n### 📌 THÁNG 1: NỀN TẢNG THAO TÁC & MODELING CƠ BẢN (Tuần 1 – Tuần 4)\n- **Mục tiêu**: Không còn cảm giác \"lạc lõng\" trong không gian 3 chiều; nắm vững các thao tác biến đổi hình học cơ bản.\n- **Tuần 1: Không gian 3D & Điều hướng Viewport**\n  - Trục tọa độ (X: Đỏ, Y: Xanh lá, Z: Xanh dương).\n  - Thao tác chuột giữa (MMB: Xoay, Shift + MMB: Lia màn hình, Cuộn: Phóng to thu nhỏ).\n  - Các góc nhìn Numpad: `1` (Front), `3` (Right), `7` (Top), `9` (Opposite), `5` (Perspective / Orthographic).\n  - Vòng chuyển Shading `Z`: Wireframe, Solid, Material Preview, Rendered.\n- **Tuần 2: Thao tác biến đổi & 3D Cursor**\n  - Bộ 3 phím vàng: `G` (Grab/Move), `R` (Rotate), `S` (Scale).\n  - Khóa trục: Bấm `X`, `Y` hoặc `Z` sau khi bấm phím biến đổi; bấm `Shift + Z` để khóa di chuyển trên mặt phẳng X-Y.\n  - Sức mạnh của 3D Cursor: `Shift + S` (Snap menu: Đưa tâm đối tượng về tâm không gian, hoặc bắt dính theo đỉnh chọn).\n- **Tuần 3: Chế độ Edit Mode & Bộ công cụ đùn khối**\n  - Chuyển chế độ: Phím `Tab`. Lựa chọn: `1` (Vertex), `2` (Edge), `3` (Face).\n  - Đùn mặt: Phím `E` (Extrude).\n  - Lõm mặt: Phím `I` (Inset Faces).\n  - Cắt vòng lặp: Phím `Ctrl + R` (Loop Cut).\n  - Vát cạnh: Phím `Ctrl + B` (Bevel).\n- **Tuần 4: Dự án đầu tay (Milestone Project 1)**\n  - *Đề bài:* Dựng một căn phòng Isometric Low-Poly gồm bàn học, ghế ngồi, máy tính, đèn bàn và kệ sách.\n\n---\n\n### 📌 THÁNG 2: HARD-SURFACE MODELING & MODIFIERS CHUYÊN SÂU (Tuần 5 – Tuần 8)\n- **Mục tiêu**: Làm chủ quy trình dựng hình phi phá hủy (Non-destructive modeling), nắm chắc luật đi cạnh Quads.\n- **Tuần 5: Nguyên lý Topology chuẩn công nghiệp**\n  - Quads (Mặt 4 đỉnh) vs Triangles (Mặt 3 đỉnh) vs N-gons (Mặt >4 đỉnh).\n  - Luồng cạnh (Edge Flow) và điểm tụ (Poles: N-pole 3 cạnh, E-pole 5 cạnh).\n  - Khắc phục hình rách (Non-manifold geometry) và khử trùng điểm (`M` -> *By Distance*).\n- **Tuần 6: Sức mạnh của Modifiers**\n  - Nhóm tạo hình: *Subdivision Surface*, *Bevel*, *Solidify*.\n  - Nhóm nhân bản: *Mirror* (Gương đối xứng có Clipping), *Array* (Dãy mảng), *Curve*.\n  - Nhóm cắt khối: *Boolean Modifier* (Thuật toán Fast vs Exact).\n- **Tuần 7: Hard-Surface chuyên nghiệp**\n  - Kỹ thuật Bevel Weight và Crease.\n  - Xử lý bóng méo bề mặt cong sau Boolean bằng *Weighted Normal Modifier* + *Harden Normals*.\n- **Tuần 8: Dự án tháng 2 (Milestone Project 2)**\n  - *Đề bài:* Dựng một hòm vũ khí viễn tưởng (Sci-Fi Military Crate) hoặc một khẩu súng máy Sci-Fi chi tiết, hoàn toàn bằng Quad topology.\n\n---\n\n### 📌 THÁNG 3: TRẢI UV, VẬT LIỆU PBR & PROCEDURAL SHADING (Tuần 9 – Tuần 12)\n- **Mục tiêu**: Thổi hồn cho khối 3D thô xơ bằng bề mặt kim loại, gỗ, kính, da và hiệu ứng phong hóa.\n- **Tuần 9: Bản chất của UV Unwrapping**\n  - Tư duy \"cắt may quần áo\": Đường rạch (Mark Seam - `Ctrl + E`).\n  - Mở trải lưới (`U` -> *Unwrap*).\n  - Sắp xếp đảo UV (`Pack Islands`) và khái niệm Mật độ điểm ảnh (Texel Density).\n- **Tuần 10: Nguyên lý vật lý PBR & Principled BSDF**\n  - Base Color (Màu nền albedo).\n  - Roughness (Độ nhám / Phản chiếu).\n  - Metallic (Đặc tính dẫn điện / Kim loại: Luôn là 0 hoặc 1, không đặt lơ lửng 0.5).\n  - Normal Map & Bump Map (Đánh lừa thị giác tạo độ lồi lõm chi tiết nhỏ mà không tốn đa giác).\n  - Transmission (Độ truyền quang / Thủy tinh) & IOR (Chiết suất khúc xạ).\n- **Tuần 11: Làm chủ Shader Editor & Node Wrangler**\n  - Kích hoạt addon miễn phí có sẵn *Node Wrangler* (`Ctrl + T` nạp bộ texture PBR 1 giây, `Ctrl + Shift + Click` soi thử node).\n  - Các node thủ tục: *Noise Texture*, *Voronoi Texture*, *ColorRamp*, *Mapping*, *Texture Coordinate*.\n- **Tuần 12: Dự án tháng 3 (Milestone Project 3)**\n  - *Đề bài:* Trải UV và tô vật liệu cho chiếc rương báu cổ phong hóa gồm gỗ mủn xước, đai sắt rỉ sét và ngọc phát quang.\n\n---\n\n### 📌 THÁNG 4: ÁNH SÁNG STUDIO, RENDER & HẬU KỲ (Tuần 13 – Tuần 16)\n- **Mục tiêu**: Tạo ra bức ảnh 3D đẹp mắt, có chiều sâu, tương phản giàu cảm xúc như chụp tại studio chuyên nghiệp.\n- **Tuần 13: Lý thuyết chiếu sáng điện ảnh**\n  - Thiết lập 3 nguồn sáng kinh điển: *Key Light* (Đèn chính), *Fill Light* (Đèn phụ bù bóng), *Rim/Back Light* (Đèn ven tách viền chủ thể).\n  - Nhiệt độ màu (Kelvin: Ấm 3200K vs Lạnh 6500K) và tỷ lệ tương phản.\n  - Sử dụng ánh sáng môi trường thực tế (HDRI) từ Poly Haven.\n- **Tuần 14: So sánh 2 cỗ máy Render (Cycles vs EEVEE Next)**\n  - *Cycles*: Ray-tracing tính toán đường đi photon chân thực, khử nhiễu AI (OptiX / OpenImageDenoise).\n  - *EEVEE Next*: Render thời gian thực tốc độ cao trên nền Vulkan, Screen Space Reflections, Ray-traced Shadows.\n  - Tính năng *Light Linking* (Chỉ định đèn chỉ chiếu vào đối tượng nhất định).\n- **Tuần 15: Camera & Bố cục thị giác**\n  - Tiêu cự ống kính (Focal Length: 24mm góc rộng, 50mm mắt người, 85mm chân dung/sản phẩm).\n  - Độ sâu trường ảnh (Depth of Field - xóa phông mờ nghệ thuật).\n  - Bố cục 1/3, đường dẫn (Leading lines), khung lồng khung (Framing).\n- **Tuần 16: Hậu kỳ với Compositor**\n  - Tách các lớp Render Passes: Mist Pass (tạo sương mù chiều sâu), Cryptomatte (tách đối tượng).\n  - Hiệu ứng Glare / Bloom (Ánh sáng lóe), Color Balance (Chỉnh tông màu điện ảnh).\n\n---\n\n### 📌 THÁNG 5: ĐIÊU KHẮC HỮU CƠ (SCULPTING) & TẠO XƯƠNG (RIGGING) (Tuần 17 – Tuần 20)\n- **Tuần 17: Chế độ Sculpt Mode**\n  - Bộ cọ chính: *Clay Strips*, *Grab*, *Snake Hook*, *Crease*, *Smooth*, *Inflate*.\n  - *Dyntopo* (Tự động thêm lưới khi kéo dãn) vs *Voxel Remesh* (Tái tạo khối đồng nhất).\n- **Tuần 18: Retopology (Làm lại lưới nhẹ)**\n  - Kỹ thuật dùng cọ *PolyBuild* và *Shrinkwrap Modifier* để bọc lưới quads nhẹ chuẩn chuyển động lên tượng điêu khắc triệu đỉnh.\n- **Tuần 19: Hệ thống xương Armatures**\n  - Cấu trúc xương cha con (Parenting hierarchy).\n  - Gắn xương tự động (*Parent with Automatic Weights*) và sơn trọng số (*Weight Painting*).\n- **Tuần 20: Động học ngược (Inverse Kinematics - IK)**\n  - Ràng buộc xương IK cho chân và tay (di chuyển bàn chân thì đầu gối và đùi tự co tự nhiên).\n\n---\n\n### 📌 THÁNG 6: HOẠT HỌA (ANIMATION), GEOMETRY NODES & TỐI ƯU GAME (Tuần 21 – Tuần 24)\n- **Tuần 21: 12 Nguyên tắc hoạt họa & Graph Editor**\n  - Keyframing trên Timeline và Dope Sheet.\n  - Điều chỉnh đường cong chuyển động Bezier trên Graph Editor (Gia tốc vào ra - Ease In/Ease Out).\n- **Tuần 22: Nhập môn Geometry Nodes**\n  - Kiến trúc node thủ tục (Procedural modeling).\n  - Tán rải ngẫu nhiên cỏ cây, sỏi đá trên bề mặt đồi núi bằng *Distribute Points on Faces* và *Instance on Points*.\n- **Tuần 23: Mô phỏng vật lý (Physics & Simulation)**\n  - Rigid Body (Vật thể rắn va chạm sụp đổ).\n  - Cloth Simulation (Vải cờ bay, khăn trải bàn).\n- **Tuần 24: Tối ưu Game Pipeline & Đồ án tốt nghiệp**\n  - Nướng chi tiết (Bake Normal Map & Ambient Occlusion từ tượng High-poly sang mesh Low-poly).\n  - Xuất file định dạng chuẩn quốc tế `.fbx` và `.gltf` đưa vào Unreal Engine 5 hoặc Unity.\n",
        "category": "Roadmap & Strategy",
        "level": 0,
        "challengeRef": "task-table-02"
      }
    ]
  },
  {
    "id": "cur-mod-01",
    "title": "Module 1: Getting Started & Viewport Navigation",
    "vietnameseTitle": "Nhập môn Cơ bản & Điều hướng Không gian 3D",
    "level": 1,
    "levelBadge": "Level 1: Nhập môn",
    "category": "Basics & Viewport",
    "description": "Làm quen không gian 3 chiều, các chế độ hiển thị Viewport, hệ thống phím tắt sống còn G-R-S và quản lý Outliner/Collections.",
    "lessons": [
      {
        "id": "les-cur-mod-01-01",
        "moduleId": "cur-mod-01",
        "title": "🧭 BÀI 1.1: GIAO DIỆN & KHÔNG GIAN 3D TRONG BLENDER",
        "readTime": "4 phút đọc",
        "summary": "Khác với đồ họa 2D (Photoshop, Illustrator) chỉ có chiều ngang $X$ và chiều dọc $Y$, Blender hoạt động trong không gian 3 chiều Euclid:...",
        "keyShortcuts": [
          "Z"
        ],
        "contentMarkdown": "# 🧭 BÀI 1.1: GIAO DIỆN & KHÔNG GIAN 3D TRONG BLENDER\n\n---\n\n## 1. TỔNG QUAN VỀ KHÔNG GIAN 3 CHIỀU (3D VIEWPORT)\n\nKhác với đồ họa 2D (Photoshop, Illustrator) chỉ có chiều ngang $X$ và chiều dọc $Y$, Blender hoạt động trong không gian 3 chiều Euclid:\n- **Trục X (Màu Đỏ):** Trục ngang (Left / Right).\n- **Trục Y (Màu Xanh Lá Cây):** Trục chiều sâu (Front / Back).\n- **Trục Z (Màu Xanh Dương):** Trục thẳng đứng (Up / Down).\n\n> **Gốc tọa độ (World Origin):** Điểm giao nhau giữa 3 trục có tọa độ $(0, 0, 0)$. Mọi đối tượng khi tạo mới thường sinh ra quanh gốc này hoặc tại vị trí của **3D Cursor**.\n\n---\n\n## 2. CÁC KHU VỰC CHÍNH TRÊN GIAO DIỆN BLENDER\n\n1. **Top Bar (Thanh trên cùng):**\n   - Menu chính: *File, Edit, Render, Window, Help*.\n   - **Workspaces Tabs:** Các không gian làm việc chuyên dụng theo từng công đoạn:\n     - `Layout`: Sắp đặt bố cục tổng thể.\n     - `Modeling`: Chuyên dựng hình khối.\n     - `Sculpting`: Điêu khắc tượng.\n     - `UV Editing`: Trải lưới chiếu vân.\n     - `Texture Paint`: Sơn vẽ trực tiếp lên vật thể.\n     - `Shading`: Biên tập bảng vật liệu Node Shader.\n     - `Animation`: Hoạt họa và timeline.\n     - `Rendering & Compositing`: Kết xuất và hậu kỳ.\n     - `Geometry Nodes`: Lập trình dựng hình thủ tục.\n2. **3D Viewport (Khung nhìn 3D - Cửa sổ chính):**\n   - Nơi bạn nhìn, xoay và tương tác trực tiếp với mô hình.\n3. **Outliner (Góc trên bên phải):**\n   - Cây quản lý đối tượng theo thư mục phân cấp (**Collections**). Tương đương bảng Layers của Photoshop nhưng theo dạng cây phả hệ (Parent - Child).\n4. **Properties Panel (Góc dưới bên phải):**\n   - Bảng điều khiển thông số quan trọng nhất: Cài đặt Render, Kích thước Render, Thuộc tính Vật liệu, Bảng Modifiers, Dữ liệu Đỉnh (Vertex Groups).\n5. **Timeline (Thanh đáy):**\n   - Quản lý khung hình hoạt họa (Frames), Play/Pause và đặt Keyframe.\n\n---\n\n## 3. THAO TÁC ĐIỀU HƯỚNG VIEWPORT (BẮT BUỘC THUẦN THỤC)\n\n| Thao tác | Phím / Chuột | Mục đích sử dụng |\n| :--- | :--- | :--- |\n| **Orbit (Xoay góc nhìn)** | Giữ chuột giữa `MMB` và rê chuột | Xoay 360 độ quanh tâm đối tượng đang chọn |\n| **Pan (Lia khung nhìn)** | Giữ `Shift` + Giữ chuột giữa `MMB` | Trượt camera theo phương song song để căn chỉnh vị trí |\n| **Zoom (Phóng to / Thu nhỏ)** | Cuộn chuột giữa `Scroll` hoặc `Ctrl + MMB` | Tiếp cận chi tiết hoặc nhìn bao quát |\n| **Focus Object (Tập trung)** | Phím chấm Numpad `.` (hoặc phím `/`) | Ngay lập tức căn giữa đối tượng được chọn vào màn hình |\n\n---\n\n## 4. CÁC GÓC CHIẾU CHUẨN NUMPAD (ORTHOGRAPHIC VIEWS)\n\nTrong dựng hình kỹ thuật và giải phẫu, bạn cần nhìn vật thể hoàn toàn phẳng (không bị biến dạng phối cảnh xa gần - Perspective Distortion):\n\n- **Numpad 1:** Góc nhìn chính diện (**Front Orthographic**).\n- **Ctrl + Numpad 1:** Góc nhìn phía sau (**Back Orthographic**).\n- **Numpad 3:** Góc nhìn bên phải (**Right Orthographic**).\n- **Ctrl + Numpad 3:** Góc nhìn bên trái (**Left Orthographic**).\n- **Numpad 7:** Góc nhìn từ trên đỉnh xuống (**Top Orthographic**).\n- **Ctrl + Numpad 7:** Góc nhìn từ đáy lên (**Bottom Orthographic**).\n- **Numpad 5:** Chuyển đổi qua lại giữa góc nhìn Phối cảnh (**Perspective**) và góc nhìn Trực giao (**Orthographic**).\n- **Numpad 0:** Nhìn qua ống kính máy ảnh chính (**Active Camera View**).\n\n---\n\n## 5. BỐN CHẾ ĐỘ HIỂN THỊ SHADING (PHÍM TẮT `Z`)\n\nBấm giữ phím **`Z`** trong Viewport để mở Pie Menu gồm 4 chế độ:\n1. **Wireframe (`Z` -> Trái):** Khung lưới dạng dây trong suốt, thấy toàn bộ các cạnh xuyên qua vật thể.\n2. **Solid (`Z` -> Phải):** Khối màu xám mờ chuẩn mặc định để tập trung dựng hình và đi cạnh.\n3. **Material Preview (`Z` -> Dưới):** Hiển thị màu sắc và độ bóng vật liệu bằng nguồn sáng HDRI giả lập sẵn.\n4. **Rendered (`Z` -> Trên):** Hiển thị kết quả tính toán ánh sáng và bóng đổ thật 100% của cỗ máy render (Cycles hoặc Eevee).\n",
        "category": "Basics & Viewport",
        "level": 1,
        "challengeRef": "task-vp-01"
      },
      {
        "id": "les-cur-mod-01-02",
        "moduleId": "cur-mod-01",
        "title": "⌨️ BÀI 1.2: HỆ THỐNG PHÍM TẮT SỐNG CÒN TRONG BLENDER 5.3",
        "readTime": "4 phút đọc",
        "summary": "Khác với các phần mềm truyền thống yêu cầu bạn kéo thả các mũi tên Gizmo, Blender tối ưu tốc độ bằng tổ hợp phím gõ nhanh:...",
        "keyShortcuts": [
          "G",
          "R",
          "Z",
          "S"
        ],
        "contentMarkdown": "# ⌨️ BÀI 1.2: HỆ THỐNG PHÍM TẮT SỐNG CÒN TRONG BLENDER 5.3\n\n---\n\n## 1. BỘ BA BIẾN ĐỔI HÌNH HỌC KINH ĐIỂN (TRANSFORM G-R-S)\n\nKhác với các phần mềm truyền thống yêu cầu bạn kéo thả các mũi tên Gizmo, Blender tối ưu tốc độ bằng tổ hợp phím gõ nhanh:\n\n### 1. Phím `G` – Grab (Di chuyển vị trí - Translation)\n- Bấm `G` $\\rightarrow$ di chuyển tự do trong mặt phẳng góc nhìn camera.\n- Bấm `G` rồi bấm `X` $\\rightarrow$ chỉ di chuyển dọc theo trục X.\n- Bấm `G` rồi bấm `Shift + Z` $\\rightarrow$ di chuyển trên mặt đất (mặt phẳng X-Y), khóa trục Z thẳng đứng.\n- Bấm `G` rồi gõ số `2` rồi bấm `Enter` $\\rightarrow$ dịch chuyển chính xác 2 mét.\n\n### 2. Phím `R` – Rotate (Xoay góc)\n- Bấm `R` $\\rightarrow$ xoay đối tượng vuông góc với góc nhìn hiện tại.\n- Bấm `R` rồi bấm `R` lần nữa (Double R) $\\rightarrow$ chế độ xoay tự do hình cầu dạng bi lăn (**Trackball Rotation**).\n- Bấm `R` rồi bấm `Z` rồi gõ `45` $\\rightarrow$ xoay đúng 45 độ quanh trục đứng Z.\n\n### 3. Phím `S` – Scale (Phóng to / Thu nhỏ tỷ lệ)\n- Bấm `S` $\\rightarrow$ thu phóng đều 3 chiều.\n- Bấm `S` rồi bấm `Z` $\\rightarrow$ chỉ thu phóng chiều cao.\n- Bấm `S` rồi bấm `Z` rồi gõ `0` $\\rightarrow$ làm phẳng (Flatten) toàn bộ các điểm được chọn về cùng một cao độ Z!\n\n---\n\n## 2. PHÍM THAO TÁC CƠ BẢN QUAN TRỌNG\n\n| Phím tắt | Chức năng | Ứng dụng thực tế |\n| :--- | :--- | :--- |\n| **`Tab`** | Chuyển đổi Object Mode $\\leftrightarrow$ Edit Mode | Chuyển từ quản lý vật thể sang nắn chỉnh từng đỉnh/cạnh |\n| **`Shift + A`** | Add Menu (Thêm đối tượng mới) | Thêm khối Cube, Sphere, Camera, Đèn, Curves, v.v. |\n| **`X`** hoặc **`Delete`** | Xóa đối tượng | Xóa đỉnh, cạnh, mặt hoặc toàn bộ vật thể |\n| **`Shift + D`** | Duplicate (Nhân bản độc lập) | Tạo bản sao độc lập của đối tượng được chọn |\n| **`Alt + D`** | Linked Duplicate (Nhân bản liên kết) | Tạo bản sao chia sẻ chung dữ liệu lưới (Sửa 1 con ốc, 100 con ốc khác đổi theo) |\n| **`H`** | Hide (Ẩn đối tượng) | Tạm giấu các vật thể che chắn để dễ thao tác |\n| **`Alt + H`** | Unhide (Hiện lại tất cả) | Mở lại toàn bộ các đối tượng đang bị ẩn |\n| **`Shift + H`** | Isolate / Hide Unselected | Giữ lại duy nhất vật thể đang chọn, ẩn sạch phần còn lại |\n| **`/` (Slash Numpad)**| Local View (Cách ly vật thể) | Tương tự Shift + H nhưng tự động zoom thẳng vào vật thể |\n| **`A`** | Select All | Chọn toàn bộ đối tượng hoặc đỉnh |\n| **`Alt + A`** | Deselect All | Hủy chọn toàn bộ |\n| **`Ctrl + Z`** | Undo | Lùi lại 1 bước |\n| **`Ctrl + Shift + Z`** | Redo | Tiến lên 1 bước |\n\n---\n\n## 3. NGUYÊN TẮC VÀNG: APPLY TRANSFORMS (`Ctrl + A`)\n\nĐây là lỗi kinh điển khiến 90% người mới bắt đầu gặp trục trặc:\n- Khi bạn thu phóng hoặc xoay một vật thể trong **Object Mode**, Blender lưu thông số đó ở dạng tạm thời (ví dụ Scale $X: 2.0, Y: 0.5, Z: 1.0$).\n- Các modifier như **Bevel**, **Subdivision** và cơ chế chiếu vân Texture sẽ dựa vào thông số Scale này để tính toán. Nếu Scale không bằng $(1.0, 1.0, 1.0)$, cạnh Bevel sẽ bị bẹp dí thành hình elip!\n\n> 💡 **Khắc phục:** Luôn chọn vật thể ở Object Mode và bấm:\n> **`Ctrl + A`** $\\rightarrow$ chọn **`Apply All Transforms`** (hoặc chọn *Apply Rotation & Scale*).\n",
        "category": "Basics & Viewport",
        "level": 1,
        "challengeRef": "task-vp-01"
      },
      {
        "id": "les-cur-mod-01-03",
        "moduleId": "cur-mod-01",
        "title": "🗂️ BÀI 1.3: QUẢN LÝ ĐỐI TƯỢNG, ORIGIN & COLLECTIONS",
        "readTime": "3 phút đọc",
        "summary": "Mỗi vật thể trong Blender đều có một chấm nhỏ màu cam nằm ở trung tâm hoặc chân đế của nó — đó là Origin (Tâm đối tượng)....",
        "keyShortcuts": [
          "R",
          "S",
          "M"
        ],
        "contentMarkdown": "# 🗂️ BÀI 1.3: QUẢN LÝ ĐỐI TƯỢNG, ORIGIN & COLLECTIONS\n\n---\n\n## 1. TÂM ĐỐI TƯỢNG (OBJECT ORIGIN) LÀ GÌ?\n\nMỗi vật thể trong Blender đều có một chấm nhỏ màu cam nằm ở trung tâm hoặc chân đế của nó — đó là **Origin (Tâm đối tượng)**.\n- Khi bạn bấm **`R` (Xoay)**: Đối tượng sẽ quay quanh điểm Origin này.\n- Khi bạn bấm **`S` (Scale)**: Đối tượng sẽ phình to hoặc thu nhỏ từ tâm Origin này.\n- **Tọa độ của vật thể** hiển thị trên bảng thuộc tính thực chất chính là vị trí của điểm Origin trong không gian thế giới.\n\n### Cách di dời tâm Origin:\n- Chuột phải vào vật thể $\\rightarrow$ **Set Origin**:\n  - `Origin to Geometry`: Đưa tâm cam về chính giữa thể tích khối.\n  - `Origin to 3D Cursor`: Đưa tâm về đúng vị trí con trỏ 3D Cursor hiện tại (Rất hữu ích khi làm bản lề cửa xoay hoặc kim đồng hồ!).\n  - `Geometry to Origin`: Kéo toàn bộ mô hình về vị trí của tâm cam.\n\n---\n\n## 2. CON TRỎ 3D CURSOR – VŨ KHÍ BẮT DÍNH CHÍNH XÁC\n\nCon trỏ 3D Cursor (biểu tượng vòng tròn sọc đỏ trắng) là một công cụ độc quyền của Blender dùng làm điểm neo sinh đối tượng và tâm xoay tạm thời.\n\n### Menu bắt dính `Shift + S` (Snapping Menu):\n1. **Cursor to World Origin:** Đưa 3D Cursor quay về tọa độ $(0, 0, 0)$.\n2. **Cursor to Selected:** Đưa 3D Cursor nhảy thẳng vào tâm của đỉnh/cạnh/mặt hoặc đối tượng đang chọn.\n3. **Selection to Cursor:** Kéo vật thể đang chọn bay thẳng đến vị trí con trỏ 3D Cursor.\n\n---\n\n## 3. TỔ CHỨC CẢNH QUAN BẰNG COLLECTIONS (OUTLINER)\n\nĐể không bị rối mắt khi dựng một cảnh hàng trăm chi tiết:\n- Phím **`M`** (Move to Collection): Di chuyển đối tượng đang chọn vào một Collection mới hoặc có sẵn.\n- **Tắt mắt (Eye icon):** Ẩn đối tượng trong Viewport.\n- **Tắt máy ảnh (Camera icon):** Vẫn thấy trong Viewport khi dựng hình nhưng khi bấm F12 render thì không xuất hiện (Hữu ích cho các khối Boolean cắt gọt hoặc khối tham chiếu).\n- **Phân chia tiêu chuẩn cho một dự án 3D chuyên nghiệp:**\n  - `00_References`: Chứa các ảnh mẫu (Blueprints).\n  - `01_Geometry`: Chứa các mô hình nhân vật, đồ đạc chính.\n  - `02_Booleans`: Chứa các khối dao cắt đục lỗ.\n  - `03_Cameras`: Chứa máy ảnh chính và phụ.\n  - `04_Lighting`: Chứa các đèn Area, Spot, Sun và đèn nền.\n",
        "category": "Basics & Viewport",
        "level": 1,
        "challengeRef": "task-table-02"
      }
    ]
  },
  {
    "id": "cur-mod-02",
    "title": "Module 2: Quad Modeling & Hard-Surface Workflows",
    "vietnameseTitle": "Dựng hình Modeling & Bề mặt cứng Hard-Surface",
    "level": 2,
    "levelBadge": "Level 2: Dựng hình",
    "category": "Hard-Surface Modeling",
    "description": "Nguyên lý lưới Quad sạch, khử N-gons, công cụ Edit Mode và quy trình Booleans không phá hủy kết hợp Weighted Normals.",
    "lessons": [
      {
        "id": "les-cur-mod-02-01",
        "moduleId": "cur-mod-02",
        "title": "📐 BÀI 2.1: NGUYÊN LÝ TOPOLOGY & VĂN HÓA MẶT 4 ĐỈNH (QUADS)",
        "readTime": "3 phút đọc",
        "summary": "Topology (Cấu trúc liên kết lưới) là cách sắp xếp, phân bố và kết nối của các Đỉnh (Vertices), Cạnh (Edges) và Mặt (Faces/Polygons) để tạo nên hình dạng của một vật thể 3D....",
        "keyShortcuts": [],
        "contentMarkdown": "# 📐 BÀI 2.1: NGUYÊN LÝ TOPOLOGY & VĂN HÓA MẶT 4 ĐỈNH (QUADS)\n\n---\n\n## 1. TOPOLOGY TRONG ĐỒ HỌA 3D LÀ GÌ?\n\n**Topology** (Cấu trúc liên kết lưới) là cách sắp xếp, phân bố và kết nối của các **Đỉnh (Vertices)**, **Cạnh (Edges)** và **Mặt (Faces/Polygons)** để tạo nên hình dạng của một vật thể 3D.\nCùng một hình dáng bên ngoài (ví dụ một quả cầu), nhưng cấu trúc lưới bên trong có thể rất đẹp hoặc rất nát. Topology tốt quyết định:\n1. Độ mượt mà khi ánh sáng phản xạ (Không bị nhăn, không bị lỗi bóng đen).\n2. Khả năng biến dạng tự nhiên khi gắn xương hoạt họa (Khớp khuỷu tay uốn cong không bị móp).\n3. Khả năng làm mịn bằng modifier Subdivision Surface mà không tạo vết nhăn nhúm (Pinching).\n\n---\n\n## 2. PHÂN LOẠI ĐA GIÁC: QUADS VS TRIS VS N-GONS\n\n| Loại đa giác | Số đỉnh | Đánh giá | Trường hợp sử dụng |\n| :--- | :--- | :--- | :--- |\n| **Quads (Đa giác 4 đỉnh)** | Đúng 4 đỉnh | **Tiêu chuẩn vàng (Vua của Topology)** | Mô hình nhân vật chuyển động, mô hình Subdivision Surface, uốn cong. |\n| **Tris (Tam giác 3 đỉnh)** | Đúng 3 đỉnh | **Chấp nhận được** (Được Game Engine ưa chuộng) | Các bề mặt hoàn toàn phẳng, khớp nối không biến dạng, hoặc các trò chơi thời gian thực. |\n| **N-gons (Đa giác > 4 đỉnh)**| 5 đỉnh trở lên | **Rủi ro cao (Nguyên nhân số 1 gây lỗi lưới)** | Chỉ dùng trên bề mặt 100% phẳng không bao giờ biến dạng hoặc uốn cong. |\n\n---\n\n## 3. CÁC ĐIỂM TỤ (POLES) & CÁCH CHUYỂN HƯỚNG LUỒNG CẠNH (EDGE FLOW)\n\n- **E-Pole (Điểm tụ 5 cạnh):** Một đỉnh có 5 cạnh nối vào. Có tác dụng chuyển hướng dòng chảy của cạnh (Thường gặp ở gò má, khóe miệng hoặc vai nhân vật).\n- **N-Pole (Điểm tụ 3 cạnh):** Một đỉnh chỉ có 3 cạnh nối vào.\n- **Quy tắc vàng:** Tuyệt đối tránh để các điểm tụ nằm ngay trên các vị trí uốn gập chuyển động (ví dụ giữa đầu gối hoặc mí mắt), vì chúng sẽ gây gãy nếp nhăn kỳ quặc khi nhân vật cử động.\n\n---\n\n## 4. QUY TẮC LƯỚI KHÉP KÍN (MANIFOLD VS NON-MANIFOLD)\n\nMột lưới đạt chuẩn in 3D và chuẩn kỹ xảo phải là **Manifold (Kín nước)**:\n- Không có mặt úp mặt (Internal faces ẩn bên trong khối).\n- Không có 2 đỉnh nằm đè lên cùng 1 tọa độ mà không nối nhau (Double vertices).\n- Không có một cạnh chung của 3 mặt phẳng trở lên (T-junction / Non-manifold edge).\n\n> 💡 **Phím tắt kiểm tra lỗi Non-Manifold:**\n> Vào Edit Mode $\\rightarrow$ Bấm `A` hủy chọn $\\rightarrow$ Nhấn **`Shift + Ctrl + Alt + M`**. Blender sẽ tự động bôi sáng toàn bộ các cạnh bị hở hoặc rách trên mô hình của bạn!\n",
        "category": "Hard-Surface Modeling",
        "level": 2,
        "challengeRef": "task-mug-03"
      },
      {
        "id": "les-cur-mod-02-02",
        "moduleId": "cur-mod-02",
        "title": "🔨 BÀI 2.2: BỘ CÔNG CỤ DỰNG HÌNH CHỦ LỰC TRONG EDIT MODE",
        "readTime": "4 phút đọc",
        "summary": "Khi ở trong Edit Mode (bấm `Tab`), luôn dùng hàng phím số trên cùng:...",
        "keyShortcuts": [
          "E",
          "Z",
          "I"
        ],
        "contentMarkdown": "# 🔨 BÀI 2.2: BỘ CÔNG CỤ DỰNG HÌNH CHỦ LỰC TRONG EDIT MODE\n\n---\n\n## 1. BA CHẾ ĐỘ CHỌN TRONG EDIT MODE (`Phím 1, 2, 3`)\n\nKhi ở trong Edit Mode (bấm `Tab`), luôn dùng hàng phím số trên cùng:\n- **Phím `1`:** Vertex Select (Chọn từng điểm Đỉnh).\n- **Phím `2`:** Edge Select (Chọn từng Cạnh nối).\n- **Phím `3`:** Face Select (Chọn toàn bộ Mặt phẳng).\n- **Giữ `Shift`:** Chọn cùng lúc nhiều chế độ (ví dụ vừa chọn đỉnh vừa chọn cạnh).\n\n---\n\n## 2. BỘ CÔNG CỤ CẮT & ĐÙN KHỐI KINH ĐIỂN\n\n### 1. Extrude Region (Đùn mặt - Phím `E`)\n- Kéo các đỉnh/cạnh/mặt ra ngoài để sinh thêm hình khối mới.\n- Khóa trục: Bấm `E` rồi bấm `Z` để đùn thẳng đứng lên trên.\n- **Alt + E:** Mở Advanced Extrude Menu:\n  - *Extrude Along Normals:* Phình to các mặt theo phương vuông góc (như thổi bóng bay).\n  - *Extrude Individual Faces:* Đùn từng mặt riêng biệt độc lập không dính nhau.\n\n### 2. Inset Faces (Tạo viền bảo vệ - Phím `I`)\n- Thu hẹp các cạnh bao quanh hướng vào trong tâm mặt phẳng.\n- **Tại sao bắt buộc phải Inset trước khi đùn lõm?**\n  Nếu đùn trực tiếp, góc nối sẽ bị gãy nhọn sắc dưới Subdivision. Inset tạo ra một vành đai bảo vệ (Holding Edge Loop) giúp ánh sáng phản xạ êm mượt.\n\n### 3. Loop Cut & Slide (Cắt vòng lặp - Phím `Ctrl + R`)\n- Di chuột qua khối lưới, xuất hiện đường viền màu tím hồng.\n- Cuộn chuột giữa: Tăng số lượng nhát cắt (ví dụ cuộn lên 2 để cắt đôi đối xứng).\n- Click chuột trái 1 lần để chốt số lượng $\\rightarrow$ trượt vị trí $\\rightarrow$ click chuột phải để nhảy về vị trí chính giữa 50%.\n\n### 4. Bevel (Vát cạnh - Phím `Ctrl + B`)\n- Làm tù hoặc uốn cong các cạnh sắc nhọn. Trong thế giới thực, không có vật thể nào có cạnh sắc 100% như dao cạo — tất cả đều có một độ vát nhỏ để bắt sáng.\n- Bấm `Ctrl + B` $\\rightarrow$ kéo chuột $\\rightarrow$ cuộn con lăn chuột để tăng số phân đoạn (Segments).\n- **Shift + Ctrl + B:** Vát cạnh riêng cho từng Điểm Đỉnh (Vertex Bevel).\n\n### 5. Knife Tool (Dao cắt tự do - Phím `K`)\n- Bấm `K` để biến con trỏ thành lưỡi dao mổ.\n- Click lần lượt lên các cạnh để tạo đường cắt theo ý muốn.\n- Bấm `C` khi đang cầm dao: Khóa góc cắt theo các bội số 45 độ.\n- Bấm `Z` khi đang cầm dao: Cắt xuyên qua toàn bộ mô hình (Cut Through cả mặt trước lẫn mặt sau).\n- Bấm `Enter` hoặc `Space` để xác nhận đường cắt.\n\n### 6. Bridge Edge Loops (Bắc cầu nối 2 vòng cạnh)\n- Chọn 2 vòng cạnh hở đối diện nhau $\\rightarrow$ Nhấn **`Ctrl + E`** $\\rightarrow$ chọn **`Bridge Edge Loops`**. Blender sẽ tự động tạo mặt phẳng nối liền giữa 2 vòng cạnh đó!\n\n### 7. Fill (Bịt kín mặt - Phím `F`)\n- Chọn 4 đỉnh rời rạc bấm `F` $\\rightarrow$ tạo mặt Quads.\n- Chọn 2 đỉnh bấm `J` $\\rightarrow$ cắt chia mặt thành 2 nửa (Vertex Connect Path).\n",
        "category": "Hard-Surface Modeling",
        "level": 2,
        "challengeRef": "task-chair-01"
      },
      {
        "id": "les-cur-mod-02-03",
        "moduleId": "cur-mod-02",
        "title": "⚙️ BÀI 2.3: SỨC MẠNH CỦA QUY TRÌNH PHI PHÁ HỦY (NON-DESTRUCTIVE MODIFIERS)",
        "readTime": "4 phút đọc",
        "summary": "- Quy trình phá hủy (Destructive): Bạn bấm `Ctrl + B` vát cạnh thành 4 phân đoạn. Dữ liệu đỉnh mới bị ghi đè trực tiếp lên mô hình. 2 ngày sau khách hàng yêu cầu \"cạnh tròn hơn một...",
        "keyShortcuts": [],
        "contentMarkdown": "# ⚙️ BÀI 2.3: SỨC MẠNH CỦA QUY TRÌNH PHI PHÁ HỦY (NON-DESTRUCTIVE MODIFIERS)\n\n---\n\n## 1. NGUYÊN LÝ \"PHI PHÁ HỦY\" (NON-DESTRUCTIVE)\n\n- **Quy trình phá hủy (Destructive):** Bạn bấm `Ctrl + B` vát cạnh thành 4 phân đoạn. Dữ liệu đỉnh mới bị ghi đè trực tiếp lên mô hình. 2 ngày sau khách hàng yêu cầu \"cạnh tròn hơn một chút\", bạn buộc phải xóa đi dựng lại từ đầu.\n- **Quy trình phi phá hủy (Non-Destructive):** Mô hình gốc của bạn chỉ là 8 đỉnh của khối lập phương đơn giản. Toàn bộ việc vát cong, nhân bản đối xứng, làm dày và cắt đục lỗ đều do các **Modifiers** tính toán trong thời gian thực. Bất kỳ lúc nào bạn cũng có thể kéo thanh trượt để thay đổi bán kính vát từ 0.01m sang 0.05m hoặc tắt bật bằng một cú click chuột!\n\n---\n\n## 2. CÁC MODIFIERS TRỤ CỘT BẮT BUỘC PHẢI THUẦN THỤC\n\n### 1. Mirror Modifier (Đối xứng gương)\n- Thay vì phải dựng cả 2 bên cơ thể hoặc 4 bánh xe ô tô, bạn chỉ cần dựng một nửa (hoặc một góc tư).\n- **Lưu ý quan trọng:** Luôn tích chọn ô **`Clipping`** để các đỉnh tại ranh giới trung tâm tự động dính chặt vào nhau và không bao giờ bị kéo tách rời hoặc xé rách!\n\n### 2. Subdivision Surface Modifier (Làm mịn bề mặt - Phím tắt `Ctrl + 1`, `Ctrl + 2`)\n- Tự động chia nhỏ từng mặt đa giác thành 4 mặt nhỏ hơn và làm cong đều theo thuật toán Catmull-Clark.\n- `Ctrl + 1`: Thêm 1 cấp độ mịn (Level 1).\n- `Ctrl + 2`: Thêm 2 cấp độ mịn (Level 2 - Chuẩn hiển thị thông dụng).\n- *Lưu ý:* Phải có các cạnh giữ nếp (**Holding Edges** hoặc **Crease**) thì các góc hộp mới giữ được dáng vuông vức.\n\n### 3. Solidify Modifier (Tạo độ dày thành vỏ)\n- Biến một bề mặt 2D mỏng như tờ giấy (ví dụ kính chắn gió ô tô, áo giáp, vỏ ấm chén) thành một khối có độ dày thực tế 2 lớp.\n\n### 4. Array Modifier (Nhân bản theo hàng loạt)\n- Tạo ra các dãy bậc thang, xích xe tăng, lan can cầu, hoặc hàng rào một cách tự động theo khoảng cách tương đối (Relative Offset) hoặc đối tượng dẫn đường (Object Offset).\n\n### 5. Boolean Modifier (Cắt đục khối hình học)\n- Thực hiện 3 phép toán hình học giữa 2 vật thể:\n  - `Difference`: Lấy vật thể B khoét thủng một lỗ trên vật thể A.\n  - `Union`: Gộp 2 vật thể dính chặt làm một khối kín nước duy nhất.\n  - `Intersect`: Chỉ giữ lại phần thể tích giao nhau giữa 2 vật thể.\n- **Thuật toán Fast vs Exact:**\n  - *Fast:* Xử lý nhanh, phù hợp cắt mặt phẳng đơn giản.\n  - *Exact:* Thuật toán toán học chính xác cao, xử lý được các góc cắt phức tạp mà không bị thủng lưới.\n\n---\n\n## 3. THỨ TỰ NGĂN XẾP CỦA MODIFIER (MODIFIER STACK ORDER)\n\nModifier được tính toán từ **Trên xuống Dưới** trong bảng thuộc tính. Thứ tự sắp xếp quyết định hoàn toàn kết quả:\n\n```text\n[Chuẩn quy trình Hard-Surface]\n1. Mirror Modifier        (Tạo đối xứng trước)\n2. Boolean Modifier       (Khoét lỗ sau khi đã có hình đối xứng)\n3. Bevel Modifier         (Vát viền các mép sau khi bị khoét)\n4. Weighted Normal        (Sửa bóng méo ở bước cuối cùng)\n```\n> Nếu bạn đảo Bevel lên trước Boolean, các vết cắt sau đó sẽ có cạnh sắc lẹm và không bao giờ được vát viền!\n",
        "category": "Hard-Surface Modeling",
        "level": 2,
        "challengeRef": "task-sci-fi-crate"
      },
      {
        "id": "les-cur-mod-02-04",
        "moduleId": "cur-mod-02",
        "title": "🛡️ BÀI 2.4: QUY TRÌNH DỰNG HÌNH HARD-SURFACE NÂNG CAO",
        "readTime": "3 phút đọc",
        "summary": "Khi dựng vũ khí, robot, phương tiện giao thông hoặc máy móc công nghiệp, nghệ sĩ 3D thường gặp 2 bài toán hóc búa:...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🛡️ BÀI 2.4: QUY TRÌNH DỰNG HÌNH HARD-SURFACE NÂNG CAO\n\n---\n\n## 1. THỬ THÁCH CỦA DỰNG HÌNH VẬT THỂ CỨNG (HARD-SURFACE)\n\nKhi dựng vũ khí, robot, phương tiện giao thông hoặc máy móc công nghiệp, nghệ sĩ 3D thường gặp 2 bài toán hóc búa:\n1. **Lỗi bóng méo (Shading Artifacts / Normal Pinching):** Khi khoét một cái lỗ tròn lên một bề mặt cong (ví dụ nòng súng trên thân máy bay), các mặt đa giác xung quanh bị vặn vẹo khiến ánh sáng phản chiếu bị gãy nát.\n2. **Quản lý mật độ lưới (Density Management):** Lưới quá nặng sẽ không thể nắn chỉnh form dáng tổng thể; lưới quá thưa thì các chi tiết cắt gọt sẽ bị gãy góc.\n\n---\n\n## 2. KỸ THUẬT BEVEL WEIGHT & MARK SHARP\n\nThay vì dùng Bevel cho toàn bộ mô hình (gây vát nhầm vào những góc cần sắc), quy trình chuyên nghiệp áp dụng phương pháp gán trọng số:\n\n1. Vào Edit Mode, chuyển sang chọn cạnh (`2`).\n2. Chọn các cạnh mong muốn vát góc.\n3. Mở thanh công cụ bên phải (Phím **`N`**) $\\rightarrow$ mục **Item** $\\rightarrow$ tăng thanh trượt **`Bevel Weight`** lên `1.0`. Cạnh được chọn sẽ chuyển sang màu xanh dương nhạt.\n4. Thêm **Bevel Modifier** vào vật thể:\n   - Đổi mục **Limit Method** từ *None* sang **`Weight`**.\n   - Bây giờ modifier chỉ vát đúng những cạnh có trọng số xanh dương, các cạnh phẳng còn lại giữ nguyên 100%!\n\n---\n\n## 3. KHỬ SẠCH LỖI BÓNG MÉO BẰNG WEIGHTED NORMAL\n\nĐể mặt cong sau khi cắt Boolean vẫn phẳng lì mà không cần thêm hàng trăm đường Loop Cut cứu hộ:\n1. Chọn vật thể, chuột phải $\\rightarrow$ chọn **`Shade Auto Smooth`** (Trong Blender 4.x / 5.x là node Modifier *Smooth by Angle*).\n2. Thêm **`Weighted Normal Modifier`** vào cuối cùng của danh sách modifier.\n3. Tích chọn ô **`Keep Sharp`**.\n4. Thuật toán sẽ tự động điều chỉnh vector pháp tuyến (Normals) của các mặt lớn để ép phẳng ánh sáng, triệt tiêu 100% các vệt nhăn nhúm!\n",
        "category": "Hard-Surface Modeling",
        "level": 2,
        "challengeRef": "task-sci-fi-crate"
      }
    ]
  },
  {
    "id": "cur-mod-03",
    "title": "Module 3: Sculpting & Organic Retopology",
    "vietnameseTitle": "Điêu khắc Sculpting & Tái cấu trúc lưới Retopology",
    "level": 3,
    "levelBadge": "Level 3: Điêu khắc",
    "category": "Organic Sculpting",
    "description": "Nắm vững cọ điêu khắc cơ bản, Dyntopo, Voxel Remesh và quy trình dựng lưới lại (Retopology) vòng mặt chuẩn cho Animation.",
    "lessons": [
      {
        "id": "les-cur-mod-03-01",
        "moduleId": "cur-mod-03",
        "title": "🗿 BÀI 3.1: NHẬP MÔN ĐIÊU KHẮC 3D (SCULPT MODE ESSENTIALS)",
        "readTime": "3 phút đọc",
        "summary": "Trong khi Edit Mode giống như người thợ mộc ghép từng mảnh gỗ bằng thước đo chính xác, thì Sculpt Mode giống như một nhà điêu khắc nặn một cục đất sét hữu cơ....",
        "keyShortcuts": [
          "G",
          "I",
          "M"
        ],
        "contentMarkdown": "# 🗿 BÀI 3.1: NHẬP MÔN ĐIÊU KHẮC 3D (SCULPT MODE ESSENTIALS)\n\n---\n\n## 1. TRIẾT LÝ CỦA SCULPT MODE\n\nTrong khi Edit Mode giống như người thợ mộc ghép từng mảnh gỗ bằng thước đo chính xác, thì **Sculpt Mode** giống như một nhà điêu khắc nặn một cục đất sét hữu cơ.\n- Bạn không nhìn thấy từng đỉnh hay cạnh.\n- Bạn dùng các cây cọ ảo (Brushes) với độ nhạy lực nhấn của bảng vẽ (Pen Tablet) để đắp thêm thịt, khoét rãnh, miết phẳng và kéo giãn hình thể.\n\n---\n\n## 2. BỘ CỌ ĐIÊU KHẮC CỐT LÕI (ESSENTIAL BRUSHES)\n\n| Tên cọ | Phím tắt nhanh | Công năng chính |\n| :--- | :--- | :--- |\n| **Grab Brush** | `G` | Dùng để định hình tỷ lệ lớn (Silhouette). Kéo cằm, kéo mũi, nắn form đầu tổng thể. |\n| **Clay Strips** | `C` | Đắp các dải đất sét dạng cơ bắp. Cọ số 1 để xây dựng khối giải phẫu (Anatomy). |\n| **Draw / Draw Sharp** | `X` / `Shift + Space -> D` | Vẽ nét lồi hoặc rạch các nếp nhăn da sâu, vết sẹo sắc lẹm. |\n| **Snake Hook** | `K` | Kéo dài các vòi xúc tu, sừng quái vật, lọn tóc từ một khối tròn. |\n| **Crease** | `Shift + C` | Khía các rãnh sâu có mép nhô cao (rất hữu ích cho khe môi, nếp mí mắt, nếp gấp vải). |\n| **Inflate** | `I` | Thổi phồng thể tích cục bộ (làm môi dày, cơ bắp căng tròn). |\n| **Smooth** | **Giữ `Shift`** | Làm mịn và xóa vết cọ gồ ghề. Bất kỳ lúc nào bạn giữ Shift với bất kỳ cọ nào, nó đều biến thành cọ Smooth! |\n\n---\n\n## 3. THAO TÁC CƠ BẢN VỚI CỌ ĐIÊU KHẮC\n\n- **Phím `F`:** Kéo chuột để thay đổi Bán kính cọ (**Brush Radius**).\n- **Phím `Shift + F`:** Kéo chuột để thay đổi Lực nhấn của cọ (**Brush Strength**).\n- **Phím `Ctrl`:** Đảo ngược hướng tác động của cọ (Đang đắp lồi thành khoét lõm vào).\n- **Mặt nạ bảo vệ (Masking - Phím `M`):** Sơn đen những vùng bạn KHÔNG muốn bị ảnh hưởng (ví dụ sơn mặt nạ bảo vệ hốc mắt khi đang nắn trán). Bấm **`Alt + M`** để xóa mặt nạ.\n- **Tính đối xứng (Symmetry - Phím `X`):** Luôn bật đối xứng trục X ở góc trên bên phải khi nặn khuôn mặt để 2 bên mắt mũi cân xứng hoàn hảo.\n",
        "category": "Organic Sculpting",
        "level": 3,
        "challengeRef": "task-sculpt-totem"
      },
      {
        "id": "les-cur-mod-03-02",
        "moduleId": "cur-mod-03",
        "title": "🧬 BÀI 3.2: DYNTOPO VS VOXEL REMESH – QUẢN LÝ MẬT ĐỘ LƯỚI ĐIÊU KHẮC",
        "readTime": "3 phút đọc",
        "summary": "Khi bạn lấy cọ Grab kéo một cục đất sét ra ngoài để làm chiếc mũi dài hoặc sừng quái vật:...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🧬 BÀI 3.2: DYNTOPO VS VOXEL REMESH – QUẢN LÝ MẬT ĐỘ LƯỚI ĐIÊU KHẮC\n\n---\n\n## 1. VẤN ĐỀ CO GIÃN ĐA GIÁC TRONG ĐIÊU KHẮC\n\nKhi bạn lấy cọ Grab kéo một cục đất sét ra ngoài để làm chiếc mũi dài hoặc sừng quái vật:\n- Các mặt đa giác ban đầu bị kéo giãn toang hoác.\n- Bạn không thể vẽ thêm lỗ mũi hay nếp nhăn chi tiết lên những mặt đa giác đã bị giãn dài ngoằng đó được nữa.\n\nĐể giải quyết vấn đề này, Blender cung cấp 2 giải pháp mạnh mẽ: **Dyntopo** và **Voxel Remesh**.\n\n---\n\n## 2. DYNTOPO (DYNAMIC TOPOLOGY - `Ctrl + D`)\n\n- **Cơ chế hoạt động:** Khi bạn quét cọ đến đâu, Blender tự động chém nhỏ các mặt đa giác tại đó trong thời gian thực. Càng zoom lại gần, lưới sinh ra càng dày và chi tiết.\n- **Ưu điểm:** Cực kỳ tự do, thoải mái kéo xúc tu, sừng hay tai từ một khối cầu mà không lo thiếu lưới.\n- **Nhược điểm:** Phá vỡ cấu trúc Quads (Dyntopo chỉ sinh ra mặt tam giác Tris) và tốn tài nguyên CPU khi lưới vượt quá 500.000 đỉnh.\n\n---\n\n## 3. VOXEL REMESH (TÁI TẠO ĐỒNG NHẤT KHỐI THỂ TÍCH - `Ctrl + R`)\n\nĐây là quy trình điêu khắc hiện đại chuẩn Hollywood được ưa chuộng nhất hiện nay:\n1. Bạn có thể ghép nhiều khối hình học riêng biệt (Ví dụ: 1 khối cầu làm đầu, 2 khối ống trụ làm tai, 1 khối hộp làm hàm).\n2. Nhấn tổ hợp phím **`Shift + R`**: Một tấm lưới mắt cáo màu xám xuất hiện trên màn hình $\\rightarrow$ kéo chuột để điều chỉnh kích thước ô voxel (Càng nhỏ càng chi tiết, khuyến nghị `0.02m` đến `0.005m`).\n3. Nhấn **`Ctrl + R`**: Blender sẽ hợp nhất toàn bộ các khối rời rạc đó thành một lớp da liền mạch duy nhất với các ô lưới vuông vức đều tăm tắp!\n\n```text\n[Quy trình nặn tượng Voxel Remesh chuẩn]:\nGiai đoạn 1: Voxel Size lớn (0.05m) -> Nắn form tỷ lệ lớn (Đầu, mắt, mũi, cằm)\nGiai đoạn 2: Voxel Size vừa (0.015m) -> Đắp khối cơ bắp, mí mắt, môi\nGiai đoạn 3: Voxel Size mịn (0.004m) -> Khía nếp nhăn, lỗ chân lông, sẹo\n```\n",
        "category": "Organic Sculpting",
        "level": 3,
        "challengeRef": "task-sculpt-totem"
      },
      {
        "id": "les-cur-mod-03-03",
        "moduleId": "cur-mod-03",
        "title": "🕸️ BÀI 3.3: RETOPOLOGY – LÀM LẠI LƯỚI NHẸ CHUẨN HOẠT HỌA",
        "readTime": "3 phút đọc",
        "summary": "Tượng điêu khắc sau khi hoàn thiện thường có từ 1 triệu đến 10 triệu đỉnh (Vertices):...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🕸️ BÀI 3.3: RETOPOLOGY – LÀM LẠI LƯỚI NHẸ CHUẨN HOẠT HỌA\n\n---\n\n## 1. TẠI SAO PHẢI LÀM LẠI LƯỚI (RETOPOLOGY)?\n\nTượng điêu khắc sau khi hoàn thiện thường có từ **1 triệu đến 10 triệu đỉnh (Vertices)**:\n- Game Engine (Unreal, Unity) sẽ sập ngay lập tức nếu nạp mô hình này.\n- Không thể gắn xương hoạt họa (Rigging) vì máy tính không thể tính toán trọng số cho hàng triệu điểm.\n- Không thể trải UV phẳng ra để vẽ hoa văn.\n\n> **Retopology** là quá trình \"bọc một lớp màng lưới nhẹ\" (từ 2.000 đến 15.000 Quads sạch) ôm sát bên ngoài bức tượng điêu khắc nặng hàng triệu đỉnh. Toàn bộ nếp nhăn vi mô của tượng nặng sau đó sẽ được nướng (**Bake**) thành bức ảnh phẳng gọi là **Normal Map**!\n\n---\n\n## 2. QUY TẮC ĐI VÒNG LẶP CHO KHUÔN MẶT (FACIAL LOOPS)\n\nKhi làm Retopology cho khuôn mặt người hoặc sinh vật, bạn bắt buộc phải tạo 4 vòng tròn khép kín:\n1. **Orbital Loop (Vòng quanh hốc mắt):** Một vành khuyên các mặt quads ôm trọn quanh mắt như cặp kính râm. Giúp mắt chớp mở tự nhiên.\n2. **Oral Loop (Vòng quanh miệng):** Vành khuyên quads ôm trọn quanh khóe môi. Giúp miệng nói, cười, chu môi mà không bị gãy góc.\n3. **Muzzle Loop (Vòng nối mũi và miệng):** Bao quanh cả mũi và miệng, chạy men theo rãnh cười (Nasolabial fold).\n4. **Mask Loop:** Chạy từ cằm qua gò má vòng lên trán.\n\n---\n\n## 3. CÔNG CỤ RETOPOLOGY CÓ SẴN TRONG BLENDER\n\n1. **Bật Snapping to Face:**\n   - Trên thanh trên cùng, bật biểu tượng nam châm (Snap).\n   - Đổi kiểu bắt dính từ *Increment* sang **`Face Project`**.\n   - Tích chọn ô **`Project Individual Elements`**.\n2. **Dùng Shrinkwrap Modifier:**\n   - Thêm modifier **Shrinkwrap** lên lưới nhẹ và chọn Target là tượng điêu khắc High-poly. Mọi đỉnh bạn vẽ ra sẽ tự động dính chặt như miếng dán decal ôm sát bề mặt tượng!\n3. **Công cụ Poly Build Tool:**\n   - Cho phép bạn chỉ việc click chuột để sinh mặt Quads mới và kéo các cạnh dính liền nhau cực kỳ êm ái.\n",
        "category": "Organic Sculpting",
        "level": 3,
        "challengeRef": "task-sculpt-totem"
      }
    ]
  },
  {
    "id": "cur-mod-04",
    "title": "Module 4: UV Unwrapping & PBR Shading Nodes",
    "vietnameseTitle": "Trải UV & Chất liệu Shading PBR",
    "level": 4,
    "levelBadge": "Level 4: Vật liệu PBR",
    "category": "Shading & Texturing",
    "description": "Nguyên lý trải UV không biến dạng, vật lý PBR với Principled BSDF, làm chủ Shader Nodes thủ tục và nướng Texture Baking.",
    "lessons": [
      {
        "id": "les-cur-mod-04-01",
        "moduleId": "cur-mod-04",
        "title": "🗺️ BÀI 4.1: NGUYÊN LÝ TRẢI LƯỚI UV UNWRAPPING CHUẨN XÁC",
        "readTime": "3 phút đọc",
        "summary": "Hãy tưởng tượng bạn có một chiếc hộp quà hình lập phương bằng bìa carton:...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🗺️ BÀI 4.1: NGUYÊN LÝ TRẢI LƯỚI UV UNWRAPPING CHUẨN XÁC\n\n---\n\n## 1. UV UNWRAPPING LÀ GÌ?\n\nHãy tưởng tượng bạn có một chiếc hộp quà hình lập phương bằng bìa carton:\n- Muốn in họa tiết hoa văn phẳng từ máy in 2D lên các mặt của chiếc hộp, bạn phải lấy kéo rạch các cạnh và **trải phẳng chiếc hộp ra một mặt phẳng 2 chiều**.\n- Trục tọa độ 3D là $X, Y, Z$. Trục tọa độ 2D của bức ảnh hoa văn được gọi là **$U$ và $V$** (chữ cái đứng trước $X, Y, Z$ trong bảng chữ cái). Quá trình trải lưới này được gọi là **UV Unwrapping**.\n\n---\n\n## 2. QUY TRÌNH TRẢI UV 4 BƯỚC CHUẨN CÔNG NGHIỆP\n\n```mermaid\nflowchart LR\n    B1[\"Bước 1: Rạch đường may<br>(Mark Seam - Ctrl + E)\"] --> B2[\"Bước 2: Mở trải lưới phẳng<br>(Unwrap - Phím U)\"]\n    B2 --> B3[\"Bước 3: Kiểm tra độ méo<br>(UV Checkerboard)\"]\n    B3 --> B4[\"Bước 4: Sắp xếp đảo UV<br>(Pack Islands)\"]\n```\n\n### Bước 1: Rạch đường may (Mark Seam)\n- Vào Edit Mode, chuyển sang chọn cạnh (`2`).\n- Chọn những cạnh nằm ở góc khuất thị giác (mặt dưới đáy, mặt trong cánh tay, phía sau gáy).\n- Nhấn tổ hợp phím **`Ctrl + E`** $\\rightarrow$ chọn **`Mark Seam`** (Cạnh sẽ chuyển sang viền màu đỏ tươi rực).\n\n### Bước 2: Mở trải phẳng (Unwrap)\n- Bấm phím **`A`** để chọn toàn bộ lưới.\n- Bấm phím **`U`** $\\rightarrow$ chọn **`Unwrap`**. Mở tab *UV Editing* bạn sẽ thấy các mảng lưới phẳng (gọi là **UV Islands**) nằm gọn gàng trong ô vuông tọa độ $(0, 0)$ đến $(1, 1)$.\n\n### Bước 3: Kiểm tra độ méo bằng UV Checker\n- Gán một bức ảnh caro ô vuông (UV Checker Grid) lên vật thể.\n- Nếu các ô vuông trên vật thể bị méo thành hình bình hành hoặc hình thang, nghĩa là vết rạch Seam chưa đủ để giải phóng sức căng của bề mặt $\\rightarrow$ Cần rạch thêm đường Seam phụ.\n\n### Bước 4: Sắp xếp đảo UV (Pack Islands)\n- Trong cửa sổ UV Editor, bấm **`A`** chọn toàn bộ đảo UV.\n- Vào menu **UV** $\\rightarrow$ chọn **`Pack Islands`** (Phím tắt `Ctrl + P`).\n- Đặt thông số **Margin** khoảng `0.01` đến `0.02` để các đảo UV cách nhau một khoảng an toàn (tránh tình trạng màu của đảo này bị lem sang đảo kia khi giảm độ phân giải texture).\n\n---\n\n## 3. KHÁI NIỆM MẬT ĐỘ ĐIỂM ẢNH (TEXEL DENSITY)\n\n- **Texel Density** là tỷ lệ giữa kích thước điểm ảnh của texture (Pixels) so với kích thước thật của vật thể trong không gian 3D (Meters/Centimeters).\n- **Quy tắc vàng:** Các bộ phận quan trọng cần rõ nét (ví dụ khuôn mặt, logo trước ngực) phải có diện tích đảo UV to hơn; các bộ phận khuất (đế giày, nội tạng bên trong) thu nhỏ đảo UV lại để tiết kiệm bộ nhớ VRAM của card đồ họa.\n",
        "category": "Shading & Texturing",
        "level": 4,
        "challengeRef": "task-uv-chest"
      },
      {
        "id": "les-cur-mod-04-02",
        "moduleId": "cur-mod-04",
        "title": "🎨 BÀI 4.2: NGUYÊN LÝ VẬT LÝ PBR & LÀM CHỦ PRINCIPLED BSDF",
        "readTime": "4 phút đọc",
        "summary": "PBR là tiêu chuẩn mô phỏng quang học dựa trên các định luật vật lý thực tế về sự tán xạ và phản xạ của ánh sáng khi va chạm vào bề mặt vật chất:...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🎨 BÀI 4.2: NGUYÊN LÝ VẬT LÝ PBR & LÀM CHỦ PRINCIPLED BSDF\n\n---\n\n## 1. PBR (PHYSICALLY BASED RENDERING) LÀ GÌ?\n\n**PBR** là tiêu chuẩn mô phỏng quang học dựa trên các định luật vật lý thực tế về sự tán xạ và phản xạ của ánh sáng khi va chạm vào bề mặt vật chất:\n- Năng lượng ánh sáng phản xạ không bao giờ được lớn hơn năng lượng ánh sáng chiếu tới (Định luật bảo toàn năng lượng).\n- Mọi vật liệu trong tự nhiên đều có độ phản chiếu nhất định dưới góc nhìn nghiêng (Hiệu ứng **Fresnel**).\n\nTrong Blender, **Principled BSDF** (dựa trên mô hình Disney Principled) là shader vạn năng mô phỏng được 99% các loại vật chất: từ bê tông thô, gỗ mộc, vải len đến vàng ròng bóng bẩy và kính thủy tinh trong suốt.\n\n---\n\n## 2. Ý NGHĨA CỦA CÁC THÔNG SỐ CỐT LÕI TRONG PRINCIPLED BSDF\n\n| Kênh vật liệu | Bản chất vật lý | Quy tắc thiết lập chuẩn |\n| :--- | :--- | :--- |\n| **Base Color** | Màu nền hấp thụ (Albedo) không chứa bóng đổ | Gỗ, da, sơn. Với kim loại thuần, Base Color chính là màu phản chiếu (Vàng óng, Đồng đỏ). |\n| **Metallic** | Tính dẫn điện / Kim loại hóa | **Luôn là 0 hoặc 1!** Kim loại thuần (Vàng, Sắt, Nhôm) = `1.0`. Chất điện môi (Gỗ, Nhựa, Đất, Đá, Da) = `0.0`. Chỉ dùng giá trị lơ lửng `0.5` khi mô phỏng lớp rỉ sét hoặc bụi bẩn phủ mờ trên bề mặt kim loại. |\n| **Roughness** | Độ nhám tế vi ở cấp độ hiển vi | Càng tiến về `0.0`: Bề mặt siêu nhẵn bóng như gương hoặc kính pha lê. Càng tiến về `1.0`: Bề mặt siêu nhám mờ như phấn bảng, cao su, tường vôi. |\n| **IOR (Index of Refraction)** | Chiết suất khúc xạ ánh sáng | Nước: `1.333`, Kính thủy tinh: `1.450` đến `1.520`, Kim cương: `2.417`. |\n| **Transmission** | Độ truyền quang xuyên thấu | Biến vật thể thành thủy tinh trong suốt hoặc chất lỏng. Kính cửa sổ = `1.0`. |\n| **Subsurface (SSS)** | Tán xạ dưới bề mặt | Ánh sáng đi xuyên vào trong bề mặt rồi mới hắt ngược ra (Rất quan trọng khi mô phỏng da người, sáp nến, ngọc bích, sữa). |\n| **Emission** | Độ tự phát sáng | Biến vật thể thành nguồn sáng neon, màn hình tivi, dung nham núi lửa. |\n\n---\n\n## 3. BẢN ĐỒ PHÁP TUYẾN: NORMAL MAP VS BUMP MAP\n\nLàm thế nào để một mô hình chỉ có 500 mặt đa giác phẳng lì trông như có hàng ngàn con ốc vít và vết xước sâu lồi lõm?\n\n- **Bump Map (Bức ảnh đen trắng):** Màu Trắng đẩy nhô lên, màu Đen thụt sâu xuống, màu Xám giữ nguyên cao độ. Tính toán chậm hơn nhưng dễ tạo bằng thủ tục Procedural.\n- **Normal Map (Bức ảnh màu tím xanh RGB):**\n  - Kênh Đỏ ($R$): Độ dốc trục $X$.\n  - Kênh Xanh lá ($G$): Độ dốc trục $Y$.\n  - Kênh Xanh dương ($B$): Hướng pháp tuyến trục $Z$.\n  - Cho kết quả ánh sáng đổi góc cực kỳ chính xác và siêu nhẹ, là chuẩn mực bắt buộc trong ngành công nghiệp game và phim ảnh!\n",
        "category": "Shading & Texturing",
        "level": 4,
        "challengeRef": "task-uv-chest"
      },
      {
        "id": "les-cur-mod-04-03",
        "moduleId": "cur-mod-04",
        "title": "🧪 BÀI 4.3: LÀM CHỦ SHADER EDITOR & VẬT LIỆU THỦ TỤC (PROCEDURAL NODES)",
        "readTime": "3 phút đọc",
        "summary": "Trước khi bắt đầu làm shader, hãy vào Edit $\\rightarrow$ Preferences $\\rightarrow$ Add-ons $\\rightarrow$ gõ tìm kiếm `Node Wrangler` và tích chọn bật nó lên (Addon miễn phí có sẵn ...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🧪 BÀI 4.3: LÀM CHỦ SHADER EDITOR & VẬT LIỆU THỦ TỤC (PROCEDURAL NODES)\n\n---\n\n## 1. VŨ KHÍ BÍ MẬT: ADDON NODE WRANGLER\n\nTrước khi bắt đầu làm shader, hãy vào **Edit $\\rightarrow$ Preferences $\\rightarrow$ Add-ons** $\\rightarrow$ gõ tìm kiếm **`Node Wrangler`** và tích chọn bật nó lên (Addon miễn phí có sẵn 100% trong Blender).\n\n### Các phím tắt siêu tốc của Node Wrangler:\n- **`Ctrl + Shift + Click` lên bất kỳ node nào:** Lập tức soi thử kết quả đầu ra của node đó lên mô hình (Viewer Node).\n- **`Ctrl + T` (Khi đang chọn một node Texture hoặc Principled BSDF):** Tự động thêm một cụm 3 node gồm *Texture Coordinate* + *Mapping* + *Image Texture*.\n- **`Shift + Ctrl + T` (Bấm vào Principled BSDF):** Mở cửa sổ chọn file $\\rightarrow$ quét chọn cả 5 file ảnh tải về (BaseColor, Roughness, Metallic, Normal, Height) $\\rightarrow$ Blender sẽ tự động nối dây vào đúng 5 cổng tương ứng trong 0.5 giây!\n\n---\n\n## 2. BỘ CÁC NODE THỦ TỤC QUAN TRỌNG NHẤT\n\n1. **Noise Texture (Node tạo nhiễu ngẫu nhiên):**\n   - Tạo ra các vệt mây, đốm bẩn, bề mặt gồ ghề của đá hoặc rỉ sét.\n   - Thông số: *Scale* (Độ to nhỏ), *Detail* (Độ phức tạp gồ ghề), *Roughness* (Độ ráp).\n2. **Voronoi Texture (Node tạo hoa văn tế bào):**\n   - Tạo vảy da cá sấu, mai rùa, hoa văn nứt nẻ bùn đất khô, hoặc đốm nước lấp lánh đáy hồ bơi.\n3. **ColorRamp (Node lọc dải màu & tăng tương phản):**\n   - Đóng vai trò như bộ Curves / Levels trong Photoshop.\n   - Nhận tín hiệu đen trắng của Noise Texture và đổi thành 2 màu bất kỳ (ví dụ Màu nâu gỗ đậm và Nâu gỗ nhạt), hoặc kéo 2 chốt đen trắng sát vào nhau để tăng độ sắc nét của vết rỉ sét.\n4. **Bump Node:**\n   - Đổi tín hiệu độ cao đen trắng từ *Noise Texture / ColorRamp* sang vector pháp tuyến để cắm vào cổng **Normal** của Principled BSDF.\n\n---\n\n## 3. CÔNG THỨC DỰNG VẬT LIỆU GỖ CŨ PHONG HÓA BẰNG THỦ TỤC\n\n```text\n[Texture Coordinate: Object] \n          │\n          ▼\n   [Mapping Node] (Kéo dài trục Z x10 để tạo thớ gỗ dọc)\n          │\n          ▼\n [Wave Texture / Noise] \n          │\n    ┌─────┴───────────────┐\n    ▼                     ▼\n[ColorRamp: Màu gỗ]   [ColorRamp: Độ bóng]\n    │                     │\n    ▼ (Cắm Base Color)    ▼ (Cắm Roughness)\n       [ PRINCIPLED BSDF SHADER ]\n```\n> Nhờ cách làm này, bạn không cần dùng bất kỳ bức ảnh tải từ internet nào mà vẫn có một bề mặt gỗ mộc tự nhiên vô tận, không bao giờ bị lộ đường nối lặp lại (No seam repetitions)!\n",
        "category": "Shading & Texturing",
        "level": 4,
        "challengeRef": "task-uv-chest"
      },
      {
        "id": "les-cur-mod-04-04",
        "moduleId": "cur-mod-04",
        "title": "🖌️ BÀI 4.4: TEXTURE PAINTING & QUY TRÌNH NƯỚNG MAPS (BAKING)",
        "readTime": "3 phút đọc",
        "summary": "Ngoài việc dùng vật liệu ảnh có sẵn hoặc thủ tục, bạn có thể tự cầm bút vẽ tay (Hand-painted) trực tiếp lên bề mặt vật thể trong tab Texture Paint:...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🖌️ BÀI 4.4: TEXTURE PAINTING & QUY TRÌNH NƯỚNG MAPS (BAKING)\n\n---\n\n## 1. VẼ TRỰC TIẾP LÊN MÔ HÌNH 3D (TEXTURE PAINT)\n\nNgoài việc dùng vật liệu ảnh có sẵn hoặc thủ tục, bạn có thể tự cầm bút vẽ tay (Hand-painted) trực tiếp lên bề mặt vật thể trong tab **Texture Paint**:\n- Tạo một Image Texture trống với độ phân giải `2048 x 2048` hoặc `4096 x 4096`.\n- Chọn các kiểu cọ (Brush): Soft Falloff để tán mịn, hoặc Hard Alpha để vẽ hoa văn vảy rồng, lông vũ.\n- **Lưu ý sống còn:** Bức ảnh vẽ tay trong Blender **KHÔNG tự động lưu vào ổ đĩa** khi bạn bấm `Ctrl + S` lưu file blend! Bạn bắt buộc phải vào tab **Image Editor** $\\rightarrow$ bấm **`Image`** $\\rightarrow$ **`Save As`** (hoặc phím tắt `Alt + S`) để lưu bức ảnh ra file `.png`, nếu không khi tắt máy toàn bộ tác phẩm vẽ tay sẽ biến mất vĩnh viễn!\n\n---\n\n## 2. NƯỚNG BẢN ĐỒ (TEXTURE BAKING) – BÍ MẬT CỦA ĐỒ HỌA GAME\n\n**Texture Baking** là quy trình chuyển đổi toàn bộ tính toán ánh sáng, bóng đổ, màu sắc phức tạp hoặc chi tiết bề mặt từ mô hình nặng (High-poly triệu đỉnh) sang một bức ảnh phẳng để dán lên mô hình nhẹ (Low-poly vài ngàn đỉnh).\n\n### 2 Bản đồ Baking bắt buộc trong sản xuất Game:\n1. **Normal Map Baking (High to Low poly):**\n   - Đặt mô hình Low-poly và High-poly nằm chồng khít lên nhau ở cùng một tọa độ $(0, 0, 0)$.\n   - Trong bảng Render chọn cỗ máy **Cycles** (Chỉ Cycles mới có tính năng Bake).\n   - Chọn mục **Bake** $\\rightarrow$ chọn **Bake Type = Normal**.\n   - Tích chọn ô **Selected to Active** (Chọn High-poly trước, giữ Shift chọn Low-poly sau).\n   - Bấm nút **Bake** $\\rightarrow$ Bạn sẽ thu được một bức ảnh màu tím xanh lưu trọn vẹn từng vết sẹo và ốc vít của tượng High-poly!\n2. **Ambient Occlusion (AO Map):**\n   - Nướng bóng đổ tiếp xúc ở các khe rãnh kẽ hở giúp vật thể trông đậm đà, chắc chắn và có chiều sâu thị giác ngay cả khi không bật đèn chiếu sáng.\n",
        "category": "Shading & Texturing",
        "level": 4,
        "challengeRef": "task-uv-chest"
      }
    ]
  },
  {
    "id": "cur-mod-05",
    "title": "Module 5: Lighting & Cinematic Rendering",
    "vietnameseTitle": "Ánh sáng & Render Điện ảnh (Cycles vs EEVEE Next)",
    "level": 5,
    "levelBadge": "Level 5: Ánh sáng & Render",
    "category": "Lighting & Rendering",
    "description": "Thiết lập ánh sáng 3 điểm kinh điển, so sánh ray-tracing Cycles và EEVEE Next, điều chỉnh Camera DOF và hậu kỳ Compositor.",
    "lessons": [
      {
        "id": "les-cur-mod-05-01",
        "moduleId": "cur-mod-05",
        "title": "💡 BÀI 5.1: NGHỆ THUẬT CHIẾU SÁNG ĐIỆN ẢNH (CINEMATIC LIGHTING)",
        "readTime": "3 phút đọc",
        "summary": "Một mô hình 3D hoàn hảo đến mấy nhưng đặt trong một môi trường ánh sáng phẳng lì (Flat Lighting) cũng sẽ trông như một mẩu nhựa rẻ tiền....",
        "keyShortcuts": [],
        "contentMarkdown": "# 💡 BÀI 5.1: NGHỆ THUẬT CHIẾU SÁNG ĐIỆN ẢNH (CINEMATIC LIGHTING)\n\n---\n\n## 1. TẠI SAO ÁNH SÁNG LÀ LINH HỒN CỦA BỨC ẢNH 3D?\n\nMột mô hình 3D hoàn hảo đến mấy nhưng đặt trong một môi trường ánh sáng phẳng lì (Flat Lighting) cũng sẽ trông như một mẩu nhựa rẻ tiền.\nNgược lại, một mô hình khối hộp đơn giản nếu được đặt trong một kịch bản ánh sáng giàu tương phản, có độ chuyển bóng mượt mà và nhiệt độ màu tinh tế sẽ tạo cảm giác như một cảnh quay trong phim điện ảnh Hollywood.\n\n---\n\n## 2. KỸ THUẬT 3 NGUỒN SÁNG KINH ĐIỂN (THREE-POINT LIGHTING)\n\n```text\n               [ Rim Light ] (Phía sau lưng, công suất cao, tạo viền sáng)\n                     │\n                     ▼\n              [ CHỦ THỂ 3D ]\n               ▲           ▲\n              ╱             ╲\n             ╱               ╲\n[ Key Light ]                 [ Fill Light ]\n(Đèn chính, góc 45°,          (Đèn phụ, góc -45°,\n công suất 100%, tạo khối)     công suất 20-40%, khử bóng gắt)\n```\n\n1. **Key Light (Đèn chính):**\n   - Đặt chếch 45 độ so với trục nhìn của Camera và cao hơn đầu chủ thể.\n   - Là nguồn sáng mạnh nhất, quyết định hướng bóng đổ chính và định hình thể tích khối (Form).\n2. **Fill Light (Đèn phụ bù bóng):**\n   - Đặt ở phía đối diện của Key Light.\n   - Công suất chỉ bằng **20% đến 40%** so với Key Light.\n   - Nhiệm vụ: Nâng nhẹ các vùng tối sâu ở nửa bên kia khuôn mặt để không bị đen đặc mất chi tiết, nhưng vẫn giữ được độ tương phản.\n3. **Rim Light / Back Light (Đèn ven / Đèn lưng):**\n   - Đặt phía sau lưng chủ thể, chiếu chếch về phía Camera.\n   - Nhiệm vụ cực kỳ quan trọng: Tạo một đường viền sáng mảnh sắc nét quanh mép tóc, bờ vai hoặc góc cạnh của sản phẩm, giúp tách rời hoàn toàn chủ thể ra khỏi nền tối phía sau!\n\n---\n\n## 3. TƯƠNG PHẢN NHIỆT ĐỘ MÀU (COLOR TEMPERATURE CONTRAST)\n\nQuy tắc phối màu của các đạo diễn hình ảnh:\n- **Nguyên lý tương phản nóng - lạnh:**\n  - Nếu Key Light có tông màu **Vàng cam ấm áp** (3200K - Giả lập ánh nắng hoàng hôn hoặc đèn vonfram), hãy để Fill Light có tông màu **Xanh dương lạnh mờ** (6500K - Giả lập bầu trời xanh phản chiếu).\n  - Ngược lại, nếu Key Light là ánh trăng xanh lạnh, hãy dùng Rim Light là ngọn lửa vàng cam để tạo điểm nhấn thị giác bùng nổ!\n\n---\n\n## 4. KÍCH THƯỚC NGUỒN SÁNG & ĐỘ MỀM CỦA BÓNG ĐỔ (SOFT SHADOWS)\n\nTrong loại đèn **Area Light**:\n- **Kích thước nhỏ (Size = 0.1m):** Bóng đổ cực kỳ sắc nhọn, gắt gỏng (như ánh nắng trưa hè gay gắt).\n- **Kích thước lớn (Size = 2.0m - 5.0m):** Đóng vai trò như một chiếc hộp tản sáng (Softbox) khổng lồ trong studio. Bóng đổ sẽ nhòe mờ cực kỳ êm ái, da nhân vật mịn màng không tì vết.\n",
        "category": "Lighting & Rendering",
        "level": 5,
        "challengeRef": "task-studio-lamp"
      },
      {
        "id": "les-cur-mod-05-02",
        "moduleId": "cur-mod-05",
        "title": "⚡ BÀI 5.2: SO SÁNH CYCLES (RAY-TRACING) VS EEVEE NEXT (REAL-TIME)",
        "readTime": "3 phút đọc",
        "summary": "Để Cycles render nhanh như chớp mà không bị sạn hạt (Noise):...",
        "keyShortcuts": [],
        "contentMarkdown": "# ⚡ BÀI 5.2: SO SÁNH CYCLES (RAY-TRACING) VS EEVEE NEXT (REAL-TIME)\n\n---\n\n## 1. BẢN CHẤT CÔNG NGHỆ CỦA 2 CỖ MÁY RENDER\n\n| Tiêu chí | Cycles Render Engine | EEVEE Next (Blender 4.x / 5.x) |\n| :--- | :--- | :--- |\n| **Cơ chế hoạt động** | **Path Tracing (Dò tia vật lý)**. Bắn hàng triệu hạt photon ánh sáng nảy bật qua lại trong không gian thật. | **Rasterization (Quét mảng điểm ảnh)** kết hợp bộ đổ bóng thời gian thực trên nền Vulkan / Metal. |\n| **Độ chân thực quang học** | Chân thực 100% về vật lý: Khúc xạ kính, tụ quang (Caustics), phản xạ đa tầng (Global Illumination). | Rất cao, giả lập xấp xỉ bằng Screen-Space Effects và Horizon-Based Ambient Occlusion. |\n| **Thời gian Render 1 khung hình**| Từ vài giây đến vài phút tùy cấu hình card đồ họa GPU. | **Từ vài mili-giây đến vài giây** (Tốc độ gần như tức thì, đạt 60 FPS trong Viewport). |\n| **Trường hợp sử dụng** | Ảnh tĩnh quảng cáo sản phẩm, phim kỹ xảo điện ảnh photorealistic, nội thất kiến trúc sang trọng. | Làm phim hoạt hình Stylized, Motion Graphics, kiểm tra bố cục nhanh, Render chuỗi chuyển động dài hàng ngàn frame. |\n\n---\n\n## 2. TỐI ƯU HÓA CYCLES RENDER (GIẢM 80% THỜI GIAN CHỜ)\n\nĐể Cycles render nhanh như chớp mà không bị sạn hạt (Noise):\n1. **Bật GPU Compute:** Vào *Preferences $\\rightarrow$ System* $\\rightarrow$ chọn tab **CUDA / OptiX** (cho card NVIDIA) hoặc **HIP** (cho card AMD). Trong bảng Render Engine, đổi mục Device từ *CPU* sang **`GPU Compute`**.\n2. **Đừng để Samples quá cao:**\n   - Ngày xưa phải để 1000 - 2000 samples.\n   - Với Blender hiện đại có bộ lọc AI khử nhiễu **Denoise (OptiX hoặc OpenImageDenoise)**, bạn chỉ cần đặt **`Max Samples = 128 đến 256`** và Noise Threshold là `0.01` là bức ảnh đã trong veo, sạch bóng sạn hạt!\n3. **Giảm số lần nảy bật của tia sáng (Light Paths):**\n   - Đặt Total Bounces khoảng `6 - 8`.\n   - Giảm Clamping Indirect xuống `10.0` để triệt tiêu hoàn toàn hiện tượng đốm sáng trắng nhấp nháy (Fireflies).\n\n---\n\n## 3. TÍNH NĂNG ĐỘT PHÁ: LIGHT LINKING\n\nTừ phiên bản Blender 4.x trở đi, tính năng **Light Linking** cho phép bạn:\n- Chỉ định chiếc đèn viền Rim Light CHỈ chiếu sáng lên người nhân vật, mà KHÔNG làm sáng bức tường đen phía sau lưng!\n- Giúp các nghệ sĩ kiểm soát ánh sáng cục bộ chính xác như trường quay điện ảnh Hollywood mà không cần dùng đến các tấm cản sáng vật lý rườm rà.\n",
        "category": "Lighting & Rendering",
        "level": 5,
        "challengeRef": "task-studio-lamp"
      },
      {
        "id": "les-cur-mod-05-03",
        "moduleId": "cur-mod-05",
        "title": "🎬 BÀI 5.3: BẬC THẦY MÁY ẢNH (CAMERA) & BỐ CỤC THỊ GIÁC",
        "readTime": "3 phút đọc",
        "summary": "Ống kính Camera quyết định hoàn toàn cảm xúc thị giác của bức ảnh:...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🎬 BÀI 5.3: BẬC THẦY MÁY ẢNH (CAMERA) & BỐ CỤC THỊ GIÁC\n\n---\n\n## 1. LỰA CHỌN TIÊU CỰ ỐNG KÍNH (FOCAL LENGTH)\n\nỐng kính Camera quyết định hoàn toàn cảm xúc thị giác của bức ảnh:\n\n- **16mm – 24mm (Góc siêu rộng - Wide Angle):**\n  - Kéo dãn không gian, phóng đại các vật thể ở gần và đẩy vật thể ở xa ra vô tận.\n  - Phù hợp: Cảnh kiến trúc nội thất chật hẹp, cảnh hành động cháy nổ kịch tính hoặc nhân vật ngước nhìn quái vật khổng lồ.\n- **50mm (Góc nhìn tự nhiên - Standard):**\n  - Gần giống với tầm mắt quan sát thực tế của con người, không bóp méo phối cảnh.\n- **85mm – 135mm (Ống kính Tele):**\n  - Nén phối cảnh (Perspective Compression): Kéo các lớp hậu cảnh lại gần chủ thể, làm phẳng khuôn mặt giúp chân dung thanh thoát và sang trọng.\n  - Tiêu chuẩn vàng để chụp ảnh sản phẩm (xe hơi, đồng hồ, điện thoại) và chân dung nhân vật.\n\n---\n\n## 2. HIỆU ỨNG XÓA PHÔNG MỜ NGHỆ THUẬT (DEPTH OF FIELD - DOF)\n\nĐể bức ảnh có chiều sâu và hút mắt người xem vào đúng chi tiết đắt giá:\n1. Chọn Camera $\\rightarrow$ vào bảng thuộc tính Camera $\\rightarrow$ tích chọn ô **`Depth of Field`**.\n2. Tại mục **Focus on Object**: Bấm bút hút chọn thẳng vào con mắt của nhân vật hoặc logo sản phẩm.\n3. Chỉnh thông số khẩu độ **F-Stop**:\n   - Càng nhỏ (ví dụ `f/1.4`, `f/2.8`): Hậu cảnh càng nhòe mờ dữ dội, tạo ra các vòng tròn lấp lánh (Bokeh).\n   - Lớn hơn (ví dụ `f/8.0`, `f/11.0`): Toàn bộ từ tiền cảnh đến hậu cảnh đều rõ nét.\n\n---\n\n## 3. CÁC ĐƯỜNG DẪN BỐ CỤC CÓ SẴN (COMPOSITION GUIDES)\n\nVào bảng Camera $\\rightarrow$ mục **Viewport Display** $\\rightarrow$ mở rộng mục **`Composition Guides`** và tích chọn:\n- **Rule of Thirds (Quy tắc 1/3):** Đặt điểm nhấn (đôi mắt, tâm sản phẩm) vào 1 trong 4 điểm giao nhau của lưới 9 ô.\n- **Golden Ratio (Tỉ lệ vàng / Đường xoắn ốc Fibonacci):** Dẫn dắt ánh mắt người xem lượn từ vùng trống đến điểm tập trung cao trào.\n- **Center:** Căn giữa đối xứng hoàn hảo cho các poster mang phong cách trang trọng (như phim của đạo diễn Wes Anderson).\n",
        "category": "Lighting & Rendering",
        "level": 5,
        "challengeRef": "task-studio-lamp"
      },
      {
        "id": "les-cur-mod-05-04",
        "moduleId": "cur-mod-05",
        "title": "🎞️ BÀI 5.4: HẬU KỲ CHUYÊN NGHIỆP VỚI COMPOSITOR",
        "readTime": "3 phút đọc",
        "summary": "Sau khi bấm phím `F12` để render, bạn không cần phải xuất ảnh sang Photoshop hay After Effects để chỉnh màu, vì ngay bên trong Blender đã tích hợp sẵn một xưởng hậu kỳ chuyên nghiệ...",
        "keyShortcuts": [],
        "contentMarkdown": "# 🎞️ BÀI 5.4: HẬU KỲ CHUYÊN NGHIỆP VỚI COMPOSITOR\n\n---\n\n## 1. COMPOSITOR LÀ GÌ?\n\nSau khi bấm phím **`F12`** để render, bạn không cần phải xuất ảnh sang Photoshop hay After Effects để chỉnh màu, vì ngay bên trong Blender đã tích hợp sẵn một xưởng hậu kỳ chuyên nghiệp dựa trên Node mang tên **Compositor**:\n- Bật tab **Compositing** $\\rightarrow$ tích chọn ô **`Use Nodes`**.\n- Bạn sẽ thấy node khởi đầu là **Render Layers** (kết quả ảnh render) và node kết thúc là **Composite** (đầu ra cuối cùng).\n\n---\n\n## 2. CÁC NODE HẬU KỲ \"ĂN TIỀN\" NHẤT\n\n1. **Glare Node (Tạo đốm sáng lóe & Bloom):**\n   - Đổi kiểu từ *Streaks* sang **`Fog Glow`**.\n   - Biến các nguồn đèn neon, ngọn lửa hay điểm phản chiếu chói lọi của kim loại thành các quầng sáng mờ ảo lung linh.\n2. **Color Balance (Chỉnh tông màu điện ảnh - Color Grading):**\n   - Dùng mô hình bánh xe màu kinh điển:\n     - *Lift (Vùng tối - Shadows):* Kéo nhẹ về phía màu Xanh dương lạnh.\n     - *Gamma (Vùng trung gian - Midtones):* Giữ trung tính hoặc hơi ấm.\n     - *Gain (Vùng sáng chói - Highlights):* Kéo nhẹ về phía màu Cam ấm.\n   - Bức ảnh render lập tức mang phong cách điện ảnh Hollywood (Teal & Orange look) ngay trong tích tắc!\n3. **Lens Distortion (Mô phỏng ống kính quang học thật):**\n   - Đặt thông số *Dispersion = 0.01 đến 0.02*: Tạo viền tán sắc cầu vồng nhẹ (Chromatic Aberration) ở các góc mép ảnh, đánh lừa não bộ rằng bức ảnh được chụp từ một chiếc máy ảnh cơ quang học thực tế chứ không phải ảnh đồ họa 3D vô hồn!\n4. **Mist Pass (Tạo khói sương mù chiều sâu):**\n   - Trong bảng View Layer, tích chọn kênh **`Mist`**.\n   - Cắm cổng Mist từ Render Layers vào node Mix để hòa trộn một lớp sương mù mờ ảo theo độ sâu khoảng cách z-depth.\n",
        "category": "Lighting & Rendering",
        "level": 5,
        "challengeRef": "task-studio-lamp"
      }
    ]
  },
  {
    "id": "cur-mod-06",
    "title": "Module 6: Rigging Armatures & Animation",
    "vietnameseTitle": "Gắn xương Armatures & Diễn hoạt Animation",
    "level": 6,
    "levelBadge": "Level 6: Rigging & Diễn hoạt",
    "category": "Rigging & Animation",
    "description": "Hệ thống xương phân cấp, cấu hình động học ngược Inverse Kinematics (IK), sơn trọng số Weight Painting và 12 nguyên lý hoạt hình.",
    "lessons": [
      {
        "id": "les-cur-mod-06-01",
        "moduleId": "cur-mod-06",
        "title": "🏃 BÀI 6.1: NỀN TẢNG HOẠT HỌA & 12 NGUYÊN TẮC ANIMATION",
        "readTime": "3 phút đọc",
        "summary": "Để một vật thể 3D chuyển động:...",
        "keyShortcuts": [
          "I"
        ],
        "contentMarkdown": "# 🏃 BÀI 6.1: NỀN TẢNG HOẠT HỌA & 12 NGUYÊN TẮC ANIMATION\n\n---\n\n## 1. NGUYÊN LÝ KHUNG HÌNH KHÓA (KEYFRAMING)\n\nĐể một vật thể 3D chuyển động:\n1. Bạn đặt vật thể ở vị trí $A$ tại khung hình thứ 1 $\\rightarrow$ Bấm phím **`I`** (Insert Keyframe) $\\rightarrow$ Chọn **`Location`**. Một chấm thoi màu vàng sẽ xuất hiện trên Timeline.\n2. Di chuyển thanh trượt Timeline đến khung hình thứ 24 (tương ứng 1 giây sau với chuẩn 24 FPS).\n3. Di chuyển vật thể sang vị trí $B$ $\\rightarrow$ Bấm phím **`I`** $\\rightarrow$ Chọn **`Location`**.\n4. Bấm phím cách **`Space`**: Blender sẽ tự động tính toán toàn bộ 22 khung hình ở giữa (In-between frames) để vật thể lướt êm ái từ $A$ sang $B$!\n\n---\n\n## 2. LÀM CHỦ GRAPH EDITOR & GIA TỐC CHUYỂN ĐỘNG\n\nChuyển động tuyến tính thẳng đơ (Linear) trong máy tính trông rất đơ và giả tạo. Trong thế giới thực, mọi vật chất đều cần có thời gian tăng tốc và hãm phanh:\n- Chuyển sang cửa sổ **Graph Editor**.\n- Bạn sẽ nhìn thấy đường cong chuyển động dạng Bezier.\n- Nhấn phím **`T`** để đổi kiểu nội suy (Interpolation):\n  - `Bezier` (Mặc định): Tự động mượt mà ở 2 đầu (**Ease In / Ease Out**).\n  - `Linear`: Đều đặn như chuyển động của kim giây đồng hồ hoặc dây chuyền nhà máy.\n  - `Constant`: Nhảy cóc giật tức thì (Hữu ích khi làm hiệu ứng hoạt hình tĩnh vật Stop-motion).\n  - `Bounce / Elastic`: Tự động nảy bưng bưng như quả bóng cao su rơi xuống đất!\n\n---\n\n## 3. CÁC NGUYÊN TẮC HOẠT HỌA KINH ĐIỂN CẦN GHI NHỚ\n\n- **Squash and Stretch (Co và Dãn):** Quả bóng khi rơi chạm đất phải bị bẹp dẹt theo phương ngang (Squash) nhưng khi nảy vút lên không trung phải bị kéo dài theo phương thẳng đứng (Stretch), nhưng *thể tích tổng thể không đổi*.\n- **Anticipation (Lấy đà):** Trước khi nhân vật nhảy vọt lên cao, họ phải khuỵu gối lấy đà xuống thấp; trước khi tung cú đấm về phía trước, cánh tay phải giật lùi về phía sau.\n- **Follow Through & Overlapping Action (Chuyển động tiếp diễn):** Khi nhân vật dừng chạy đột ngột, tà áo choàng, mái tóc đuôi ngựa và thanh kiếm đeo sau lưng vẫn tiếp tục văng về phía trước trước khi lắng xuống.\n",
        "category": "Rigging & Animation",
        "level": 6,
        "challengeRef": "task-robo-arm"
      },
      {
        "id": "les-cur-mod-06-02",
        "moduleId": "cur-mod-06",
        "title": "BÀI HỌC 06.02: HỆ THỐNG XƯƠNG (ARMATURES & BONE HIERARCHY)",
        "readTime": "5 phút đọc",
        "summary": "- Nắm vững cấu trúc cơ bản của xương trong Blender: Head, Body, Tail, và Roll....",
        "keyShortcuts": [
          "E",
          "R",
          "M"
        ],
        "contentMarkdown": "# BÀI HỌC 06.02: HỆ THỐNG XƯƠNG (ARMATURES & BONE HIERARCHY)\n\n## 1. Mục tiêu bài học\n- Nắm vững cấu trúc cơ bản của xương trong Blender: **Head**, **Body**, **Tail**, và **Roll**.\n- Hiểu rõ 3 chế độ làm việc với Armature: **Object Mode**, **Edit Mode**, **Pose Mode**.\n- Nắm vững nguyên lý phân cấp xương (Bone Hierarchy: Parent - Child) và quan hệ **Connected** vs **Keep Offset**.\n- Thực hiện liên kết Mesh với Xương bằng phương pháp **Parent with Automatic Weights** (`Ctrl + P`).\n\n---\n\n## 2. Cấu tạo của Bone và 3 Chế độ làm việc\n\n### 2.1. Cấu trúc một Bone đơn lẻ\n- **Head (Gốc xương / Root)**: Điểm xoay chính của xương.\n- **Tail (Đầu xương / Tip)**: Điểm nối dẫn tiếp tới xương con tiếp theo.\n- **Bone Roll**: Góc tự xoay quanh trục dài của xương. *(Phím tắt: `Ctrl + R` trong Edit Mode để căn chỉnh trục xoay chính xác, tránh việc khớp gối/khuỷu tay bị gập vặn xoắn).*\n\n### 2.2. Phân biệt 3 Chế độ (Modes)\n1. **Object Mode**: Coi cả khung xương (Armature) như 1 thực thể đơn lẻ. Dùng để di chuyển tổng thể, scale hoặc Apply Transform (`Ctrl + A -> All Transforms`).\n2. **Edit Mode (`Tab`)**: Nơi tạo dựng cấu trúc xương (Thêm xương `Shift + A`, Extrude xương `E`, đảo chiều `Alt + F`, chỉnh Parent `Ctrl + P`). **Lưu ý: Tư thế chỉnh trong Edit Mode gọi là Rest Pose (Tư thế nghỉ).**\n3. **Pose Mode (`Ctrl + Tab`)**: Nơi Animator điều khiển xương để diễn hoạt / pose dáng. Di chuyển hoặc xoay ở đây không thay đổi hình dạng gốc (Rest Pose) của xương. Reset tư thế: `Alt + G`, `Alt + R`, `Alt + S`.\n\n---\n\n## 3. Thiết lập Cây phân cấp Xương (Hierarchy & Parenting)\n\n### 3.1. Các bước Extrude và phân nhánh\n1. Trong **Edit Mode**, chọn điểm **Tail** của Bone gốc (`Root` / `Hips`).\n2. Bấm phím **`E`** (Extrude) kéo lên để tạo đốt sống (`Spine`), `Chest`, `Neck`, `Head`.\n3. Để tạo xương tay/chân tách rời: Thêm xương mới hoặc Extrude từ thân rồi ngắt kết nối.\n\n### 3.2. Quan hệ Parent - Child (Cha - Con)\n- Chọn xương **Con** trước, giữ `Shift` chọn xương **Cha** sau.\n- Bấm **`Ctrl + P`**:\n  - **Connected**: Xương con dính chặt điểm Head vào điểm Tail của xương cha (thích hợp cho các đốt sống, xương ngón tay).\n  - **Keep Offset**: Xương con vẫn nhận chuyển động xoay/di chuyển của xương cha nhưng giữ nguyên khoảng cách không gian (thích hợp cho xương đùi gắn vào hông, hoặc mắt gắn vào đầu).\n- Hủy quan hệ cha con: Chọn xương con, bấm **`Alt + P`** -> **Clear Parent**.\n\n---\n\n## 4. Gắn Mesh vào Xương (Binding & Parenting)\n\n### 4.1. Quy trình chuẩn bị bắt buộc (Pre-Flight Checklist)\n1. **Apply Transforms**: Chọn Mesh, bấm `Ctrl + A` -> `All Transforms`. Chọn Armature, bấm `Ctrl + A` -> `All Transforms`. Cả 2 phải chung Origin và tỉ lệ Scale `(1.0, 1.0, 1.0)`.\n2. **Kiểm tra mặt phẳng đối xứng (X-Axis Mirror)**: Trong Edit Mode của Armature, bật tính năng `X-Axis Mirror` và đặt tên xương theo chuẩn đuôi `.L` và `.R` (ví dụ: `UpperArm.L`, `UpperArm.R`) để Blender tự động đối xứng hoá.\n\n### 4.2. Gắn tự động (Automatic Weights)\n1. Trong **Object Mode**, click chọn **Mesh** trước.\n2. Giữ `Shift` và click chọn **Armature** sau (Armature có viền vàng sáng hơn).\n3. Bấm tổ hợp phím **`Ctrl + P`** -> Chọn **With Automatic Weights**.\n4. Chọn Armature, bấm `Ctrl + Tab` vào **Pose Mode**, chọn 1 xương và bấm `R` xoay thử xem bề mặt da thịt (Mesh) có chuyển động theo xương không.\n\n---\n\n## 5. Các lỗi kinh điển và cách khắc phục\n- **Lỗi Mesh bị vẹo hoặc méo khi di chuyển**: Do chưa Apply Transforms (`Ctrl + A`) trước khi Bind xương.\n- **Lỗi Bone Heat Weighting Failed**: Do Mesh có lỗ hổng (non-manifold), đỉnh trùng lặp (chưa `M` -> `By Distance`), hoặc các phần giao nhau quá sát. Cách sửa: Vào Edit Mode của Mesh, chọn tất cả (`A`), bấm `M` -> `By Distance` để gộp điểm thừa.\n- **Lỗi Xoay chân/tay bị lộn ngược khớp**: Do Bone Roll sai hướng. Vào Edit Mode, bật hiển thị `Bone Axes` trong Viewport Display, dùng `Ctrl + R` hoặc `Shift + N` (Recalculate Roll) để đồng bộ hướng trục Z/X.\n\n---\n\n## 6. Bài tập thực hành\n- **Bài tập**: Tạo bộ khung xương cơ bản gồm 3 đốt cho một chiếc Đèn bàn Pixar (Bàn đế, Khớp thân dưới, Khớp thân trên, Chao đèn).\n- **Yêu cầu**:\n  1. Thiết lập phân cấp từ Đế lên Chao đèn (Keep Offset hoặc Connected).\n  2. Gắn các bộ phận vào từng xương tương ứng (sử dụng Parent to Bone trực tiếp hoặc Vertex Groups).\n  3. Vào Pose Mode uốn cong đèn và xoay chao đèn theo các hướng mà không bị vỡ mesh.\n",
        "category": "Rigging & Animation",
        "level": 6,
        "challengeRef": "task-robo-arm"
      },
      {
        "id": "les-cur-mod-06-03",
        "moduleId": "cur-mod-06",
        "title": "BÀI HỌC 06.03: IK/FK CONSTRAINTS & SƠN TRỌNG SỐ (WEIGHT PAINTING)",
        "readTime": "6 phút đọc",
        "summary": "- Phân biệt rõ sự khác nhau giữa FK (Forward Kinematics) và IK (Inverse Kinematics)....",
        "keyShortcuts": [
          "R",
          "G"
        ],
        "contentMarkdown": "# BÀI HỌC 06.03: IK/FK CONSTRAINTS & SƠN TRỌNG SỐ (WEIGHT PAINTING)\n\n## 1. Mục tiêu bài học\n- Phân biệt rõ sự khác nhau giữa **FK (Forward Kinematics)** và **IK (Inverse Kinematics)**.\n- Thiết lập cơ chế **IK Constraint** cho chân và tay nhân vật, bao gồm **Pole Target** (định hướng đầu gối/khuỷu tay).\n- Thành thạo công cụ **Weight Paint Mode** để tinh chỉnh độ ảnh hưởng của xương lên từng vùng da thịt.\n- Giới thiệu tổng quan hệ thống tự động Rigify chuẩn công nghiệp có sẵn trong Blender.\n\n---\n\n## 2. Phân biệt FK (Forward Kinematics) và IK (Inverse Kinematics)\n\n| Tiêu chí | FK (Động học xuôi) | IK (Động học ngược) |\n| :--- | :--- | :--- |\n| **Cơ chế** | Chuyển động truyền từ gốc đến ngọn (Hông -> Đùi -> Bắp chân -> Bàn chân). | Chuyển động điều khiển từ ngọn về gốc (Kéo Bàn chân, Hông và Đùi tự gập). |\n| **Cách điều khiển** | Xoay (`R`) từng khớp xương lần lượt. | Di chuyển (`G`) tay cầm điều khiển (Controller Bone). |\n| **Ứng dụng tối ưu** | Vẫy tay tự do, quất đuôi, động tác mượt mà trong không trung. | Chân bước dính chặt mặt đất (tránh trượt chân), tay bám vào xà đơn hoặc tường. |\n\n---\n\n## 3. Thiết lập Bộ điều khiển IK (IK Rigging Step-by-Step)\n\n### 3.1. Chuẩn bị xương trong Edit Mode\n1. Chuỗi chân gồm 3 xương: `Thigh.L` (Đùi), `Shin.L` (Bắp chân), `Foot.L` (Bàn chân).\n2. Tạo **IK Controller**: Extrude từ gót chân hoặc tạo 1 bone mới tại vị trí bàn chân đặt tên là `Foot_IK.L`. Bấm `Alt + P` -> **Clear Parent** (xương này không được làm con của Shin).\n3. Tạo **Pole Target**: Tạo 1 bone nhỏ đặt phía trước đầu gối đặt tên là `Knee_Target.L` (Clear Parent).\n4. **Quy tắc uốn khớp (Pre-bend)**: Đẩy nhẹ khớp đầu gối hơi nhô ra phía trước một chút trong Rest Pose (nếu xương thẳng đúp 180 độ, thuật toán IK sẽ không biết gập về hướng nào).\n\n### 3.2. Thêm Bone Constraint trong Pose Mode\n1. Chuyển sang **Pose Mode** (`Ctrl + Tab`).\n2. Chọn xương cẳng chân (`Shin.L`).\n3. Vào bảng thuộc tính **Bone Constraint Properties** (icon 2 vòng xích), bấm **Add Bone Constraint** -> chọn **Inverse Kinematics**.\n4. Thiết lập thông số:\n   - **Target**: Chọn Armature của bạn.\n   - **Bone**: Chọn `Foot_IK.L`.\n   - **Chain Length**: Đặt bằng **`2`** (chỉ ảnh hưởng tới Shin và Thigh, không ảnh hưởng lên Cột sống).\n   - **Pole Target**: Chọn Armature.\n   - **Pole Bone**: Chọn `Knee_Target.L`.\n   - **Pole Angle**: Chỉnh góc (thường là 0°, 90°, -90° hoặc 180°) sao cho đầu gối hướng thẳng về phía Pole Target mà không bị vặn xoắn.\n\n---\n\n## 4. Tinh chỉnh Trọng số (Weight Painting)\n\nKhi Automatic Weights tạo ra lỗi (ví dụ nhấc chân mà háng bị méo, hoặc gập ngón tay mà ngón bên cạnh bị kéo theo), ta phải dùng **Weight Paint**.\n\n### 4.1. Quy ước dải màu trọng số\n- **Màu Đỏ (1.0)**: Chịu 100% ảnh hưởng từ xương được chọn.\n- **Màu Vàng / Xanh lá (0.7 - 0.3)**: Vùng chuyển tiếp mềm mại giữa 2 khớp.\n- **Màu Xanh dương đậm (0.0)**: Hoàn toàn không bị ảnh hưởng (0%).\n\n### 4.2. Cách kích hoạt chế độ Weight Paint chuẩn\n1. Trong **Object Mode**, click chọn **Armature** trước.\n2. Giữ `Shift` và click chọn **Mesh** sau.\n3. Chuyển Mode từ Object Mode sang **Weight Paint Mode** (`Ctrl + Tab`).\n4. Giữ phím **`Ctrl` + Chuột trái** (hoặc `Shift + Chuột phải`) click vào bất kỳ chiếc xương nào để xem dải trọng số (Vertex Group) của xương đó.\n\n### 4.3. Các loại Cọ vẽ (Brushes) quan trọng\n- **Draw**: Sơn thêm trọng số (Weight = 1.0) hoặc xóa bớt (Weight = 0.0).\n- **Blur**: Làm mờ, làm mịn dải chuyển tiếp (cực kỳ quan trọng để khớp bẻ cong không bị nếp gấp thô).\n- **Average**: Trung bình hóa các đỉnh lân cận.\n- **Auto Normalize**: Luôn bật tuỳ chọn này ở thanh công cụ bên phải để tổng trọng số tác động lên 1 đỉnh từ tất cả các xương luôn được chuẩn hoá bằng đúng 1.0 (tránh phồng rộp mesh).\n\n---\n\n## 5. Tổng quan về Rigify (Addon tự động hóa có sẵn)\nThay vì tự dựng hàng trăm chiếc xương và ràng buộc bằng tay cho nhân vật hình người, Blender tích hợp sẵn addon **Rigify**:\n1. Vào `Edit` -> `Preferences` -> `Add-ons` -> Tìm và kích hoạt **Rigging: Rigify**.\n2. Thêm bộ khung mẫu: `Shift + A` -> `Armature` -> **Human (Meta-Rig)**.\n3. Vào Edit Mode, căn chỉnh vị trí các khớp của Meta-Rig sao cho khớp với mô hình 3D của bạn.\n4. Vào bảng `Armature Properties`, cuộn xuống mục **Rigify** và bấm nút **Generate Rig**.\n5. Rigify sẽ tự động sinh ra một bộ điều khiển chuyên nghiệp chuẩn Hollywood với đầy đủ IK/FK Switch, gậy điều khiển mắt, ngón tay và cơ mặt.\n\n---\n\n## 6. Bài tập thực hành\n- **Bài tập**: Hoàn thiện bộ chân IK 2 khớp và khử lỗi kẹt méo háng bằng Weight Paint.\n- **Yêu cầu**:\n  1. Dựng 1 chuỗi chân gồm 3 đốt: Đùi, Bắp chân, Bàn chân.\n  2. Gán IK Constraint với Chain Length = 2, thêm Pole Target hướng đầu gối.\n  3. Di chuyển bàn chân lên xuống kiểm tra xem gối có gập tự nhiên không.\n  4. Dùng cọ Blur trong Weight Paint làm mềm vùng gấp khớp gối khi co chân 90 độ.\n",
        "category": "Rigging & Animation",
        "level": 6,
        "challengeRef": "task-robo-arm"
      }
    ]
  },
  {
    "id": "cur-mod-07",
    "title": "Module 7: Geometry Nodes & Physics Simulations",
    "vietnameseTitle": "Geometry Nodes Thủ tục & Mô phỏng Vật lý",
    "level": 7,
    "levelBadge": "Level 7: Nâng cao",
    "category": "Procedural & Physics",
    "description": "Kiến trúc dữ liệu Fields trong Geometry Nodes, rải đối tượng thủ tục (Scattering), động lực học vật rắn Rigid Body và vải vóc Cloth.",
    "lessons": [
      {
        "id": "les-cur-mod-07-01",
        "moduleId": "cur-mod-07",
        "title": "BÀI HỌC 07.01: GEOMETRY NODES - TỪ CƠ BẢN ĐẾN NÂNG CAO (PROCEDURAL GENERATION)",
        "readTime": "5 phút đọc",
        "summary": "- Hiểu kiến trúc cốt lõi của Geometry Nodes (GN): Dữ liệu hình học dạng dòng chảy (Geometry Data Flow) và khái niệm Fields (Trường dữ liệu)....",
        "keyShortcuts": [],
        "contentMarkdown": "# BÀI HỌC 07.01: GEOMETRY NODES - TỪ CƠ BẢN ĐẾN NÂNG CAO (PROCEDURAL GENERATION)\n\n## 1. Mục tiêu bài học\n- Hiểu kiến trúc cốt lõi của **Geometry Nodes (GN)**: Dữ liệu hình học dạng dòng chảy (Geometry Data Flow) và khái niệm **Fields** (Trường dữ liệu).\n- Nắm vững các node cơ bản để phân tán vật thể: **Distribute Points on Faces**, **Instance on Points**.\n- Làm chủ cơ chế ngẫu nhiên hóa (Randomization): **Random Value**, biến đổi kích thước (Scale), xoay hướng (Rotation) theo Normal bề mặt.\n- Phân biệt giữa **Instance** và **Real Geometry** (`Realize Instances`), cùng ứng dụng thực tế trong việc tạo rừng cây, rải sỏi đá, thành phố thủ tục (Procedural City).\n\n---\n\n## 2. Kiến trúc Geometry Nodes và Khái niệm \"Fields\"\n\n### 2.1. Cấu trúc Modifier Geometry Nodes\n- Geometry Nodes hoạt động như một **Modifier** trong ngăn xếp (Modifier Stack) của vật thể.\n- **Group Input**: Tiếp nhận hình học ban đầu của vật thể (hoặc thông số tùy chỉnh từ giao diện Modifier).\n- **Group Output**: Đưa hình học sau khi qua xử lý thủ tục ra ngoài Viewport / Render.\n\n### 2.2. Nhận biết loại Socket (Đầu nối)\n- **Hình tròn (Circle)**: Giá trị đơn lẻ (Single value / Constant) - ví dụ một con số cố định Float = 5.0.\n- **Hình thoi có chấm (Diamond with dot)**: Trường dữ liệu (Field) - giá trị có thể thay đổi linh hoạt trên từng đỉnh (Vertex), từng mặt (Face) hoặc từng điểm (Point).\n\n---\n\n## 3. Quy trình kinh điển: Rải sỏi/cỏ lên bề mặt địa hình (Scattering)\n\n### 3.1. Sơ đồ Node cơ bản\n```\nGroup Input (Mesh địa hình) \n       |\n       +---> [Distribute Points on Faces] ---> [Instance on Points] ---> [Join Geometry] ---> Group Output\n                                                     ^                     ^\n                 [Collection Info / Object Info] ----+                     |\n                                (Cây cỏ mẫu)                               |\n                                                                           |\nGroup Input ---------------------------------------------------------------+\n```\n\n### 3.2. Chi tiết các bước thiết lập\n1. **Distribute Points on Faces**:\n   - Biến bề mặt địa hình thành tập hợp các điểm vô hình.\n   - Chế độ: Đổi từ `Random` sang **Poisson Disk** để kiểm soát khoảng cách tối thiểu giữa các vật thể (Distance Min), tránh việc cỏ cây mọc đè chồng chéo lên nhau.\n   - Mật độ (Density Max): Điều chỉnh số lượng điểm trên một mét vuông.\n2. **Instance on Points**:\n   - Tại vị trí mỗi điểm được tạo ra, nhân bản (Instance) một vật thể khác vào.\n   - Kéo đối tượng sỏi/cỏ từ Outliner thả thẳng vào cửa sổ Geometry Node Editor để tự động tạo node **Object Info** hoặc **Collection Info**.\n   - Cắm đầu ra `Geometry` của Object Info vào đầu vào `Instance` của node Instance on Points.\n3. **Join Geometry**:\n   - Gộp hình học của địa hình gốc (từ Group Input) cùng với hàng nghìn thực thể cỏ mới tạo ra để hiển thị cả hai cùng lúc.\n\n---\n\n## 4. Ngẫu nhiên hóa tự nhiên (Randomization & Alignment)\n\nĐể rừng cây hoặc bãi cỏ trông tự nhiên, không được để mọi cây đều cùng hướng và cùng kích thước:\n\n1. **Ngẫu nhiên hóa tỉ lệ (Scale)**:\n   - Thêm node **Random Value** (kiểu dữ liệu *Float*).\n   - Đặt Min = 0.5, Max = 1.3.\n   - Cắm đầu ra `Value` vào đầu vào `Scale` của node *Instance on Points*.\n2. **Căn chỉnh hướng theo độ dốc địa hình (Align to Normal)**:\n   - Thêm node **Align Euler to Vector**.\n   - Cắm đầu ra `Normal` của node *Distribute Points on Faces* vào cổng `Vector` của node *Align Euler to Vector*.\n   - Đổi trục sang **Z**.\n   - Cắm cổng `Rotation` đầu ra vào cổng `Rotation` của node *Instance on Points*.\n   - Kết quả: Thân cây hoặc ngọn cỏ sẽ tự động mọc vuông góc với bề mặt đồi núi.\n\n---\n\n## 5. Khi nào cần dùng \"Realize Instances\"?\n- Mặc định, các đối tượng được nhân bản là **Instances** (chỉ lưu tọa độ tham chiếu trong bộ nhớ RAM, render cực nhẹ hàng triệu đối tượng).\n- **Nhược điểm của Instance**: Không thể tác động chỉnh sửa từng đỉnh bằng các node biến dạng (Deform), và một số engine render bên ngoài hoặc việc nướng Texture (Bake) không nhận diện được từng cá thể.\n- **Giải pháp**: Thêm node **Realize Instances** ngay trước Group Output. \n- *Cảnh báo hiệu năng*: Realize Instances sẽ biến hàng triệu instance thành hàng tỷ đa giác thật, có thể gây tràn VRAM hoặc đóng băng Blender nếu số lượng quá lớn!\n\n---\n\n## 6. Bài tập thực hành\n- **Bài tập**: Tạo một hệ thống rải đá cuội thủ tục lên một mặt phẳng uốn lượn.\n- **Yêu cầu**:\n  1. Dùng lưới Subdivided Plane làm địa hình, thêm modifier Displace để tạo gồ ghề.\n  2. Tạo 1 bộ sưu tập (Collection) gồm 3 viên sỏi hình dạng khác nhau.\n  3. Tạo Geometry Node rải sỏi với thuật toán `Poisson Disk`.\n  4. Ngẫu nhiên hóa góc xoay trục Z từ 0 đến 360 độ (`0` đến `tau` hoặc `2 * pi`) và ngẫu nhiên hóa kích thước sỏi từ 0.3 đến 1.2.\n",
        "category": "Procedural & Physics",
        "level": 7,
        "challengeRef": "task-geo-island"
      },
      {
        "id": "les-cur-mod-07-02",
        "moduleId": "cur-mod-07",
        "title": "BÀI HỌC 07.02: VẬT LÝ VÀ MÔ PHỎNG (PHYSICS SIMULATIONS)",
        "readTime": "5 phút đọc",
        "summary": "- Nắm vững nguyên lý và thiết lập hệ thống động lực học vật rắn (Rigid Body Dynamics: Active vs Passive)....",
        "keyShortcuts": [],
        "contentMarkdown": "# BÀI HỌC 07.02: VẬT LÝ VÀ MÔ PHỎNG (PHYSICS SIMULATIONS)\n\n## 1. Mục tiêu bài học\n- Nắm vững nguyên lý và thiết lập hệ thống động lực học vật rắn (**Rigid Body Dynamics: Active vs Passive**).\n- Mô phỏng vải vóc (**Cloth Simulation**): Ghim điểm (Pin Group), va chạm (Collisions), độ căng bề mặt (Stiffness).\n- Tổng quan hệ thống hạt (**Particle Systems**) và mô phỏng khói, lửa, chất lỏng (**Mantaflow**).\n- Nắm vững quy trình nướng dữ liệu mô phỏng (**Bake Physics**) để đảm bảo phát lại mượt mà và render không lỗi.\n\n---\n\n## 2. Mô phỏng Vật rắn (Rigid Body Dynamics)\n\nDùng cho các cảnh va đập, đổ vỡ, sập tường, domino hoặc xúc xắc rơi.\n\n### 2.1. Phân loại Active vs Passive\n- **Active (Chủ động)**: Vật thể bị trọng lực kéo xuống và chịu tác động của lực va chạm (ví dụ: các quân cờ domino, khối gạch).\n- **Passive (Bị động)**: Vật thể đứng yên làm rào cản va chạm, không bị rơi tự do (ví dụ: mặt sàn nhà, chướng ngại vật).\n\n### 2.2. Hình dạng va chạm (Collision Shapes)\n- **Convex Hull (Mặc định)**: Tạo một lớp vỏ bọc kín bao quanh vật thể. Tính toán cực nhanh, ổn định nhất.\n- **Mesh**: Tính toán va chạm dựa trên từng đa giác thật. Bắt buộc phải dùng cho vật rỗng/lõm (ví dụ: chiếc bát, cái phễu, cái cốc). *Nhược điểm: Tốn CPU và dễ bị hiện tượng xuyên thủng nếu vật thể chuyển động quá nhanh.*\n- **Box / Sphere / Cylinder**: Tối ưu nhất cho các khối hình học cơ bản.\n\n### 2.3. Khắc phục lỗi va chạm xuyên qua nhau\n- Tăng giá trị **Substeps Per Frame** và **Solver Iterations** trong bảng `Scene Properties` -> `Rigid Body World`.\n- Đảm bảo đã Apply Scale (`Ctrl + A`) cho tất cả các đối tượng tham gia mô phỏng.\n\n---\n\n## 3. Mô phỏng Vải vóc (Cloth Simulation)\n\nDùng cho rèm cửa, khăn trải bàn, quần áo nhân vật, cờ bay trong gió.\n\n### 3.1. Các bước tạo Khăn trải bàn rơi xuống mặt bàn\n1. Tạo mặt bàn, gán thuộc tính vật lý **Collision** trong tab Physics.\n2. Tạo 1 tấm Plane đặt phía trên mặt bàn, vào Edit Mode bấm chuột phải -> `Subdivide` khoảng 30-50 lần (Mô phỏng vải phụ thuộc vào mật độ lưới - lưới càng chi tiết vải càng mềm).\n3. Thêm physics **Cloth** cho tấm Plane.\n4. Bật tuỳ chọn **Self Collisions** trong mục Collisions của Cloth (để vải không bị xuyên lủng qua chính nó khi gập nếp).\n5. Bấm phím cách (`Space`) để chạy mô phỏng, tấm vải sẽ rơi xuống và phủ quanh mặt bàn tự nhiên.\n\n### 3.2. Ghim vải (Pin Group) - Ví dụ: Rèm cửa hoặc Cờ\n1. Vào Edit Mode, chọn hàng đỉnh mép trên của tấm vải.\n2. Vào tab `Object Data Properties` (icon tam giác xanh), tạo 1 **Vertex Group** mới tên là `Pins`, bấm **Assign**.\n3. Quay lại tab Physics của Cloth, cuộn xuống mục **Shape** -> chọn `Pins` tại mục **Pin Group**.\n4. Khi chạy mô phỏng, hàng đỉnh này sẽ đứng yên cố định trên thanh rèm, phần thân vải phía dưới sẽ rủ xuống uốn lượn.\n\n---\n\n## 4. Mô phỏng Khói, Lửa và Nước (Mantaflow Overview)\n\nHệ thống Mantaflow trong Blender chia làm 2 thành phần chính:\n1. **Domain (Vùng bao)**: Chiếc hộp bao quanh toàn bộ không gian mô phỏng. Mọi tính toán khói/nước chỉ diễn ra bên trong hộp này.\n2. **Flow (Nguồn phát)**: Vật thể sinh ra khói, lửa hoặc chất lỏng (Smoke / Fire / Liquid).\n3. **Effector**: Vật cản dòng chảy (chướng ngại vật làm lệch hướng khói/nước).\n\n---\n\n## 5. Quy tắc vàng: Nướng dữ liệu (Baking Cache)\n- Khi phát trực tiếp (Real-time playback) trên timeline, khung hình thường bị giật lag và Blender sẽ tính lại từ đầu mỗi khi thay đổi góc camera.\n- Trước khi Render video hoặc ảnh hoàn thiện, **bắt buộc phải Bake**:\n  1. Trong bảng thiết lập Physics của Domain hoặc Cloth, tìm đến mục **Cache**.\n  2. Đặt khung hình bắt đầu (`Start`) và kết thúc (`End`).\n  3. Bấm **Bake** (hoặc chọn định dạng Type = `Modular` / `All` đối với Mantaflow).\n  4. Sau khi Bake xong, dữ liệu được ghi cố định vào ổ cứng, thanh timeline có thể kéo tới bất kỳ frame nào mà không lo lỗi sụp đổ vật lý.\n\n---\n\n## 6. Bài tập thực hành\n- **Bài tập**: Tạo cảnh đổ vỡ kim tự tháp Domino bằng Rigid Body.\n- **Yêu cầu**:\n  1. Tạo sàn nhà gán Rigid Body loại `Passive`.\n  2. Tạo 1 quân cờ Domino kích thước chuẩn, nhân bản xếp thành tháp 3 tầng dạng `Active`.\n  3. Tạo 1 quả cầu sắt `Active` nặng 10kg bay tới đâm sập tháp Domino.\n  4. Bake toàn bộ 150 frames chuyển động và nạp vào timeline.\n",
        "category": "Procedural & Physics",
        "level": 7,
        "challengeRef": "task-geo-island"
      }
    ]
  },
  {
    "id": "cur-mod-08",
    "title": "Module 8: Game Asset Pipeline & Optimization",
    "vietnameseTitle": "Tối ưu hóa Game Pipeline & Xuất file (Unreal / Unity)",
    "level": 8,
    "levelBadge": "Level 8: Chuyên nghiệp",
    "category": "Game Pipeline",
    "description": "Ngân sách đa giác Polycount, cạm bẫy Normal Map DirectX vs OpenGL, quy chuẩn lưới va chạm UCX và cấu hình xuất FBX/GLTF chuẩn.",
    "lessons": [
      {
        "id": "les-cur-mod-08-01",
        "moduleId": "cur-mod-08",
        "title": "BÀI HỌC 08.01: TỐI ƯU HÓA GAME ASSET PIPELINE (UNREAL ENGINE & UNITY)",
        "readTime": "7 phút đọc",
        "summary": "- Hiểu toàn diện chu trình sản xuất tài nguyên trò chơi 3D (Game Asset Pipeline): High-poly -> Low-poly -> UV -> Bake -> Texture -> Export....",
        "keyShortcuts": [],
        "contentMarkdown": "# BÀI HỌC 08.01: TỐI ƯU HÓA GAME ASSET PIPELINE (UNREAL ENGINE & UNITY)\n\n## 1. Mục tiêu bài học\n- Hiểu toàn diện chu trình sản xuất tài nguyên trò chơi 3D (**Game Asset Pipeline**): High-poly -> Low-poly -> UV -> Bake -> Texture -> Export.\n- Nắm vững ngân sách đa giác (**Polycount Budgets**) cho các nền tảng: Mobile, PC/Console, và cơ chế Nanite trong Unreal Engine 5.\n- Phân biệt sự khác biệt sinh tử giữa **OpenGL (+Y)** và **DirectX (-Y)** trong Normal Map.\n- Thiết lập quy chuẩn đặt tên, vật lý va chạm (**Collision Mesh**), và cấu hình xuất file **FBX / glTF (GLB)** chuẩn chỉnh.\n\n---\n\n## 2. Toàn cảnh Game Asset Pipeline\n\n```\n[1. Khái niệm & Blockout] ---> [2. High-Poly Sculpt/Model] ---> [3. Low-Poly Retopology]\n                                                                        |\n[6. Nhập vào Game Engine] <--- [5. PBR Texturing (Substance)] <--- [4. UV Unwrap & Bake]\n```\n\n1. **Blockout**: Dựng hình học thô để kiểm tra tỉ lệ nhân vật và tỉ lệ không gian trong game.\n2. **High-Poly**: Mô hình hàng triệu đa giác chứa đầy đủ chi tiết nếp nhăn, bu lông, vết xước, vát mép tròn trịa.\n3. **Low-Poly**: Lưới tối ưu hóa bám sát hình dáng high-poly nhưng số lượng đa giác thấp, phân bố quads/tris sạch sẽ.\n4. **UV Unwrapping**: Trải phẳng bề mặt không bị méo (Stretch-free), tối đa hóa diện tích sử dụng UV (Texel Density cao).\n5. **Bake Maps**: Chiếu chi tiết từ High-Poly sang Low-Poly (Normal map, Ambient Occlusion, Curvature, ID map).\n6. **Texturing**: Sơn vật liệu PBR (Albedo/BaseColor, Roughness, Metallic, Normal, Height).\n7. **Export**: Xuất sang FBX hoặc GLTF để đưa vào Unity / Unreal Engine / Godot / WebGL.\n\n---\n\n## 3. Ngân sách Polycount (Budgets) & Nguyên tắc Tam giác hoá (Triangulation)\n\n### 3.1. Ngân sách tham khảo trung bình\n| Thể loại tài nguyên | Mobile / VR thấp | PC / Console chuẩn | Unreal Engine 5 (Nanite) |\n| :--- | :--- | :--- | :--- |\n| **Vật phẩm nhỏ (Prop / Đồ nhặt)** | 300 - 1,500 Tris | 1,500 - 6,000 Tris | Hàng chục ngàn Tris |\n| **Vũ khí chính (Guns, Swords)** | 2,000 - 5,000 Tris | 10,000 - 35,000 Tris | 100,000+ Tris |\n| **Nhân vật chính (Main Hero)** | 8,000 - 20,000 Tris | 40,000 - 120,000 Tris | Hàng triệu Tris (với Nanite Skeletal) |\n| **Môi trường / Kiến trúc** | 1,000 - 5,000 Tris / module | 5,000 - 30,000 Tris / module | Chi tiết trực tiếp không cần Low-poly |\n\n### 3.2. Quy tắc vàng về Tam giác hoá (Triangulation)\n- Trong Game Engine, mọi đa giác đều bị GPU chia thành hình tam giác (**Triangles / Tris**).\n- Một Quad phẳng có thể bị engine gập chéo theo 2 hướng khác nhau. Nếu hướng gập của engine khác với hướng gập khi nướng Normal Map ở Blender/Substance, vật thể sẽ bị hiện tượng **bóng tối méo mó (Shading shading artifact)**.\n- **Giải pháp**: Trước khi xuất FBX sang game engine, hãy thêm modifier **Triangulate** (hoặc tích chọn *Triangulate Faces* trong menu xuất FBX).\n\n---\n\n## 4. Cạm bẫy Normal Map: DirectX (-Y) vs OpenGL (+Y)\n\nĐây là lỗi phổ biến nhất khiến vật thể trong game trông như bị khoét lõm vào trong thay vì lồi lên:\n- **OpenGL (Right-handed, Y+)**: Sử dụng bởi **Blender**, **Unity**, **Godot**, **WebGL / Three.js**.\n  - Kênh màu Xanh lá (Green channel) biểu thị ánh sáng chiếu từ đỉnh trên xuống.\n- **DirectX (Left-handed, Y-)**: Sử dụng bởi **Unreal Engine**, **3ds Max**.\n  - Kênh màu Xanh lá (Green channel) bị đảo ngược (Inverted), biểu thị ánh sáng từ dưới lên.\n- **Cách xử lý**:\n  - Nếu làm cho Unreal Engine: Trong bảng Texture Settings của Unreal, click đúp vào texture Normal Map và tích vào ô **Flip Green Channel**.\n  - Hoặc khi nướng texture trong Substance Painter / Baker, chọn template định dạng `Unreal Engine 4/5 (Packed)` ngay từ đầu.\n\n---\n\n## 5. Quy chuẩn Va chạm tự động (Custom Collision Meshes)\n\nĐể nhân vật trong Unreal Engine hoặc Unity không đi xuyên qua tường hay đồ vật mà không làm giảm FPS, ta tạo lưới va chạm đơn giản trong Blender với quy tắc tiền tố đặt tên:\n- **UBX_[TênVậtThể]**: Hộp va chạm chữ nhật (Box Collider). Ví dụ: `UBX_Chair_01`.\n- **USP_[TênVậtThể]**: Khối cầu va chạm (Sphere Collider). Ví dụ: `USP_Apple`.\n- **UCP_[TênVậtThể]**: Khối trụ va chạm (Capsule Collider).\n- **UCX_[TênVậtThể]**: Khối lồi đa diện tùy chỉnh (Convex Collider). Ví dụ: `UCX_Rock_Giant`.\n\nKhi nhập file FBX vào Unreal Engine, engine sẽ tự động gán các khối này thành vách ngăn vật lý mà không tốn công cài đặt bằng tay.\n\n---\n\n## 6. Cấu hình Xuất file FBX và glTF Chuẩn quốc tế\n\n### 6.1. Xuất file FBX cho Unreal Engine / Unity\n1. Chọn vật thể cần xuất.\n2. `File` -> `Export` -> `FBX (.fbx)`.\n3. Bảng thiết lập bên phải:\n   - **Limit to**: Tích chọn **Selected Objects** (chỉ xuất vật thể được chọn).\n   - **Object Types**: Chọn **Mesh** (và **Armature** nếu có xương). Bỏ chọn Camera và Lamp.\n   - **Transform**:\n     - Scale: `1.00`.\n     - Forward: `-Z Forward`.\n     - Up: `Y Up` (đối với Unity) hoặc để Blender tự đồng bộ.\n     - **Apply Scalings**: Chọn `FBX All` (cực kỳ quan trọng để không bị lỗi tỉ lệ x100 khi vào Unreal Engine).\n   - **Geometry**:\n     - Smoothing: Chọn **Face** hoặc **Normals** (tránh để `Off` gây gãy khối).\n     - Tích chọn **Apply Modifiers**.\n   - **Armature** (nếu xuất nhân vật):\n     - Bỏ tích **Add Leaf Bones** (tránh tạo thêm các mẩu xương thừa ở đầu mút).\n\n### 6.2. Xuất file glTF / GLB cho Web, Three.js và Mobile\n- Sử dụng format **glTF Binary (.glb)** để nhúng toàn bộ Mesh, Texture PBR và Animation vào 1 file duy nhất siêu nhẹ.\n- Tích chọn `Remember Export Settings`.\n- Texture được tự động nén định dạng Web-ready tối ưu.\n\n---\n\n## 7. Bài tập thực hành\n- **Bài tập**: Hoàn thiện và đóng gói 1 thùng gỗ hòm báu vật (Treasure Chest) sẵn sàng cho Game Engine.\n- **Yêu cầu**:\n  1. Giới hạn ngân sách dưới 2,500 Tris.\n  2. Tạo va chạm `UCX_TreasureChest` bọc sát thân hòm.\n  3. Kiểm tra không còn n-gons, không đỉnh trùng (`By Distance`).\n  4. Đặt Pivot/Origin ở đáy tiếp xúc mặt đất `(0, 0, 0)`.\n  5. Xuất ra file `TreasureChest.fbx` với chuẩn Face Smoothing và Apply All Transforms.\n",
        "category": "Game Pipeline",
        "level": 8,
        "challengeRef": "task-geo-island"
      }
    ]
  },
  {
    "id": "cur-mod-09",
    "title": "Global Resources & Channel Directory",
    "vietnameseTitle": "Kho Tài nguyên CC0 & Danh mục Kênh học Uy tín Toàn cầu",
    "level": 0,
    "levelBadge": "Tài nguyên & Addons",
    "category": "Resources & Addons",
    "description": "Tổng hợp kênh YouTube hàng đầu thế giới theo chuyên ngành, kho HDRI/PBR CC0 miễn phí, và các Addon thiết yếu tăng tốc 300% quy trình.",
    "lessons": [
      {
        "id": "les-cur-mod-09-01",
        "moduleId": "cur-mod-09",
        "title": "TÀI NGUYÊN TOÀN DIỆN VÀ DANH MỤC KÊNH HỌC BLENDER UY TÍN TOÀN CẦU",
        "readTime": "11 phút đọc",
        "summary": "Tài liệu này tổng hợp toàn bộ các nguồn học liệu chính thống, các nhà sáng tạo nội dung hàng đầu thế giới phân chia theo từng lĩnh vực chuyên sâu, các thư viện tài nguyên miễn phí ...",
        "keyShortcuts": [],
        "contentMarkdown": "# TÀI NGUYÊN TOÀN DIỆN VÀ DANH MỤC KÊNH HỌC BLENDER UY TÍN TOÀN CẦU\n\nTài liệu này tổng hợp toàn bộ các nguồn học liệu chính thống, các nhà sáng tạo nội dung hàng đầu thế giới phân chia theo từng lĩnh vực chuyên sâu, các thư viện tài nguyên miễn phí (CC0) và danh sách Addon thiết yếu giúp bạn làm chủ Blender mà không bị lạc vào \"Vòng lặp Tutorial Hell\".\n\n---\n\n## 1. Tài liệu và Nguồn học Chính thức (Official Documentation)\n\n| Nguồn | Địa chỉ / Đặc điểm | Giá trị cốt lõi |\n| :--- | :--- | :--- |\n| **Blender Official Manual** | [docs.blender.org/manual](https://docs.blender.org/manual/en/latest/) | Bách khoa toàn thư mô tả chi tiết 100% công cụ, thuật toán và thông số của Blender. Hãy dùng nó như một cuốn từ điển tra cứu khi không hiểu một tham số nào đó. |\n| **Blender Studio** | [studio.blender.org](https://studio.blender.org/) | Các dự án phim ngắn mã nguồn mở (Open Movies như *Sprite Fright*, *Charge*, *Spring*). Cung cấp file `.blend` sản xuất thật, bộ rig nhân vật điện ảnh, và các khóa đào tạo nội bộ từ các Artist hàng đầu của Blender Foundation. |\n| **Blender Developer Docs** | [wiki.blender.org](https://developer.blender.org/) | Dành cho lập trình viên muốn viết Script Python, Addons hoặc nghiên cứu API của Blender. |\n\n---\n\n## 2. Danh mục Kênh Học YouTube Quốc Tế theo Từng Lĩnh Vực\n\n### 2.1. Nhập môn & Nền tảng Tổng quan (Beginner & Fundamentals)\n1. **Grant Abbitt**:\n   - *Phong cách*: Điềm đạm, sư phạm cực tốt, chia nhỏ bài học thành các thử thách vi mô (Micro-challenges).\n   - *Chuỗi bài nên xem*: **\"Get Good at Blender\"**, chuỗi bài dựng cái giếng nước (The Well), nhà gỗ trên biển (Sea Shack), và bài tập Low-poly. Rất thích hợp cho người sợ hãi giao diện 3D phức tạp.\n2. **Blender Guru (Andrew Price)**:\n   - *Phong cách*: Bài bản, chuẩn chỉ về mặt kỹ thuật và thị giác đời thực.\n   - *Chuỗi bài nên xem*: **\"Blender Beginner Donut Series\"** (nghi thức nhập môn kinh điển toàn cầu), **\"Blender Chair Tutorial\"** (dựng hình theo kích thước chuẩn), và các video phân tích về lý thuyết màu sắc (*Color Theory*) và ánh sáng (*Lighting Masterclass*).\n3. **CG Cookie**:\n   - *Phong cách*: Giáo trình chuẩn viện đại học đồ họa, giải thích cặn kẽ bản chất toán học và hình học đằng sau mỗi cú click chuột.\n   - *Chuỗi bài nên xem*: *Basics of Blender*, *Shading Principles*, *Human Mesh Modeling*.\n\n### 2.2. Dựng hình Cơ khí & Đồ vật Công nghiệp (Hard-Surface Modeling)\n1. **Josh Gambrell / Blender Bros**:\n   - *Lĩnh vực*: Bậc thầy dựng hình bề mặt cứng (Hard-surface), phi thuyền vũ trụ, vũ khí viễn tưởng, máy móc.\n   - *Kỹ năng đặc trưng*: Sử dụng Booleans không phá hủy (Non-destructive), Bevel Weights, và giải quyết triệt để lỗi Shading bằng Weighted Normals.\n2. **Rachel Frick**:\n   - *Lĩnh vực*: Dựng đạo cụ môi trường (Environment Props) và vũ khí chi tiết cho Game Pipeline.\n\n### 2.3. Tạo vật liệu & Shader Thủ tục (Procedural Shading)\n1. **Ryan King Art**:\n   - *Phong cách*: Thư viện video phong phú nhất hành tinh về Shader Nodes.\n   - *Chuỗi bài nên xem*: **\"Procedural Material Tutorial Series\"** (hơn 100 vật liệu từ gỗ, đá, kim loại rỉ sét, kính bẩn, da người đến plasma hư ảo - hoàn toàn tạo từ Math/Noise/Voronoi Nodes không cần ảnh texture ngoài).\n2. **Ducky3D**:\n   - *Phong cách*: Phong cách trừu tượng (Abstract), Sci-Fi, Motion Graphics cho âm nhạc, Eevee lighting cực bắt mắt và hiện đại.\n   - *Chuỗi bài nên xem*: Cảnh Loop hành lang vô tận, các khối cầu phát sáng động lực học.\n\n### 2.4. Geometry Nodes & Hiệu ứng Thị giác (VFX / Procedural Generation)\n1. **Default Cube / CGMatter**:\n   - *Phong cách*: Tốc độ cao, hài hước, phân tích sâu về đại số vector và ma trận toán học trong Geometry Nodes và Camera Tracking.\n   - *Chủ đề*: Biến đổi ảnh 2D thành 3D, tạo hệ thống đường dây điện tự động, mô phỏng mưa và tuyết.\n2. **Erindale**:\n   - *Phong cách*: Kỹ sư toán học áp dụng vào nghệ thuật 3D. Người tiên phong phát triển các node group cao cấp cho cộng đồng Geometry Nodes thế giới.\n\n### 2.5. Tạo hình Nhân vật, Điêu khắc & Topology Chuyển động\n1. **Dikko**:\n   - *Phong cách*: Hướng dẫn chi tiết cách dựng nhân vật hoạt hình Stylized từ số 0.\n   - *Chuỗi bài cốt lõi*: **\"Modelling for Animation\"** - phân tích chính xác từng đường vòng mặt (Face Loops around mouth, eyes) giúp nhân vật khi nói và nháy mắt không bao giờ bị méo hình.\n2. **FlyCat / FlippedNormals**:\n   - *Phong cách*: Chuẩn công nghiệp Hollywood, so sánh quy trình giữa Blender, ZBrush và Maya.\n   - *Chủ đề*: Sculpting giải phẫu học cơ thể người (Anatomy), quy trình nướng High-to-Low poly.\n\n### 2.6. Rigging & Diễn hoạt Hoạt hình (Rigging & Animation)\n1. **CGDive**:\n   - *Lĩnh vực*: Kênh số 1 thế giới về hệ thống xương Armature, Inverse Kinematics và làm chủ Addon **Rigify**.\n   - *Chuỗi bài nên xem*: Hướng dẫn làm Rigify từ A đến Z cho nhân vật 2 chân, 4 chân, chim chóc và rắn rết.\n2. **Pierrick Picaut (P2Design)**:\n   - *Phong cách*: Animator chuyên nghiệp ngành Game AAA.\n   - *Chủ đề*: Rigging nâng cao (Twist bones, Squash & Stretch), quy trình làm hoạt hình chiến đấu (Combat Animation, Run cycles, Jump attacks).\n3. **Polyfjord**:\n   - *Phong cách*: Cực kỳ sáng tạo và nghệ thuật. Hướng dẫn cơ cấu cử động của cánh tay robot, chân nhện cơ khí và hiệu ứng vật lý động lực học.\n\n### 2.7. Thủ thuật Tốc độ & Kỹ xảo Đỉnh cao\n1. **Ian Hubert**:\n   - *Chuỗi bài huyền thoại*: **\"World Building\"** và **\"Lazy Tutorials\"** (hướng dẫn kỹ xảo điện ảnh photorealistic chỉ trong 1 phút).\n   - *Triết lý*: \"Che giấu sự giả tạo bằng ánh sáng, camera rung và bụi bặm thay vì mất hàng tháng làm từng chi tiết nhỏ\".\n\n---\n\n## 3. Kho Thư viện Tài nguyên Miễn phí Hợp pháp (CC0 / Free Libraries)\n\nTuyệt đối không cần tốn tiền mua texture hoặc HDRI khi mới học, các trang web sau cung cấp tài nguyên bản quyền CC0 (hoàn toàn miễn phí cho cả mục đích thương mại):\n\n| Tên nền tảng | Loại tài nguyên | Định dạng / Điểm mạnh |\n| :--- | :--- | :--- |\n| **Poly Haven** (`polyhaven.com`) | HDRI, Textures, 3D Models | 100% CC0. Môi trường chiếu sáng HDRI chuẩn màu điện ảnh lên tới 16K, Texture PBR đầy đủ các map. |\n| **AmbientCG** (`ambientcg.com`) | PBR Materials, Decals, 3D Scans | Hơn 2,000 vật liệu PBR chất lượng cao (1K đến 8K), có sẵn file SBSAR và map roughness/normal chuẩn. |\n| **TextureLabs** (`texturelabs.org`) | Grunge Overlays, Bề mặt trầy xước | Cực kỳ hữu ích để làm map bụi bặm (Dust), vân tay (Fingerprints) cắm vào Roughness node. |\n| **Mixamo** (`mixamo.com`) | Rigs & Mocap Animations | Thư viện hàng ngàn hoạt hình chuyển động cơ thể miễn phí của Adobe (chạy, nhảy, múa kiếm, ngã). Tải file FBX về nhập thẳng vào Blender. |\n| **Kenney.nl** (`kenney.nl`) | Game Assets, Low Poly Kits | \"Vị thánh tài nguyên game\". Hàng ngàn mô hình 3D phong cách Low-poly được cấp phép Public Domain (CC0) để làm mẫu thử game. |\n| **Sketchfab** (`sketchfab.com`) | 3D Models đa dạng | Bộ lọc: Tích chọn *Downloadable* và *CC Attribution* để tải hàng vạn mô hình tham khảo từ cộng đồng quốc tế. |\n\n---\n\n## 4. Danh sách Addons Thiết yếu (Essential Addons)\n\n### 4.1. Addons Có Sẵn Trong Blender (Chỉ cần Bật trong Preferences)\n1. **Node Wrangler**: Addon số 1 bắt buộc phải có của mọi 3D Artist.\n   - `Ctrl + Shift + Click`: Xem thử (Preview) ngay lập tức bất kỳ node nào.\n   - `Ctrl + Shift + T`: Tự động nạp toàn bộ bộ ảnh PBR (BaseColor, Roughness, Normal) vào Principled BSDF chỉ trong 1 giây.\n   - `Ctrl + T`: Tự động thêm cặp Texture Coordinate và Mapping node.\n2. **LoopTools**:\n   - `Circle`: Biến một cụm đỉnh hình thoi/vuông thành hình tròn hoàn hảo (cực kỳ hữu ích để khoét lỗ ống tròn trên khối lập phương).\n   - `Space`: Giãn đều khoảng cách giữa các đỉnh.\n   - `Bridge`: Nối 2 chuỗi cạnh thành bề mặt phẳng mượt.\n3. **Bool Tool**:\n   - Thao tác Booleans phím tắt siêu tốc: `Ctrl + Shift + NumMinus` (Hiệu số), `Ctrl + Shift + NumPlus` (Hợp nhất).\n4. **F2**:\n   - Mở rộng phím `F` giúp vá mặt (Face creation) chỉ bằng 1 cú click chuột dựa trên các cạnh lân cận.\n5. **Images as Planes**:\n   - Nhập ảnh 2D hoặc ảnh vẽ Concept vào Viewport thành 1 tấm Plane 3D tự động giữ nguyên tỉ lệ và gắn vật liệu.\n6. **Extra Objects (Mesh & Curve)**:\n   - Thêm các khối dựng sẵn như Bánh răng cơ khí (Gears), Ống xoắn kép (Torus Knots), Đá cuội (Rock Generator), Cây cối (Sapling Tree Gen).\n\n### 4.2. Addons Miễn phí Ngoài Cộng đồng Đáng Chú Ý\n- **Textools**: Bộ công cụ mở rộng chuyên dụng cho việc duỗi thẳng hàng UV và nướng texture.\n- **Blender-OSM**: Nhập dữ liệu bản đồ OpenStreetMap thật (nhà cửa, đường xá, địa hình) của bất kỳ thành phố nào trên thế giới vào Blender chỉ bằng vài cú click.\n\n---\n\n## 5. Chiến lược Đánh bại \"Vòng lặp Tutorial Hell\" (Action Plan)\n\nNhiều người học Blender 6 tháng đến 1 năm nhưng khi mở một file trống lên lại không biết làm gì. Đây là hội chứng **Tutorial Hell** (chỉ sao chép theo từng nút bấm của người hướng dẫn mà không hiểu bản chất).\n\n### 5.1. Quy tắc Tỉ lệ 33% (The 1/3 Rule)\n- **1/3 thời gian**: Xem hướng dẫn và làm theo để học công cụ và kỹ thuật mới.\n- **2/3 thời gian còn lại**: Tắt video, mở file `.blend` mới hoàn toàn và tự làm một tác phẩm tương tự nhưng mang phong cách riêng của bạn.\n  - *Ví dụ*: Vừa xem xong video làm chiếc Bánh Donut -> Hãy tự làm một chiếc Bánh Kem Sinh Nhật hoặc Chiếc Bánh Mì Hamburger mà KHÔNG bật lại video hướng dẫn.\n\n### 5.2. Phương pháp Chia nhỏ Vấn đề (Deconstruction Method)\nKhi muốn dựng một cỗ máy hoặc một căn phòng phức tạp:\n1. Đừng cố gắng dựng chi tiết ngay lập tức.\n2. Hãy nhìn mọi đồ vật dưới dạng các khối hình học cơ bản: *Khối lập phương, Khối trụ tròn, Khối cầu*.\n3. Dựng hình thô (Blockout) trước để cố định tỉ lệ.\n4. Bổ sung chi tiết từng cấp độ: Cấp lớn (Big shapes) -> Cấp vừa (Medium bevels) -> Cấp vi mô (Small screws, scratches).\n",
        "category": "Resources & Addons",
        "level": 0
      }
    ]
  }
];

export const TOTAL_CURRICULUM_LESSONS = 26;

export class CurriculumService {
  private static STORAGE_COMPLETED_KEY = 'blenderflow_curriculum_completed_v2';
  private static STORAGE_NOTES_KEY = 'blenderflow_curriculum_notes_v2';
  private static STORAGE_BOOKMARKS_KEY = 'blenderflow_curriculum_bookmarks_v2';

  static getCompletedLessonIds(): string[] {
    try {
      const data = localStorage.getItem(this.STORAGE_COMPLETED_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static setCompletedLessonIds(ids: string[]): void {
    try {
      const uniqueIds = Array.from(new Set(ids));
      localStorage.setItem(this.STORAGE_COMPLETED_KEY, JSON.stringify(uniqueIds));
    } catch (e) {
      console.error('Failed to set completed lessons', e);
    }
  }

  static setLessonCompleted(lessonId: string, completed: boolean): void {
    const list = this.getCompletedLessonIds();
    const exists = list.includes(lessonId);
    if (completed && !exists) {
      list.push(lessonId);
      this.setCompletedLessonIds(list);
    } else if (!completed && exists) {
      this.setCompletedLessonIds(list.filter((id) => id !== lessonId));
    }
  }

  static toggleLessonCompleted(lessonId: string): boolean {
    const list = this.getCompletedLessonIds();
    const index = list.indexOf(lessonId);
    let isNowCompleted = false;
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(lessonId);
      isNowCompleted = true;
    }
    try {
      localStorage.setItem(this.STORAGE_COMPLETED_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save completed lessons', e);
    }
    return isNowCompleted;
  }

  static isLessonCompleted(lessonId: string): boolean {
    return this.getCompletedLessonIds().includes(lessonId);
  }

  static getLessonNote(lessonId: string): string {
    try {
      const allNotes = JSON.parse(localStorage.getItem(this.STORAGE_NOTES_KEY) || '{}');
      return allNotes[lessonId] || '';
    } catch {
      return '';
    }
  }

  static saveLessonNote(lessonId: string, note: string): void {
    try {
      const allNotes = JSON.parse(localStorage.getItem(this.STORAGE_NOTES_KEY) || '{}');
      allNotes[lessonId] = note;
      localStorage.setItem(this.STORAGE_NOTES_KEY, JSON.stringify(allNotes));
    } catch (e) {
      console.error('Failed to save note', e);
    }
  }

  static getAllNotes(): Record<string, string> {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_NOTES_KEY) || '{}');
    } catch {
      return {};
    }
  }

  static setAllNotes(notes: Record<string, string>): void {
    try {
      localStorage.setItem(this.STORAGE_NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save all notes', e);
    }
  }

  static getBookmarks(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_BOOKMARKS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  static setBookmarks(ids: string[]): void {
    try {
      const uniqueIds = Array.from(new Set(ids));
      localStorage.setItem(this.STORAGE_BOOKMARKS_KEY, JSON.stringify(uniqueIds));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }

  static toggleBookmark(lessonId: string): boolean {
    const list = this.getBookmarks();
    const index = list.indexOf(lessonId);
    let bookmarked = false;
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(lessonId);
      bookmarked = true;
    }
    localStorage.setItem(this.STORAGE_BOOKMARKS_KEY, JSON.stringify(list));
    return bookmarked;
  }

  static findLessonById(lessonId: string): CurriculumLesson | null {
    for (const mod of BLENDER_CURRICULUM_MODULES) {
      for (const les of mod.lessons) {
        if (les.id === lessonId) return les;
      }
    }
    return null;
  }
}
