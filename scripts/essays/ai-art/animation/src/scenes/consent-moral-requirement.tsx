import { makeScene2D, Txt, Rect, TxtProps } from "@motion-canvas/2d";
import { all, chain, createRef, waitFor } from "@motion-canvas/core";

import { withRef } from "../types";
import { popin, popout, splitStr } from "../util";

export default makeScene2D(function* (view) {
  view.fill(0x202228);

  const arg = {
    full: createRef<Rect>(),
    parts: [
      `is this an apt use of "consent;"`,
      "was the training data taken by and large without consent, and;",
      "is it immoral to train an AI on data acquired without consent?",
    ].map((part) =>
      splitStr(part).map(
        (atom) =>
          ({
            scale: 0,
            ref: createRef<Txt>(),
            text: atom,
            fill: "white",
          } as withRef<TxtProps, Txt>)
      )
    ),
  };

  const numFor = new Map();

  for (let part of arg.parts) {
    numFor.set(part, createRef<Txt>());
  }

  const partsRect = createRef<Rect>();

  view.add(
    <Rect gap={64} direction="column" layout>
      <Rect ref={arg.full} direction="column" alignItems="center">
        {splitStr(
          `"the only ethical way to train these models is by first obtaining consent from the creators of the training data before using it."`
        ).map((x) => (
          <Txt fill="white" text={x} />
        ))}
      </Rect>
      <Rect ref={partsRect} marginTop={-352} gap={32} direction="column">
        {arg.parts.map((part, i) => (
          <Rect gap={16}>
            <Txt
              scale={0}
              ref={numFor.get(part)}
              fill={0xb0b0b0}
              text={`${i + 1}.`}
            />
            <Rect direction="column">
              {part.map((atom) => (
                <Txt {...atom} />
              ))}
            </Rect>
          </Rect>
        ))}
      </Rect>
    </Rect>
  );

  yield* popin(arg.full);

  yield* waitFor(5);

  yield* chain(
    partsRect().margin(0, 1),
    all(
      ...arg.parts.map((part, i) =>
        all(
          chain(waitFor(i * 3), popin(numFor.get(part))),
          chain(
            waitFor(i * 3),
            all(
              ...part.map((atom, j) => chain(waitFor(0.1 * j), popin(atom.ref)))
            )
          )
        )
      )
    )
  );

  yield* waitFor(5);

  yield* all(
    ...arg.parts[0].map((atom) =>
      all(atom.ref().scale(1.5, 1), atom.ref().margin(170, 1))
    ),
    popout(numFor.get(arg.parts[0])),
    popout(arg.full),
    all(
      ...arg.parts
        .slice(1)
        .map((part, i) =>
          all(
            chain(waitFor(i * 0.1), popout(numFor.get(part))),
            chain(
              waitFor(i * 0.1),
              all(
                ...part.map((atom, j) =>
                  chain(waitFor(0.1 * j), popout(atom.ref))
                )
              )
            )
          )
        )
    )
  );

  yield* waitFor(5);

  yield* popout(arg.parts[0][0].ref, 1.5);

  yield* waitFor(1);

  for (let atom of arg.parts[0]) {
    atom.ref().margin(0);
  }

  yield* all(
    ...arg.parts[1].map((atom, i) => {
      if (i == 0) {
        atom.ref().margin([-100, 0, 0, 0]);
      }

      return popin(atom.ref, 0, 1.5);
    })
  );

  yield* waitFor(5);

  yield* all(
    ...arg.parts[1].map((atom, i) => {
      if (i == 0) {
        atom.ref().margin(0, 1);
      }

      return popout(atom.ref, 1.5);
    })
  );

  yield* waitFor(1);

  yield* all(
    ...arg.parts[2].map((atom, i) => {
      if (i == 0) {
        atom.ref().margin([-200, 0, 0, 0]);
      }

      return popin(atom.ref, 0, 1.5);
    })
  );

  yield* waitFor(5);

  yield* all(
    ...arg.parts[2].map((atom, i) => {
      if (i == 0) {
        atom.ref().margin(0, 1);
      }

      return popout(atom.ref, 1.5);
    })
  );
});
