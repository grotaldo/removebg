// Importing necessary modules
import removeBackground from "@imgly/background-removal-node";
import sharp from "sharp";
import fs from "fs";
import { config } from "process";

const fileName = process.argv[2];

// Function to remove background from an image
async function removeImageBackground(imgSource) {
  try {
    // Removing background
    const blob = await removeBackground(imgSource, config);
    // Converting Blob to buffer
    const buffer = Buffer.from(await blob.arrayBuffer());
    // Generating data URL
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
    // Returning the data URL
    return dataURL;
  } catch (error) {
    // Handling errors
    throw new Error("Error removing background: " + error);
  }
}

// Example usage
async function removeBG(imgSource) {
  try {
    // Removing background from the input image
    const resultDataURL = await removeImageBackground(imgSource);

    // Writing the result to a file (optional)
    fs.writeFileSync(
      `${imgSource}-rbg.png`,
      resultDataURL.split(";base64,").pop(),
      {
        encoding: "base64",
      }
    );

    await sharp(`${imgSource}-rbg.png`)
      .trim()
      .resize(400, 580, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: 10,
        bottom: 10,
        left: 0,
        right: 0,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(`${imgSource}-400x600.png`);

    await sharp(`${imgSource}-400x600.png`)
      .extract({ left: 0, top: 0, width: 400, height: 300 })
      .toFile(`${imgSource}-400x300.png`);

    await sharp(`${imgSource}-400x600.png`)
      .extract({ left: 138, top: 0, width: 125, height: 125 })
      .toFile(`${imgSource}-125x125.png`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Calling the removeBG function
removeBG(`/data/${fileName}`);
