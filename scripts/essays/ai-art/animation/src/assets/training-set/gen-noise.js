const { writeFileSync } = require("fs");
const { generateImage } = require("js-image-generator");

for (let i = 0; i < 256; ++i) {
  generateImage(778, 778, 80, (err, image) => {
    if (err) throw err;

    writeFileSync(`src/assets/training-set/noise/${i}.jpg`, image.data);
  });
}
