import { Meta, Story } from '@storybook/react';

import ProductDetailPage, { ServerSideProps } from './[productId]';

export default {
  component: ProductDetailPage,
  title: 'ProductDetailPage',
} as Meta;

const Template: Story<ServerSideProps> = (args) => <ProductDetailPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: {
    id: 1,
    name: '냉면용기(대)',
    price: 83700,
    imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
  },
};
