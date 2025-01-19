import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  waitUntil,
  spawn,
  spring,
  SmoothSpring,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { flashAround, SquigglyBorder } from "mcas/lib";
import randVid from "../assets/rand.mp4";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const rand = createRef<Video>();
  const squiggly = createRef<SquigglyBorder>();
  const randCont = createRef<Rect>();

  view.add(
    <Rect ref={randCont}>
      <SquigglyBorder ref={squiggly}>
        <Video
          ref={rand}
          src={randVid}
          height="66%"
          shadowBlur={50}
          shadowColor="000000aa"
          shadowOffsetY={25}
        />
      </SquigglyBorder>
    </Rect>,
  );

  let wiggle = true;

  rand().play();
  yield spawn(function* () {
    while (wiggle) {
      yield* squiggly().wiggle();
    }
  });

  yield* spring(SmoothSpring, 0, 1, 0.001, (value) => {
    randCont().scale(value);
  });

  yield* waitUntil("definition");

  yield* randCont().position([0, -100], 1);

  const def = createRef<Txt>();
  const moral = createRef<Txt>();
  const freedom = createRef<Txt>();
  const social = createRef<Txt>();

  view.add(
    <Txt
      zIndex={-1}
      ref={def}
      position={[0, 400]}
      fill="white"
      textWrap
      width={1000}
      textAlign="center"
    >
      "\dots a <Txt ref={moral}>moral principle</Txt> defining and sanctioning a
      man's <Txt ref={freedom}>freedom of action</Txt>{" "}
      <Txt ref={social}>in a social context</Txt>."
    </Txt>,
  );

  yield* fadein(def);

  yield* waitUntil("moral principle");
  yield* flashAround(moral);

  yield* waitUntil("freedom of action");
  yield* flashAround(freedom);

  yield* waitUntil("social");
  yield* flashAround(social);

  yield* waitUntil("def out");
  yield* all(fadeout(def), randCont().position(0, 1));

  yield* waitUntil("rand out breaker breaker");

  yield* spring(
    { ...SmoothSpring, initialVelocity: 8 },
    1,
    0,
    0.001,
    (value) => {
      randCont().scale(Math.abs(value));
    },
  );

  wiggle = false;
});
