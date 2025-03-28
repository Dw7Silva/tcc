"use client";

import React, { useRef,  } from "react";
import styles from "./demandas.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Demandas() {
    const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";
    const cardWidth = 520; // 500 + 20 de margem
    const containerRefs = [useRef(null), useRef(null), useRef(null)];

    const demandas = [
        { id: 1, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "50 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
        { id: 2, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "50 saca", imagem: "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg" },
        { id: 3, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem: "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg" },
        { id: 4, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "40 saca", imagem: "https://feed.continente.pt/media/aaeoih2v/amendoim-beneficios.jpg?center=0.43958293115759167,0.45275669909355631&mode=crop&width=1090&height=467&rnd=133298540351630000&format=webp" },
        { id: 5, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "55 saca", imagem: "https://s2-ge.glbimg.com/fJ1Qo8xVlmVQH5cGcNq16UBgoqk=/0x0:1273x824/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/K/z/2SS07CSRe6kf6XQhBjtw/amendoim.jpg" },
        { id: 6, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "60 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
    ];

    // Função genérica para rolar os cards
    const scroll = (rowIndex, direction) => {
        if (containerRefs[rowIndex].current) {
            containerRefs[rowIndex].current.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
        }
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.logoContainer}>
                    <img src={Logo} alt="Logo" className={styles.logo} />
                </div>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Pesquise seu produto" />
                    <button><FaSearch /></button>
                </div>
                <div className={styles.navIcons}>
                    <GoHomeFill />
                    <IoChatbox />
                    <MdSupportAgent />
                    <FaUser />
                    <HiOutlineMenu />
                </div>
            </nav>

            <div className={styles.demandasContainer}>
                <div className={styles.header}>
                    <h2>Demandas</h2>
                    <div className={styles.filtro}>
                        <span>Filtro</span>
                        <select>
                            <option value="todos">Todos</option>
                            <option value="casca">Com Casca</option>
                            <option value="pele">Com Pele</option>
                            <option value="sempele">Sem Pele</option>
                        </select>
                    </div>
                </div>

                {/* Renderiza duas linhas de cards */}
                {containerRefs.map((ref, index) => (
                    <div key={index} className={styles.scrollContainer}>
                        <button className={styles.arrow} onClick={() => scroll(index, -1)}>
                            <IoIosArrowBack />
                        </button>
                        <div className={styles.demandasGrid} ref={ref}>
                            {demandas.map((demanda) => (
                                <div key={demanda.id} className={styles.demandaCard}>
                                    <p>{demanda.nome_empresa}</p>
                                    <img src={demanda.imagem} alt={demanda.tipo} />
                                    <h3>{demanda.tipo}</h3>
                                    <p>{demanda.quantidade}</p>
                                    <button>Ver detalhes do pedido</button>
                                </div>
                            ))}
                        </div>
                        <button className={styles.arrow} onClick={() => scroll(index, 1)}>
                            <IoIosArrowForward />
                        </button>
                    </div>
                ))}

                <button className={styles.criarOferta}>Criar Demanda</button>
            </div>
        </div>
    );
}
