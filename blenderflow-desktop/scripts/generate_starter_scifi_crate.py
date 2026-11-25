import bpy
import os

# 1. Reset to clean empty scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# 2. Set units to Metric, Meters
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 1.0
scene.unit_settings.length_unit = 'METERS'

# 3. Create Collection "SciFi_Crate_Challenge_05"
col = bpy.data.collections.new("SciFi_Crate_Challenge_05")
scene.collection.children.link(col)

# 4. Add Starter Sci-Fi Crate Base Cube
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 0.55))
crate_obj = bpy.context.active_object
crate_obj.name = "SciFi_Crate_Starter"
crate_obj.scale = (1.5, 1.1, 1.0)

scene.collection.objects.unlink(crate_obj)
col.objects.link(crate_obj)

# Apply scale transform before Mirror / Bevel modifiers
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

# Add starter Bevel modifier (disabled by default or minimal segment ready to tune)
bevel = crate_obj.modifiers.new(name="Bevel", type='BEVEL')
bevel.width = 0.02
bevel.segments = 2

# 5. Add Reference Studio Camera
cam_data = bpy.data.cameras.new("Reference_Cam")
cam_obj = bpy.data.objects.new("Reference_Cam", cam_data)
cam_obj.location = (3.2, -3.5, 2.5)
cam_obj.rotation_euler = (1.1, 0.0, 0.72)
col.objects.link(cam_obj)
scene.camera = cam_obj

# 6. Add Key Light
light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
light_data.energy = 300
light_data.size = 2.5
light_obj = bpy.data.objects.new(name="Key_Light", object_data=light_data)
light_obj.location = (3.0, -3.0, 4.0)
col.objects.link(light_obj)

# 7. Output directory
output_dir = os.path.join(os.getcwd(), "starter_assets")
os.makedirs(output_dir, exist_ok=True)
blend_path = os.path.join(output_dir, "challenge_05_scifi_crate.blend")

bpy.ops.wm.save_as_mainfile(filepath=blend_path)
print(f"SUCCESS: Generated starter file at: {blend_path}")
