import { makeScene2D, Txt, Img, Ray } from "@motion-canvas/2d";
import {
  waitFor,
  createRef,
  chain,
  all,
  createSignal,
} from "@motion-canvas/core";

import { default as frames } from "../assets/art-timelapse";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const slide = {
    y: 256,
    ref: createRef<Ray>(),
  };
  const notch = {
    width: 20,
    height: 40,
    ref: createRef<Ray>(),
  };

  const position = createSignal(0);

  view.add(
    <Img
      scale={2 / 5}
      y={-128}
      src={createSignal(() => frames[Math.floor(position() * frames.length)])}
    />
  );

  view.add(
    <>
      <Txt
        fontFamily={"Mononoki"}
        fill={0xffffff}
        x={-650}
        y={-128}
        fontSize={200}
        text="art("
      />
      <Txt
        fontFamily={"Mononoki"}
        fill={0xffffff}
        x={650}
        y={-128}
        fontSize={200}
        text={createSignal(() => ")=" + Math.floor(position() * 100))}
      />
    </>
  );

  view.add(
    <>
      <Ray
        ref={slide.ref}
        fromX={-512}
        toX={512}
        y={slide.y}
        stroke={"green"}
        lineWidth={12}
      />
      <Ray
        x={createSignal(() => (position() - 0.5) * (512 * 2))}
        ref={notch.ref}
        fromY={slide.y - notch.height / 2}
        toY={256 + notch.height / 2}
        stroke={"white"}
        lineWidth={notch.width}
      />
    </>
  );

  yield* chain(
    position(0.5, 2),
    position(0.13, 2),
    position(0.99, 2),
    position(0.72, 2),
    position(0.83, 2),
    position(0.45, 2),
    position(0.78, 3),
    position(0.99, 4),
    position(0, 2)
  );
});
