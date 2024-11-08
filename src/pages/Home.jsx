
import React, { useContext, useState, useEffect } from 'react';

//  importação do contexto
import DadosContext from '../contexts/dados';

//  importação dos componentes
import TabelaSemana from '../components/TabelaSemana';
import Modal from '../components/Modal';





function transformaEmArray(obj) {

    //console.log(obj)
    const arr = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    values.forEach((k, idx) => {
        arr.push({ id: keys[idx], ...k })
    });
    return arr;
};

const Home = () => {

    const { dados, setModalData } = useContext(DadosContext);

    const [tabela, setTabela] = useState(null);
    const [salas, setSalas] = useState([{ id: 0, nome: '-', predio: '-' }]);

    // variaveis de estilização dos botões das salas
    const [pressedColor, setPressedColor] = useState(null);

    //   variáveis do filtro das salas
    const [filterText, setFilterText] = useState('');



    useEffect(() => {
        //console.log('rodou');
        if (!dados?.salas) return; // Retorna se não houver dados
        //console.log('pegou os dados');
        setSalas(transformaEmArray(dados.salas));
    }, [dados]);


    const handleClick = (id) => {
        //dados.setAgenda(id, 'quarta', 5, 2);
        //console.log(dados.salas[id])
        setTabela(dados.salas[id]);
        setModalData({ idSala: id, idDia: 0, idHorario: 0, idProfessor: 0 });
        setPressedColor(id);
    };


    const filteredData = salas.filter(
        (item) =>
            item.nome.toLowerCase().includes(filterText.toLowerCase()) ||
            item.predio.toLowerCase().includes(filterText.toLowerCase())
    );


    return (
        <>
            <Modal />
            <div>
                <div className='mt-4 flex justify-center'>
                    <input
                        type='text'
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder='Digite a sala para filtrar'
                        className='bg-slate-200 p-2 rounded-md text-center' />
                </div>
                <div className=''>
                    {filteredData.map(sala => (
                        <button
                            key={sala.id}
                            className={`p-4 ml-4 mt-4 ${pressedColor === sala.id ? 'bg-red-200' : 'bg-sky-500/50'} hover:outline-none hover:ring-2 hover:ring-black`}
                            onClick={() => handleClick(sala.id)}>

                            <div className='flex flex-col'>
                                <span>{sala.nome}</span>
                                <span>{sala.predio}</span>
                            </div>

                        </button>
                    ))}
                </div>
            </div>

            <div className='mt-10'>
                <TabelaSemana tabela={tabela} />
            </div>
        </>
    )
}

export default Home;