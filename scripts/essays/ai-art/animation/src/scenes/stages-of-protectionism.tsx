import { makeScene2D, Ray, Rect, Txt, TxtProps } from "@motion-canvas/2d";
import {
  waitFor,
  chain,
  all,
  createRef,
  createRefArray,
} from "@motion-canvas/core";

import { flatMap } from "lodash";

import { popin, popout } from "../util";
import { withRef } from "../types";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const stages = [
    `"This is dreadful, it's not even art!"`,
    `"This will dilute the tastes of the idiot masses!"`,
    `"We must destroy this technology to protect our jobs!"`,
  ].map(
    (x) =>
      ({
        scale: 0,
        fill: "white",
        text: x,
        ref: createRef<Txt>(),
        fontFamily: "Cubano",
        fontSize: 50,
      } as withRef<TxtProps, Txt>)
  );

  const rays = createRefArray<Ray>();

  view.add(
    <Rect gap={32} alignItems="center" direction="column" layout>
      {flatMap(
        stages.map((x) => <Txt {...x} />),
        (value, index, array) =>
          array.length - 1 !== index
            ? [
                value,
                <Ray
                  end={0}
                  ref={rays}
                  toY={200}
                  stroke="white"
                  endArrow
                  lineWidth={8}
                />,
              ]
            : value
      )}
    </Rect>
  );

  yield* popin(stages[0].ref);
  yield* waitFor(5);

  yield* all(rays[0].end(1, 1), chain(waitFor(0.5), popin(stages[1].ref)));
  yield* waitFor(5);

  yield* all(rays[1].end(1, 1), chain(waitFor(0.5), popin(stages[2].ref)));
  yield* waitFor(5);

  yield* all(
    popout(stages[0].ref),
    rays[0].start(1, 1),
    chain(waitFor(0.3), all(popout(stages[1].ref), rays[1].start(1, 1))),
    chain(waitFor(0.6), popout(stages[2].ref))
  );
});
