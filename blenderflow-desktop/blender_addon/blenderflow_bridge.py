bl_info = {
    "name": "BlenderFlow Live Bridge",
    "author": "BlenderFlow Desktop Team",
    "version": (1, 0, 0),
    "blender": (4, 2, 0),
    "location": "View3D > Sidebar > BlenderFlow",
    "description": "Live mesh topology synchronization and challenge verification bridge for BlenderFlow Desktop.",
    "category": "Development",
}

import bpy
import json
import os
from pathlib import Path

BRIDGE_FILE_PATH = os.path.join(str(Path.home()), ".blenderflow_telemetry.json")

def inspect_active_mesh():
    obj = bpy.context.active_object
    if not obj or obj.type != 'MESH':
        return None
    
    mesh = obj.data
    verts_count = len(mesh.vertices)
    faces_count = len(mesh.polygons)
    
    quads = 0
    tris = 0
    ngons = 0
    
    for poly in mesh.polygons:
        v_count = len(poly.vertices)
        if v_count == 4:
            quads += 1
        elif v_count == 3:
            tris += 1
        else:
            ngons += 1
            
    modifiers = [m.name for m in obj.modifiers]
    
    quad_percent = round((quads / faces_count * 100), 1) if faces_count > 0 else 0
    
    return {
        "object_name": obj.name,
        "vertices": verts_count,
        "faces": faces_count,
        "quads": quads,
        "triangles": tris,
        "ngons": ngons,
        "quad_percentage": quad_percent,
        "modifiers": modifiers,
        "is_all_quads": ngons == 0 and tris == 0,
    }

class BLENDERFLOW_OT_sync_mesh(bpy.types.Operator):
    """Sync active mesh topology with BlenderFlow Desktop"""
    bl_idname = "blenderflow.sync_mesh"
    bl_label = "Sync Mesh to BlenderFlow"
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        data = inspect_active_mesh()
        if not data:
            self.report({'WARNING'}, "No active mesh object selected!")
            return {'CANCELLED'}
        
        try:
            with open(BRIDGE_FILE_PATH, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            self.report({'INFO'}, f"Synced {data['object_name']}: {data['vertices']} Verts, {data['quads']} Quads")
            return {'FINISHED'}
        except Exception as e:
            self.report({'ERROR'}, f"Failed to write bridge telemetry: {str(e)}")
            return {'CANCELLED'}

class BLENDERFLOW_PT_main_panel(bpy.types.Panel):
    """Creates a Panel in the 3D Viewport N-Panel"""
    bl_label = "BlenderFlow 5.3 Bridge"
    bl_idname = "BLENDERFLOW_PT_main_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'BlenderFlow'

    def draw(self, context):
        layout = self.layout
        obj = context.active_object

        # Header Box
        header_box = layout.box()
        row = header_box.row()
        row.label(text="BlenderFlow Desktop Bridge", icon='LINKED')
        
        if not obj or obj.type != 'MESH':
            layout.label(text="Select a Mesh object to inspect", icon='INFO')
            return

        data = inspect_active_mesh()
        if not data:
            return

        # Metrics Box
        box = layout.box()
        box.label(text=f"Object: {data['object_name']}", icon='OBJECT_DATA')
        
        col = box.column(align=True)
        col.label(text=f"Vertices: {data['vertices']}", icon='VERTEXSEL')
        col.label(text=f"Faces: {data['faces']} (Quads: {data['quads']})", icon='FACESEL')
        
        if data['ngons'] > 0:
            col.alert = True
            col.label(text=f"N-Gons Detected: {data['ngons']} (Fix to Quads!)", icon='ERROR')
        else:
            col.label(text="0 N-Gons (Clean Quads)", icon='CHECKMARK')

        # Challenge 04 Target Check
        target_box = layout.box()
        target_box.label(text="Challenge 04 Target: Chair", icon='TROPICAL')
        row_target = target_box.row()
        if data['vertices'] == 148 and data['quads'] == 136 and data['ngons'] == 0:
            row_target.alert = False
            row_target.label(text="Topology Matches Target 100%!", icon='SOLO_ON')
        else:
            row_target.label(text=f"Target: 148 Verts / 136 Quads", icon='INFO')

        # Sync Button
        layout.separator()
        layout.operator("blenderflow.sync_mesh", text="Sync Topology to App", icon='FILE_REFRESH')

classes = (
    BLENDERFLOW_OT_sync_mesh,
    BLENDERFLOW_PT_main_panel,
)

def register():
    for cls in classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()
