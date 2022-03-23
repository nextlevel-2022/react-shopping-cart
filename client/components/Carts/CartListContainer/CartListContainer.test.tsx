import { render } from '@testing-library/react';

import { useDispatch, useSelector } from '../../../__mocks__/react-redux';
import { useAppDispatch, useAppSelector } from '../../../store';
import CartListContainer from './CartListContainer';

describe('<CartListContainer/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => useAppSelector);
  });

  it('<CartListContainer /> 가 렌더링 된다.', async () => {
    const result = render(<CartListContainer />);

    expect(result.getByText('로딩중')).toBeInTheDocument();
  });
});
