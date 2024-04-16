import { makeScene2D, Img } from "@motion-canvas/2d";
import { waitFor, createRef, chain, all } from "@motion-canvas/core";
import { default as clamShell } from "../assets/art-as-integrated/clam shell.min.png";
import flowers from "../assets/art-as-integrated/flowers.min.png";
import ladyOnTheRight from "../assets/art-as-integrated/lady on the right.min.png";
import venus from "../assets/art-as-integrated/venus.min.png";
import wingedMan from "../assets/art-as-integrated/winged man.min.png";
import full from "../assets/art-as-integrated/full.min.png";
import { default as implications } from "../assets/art-as-integrated/implications";

export default makeScene2D(function* (view) {
  const components = [
    {
      ref: createRef<Img>(),
      src: clamShell,
      pos: { x: 0, y: 350 },
    },
    {
      ref: createRef<Img>(),
      src: wingedMan,
      pos: { x: -500, y: 300 },
    },
    {
      ref: createRef<Img>(),
      src: flowers,
      pos: { x: -300, y: -200 },
    },
    {
      ref: createRef<Img>(),
      src: ladyOnTheRight,
      pos: { x: 300, y: -200 },
    },
    {
      ref: createRef<Img>(),
      src: venus,
      pos: { x: 600, y: 300 },
    },
  ];

  const fullImageRef = createRef<Img>();

  // Create your animations here
  view.fill(0x202228);
  view.add(<Img scale={1 / 2} src={full} ref={fullImageRef} />);

  for (let component of components) {
    view.add(<Img scale={1 / 2} ref={component.ref} src={component.src} />);
  }

  let steps = [];

  for (let i = 0; i < components.length; ++i) {
    steps.push(
      chain(
        waitFor(0.1 * i),
        all(
          components[i].ref().scale(1 / 3, 1),
          components[i].ref().x(components[i].pos.x, 1),
          components[i].ref().y(components[i].pos.y, 1)
        )
      )
    );
  }

  yield* chain(
    all(...steps, chain(waitFor(0.4), fullImageRef().opacity(0, 1))),
    waitFor(2)
  );

  steps = [];
  let implicationRefs = new Array(implications.length);
  for (let i = 0; i < implications.length; ++i) {
    implicationRefs[i] = createRef<Img>();
    view.add(
      <Img
        opacity={0}
        scale={1}
        ref={implicationRefs[i]}
        src={implications[i]}
      />
    );

    steps.push(chain(waitFor(0.1 * i), implicationRefs[i]().opacity(1, 1)));
  }

  yield* chain(all(...steps), waitFor(2));
});
