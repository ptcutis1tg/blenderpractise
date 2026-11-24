# 🗂️ BÀI 1.3: QUẢN LÝ ĐỐI TƯỢNG, ORIGIN & COLLECTIONS

---

## 1. TÂM ĐỐI TƯỢNG (OBJECT ORIGIN) LÀ GÌ?

Mỗi vật thể trong Blender đều có một chấm nhỏ màu cam nằm ở trung tâm hoặc chân đế của nó — đó là **Origin (Tâm đối tượng)**.
- Khi bạn bấm **`R` (Xoay)**: Đối tượng sẽ quay quanh điểm Origin này.
- Khi bạn bấm **`S` (Scale)**: Đối tượng sẽ phình to hoặc thu nhỏ từ tâm Origin này.
- **Tọa độ của vật thể** hiển thị trên bảng thuộc tính thực chất chính là vị trí của điểm Origin trong không gian thế giới.

### Cách di dời tâm Origin:
- Chuột phải vào vật thể $\rightarrow$ **Set Origin**:
  - `Origin to Geometry`: Đưa tâm cam về chính giữa thể tích khối.
  - `Origin to 3D Cursor`: Đưa tâm về đúng vị trí con trỏ 3D Cursor hiện tại (Rất hữu ích khi làm bản lề cửa xoay hoặc kim đồng hồ!).
  - `Geometry to Origin`: Kéo toàn bộ mô hình về vị trí của tâm cam.

---

## 2. CON TRỎ 3D CURSOR – VŨ KHÍ BẮT DÍNH CHÍNH XÁC

Con trỏ 3D Cursor (biểu tượng vòng tròn sọc đỏ trắng) là một công cụ độc quyền của Blender dùng làm điểm neo sinh đối tượng và tâm xoay tạm thời.

### Menu bắt dính `Shift + S` (Snapping Menu):
1. **Cursor to World Origin:** Đưa 3D Cursor quay về tọa độ $(0, 0, 0)$.
2. **Cursor to Selected:** Đưa 3D Cursor nhảy thẳng vào tâm của đỉnh/cạnh/mặt hoặc đối tượng đang chọn.
3. **Selection to Cursor:** Kéo vật thể đang chọn bay thẳng đến vị trí con trỏ 3D Cursor.

---

## 3. TỔ CHỨC CẢNH QUAN BẰNG COLLECTIONS (OUTLINER)

Để không bị rối mắt khi dựng một cảnh hàng trăm chi tiết:
- Phím **`M`** (Move to Collection): Di chuyển đối tượng đang chọn vào một Collection mới hoặc có sẵn.
- **Tắt mắt (Eye icon):** Ẩn đối tượng trong Viewport.
- **Tắt máy ảnh (Camera icon):** Vẫn thấy trong Viewport khi dựng hình nhưng khi bấm F12 render thì không xuất hiện (Hữu ích cho các khối Boolean cắt gọt hoặc khối tham chiếu).
- **Phân chia tiêu chuẩn cho một dự án 3D chuyên nghiệp:**
  - `00_References`: Chứa các ảnh mẫu (Blueprints).
  - `01_Geometry`: Chứa các mô hình nhân vật, đồ đạc chính.
  - `02_Booleans`: Chứa các khối dao cắt đục lỗ.
  - `03_Cameras`: Chứa máy ảnh chính và phụ.
  - `04_Lighting`: Chứa các đèn Area, Spot, Sun và đèn nền.
