import { Meta, Story } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { products } from '../../shared/fixtures/db.json';
import ProductList, { Props } from './ProductList';

export default {
  component: ProductList,
  title: 'ProductList',
} as Meta;

const Template: Story<Props> = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  products,
};
