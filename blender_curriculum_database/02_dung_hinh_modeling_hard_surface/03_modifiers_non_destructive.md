# ⚙️ BÀI 2.3: SỨC MẠNH CỦA QUY TRÌNH PHI PHÁ HỦY (NON-DESTRUCTIVE MODIFIERS)

---

## 1. NGUYÊN LÝ "PHI PHÁ HỦY" (NON-DESTRUCTIVE)

- **Quy trình phá hủy (Destructive):** Bạn bấm `Ctrl + B` vát cạnh thành 4 phân đoạn. Dữ liệu đỉnh mới bị ghi đè trực tiếp lên mô hình. 2 ngày sau khách hàng yêu cầu "cạnh tròn hơn một chút", bạn buộc phải xóa đi dựng lại từ đầu.
- **Quy trình phi phá hủy (Non-Destructive):** Mô hình gốc của bạn chỉ là 8 đỉnh của khối lập phương đơn giản. Toàn bộ việc vát cong, nhân bản đối xứng, làm dày và cắt đục lỗ đều do các **Modifiers** tính toán trong thời gian thực. Bất kỳ lúc nào bạn cũng có thể kéo thanh trượt để thay đổi bán kính vát từ 0.01m sang 0.05m hoặc tắt bật bằng một cú click chuột!

---

## 2. CÁC MODIFIERS TRỤ CỘT BẮT BUỘC PHẢI THUẦN THỤC

### 1. Mirror Modifier (Đối xứng gương)
- Thay vì phải dựng cả 2 bên cơ thể hoặc 4 bánh xe ô tô, bạn chỉ cần dựng một nửa (hoặc một góc tư).
- **Lưu ý quan trọng:** Luôn tích chọn ô **`Clipping`** để các đỉnh tại ranh giới trung tâm tự động dính chặt vào nhau và không bao giờ bị kéo tách rời hoặc xé rách!

### 2. Subdivision Surface Modifier (Làm mịn bề mặt - Phím tắt `Ctrl + 1`, `Ctrl + 2`)
- Tự động chia nhỏ từng mặt đa giác thành 4 mặt nhỏ hơn và làm cong đều theo thuật toán Catmull-Clark.
- `Ctrl + 1`: Thêm 1 cấp độ mịn (Level 1).
- `Ctrl + 2`: Thêm 2 cấp độ mịn (Level 2 - Chuẩn hiển thị thông dụng).
- *Lưu ý:* Phải có các cạnh giữ nếp (**Holding Edges** hoặc **Crease**) thì các góc hộp mới giữ được dáng vuông vức.

### 3. Solidify Modifier (Tạo độ dày thành vỏ)
- Biến một bề mặt 2D mỏng như tờ giấy (ví dụ kính chắn gió ô tô, áo giáp, vỏ ấm chén) thành một khối có độ dày thực tế 2 lớp.

### 4. Array Modifier (Nhân bản theo hàng loạt)
- Tạo ra các dãy bậc thang, xích xe tăng, lan can cầu, hoặc hàng rào một cách tự động theo khoảng cách tương đối (Relative Offset) hoặc đối tượng dẫn đường (Object Offset).

### 5. Boolean Modifier (Cắt đục khối hình học)
- Thực hiện 3 phép toán hình học giữa 2 vật thể:
  - `Difference`: Lấy vật thể B khoét thủng một lỗ trên vật thể A.
  - `Union`: Gộp 2 vật thể dính chặt làm một khối kín nước duy nhất.
  - `Intersect`: Chỉ giữ lại phần thể tích giao nhau giữa 2 vật thể.
- **Thuật toán Fast vs Exact:**
  - *Fast:* Xử lý nhanh, phù hợp cắt mặt phẳng đơn giản.
  - *Exact:* Thuật toán toán học chính xác cao, xử lý được các góc cắt phức tạp mà không bị thủng lưới.

---

## 3. THỨ TỰ NGĂN XẾP CỦA MODIFIER (MODIFIER STACK ORDER)

Modifier được tính toán từ **Trên xuống Dưới** trong bảng thuộc tính. Thứ tự sắp xếp quyết định hoàn toàn kết quả:

```text
[Chuẩn quy trình Hard-Surface]
1. Mirror Modifier        (Tạo đối xứng trước)
2. Boolean Modifier       (Khoét lỗ sau khi đã có hình đối xứng)
3. Bevel Modifier         (Vát viền các mép sau khi bị khoét)
4. Weighted Normal        (Sửa bóng méo ở bước cuối cùng)
```
> Nếu bạn đảo Bevel lên trước Boolean, các vết cắt sau đó sẽ có cạnh sắc lẹm và không bao giờ được vát viền!
