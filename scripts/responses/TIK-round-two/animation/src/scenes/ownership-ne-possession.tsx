import { makeScene2D, Rect, Ray, Img, Shape } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  spring,
  SmoothSpring,
  waitUntil,
  Reference,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, shake } from "mcas";
import * as colors from "mcas/colors";
import stick from "../assets/crusoe/stick.png";
import { ArrowList, flashAround } from "mcas/lib";

// The issue with this view is that ownership
// --which we can define as the /right/ to
// possess a given scarce good--is necessarily
// distinct from possession. If there is some
// dispute between $A$ and $B$ over who should
// be the one to control a given property, then
// /both/ $A$ and $B$ must pre-suppose this to
// be the case. $A$ is asserting that though $B$
// might be able to actually obtain control, it
// would nevertheless be the case that $A$ /should/
// be the one to control it, and similarly $B$ is
// asserting that though $A$ might be able to actually
// obtain control, it would nevertheless be the case
// that $\textit{\textbf{B}}$ should be the one to
// actually control it.

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const title = createRef<Txt>();
  const ownership = createRef<Txt>();
  const possession = createRef<Txt>();
  view.add(
    <Txt fontSize={70} ref={title} fill={colors.zinc50}>
      <Txt ref={ownership}>Ownership</Txt> ≠{" "}
      <Txt ref={possession}>Possession</Txt>
    </Txt>,
  );

  yield* fadein(title);

  let blah = 0;
  const flash = <T extends Shape = Shape>(ref: Reference<T>) =>
    chain(
      waitUntil("flash around " + blah++),
      flashAround(ref, null, null, null, {
        lineWidth: 5,
        shadowColor: colors.purple500,
        shadowBlur: 20,
        stroke: colors.purple500,
      }),
    );

  yield* flash(ownership);
  yield* flash(possession);
  yield* waitUntil("out");

  const A = createRef<Txt>();
  const B = createRef<Txt>();
  const s = createRef<Img>();
  const ca = colors.rose500;
  const cb = colors.indigo500;

  const own = createRefArray<Txt>();
  const AB = createRef<Rect>();

  view.add(
    <Rect
      ref={AB}
      layout
      position={[0, 150]}
      width={1800}
      justifyContent="space-between"
    >
      <Rect direction="column" alignItems="center">
        <Txt ref={own} scale={0} fill={ca} fontSize={90} fontWeight={900}>
          "I own it!"
        </Txt>
        <Txt
          marginTop={-200}
          ref={A}
          scale={0}
          fontSize={1000}
          fontFamily="cubano"
          fill={ca}
        >
          A
        </Txt>
      </Rect>
      <Rect direction="column" alignItems="center">
        <Txt ref={own} scale={0} fill={cb} fontSize={90} fontWeight={900}>
          "I own it!"
        </Txt>
        <Txt
          marginTop={-200}
          ref={B}
          scale={0}
          fontSize={1000}
          fontFamily="cubano"
          fill={cb}
        >
          B
        </Txt>
      </Rect>
    </Rect>,
  );
  view.add(
    <Img
      ref={s}
      scale={0}
      width={1440 / 3}
      height={810 / 3}
      src={stick}
      position={[0, 300]}
    />,
  );

  yield* title().position([0, -400], 1);
  yield* all(popin(A), chain(waitFor(0.4), popin(B)));
  yield* waitFor(1);
  yield* popin(s);
  yield* fadeout(title);

  yield* all(
    ...own.map((t, i) => {
      const rot = i == 0 ? 270 : -270;

      return all(
        popin(() => t),
        spring(SmoothSpring, rot, 0, 0.3, (val) => {
          t.rotation(val);
        }),
        shake((val: number) => {
          AB().position([0, 150 + val]), s().position([0, 300 + val]);
        }, 2),
      );
    }),
  );

  yield* all(...own.map((t) => fadeout(() => t)));

  yield* s().position([364, 250], 1);

  const ray = createRef<Ray>();

  view.add(
    <Ray
      end={0}
      ref={ray}
      position={[0, 200]}
      lineWidth={32}
      endArrow
      arrowSize={42}
      toX={-300}
      fromX={300}
      stroke={ca}
    />,
  );

  yield* waitUntil("ray end");
  yield* ray().end(1, 1);
  yield* waitFor(1);

  yield* all(
    s().position([-400, 150], 1),
    s().rotation(-30, 1),
    ray().to([300, 0], 1),
    ray().from([-300, 0], 1),
    ray().stroke(cb, 1),
  );
  yield* waitUntil("popout a and b");

  yield* all(
    popout(A),
    popout(s),
    chain(waitFor(0.2), popout(B)),
    ray().start(1, 1),
  );

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list}>
      <Txt maxWidth={1600} textWrap>
        <Txt glow fill={colors.red500}>
          The law of the jungle
        </Txt>{" "}
        relies on a conflation of the concepts{" "}
        <Txt glow fill={colors.yellow500}>
          ownership
        </Txt>{" "}
        and{" "}
        <Txt glow fill={colors.emerald500}>
          possession
        </Txt>
        .
      </Txt>
      <Txt maxWidth={1600} textWrap>
        <Txt glow fill={colors.red500}>
          The law of the jungle
        </Txt>{" "}
        is the assertion that{" "}
        <Txt glow fill={colors.yellow500}>
          ownership rights
        </Txt>{" "}
        are acquired by{" "}
        <Txt glow fill={colors.emerald500}>
          the mere act of taking a given good from someone else
        </Txt>
        .
      </Txt>
      <Txt maxWidth={1600} textWrap>
        If{" "}
        <Txt glow fill={ca} fontFamily="cubano">
          A
        </Txt>{" "}
        <Txt glow fill={colors.yellow500}>
          has
        </Txt>{" "}
        a stick and{" "}
        <Txt glow fill={cb} fontFamily="cubano">
          B
        </Txt>{" "}
        <Txt glow fill={colors.emerald500}>
          takes
        </Txt>{" "}
        that from him, the{" "}
        <Txt glow fill={colors.red500}>
          jungle-jurist
        </Txt>{" "}
        says that{" "}
        <Txt glow fill={colors.fuchsia500} fontFamily="cubano">
          C
        </Txt>{" "}
        could come along and{" "}
        <Txt glow fill={colors.emerald500}>
          take
        </Txt>{" "}
        the stick from{" "}
        <Txt glow fill={cb} fontFamily="cubano">
          B
        </Txt>{" "}
        and then become the{" "}
        <Txt glow fill={colors.yellow500}>
          owner
        </Txt>
        ---whomever is in{" "}
        <Txt glow fill={colors.emerald500}>
          possession
        </Txt>{" "}
        of the stick is in fact its{" "}
        <Txt glow fill={colors.yellow500}>
          owner
        </Txt>
        .
      </Txt>
      <Txt maxWidth={1600} textWrap>
        How can a person assert this{" "}
        <Txt glow fill={colors.red500}>
          jungle law
        </Txt>{" "}
        view in defense of their actions? Both{" "}
        <Txt glow fill={ca} fontFamily="cubano">
          A
        </Txt>{" "}
        and{" "}
        <Txt glow fill={cb} fontFamily="cubano">
          B
        </Txt>{" "}
        must pre-suppose the distinction between{" "}
        <Txt glow fill={colors.yellow500}>
          ownership
        </Txt>{" "}
        and{" "}
        <Txt glow fill={colors.emerald500}>
          possession
        </Txt>
        .
      </Txt>
      <Txt maxWidth={1600} textWrap>
        They are saying that{" "}
        <Txt glow fill={colors.yellow500}>
          <Txt.i>they</Txt.i> should control
        </Txt>{" "}
        the item which implies that they have a{" "}
        <Txt glow fill={colors.yellow500}>
          <Txt.i>right</Txt.i> to exclude
        </Txt>{" "}
        other people from using it.
      </Txt>
    </ArrowList>,
  );

  yield* list().next("law jungle conflation");
  yield* list().next("ownership acquired by mere taking");
  yield* list().next("if a and b blah blah");
  yield* list().next("how assert?");
  yield* list().next("saying that they should control");
  yield* list().hideAll("end");

  // So this mere possessor ethic, which the law of the jungle asserts, would require a conflation of the concepts /ownership/ and /possession/, that is to say that the law of the jungle is the assertion that ownership rights are acquired by the mere act of taking a given good from someone else---if $A$ has a stick and $B$ takes that stick from him, then the jungle-jurist says that $C$ could come along and take the stick from $B$ and then become the owner, i.e. that whomever is in possession of the stick is in fact it's owner. But, how exactly is a person able to assert this jungle-law view in defense of their actions? We saw above that both $A$ and $B$ must pre-suppose the distinction between ownership and possession---they are saying that /they/ should control the item which implies that they have a /right/ to exclude other people from using it.[fn:59]
});
