import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

function getLocalLanIp(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

function blenderBridgePlugin(): Plugin {
  const blenderExe = 'C:\\Program Files\\Blender Foundation\\Blender 5.3\\blender.exe';
  const defaultBlend = path.resolve(__dirname, 'starter_assets/challenge_04_chair_starter.blend');
  const telemetryPath = path.join(os.homedir(), '.blenderflow_telemetry.json');
  const targetPath = path.join(os.homedir(), '.blenderflow_target.json');

  const registerMiddlewares = (server: any) => {
    // Active Challenge Target sync endpoint for Blender Addon N-Panel
    server.middlewares.use('/api/active-challenge', (req: any, res: any) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => (body += chunk));
        req.on('end', () => {
          try {
            const payload = JSON.parse(body || '{}');
            fs.writeFileSync(targetPath, JSON.stringify(payload, null, 2), 'utf8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (err: any) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
      }
    });

    // 0. Healthcheck endpoint to verify local bridge & Blender availability
    server.middlewares.use('/api/bridge-status', (req: any, res: any) => {
      if (req.method === 'GET') {
        const lanIp = getLocalLanIp();
        const port = server.config?.server?.port || 5173;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            serverAvailable: true,
            blenderInstalled: fs.existsSync(blenderExe),
            blenderPath: blenderExe,
            starterAssetExists: fs.existsSync(defaultBlend),
            telemetryAvailable: fs.existsSync(telemetryPath),
            lanUrl: `http://${lanIp}:${port}`,
          })
        );
      } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
      }
    });

    // 1. Endpoint to launch Blender 5.3 with .blend file
    server.middlewares.use('/api/launch-blender', (req: any, res: any) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => (body += chunk));
        req.on('end', () => {
          let spawnArgs: string[] = [];
          let launchedLabel = 'Scene trống mới';
          try {
            if (body) {
              const parsed = JSON.parse(body);
              if (parsed.filePath && parsed.filePath !== 'new_scene') {
                const candidate = path.isAbsolute(parsed.filePath)
                  ? parsed.filePath
                  : path.resolve(__dirname, 'starter_assets', path.basename(parsed.filePath));
                if (fs.existsSync(candidate)) {
                  spawnArgs = [candidate];
                  launchedLabel = path.basename(candidate);
                }
              }
            }
          } catch (e) {}

          console.log(`[BlenderBridge] Request to launch: "${blenderExe}" ${spawnArgs.join(' ')}`);

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
            const child = spawn(blenderExe, spawnArgs, {
              detached: true,
              stdio: 'ignore',
            });
            child.unref();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: `Đã mở Blender 5.3 (${launchedLabel})!`,
                pid: child.pid,
                filePath: launchedLabel,
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
          supabase: ['@supabase/supabase-js'],
          curriculum: [
            './src/data/curriculumDatabase.ts',
            './src/data/curriculumEnrichment.ts',
            './src/data/curriculumEnrichmentPart1.ts',
            './src/data/curriculumEnrichmentPart2.ts',
          ],
        },
      },
    },
  },
  clearScreen: false,
});
