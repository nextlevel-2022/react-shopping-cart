import { Meta, Story } from '@storybook/react';

import { orderItem } from '../../../shared/fixtures/orderItem';
import OrderListItem, { Props } from './OrderListItem';

export default {
  component: OrderListItem,
  title: 'OrderListItem',
} as Meta;

const Template: Story<Props> = (args) => <OrderListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  orderItem,
};
