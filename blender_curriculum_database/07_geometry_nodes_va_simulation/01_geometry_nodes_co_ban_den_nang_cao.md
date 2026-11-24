# BÀI HỌC 07.01: GEOMETRY NODES - TỪ CƠ BẢN ĐẾN NÂNG CAO (PROCEDURAL GENERATION)

## 1. Mục tiêu bài học
- Hiểu kiến trúc cốt lõi của **Geometry Nodes (GN)**: Dữ liệu hình học dạng dòng chảy (Geometry Data Flow) và khái niệm **Fields** (Trường dữ liệu).
- Nắm vững các node cơ bản để phân tán vật thể: **Distribute Points on Faces**, **Instance on Points**.
- Làm chủ cơ chế ngẫu nhiên hóa (Randomization): **Random Value**, biến đổi kích thước (Scale), xoay hướng (Rotation) theo Normal bề mặt.
- Phân biệt giữa **Instance** và **Real Geometry** (`Realize Instances`), cùng ứng dụng thực tế trong việc tạo rừng cây, rải sỏi đá, thành phố thủ tục (Procedural City).

---

## 2. Kiến trúc Geometry Nodes và Khái niệm "Fields"

### 2.1. Cấu trúc Modifier Geometry Nodes
- Geometry Nodes hoạt động như một **Modifier** trong ngăn xếp (Modifier Stack) của vật thể.
- **Group Input**: Tiếp nhận hình học ban đầu của vật thể (hoặc thông số tùy chỉnh từ giao diện Modifier).
- **Group Output**: Đưa hình học sau khi qua xử lý thủ tục ra ngoài Viewport / Render.

### 2.2. Nhận biết loại Socket (Đầu nối)
- **Hình tròn (Circle)**: Giá trị đơn lẻ (Single value / Constant) - ví dụ một con số cố định Float = 5.0.
- **Hình thoi có chấm (Diamond with dot)**: Trường dữ liệu (Field) - giá trị có thể thay đổi linh hoạt trên từng đỉnh (Vertex), từng mặt (Face) hoặc từng điểm (Point).

---

## 3. Quy trình kinh điển: Rải sỏi/cỏ lên bề mặt địa hình (Scattering)

### 3.1. Sơ đồ Node cơ bản
```
Group Input (Mesh địa hình) 
       |
       +---> [Distribute Points on Faces] ---> [Instance on Points] ---> [Join Geometry] ---> Group Output
                                                     ^                     ^
                 [Collection Info / Object Info] ----+                     |
                                (Cây cỏ mẫu)                               |
                                                                           |
Group Input ---------------------------------------------------------------+
```

### 3.2. Chi tiết các bước thiết lập
1. **Distribute Points on Faces**:
   - Biến bề mặt địa hình thành tập hợp các điểm vô hình.
   - Chế độ: Đổi từ `Random` sang **Poisson Disk** để kiểm soát khoảng cách tối thiểu giữa các vật thể (Distance Min), tránh việc cỏ cây mọc đè chồng chéo lên nhau.
   - Mật độ (Density Max): Điều chỉnh số lượng điểm trên một mét vuông.
2. **Instance on Points**:
   - Tại vị trí mỗi điểm được tạo ra, nhân bản (Instance) một vật thể khác vào.
   - Kéo đối tượng sỏi/cỏ từ Outliner thả thẳng vào cửa sổ Geometry Node Editor để tự động tạo node **Object Info** hoặc **Collection Info**.
   - Cắm đầu ra `Geometry` của Object Info vào đầu vào `Instance` của node Instance on Points.
3. **Join Geometry**:
   - Gộp hình học của địa hình gốc (từ Group Input) cùng với hàng nghìn thực thể cỏ mới tạo ra để hiển thị cả hai cùng lúc.

---

## 4. Ngẫu nhiên hóa tự nhiên (Randomization & Alignment)

Để rừng cây hoặc bãi cỏ trông tự nhiên, không được để mọi cây đều cùng hướng và cùng kích thước:

1. **Ngẫu nhiên hóa tỉ lệ (Scale)**:
   - Thêm node **Random Value** (kiểu dữ liệu *Float*).
   - Đặt Min = 0.5, Max = 1.3.
   - Cắm đầu ra `Value` vào đầu vào `Scale` của node *Instance on Points*.
2. **Căn chỉnh hướng theo độ dốc địa hình (Align to Normal)**:
   - Thêm node **Align Euler to Vector**.
   - Cắm đầu ra `Normal` của node *Distribute Points on Faces* vào cổng `Vector` của node *Align Euler to Vector*.
   - Đổi trục sang **Z**.
   - Cắm cổng `Rotation` đầu ra vào cổng `Rotation` của node *Instance on Points*.
   - Kết quả: Thân cây hoặc ngọn cỏ sẽ tự động mọc vuông góc với bề mặt đồi núi.

---

## 5. Khi nào cần dùng "Realize Instances"?
- Mặc định, các đối tượng được nhân bản là **Instances** (chỉ lưu tọa độ tham chiếu trong bộ nhớ RAM, render cực nhẹ hàng triệu đối tượng).
- **Nhược điểm của Instance**: Không thể tác động chỉnh sửa từng đỉnh bằng các node biến dạng (Deform), và một số engine render bên ngoài hoặc việc nướng Texture (Bake) không nhận diện được từng cá thể.
- **Giải pháp**: Thêm node **Realize Instances** ngay trước Group Output. 
- *Cảnh báo hiệu năng*: Realize Instances sẽ biến hàng triệu instance thành hàng tỷ đa giác thật, có thể gây tràn VRAM hoặc đóng băng Blender nếu số lượng quá lớn!

---

## 6. Bài tập thực hành
- **Bài tập**: Tạo một hệ thống rải đá cuội thủ tục lên một mặt phẳng uốn lượn.
- **Yêu cầu**:
  1. Dùng lưới Subdivided Plane làm địa hình, thêm modifier Displace để tạo gồ ghề.
  2. Tạo 1 bộ sưu tập (Collection) gồm 3 viên sỏi hình dạng khác nhau.
  3. Tạo Geometry Node rải sỏi với thuật toán `Poisson Disk`.
  4. Ngẫu nhiên hóa góc xoay trục Z từ 0 đến 360 độ (`0` đến `tau` hoặc `2 * pi`) và ngẫu nhiên hóa kích thước sỏi từ 0.3 đến 1.2.
