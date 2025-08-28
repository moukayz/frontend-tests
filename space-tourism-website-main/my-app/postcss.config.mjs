const config = {
  plugins: [
    [
      "postcss-simple-vars",
      {
        variables: () => {
          return {
            BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
          };
        },
      },
    ],
    "@tailwindcss/postcss",
  ],
};

export default config;
