import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

/*
+ [ ] "it is wrong to /define/ the state as being coercive or aggressive because the dictionary definitions do not mention coercion, and that I myself appeal to dictionary definitions when it comes to socialism, so it would be improper for me to drop the dictionary all-together on this issue"
   1. It is wrong to /define/ the state as being coercive, because the dictionary definitions do not mention coercion;
   2. I use dictionary definitions to define socialism, so I can't discard the dictionary entirely
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const arrow = createRef<ArrowList>();

  view.add(
    <ArrowList ref={arrow}>
      <Txt>
        It is wrong to <Txt.i>define</Txt.i> the state as being coercive,
        because{"\n"}the dictionary definitions do not mention coercion.
      </Txt>
      <Txt>
        I use dictionary definitions to define socialism, so I can't{"\n"}
        discard the dictionary entirely.
      </Txt>
    </ArrowList>,
  );

  yield* arrow().next();
  yield* waitFor(2);
  yield* arrow().next();
  yield* waitFor(2);
  yield* all(
    ...arrow()
      .items.reverse()
      .map((item, i) => chain(waitFor(0.2 * i), arrow().hide(item))),
  );
});
