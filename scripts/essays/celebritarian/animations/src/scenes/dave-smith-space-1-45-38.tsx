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
import data from "../data/01-45-38.391--01-46-59.825--Dave_Smith.wav.json";

export default mkQuote(data, img, "@ComicDaveSmith", "1:45:38", [
  g(
    "You know, Hoppe's strategy, if you actually read the entire piece, has been tremendously influential on Michael Heise's, uh, decentralized revolution plan ",
    "white",
  ),
  c("[...] ", "#666"),
  g(
    "This is the thing where we have to marry our principles to the real world. And I will tell you a lot of these kind of like, and believe me, I've said them all in my day, but a lot of these anarchist mantras of we just have to pull out. We can't work within the system. We can, it just becomes an excuse to do nothing and say that like, oh, yeah, so we don't actually, I don't actually have to go grind it out and do the hard work to maybe make things 1% better.\n\nI can just retreat and say, oh, yeah, you're, you know, tainted now, you're not as pure as me. This is---we're having a conversation about strategy, strategy comes down to the real world, what are plausible, realistic outcomes, and what outcomes are preferable to other plausible, realistic outcomes. That's what we're talking about here. Ross being freed is better than Ross not being freed, and it is a very big deal to win.",
    "white",
  ),
] as TRichText[]);
