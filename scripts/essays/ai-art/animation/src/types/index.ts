import { Reference } from "@motion-canvas/core";

export { TVec2 } from "./TVec2";
export { TCorners } from "./TCorners";

export type withRef<T, R> = T & { ref: Reference<R> };
