import { makeScene2D, Rect, Ray, Img, Video, Camera } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useDuration,
  waitUntil,
  easeInOutBack,
  easeOutBack,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, a } from "mcas";
import * as colors from "mcas/colors";

import c1 from "../assets/intro-clips/1.mp4";
import c2 from "../assets/intro-clips/480p/2.mp4";
import c3 from "../assets/intro-clips/480p/3.mp4";
import c4 from "../assets/intro-clips/480p/4.mp4";
import c5 from "../assets/intro-clips/480p/5.mp4";
import c6 from "../assets/intro-clips/480p/6.mp4";
import c7 from "../assets/intro-clips/480p/7.mp4";
import c8 from "../assets/intro-clips/1080p/8.mp4";
import c9 from "../assets/intro-clips/1080p/9.mp4";
import c10 from "../assets/intro-clips/1080p/10.mp4";
import c11 from "../assets/intro-clips/480p/11.mp4";
import c12 from "../assets/intro-clips/480p/12.mp4";
import c13 from "../assets/intro-clips/1080p/13.mp4";
import c14 from "../assets/intro-clips/1080p/14.mp4";
import c15 from "../assets/intro-clips/480p/15.mp4";
import c16 from "../assets/intro-clips/480p/16.mp4";
import c17 from "../assets/intro-clips/1080p/17.mp4";
import c18 from "../assets/intro-clips/1080p/18.mp4";
import c19 from "../assets/intro-clips/1080p/19.mp4";
import c20 from "../assets/intro-clips/480p/20.mp4";
import c21 from "../assets/intro-clips/480p/21.mp4";
import c22 from "../assets/intro-clips/480p/22.mp4";
import c23 from "../assets/intro-clips/480p/23.mp4";
import c24 from "../assets/intro-clips/480p/24.mp4";
import c25 from "../assets/intro-clips/480p/25.mp4";

const cmain = c1;

const clips = [
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9,
  c10,
  c11,
  c12,
  c13,
  c14,
  c15,
  c16,
  c17,
  c18,
  c19,
  c20,
  c21,
  c22,
  c23,
  c24,
  c25,
];

const isMain = (row: number, column: number) => row == 2 && column == 2;

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const cam = createRef<Camera>();

  let i = 0;

  view.add(
    <Camera ref={cam}>
      <Rect layout direction="column">
        {...a(5).map((_, row) => (
          <Rect layout>
            {...a(5).map((_, column) => (
              <Video
                width={3840}
                play
                src={isMain(row, column) ? cmain : clips[i++]}
              />
            ))}
          </Rect>
        ))}
      </Rect>
    </Camera>,
  );

  yield* waitFor(0.01);

  yield* cam().zoom(0.2, useDuration("zoom out")).to(1, 0.3);
});
