import { Meta, Story } from '@storybook/react';

import GNB from './GNB';

export default {
  component: GNB,
  title: 'GNB',
} as Meta;

const Template: Story = (args) => <GNB {...args} />;

export const Default = Template.bind({});
Default.args = {};
