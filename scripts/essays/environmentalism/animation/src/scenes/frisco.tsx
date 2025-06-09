import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  easeOutSine,
  delay,
  waitUntil,
  easeInBack,
  easeInCubic,
  easeOutBack,
  easeOutCubic,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import page from "../assets/frisco-monney-speech.png";
import { after, ArrowList, Browser } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bggreen);

  const browser = createRef<Browser>();

  view.add(
    <Browser
      ref={browser}
      scale={0.9}
      hyperlink="https://capitalismmagazine.com/2002/08/franciscos-money-speech/"
    >
      <Img width={1000} position={[0, 2320]} src={page} />
    </Browser>,
  );

  browser().mkHighlight(
    { lineWidth: 22, opacity: 0.3, stroke: colors.purple500 },
    [[-330, 1100], 215],
    [[-474, 1100 + 28], 374],
    [[-474, 1100 + 28 * 2], 336],
    [[-474, 1100 + 28 * 3], 394],
    [[-474, 1100 + 28 * 4], 376],
    [[-474, 1100 + 28 * 5], 326],
    [[-474, 1100 + 28 * 6], 396],
    [[-474, 1100 + 28 * 7], 356],
    [[-474, 1100 + 28 * 8], 388],
    [[-474, 1100 + 28 * 9], 180],
  );

  yield* all(
    browser().scale(1, 1, easeOutSine),
    delay(0.2, browser().scroll(0.1, 1)),
    after("highlight", browser().highlight(1, 1)),
  );

  yield* waitUntil("package deal");

  const title = createRef<Txt>();

  view.add(
    <Txt
      fontSize={80}
      glow
      ref={title}
      fontFamily="oswald"
      fill={colors.green500}
    />,
  );

  yield* all(
    browser().scale(0.95, 1, easeOutBack),
    browser().position([0, 1080], 1, easeInCubic),
    delay(
      0.72,
      title().text(
        "the environmentalist package deal".toUpperCase(),
        1,
        easeOutCubic,
      ),
    ),
  );

  yield* title().position([0, -400], 1);

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList position={[0, 100]} ref={list}>
      <Txt maxWidth={1600} textWrap>
        The environmentalist--like all altruists--preaches that sacrifice is the
        proper moral duty of man.
      </Txt>
      <Txt maxWidth={1600} textWrap>
        They package together the fundamental questions in ethics of: (1) what
        are values? and (2) who should be the beneficiary of values?
      </Txt>
      <Txt maxWidth={1600} textWrap>
        Environmentalism says that anything is good if it is done in sacrifice
        to non-humans.
      </Txt>
      <Txt maxWidth={1600} textWrap>
        Infinite recursion: "What are values? Values are when values are
        provided to others."
      </Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* list().next("fundamental questions");
  yield* list().next("good is sacrifice to non-humans");
  yield* list().next("infinite recursion");
  yield* list().hideAll("list out", title().text("", 1));
});
