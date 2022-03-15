import productsRequest from '../../service/apis/products';
import { Product } from '../../shared/types';

export interface ServerSideProps {
  /**보여줄 상품의 정보*/
  product: Product;
}

const ProductDetailPage = ({ product }: ServerSideProps) => {
  const { id, price, name, imageUrl } = product;

  return (
    <>
      <div>{id}</div>
      <div>{price}</div>
      <div>{name}</div>
      <img src={imageUrl} alt={'product image'} />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const id = context.params.productId;
  const product = await productsRequest.getProductById(id);

  return {
    props: {
      product,
    },
  };
}

export default ProductDetailPage;
