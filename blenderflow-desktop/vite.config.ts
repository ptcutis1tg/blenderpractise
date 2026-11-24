import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

function blenderBridgePlugin(): Plugin {
  const registerMiddlewares = (server: any) => {
    // 1. Endpoint to launch Blender 5.3 with .blend file
    server.middlewares.use('/api/launch-blender', (req: any, res: any) => {
      if (req.method === 'POST') {
        const blenderExe = 'C:\\Program Files\\Blender Foundation\\Blender 5.3\\blender.exe';
        const defaultBlend = path.resolve(__dirname, 'starter_assets/challenge_04_chair_starter.blend');

        let body = '';
        req.on('data', (chunk: any) => (body += chunk));
        req.on('end', () => {
          let targetFile = defaultBlend;
          try {
            if (body) {
              const parsed = JSON.parse(body);
              if (parsed.filePath && fs.existsSync(parsed.filePath)) {
                targetFile = parsed.filePath;
              }
            }
          } catch (e) {}

          console.log(`[BlenderBridge] Request to launch: "${blenderExe}" "${targetFile}"`);

          if (!fs.existsSync(blenderExe)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                error: `Blender 5.3 not found at ${blenderExe}`,
              })
            );
            return;
          }

          try {
            const child = spawn(blenderExe, [targetFile], {
              detached: true,
              stdio: 'ignore',
            });
            child.unref();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: `Blender 5.3 launched successfully with ${path.basename(targetFile)}!`,
                pid: child.pid,
                filePath: targetFile,
              })
            );
          } catch (err: any) {
            console.error('[BlenderBridge] Launch error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
      }
    });

    // 2. Endpoint to fetch live telemetry synced from Blender
    server.middlewares.use('/api/mesh-telemetry', (req: any, res: any) => {
      if (req.method === 'GET') {
        const telemetryPath = path.join(os.homedir(), '.blenderflow_telemetry.json');
        if (fs.existsSync(telemetryPath)) {
          try {
            const content = fs.readFileSync(telemetryPath, 'utf8');
            const data = JSON.parse(content);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, telemetry: data }));
            return;
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: 'No telemetry file written yet by Blender addon.' }));
      } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
      }
    });
  };

  return {
    name: 'blender-bridge-server',
    configureServer(server) {
      registerMiddlewares(server);
    },
    configurePreviewServer(server) {
      registerMiddlewares(server);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), blenderBridgePlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          lucide: ['lucide-react'],
        },
      },
    },
  },
  clearScreen: false,
});
