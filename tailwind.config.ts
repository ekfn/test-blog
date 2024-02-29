import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: ["960px"],
    },
  },
  plugins: [],
};
export default config;
