import * as API from "../Fetch/Fetch";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import style from "./Shop.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addToOrder, setAmount } from "../../redux/orderSlice";
import Notiflix from 'notiflix';


const Shop = () => {
  const products = useSelector((state) => state.order.products);
  const [shops, setShops] = useState(null);

  const [id, setId] = useState(0);
  useEffect(() => {
    async function FetchShop() {
      const shops = await API.FetchShop();
      setShops(shops);
    }
    FetchShop();
  }, []);
  const dispatch = useDispatch();

  const handleAddToOrder = (e) => {
    if (products.length > 0) {


      for (let i = 0; i < products.length; i++){
        if (products[i].id === e.target.id) {
          dispatch(
          setAmount({
            name: e.target.name,
            id: e.target.id,
            amount:
              products.find(
                (element) => element.id === products[products.length - 1].id
              ).amount + 1,
          })
          )
           Notiflix.Notify.success('Add to Order');
          return
        }
      }
       Notiflix.Notify.success('Add to Order');
      dispatch(
          addToOrder({ id: e.target.id, amount: 1, name: e.target.name })
        );
    } else {
      Notiflix.Notify.success('Add to Order');

      dispatch(addToOrder({ id: e.target.id, amount: 1, name: e.target.name }));
    }
  };
  const handleShop = (e) => {
    setId(e.target.id);
  };
  return (
    <section className={style.Shops}>
      <div className={style.Shop__Box}>
        <p>Shops</p>
        <ul className={style.Shop__List}>
          {shops &&
            shops.shops.map((shop) => (
              <li
                id={shop.id}
                onClick={handleShop}
                key={shop.id}
                className={style.Shop__Item}
              >
                <span id={shop.id} className={style.Shop__Name}>
                  {shop.shop_name}
                </span>
              </li>
            ))}
        </ul>
        
      </div>
      <div className={style.Product__box}>
        <ul className={style.Product__List}>
          {shops &&
            shops.shops[id].menu.map((products) =>
              products.product.map((product) => (
                <li
                  key={uuidv4()}
                  id={uuidv4()}
                  className={style.Product__Item}
                >
                  <div className={style.Product__Description}>
                    <span className={style.Product__Description__Item}>
                      {product.name}
                    </span>
                    <span>{product.price}$</span>
                    <button
                      id={product.id}
                      name={product.name}
                      onClick={handleAddToOrder}
                    >
                      Add to cart
                    </button>
                  </div>
                </li>
              ))
            )}
        </ul>
      </div>
    </section>
  );
};
export default Shop;
