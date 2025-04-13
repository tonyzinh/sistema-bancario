import {  obterDadosClientes } from "./api";

const testar = async () => {
    try {
        const clientes = await obterDadosClientes();
        console.log("Clientes:", clientes);

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
};

testar(); 