import { makeScene2D, Rect, Ray, Img, Path, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  useRandom,
  spawn,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, flashAround, shake } from "mcas/lib";
import wavyCircle from "../assets/wavy-circle";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  // Now that it has been established that force and value are incompatible, we can move into the territory of the Randian politics proper. So, the case is something like the following: if man is to live he requires a code of values to guide his actions---living in a society is such a value to man if it is the right /kind/ of society.[fn:38] Politics is the branch of philosophy that seeks to define the principles that must undergird a society if it is to be a value to man---that is, the principles of a moral society.

  const title = createRef<Txt>();

  view.add(<Txt fontSize={60} ref={title} fill="white" />);

  yield* title().text("Force and value are incompatible.", 1);
  yield* waitUntil("randian politics");
  yield* all(
    title().text("Randian politics:", 1),
    title().position([0, -300], 1),
  );

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt textWrap maxWidth={1400}>
        If a man is to live he requires a code of values to guide his actions.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        Living in a society is such a value to man if it is the right{" "}
        <Txt.i>kind</Txt.i> of society.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        Politics is the branch of philosophy that seeks to define the principles
        that must undergird a society if it is to be a value to man---that is,
        the principles of a moral society.
      </Txt>
    </ArrowList>,
  );

  yield* list().next("code of values");
  yield* list().next("society value");
  yield* list().next("politics");

  yield* waitUntil("collective real");
  yield* all(fadeout(title), list().hideAll());

  // First it must be noted that the individual is the unit of reality and the standard of value. That is, society is a derivative concept that has no existence unto itself---a group is a group /of individuals/, rather than the other way around. This means that any politics that proceeds in its analysis by concerning itself with "the good of the many" or any other such similar notion must be completely discarded on its face.

  const circleOpacity = createSignal(0);
  const pathOpacity = createSignal(0);

  const random = useRandom(319813);
  const path = createRef<Path>();

  view.add(
    <Rect layout direction="column" position={[-800, 450]}>
      <Txt opacity={pathOpacity} fontFamily="cubano" fill={colors.emerald500}>
        collective
      </Txt>
      <Txt opacity={circleOpacity} fontFamily="cubano" fill={colors.amber500}>
        individual
      </Txt>
    </Rect>,
  );

  view.add(
    <Path
      opacity={pathOpacity}
      ref={path}
      position={[-950, -840]}
      scale={2}
      scaleX={2.5}
      data={wavyCircle[0]}
      stroke={colors.emerald500}
      lineWidth={8}
    />,
  );

  const bounds = { x: [-250, 270], y: [-350, 250] };
  const circles = createRefArray<Circle>();

  for (let i = 0; i < 20; ++i) {
    view.add(
      <Circle
        opacity={circleOpacity}
        ref={circles}
        position={[
          random.nextFloat(...bounds.x),
          random.nextFloat(...bounds.y),
        ]}
        width={30}
        height={30}
        fill={colors.amber500}
      />,
    );
  }

  circles[7].position([circles[7].position().x + 100, circles[7].position().y]);

  const initialPositions = circles.map((circle) => circle.position());
  const currentDir = new Array(circles.length)
    .fill([0, 0])
    .map((_) => [0, 0].map((__) => (random.nextInt(-1, 1) + 0.5) * 2));

  const waveAmount = 1;
  const waveBounds = 15;
  const stayDir = 98;

  let currentCircle = 0;

  function* waveCircle() {
    const j = currentCircle % wavyCircle.length;
    if (j == 0) currentCircle++;

    path().data(wavyCircle[currentCircle++ % wavyCircle.length]);
    yield* waitFor(1 / 60);
  }

  function* moveDots() {
    for (let k = 0; k < circles.length; ++k) {
      let dir = [0, 0].map((_) => (random.nextInt(-1, 1) + 0.5) * 2);
      const amount = [0, 0].map((_) => random.nextFloat(0, waveAmount));

      if (random.nextInt(0, 100) < stayDir) {
        dir = currentDir[k];
      }

      if (
        Math.abs(circles[k].position().x) + Math.abs(amount[0]) >
        Math.abs(initialPositions[k].x) + waveBounds
      ) {
        dir[0] *= -1;
      }

      if (
        Math.abs(circles[k].position().y) + Math.abs(amount[1]) >
        Math.abs(initialPositions[k].y) + waveBounds
      ) {
        dir[1] *= -1;
      }

      currentDir[k] = dir;

      circles[k].position([
        circles[k].position().x + amount[0] * dir[0],
        circles[k].position().y + amount[1] * dir[1],
      ]);
    }

    yield* waitFor(1 / 60);
  }

  let doAnimation = true;

  yield spawn(function* () {
    while (doAnimation) {
      yield* all(waveCircle(), moveDots());
    }
  });

  yield* all(circleOpacity(1, 1), pathOpacity(1, 1));

  yield* waitUntil("individual");

  yield* all(circleOpacity(1, 1), pathOpacity(0.2, 1));

  yield* waitUntil("both opaque");

  const indicate = createRef<Rect>();

  view.add(<Rect ref={indicate} width="70%" height="95%" position={[50, 0]} />);

  yield* all(
    pathOpacity(1, 1),
    chain(
      waitUntil("indicate society"),
      flashAround(indicate, null, null, null, {
        lineWidth: 20,
        radius: 100,
        stroke: "white",
      }),
    ),
  );

  indicate().remove();

  yield* waitUntil("indicate individuals");

  yield* all(
    ...circles.map((circle, i) =>
      delay(
        0.01 * i,
        shake((value) => {
          circle.scale(1 + value / 100);
        }, 2),
      ),
    ),
  );

  yield* waitUntil("end");

  yield* all(circleOpacity(0, 1), pathOpacity(0, 1));

  doAnimation = false;

  title().text("");
  title().opacity(1);
  title().scale(1);
  title().position([0, -350]);

  yield* title().text("Inalienable, individual rights:", 1);

  const llist = createRef<ArrowList>();

  view.add(
    <ArrowList ref={llist} position={[0, 100]}>
      <Txt textWrap maxWidth={1400}>
        The individual is the basic political unit, and so the theory of rights
        must be a theory of <Txt.i>individual</Txt.i> rights if it is to be
        considered rational.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        The alternative to inalienable rights is not a right, but a
        permission---if my rights are subject to the arbitrary decrees of some
        king, or duke, or other such figure, then I must receive{" "}
        <Txt.i>permission</Txt.i> from him to engage in some activity.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        A right can only mean a principle that defends the individual from
        others---this is accordingly a theory of <Txt.i>negative</Txt.i>, not{" "}
        <Txt.i>positive</Txt.i> rights.
      </Txt>
    </ArrowList>,
  );

  // The most basic principle in politics is inalienable, individual rights. Our preceding analysis makes clear why it is that rights must be individual: the individual is the basic political unit and so the theory of rights must be a theory of /individual/ rights if it is to be considered rational. The rights must be inalienable because the alternative is not a right, but a permission---if my rights are subject to the arbitrary decrees of some king, or duke, or other such figure, then I must receive /permission/ from him to engage in some activity. This is the key insight here: a right can only mean a principle that defends the individual from others---this is accordingly a theory of /negative/, not /positive/ rights.

  yield* llist().next("individual ");
  yield* llist().next("inalienable");
  yield* llist().next("rights meaning");

  // A so-called positive right would be something like my having a right to healthcare. Such a theory of rights is faced with an immediate contradiction: if I have a right to receive the services of doctors no matter what they want to do, then those doctors must no longer have the right to live their own life. Force must be used against the doctors to make them comply, but as explained above this means nullifying the doctors' basic means of survival: their minds. That is, if I demand this treatment and should get it, then they no longer have the right to live; if I demand it and should not get it, then I no longer have the right to their labour---the two are mutually-exclusive.

  yield* waitUntil("positive rights");

  yield* all(fadeout(title), llist().hideAll());

  // Accordingly, Rand defined a right as "a moral principle defining and sanctioning a man's freedom of action in a social context."[fn:39] A right is a /moral/ principle because it stands as the precondition for a society to be a value to man; it defines and sanctions mans "freedom of action" because it is and must be negative; it does so in a social context because there is no society to protect man from without said context.
});
