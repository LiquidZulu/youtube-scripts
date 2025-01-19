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
import { ArrowList } from "mcas/lib";

// One final point must be addressed here before the positive case for private defense insurance is complete: namely, in a capitalist society, what methods could free peoples utilise in order to defend themselves against state aggression? First, it is worth questioning /why/ a sovereign would wish to do this in the first place. /Who/ would they be invading? There is no competing sovereign or state in this area to direct his attacks towards, there are only freely associating people, each engaged in their own individual behaviours. These free men would tend to have not aggressed against any citizens in the invading nation, and they would tend to have not provoked any aggressions from the invaders for reasons previously stated. Any individual who was engaged in such provocation or aggression would quickly become unwelcome in the free society, forced to live on the outskirts where the state may simply arrest him without needing to invade. Furthermore, options for casus belli become quite limited without a single collective state to pin grievances onto. Any state must in some way justify its conduct to the men who would be carrying out its crimes, the justification needn't be good, but it needs to exist. There would be no terrorist attacks coming from the free people, the free people would not be seeking any expansionist wars against neighboring territories, and they would be engaged in no internal ethnic cleansings or other such "crimes against humanity" to be used as a justification for attack.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Txt ref={title} fill="white" fontFamily="oswald">
      HOW TO DEFEND AGAINST STATE AGGRESSION?
    </Txt>,
  );

  yield* fadein(title);

  yield* waitUntil("title change");

  yield* title().text(
    "WHY WOULD A SOVEREIGN WISH TO ENGAGE IN THE INVASION?",
    1,
  );

  // /Who/ would they be invading? There is no competing sovereign or state in this area to direct his attacks towards, there are only freely associating people, each engaged in their own individual behaviours. These free men would tend to have not aggressed against any citizens in the invading nation, and they would tend to have not provoked any aggressions from the invaders for reasons previously stated. Any individual who was engaged in such provocation or aggression would quickly become unwelcome in the free society, forced to live on the outskirts where the state may simply arrest him without needing to invade. Furthermore, options for casus belli become quite limited without a single collective state to pin grievances onto. Any state must in some way justify its conduct to the men who would be carrying out its crimes, the justification needn't be good, but it needs to exist. There would be no terrorist attacks coming from the free people, the free people would not be seeking any expansionist wars against neighboring territories, and they would be engaged in no internal ethnic cleansings or other such "crimes against humanity" to be used as a justification for attack.

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt textWrap maxWidth={1400}>
        <Txt.i>Who</Txt.i> would they be invading? There is no competing
        sovereign or state in this area to direct attacks towards.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        The free men would tend to have not aggressed against any citizens in
        the invading nation, and they would tend to have not provoked any
        aggressions from the invaders.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        Options for <Txt.i>casus belli</Txt.i> become quite limited without a
        single collective state to pin grievances onto.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        The invading state just justify its conduct to the men who would be
        carrying out its crimes.
      </Txt>
    </ArrowList>,
  );

  yield* waitUntil("list comes in");

  yield* all(title().position([0, -400], 1), delay(0.6, list().next()));

  yield* list().next("free men -/-> aggressed");
  yield* list().next("casus belli");
  yield* list().next("state just justify conduct");

  yield* waitUntil("end");
  yield* all(fadeout(title), delay(0.1, list().hideAll()));

  yield* waitUntil("blank");
});
