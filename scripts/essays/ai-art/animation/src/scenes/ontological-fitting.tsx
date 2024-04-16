import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { waitFor, createRef, all, chain, Reference } from "@motion-canvas/core";

import { withRef } from "../types";
import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  view.fill(0x202228);

  const over = createRef<Txt>();
  const normal = { ref: createRef<Rect>(), width: 612.1666870117188 };
  const under = {
    ref: createRef<Rect>(),
    width: 561.0166625976562,
  };

  view.add(
    <Rect gap={32} layout>
      <Txt
        ref={over}
        marginLeft={normal.width + under.width}
        fill="white"
        fontSize={70}
        fontFamily="Cubano"
        text="over-fitting"
      />
      <Rect ref={normal.ref} opacity={0} gap={32} alignItems="center">
        <Txt fill={0x909090} fontSize={30} text="vs" />
        <Txt
          fill="white"
          fontSize={70}
          fontFamily="Cubano"
          text="normal-fitting"
        />
      </Rect>
      <Rect ref={under.ref} opacity={0} gap={32} alignItems="center">
        <Txt fill={0x909090} fontSize={30} text="vs" />
        <Txt
          fill="white"
          fontSize={70}
          fontFamily="Cubano"
          text="under-fitting"
        />
      </Rect>
    </Rect>
  );

  yield* popin(over);

  yield* waitFor(10);

  yield* all(
    over().margin([0, 0, 0, under.width], 1),
    chain(waitFor(0.5), normal.ref().opacity(1, 1))
  );

  yield* waitFor(2);

  yield* all(
    over().margin(0, 1),
    chain(waitFor(0.5), under.ref().opacity(1, 1))
  );

  yield* waitFor(5);

  yield* all(
    ...([over, normal.ref, under.ref] as Reference<Txt | Rect>[]).map(
      (ref, i) => chain(waitFor(0.1 * i), popout(ref))
    )
  );
});
