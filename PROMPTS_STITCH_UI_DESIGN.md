# BỘ PROMPTS CHỈNH SỬA UI CHO STITCH – BLENDERFLOW DESKTOP
## Ứng dụng: Lộ trình Tự học 3D Blender & Không Gian Thực Hành Chia Đôi Màn Hình (50:50)
## Phong cách: Minimalist, Blender Dark Slate (#0B0F19 / #1E293B), Phím tắt KBD, 3D Inspector Model 360°

---

## 🎨 TỔNG QUAN HỆ THỐNG
1. **Màu sắc chủ đạo**: Nền tối Deep Slate (`#0B0F19`), Card chứa thông tin (`#111827`), Viền mảnh (`#1F2937`), màu điểm nhấn **Blender Orange (`#F97316`)**, màu thành công **Emerald Green (`#10B981`)** và phím tắt **Indigo (`#6366F1`)**.
2. **Kiến trúc Thực hành 2 Tab Độc quyền (Split Practice Mode)**:
   - **Tab 1: 3D Model Inspector (Bên Trái)**: Xem mô hình 3D mẫu tương tác xoay 360°, có các nút chuyển chế độ xem: **Wireframe** (soi đường lưới / Topology), **Solid**, **X-Ray**, bảng thông số mẫu (Vertices: 342, Faces: 320, Modifiers: Bevel).
   - **Tab 2: Live Blender Practice (Bên Phải)**: Nút 1-click mở file `.blend` trong Blender thật + Bảng checklist nhiệm vụ từng bước có phím tắt `<kbd>`.

---

## 🏠 PROMPT 1: MÀN HÌNH CHÍNH (BLENDERFLOW HOME DASHBOARD)

```text
Design the "Home Dashboard" for "BlenderFlow" – a desktop application for tracking self-directed Blender 3D learning roadmaps.

### Layout & Style:
- Desktop window (1440x900px) with custom Windows controls (— □ ✕) at top-right.
- Dark theme inspired by Blender UI: Background #0B0F19, Cards #111827, Accent Blender Orange (#F97316), Success Emerald (#10B981).
- Left Sidebar (Fixed 220px):
  - Logo: "BlenderFlow" with the iconic 3D Blender orange spiral logo.
  - Navigation: "Home" (active with orange pill indicator), "Search", "My Roadmaps", "Hotkey Cheatsheet", "Settings".
  - Footer widget: "🔥 8 Days Streak" and "Blender 4.2 LTS: Linked 🟢".

### Top Header Bar (Height 48px):
- Left: Quick search pill ("⌘K Search hotkeys, tools, lessons...").
- Right: "+ New Roadmap" button, "Manage" icon button, and Native Windows Controls (— □ ✕).

### "Resume Learning" Hero Card (Top Priority, Visual & Direct):
- Highlighted card for current active course: "Hard-Surface & Low-Poly 3D Modeling".
- Current lesson: "Module 2: Mesh Editing • Lesson 2.3: Inset & Bevel Workflows".
- Next Hotkey Focus: Compact badge row displaying "<kbd>I</kbd> Inset Faces" • "<kbd>Ctrl</kbd>+<kbd>B</kbd> Bevel Edges".
- Linear progress bar: 64% completed (16/25 lessons finished).
- Primary CTA Button (Blender Orange #F97316): "Resume Lesson →".

### "My 3D Roadmaps" Grid:
- Filter pills: "All", "In Progress", "Completed".
- 3-column Course Cards focusing on visual progress:
  1. Card 1: "Low-Poly Environment Modeling" (Category: Modeling • 64% progress bar • 16/25 lessons • 4 hotkey drills).
  2. Card 2: "Procedural Shading & Texturing" (Category: Shading • 40% progress bar • 8/20 lessons • 2 material challenges).
  3. Card 3: "Lighting, Camera & Cycles Render" (Category: Lighting • 85% progress bar • 12/14 lessons • 3 render tasks).
- Clean, minimal cards with no 3-line filler text. Only bold title, category badge, linear progress bar, and "Resume →" link.
```

---

## 📚 PROMPT 2: KHÔNG GIAN KHÓA HỌC BLENDER (3D COURSE WORKSPACE)

```text
Design the "Course Study Workspace" for BlenderFlow Desktop:

### Top Header & Progress:
- Breadcrumb: "Home > Hard-Surface & Low-Poly 3D Modeling" and Window Controls (— □ ✕).
- Course Title: "Hard-Surface & Low-Poly 3D Modeling in Blender" with an Edit button.
- Compact Overall Progress Banner:
  - Big metric: "64% Complete • 16/25 Lessons • 5 Hotkey Drills Passed".
  - Sleek gradient progress bar (Blender Orange to Emerald).
  - Primary button: "Continue: Lesson 2.3 (Bevel Workflows) →".

### Curriculum Modules (Clean Section Cards, Structured for 3D):

#### Module 1: 3D Viewport & Navigation (100% Complete):
- Collapsed card with green checkmark and "Completed (6/6)".
- Badge: "Hotkey Drill: 10/10 Mastered".

#### Module 2: Essential Mesh Modeling (In Progress - 60%):
- Module header with 60% progress bar and tag "Edit Mode Basics".
- Lesson List:
  - Row 1: [✓ Green Check] Lesson 2.1: Vertices, Edges & Faces (Hotkeys: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd>).
  - Row 2: [✓ Green Check] Lesson 2.2: Extrude Region & Manifold (<kbd>E</kbd> / <kbd>Alt+E</kbd>).
  - Row 3: [▶ Orange Active] Lesson 2.3: Inset (<kbd>I</kbd>) & Bevel (<kbd>Ctrl+B</kbd>) - with "Open Lesson →" button.
  - Row 4: [🔒 Locked] Lesson 2.4: Loop Cut & Slide (<kbd>Ctrl+R</kbd>).
- **Module 2 Practice Block (Directly underneath Module 2 lessons)**:
  - Container with title: "🎯 Module 2 Practice & 3D Challenges".
  - 3 interactive action cards in a row:
    1. "⚡ Hotkey Speed Drill (10 questions on Edit Mode)" -> [Start Quiz] button.
    2. "🪑 3D Challenge: Model a Lowpoly Chair (Step-by-step checklist)" -> [Start Practice Mode] button.
    3. "📁 Starter File: download starter_chair.blend" -> [Open in Blender ↗] button.

#### Module 3: Modifiers & High-Poly Detailing (0% - Locked):
- Dimmed clean row with padlock icon and "Module 3: Subsurf, Mirror & Bevel Modifiers".
```

---

## 🪑 PROMPT 3: CHẾ ĐỘ THỰC HÀNH 3D CHIA ĐÔI MÀN HÌNH (SPLIT-VIEW 3D PRACTICE MODE)

```text
Design the dedicated "3D Practice Mode (Dual View / Split-Screen 50:50)" for BlenderFlow Desktop. 
This screen is triggered when the student clicks "Start 3D Challenge: Low-poly Chair".

### Layout & Top Bar:
- Top Bar (Height 44px):
  - Breadcrumb: "Module 2 > Challenge: Low-poly Chair Modeling".
  - Status pill: "⚡ Split Practice Mode (Side-by-side with Blender)".
  - Right controls: "Auto-Snap Windows (50/50)", "[Esc] Exit Challenge".

### Main Content: 2-Panel Split Workspace (Or Side-by-Side Companion):

#### LEFT PANEL (50% Width) - "TAB 1: 3D MODEL INSPECTOR (Mẫu Tham Chiếu 360°)":
- Card header: "Reference Model (Mẫu Chuẩn 360°)" with Viewport Toolstrip:
  - Active Toggle: [Wireframe Mode] (Shows clean quad topology lines).
  - Toggle: [Solid Shading].
  - Toggle: [X-Ray View].
  - Reset Camera icon (Front / Top / Right views: <kbd>1</kbd>, <kbd>7</kbd>, <kbd>3</kbd>).
- Interactive 3D Canvas Area:
  - High-precision 3D viewport rendering a low-poly stylized wooden chair with clear edge loops and wireframe overlay.
  - Subtle orientation gizmo in top-right corner.
- Reference Model Metrics HUD (Bottom overlay of the 3D viewport):
  - Metrics pills: "Vertices: 148", "Faces: 136 (100% Quads)", "Modifiers: Mirror + Bevel (3 seg)".

#### RIGHT PANEL (50% Width) - "TAB 2: LIVE BLENDER PRACTICE & TASK CHECKLIST":
- Card header: "Your Practice Workspace (Làm theo mẫu)" with Blender Live Connection status.
- Primary 1-Click Launch Action:
  - Big prominent button: "🚀 Open starter_chair.blend in Blender" (with Blender Orange logo and hotkey hint).
  - Subtitle: "Blender 4.2 running • exercise file loaded".
- Step-by-Step Task Checklist (Interactive items):
  - [x] Step 1: Base Blockout - Add Cube and scale along Z-axis (<kbd>S</kbd>+<kbd>Z</kbd>) - (Checked green).
  - [x] Step 2: Inset bottom face and Extrude 4 chair legs (<kbd>I</kbd> then <kbd>E</kbd>) - (Checked green).
  - [ ] Step 3: Backrest Extrude - Select top face loop and extrude upwards (<kbd>E</kbd>).
  - [ ] Step 4: Protective Bevels - Apply Scale (<kbd>Ctrl+A</kbd>) and Bevel outer edges (<kbd>Ctrl+B</kbd>).
- Companion Addon Sync Widget (Bottom):
  - Status: "BlenderFlow Addon: Connected to Blender Session".
  - Action button: "Verify Topology (Auto-check Vertices & Faces)".
  - Big CTA: "Submit & Complete Challenge ✓".
```

---

## ⌨️ PROMPT 4: BẢNG TRA CỨU PHÍM TẮT BLENDER (HOTKEY CHEATSHEET VIEW)

```text
Design the "Blender Hotkey Cheatsheet & Speed Drill" view in BlenderFlow Desktop:

- Clean searchable table / cards categorized by Blender Modes:
  - Tabs: "Object Mode", "Edit Mode (Mesh)", "Sculpt Mode", "Shader Editor".
- For "Edit Mode", display keycap badges with clear visual descriptions:
  - <kbd>Tab</kbd> -> Toggle Edit / Object Mode
  - <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> -> Vertex / Edge / Face Selection
  - <kbd>E</kbd> -> Extrude Region
  - <kbd>Ctrl</kbd>+<kbd>B</kbd> -> Bevel Edges
  - <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> -> Bevel Vertices
  - <kbd>Ctrl</kbd>+<kbd>R</kbd> -> Loop Cut & Slide (Scroll to add loops)
  - <kbd>K</kbd> -> Knife Tool
  - <kbd>Alt</kbd>+<kbd>M</kbd> / <kbd>M</kbd> -> Merge Vertices
- Search bar at top: Filter hotkeys instantly as user types.
```
