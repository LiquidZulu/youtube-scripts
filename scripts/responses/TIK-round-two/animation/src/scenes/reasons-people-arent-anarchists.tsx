import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

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
  );

  yield* waitFor(3);
  yield* reasons[0].txtRef().opacity(1, 1);
  yield* waitFor(3);
  yield* reasons[1].txtRef().opacity(1, 1);
  yield* waitFor(3);
  yield* reasons[2].txtRef().opacity(1, 1);
  yield* waitFor(3);

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
  yield* waitFor(2);

  const subtitle = [
    '"In an anarchist society, there would be no centralised government',
    'to enforce the law, so there would be total chaos."',
  ];

  const subtitleRef = createRef<Rect>();

  view.add(
    <Rect
      ref={subtitleRef}
      opacity={0}
      layout
      direction="column"
      alignItems="center"
    >
      {subtitle.map((x) => (
        <Txt fill={colors.slate50}>{x}</Txt>
      ))}
    </Rect>,
  );

  yield* subtitleRef().opacity(1, 1);
  yield* waitFor(5);

  yield* all(
    popout(reasons[0].rectRef),
    chain(waitFor(0.2), popout(subtitleRef)),
  );
});
