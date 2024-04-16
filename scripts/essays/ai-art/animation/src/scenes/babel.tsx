import { makeScene2D, Txt, Rect, Img } from "@motion-canvas/2d";
import { waitFor, createSignal } from "@motion-canvas/core";
import { zapataScript } from "../assets/zapata-script";
import pointing from "../assets/pointing.png";

const characters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_ '"`;
const [textRowLength, textRowNumber] = [80, 40];

const getTextRow = (rowLength?: number) => {
  rowLength = rowLength ?? textRowLength;
  let row = "";
  for (let i = 0; i < rowLength; ++i) {
    row += characters[Math.floor(Math.random() * characters.length)];
  }
  return row;
};

const getText = (numRows?: number, rowLength?: number) => {
  [numRows, rowLength] = [numRows ?? textRowNumber, rowLength ?? textRowLength];
  const textRows = new Array(numRows).fill("");

  for (let i = 0; i < textRows.length; ++i) {
    textRows[i] = getTextRow(rowLength);
  }

  return textRows;
};

export default makeScene2D(function* (view) {
  view.fill(0x202228);

  view.add(
    <Rect direction={"column"} layout>
      {getText().map((x) => (
        <Txt
          fontFamily="Mononoki"
          fontSize={20}
          fill={0xffffff}
          text={x as string}
        />
      ))}
    </Rect>
  );

  for (let i = 0; i < 30 * 10; ++i) {
    yield* waitFor(1 / 30);
    view.removeChildren();
    view.add(
      <Rect direction={"column"} layout>
        {getText().map((x) => (
          <Txt
            fontFamily="Mononoki"
            fontSize={20}
            fill={0xffffff}
            text={x as string}
          />
        ))}
      </Rect>
    );
  }

  view.removeChildren();
  view.add(
    <Rect direction={"column"} layout>
      {zapataScript
        .split("")
        .map((x, i) =>
          i % textRowLength ? [] : zapataScript.slice(i, i + textRowLength)
        )
        .map((x) => (
          <Txt
            fontFamily="Mononoki"
            fontSize={20}
            fill={0xffffff}
            text={x as string}
          />
        ))}
    </Rect>
  );
  view.add(<Img src={pointing} width={1920} height={1080} />);

  yield* waitFor(5);
});
