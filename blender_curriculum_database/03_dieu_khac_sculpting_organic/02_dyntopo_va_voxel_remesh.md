# 🧬 BÀI 3.2: DYNTOPO VS VOXEL REMESH – QUẢN LÝ MẬT ĐỘ LƯỚI ĐIÊU KHẮC

---

## 1. VẤN ĐỀ CO GIÃN ĐA GIÁC TRONG ĐIÊU KHẮC

Khi bạn lấy cọ Grab kéo một cục đất sét ra ngoài để làm chiếc mũi dài hoặc sừng quái vật:
- Các mặt đa giác ban đầu bị kéo giãn toang hoác.
- Bạn không thể vẽ thêm lỗ mũi hay nếp nhăn chi tiết lên những mặt đa giác đã bị giãn dài ngoằng đó được nữa.

Để giải quyết vấn đề này, Blender cung cấp 2 giải pháp mạnh mẽ: **Dyntopo** và **Voxel Remesh**.

---

## 2. DYNTOPO (DYNAMIC TOPOLOGY - `Ctrl + D`)

- **Cơ chế hoạt động:** Khi bạn quét cọ đến đâu, Blender tự động chém nhỏ các mặt đa giác tại đó trong thời gian thực. Càng zoom lại gần, lưới sinh ra càng dày và chi tiết.
- **Ưu điểm:** Cực kỳ tự do, thoải mái kéo xúc tu, sừng hay tai từ một khối cầu mà không lo thiếu lưới.
- **Nhược điểm:** Phá vỡ cấu trúc Quads (Dyntopo chỉ sinh ra mặt tam giác Tris) và tốn tài nguyên CPU khi lưới vượt quá 500.000 đỉnh.

---

## 3. VOXEL REMESH (TÁI TẠO ĐỒNG NHẤT KHỐI THỂ TÍCH - `Ctrl + R`)

Đây là quy trình điêu khắc hiện đại chuẩn Hollywood được ưa chuộng nhất hiện nay:
1. Bạn có thể ghép nhiều khối hình học riêng biệt (Ví dụ: 1 khối cầu làm đầu, 2 khối ống trụ làm tai, 1 khối hộp làm hàm).
2. Nhấn tổ hợp phím **`Shift + R`**: Một tấm lưới mắt cáo màu xám xuất hiện trên màn hình $\rightarrow$ kéo chuột để điều chỉnh kích thước ô voxel (Càng nhỏ càng chi tiết, khuyến nghị `0.02m` đến `0.005m`).
3. Nhấn **`Ctrl + R`**: Blender sẽ hợp nhất toàn bộ các khối rời rạc đó thành một lớp da liền mạch duy nhất với các ô lưới vuông vức đều tăm tắp!

```text
[Quy trình nặn tượng Voxel Remesh chuẩn]:
Giai đoạn 1: Voxel Size lớn (0.05m) -> Nắn form tỷ lệ lớn (Đầu, mắt, mũi, cằm)
Giai đoạn 2: Voxel Size vừa (0.015m) -> Đắp khối cơ bắp, mí mắt, môi
Giai đoạn 3: Voxel Size mịn (0.004m) -> Khía nếp nhăn, lỗ chân lông, sẹo
```
