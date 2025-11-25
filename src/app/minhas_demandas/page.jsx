"use client";
import React from "react";
import styles from "./minhasdemandas.module.css"; 
import BarraNvg from "@/components/navbar/navbar";

export default function MinhasDemandas() {
  const usuarioAtual = "Amenco"; // Exemplo: nome da empresa logada

  const todasDemandas = [
    { id: 1, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "50 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
    { id: 2, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "50 saca", imagem: "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg" },
    { id: 3, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem: "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg" },
    { id: 4, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "40 saca", imagem: "https://feed.continente.pt/media/aaeoih2v/amendoim-beneficios.jpg" },
    { id: 5, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "55 saca", imagem: "https://s2-ge.glbimg.com/fJ1Qo8xVlmVQH5cGcNq16UBgoqk=/0x0:1273x824/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/K/z/2SS07CSRe6kf6XQhBjtw/amendoim.jpg" },
    { id: 6, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "60 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
  ];

  const minhasDemandas = todasDemandas.filter(d => d.nome_empresa === usuarioAtual);

  return (
    <>
      <BarraNvg />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h2>Minhas Demandas</h2>
            </div>
          </div>

          <div className={styles.demandasGrid} style={{ overflowX: "unset", flexWrap: "wrap" }}>
            {minhasDemandas.length > 0 ? (
              minhasDemandas.map((demanda) => (
                <div key={demanda.id} className={styles.demandaCard}>
                  <h4 className={styles.empresa}>{demanda.nome_empresa}</h4>
                  <div className={styles.imageContainer}>
                    <img src={demanda.imagem} alt={demanda.tipo} />
                  </div>
                  <h3>{demanda.tipo}</h3>
                  <p className={styles.quantidade}>{demanda.quantidade}</p>
                  <button className={styles.detalhes}>Ver detalhes</button>
                </div>
              ))
            ) : (
              <p>Você ainda não possui nenhuma demanda cadastrada.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
