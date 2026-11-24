# 🕸️ BÀI 3.3: RETOPOLOGY – LÀM LẠI LƯỚI NHẸ CHUẨN HOẠT HỌA

---

## 1. TẠI SAO PHẢI LÀM LẠI LƯỚI (RETOPOLOGY)?

Tượng điêu khắc sau khi hoàn thiện thường có từ **1 triệu đến 10 triệu đỉnh (Vertices)**:
- Game Engine (Unreal, Unity) sẽ sập ngay lập tức nếu nạp mô hình này.
- Không thể gắn xương hoạt họa (Rigging) vì máy tính không thể tính toán trọng số cho hàng triệu điểm.
- Không thể trải UV phẳng ra để vẽ hoa văn.

> **Retopology** là quá trình "bọc một lớp màng lưới nhẹ" (từ 2.000 đến 15.000 Quads sạch) ôm sát bên ngoài bức tượng điêu khắc nặng hàng triệu đỉnh. Toàn bộ nếp nhăn vi mô của tượng nặng sau đó sẽ được nướng (**Bake**) thành bức ảnh phẳng gọi là **Normal Map**!

---

## 2. QUY TẮC ĐI VÒNG LẶP CHO KHUÔN MẶT (FACIAL LOOPS)

Khi làm Retopology cho khuôn mặt người hoặc sinh vật, bạn bắt buộc phải tạo 4 vòng tròn khép kín:
1. **Orbital Loop (Vòng quanh hốc mắt):** Một vành khuyên các mặt quads ôm trọn quanh mắt như cặp kính râm. Giúp mắt chớp mở tự nhiên.
2. **Oral Loop (Vòng quanh miệng):** Vành khuyên quads ôm trọn quanh khóe môi. Giúp miệng nói, cười, chu môi mà không bị gãy góc.
3. **Muzzle Loop (Vòng nối mũi và miệng):** Bao quanh cả mũi và miệng, chạy men theo rãnh cười (Nasolabial fold).
4. **Mask Loop:** Chạy từ cằm qua gò má vòng lên trán.

---

## 3. CÔNG CỤ RETOPOLOGY CÓ SẴN TRONG BLENDER

1. **Bật Snapping to Face:**
   - Trên thanh trên cùng, bật biểu tượng nam châm (Snap).
   - Đổi kiểu bắt dính từ *Increment* sang **`Face Project`**.
   - Tích chọn ô **`Project Individual Elements`**.
2. **Dùng Shrinkwrap Modifier:**
   - Thêm modifier **Shrinkwrap** lên lưới nhẹ và chọn Target là tượng điêu khắc High-poly. Mọi đỉnh bạn vẽ ra sẽ tự động dính chặt như miếng dán decal ôm sát bề mặt tượng!
3. **Công cụ Poly Build Tool:**
   - Cho phép bạn chỉ việc click chuột để sinh mặt Quads mới và kéo các cạnh dính liền nhau cực kỳ êm ái.
