import { makeProject } from "@motion-canvas/core";
import audio from "./audio.wav";

import example from "./scenes/example?scene";
import intro from "./scenes/intro?scene";
import skgExplanation from "./scenes/skg-explanation?scene";
import theProblemWithSkg from "./scenes/the-problem-with-skg?scene";
import killedGames from "./scenes/killed-games?scene";
import ip from "./scenes/ip?scene";
import noPropertyInIdeas from "./scenes/no-property-in-ideas?scene";
import ipCta from "./scenes/ip-cta?scene";
import dmca from "./scenes/dmca?scene";

export default makeProject({
    variables: { skgblue: "#1977d4" },
    scenes: [
        dmca,
        //ipCta,
        //noPropertyInIdeas,
        //ip,
        //killedGames,
        //theProblemWithSkg,
        //skgExplanation,
        //intro
    ],
    audio,
});
