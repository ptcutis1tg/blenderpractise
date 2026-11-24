# BÀI HỌC 06.03: IK/FK CONSTRAINTS & SƠN TRỌNG SỐ (WEIGHT PAINTING)

## 1. Mục tiêu bài học
- Phân biệt rõ sự khác nhau giữa **FK (Forward Kinematics)** và **IK (Inverse Kinematics)**.
- Thiết lập cơ chế **IK Constraint** cho chân và tay nhân vật, bao gồm **Pole Target** (định hướng đầu gối/khuỷu tay).
- Thành thạo công cụ **Weight Paint Mode** để tinh chỉnh độ ảnh hưởng của xương lên từng vùng da thịt.
- Giới thiệu tổng quan hệ thống tự động Rigify chuẩn công nghiệp có sẵn trong Blender.

---

## 2. Phân biệt FK (Forward Kinematics) và IK (Inverse Kinematics)

| Tiêu chí | FK (Động học xuôi) | IK (Động học ngược) |
| :--- | :--- | :--- |
| **Cơ chế** | Chuyển động truyền từ gốc đến ngọn (Hông -> Đùi -> Bắp chân -> Bàn chân). | Chuyển động điều khiển từ ngọn về gốc (Kéo Bàn chân, Hông và Đùi tự gập). |
| **Cách điều khiển** | Xoay (`R`) từng khớp xương lần lượt. | Di chuyển (`G`) tay cầm điều khiển (Controller Bone). |
| **Ứng dụng tối ưu** | Vẫy tay tự do, quất đuôi, động tác mượt mà trong không trung. | Chân bước dính chặt mặt đất (tránh trượt chân), tay bám vào xà đơn hoặc tường. |

---

## 3. Thiết lập Bộ điều khiển IK (IK Rigging Step-by-Step)

### 3.1. Chuẩn bị xương trong Edit Mode
1. Chuỗi chân gồm 3 xương: `Thigh.L` (Đùi), `Shin.L` (Bắp chân), `Foot.L` (Bàn chân).
2. Tạo **IK Controller**: Extrude từ gót chân hoặc tạo 1 bone mới tại vị trí bàn chân đặt tên là `Foot_IK.L`. Bấm `Alt + P` -> **Clear Parent** (xương này không được làm con của Shin).
3. Tạo **Pole Target**: Tạo 1 bone nhỏ đặt phía trước đầu gối đặt tên là `Knee_Target.L` (Clear Parent).
4. **Quy tắc uốn khớp (Pre-bend)**: Đẩy nhẹ khớp đầu gối hơi nhô ra phía trước một chút trong Rest Pose (nếu xương thẳng đúp 180 độ, thuật toán IK sẽ không biết gập về hướng nào).

### 3.2. Thêm Bone Constraint trong Pose Mode
1. Chuyển sang **Pose Mode** (`Ctrl + Tab`).
2. Chọn xương cẳng chân (`Shin.L`).
3. Vào bảng thuộc tính **Bone Constraint Properties** (icon 2 vòng xích), bấm **Add Bone Constraint** -> chọn **Inverse Kinematics**.
4. Thiết lập thông số:
   - **Target**: Chọn Armature của bạn.
   - **Bone**: Chọn `Foot_IK.L`.
   - **Chain Length**: Đặt bằng **`2`** (chỉ ảnh hưởng tới Shin và Thigh, không ảnh hưởng lên Cột sống).
   - **Pole Target**: Chọn Armature.
   - **Pole Bone**: Chọn `Knee_Target.L`.
   - **Pole Angle**: Chỉnh góc (thường là 0°, 90°, -90° hoặc 180°) sao cho đầu gối hướng thẳng về phía Pole Target mà không bị vặn xoắn.

---

## 4. Tinh chỉnh Trọng số (Weight Painting)

Khi Automatic Weights tạo ra lỗi (ví dụ nhấc chân mà háng bị méo, hoặc gập ngón tay mà ngón bên cạnh bị kéo theo), ta phải dùng **Weight Paint**.

### 4.1. Quy ước dải màu trọng số
- **Màu Đỏ (1.0)**: Chịu 100% ảnh hưởng từ xương được chọn.
- **Màu Vàng / Xanh lá (0.7 - 0.3)**: Vùng chuyển tiếp mềm mại giữa 2 khớp.
- **Màu Xanh dương đậm (0.0)**: Hoàn toàn không bị ảnh hưởng (0%).

### 4.2. Cách kích hoạt chế độ Weight Paint chuẩn
1. Trong **Object Mode**, click chọn **Armature** trước.
2. Giữ `Shift` và click chọn **Mesh** sau.
3. Chuyển Mode từ Object Mode sang **Weight Paint Mode** (`Ctrl + Tab`).
4. Giữ phím **`Ctrl` + Chuột trái** (hoặc `Shift + Chuột phải`) click vào bất kỳ chiếc xương nào để xem dải trọng số (Vertex Group) của xương đó.

### 4.3. Các loại Cọ vẽ (Brushes) quan trọng
- **Draw**: Sơn thêm trọng số (Weight = 1.0) hoặc xóa bớt (Weight = 0.0).
- **Blur**: Làm mờ, làm mịn dải chuyển tiếp (cực kỳ quan trọng để khớp bẻ cong không bị nếp gấp thô).
- **Average**: Trung bình hóa các đỉnh lân cận.
- **Auto Normalize**: Luôn bật tuỳ chọn này ở thanh công cụ bên phải để tổng trọng số tác động lên 1 đỉnh từ tất cả các xương luôn được chuẩn hoá bằng đúng 1.0 (tránh phồng rộp mesh).

---

## 5. Tổng quan về Rigify (Addon tự động hóa có sẵn)
Thay vì tự dựng hàng trăm chiếc xương và ràng buộc bằng tay cho nhân vật hình người, Blender tích hợp sẵn addon **Rigify**:
1. Vào `Edit` -> `Preferences` -> `Add-ons` -> Tìm và kích hoạt **Rigging: Rigify**.
2. Thêm bộ khung mẫu: `Shift + A` -> `Armature` -> **Human (Meta-Rig)**.
3. Vào Edit Mode, căn chỉnh vị trí các khớp của Meta-Rig sao cho khớp với mô hình 3D của bạn.
4. Vào bảng `Armature Properties`, cuộn xuống mục **Rigify** và bấm nút **Generate Rig**.
5. Rigify sẽ tự động sinh ra một bộ điều khiển chuyên nghiệp chuẩn Hollywood với đầy đủ IK/FK Switch, gậy điều khiển mắt, ngón tay và cơ mặt.

---

## 6. Bài tập thực hành
- **Bài tập**: Hoàn thiện bộ chân IK 2 khớp và khử lỗi kẹt méo háng bằng Weight Paint.
- **Yêu cầu**:
  1. Dựng 1 chuỗi chân gồm 3 đốt: Đùi, Bắp chân, Bàn chân.
  2. Gán IK Constraint với Chain Length = 2, thêm Pole Target hướng đầu gối.
  3. Di chuyển bàn chân lên xuống kiểm tra xem gối có gập tự nhiên không.
  4. Dùng cọ Blur trong Weight Paint làm mềm vùng gấp khớp gối khi co chân 90 độ.
