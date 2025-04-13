import Papa from 'papaparse';
import { Cliente, Conta, Agencia } from '../types';

export const obterDadosClientes = () => buscar_dados<Cliente>(url.clientes, cliente);
export const obterDadosContas= () => buscar_dados<Conta>(url.contas, conta);
export const obterDadosAgencias = () => buscar_dados<Agencia>(url.agencias, agencia);

const url = {
    clientes: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes',
    contas: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas',
    agencias: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias',
  };

export const buscar_dados = async <T>(url: string, andamento: (data: any) => T): Promise<T[]> => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const csv = await response.text();
      
      return new Promise((resultado, Erro) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true, //Se for verdadeiro, as linhas que estão vazias serão ignoradas.
          complete: (results) => {
            try {
              const dados = results.data.map(andamento);
              resultado(dados);
            } catch (error) {
              Erro(error);
            }
          },
        });
      });
    } catch (error) {
      console.error('Erro ao buscar dados CSV:', error);
      throw error;
    }
  };

  const cliente = (data: any): Cliente => ({
    id: data.id,
    cpfCnpj: data.cpfCnpj,
    rg: data.rg || undefined,
    dataNascimento: new Date(data.dataNascimento),
    nome: data.nome,
    nomeSocial: data.nomeSocial || undefined,
    email: data.email,
    endereco: data.endereco,
    rendaAnual: Number(data.rendaAnual),
    patrimonio: Number(data.patrimonio),
    estadoCivil: data.estadoCivil as "Solteiro" | "Casado" | "Viúvo" | "Divorciado",
    codigoAgencia: Number(data.codigoAgencia),
  });
  
  const conta = (data: any): Conta => ({
    id: data.id,
    cpfCnpjCliente: data.cpfCnpjCliente,
    tipo: data.tipo as "corrente" | "poupanca",
    saldo: Number(data.saldo),
    limiteCredito: Number(data.limiteCredito),
    creditoDisponivel: Number(data.creditoDisponivel),
  });
  
  const agencia = (data: any): Agencia => ({
    id: data.id,
    codigo: Number(data.codigo),
    nome: data.nome,
    endereco: data.endereco,
  });

