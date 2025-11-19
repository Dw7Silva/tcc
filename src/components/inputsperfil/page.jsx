"use client";
import styles from "./InputsPerfil.module.css"

export default function InputsPerfil({
  campos = [],
  editMode = false,
  onCepBlur,
  onCepFocus,
  cepError = '',
  hasCepError = false,
  valores = {},
  onChange
}) {
  
  // Função para renderizar cada campo baseado no tipo
  const renderCampo = (campo) => {
    const commonProps = {
      id: campo.name,
      placeholder: campo.placeholder,
      className: campo.className || styles.infoInput,
      readOnly: campo.readOnly || !editMode,
      value: valores[campo.name] || '',
      onChange: (e) => onChange?.(campo.name, e.target.value)
    };

    switch (campo.tipo) {
      case 'email':
        return <input type="email" {...commonProps} />;
        
      case 'tel':
        return <input type="tel" {...commonProps} />;
        
      case 'text':
        return <input type="text" {...commonProps} />;
        
      case 'textarea':
        return (
          <textarea 
            {...commonProps}
            className={styles.description}
            rows="4"
          />
        );
        
      case 'cep':
        return (
          <>
            <input
              type="text"
              {...commonProps}
              className={`${commonProps.className} ${hasCepError ? styles.inputError : ''}`}
              onBlur={(e) => onCepBlur?.(e.target.value)}
              onFocus={onCepFocus}
              maxLength={9}
            />
            {cepError && <span className={styles.errorMessage}>{cepError}</span>}
          </>
        );
        
      case 'cpfCnpj':
        return (
          <input
            type="text"
            {...commonProps}
            readOnly // CPF/CNPJ geralmente não é editável
          />
        );
        
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  // Agrupar campos em grupos de 3
  const grupos = [];
  for (let i = 0; i < campos.length; i += 3) {
    grupos.push(campos.slice(i, i + 3));
  }

 return (
    <div className={styles.inputsContainer}>
      {grupos.map((grupo, grupoIndex) => (
        <div key={grupoIndex} className={styles.camposGrupo}>
          {grupo.map((campo, campoIndex) => (
            <div key={campo.name || campoIndex} className={styles.formGroup}>
              <label htmlFor={campo.name}>{campo.label}</label>
              {renderCampo(campo)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};