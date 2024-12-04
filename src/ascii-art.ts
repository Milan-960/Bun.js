import figlet from "figlet";

// Utility function to create ASCII art
export function createAsciiArt(
  text: string,
  options: figlet.Options = {
    font: "Slant",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  }
): string {
  try {
    return figlet.textSync(text, options);
  } catch (error) {
    console.error("Error creating ASCII art:", error);
    return text; // Fallback to plain text if ASCII art fails
  }
}

// Additional ASCII art styles
export const asciiStyles = {
  standard: (text: string) => figlet.textSync(text, { font: "Standard" }),
  big: (text: string) => figlet.textSync(text, { font: "Big" }),
  banner: (text: string) => figlet.textSync(text, { font: "Banner" }),
};
