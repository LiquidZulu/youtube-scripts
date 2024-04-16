import { makeScene2D, Rect, Txt, Img, Latex, Ray } from "@motion-canvas/2d";
import {
  waitFor,
  all,
  chain,
  createSignal,
  createRef,
} from "@motion-canvas/core";

import dogSrc from "../assets/dognoise-dog.png";
import noiseSrc from "../assets/dognoise-noise.png";

// mapping between input and output is set in stone
// at any given stage of learning does not negate
// that learning has occurred.

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const input = {
    dog: createRef<Img>(),
    noise: createRef<Img>(),
  };

  const output = createRef<Img>();
  const training = {
    current: createSignal(0),
    min: 0,
    max: 1024,
    target: 0.5,
  };

  const decay = (iteration: number) => {
    const w = 25;
    const h = 1;
    const x = iteration == 0 ? 0.01 : Math.abs(iteration);

    return Math.abs(-(Math.sin(x / w) / (x / w)) * h + training.target);
  };

  const progressBar = {
    y: 256,
    ref: [createRef<Ray>(), createRef<Ray>()],
  };

  view.add(
    <Rect alignItems="center" layout>
      <Latex height={256} tex="{\color{white} \text{noise} \bigg(}" />
      <Img
        marginLeft={16}
        marginRight={16}
        ref={input.dog}
        height={230}
        src={dogSrc}
      />
      <Latex height={256} tex="{\color{white} \bigg|\ t = }" />
      <Txt
        marginLeft={32}
        fontSize={100}
        fontFamily="Computer Modern"
        fill="white"
        text={createSignal(() => `${training.current().toFixed(0)}`)}
      />
      <Latex height={256} tex="{\color{white} \bigg) =\ }" />
      <Img
        opacity={createSignal(() => decay(training.current()))}
        ref={output}
        height={230}
        src={noiseSrc}
      />
    </Rect>
  );

  view.add(
    <Img
      scale={input.dog().absoluteScale}
      opacity={training.target}
      size={input.dog().size}
      src={noiseSrc}
      ref={input.noise}
      position={input.dog().position}
    />
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
        end={createSignal(() => training.current() / training.max)}
      />
    </>
  );

  yield* training.current(1024, 10);

  yield* waitFor(10);
});
