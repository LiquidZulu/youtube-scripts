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

// the initiation of force is a moral evil.[fn:37]

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();

  view.add(
    <Txt fill="white" ref={title} fontSize={60}>
      The initiation of force as a moral evil
      <Txt ref={colon} opacity={0}>
        :
      </Txt>
    </Txt>,
  );

  yield* fadein(title);

  //The justification of this principle on Objectivist grounds is that the mind cannot work under compulsion---in order to make a man act against his judgement you must nullify his judgement. This is what is meant by the use of force. There would be no reason to force a man to do what he was already planning to do---insofar as you are actually forcing him, you must be making him act /against/ his own rational judgement, i.e. you are making him act as his own destroyer. What this means is that force and value are entirely opposed to each other---you can have either one or the other.

  yield* waitUntil("arrow");

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[0, 50]}>
      <Txt maxWidth={1400} textWrap>
        The mind cannot work under compulsion---in order to make a man act
        against his judgement, you must nullify his judgement.
      </Txt>
      <Txt maxWidth={1400} textWrap>
        This is what is meant by the use of force---there would be no reason to
        force a man to do what he was already planning to do, so if you are
        actually forcing him you must be making him act <Txt.i>against</Txt.i>{" "}
        his own rational judgement.
      </Txt>
      <Txt maxWidth={1400} textWrap>
        \therefore force and value are entirely opposed to each other---you can
        have either one or the other.
      </Txt>
    </ArrowList>,
  );

  yield* all(
    colon().opacity(1, 1),
    title().position([0, -400], 1),
    delay(0.4, list().next()),
  );

  yield* list().next("what meant use force");
  yield* list().next("force value opposed");
  yield* waitUntil("list out");
  yield* all(fadeout(title), delay(0.2, list().hideAll()));

  const divider = createRef<Ray>();
  const intrinsicism = createRef<Txt>();
  const ilist = createRef<ArrowList>();
  const subjectivism = createRef<Txt>();
  const slist = createRef<ArrowList>();

  view.add(
    <Rect
      layout
      width={1920}
      height={1080}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Rect
        direction="column"
        width={1920 / 2}
        alignItems="center"
        height="90%"
        gap={64}
      >
        <Txt opacity={0} ref={intrinsicism} fontSize={60} fill="white">
          Intrinsicism
        </Txt>
        <ArrowList width="90%" ref={ilist}>
          <Txt fontSize={40} textWrap>
            Values have nothing to do with a man's perception, his evaluation,
            or the context of his life.
          </Txt>
          <Txt fontSize={40} textWrap>
            "Value" is an intrinsic attribute of something, knowledge of which
            is derived through mystic means.
          </Txt>
          <Txt fontSize={40} textWrap>
            \therefore values can be forced upon a man against his own judgement
            and "for his own good."
          </Txt>
          <Txt fontSize={40} textWrap>
            Because value has nothing to do with his judgement, even forcing him
            to act against his judgement can be a value.
          </Txt>
        </ArrowList>
      </Rect>
      <Ray
        ref={divider}
        lineWidth={20}
        stroke="white"
        fromY={-1080 / 2}
        toY={1080 / 2}
        end={0}
      />
      <Rect
        direction="column"
        width={1920 / 2}
        alignItems="center"
        height="90%"
        gap={64}
      >
        <Txt opacity={0} ref={subjectivism} fontSize={60} fill="white">
          Subjectivism
        </Txt>
        <ArrowList width="90%" ref={slist}>
          <Txt fontSize={40} textWrap>
            Something is a value if one merely claims it to be.
          </Txt>
          <Txt fontSize={40} textWrap>
            "Value" is a mere arbitrary name that tells us nothing about the
            world, only giving insight into a "relation of ideas."
          </Txt>
          <Txt fontSize={40} textWrap>
            Because there are no objective values on this viewpoint, a value can
            be whatever a man claims it to be.
          </Txt>
          <Txt fontSize={40} textWrap>
            \therefore one could not possibly hope to convince others of a moral
            view through rational argumentation.
          </Txt>
        </ArrowList>
      </Rect>
    </Rect>,
  );

  yield* divider().end(1, 1);

  yield* all(
    chain(waitUntil("intrinsicism"), fadein(intrinsicism)),
    chain(waitUntil("subjectivism"), fadein(subjectivism)),
  );

  yield* ilist().next("value has nothing to do with a mans perception");
  yield* ilist().next("value intrinsic attribute");
  yield* ilist().next("values can be forced");
  yield* ilist().next("force to act against judgement");

  yield* waitUntil("indicate subjectivism");
  yield* flashAround(subjectivism);

  yield* slist().next("value if one claims it to be");
  yield* slist().next("value arbitrary name");
  yield* slist().next("no objective values");
  yield* slist().next("cant convince others");

  // The error of both schools is found in their attempted separation of values from the mind---that values are whatever is in accord with gods plan, irrespective of judgement; or that values are based on arbitrary whim completely divorced from the faculty that judges. Neither school recognises that a value is a value /as evaluated by a thinking mind through the application of a rational standard/. Values cannot exist without a mind there to do the evaluating, namely, a man's /own/ mind. Just as others cannot digest food for you, so too can they not think or evaluate for you.

  yield* waitUntil("indicate gods plan");
  yield* flashAround(() => ilist().items[1]);

  yield* waitUntil("indicate arbitrary whim");
  yield* flashAround(() => slist().items[0]);

  yield* waitUntil("out");
  yield* all(
    divider().start(1, 1),
    delay(0.1, all(fadeout(intrinsicism), delay(0.1, ilist().hideAll()))),
    delay(0.2, all(fadeout(subjectivism), delay(0.1, slist().hideAll()))),
  );

  const actual = createRef<Txt>();

  view.add(
    <Txt ref={actual} fill="white" width="60%" textWrap textAlign="center">
      A value is a value{" "}
      <Txt.i>
        as evaluated by a thinking mind through the application of a rational
        standard
      </Txt.i>
      .
    </Txt>,
  );

  yield* fadein(actual);
  yield* waitUntil("end");
  yield* fadeout(actual);
});
