
import React, { useContext, useState } from 'react';
import DadosContext from '../contexts/dados';



const Footer = () => {

    const { tabela } = useContext(DadosContext);

    const classHeader = `w-screen h-auto bg-slate-500 flex items-center justify-center gap-2 fixed bottom-0`;

    return (
        <footer className={classHeader}>
            <p>FOOTER</p>
        </footer>
    );
};

export default Footer;
