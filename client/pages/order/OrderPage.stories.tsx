import { Meta, Story } from '@storybook/react';

import OrderPage from './index';

export default {
  component: OrderPage,
  title: 'OrderPage',
} as Meta;

const Template: Story = (args) => <OrderPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
