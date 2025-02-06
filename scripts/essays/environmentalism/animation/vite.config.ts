import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import mcas from "mcas/plugin";

export default defineConfig({
  plugins: [motionCanvas(), ffmpeg(), mcas()],
});
