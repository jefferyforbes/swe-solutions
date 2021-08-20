import { Img } from './Img'
import { Link } from 'react-router-dom'
import { addToCart } from './index'
import { useDispatch } from 'react-redux'

export const Product = (props) => {
    const {
        productId,
        name,
        images,
        addedToCart
    } = props.product

    const dispatch = useDispatch()

    return (
        <article className="product">
            <h3>{name}</h3>
            <Img image={images[0]} />
            <ul>
                <li>Likes moisture</li>
                <li>Easy care</li>
                <li>&pound;6.99</li>
            </ul>
            <div>
                <Link to={`/products/${productId}`}>Full Details</Link>    
                <button onClick={() => dispatch(addToCart(props.product))}>{addedToCart ? 'Remove from' : 'Add to'} cart</button>
            </div>            
        </article>
    )
}