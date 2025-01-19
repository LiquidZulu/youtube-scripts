import { Shape } from "@motion-canvas/2d";
import { Reference, SmoothSpring, spring } from "@motion-canvas/core";

export const testPopin = <T extends Shape>(
  ref: Reference<T>,
  from?: number,
  to?: number,
) =>
  spring(SmoothSpring, (from ?? 0) * 100, (to ?? 1) * 100, 1, (value) => {
    ref().scale(value / 100);
  });
