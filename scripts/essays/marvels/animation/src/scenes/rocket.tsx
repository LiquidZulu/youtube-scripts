import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Polynomial,
  Circle,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  easeInCubic,
  loop,
  useRandom,
  linear,
  Vector2,
  loopUntil,
  Color,
  useDuration,
  easeOutCubic,
  easeInCubic,
  loopFor,
  loopUntil,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { rocket, ex, altex, sparks } from "../assets/saturn-v";
import launchpad from "../assets/launchpad.png";
import birdis from "../assets/birds-image-sequence";

export default makeScene2D(function* (view) {
  view.fill(colors.sky200);

  const earth = createRef<Rect>();
  const bird = createRef<Img>();
  const rocketHeight = createSignal(1200);
  const rocketPos = createSignal(new Vector2(0, 200));
  const thrust = createSignal(0);
  const random = useRandom();
  const fireFg = createRef<Img>();
  const fireBg = createRef<Img>();
  const fireSparks = createRef<Img>();
  const saturn = createRef<Rect>();

  view.add(
    <Rect ref={earth}>
      <Img src={launchpad} />
      <Img
        src={birdis[0]}
        ref={bird}
        scaleX={-1}
        width={120}
        position={[800, -300]}
      />
    </Rect>,
  );
  view.add(
    <Rect ref={saturn} position={rocketPos} height={rocketHeight}>
      <Rect height={rocketHeight}>
        <Img
          src={ex[0].bg}
          ref={fireBg}
          height={rocketHeight}
          opacity={thrust}
        />
        <Img
          src={ex[0].fg}
          ref={fireFg}
          height={rocketHeight}
          opacity={thrust}
        />
        <Img
          src={sparks[0]}
          ref={fireSparks}
          height={rocketHeight}
          opacity={thrust}
        />
      </Rect>
      <Img src={rocket} height={rocketHeight} />
    </Rect>,
  );

  let index = 0;
  let reverse = false;

  function* doBird() {
    if (reverse) {
      if (index == 0) {
        reverse = false;
        index = 1;
      } else {
        index--;
      }
    } else {
      if (index == birdis.length) {
        reverse = true;
        index = birdis.length - 1;
      } else {
        index++;
      }
    }

    bird().src(birdis[index]);
    yield* bird().position(
      {
        x: bird().position().x - 5,
        y: bird().position().y,
      },
      1 / 10,
    );
  }

  let fireFrame = 0;

  function* doFire() {
    fireSparks().src(sparks[fireFrame % sparks.length]);
    fireBg().src(ex[fireFrame % ex.length].bg);
    fireFg().src(ex[fireFrame % ex.length].fg);
    if (random.nextInt(0, 5) == 0) {
      fireBg().src(altex[random.nextInt(0, altex.length)].bg);
    }
    if (random.nextInt(0, 5) == 0) {
      fireFg().src(altex[random.nextInt(0, altex.length)].fg);
    }
    yield* waitFor(1 / 60);
    fireFrame++;
  }

  yield* loopUntil("takeoff", doBird);

  yield* all(
    view.fill(colors.neutral950, 5, linear),
    thrust(1, 1),
    earth().position([0, 1080], 1, easeInCubic),
    chain(
      waitFor(1.5),
      all(rocketHeight(700, 3), rocketPos(new Vector2(0, 0), 3)),
    ),
    loopFor(1, doBird),
    chain(
      loopUntil("cut thrust", doFire),
      all(thrust(0, 1), loopFor(1, doFire)),
    ),
  );

  yield* waitUntil("qte");

  const qte = {
    bar: createRef<Rect>(),
    trigger: createRef<Rect>(),
    ray: createRef<Ray>(),
  };

  view.add(
    <Rect
      ref={qte.bar}
      layout
      stroke={colors.zinc50}
      lineWidth={2}
      position={[0, 450]}
    >
      <Rect fill={colors.zinc950} width={250} height={50} />
      <Rect ref={qte.trigger} fill={colors.red500} width={4} height={50} />
      <Rect fill={colors.zinc950} width={250} height={50} />
    </Rect>,
  );

  view.add(
    <Ray
      ref={qte.ray}
      lineWidth={0}
      stroke={colors.green500}
      toY={25}
      fromY={-25}
      position={[-250, 450]}
    />,
  );

  yield* fadein(qte.bar);
  yield* all(
    saturn().rotation(40, 1),
    qte.ray().position([0, 450], useDuration("qte trigger"), linear),
    qte.ray().lineWidth(4, 0.1, linear),
  );
  qte.trigger().fill(colors.green500);
  qte.ray().opacity(0);
  yield* all(
    thrust(1, 0.1),
    loopUntil("angle of attack", doFire),
    qte.bar().scale(1.5, 0.5, easeOutCubic),
    qte.bar().opacity(0, 0.5),
  );

  const saturnSegment = createRef<Circle>();
  const velocityRay = createRef<Ray>();
  const deg = createRef<Txt>();

  view.add(
    <Ray
      ref={velocityRay}
      endArrow
      arrowSize={10}
      zIndex={-1}
      toY={-200}
      lineWidth={4}
      stroke={colors.red400}
      rotation={saturn().rotation()}
      position={saturn().position}
    />,
  );
  view.add(
    <Circle
      zIndex={-1}
      rotation={-50}
      ref={saturnSegment}
      lineWidth={4}
      stroke={colors.zinc800}
      lineDash={[5, 2]}
      start={1}
      position={saturn().position}
      width={400}
      height={400}
    />,
  );
  view.add(
    <Txt
      fontSize={30}
      ref={deg}
      opacity={0}
      text={createSignal(
        () =>
          `${((saturnSegment().end() - saturnSegment().start()) * 360).toFixed(
            1,
          )}°`,
      )}
      fontFamily="mononoki"
      fill={colors.zinc300}
      position={[45, -250]}
    />,
  );

  yield* all(
    thrust(0, 0.1),
    saturn().rotation(-20, 2),
    saturnSegment().start(300 / 360, 2),
    chain(waitFor(0.8), all(deg().opacity(1, 1), deg().scale(0).scale(1, 1))),
  );

  yield* waitUntil("final burn");

  yield* all(
    loopUntil("fly off", doFire),
    thrust(1, 0.1),
    deg().opacity(0, 1),
    velocityRay().opacity(0, 1),
    saturnSegment().opacity(0, 1),
  );

  yield* all(
    view.fill(colors.slate950, 1),
    loopFor(1, doFire),
    saturn().position([-333, -1028], 1, easeInCubic),
  );
});
