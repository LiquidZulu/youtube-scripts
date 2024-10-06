import quotes from "../assets/TIK.org-quotes";
import aynrand from "../assets/cards/ayn-rand.jpg";
import barbarabranden from "../assets/cards/barbara-branden.jpg";
import hanshermannhoppe from "../assets/cards/hans-hermann-hoppe.jpg";
import leonardpeikoff from "../assets/cards/leonard-peikoff.webp";
import murrayrothbard from "../assets/cards/murray-rothbard.webp";
import newenglandlaw from "../assets/cards/new-england-law.jpeg";
import onkarghate from "../assets/cards/onkar-ghate.jpg";
import tikhistory from "../assets/cards/tikhistory.png";
import { makeQuoteScene } from "mcas/lib/scenes/quote";

const cardMap = new Map([
  ["ayn-rand", aynrand],
  ["barbara-branden", barbarabranden],
  ["hans-hermann-hoppe", hanshermannhoppe],
  ["leonard-peikoff", leonardpeikoff],
  ["murray-rothbard", murrayrothbard],
  ["new-england-law", newenglandlaw],
  ["onkar-ghate", onkarghate],
  ["tikhistory", tikhistory],
]);

export const quoteScenes = quotes.map((x, i) =>
  makeQuoteScene(cardMap.get(x.author), x, x.citation, `quote-${i}`, {
    bg: false,
  }),
);
