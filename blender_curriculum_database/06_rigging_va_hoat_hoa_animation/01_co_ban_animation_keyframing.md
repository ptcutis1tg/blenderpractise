# 🏃 BÀI 6.1: NỀN TẢNG HOẠT HỌA & 12 NGUYÊN TẮC ANIMATION

---

## 1. NGUYÊN LÝ KHUNG HÌNH KHÓA (KEYFRAMING)

Để một vật thể 3D chuyển động:
1. Bạn đặt vật thể ở vị trí $A$ tại khung hình thứ 1 $\rightarrow$ Bấm phím **`I`** (Insert Keyframe) $\rightarrow$ Chọn **`Location`**. Một chấm thoi màu vàng sẽ xuất hiện trên Timeline.
2. Di chuyển thanh trượt Timeline đến khung hình thứ 24 (tương ứng 1 giây sau với chuẩn 24 FPS).
3. Di chuyển vật thể sang vị trí $B$ $\rightarrow$ Bấm phím **`I`** $\rightarrow$ Chọn **`Location`**.
4. Bấm phím cách **`Space`**: Blender sẽ tự động tính toán toàn bộ 22 khung hình ở giữa (In-between frames) để vật thể lướt êm ái từ $A$ sang $B$!

---

## 2. LÀM CHỦ GRAPH EDITOR & GIA TỐC CHUYỂN ĐỘNG

Chuyển động tuyến tính thẳng đơ (Linear) trong máy tính trông rất đơ và giả tạo. Trong thế giới thực, mọi vật chất đều cần có thời gian tăng tốc và hãm phanh:
- Chuyển sang cửa sổ **Graph Editor**.
- Bạn sẽ nhìn thấy đường cong chuyển động dạng Bezier.
- Nhấn phím **`T`** để đổi kiểu nội suy (Interpolation):
  - `Bezier` (Mặc định): Tự động mượt mà ở 2 đầu (**Ease In / Ease Out**).
  - `Linear`: Đều đặn như chuyển động của kim giây đồng hồ hoặc dây chuyền nhà máy.
  - `Constant`: Nhảy cóc giật tức thì (Hữu ích khi làm hiệu ứng hoạt hình tĩnh vật Stop-motion).
  - `Bounce / Elastic`: Tự động nảy bưng bưng như quả bóng cao su rơi xuống đất!

---

## 3. CÁC NGUYÊN TẮC HOẠT HỌA KINH ĐIỂN CẦN GHI NHỚ

- **Squash and Stretch (Co và Dãn):** Quả bóng khi rơi chạm đất phải bị bẹp dẹt theo phương ngang (Squash) nhưng khi nảy vút lên không trung phải bị kéo dài theo phương thẳng đứng (Stretch), nhưng *thể tích tổng thể không đổi*.
- **Anticipation (Lấy đà):** Trước khi nhân vật nhảy vọt lên cao, họ phải khuỵu gối lấy đà xuống thấp; trước khi tung cú đấm về phía trước, cánh tay phải giật lùi về phía sau.
- **Follow Through & Overlapping Action (Chuyển động tiếp diễn):** Khi nhân vật dừng chạy đột ngột, tà áo choàng, mái tóc đuôi ngựa và thanh kiếm đeo sau lưng vẫn tiếp tục văng về phía trước trước khi lắng xuống.
