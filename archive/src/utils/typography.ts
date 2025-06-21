import Typography from "typography"

const defaults = {
  baseFontSize: "18px",
  headerColor: "#fff",
  bodyColor: "#fff",
  googleFonts: [
    // {
    //   name: "Source Code Pro",
    //   styles: ["400", "700"],
    // },
    // {
    //   name: "Space Mono",
    //   styles: ["400", "700"],
    // },
    {
      name: "Lato",
      styles: ["100", "200", "300", "400", "700"],
    },
    // {
    //   name: "Noto Sans JP",
    //   styles: ["100", "200", "300", "400", "700"],
    // },
  ],
}

const LatoTheme = new Typography({
  ...defaults,
  headerFontFamily: ["Lato", "sans-serif"],
  bodyFontFamily: ["Lato", "sans-serif"],
})

// Export helper functions
// export const { scale, rhythm, options } = spaceMonoTheme
export default LatoTheme
