import Typography from "typography"

const googleFonts = [
  {
    name: "Source Code Pro",
    styles: ["400", "700"],
  },
  {
    name: "Space Mono",
    styles: ["400", "700"],
  },
]

const sourceCodeProTheme = new Typography({
  googleFonts,
  baseFontSize: "18px",
  headerFontFamily: ["Source Code Pro", "sans-serif"],
  bodyFontFamily: ["Source Code Pro", "serif"],
})

const spaceMonoTheme = new Typography({
  googleFonts,
  baseFontSize: "18px",
  headerFontFamily: ["Space Mono", "sans-serif"],
  bodyFontFamily: ["Space Mono", "serif"],
})

const spaceProTheme = new Typography({
  googleFonts,
  headerFontFamily: ["Space Mono", "sans-serif"],
  bodyFontFamily: ["Source Code Pro", "serif"],
})

// Export helper functions
// export const { scale, rhythm, options } = spaceMonoTheme
export default spaceProTheme
