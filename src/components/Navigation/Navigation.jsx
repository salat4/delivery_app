import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css"
const Navigation = () => {
    return (
        <>
            <header className={style.header}>

                        <nav className={style.Nav}>
                            <NavLink className={style.Shop} to="/"> Shop</NavLink>
                            <NavLink className={style.ShopCart} to="/shopping-cart"> Shopping Cart</NavLink>
                        </nav>

              
            </header>
        </>
    )
}
export default Navigation;