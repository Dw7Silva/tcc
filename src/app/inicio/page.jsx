import styles from "./home.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";





export default function Inicio() {
    return (
        <>
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
    
         
           
             
        </>
      );
    }