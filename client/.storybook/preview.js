import { addDecorator } from '@storybook/react';

import { Provider } from 'react-redux';
import { store } from '../store';
import GlobalStyle from '../styles/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((Story) => (
  <Provider store={store}>
    <GlobalStyle />
    <Story />
  </Provider>
));
