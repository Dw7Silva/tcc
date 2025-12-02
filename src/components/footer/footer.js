import React, { useState } from "react";
import styles from "./footer.module.css";


export default function Footer() {
  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  const [showPolitica, setShowPolitica] = useState(false);
  const [showTermos, setShowTermos] = useState(false);

  function abrirPolitica() {
    setShowPolitica(true);
    setShowTermos(false);
  }

  function abrirTermos() {
    setShowTermos(true);
    setShowPolitica(false);
  }

  function fechar() {
    setShowPolitica(false);
    setShowTermos(false);
  }

  return (
    <>
      {/* POLÍTICA (Só aparece quando showPolitica === true) */}
      {showPolitica && (
        <div className={styles.Politica}>
          <div className={styles.card}>
            <button className={styles.btnClose} onClick={fechar}>X</button>
            <h1>Política de Privacidade</h1>

         <p>A sua privacidade é importante para nós. É política do Peanut Drop respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Peanut Drop, e outros sites que possuímos e operamos.

                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.

                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.

                Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.

                O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.

                Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.

                O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.


                Compromisso do Usuário
                O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Peanut Drop oferece no site e com caráter enunciativo, mas não limitativo:

                A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
                B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
                C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Peanut Drop, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
                Mais informações
                Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.

                Esta política é efetiva a partir de 21 Novembro 2025 12:23

            </p>
          </div>
        </div>
      )}

      {/* TERMOS (Só aparece quando showTermos === true) */}
      {showTermos && (
        <div className={styles.TermosdeUso}>
          <div className={styles.card}>
            <button className={styles.btnClose} onClick={fechar}>X</button>
            <h1>Termos de Uso</h1>

               1. Termos
                Ao acessar ao site Peanut Drop, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
        
            <p>
                2. Uso de Licença
                É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Peanut Drop , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode: 
                modificar ou copiar os materiais; 
                usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial); 
                tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Peanut Drop; 
                remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou 
                transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.
                Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Peanut Drop a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
            </p>
            <p>
                3. Isenção de responsabilidade
                Os materiais no site da Peanut Drop são fornecidos 'como estão'. Peanut Drop não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                Além disso, o Peanut Drop não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
            </p>  
            <p> 
                4. Limitações
                Em nenhum caso o Peanut Drop ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Peanut Drop, mesmo que Peanut Drop ou um representante autorizado da Peanut Drop tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.
            </p>  
            <p> 
                5. Precisão dos materiais
                Os materiais exibidos no site da Peanut Drop podem incluir erros técnicos, tipográficos ou fotográficos. Peanut Drop não garante que qualquer material em seu site seja preciso, completo ou atual. Peanut Drop pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Peanut Drop não se compromete a atualizar os materiais.
             </p>   
            
            <p>
                6. Links
                O Peanut Drop não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Peanut Drop do site. O uso de qualquer site vinculado é por conta e risco do usuário.
                Modificações
                O Peanut Drop pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
                Lei aplicável
                Estes termos e condições são regidos e interpretados de acordo com as leis do Peanut Drop e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
            </p>
           
       
        </div>
        </div>
      )}

      {/* FOOTER NORMAL */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>

          <div className={styles.footerCol}>
            <img src={Logo} alt="Logo do site" className={styles.logo} />
          </div>

          <div className={styles.footerCol}>
            <h3>Institucional</h3>
            <a href="/">Sobre Nós</a>
            <a href="/">Missão & Visão</a>
            <a href="/">Nossa História</a>
            <a href="/">Trabalhe Conosco</a>
          </div>

          <div className={styles.footerCol}>
            <h3>Serviços</h3>
            <a href="/">Consultoria</a>
            <a href="/">Suporte Técnico</a>
            <a href="/">Treinamentos</a>
            <a href="/">Parcerias</a>
          </div>

          <div className={styles.footerCol}>
            <h3>Ajuda</h3>
            <a href="/">Central de Ajuda</a>
            <a href="/">FAQ</a>
            <a onClick={abrirPolitica} style={{ cursor: "pointer" }}>Política de Privacidade</a>
            <a onClick={abrirTermos} style={{ cursor: "pointer" }}>Termos de Uso</a>
          </div>

          <div className={styles.footerCol}>
            <h3>Contato</h3>
            <a href="/">Email</a>
            <a href="/">Telefone</a>
            <a href="/">Rede social</a>
          </div>

          <div className={styles.footerCol}>
            <h3>Membros</h3>
            <a href="/">Marcos Daniel</a>
            <a href="/">Derick Willson</a>
            <a href="/">Fabrício Mansano</a>
            <a href="/">Calebe Sanches</a>
            <a href="/">Giovanny Martins</a>
          </div>

        </div>

        <div className={styles.footerCopy}>
          <p>© {new Date().getFullYear()} - Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
