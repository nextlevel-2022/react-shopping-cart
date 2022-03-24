import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('<Button />', () => {
  it('버튼이 렌더링 된다.', () => {
    const { button } = renderButton();

    expect(button()).toBeInTheDocument();
  });

  it('버튼을 클릭하면 props로 받은 onClick 핸들러가 호출된다.', () => {
    const { onClickHandler, clickButton } = renderButton();

    clickButton();
    expect(onClickHandler).toBeCalled();
  });
});

const renderButton = () => {
  const onClickHandler = jest.fn();
  const children = '버튼';

  const result = render(<Button onClick={onClickHandler}>{children}</Button>);

  const button = () => result.getByText('버튼');

  const clickButton = () => {
    userEvent.click(button());
  };

  return { onClickHandler, children, result, button, clickButton };
};
