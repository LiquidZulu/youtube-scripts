import { makeScene2D, Txt, Rect, Ray, Img } from "@motion-canvas/2d";
import { waitFor, createRef, createSignal, all } from "@motion-canvas/core";

import { stormtrooper, environments } from "../assets/stormtrooper";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const input = createRef<Img>();
  const output = createRef<Img>();
  const progressBar = {
    y: 350,
    ref: [createRef<Ray>(), createRef<Ray>()],
  };

  const progress = createSignal(0);

  view.add(
    <Rect alignItems="center" layout gap={64}>
      <Rect alignItems="center" gap={64}>
        <Img src={stormtrooper.standard} height={260} />
        <Txt fontFamily="cubano" fontSize={90} fill="white">
          +
        </Txt>
        <Img opacity={0} ref={input} src={environments.clean[0]} height={260} />
      </Rect>
      <Ray toX={300} endArrow stroke="white" lineWidth={16} />
      <Img opacity={0} ref={output} src={environments.comb[0]} height={260} />
    </Rect>
  );

  view.add(
    <>
      <Ray
        ref={progressBar.ref[0]}
        fromX={-512}
        toX={512}
        y={progressBar.y}
        stroke={"green"}
        opacity={0.2}
        lineWidth={32}
      />
      <Ray
        ref={progressBar.ref[1]}
        fromX={-512}
        toX={512}
        y={progressBar.y}
        stroke={"green"}
        lineWidth={32}
        end={progress}
      />
    </>
  );

  const duration = {
    in: 2,
    out: 1,
  };

  for (
    let i = 0;
    i < environments.clean.length && i < environments.comb.length;
    ++i
  ) {
    input().src(environments.clean[i]);
    output().src(environments.comb[i]);

    yield* input().opacity(1, duration.out);

    yield* all(progress(1, duration.in), output().opacity(1, duration.in));

    yield* all(
      input().opacity(0, duration.out),
      output().opacity(0, duration.out),
      progressBar.ref[1]().opacity(0, duration.out)
    );

    progress(0);
    progressBar.ref[1]().opacity(1);
  }
});
