import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../../__mocks__/react-redux';
import OrderListContainer from '../OrderListContainer';

describe('<OrderListContainer />', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => useAppSelector);
  });

  it('처음 렌더링 되었을 때 로딩중임을 보인다.', () => {
    const result = render(<OrderListContainer />);

    expect(result.getByText('로딩중')).toBeInTheDocument();
  });
});
