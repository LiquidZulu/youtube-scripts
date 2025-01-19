import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Line,
  Circle,
  Path,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useTime,
  useThread,
  linear,
  useRandom,
  Vector2,
  waitUntil,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import { fadein, fadeout, vectorSum } from "mcas/lib";
import head from "../assets/human-head";

// The Platonists would tell him that the
// mind is supernatural, he would accept
// this on its face, and by that token
// reject the faculty of consciousness.
//
// Hobbes was accordingly a total materialist
// on metaphysics---everything is matter
// in motion, just like the particles studied
// by the physicists, or the chemicals studied
// by the chemists. Thus there is no such
// thing as purpose, or goal, there are only
// what Aristotle called "efficient" causes
// ---i.e. all of existence is like a big
// swirling mess of billiard balls whose motion
// is entirely pre-determined by the laws
// of mechanics.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();

  view.add(
    <Txt fontSize={90} fill={colors.zinc50} ref={title}>
      Materialism
      <Txt opacity={0} ref={colon}>
        :
      </Txt>
    </Txt>,
  );

  yield* fadein(title);

  yield* waitUntil("matter in motion");

  yield* all(colon().opacity(1, 1), title().position([0, -400], 1));

  const particles = { rect: createRef<Rect>(), title: createRef<Txt>() };
  const orbit = createRef<Circle>();
  const proton = createRef<Circle>();
  const electron = createRef<Circle>();

  view.add(
    <Rect
      ref={particles.rect}
      layout
      direction="column"
      padding={60}
      lineWidth={8}
      stroke={colors.cyan500}
      alignItems="center"
      gap={64}
      width={400}
      height={500}
    >
      <Txt
        ref={particles.title}
        glow
        fontSize={40}
        fill={colors.cyan500}
        fontFamily="oswald"
      >
        PARTICLES:
      </Txt>
      <Rect height="100%" alignItems="center">
        <Circle
          ref={orbit}
          width={250}
          height={250}
          lineWidth={2}
          stroke={colors.zinc800}
          lineDash={[5, 2]}
          alignItems="center"
          justifyContent="center"
        >
          <Circle
            ref={proton}
            alignItems="center"
            justifyContent="center"
            width={60}
            height={60}
            fill={colors.blue500}
          >
            <Txt>+</Txt>
          </Circle>
        </Circle>
      </Rect>
    </Rect>,
  );

  const electronPos = createSignal(0);
  const v = 3;

  view.add(
    <Circle
      scale={0}
      ref={electron}
      width={10}
      height={10}
      fill={colors.orange500}
      position={() => {
        const { x, y } = orbit().getPointAtPercentage(
          electronPos() % 1,
        ).position;
        return {
          x: x + particles.rect().position().x,
          y: y + 56, // 56 is just hard-coded, I have no clue where the disparity comes from
        };
      }}
    />,
  );

  yield* all(
    particles.rect().end(0).end(1, 1),
    fadein(particles.title),
    fadein(proton),
    chain(
      waitFor(0.5),
      all(
        orbit()
          .end(0)
          .end(1, 1 / v, linear),
        electronPos(v, 1, linear),
        electron().scale(1, 0.2),
      ),
    ),
  );

  electronPos(0);

  const chemicals = {
    rect: createRef<Rect>(),
    title: createRef<Txt>(),
    eq: createRefArray<Txt>(),
    ray: createRef<Ray>(),
  };

  view.add(
    <Rect
      end={0}
      ref={chemicals.rect}
      layout
      direction="column"
      padding={60}
      lineWidth={8}
      stroke={colors.violet500}
      alignItems="center"
      justifyContent="center"
      gap={64}
      width={400}
      height={500}
    >
      <Txt
        ref={chemicals.title}
        glow
        fontSize={40}
        fill={colors.violet500}
        fontFamily="oswald"
      >
        CHEMICALS:
      </Txt>
      <Rect
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={32}
      >
        <Txt ref={chemicals.eq} fill={colors.zinc50}>
          CH
          <Txt fontSize={20}>4</Txt> + 2O<Txt fontSize={20}>2</Txt>
        </Txt>
        <Ray
          end={0}
          ref={chemicals.ray}
          toY={80}
          lineWidth={8}
          stroke={colors.zinc500}
          endArrow
          arrowSize={20}
        />
        <Txt ref={chemicals.eq} fill={colors.zinc50}>
          CO<Txt fontSize={20}>2</Txt> + 2H<Txt fontSize={20}>2</Txt>O
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(
    electronPos(v * 2, 2, linear),
    particles.rect().position([-500, 0], 1),
    chain(
      waitFor(0.5),
      all(
        chemicals.rect().end(1, 1),
        fadein(chemicals.title),
        chain(
          waitFor(0.2),
          fadein(() => chemicals.eq[0]),
        ),
        chain(waitFor(0.4), chemicals.ray().end(1, 1)),
        chain(
          waitFor(0.6),
          fadein(() => chemicals.eq[1]),
        ),
      ),
    ),
  );

  electronPos(0);

  yield* electronPos(v, 1, linear);

  electronPos(0);

  const path = createRef<Path>();
  const purpose = {
    title: createRef<Txt>(),
    rect: createRef<Rect>(),
    ray: createRef<Ray>(),
  };

  view.add(
    <Rect
      ref={purpose.rect}
      position={[500, 0]}
      layout
      direction="column"
      padding={60}
      lineWidth={8}
      stroke={colors.rose500}
      alignItems="center"
      gap={64}
      width={400}
      height={500}
    >
      <Txt
        ref={purpose.title}
        glow
        fontSize={40}
        fill={colors.rose500}
        fontFamily="oswald"
      >
        PURPOSE:
      </Txt>
      <Rect height="100%" gap={150} alignItems="center">
        <Path
          opacity={0}
          ref={path}
          data={head}
          fill={colors.zinc50}
          scaleX={-1}
          marginRight={-100}
        />
        <Ray
          end={0}
          ref={purpose.ray}
          marginLeft={-100}
          marginRight={-100}
          lineWidth={16}
          endArrow
          stroke={colors.zinc50}
          toX={150}
        />
      </Rect>
    </Rect>,
  );

  yield* all(
    electronPos(v * 2, 2, linear),
    fadein(purpose.title),
    purpose.rect().end(0).end(1, 1),
    chain(waitFor(0.5), all(path().opacity(1, 1), purpose.ray().end(1, 1))),
  );

  electronPos(0);

  yield* all(purpose.rect().opacity(0.1, 1), electronPos(v, 1, linear));

  electronPos(0);

  yield* electronPos(v * 2, 2, linear);
  electronPos(0);

  yield* all(
    fadeout(title),
    particles.rect().start(1, 1),
    fadeout(particles.title),
    orbit().start(1, 1 / v, linear),
    electronPos(v, 1, linear),
    fadeout(electron),
    fadeout(proton),
    chain(
      waitFor(0.4),
      all(
        chemicals.rect().start(1, 1),
        fadeout(chemicals.title),
        fadeout(() => chemicals.eq[0]),
        chain(waitFor(0.2), chemicals.ray().start(1, 1)),
        chain(
          waitFor(0.4),
          fadeout(() => chemicals.eq[1]),
        ),
      ),
    ),
    chain(
      waitFor(0.8),
      all(
        purpose.rect().start(1, 1),
        fadeout(purpose.title),
        path().opacity(0, 1),
        purpose.ray().start(1, 1),
      ),
    ),
  );

  const rand = useRandom(2);
  const cols = Object.entries(colors)
    .filter(([k, _]) => k.search("500") !== -1)
    .map(([_, v]) => v);

  const balls = createRefArray<Circle>();
  const velocities = new Map();
  const r = 5;

  const steps = 200;
  const currentStep = createSignal(0);

  for (let i = 0; i < 200; ++i) {
    view.add(
      <Circle
        opacity={() => Math.min((currentStep() * 3) / i, 1)}
        scale={() => Math.min((currentStep() * 3) / i, 1)}
        ref={balls}
        width={r * 2}
        height={r * 2}
        fill={cols[rand.nextInt(0, cols.length - 1)]}
        position={[
          rand.nextInt(-(1920 / 2 - 50), 1920 / 2 - 50),
          rand.nextInt(-(1080 / 2 - 50), 1080 / 2 - 50),
        ]}
      />,
    );

    velocities.set(
      balls[i],
      new Vector2(rand.nextFloat(-5, 5), rand.nextFloat(-5, 5)),
    );
  }

  const distance = (v1: Vector2, v2: Vector2) =>
    Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
  const magnitude = (v: Vector2) => Math.sqrt(v.x ** 2 + v.y ** 2);
  function sum(...nums: number[]) {
    let sum = 0;
    for (let n of nums) {
      sum += n;
    }
    return sum;
  }
  const dot = (u: Vector2, v: Vector2) => u.x * v.x + u.y * v.y;

  for (let i = 0; i < steps; ++i) {
    let toYield = [];
    // I call this blah because I have absolutely
    // no idea why it is reporting each collision
    // twice, so I just set up this counter to
    // ensure that this does not occur.
    let blah = 0;
    for (let j = 0; j < balls.length; ++j) {
      const alreadyDone = new Set();
      for (let ball of balls.filter((x) => balls[j] !== x)) {
        const d = distance(
          ball.absolutePosition(),
          balls[j].absolutePosition(),
        );
        if (d < r * 2) {
          if (!alreadyDone.has(ball) && !alreadyDone.has(balls[j])) {
            blah++;

            if (blah >= 2) {
              blah = 0;
            } else {
              const [u, v] = [velocities.get(ball), velocities.get(balls[j])];
              velocities.set(ball, v);
              velocities.set(balls[j], u);
            }
          }
          alreadyDone.add(ball);
          alreadyDone.add(balls[j]);
        }
        if (ball.absolutePosition().x < r) {
          velocities.set(ball, {
            x: Math.abs(velocities.get(ball).x),
            y: velocities.get(ball).y,
          });
        } else if (ball.absolutePosition().x > 1920 - r) {
          velocities.set(ball, {
            x: -Math.abs(velocities.get(ball).x),
            y: velocities.get(ball).y,
          });
        }

        if (ball.absolutePosition().y < r) {
          velocities.set(ball, {
            x: velocities.get(ball).x,
            y: Math.abs(velocities.get(ball).y),
          });
        } else if (ball.absolutePosition().y > 1080 - r) {
          velocities.set(ball, {
            x: velocities.get(ball).x,
            y: -Math.abs(velocities.get(ball).y),
          });
        }
      }

      toYield.push(
        all(
          currentStep(i, 1 / 10, linear),
          balls[j].position(
            vectorSum(balls[j].position(), velocities.get(balls[j])),
            1 / 10,
            linear,
          ),
        ),
      );
    }

    yield* all(...toYield);
  }
});
