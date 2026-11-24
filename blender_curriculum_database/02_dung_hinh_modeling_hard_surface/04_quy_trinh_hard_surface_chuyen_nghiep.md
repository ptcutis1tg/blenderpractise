# 🛡️ BÀI 2.4: QUY TRÌNH DỰNG HÌNH HARD-SURFACE NÂNG CAO

---

## 1. THỬ THÁCH CỦA DỰNG HÌNH VẬT THỂ CỨNG (HARD-SURFACE)

Khi dựng vũ khí, robot, phương tiện giao thông hoặc máy móc công nghiệp, nghệ sĩ 3D thường gặp 2 bài toán hóc búa:
1. **Lỗi bóng méo (Shading Artifacts / Normal Pinching):** Khi khoét một cái lỗ tròn lên một bề mặt cong (ví dụ nòng súng trên thân máy bay), các mặt đa giác xung quanh bị vặn vẹo khiến ánh sáng phản chiếu bị gãy nát.
2. **Quản lý mật độ lưới (Density Management):** Lưới quá nặng sẽ không thể nắn chỉnh form dáng tổng thể; lưới quá thưa thì các chi tiết cắt gọt sẽ bị gãy góc.

---

## 2. KỸ THUẬT BEVEL WEIGHT & MARK SHARP

Thay vì dùng Bevel cho toàn bộ mô hình (gây vát nhầm vào những góc cần sắc), quy trình chuyên nghiệp áp dụng phương pháp gán trọng số:

1. Vào Edit Mode, chuyển sang chọn cạnh (`2`).
2. Chọn các cạnh mong muốn vát góc.
3. Mở thanh công cụ bên phải (Phím **`N`**) $\rightarrow$ mục **Item** $\rightarrow$ tăng thanh trượt **`Bevel Weight`** lên `1.0`. Cạnh được chọn sẽ chuyển sang màu xanh dương nhạt.
4. Thêm **Bevel Modifier** vào vật thể:
   - Đổi mục **Limit Method** từ *None* sang **`Weight`**.
   - Bây giờ modifier chỉ vát đúng những cạnh có trọng số xanh dương, các cạnh phẳng còn lại giữ nguyên 100%!

---

## 3. KHỬ SẠCH LỖI BÓNG MÉO BẰNG WEIGHTED NORMAL

Để mặt cong sau khi cắt Boolean vẫn phẳng lì mà không cần thêm hàng trăm đường Loop Cut cứu hộ:
1. Chọn vật thể, chuột phải $\rightarrow$ chọn **`Shade Auto Smooth`** (Trong Blender 4.x / 5.x là node Modifier *Smooth by Angle*).
2. Thêm **`Weighted Normal Modifier`** vào cuối cùng của danh sách modifier.
3. Tích chọn ô **`Keep Sharp`**.
4. Thuật toán sẽ tự động điều chỉnh vector pháp tuyến (Normals) của các mặt lớn để ép phẳng ánh sáng, triệt tiêu 100% các vệt nhăn nhúm!
