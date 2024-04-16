import {
  makeScene2D,
  Txt,
  TxtProps,
  Ray,
  RayProps,
  Rect,
  RectProps,
} from "@motion-canvas/2d";
import {
  waitFor,
  createRef,
  createSignal,
  chain,
  all,
} from "@motion-canvas/core";

import { withRef } from "../types";
import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const rayCommon: RayProps = {
    stroke: "red",
    lineWidth: 8,
    end: 0,
  };

  const txtCommon: TxtProps = {
    fill: "white",
  };

  const usesCommon: TxtProps = {
    fontSize: 90,
  };

  const allText: {
    title: withRef<TxtProps, Txt>;
    uses: {
      num: withRef<TxtProps, Txt>;
      txt: withRef<TxtProps, Txt>;
      rect: withRef<RectProps, Rect>;
      ray: withRef<RayProps, Ray>;
    }[];
  } = {
    title: {
      ...txtCommon,
      scale: 0,
      ref: createRef<Txt>(),
      fontFamily: "Cubano",
      fontSize: 70,
      text: "Possible uses of the photography analogy:",
    },
    uses: [
      "AI causing job losses;",
      "AI being plagiarism;",
      "AI being art.",
    ].map((x, i) => ({
      ray: {
        ...rayCommon,
        ref: createRef<Ray>(),
      },
      rect: {
        scale: 0,
        gap: 32,
        ref: createRef<Rect>(),
        layout: true,
      },
      num: {
        ...usesCommon,
        ref: createRef<Txt>(),
        fontFamily: "Mononoki",
        fill: 0xa3a3a3,
        text: i + 1 + ".",
      },
      txt: {
        ...usesCommon,
        ...txtCommon,
        ref: createRef<Txt>(),
        text: x,
      },
    })),
  };

  view.add(
    <Rect gap={80} direction="column" layout>
      <Txt {...allText.title} />
      <Rect gap={16} direction="column">
        {allText.uses.map((use) => (
          <Rect {...use.rect}>
            <Txt {...use.num} />
            <Txt {...use.txt} />
          </Rect>
        ))}
      </Rect>
    </Rect>
  );

  for (let { ray, txt, num } of allText.uses) {
    view.add(
      <Ray
        from={createSignal(() => {
          const { x, y } = num
            .ref()
            .absolutePosition()
            .transformAsPoint(view.worldToLocal());

          return {
            x: x - num.ref().width() / 2,
            y: y + num.ref().height() / 2,
          };
        })}
        to={createSignal(() => {
          const { x, y } = txt
            .ref()
            .absolutePosition()
            .transformAsPoint(view.worldToLocal());

          return {
            x: x + txt.ref().width() / 2,
            y: y - txt.ref().height() / 2,
          };
        })}
        {...ray}
      />
    );
  }

  yield* all(
    popin(allText.title.ref),
    ...allText.uses.map(({ rect }, i) =>
      chain(waitFor(0.1 * (i + 1)), popin(rect.ref))
    )
  );

  yield* chain(
    ...allText.uses.map(({ ray }) => chain(waitFor(5), ray.ref().end(1, 1))),
    waitFor(20)
  );

  yield* all(
    popout(allText.title.ref),
    ...allText.uses.map(({ rect, ray }, i) =>
      chain(waitFor(0.1 * (i + 1)), all(ray.ref().end(0, 1), popout(rect.ref)))
    )
  );
});
