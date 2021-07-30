import React, { useState, useEffect } from 'react';
import FormularioCadastro from './FormularioCadastro';
import fireDB from '../database/firebase';

const Cadastro = () => {

   let [ dados, setDados ] = useState({});
   let [ idAtual, setIdAtual ] = useState('');

   useEffect(() => {
      fireDB.child('pacientes').on('value', dbPhoto => {
         if(dbPhoto.val() !== null){
            setDados({
               ...dbPhoto.val()
            })
         } else {
            setDados({});
         }
      })
   }, [])

   const deletePaciente = id => {
      if(window.confirm('Deseja Deletar O Cadastro Deste Paciente?')){
         fireDB.child(`pacientes/${id}`).remove(err => {
            if(err) {
               console.log(err);
            }
         })
      }
   }

   const addEdit = obj => {

      if(idAtual === ''){
         fireDB.child('pacientes').push(obj, err => {
            if (err) {
               console.log(err);
            } else {
               setIdAtual('');
            }
         });
      } else {
         fireDB.child(`pacientes/${idAtual}`).set(obj, err => {
            if (err) {
               console.log(err);
            } else {
               setIdAtual('');
            }
         });
      }
   }

   return (
      <div>
         <div className="jumbotron jumbotron-fluid">
            <div className="container">
               <h1 className="display-4">Cadastro de usuários</h1>
               <p className="lead">Sistema Feito Rapidin Antes Do Jogo Do Brasil hehe ^^</p>
            </div>
         </div>

         <div className="row">
            <div className="col-md-5">
               <FormularioCadastro  {...({ dados, idAtual, addEdit }) } />
            </div>

            <div className="col-md-7">
               <table className="table table-bordeless table-stripped center">
                  <thead className="light">
                     <tr>
                        <td>Nome Completo</td>
                        <td>E-Mail</td>
                        <td>Telefone</td>
                        <td>Ações</td>
                     </tr>
                  </thead>

                  <tbody>
                     {
                        Object.keys(dados).map(id => {
                           return(
                              <tr key = { id }>
                                 <td>{ dados[id].nomeCompleto }</td>
                                 <td>{ dados[id].email }</td>
                                 <td>{ dados[id].telefone }</td>
                                 <td>
                                    <button className = 'btn btn-primary' onClick = { () => setIdAtual(id) }>
                                       <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className = 'btn btn-danger' onClick = { () => deletePaciente(id) }>
                                       <i className="fas fa-trash-alt"></i>
                                    </button>
                                 </td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}

export default Cadastro;