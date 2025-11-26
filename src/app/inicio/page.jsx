"use client";
import styles from "./inicio.module.css";
import Carousel from "./carrosel";
import { useState, useEffect } from "react";
import BarraNvg from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function Inicio() {

  const Carroselimages = [
    "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg",
    "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg",
    "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg",
    "https://feed.continente.pt/media/aaeoih2v/amendoim-beneficios.jpg",
    "https://s2-ge.glbimg.com/fJ1Qo8xVlmVQH5cGcNq16UBgoqk=/0x0:1273x824/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/K/z/2SS07CSRe6kf6XQhBjtw/amendoim.jpg",
  ];

  // 🔥 Detecta automaticamente o tema do sistema (claro/escuro)
  const [tema, setTema] = useState("light");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTema(prefersDark ? "dark" : "light");

    // Atualiza se o usuário mudar o tema do sistema
    const listener = (e) => setTema(e.matches ? "dark" : "light");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    };
  }, []);

  return (
    <>
      <BarraNvg />

      {/* Aplica o tema AQUI – não mexe no resto do layout */}
      <div className={tema === "dark" ? styles.darkTheme : styles.lightTheme}>
        <div className="tudo">

          <div className={styles.container}>
            <div className={styles.destaquescontainer}>
              <h1 className={styles.textdestaques}>Nossos destaques</h1>
            </div>

            <div className={styles.carouselContainer}>
              <Carousel images={Carroselimages} />
            </div>

            <div className={styles.produtoscontainer}>
              <h1 className={styles.textprodutos}>Principais Produtos</h1>
            </div>

            <div className={styles.produtosGrid}>
              <div className={styles.produtoItem}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-jueBrZJmix2Lzhx3CDl0sTh-3Q-0qiVEfQ&s"
                  alt="Produto 1"
                  className={styles.produtoImg}
                />
                <h1 className={styles.produtoTitulo}>Amendoim c/ casca</h1>
              </div>

              <div className={styles.produtoItem}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNf7U3GwL5ibmFc0nbody6nqdBAi9af7cbkA&s"
                  alt="Produto 2"
                  className={styles.produtoImg}
                />
                <h1 className={styles.produtoTitulo}>Amendoim c/ pele</h1>
              </div>

              <div className={styles.produtoItem}>
                <img
                  src="https://cdn.awsli.com.br/2500x2500/2777/2777231/produto/309434382/amendoim-torrado-sempele-dtm9zuthq1.jpg"
                  alt="Produto 3"
                  className={styles.produtoImg}
                />
                <h1 className={styles.produtoTitulo}>Amendoim s/ pele</h1>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
