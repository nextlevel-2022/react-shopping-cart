import { Meta, Story } from '@storybook/react';

import CartListContainer from './CartListContainer';

export default {
  component: CartListContainer,
  title: 'CartListContainer',
} as Meta;

const Template: Story = (args) => <CartListContainer {...args} />;

export const Default = Template.bind({});
Default.args = {};
