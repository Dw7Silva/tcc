"use client";
import styles from "./home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from '@/components/footer/footer';

const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

export default function Home() {
  return (
    <div className={styles.body}>
      {/* NAVBAR */}
      <div className={styles.navbr}>
        <div>
          <img src={Logo} className={styles.logo} alt="Logo" />
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

      {/* CARROSSEL DEPOIMENTOS */}
      <div className={styles.carouselContainer}>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
         
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000}}
          loop={true}
          className={styles.swiperCustom}
        >
          <SwiperSlide>
            <div className={styles.slideContent}>
           <img
          src="https://imgur.com/etVCFjJ.png"
          alt="fundo"
          className={styles.imagem}
        />
              <h3>"Conectando o agro com as empresas!"</h3>
              <p>Ajudando o seu negocio!</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slideContent}>
              <img
          src="https://imgur.com/etVCFjJ.png"
          alt="fundo"
          className={styles.imagem}
        />
              <h3>"A plataforma simplificou nossa compra de matéria-prima."</h3>
              <p>- Maria, Compradora</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slideContent}>
                  <img
                   src="https://imgur.com/etVCFjJ.png"
                  alt="fundo"
                  className={styles.imagem}
                 />
              <h3>"Transações seguras e suporte excelente!"</h3>
              <p>- Pedro, Produtor</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      
      {/* Como podemos Ajudar */}
      <div className={styles.fundocpa}>
        <div className={styles.ajuda}>
          <h1> Como podemos ajudar </h1>
        </div>

        <div className={styles.card}>
          <div className={styles.agr}>
            <h3>Agricultor</h3>
            <span>
              Acesso direto a compradores, melhores preços e visibilidade para sua
              produção de amendoim.
            </span>
          </div>

          <div className={styles.empre}>
            <h3>Empresa</h3>
            <span>
              Encontre produtores confiáveis, negocie diretamente e garanta
              amendoim de qualidade para seu negócio.
            </span>
          </div>

          <div className={styles.ts}>
            <h3>Transações Seguras</h3>
            <span>
              Garantimos a segurança das negociações, com verificação de qualidade
              e pagamentos protegidos.
            </span>
          </div>
        </div>
      </div>

      {/* Como Funciona */}
      <div className={styles.comofun}>
        <div className={styles.comoh1}><h1>Como Funciona</h1></div>
        <div className={styles.containerPassos}>
          <div className={styles.espaço}>
            <div className={styles.passo}>
              <h1>1</h1>
            </div>
            <div className={styles.fazer}>
              <h1>Cadastre-se</h1>
            </div>
            <div className={styles.conta}>
              <p>Crie sua conta como produtor ou empresa compradora.</p>
            </div>
          </div>

          <div className={styles.espaço2}>
            <div className={styles.passo2}>
              <h1>2</h1>  
            </div>
            <div className={styles.fazer2}>
              <h1>Anuncie ou Busque</h1>
            </div>
            <div className={styles.publique}>
              <p>Publique sua produção ou encontre amendoim disponível.</p>
            </div>
          </div>

          <div className={styles.espaço3}>
            <div className={styles.passo3}>
              <h1>3</h1>
            </div>
            <div className={styles.fazer3}>
              <h1>Negocie</h1>
            </div>
            <div className={styles.conta3}>
              <p>Converse diretamente e estabeleça os melhores termos.</p>
            </div>
          </div>

          <div className={styles.espaço4}>
            <div className={styles.passo4}>
              <h1>4</h1>
            </div>
            <div className={styles.fazer4}>
              <h1>Conclua</h1>
            </div>
            <div className={styles.conta4}>
              <p>Finalize a transação com segurança através da nossa plataforma.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rev}>
        <h1>Pronto para Revolucionar seu Negócio de Amendoim?</h1>
        <p>Junte-se a centenas de agricultores e empresas que já estão </p> 
        <p>economizando tempo e aumentando seus lucros com nossa plataforma.</p>
        <div className={styles.botao}>
          <span className={styles.faleconos}>Cadastra-se Gratuitamente</span>
          <span className={styles.cadasgra}>Fale Conosco</span>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
