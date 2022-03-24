import { Meta, Story } from '@storybook/react';

import { product } from '../../../shared/fixtures/product';
import OrderedProduct, { Props } from './OrderedProduct';

export default {
  component: OrderedProduct,
  title: 'OrderedProduct',
} as Meta;

const Template: Story<Props> = (args) => <OrderedProduct {...args} />;

export const Default = Template.bind({});
Default.args = {
  product,
  quantity: 1,
};
