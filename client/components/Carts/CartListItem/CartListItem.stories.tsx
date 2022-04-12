import { Meta, Story } from '@storybook/react';

import { CartItem } from '../../../shared/types';
import CartListItem, { Props } from './CartListItem';

export default {
  component: CartListItem,
  title: 'CartListItem',
} as Meta;

const Template: Story<Props> = (args) => <CartListItem {...args} />;

export const Default = Template.bind({});
const cartItem: CartItem = {
  id: 1,
  quantity: 1,
  product: {
    id: 1,
    name: '[리뉴얼]젓가락(종이)-정성을 담아',
    price: 21800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
  },
};

Default.args = {
  cartItem,
  onClickCartItemSelectButton: () => alert('상품이 선택되었습니다.'),
  selectedCartItems: [],
};
