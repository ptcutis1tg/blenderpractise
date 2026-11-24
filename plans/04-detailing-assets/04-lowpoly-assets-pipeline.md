# 04 - QUY TRÌNH THAY THẾ ASSET & CHI TIẾT HÓA (LOW-POLY PIPELINE)

## 1. Kỹ thuật Color Palette Texture (Bí quyết cho máy yếu)
Thay vì mỗi đồ vật phải mang một file ảnh texture 2K/4K nặng hàng chục MB, toàn bộ game chỉ dùng **1 bức ảnh PNG kích thước $256 \times 256$ pixels** chứa lưới các ô màu (Xanh lá cây, đỏ gạch, vàng tường trường, xám xi măng, nâu gỗ, kính xanh...).
- **Ưu điểm**:
  - Giảm thiểu triệt để số lượng Draw Calls cho GPU.
  - VRAM tiêu hao gần như bằng 0.
  - Tạo ra phong cách nghệ thuật Low-Poly đồng nhất, hiện đại.

## 2. Danh sách các Asset cần thay thế dần theo thứ tự ưu tiên
1. **Kiến trúc chính (Tòa nhà)**:
   - Tạo các gờ mái ngói/mái bằng, bậc tam cấp trước sảnh.
   - Tạo các ô cửa sổ và hành lang lan can dạng hình khối đơn giản.
2. **Cảnh quan trường học**:
   - Cổng trường & biển hiệu trường học.
   - Cột cờ trung tâm sân trường.
   - Cây bàng, cây phượng, bồn hoa low-poly (tạo 2 mẫu cây và nhân bản ra khắp sân).
   - Ghế đá, thùng rác, đèn đường chiếu sáng sân trường.
3. **Khu vực thể thao**:
   - Kẻ vạch sân bóng đá / sân bóng rổ / đường chạy.
   - Khung thành hoặc cột rổ đơn giản.
