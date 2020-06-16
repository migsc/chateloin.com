import Typography from "typography"

const defaults = {
  baseFontSize: "18px",
  headerColor: "#fff",
  bodyColor: "#fff",
  googleFonts: [
    {
      name: "Source Code Pro",
      styles: ["400", "700"],
    },
    {
      name: "Space Mono",
      styles: ["400", "700"],
    },
  ],
}

const sourceCodeProTheme = new Typography({
  ...defaults,
  headerFontFamily: ["Source Code Pro", "sans-serif"],
  bodyFontFamily: ["Source Code Pro", "serif"],
})

const spaceMonoTheme = new Typography({
  ...defaults,
  headerFontFamily: ["Space Mono", "sans-serif"],
  bodyFontFamily: ["Space Mono", "serif"],
})

const spaceProTheme = new Typography({
  ...defaults,
  headerFontFamily: ["Space Mono", "sans-serif"],
  bodyFontFamily: ["Source Code Pro", "serif"],
})

const proSpaceTheme = new Typography({
  ...defaults,
  headerFontFamily: ["Source Code Pro", "serif"],
  bodyFontFamily: ["Space Mono", "sans-serif"],
})

// Export helper functions
// export const { scale, rhythm, options } = spaceMonoTheme
export default proSpaceTheme
