import { makeScene2D, Rect, Ray, Img, Grid } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, after } from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const axes = createRefArray<Ray>();
  const grid = createRef<Grid>();

  const authLeft = createRef<Rect>();
  const libLeft = createRef<Rect>();
  const authRight = createRef<Rect>();
  const libRight = createRef<Rect>();

  const leftist = createSignal(0);
  const rightist = createSignal(0);

  const quadrantSize = (2000 - 40 * 2) / 2;

  view.add(
    <Rect
      ref={authLeft}
      fill="red"
      height={quadrantSize}
      width={() => leftist() * quadrantSize}
      bottomRight={() => 0}
    />,
  );
  view.add(
    <Rect
      ref={libLeft}
      fill={colors.green500}
      height={quadrantSize}
      width={() => leftist() * quadrantSize}
      topRight={() => 0}
    />,
  );
  view.add(
    <Rect
      ref={authRight}
      fill={colors.blue700}
      height={quadrantSize}
      width={() => rightist() * quadrantSize}
      bottomLeft={() => 0}
    />,
  );
  view.add(
    <Rect
      ref={libRight}
      fill="yellow"
      height={quadrantSize}
      width={() => rightist() * quadrantSize}
      topLeft={() => 0}
    />,
  );

  view.add(
    <Grid
      lineWidth={6}
      ref={grid}
      size={2000 - 40 * 2 - 1}
      stroke={"#666"}
      start={0.5}
      end={0.5}
    />,
  );

  view.add(
    <Ray
      end={0.5}
      start={0.5}
      ref={axes}
      arrowSize={40}
      fromY={-1000}
      toY={1000}
      lineWidth={32}
      startArrow
      endArrow
      stroke="white"
    />,
  );
  view.add(
    <Ray
      end={0.5}
      start={0.5}
      ref={axes}
      arrowSize={40}
      fromX={-1000}
      toX={1000}
      lineWidth={32}
      startArrow
      endArrow
      stroke="white"
    />,
  );

  yield* all(
    ...axes.map((a) => all(a.end(1, 1), a.start(0, 1))),
    grid().start(0, 1),
    grid().end(1, 1),
  );

  yield* after("rightist", rightist(1, 1));
  yield* after("leftist", leftist(1, 1));
  yield* waitUntil("end");
});
