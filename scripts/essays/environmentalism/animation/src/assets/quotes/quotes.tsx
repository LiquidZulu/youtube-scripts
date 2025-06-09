// put this in src/scenes/
// then in src/project.ts use it like so:
/*
import { makeProject } from "@motion-canvas/core";
import { quoteScenes } from "./scenes/quotes";

export default makeProject({
  scenes: quoteScenes,
});
*/
import { makeQuoteScene } from "mcas/lib/scenes/quote";
import quotes from "../assets/environmentalism.org-quotes";
import aynrand from "../assets/cards/ayn-rand.png";
import gretathunberg'sspeechatthe2019unclimateactionsummit from "../assets/cards/greta-thunberg's-speech-at-the-2019-un-climate-action-summit.png";
import alexepstein from "../assets/cards/alex-epstein.png";

const cardMap = new Map([
	["ayn-rand", aynrand],
	["greta-thunberg's-speech-at-the-2019-un-climate-action-summit", gretathunberg'sspeechatthe2019unclimateactionsummit],
	["alex-epstein", alexepstein],
]);

export const quoteScenes = quotes.map((x, i) =>
  makeQuoteScene(cardMap.get(x.author), x, x.citation, `quote-${i}`, {
    bg: false,
  }),
);