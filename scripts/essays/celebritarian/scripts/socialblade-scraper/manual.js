(function () {
  // Store findings
  const debugData = {
    canvasContext: [],
    textActivity: [],
    globalVars: [],
    apiResponses: [],
  };

  // Step 1: Intercept Canvas Text Drawing
  const canvases = document.querySelectorAll("canvas");
  if (canvases.length === 0) {
    console.error("No canvases found.");
  } else {
    canvases.forEach((canvas, index) => {
      const ctx = canvas.getContext("2d");
      debugData.canvasContext.push({
        index,
        id: canvas.id,
        class: canvas.className,
        parentClass: canvas.parentElement?.className || "",
        parentText: canvas.parentElement?.textContent.slice(0, 100) || "", // Context clue
      });

      // Hook only text methods
      ["fillText", "strokeText"].forEach((method) => {
        const original = ctx[method];
        ctx[method] = function (text, x, y) {
          debugData.textActivity.push({
            canvas: index,
            type: method,
            text,
            x,
            y,
            timestamp: Date.now(),
          });
          original.apply(this, arguments);
        };
      });
    });
  }

  // Step 2: Scan Global Variables
  Object.keys(window).forEach((key) => {
    const val = window[key];
    if (val && typeof val === "object") {
      try {
        const str = JSON.stringify(val).toLowerCase();
        if (
          str.includes("views") ||
          str.includes("date") ||
          str.includes("chart") ||
          str.includes("data")
        ) {
          debugData.globalVars.push({
            key,
            sample: JSON.stringify(val, null, 2).slice(0, 200), // Limit for readability
          });
        }
      } catch (e) {
        // Ignore non-serializable
      }
    }
  });

  // Step 3: Hook Fetch for API Responses
  const originalFetch = window.fetch;
  window.fetch = function (url, options) {
    return originalFetch(url, options).then((response) => {
      const cloned = response.clone();
      cloned
        .json()
        .then((data) => {
          const str = JSON.stringify(data).toLowerCase();
          if (
            str.includes("views") ||
            str.includes("date") ||
            str.includes("data")
          ) {
            debugData.apiResponses.push({
              url,
              data: JSON.stringify(data, null, 2).slice(0, 500),
            });
          }
        })
        .catch(() => {});
      return response;
    });
  };

  // Step 4: Output and Pair Text
  window.stopDebug = function () {
    // Group text by canvas and sort by timestamp
    const groupedText = debugData.textActivity.reduce((acc, activity) => {
      if (!acc[activity.canvas]) acc[activity.canvas] = [];
      acc[activity.canvas].push(activity);
      return acc;
    }, {});

    // Attempt to pair dates and views
    const pairedData = Object.keys(groupedText).map((canvasIndex) => {
      const points = [];
      const texts = groupedText[canvasIndex].sort(
        (a, b) => a.timestamp - b.timestamp,
      );
      let lastDate = null;

      texts.forEach((activity) => {
        const { text } = activity;
        // Detect dates (e.g., "2025-09-01", "Sep 1, 2025", or "Sep 1")
        if (
          text.match(/\d{4}-\d{2}-\d{2}/) ||
          text.match(/[A-Za-z]+\s+\d+/) ||
          text.match(/[A-Za-z]+\s+\d+,\s+\d{4}/)
        ) {
          lastDate = text;
        }
        // Detect views (e.g., "5K", "12345", "1.2M")
        else if (text.match(/^\d+(\.\d+)?[KMB]?$/)) {
          let views = parseFloat(text);
          if (text.includes("K")) views *= 1000;
          if (text.includes("M")) views *= 1000000;
          if (text.includes("B")) views *= 1000000000;
          if (lastDate) {
            points.push({
              date: lastDate,
              views,
              source: `Canvas ${canvasIndex}`,
            });
          }
        }
      });

      return {
        canvas: canvasIndex,
        channel: debugData.canvasContext[canvasIndex]?.parentText.includes(
          "views",
        )
          ? "Views Chart"
          : `Canvas ${canvasIndex}`,
        points,
      };
    });

    // Output
    console.log("=== Debug Output ===");
    console.log("Canvas Context:");
    debugData.canvasContext.forEach((ctx) => {
      console.log(`Canvas ${ctx.index}:`, ctx);
    });

    console.log("\nText Activity:");
    debugData.textActivity.forEach((activity) => {
      console.log(`Canvas ${activity.canvas} (${activity.type}):`, activity);
    });

    console.log("\nGlobal Variables:");
    debugData.globalVars.forEach((varData) => {
      console.log(`Variable ${varData.key}:`, varData.sample);
    });

    console.log("\nAPI Responses:");
    debugData.apiResponses.forEach((resp) => {
      console.log(`URL: ${resp.url}`, "\nData:", resp.data);
    });

    console.log("\nPaired Data (Extracted):");
    const extractedData = pairedData.filter((d) => d.points.length > 0);
    console.log(JSON.stringify(extractedData, null, 2));

    // Copy to clipboard
    const json = JSON.stringify({ debugData, extractedData }, null, 2);
    navigator.clipboard.writeText(json);
    console.log("Debug data and extracted points copied to clipboard!");

    // Clean up
    canvases.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      ["fillText", "strokeText"].forEach((method) => {
        ctx[method] = ctx[method].__proto__[method]; // Restore original
      });
    });
    window.fetch = originalFetch;
    delete window.stopDebug;
  };

  console.log(
    "Debugging active (text only). Hover/click chart or change date range.",
  );
  console.log("Run `window.stopDebug()` to output results.");
})();
