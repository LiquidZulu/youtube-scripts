import { makeScene2D, Img } from "@motion-canvas/2d";
import {
  CodeBlock,
  insert,
  remove,
  edit,
} from "@motion-canvas/2d/lib/components/CodeBlock";
import {
  waitFor,
  createRef,
  chain,
  all,
  ThreadGenerator,
} from "@motion-canvas/core";
import hotdog from "../assets/hotdog-spaceship/hotdog-full.png";
import hotdogBun from "../assets/hotdog-spaceship/hotdog-bun.png";
import hotdogKetchup from "../assets/hotdog-spaceship/hotdog-ketchup.png";
import hotdogMustard from "../assets/hotdog-spaceship/hotdog-mustard.png";
import hotdogSausage from "../assets/hotdog-spaceship/hotdog-sausage.png";

export default makeScene2D(function* (view) {
  // Create your animations here

  const hotdogRefs = {
    bun: createRef<Img>(),
    ketchup: createRef<Img>(),
    mustard: createRef<Img>(),
    sausage: createRef<Img>(),
  };

  const filterNameRef = createRef<CodeBlock>();

  view.fill(0x202228);
  view.add(
    <>
      <Img src={hotdog} />
      <Img ref={hotdogRefs.bun} src={hotdogBun} />
      <Img ref={hotdogRefs.ketchup} src={hotdogKetchup} />
      <Img ref={hotdogRefs.mustard} src={hotdogMustard} />
      <Img ref={hotdogRefs.sausage} src={hotdogSausage} />
      <CodeBlock ref={filterNameRef} y={480} code={`let filter;`} />
    </>
  );

  const filterDuration = 1;
  const filters = {
    blur: [10, 8, 30, 18],
    brightness: [0.2, 0.6, 0.8, 0.5],
    contrast: [2, 0.8, 3, 0.2],
    hue: [2, 13, -3, 5],
    saturate: [0.5, 0.7, 0.1, 0.2],
    sepia: [0.9, 0, 0.2, 0],
  };

  let filterList: { [key: string]: ThreadGenerator[] } = {
    bun: [],
    ketchup: [],
    mustard: [],
    sausage: [],
  };

  for (let thingToPullOut of Object.keys(hotdogRefs).sort(
    () => Math.random() - 0.5
  )) {
    for (let otherThing of Object.keys(hotdogRefs)
      .filter((key) => key != thingToPullOut)
      .sort(() => Math.random() - 0.5)) {
      for (let filter of Object.keys(filters)) {
        filterList[thingToPullOut].push(
          hotdogRefs[otherThing]().filters[filter](
            filters[filter].sort(() => Math.random() - 0.5)[0],
            filterDuration
          )
        );
      }
    }
    filterList[thingToPullOut].push(
      all(
        hotdogRefs[thingToPullOut]().filters.saturate(10, 1),
        hotdogRefs[thingToPullOut]().filters.blur(0, 1),
        hotdogRefs[thingToPullOut]().filters.brightness(1, 1),
        hotdogRefs[thingToPullOut]().filters.contrast(1, 1),
        hotdogRefs[thingToPullOut]().filters.hue(1, 1),
        hotdogRefs[thingToPullOut]().filters.sepia(0, 1)
      )
    );
  }

  yield* chain(
    all(
      ...filterList.bun,
      filterNameRef().edit(0.8)`let filter${insert(" = bun()")};`
    ),
    waitFor(0.2),
    all(
      ...filterList.ketchup,
      filterNameRef().edit(0.8)`let filter = ${edit("bun()", "ketchup()")};`
    ),
    waitFor(0.2),
    all(
      ...filterList.mustard,
      filterNameRef().edit(0.8)`let filter = ${edit("ketchup()", "mustard()")};`
    ),
    waitFor(0.2),
    all(
      ...filterList.sausage,
      filterNameRef().edit(0.8)`let filter = ${edit("mustard()", "sausage()")};`
    ),
    waitFor(0.2),
    all(
      all(
        hotdogRefs.bun().filters.saturate(1, 1),
        hotdogRefs.bun().filters.blur(0, 1),
        hotdogRefs.bun().filters.brightness(1, 1),
        hotdogRefs.bun().filters.contrast(1, 1),
        hotdogRefs.bun().filters.hue(1, 1),
        hotdogRefs.bun().filters.sepia(0, 1)
      ),
      all(
        hotdogRefs.ketchup().filters.saturate(1, 1),
        hotdogRefs.ketchup().filters.blur(0, 1),
        hotdogRefs.ketchup().filters.brightness(1, 1),
        hotdogRefs.ketchup().filters.contrast(1, 1),
        hotdogRefs.ketchup().filters.hue(1, 1),
        hotdogRefs.ketchup().filters.sepia(0, 1)
      ),
      all(
        hotdogRefs.mustard().filters.saturate(1, 1),
        hotdogRefs.mustard().filters.blur(0, 1),
        hotdogRefs.mustard().filters.brightness(1, 1),
        hotdogRefs.mustard().filters.contrast(1, 1),
        hotdogRefs.mustard().filters.hue(1, 1),
        hotdogRefs.mustard().filters.sepia(0, 1)
      ),
      all(
        hotdogRefs.sausage().filters.saturate(1, 1),
        hotdogRefs.sausage().filters.blur(0, 1),
        hotdogRefs.sausage().filters.brightness(1, 1),
        hotdogRefs.sausage().filters.contrast(1, 1),
        hotdogRefs.sausage().filters.hue(1, 1),
        hotdogRefs.sausage().filters.sepia(0, 1)
      ),
      chain(
        filterNameRef().edit(0.8)`${remove("let filter = sausage();")}`,
        filterNameRef().edit(0.8)`${insert("let filter;")}`
      )
    )
  );
});
