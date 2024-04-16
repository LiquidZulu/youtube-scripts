import { makeScene2D, Rect, Txt, Ray } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createRefArray,
  waitFor,
} from "@motion-canvas/core";

import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  view.fill(0x202228);

  // Ultimately, the communication theory of art
  // is confused about the correct ordering of
  // things. Art may well be used to communicate
  // some idea, but this is not it's primary goal
  // ---the primary goal is the concretisation of
  // that idea. Concretisation must precede any
  // communication, and so must be the genetic
  // root of the activity.

  const txt = createRefArray<Txt>();
  const ray = createRef<Ray>();

  view.add(
    <Rect gap={64} alignItems="center" layout direction="column">
      <Txt scale={0} ref={txt} fontFamily="cubano" fill="white" fontSize={70}>
        Art for concretisation
      </Txt>
      <Ray
        start={1}
        ref={ray}
        toY={300}
        lineWidth={22}
        arrowSize={30}
        endArrow
        stroke="white"
      />
      <Txt scale={0} ref={txt} fontFamily="cubano" fill="white" fontSize={70}>
        Art for communication
      </Txt>
    </Rect>
  );

  yield* popin(() => txt[1].margin([0, 0, 500, 0]));
  yield* waitFor(5);

  yield* all(
    txt[1].margin(0, 1),
    ray().start(0, 1),
    chain(
      waitFor(0.5),
      popin(() => txt[0])
    )
  );

  yield* waitFor(5);

  yield* all(
    popout(() => txt[0]),
    chain(waitFor(0.1), ray().start(1, 1)),
    chain(
      waitFor(0.2),
      popout(() => txt[1])
    )
  );
});
