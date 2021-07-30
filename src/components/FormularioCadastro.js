import React, { useEffect, useState } from 'react';

const FormularioCadastro = (props) => {

   const dadosIniciais = {
      nomeCompleto: '',
      email: '',
      telefone: '',
      endereco: ''
   }

   useEffect(() => {
      if(props.idAtual === ''){
         setValues({
            ...dadosIniciais
         });
      } else {
         setValues({
            ...props.dados[props.idAtual]
         });
      }
   }, [props.idAtual, props.dados]);

   let [values, setValues] = useState(dadosIniciais);

   const manipuladorDoInput = e => {
      let { name, value } = e.target;

      setValues({
         ...values,
         [name]: value
      })
   }

   const submitForm = e => {
      e.preventDefault();

      props.addEdit(values);

      setValues({
         ...dadosIniciais
      })
   }

   return (
      <form autoComplete='off' onSubmit = { submitForm }>
         <div className="form-group input-group">
            <div className="input-group-prepend">
               <div className="input-group-text">
                  <i className="fas fa-user"></i>
               </div>
            </div>

            <input
               type="text"
               className="form-control"
               placeholder="Nome Completo"
               name="nomeCompleto"
               value={values.nomeCompleto}
               onChange={manipuladorDoInput}
            />
         </div>

         <div className="row">
            <div className="form-group input-group col-md-6">
               <div className="input-group-prepend">
                  <div className="input-group-text">
                     <i className="fas fa-mobile-alt"></i>
                  </div>
               </div>

               <input
                  type="phone"
                  className="form-control"
                  placeholder="Telefone"
                  name="telefone"
                  value={values.telefone}
                  onChange={manipuladorDoInput}
               />
            </div>

            <div className="form-group input-group col-md-6">
               <div className="input-group-prepend">
                  <div className="input-group-text">
                     <i className="fas fa-envelope"></i>
                  </div>
               </div>

               <input
                  type="email"
                  className="form-control"
                  placeholder="E-Mail"
                  name="email"
                  value={values.email}
                  onChange={manipuladorDoInput}
               />
            </div>
         </div>

         <div className="form-group">
            <textarea
               className="form-control"
               placeholder="Endereço"
               name='endereco'
               value={values.endereco}
               onChange={manipuladorDoInput}>
            </textarea>
         </div>

         <div className="form-group">
            <input type="submit" value={ props.idAtual === '' ? "Salvar" : "Atualizar" } className="btn btn-primary btn-block" />
         </div>
      </form>
   )
}

export default FormularioCadastro;