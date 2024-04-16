import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, chain, createRef, waitFor } from "@motion-canvas/core";

import { popin, popout, splitStr } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const sarguments = [
    "AI is disanalogous to human artists because it references vastly more original works, and;",
    "AI is disanalogous to human artists because it makes mistakes that a human would never make.",
  ];

  const refs = [createRef<Rect>(), createRef<Rect>()];

  view.add(
    <Rect gap={64} direction="column" layout>
      {sarguments.map((arg, i) => (
        <Rect scale={0} ref={refs[i]} gap={32}>
          <Txt fontSize={64} fill={0xa3a3a3} text={`${i + 1}.`} />
          <Rect direction="column">
            {splitStr(arg).map((x) => (
              <Txt fontSize={64} fill="white" text={x} />
            ))}
          </Rect>
        </Rect>
      ))}
    </Rect>
  );

  yield* all(...refs.map((ref, i) => chain(waitFor(i * 0.1), popin(ref))));
  yield* waitFor(10);

  yield* all(
    popout(refs[1]),
    refs[0]().scale(1.2, 1),
    refs[0]().margin([200, 0, 0, 0], 1)
  );

  yield* waitFor(5);

  yield* chain(refs[0]().scale(1, 0.6), popout(refs[0]));
});
