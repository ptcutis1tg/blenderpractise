# BÀI HỌC 07.02: VẬT LÝ VÀ MÔ PHỎNG (PHYSICS SIMULATIONS)

## 1. Mục tiêu bài học
- Nắm vững nguyên lý và thiết lập hệ thống động lực học vật rắn (**Rigid Body Dynamics: Active vs Passive**).
- Mô phỏng vải vóc (**Cloth Simulation**): Ghim điểm (Pin Group), va chạm (Collisions), độ căng bề mặt (Stiffness).
- Tổng quan hệ thống hạt (**Particle Systems**) và mô phỏng khói, lửa, chất lỏng (**Mantaflow**).
- Nắm vững quy trình nướng dữ liệu mô phỏng (**Bake Physics**) để đảm bảo phát lại mượt mà và render không lỗi.

---

## 2. Mô phỏng Vật rắn (Rigid Body Dynamics)

Dùng cho các cảnh va đập, đổ vỡ, sập tường, domino hoặc xúc xắc rơi.

### 2.1. Phân loại Active vs Passive
- **Active (Chủ động)**: Vật thể bị trọng lực kéo xuống và chịu tác động của lực va chạm (ví dụ: các quân cờ domino, khối gạch).
- **Passive (Bị động)**: Vật thể đứng yên làm rào cản va chạm, không bị rơi tự do (ví dụ: mặt sàn nhà, chướng ngại vật).

### 2.2. Hình dạng va chạm (Collision Shapes)
- **Convex Hull (Mặc định)**: Tạo một lớp vỏ bọc kín bao quanh vật thể. Tính toán cực nhanh, ổn định nhất.
- **Mesh**: Tính toán va chạm dựa trên từng đa giác thật. Bắt buộc phải dùng cho vật rỗng/lõm (ví dụ: chiếc bát, cái phễu, cái cốc). *Nhược điểm: Tốn CPU và dễ bị hiện tượng xuyên thủng nếu vật thể chuyển động quá nhanh.*
- **Box / Sphere / Cylinder**: Tối ưu nhất cho các khối hình học cơ bản.

### 2.3. Khắc phục lỗi va chạm xuyên qua nhau
- Tăng giá trị **Substeps Per Frame** và **Solver Iterations** trong bảng `Scene Properties` -> `Rigid Body World`.
- Đảm bảo đã Apply Scale (`Ctrl + A`) cho tất cả các đối tượng tham gia mô phỏng.

---

## 3. Mô phỏng Vải vóc (Cloth Simulation)

Dùng cho rèm cửa, khăn trải bàn, quần áo nhân vật, cờ bay trong gió.

### 3.1. Các bước tạo Khăn trải bàn rơi xuống mặt bàn
1. Tạo mặt bàn, gán thuộc tính vật lý **Collision** trong tab Physics.
2. Tạo 1 tấm Plane đặt phía trên mặt bàn, vào Edit Mode bấm chuột phải -> `Subdivide` khoảng 30-50 lần (Mô phỏng vải phụ thuộc vào mật độ lưới - lưới càng chi tiết vải càng mềm).
3. Thêm physics **Cloth** cho tấm Plane.
4. Bật tuỳ chọn **Self Collisions** trong mục Collisions của Cloth (để vải không bị xuyên lủng qua chính nó khi gập nếp).
5. Bấm phím cách (`Space`) để chạy mô phỏng, tấm vải sẽ rơi xuống và phủ quanh mặt bàn tự nhiên.

### 3.2. Ghim vải (Pin Group) - Ví dụ: Rèm cửa hoặc Cờ
1. Vào Edit Mode, chọn hàng đỉnh mép trên của tấm vải.
2. Vào tab `Object Data Properties` (icon tam giác xanh), tạo 1 **Vertex Group** mới tên là `Pins`, bấm **Assign**.
3. Quay lại tab Physics của Cloth, cuộn xuống mục **Shape** -> chọn `Pins` tại mục **Pin Group**.
4. Khi chạy mô phỏng, hàng đỉnh này sẽ đứng yên cố định trên thanh rèm, phần thân vải phía dưới sẽ rủ xuống uốn lượn.

---

## 4. Mô phỏng Khói, Lửa và Nước (Mantaflow Overview)

Hệ thống Mantaflow trong Blender chia làm 2 thành phần chính:
1. **Domain (Vùng bao)**: Chiếc hộp bao quanh toàn bộ không gian mô phỏng. Mọi tính toán khói/nước chỉ diễn ra bên trong hộp này.
2. **Flow (Nguồn phát)**: Vật thể sinh ra khói, lửa hoặc chất lỏng (Smoke / Fire / Liquid).
3. **Effector**: Vật cản dòng chảy (chướng ngại vật làm lệch hướng khói/nước).

---

## 5. Quy tắc vàng: Nướng dữ liệu (Baking Cache)
- Khi phát trực tiếp (Real-time playback) trên timeline, khung hình thường bị giật lag và Blender sẽ tính lại từ đầu mỗi khi thay đổi góc camera.
- Trước khi Render video hoặc ảnh hoàn thiện, **bắt buộc phải Bake**:
  1. Trong bảng thiết lập Physics của Domain hoặc Cloth, tìm đến mục **Cache**.
  2. Đặt khung hình bắt đầu (`Start`) và kết thúc (`End`).
  3. Bấm **Bake** (hoặc chọn định dạng Type = `Modular` / `All` đối với Mantaflow).
  4. Sau khi Bake xong, dữ liệu được ghi cố định vào ổ cứng, thanh timeline có thể kéo tới bất kỳ frame nào mà không lo lỗi sụp đổ vật lý.

---

## 6. Bài tập thực hành
- **Bài tập**: Tạo cảnh đổ vỡ kim tự tháp Domino bằng Rigid Body.
- **Yêu cầu**:
  1. Tạo sàn nhà gán Rigid Body loại `Passive`.
  2. Tạo 1 quân cờ Domino kích thước chuẩn, nhân bản xếp thành tháp 3 tầng dạng `Active`.
  3. Tạo 1 quả cầu sắt `Active` nặng 10kg bay tới đâm sập tháp Domino.
  4. Bake toàn bộ 150 frames chuyển động và nạp vào timeline.
