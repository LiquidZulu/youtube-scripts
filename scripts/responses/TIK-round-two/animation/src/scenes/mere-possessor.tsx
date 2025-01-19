import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Reference,
  Vector2,
  easeInOutBack,
  waitUntil,
  useDuration,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, a } from "mcas";
import * as colors from "mcas/colors";
import angry from "../assets/norris-angry.png";
import happy from "../assets/norris-happy.png";
import stick from "../assets/stickhold-stick.png";
import held from "../assets/stickhold.png";
import { getLocalPos } from "mcas/lib";
import kinsellaImg from "../assets/kinsella.png";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const people = createRefArray<Img>();
  const property = createRef<Img>();
  const owner = createRef<Txt>();
  const ray = createRef<Ray>();
  const pos = createSignal(0);

  view.add(
    <Rect layout width={1800} justifyContent="space-between">
      {a(6).map((_: any) => (
        <Img scale={0} ref={people} src={angry} width={250} height={250} />
      ))}
    </Rect>,
  );

  view.add(
    <Img
      ref={property}
      src={held}
      width={400}
      position={createSignal(() => {
        const d =
          people[1].absolutePosition().x - people[0].absolutePosition().x;

        const { x, y } = getLocalPos(
          people[0].absolutePosition(),
          new Vector2([-90, 50]),
        );
        return { x: x + pos() * d, y: y };
      })}
    />,
  );

  view.add(
    <Rect
      direction="column"
      alignItems="center"
      gap={32}
      layout
      position={createSignal(() => {
        const d =
          people[1].absolutePosition().x - people[0].absolutePosition().x;

        const { x, y } = getLocalPos(
          people[0].absolutePosition(),
          new Vector2([0, -250]),
        );
        return { x: x + pos() * d, y: y };
      })}
    >
      <Txt
        fontWeight={900}
        ref={owner}
        fontFamily="Oswald"
        fill={colors.zinc50}
      >
        OWNER
      </Txt>
      <Ray
        ref={ray}
        lineWidth={32}
        endArrow
        arrowSize={42}
        stroke={colors.zinc50}
        toY={100}
      />
    </Rect>,
  );

  people[0].src(happy);

  yield* all(
    ...people.map((person, i) =>
      chain(
        waitFor(0.05 * i),
        popin(() => person),
      ),
    ),
    popin(property),
    fadein(owner),
    ray().end(0).end(1, 1),
  );

  const duration = useDuration("people");

  for (let i = 1; i < people.length; ++i) {
    property().src(stick);
    people[i - 1].src(angry);
    yield* pos(i, 1);
    property().src(held);
    people[i].src(happy);
    yield* waitFor(duration / 11.421889418214283);
  }

  yield* all(
    ...people.map((person, i) =>
      chain(
        waitFor(0.05 * i),
        popout(() => person),
      ),
    ),
    chain(
      waitFor(0.05 * 6),
      all(popout(property), fadeout(owner), ray().start(1, 1)),
    ),
  );

  const kinsella = createRef<Rect>();
  const title = createRef<Txt>();

  view.add(
    <Rect ref={kinsella}>
      <Img width={1920 * 0.8} position={[-200, 120]} src={kinsellaImg} />
    </Rect>,
  );
  view.add(
    <Txt
      ref={title}
      position={[0, -430]}
      fontSize={90}
      fill={colors.purple500}
      glow
      fontFamily="oswald"
    />,
  );

  yield* kinsella().position([0, 1080]).position(0, 1, easeInOutBack);
  yield* waitUntil("mere possessor");
  yield* title().text("a mere-possessor ethic".toUpperCase(), 1);

  yield* waitUntil("out");
  yield* all(fadeout(title), kinsella().position([-1920, 0], 1));
});
