import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '../../components/ProductCard';

describe('ProductCard', () => {
  const handleClickItem = jest.fn();
  const handleClickCart = jest.fn();

  beforeEach(() => {
    handleClickItem.mockClear();
    handleClickCart.mockClear();
  });

  it('render', () => {
    const { container } = render(
      <ProductCard
        item={{ id: 1, name: 'item', imageUrl: '', price: 1000 }}
        onClickItem={handleClickItem}
        onClickCart={handleClickCart}
      />
    );

    expect(container).not.toBeNull();
    expect(container).toHaveTextContent('item');
    expect(container).toHaveTextContent('1000 원');
  });

  it('Click card item, call handleClickItem', () => {
    const { getByRole } = render(
      <ProductCard
        item={{ id: 1, name: 'item', imageUrl: '', price: 1000 }}
        onClickItem={handleClickItem}
        onClickCart={handleClickCart}
      />
    );

    userEvent.click(getByRole('listitem'));
    expect(handleClickItem).toBeCalled();
  });

  it('Click cart button, call handleClickCart', () => {
    const { getByRole } = render(
      <ProductCard
        item={{ id: 1, name: 'item', imageUrl: '', price: 1000 }}
        onClickItem={handleClickItem}
        onClickCart={handleClickCart}
      />
    );

    const cartButton = getByRole('button');
    userEvent.click(cartButton);

    expect(handleClickCart).toBeCalled();
  });
});
