import { Meta, Story } from '@storybook/react';

import { Product } from '../../shared/types';
import ConfirmAddCartsModal, { Props } from './ConfirmAddCartsModal';

export default {
  component: ConfirmAddCartsModal,
  title: 'ConfirmAddCartsModal',
} as Meta;

const Template: Story<Props> = (args) => <ConfirmAddCartsModal {...args} />;

export const Default = Template.bind({});
const productToBeAdded: Product = {
  id: 1,
  name: '펩시 콜라 355ml 24캔',
  price: 83700,
  imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/84fc0238-0239-4d0e-870b-a9daa6f2c42c.jpg',
};

Default.args = {
  productToBeAdded,
  closeModal: () => alert('모달 비활성화 작업'),
};
