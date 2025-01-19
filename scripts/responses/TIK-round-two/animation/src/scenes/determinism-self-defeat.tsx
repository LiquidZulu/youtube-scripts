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

//The basic idea is that if determinism is true,
//then the determinist is pre-destined to accept
//this position. How, then, does he hope to
//validate it? The factors that caused him to be
//a determinist are clearly not infallible, as
//those same factors caused other people to not
//be determinists---so he must accept that man
//can think in error. Given the determinist's
//mind is not automatically attuned to reality,
//and he claims that he has no choice over what
//he believes, then he cannot validate any belief
//that he holds---the determinist claims that on
//his own premises he cannot deliberately choose
//reality over fantasy.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();
  const step1 = {
    ray: createRefArray<Ray>(),
    txt: createRefArray<Txt>(),
  };
  const step2 = createRefArray<Txt>();

  view.add(
    <Txt ref={title} fontSize={70} fill={colors.zinc50}>
      The determinist self-defeat<Txt ref={colon}>:</Txt>
    </Txt>,
  );

  view.add(
    <Rect layout direction="column" gap={64} position={[0, 100]}>
      <Rect direction="column">
        <Rect alignItems="center" gap={32}>
          <Txt opacity={0} ref={step1.txt} fill={colors.zinc50}>
            Determinism is true
          </Txt>
          <Ray
            end={0}
            ref={step1.ray}
            toX={100}
            endArrow
            stroke={colors.zinc50}
            lineWidth={8}
            arrowSize={12}
          />
          <Txt opacity={0} ref={step1.txt} fill={colors.zinc50}>
            The determinist must believe this
          </Txt>
        </Rect>
        <Rect alignItems="center" gap={32}>
          <Txt opacity={0} ref={step1.txt} fill={colors.zinc50}>
            Determinism is true
          </Txt>
          <Ray
            end={0}
            ref={step1.ray}
            toX={100}
            endArrow
            stroke={colors.zinc50}
            lineWidth={8}
            arrowSize={12}
          />
          <Txt opacity={0} ref={step1.txt} fill={colors.zinc50}>
            The non-determinist must believe this
          </Txt>
        </Rect>
      </Rect>
      <Rect direction="column" alignItems="center" width="100%" gap={16}>
        <Txt opacity={0} ref={step2} fill={colors.zinc50}>
          ∴ Man can believe in errors.
        </Txt>
        <Txt opacity={0} ref={step2} fill={colors.zinc50}>
          But, man cannot choose to truth over falsehood.
        </Txt>
        <Txt opacity={0} ref={step2} fill={colors.zinc50}>
          ∴ Man cannot validate his beliefs.
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* fadein(title);
  yield* waitUntil("determinist must believe it");
  yield* all(
    colon().opacity(1, 1),
    title().position([0, -250], 1),
    chain(
      waitFor(0.3),
      all(
        fadein(() => step1.txt[0]),
        chain(waitFor(0.1), step1.ray[0].end(1, 1)),
        chain(
          waitFor(0.2),
          fadein(() => step1.txt[1]),
        ),
      ),
    ),
  );

  yield* waitUntil("non-determinist must too");

  yield* all(
    fadein(() => step1.txt[2]),
    chain(waitFor(0.1), step1.ray[1].end(1, 1)),
    chain(
      waitFor(0.2),
      fadein(() => step1.txt[3]),
    ),
  );

  yield* waitUntil("man can believe errors");
  yield* all(
    ...step2.map((step, i) =>
      delay(
        0.1 * i,
        fadein(() => step),
      ),
    ),
  );

  yield* waitUntil("gone");

  yield* all(
    fadeout(title),
    chain(
      waitFor(0.2),
      all(
        ...new Array(2).fill(0).map((_, i) =>
          chain(
            waitFor(0.2 * i),
            all(
              fadeout(() => step1.txt[i == 0 ? 0 : 2]),
              chain(waitFor(0.1), step1.ray[i].start(1, 1)),
              fadeout(() => step1.txt[i == 1 ? 1 : 3]),
            ),
          ),
        ),
      ),
    ),
    chain(
      waitFor(0.4),
      all(
        ...step2.map((x, i) =>
          chain(
            waitFor(0.2 * i),
            fadeout(() => x),
          ),
        ),
      ),
    ),
  );
});
