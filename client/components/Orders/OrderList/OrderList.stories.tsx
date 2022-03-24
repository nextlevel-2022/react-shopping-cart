import { Meta, Story } from '@storybook/react';

import { orders } from '../../../shared/fixtures/orders';
import OrderList, { Props } from './OrderList';

export default {
  component: OrderList,
  title: 'OrderList',
} as Meta;

const Template: Story<Props> = (args) => <OrderList {...args} />;

export const Default = Template.bind({});
Default.args = {
  orders,
  isLoading: false,
};

export const NoneOrders = Template.bind({});
NoneOrders.args = {
  ...Default.args,
  orders: [],
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};
