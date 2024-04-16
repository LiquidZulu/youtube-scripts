import { makeScene2D, Txt, Img, Ray, Rect } from "@motion-canvas/2d";
import {
  createRef,
  createSignal,
  waitFor,
  all,
  chain,
} from "@motion-canvas/core";

import moneybag from "../assets/efficient-vs-inefficient/moneybag.png";
import { popin } from "../util";

import {
  PlopSpring,
  SmoothSpring,
  spring,
} from "@motion-canvas/core/lib/tweening";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();
  const A = createRef<Txt>();
  const B = createRef<Txt>();
  const ray = createRef<Ray>();
  const money = createRef<Img>();

  const dimensions = {
    AB_gap: 720,
    AB_size: 512,
    title_size: createSignal(150),
  };

  view.add(
    <Rect alignItems="center" direction="column" layout>
      <Rect>
        <Txt
          ref={title}
          fontSize={dimensions.title_size}
          fill="white"
          text="Theft"
        />
        <Txt
          ref={colon}
          fontSize={dimensions.title_size}
          fill="white"
          text=":"
        />
      </Rect>
      <Rect gap={dimensions.AB_gap} layout>
        <Txt
          ref={A}
          fontFamily="Cubano"
          fontSize={dimensions.AB_size}
          fill="white"
          text="A"
        />
        <Txt
          ref={B}
          fontFamily="Cubano"
          fontSize={dimensions.AB_size}
          fill="white"
          text="B"
        />
      </Rect>
    </Rect>
  );

  view.add(<Img ref={money} src={moneybag} x={A().right().x} />);

  A().opacity(0).scale(0);
  B().opacity(0).scale(0);
  money().opacity(0).scale(0);
  colon().opacity(0);

  title().margin([500, 0, 0, 0]);
  colon().margin([500, 0, 0, 0]);
  money().margin([500, 0, 0, 0]);

  yield* all(popin(title), title().opacity(0).opacity(1, 1));
  yield* waitFor(2);

  yield* all(
    dimensions.title_size(92, 1),
    title().margin([0, 0, 0, 0], 1),
    colon().margin([0, 0, 0, 0], 1),
    colon().opacity(1, 1),
    chain(waitFor(0.1), all(popin(A), A().opacity(1, 1))),
    chain(waitFor(0.2), all(popin(B), B().opacity(1, 1))),
    chain(waitFor(0.4), all(popin(money), money().opacity(1, 0.5)))
  );

  view.add(
    <Ray
      opacity={createSignal(() =>
        A().right().x > money().left().x
          ? 0
          : money().left().x < 0
          ? Math.abs(Math.abs(A().right().x) - Math.abs(money().left().x)) / 500
          : 1
      )}
      ref={ray}
      lineWidth={16}
      endArrow
      stroke={"#ff6470"}
      fromX={A().right().x}
      toX={createSignal(() => money().left().x - 16)}
    />
  );

  yield* waitFor(1);

  yield* spring(SmoothSpring, A().right().x, B().left().x, 4, (value) =>
    money().x(value)
  );

  yield* waitFor(5);
});
