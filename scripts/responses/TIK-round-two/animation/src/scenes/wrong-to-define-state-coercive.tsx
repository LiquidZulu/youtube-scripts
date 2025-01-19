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
import rothbardImg from "../assets/rothbard.png";

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
  yield* waitUntil("I use dictionary");
  yield* arrow().next();

  // First, I agree on the point that it is incorrect to make the state coercive by definitional fiat; but I do not think that this is what the Rothbardians are doing. Rather, Rothbard has identified that the essence of the state is to be anti-productive, parasitic, monopolistic in the arena of the use of force at the very least. Then on top of that he has a separate legal theory which identifies those activities as being nocent. So its not that the state is that organisation that is bad; its rather the state is an organisation that engages in certain activities that we have separately identified as being bad.

  yield* waitUntil("wrong define state coercive");

  yield* flashAround(() => arrow().items[0]);

  yield* waitUntil("end");
  yield* all(
    ...arrow()
      .items.reverse()
      .map((item, i) => chain(waitFor(0.2 * i), arrow().hide(item))),
  );

  const list = createRef<ArrowList>();
  const rothbard = createRef<Img>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={64}>
      <Img ref={rothbard} src={rothbardImg} width={300} />
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1100}>
          The essence of the state is to be anti-productive.
        </Txt>
        <Txt textWrap maxWidth={1100}>
          Apart from this, these activities are nocent.
        </Txt>
        <Txt textWrap maxWidth={1100}>
          The state isn't "that organisation that is bad."
        </Txt>
        <Txt textWrap maxWidth={1100}>
          The state is an organisation that engages in certain activities that
          we have separately identified as being bad.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* popin(rothbard);

  yield* waitUntil("essence is blah");
  yield* list().next();

  yield* waitUntil("activities nocent");
  yield* list().next();

  yield* waitUntil("state not organisation bad");
  yield* list().next();

  yield* waitUntil("activities separately identified");
  yield* list().next();

  yield* waitUntil("next");
  yield* all(
    popout(rothbard),
    delay(
      0.1,
      all(...list().items.map((item, i) => delay(0.1 * i, list().hide(item)))),
    ),
  );

  // As for the point that I use dictionary definitions myself in arguing that socialism is when the government does stuff this does not contradict the previous analysis of certain dictionary definitions being invalid. Those definitions were not based on package deals or any other such flawed epistemology, and in fact identified the proper essence of socialism---that socialism is when the government does stuff.

  yield* waitUntil("blank");
});
