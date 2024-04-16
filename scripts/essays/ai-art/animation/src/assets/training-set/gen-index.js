const { readdir, writeFile } = require("fs/promises");
const { join, dirname } = require("path");

const noiseDir = join(__dirname, "./noise");
const imagesDir = join(__dirname, "./images");
const outFile = join(__dirname, "index.ts");

/*
 * images can be got from https://laion-aesthetic.datasette.io/laion-aesthetic-6pls/images
 * images can be cropped with nushell: ls images | get name | each { |e| mogrify -resize 778x778^ -gravity Center -extent 778x778 $e }
 */

(async () => {
  const noiseFiles = (await readdir(noiseDir)).map((x) => join(noiseDir, x));

  let noiseFilesImports = "";
  let noiseFilesArr = "export const noiseFiles = [";

  for (let i = 0; i < noiseFiles.length; ++i) {
    noiseFilesImports += `import { default as noise${i} } from '${noiseFiles[i]}';\n`;
    noiseFilesArr += `\n\tnoise${i},`;
  }

  noiseFilesArr += "\n];";

  const imagesFiles = (await readdir(imagesDir)).map((x) => join(imagesDir, x));

  let imagesFilesImports = "";
  let imagesFilesArr = "export const imagesFiles = [";

  for (let i = 0; i < imagesFiles.length; ++i) {
    imagesFilesImports += `import { default as image${i} } from '${imagesFiles[i]}';\n`;
    imagesFilesArr += `\n\timage${i},`;
  }

  imagesFilesArr += "\n];";

  const error = await writeFile(
    outFile,
    `${noiseFilesImports}\n${imagesFilesImports}\n${noiseFilesArr}\n${imagesFilesArr}`
  );

  if (error) console.error(error);
  else console.log(`Written to ${outFile}`);
})();
