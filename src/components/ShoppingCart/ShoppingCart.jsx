import * as API from "../Fetch/Fetch";
import { useSelector, useDispatch } from "react-redux";
import style from "./ShoppingCart.module.css";
import { v4 as uuidv4 } from "uuid";
import Notiflix from "notiflix";
import { useState, useEffect } from "react";
import { resetOrder, setAmount } from "../../redux/orderSlice";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const products = useSelector((state) => state.order.products);
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    id: uuidv4(),
  });
  const navigate = useNavigate();
  useEffect(() => {
    const ids = products.map((product) => product.id);

    async function FetchProduct() {
      const product = await API.FetchProduct(ids);
      setProductDetails(product);
    }
    FetchProduct();
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPersonalInfo({
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.tel.value,
      address: e.target.address.value,
    });
    async function PostOrder() {
      await API.PostOrder({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.tel.value,
        address: e.target.address.value,
        products,
      });
    }
    PostOrder();
    e.target.reset();
    dispatch(resetOrder());
    navigate("/");
    Notiflix.Notify.info("Your order are success add");
  };
  const handleAmoutChange = (e) => {
    e.preventDefault();
    dispatch(setAmount({ id: e.target.id, amount: e.target.value }));
  };
  return (
    <section className={style.Products}>
      <div className={style.Personal}>
        <form onSubmit={handleSubmit} className={style.Personal__form}>
          <label className={style.Personal__label}>
            Name:
            <input className={style.Personal__input} type="text" name="name" />
          </label>
          <label className={style.Personal__label}>
            Email:
            <input
              className={style.Personal__input}
              type="email"
              name="email"
            />
          </label>
          <label className={style.Personal__label}>
            Phone:
            <input className={style.Personal__input} type="tel" name="tel" />
          </label>
          <label className={style.Personal__label}>
            Address:
            <input
              className={style.Personal__input}
              type="text"
              name="address"
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={style.Products__box}>
        {productDetails.length !== 0 ? (
          <ul>
            {productDetails.map((product) => (
              <li key={product.id} className={style.Product__Item}>
                <div className={style.Product__Description}>
                  <span className={style.Product__Description__Item}>
                    {product.name}
                  </span>
                  <span>{product.price}$</span>
                  <input
                    type="number"
                    name={product.name}
                    id={product.id}
                    value={
                      products.find((element) => element.id === product.id)
                        .amount
                    }
                    onChange={handleAmoutChange}
                    className={style.Product__Description__Amount}
                  ></input>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not ordered anything</p>
        )}
      </div>
    </section>
  );
};
export default ShoppingCart;
