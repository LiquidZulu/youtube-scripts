import { makeScene2D, Rect, Ray, Img, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
  easeInCubic,
  useRandom,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const random = useRandom();

  /*
       You probably do not consider yourself to be an anarchist---in fact almost everybody considers anarchism to be an ideology which is completely insane. You might have minor disagreements here and there with other people, but anarchism is surely a whole different level of wrongness.

       I am here to tell you that you have been mislead. There are a few different reasons why I think someone might reject anarchism and I will be addressing them all.

       #+begin_comment
       EN: Have this list show up on screen with motion-canvas:
       1. anarchism means total chaos;
       2. anarchism rejects human nature;
       3. anarchism is immoral.
       #+end_comment

     * Anarchism as Chaos
     ** Anarchism Defined as Chaos
       On this first point, a typical claim might go like: "in an anarchist society there would be no centralised government to enforce the law, so there would be total chaos."
     */

  const anarchismCont = createRef<Txt>();
  const crossRays = createRefArray<Ray>();

  view.add(
    <Rect layout ref={anarchismCont} paddingBottom={10}>
      <Txt fontFamily="cubano" fill="white" fontSize={150}>
        Anarchism
      </Txt>
    </Rect>,
  );

  view.add(
    <Ray
      ref={crossRays}
      end={0}
      lineWidth={12}
      stroke={colors.red500}
      from={anarchismCont().bottomLeft}
      to={anarchismCont().topRight}
    />,
  );
  view.add(
    <Ray
      ref={crossRays}
      end={0}
      lineWidth={12}
      stroke={colors.red500}
      from={anarchismCont().topLeft}
      to={anarchismCont().bottomRight}
    />,
  );

  yield* all(
    fadein(anarchismCont),
    waitUntil(
      "crossed out",
      all(...crossRays.map((ray, i) => delay(0.1 * i, ray.end(1, 1)))),
    ),
  );

  yield* waitUntil("AO");

  const ao = createRef<Circle>();
  const aoRays = createRefArray<Ray>();

  view.add(
    <Circle
      ref={ao}
      end={0}
      lineWidth={40}
      stroke="white"
      width={700}
      height={700}
    >
      <Ray
        ref={aoRays}
        end={0}
        from={[-200, 300]}
        to={[0, -350]}
        lineWidth={40}
        stroke="white"
      />
      <Ray
        ref={aoRays}
        end={0}
        to={[200, 300]}
        from={[0, -350]}
        lineWidth={40}
        stroke="white"
      />
      <Ray
        ref={aoRays}
        end={0}
        from={[-130, 50]}
        to={[130, 50]}
        lineWidth={40}
        stroke="white"
      />
    </Circle>,
  );

  yield* all(
    anarchismCont().position([0, -800], 1),
    delay(
      0.4,
      all(
        ao().end(1, 1),
        delay(
          0.4,
          all(...aoRays.map((ray, i) => delay(0.3 * i, ray.end(1, 0.5)))),
        ),
      ),
    ),
  );

  yield* waitUntil("insane");

  const questionMarks = createRefArray<Txt>();

  for (let pos of [
    [-666, -379],
    [-417, -343],
    [-793, -160],
    [-527, -44],
    [-690, 103],
    [-450, 247],
    [-862, 208],
    [-638, 355],
    [-319, 440],
    [-870, -446],
    [-819, 420],
    [-215, -459],
    [89, -487],
    [372, -438],
    [627, -359],
    [831, -456],
    [463, -150],
    [795, -225],
    [666, -93],
    [852, 10],
    [511, 121],
    [746, 224],
    [336, 337],
    [576, 368],
    [846, 443],
    [60, 469],
  ] as [number, number][]) {
    view.add(
      <Txt
        scale={0}
        ref={questionMarks}
        fontFamily="cubano"
        fill={colors.zinc400}
        position={pos}
        fontSize={random.nextInt(70, 150)}
        rotation={random.nextFloat(-50, 50)}
        text="?"
      />,
    );
  }

  yield* all(
    ...questionMarks.map((mark) =>
      delay(
        (mark.absolutePosition().x + mark.absolutePosition().y) / 3000,
        all(
          popin(() => mark),
          mark.rotation(random.nextFloat(-10, 10), 1),
        ),
      ),
    ),
  );

  yield* waitUntil("ao out");

  yield* all(
    popout(ao),
    ...questionMarks.map((mark) =>
      delay(
        (mark.absolutePosition().x + mark.absolutePosition().y) / 3000,
        popout(() => mark),
      ),
    ),
  );

  yield* waitUntil("reasons to not be anarchist");

  const title = `Why people aren't anarchists:`;
  const chars = createRefArray<Txt | Rect>();
  const reasons = [
    "anarchism means total chaos;",
    "anarchism rejects human nature;",
    "anarchism is immoral.",
  ].map((x) => ({
    txt: x,
    txtRef: createRef<Txt>(),
    numRef: createRef<Txt>(),
    rectRef: createRef<Rect>(),
  }));

  view.add(
    <Rect layout direction="column" gap={40}>
      <Rect>
        {title.split("").map((x) =>
          x == " " ? (
            <Rect scale={0} ref={chars} width={18} />
          ) : (
            <Txt
              scale={0}
              ref={chars}
              fontFamily="Cubano"
              fontSize={50}
              fill={colors.zinc50}
            >
              {x}
            </Txt>
          ),
        )}
      </Rect>
      <Rect direction="column">
        {reasons.map((x, i) => (
          <Rect ref={x.rectRef} gap={30}>
            <Txt scale={0} ref={x.numRef} fill={colors.zinc600}>{`${
              i + 1
            }.`}</Txt>
            <Txt opacity={0} ref={x.txtRef} fill={colors.zinc50}>
              {x.txt}
            </Txt>
          </Rect>
        ))}
      </Rect>
    </Rect>,
  );

  yield* all(
    ...chars.concat(reasons.map((x) => x.numRef())).map((char, i) =>
      chain(
        waitFor(i * 0.01),
        popin(() => char),
      ),
    ),
    ...reasons.map((reason, i) =>
      delay(0.1 * i, reason.txtRef().opacity(1, 1)),
    ),
  );

  yield* waitUntil("first reason");

  yield* all(
    ...chars.map((x) => x.opacity(0, 1)),
    ...reasons
      .slice(1)
      .map((x) => all(x.txtRef().opacity(0, 1), x.numRef().opacity(0, 1))),
  );

  yield* all(
    reasons[0].rectRef().scale(1.3, 1),
    reasons[0].rectRef().margin([-300, 0, 0, 0], 1),
  );

  yield* waitUntil("typical claim");

  const typicalClaim = createRef<Txt>();

  view.add(
    <Txt
      textWrap
      textAlign="center"
      width={900}
      ref={typicalClaim}
      fill="white"
    >
      "In an anarchist society there would be no centralised government to
      enforce the law, so there would be total chaos."
    </Txt>,
  );

  yield* fadein(typicalClaim);

  yield* waitUntil("end");
  yield* all(fadeout(reasons[0].rectRef), delay(0.2, fadeout(typicalClaim)));
});
