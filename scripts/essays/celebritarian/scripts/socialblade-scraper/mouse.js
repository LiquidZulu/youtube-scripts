(async function () {
  const canvas = document.querySelector("canvas");
  if (!canvas) return console.error("No canvas.");
  const width = canvas.width;
  const height = canvas.height;
  const step = 10;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      canvas.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          clientX: canvas.offsetLeft + x,
          clientY: canvas.offsetTop + y,
        }),
      );
    }
  }
  console.log("Simulated mouse moves. Run `window.stopDebug()`.");
})();
