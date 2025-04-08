import Image from "next/image";
import styles from "./page.module.css";
import Inicio from "./inicio/page";
import Cadastro from "./cadastro/page";
import Login from "./login/page"
import Perfil from "./perfil/page"
import Demandas from "./demanda/demandas.page"
import CriarOferta from "./oferta/page";
import Chat from "./chat/page";
import Suporte from "./suporte/page";
import Esqueceu1 from "./esqueceu_senha1/page"

export default function dev() {
  return (
    <Esqueceu1></Esqueceu1>
  );
}
