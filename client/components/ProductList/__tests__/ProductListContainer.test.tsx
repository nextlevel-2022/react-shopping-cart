import { render } from '@testing-library/react';

import { useDispatch, useSelector } from '../../../__mocks__/react-redux';
import { useAppDispatch, useAppSelector } from '../../../store';
import ProductsListContainer from '../ProductListContainer';

describe('<ProductsListContainer />', () => {
  beforeEach(() => {
    useDispatch.mockImplementation(() => useAppDispatch);
    useSelector.mockImplementation(() => useAppSelector);
  });

  it('<ProductsListContainer /> 가 렌더링 된다.', async () => {
    const result = render(<ProductsListContainer />);

    expect(result.getByText('로딩중')).toBeInTheDocument();
  });
});
