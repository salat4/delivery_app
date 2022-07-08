import * as API from "../Fetch/Fetch";
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from "react";
import style from './Shop.module.css'
import {  useDispatch } from 'react-redux'
import {addToOrder,countOrder} from '../../redux/orderSlice'

const Shop = () => {
    const [shops, setShops] = useState(null);
    const [id, setId] = useState(0);
    const [products, setProducts] = useState({
        id:"",count:0
    })
    useEffect(() => {
        async function FetchShop() {
            const shops = await API.FetchShop()
            setShops(shops)
        }
        FetchShop() 
    }, [])
      const dispatch = useDispatch()

    const handleAddToOrder = (e) => {
        dispatch(addToOrder({id:e.target.id,amount:1}))
    }

    const handleShop = (e) => {
        setId(e.target.id)
    }
    return (
        <section className={style.Shops}>
            <div className={style.Shop__Box}>
                <p>Shops</p>
                <ul className={style.Shop__List}>
                    {  shops &&  shops.map((shop) => (
                        <li id = {shop.id} onClick ={handleShop} key = {shop.id} className={style.Shop__Item}>
                            <span id = {shop.id} className={style.Shop__Name}>{ shop.shop_name}</span>
                        </li>
                    ))}
                </ul>{
                }
            </div>
            <div className={style.Product__box}>
                <ul className={style.Product__List}>
                    {shops && 
                        
                        shops[id].menu.map((products) => (
                            products.product.map((product) => (
                                 <li key = {uuidv4()} id = {uuidv4()} className={style.Product__Item}>
                                    {/* <img alt="product"></img> */}
                                    <div className={style.Product__Description}>
                                        <span className={style.Product__Description__Item}>{product.name}</span> 
                                        <span>{product.price}$</span>
                                        <button id={product.id} onClick={handleAddToOrder}>Add to cart</button>
                                    </div>
                                </li>
                                ))
                            ))}
                    </ul>
            </div>
        </section>
    )
}
export default Shop






 