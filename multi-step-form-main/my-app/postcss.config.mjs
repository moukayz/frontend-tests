const config = {
  plugins: [
    [
      "postcss-simple-vars",
      {
        variables: () => {
          return {
            BASE_PATH: process.env.BASE_PATH ?? "",
          };
        },
      },
    ],
    "@tailwindcss/postcss",
  ],
};

export default config;
