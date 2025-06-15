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

                <div className={styles.ec}>
                    <span className={styles.login}>Entrar</span>
                    <span className={styles.cadastrar}>Cadastrar</span>
                </div>
            </div>

           

        </div>

     
            <div className={styles.teste}>
                <h1 className={styles.des}>Conectando Produtores de Amendoim e Empresas</h1>
                <span className={styles.sub} >Facilitamos a conexão entre agricultores e empresas para a compra e venda de amendoins, garantindo negociações rápidas e seguras.</span>


            </div>
    </div>
    )
}