import { Meta, Story } from '@storybook/react';

import ProductItem, { Props } from './ProductItem';

export default {
  component: ProductItem,
  title: 'ProductItem',
} as Meta;

const Template: Story<Props> = (args) => <ProductItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: {
    id: 1,
    name: '냉면용기(대)',
    price: 83700,
    imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
  },
};
