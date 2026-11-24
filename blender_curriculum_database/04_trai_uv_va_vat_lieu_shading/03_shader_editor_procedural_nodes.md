# 🧪 BÀI 4.3: LÀM CHỦ SHADER EDITOR & VẬT LIỆU THỦ TỤC (PROCEDURAL NODES)

---

## 1. VŨ KHÍ BÍ MẬT: ADDON NODE WRANGLER

Trước khi bắt đầu làm shader, hãy vào **Edit $\rightarrow$ Preferences $\rightarrow$ Add-ons** $\rightarrow$ gõ tìm kiếm **`Node Wrangler`** và tích chọn bật nó lên (Addon miễn phí có sẵn 100% trong Blender).

### Các phím tắt siêu tốc của Node Wrangler:
- **`Ctrl + Shift + Click` lên bất kỳ node nào:** Lập tức soi thử kết quả đầu ra của node đó lên mô hình (Viewer Node).
- **`Ctrl + T` (Khi đang chọn một node Texture hoặc Principled BSDF):** Tự động thêm một cụm 3 node gồm *Texture Coordinate* + *Mapping* + *Image Texture*.
- **`Shift + Ctrl + T` (Bấm vào Principled BSDF):** Mở cửa sổ chọn file $\rightarrow$ quét chọn cả 5 file ảnh tải về (BaseColor, Roughness, Metallic, Normal, Height) $\rightarrow$ Blender sẽ tự động nối dây vào đúng 5 cổng tương ứng trong 0.5 giây!

---

## 2. BỘ CÁC NODE THỦ TỤC QUAN TRỌNG NHẤT

1. **Noise Texture (Node tạo nhiễu ngẫu nhiên):**
   - Tạo ra các vệt mây, đốm bẩn, bề mặt gồ ghề của đá hoặc rỉ sét.
   - Thông số: *Scale* (Độ to nhỏ), *Detail* (Độ phức tạp gồ ghề), *Roughness* (Độ ráp).
2. **Voronoi Texture (Node tạo hoa văn tế bào):**
   - Tạo vảy da cá sấu, mai rùa, hoa văn nứt nẻ bùn đất khô, hoặc đốm nước lấp lánh đáy hồ bơi.
3. **ColorRamp (Node lọc dải màu & tăng tương phản):**
   - Đóng vai trò như bộ Curves / Levels trong Photoshop.
   - Nhận tín hiệu đen trắng của Noise Texture và đổi thành 2 màu bất kỳ (ví dụ Màu nâu gỗ đậm và Nâu gỗ nhạt), hoặc kéo 2 chốt đen trắng sát vào nhau để tăng độ sắc nét của vết rỉ sét.
4. **Bump Node:**
   - Đổi tín hiệu độ cao đen trắng từ *Noise Texture / ColorRamp* sang vector pháp tuyến để cắm vào cổng **Normal** của Principled BSDF.

---

## 3. CÔNG THỨC DỰNG VẬT LIỆU GỖ CŨ PHONG HÓA BẰNG THỦ TỤC

```text
[Texture Coordinate: Object] 
          │
          ▼
   [Mapping Node] (Kéo dài trục Z x10 để tạo thớ gỗ dọc)
          │
          ▼
 [Wave Texture / Noise] 
          │
    ┌─────┴───────────────┐
    ▼                     ▼
[ColorRamp: Màu gỗ]   [ColorRamp: Độ bóng]
    │                     │
    ▼ (Cắm Base Color)    ▼ (Cắm Roughness)
       [ PRINCIPLED BSDF SHADER ]
```
> Nhờ cách làm này, bạn không cần dùng bất kỳ bức ảnh tải từ internet nào mà vẫn có một bề mặt gỗ mộc tự nhiên vô tận, không bao giờ bị lộ đường nối lặp lại (No seam repetitions)!
