import { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      screens: {
        tablet: "1280px",
        fold: "832px",
        mobile: "480px",
      },
    },
  },
};

export default config;
