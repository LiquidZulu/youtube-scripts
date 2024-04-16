import {
  makeScene2D,
  Txt,
  Rect,
  Circle,
  Layout,
  LayoutProps,
  TxtProps,
  RectProps,
  Shape,
} from "@motion-canvas/2d";
import {
  waitFor,
  chain,
  all,
  loop,
  createSignal,
  createRef,
  SignalValue,
  SimpleSignal,
  Reference,
  any,
} from "@motion-canvas/core";

import { popin, popout } from "../util";
import { withRef } from "../types";

const dice = (face: SimpleSignal<number>) => (
  <Rect
    width={512}
    height={512}
    fill={0x202228}
    lineWidth={6}
    stroke={0xffffff}
    radius={30}
  >
    <Circle
      opacity={createSignal(() => getDiceOpacity([2, 3, 4, 5, 6], face()))}
      fill={0xffffff}
      size={80}
      x={-512 / 4}
      y={-512 / 4}
    />
    <Circle
      opacity={createSignal(() => getDiceOpacity([6], face()))}
      fill={0xffffff}
      size={80}
      y={-512 / 4}
    />
    <Circle
      opacity={createSignal(() => getDiceOpacity([4, 5, 6], face()))}
      fill={0xffffff}
      size={80}
      x={512 / 4}
      y={-512 / 4}
    />
    <Circle
      opacity={createSignal(() => getDiceOpacity([1, 3, 5], face()))}
      fill={0xffffff}
      size={80}
    />
    <Circle
      opacity={createSignal(() => getDiceOpacity([4, 5, 6], face()))}
      fill={0xffffff}
      size={80}
      x={-512 / 4}
      y={512 / 4}
    />
    <Circle
      opacity={createSignal(() => getDiceOpacity([6], face()))}
      fill={0xffffff}
      size={80}
      y={512 / 4}
    />
    <Circle
      opacity={createSignal(() => getDiceOpacity([2, 3, 4, 5, 6], face()))}
      fill={0xffffff}
      size={80}
      x={512 / 4}
      y={512 / 4}
    />
  </Rect>
);

const getDiceOpacity = (facesToBeOpaque: number[], currentDiceFace: number) =>
  facesToBeOpaque.includes(currentDiceFace) ? 1 : 0;

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const diceFace = createSignal(5);
  const [actual, potential] = new Array(2).fill(null).map(
    (x) =>
      ({
        dice: {
          ref: createRef<Rect>() as Reference<Rect>,
          y: 128,
          scale: 0,
        },
        txt: {
          ref: createRef<Txt>() as Reference<Txt>,
          fill: 0xffffff,
          fontFamily: "Cubano",
          scale: 0,
        },
      } as {
        dice: withRef<RectProps, Rect>;
        txt: withRef<TxtProps, Txt>;
      })
  );

  view.add(
    <>
      <Rect x={-960 / 2}>
        <Rect y={-512 / 2}>
          <Txt {...potential.txt} text={"Potential"} />
        </Rect>
        <Rect {...potential.dice}>{dice(diceFace)}</Rect>
      </Rect>
      <Rect x={960 / 2}>
        <Rect y={-512 / 2}>
          <Txt {...actual.txt} text={"Actual"} />
        </Rect>
        <Rect {...actual.dice}>{dice(createSignal(5))}</Rect>
      </Rect>
    </>
  );

  const randomDiceFace = (current?: number) => {
    const c: number = current ?? -1;

    for (let num of [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5)) {
      if (num !== c) {
        return num;
      }
    }
  };

  yield* any(
    loop(Infinity, (_: any) => diceFace(randomDiceFace(diceFace()))),
    all(
      ...[...Object.values(potential), ...Object.values(actual)].map((x, i) =>
        chain(waitFor(0.1 * i), popin(x.ref as Reference<Shape>))
      )
    )
  );

  for (let i = 0; i < 30 * 5; ++i) {
    diceFace(randomDiceFace(diceFace()));
    yield* waitFor(1 / 10);
  }

  yield* any(
    loop(Infinity, (_: any) => diceFace(randomDiceFace(diceFace()))),
    all(
      ...[...Object.values(potential), ...Object.values(actual)].map((x, i) =>
        chain(waitFor(0.1 * i), popout(x.ref as Reference<Shape>))
      )
    )
  );
});
