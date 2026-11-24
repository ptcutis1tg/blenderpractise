# 06 - TỐI ƯU HÓA HIỆU NĂNG & XUẤT FILE .EXE (OPTIMIZATION & EXPORT)

## 1. Các tiêu chuẩn tối ưu hóa bắt buộc trước khi đóng gói
1. **Occlusion Culling / View Distance Culling**:
   - Thiết lập khoảng cách camera nhìn tối đa (Far Plane: ~250m - 300m) kèm sương mù nhẹ ở đường chân trời. Các vật thể quá xa tầm mắt sẽ không bị vẽ ngầm, tiết kiệm 100% tài nguyên xử lý.
2. **Mesh Merging (Gộp lưới đa giác)**:
   - Các dãy tường bao quanh trường hoặc vỉa hè được gộp thành một mesh tĩnh duy nhất để giảm Draw Call xuống mức tối thiểu.
3. **Static Lighting**:
   - Dùng 1 nguồn sáng DirectionalLight3D đóng vai trò ánh sáng mặt trời, không bật Shadow động hoặc đặt độ phân giải shadow siêu thấp.

## 2. Quy trình xuất bản file cài đặt
- **Nền tảng xuất**: Windows Desktop (64-bit hoặc 32-bit cho máy cực cũ).
- **Đóng gói file**:
  - File chạy chính: `SchoolTour3D.exe`.
  - File dữ liệu đi kèm: `SchoolTour3D.pck`.
  - Nén cả thư mục thành 1 file `.zip` duy nhất, người nhận chỉ cần giải nén và click đúp chuột vào file `.exe` là chơi được ngay mà không cần cài đặt DirectX, Visual C++ Redistributable rườm rà.

## 3. Checklist kiểm thử hiệu năng
- [ ] Chạy thử trên máy tính chip Intel Celeron / Pentium hoặc Intel HD Graphics đời cũ.
- [ ] Tốc độ khung hình (FPS) đo được giữ vững $\ge 60$ FPS.
- [ ] Bộ nhớ RAM chiếm dụng khi chạy không vượt quá 300MB.
- [ ] Không có lỗi đi xuyên tường hay kẹt góc ở các lối đi hẹp.
