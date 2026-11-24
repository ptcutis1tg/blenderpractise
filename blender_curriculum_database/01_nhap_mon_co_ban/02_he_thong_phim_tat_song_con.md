# ⌨️ BÀI 1.2: HỆ THỐNG PHÍM TẮT SỐNG CÒN TRONG BLENDER 5.3

---

## 1. BỘ BA BIẾN ĐỔI HÌNH HỌC KINH ĐIỂN (TRANSFORM G-R-S)

Khác với các phần mềm truyền thống yêu cầu bạn kéo thả các mũi tên Gizmo, Blender tối ưu tốc độ bằng tổ hợp phím gõ nhanh:

### 1. Phím `G` – Grab (Di chuyển vị trí - Translation)
- Bấm `G` $\rightarrow$ di chuyển tự do trong mặt phẳng góc nhìn camera.
- Bấm `G` rồi bấm `X` $\rightarrow$ chỉ di chuyển dọc theo trục X.
- Bấm `G` rồi bấm `Shift + Z` $\rightarrow$ di chuyển trên mặt đất (mặt phẳng X-Y), khóa trục Z thẳng đứng.
- Bấm `G` rồi gõ số `2` rồi bấm `Enter` $\rightarrow$ dịch chuyển chính xác 2 mét.

### 2. Phím `R` – Rotate (Xoay góc)
- Bấm `R` $\rightarrow$ xoay đối tượng vuông góc với góc nhìn hiện tại.
- Bấm `R` rồi bấm `R` lần nữa (Double R) $\rightarrow$ chế độ xoay tự do hình cầu dạng bi lăn (**Trackball Rotation**).
- Bấm `R` rồi bấm `Z` rồi gõ `45` $\rightarrow$ xoay đúng 45 độ quanh trục đứng Z.

### 3. Phím `S` – Scale (Phóng to / Thu nhỏ tỷ lệ)
- Bấm `S` $\rightarrow$ thu phóng đều 3 chiều.
- Bấm `S` rồi bấm `Z` $\rightarrow$ chỉ thu phóng chiều cao.
- Bấm `S` rồi bấm `Z` rồi gõ `0` $\rightarrow$ làm phẳng (Flatten) toàn bộ các điểm được chọn về cùng một cao độ Z!

---

## 2. PHÍM THAO TÁC CƠ BẢN QUAN TRỌNG

| Phím tắt | Chức năng | Ứng dụng thực tế |
| :--- | :--- | :--- |
| **`Tab`** | Chuyển đổi Object Mode $\leftrightarrow$ Edit Mode | Chuyển từ quản lý vật thể sang nắn chỉnh từng đỉnh/cạnh |
| **`Shift + A`** | Add Menu (Thêm đối tượng mới) | Thêm khối Cube, Sphere, Camera, Đèn, Curves, v.v. |
| **`X`** hoặc **`Delete`** | Xóa đối tượng | Xóa đỉnh, cạnh, mặt hoặc toàn bộ vật thể |
| **`Shift + D`** | Duplicate (Nhân bản độc lập) | Tạo bản sao độc lập của đối tượng được chọn |
| **`Alt + D`** | Linked Duplicate (Nhân bản liên kết) | Tạo bản sao chia sẻ chung dữ liệu lưới (Sửa 1 con ốc, 100 con ốc khác đổi theo) |
| **`H`** | Hide (Ẩn đối tượng) | Tạm giấu các vật thể che chắn để dễ thao tác |
| **`Alt + H`** | Unhide (Hiện lại tất cả) | Mở lại toàn bộ các đối tượng đang bị ẩn |
| **`Shift + H`** | Isolate / Hide Unselected | Giữ lại duy nhất vật thể đang chọn, ẩn sạch phần còn lại |
| **`/` (Slash Numpad)**| Local View (Cách ly vật thể) | Tương tự Shift + H nhưng tự động zoom thẳng vào vật thể |
| **`A`** | Select All | Chọn toàn bộ đối tượng hoặc đỉnh |
| **`Alt + A`** | Deselect All | Hủy chọn toàn bộ |
| **`Ctrl + Z`** | Undo | Lùi lại 1 bước |
| **`Ctrl + Shift + Z`** | Redo | Tiến lên 1 bước |

---

## 3. NGUYÊN TẮC VÀNG: APPLY TRANSFORMS (`Ctrl + A`)

Đây là lỗi kinh điển khiến 90% người mới bắt đầu gặp trục trặc:
- Khi bạn thu phóng hoặc xoay một vật thể trong **Object Mode**, Blender lưu thông số đó ở dạng tạm thời (ví dụ Scale $X: 2.0, Y: 0.5, Z: 1.0$).
- Các modifier như **Bevel**, **Subdivision** và cơ chế chiếu vân Texture sẽ dựa vào thông số Scale này để tính toán. Nếu Scale không bằng $(1.0, 1.0, 1.0)$, cạnh Bevel sẽ bị bẹp dí thành hình elip!

> 💡 **Khắc phục:** Luôn chọn vật thể ở Object Mode và bấm:
> **`Ctrl + A`** $\rightarrow$ chọn **`Apply All Transforms`** (hoặc chọn *Apply Rotation & Scale*).
