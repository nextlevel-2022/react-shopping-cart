import { render } from '@testing-library/react';

import { useDispatch, useSelector } from '../../../__mocks__/react-redux';
import { useAppDispatch, useAppSelector } from '../../../store';
import ProductListContainer from '../../ProductList/ProductListContainer';

describe('<ProductListContainer/>', () => {
  beforeEach(() => {
    useDispatch.mockImplementation(() => useAppDispatch);
    useSelector.mockImplementation(() => useAppSelector);
  });

  it('<ProductListContainer /> 가 렌더링 된다.', async () => {
    const result = render(<ProductListContainer />);

    expect(result.getByText('로딩중')).toBeInTheDocument();
  });
});
