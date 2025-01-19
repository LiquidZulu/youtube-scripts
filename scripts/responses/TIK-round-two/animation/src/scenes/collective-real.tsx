import { makeScene2D, Rect, Ray, Img, Circle, Path } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useRandom,
  waitUntil,
  spawn,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import wavyCircle from "../assets/wavy-circle";
import { Browser, fadeout } from "mcas/lib";

import groupOwnershipWebpage from "../assets/group-ownership-webpage.png";
import { yellow500 } from "mcas/colors";

// The wavy circle curve is defined by:
// r=\left(\cos\left(2\theta\ +\ a\right)\right)^{2}+\sin\left(3\theta\right)+b
// a = [0,pi]
// b = 6.2
//
// It can be rendered to png at https://jpanneton.dev/gifsmos-v/
// from there the paths can be extracted.

// Group ownership is not possible, it is a contradiction in terms.[fn:9] The idea of group ownership comes about out of pure Platonism---the idea is that the collective is the really real thing, and that the individual is merely a subsidiary, or cell of the collective body. /That/ is the proper division between public or private---not whether things should be big or small, but whether the political unit and standard of value is the one or the many, the individual or the group, Howard Roark or Henry Cameron's Egregore.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const browser = createRef<Browser>();

  view.add(
    <Browser
      ref={browser}
      hyperlink="https://liquidzulu.github.io/homesteading-and-property-rights/"
    >
      <Img width={1000} src={groupOwnershipWebpage} />
    </Browser>,
  );

  yield* all(popin(browser), browser().scroll(1, 1));

  const rays = createRefArray<Ray>();
  const highlightProgress = createSignal(0);

  const mkRay = (to: number, y: number) =>
    view.add(
      <Ray
        ref={rays}
        lineWidth={18}
        stroke={yellow500}
        fromX={-470}
        toX={to}
        opacity={0.5}
        position={[0, y]}
      />,
    );

  mkRay(472, -130);
  mkRay(472, -112);
  mkRay(472, -94);
  mkRay(-131, -76);

  for (let i = 0; i < rays.length; ++i) {
    rays[i].end(createSignal(() => highlightProgress() * rays.length - i));
  }

  yield* highlightProgress(1, 1);

  yield* waitUntil("browser gone");

  yield* chain(
    all(...rays.map((ray) => ray.opacity(0, 1))),
    browser().position([0, -1200], 1),
  );

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

  yield* waitUntil("collective real");

  yield* circleOpacity(0.2, 1);

  yield* waitUntil("individual");

  yield* all(circleOpacity(1, 1), pathOpacity(0.2, 1));

  yield* waitUntil("both opaque");

  yield* pathOpacity(1, 1);

  yield* waitUntil("end");

  yield* all(circleOpacity(0, 1), pathOpacity(0, 1));

  doAnimation = false;
});
