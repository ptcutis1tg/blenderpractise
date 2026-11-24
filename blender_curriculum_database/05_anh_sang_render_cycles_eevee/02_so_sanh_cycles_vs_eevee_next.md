# ⚡ BÀI 5.2: SO SÁNH CYCLES (RAY-TRACING) VS EEVEE NEXT (REAL-TIME)

---

## 1. BẢN CHẤT CÔNG NGHỆ CỦA 2 CỖ MÁY RENDER

| Tiêu chí | Cycles Render Engine | EEVEE Next (Blender 4.x / 5.x) |
| :--- | :--- | :--- |
| **Cơ chế hoạt động** | **Path Tracing (Dò tia vật lý)**. Bắn hàng triệu hạt photon ánh sáng nảy bật qua lại trong không gian thật. | **Rasterization (Quét mảng điểm ảnh)** kết hợp bộ đổ bóng thời gian thực trên nền Vulkan / Metal. |
| **Độ chân thực quang học** | Chân thực 100% về vật lý: Khúc xạ kính, tụ quang (Caustics), phản xạ đa tầng (Global Illumination). | Rất cao, giả lập xấp xỉ bằng Screen-Space Effects và Horizon-Based Ambient Occlusion. |
| **Thời gian Render 1 khung hình**| Từ vài giây đến vài phút tùy cấu hình card đồ họa GPU. | **Từ vài mili-giây đến vài giây** (Tốc độ gần như tức thì, đạt 60 FPS trong Viewport). |
| **Trường hợp sử dụng** | Ảnh tĩnh quảng cáo sản phẩm, phim kỹ xảo điện ảnh photorealistic, nội thất kiến trúc sang trọng. | Làm phim hoạt hình Stylized, Motion Graphics, kiểm tra bố cục nhanh, Render chuỗi chuyển động dài hàng ngàn frame. |

---

## 2. TỐI ƯU HÓA CYCLES RENDER (GIẢM 80% THỜI GIAN CHỜ)

Để Cycles render nhanh như chớp mà không bị sạn hạt (Noise):
1. **Bật GPU Compute:** Vào *Preferences $\rightarrow$ System* $\rightarrow$ chọn tab **CUDA / OptiX** (cho card NVIDIA) hoặc **HIP** (cho card AMD). Trong bảng Render Engine, đổi mục Device từ *CPU* sang **`GPU Compute`**.
2. **Đừng để Samples quá cao:**
   - Ngày xưa phải để 1000 - 2000 samples.
   - Với Blender hiện đại có bộ lọc AI khử nhiễu **Denoise (OptiX hoặc OpenImageDenoise)**, bạn chỉ cần đặt **`Max Samples = 128 đến 256`** và Noise Threshold là `0.01` là bức ảnh đã trong veo, sạch bóng sạn hạt!
3. **Giảm số lần nảy bật của tia sáng (Light Paths):**
   - Đặt Total Bounces khoảng `6 - 8`.
   - Giảm Clamping Indirect xuống `10.0` để triệt tiêu hoàn toàn hiện tượng đốm sáng trắng nhấp nháy (Fireflies).

---

## 3. TÍNH NĂNG ĐỘT PHÁ: LIGHT LINKING

Từ phiên bản Blender 4.x trở đi, tính năng **Light Linking** cho phép bạn:
- Chỉ định chiếc đèn viền Rim Light CHỈ chiếu sáng lên người nhân vật, mà KHÔNG làm sáng bức tường đen phía sau lưng!
- Giúp các nghệ sĩ kiểm soát ánh sáng cục bộ chính xác như trường quay điện ảnh Hollywood mà không cần dùng đến các tấm cản sáng vật lý rườm rà.
