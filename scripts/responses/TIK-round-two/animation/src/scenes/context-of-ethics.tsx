import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  easeInOutBack,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";
import binswangerImg from "../assets/binswanger.png";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();
  const cont = createRef<Rect>();
  view.add(
    <Rect
      position={[0, 358]}
      ref={cont}
      layout
      direction="column"
      gap={64}
      alignItems="center"
    >
      <Txt
        fontSize={60}
        glow
        fontFamily="Oswald"
        fill={colors.purple500}
        ref={title}
      />
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1400}>
          The context of ethics is that you are a volitional being.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Ethics goes out of context if and only if you can no longer make
          choices.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          If you can no longer make choices you can no longer count on ethics to
          guide you; \because a guide is specifically a guide to{" "}
          <Txt.i>action</Txt.i>.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          We are not outside of the context of ethics just because things are
          really scary or really dangerous---this is precisely the moment when
          ethics is particularly important.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* title().text("the context of ethics".toUpperCase(), 1);
  yield* list().next("context of ethics", null, cont().position(0, 1));
  yield* list().next("ethics out of context");
  yield* list().next("no longer make choices");
  yield* list().next("things really difficult");
  yield* list().hideAll("out", fadeout(title));

  // Namely, a misunderstanding of what "context" means as applied to ethics. The context of ethics is that you are a volitional being---i.e. a lifeform capable of making choices. Ethics goes out of context if and only if you can no longer make choices. That is the situation when you can no longer count on ethics--or even philosophy--to guide you. Because a guide is specifically a guide to action---a guide to choice. We are not outside of the context of ethics just because things are really scary or really dangerous---this is precisely the moment when ethics is particularly important. It is far less urgent that one recall his principles when selecting which flavour of ice cream he should buy or which colour he should paint his wall than when he is in a life or death scenario.

  title().parent(view);
  title().text("");
  title().opacity(1);
  title().fontSize(70);

  yield* title().text("principles as absolute".toUpperCase(), 1);

  const quote = createRef<Txt>();
  const quoteCont = createRef<Rect>();
  const binswanger = createRef<Rect>();
  const citation = createRef<Txt>();

  const quoteTxt = ((<Txt />) as Txt).replacer(
    `A principle identifies an action that is required by the facts at hand. To violate a principle is to act as if what is required were not required---a contradiction. The oft-heard excuse "Just this once" means: "It’s safe to accept just this one contradiction." But accepting a contradiction undercuts the whole structure of one's knowledge. It forces a puzzle-piece into a space it does not fit, spoiling the overall picture (and leaving no place to put the right piece).`,
  );

  view.add(
    <Rect ref={binswanger} position={[0, 1080]}>
      <Img src={binswangerImg} width={800} position={[700, 200]} />
    </Rect>,
  );
  view.add(
    <Rect
      ref={quoteCont}
      layout
      direction="column"
      alignItems="center"
      gap={92}
      position={[-300, 100]}
    >
      <Txt
        ref={quote}
        textWrap
        width={1000}
        textAlign="center"
        fill={colors.purple500}
        glow
      />
      <Txt
        ref={citation}
        fill={colors.purple900}
        fontSize={30}
        textWrap
        width={900}
        position={[-300, 400]}
        opacity={0}
      >
        Harry Binswanger, "Just One Contradiction," in idem.,{" "}
        <Txt.i>How We Know: Epistemology on an Objectivist Foundation</Txt.i>.
      </Txt>
    </Rect>,
  );

  yield* waitUntil("binswanger");
  yield* all(
    binswanger().position(0, 1, easeInOutBack),
    title().position([0, -400], 1, easeInOutBack),
  );
  yield* waitUntil("show quote");
  yield* all(quote().text(quoteTxt, 1), fadein(citation));

  // Harry Binswanger, "Just One Contradiction," in idem., /How We Know: Epistemology on an Objectivist Foundation/.

  // This is the fourth key point: what it means to say that something is a /principle/. As Binswanger states it:
  // A principle identifies an action that is required by the facts at hand. To violate a principle is to act as if what is required were not required---a contradiction. The oft-heard excuse "Just this once" means: "It’s safe to accept just this one contradiction." But accepting a contradiction undercuts the whole structure of one's knowledge. It forces a puzzle-piece into a space it does not fit, spoiling the overall picture (and leaving no place to put the right piece).[fn:70]

  yield* waitUntil("quote out");

  const llist = createRef<ArrowList>();

  view.add(
    <ArrowList ref={llist} position={[0, 80]}>
      <Txt textWrap maxWidth={1600}>
        Just as epistemic principles are what man uses for his act of validation
        and thus the identification of facts, ethical principles are what man
        uses for his identification of values.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        You cannot drop ethical principles "just this once" or "just in
        emergencies" in order to gain values---you need those very principles to
        identify values in the first place.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        Your ethical principles are the very framework, the structure, of your
        hierarchy of values.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        The instant you drop the principle, you are disintegrating the entire
        apparatus necessary to seek and maintain objective values.
      </Txt>
    </ArrowList>,
  );

  yield* all(
    delay(0.3, llist().next()),
    binswanger().position([1920, 0], 1),
    quoteCont().position([-1920 - 300, 100], 1),
  );
  yield* llist().next("cannot drop");
  yield* llist().next("framework");
  yield* llist().next("drop principle");
  yield* llist().hideAll("out again", fadeout(title));
  // Just as epistemic principles are what man uses for his act of validation and thus the identification of facts, ethical principles are what man uses for his identification of values. You cannot drop ethical principles "just this once" or "just in emergencies" in order to gain values---you need those very principles to identify values in the first place. Your ethical principles are the very framework, the structure, of your hierarchy of values. It is literally impossible to identify and integrate new values if you are not operating on principle. The instant you drop the principle, you are disintegrating the entire apparatus necessary to seek and maintain objective values.
});
