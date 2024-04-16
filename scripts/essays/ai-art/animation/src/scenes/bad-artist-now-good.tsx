import { makeScene2D, Img, Txt, Rect } from "@motion-canvas/2d";
import { all, chain, createRefArray, waitFor } from "@motion-canvas/core";

import baby from "../assets/baby-paintbrush.jpg";
import man from "../assets/rembrandt.jpg";

import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const items = createRefArray();

  view.add(
    <Rect alignItems="center" gap={64} layout>
      <Img scale={0} ref={items} height={600} src={man} />
      <Txt opacity={0} ref={items} fill="white" fontSize={150} text="<" />
      <Img scale={0} ref={items} height={600} src={baby} marginRight={709} />
    </Rect>
  );

  yield* popin(() => items[2] as any);
  yield* waitFor(5);

  yield* all(
    ...[
      (items[2] as any).margin(0, 1),
      (items[1] as any).opacity(1, 1),
      popin(() => items[0] as any),
    ].map((x, i) => chain(waitFor(0.1 * i), x))
  );

  yield* waitFor(3);

  yield* all(
    ...[
      popout(() => items[0] as any),
      (items[1] as any).opacity(0, 1),
      popout(() => items[2] as any),
    ].map((x, i) => chain(waitFor(0.1 * i), x))
  );
});
