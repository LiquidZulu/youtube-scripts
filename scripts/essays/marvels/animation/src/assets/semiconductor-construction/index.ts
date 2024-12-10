import bareWafer from "./bare-wafer.png";
import deposition from "./deposition.png";
import depositionMachine from "./deposition-machine.png";
import photoresistCoating from "./photoresist-coating.png";
import photoresistCoatingMachine from "./photoresist-coating-machine.png";
import lithography from "./lithography.png";
import lithographyMachine from "./lithography-machine.png";
import developing from "./developing.png";
import developingMachine from "./developing-machine.png";
import etching from "./etching.png";
import etchingMachine from "./etching-machine.png";
import ionImplant from "./ion-implant.png";
import ionImplantMachine from "./ion-implant-machine.png";
import cmp from "./cmp.png";
import cmpMachine from "./cmp-machine.png";
import processedWafer from "./processed-wafer.png";
import dice from "./dice.png";
import diceMachine from "./dice-machine.png";
import dieAttach from "./die-attach.png";
import dieAttachMachine from "./die-attach-machine.png";
import wireBond from "./wire-bond.png";
import wireBondMachine from "./wire-bond-machine.png";
import encapsulate from "./encapsulate.png";
import encapsulateMachine from "./encapsulate-machine.png";
import testing from "./testing.png";
import testingMachine from "./testing-machine.png";
import testingAndMetrology from "./testing-and-metrology.png";
import testingAndMetrologyMachine from "./testing-and-metrology-machine.png";
import fullImg from "./full.png";

export const full = fullImg;

export const waferProcess = [
  [bareWafer],
  [deposition, depositionMachine],
  [photoresistCoating, photoresistCoatingMachine],
  [lithography, lithographyMachine],
  [developing, developingMachine],
  [etching, etchingMachine],
  [ionImplant, ionImplantMachine],
  [cmp, cmpMachine],
  [processedWafer],
];

export const waferPostProcess = [
  [dice, diceMachine],
  [dieAttach, dieAttachMachine],
  [wireBond, wireBondMachine],
  [encapsulate, encapsulateMachine],
  [testing, testingMachine],
];

export const metrology = [testingAndMetrology, testingAndMetrologyMachine];
