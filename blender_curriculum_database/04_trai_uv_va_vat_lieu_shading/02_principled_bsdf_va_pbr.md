# 🎨 BÀI 4.2: NGUYÊN LÝ VẬT LÝ PBR & LÀM CHỦ PRINCIPLED BSDF

---

## 1. PBR (PHYSICALLY BASED RENDERING) LÀ GÌ?

**PBR** là tiêu chuẩn mô phỏng quang học dựa trên các định luật vật lý thực tế về sự tán xạ và phản xạ của ánh sáng khi va chạm vào bề mặt vật chất:
- Năng lượng ánh sáng phản xạ không bao giờ được lớn hơn năng lượng ánh sáng chiếu tới (Định luật bảo toàn năng lượng).
- Mọi vật liệu trong tự nhiên đều có độ phản chiếu nhất định dưới góc nhìn nghiêng (Hiệu ứng **Fresnel**).

Trong Blender, **Principled BSDF** (dựa trên mô hình Disney Principled) là shader vạn năng mô phỏng được 99% các loại vật chất: từ bê tông thô, gỗ mộc, vải len đến vàng ròng bóng bẩy và kính thủy tinh trong suốt.

---

## 2. Ý NGHĨA CỦA CÁC THÔNG SỐ CỐT LÕI TRONG PRINCIPLED BSDF

| Kênh vật liệu | Bản chất vật lý | Quy tắc thiết lập chuẩn |
| :--- | :--- | :--- |
| **Base Color** | Màu nền hấp thụ (Albedo) không chứa bóng đổ | Gỗ, da, sơn. Với kim loại thuần, Base Color chính là màu phản chiếu (Vàng óng, Đồng đỏ). |
| **Metallic** | Tính dẫn điện / Kim loại hóa | **Luôn là 0 hoặc 1!** Kim loại thuần (Vàng, Sắt, Nhôm) = `1.0`. Chất điện môi (Gỗ, Nhựa, Đất, Đá, Da) = `0.0`. Chỉ dùng giá trị lơ lửng `0.5` khi mô phỏng lớp rỉ sét hoặc bụi bẩn phủ mờ trên bề mặt kim loại. |
| **Roughness** | Độ nhám tế vi ở cấp độ hiển vi | Càng tiến về `0.0`: Bề mặt siêu nhẵn bóng như gương hoặc kính pha lê. Càng tiến về `1.0`: Bề mặt siêu nhám mờ như phấn bảng, cao su, tường vôi. |
| **IOR (Index of Refraction)** | Chiết suất khúc xạ ánh sáng | Nước: `1.333`, Kính thủy tinh: `1.450` đến `1.520`, Kim cương: `2.417`. |
| **Transmission** | Độ truyền quang xuyên thấu | Biến vật thể thành thủy tinh trong suốt hoặc chất lỏng. Kính cửa sổ = `1.0`. |
| **Subsurface (SSS)** | Tán xạ dưới bề mặt | Ánh sáng đi xuyên vào trong bề mặt rồi mới hắt ngược ra (Rất quan trọng khi mô phỏng da người, sáp nến, ngọc bích, sữa). |
| **Emission** | Độ tự phát sáng | Biến vật thể thành nguồn sáng neon, màn hình tivi, dung nham núi lửa. |

---

## 3. BẢN ĐỒ PHÁP TUYẾN: NORMAL MAP VS BUMP MAP

Làm thế nào để một mô hình chỉ có 500 mặt đa giác phẳng lì trông như có hàng ngàn con ốc vít và vết xước sâu lồi lõm?

- **Bump Map (Bức ảnh đen trắng):** Màu Trắng đẩy nhô lên, màu Đen thụt sâu xuống, màu Xám giữ nguyên cao độ. Tính toán chậm hơn nhưng dễ tạo bằng thủ tục Procedural.
- **Normal Map (Bức ảnh màu tím xanh RGB):**
  - Kênh Đỏ ($R$): Độ dốc trục $X$.
  - Kênh Xanh lá ($G$): Độ dốc trục $Y$.
  - Kênh Xanh dương ($B$): Hướng pháp tuyến trục $Z$.
  - Cho kết quả ánh sáng đổi góc cực kỳ chính xác và siêu nhẹ, là chuẩn mực bắt buộc trong ngành công nghiệp game và phim ảnh!
