import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
  useDuration,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout, Browser } from "mcas";
import { fadein, fadeout, flashAround } from "mcas/lib";

import aynRandLexicon from "../assets/ayn-rand-lexicon.png";
import { sky500, yellow500 } from "mcas/colors";

import tikBigBusinessImg from "../assets/tik big business business public.png";

// + [ ] private and public as package deals (have the words "private" and "public" on screen and then the package terms come out of them to beneath)
//   + private: small, individual, collective
//   + public: large, collective

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const full = createRef<Rect>();
  const priv = createRefArray<Txt>();
  const pub = createRefArray<Txt>();

  view.add(
    <Rect layout gap={20} ref={full}>
      <Rect direction="column" alignItems="end">
        <Txt glow fill={colors.yellow500} fontSize={65}>
          Private
        </Txt>
        <Txt ref={priv} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          small
        </Txt>
        <Txt ref={priv} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          individual
        </Txt>
        <Txt ref={priv} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          collective
        </Txt>
      </Rect>
      <Txt fill={colors.zinc50} fontSize={65}>
        vs
      </Txt>
      <Rect direction="column">
        <Txt glow fill={colors.red500} fontSize={65}>
          Public
        </Txt>
        <Txt ref={pub} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          large
        </Txt>
        <Txt ref={pub} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          collective
        </Txt>
      </Rect>
    </Rect>,
  );

  for (let x of priv) {
    x.margin([-42, 0, 0, 0]);
    x.opacity(0);
  }

  for (let x of pub) {
    x.margin([-42, 0, 0, 0]);
    x.opacity(0);
  }

  full().opacity(0);

  yield* waitUntil("public");

  yield* fadein(full);

  yield* waitUntil("browser");

  const browser = createRef<Browser>();

  view.add(
    <Browser
      scale={0}
      position={[0, 100]}
      ref={browser}
      hyperlink="http://aynrandlexicon.com/lexicon/package-dealing,_fallacy_of.html"
    >
      <Img src={aynRandLexicon} width={1000} />
    </Browser>,
  );

  yield* all(full().position([0, -400], 1), delay(0.8, popin(browser)));

  yield* waitUntil("highlight");

  const highlightProgress = createSignal(0);
  const rays = createRefArray<Ray>();

  const mkRay = (y: number, x: number) =>
    view.add(
      <Ray
        ref={rays}
        lineWidth={25}
        opacity={0.2}
        stroke={sky500}
        from={[-480, y]}
        to={[x, y]}
      />,
    );

  mkRay(-92, 450);
  mkRay(-66, 480);
  mkRay(-39, 105);

  for (let i = 0; i < rays.length; ++i) {
    rays[i].end(createSignal(() => highlightProgress() * 3 - i));
  }

  yield* highlightProgress(1, 1);

  yield* waitUntil("show packages");

  yield* all(...rays.map((ray) => ray.opacity(0, 1)));
  yield* all(popout(browser), delay(0.2, full().position([0, 0], 1)));

  yield* waitUntil("show private");

  yield* all(
    ...priv.map((x, i) =>
      chain(
        waitFor(i * 0.1),
        all(x.margin([0, 0, 0, 0], 1), chain(waitFor(0.3), x.opacity(1, 1))),
      ),
    ),
  );

  yield* waitUntil("show public");

  yield* all(
    ...pub.map((x, i) =>
      chain(
        waitFor(i * 0.1),
        all(x.margin([0, 0, 0, 0], 1), chain(waitFor(0.3), x.opacity(1, 1))),
      ),
    ),
  );

  yield* waitUntil("fadeout full");

  yield* fadeout(full);

  const bigBusiness = createRef<Img>();

  view.add(<Img ref={bigBusiness} src={tikBigBusinessImg} />);
  yield* popin(bigBusiness);

  const indications = createRefArray<Rect>();

  view.add(
    <Rect ref={indications} width={455} height={100} position={[-633, 466]} />,
  );
  view.add(
    <Rect ref={indications} width={490} height={100} position={[378, 466]} />,
  );
  view.add(
    <Rect ref={indications} width={200} height={100} position={[758, 466]} />,
  );

  yield* waitUntil("indicate big business");
  yield* flashAround(() => indications[0]);
  yield* waitUntil("indicate central banks");
  yield* flashAround(() => indications[1]);
  yield* waitUntil("indicate state");
  yield* flashAround(() => indications[2]);

  yield* bigBusiness().opacity(0, useDuration("fade out"));
});
