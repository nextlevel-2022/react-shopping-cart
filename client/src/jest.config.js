module.exports = {
  transform: {
    "^.+\\.(j|t)s?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(lit-element|lit-html)/)"],
};
