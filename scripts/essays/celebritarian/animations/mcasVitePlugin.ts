import { Plugin } from "@motion-canvas/vite-plugin";
import express from "express";
import { getVideoInformation, getRandomVideos } from "mcas/util/yt.js";

const app = express();

app.get("/mcas", async (req, res) => {
  if ("v" in req.query) {
    const videos = await getVideoInformation(...req.query.v.split(";"));
    res.send(JSON.stringify(videos));
  }

  if ("random_videos" in req.query) {
    const videos = await getRandomVideos(Number(req.query.random_videos));
    res.send(JSON.stringify(videos));
  }
});

export default function mcas(): Plugin {
  return {
    name: "mcas-vite-plugin",
    apply: "serve", // Only run during dev server
    configureServer(server) {
      server.middlewares.use(app);
    },
    // Remove entryPoint to avoid client-side import
    // Optionally keep runtimeConfig if needed by Motion Canvas
    [Symbol.for("motion-canvas:plugin-options")]: {
      runtimeConfig: () => ({
        cwd: process.cwd(),
      }),
    },
  };
}
