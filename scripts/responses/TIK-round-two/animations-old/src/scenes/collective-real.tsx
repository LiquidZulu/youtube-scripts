import { makeScene2D, Rect, Ray, Img, Circle, Path } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useRandom,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import wavyCircle from "../assets/wavy-circle";

// The wavy circle curve is defined by:
// r=\left(\cos\left(2\theta\ +\ a\right)\right)^{2}+\sin\left(3\theta\right)+b
// a = [0,pi]
// b = 6.2
//
// It can be rendered to png at https://jpanneton.dev/gifsmos-v/
// from there the paths can be extracted.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const circleOpacity = 1;
  const pathOpacity = 1;

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

  const iterations = 10;
  const waveAmount = 1;
  const waveBounds = 15;
  const stayDir = 98;

  for (let i = 0; i < wavyCircle.length * iterations; ++i) {
    const j = i % wavyCircle.length;
    if (j == 0) i++;

    path().data(wavyCircle[i % wavyCircle.length]);

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
});
