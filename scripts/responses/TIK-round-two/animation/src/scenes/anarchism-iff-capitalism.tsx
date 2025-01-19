import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Reference,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

// This is why anarcho-capitalism is the only
// proper variant of anarchist thought. The
// capitalism implies the anarchism and vice
// versa. Capitalism implies anarchism because
// the recognition of full private property
// rights implies there can be no legal
// authorities that may flout or change those
// rights; and anarchism implies capitalism
// because with no authorities to appeal to,
// we are left with the non-aggression principle,
// which implies full private property rights.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  enum st {
    t,
    r,
  }

  function* anim(t: st, statement: Reference<Txt> | Reference<Ray>) {
    switch (t) {
      case st.t:
        yield* fadein(statement as Reference<Txt>);
        return;
      case st.r:
        yield* (statement as Reference<Ray>)().end(1, 1);
        return;
    }
  }

  function* unanim(t: st, statement: Reference<Txt> | Reference<Ray>) {
    switch (t) {
      case st.t:
        yield* fadeout(statement as Reference<Txt>);
        return;
      case st.r:
        yield* (statement as Reference<Ray>)().start(1, 1);
        return;
    }
  }

  function setup(t: st, statement: Reference<Txt> | Reference<Ray>) {
    switch (t) {
      case st.t:
        (statement as Reference<Txt>)().opacity(0);
        return;
      case st.r:
        (statement as Reference<Ray>)().end(0);
        return;
    }
  }

  const title = [createRef<Txt>(), createRef<Ray>(), createRef<Txt>()] as [
    Reference<Txt>,
    Reference<Ray>,
    Reference<Txt>,
  ];

  const statements = [
    [
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
      [st.r, createRef<Ray>()] as [st, Reference<Ray>],
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
    ],
    [
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
      [st.r, createRef<Ray>()] as [st, Reference<Ray>],
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
    ],
    [
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
      [st.r, createRef<Ray>()] as [st, Reference<Ray>],
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
    ],
    [
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
      [st.r, createRef<Ray>()] as [st, Reference<Ray>],
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
      [st.r, createRef<Ray>()] as [st, Reference<Ray>],
      [st.t, createRef<Txt>()] as [st, Reference<Txt>],
    ],
  ];

  view.add(
    <Rect layout alignItems="center" direction="column" gap={64}>
      <Rect alignItems="center" gap={32}>
        <Txt ref={title[0]} fontSize={60} fill={colors.zinc50}>
          Capitalism
        </Txt>
        <Ray
          ref={title[1]}
          lineWidth={8}
          arrowSize={12}
          startArrow
          endArrow
          stroke={colors.zinc50}
          toX={100}
        />
        <Txt ref={title[2]} fontSize={60} fill={colors.zinc50}>
          Anarchism
        </Txt>
      </Rect>
      <Rect gap={128}>
        <Rect gap={32} direction="column" alignItems="center">
          <Rect alignItems="center" gap={32}>
            <Txt ref={statements[0][0][1]} fontSize={40} fill={colors.zinc50}>
              Capitalism
            </Txt>
            <Ray
              ref={statements[0][1][1]}
              lineWidth={4}
              arrowSize={8}
              endArrow
              stroke={colors.zinc50}
              toX={50}
            />
            <Txt ref={statements[0][2][1]} fontSize={40} fill={colors.zinc50}>
              Anarchism
            </Txt>
          </Rect>
          <Rect alignItems="center" gap={32}>
            <Txt ref={statements[1][0][1]} fontSize={40} fill={colors.zinc50}>
              ∵ Property
            </Txt>
            <Ray
              ref={statements[1][1][1]}
              lineWidth={4}
              arrowSize={8}
              endArrow
              stroke={colors.zinc50}
              toX={50}
            />
            <Txt ref={statements[1][2][1]} fontSize={40} fill={colors.zinc50}>
              No authorities
            </Txt>
          </Rect>
        </Rect>
        <Rect gap={32} direction="column" alignItems="center">
          <Rect alignItems="center" gap={32}>
            <Txt ref={statements[2][0][1]} fontSize={40} fill={colors.zinc50}>
              Anarchism
            </Txt>
            <Ray
              ref={statements[2][1][1]}
              lineWidth={4}
              arrowSize={8}
              endArrow
              stroke={colors.zinc50}
              toX={50}
            />
            <Txt ref={statements[2][2][1]} fontSize={40} fill={colors.zinc50}>
              Capitalism
            </Txt>
          </Rect>
          <Rect alignItems="center" gap={32}>
            <Txt ref={statements[3][0][1]} fontSize={40} fill={colors.zinc50}>
              ∵ No authorities
            </Txt>
            <Ray
              ref={statements[3][1][1]}
              lineWidth={4}
              arrowSize={8}
              endArrow
              stroke={colors.zinc50}
              toX={50}
            />
            <Txt ref={statements[3][2][1]} fontSize={40} fill={colors.zinc50}>
              NAP
            </Txt>
            <Ray
              ref={statements[3][3][1]}
              lineWidth={4}
              arrowSize={8}
              endArrow
              stroke={colors.zinc50}
              toX={50}
            />
            <Txt ref={statements[3][4][1]} fontSize={40} fill={colors.zinc50}>
              Property
            </Txt>
          </Rect>
        </Rect>
      </Rect>
    </Rect>,
  );

  for (let statement of statements) {
    for (let [t, p] of statement) {
      setup(t, p);
    }
  }

  yield* all(
    fadein(title[0]),
    fadein(title[2]),
    title[1]().end(0.5).end(1, 1),
    title[1]().start(0.5).start(0, 1),
  );

  yield* waitUntil("capitalism -> anarchism");
  {
    let i = 0;

    for (let statement of statements) {
      yield* all(
        ...statement.map(([t, p], i) => chain(waitFor(0.2 * i), anim(t, p))),
      );
      yield* waitUntil(`statement ${++i}`);
    }
  }
  yield* all(
    fadeout(title[0]),
    fadeout(title[2]),
    title[1]().end(0.5, 1),
    title[1]().start(0.5, 1),
    chain(
      waitFor(0.2),
      all(
        ...statements.map((statement, i) =>
          chain(
            waitFor(0.2 * i),
            all(
              ...statement.map(([t, p], j) =>
                chain(waitFor(0.2 * j), unanim(t, p)),
              ),
            ),
          ),
        ),
      ),
    ),
  );
});
