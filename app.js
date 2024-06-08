// Importing necessary modules
import removeBackground from "@imgly/background-removal-node";
import fs from "fs";

const fileName = process.argv[2];

// Function to remove background from an image
async function removeImageBackground(imgSource) {
  try {
    // Removing background
    const blob = await removeBackground(imgSource);
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
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Calling the removeBG function
removeBG(`/data/${fileName}`);
