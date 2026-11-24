# 🏛️ BLENDER 3D MASTER CURRICULUM DATABASE
### Cơ Sở Dữ Liệu Giáo Trình & Bài Học Blender 3D Toàn Diện (Từ Nhập Môn Đến Chuyên Nghiệp)

> **Mục đích**: Tổng hợp toàn bộ kiến thức, quy trình chuẩn công nghiệp và các bài học tinh hoa về Blender từ internet, phân loại khoa học theo **Trình độ (Levels)** và **Chủ đề chuyên môn (Domains)**. Lưu trữ độc lập thành kho tài liệu để chuẩn bị cho lộ trình học tập bài bản.

---

## 🗺️ BẢN ĐỒ MA TRẬN KỸ NĂNG THEO TRÌNH ĐỘ (SKILL LEVEL MATRIX)

| Cấp độ (Level) | Mục tiêu trọng tâm | Đầu ra dự án (Milestone Project) | Thời gian ước tính |
| :--- | :--- | :--- | :--- |
| **Level 0: Absolute Beginner** | Làm chủ giao diện, không gian 3D, thao tác phím tắt cốt lõi | Dựng căn phòng Isometric Low-Poly đơn giản | 1 - 2 tuần |
| **Level 1: Box & Mesh Modeling** | Thao tác Edit Mode, nguyên lý Quads, công cụ Extrude/Inset/Bevel | Bộ đồ nội thất phong cách Stylized (Ghế, Bàn, Tủ) | 2 - 3 tuần |
| **Level 2: Intermediate Hard-Surface** | Làm chủ Modifiers phi phá hủy, Booleans sạch, Bevel Weights | Vũ khí Sci-Fi / Hộp quân sự (Crate) chuẩn Topology | 3 - 4 tuần |
| **Level 3: Sculpting & Organic** | Điêu khắc nhân vật, cọ cọ Dyntopo, Voxel Remesh, Retopology | Đầu tượng sinh vật (Creature Head) / Quái vật Stylized | 3 - 4 tuần |
| **Level 4: UV Unwrapping & Shading** | Trải UV không méo, PBR Principled BSDF, Procedural Material Nodes | Rương báu cổ phong hóa (Gỗ mốc, Kim loại rỉ sét) | 3 - 4 tuần |
| **Level 5: Lighting & Rendering** | 3-Point Lighting, HDRI, Cycles Ray-tracing, Eevee Next, Compositor | Render sản phẩm thương mại chuẩn studio điện ảnh | 2 tuần |
| **Level 6: Rigging & Animation** | Hệ thống xương Armatures, IK/FK, Weight Painting, Graph Editor | Chu kỳ đi bộ (Walk Cycle) nhân vật / Bẫy cơ khí | 3 - 4 tuần |
| **Level 7: Geometry Nodes & Physics** | Hệ thống Node thủ tục, tán rải đối tượng, mô phỏng Cloth/Fluid | Máy phát địa hình thủ tục (Procedural Terrain) / Vải bay | 3 - 4 tuần |
| **Level 8: Game Asset Pipeline & Export**| Nướng Normal Maps (High-to-Low poly), tối ưu LODs, Unreal/Unity | Asset vũ khí sẵn sàng đưa vào game engine | 2 tuần |

---

## 📁 CẤU TRÚC THƯ MỤC CÁC CHỦ ĐỀ CHI TIẾT

```text
blender_curriculum_database/
├── README.md                                 <- Bản đồ tổng quan (File này)
├── 00_TONG_QUAN_LO_TRINH_TOAN_DIEN.md        <- Chi tiết lộ trình từ 0 đến Hero, mẹo tránh Tutorial Hell
│
├── 01_nhap_mon_co_ban/                      <- Level 0: Nền tảng giao diện & điều hướng
│   ├── 01_giao_dien_va_khong_gian_3d.md
│   ├── 02_he_thong_phim_tat_song_con.md
│   └── 03_quan_ly_object_va_collections.md
│
├── 02_dung_hinh_modeling_hard_surface/      <- Level 1 & 2: Dựng hình khối & Hard-Surface
│   ├── 01_nguyen_ly_topology_quads.md
│   ├── 02_bo_cong_cu_edit_mode.md
│   ├── 03_modifiers_non_destructive.md
│   └── 04_quy_trinh_hard_surface_chuyen_nghiep.md
│
├── 03_dieu_khac_sculpting_organic/          <- Level 3: Điêu khắc hữu cơ & Nhân vật
│   ├── 01_sculpt_mode_co_ban.md
│   ├── 02_dyntopo_va_voxel_remesh.md
│   └── 03_retopology_chuan_animation.md
│
├── 04_trai_uv_va_vat_lieu_shading/          <- Level 4: Trải UV, PBR & Shader Nodes
│   ├── 01_nguyen_ly_trai_uv_unwrapping.md
│   ├── 02_principled_bsdf_va_pbr.md
│   ├── 03_shader_editor_procedural_nodes.md
│   └── 04_texture_painting_va_baking.md
│
├── 05_anh_sang_render_cycles_eevee/         <- Level 5: Ánh sáng & Kết xuất hình ảnh
│   ├── 01_ly_thuyet_anh_sang_cinematic.md
│   ├── 02_so_sanh_cycles_vs_eevee_next.md
│   ├── 03_camera_va_composition.md
│   └── 04_compositor_post_processing.md
│
├── 06_rigging_va_hoat_hoa_animation/        <- Level 6: Gắn xương & Chuyển động
│   ├── 01_co_ban_animation_keyframing.md
│   ├── 02_he_thong_xuong_armatures.md
│   └── 03_ik_fk_va_weight_painting.md
│
├── 07_geometry_nodes_va_simulation/         <- Level 7: Node thủ tục & Mô phỏng vật lý
│   ├── 01_geometry_nodes_co_ban_den_nang_cao.md
│   └── 02_vat_ly_simulations_physics.md
│
├── 08_game_pipeline_va_xuat_file/           <- Level 8: Tối ưu Game Engine (Unreal/Unity)
│   └── 01_toi_uu_game_asset_pipeline.md
│
└── 09_KHO_TAI_NGUYEN_VA_KENH_HOC_TIN_CAY.md <- Danh bạ kênh YouTube, tài liệu gốc, thư viện miễn phí
```

---

## 🎯 NGUYÊN TẮC HỌC TẬP CỐT LÕI (THE GOLDEN RULES)
1. **Rule of One Project (Học đi đôi với hành)**: Sau khi xem bất kỳ video hay bài học lý thuyết nào, hãy làm một sản phẩm tương tự nhưng đổi màu sắc, thay đổi chi tiết hoặc biến tấu theo ý thích cá nhân để không bị phụ thuộc vào từng bước hướng dẫn (tránh hội chứng *Tutorial Hell*).
2. **Keyboard-First Workflow**: Một tay luôn giữ trên bàn phím, một tay cầm chuột/bút vẽ. Không bao giờ dùng chuột click vào các menu trên cùng để tìm công cụ.
3. **Quad Topology Mindset**: Luôn tư duy cạnh 4 đỉnh (Quads) ngay từ khi bắt đầu dựng khối thô để tránh các lỗi bóng và rách lưới về sau.
