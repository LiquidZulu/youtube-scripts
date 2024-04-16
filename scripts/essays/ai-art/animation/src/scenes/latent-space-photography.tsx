import {
  makeScene2D,
  Video,
  Img,
  Rect,
  Ray,
  Shape,
  Txt,
} from "@motion-canvas/2d";
import {
  waitFor,
  createSignal,
  Signal,
  createRef,
  Reference,
  chain,
  all,
  Vector2,
  SimpleSignal,
  SimpleVector2Signal,
} from "@motion-canvas/core";

import {
  PlopSpring,
  SmoothSpring,
  spring,
} from "@motion-canvas/core/lib/tweening";

import { SquigglyBorder } from "../components";
import { vectorSum } from "../util";

import latentSpace from "../assets/latent-space-photography/latent-space.mp4";
import photography from "../assets/latent-space-photography/photography.jpg";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);
  const video = createRef<Video>();
  const text = createRef<Txt>();
  const image = createRef<Img>();

  const opacity = {
    video: createSignal(0),
    text: createSignal(0),
    image: createSignal(0),
  };

  view.add(
    <Rect gap={64} alignContent="center" layout>
      <Video
        opacity={opacity.video}
        ref={video}
        src={latentSpace}
        height={400}
      />
      <Txt
        ref={text}
        opacity={opacity.text}
        fontSize={100}
        paddingTop={140}
        text="≈"
        fill={0xffffff}
      />
      <Img opacity={opacity.image} ref={image} src={photography} height={400} />
    </Rect>
  );

  const vec2ToArr = (vec: Vector2): [number, number] => {
    const { x, y } = vec;
    return [x, y];
  };

  const squigglyVid = new SquigglyBorder({
    runtime: createSignal(13),
    rayColor: createSignal(0xffffff),
    corners: createSignal(() => ({
      bottomLeft: vec2ToArr(video().bottomLeft()),
      bottomRight: vec2ToArr(video().bottomRight()),
      topLeft: vec2ToArr(video().topLeft()),
      topRight: vec2ToArr(video().topRight()),
    })),
  });

  const squigglyImg = new SquigglyBorder({
    runtime: createSignal(13),
    rayColor: createSignal(0xffffff),
    corners: createSignal(() => ({
      bottomLeft: vec2ToArr(image().bottomLeft()),
      bottomRight: vec2ToArr(image().bottomRight()),
      topLeft: vec2ToArr(image().topLeft()),
      topRight: vec2ToArr(image().topRight()),
    })),
  });

  for (let [vidRay, imgRay] of squigglyVid.rays.map((v, i) => [
    v,
    squigglyImg.rays[i],
  ])) {
    view.add(
      <Ray
        opacity={opacity.video}
        ref={vidRay.ref}
        lineWidth={squigglyVid.rayWidth}
        stroke={squigglyVid.rayColor}
        from={createSignal(() =>
          vectorSum([vidRay.from(), squigglyVid.offsetsList()[0][vidRay.id[0]]])
        )}
        to={createSignal(() =>
          vectorSum([vidRay.to(), squigglyVid.offsetsList()[0][vidRay.id[1]]])
        )}
      />
    );
    view.add(
      <Ray
        opacity={opacity.image}
        ref={imgRay.ref}
        lineWidth={squigglyVid.rayWidth}
        stroke={squigglyVid.rayColor}
        from={createSignal(() =>
          vectorSum([imgRay.from(), squigglyVid.offsetsList()[0][imgRay.id[0]]])
        )}
        to={createSignal(() =>
          vectorSum([imgRay.to(), squigglyVid.offsetsList()[0][imgRay.id[1]]])
        )}
      />
    );
  }

  // the spring function does not work well with small intervals, so this is a percentage
  const popinInitial = 50;
  const popin = <T extends Shape>(ref: Reference<T>) =>
    spring(SmoothSpring, popinInitial, 100, 1, (value) => {
      ref().scale(value / 100);
    });

  video().play();

  yield* all(
    squigglyVid.animateAll(),
    squigglyImg.animateAll(),
    opacity.video(1, 0.5),
    popin(video),
    chain(
      waitFor(0.1),
      all(popin(text), opacity.text(1, 0.5), text().margin(0, 0.5))
    ),
    chain(
      waitFor(0.2),
      all(popin(image), opacity.image(1, 0.3)),
      image().margin(0, 0.2)
    )
  );
});
