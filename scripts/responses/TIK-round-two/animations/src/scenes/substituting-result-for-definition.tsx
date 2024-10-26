import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";

/*
   The first error made by this sort of claim
   is that it is substituting the /result/ that
   the claimant expects would come from anarchy
   for the /definition/ of anarchy.

   This is an inversion of the correct order of
   operations: we need to first establish what
   anarchism actually is before we can determine
   what results we expect to come about from
   adhering to it.
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const ray = createRef<Ray>();
  const def = createRef<Rect>();
  const result = {
    rect: createRef<Rect>(),
    title: createRef<Txt>(),
  };

  view.add(
    <Rect layout alignItems="center" gap={62}>
      <Rect scale={0} ref={def} alignItems="center" direction="column">
        <Txt fontFamily="Cubano" fill={colors.zinc700} fontSize={32}>
          DEFINITION:
        </Txt>
        <Txt fill={colors.zinc50}>
          Anarchism means <Txt.i>this thing</Txt.i>.
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
          Anarchism causes <Txt.i>this other thing</Txt.i>.
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(
    popin(def),
    chain(waitFor(0.1), ray().end(1, 1)),
    chain(waitFor(0.2), popin(result.rect)),
  );

  yield* waitFor(10);

  yield* all(
    popout(def),
    chain(waitFor(0.1), ray().start(1, 1)),
    chain(waitFor(0.2), popout(result.rect)),
  );
});
