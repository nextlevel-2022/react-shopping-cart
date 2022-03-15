import { cartsReducerInitialState } from '../../../../shared/fixtures/cartsReducerInitialState';
import { createCartItem, createCartsReducerStateHasValue } from '../../../../shared/utils/test-utils';
import { cartsActions, cartsReducer } from '../slice';

describe('cartsReducer', () => {
  const { deleteCardItemById, increaseCartItemQuantityById, decreaseCartItemQuantityById } = cartsActions;

  // it('cartsReducer는 초깃값을 갖는다', () => {
  //   expect(cartsReducer(undefined, {})).toEqual(cartsReducerInitialState);
  // });

  describe('deleteCartItemById', () => {
    //   it('일치하는 id가 아니면 throw error', () => {});

    it('일치하는 id가 있는 경우 cartItem을 삭제', () => {
      const EXISTS_ID = 1;

      const cartItem = createCartItem(EXISTS_ID);
      const prevState = createCartsReducerStateHasValue([cartItem]);

      expect(cartsReducer(prevState, deleteCardItemById({ idToDeleteCartItem: EXISTS_ID }))).toEqual(
        createCartsReducerStateHasValue([]),
      );
    });
  });

  describe('increaseCartItemQuantityById', () => {
    // it('일치하는 id가 아니면 throw error', () => {});

    it('일치하는 id가 있는 경우 quantity를 증가', () => {
      const EXISTS_ID = 1;

      const PREV_QUANTITY = 1;
      const INCREASED_QUANTITY = PREV_QUANTITY + 1;

      const cartItem = createCartItem(EXISTS_ID, PREV_QUANTITY);
      const prevState = createCartsReducerStateHasValue([cartItem]);

      expect(cartsReducer(prevState, increaseCartItemQuantityById({ cartItemId: EXISTS_ID }))).toEqual(
        createCartsReducerStateHasValue([{ ...cartItem, quantity: INCREASED_QUANTITY }]),
      );
    });

    describe('decreaseCartItemQuantityById', () => {
      // it('일치하는 id가 아니면 error', () => {});

      it('일치하는 id가 있는 경우 quantity를 감소', () => {
        const EXISTS_ID = 1;

        const PREV_QUANTITY = 1;
        const DECREASED_QUANTITY = PREV_QUANTITY - 1;

        const cartItem = createCartItem(EXISTS_ID, PREV_QUANTITY);
        const prevState = createCartsReducerStateHasValue([cartItem]);

        expect(cartsReducer(prevState, decreaseCartItemQuantityById({ cartItemId: EXISTS_ID }))).toEqual(
          createCartsReducerStateHasValue([{ ...cartItem, quantity: DECREASED_QUANTITY }]),
        );
      });
    });
  });
});
