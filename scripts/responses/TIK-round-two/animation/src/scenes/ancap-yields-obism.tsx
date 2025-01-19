import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Reference,
  delay,
  waitUntil,
  spawn,
  spring,
  PlopSpring,
  BeatSpring,
  BounceSpring,
  JumpSpring,
  SmoothSpring,
  StrikeSpring,
  SwingSpring,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { flashAround, SquigglyBorder } from "mcas/lib";
import randVid from "../assets/rand.mp4";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();
  const entries = [
    [createRef<Txt>(), createRef<Ray>(), createRef<Txt>()],
    [createRef<Txt>(), createRef<Ray>(), createRef<Txt>()],
  ] as Array<[Reference<Txt>, Reference<Ray>, Reference<Txt>]>;
  const indicate = createRefArray<Rect>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} layout direction="column" alignItems="center" gap={64}>
      <Txt ref={title} fontSize={60} fill="white" textAlign="center">
        The integration of Objectivism{"\n"}and anarcho-capitalism:
      </Txt>
      <Rect direction="column" alignItems="center">
        <Rect ref={indicate} alignItems="center" gap={32}>
          <Txt ref={entries[0][0]} opacity={0} fill={colors.yellow500}>
            Anarcho-capitalism
          </Txt>
          <Ray
            ref={entries[0][1]}
            end={0}
            lineWidth={8}
            endArrow
            stroke="white"
            toX={70}
            arrowSize={12}
          />
          <Txt ref={entries[0][2]} opacity={0} fill={colors.purple500}>
            Objectivism<Txt fill="white">.</Txt>
          </Txt>
        </Rect>
        <Rect ref={indicate} alignItems="center" gap={32}>
          <Txt ref={entries[1][0]} opacity={0} fill={colors.purple500}>
            Objectivism
          </Txt>
          <Ray
            ref={entries[1][1]}
            end={0}
            lineWidth={8}
            endArrow
            stroke="white"
            toX={70}
            arrowSize={12}
          />
          <Txt ref={entries[1][2]} opacity={0} fill={colors.yellow500}>
            anarcho-capitalism<Txt fill="white">.</Txt>
          </Txt>
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* all(
    fadein(title),
    fadein(entries[0][0]),
    delay(0.1, entries[0][1]().end(1, 1)),
    delay(0.2, fadein(entries[0][2])),
    delay(
      0.1,
      all(
        fadein(entries[1][0]),
        delay(0.1, entries[1][1]().end(1, 1)),
        delay(0.2, fadein(entries[1][2])),
      ),
    ),
    chain(
      waitUntil("ancap -> obism"),
      flashAround(() => indicate[0]),
    ),
  );

  yield* waitUntil("obism -> ancap");
  yield* flashAround(() => indicate[1]);

  yield* waitUntil("out");

  yield* all(
    fadeout(title),
    delay(
      0.1,
      all(
        fadeout(entries[0][0]),
        delay(0.1, entries[0][1]().start(1, 1)),
        delay(0.2, fadeout(entries[0][2])),
        delay(
          0.1,
          all(
            fadeout(entries[1][0]),
            delay(0.1, entries[1][1]().start(1, 1)),
            delay(0.2, fadeout(entries[1][2])),
          ),
        ),
      ),
    ),
  );

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
