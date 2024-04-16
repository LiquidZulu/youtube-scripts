export const splitStr = (str: string, size?: number) => {
  const words = str.split(" ");
  const lineLength = size ?? 50;
  let lines = [];
  let currentLine = "";

  for (let word of words) {
    if (currentLine.length + word.length + 1 > lineLength) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ` ${word}`;
    }
  }

  if (currentLine) lines.push(currentLine);

  return lines;
};
