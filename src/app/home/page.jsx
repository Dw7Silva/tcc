"use client";
import styles from "./home.module.css";

const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";
export default function Home () {
    return (
    <div>
        <div className={styles.navbr}>
            <div>
                <img src={Logo}  className={styles.logo}></img>
            </div>
        </div>

       <div className={styles.container}>
            <h1>0000</h1>
        </div>
    </div>
    )
}