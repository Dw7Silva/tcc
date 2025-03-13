import styles from "./home.module.css";
import {GoHomeFill } from "react-icons/go"
import { FaSearch } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";






export default function Inicio() {
    return(
        <div className={styles.container}>
            <h1>Inicio</h1>
            <GoHomeFill size={30} color="A87453" />
      <FaSearch size={30} color="A87453" />
      <IoChatbox size={30} color="A87453" />
      <MdSupportAgent size={30} color="A87453" />
      <FaUser size={30} color="A87453" />

        </div>
    );
} 