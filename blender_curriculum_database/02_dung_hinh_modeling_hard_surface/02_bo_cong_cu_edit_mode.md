# 🔨 BÀI 2.2: BỘ CÔNG CỤ DỰNG HÌNH CHỦ LỰC TRONG EDIT MODE

---

## 1. BA CHẾ ĐỘ CHỌN TRONG EDIT MODE (`Phím 1, 2, 3`)

Khi ở trong Edit Mode (bấm `Tab`), luôn dùng hàng phím số trên cùng:
- **Phím `1`:** Vertex Select (Chọn từng điểm Đỉnh).
- **Phím `2`:** Edge Select (Chọn từng Cạnh nối).
- **Phím `3`:** Face Select (Chọn toàn bộ Mặt phẳng).
- **Giữ `Shift`:** Chọn cùng lúc nhiều chế độ (ví dụ vừa chọn đỉnh vừa chọn cạnh).

---

## 2. BỘ CÔNG CỤ CẮT & ĐÙN KHỐI KINH ĐIỂN

### 1. Extrude Region (Đùn mặt - Phím `E`)
- Kéo các đỉnh/cạnh/mặt ra ngoài để sinh thêm hình khối mới.
- Khóa trục: Bấm `E` rồi bấm `Z` để đùn thẳng đứng lên trên.
- **Alt + E:** Mở Advanced Extrude Menu:
  - *Extrude Along Normals:* Phình to các mặt theo phương vuông góc (như thổi bóng bay).
  - *Extrude Individual Faces:* Đùn từng mặt riêng biệt độc lập không dính nhau.

### 2. Inset Faces (Tạo viền bảo vệ - Phím `I`)
- Thu hẹp các cạnh bao quanh hướng vào trong tâm mặt phẳng.
- **Tại sao bắt buộc phải Inset trước khi đùn lõm?**
  Nếu đùn trực tiếp, góc nối sẽ bị gãy nhọn sắc dưới Subdivision. Inset tạo ra một vành đai bảo vệ (Holding Edge Loop) giúp ánh sáng phản xạ êm mượt.

### 3. Loop Cut & Slide (Cắt vòng lặp - Phím `Ctrl + R`)
- Di chuột qua khối lưới, xuất hiện đường viền màu tím hồng.
- Cuộn chuột giữa: Tăng số lượng nhát cắt (ví dụ cuộn lên 2 để cắt đôi đối xứng).
- Click chuột trái 1 lần để chốt số lượng $\rightarrow$ trượt vị trí $\rightarrow$ click chuột phải để nhảy về vị trí chính giữa 50%.

### 4. Bevel (Vát cạnh - Phím `Ctrl + B`)
- Làm tù hoặc uốn cong các cạnh sắc nhọn. Trong thế giới thực, không có vật thể nào có cạnh sắc 100% như dao cạo — tất cả đều có một độ vát nhỏ để bắt sáng.
- Bấm `Ctrl + B` $\rightarrow$ kéo chuột $\rightarrow$ cuộn con lăn chuột để tăng số phân đoạn (Segments).
- **Shift + Ctrl + B:** Vát cạnh riêng cho từng Điểm Đỉnh (Vertex Bevel).

### 5. Knife Tool (Dao cắt tự do - Phím `K`)
- Bấm `K` để biến con trỏ thành lưỡi dao mổ.
- Click lần lượt lên các cạnh để tạo đường cắt theo ý muốn.
- Bấm `C` khi đang cầm dao: Khóa góc cắt theo các bội số 45 độ.
- Bấm `Z` khi đang cầm dao: Cắt xuyên qua toàn bộ mô hình (Cut Through cả mặt trước lẫn mặt sau).
- Bấm `Enter` hoặc `Space` để xác nhận đường cắt.

### 6. Bridge Edge Loops (Bắc cầu nối 2 vòng cạnh)
- Chọn 2 vòng cạnh hở đối diện nhau $\rightarrow$ Nhấn **`Ctrl + E`** $\rightarrow$ chọn **`Bridge Edge Loops`**. Blender sẽ tự động tạo mặt phẳng nối liền giữa 2 vòng cạnh đó!

### 7. Fill (Bịt kín mặt - Phím `F`)
- Chọn 4 đỉnh rời rạc bấm `F` $\rightarrow$ tạo mặt Quads.
- Chọn 2 đỉnh bấm `J` $\rightarrow$ cắt chia mặt thành 2 nửa (Vertex Connect Path).
