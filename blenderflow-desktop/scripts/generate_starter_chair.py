import bpy
import os

# 1. Reset to clean empty scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# 2. Set units to Metric, Meters
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 1.0
scene.unit_settings.length_unit = 'METERS'

# 3. Create Collection "Chair_Challenge"
col = bpy.data.collections.new("Chair_Challenge_04")
scene.collection.children.link(col)

# 4. Add Starter Seat Base Cube
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 0.85))
seat_obj = bpy.context.active_object
seat_obj.name = "Chair_Seat_Starter"
seat_obj.scale = (1.2, 1.2, 0.12)

# Unlink from default scene collection and link to our collection
scene.collection.objects.unlink(seat_obj)
col.objects.link(seat_obj)

# Apply scale transform so bevel modifier works correctly!
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

# 5. Add Reference Studio Camera
cam_data = bpy.data.cameras.new("Reference_Cam")
cam_obj = bpy.data.objects.new("Reference_Cam", cam_data)
cam_obj.location = (2.8, -3.2, 2.4)
cam_obj.rotation_euler = (1.1, 0.0, 0.72)
col.objects.link(cam_obj)
scene.camera = cam_obj

# 6. Add Key Light
light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
light_data.energy = 250
light_data.size = 2.0
light_obj = bpy.data.objects.new(name="Key_Light", object_data=light_data)
light_obj.location = (3.0, -3.0, 4.0)
col.objects.link(light_obj)

# 7. Output directory
output_dir = os.path.join(os.getcwd(), "starter_assets")
os.makedirs(output_dir, exist_ok=True)
blend_path = os.path.join(output_dir, "challenge_04_chair_starter.blend")

bpy.ops.wm.save_as_mainfile(filepath=blend_path)
print(f"SUCCESS: Generated starter file at: {blend_path}")
