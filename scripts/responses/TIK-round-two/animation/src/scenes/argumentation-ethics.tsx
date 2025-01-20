import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  easeInOutBack,
  waitUntil,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import hoppeImg from "../assets/hans-hoppe.png";
import { ArrowList } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const hoppe = createRef<Rect>();
  const title = createRef<Txt>();

  view.add(
    <Rect ref={hoppe} position={[0, 1080]}>
      <Img position={[600, 120]} width={1200} src={hoppeImg} />
    </Rect>,
  );

  view.add(
    <Txt
      position={[-300, 0]}
      textAlign="center"
      fontFamily="oswald"
      fontSize={90}
      textWrap
      width={600}
      glow
      fill={colors.purple500}
      ref={title}
    />,
  );

  yield* hoppe().position(0, 0.6, easeInOutBack);
  yield* waitUntil("argument from argument");
  yield* title().text("the argument from argument".toUpperCase(), 1);

  // On top of this, there exists a built-in self-destruct for any mixed law ethic, in the form of Hans-Hermann Hoppe's argument from argument.[fn:66]

  yield* all(
    hoppe().position([0, 1920], 1),
    title().position([0, -400], 1, easeInOutBack),
  );

  const list = createRef<ArrowList>();
  const stopArguing = createRef<Txt>();
  const dropClaim = createRef<Txt>();

  view.add(
    <ArrowList ref={list} scale={0.8} position={[0, 120]}>
      <Txt textWrap maxWidth={1600}>
        Arguing in favour of aggression is inconsistent \because argumentation
        is and must be a conflict-free interaction.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        When people have some dispute and they choose to argue about it, they
        are doing the exact opposite of fighting over it.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        By simply arguing about property rights, you must pre-suppose the NAP in
        your act of peacefully attempting to resolve the disagreement.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        If Friday is trying to convince Crusoe that the proper use of the spear
        is to violate Crusoe's bodily autonomy, then he finds himself in a
        practical contradiction.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        To escape the contradiction, Friday can either{" "}
        <Txt ref={stopArguing}>stop arguing and go back to fighting</Txt>, or he
        can{" "}
        <Txt ref={dropClaim}>drop the claim that aggression should be used</Txt>
        .
      </Txt>
    </ArrowList>,
  );

  yield* list().next("inconsistent");
  yield* list().next("argument is the opposite of fighting");
  yield* list().next("argument pre-supposes the NAP");
  yield* list().next("Friday practical contradiction");
  yield* list().next("Fridays options");
  yield* waitUntil("highlight second case");
  yield* all(
    dropClaim().glow(0).glow(1, 1),
    dropClaim().fill(colors.yellow500, 1),
  );
  yield* waitUntil("highlight first case");
  yield* all(
    dropClaim().opacity(0.2, 1),
    stopArguing().fill(colors.red500, 1),
    stopArguing().glow(0).glow(1, 1),
  );
  yield* list().hideAll("out", delay(0.8, title().position(0, 1)));

  //The basic idea behind this attack is found in noticing that there exists an inescapable inconsistency when it comes to arguing in favour of aggression, borne from the fact that argumentation is and must be a conflict-free interaction. When people have some dispute and they choose to argue about it, they are doing the exact opposite of fighting over the dispute. That is, if Crusoe and Friday have a disagreement over how to use a spear, then each party sitting down and giving arguments as to why their use should go forth is quite distinct to each party launching missiles and trying to stab the other to death in order that their use may go forth unimpeded.

  // That is, simply by arguing about property rights, you must pre-suppose libertarian non-aggression in your act of peacefully attempting to resolve the disagreement. For our above dispute between Crusoe and Friday, if Friday is trying to convince Crusoe that the proper use of the spear is to violate Crusoe's bodily autonomy, then he finds himself in a practical contradiction,[fn:67] namely he is respecting Crusoe's bodily autonomy and trying to achieve consent from Crusoe by his act of arguing, whilst he is explicitly rejecting that Crusoe's consent is required in the first place. To escape this contradiction, Friday has two options: first, he can stop arguing and go back to fighting over it, or second, he can drop his claim that Crusoe's bodily autonomy should be violated. In this second case the mixed law or jungle ethic has trivially dropped out of rational consideration, and in the first case we have it that Friday has turned himself into an animal-beast governed only by whim---which makes his ethic irrational still.

  // What this argument does is highlight an implicit notion we have that such jungle ethics are irrational and brutish; namely that it is simply inconsistent and hypocritical for a person to even try to assert them in an argument---that if they truly believe in their murderous creeds then why the hell aren't they living by them?

  yield* waitUntil("end");
  yield* title().text("", 1);
});
