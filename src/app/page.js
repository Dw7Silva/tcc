import Image from "next/image";
import styles from "./page.module.css";
import Inicio from "./inicio/page";
import Cadastro from "./cadastro/page";
import Login from "./login/page"
import Perfil from "./perfil/page"
import Demandas from "./demanda/demandas.page"
import CriarOferta from "./oferta/page";


export default function dev() {
  return (
    <CriarOferta></CriarOferta>
  );
}
