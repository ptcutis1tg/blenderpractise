# 🗺️ BẢN ĐỒ KẾ HOẠCH DỰ ÁN (PROJECT PLANS ROADMAP)

> **Dự án**: Game Giả lập Tham quan Trường học 3D (Bản Demo Low-Poly cho Máy Yếu)  
> **Nền tảng**: Windows Desktop App (`.exe` độc lập)  
> **Engine**: Godot Engine 4 (Compatibility Renderer / GLES3/OpenGL 3)  
> **Phương pháp tiếp cận**: Blockout / Greyboxing -> Chi tiết hóa từng phần (Iterative Detailing)

---

## 📂 Cấu trúc thư mục Kế hoạch

```text
plans/
├── README.md                           # Mục lục và lộ trình tổng thể (Tài liệu này)
├── 00-overview/
│   └── 00-project-blueprint.md         # Bản thiết kế kiến trúc, mục tiêu, nguyên tắc kỹ thuật
├── 01-data-specs/
│   └── 01-campus-measurements.md       # Cấu trúc nhập thông số trường, mặt bằng và kích thước
├── 02-engine-setup/
│   └── 02-godot-configuration.md       # Thiết lập Godot 4 tối ưu cho máy yếu (GLES3/Compatibility)
├── 03-blockout-phase/
│   ├── 03-greybox-layout.md            # Quy trình dựng khối thô tỉ lệ 1:1 và First-Person Controller
│   └── 03.1-blender-ground-modeling.md # Hướng dẫn chi tiết từng bước dựng nền trường trong Blender
├── 04-detailing-assets/
│   └── 04-lowpoly-assets-pipeline.md   # Quy trình thay asset low-poly và Color Palette Texture
├── 05-features-ui/
│   └── 05-interactions-minimap.md      # Hệ thống Minimap, bảng tên thông tin khu vực
└── 06-optimization-export/
    └── 06-build-and-testing.md         # Tối ưu Draw Call, xuất file .exe và kiểm thử hiệu năng
```

---

## 📌 Lộ trình thực hiện từng bước

| Giai đoạn | Đề mục kế hoạch | Trạng thái | Mục tiêu nghiệm thu |
| :---: | :--- | :---: | :--- |
| **00** | [00-project-blueprint.md](./00-overview/00-project-blueprint.md) | 🟢 Đã hoàn thành | Thống nhất phạm vi demo, nền tảng và triết lý thiết kế |
| **01** | [01-campus-measurements.md](./01-data-specs/01-campus-measurements.md) | 🟢 Đã hoàn thành | Đã trích xuất thông số chuẩn từ bản vẽ QH-01 (TL 1/750) Chuyên Thái Nguyên |
| **02** | [02-godot-configuration.md](./02-engine-setup/02-godot-configuration.md) | ⚪ Chờ thực hiện | Cấu hình template project Godot siêu nhẹ, tắt các tính năng thừa |
| **03** | [03.1-blender-ground-modeling.md](./03-blockout-phase/03.1-blender-ground-modeling.md) | 🟡 Đang thực hiện | Hướng dẫn dựng nền mặt bằng chuẩn 1:1 trong Blender |
| **04** | [04-lowpoly-assets-pipeline.md](./04-detailing-assets/04-lowpoly-assets-pipeline.md) | ⚪ Chờ thực hiện | Thay thế khối thô bằng mô hình trường học và cây xanh low-poly |
| **05** | [05-interactions-minimap.md](./05-features-ui/05-interactions-minimap.md) | ⚪ Chờ thực hiện | Gắn Minimap định vị và bảng thông tin tên tòa nhà khi lại gần |
| **06** | [06-build-and-testing.md](./06-optimization-export/06-build-and-testing.md) | ⚪ Chờ thực hiện | Xuất file `.exe` < 50MB, kiểm thử mượt 60 FPS trên máy yếu |
