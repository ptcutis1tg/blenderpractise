# BÀI HỌC 08.01: TỐI ƯU HÓA GAME ASSET PIPELINE (UNREAL ENGINE & UNITY)

## 1. Mục tiêu bài học
- Hiểu toàn diện chu trình sản xuất tài nguyên trò chơi 3D (**Game Asset Pipeline**): High-poly -> Low-poly -> UV -> Bake -> Texture -> Export.
- Nắm vững ngân sách đa giác (**Polycount Budgets**) cho các nền tảng: Mobile, PC/Console, và cơ chế Nanite trong Unreal Engine 5.
- Phân biệt sự khác biệt sinh tử giữa **OpenGL (+Y)** và **DirectX (-Y)** trong Normal Map.
- Thiết lập quy chuẩn đặt tên, vật lý va chạm (**Collision Mesh**), và cấu hình xuất file **FBX / glTF (GLB)** chuẩn chỉnh.

---

## 2. Toàn cảnh Game Asset Pipeline

```
[1. Khái niệm & Blockout] ---> [2. High-Poly Sculpt/Model] ---> [3. Low-Poly Retopology]
                                                                        |
[6. Nhập vào Game Engine] <--- [5. PBR Texturing (Substance)] <--- [4. UV Unwrap & Bake]
```

1. **Blockout**: Dựng hình học thô để kiểm tra tỉ lệ nhân vật và tỉ lệ không gian trong game.
2. **High-Poly**: Mô hình hàng triệu đa giác chứa đầy đủ chi tiết nếp nhăn, bu lông, vết xước, vát mép tròn trịa.
3. **Low-Poly**: Lưới tối ưu hóa bám sát hình dáng high-poly nhưng số lượng đa giác thấp, phân bố quads/tris sạch sẽ.
4. **UV Unwrapping**: Trải phẳng bề mặt không bị méo (Stretch-free), tối đa hóa diện tích sử dụng UV (Texel Density cao).
5. **Bake Maps**: Chiếu chi tiết từ High-Poly sang Low-Poly (Normal map, Ambient Occlusion, Curvature, ID map).
6. **Texturing**: Sơn vật liệu PBR (Albedo/BaseColor, Roughness, Metallic, Normal, Height).
7. **Export**: Xuất sang FBX hoặc GLTF để đưa vào Unity / Unreal Engine / Godot / WebGL.

---

## 3. Ngân sách Polycount (Budgets) & Nguyên tắc Tam giác hoá (Triangulation)

### 3.1. Ngân sách tham khảo trung bình
| Thể loại tài nguyên | Mobile / VR thấp | PC / Console chuẩn | Unreal Engine 5 (Nanite) |
| :--- | :--- | :--- | :--- |
| **Vật phẩm nhỏ (Prop / Đồ nhặt)** | 300 - 1,500 Tris | 1,500 - 6,000 Tris | Hàng chục ngàn Tris |
| **Vũ khí chính (Guns, Swords)** | 2,000 - 5,000 Tris | 10,000 - 35,000 Tris | 100,000+ Tris |
| **Nhân vật chính (Main Hero)** | 8,000 - 20,000 Tris | 40,000 - 120,000 Tris | Hàng triệu Tris (với Nanite Skeletal) |
| **Môi trường / Kiến trúc** | 1,000 - 5,000 Tris / module | 5,000 - 30,000 Tris / module | Chi tiết trực tiếp không cần Low-poly |

### 3.2. Quy tắc vàng về Tam giác hoá (Triangulation)
- Trong Game Engine, mọi đa giác đều bị GPU chia thành hình tam giác (**Triangles / Tris**).
- Một Quad phẳng có thể bị engine gập chéo theo 2 hướng khác nhau. Nếu hướng gập của engine khác với hướng gập khi nướng Normal Map ở Blender/Substance, vật thể sẽ bị hiện tượng **bóng tối méo mó (Shading shading artifact)**.
- **Giải pháp**: Trước khi xuất FBX sang game engine, hãy thêm modifier **Triangulate** (hoặc tích chọn *Triangulate Faces* trong menu xuất FBX).

---

## 4. Cạm bẫy Normal Map: DirectX (-Y) vs OpenGL (+Y)

Đây là lỗi phổ biến nhất khiến vật thể trong game trông như bị khoét lõm vào trong thay vì lồi lên:
- **OpenGL (Right-handed, Y+)**: Sử dụng bởi **Blender**, **Unity**, **Godot**, **WebGL / Three.js**.
  - Kênh màu Xanh lá (Green channel) biểu thị ánh sáng chiếu từ đỉnh trên xuống.
- **DirectX (Left-handed, Y-)**: Sử dụng bởi **Unreal Engine**, **3ds Max**.
  - Kênh màu Xanh lá (Green channel) bị đảo ngược (Inverted), biểu thị ánh sáng từ dưới lên.
- **Cách xử lý**:
  - Nếu làm cho Unreal Engine: Trong bảng Texture Settings của Unreal, click đúp vào texture Normal Map và tích vào ô **Flip Green Channel**.
  - Hoặc khi nướng texture trong Substance Painter / Baker, chọn template định dạng `Unreal Engine 4/5 (Packed)` ngay từ đầu.

---

## 5. Quy chuẩn Va chạm tự động (Custom Collision Meshes)

Để nhân vật trong Unreal Engine hoặc Unity không đi xuyên qua tường hay đồ vật mà không làm giảm FPS, ta tạo lưới va chạm đơn giản trong Blender với quy tắc tiền tố đặt tên:
- **UBX_[TênVậtThể]**: Hộp va chạm chữ nhật (Box Collider). Ví dụ: `UBX_Chair_01`.
- **USP_[TênVậtThể]**: Khối cầu va chạm (Sphere Collider). Ví dụ: `USP_Apple`.
- **UCP_[TênVậtThể]**: Khối trụ va chạm (Capsule Collider).
- **UCX_[TênVậtThể]**: Khối lồi đa diện tùy chỉnh (Convex Collider). Ví dụ: `UCX_Rock_Giant`.

Khi nhập file FBX vào Unreal Engine, engine sẽ tự động gán các khối này thành vách ngăn vật lý mà không tốn công cài đặt bằng tay.

---

## 6. Cấu hình Xuất file FBX và glTF Chuẩn quốc tế

### 6.1. Xuất file FBX cho Unreal Engine / Unity
1. Chọn vật thể cần xuất.
2. `File` -> `Export` -> `FBX (.fbx)`.
3. Bảng thiết lập bên phải:
   - **Limit to**: Tích chọn **Selected Objects** (chỉ xuất vật thể được chọn).
   - **Object Types**: Chọn **Mesh** (và **Armature** nếu có xương). Bỏ chọn Camera và Lamp.
   - **Transform**:
     - Scale: `1.00`.
     - Forward: `-Z Forward`.
     - Up: `Y Up` (đối với Unity) hoặc để Blender tự đồng bộ.
     - **Apply Scalings**: Chọn `FBX All` (cực kỳ quan trọng để không bị lỗi tỉ lệ x100 khi vào Unreal Engine).
   - **Geometry**:
     - Smoothing: Chọn **Face** hoặc **Normals** (tránh để `Off` gây gãy khối).
     - Tích chọn **Apply Modifiers**.
   - **Armature** (nếu xuất nhân vật):
     - Bỏ tích **Add Leaf Bones** (tránh tạo thêm các mẩu xương thừa ở đầu mút).

### 6.2. Xuất file glTF / GLB cho Web, Three.js và Mobile
- Sử dụng format **glTF Binary (.glb)** để nhúng toàn bộ Mesh, Texture PBR và Animation vào 1 file duy nhất siêu nhẹ.
- Tích chọn `Remember Export Settings`.
- Texture được tự động nén định dạng Web-ready tối ưu.

---

## 7. Bài tập thực hành
- **Bài tập**: Hoàn thiện và đóng gói 1 thùng gỗ hòm báu vật (Treasure Chest) sẵn sàng cho Game Engine.
- **Yêu cầu**:
  1. Giới hạn ngân sách dưới 2,500 Tris.
  2. Tạo va chạm `UCX_TreasureChest` bọc sát thân hòm.
  3. Kiểm tra không còn n-gons, không đỉnh trùng (`By Distance`).
  4. Đặt Pivot/Origin ở đáy tiếp xúc mặt đất `(0, 0, 0)`.
  5. Xuất ra file `TreasureChest.fbx` với chuẩn Face Smoothing và Apply All Transforms.
