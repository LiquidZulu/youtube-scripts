import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  generateTxt,
  TRichText,
  c,
  g,
} from "mcas";
import * as colors from "mcas/colors";
import { mkQuote } from "./dave-smith-space";

import img from "../assets/twitter/dave.jpg";
import data from "../data/00-03-33.755--00-04-47.995--Dave_Smith.wav.json";

export default mkQuote(data, img, "@ComicDaveSmith", "3:34", [
  g(
    "I do understand where the strategy that Angela kind of embarked on here in the libertarian party, and a lot of us libertarians, I know for myself, and probably for a lot of other people who were supporting Donald Trump: this was very much a different strategy for all of us. ",
    "white",
  ),
  c("[...] ", "#666"),
  g(
    "I would just kind of implore a lot of libertarians to think about the fact that the world has changed. Truly drastically the world has changed over the last few years. There's a lot of things you could point to of what really changed the world, I particularly think COVID, that's the thing I would really point to ",
    "white",
  ),
  c("[...] ", "#666"),
  g(
    "but the world has changed, and in a situation like that you should at least be open to new strategies. Rather than having this, what seems to me, quasi-religious allergy to even suggesting that maybe just sitting in our corner and preaching our message is not the best use of this party.",
    "white",
  ),
] as TRichText[]);
