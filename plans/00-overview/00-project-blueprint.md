# 00 - BẢN THIẾT KẾ DỰ ÁN (PROJECT BLUEPRINT)

## 1. Mục tiêu cốt lõi
Xây dựng một phiên bản game demo 3D mô phỏng chân thực khuôn viên ngôi trường bạn đang học dựa trên số liệu kích thước thực tế, với yêu cầu chạy mượt mà trên các dòng máy tính cấu hình văn phòng hoặc chip đồ họa tích hợp yếu (Intel HD Graphics).

## 2. Các nguyên tắc kỹ thuật bất di bất dịch
1. **Triết lý Greybox First**: Luôn dựng khung xương thô toàn bộ khuôn viên trường bằng các khối hộp đơn giản trước để người dùng vào đi bộ kiểm tra tỷ lệ không gian (Scale & Proportion) trước khi dựng asset chi tiết.
2. **Quy chuẩn tỷ lệ 1:1**: $1 \text{ unit trong 3D} = 1 \text{ mét thực tế}$.
   - Tầm mắt nhân vật: 1.65m - 1.70m.
   - Chiều cao tầng nhà chuẩn: ~3.6m - 4.0m.
   - Chiều rộng lối đi: tùy theo thông số đo thực tế.
3. **Ngân sách phần cứng (Performance Budget cho máy yếu)**:
   - Target FPS: Tối thiểu 60 FPS liên tục trên GPU Intel HD Graphics 4000+.
   - Kỹ thuật dựng hình: Flat shading hoặc Simple unlit/vertex lighting.
   - Bộ nhớ Texture: Dùng 1 ảnh Color Palette duy nhất kích thước $256 \times 256$ pixels cho toàn bộ môi trường.
   - Dung lượng bản cài đặt hoàn chỉnh: $< 60\text{MB}$.
