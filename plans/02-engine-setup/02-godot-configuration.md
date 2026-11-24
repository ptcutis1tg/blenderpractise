# 02 - THIẾT LẬP DỰ ÁN ENGINE SIÊU NHẸ (GODOT 4 COMPATIBILITY)

Tài liệu này ghi lại các bước và tham số cấu hình dự án để đạt hiệu năng tối đa trên máy yếu.

## 1. Thiết lập Renderer
- **Rendering Method**: Chọn `gl_compatibility` (tương thích chuẩn OpenGL 3 / WebGL, khởi chạy nhanh, không yêu cầu card đồ họa Vulkan hiện đại).
- **Vsync**: `Enabled` (khóa ở tần số quét màn hình, tránh nóng máy cho laptop).

## 2. Tinh chỉnh Project Settings cho máy yếu
- **Shadow Quality**: Thiết lập ở mức `Low` hoặc `Disabled` (sử dụng màu sắc và đổ bóng tĩnh giả lập).
- **Anti-Aliasing (Khử răng cưa)**: Tắt MSAA hoặc dùng FXAA siêu nhẹ.
- **Physics Tick Rate**: 60 ticks/s (đủ độ mượt mà cho việc đi bộ, không tốn CPU).

## 3. Cấu trúc thư mục Source Code dự án
```text
project/
├── project.godot               # File cấu hình gốc của Godot
├── scenes/
│   ├── main.tscn               # Scene chính chứa thế giới trường học
│   ├── player.tscn             # Nhân vật đi bộ góc nhìn thứ nhất
│   └── ui/                     # Scene giao diện người dùng
├── scripts/
│   ├── player_controller.gd    # Điều khiển di chuyển WASD + chuột
│   └── info_spot.gd            # Tương tác hiện thông tin tòa nhà
└── assets/
    ├── models/                 # Chứa các file 3D (.glb / .gltf)
    ├── textures/               # Chứa ảnh Color Palette 256x256
    └── fonts/                  # Phông chữ hiển thị thông tin
```
