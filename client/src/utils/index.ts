const replaceCurrencyFormat = (value: string | number) => {
  return `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export { replaceCurrencyFormat };
