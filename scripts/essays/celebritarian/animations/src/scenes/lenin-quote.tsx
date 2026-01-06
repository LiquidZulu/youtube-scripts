import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const q = createRef<Txt>();

  view.add(
    <Txt
      ref={q}
      writeOn={0}
      fontFamily="ProggyClean CE Nerd Font"
      textWrap
      width="70%"
      fontSize={100}
      textAlign="center"
      glow
    >
      "During the Revolution we learned to 'speak french', i.e to{" "}
      <Txt fill="#505050">[...]</Txt> raise the energy of the direct struggle of
      the masses and extend its scope. Now, in this time of stagnation, reaction
      and disintegration, we must learn to 'speak German', i.e. to work slowly
      until things revive, systematically, steadily{" "}
      <Txt fill="#505050">[...]</Txt> winning inch by inch."
    </Txt>,
  );

  view.add(
    <Txt
      fontFamily="ProggyClean CE Nerd Font"
      fontSize={70}
      position={[0, 1000]}
    >
      Vladimir Lenin, <Txt.i>The Liquidation of Liquidationism</Txt.i>,{" "}
      <Txt fill={colors.sky500}>
        https://www.marxists.org/archive/lenin/works/1909/jul/11.htm
      </Txt>
    </Txt>,
  );

  yield* q().writeOn(1, 1);
  yield* waitUntil("end");
});
