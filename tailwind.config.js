module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12241F",
        paper: "#F6F4EC",
        panel: "#FFFFFF",
        teal: "#0E4F4A",
        "teal-deep": "#0A3833",
        gold: "#D9A441",
        clay: "#B5533C",
        sage: "#8FA998",
        line: "#E4DFCF",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
