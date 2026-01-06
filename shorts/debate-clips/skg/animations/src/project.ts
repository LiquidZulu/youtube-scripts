import { makeProject } from "@motion-canvas/core";
import audio from "./assets/video.wav";
import skgIsAnIpIssue from "./scenes/skg-is-an-ip-issue?scene";
import ipAbct from "./scenes/ip-abct?scene";
import ipUndercutting from "./scenes/ip-undercutting?scene";
import predatoryPricing from "./scenes/predatory-pricing?scene";
import standardOil from "./scenes/standard-oil?scene";
import iHaveTheAnswer from "./scenes/i-have-the-answer?scene";

export default makeProject({
    scenes: [
        //skgIsAnIpIssue,
        //ipAbct,
        //ipUndercutting,
        //predatoryPricing,
        //standardOil,
        iHaveTheAnswer,
    ],
    audio,
});
