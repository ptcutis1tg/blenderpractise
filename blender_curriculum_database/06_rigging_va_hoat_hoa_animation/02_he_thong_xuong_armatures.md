# BÀI HỌC 06.02: HỆ THỐNG XƯƠNG (ARMATURES & BONE HIERARCHY)

## 1. Mục tiêu bài học
- Nắm vững cấu trúc cơ bản của xương trong Blender: **Head**, **Body**, **Tail**, và **Roll**.
- Hiểu rõ 3 chế độ làm việc với Armature: **Object Mode**, **Edit Mode**, **Pose Mode**.
- Nắm vững nguyên lý phân cấp xương (Bone Hierarchy: Parent - Child) và quan hệ **Connected** vs **Keep Offset**.
- Thực hiện liên kết Mesh với Xương bằng phương pháp **Parent with Automatic Weights** (`Ctrl + P`).

---

## 2. Cấu tạo của Bone và 3 Chế độ làm việc

### 2.1. Cấu trúc một Bone đơn lẻ
- **Head (Gốc xương / Root)**: Điểm xoay chính của xương.
- **Tail (Đầu xương / Tip)**: Điểm nối dẫn tiếp tới xương con tiếp theo.
- **Bone Roll**: Góc tự xoay quanh trục dài của xương. *(Phím tắt: `Ctrl + R` trong Edit Mode để căn chỉnh trục xoay chính xác, tránh việc khớp gối/khuỷu tay bị gập vặn xoắn).*

### 2.2. Phân biệt 3 Chế độ (Modes)
1. **Object Mode**: Coi cả khung xương (Armature) như 1 thực thể đơn lẻ. Dùng để di chuyển tổng thể, scale hoặc Apply Transform (`Ctrl + A -> All Transforms`).
2. **Edit Mode (`Tab`)**: Nơi tạo dựng cấu trúc xương (Thêm xương `Shift + A`, Extrude xương `E`, đảo chiều `Alt + F`, chỉnh Parent `Ctrl + P`). **Lưu ý: Tư thế chỉnh trong Edit Mode gọi là Rest Pose (Tư thế nghỉ).**
3. **Pose Mode (`Ctrl + Tab`)**: Nơi Animator điều khiển xương để diễn hoạt / pose dáng. Di chuyển hoặc xoay ở đây không thay đổi hình dạng gốc (Rest Pose) của xương. Reset tư thế: `Alt + G`, `Alt + R`, `Alt + S`.

---

## 3. Thiết lập Cây phân cấp Xương (Hierarchy & Parenting)

### 3.1. Các bước Extrude và phân nhánh
1. Trong **Edit Mode**, chọn điểm **Tail** của Bone gốc (`Root` / `Hips`).
2. Bấm phím **`E`** (Extrude) kéo lên để tạo đốt sống (`Spine`), `Chest`, `Neck`, `Head`.
3. Để tạo xương tay/chân tách rời: Thêm xương mới hoặc Extrude từ thân rồi ngắt kết nối.

### 3.2. Quan hệ Parent - Child (Cha - Con)
- Chọn xương **Con** trước, giữ `Shift` chọn xương **Cha** sau.
- Bấm **`Ctrl + P`**:
  - **Connected**: Xương con dính chặt điểm Head vào điểm Tail của xương cha (thích hợp cho các đốt sống, xương ngón tay).
  - **Keep Offset**: Xương con vẫn nhận chuyển động xoay/di chuyển của xương cha nhưng giữ nguyên khoảng cách không gian (thích hợp cho xương đùi gắn vào hông, hoặc mắt gắn vào đầu).
- Hủy quan hệ cha con: Chọn xương con, bấm **`Alt + P`** -> **Clear Parent**.

---

## 4. Gắn Mesh vào Xương (Binding & Parenting)

### 4.1. Quy trình chuẩn bị bắt buộc (Pre-Flight Checklist)
1. **Apply Transforms**: Chọn Mesh, bấm `Ctrl + A` -> `All Transforms`. Chọn Armature, bấm `Ctrl + A` -> `All Transforms`. Cả 2 phải chung Origin và tỉ lệ Scale `(1.0, 1.0, 1.0)`.
2. **Kiểm tra mặt phẳng đối xứng (X-Axis Mirror)**: Trong Edit Mode của Armature, bật tính năng `X-Axis Mirror` và đặt tên xương theo chuẩn đuôi `.L` và `.R` (ví dụ: `UpperArm.L`, `UpperArm.R`) để Blender tự động đối xứng hoá.

### 4.2. Gắn tự động (Automatic Weights)
1. Trong **Object Mode**, click chọn **Mesh** trước.
2. Giữ `Shift` và click chọn **Armature** sau (Armature có viền vàng sáng hơn).
3. Bấm tổ hợp phím **`Ctrl + P`** -> Chọn **With Automatic Weights**.
4. Chọn Armature, bấm `Ctrl + Tab` vào **Pose Mode**, chọn 1 xương và bấm `R` xoay thử xem bề mặt da thịt (Mesh) có chuyển động theo xương không.

---

## 5. Các lỗi kinh điển và cách khắc phục
- **Lỗi Mesh bị vẹo hoặc méo khi di chuyển**: Do chưa Apply Transforms (`Ctrl + A`) trước khi Bind xương.
- **Lỗi Bone Heat Weighting Failed**: Do Mesh có lỗ hổng (non-manifold), đỉnh trùng lặp (chưa `M` -> `By Distance`), hoặc các phần giao nhau quá sát. Cách sửa: Vào Edit Mode của Mesh, chọn tất cả (`A`), bấm `M` -> `By Distance` để gộp điểm thừa.
- **Lỗi Xoay chân/tay bị lộn ngược khớp**: Do Bone Roll sai hướng. Vào Edit Mode, bật hiển thị `Bone Axes` trong Viewport Display, dùng `Ctrl + R` hoặc `Shift + N` (Recalculate Roll) để đồng bộ hướng trục Z/X.

---

## 6. Bài tập thực hành
- **Bài tập**: Tạo bộ khung xương cơ bản gồm 3 đốt cho một chiếc Đèn bàn Pixar (Bàn đế, Khớp thân dưới, Khớp thân trên, Chao đèn).
- **Yêu cầu**:
  1. Thiết lập phân cấp từ Đế lên Chao đèn (Keep Offset hoặc Connected).
  2. Gắn các bộ phận vào từng xương tương ứng (sử dụng Parent to Bone trực tiếp hoặc Vertex Groups).
  3. Vào Pose Mode uốn cong đèn và xoay chao đèn theo các hướng mà không bị vỡ mesh.
