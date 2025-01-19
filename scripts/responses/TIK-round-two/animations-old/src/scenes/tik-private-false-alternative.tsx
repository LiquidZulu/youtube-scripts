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
import {
  fadein,
  fadeinright,
  fadeinup,
  fadeout,
  fadeoutright,
  fadeoutup,
  flashAround,
  getLocalPos,
} from "mcas/lib";

/*
   + [ ] private: belonging to or for the use of
   one particular person *or group of people*
   only---turn the text red as it is infected
   with collectivism
   + choice isn't between individualism or
   collectivism, its between small- or
   big-collectivism
 */

// Notice how this applies also on the private
// side of TIKs definitions; he tells us that
// "private" means belonging to or for the use
// of one particular person *or group of people*
// only. The inclusion of the group here is the
// infection of the term with collectivism. Thus
// the choice we are given is not between
// individualism or collectivism, it is between
// small- or big-collectivism.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const group = createRef<Txt>();
  const full = createRef<Txt>();

  view.add(
    <Txt ref={full} fill={colors.zinc50} justifyContent="center">
      Private: belonging to or for the use of one {"\n"}particular person{" "}
      <Txt.b>
        or{" "}
        <Txt clip ref={group}>
          group
        </Txt>{" "}
        of people
      </Txt.b>{" "}
      only.
    </Txt>,
  );

  yield* fadein(full);
  yield* waitFor(3.4);

  yield* flashAround(group, 1, null, { color: colors.red500 });
  yield* full().fill(colors.red500, 1);

  const ic = createRef<Txt>();
  const sb = createRef<Txt>();

  view.add(
    <Txt ref={ic} fill={colors.zinc50}>
      Indiviualism vs Collectivism
    </Txt>,
  );
  view.add(
    <Txt ref={sb} opacity={0} fill={colors.zinc50}>
      Small- vs Big- Collectivism
    </Txt>,
  );

  yield* all(full().position([0, -200], 1), chain(waitFor(0.4), fadein(ic)));
  yield* waitFor(1);
  yield* all(fadeoutup(ic), fadeinup(sb));
  yield* waitFor(2);

  yield* all(fadeout(full), chain(waitFor(0.2), fadeout(sb)));
});
