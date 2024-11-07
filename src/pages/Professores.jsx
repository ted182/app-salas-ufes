import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

//  importação do contexto
import DadosContext from '../contexts/dados';
import { indexedDBLocalPersistence } from 'firebase/auth';



const cabecalho = [
    { id: 0, value: 'ID' },
    { id: 1, value: 'Nome' },
    { id: 2, value: 'Departamento' },
    { id: 3, value: 'Matéria' }
];

function transformaEmArray(obj) {

    const arr = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    console.log(values)

    values.forEach((k, idx) => {
        if (idx) arr.push( { id: keys[idx], ...k} )
    });

    /*
    keys.forEach(k => {
        //  pular o id 0
        if (k > 0) {
            arr.push({
                id: k,
                nome: values[k].nome,
                departamento: values[k].departamento,
                disciplina: values[k].disciplina
            });
        };
    });
    */
    return arr;
};



const Professores = () => {

    const { dados } = useContext(DadosContext);

    const [tabelaProfs, setTabelaProfs] = useState(transformaEmArray(dados.professores));

    //const tabela = transformaEmArray(dados.professores);
    function handleAddProfessor(event) {
        event.preventDefault();
        dados.addProfessor('Juliana Tedesca', 'Eng. Civil', 'Direito');
        setTabelaProfs( transformaEmArray(dados.professores) );
        console.log('professor adicionado!');
    };

    function handleDeleteProfessor(id) {
        //event.preventDefault();
        //console.log(id)
        if (dados.removeProfessor(id)) {
            setTabelaProfs( transformaEmArray(dados.professores) );
            console.log('professor removido com sucesso!')
            return;
        };
        console.log('erro ao deletar professor!');
    };

    return (
        <div className='w-screen'>

            <div className='p-4 flex justify-center'>
                <button className='bg-green-600 p-2' onClick={ev => handleAddProfessor(ev)}> Adicionar Professor</button>
            </div>

            <div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            {cabecalho.map((d, index) => (
                                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{d.value}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">


                        {tabelaProfs.map((prof, idp) => (

                            <tr key={idp}>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className='bg-slate-200 p-2' onClick={() => handleDeleteProfessor(prof.id)}>Deletar</button>
                                    <button className='bg-slate-200 p-2 ml-2'>Editar</button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {prof.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {prof.nome}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {prof.departamento}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {prof.disciplina}
                                </td>

                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default Professores