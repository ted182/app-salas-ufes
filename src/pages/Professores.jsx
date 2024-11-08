import React, { useState, useContext, useEffect } from 'react';
import { Pencil, Trash2, Save } from 'lucide-react';

//  importação do contexto
import DadosContext from '../contexts/dados';
//import { indexedDBLocalPersistence } from 'firebase/auth';



const cabecalho = [
    { id: 0, value: 'ID' },
    { id: 1, value: 'Nome' },
    { id: 2, value: 'Departamento' },
    { id: 3, value: 'Matéria' },
    { id: 4, value: 'Cor' }
];

function transformaEmArray(obj) {

    const arr = [];
    //const keys = Object.keys(obj);
    const values = Object.values(obj);

    //console.log(values)
    /*
    values.forEach((k, idx) => {
        if (idx) arr.push({ id: keys[idx], ...k })
    });
    */
    values.forEach((k, idx) => {
        if (idx) arr.push({ ...k })
    });

    return arr;
};



const Professores = () => {

    const { dados, dadosAux, setDadosAux } = useContext(DadosContext);

    const [tabelaProfs, setTabelaProfs] = useState([{ id: 0, cor: 0, nome: 0, departamento: 0, disciplina: 0 }]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nome: '',
        departamento: '',
        disciplina: '',
        cor: ''
    });

    // variaveis de estilização da tabela
    const [focusColor, setFocusColor] = useState(null);
    //const [corMaterias, setcorMaterias] = useState('#fff');

    useEffect(() => {
        //console.log('rodou');
        if (!dados?.professores) return; // Retorna se não houver dados
        setTabelaProfs(transformaEmArray(dados.professores));
    }, [dados]);

    //const tabela = transformaEmArray(dados.professores);
    function handleAddProfessor(event) {
        //event.preventDefault();
        dados.addProfessor('-', '-', '-', '-');
        setDadosAux((prevVar) => prevVar + 1);
        setTabelaProfs(transformaEmArray(dados.professores));
        console.log('professor adicionado!');
    };

    function handleDeleteProfessor(id) {
        //event.preventDefault();
        //console.log(id)
        if (editingId) return;
        if (dados.removeProfessor(id)) {
            setDadosAux((prevVar) => prevVar + 1);
            setTabelaProfs(transformaEmArray(dados.professores));
            console.log('professor removido com sucesso!')
            return;
        };
        console.log('erro ao deletar professor!');
    };

    //  função pra trocar os botões de edit pra save e os campos pra input text
    function handleEditClick(user, idRowTable) {
        setFocusColor(idRowTable);
        setEditingId(user.id);
        setEditFormData({
            nome: user.nome,
            cor: user.cor,
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

    //  função pra salvar os novos dados da edição dos professores
    function handleSaveClick(prof) {
        const newUsers = tabelaProfs.map(user => {
            if (user.id === prof.id) {
                return {
                    ...user,
                    nome: editFormData.nome,
                    cor: editFormData.cor,
                    departamento: editFormData.departamento,
                    disciplina: editFormData.disciplina
                };
            }
            return user;
        });
        
        //  adicionar checagem para caso de erro na edicao dos dados gerais   

        // salva no objeto geral
        dados.setProfessor(
            prof.id, 
            editFormData.nome, 
            editFormData.departamento, 
            editFormData.disciplina, 
            editFormData.cor
        ); 

        //setAgenda(salaId, diaSemana, horarioId, professorId)        
        //dados.setAgenda();     
        
        setDadosAux((prevVar) => prevVar + 1);
        setTabelaProfs(newUsers);               // seta novo usuario no frontend
        setEditingId(null);                     // desativa o modo edição
        setFocusColor(null);
    };



    return (
        <div className='w-screen'>

            <div className='p-4 flex justify-center'>
                <button className='bg-green-500 p-2 rounded' onClick={ev => handleAddProfessor(ev)}> Adicionar Professor</button>
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

                            <tr key={idp} className={`${focusColor === idp ? 'bg-red-200' : ''} hover:bg-gray-100`}>

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
                                        <button className='bg-slate-200 p-3 ml-2' onClick={() => handleEditClick(prof, idp)}>
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingId === prof.id ? (
                                        <input
                                            type="color"
                                            name="cor"
                                            value={editFormData.cor}
                                            onChange={handleEditFormChange}
                                            className="border-2 border-black h-6 w-6"
                                        />
                                    ) : (
                                        <div className='border-2 border-black h-6 w-6' style={{ backgroundColor: prof.cor }}></div>
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