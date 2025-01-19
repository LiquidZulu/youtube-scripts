import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, flashAround } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const mainTitle = createRef<Txt>();

  view.add(
    <Txt
      ref={mainTitle}
      fontFamily="oswald"
      fill="white"
      textWrap
      maxWidth={1000}
      fontSize={80}
      textAlign="center"
    >
      The Positive Case for the Private Production of Defense
    </Txt>,
  );

  yield* fadein(mainTitle);

  yield* waitUntil("deal with risk");

  yield* mainTitle().position([0, -1080], 1);

  // Now that the fundamental philosophical backing for statism is in ruin, I may build the positive case for the private production of defense. First, the threat of aggression against one's property is a form of risk, and there are two potential ways to deal with any risk on the market: (1) through your own privately controlled means; and (2) through the use of an insurance agency.

  const title = createRef<Txt>();
  const items = createRefArray<Rect>();
  const itemTxts = createRefArray<Rect>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} layout direction="column" gap={64} alignItems="center">
      <Txt ref={title} fontSize={60} fill={colors.zinc50}>
        How to deal with risk on the market:
      </Txt>
      <Rect direction="column">
        {[
          "through your own privately controlled means;",
          "through the use of an insurance agency.",
        ].map((x, i) => (
          <Rect opacity={0} ref={items} gap={16}>
            <Txt fill={colors.zinc500}>{`${i + 1}.`}</Txt>
            <Txt opacity={0} ref={itemTxts} fill={colors.zinc50}>
              {x}
            </Txt>
          </Rect>
        ))}
      </Rect>
    </Rect>,
  );

  yield* all(
    fadein(title),
    all(
      ...items.map((item, i) =>
        chain(waitFor((i + 1) * 0.1), item.opacity(1, 1)),
      ),
    ),
  );

  yield* waitUntil("first");
  yield* itemTxts[0].opacity(1, 1);

  yield* waitUntil("second");
  yield* itemTxts[1].opacity(1, 1);

  yield* waitUntil("indicate 2");
  yield* all(
    flashAround(() => items[1]),
    items[0].opacity(0.2, 1),
  );

  //  So, we must analyse whether defense is an insurable good. After all, I may not take out insurance against /any/ risk that I face---namely, I cannot insure myself against those risks whose outcome I have control over. On the market I could not rightly get insurance against setting my own house on fire, as I could then simply pay in the first premium, set my house alight, and immediately get compensation---such a non-discriminatory insurance firm could not profit.

  yield* waitUntil("only 2");
  yield* all(
    fadeout(title),
    items[0].opacity(0, 1),
    itemTxts[0].margin([0, -400, 0, 0], 2),
    cont().position([0, -500], 2),
  );

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt textWrap maxWidth={1250}>
        I cannot insure myself against those risks whose outcome I have control
        over.
      </Txt>
      <Txt textWrap maxWidth={1250}>
        On the market I could not rightly get insurance against setting my own
        house on fire.
      </Txt>
      <Txt textWrap maxWidth={1250}>
        Any non-discriminatory insurance firm could not profit.
      </Txt>
      <Txt textWrap maxWidth={1250}>
        ∴ a defense insurer could not insure one against any aggression that
        they themselves provoke.
      </Txt>
      <Txt textWrap maxWidth={1250}>
        Norms of peaceful, conflict-avoiding conduct would have to be
        implemented into the contracts.
      </Txt>
    </ArrowList>,
  );

  yield* list().next("can't insure agianst risks");
  yield* list().next("fire insurance");
  yield* list().next("non-discriminatory insurance");
  yield* list().next("provoked aggression");
  yield* list().next("conflict-avoiding norms");

  yield* waitUntil("out");

  yield* all(
    fadeout(() => items[1]),
    delay(0.1, list().hideAll()),
  );

  // So clearly a defense insurer could not insure one against any aggression that they themselves provoke. Norms of peaceful, conflict-avoiding conduct would have to be implemented into the contracts which would bind the insured to civilised behaviour. In defending against any risk that is non-insurable, one must utilise their own personal means, which would still be far more effective than the current heavily restricted weapons that the state allows one to possess.
});
