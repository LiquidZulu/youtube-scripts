import { makeScene2D, Img, Rect } from "@motion-canvas/2d";
import {
  waitFor,
  all,
  chain,
  Reference,
  createRef,
  ThreadGenerator,
} from "@motion-canvas/core";
import { chunk, shuffle, sample } from "lodash";

import { imagesFiles as images } from "../assets/training-set";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  // imRefs[row][image][layer]
  type ImageGrid = Reference<Img>[][][];
  let imRefs: ImageGrid = [];

  const mkImageGrid = (im: string[]) => (
    <Rect direction="column" layout>
      {chunk(im, 10).map((row, i) => {
        if (!imRefs[i]) {
          imRefs.push([]);
        }

        return (
          <Rect>
            {row.map((item, j) => {
              if (!imRefs[i][j]) {
                imRefs[i].push([]);
              }

              const ref = createRef<Img>();
              imRefs[i][j].push(ref);
              return <Img ref={ref} src={item} width={230} />;
            })}
          </Rect>
        );
      })}
    </Rect>
  );

  const pickImage = (grid: ImageGrid) => {
    const row = sample(grid);
    let image = sample(row);
    return image;
  };

  const layers = 8;
  const iterations = 1024 * 6;

  for (let layer = 0; layer < layers; ++layer) {
    view.add(mkImageGrid(shuffle(images)));
  }

  let imageLayer = new Map(
    imRefs.flat().map((image) => [
      image,
      {
        layer: layers - 1,
        reverse: false,
      },
    ])
  );

  let toYield: ThreadGenerator[] = [];

  for (let i = 0; i < iterations; ++i) {
    const image = pickImage(imRefs);
    let { layer, reverse } = imageLayer.get(image);

    if (layer == 0) {
      reverse = true;
    } else if (layer == layers - 1) {
      reverse = false;
    }

    toYield.push(
      chain(waitFor(0.01 * i), image[layer]().opacity(reverse ? 1 : 0, 1))
    );

    imageLayer.set(image, { layer: reverse ? ++layer : --layer, reverse });
  }

  yield* all(...toYield);
});
