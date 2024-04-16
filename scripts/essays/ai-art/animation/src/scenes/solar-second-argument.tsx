import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { waitFor, all, chain, createRef } from "@motion-canvas/core";

import { popin, popout, splitStr } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const title = createRef<Rect>();
  const boobies = new Array(2).fill(null).map((x) => createRef<Rect>());
  const general = createRef<Txt>();

  view.add(
    <Rect alignItems="center" gap={64} direction="column" layout>
      <Rect
        scale={0}
        marginTop={350}
        ref={title}
        alignItems="center"
        direction="column"
      >
        {splitStr(
          `"AI is disanalogous to human artists because it makes mistakes that a human would never make."`
        ).map((x) => (
          <Txt fill="white" fontSize={70} text={x} />
        ))}
      </Rect>
      <Rect gap={32} direction="column">
        {[
          `AI signing works with "blended signatures," and;`,
          `not understanding the correct composition of objects given the law of gravity.`,
        ].map((x, i) => (
          <Rect scale={0} ref={boobies[i]} gap={32}>
            <Txt fontSize={60} fill={0xa3a3a3} text={i + 1 + "."} />
            <Rect direction="column">
              {splitStr(x).map((y) => (
                <Txt fontSize={60} fill="white" text={y} />
              ))}
            </Rect>
          </Rect>
        ))}
      </Rect>
      <Txt
        ref={general}
        scale={0}
        marginTop={-64}
        fill={0xa3a3a3}
        text="In general: AI does not understand certain things that humans understand."
      />
    </Rect>
  );

  yield* popin(title);
  yield* waitFor(5);

  yield* all(
    title().margin([title().margin().top - boobies[0]().height(), 0, 0, 0], 1),
    chain(waitFor(0.5), popin(boobies[0]))
  );

  yield* waitFor(5);

  yield* all(title().margin(0, 1), chain(waitFor(0.5), popin(boobies[1])));

  yield* waitFor(10);

  yield* all(
    popout(title),
    chain(
      waitFor(0.5),
      all(title().height(0, 1), boobies[0]().margin([-64, 0, 0, 0], 1))
    )
  );

  yield* waitFor(5);

  yield* all(general().margin(0, 1), chain(waitFor(0.2, popin(general))));

  yield* waitFor(10);

  yield* all(
    ...boobies.map((x, i) => chain(waitFor(0.1 * i), popout(x))),
    chain(waitFor(boobies.length * 0.1), popout(general))
  );
});
