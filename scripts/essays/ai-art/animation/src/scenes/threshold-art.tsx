import { makeScene2D, Txt, Rect, Latex } from "@motion-canvas/2d";
import { waitFor, createSignal, createRef } from "@motion-canvas/core";
import { CodeBlock } from "@motion-canvas/2d/lib/components/CodeBlock";

import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  view.fill(0x202228);

  const time = createSignal(4);
  const text = createRef<Txt>();

  view.add(
    <Rect ref={text} layout alignItems="center" gap={50}>
      <CodeBlock fontSize={140} language="c#" code={`time(art)`} />
      <Latex height={90} tex="{\color{white} \geqslant}" marginBottom={30} />
      <Txt
        fill="#C9D1D9"
        fontFamily="mononoki"
        fontSize={140}
        text={() => `${time().toFixed(2)} hours`}
      />
    </Rect>
  );

  yield* popin(text);
  yield* waitFor(1);
  yield* time(3.5, 1.5);
  yield* time(5, 1);
  yield* popout(text);
});
