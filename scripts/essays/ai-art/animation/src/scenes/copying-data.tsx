import { makeScene2D, Txt, TxtProps, Ray, Rect } from "@motion-canvas/2d";
import {
  createSignal,
  createRef,
  Reference,
  SimpleSignal,
  waitFor,
  chain,
  all,
} from "@motion-canvas/core";
import seedrandom from "seedrandom";

import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const rng = seedrandom("abcdefg");
  const arrayLen = 6;

  const source: Array<[number, Reference<Txt>]> = new Array(arrayLen)
    .fill(0)
    .map((x) => {
      const rand = Math.floor(rng() * 100);
      return rand < 10 ? rand + 10 : rand;
    })
    .map((x) => [x, createRef<Txt>()]);

  const target: Array<[SimpleSignal<number, void>, Reference<Txt>]> =
    source.map((x) => [createSignal(0), createRef<Txt>()]);

  const padDigits = (num: number, digits?: number) => {
    const numAsStr = `${Math.floor(num)}`;
    const n = digits ?? 2;

    if (numAsStr.length >= n) return numAsStr;

    return `${new Array(n - numAsStr.length).fill(0).join("")}${numAsStr}`;
  };

  const ray = createRef<Ray>();
  const phantomRay = createRef<Ray>();

  const braces = new Array(4).fill(null).map((x) => createSignal<Txt>());
  const commas = new Array(arrayLen * 2 - 2)
    .fill(null)
    .map((x) => createSignal<Txt>());

  const txtOpts: TxtProps = {
    fill: "white",
    fontFamily: "Mononoki",
    fontSize: 150,
  };

  console.log(padDigits(1));
  console.log(padDigits(10));
  console.log(padDigits(100));

  view.add(
    <Rect direction="column" layout>
      <Rect gap={32}>
        <Txt ref={braces[0]} {...txtOpts} text="[" />
        {source.map((x, i, a) =>
          i == a.length - 1 ? (
            <Txt ref={x[1]} {...txtOpts} text={`${x[0]}`} />
          ) : (
            <Rect>
              <Txt ref={x[1]} {...txtOpts} text={`${x[0]}`} />
              <Txt ref={commas[i]} {...txtOpts} text={","} />
            </Rect>
          )
        )}
        <Txt ref={braces[1]} {...txtOpts} text="]" />
      </Rect>
      <Ray ref={phantomRay} toY={200} lineWidth={16} />
      <Rect gap={32}>
        <Txt ref={braces[2]} {...txtOpts} text="[" />
        {target.map((x, i, a) =>
          i == a.length - 1 ? (
            <Txt
              ref={x[1]}
              {...txtOpts}
              text={createSignal(() => padDigits(x[0]()))}
            />
          ) : (
            <Rect>
              <Txt
                ref={x[1]}
                {...txtOpts}
                text={createSignal(() => padDigits(x[0]()))}
              />
              <Txt ref={commas[i + arrayLen - 1]} {...txtOpts} text={","} />
            </Rect>
          )
        )}
        <Txt ref={braces[3]} {...txtOpts} text="]" />
      </Rect>
    </Rect>
  );

  view.add(<Ray ref={ray} toY={200} lineWidth={16} stroke="white" endArrow />);

  ray().absolutePosition([
    source[0][1]().absolutePosition().x,
    phantomRay().absolutePosition().y,
  ]);
  ray().end(0);

  for (let brace of braces) {
    brace().opacity(0);
  }

  for (let comma of commas) {
    comma().opacity(0);
  }

  for (let [_, ref] of source) {
    ref().scale(0);
  }

  for (let [_, ref] of target) {
    ref().scale(0);
  }

  yield* all(
    all(...braces.map((x) => x().opacity(1, 1))),
    all(...commas.map((x, i) => chain(waitFor(0.05 * i), x().opacity(1, 1)))),
    all(...source.map(([_, x], i) => chain(waitFor(0.05 * i), popin(x)))),
    ray().end(1, 1),
    chain(
      waitFor(0.2),
      all(...target.map(([_, x], i) => chain(waitFor(0.05 * i), popin(x))))
    )
  );

  for (let i = 0; i < source.length; ++i) {
    yield* chain(
      chain(
        ray().stroke("green", 1),
        all(target[i][1]().fill("green", 1), target[i][0](source[i][0], 1))
      ),
      all(ray().stroke("white", 1), target[i][1]().fill("white", 1)),
      ray().absolutePosition(
        [
          source[i + 1 >= source.length ? i : i + 1][1]().absolutePosition().x,
          phantomRay().absolutePosition().y,
        ],
        1
      )
    );
  }

  yield* all(
    all(...braces.map((x) => x().opacity(0, 1))),
    all(...commas.map((x, i) => chain(waitFor(0.05 * i), x().opacity(0, 1)))),
    all(...source.map(([_, x], i) => chain(waitFor(0.05 * i), popout(x)))),
    ray().start(1, 1),
    chain(
      waitFor(0.2),
      all(...target.map(([_, x], i) => chain(waitFor(0.05 * i), popout(x))))
    )
  );
});
