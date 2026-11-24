# 05 - TÍNH NĂNG TƯƠNG TÁC & GIAO DIỆN NGƯỜI DÙNG (UI & INTERACTION)

## 1. Hệ thống bản đồ thu nhỏ (Minimap)
- **Vị trí**: Nằm ở góc trên cùng bên phải màn hình.
- **Tính năng**:
  - Hiển thị góc nhìn từ trên xuống (Top-down view) toàn bộ khuôn viên trường.
  - Đốm tròn màu đỏ biểu thị vị trí người chơi và mũi tên chỉ hướng đang nhìn.
  - Đánh dấu tên các khu vực chính (Tòa A, Tòa B, Sân bóng, Căng-tin...).

## 2. Bảng thông tin khu vực (Interactive Info Spots)
- **Cơ chế hoạt động**:
  - Đặt một điểm đánh dấu nhẹ (Icon chữ `i` hoặc vòng sáng tròn) trước sảnh mỗi tòa nhà.
  - Khi người chơi bước vào bán kính 3 mét, một cửa sổ popup nhỏ gọn xuất hiện ở cạnh dưới màn hình:
    - **Tên công trình**: Ví dụ _"Tòa nhà Hiệu bộ (Khu A)"_.
    - **Mô tả ngắn**: Số phòng, chức năng, năm xây dựng.
    - Nhấn phím `E` để xem thêm hoặc tự động ẩn khi bước ra xa.

## 3. Hướng dẫn phím điều khiển (Help HUD)
- Góc dưới bên trái hiển thị gợi ý phím ngắn gọn:
  - `W A S D`: Di chuyển
  - `Shift`: Chạy nhanh
  - `Chuột`: Nhìn xung quanh
  - `Tab`: Bật/Tắt Minimap phóng to
  - `Esc`: Mở menu / Thoát con trỏ chuột
