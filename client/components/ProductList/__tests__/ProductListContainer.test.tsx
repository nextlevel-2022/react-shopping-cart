import { render } from '@testing-library/react';

import ProductsListContainer from '../ProductListContainer';

describe('<ProductsListContainer />', () => {
  it('<ProductsListContainer /> 가 렌더링 된다.', async () => {
    const result = render(<ProductsListContainer />);

    expect(result.getByText('로딩중'));
  });
});
