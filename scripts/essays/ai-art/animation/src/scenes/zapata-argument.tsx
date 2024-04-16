import { makeScene2D, Rect, RectProps, Txt, TxtProps } from "@motion-canvas/2d";
import { waitFor, all, chain, createRef, Reference } from "@motion-canvas/core";

import { popin, popout, splitStr } from "../util";
import { withRef } from "../types";

/*
   Steven's argument here may be broken up into two parts:
   1. AI image generators don't learn to produce art because upon the completion of training they are deterministic with respect to the mapping between input and output, and;
   2. AI image generators don't learn because they are not general intelligences.
 */

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const zarguments: Array<{
    number: withRef<TxtProps, Txt>;
    text: withRef<TxtProps, Txt>[];
    rect: withRef<RectProps, Rect>;
  }> = [
    `AI image generators don't learn to produce art because upon the completion of training they are deterministic with respect to the mapping between input and output, and;`,
    `AI image generators don't learn because they are not general intelligences.`,
  ].map((argument, i) => ({
    number: {
      ref: createRef<Txt>(),
      text: `${i + 1}.`,
    },
    text: splitStr(argument).map((x) => ({
      ref: createRef<Txt>(),
      text: x,
    })),
    rect: {
      ref: createRef<Rect>(),
    },
  }));

  const txtOpts: TxtProps = {
    fill: "white",
    fontSize: 60,
  };

  view.add(
    <Rect gap={64} layout direction="column">
      {zarguments.map((argument, i) => (
        <Rect {...argument.rect} gap={32}>
          <Txt {...txtOpts} {...argument.number} />
          <Rect direction="column">
            {argument.text.map((line) => (
              <Txt {...txtOpts} {...line} />
            ))}
          </Rect>
        </Rect>
      ))}
    </Rect>
  );

  for (let argument of zarguments) {
    argument.number.ref().opacity(0);
    for (let line of argument.text) {
      line.ref().scale(0);
    }
  }

  yield* all(
    ...zarguments.map((argument, i) =>
      chain(
        waitFor(i * 7),
        all(
          argument.number.ref().opacity(1, 1),
          all(
            ...argument.text.map((line, j) =>
              chain(waitFor(j * 0.1), popin(line.ref))
            )
          )
        )
      )
    )
  );

  yield* waitFor(5);

  yield* all(
    zarguments[0].number.ref().opacity(0, 1),
    zarguments[0].rect.ref().scale(1.2, 1),
    zarguments[0].rect.ref().margin([300, 0, 0, 0], 1),
    ...zarguments
      .filter((argument) => argument.number.text != "1.")
      .map((argument, i) =>
        chain(
          waitFor(i * 0.5),
          all(
            argument.number.ref().opacity(0, 1),
            all(
              ...argument.text.map((line, j) =>
                chain(waitFor(j * 0.1), popout(line.ref))
              )
            )
          )
        )
      )
  );

  yield* waitFor(5);

  yield* all(
    ...zarguments[0].text.map((line, j) =>
      chain(waitFor(j * 0.1), popout(line.ref))
    )
  );
});
