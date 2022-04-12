import { Meta, Story } from '@storybook/react';
import styled from 'styled-components';

import { BUTTON_SIZE } from '../../../shared/constants/css';
import Button, { Props } from './Button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<Props> = (args) => (
  <Container>
    <Button {...args}>버튼</Button>
  </Container>
);
const Container = styled.div``;

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert('click'),
};

export const SmallButton = Template.bind({});
SmallButton.args = {
  ...Default.args,
  size: BUTTON_SIZE.SMALL,
};

export const MediumButton = Template.bind({});
MediumButton.args = {
  ...Default.args,
  size: BUTTON_SIZE.MEDIUM,
};

export const LargeButton = Template.bind({});
LargeButton.args = {
  ...Default.args,
  size: BUTTON_SIZE.LARGE,
};
