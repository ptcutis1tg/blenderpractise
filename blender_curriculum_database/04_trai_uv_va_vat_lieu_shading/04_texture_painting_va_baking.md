# 🖌️ BÀI 4.4: TEXTURE PAINTING & QUY TRÌNH NƯỚNG MAPS (BAKING)

---

## 1. VẼ TRỰC TIẾP LÊN MÔ HÌNH 3D (TEXTURE PAINT)

Ngoài việc dùng vật liệu ảnh có sẵn hoặc thủ tục, bạn có thể tự cầm bút vẽ tay (Hand-painted) trực tiếp lên bề mặt vật thể trong tab **Texture Paint**:
- Tạo một Image Texture trống với độ phân giải `2048 x 2048` hoặc `4096 x 4096`.
- Chọn các kiểu cọ (Brush): Soft Falloff để tán mịn, hoặc Hard Alpha để vẽ hoa văn vảy rồng, lông vũ.
- **Lưu ý sống còn:** Bức ảnh vẽ tay trong Blender **KHÔNG tự động lưu vào ổ đĩa** khi bạn bấm `Ctrl + S` lưu file blend! Bạn bắt buộc phải vào tab **Image Editor** $\rightarrow$ bấm **`Image`** $\rightarrow$ **`Save As`** (hoặc phím tắt `Alt + S`) để lưu bức ảnh ra file `.png`, nếu không khi tắt máy toàn bộ tác phẩm vẽ tay sẽ biến mất vĩnh viễn!

---

## 2. NƯỚNG BẢN ĐỒ (TEXTURE BAKING) – BÍ MẬT CỦA ĐỒ HỌA GAME

**Texture Baking** là quy trình chuyển đổi toàn bộ tính toán ánh sáng, bóng đổ, màu sắc phức tạp hoặc chi tiết bề mặt từ mô hình nặng (High-poly triệu đỉnh) sang một bức ảnh phẳng để dán lên mô hình nhẹ (Low-poly vài ngàn đỉnh).

### 2 Bản đồ Baking bắt buộc trong sản xuất Game:
1. **Normal Map Baking (High to Low poly):**
   - Đặt mô hình Low-poly và High-poly nằm chồng khít lên nhau ở cùng một tọa độ $(0, 0, 0)$.
   - Trong bảng Render chọn cỗ máy **Cycles** (Chỉ Cycles mới có tính năng Bake).
   - Chọn mục **Bake** $\rightarrow$ chọn **Bake Type = Normal**.
   - Tích chọn ô **Selected to Active** (Chọn High-poly trước, giữ Shift chọn Low-poly sau).
   - Bấm nút **Bake** $\rightarrow$ Bạn sẽ thu được một bức ảnh màu tím xanh lưu trọn vẹn từng vết sẹo và ốc vít của tượng High-poly!
2. **Ambient Occlusion (AO Map):**
   - Nướng bóng đổ tiếp xúc ở các khe rãnh kẽ hở giúp vật thể trông đậm đà, chắc chắn và có chiều sâu thị giác ngay cả khi không bật đèn chiếu sáng.
