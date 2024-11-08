import React, { useState, useContext, useEffect } from 'react';
import { Pencil, Trash2, Save } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

//  importação do contexto
import DadosContext from '../contexts/dados';



const cabecalho = [
    { id: 0, value: 'ID' },
    { id: 1, value: 'Nome' },
    { id: 2, value: 'Prédio' },
];

function transformaEmArray(obj) {

    //console.log(obj)
    const arr = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    //console.log(values)

    values.forEach((k, idx) => {
        arr.push({ id: keys[idx], ...k })
    });

    return arr;
};



const Salas = () => {

    const { dados, dadosAux, setDadosAux } = useContext(DadosContext);

    //const location = useLocation();

    const [tabelaRooms, setTabelaRooms] = useState([{ id: 0, nome: 0, predio: 0 }]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ nome: '', predio: '' });

    // variaveis de estilização da tabela
    const [focusColor, setFocusColor] = useState(null);

    useEffect(() => {
        //console.log('rodou');
        if (!dados?.salas) return; // Retorna se não houver dados
        setTabelaRooms(transformaEmArray(dados.salas));
    }, [dados]);

    





    function handleAddRoom(event) {
        //event.preventDefault();
        dados.addSala('-', '-');
        setDadosAux((prevVar) => prevVar + 1);
        setTabelaRooms( transformaEmArray(dados.salas) );
        console.log('sala adicionada com sucesso!')
    };

    function handleDeleteRoom(id) {
        //event.preventDefault(); 
        if (editingId) return;
        if (dados.removeSala(id)) {
            //setDadosAux((prevVar) => prevVar + 1);
            setTabelaRooms(transformaEmArray(dados.salas));
            console.log('sala removida com sucesso!')
            return;
        };
        console.log('erro ao deletar sala!');
    };

    //  função pra trocar os botões de edit pra save e os campos pra input text
    function handleEditClick(user, idRowTable) {
        setFocusColor(idRowTable);
        setEditingId(user.id);
        setEditFormData({
            nome: user.nome,
            predio: user.predio,
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
        const newUsers = tabelaRooms.map(user => {
            if (user.id === prof.id) {
                return {
                    ...user,
                    nome: editFormData.nome,
                    predio: editFormData.predio,
                };
            }
            return user;
        });
        //  adicionar checagem para caso de erro na edicao dos dados gerais   
        dados.setSala(prof.id, editFormData.nome, editFormData.predio);             // salva no objeto geral
        setDadosAux((prevVar) => prevVar + 1);
        setTabelaRooms(newUsers);                                                   // seta novo usuario no frontend
        setEditingId(null);                                                         // desativa o modo edição
        setFocusColor(null);
    };



    return (
        <div className='w-screen'>

            <div className='p-4 flex justify-center'>
                <button className='bg-green-500 p-2 rounded' onClick={ev => handleAddRoom(ev)}> Adicionar Sala</button>
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


                        {tabelaRooms.map((prof, idp) => (

                            <tr key={idp} className={`${focusColor === idp ? 'bg-red-200' : ''} hover:bg-gray-100`}>

                                <td className="px-6 py-4 whitespace-nowrap">

                                    <button className='bg-red-500 p-3' onClick={() => handleDeleteRoom(prof.id)}>
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
                                            name="predio"
                                            value={editFormData.predio}
                                            onChange={handleEditFormChange}
                                            className="px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        prof.predio
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

export default Salas