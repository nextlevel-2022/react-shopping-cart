import { useRouter } from 'next/router';

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  return <div>{productId}</div>;
};

export default ProductDetail;
