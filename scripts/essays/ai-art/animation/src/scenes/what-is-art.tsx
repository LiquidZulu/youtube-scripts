import { makeScene2D, Txt, Ray, Rect, Shape } from "@motion-canvas/2d";
import {
  all,
  chain,
  Color,
  createRef,
  createRefArray,
  createSignal,
  ThreadGenerator,
  waitFor,
} from "@motion-canvas/core";

import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const q = createRef<Txt>();
  const o = createRefArray<Txt | Ray>();
  const s = createRefArray<Txt | Ray>();
  const sColour = createSignal(new Color("white"));

  view.add(
    <Rect gap={64} layout alignItems="center" direction="column">
      <Txt ref={q} fill="white" fontSize={70}>
        What is art?
      </Txt>

      <Rect gap={128}>
        <Ray
          ref={o}
          stroke="white"
          lineWidth={16}
          toY={200}
          toX={-100}
          endArrow
        />
        <Ray
          ref={s}
          stroke={sColour}
          lineWidth={16}
          toY={200}
          toX={100}
          endArrow
        />
      </Rect>

      <Rect gap={64}>
        <Rect gap={32} alignItems="center" direction="column">
          <Txt ref={o} fill="white" fontSize={70}>
            art is objective
          </Txt>{" "}
          <Ray ref={o} stroke="white" lineWidth={16} toY={200} endArrow />
          <Txt textAlign="center" ref={o} fill="white" fontSize={50}>
            {`need to elucidate\nthe objective principles\nunderlying art`}
          </Txt>
        </Rect>

        <Rect gap={32} alignItems="center" direction="column">
          <Txt ref={s} fill={sColour} fontSize={70}>
            art is subjective
          </Txt>{" "}
          <Ray ref={s} stroke={sColour} lineWidth={16} toY={200} endArrow />
          <Txt ref={s} fill={sColour} fontSize={50}>
            AI can produce art
          </Txt>
        </Rect>
      </Rect>
    </Rect>
  );

  q().margin([800, 0, 0, 0]);
  q().scale(0);

  const isText = (x: { text?: string }) => !!x?.text;

  for (let i = 0; i < o.length; ++i) {
    if (isText(o[i] as { text?: string })) {
      o[i].opacity(0);
    } else {
      (o as Ray[])[i].end(0);
    }

    if (isText(s[i] as { text?: string })) {
      s[i].opacity(0);
    } else {
      (s as Ray[])[i].end(0);
    }
  }

  yield* popin(q);
  yield* waitFor(5);
  yield* all(
    q().margin([400, 0, 0, 0], 1),
    (o[0] as Ray).end(1, 1),
    chain(waitFor(0.5), (o[1] as Txt).opacity(1, 1))
  );

  yield* all(
    q().margin(0, 1),
    (o[2] as Ray).end(1, 1),
    chain(waitFor(0.5), (o[3] as Txt).opacity(1, 1))
  );

  yield* waitFor(5);

  yield* all(
    (s[0] as Ray).end(1, 1),
    chain(waitFor(0.5), (s[1] as Txt).opacity(1, 1))
  );

  yield* waitFor(5);

  yield* all(
    (s[2] as Ray).end(1, 1),
    chain(waitFor(0.5), (s[3] as Txt).opacity(1, 1))
  );

  yield* waitFor(5);

  yield* sColour(new Color(0x505050), 1);

  yield* waitFor(5);

  yield* all(
    popout(q),
    all(
      ...(o.map((x, i) =>
        isText(x as { text?: string })
          ? chain(waitFor(i * 0.2), (x as Txt).opacity(0, 1))
          : chain(waitFor(i * 0.2), (x as Ray).start(1, 1))
      ) as ThreadGenerator[])
    ),
    chain(
      waitFor(0.3),
      all(
        ...(s.map((x, i) =>
          isText(x as { text?: string })
            ? chain(waitFor(i * 0.2), (x as Txt).opacity(0, 1))
            : chain(waitFor(i * 0.2), (x as Ray).start(1, 1))
        ) as ThreadGenerator[])
      )
    )
  );
});
