import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Video,
  Shape,
  Camera,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  sequence,
  spawn,
  useDuration,
  linear,
  delay,
  spring,
  SmoothSpring,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, flashAround, getLocalPos, SquigglyBorder } from "mcas/lib";
import spearfishing from "yt/b-roll/castaway-spearfishing.mp4";
import fireVid from "yt/b-roll/castaway fire.mp4";

import forestImg from "../assets/crusoe/forest.png";
import forestTreeImg from "../assets/crusoe/forest-tree.png";
import stickImg from "../assets/crusoe/stick.png";
import crusoeImg from "../assets/crusoe/crusoe.png";
import spearImg from "../assets/crusoe/spear.png";
import beachImg from "../assets/crusoe/beach.png";
import fridayImg from "../assets/crusoe/friday.png";
import fireImg from "../assets/crusoe/bonfire.png";

/*
   + [ ] the three answers to law:
   1. the law of the jungle---initiate conflicts at your whim;
   2. mixed law---sometimes initiate conflicts, and;
   3. the non-aggression principle---don't initiate conflicts.
   + "first let's consider the law of the jungle---what would a universal acceptance of conflict-engendering norms look like?"
 */

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const randsError = createRef<Txt>();
  const list = createRef<ArrowList>();
  const errorCont = createRef<Rect>();
  view.add(
    <Rect
      layout
      direction="column"
      alignItems="center"
      ref={errorCont}
      position={[0, 122]}
      gap={64}
    >
      <Txt
        glow
        fill={colors.purple500}
        fontFamily="oswald"
        textAlign="center"
        textWrap
        width={1600}
        fontSize={60}
        ref={randsError}
      />
      <ArrowList ref={list}>
        <Txt>What is the right question?</Txt>
        <Txt textWrap maxWidth={1000}>
          What is the problem that men face that requires an answer from
          philosophy?
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* randsError().text(
    `rand's error is in answering the wrong question`.toUpperCase(),
    1,
  );

  yield* list().next(
    "right question",
    null,
    errorCont().position([0, 122 / 2], 1),
  );

  yield* list().next(
    "problem requiring answer",
    null,
    errorCont().position(0, 1),
  );

  yield* waitUntil("out");
  yield* sequence(0.1, fadeout(randsError), list().hideAll());

  const stickScarce = createRef<Rect>();

  view.add(
    <Rect
      shadowBlur={50}
      shadowColor={colors.purple500}
      ref={stickScarce}
      layout
      alignItems="center"
      position={[0, -400]}
    >
      <Img src={stickImg} width={200} rotation={-30} />
      <Txt fontSize={70} fontFamily="Cubano" fill={colors.purple100}>
        {" "}
        = scarce
      </Txt>
    </Rect>,
  );

  const vids = createRefArray<Video>();
  const rays = createRefArray<Ray>();
  const conflictProgress = createSignal(0);
  const [hi, lo] = [1, 1 / 10];
  const f = 3;
  const A = (hi - lo) / 2;
  const B = (hi + lo) / 2;
  const opacity = (offset: number) =>
    createSignal(
      () =>
        A * Math.sin(conflictProgress() * 2 * Math.PI * f - offset * Math.PI) +
        B,
    );

  view.add(
    <Rect layout direction="column" gap={64} alignItems="center">
      <Rect gap={200}>
        <Ray
          end={0}
          opacity={opacity(0)}
          ref={rays}
          lineWidth={18}
          endArrow
          toY={300}
          toX={-200}
          stroke={colors.purple500}
          shadowBlur={20}
          shadowColor={colors.purple500}
        />
        <Ray
          end={0}
          opacity={opacity(1)}
          ref={rays}
          lineWidth={18}
          endArrow
          toY={300}
          toX={200}
          stroke={colors.purple500}
          shadowBlur={20}
          shadowColor={colors.purple500}
        />
      </Rect>
      <Rect gap={200}>
        <Video
          scale={0}
          opacity={opacity(0)}
          play
          loop
          width={400}
          ref={vids}
          src={spearfishing}
        />
        <Video
          scale={0}
          opacity={opacity(1)}
          play
          loop
          width={400}
          ref={vids}
          src={fireVid}
        />
      </Rect>
    </Rect>,
  );

  const squigs = createRefArray<SquigglyBorder>();

  for (let vid of vids) {
    view.add(
      <SquigglyBorder
        ref={squigs}
        stroke={colors.purple500}
        shadowBlur={20}
        shadowColor={colors.purple500}
        opacity={vid.opacity}
        position={() => getLocalPos(vid.absolutePosition())}
        scale={vid.scale}
      >
        <Shape size={vid.size} />
      </SquigglyBorder>,
    );
  }

  let wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* all(...squigs.map((squig) => squig.wiggle()));
    }
  });

  yield* all(
    popin(stickScarce),
    delay(0.3, sequence(0.2, ...vids.map((vid) => popin(() => vid)))),
    sequence(0.2, ...rays.map((ray) => ray.end(1, 1))),
    conflictProgress(1, useDuration("keep going"), linear),
    chain(
      waitUntil("stick out"),
      all(
        popout(stickScarce),
        delay(0.3, sequence(0.2, ...vids.map((vid) => popout(() => vid)))),
        sequence(0.2, ...rays.map((ray) => ray.start(1, 1))),
      ),
    ),
  );

  wiggle = false;

  // We have seen that the error made by Rand and others on this front was in answering the wrong question, so what is the right question? What is the problem that men face that requires an answer from philosophy? The problem is that we live in a world of scarce means, and as such men can come into conflict with each other---so how should you deal with conflicts? This is the question that law poses.

  const bg = createRef<Rect>();
  const crusoe = createRef<Img>();
  const stick = createRef<Img>();

  view.add(
    <Rect ref={bg}>
      <Img width={1920} src={forestImg} />
      <Img
        ref={stick}
        src={stickImg}
        rotation={80}
        width={400}
        position={[300, 133]}
      />
      <Img width={1920} src={forestTreeImg} />
    </Rect>,
  );

  const spear = createRef<Img>();

  view.add(
    <Rect position={[-1920 / 2 - 300, 100]} ref={crusoe}>
      <Img src={crusoeImg} width={500} />
      <Img
        opacity={0}
        ref={spear}
        src={spearImg}
        rotation={60}
        height={500}
        position={[150, -80]}
      />
    </Rect>,
  );

  yield* all(
    bg().opacity(0).opacity(1, 1),
    crusoe().position([-200, 100], useDuration("crusoe walks in")),
  );

  yield* waitUntil("makes spear");

  yield* chain(
    all(crusoe().rotation(20, 0.4), crusoe().position([0, 100], 0.4)),
    all(
      crusoe().rotation(0, 0.4),
      stick().opacity(0, 0.4),
      spear().opacity(1, 0.4),
    ),
  );

  yield* waitUntil("goes to ocean");

  const beach = createRef<Img>();
  const fire = createRef<Img>();
  const friday = createRef<Img>();
  const camera = createRef<Camera>();
  const crusoePseud = createRef<Rect>();

  view.add(
    <Camera ref={camera} position={[0, 0]} zoom={0.001}>
      <Rect width={1920} height={1080} clip>
        <Img opacity={1} ref={beach} src={beachImg} height={1080} />
        <Img
          opacity={1}
          ref={fire}
          src={fireImg}
          width={200}
          position={[92, 100]}
        />
        <Img
          opacity={1}
          ref={friday}
          src={fridayImg}
          width={200}
          position={[-100, -50]}
        />
        <Rect position={[500, 100]} ref={crusoePseud} opacity={0}>
          <Img src={crusoeImg} width={500} />
          <Img
            ref={spear}
            src={spearImg}
            rotation={60}
            height={500}
            position={[150, -80]}
          />
        </Rect>
      </Rect>
    </Camera>,
  );

  yield* all(
    crusoe().position([1920 / 2 + 300, 100], 1),
    spring(SmoothSpring, 0.001, 1, 0.01, (value) => {
      camera().zoom(value);
    }),
  );

  crusoe().position([-1920 / 2 - 300, 100]);
  crusoe().zIndex(1);

  yield* crusoe().position([500, 100], 1);

  yield* waitUntil("friday zoom");

  crusoe().remove();
  crusoePseud().opacity(1);

  yield* all(camera().centerOn(friday().position(), 1), camera().zoom(2, 1));

  yield* waitUntil("friday run");

  yield* all(
    camera().centerOn([0, 0], 1),
    camera().zoom(1, 1),
    friday().width(400, 1),
    friday().position([30, 100], 1),
  );

  // perhaps Robinson Crusoe is on a desert island and comes across a stick in nature. He takes this stick and wishes to use it for spearfishing. As he is on his way to the ocean, another man, Friday, sees this same stick and decides to use it to stoke his fire. The two men cannot both perform these actions at the same time--they are mutually exclusive--such that if Friday went ahead with his course of action, there would be a conflict and one man would have to be deprived of the attainment of his end.

  yield* waitUntil("no snuck premises");
  bg().opacity(0);

  const crusoeList = createRef<ArrowList>();
  const unchecked = createRef<Txt>();
  const checkCont = createRef<Rect>();

  view.add(
    <Rect
      position={[0, 250]}
      layout
      direction="column"
      gap={40}
      alignItems="center"
      ref={checkCont}
    >
      <Txt
        ref={unchecked}
        fontSize={60}
        fill={colors.purple500}
        glow
        fontFamily="oswald"
      />
      <ArrowList vgap={24} ref={crusoeList}>
        <Txt textWrap maxWidth={1200}>
          It is true that means are scarce \therefore conflicts are possible.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          It is true that this is a problem that ethics can answer.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          Ethics answers it on the <Txt.i>individual</Txt.i> level: should you
          initiate conflicts, or not?
        </Txt>
      </ArrowList>
    </Rect>,
  );
  yield* all(
    camera().zoom(0.4, 1),
    camera().position([0, 600], 1),
    delay(0.3, unchecked().text("NO UNCHECKED PREMISES:", 1)),
  );

  yield* crusoeList().next("means scarce");
  yield* crusoeList().next("ethics can answer");
  yield* crusoeList().next("individual level");

  // Notice that nowhere in the formulation of this problem have any additional unchecked premises been introduced. It is true that means are scarce and therefore conflicts are possible. And it is true that this is a problem that ethics can answer---namely, it answers it on the individual level. Should you initiate conflicts, or not?

  yield* waitUntil("answers");

  const title = createRef<Txt>();
  const ansN = createRefArray<Txt>();
  const ansT = createRefArray<Txt>();
  const ansR = createRefArray<Rect>();

  view.add(
    <Rect layout direction="column" gap={32} alignItems="center">
      <Txt
        glow
        ref={title}
        fontSize={60}
        fill={colors.purple500}
        fontFamily="oswald"
      />
      <Rect direction="column">
        {[
          "the law of the jungle—initiate conflicts at your whim;",
          "mixed law—sometimes initiate conflicts, and;",
          "the non-aggression principle—don't initiate conflicts.",
        ].map((x, i) => (
          <Rect ref={ansR} gap={16}>
            <Txt ref={ansN} opacity={0} fill={colors.zinc500}>{`${
              i + 1
            }.`}</Txt>
            <Txt ref={ansT} opacity={0} fill={colors.zinc50}>
              {x}
            </Txt>
          </Rect>
        ))}
      </Rect>
    </Rect>,
  );

  yield* all(
    camera().position([0, 1900], 1),
    checkCont().position([0, 750], 1),
    delay(
      0.2,
      title().text("Three answers to the question of law:".toUpperCase(), 1),
    ),
    ...ansN.map((num, i) =>
      chain(
        waitFor((i + 1) * 0.2),
        fadein(() => num),
      ),
    ),
  );

  let currentAns = 0;
  function* showAns(eventName: string) {
    yield* waitUntil(eventName);
    yield* ansT[currentAns++].opacity(1, 1);
  }

  yield* showAns("law of jungle");
  yield* showAns("mixed law");
  yield* showAns("nap");
  yield* waitUntil("end");

  yield* all(
    fadeout(title),
    ...ansR.map((ans, i) =>
      chain(
        waitFor((i + 1) * 0.2),
        fadeout(() => ans),
      ),
    ),
  );
});
