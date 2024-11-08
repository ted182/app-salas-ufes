
import React, { useContext, useState, useEffect } from 'react';

//  importação do contexto
import DadosContext from '../contexts/dados';

//  importação dos componentes
import TabelaSemana from '../components/TabelaSemana';
import Modal from '../components/Modal';



function buscarHorario(dados, filtroHora, filtroDia) {
    //console.log(dados.salas)
    //console.log(filtroHora)
    //console.log(filtroDia)
    const keys = Object.keys(dados.salas);
    //console.log(keys)
    const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
    const horarios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const vistos = new Set();

    let arr = [];
    let res = [];

    if (!filtroDia && !filtroHora) return transformaEmArray(dados.salas);

    if (filtroDia && filtroHora) {
        //console.log('entrou as 2 condicoes')
        keys.forEach(key => {
            if (dados.salas[key].agenda[filtroDia][filtroHora].nome == 'Horário Vago') arr.push(dados.salas[key]);
        });
    } else if (!filtroDia && filtroHora) {
        //console.log('entrou filtro hora')
        keys.forEach(key => {
            dias.forEach(dia => {
                if (dados.salas[key].agenda[dia][filtroHora].nome == 'Horário Vago') arr.push(dados.salas[key]);
            });
        });
    } else {
        //console.log('entrou filtro dia')
        keys.forEach(key => {
            horarios.forEach(hora => {
                if (dados.salas[key].agenda[filtroDia][hora].nome == 'Horário Vago') arr.push(dados.salas[key]);
            });
        });
    };
    // filtrar valores repetidos
    res = arr.filter(obj => {
        const valor = obj['nome'];
        if (vistos.has(valor)) {
            return false;
        } else {
            vistos.add(valor);
            return true;
        };
    });

    console.log(res)
    return res;
};

function transformaEmArray(obj) {
    //console.log(obj)
    const arr = [];
    //const keys = Object.keys(obj);
    const values = Object.values(obj);
    /*
    values.forEach((k, idx) => {
        arr.push({ id: keys[idx], ...k })
    });
    return arr;
    */
    values.forEach(k => {
        arr.push({ ...k })
    });
    return arr;
};


const Home = () => {

    const {
        dados,
        setModalData,
        filtro,
        filtroHorario,
        filtroDia,
    } = useContext(DadosContext);

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
        setPressedColor(null);
        setTabela(null);
        if (filtro) {
            //console.log('detectou filtro?')
            setSalas( buscarHorario(dados, filtroHorario.value, filtroDia.value) );
        } else {
            setSalas( transformaEmArray(dados.salas) );
        };
    }, [dados, filtro]);


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
                        placeholder='Qual sala/prédio procura?'
                        className='bg-slate-200 p-2 rounded-md text-center' />
                </div>
                <div className=''>

                    {filtro ? (
                        <>
                            <div className='p-2 ml-4 mt-4 mr-4 text-center font-bold bg-yellow-300'>Filtro ativo!</div>
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
                        </>

                    ) : (
                        <>
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
                        </>
                    )}

                </div>
            </div>

            <div className='mt-10'>
                <TabelaSemana tabela={tabela} />
            </div>
        </>
    )
}

export default Home;