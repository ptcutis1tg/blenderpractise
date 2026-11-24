# 💡 BÀI 5.1: NGHỆ THUẬT CHIẾU SÁNG ĐIỆN ẢNH (CINEMATIC LIGHTING)

---

## 1. TẠI SAO ÁNH SÁNG LÀ LINH HỒN CỦA BỨC ẢNH 3D?

Một mô hình 3D hoàn hảo đến mấy nhưng đặt trong một môi trường ánh sáng phẳng lì (Flat Lighting) cũng sẽ trông như một mẩu nhựa rẻ tiền.
Ngược lại, một mô hình khối hộp đơn giản nếu được đặt trong một kịch bản ánh sáng giàu tương phản, có độ chuyển bóng mượt mà và nhiệt độ màu tinh tế sẽ tạo cảm giác như một cảnh quay trong phim điện ảnh Hollywood.

---

## 2. KỸ THUẬT 3 NGUỒN SÁNG KINH ĐIỂN (THREE-POINT LIGHTING)

```text
               [ Rim Light ] (Phía sau lưng, công suất cao, tạo viền sáng)
                     │
                     ▼
              [ CHỦ THỂ 3D ]
               ▲           ▲
              ╱             ╲
             ╱               ╲
[ Key Light ]                 [ Fill Light ]
(Đèn chính, góc 45°,          (Đèn phụ, góc -45°,
 công suất 100%, tạo khối)     công suất 20-40%, khử bóng gắt)
```

1. **Key Light (Đèn chính):**
   - Đặt chếch 45 độ so với trục nhìn của Camera và cao hơn đầu chủ thể.
   - Là nguồn sáng mạnh nhất, quyết định hướng bóng đổ chính và định hình thể tích khối (Form).
2. **Fill Light (Đèn phụ bù bóng):**
   - Đặt ở phía đối diện của Key Light.
   - Công suất chỉ bằng **20% đến 40%** so với Key Light.
   - Nhiệm vụ: Nâng nhẹ các vùng tối sâu ở nửa bên kia khuôn mặt để không bị đen đặc mất chi tiết, nhưng vẫn giữ được độ tương phản.
3. **Rim Light / Back Light (Đèn ven / Đèn lưng):**
   - Đặt phía sau lưng chủ thể, chiếu chếch về phía Camera.
   - Nhiệm vụ cực kỳ quan trọng: Tạo một đường viền sáng mảnh sắc nét quanh mép tóc, bờ vai hoặc góc cạnh của sản phẩm, giúp tách rời hoàn toàn chủ thể ra khỏi nền tối phía sau!

---

## 3. TƯƠNG PHẢN NHIỆT ĐỘ MÀU (COLOR TEMPERATURE CONTRAST)

Quy tắc phối màu của các đạo diễn hình ảnh:
- **Nguyên lý tương phản nóng - lạnh:**
  - Nếu Key Light có tông màu **Vàng cam ấm áp** (3200K - Giả lập ánh nắng hoàng hôn hoặc đèn vonfram), hãy để Fill Light có tông màu **Xanh dương lạnh mờ** (6500K - Giả lập bầu trời xanh phản chiếu).
  - Ngược lại, nếu Key Light là ánh trăng xanh lạnh, hãy dùng Rim Light là ngọn lửa vàng cam để tạo điểm nhấn thị giác bùng nổ!

---

## 4. KÍCH THƯỚC NGUỒN SÁNG & ĐỘ MỀM CỦA BÓNG ĐỔ (SOFT SHADOWS)

Trong loại đèn **Area Light**:
- **Kích thước nhỏ (Size = 0.1m):** Bóng đổ cực kỳ sắc nhọn, gắt gỏng (như ánh nắng trưa hè gay gắt).
- **Kích thước lớn (Size = 2.0m - 5.0m):** Đóng vai trò như một chiếc hộp tản sáng (Softbox) khổng lồ trong studio. Bóng đổ sẽ nhòe mờ cực kỳ êm ái, da nhân vật mịn màng không tì vết.
