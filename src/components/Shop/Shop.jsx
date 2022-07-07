import * as API from "../Fetch/Fetch";
import { useState,useEffect } from "react";
import style from './Shop.module.css'
const Shop = () => {
    const [shops, setShops] = useState(null);
    const [id, setId] = useState(0);
    useEffect(() => {
        async function FetchShop() {
            const shops = await API.FetchShop()
            setShops(shops)
        }
        FetchShop() 
    }, [])
    

    const handleShop = (e) => {
        // console.log(e.target.id)
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
                </ul>
            </div>
            <div className={style.Product__box}>
                <ul className={style.Product__List}>
                    {shops && 
                        
                            shops[id].menu.map((product) => (
                                <li className={ style.Product__Item}>
                                    <img alt="product"></img>
                                    <div className={style.Product__Description}>
                                        <span className={style.Product__Description__Item}>{product.name}</span>  
                                        <div className={style.Product__Description__Item}>{product.sizes.map((size) => (
                                            <span className={style.Product__Description__Size}>{ size}</span>
                                        ))}</div> 
                                        <span className={style.Product__Description__Item}>{ product.price}</span>
                                    </div>
                                    
                                    
                                </li>
                            ))}
                        
                        
                        {/* {  shops &&  shops.map((shop) => (
                            <li key = {shop.id} className={style.Product__Item}>
                                <span className={style.Product__Name}>{shop.shop_name}</span>
                                <span className={style.Product__Price}>{shop.shop_name}</span>
                                
                            </li>
                        ))} */}
                    </ul>
            </div>
        </section>
    )
}
export default Shop