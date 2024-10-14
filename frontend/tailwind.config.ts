import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg_primary: "#fffdf9",
        btn_primary: "#ff4f00",
        btn_hover: "#ebe9df",
      },
    },
  },
  plugins: [],
};
export default config;
