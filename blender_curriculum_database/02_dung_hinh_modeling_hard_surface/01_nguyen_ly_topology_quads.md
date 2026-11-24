# 📐 BÀI 2.1: NGUYÊN LÝ TOPOLOGY & VĂN HÓA MẶT 4 ĐỈNH (QUADS)

---

## 1. TOPOLOGY TRONG ĐỒ HỌA 3D LÀ GÌ?

**Topology** (Cấu trúc liên kết lưới) là cách sắp xếp, phân bố và kết nối của các **Đỉnh (Vertices)**, **Cạnh (Edges)** và **Mặt (Faces/Polygons)** để tạo nên hình dạng của một vật thể 3D.
Cùng một hình dáng bên ngoài (ví dụ một quả cầu), nhưng cấu trúc lưới bên trong có thể rất đẹp hoặc rất nát. Topology tốt quyết định:
1. Độ mượt mà khi ánh sáng phản xạ (Không bị nhăn, không bị lỗi bóng đen).
2. Khả năng biến dạng tự nhiên khi gắn xương hoạt họa (Khớp khuỷu tay uốn cong không bị móp).
3. Khả năng làm mịn bằng modifier Subdivision Surface mà không tạo vết nhăn nhúm (Pinching).

---

## 2. PHÂN LOẠI ĐA GIÁC: QUADS VS TRIS VS N-GONS

| Loại đa giác | Số đỉnh | Đánh giá | Trường hợp sử dụng |
| :--- | :--- | :--- | :--- |
| **Quads (Đa giác 4 đỉnh)** | Đúng 4 đỉnh | **Tiêu chuẩn vàng (Vua của Topology)** | Mô hình nhân vật chuyển động, mô hình Subdivision Surface, uốn cong. |
| **Tris (Tam giác 3 đỉnh)** | Đúng 3 đỉnh | **Chấp nhận được** (Được Game Engine ưa chuộng) | Các bề mặt hoàn toàn phẳng, khớp nối không biến dạng, hoặc các trò chơi thời gian thực. |
| **N-gons (Đa giác > 4 đỉnh)**| 5 đỉnh trở lên | **Rủi ro cao (Nguyên nhân số 1 gây lỗi lưới)** | Chỉ dùng trên bề mặt 100% phẳng không bao giờ biến dạng hoặc uốn cong. |

---

## 3. CÁC ĐIỂM TỤ (POLES) & CÁCH CHUYỂN HƯỚNG LUỒNG CẠNH (EDGE FLOW)

- **E-Pole (Điểm tụ 5 cạnh):** Một đỉnh có 5 cạnh nối vào. Có tác dụng chuyển hướng dòng chảy của cạnh (Thường gặp ở gò má, khóe miệng hoặc vai nhân vật).
- **N-Pole (Điểm tụ 3 cạnh):** Một đỉnh chỉ có 3 cạnh nối vào.
- **Quy tắc vàng:** Tuyệt đối tránh để các điểm tụ nằm ngay trên các vị trí uốn gập chuyển động (ví dụ giữa đầu gối hoặc mí mắt), vì chúng sẽ gây gãy nếp nhăn kỳ quặc khi nhân vật cử động.

---

## 4. QUY TẮC LƯỚI KHÉP KÍN (MANIFOLD VS NON-MANIFOLD)

Một lưới đạt chuẩn in 3D và chuẩn kỹ xảo phải là **Manifold (Kín nước)**:
- Không có mặt úp mặt (Internal faces ẩn bên trong khối).
- Không có 2 đỉnh nằm đè lên cùng 1 tọa độ mà không nối nhau (Double vertices).
- Không có một cạnh chung của 3 mặt phẳng trở lên (T-junction / Non-manifold edge).

> 💡 **Phím tắt kiểm tra lỗi Non-Manifold:**
> Vào Edit Mode $\rightarrow$ Bấm `A` hủy chọn $\rightarrow$ Nhấn **`Shift + Ctrl + Alt + M`**. Blender sẽ tự động bôi sáng toàn bộ các cạnh bị hở hoặc rách trên mô hình của bạn!
