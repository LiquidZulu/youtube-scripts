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
import { ArrowList } from "mcas/lib";

// Recall that the state in its capacity as a monopolistic expropriator of wealth tends to provide lower quality and less efficient services; thus the free capitalists would be in a far superior fighting position per dollar spent. Any invading state would face not disarmed civilians who rely upon a central power to protect them, but the most well-armed population ever seen on planet Earth. Each individual would be capable of neutralising scores of enemy combatants at the flick of his wrist. If the biggest military ever failed to win a war against a bunch of rice farmers living under communism, how would any state stand even the slightest chance against hyper-industry incentivised to immediately deal with any threats that face it, and with the means to do so?

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list}>
      <Txt textWrap maxWidth={1300}>
        The state qua monopolistic expropriator of wealth tends to provide lower
        quality and less efficient services.
      </Txt>
      <Txt textWrap maxWidth={1300}>
        ∴ the free capitalists would be in a far superior fighting position per
        dollar spent.
      </Txt>
      <Txt textWrap maxWidth={1300}>
        Any invading state would face not disarmed civilians who rely upon a
        central power to protect them, but the most well-armed population ever
        seen on planet Earth
      </Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* list().next("free capitalists");
  yield* list().next("invading state");
  yield* waitUntil("out");
  yield* list().hideAll();
});
