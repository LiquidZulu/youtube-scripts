import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, Song } from "mcas";
import * as colors from "mcas/colors";

export const mkSong = (author: string, title: string) =>
  makeScene2D(function* (view) {
    const song = createRef<Song>();

    view.add(<Song ref={song} author={author} title={title} />);

    yield* song().annotate();
  });
