import { CurriculumLesson } from './curriculumDatabase';
import { InteractiveLabId } from '../components/curriculum/PrincipleLabWidget';
import { ConceptCheckItem } from '../components/curriculum/ConceptCheckDeck';
import { VideoResourceItem } from '../components/curriculum/VideoIllustrationCard';

export const EXTRA_LESSONS_PART1: Record<string, CurriculumLesson[]> = {
  'cur-mod-00': [
    {
      id: 'les-cur-mod-00-02',
      moduleId: 'cur-mod-00',
      title: '🗓️ BÀI 0.2: BẢN ĐỒ LỘ TRÌNH 24 TUẦN TỪ SỐ 0 ĐẾN 3D ARTIST',
      readTime: '6 phút đọc',
      summary: 'Kế hoạch từng cột mốc 6 tháng chia theo tháng: Dựng hình Nền tảng → Hard-Surface → UV & PBR Shading → Studio Lighting → Sculpt/Rig → GeoNodes & Game Pipeline.',
      keyShortcuts: ['Tab', 'G', 'R', 'S', 'Ctrl + A'],
      category: 'Roadmap & Strategy',
      level: 0,
      challengeRef: 'task-table-02',
      contentMarkdown: `# 🗓️ BÀI 0.2: BẢN ĐỒ LỘ TRÌNH 24 TUẦN TỪ SỐ 0 ĐẾN 3D ARTIST

---

## TỔNG QUAN 6 THÁNG RÈN LUYỆN CÓ ĐO LƯỜNG

Thay vì học dàn trải mọi thứ cùng lúc, lộ trình chuẩn công nghiệp chia năng lực Blender 5.3 thành 6 cột mốc gối đầu nhau:

| Tháng | Trọng tâm chuyên môn | Sản phẩm đầu ra (Milestone) |
| :--- | :--- | :--- |
| **Tháng 1 (Tuần 1–4)** | Điều hướng 3D, Transform G-R-S, 3D Cursor, Edit Mode cơ bản | Bàn học Isometric & Cốc cà phê Low-Poly |
| **Tháng 2 (Tuần 5–8)** | Quad Topology, Modifiers Stack, Hard-Surface Booleans + Bevels | Ghế gỗ chuẩn Quads & Hòm Sci-Fi cơ khí |
| **Tháng 3 (Tuần 9–12)** | UV Unwrapping, PBR Principled BSDF & Shader Editor | Rương báu cổ bọc đai sắt & vân gỗ |
| **Tháng 4 (Tuần 13–16)** | Ánh sáng 3 điểm, AgX Color, Cycles/EEVEE Next & Compositor 5.3 | Ảnh render Studio Đèn bàn chuyên nghiệp |
| **Tháng 5 (Tuần 17–20)** | Sculpting Dyntopo/Remesh, Retopology & Armature IK/FK | Tượng Totem điêu khắc & Cánh tay Robot IK |
| **Tháng 6 (Tuần 21–24)** | Geometry Nodes, Physics & Tối ưu Mesh/Baking xuất UE5/Unity | Đảo nổi tán rải thủ tục xuất chuẩn GLTF/FBX |

> 💡 **Lời khuyên thực chiến:** Hoàn thành trọn vẹn **1 sản phẩm nhỏ** ở cuối mỗi chặng giá trị hơn xem hết 20 tiếng video mà không xuất được file hoàn chỉnh nào.`,
    },
  ],
  'cur-mod-02': [
    {
      id: 'les-cur-mod-02-05',
      moduleId: 'cur-mod-02',
      title: '🔩 BÀI 2.5: BOOLEANS THỰC CHIẾN & KHỬ LỖI SHADING BẰNG WEIGHTED NORMALS',
      readTime: '7 phút đọc',
      summary: 'Làm chủ quy trình cắt khối Boolean phi phá hủy (Fast vs Exact), xử lý coplanar faces, kết hợp Bevel Modifier và Weighted Normals để bề mặt cong không bao giờ loang bóng.',
      keyShortcuts: ['Ctrl + B', 'Ctrl + A', 'Shift + Ctrl + B'],
      category: 'Hard-Surface Modeling',
      level: 2,
      challengeRef: 'task-sci-fi-crate',
      contentMarkdown: `# 🔩 BÀI 2.5: BOOLEANS THỰC CHIẾN & KHỬ LỖI SHADING BẰNG WEIGHTED NORMALS

---

## 1. BẢN CHẤT CỦA BOOLEAN MODIFIER (DIFFERENCE / UNION / INTERSECT)

Boolean cho phép khoét rãnh, đục lỗ tròn hoặc hợp nhất hai khối cơ khí phức tạp mà không cần cắt tay từng đỉnh:
- **Exact Solver (Mặc định Blender 5.3):** Chính xác về mặt toán học, xử lý tốt các cạnh trùng mặt phẳng nhưng chậm hơn với lưới hàng triệu đỉnh.
- **Fast Solver:** Nhanh gấp nhiều lần khi cắt các chi tiết đơn giản không bị giao cắt biên cạnh trùng nhau.

### Mẹo quản lý Dao cắt (Cutter Collection)
1. Đặt toàn bộ khối dùng để đục lỗ vào Collection riêng tên \`02_Booleans\`.
2. Trong *Object Properties → Viewport Display*, chuyển **Display As** của dao cắt thành **\`Wire\`** hoặc **\`Bounds\`** để nhìn xuyên thấy kết quả vết cắt theo thời gian thực.

---

## 2. TẠI SAO CẮT BOOLEAN XONG BỀ MẶT BỊ LOANG BÓNG ĐEN?

Khi một mặt phẳng lớn kết nối trực tiếp vào các đoạn vát Bevel nhỏ xíu ở rìa, Blender mặc định nội suy trung bình các vector pháp tuyến (Normals) tại đỉnh. Kết quả là mặt phẳng bị bẻ cong giả tạo về mặt ánh sáng!

### Chuỗi Modifier Vàng cho Hard-Surface (Thứ tự từ trên xuống dưới):
1. **Boolean Modifiers** (Cắt khối thô & rãnh kỹ thuật).
2. **Bevel Modifier** (*Limit Method: Angle 30°* hoặc *Weight*, kiểm tra tắt/bật *Clamp Overlap*).
3. **Weighted Normal Modifier** (Đặt **CUỐI CÙNG**, tích chọn **Keep Sharp**).

> ⚠️ **Lỗi thường gặp:** Nếu đặt *Weighted Normal* lên trên *Bevel*, hiệu quả nắn bóng sẽ mất sạch vì lưới vát được sinh ra sau đó!`,
    },
  ],
  'cur-mod-03': [
    {
      id: 'les-cur-mod-03-04',
      moduleId: 'cur-mod-03',
      title: '🎭 BÀI 3.4: GIẢI PHẪU GƯƠNG MẶT & LUỒNG LƯỚI BIỂU CẢM (FACE TOPOLOGY)',
      readTime: '6 phút đọc',
      summary: 'Cách đi vòng lưới đồng tâm quanh mắt, mũi, miệng và rãnh cười (Nasolabial fold) để nhân vật biểu cảm nói cười tự nhiên mà không bị gãy khối.',
      keyShortcuts: ['E', 'I', 'F', 'Ctrl + R'],
      category: 'Sculpting & Organic',
      level: 3,
      challengeRef: 'task-sculpt-totem',
      contentMarkdown: `# 🎭 BÀI 3.4: GIẢI PHẪU GƯƠNG MẶT & LUỒNG LƯỚI BIỂU CẢM

---

## 1. TẠI SAO KHÔNG THỂ DÙNG LƯỚI Ô VUÔNG ĐỀU (GRID) CHO GƯƠNG MẶT?

Khi con người nheo mắt, phồng má hay mở miệng, cơ mặt co giãn theo **các vòng cơ khép kín** chứ không co theo đường thẳng ngang dọc. Do đó Retopology gương mặt bắt buộc đi theo **4 vòng lưới đồng tâm (Concentric Face Loops)**:

1. **Vòng Mắt (Orbicularis Oculi Mask):** Ôm trọn hốc mắt hai bên hoặc nối liền thành hình "chiếc kính râm".
2. **Vòng Miệng (Orbicularis Oris):** Bao quanh môi trên/môi dưới, giúp môi chu ra hoặc mím lại mượt mà.
3. **Vòng Rãnh Cười (Nasolabial Loop):** Đi từ cánh mũi vòng xuống cằm — yếu tố quyết định độ tự nhiên khi nhân vật mỉm cười.
4. **Vòng Quai Hàm (Jawline Loop):** Định hình ranh giới sắc nét giữa mặt và vùng cổ.

---

## 2. QUY TRÌNH DỰNG VÒNG LƯỚI BẰNG POLYBUILD + SHRINKWRAP

- Bước 1: Đặt **Mirror Modifier** (bật *Clipping*) + **Shrinkwrap Modifier** (*Target: Tượng High-Poly*, *Wrap Method: Nearest Surface Point*).
- Bước 2: Vẽ dải 4 cạnh vòng quanh mắt và miệng trước tiên bằng số lượng cạnh chẵn (thường 12–16 cạnh cho mí mắt, 16–24 cạnh cho vòng miệng) để luôn đối xứng và dễ khép thành **100% Quads**.
- Bước 3: Nối cầu lưới (*Bridge Edge Loops*) giữa vùng trán, sống mũi và gò má. Đẩy mọi **E-Pole (5 cạnh)** ra vùng xương gò má hoặc thái dương — tuyệt đối tránh đặt lên mí mắt.

> 💡 **Mẹo kiểm tra nhanh:** Bật *Viewport Overlays → Face Orientation* và *Wireframe* để soi toàn bộ các vòng đồng tâm có liền mạch khép kín hay không.`,
    },
  ],
  'cur-mod-04': [
    {
      id: 'les-cur-mod-04-05',
      moduleId: 'cur-mod-04',
      title: '🧩 BÀI 4.5: PACK UV ISLANDS, TEXEL DENSITY & ĐA BẢN ĐỒ UV (UDIM/MULTI-UV)',
      readTime: '6 phút đọc',
      summary: 'Tối ưu diện tích ô UV [0-1], giữ đồng đều độ sắc nét điểm ảnh (Texel Density) giữa các chi tiết lớn nhỏ và tránh rách vân mipmap khi đưa vào Game Engine.',
      keyShortcuts: ['U', 'Ctrl + A', 'L'],
      category: 'UV & Materials',
      level: 4,
      challengeRef: 'task-uv-chest',
      contentMarkdown: `# 🧩 BÀI 4.5: PACK UV ISLANDS, TEXEL DENSITY & ĐA BẢN ĐỒ UV

---

## 1. TEXEL DENSITY LÀ GÌ VÀ TẠI SAO RẤT QUAN TRỌNG?

**Texel Density (Mật độ điểm ảnh)** là số pixel texture phủ trên mỗi mét (hoặc centimet) bề mặt mô hình 3D.
- Nếu cánh cửa tủ có Texel Density là *512 px/m*, nhưng tay nắm cửa bé xíu bên cạnh lại được phóng to hết cỡ trong UV thành *4096 px/m*, người xem sẽ thấy tay nắm sắc như dao còn cánh cửa thì mờ nhòe bất hợp lý!
- **Cách cân bằng trong Blender 5.3:** Trong *UV Editor*, chọn toàn bộ các đảo UV → **\`UV → Average Islands Scale\`** trước khi **\`UV → Pack Islands\`**.

---

## 2. QUY TẮC VÀNG KHI PACK ISLANDS

1. **Chừa lề Margin hợp lý (0.01 – 0.02):** Khi Game Engine hoặc Cycles nén mipmap ở khoảng cách xa, màu của đảo này có thể bị lem sang đảo bên cạnh (Texture Bleeding) nếu đặt quá sát nhau.
2. **Đặt thẳng trục các cạnh dài (Straightening):** Các thanh gỗ, đai sắt hay đường ống nên dùng *Follow Active Quads* nắn thẳng hàng ngang/dọc để vân gỗ chạy xuôi và tiết kiệm tới 30% diện tích ô UV.
3. **Ẩn Seam ở chỗ khuất:** Đặt đường rạch ở mặt đáy, gầm bàn hoặc nếp gấp dưới cánh tay để mắt người không bao giờ thấy vết nối texture.`,
    },
  ],
};

export const UPGRADED_CONTENT_PART1: Record<
  string,
  { title?: string; readTime?: string; summary?: string; keyShortcuts?: string[]; contentMarkdown: string }
> = {
  'les-cur-mod-00-01': {
    title: '🚀 BÀI 0.1: CHIẾN LƯỢC VƯỢT "TUTORIAL HELL" & 4 GIAI ĐOẠN TÂM LÝ',
    readTime: '5 phút đọc',
    summary: 'Phân tích 4 giai đoạn tâm lý của người tự học Blender, lý do rơi vào bẫy Tutorial Hell và nguyên tắc tỷ lệ vàng 30% Xem - 70% Tự dựng.',
    contentMarkdown: `# 🚀 BÀI 0.1: CHIẾN LƯỢC VƯỢT "TUTORIAL HELL" & 4 GIAI ĐOẠN TÂM LÝ

---

## 1. 4 GIAI ĐOẠN TÂM LÝ KHI TỰ HỌC 3D BLENDER

\`\`\`mermaid
flowchart TD
    G1["Giai đoạn 1: Bỡ ngỡ (Tuần 1-2)<br>Choáng ngợp bởi giao diện và phím tắt"] --> G2["Giai đoạn 2: Bắt chước (Tuần 3-6)<br>Làm theo các bài hướng dẫn kinh điển"]
    G2 --> G3["Giai đoạn 3: Thử thách Tự lập (Tuần 7-12)<br>Tự dựng đồ vật thật, đối mặt lỗi lưới & bóng méo"]
    G3 --> G4["Giai đoạn 4: Làm chủ Quy trình (Tháng 3+)<br>Phản xạ phím tắt & tư duy hình học"]
\`\`\`

---

## 2. BẪY "TUTORIAL HELL" & CÁCH PHÁ VỠ

Rất nhiều người xem hết hàng chục video hướng dẫn nhưng khi mở một file trống hoàn toàn lại không biết bắt đầu đặt khối đầu tiên ra sao. Đây là 4 nguyên nhân cốt lõi:

1. **Sao chép thụ động không hỏi "Tại sao":** Bạn bấm \`Ctrl + B\` vì người hướng dẫn bảo thế, nhưng chưa hiểu cạnh cần bắt sáng ngoài đời thực thế nào.
2. **Quên Apply Scale (\`Ctrl + A\`):** Nguyên nhân số 1 khiến người mới mất cả tiếng tự hỏi vì sao Bevel dẹt méo, UV bị kéo dài hoặc Physics nổ tung.
3. **Không dùng ảnh tham chiếu (Reference):** Dựng hình bằng trí nhớ khiến tỷ lệ chân bàn, độ dày mặt ghế sai lệch hoàn toàn so với vật thật.
4. **Học nhồi quá nặng trước khi thực hành:** Chưa thạo \`G-R-S\` đã vội nhảy sang Geometry Nodes phức tạp.

### Quy tắc Tỷ lệ 1/3 (Bắt buộc áp dụng sau mỗi chặng)
- **30% thời gian:** Đọc lý thuyết + thử nhanh Lab mô phỏng + xem video mẫu.
- **70% thời gian:** Mở Blender 5.3 thực hành dựng một biến thể riêng dựa trên cùng nguyên lý (ví dụ học làm chiếc cốc → tự dựng thêm chiếc bình giữ nhiệt mà không bật lại hướng dẫn).`,
  },
  'les-cur-mod-02-04': {
    readTime: '6 phút đọc',
    summary: 'Kỹ thuật Bevel Weights, Auto Smooth theo góc và cách đặt Holding Loops giúp cạnh kim loại bắt sáng sắc nét chuẩn điện ảnh.',
    keyShortcuts: ['Ctrl + B', 'Ctrl + A', 'Shift + E', 'I'],
    contentMarkdown: `# 🛠️ BÀI 2.4: HARD-SURFACE — BEVEL WEIGHTS, AUTO SMOOTH & HOLDING LOOPS

---

## 1. VÌ SAO CẠNH SẮC 90° KHIẾN MÔ HÌNH TRÔNG GIỐNG "ĐỒ HỌA GIẢ"?

Trong thực tế vật lý, hầu như **không tồn tại góc cạnh sắc 0.0mm** — ngay cả lưỡi dao hay khối thép CNC đều có độ bo rìa cực nhỏ. Chính dải vát nhỏ đó là nơi tạo ra **đường bắt sáng trắng (Specular Rim)** giúp mắt người phân biệt ranh giới hình khối và cảm nhận chất liệu kim loại cao cấp.

---

## 2. SO SÁNH 3 CÁCH BO CẠNH TRONG HARD-SURFACE BLENDER 5.3

| Phương pháp | Ưu điểm | Khi nào nên dùng |
| :--- | :--- | :--- |
| **1. Destructive Bevel (\`Ctrl + B\`)** | Nhanh, chỉnh trực tiếp từng cạnh | Chi tiết cố định không cần thay đổi kích thước sau này |
| **2. Bevel Modifier theo Edge Weight** | Phi phá hủy! Chỉnh thông số \`Mean Bevel Weight\` (0→1) cho từng cạnh riêng | Cỗ máy, vũ khí, đồ điện tử có cạnh to/nhỏ khác nhau |
| **3. Inset Holding Loops (\`I\`) + Subdivision** | Tạo bề mặt cong G2 mượt tuyệt đối dưới Subdivision Surface | Vỏ xe hơi, tay cầm công thái học, thân tàu bo tròn |

---

## 3. QUY TRÌNH DÙNG EDGE BEVEL WEIGHT CHUẨN

1. Ở Object Mode: bấm \`Ctrl + A\` → **Apply Scale** để chắc chắn thông số scale là \`(1, 1, 1)\`.
2. Vào Edit Mode (\`Tab\`), chọn các cạnh cần vát, mở thanh Sidebar \`N\` → mục **Edge Data → Bevel Weight** kéo lên \`1.0\`.
3. Thêm **Bevel Modifier** → đổi *Limit Method* từ \`Angle\` sang **\`Weight\`**, đặt *Segments: 2–3*.
4. Bật **Shade Smooth by Angle** (chuột phải ở Object Mode trong Blender 4.1–5.3) và giữ góc khoảng \`30°–35°\`.`,
  },
  'les-cur-mod-03-01': {
    readTime: '6 phút đọc',
    summary: 'Làm chủ tư duy điêu khắc 3 cấp độ (Big Shapes → Medium Forms → Micro Details) và bộ 6 cây cọ cốt lõi trong Sculpt Mode Blender 5.3.',
    keyShortcuts: ['F', 'Shift + F', 'Shift', 'Ctrl'],
    contentMarkdown: `# 🗿 BÀI 3.1: SCULPT MODE CƠ BẢN & BỘ CỌ NỀN TẢNG

---

## 1. NGUYÊN TẮC TƯ DUY ĐIÊU KHẮC: TỪ LỚN ĐẾN NHỎ

Sai lầm phổ biến nhất của người mới là vừa mở tượng lên đã thu nhỏ cọ đi khắc lỗ chân lông, nếp nhăn trong khi tỷ lệ hộp sọ và khung vai còn méo xệch. Luôn tuân theo 3 tầng:
1. **Primary Shapes (Khối lớn - 70% quyết định cái đẹp):** Kéo dáng tổng thể, tỷ lệ dài-rộng-cao bằng cọ \`Grab (G)\` ở độ phân giải lưới rất thấp.
2. **Secondary Forms (Khối trung bình):** Đắp bó cơ, hốc mắt, sống mũi, nếp gấp lớn bằng \`Clay Strips\` và \`Draw Sharp\`.
3. **Tertiary Details (Chi tiết vi mô):** Vết xước đá, nếp da nhỏ chỉ thêm ở bước cuối cùng.

---

## 2. BỘ 6 CỌ SỐNG CÒN & PHÍM TẮT ĐIỀU KHIỂN NHANH

| Phím / Cọ | Công dụng chính | Mẹo thao tác hiệu quả |
| :--- | :--- | :--- |
| **\`F\` + Rê chuột** | Chỉnh kích thước đầu cọ (Radius) | Kết hợp giữ \`Ctrl\` để lật ngược từ đắp nổi sang khoét lõm |
| **\`Shift + F\`** | Chỉnh lực ấn cọ (Strength) | Giữ \`Shift\` khi đang vẽ để kích hoạt tức thì cọ **Smooth** làm mịn |
| **Grab (\`G\`)** | Nắn kéo dáng tổng thể cực mạnh | Dùng ở bước Blockout để chỉnh tỷ lệ đầu, thân |
| **Clay Strips** | Đắp từng dải đất sét như điêu khắc thật | Cọ "vua" để xây khối cơ bắp và vách đá thô |
| **Crease / Draw Sharp** | Khắc đường rãnh sắc (khóe miệng, vết nứt) | Kết hợp \`Ctrl\` để đẩy gờ cạnh sắc nhọn lên |
| **Flatten / Scrape** | Vạt phẳng tạo mặt cắt Stylized hoặc đá | Cực hữu ích cho phong cách khối đá cổ và tượng Low-poly |

> 💡 **Mẹo Blender 5.3:** Bật đối xứng trục \`X\` ở thanh Header trên cùng (biểu tượng con bướm **Symmetry X**) trước khi nắn dáng mặt hoặc nhân vật.`,
  },
  'les-cur-mod-03-02': {
    readTime: '6 phút đọc',
    summary: 'Phân biệt rõ ràng Dyntopo (lưới tam giác động), Voxel Remesh (đồng nhất toàn khối) và Multiresolution (tối ưu tầng chi tiết cho Animation).',
    keyShortcuts: ['R', 'Ctrl + R'],
    contentMarkdown: `# 🔄 BÀI 3.2: DYNTOPO VS VOXEL REMESH VS MULTIRESOLUTION

---

## 1. BẢNG SO SÁNH 3 CÔNG NGHỆ TẠO ĐỘ PHÂN GIẢI ĐIÊU KHẮC

| Công cụ | Cơ chế lưới | Ưu điểm nổi bật | Nhược điểm cần tránh |
| :--- | :--- | :--- | :--- |
| **Voxel Remesh (\`R\` / \`Ctrl+R\`)** | Tính lại toàn bộ thể tích thành lưới Quads đồng đều kích thước | Không bao giờ bị rách lưới; ghép nhiều khối rời (đầu + thân) thành một tượng liền tức thì | Xóa sạch UV và chi tiết nhỏ hơn Voxel Size; không dùng trực tiếp để gắn xương |
| **Dyntopo (Dynamic Topology)** | Tự động chia nhỏ tam giác ngay dưới nét cọ vẽ | Thoải mái kéo vòi voi, sừng nhọn bằng *Snake Hook* mà không bị thiếu lưới cục bộ | Tạo lưới tam giác lộn xộn; làm chậm viewport nếu quá dày và phá UV |
| **Multiresolution Modifier** | Chia tầng Subdivide nhiều cấp độ trên nền lưới Quads sạch | Có thể chuyển lên/xuống giữa Level 1 (nhẹ) và Level 5 (chi tiết) để vừa nắn dáng vừa khắc da | Yêu cầu mô hình gốc phải có Topology Quads sạch sẵn (sau bước Retopology) |

---

## 2. QUY TRÌNH CHUẨN TRONG SẢN XUẤT THỰC TẾ

1. **Giai đoạn Blockout (Thô):** Nối nhiều khối cầu/khối trụ lại → Bấm \`Shift + R\` kéo ô lưới mẫu → Bấm \`Ctrl + R\` để **Voxel Remesh** gộp tất cả thành một tượng liền khối.
2. **Giai đoạn Phát triển chi tiết:** Giảm dần *Voxel Size* (VD: \`0.05m → 0.015m → 0.005m\`) qua mỗi vòng tinh chỉnh hình dáng.
3. **Sau khi Retopology xong:** Nếu cần điêu khắc chi tiết lỗ chân lông/vết rạn trên nhân vật đã có Quads + UV → dùng **Multiresolution Modifier** để sau này **Bake Normal Map** siêu sạch!`,
  },
  'les-cur-mod-03-03': {
    readTime: '7 phút đọc',
    summary: 'Cách biến tượng điêu khắc triệu đỉnh thành mô hình Quad siêu nhẹ bằng Snap Face Project, Shrinkwrap và kỹ thuật chuyển hướng Edge Flow.',
    keyShortcuts: ['E', 'F', 'Tab'],
    contentMarkdown: `# 🕸️ BÀI 3.3: RETOPOLOGY CHUẨN ANIMATION — TỪ TRIỆU ĐỈNH VỀ LƯỚI QUADS NHẸ

---

## 1. RETOPOLOGY LÀ GÌ & KHI NÀO PHẢI LÀM?

Một bức tượng vừa điêu khắc bằng Voxel Remesh thường nặng **500.000 – 5.000.000 đỉnh**. Nếu đưa thẳng vào game hoặc gắn xương chuyển động, máy tính sẽ giật đứng và khớp nối bị nhăn nát. **Retopology** là quá trình "bọc một chiếc áo lưới Quads nhẹ mới (~5.000 – 25.000 faces)" bám khít lên bề mặt tượng High-Poly.

---

## 2. THIẾT LẬP MÔI TRƯỜNG RETOPOLOGY CHỈ TRONG 30 GIÂY

1. Khóa tượng High-Poly (tắt biểu tượng mũi tên chọn trong Outliner) để không bấm nhầm.
2. Tạo một \`Plane\` mới, xóa 3 đỉnh hoặc giữ 1 mặt nhỏ, đặt tên \`Retopo_Mesh\`.
3. Gắn **Mirror Modifier** (trục X, bật *Clipping*) + **Shrinkwrap Modifier** (Target = Tượng High-Poly, Offset = \`0.001m\`).
4. Bật **Snapping (Nam châm \`Shift + Tab\`)** chọn **\`Face Project\`**, tích chọn *Project Individual Elements*.
5. Bật mục **In Front** trong *Object Properties → Viewport Display* để lưới mới luôn nổi rõ phía trên tượng gốc mà không bị chìm vào bề mặt.

---

## 3. NGUYÊN TẮC ĐI LƯỚI ĐẸP & NHẸ

- **Dùng công cụ PolyBuild** ở thanh trái Edit Mode: giữ \`Ctrl\` + Click để kéo nhanh từng mặt Quad tự động bám bề mặt.
- **Tập trung mật độ đúng chỗ:** Khuỷu tay, đầu gối, mí mắt, miệng cần **3 vòng cắt sát nhau** để khi gập khớp không bị mất thể tích; phần phẳng như lưng/đùi giữ lưới thưa vuông vức.`,
  },
  'les-cur-mod-04-04': {
    readTime: '6 phút đọc',
    summary: 'Kết hợp sơn trực tiếp lên mô hình trong Texture Paint với kỹ thuật tạo xước viền kim loại tự động bằng Ambient Occlusion & Pointiness.',
    keyShortcuts: ['F', 'Ctrl + T'],
    contentMarkdown: `# 🎨 BÀI 4.4: TEXTURE PAINTING & KỸ THUẬT PHONG HÓA (EDGE WEAR)

---

## 1. QUY TRÌNH SƠN TRỰC TIẾP TRONG WORKSPACE TEXTURE PAINT

1. Đảm bảo mô hình đã **UV Unwrap sạch không chồng lấn** trước khi bắt đầu sơn.
2. Trong *Shader Editor*, tạo node \`Image Texture\`, bấm **New** tạo ảnh mới (VD: \`2048 × 2048\`, tên \`Chest_Albedo\`) và nối vào \`Base Color\` của \`Principled BSDF\`.
3. Chuyển sang Workspace **Texture Paint**:
   - Phím \`F\`: đổi kích thước cọ sơn.
   - Bấm \`S\` trên bề mặt để hút màu mẫu (Color Picker).
   - **Cẩn trọng lớn:** Blender KHÔNG tự lưu file ảnh Texture Paint khi bạn bấm \`Ctrl + S\` lưu file \`.blend\`! Bắt buộc vào menu **\`Image → Save\`** (hoặc \`Alt + S\` trong Image Editor) sau khi vẽ xong nếu không muốn mất trắng toàn bộ lớp sơn!

---

## 2. TẠO XƯỚC CẠNH & BỤI BẨN THỦ TỤC (PROCEDURAL EDGE WEAR)

Để hòm vũ khí hoặc rương cổ trông có chiều sâu lịch sử, bề mặt cần **sáng kim loại trầy xước ở các cạnh lồi** và **bám bụi tối màu ở các khe lõm**:
- **Khe lõm bám bụi:** Dùng node \`Ambient Occlusion\` qua \`ColorRamp\` để trộn lớp bùn/rỉ tối vào vùng góc kẹt.
- **Cạnh lồi trầy xước:** Dùng node \`Geometry → Pointiness\` (hoặc \`Bevel\` node + \`Dot Product\`) qua \`ColorRamp\` tương phản cao, kết hợp \`Noise Texture\` để làm mặt nạ lộ lớp thép sáng dưới lớp sơn tróc.`,
  },
};

export const LAB_MAP_PART1: Record<string, InteractiveLabId> = {
  'les-cur-mod-01-02': 'transform-scale',
  'les-cur-mod-01-03': 'transform-scale',
  'les-cur-mod-02-01': 'quad-subdiv',
  'les-cur-mod-02-02': 'quad-subdiv',
  'les-cur-mod-02-03': 'bevel-normals',
  'les-cur-mod-02-04': 'bevel-normals',
  'les-cur-mod-02-05': 'bevel-normals',
  'les-cur-mod-03-03': 'quad-subdiv',
  'les-cur-mod-03-04': 'quad-subdiv',
  'les-cur-mod-04-01': 'uv-net',
  'les-cur-mod-04-02': 'pbr-physics',
  'les-cur-mod-04-03': 'pbr-physics',
  'les-cur-mod-04-05': 'uv-net',
};

export const CONCEPT_CHECKS_PART1: Record<string, ConceptCheckItem[]> = {
  'les-cur-mod-00-01': [
    {
      id: 'cc-00-01-a',
      prompt: 'Tình huống nào dưới đây là dấu hiệu điển hình của hội chứng "Tutorial Hell"?',
      options: [
        'Xem hết 15 video nhưng khi mở file Blender trống lại không tự dựng được một chiếc bàn đơn giản.',
        'Dùng phím tắt G, R, S liên tục để căn chỉnh đối tượng trong Viewport.',
        'Lưu ảnh tham chiếu Orthographic trước khi dựng hình.',
      ],
      correctIndex: 0,
      explanation: 'Sao chép thao tác bấm nút theo video mà thiếu bước tự thực hành biến thể riêng khiến não bộ chỉ quen làm theo chỉ dẫn thụ động.',
    },
    {
      id: 'cc-00-01-b',
      prompt: 'Tỷ lệ thời gian được khuyến nghị giữa xem lý thuyết và tự tay dựng biến thể trên Blender là bao nhiêu?',
      options: ['80% Xem video - 20% Làm thử', '30% Xem/Học nguyên lý - 70% Tự dựng thực hành', '100% Làm đại không cần xem nguyên lý'],
      correctIndex: 1,
      explanation: 'Nguyên lý 30/70 (hoặc 1/3) giúp bạn nắm nhanh cốt lõi rồi củng cố ngay bằng phản xạ thực hành tự giải quyết lỗi.',
    },
  ],
  'les-cur-mod-00-02': [
    {
      id: 'cc-00-02-a',
      prompt: 'Vì sao lộ trình 24 tuần đặt bước Retopology & Baking trước khi xuất Game Engine (Unity/UE5)?',
      options: [
        'Vì mô hình Sculpt triệu đỉnh sẽ làm giật khung hình Game Engine và khó trải UV.',
        'Vì Game Engine không mở được vật liệu có màu xám.',
        'Để tăng dung lượng file .fbx lên mức cao nhất có thể.',
      ],
      correctIndex: 0,
      explanation: 'Game thời gian thực cần lưới Low-Poly nhẹ (Quads/Tris) nhưng giữ được độ nổi khối chi tiết nhờ nướng Normal Map từ High-Poly.',
    },
  ],
  'les-cur-mod-01-01': [
    {
      id: 'cc-01-01-a',
      prompt: 'Để nhìn mô hình hoàn toàn phẳng không bị méo phối cảnh xa gần khi căn khớp chiều cao, bạn nên dùng cặp phím nào?',
      options: ['Z -> Rendered', 'Numpad 1 / 3 / 7 kết hợp Numpad 5 (Orthographic)', 'Shift + H'],
      correctIndex: 1,
      explanation: 'Góc nhìn Orthographic loại bỏ điểm tụ phối cảnh, giúp bạn gióng thẳng hàng các cạnh và đặt khớp ảnh Blueprint chính xác tuyệt đối.',
    },
    {
      id: 'cc-01-01-b',
      prompt: 'Nếu muốn nhìn xuyên thấy toàn bộ cấu trúc lưới dây bên trong mô hình, bạn chọn chế độ Shading nào từ menu Z?',
      options: ['Solid', 'Wireframe', 'Material Preview'],
      correctIndex: 1,
      explanation: 'Wireframe hiển thị khung dây trong suốt toàn bộ cạnh/đỉnh; Solid để dựng khối đặc và Material Preview xem vật liệu nhanh với HDRI giả lập.',
    },
  ],
  'les-cur-mod-01-02': [
    {
      id: 'cc-01-02-a',
      prompt: 'Bạn Scale một khối hộp dài gấp 3 lần ở Object Mode (Scale X = 3.0) rồi vào Edit Mode bấm Ctrl + B để vát cạnh. Điều gì xảy ra nếu bạn chưa bấm Ctrl + A?',
      options: [
        'Đường vát Bevel bị bẹp méo không đều (lệch thành góc nhọn/elip theo trục X).',
        'Blender tự động xóa mặt đáy của khối hộp.',
        'Khối hộp chuyển thành màu đỏ báo lỗi Shader.',
      ],
      correctIndex: 0,
      explanation: 'Edit Mode tính toán Bevel trên tọa độ nội bộ (Local), sau đó Object Scale nhân kéo dãn kết quả ra ngoài. Luôn Apply Scale (Ctrl + A) trước khi Bevel!',
    },
    {
      id: 'cc-01-02-b',
      prompt: 'Muốn di chuyển chiếc ghế trên mặt sàn X-Y mà tuyệt đối không bị nhấc lơ lửng hay chìm xuống đất (khóa trục Z), bạn bấm tổ hợp nào?',
      options: ['G rồi Z', 'G rồi Shift + Z', 'R rồi Shift + X'],
      correctIndex: 1,
      explanation: 'Bấm Shift + Tên trục (Shift + Z) có nghĩa là LOẠI TRỪ trục đó, chỉ cho phép biến đổi trên hai trục còn lại (mặt phẳng X-Y).',
    },
  ],
  'les-cur-mod-01-03': [
    {
      id: 'cc-01-03-a',
      prompt: 'Khi làm bản lề cánh cửa mở xoay quanh mép khung thay vì xoay lộn xộn ở tâm giữa tấm gỗ, bạn cần dời yếu tố nào ra mép khung?',
      options: ['Outliner Collection', 'Object Origin (thông qua 3D Cursor -> Set Origin to 3D Cursor)', 'Timeline Playhead'],
      correctIndex: 1,
      explanation: 'Phép xoay R và thu phóng S mặc định luôn lấy Object Origin (chấm cam) làm tâm trục xoay.',
    },
    {
      id: 'cc-01-03-b',
      prompt: 'Nếu muốn giữ khối dao cắt Boolean vẫn cắt được trong cảnh lúc dựng hình nhưng KHÔNG xuất hiện đè lên ảnh khi bấm F12 Render, bạn tắt icon nào trong Outliner?',
      options: ['Icon Con Mắt (Hide in Viewport)', 'Icon Máy Ảnh (Disable in Renders)', 'Icon Khóa Chọn'],
      correctIndex: 1,
      explanation: 'Tắt icon Con Mắt chỉ giấu trong Viewport khi đang làm, còn tắt icon Máy Ảnh mới ngăn đối tượng xuất hiện trong ảnh Render cuối cùng.',
    },
  ],
  'les-cur-mod-02-01': [
    {
      id: 'cc-02-01-a',
      prompt: 'Loại đa giác nào vừa giúp đường cắt Loop Cut (Ctrl + R) chạy xuyên suốt vừa không gây nhăn nhúm dưới Subdivision Surface?',
      options: ['Quads (Mặt đúng 4 đỉnh)', 'N-gons (Mặt 6–8 đỉnh)', 'Tam giác dài nhọn (Triangles)'],
      correctIndex: 0,
      explanation: 'Thuật toán Catmull-Clark Subdivision và Loop Cut được thiết kế xoay quanh luồng 2 cặp cạnh đối diện của mặt 4 đỉnh (Quads).',
    },
    {
      id: 'cc-02-01-b',
      prompt: 'Tổ hợp phím nào dùng để bôi sáng toàn bộ cạnh hở hoặc mặt rách (Non-manifold) trong Edit Mode?',
      options: ['Alt + N', 'Shift + Ctrl + Alt + M', 'Ctrl + Shift + T'],
      correctIndex: 1,
      explanation: 'Trong Edit Mode (chế độ Vertex hoặc Edge, bỏ chọn hết bằng Alt+A), bấm Shift + Ctrl + Alt + M sẽ chọn ngay mọi vị trí lưới chưa kín nước.',
    },
  ],
  'les-cur-mod-02-02': [
    {
      id: 'cc-02-02-a',
      prompt: 'Nếu bạn bấm E (Extrude) rồi bất ngờ đổi ý bấm Chuột phải (Right-Click) hủy, bẫy ngầm nào đang chờ bạn?',
      options: [
        'Lệnh hủy hoàn toàn sạch sẽ như chưa từng bấm gì.',
        'Blender chỉ hủy di chuyển nhưng VẪN ĐỂ LẠI lớp đỉnh/mặt trùng khít nằm chồng lên nhau!',
        'Khối lưới tự động biến thành Curve.',
      ],
      correctIndex: 1,
      explanation: 'Đây là bẫy kinh điển: Right-Click chỉ hủy bước kéo (Move) sau khi Extrude đã sinh đỉnh mới! Luôn bấm Ctrl + Z để hoàn tác hoặc A -> M -> By Distance.',
    },
    {
      id: 'cc-02-02-b',
      prompt: 'Để nối liền mặt giữa 2 vòng cạnh hở đối diện nhau thành quai cốc cà phê mượt mà chỉ bằng 1 lệnh, bạn dùng tính năng nào?',
      options: ['Inset Faces (I)', 'Bridge Edge Loops (Ctrl + E)', 'Knife Tool (K)'],
      correctIndex: 1,
      explanation: 'Bridge Edge Loops cho phép bạn nối cầu nối giữa 2 vòng cạnh kèm thanh chỉnh số phân đoạn cong (Number of Cuts) rất nhanh.',
    },
  ],
  'les-cur-mod-02-03': [
    {
      id: 'cc-02-03-a',
      prompt: 'Khi dùng Mirror Modifier ở giữa đối xứng để hai nửa trái phải dính liền thành một khối kín không bị tách hở hay lồng đè nhau, cần bật tùy chọn nào?',
      options: ['Merge & Clipping', 'Apply Scale', 'X-Ray Overlay'],
      correctIndex: 0,
      explanation: 'Clipping giữ các đỉnh nằm trên trục gương dính chặt vào mặt phẳng đối xứng không vượt qua nửa bên kia khi bạn kéo chỉnh.',
    },
  ],
  'les-cur-mod-02-04': [
    {
      id: 'cc-02-04-a',
      prompt: 'Vì sao việc bấm Inset (I) tạo một vòng mặt đệm trước khi đùn lõm mặt (E) lại quan trọng khi dùng Subdivision Surface?',
      options: [
        'Tạo vòng Holding Edge Loop bao quanh giúp góc không bị co tròn quá mức hay xuất hiện vệt nhăn góc.',
        'Giúp giảm dung lượng texture xuống một nửa.',
        'Biến mặt phẳng thành vật liệu phát sáng Emission.',
      ],
      correctIndex: 0,
      explanation: 'Holding Loop khóa chặt độ cong ở mép góc để Subdivision Surface giữ nguyên độ sắc nét cơ khí mà vẫn bắt sáng mềm mại.',
    },
  ],
  'les-cur-mod-02-05': [
    {
      id: 'cc-02-05-a',
      prompt: 'Thứ tự đặt Modifier Stack nào dưới đây là CHUẨN để khử lỗi bóng đen sau khi đục lỗ Boolean?',
      options: [
        'Weighted Normal -> Bevel -> Boolean',
        'Boolean -> Bevel -> Weighted Normal (Keep Sharp)',
        'Subdivision Surface -> Weighted Normal -> Boolean',
      ],
      correctIndex: 1,
      explanation: 'Weighted Normal phải nằm SAU Bevel ở dưới cùng để tính lại vector pháp tuyến cho cả các mặt phẳng lớn và các dải cạnh vát vừa được sinh ra.',
    },
  ],
  'les-cur-mod-03-01': [
    {
      id: 'cc-03-01-a',
      prompt: 'Trong lúc đang cầm cọ điêu khắc bất kỳ trong Sculpt Mode, giữ phím Shift có tác dụng gì?',
      options: ['Chuyển nhanh sang cọ Smooth làm mịn tức thì', 'Nhân đôi bức tượng', 'Xóa toàn bộ mặt lưới'],
      correctIndex: 0,
      explanation: 'Giữ Shift chuyển tạm sang Smooth; giữ Ctrl đảo ngược hướng đắp nổi sang khoét lõm mà không cần rời tay chọn icon mới.',
    },
  ],
  'les-cur-mod-03-02': [
    {
      id: 'cc-03-02-a',
      prompt: 'Khi bạn ghép 1 khối cầu làm đầu và 1 khối trụ làm cổ muốn trộn chúng thành một khối đất sét liền lạc nhanh nhất, bạn dùng công cụ nào?',
      options: ['Ctrl + J rồi Voxel Remesh (Ctrl + R)', 'Inset Faces (I)', 'UV Pack Islands'],
      correctIndex: 0,
      explanation: 'Join (Ctrl + J) hai object lại rồi chạy Voxel Remesh (Ctrl + R) sẽ tính lại lớp vỏ thể tích kín nước hợp nhất hai khối tức thì.',
    },
  ],
  'les-cur-mod-03-03': [
    {
      id: 'cc-03-03-a',
      prompt: 'Cặp công cụ nào giữ vai trò kéo dán lưới Low-Poly mới bám sát bề mặt tượng điêu khắc High-Poly?',
      options: [
        'Snapping (Face Project) + Shrinkwrap Modifier',
        'Array Modifier + Solidify Modifier',
        'Wave Modifier + Decimate Modifier',
      ],
      correctIndex: 0,
      explanation: 'Face Project bắt dính điểm mới tạo ngay trên bề mặt tượng, còn Shrinkwrap đảm bảo toàn bộ lưới bám khít liên tục khi bạn trượt hoặc chỉnh sửa.',
    },
  ],
  'les-cur-mod-03-04': [
    {
      id: 'cc-03-04-a',
      prompt: 'Vì sao quanh mắt và quanh miệng nhân vật hoạt hình luôn phải đi các vòng cạnh đồng tâm (Concentric Face Loops)?',
      options: [
        'Để biến dạng co giãn tự nhiên theo vòng cơ khi chớp mắt, nói chuyện mà không bị gãy lưới.',
        'Để dễ dùng lệnh Boolean cắt xuyên đầu nhân vật.',
        'Vì Blender không hỗ trợ chọn cạnh theo đường thẳng trên đầu.',
      ],
      correctIndex: 0,
      explanation: 'Lưới đồng tâm mô phỏng đúng cấu trúc cơ vòng mặt ngoài đời thực, giúp Blendshapes/Armature kéo nét mặt cực kỳ mượt.',
    },
  ],
  'les-cur-mod-04-01': [
    {
      id: 'cc-04-01-a',
      prompt: 'Trước khi bấm U -> Unwrap để trải lưới UV không bị méo tỷ lệ trên một khối hộp dài, bạn cần kiểm tra bước gì?',
      options: [
        'Apply Scale (Ctrl + A) ở Object Mode và đặt Mark Seam (Ctrl + E) hợp lý.',
        'Đặt đèn Sun công suất 1000W.',
        'Thêm Rigify Meta-Rig vào trong khối hộp.',
      ],
      correctIndex: 0,
      explanation: 'Nếu Object chưa Apply Scale, phép trải UV Unwrap sẽ bị kéo dãn méo mó theo trục scale cũ khiến chữ/vân gỗ in lên bị bẹp.',
    },
  ],
  'les-cur-mod-04-02': [
    {
      id: 'cc-04-02-a',
      prompt: 'Theo quy tắc vật lý PBR trong Principled BSDF, giá trị Metallic nên đặt thế nào cho một chiếc ghế gỗ phủ sơn bóng?',
      options: ['Metallic = 0.0 (Phi kim) và điều chỉnh độ bóng bằng Roughness', 'Metallic = 0.5 để hơi ánh kim cho đẹp', 'Metallic = 1.0'],
      correctIndex: 0,
      explanation: 'Gỗ và lớp sơn bóng là vật liệu cách điện (Dielectric), ánh sáng bóng đến từ Roughness thấp chứ KHÔNG phải Metallic! Đặt Metallic 0.5 sẽ làm sai vật lý phản xạ.',
    },
    {
      id: 'cc-04-02-b',
      prompt: 'Khi nạp ảnh Normal Map vào Principled BSDF trong Shader Editor, cài đặt Color Space của node Image Texture BẮT BUỘC phải là gì?',
      options: ['sRGB', 'Non-Color', 'AgX Base'],
      correctIndex: 1,
      explanation: 'Normal Map, Roughness và Metallic chứa dữ liệu vector/toán học chứ không phải màu mắt nhìn (sRGB). Nếu quên đổi sang Non-Color, ánh sáng phản chiếu sẽ lệch hướng hoàn toàn!',
    },
  ],
  'les-cur-mod-04-03': [
    {
      id: 'cc-04-03-a',
      prompt: 'Khi bật Addon Node Wrangler, bấm Ctrl + T vào một Texture Node sẽ sinh ra cặp node nào?',
      options: [
        'Texture Coordinate + Mapping (để xoay, dịch, lặp lại vân)',
        'Mix Shader + Emission',
        'Principled BSDF + Material Output',
      ],
      correctIndex: 0,
      explanation: 'Ctrl + T tạo nhanh bộ điều khiển tọa độ (Generated / UV / Object) kết hợp Mapping giúp chỉnh kích thước Scale hoa văn thủ tục rất nhanh.',
    },
  ],
  'les-cur-mod-04-04': [
    {
      id: 'cc-04-04-a',
      prompt: 'Sau khi dùng cọ sơn trực tiếp lên mô hình trong Texture Paint, bấm Ctrl + S lưu file .blend có tự động lưu luôn ảnh vừa sơn không?',
      options: [
        'Không! Phải lưu ảnh riêng bằng Image -> Save (hoặc Alt + S) trước khi đóng Blender.',
        'Có, Blender tự động lưu toàn bộ ảnh vào ổ C.',
        'Chỉ lưu nếu đã bật Eevee.',
      ],
      correctIndex: 0,
      explanation: 'Dữ liệu pixel ảnh nằm trong bộ nhớ đệm riêng biệt với mesh .blend cho tới khi bạn Save Image ra file .png/.exr hoặc chọn Pack Resources.',
    },
  ],
  'les-cur-mod-04-05': [
    {
      id: 'cc-04-05-a',
      prompt: 'Vì sao khi Pack UV Islands cần chừa một khoảng lề Margin (0.01–0.02) giữa các đảo thay vì xếp dính sát vào nhau?',
      options: [
        'Tránh hiện tượng lem màu (Texture Bleeding) khi Game Engine giảm độ phân giải Mipmap ở xa.',
        'Để làm file .png nhẹ đi 90%.',
        'Để mô hình tự động có hiệu ứng phát sáng.',
      ],
      correctIndex: 0,
      explanation: 'Khi camera lùi xa, GPU lọc gộp các điểm ảnh lân cận (Mipmapping). Nếu hai đảo màu khác nhau nằm sát rạt, rìa màu bên này sẽ loang sang đảo bên kia.',
    },
  ],
};

export const VIDEOS_PART1: Record<string, VideoResourceItem[]> = {
  'les-cur-mod-00-01': [
    {
      title: 'Blender 5 Complete Beginners Guide - Part 1 - The Interface',
      channel: 'Grant Abbitt',
      youtubeId: 'kVcY7K-JA1Y',
      startSeconds: 0,
      durationLabel: '10 phút (Part 1)',
      focusPoints: [
        'Cách học từng bước nhỏ có thử thách ngay cuối bài (Micro-challenges) để tránh bẫy xem thụ động.',
        'Làm quen không gian 3D mà không bị choáng ngợp bởi hàng trăm menu.',
      ],
      chapters: [
        { label: 'Mở đầu & Tư duy', startSeconds: 0, timeText: '00:00' },
        { label: 'Thử thách tự làm đầu tiên', startSeconds: 546, timeText: '09:06' },
      ],
    },
  ],
  'les-cur-mod-00-02': [
    {
      title: 'Beginner Blender Tutorial (2026) — Full Course Overview',
      channel: 'Blender Guru',
      youtubeId: 'z-Xl9tGqH14',
      startSeconds: 0,
      durationLabel: '4h 19m (Toàn bộ lộ trình)',
      focusPoints: [
        'Quan sát cách một dự án 3D chuẩn đi qua đầy đủ 8 chặng: Modeling → Materials → UV → Scattering → Render.',
      ],
      chapters: [
        { label: 'Part 1: Basics', startSeconds: 0, timeText: '00:00' },
        { label: 'Part 2: Modelling', startSeconds: 1696, timeText: '28:16' },
        { label: 'Part 4: Materials', startSeconds: 5413, timeText: '1:30:13' },
        { label: 'Part 8: Render', startSeconds: 13571, timeText: '3:46:11' },
      ],
    },
  ],
  'les-cur-mod-01-01': [
    {
      title: 'Blender 5 Complete Beginners Guide - Part 1 - The Interface',
      channel: 'Grant Abbitt',
      youtubeId: 'kVcY7K-JA1Y',
      startSeconds: 95,
      durationLabel: '01:35 – 04:40',
      focusPoints: [
        'Nhận diện bố cục 4 cửa sổ cốt lõi trong Blender 5.',
        'Phân biệt Perspective vs Orthographic và hệ trục tọa độ X-Y-Z.',
      ],
      chapters: [
        { label: 'Giao diện Blender 5', startSeconds: 95, timeText: '01:35' },
        { label: 'Điều hướng Viewport', startSeconds: 132, timeText: '02:12' },
        { label: 'Camera & Ortho View', startSeconds: 204, timeText: '03:24' },
      ],
    },
  ],
  'les-cur-mod-01-02': [
    {
      title: 'Blender 5 Complete Beginners Guide — Transform G-R-S',
      channel: 'Grant Abbitt',
      youtubeId: 'kVcY7K-JA1Y',
      startSeconds: 374,
      durationLabel: '06:14 – 09:06',
      focusPoints: [
        'Di chuyển (G), khóa trục (X/Y/Z), xoay (R) và thu phóng (S) không cần rê chuột vào Gizmo.',
      ],
      chapters: [
        { label: 'Phím G (Grab)', startSeconds: 374, timeText: '06:14' },
        { label: 'Khóa trục X-Y-Z', startSeconds: 410, timeText: '06:50' },
        { label: 'Phím R & S', startSeconds: 468, timeText: '07:48' },
      ],
    },
  ],
  'les-cur-mod-01-03': [
    {
      title: 'Blender 5.0 Donut Tutorial - Part 1: The Basics',
      channel: 'Blender Guru',
      youtubeId: '-tbSCMbJA6o',
      startSeconds: 0,
      durationLabel: 'Full Part 1',
      focusPoints: [
        'Cách thêm khối mới bằng Shift+A tại vị trí 3D Cursor và quản lý tên vật thể trong Outliner.',
      ],
    },
  ],
  'les-cur-mod-02-01': [
    {
      title: 'Beginner Blender Tutorial (2026) — Basic Modelling & Mesh Flow',
      channel: 'Blender Guru',
      youtubeId: 'z-Xl9tGqH14',
      startSeconds: 1696,
      durationLabel: 'Từ mốc 28:16',
      focusPoints: [
        'Xem cách giữ bề mặt hoàn toàn bằng mặt 4 đỉnh (Quads) trước khi bật Subdivision Surface.',
      ],
      chapters: [
        { label: 'Part 2: Basic Modelling', startSeconds: 1696, timeText: '28:16' },
        { label: 'Part 3: Organic Modelling', startSeconds: 3545, timeText: '59:05' },
      ],
    },
  ],
  'les-cur-mod-02-02': [
    {
      title: 'Beginner Blender Tutorial (2026) — Edit Mode Tools',
      channel: 'Blender Guru',
      youtubeId: 'z-Xl9tGqH14',
      startSeconds: 1696,
      durationLabel: 'Từ mốc 28:16',
      focusPoints: [
        'Ứng dụng Extrude (E), Inset (I) và Loop Cut (Ctrl+R) vào dựng hình thực tế.',
      ],
      chapters: [{ label: 'Basic Modelling', startSeconds: 1696, timeText: '28:16' }],
    },
  ],
  'les-cur-mod-02-04': [
    {
      title: 'UNIONS & BEVELS in Blender (Hard Surface Modeling Tutorial)',
      channel: 'Josh - Blender Bros',
      youtubeId: '1RW_5CDKsx8',
      startSeconds: 0,
      durationLabel: 'Hard-Surface Workflow',
      focusPoints: [
        'Cách quản lý đường vát Bevel sạch sẽ mà không làm rách hay chồng mép lưới lân cận.',
      ],
    },
  ],
  'les-cur-mod-02-05': [
    {
      title: 'Become a Boolean PRO in Blender',
      channel: 'Josh - Blender Bros',
      youtubeId: 'lCA1AFEQ_z4',
      startSeconds: 0,
      durationLabel: 'Boolean & Shading Fix',
      focusPoints: [
        'Quy trình đục lỗ Boolean phi phá hủy và cách khử sạch vết đen trên bề mặt cong.',
      ],
    },
  ],
  'les-cur-mod-03-03': [
    {
      title: 'ULTIMATE Character Modelling - Part 7. Retopo of The Body!',
      channel: 'Dikko',
      youtubeId: '3WnW_ZFXudk',
      startSeconds: 0,
      durationLabel: 'Body Retopology',
      focusPoints: [
        'Cách đặt các vòng lưới khớp vai, hông và tay chân để giữ nguyên khối khi gập khớp.',
      ],
    },
  ],
  'les-cur-mod-03-04': [
    {
      title: 'ULTIMATE Character Modelling - Part 5. Best Tips for Face Topology!',
      channel: 'Dikko',
      youtubeId: 'dl-JOScRCI8',
      startSeconds: 0,
      durationLabel: 'Face Loops',
      focusPoints: [
        'Sắp xếp các vòng lưới đồng tâm quanh hốc mắt, miệng và rãnh cười để diễn hoạt không bị méo.',
      ],
    },
  ],
  'les-cur-mod-04-01': [
    {
      title: 'UV Unwrapping for Beginners - Blender Tutorial',
      channel: 'Ryan King Art',
      youtubeId: 'Df8-ftyqZ_8',
      startSeconds: 1291,
      durationLabel: '50 phút (Đủ mốc chọn lọc)',
      focusPoints: [
        'Thao tác Mark Seam, xử lý kéo giãn UV (Stretching) và sự khác nhau giữa Angle Based vs Conformal.',
      ],
      chapters: [
        { label: 'UV Editor', startSeconds: 278, timeText: '04:38' },
        { label: 'Fixing Stretching', startSeconds: 1035, timeText: '17:15' },
        { label: 'Mark Seams', startSeconds: 1291, timeText: '21:31' },
      ],
    },
  ],
  'les-cur-mod-04-02': [
    {
      title: 'Beginner Blender Tutorial (2026) — Materials & PBR',
      channel: 'Blender Guru',
      youtubeId: 'z-Xl9tGqH14',
      startSeconds: 5413,
      durationLabel: 'Từ mốc 1:30:13',
      focusPoints: [
        'Sử dụng Principled BSDF điều chỉnh độ bóng Roughness, ánh kim Metallic và khúc xạ.',
      ],
      chapters: [{ label: 'Part 4: Materials', startSeconds: 5413, timeText: '1:30:13' }],
    },
  ],
  'les-cur-mod-04-03': [
    {
      title: 'Introduction to Procedural Shader Nodes for Complete Beginners',
      channel: 'Ryan King Art',
      youtubeId: 'J5t7gzIfTt0',
      startSeconds: 0,
      durationLabel: 'Shader Nodes Intro',
      focusPoints: [
        'Tư duy nối dây dữ liệu trong Shader Editor từ Noise Texture → ColorRamp → Roughness.',
      ],
    },
  ],
  'les-cur-mod-04-04': [
    {
      title: 'Procedural Nodes For Beginners (Node Wrangler Workflow)',
      channel: 'Ryan King Art',
      youtubeId: '5B244CYX1Tw',
      startSeconds: 0,
      durationLabel: 'Node Types & Shortcuts',
      focusPoints: [
        'Tận dụng Node Wrangler (Ctrl+Shift+Click, Ctrl+T) để ghép bề mặt phong hóa phức tạp.',
      ],
    },
  ],
  'les-cur-mod-04-05': [
    {
      title: 'UV Unwrapping for Beginners — Optimize Texture Space & Scale',
      channel: 'Ryan King Art',
      youtubeId: 'Df8-ftyqZ_8',
      startSeconds: 1823,
      durationLabel: 'Từ mốc 30:23',
      focusPoints: [
        'Cách nén tối đa diện tích UV hợp lý, Apply Scale và dùng nhiều UV Maps.',
      ],
      chapters: [
        { label: 'Optimize Texture Space', startSeconds: 1823, timeText: '30:23' },
        { label: 'Apply the Scale', startSeconds: 2735, timeText: '45:35' },
        { label: 'Multiple UV Maps', startSeconds: 2782, timeText: '46:22' },
      ],
    },
  ],
};
