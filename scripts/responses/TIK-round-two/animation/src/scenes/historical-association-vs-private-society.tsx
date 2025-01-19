import { makeScene2D, Rect, Ray, Img, Path } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  waitUntil,
  Vector2,
  Vector2Signal,
  useRandom,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import {
  distance,
  flashAround,
  getLocalPos,
  PlaceholderPerson,
  shake,
} from "mcas/lib";

// This is where the package comes from, the historical association has been that the only way for a society to become large-scale and have any "big" groups within it is for those groups to rule everyone else. So, if we have a society where each individual lives peacefully with everyone else, and operates purely on production and trade, is each person a state? I'm tempted to say they are if there can be multiple "states" in ancapistan like TIK says,[fn:7] but all of these interactions are individual, i.e. private, i.e. non-state. So then perhaps the "state" here encompasses the entire private society, but then we are back to the assumption that the only way for there to be a society is for there to be subjects who are ruled by the same central authority. This is a problem.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const random = useRandom();

  const castes = [
    [createRef<PlaceholderPerson>()],
    [...new Array(4).fill(0).map((_) => createRef<PlaceholderPerson>())],
    [...new Array(7).fill(0).map((_) => createRef<PlaceholderPerson>())],
  ];

  const gaps = [createSignal(328), createSignal(264)];

  view.add(
    <Rect layout direction="column" alignItems="center" gap={gaps[0]}>
      {...castes.map((caste) => (
        <Rect gap={gaps[1]}>
          {...caste.map((person) => (
            <PlaceholderPerson ref={person} ratio={1} radius={999} scale={0} />
          ))}
        </Rect>
      ))}
    </Rect>,
  );

  const ruleRays = createRefArray<Ray>();
  {
    let i = 0;
    for (let caste of castes.slice(0, -1)) {
      const nextCaste = castes[++i];
      for (let person of caste) {
        for (let nextPerson of nextCaste) {
          view.add(
            <Ray
              end={0}
              ref={ruleRays}
              zIndex={-1}
              lineWidth={4}
              stroke={colors.emerald900}
              from={() => getLocalPos(person().absolutePosition())}
              to={() => getLocalPos(nextPerson().absolutePosition())}
            />,
          );
        }
      }
    }
  }
  yield* all(
    ...castes.flat().map((person, i) => delay(0.05 * i, popin(person))),
    ...ruleRays.map((ray, i) => delay(0.01 * i, ray.end(1, 1))),
  );

  yield* waitUntil("indicate society");

  const societyRect = createRef<Rect>();

  view.add(
    <Rect
      ref={societyRect}
      end={0}
      width={1840}
      height={980}
      lineWidth={20}
      stroke="white"
      radius={100}
    />,
  );

  yield* all(societyRect().end(1, 1), delay(0.05, societyRect().start(1, 1)));
  societyRect().start(0).end(0);

  yield* waitUntil("rule other groups");

  yield* all(
    gaps[0](128, 1),
    gaps[1](64, 1),
    ...ruleRays.map((ray) => ray.stroke(colors.red900, 1)),
    ...castes[0].map((person) =>
      all(
        person().width(220, 1),
        person().scale(1.5, 1),
        person().fill(colors.red950, 1),
        person().headFill(colors.red600, 1),
        person().bodyFill(colors.red700, 1),
      ),
    ),
    ...castes[1].map((person) =>
      all(
        person().width(220, 1),
        person().fill(colors.orange950, 1),
        person().headFill(colors.orange600, 1),
        person().bodyFill(colors.orange700, 1),
      ),
    ),
    ...castes[2].map((person) =>
      all(
        person().width(220, 1),
        person().scale(0.75, 1),
        person().fill(colors.green950, 1),
        person().headFill(colors.green600, 1),
        person().bodyFill(colors.green700, 1),
      ),
    ),
  );

  yield* waitUntil("capitalist society");

  const capitalists = castes.map((caste) =>
    caste.map((_) => createRef<PlaceholderPerson>()),
  );

  for (let i = 0; i < capitalists.length; ++i) {
    for (let j = 0; j < capitalists[i].length; ++j) {
      view.add(
        <PlaceholderPerson
          ref={capitalists[i][j]}
          ratio={1}
          radius={999}
          position={getLocalPos(castes[i][j]().absolutePosition())}
          width={castes[i][j]().width()}
          fill={castes[i][j]().fill()}
          scale={castes[i][j]().scale()}
          headFill={castes[i][j]().headFill()}
          bodyFill={castes[i][j]().bodyFill()}
        />,
      );

      castes[i][j]().opacity(0);
    }
  }

  const capitalistPositions: Array<[number, number][]> = [
    [[0, 0]],
    [
      [-579, -336],
      [-129, -380],
      [276, -297],
      [680, -292],
    ],
    [
      [-717, -26],
      [-692, 313],
      [-375, 5],
      [-265, 367],
      [191, 308],
      [454, -17],
      [598, 209],
    ],
  ];

  yield* all(
    ...ruleRays.map((ray) => ray.opacity(0, 1)),
    ...capitalists
      .flat()
      .map((capitalist, i) =>
        delay(
          0.05,
          all(
            capitalist().position(capitalistPositions.flat()[i], 1),
            capitalist().fill("#00000000", 1),
            capitalist().scale(1, 1),
            capitalist().headFill(colors.zinc50, 1),
            capitalist().bodyFill(colors.zinc200, 1),
          ),
        ),
      ),
  );

  const caps = capitalists.flat().toSorted((_) => random.nextInt(-1, 1));
  const capitalistRays = createRefArray<Ray>();
  let madeRays: {
    from: Vector2Signal<PlaceholderPerson>;
    to: Vector2Signal<PlaceholderPerson>;
  }[] = [];

  for (let capitalist of caps) {
    for (let other of caps.filter((x) => x != capitalist)) {
      const d = distance(capitalist().position(), other().position());

      if (d < 550) {
        const potential = {
          from: capitalist().position,
          to: other().position,
        };

        if (
          madeRays.findIndex(
            ({ from, to }) =>
              distance(potential.from(), to()) == 0 &&
              distance(potential.to(), from()) == 0,
          ) == -1
        ) {
          madeRays.push(potential);
          view.add(
            <Ray
              {...potential}
              end={0.5}
              start={0.5}
              zIndex={-1}
              ref={capitalistRays}
              lineWidth={10}
              stroke={colors.green500}
            />,
          );
        }
      }
    }
  }

  yield* all(
    ...capitalistRays.map((ray, i) =>
      delay(0.01 * i, all(ray.start(0, 1), ray.end(1, 1))),
    ),
  );

  yield* waitUntil("each person state");

  yield* all(
    ...capitalists.flat().map((capitalist, i) =>
      delay(
        0.01 * i,
        all(
          flashAround(capitalist),
          shake((val) => {
            capitalist().scale(1 + val * 0.01);
          }),
        ),
      ),
    ),
  );

  yield* waitUntil("indicate interactions");

  yield* all(
    ...capitalistRays.map((ray, i) =>
      delay(
        0.01 * i,
        all(
          ray.stroke(colors.violet500, 0.5).to(colors.green500, 0.5),
          ray.lineWidth(20, 0.5).to(10, 0.5),
        ),
      ),
    ),
  );

  yield* waitUntil("state encompassing entire private society");

  yield* all(
    societyRect().end(1, 1),
    societyRect().stroke(colors.violet600, 1),
    societyRect().shadowBlur(50, 1),
    societyRect().shadowColor(colors.violet500, 1),
  );

  yield* waitUntil("subjects");

  yield* all(
    capitalists[0][0]().fill(colors.red950).width(0).width(220, 1),
    capitalists[0][0]().scale(1.5, 1),
    capitalists[0][0]().headFill(colors.red600, 1),
    capitalists[0][0]().bodyFill(colors.red700, 1),
    ...capitalistRays.map((ray) => ray.stroke(colors.red900, 1)),
  );

  yield* waitUntil("end");

  yield* all(
    chain(societyRect().start(1, 1), () => societyRect().start(0).end(0)),
    ...capitalists
      .flat()
      .map((capitalist, i) => delay(0.05 * i, popout(capitalist))),
    ...capitalistRays.map((ray) => all(ray.start(0.5, 1), ray.end(0.5, 1))),
  );
});
