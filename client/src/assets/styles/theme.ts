interface ThemeInterface {
  device: deviceType;
  size: sizeType;
}

type deviceType = {
  desktop: string;
  tablet: string;
  mobile: string;
};

type sizeType = {
  maxWidth: string;
};

export const theme: ThemeInterface = {
  device: {
    desktop: "1200px",
    tablet: "784px",
    mobile: "414px",
  },
  size: {
    maxWidth: "1200px",
  },
};
