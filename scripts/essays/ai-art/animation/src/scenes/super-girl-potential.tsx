import { makeScene2D, Ray, Rect, Img } from "@motion-canvas/2d";
import { waitFor, createRef, all, chain } from "@motion-canvas/core";

import vitruvian from "../assets/vitruvian-man.jpg";
import supergirl from "../assets/super-girl.jpg";
import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const v = createRef<Img>();
  const r = createRef<Ray>();
  const s = createRef<Img>();

  view.add(
    <Rect alignItems="center" gap={64} layout>
      <Img ref={v} scale={0} src={vitruvian} height={600} />
      <Ray ref={r} end={0} stroke="white" lineWidth={16} endArrow toX={400} />
      <Img ref={s} scale={0} src={supergirl} height={600} />
    </Rect>
  );

  yield* all(
    popin(v),
    chain(waitFor(0.1), r().end(1, 1)),
    chain(waitFor(0.2), popin(s))
  );

  yield* waitFor(10);

  yield* all(
    popout(v),
    chain(waitFor(0.1), r().start(1, 1)),
    chain(waitFor(0.2), popout(s))
  );
});
