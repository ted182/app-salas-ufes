
import React, { useContext, useState } from 'react';

//  importação do contexto
import DadosContext from '../contexts/dados';

//  importação dos componentes
import TabelaSemana from '../components/TabelaSemana';

const Home = props => {

    const { dados, tabela, setTabela } = useContext(DadosContext);

    const [selectedUser, setSelectedUser] = useState(null);

    const classButtons = `bg-red-300 p-4 ml-4`;

    const handleClick = (id) => {
        dados.setAgenda(id, 'quarta', 5, 2);
        console.log(dados.salas[id])
        setTabela(dados.salas[id]);
    };

    const handleClickteste = (id) => {
        dados.setAgenda(id, 'segunda', 2, 1);
        console.log(dados.salas[id]);
        setTabela(dados.salas[id]);
    };


    return (
        <>
            <div>
                <p>SALAS</p>
                <button className={classButtons} onClick={() => handleClick('1')}>Sala-01</button>
                <button className={classButtons} onClick={() => handleClick('2')}>Sala-02</button>
                <button className={classButtons} onClick={() => handleClick('3')}>Sala-03</button>
                <button className={classButtons} onClick={() => handleClickteste('4')}>Sala-04</button>
            </div>

            <div>
                <TabelaSemana tabela={tabela} />
            </div>
        </>
    )
}

export default Home;