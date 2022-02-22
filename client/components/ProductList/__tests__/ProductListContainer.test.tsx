import { render } from '@testing-library/react';

import ProductListContainer from '../ProductListContainer';

describe('ProductsListContainer 가 렌더링 된다..', () => {
  it('처음에는 로딩중임을 보인다.', () => {
    const result = render(<ProductListContainer />);

    expect(result.getByText('로딩중'));
  });
});
