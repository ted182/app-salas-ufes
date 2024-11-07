import React, { useState, useContext, useEffect } from 'react';
import { Pencil, Trash2, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

//  importação do contexto
import DadosContext from '../contexts/dados';
//import { indexedDBLocalPersistence } from 'firebase/auth';



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

    //console.log(values)

    values.forEach((k, idx) => {
        if (idx) arr.push({ id: keys[idx], ...k })
    });

    return arr;
};



const Professores = () => {

    const { dados } = useContext(DadosContext);

    const [tabelaProfs, setTabelaProfs] = useState([{ id: 0, nome: 0, departamento: 0, disciplina: 0 }]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nome: '',
        departamento: '',
        disciplina: ''
    });

    useEffect(() => {
        //console.log('rodou');
        if (!dados?.professores) return; // Retorna se não houver dados
        setTabelaProfs(transformaEmArray(dados.professores));
    }, [dados]);

    //const tabela = transformaEmArray(dados.professores);
    function handleAddProfessor(event) {
        event.preventDefault();
        dados.addProfessor('Juliana Tedesca', 'Eng. Civil', 'Direito');
        setTabelaProfs(transformaEmArray(dados.professores));
        console.log('professor adicionado!');
    };

    function handleDeleteProfessor(id) {
        //event.preventDefault();
        //console.log(id)
        if (dados.removeProfessor(id)) {
            setTabelaProfs(transformaEmArray(dados.professores));
            console.log('professor removido com sucesso!')
            return;
        };
        console.log('erro ao deletar professor!');
    };

    function handleEditClick(user) {
        setEditingId(user.id);
        setEditFormData({
            nome: user.nome,
            departamento: user.departamento,
            disciplina: user.disciplina
        });
    };

    function handleEditFormChange(event) {
        const { name, value } = event.target;
        setEditFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function handleSaveClick(prof) { 
        const newUsers = tabelaProfs.map(user => {
            if (user.id === prof.id) {
                return {
                    ...user,
                    nome: editFormData.nome,
                    departamento: editFormData.departamento,
                    disciplina: editFormData.disciplina
                };
            }
            return user;
        });     
        dados.setProfessor(prof.id, editFormData.nome, editFormData.departamento, editFormData.disciplina);     // salva no objeto geral
        setTabelaProfs(newUsers);                                                                               // seta novo usuario no frontend
        setEditingId(null);                                                                                     // desativa o modo edição
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
                                    <button className='bg-red-500 p-3' onClick={() => handleDeleteProfessor(prof.id)}>
                                        <div className='flex items-center'>
                                            <div><Trash2 className='w-4 h-4' /></div>
                                        </div>
                                    </button>

                                    {editingId === prof.id ? (
                                        <button className='bg-green-500 p-2 ml-2' onClick={() => handleSaveClick(prof)}>
                                            <div className='flex items-center'>
                                                <div><Save className='w-4 h-4' /></div>
                                                <div className='ml-2'>Salvar</div>
                                            </div>
                                        </button>
                                    ) : (
                                        <button className='bg-slate-200 p-3 ml-2' onClick={() => handleEditClick(prof)}>
                                            <div className='flex items-center'>
                                                <div><Pencil className='w-4 h-4' /></div>
                                            </div>
                                        </button>
                                    )}

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {prof.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingId === prof.id ? (
                                        <input
                                            type="text"
                                            name="nome"
                                            value={editFormData.nome}
                                            onChange={handleEditFormChange}
                                            className="px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        prof.nome
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingId === prof.id ? (
                                        <input
                                            type="text"
                                            name="departamento"
                                            value={editFormData.departamento}
                                            onChange={handleEditFormChange}
                                            className="px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        prof.departamento
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingId === prof.id ? (
                                        <input
                                            type="text"
                                            name="disciplina"
                                            value={editFormData.disciplina}
                                            onChange={handleEditFormChange}
                                            className="px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        prof.disciplina
                                    )}
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