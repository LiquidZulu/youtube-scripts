import { makeScene2D, Rect, Txt, Img, Latex, Ray } from "@motion-canvas/2d";
import {
  waitFor,
  all,
  chain,
  createSignal,
  createRef,
} from "@motion-canvas/core";
import {
  CodeBlock,
  insert,
  remove,
} from "@motion-canvas/2d/lib/components/CodeBlock";

import { noiseFiles, imagesFiles } from "../assets/training-set";
import seedrandom from "seedrandom";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const rng = seedrandom("abcdefg");

  const images = imagesFiles.sort(() => rng() - 1);
  const noises = noiseFiles.sort(() => rng() - 1);

  const getPrompt = (fileName: string) => {
    const full = fileName.split("/").pop().split(".")[0];
    let cropped = "";

    if (full.length > 30) {
      let fullArr = full.split(" ");
      while (cropped.length <= 30) {
        cropped += fullArr.shift() + " ";
      }

      cropped += "…";

      return cropped;
    }

    return full;
  };

  const getNoise = (i: number) => noises[i % noises.length];

  const input = createRef<Img>();

  const output = {
    noise: createRef<Img>(),
    image: createRef<Img>(),
  };
  const processing = {
    current: createSignal(0),
    min: 0,
    max: 1,
  };

  const progressBar = {
    y: 256,
    ref: [createRef<Ray>(), createRef<Ray>()],
  };

  const code = createRef<CodeBlock>();

  yield view.add(
    <Rect>
      <Rect gap={128} y={-128} alignItems="center" direction="column" layout>
        <Rect>
          <CodeBlock ref={code} code={`const prompt = "";`} />
        </Rect>
        <Rect alignItems="center">
          <Latex height={256} tex="{\color{white} \text{gen} \bigg(}" />
          <Img marginLeft={16} marginRight={16} ref={input} height={230} />
          <Latex height={256} tex="{\color{white} \bigg|}" />
          <Txt
            marginLeft={32}
            fontSize={100}
            fontFamily="Mononoki"
            fill="white"
            text="prompt"
          />
          <Latex height={256} tex="{\color{white} \bigg) =\ }" />
          <Img ref={output.image} height={230} />
        </Rect>
      </Rect>

      <Rect>
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
          end={processing.current}
        />
      </Rect>
    </Rect>
  );

  view.add(
    <Img
      scale={output.image().absoluteScale}
      size={output.image().size}
      ref={output.noise}
      position={createSignal(() => ({
        ...output.image().position(),
        y: output.image().position().y - 35, // I couldn't figure out the matrix transformations so this is what I am doing, I do not care any more
      }))}
      opacity={createSignal(() => 1 - processing.current())}
    />
  );

  for (let i = 0; i < images.length; ++i) {
    const prompt = getPrompt(images[i]);

    processing.current(0);
    progressBar.ref[1]().opacity(1);
    input().src(getNoise(i));
    output.noise().src(getNoise(i));
    output.image().src(images[i]);

    yield* code().edit(1.5)`const prompt = "${insert(prompt)}";`;
    yield* processing.current(1, 2);
    yield* all(
      progressBar.ref[1]().opacity(0, 1.5),
      code().edit(1.5)`const prompt = "${remove(prompt)}";`
    );
  }
});
