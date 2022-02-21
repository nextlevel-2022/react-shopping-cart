export const size = {
  largest: "1200px",
  large: "900px",
  medium: "600px",
  small: "500px",
  smallest: "400px",
};

const media = {
  laptop: `@media only screen and (min-width: ${size.largest})`,
  tablet: `@media only screen and (min-width: ${size.large})`,
  mobile: `@media ony screen and (min-width): ${size.small}`,
};

const layout = {
  flex: `display: flex;`,
  flexColumn: `
    display: flex;
    flex-direction: column;
  `,
  flexRowCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexColumnCenter: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

const theme = {
  media: media,
  layout: layout,
};

export default theme;
