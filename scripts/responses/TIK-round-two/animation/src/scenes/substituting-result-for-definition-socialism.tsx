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
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import { emerald500 } from "mcas/colors";
import { flashAround } from "mcas/lib";

// what a definition like that is doing, is it is substituting the expected outcome of some system for the system itself---i.e. it is packaging together what effects they think would occur with the things they think will cause those effects. This is invalid; the definition in this case needs to identify the cause, and then further analysis can be performed to determine what the effect of that cause will be. The change I propose to the definition of the state is of a different sort---it is not an invalid poisoning of a term, it is the removal of an already established poison. My claim is that the current dictionary definitions that TIK is working on are in fact obfuscating the core, and that this obfuscation should be removed.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const ray = createRef<Ray>();
  const def = createRef<Rect>();
  const result = {
    rect: createRef<Rect>(),
    title: createRef<Txt>(),
  };

  const cause = createRef<Txt>();
  const effect = createRef<Txt>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} layout alignItems="center" gap={62}>
      <Rect scale={0} ref={def} alignItems="center" direction="column">
        <Txt fontFamily="Cubano" fill={colors.zinc700} fontSize={32}>
          DEFINITION:
        </Txt>
        <Txt fill={colors.zinc50}>
          Socialism means{" "}
          <Txt fontStyle="italic" ref={cause}>
            this thing
          </Txt>
          .
        </Txt>
      </Rect>
      <Ray
        end={0}
        ref={ray}
        toX={200}
        endArrow
        lineWidth={8}
        stroke={colors.zinc50}
      />
      <Rect scale={0} ref={result.rect} alignItems="center" direction="column">
        <Txt
          ref={result.title}
          fontFamily="Cubano"
          fill={colors.zinc700}
          fontSize={32}
        >
          RESULT:
        </Txt>
        <Txt fill={colors.zinc50}>
          Socialism causes{" "}
          <Txt fontStyle="italic" ref={effect}>
            this other thing
          </Txt>
          .
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(
    popin(def),
    chain(waitFor(0.1), ray().end(1, 1)),
    chain(waitFor(0.2), popin(result.rect)),
  );

  // it is substituting the expected outcome of some system for the system itself---i.e. it is packaging together what effects they think would occur with the things they think will cause those effects. This is invalid; the definition in this case needs to identify the cause, and then further analysis can be performed to determine what the effect of that cause will be. The change I propose to the definition of the state is of a different sort---it is not an invalid poisoning of a term, it is the removal of an already established poison. My claim is that the current dictionary definitions that TIK is working on are in fact obfuscating the core, and that this obfuscation should be removed.

  yield* waitUntil("indicate result");

  yield* flashAround(result.rect);

  yield* waitUntil("indicate system itself");

  yield* flashAround(cont);

  yield* waitUntil("effect");
  yield* all(effect().fill(colors.amber500, 1), effect().glow(0).glow(1, 1));

  yield* waitUntil("cause");

  yield* all(cause().fill(colors.emerald500, 1), cause().glow(0).glow(1, 1));

  yield* waitUntil("indicate cause");
  yield* flashAround(cause);

  yield* waitUntil("indicate effect");
  yield* flashAround(effect);

  yield* waitUntil("end");

  yield* all(
    popout(def),
    chain(waitFor(0.1), ray().start(1, 1)),
    chain(waitFor(0.2), popout(result.rect)),
  );
});
