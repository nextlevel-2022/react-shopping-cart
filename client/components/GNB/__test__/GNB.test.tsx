import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { URL } from '../../../shared/constants/url';
import { createMockRouter } from '../../../shared/utils/createMockRouter';
import { GNB } from '../GNB';

const renderGNB = (mockedRouter: any) => {
  const result = render(
    <RouterContext.Provider value={mockedRouter}>
      <GNB />;
    </RouterContext.Provider>,
  );

  const homeButton = () => result.getByRole('button', { name: 'WOOWA SHOP' });
  const cartButton = () => result.getByRole('button', { name: '장바구니' });
  const orderButton = () => result.getByRole('button', { name: '주문목록' });

  return { result, homeButton, cartButton, orderButton };
};

const mockedRouter = createMockRouter({});

describe('초기에 GNB에 3개의 페이지 이동 버튼이 존재한다.', () => {
  it('초기에 WOOWA SHOP 로고, 장바구니, 주문목록 페이지 이동 버튼이 존재한다.', () => {
    const { homeButton, cartButton, orderButton } = renderGNB(mockedRouter);

    expect(homeButton()).toBeInTheDocument();
    expect(cartButton()).toBeInTheDocument();
    expect(orderButton()).toBeInTheDocument();
  });
});

describe('버튼을 클릭하면 다른 페이지로 이동한다.', () => {
  it('로고 버튼을 누르면 홈 화면으로 이동한다.', () => {
    const { homeButton } = renderGNB(mockedRouter);

    userEvent.click(homeButton());
    expect(mockedRouter.push).toHaveBeenCalledWith(URL.HOME());
  });

  it('장바구니 버튼을 누르면 장바구니 화면으로 이동한다.', () => {
    const { cartButton } = renderGNB(mockedRouter);

    userEvent.click(cartButton());
    expect(mockedRouter.push).toHaveBeenCalledWith(URL.CART());
  });

  it('주문목록 버튼을 누르면 주문목록 화면으로 이동한다', () => {
    const { orderButton } = renderGNB(mockedRouter);

    userEvent.click(orderButton());
    expect(mockedRouter.push).toHaveBeenCalledWith(URL.ORDER());
  });
});
