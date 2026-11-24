const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const blenderExe = 'C:\\Program Files\\Blender Foundation\\Blender 5.3\\blender.exe';
const blendPath = path.resolve(__dirname, '../starter_assets/challenge_04_chair_starter.blend');

console.log('Testing Launcher Prerequisites:');
console.log('1. Blender Executable:', fs.existsSync(blenderExe) ? 'OK' : 'MISSING');
console.log('2. Starter Blend File:', fs.existsSync(blendPath) ? 'OK' : 'MISSING');

// Test launching in background with a quick exit flag (-b) to verify process execution
const child = spawn(blenderExe, [
  '-b', 
  blendPath, 
  '--python-expr', 
  'import bpy; print("SUCCESSFULLY_LOADED_PROJECT:", bpy.data.filepath); bpy.ops.wm.quit_blender()'
]);

child.stdout.on('data', d => {
  const line = d.toString().trim();
  if (line.includes('LOADED_PROJECT') || line.includes('Blender 5.3')) {
    console.log('[Blender Output]:', line);
  }
});

child.on('close', code => {
  console.log('Launcher process closed with exit code:', code);
  process.exit(code || 0);
});
