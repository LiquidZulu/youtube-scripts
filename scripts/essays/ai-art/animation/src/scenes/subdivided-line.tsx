import { makeScene2D, Ray } from "@motion-canvas/2d";
import { waitFor, createRef, all, chain } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const computeHeight = (division: number) => ({
    from: (spine.y - spine.endCap) * (1 - (1 / divisions) * (division + 1)),
    to: (spine.y + spine.endCap) * (1 - (1 / divisions) * (division + 1)),
  });

  const spine = {
    x: [-700, 700],
    y: 0,
    endCap: 100,
    sprinterY: -250,
    refs: {
      endCaps: [createRef<Ray>(), createRef<Ray>()],
      spine: createRef<Ray>(),
    },
  };

  const divisions = 10;
  let divisionsAdded = new Set(spine.x);
  let divisionRefs = new Map();

  view.add(
    <>
      <Ray
        opacity={0}
        ref={spine.refs.endCaps[0]}
        lineWidth={4}
        x={0}
        stroke={0xffffff}
        toY={0}
        fromY={0}
      />
      <Ray
        opacity={0}
        ref={spine.refs.spine}
        lineWidth={4}
        fromX={0}
        toX={0}
        stroke={0xffffff}
        y={spine.y}
      />
      <Ray
        opacity={0}
        ref={spine.refs.endCaps[1]}
        lineWidth={4}
        x={0}
        stroke={0xffffff}
        toY={0}
        fromY={0}
      />
    </>
  );

  yield* chain(
    all(
      spine.refs.spine().opacity(1, 0.2),
      spine.refs.endCaps[0]().opacity(1, 0.2),
      spine.refs.endCaps[1]().opacity(1, 0.2),
      spine.refs.endCaps[0]().from([0, spine.y - spine.endCap], 0.2),
      spine.refs.endCaps[0]().to([0, spine.y + spine.endCap], 0.2),
      spine.refs.endCaps[1]().from([0, spine.y - spine.endCap], 0.2),
      spine.refs.endCaps[1]().to([0, spine.y + spine.endCap], 0.2)
    ),
    all(
      spine.refs.spine().from([-(1920 / 2) - 4, spine.y], 1),
      spine.refs.spine().to([1920 / 2 + 4, spine.y], 1),
      spine.refs.endCaps[0]().from(
        [-(1920 / 2) - 4, spine.y - spine.endCap],
        1
      ),
      spine.refs.endCaps[0]().to([-(1920 / 2) - 4, spine.y + spine.endCap], 1),
      spine.refs.endCaps[1]().from([1920 / 2 + 4, spine.y - spine.endCap], 1),
      spine.refs.endCaps[1]().to([1920 / 2 + 4, spine.y + spine.endCap], 1)
    )
  );

  yield* waitFor(1);

  for (let i = 0; i < divisions; ++i) {
    const { from, to } = computeHeight(i);
    let toYield = [];

    for (let r = 0; r < 2 ** (i + 1); ++r) {
      const x = spine.x[0] - (spine.x[0] / 2 ** i) * r;

      if (!divisionsAdded.has(x)) {
        divisionsAdded.add(x);
        divisionRefs.set(x, createRef<Ray>());

        view.add(
          <Ray
            ref={divisionRefs.get(x)}
            opacity={1}
            lineWidth={2}
            x={x}
            stroke={0xffffff}
            toY={0}
            fromY={0}
          />
        );

        toYield.push(
          all(
            divisionRefs.get(x)().to([x, to], 0.5),
            divisionRefs.get(x)().from([x, from], 0.5)
          )
        );
      }
    }

    yield* all(...toYield);
  }

  yield* waitFor(1);
});
