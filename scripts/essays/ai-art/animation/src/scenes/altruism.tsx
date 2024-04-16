import { makeScene2D, Txt, Rect, Ray, TxtProps } from "@motion-canvas/2d";
import {
  waitFor,
  all,
  chain,
  createRefArray,
  createRef,
} from "@motion-canvas/core";
import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const conditional: TxtProps = {
    width: 600,
    textWrap: true,
    fill: "white",
    scale: 0,
  };

  const ethic = createRef<Rect>();
  const rays = createRefArray<Ray>();
  const conditionals = createRefArray<Txt>();

  view.add(
    <Rect gap={128} alignItems="center" direction="column" layout>
      <Rect
        scale={0}
        ref={ethic}
        gap={32}
        alignItems="center"
        direction="column"
      >
        <Txt fontSize={64} fontFamily="Cubano" fill="white">
          The Altruist Ethic:
        </Txt>
        <Txt width={800} textAlign="center" textWrap fill="white">
          You are not deserving of those values you produce{" "}
          <Txt.i>because</Txt.i> you produced them.
        </Txt>
      </Rect>
      <Rect gap={64} direction="column">
        {[
          [
            <Txt ref={conditionals} textAlign="right" {...conditional}>
              You <Txt.i>have</Txt.i> produced something.
            </Txt>,
            <Txt ref={conditionals} textAlign="left" {...conditional}>
              You have no moral claim to it, and should give it up.
            </Txt>,
          ],
          [
            <Txt ref={conditionals} textAlign="right" {...conditional}>
              You didn't produce something.
            </Txt>,
            <Txt ref={conditionals} textAlign="left" {...conditional}>
              You <Txt.i>do</Txt.i> have a moral claim to it and should take it.
            </Txt>,
          ],
        ].map(([antecedent, consequent]) => (
          <Rect alignItems="center" gap={64}>
            {antecedent}{" "}
            <Ray
              end={0}
              ref={rays}
              lineWidth={16}
              endArrow
              toX={256}
              stroke="white"
            />{" "}
            {consequent}
          </Rect>
        ))}
      </Rect>
    </Rect>
  );

  ethic().margin([400, 0, 0, 0]);

  yield* popin(ethic);

  yield* waitFor(5);

  yield* all(
    ethic().margin(0, 1),
    ...conditionals.map((conditional, i) =>
      chain(
        waitFor(i * 0.1),
        popin(() => conditional)
      )
    ),
    ...rays.map((ray, i) => chain(waitFor((i + 1) * 0.2), ray.end(1, 1)))
  );

  yield* waitFor(10);

  yield* all(
    popout(ethic),
    ...conditionals.map((conditional, i) =>
      chain(
        waitFor(i * 0.1),
        popout(() => conditional)
      )
    ),
    ...rays.map((ray, i) => chain(waitFor((i + 1) * 0.2), ray.start(1, 1)))
  );
});
