import { Meta, Story } from '@storybook/react';

import { CartItem } from '../../../shared/types';
import CartList, { Props } from './CartList';

export default {
  component: CartList,
  title: 'CartList',
} as Meta;

const Template: Story<Props> = (args) => <CartList {...args} />;

export const Default = Template.bind({});

const carts: CartItem[] = [
  {
    id: 1,
    quantity: 1,
    product: {
      id: 1,
      name: '[리뉴얼]젓가락(종이)-정성을 담아',
      price: 21800,
      imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 1,
      name: '젓가락(종이)-웬만해선 이 맛을 막을 수 없다',
      price: 21800,
      imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
    },
  },
];

Default.args = {
  carts,
  isLoading: false,
};

export const NoneCartItem = Template.bind({});
NoneCartItem.args = {
  carts: [],
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  carts: [],
  isLoading: true,
};
