import { Product } from './Product'
import { useSelector } from 'react-redux'

function Home() {
  const products = useSelector(state => state.products)
  return (
    <div>
      {products.map(product => <Product key={product.productId} product={product} />)}
    </div>
  );
}

export default Home;