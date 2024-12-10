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
import quotes from "../assets/TIK.org-quotes";
import tikhistory from "../assets/cards/tikhistory.png";
import aynrand from "../assets/cards/ayn-rand.png";
import leonardpeikoff from "../assets/cards/leonard-peikoff.png";
import murrayrothbard from "../assets/cards/murray-rothbard.png";
import barbarabranden from "../assets/cards/barbara-branden.png";
import hanshermannhoppe from "../assets/cards/hans-hermann-hoppe.png";
import uslegaldefinitionofspectralevidence from "../assets/cards/uslegal-definition-of-spectral-evidence.png";
import newenglandlaw from "../assets/cards/new-england-law.png";
import onkarghate from "../assets/cards/onkar-ghate.png";

const cardMap = new Map([
	["tikhistory", tikhistory],
	["ayn-rand", aynrand],
	["leonard-peikoff", leonardpeikoff],
	["murray-rothbard", murrayrothbard],
	["barbara-branden", barbarabranden],
	["hans-hermann-hoppe", hanshermannhoppe],
	["uslegal-definition-of-spectral-evidence", uslegaldefinitionofspectralevidence],
	["new-england-law", newenglandlaw],
	["onkar-ghate", onkarghate],
]);

export const quoteScenes = quotes.map((x, i) =>
  makeQuoteScene(cardMap.get(x.author), x, x.citation, `quote-${i}`, {
    bg: false,
  }),
);