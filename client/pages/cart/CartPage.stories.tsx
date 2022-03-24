import { Meta, Story } from '@storybook/react';

import CartPage from './index';

export default {
  component: CartPage,
  title: 'CartPage',
} as Meta;

const Template: Story = (args) => <CartPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
