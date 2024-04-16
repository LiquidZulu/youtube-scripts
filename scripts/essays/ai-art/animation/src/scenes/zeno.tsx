import { makeScene2D, Img, Ray } from "@motion-canvas/2d";
import { waitFor, createRef, all, chain } from "@motion-canvas/core";

import sprinter from "../assets/sprinter.png";

import { popout } from "../util";

const getDistance = (start: number, end: number, fraction: number) =>
  end - (end - (end - start) * fraction) - end;

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const spine = {
    x: [-700, 700],
    y: 0,
    endCap: 20,
    sprinterY: -250,
    refs: {
      endCaps: [createRef<Ray>(), createRef<Ray>()],
      spine: createRef<Ray>(),
    },
  };

  const sprinterRefs = new Map([
    [0, createRef<Img>()],
    [1 / 4, createRef<Img>()],
    [1 / 2, createRef<Img>()],
    [1, createRef<Img>()],
  ]);

  const sprinterRays = new Map([
    [
      1,
      {
        ref: createRef<Img>(),
        colour: "lightseagreen",
      },
    ],
    [
      1 / 2,
      {
        ref: createRef<Img>(),
        colour: "aquamarine",
      },
    ],
    [
      1 / 4,
      {
        ref: createRef<Img>(),
        colour: "blueviolet",
      },
    ],
    [
      1 / 8,
      {
        ref: createRef<Img>(),
        colour: "brown",
      },
    ],
    [
      1 / 16,
      {
        ref: createRef<Img>(),
        colour: "chocolate",
      },
    ],
    [
      1 / 32,
      {
        ref: createRef<Img>(),
        colour: "coral",
      },
    ],
    [
      1 / 64,
      {
        ref: createRef<Img>(),
        colour: "darkgoldenrod",
      },
    ],
  ]);
  // {"x":389,"y":569}
  view.add(
    <>
      <Img
        opacity={0}
        ref={sprinterRefs.get(0)}
        height={379}
        src={sprinter}
        x={spine.x[0]}
        y={spine.sprinterY}
      />
      <Img
        opacity={0}
        ref={sprinterRefs.get(1 / 4)}
        height={379}
        src={sprinter}
        x={spine.x[0]}
        y={spine.sprinterY}
      />
      <Img
        opacity={0}
        ref={sprinterRefs.get(1 / 2)}
        height={379}
        src={sprinter}
        x={spine.x[0]}
        y={spine.sprinterY}
      />
      <Img
        opacity={0}
        ref={sprinterRefs.get(1)}
        height={379}
        src={sprinter}
        x={spine.x[0]}
        y={spine.sprinterY}
      />
    </>
  );
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

  yield* all(
    chain(waitFor(0.8), sprinterRefs.get(0)().opacity(1, 1)),
    chain(
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
        spine.refs.spine().from([spine.x[0], spine.y], 1),
        spine.refs.spine().to([spine.x[1], spine.y], 1),
        spine.refs.endCaps[0]().from([spine.x[0], spine.y - spine.endCap], 1),
        spine.refs.endCaps[0]().to([spine.x[0], spine.y + spine.endCap], 1),
        spine.refs.endCaps[1]().from([spine.x[1], spine.y - spine.endCap], 1),
        spine.refs.endCaps[1]().to([spine.x[1], spine.y + spine.endCap], 1)
      )
    )
  );

  yield* waitFor(1);

  for (let i = 0; i < sprinterRays.size; ++i) {
    const distance = 1 / 2 ** i;

    view.add(
      <Ray
        opacity={0}
        endArrow
        ref={sprinterRays.get(distance).ref}
        y={spine.y + 64 * (i + 1)}
        stroke={sprinterRays.get(distance).colour}
        lineWidth={12}
        fromX={spine.x[0]}
        toX={getDistance(spine.x[0], spine.x[1], distance)}
      />
    );
  }

  yield* all(
    sprinterRefs.get(1)().opacity(1, 1),
    sprinterRefs.get(1)().x(spine.x[1], 1),
    sprinterRays.get(1).ref().opacity(1, 1),
    sprinterRays.get(1).ref().start(0).end(0).start(1, 1)
  );

  yield* waitFor(1);

  yield* all(
    sprinterRefs
      .get(1 / 2)()
      .opacity(1, 1 / 2),
    sprinterRefs
      .get(1 / 2)()
      .x(getDistance(spine.x[0], spine.x[1], 1 / 2), 1 / 2),
    sprinterRays
      .get(1 / 2)
      .ref()
      .opacity(1, 1 / 2),
    sprinterRays
      .get(1 / 2)
      .ref()
      .start(0)
      .end(0)
      .start(1, 1 / 2)
  );

  yield* waitFor(1);

  yield* all(
    sprinterRefs
      .get(1 / 4)()
      .opacity(1, 1 / 4),
    sprinterRefs
      .get(1 / 4)()
      .x(getDistance(spine.x[0], spine.x[1], 1 / 4), 1 / 4),
    sprinterRays
      .get(1 / 4)
      .ref()
      .opacity(1, 1 / 4),
    sprinterRays
      .get(1 / 4)
      .ref()
      .start(0)
      .end(0)
      .start(1, 1 / 4)
  );

  yield* waitFor(1);

  yield* all(
    all(
      sprinterRays
        .get(1 / 8)
        .ref()
        .opacity(1, 1 / 4),
      sprinterRays
        .get(1 / 8)
        .ref()
        .start(0)
        .end(0)
        .start(1, 1 / 4)
    ),
    all(
      sprinterRays
        .get(1 / 16)
        .ref()
        .opacity(1, 1 / 4),
      sprinterRays
        .get(1 / 16)
        .ref()
        .start(0)
        .end(0)
        .start(1, 1 / 4)
    ),
    all(
      sprinterRays
        .get(1 / 32)
        .ref()
        .opacity(1, 1 / 4),
      sprinterRays
        .get(1 / 32)
        .ref()
        .start(0)
        .end(0)
        .start(1, 1 / 4)
    ),
    all(
      sprinterRays
        .get(1 / 64)
        .ref()
        .opacity(1, 1 / 4),
      sprinterRays
        .get(1 / 64)
        .ref()
        .start(0)
        .end(0)
        .start(1, 1 / 4)
    )
  );

  yield* waitFor(1);

  yield* all(
    ...[
      ...Array.from(sprinterRefs).map(([_, ref], i) =>
        chain(waitFor(0.1 * i), popout(ref))
      ),
      ...Array.from(sprinterRays).map(([_, { ref }], i) =>
        chain(waitFor(0.1 * i), ref().end(1, 1))
      ),
    ],
    chain(
      all(
        spine.refs.spine().from([0, spine.y], 1),
        spine.refs.spine().to([0, spine.y], 1),
        spine.refs.endCaps[0]().from([0, spine.y - spine.endCap], 1),
        spine.refs.endCaps[0]().to([0, spine.y + spine.endCap], 1),
        spine.refs.endCaps[1]().from([0, spine.y - spine.endCap], 1),
        spine.refs.endCaps[1]().to([0, spine.y + spine.endCap], 1)
      ),
      all(
        spine.refs.endCaps[0]().from([0, spine.y], 0.5),
        spine.refs.endCaps[0]().to([0, spine.y], 0.5),
        spine.refs.endCaps[1]().from([0, spine.y], 0.5),
        spine.refs.endCaps[1]().to([0, spine.y], 0.5)
      )
    )
  );
});
