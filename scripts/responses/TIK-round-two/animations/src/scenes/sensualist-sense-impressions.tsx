import { makeScene2D, Rect, Ray, Img, Path, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Vector2,
  easeInCubic,
  linear,
  useRandom,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import head from "../assets/human-head";
import {
  ellipseLocusFactory,
  fadein,
  fadeinup,
  fadeout,
  vectorSum,
} from "mcas/lib";

// His idea, in basic terms, is that
// external matter strikes our body
// in specific locations which then
// sets of a chain of various
// oscillations and motions towards
// the brain according to the laws of
// mechanics---and sensation is the
// way in which we experience motions
// in the brain. What it means to
// "experience" anything if there is
// no such thing as a mind, nor why
// we only experience these motions
// in the brain but not elsewhere is
// left entirely unclear, which is a
// bit of a problem.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const rand = useRandom();

  const path = createRef<Path>();
  const brain = createRef<Circle>();

  view.add(
    <Path
      ref={path}
      data={head}
      fill={colors.zinc50}
      scale={10}
      position={[0, -500]}
    />,
  );

  yield* path().opacity(0).opacity(1, 1);

  view.add(
    <Circle ref={brain} width={625} height={510} position={[530, -170]} />,
  );

  const brainLocus = ellipseLocusFactory(brain);
  const qualia = createRefArray<Circle>();

  const eye = new Vector2([350, -93]);
  const origin = new Vector2([-1920 / 2 - 50, -50]);
  const n = 100;
  const steps = 200;

  const eyeNode = createRef<Rect>();

  view.add(<Rect position={eye} ref={eyeNode} />);

  const velocities = new Map();
  const pseudoPos = new Map();
  const velRange = [-50, 50];

  let toYield = [];

  for (let i = 0; i < n; ++i) {
    view.add(
      <Circle
        ref={qualia}
        position={origin}
        fill={() =>
          brainLocus(qualia[i].absolutePosition())
            ? colors.amber500
            : colors.zinc500
        }
        width={15}
        height={15}
      />,
    );

    velocities.set(
      qualia[i],
      new Vector2(rand.nextFloat(...velRange), rand.nextFloat(...velRange)),
    );

    const [nudgeX, nudgeY] = rand.floatArray(2, -50, 50);

    pseudoPos.set(qualia[i], {
      relative: new Vector2([
        eyeNode().position().x + nudgeX,
        eyeNode().position().y + nudgeY,
      ]),
      absolute: new Vector2([
        eyeNode().absolutePosition().x + nudgeX,
        eyeNode().absolutePosition().y + nudgeY,
      ]),
    });

    const qualiaYield = [];

    qualiaYield.push(
      qualia[i].position(pseudoPos.get(qualia[i]).relative, 1, linear),
    );

    for (let j = 0; j < steps; ++j) {
      console.log(pseudoPos.get(qualia[i]).relative);
      if (
        !brainLocus(
          vectorSum(
            pseudoPos.get(qualia[i]).absolute,
            velocities.get(qualia[i]),
          ),
        )
      ) {
        const { x, y } = velocities.get(qualia[i]);
        velocities.set(
          qualia[i],
          new Vector2(-x + rand.nextFloat(-5, 5), -y + rand.nextFloat(-5, 5)),
        );
      }

      pseudoPos.set(qualia[i], {
        relative: vectorSum(
          pseudoPos.get(qualia[i]).relative,
          velocities.get(qualia[i]),
        ),
        absolute: vectorSum(
          pseudoPos.get(qualia[i]).absolute,
          velocities.get(qualia[i]),
        ),
      });

      qualiaYield.push(
        qualia[i].position(pseudoPos.get(qualia[i]).relative, 1 / 10, linear),
      );
    }

    toYield.push(chain(...[...qualiaYield, fadeout(() => qualia[i])]));
  }

  yield* all(
    ...toYield.map((x, i) =>
      chain(waitFor(0.2 * i + rand.nextFloat(-0.1, 0.1)), x),
    ),
  );

  yield* path().opacity(0, 1);
});
