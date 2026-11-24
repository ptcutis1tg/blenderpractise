# 03 - GIAI ĐOẠN DỰNG KHỐI THÔ (GREYBOX / BLOCKOUT)

## 1. Mục tiêu giai đoạn
Xây dựng phiên bản "khung xương" của toàn bộ trường học mà bạn có thể trực tiếp mở lên, cầm chuột và phím đi bộ thử quanh trường để đánh giá tỷ lệ không gian thực tế.

## 2. Các bước triển khai
1. **Đặt Ground Reference**:
   - Trải một mặt phẳng (Plane) chứa hình ảnh sơ đồ vệ tinh trường học làm bản đồ hướng dẫn bên dưới.
2. **Dựng các khối hộp CSG (Constructive Solid Geometry)**:
   - Dùng các khối `CSGBox3D` với kích thước dài, rộng, cao tương ứng từng dãy nhà.
   - Gán màu xám nhạt cho nhà và màu xám đậm cho đường đi, xanh lá nhạt cho sân cỏ/bồn hoa.
3. **Lập trình First-Person Controller (Bộ điều khiển góc nhìn thứ nhất)**:
   - Di chuyển mượt mà: `W`, `A`, `S`, `D`.
   - Giữ `Shift` để chạy nhanh.
   - Xoay camera bằng chuột mượt mà (Mouse Look with Mouse Capture).
   - Va chạm (Collision): Người chơi không đi xuyên qua các khối nhà.
4. **Tiêu chuẩn nghiệm thu (Acceptance Criteria)**:
   - Đứng ở vị trí cổng trường nhìn vào thấy cảm giác chiều sâu và khoảng cách giống như ngoài đời thật.
   - Tốc độ đi bộ từ cổng đến tòa nhà xa nhất mất khoảng thời gian tương đương thực tế.
