# KẾ HOẠCH CHI TIẾT & LỘ TRÌNH PHÁT TRIỂN PHẦN MỀM
## Ứng Dụng Desktop: Quản Lý Lộ Trình Học 3D Blender, Soi Mẫu Tương Tác & Luyện Tập Thực Hành (BlenderFlow Desktop)

---

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

### 1.1. Mục tiêu sản phẩm
Xây dựng một ứng dụng Desktop chuyên biệt hỗ trợ người học chinh phục phần mềm 3D **Blender**:
- **Lộ trình học 3D phân cấp rõ ràng**: Từ làm quen giao diện/Viewport $\rightarrow$ Mesh Modeling $\rightarrow$ Modifiers $\rightarrow$ Shading/Materials $\rightarrow$ Lighting & Rendering $\rightarrow$ Geometry Nodes/Sculpting.
- **Tính năng Độc quyền: Chế độ Thực Hành Chia Đôi Màn Hình (Dual-View Practice Mode 50:50)**:
  - **Tab 1: 3D Model Inspector (Mẫu Tham Chiếu Trực Quan 360°)**: Trình xem 3D tương tác siêu nhẹ tích hợp ngay trong app (WebGL/Three.js), cho phép người học xoay 360°, phóng to/thu nhỏ, bật chế độ **Wireframe** để soi kỹ cấu trúc đường lưới (Topology/Edge Flow), chế độ **Solid**, **X-Ray**, và xem thông số tham chiếu (Vertices, Faces, danh sách Modifiers).
  - **Tab 2: Live Blender Practice (Thực Hành Trực Tiếp Trên Blender Thật)**: Khởi động file bài tập `.blend` trên phần mềm Blender của máy tính. Đi kèm bảng **Checklist từng bước** và tùy chọn **Addon BlenderFlow (N-Panel)** hỗ trợ kiểm tra thông số lưới đối chiếu tự động.
- **Hệ thống Phím Tắt Trực Quan (Interactive Hotkey Badges `<kbd>`)**: Phím tắt là linh hồn của Blender. Hiển thị trực quan các tổ hợp phím bấm (`G`, `R`, `S`, `Tab`, `Ctrl + B`, `Shift + A`, `NumPad`).
- **Tích hợp AI Trợ Lý 3D (3D AI Tutor)**: Giải thích lỗi lật mặt lưới (Flipped Normals), lỗi non-manifold geometry, gợi ý topology chuẩn và tối ưu hóa file render.

### 1.2. Triết lý thiết kế cốt lõi
1. **Local-First & Không Giới Hạn Công Cụ**: Thực hành trên chính ứng dụng Blender native của máy tính để người dùng sở hữu 100% phím tắt, add-on và hiệu năng phần cứng GPU thật mà không bị giới hạn bởi nền tảng web.
2. **Soi Mẫu Đối Chiếu Tức Thì**: Không bắt người học phải chuyển qua chuyển lại giữa các cửa sổ; màn hình 50:50 vừa soi lưới mẫu xoay 360 độ vừa thao tác dựng hình trên Blender.
3. **Siêu nhẹ & Tiết kiệm RAM**: Ứng dụng xây dựng trên nền **Tauri v2 + React** (ngốn <25MB RAM), đảm bảo khi chạy song song với Blender thì máy tính vẫn hoạt động cực kỳ mượt mà.

---

## 2. KIẾN TRÚC HỆ THỐNG & CƠ CHẾ KẾT NỐI BLENDER

```mermaid
flowchart TD
    subgraph AppHost ["Ứng Dụng BlenderFlow Desktop (Tauri v2 + React)"]
        Nav["Navigator Bar Trái<br>(Home, Search, Roadmaps, Hotkey Cheatsheet, Settings)"]
        
        subgraph SplitPracticeView ["Chế độ Thực Hành 3D (Split Practice View 50:50)"]
            Tab1["TAB 1: 3D Model Inspector<br>(WebGL Viewer 360°, Soi Wireframe, X-Ray, Topology)"]
            Tab2["TAB 2: Checklist Thực Hành<br>(Từng bước thao tác + Phím tắt gợi ý KBD)"]
        end
        
        Bridge["Blender Process Bridge (Rust System Command)"]
    end

    subgraph NativeOS ["Hệ Điều Hành & Phần Mềm Máy Tính"]
        BlenderApp["Phần Mềm Blender Thật (blender.exe)"]
        BlendFile["File Thực Hành Mẫu (starter_challenge.blend)"]
        Addon["BlenderFlow Companion Addon (N-Panel Extension)"]
    end

    Bridge -->|"1-Click Open"| BlenderApp
    BlenderApp -->|"Load file"| BlendFile
    Addon -->|"Auto-verify Vertices/Faces via Local Socket"| AppHost
```

### 2.1. Chi tiết cơ chế hoạt động
1. **Tab 1: 3D Model Inspector (Bên Trái)**:
   - Dựng bằng Three.js / WebGL siêu nhẹ tích hợp trong React.
   - Nhận file mô hình chuẩn (glTF / OBJ) được đóng gói sẵn trong bài học.
   - Bộ công cụ tương tác:
     - 🔄 Xoay Orbit 360°, Pan, Zoom.
     - 🌐 Nút bật/tắt **Wireframe** (hiển thị rõ từng đường cạnh, mặt tứ giác quads).
     - 🔍 Nút bật/tắt **X-Ray** (xuyên thấu).
     - 📊 Thước đo thông số mẫu: `Vertices: 342`, `Faces: 320`, `Modifiers: Mirror + Bevel`.
2. **Tab 2: Live Blender Practice (Bên Phải)**:
   - Nút lớn: **"🚀 Mở Bài Tập Trong Blender"** $\rightarrow$ Tauri gọi lệnh native khởi chạy `blender.exe exercise.blend`.
   - Bảng nhiệm vụ (Task Checklist):
     - [ ] Bước 1: Tạo khối Cube (`Shift + A`).
     - [ ] Bước 2: Bo cạnh bằng Bevel (`Ctrl + B`).
     - [ ] Bước 3: Thêm vòng cắt Loop Cut (`Ctrl + R`).
   - Tùy chọn xác minh (Verification):
     - *Thủ công*: Tự tích hoàn thành sau khi đối chiếu với model mẫu.
     - *Tự động (Addon)*: Bấm nút "Check Topology" trên N-Panel của Blender, addon sẽ đếm số đỉnh/mặt đối chiếu và báo hoàn thành về ứng dụng.

---

## 3. CẤU TRÚC DỮ LIỆU CỐT LÕI (DATA SCHEMA)

```mermaid
erDiagram
    ROADMAP ||--o{ MODULE : "chứa các module"
    MODULE ||--o{ LESSON : "chứa các bài học 3D"
    MODULE ||--o{ PRACTICE_TASK : "chứa bài tập dựng hình & quiz"
    PRACTICE_TASK ||--o{ MODEL_REFERENCE : "có model 3D mẫu để soi"

    ROADMAP {
        string id PK
        string title "Low-Poly Environment | Hard Surface | Shading"
        string category
        float progress_percent
        int total_tasks
        int completed_tasks
    }

    MODULE {
        string id PK
        string roadmap_id FK
        string title "Module 2: Essential Mesh Modeling"
        int order_index
        float module_progress
    }

    LESSON {
        string id PK
        string module_id FK
        string title "Lesson 2.3: Inset & Bevel Workflows"
        text content_markdown
        json hotkeys_used "['I', 'Ctrl+B', 'Ctrl+R']"
        boolean is_completed
    }

    PRACTICE_TASK {
        string id PK
        string module_id FK
        string type "3d_challenge | hotkey_drill"
        string title "Thử thách: Dựng chiếc ghế Low-poly"
        string blend_file_path "assets/blend/starter_chair.blend"
        json task_checklist
        boolean is_passed
    }

    MODEL_REFERENCE {
        string id PK
        string task_id FK
        string gltf_model_url
        int expected_vertices
        int expected_faces
        json used_modifiers
    }
```

---

## 4. QUY TRÌNH HOẠT ĐỘNG CHÍNH (KEY WORKFLOWS)

### 4.1. Luồng Học Lý Thuyết & Xem Minh Họa (Lesson Workspace)
1. Người dùng chọn một bài học từ Cây đề mục $\rightarrow$ Khung đọc bài trượt ra chiếm 80% màn hình.
2. Tiêu đề hiển thị dải phím tắt nổi bật (`<kbd>Tab</kbd>`, `<kbd>I</kbd>`, `<kbd>Ctrl+B</kbd>`).
3. Nội dung trình bày trực quan: Các bước thao tác 1-2-3, ảnh GIF minh họa tool, bảng so sánh và khung ghi chú cá nhân.
4. Bấm "Hoàn thành lý thuyết $\rightarrow$ Chuyển sang thực hành".

### 4.2. Luồng Thực Hành 3D Chia Đôi Màn Hình (Split Practice Flow)
1. Người dùng bấm **"Bắt đầu thực hành 3D"**:
   - Ứng dụng tự động điều chỉnh cửa sổ (Auto-Snap 50:50) hoặc chia không gian màn hình:
     - **Bên Trái**: Mở **Tab 1: 3D Inspector**. Model mẫu hiện lên, người dùng dùng chuột xoay 360 độ, bật chế độ Wireframe để soi từng đường cắt lưới (Edge loops). Phía dưới là bảng Checklist nhiệm vụ.
     - **Bên Phải**: Bấm nút "Mở Blender" $\rightarrow$ Ứng dụng tự động mở phần mềm Blender thật với file bài tập `starter_chair.blend`.
2. Người dùng vừa nhìn mẫu 3D xoay bên trái $\rightarrow$ Vừa dùng phím tắt native dựng hình trên Blender bên phải.
3. Khi hoàn thành:
   - Người dùng đối chiếu hình dạng và số đỉnh/mặt.
   - Bấm nút "Đánh dấu hoàn thành" trên App (hoặc bấm "Verify Topology" trên Addon Blender) $\rightarrow$ Thanh tiến độ khóa học tự động tăng % ngay lập tức.

### 4.3. Luồng Luyện Phản Xạ Phím Tắt (Hotkey Speed Drill)
1. Dưới mỗi Module có khối luyện phản xạ phím tắt.
2. Hiển thị câu hỏi tình huống: *"Phím tắt để bo tròn đỉnh (Vertex Bevel) thay vì bo cạnh trong Edit Mode là gì?"*.
3. Bấm chọn đáp án $\rightarrow$ Phản hồi Đúng (xanh)/Sai (đỏ) kèm khung mẹo nhớ phím tắt.

---

## 5. LỘ TRÌNH THỰC HIỆN THEO TỪNG GIAI ĐOẠN (IMPLEMENTATION ROADMAP)

```mermaid
gantt
    title Lộ trình triển khai BlenderFlow Desktop
    dateFormat  YYYY-MM-DD
    section Giai đoạn 1
    Khởi tạo Tauri v2 + React Shell Dark Mode:done, p1_1, 2026-11-25, 2d
    Navigator Bar & Windows Titlebar Controls :active, p1_2, after p1_1, 2d
    section Giai đoạn 2
    Quản lý Lộ trình Blender & Cây đề mục     :p2_1, after p1_2, 3d
    Component hiển thị Phím tắt KBD & Ảnh 3D  :p2_2, after p2_1, 2d
    Slide-over 3D Lesson Reader               :p2_3, after p2_2, 2d
    section Giai đoạn 3
    Tab 1: 3D Model Inspector (WebGL 360°)   :p3_1, after p2_3, 3d
    Tab 2: Live Blender Launcher & Checklist  :p3_2, after p3_1, 3d
    section Giai đoạn 4
    Engine Trắc nghiệm Hotkey & Flashcards   :p4_1, after p3_2, 2d
    Tùy chọn Addon BlenderFlow (N-Panel)      :p4_2, after p4_1, 3d
    section Giai đoạn 5
    Tối ưu hóa, Kiểm thử & Đóng gói Windows   :p5_1, after p4_2, 3d
```
