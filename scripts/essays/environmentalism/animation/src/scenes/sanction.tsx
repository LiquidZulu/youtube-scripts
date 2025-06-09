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

export default makeScene2D(function* (view) {
  view.fill(colors.bgorange);

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={64}>
      <Txt
        ref={title}
        fontSize={80}
        fontFamily="oswald"
        fill={colors.orange500}
        glow
      />
      <ArrowList ref={list}>
        <Txt fontSize={40} textWrap maxWidth={1600}>
          It is only through industrialists breaking the rules that they can:
          (1) stay alive, and (2) morally condemn the root of their sustenance.
        </Txt>
        <Txt fontSize={40} textWrap maxWidth={1600}>
          It is because this moral condemnation is accepted by the victims that
          the entire process can continue.
        </Txt>
        <Txt fontSize={40} textWrap maxWidth={1600}>
          Thus it is imperative that these ideas are not allowed to flourish via
          sanction.
        </Txt>
        <Txt fontSize={40} textWrap maxWidth={1600}>
          You must not kowtow in favour of mud.
        </Txt>
        <Txt fontSize={40} textWrap maxWidth={1600}>
          You must not accept any theoretic validity of the anti-industrial
          revolution.
        </Txt>
        <Txt fontSize={40} textWrap maxWidth={1600}>
          You must loudly and proudly declare that you hate the environment and
          love man.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* all(
    title().text("the evil of white blackmail:".toUpperCase(), 1),
    list().next("need rule breaking"),
  );

  yield* list().next("moral condemnation");
  yield* list().next("not allowed to flourish via sanction");
  yield* list().next("kowtow");
  yield* list().next("no theoretic validity");
  yield* list().next("hate environment");
  yield* waitUntil("end");

  // the anti-industrialists have no power if their anti-industrial rules are actually followed---it is only through industrialists breaking the rules that they can (1) stay alive, and (2) morally condemn the root of their sustenance. It is because this moral condemnation is accepted by the victims--because they give sanction to this monstrous state of affairs--that the entire process can continue. If Atlas shrugs the parasite loses its grip on him.

  // Thus, it is imperative that these ideas are not allowed to flourish via sanction. You must not kowtow in favour of mud. You must not accept any theoretic validity of the anti-industrial revolution, stressing only that it must be limited in practice---A is A, thus everything is limited, the mixed-road leads to doom. You must loudly and proudly declare that you hate the environment and love man, that you will purchase the products that best suit your purposes, rather than those that are the least productive. You must look upon the chart of CO_2 emitted as a measure of how great mankind is, rather than a condemnation upon his crooked selfishness. You must look upon the natural world as a beast to be conquered by the power of your mind, rather than an immutable and incomprehensible spirit that must not be meddled with. Reject apocalypse, embrace man.

  // To see how this apocalypse-worship applies to another area, you have to watch this video, where I explain that the entire anti-AI movement is based in Marxism.
});
