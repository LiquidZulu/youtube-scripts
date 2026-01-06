import { makeScene2D, Rect, Ray, Img, Grid, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Vector2,
  delay,
  linear,
  waitUntil,
  useDuration,
  easeOutSine,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  sinFactory,
  after,
} from "mcas";
import * as colors from "mcas/colors";

import neutral from "../assets/rectenwald/neutral.png";
import happy from "../assets/rectenwald/happy.png";

export default makeScene2D(function* (view) {
  view.fill(0);

  const axes = createRefArray<Ray>();
  const grid = createRef<Grid>();

  const authLeft = createRef<Rect>();
  const libLeft = createRef<Rect>();
  const authRight = createRef<Rect>();
  const libRight = createRef<Rect>();

  const quadsSignal = createSignal(0);
  const quads = createSignal(() => quadsSignal() * quadrantSize);

  const quadrantSize = (2000 - 40 * 2) / 2;

  view.add(
    <Rect
      ref={authLeft}
      fill={colors.red400}
      height={quads}
      width={quads}
      bottomRight={() => 0}
    />,
  );
  view.add(
    <Rect
      ref={libLeft}
      fill={colors.green400}
      height={quads}
      width={quads}
      topRight={() => 0}
    />,
  );
  view.add(
    <Rect
      ref={authRight}
      fill={colors.blue400}
      height={quads}
      width={quads}
      bottomLeft={() => 0}
    />,
  );
  view.add(
    <Rect
      ref={libRight}
      fill={colors.yellow400}
      height={quads}
      width={quads}
      topLeft={() => 0}
    />,
  );

  view.add(
    <Grid
      lineWidth={2}
      ref={grid}
      size={2000 - 40 * 2 - 1}
      stroke={"#ccc"}
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

  const numCircles = 30;
  const spacing = 400;
  const expansionDuration = 2;
  const maxRadius = 6000;
  const speed = maxRadius / expansionDuration;
  const delayBetween = spacing / speed;
  const circleColor1 = colors.purple500;
  const circleColor2 = colors.orange500;
  const finalPos = new Vector2([560, -240]);
  const circles = createRefArray<Circle>();

  for (let i = 0; i < numCircles; i++) {
    view.add(
      <Circle
        ref={circles}
        position={finalPos}
        size={0}
        fill={i % 2 === 0 ? circleColor1 : circleColor2}
      />,
    );
  }

  const joos = createRef<Rect>();

  view.add(
    <Rect
      ref={joos}
      shadowBlur={50}
      shadowColor="000000aa"
      shadowOffset={[20, 30]}
      position={[0, 800]}
      scale={0}
    >
      <Txt
        fontFamily="Griffy"
        fontSize={300}
        fontWeight={999}
        fill={colors.rose600}
        lineWidth={20}
        stroke="white"
        strokeFirst
      >
        DA JOOOOOOOS
      </Txt>
    </Rect>,
  );

  const rec = createRef<Img>();

  const positions: Array<Vector2> = [
    [-8, -6],
    [9, 7],
    [-6, 4],
    [7, -3],
  ].map(
    (pos) =>
      new Vector2(
        (pos as [number, number]).map((coord) => coord * 80) as [
          number,
          number,
        ],
      ),
  );

  function* emanateCircle(c: Circle, dur: number) {
    c.opacity(1);
    yield* all(c.size(maxRadius, dur, linear));
  }

  function* moveRec(duration: number) {
    for (let pos of positions) {
      yield* rec().position(pos, duration, linear);
    }

    rec().src(happy);

    const rot = createSignal(0);
    rec().rotation(createSignal(() => sinFactory(-20, 40, 0.5)(0)(rot())));

    yield* all(
      rec().scale(1.8, 2, easeOutSine),
      rot(1, useDuration("rot")),
      popin(joos),
      ...circles.map((c, i) =>
        delay(i * delayBetween, emanateCircle(c, expansionDuration)),
      ),
    );
  }

  view.add(
    <Img
      ref={rec}
      src={neutral}
      scale={0}
      shadowBlur={50}
      shadowColor="000000aa"
      shadowOffset={[20, 30]}
    />,
  );

  yield* all(
    ...axes.map((a) => all(a.end(1, 1), a.start(0, 1))),
    grid().start(0, 1),
    grid().end(1, 1),
    quadsSignal(1, 1),
    after("rec in", moveRec(0.8), popin(rec)),
  );
});
