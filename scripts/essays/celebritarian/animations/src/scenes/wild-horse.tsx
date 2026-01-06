import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Camera,
  RayProps,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  clamp,
  waitUntil,
  sequence,
  delay,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  fixCamera,
  after,
  flash,
} from "mcas";
import * as colors from "mcas/colors";
import screenshot from "../assets/wild-horse.jpg";

export default makeScene2D(function* (view) {
  view.fill(0);

  const c = createRef<Camera>();
  const rays = createRefArray<Ray>();

  const rayProps: RayProps = {
    lineWidth: 50,
    stroke: "yellow",
    opacity: 0.4,
    end: 0,
  };

  view.add(
    <Camera ref={c}>
      <Img height={view.height} src={screenshot} />
      {/* region 0 The strategy of Colorado ... */}
      <Ray ref={rays} {...rayProps} toX={420} position={[-400, -987]} />
      <Ray ref={rays} {...rayProps} toX={76} position={[460, -987]} />
      <Ray ref={rays} {...rayProps} toX={890} position={[-400, -934]} />
      {/* region 1 I'm in a blue super majority ... */}
      <Ray ref={rays} {...rayProps} toX={915} position={[-400, -881]} />
      <Ray ref={rays} {...rayProps} toX={390} position={[-400, -827]} />
      {/* region 2 How the fuck do we break up ... */}
      <Ray ref={rays} {...rayProps} toX={480} position={[25, -773]} />
      <Ray ref={rays} {...rayProps} toX={310} position={[-400, -720]} />
      {/* region 3 This play has made Colorado ... */}
      <Ray ref={rays} {...rayProps} toX={606} position={[-400 + 310, -720]} />
      <Ray ref={rays} {...rayProps} toX={182} position={[-400, -667]} />
      {/* region 4 No one is saying ... */}
      <Ray ref={rays} {...rayProps} toX={685} position={[-400 + 182, -667]} />
      {/* region 5 Chase by his own admission ... */}
      <Ray ref={rays} {...rayProps} toX={823} position={[-400, -614]} />
      <Ray ref={rays} {...rayProps} toX={200} position={[-400, -561]} />
      {/* region 6 I'd argue RFK could be considered ... */}
      <Ray ref={rays} {...rayProps} toX={690} position={[-200, -561]} />
      <Ray ref={rays} {...rayProps} toX={284} position={[-400, -508]} />
      {/* region 7 RFK is polling ... */}
      <Ray ref={rays} {...rayProps} toX={568} position={[-400 + 284, -508]} />
      <Ray ref={rays} {...rayProps} toX={174} position={[-400, -455]} />
      {/* region 8 Colorado doesnt care about internal ... */}
      <Ray ref={rays} {...rayProps} toX={695} position={[-400 + 174, -455]} />
      <Ray ref={rays} {...rayProps} toX={144} position={[-400, -401]} />
      {/* region 9 We care about breaking up the state ... */}
      <Ray
        ref={rays}
        {...rayProps}
        toX={898 - 144}
        position={[-400 + 144, -401]}
      />
      <Ray ref={rays} {...rayProps} toX={626} position={[-400, -347]} />
      {/* region 10 I don't want to grow voters ... */}
      <Ray ref={rays} {...rayProps} toX={20} position={[463, 670]} />
      <Ray ref={rays} {...rayProps} toX={842} position={[-400, 724]} />
      <Ray ref={rays} {...rayProps} toX={126} position={[-400, 778]} />
      {/* region 11 My KPI is gaining more votes ... */}
      <Ray ref={rays} {...rayProps} toX={725} position={[-400 + 126, 778]} />
    </Camera>,
  );
  fixCamera(view, c);

  const highlights = [
    // region 0
    [rays[0], rays[1], rays[2]],
    // region 1
    [rays[3], rays[4]],
    // region 2
    [rays[5], rays[6]],
    // region 3
    [rays[7], rays[8]],
    [rays[9]],
    // region 4
    [rays[10], rays[11]],
    // region 5
    [rays[12], rays[13]],
    // region 6
    [rays[14], rays[15]],
    // region 7
    [rays[16], rays[17]],
    // region 8
    [rays[18], rays[19]],
    // region 9
    [rays[20], rays[21], rays[22]],
    // region 9
    [rays[23]],
  ];

  function* doHighlight(n: number, duration: number) {
    const regionRays = highlights[n];
    for (const ray of regionRays) {
      ray.end(0);
    }
    const len = regionRays.length;
    const prog = createSignal(0);
    for (let i = 0; i < len; i++) {
      regionRays[i].end(() => clamp(0, 1, prog() * len - i));
    }
    yield* prog(1, duration);
  }

  yield* after("first zoom", c().position([0, -763], 1), c().zoom(3.4, 1));

  const hannahGoodman = createRef<Rect>();

  view.add(
    <Rect
      ref={hannahGoodman}
      width={1500}
      height={150}
      position={[-575, -950]}
    />,
  );

  yield* after("hannah goodman", flash(hannahGoodman, "red"));

  yield* waitUntil("The strategy of Colorado ...");
  yield* doHighlight(0, 1);

  yield* waitUntil("I'm in a blue super majority ...");
  yield* doHighlight(1, 1);

  yield* waitUntil("How the fuck do we break up ...");
  yield* doHighlight(2, 1);

  yield* waitUntil("This play has made Colorado ...");
  yield* doHighlight(3, 1);

  yield* waitUntil("No one is saying ...");
  yield* doHighlight(4, 1);

  yield* waitUntil("Chase by his own admission ...");
  yield* doHighlight(5, 1);

  yield* waitUntil("I'd argue RFK could be considered ...");
  yield* doHighlight(6, 1);

  yield* waitUntil("RFK is polling ...");
  yield* sequence(
    0.3,
    c().position(c().position().addY(500), 1),
    doHighlight(7, 1),
  );

  yield* waitUntil("Colorado doesnt care about internal ...");
  yield* doHighlight(8, 1);

  yield* waitUntil("We care about ...");
  yield* doHighlight(9, 1);

  yield* waitUntil("I don't want to grow voters ...");
  yield* sequence(
    0.3,
    c().position(c().position().addY(1020), 1),
    doHighlight(10, 1),
  );

  yield* waitUntil("My KPI is gaining more votes ...");
  yield* doHighlight(11, 1);

  yield* after("slipped the mask", c().position(c().position().addY(-1080), 1));
  yield* after(
    "we care about taking down the state",
    ...highlights
      .filter((_, i) => i !== 9)
      .flatMap((x) => x.map((y) => y.opacity(0, 1))),
  );

  yield* after(
    "these sort of people",
    c().position(0, 1),
    c().zoom(1, 1),
    ...highlights[9].map((h) => h.opacity(0, 1)),
  );

  yield* after(
    "telling that her KPI",
    ...highlights[11].map((h) => h.opacity(rayProps.opacity, 1)),
    c().position([0, 763], 1),
    c().zoom(3.4, 1),
  );

  yield* after(
    "swing state",
    c().position([0, -763], 1),
    delay(
      0.8,
      all(...highlights[3].map((h) => h.opacity(rayProps.opacity, 1))),
    ),
  );

  yield* waitUntil("end");
});
