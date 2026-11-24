# 🎞️ BÀI 5.4: HẬU KỲ CHUYÊN NGHIỆP VỚI COMPOSITOR

---

## 1. COMPOSITOR LÀ GÌ?

Sau khi bấm phím **`F12`** để render, bạn không cần phải xuất ảnh sang Photoshop hay After Effects để chỉnh màu, vì ngay bên trong Blender đã tích hợp sẵn một xưởng hậu kỳ chuyên nghiệp dựa trên Node mang tên **Compositor**:
- Bật tab **Compositing** $\rightarrow$ tích chọn ô **`Use Nodes`**.
- Bạn sẽ thấy node khởi đầu là **Render Layers** (kết quả ảnh render) và node kết thúc là **Composite** (đầu ra cuối cùng).

---

## 2. CÁC NODE HẬU KỲ "ĂN TIỀN" NHẤT

1. **Glare Node (Tạo đốm sáng lóe & Bloom):**
   - Đổi kiểu từ *Streaks* sang **`Fog Glow`**.
   - Biến các nguồn đèn neon, ngọn lửa hay điểm phản chiếu chói lọi của kim loại thành các quầng sáng mờ ảo lung linh.
2. **Color Balance (Chỉnh tông màu điện ảnh - Color Grading):**
   - Dùng mô hình bánh xe màu kinh điển:
     - *Lift (Vùng tối - Shadows):* Kéo nhẹ về phía màu Xanh dương lạnh.
     - *Gamma (Vùng trung gian - Midtones):* Giữ trung tính hoặc hơi ấm.
     - *Gain (Vùng sáng chói - Highlights):* Kéo nhẹ về phía màu Cam ấm.
   - Bức ảnh render lập tức mang phong cách điện ảnh Hollywood (Teal & Orange look) ngay trong tích tắc!
3. **Lens Distortion (Mô phỏng ống kính quang học thật):**
   - Đặt thông số *Dispersion = 0.01 đến 0.02*: Tạo viền tán sắc cầu vồng nhẹ (Chromatic Aberration) ở các góc mép ảnh, đánh lừa não bộ rằng bức ảnh được chụp từ một chiếc máy ảnh cơ quang học thực tế chứ không phải ảnh đồ họa 3D vô hồn!
4. **Mist Pass (Tạo khói sương mù chiều sâu):**
   - Trong bảng View Layer, tích chọn kênh **`Mist`**.
   - Cắm cổng Mist từ Render Layers vào node Mix để hòa trộn một lớp sương mù mờ ảo theo độ sâu khoảng cách z-depth.
