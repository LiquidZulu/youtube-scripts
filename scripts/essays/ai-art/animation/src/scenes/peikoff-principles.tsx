import { makeScene2D, Txt, Rect, Ray } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createRefArray,
  waitFor,
} from "@motion-canvas/core";

import { popin, popout } from "../util";
import { withRef } from "../types";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const principles = createRefArray<Txt>();
  const wrappers = createRefArray<Rect>();
  const title = createRef<Txt>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={128}>
      <Txt ref={title} scale={0} fontFamily="Cubano" fill="white" fontSize={70}>
        Objective Aesthetic Principles:
      </Txt>
      <Rect direction="column">
        {...["Selectivity", "Clarity", "Integration"].map((x, i) => (
          <Rect scale={0} ref={wrappers} gap={32}>
            <Txt fontSize={60} fill={0x909090}>
              {`${i + 1}`}.
            </Txt>
            <Txt ref={principles} opacity={0} fontSize={60} fill="white">
              {x}
            </Txt>
          </Rect>
        ))}
      </Rect>
    </Rect>
  );

  yield* all(
    popin(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popin(() => wrapper)
        )
      )
    )
  );

  yield* waitFor(5);

  yield* all(
    ...principles.map((principle, i) =>
      chain(waitFor(2 * i), principle.opacity(1, 1))
    )
  );

  yield* waitFor(1);

  const underline = createRefArray<Ray>();

  view.add(
    <Ray
      ref={underline}
      stroke="white"
      from={(() => {
        const { x, y } = principles[0].position();

        return {
          x: x - principles[0].width() / 2,
          y: y + principles[0].height() - 12,
        };
      })()}
      to={(() => {
        const { x, y } = principles[0].position();

        return {
          x: x + principles[0].width() / 2,
          y: y + principles[0].height() - 12,
        };
      })()}
      lineWidth={4}
    />
  );

  yield* all(
    principles[1].opacity(0.5, 1),
    principles[2].opacity(0.5, 1),
    underline[0].end(0).end(1, 1)
  );

  yield* waitFor(10);

  yield* all(
    underline[0].start(1, 1),
    popout(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popout(() => wrapper)
        )
      )
    )
  );

  principles[0].opacity(0.5);
  principles[1].opacity(1);

  yield* all(
    popin(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popin(() => wrapper)
        )
      )
    )
  );

  yield* waitFor(5);

  yield* all(
    popout(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popout(() => wrapper)
        )
      )
    )
  );

  principles[1].opacity(0.5);
  principles[2].opacity(1);

  yield* all(
    popin(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popin(() => wrapper)
        )
      )
    )
  );

  yield* waitFor(5);

  yield* all(
    popout(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popout(() => wrapper)
        )
      )
    )
  );

  principles[0].opacity(1);
  principles[1].opacity(1);

  yield* all(
    popin(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popin(() => wrapper)
        )
      )
    )
  );

  yield* waitFor(5);

  view.add(
    <Ray
      ref={underline}
      stroke="white"
      from={(() => {
        let { x, y } = principles[2].position();
        y += principles[1].height() + principles[2].height();

        return {
          x: x - principles[2].width() / 2,
          y: y + principles[2].height() - 12,
        };
      })()}
      to={(() => {
        let { x, y } = principles[2].position();
        y += principles[1].height() + principles[2].height();

        return {
          x: x + principles[2].width() / 2,
          y: y + principles[2].height() - 12,
        };
      })()}
      lineWidth={4}
    />
  );

  underline[0].start(0).end(0);
  underline[1].start(0).end(0);

  yield* underline[0].end(1, 1);

  yield* waitFor(5);

  yield* underline[1].end(1, 1);

  yield* waitFor(5);

  yield* all(
    underline[0].start(1, 1),
    underline[1].start(1, 1),
    popout(title),
    all(
      ...wrappers.map((wrapper, i) =>
        chain(
          waitFor(0.1 * (i + 1)),
          popout(() => wrapper)
        )
      )
    )
  );
});
