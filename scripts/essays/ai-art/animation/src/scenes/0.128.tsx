import {
  makeScene2D,
  Txt,
  Rect,
  TxtProps,
  RectProps,
  Shape,
  ShapeProps,
  Ray,
  RayProps,
  Latex,
  LatexProps,
} from "@motion-canvas/2d";
import {
  waitFor,
  chain,
  all,
  createRef,
  createSignal,
} from "@motion-canvas/core";
import { popin, popinSize, popout } from "../util";
import { withRef } from "../types";

/*

   Another way of looking at this is that 0.128%
   of the 160 million training images comes out
   to just over 200 thousand[fn:33]---which means
   that the number of images the researchers
   generated in comparison to the total training
   dataset is about five times /larger/ than the
   number of duplicates found is in comparison to
   the number of images they generated---/and/
   that is for a set of prompts that were
   specifically selected to get the highest level
   of duplication,[fn:34] as against the arbitrary
   prompting which would occur for general usage
   of these systems (your average MidJourney user
   is not specifically attempting to engineer his
   prompts to get the closest matches to training
   images).

 */

const M = 10 ** 6;

const generated = M;
const total = 160 * M;
const duplicates = 1280;

const comparisons = Object.entries({
  "generated / total": generated / total,
  "duplicates / generated": duplicates / generated,
}).map(
  ([fraction, amount]) =>
    ({
      amount,
      percentage: {
        ref: createRef<Txt>(),
        fill: "white",
        fontSize: 64,
      },
      ray: {
        ref: createRef<Ray>(),
        marginLeft: 100,
        marginRight: 100,
        lineWidth: 200,
        toY: -700 * (amount / (generated / total)),
        stroke: "green",
      },
      latex: {
        ref: createRef<Latex>(),
        width: 200,
        tex: `\\color{white}\\frac{\\text{${fraction.split("/")[0]}}}{\\text{${
          fraction.split("/")[1]
        }}}`,
      },
    } as {
      percentage: withRef<TxtProps, Txt>;
      latex: withRef<LatexProps, Latex>;
      ray: withRef<RayProps, Ray>;
      amount: number;
    })
);

console.log(comparisons);

const txt: TxtProps = {
  fill: "white",
  fontSize: 100,
};

export default makeScene2D(function* (view) {
  view.fill(0x202228);

  const times: withRef<RectProps, Rect> = {
    ref: createRef<Rect>(),
    opacity: 0,
  };
  const percentage: withRef<TxtProps, Txt> = {
    ref: createRef<Txt>(),
    opacity: 0,
  };
  const equals: withRef<TxtProps, Txt> = {
    ref: createRef<Txt>(),
    opacity: 0,
  };
  const equation = createRef<Rect>();

  view.add(
    <Rect ref={equation} layout>
      <Rect gap={8}>
        <Txt {...percentage} {...txt} text="0.128%" />
        <Rect {...times} gap={8}>
          <Txt {...txt} text="⋅" />
          <Txt {...txt} text="160M" />
        </Rect>
      </Rect>
      <Txt {...equals} {...txt} text="&nbsp;≈ 200k" />
    </Rect>
  );

  let scale = new Map();

  for (let blah of [times, percentage, equals]) {
    scale.set(blah, blah.ref().size());
    blah.ref().size(0);
  }

  const add = function* <T extends ShapeProps, U extends Shape>(
    blah: withRef<T, U>
  ) {
    yield* all(
      //popin(blah.ref),
      popinSize(blah.ref, scale.get(blah)),
      blah.ref().opacity(1, 1)
    );
  };

  yield* all(add(percentage), chain(waitFor(0.5), add(times)));

  yield* waitFor(2);

  yield* add(equals);

  yield* waitFor(10);

  yield* popout(equation);

  view.add(
    <Rect gap={256} layout>
      {comparisons.map(({ amount, percentage, ray, latex }) => (
        <Rect gap={64} direction="column">
          <Rect
            justifyContent="end"
            minHeight={700 + 76.8}
            direction="column-reverse"
          >
            <Ray {...ray} />
            <Txt
              {...percentage}
              text={createSignal(
                () =>
                  (
                    amount *
                    (Math.abs(ray.ref().to().y) / (amount * 700)) *
                    (generated / total) *
                    100
                  ).toFixed(3) + "%"
              )}
            />
          </Rect>
          <Latex {...latex} />
        </Rect>
      ))}
    </Rect>
  );

  let raysIn = [];

  for (let { ray, latex, percentage } of comparisons) {
    raysIn.push(ray.ref().to(ray.ref().to(), 1));
    ray.ref().to(0);
    latex.ref().scale(0);
    percentage.ref().scale(0);
  }

  yield* all(
    ...raysIn,
    ...comparisons.map(({ percentage, latex }, i) =>
      all(
        chain(waitFor(i * 0.1), popin(percentage.ref)),
        chain(waitFor(i * 0.1 + 0.1), popin(latex.ref))
      )
    )
  );

  yield* waitFor(10);
});
