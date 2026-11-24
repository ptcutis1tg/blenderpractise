# 🧭 BÀI 1.1: GIAO DIỆN & KHÔNG GIAN 3D TRONG BLENDER

---

## 1. TỔNG QUAN VỀ KHÔNG GIAN 3 CHIỀU (3D VIEWPORT)

Khác với đồ họa 2D (Photoshop, Illustrator) chỉ có chiều ngang $X$ và chiều dọc $Y$, Blender hoạt động trong không gian 3 chiều Euclid:
- **Trục X (Màu Đỏ):** Trục ngang (Left / Right).
- **Trục Y (Màu Xanh Lá Cây):** Trục chiều sâu (Front / Back).
- **Trục Z (Màu Xanh Dương):** Trục thẳng đứng (Up / Down).

> **Gốc tọa độ (World Origin):** Điểm giao nhau giữa 3 trục có tọa độ $(0, 0, 0)$. Mọi đối tượng khi tạo mới thường sinh ra quanh gốc này hoặc tại vị trí của **3D Cursor**.

---

## 2. CÁC KHU VỰC CHÍNH TRÊN GIAO DIỆN BLENDER

1. **Top Bar (Thanh trên cùng):**
   - Menu chính: *File, Edit, Render, Window, Help*.
   - **Workspaces Tabs:** Các không gian làm việc chuyên dụng theo từng công đoạn:
     - `Layout`: Sắp đặt bố cục tổng thể.
     - `Modeling`: Chuyên dựng hình khối.
     - `Sculpting`: Điêu khắc tượng.
     - `UV Editing`: Trải lưới chiếu vân.
     - `Texture Paint`: Sơn vẽ trực tiếp lên vật thể.
     - `Shading`: Biên tập bảng vật liệu Node Shader.
     - `Animation`: Hoạt họa và timeline.
     - `Rendering & Compositing`: Kết xuất và hậu kỳ.
     - `Geometry Nodes`: Lập trình dựng hình thủ tục.
2. **3D Viewport (Khung nhìn 3D - Cửa sổ chính):**
   - Nơi bạn nhìn, xoay và tương tác trực tiếp với mô hình.
3. **Outliner (Góc trên bên phải):**
   - Cây quản lý đối tượng theo thư mục phân cấp (**Collections**). Tương đương bảng Layers của Photoshop nhưng theo dạng cây phả hệ (Parent - Child).
4. **Properties Panel (Góc dưới bên phải):**
   - Bảng điều khiển thông số quan trọng nhất: Cài đặt Render, Kích thước Render, Thuộc tính Vật liệu, Bảng Modifiers, Dữ liệu Đỉnh (Vertex Groups).
5. **Timeline (Thanh đáy):**
   - Quản lý khung hình hoạt họa (Frames), Play/Pause và đặt Keyframe.

---

## 3. THAO TÁC ĐIỀU HƯỚNG VIEWPORT (BẮT BUỘC THUẦN THỤC)

| Thao tác | Phím / Chuột | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Orbit (Xoay góc nhìn)** | Giữ chuột giữa `MMB` và rê chuột | Xoay 360 độ quanh tâm đối tượng đang chọn |
| **Pan (Lia khung nhìn)** | Giữ `Shift` + Giữ chuột giữa `MMB` | Trượt camera theo phương song song để căn chỉnh vị trí |
| **Zoom (Phóng to / Thu nhỏ)** | Cuộn chuột giữa `Scroll` hoặc `Ctrl + MMB` | Tiếp cận chi tiết hoặc nhìn bao quát |
| **Focus Object (Tập trung)** | Phím chấm Numpad `.` (hoặc phím `/`) | Ngay lập tức căn giữa đối tượng được chọn vào màn hình |

---

## 4. CÁC GÓC CHIẾU CHUẨN NUMPAD (ORTHOGRAPHIC VIEWS)

Trong dựng hình kỹ thuật và giải phẫu, bạn cần nhìn vật thể hoàn toàn phẳng (không bị biến dạng phối cảnh xa gần - Perspective Distortion):

- **Numpad 1:** Góc nhìn chính diện (**Front Orthographic**).
- **Ctrl + Numpad 1:** Góc nhìn phía sau (**Back Orthographic**).
- **Numpad 3:** Góc nhìn bên phải (**Right Orthographic**).
- **Ctrl + Numpad 3:** Góc nhìn bên trái (**Left Orthographic**).
- **Numpad 7:** Góc nhìn từ trên đỉnh xuống (**Top Orthographic**).
- **Ctrl + Numpad 7:** Góc nhìn từ đáy lên (**Bottom Orthographic**).
- **Numpad 5:** Chuyển đổi qua lại giữa góc nhìn Phối cảnh (**Perspective**) và góc nhìn Trực giao (**Orthographic**).
- **Numpad 0:** Nhìn qua ống kính máy ảnh chính (**Active Camera View**).

---

## 5. BỐN CHẾ ĐỘ HIỂN THỊ SHADING (PHÍM TẮT `Z`)

Bấm giữ phím **`Z`** trong Viewport để mở Pie Menu gồm 4 chế độ:
1. **Wireframe (`Z` -> Trái):** Khung lưới dạng dây trong suốt, thấy toàn bộ các cạnh xuyên qua vật thể.
2. **Solid (`Z` -> Phải):** Khối màu xám mờ chuẩn mặc định để tập trung dựng hình và đi cạnh.
3. **Material Preview (`Z` -> Dưới):** Hiển thị màu sắc và độ bóng vật liệu bằng nguồn sáng HDRI giả lập sẵn.
4. **Rendered (`Z` -> Trên):** Hiển thị kết quả tính toán ánh sáng và bóng đổ thật 100% của cỗ máy render (Cycles hoặc Eevee).
