"use client";
import styles from "./home.module.css";

const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";
export default function Home () {
    return (
    <div>
        <div className={styles.navbr}>
            <div>
                <img src={Logo}  className={styles.logo}></img>
                <div className={styles.info}>
                    <span>Início</span>
                    <span>Como Funciona</span>
                    <span>Sobre Nós</span>
                    <span>Contato</span>
                </div>
            </div>
        </div>

     
    </div>
    )
}