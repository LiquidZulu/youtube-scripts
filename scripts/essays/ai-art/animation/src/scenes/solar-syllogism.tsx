import { makeScene2D, Txt, Rect, Ray, Shape } from "@motion-canvas/2d";
import {
  waitFor,
  all,
  chain,
  createSignal,
  createRef,
  Reference,
  Color,
} from "@motion-canvas/core";

import { popin, popout, splitStr } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const textColour = new Color(0xffffff);

  const syllogism = createRef<Rect>();
  const premises = createRef<Rect>();
  const p1 = {
    ref: createRef<Rect>(),
    txt: [
      createSignal("Those who develop AI should do so in the most"),
      createSignal("legal and ethical way possible."),
    ],
  };
  const p2 = {
    ref: createRef<Rect>(),
    txt: [
      createSignal("AI systems and the value they create cannot"),
      createSignal("exist without the data of artists' work."),
    ],
  };
  const p3 = {
    ref: createRef<Rect>(),
    txt: [
      createSignal("It is unethical to train AI on data whose"),
      createSignal("progenitors have not given permission and"),
      createSignal("been compensated."),
    ],
  };
  const c = {
    ref: createRef<Rect>(),
    txt: [
      createSignal("Artists should be compensated and"),
      createSignal("permission should be granted before their"),
      createSignal("work is used."),
    ],
  };

  const s = createSignal(1);
  const syllogismTitle = createRef<Rect>();
  const syllogismNumber = createRef<Rect>();
  const ray = createRef<Ray>();

  const customFont = {
    p3: createSignal(textColour),
    c: createSignal(textColour),
  };

  view.add(
    <Rect ref={syllogism} alignItems="center" gap={32} layout>
      <Rect ref={syllogismTitle} layout>
        <Txt fill={textColour} text="(s" />
        <Txt
          ref={syllogismNumber}
          fill={textColour}
          text={createSignal(() => `${s()}`)}
        />
        <Txt fill={textColour} text=")" />
      </Rect>
      <Rect ref={premises} gap={32} direction="column" layout>
        <Rect ref={p1.ref} direction="column" layout>
          <Txt fill={textColour} text={p1.txt[0]} />
          <Txt fill={textColour} text={p1.txt[1]} />
        </Rect>
        <Rect ref={p2.ref} direction="column" layout>
          <Txt fill={textColour} text={p2.txt[0]} />
          <Txt fill={textColour} text={p2.txt[1]} />
        </Rect>
        <Rect
          ref={p3.ref}
          opacity={0}
          maxHeight={0}
          marginTop={-32}
          direction="column"
          layout
        >
          <Txt fill={customFont.p3} text={p3.txt[0]} />
          <Txt fill={customFont.p3} text={p3.txt[1]} />
          <Txt fill={customFont.p3} text={p3.txt[2]} />
        </Rect>
        <Ray ref={ray} lineWidth={4} stroke={textColour} />
        <Rect ref={c.ref} direction="column" layout>
          <Txt fill={customFont.c} text={c.txt[0]} />
          <Txt fill={customFont.c} text={c.txt[1]} />
          <Rect gap={64} layout>
            <Txt fill={customFont.c} text={c.txt[2]} />
            <Txt fill={textColour}>∴</Txt>
          </Rect>
        </Rect>
      </Rect>
    </Rect>
  );

  //syllogism().opacity(0);

  const offset = 0.1;
  const popinOpacity = <T extends Shape>(ref: Reference<T>) =>
    all(popin(ref), ref().opacity(0).opacity(1, 1));

  yield* all(
    popinOpacity(syllogismTitle),
    chain(waitFor(offset), popinOpacity(p1.ref)),
    chain(waitFor(offset * 2), popinOpacity(p2.ref)),
    chain(
      waitFor(offset * 3),
      all(ray().from([0, 0]).to([0, 0]).to([premises().width(), 0], 1))
    ),
    chain(waitFor(offset * 4), popinOpacity(c.ref))
  );

  yield* waitFor(5);

  yield* all(
    syllogismNumber().opacity(0, 0.5),
    p2.ref().opacity(0, 0.5),
    c.ref().opacity(0, 0.5)
  );

  s(2);
  p2.txt[1]("exist without mothers giving birth.");
  c.txt[0]("Mothers should be compensated and");
  c.txt[1]("permission should be granted before any work");

  yield* all(
    syllogismNumber().opacity(1, 0.5),
    chain(waitFor(offset), popinOpacity(p2.ref))
  );

  yield* waitFor(2);
  yield* popinOpacity(c.ref);
  yield* waitFor(5);

  yield* all(
    syllogismNumber().opacity(0, 0.5),
    p2.ref().opacity(0, 0.5),
    c.ref().opacity(0, 0.5)
  );

  s(1);
  p2.txt[1]("exist without the data of artists' work.");
  c.txt[0]("Artists should be compensated and");
  c.txt[1]("permission should be granted before their");

  yield* all(
    syllogismNumber().opacity(1, 0.5),
    chain(waitFor(offset), popinOpacity(p2.ref)),
    chain(waitFor(offset * 2), popinOpacity(c.ref))
  );

  yield* waitFor(3);

  yield* syllogismNumber().opacity(0, 0.5);

  s(3);

  yield* all(
    syllogismNumber().opacity(1, 0.5),
    p3.ref().maxHeight(200, 1),
    p3.ref().margin([0, 0, 0, 0], 1),
    chain(waitFor(0.4), p3.ref().opacity(1, 0.6))
  );

  yield* waitFor(5);

  yield* all(
    syllogismTitle().opacity(0, 0.5),
    p1.ref().opacity(0, 0.5),
    p2.ref().opacity(0, 0.5),
    ray().opacity(0, 0.5),
    c.ref().opacity(0, 0.5)
  );

  yield* all(p3.ref().margin([0, 0, 600, 0], 1), p3.ref().scale(1.2, 1));

  yield* waitFor(0.5);

  const points = [
    "It is not the case that it is per se unethical to use data that has been generated by others without consent, and;",
    "it is the case that artists do in fact implicitly consent to such uses by putting their art online.",
  ].map((point) => [point, createRef<Rect>()] as [string, Reference<Rect>]);

  view.add(
    <Rect y={128} gap={64} direction="column" layout>
      {points.map(([point, ref], i) => (
        <Rect scale={0} ref={ref} gap={32}>
          <Txt fill={0xa0a0a0} text={`${i + 1}.`} />
          <Rect direction="column">
            {splitStr(point).map((x) => (
              <Txt fill={textColour} text={x} />
            ))}
          </Rect>
        </Rect>
      ))}
    </Rect>
  );

  yield* popin(points[0][1]);
  yield* waitFor(3);
  yield* popin(points[1][1]);

  yield* waitFor(5);

  yield* all(
    ...points.map(([_, ref], i) => chain(waitFor(i * 0.1), popout(ref))),
    chain(
      waitFor(0.4),
      all(
        p3.ref().margin(0, 1),
        p3.ref().scale(1, 1),
        customFont.p3(new Color("red"), 1)
      )
    )
  );

  yield* all(
    ...([syllogismTitle(), p1.ref(), p2.ref(), ray(), c.ref()] as any[]).map(
      (x, i) => chain(waitFor(0.05 * i), x.opacity(1, 1))
    )
  );

  yield* customFont.c(new Color("red"), 1);

  yield* waitFor(5);

  yield* all(
    ray().end(0, 1),
    ...([syllogismTitle(), p1.ref(), p2.ref(), p3.ref(), c.ref()] as any[]).map(
      (x, i) =>
        chain(
          waitFor(0.05 * i),
          popout(() => x)
        )
    )
  );
});
