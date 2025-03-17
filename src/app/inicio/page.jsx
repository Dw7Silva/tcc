import styles from "./home.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import Carousel from "./carrosel";


export default function Inicio() {

    const Carroselimages = [
        "https://placehold.co/600x400/EEE/31343C",
        "https://placehold.co/600x400/CCC/41444C",
        "https://placehold.co/600x400/AAA/51545C",
        "https://placehold.co/600x400/888/61646C",
        "https://placehold.co/600x400/666/71747C",
      ];
  return (


    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logoNav}>Meu Site</div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Pesquisar..." />
          <button>
            <FaSearch />
          </button>
        </div>

        <div className={styles.navIcons}>
          <GoHomeFill />
          <IoChatbox />
          <MdSupportAgent />
          <FaUser />
          <HiOutlineMenu />
        </div>
      </div>

      <div className={styles.carouselContainer}> {/* Adicione este container */}
        <Carousel images={Carroselimages} />
      </div>
      
    </div>
  );
}
