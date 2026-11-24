# BlenderFlow Desktop - 3D Learning & Practice App

**BlenderFlow Desktop** là ứng dụng chuyên biệt hỗ trợ học Blender 3D bài bản theo lộ trình, tối ưu phản xạ phím tắt, trực quan hóa mesh topology và tích hợp chế độ **Dual-View 50:50 Practice Mode** độc quyền (bên trái là 3D Model Inspector Three.js 360°, bên phải kết nối trực tiếp native `blender.exe` cùng checklist kiểm tra mesh).

---

## 🚀 Tính Năng Đã Hoàn Thiện Trong Giai Đoạn 1 (Phase 1)

1. **Desktop Shell & Dark Slate Minimalist UI**:
   - Sidebar 220px: Logo BlenderFlow cam đặc trưng (`#F97316`), các tab `Home`, `Search`, `My Roadmaps`, `Hotkey Drills`, `Settings`.
   - Widget hiển thị chuỗi học tập: `🔥 12d Streak`.
   - Live Bridge Indicator: `● Blender 5.3 Bridge Connected (Port 9876)`.
   - Desktop Titlebar: Tích hợp breadcrumbs điều hướng theo ngữ cảnh, nút tìm kiếm nhanh (`Ctrl+K`), nút đồng bộ lưới và cụm điều khiển cửa sổ.

2. **Hệ Thống Dữ Liệu & Lộ Trình (Local Database Service)**:
   - **Roadmap 1**: *Hard-Surface & Low-Poly 3D Modeling* (Viewport Mastery $\rightarrow$ Mesh Topology $\rightarrow$ Modifiers).
   - **Roadmap 2**: *Procedural Shading & Material Nodes*.
   - **Roadmap 3**: *Cinematic 3-Point Lighting & Cycles Rendering*.
   - Lưu trữ tiến độ học, checkbox từng bước vào LocalStorage một cách tự động.

3. **Chế Độ Thực Hành Chia Đôi Màn Hình (50:50 Dual-View Mode)**:
   - **Panel Trái (Three.js WebGL Inspector)**:
     - Dựng mô hình 3D chiếc ghế gỗ Stylized Low-Poly chuẩn topology.
     - Xoay 360° tự do (Orbit drag), cuộn chuột phóng to thu nhỏ, tự động quay (Auto-Rotate).
     - 3 Chế độ xem: `Solid` (PBR bóng đổ phòng thu), `Wireframe` (Hiển thị các cạnh quads sắc nét), `X-Ray` (Xuyên thấu phân tích kết cấu bên trong).
     - Bảng thông số HUD thời gian thực: `148 Vertices`, `136 Faces (100% Quads)`, `0 N-gons`, `Mirror, Bevel`.
   - **Panel Phải (Checklist & Tích Hợp Blender Native)**:
     - Nút CTA mở nhanh file bài tập: `🚀 Launch & Work in Blender 5.3 (challenge_04_chair_starter.blend)`.
     - Danh sách 6 bước thực hành kèm keycap phím tắt chi tiết (`Tab`, `Ctrl+R`, `E`, `I`, `Ctrl+B`).
     - Bộ kiểm tra lưới (Mesh Topology Inspector) tự động chấm điểm và đánh giá độ chính xác của mô hình.

4. **Trang Luyện Tập Phím Tắt (Hotkey Speed Drills)**:
   - Danh bạ tra cứu và rèn luyện trí nhớ cơ bắp cho các phím tắt cốt lõi của Blender 5.3 theo chế độ (Object Mode, Edit Mode, Viewport, Shading).

---

## 🛠️ Hướng Dẫn Chạy Thử Nghiệm

1. Chạy môi trường phát triển (Development Server):
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
cd "c:\Users\Admin\Desktop\CODE\blenderflow-desktop"
npm.cmd run dev
```

2. Biên dịch Production Build:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
cd "c:\Users\Admin\Desktop\CODE\blenderflow-desktop"
npm.cmd run build
```
