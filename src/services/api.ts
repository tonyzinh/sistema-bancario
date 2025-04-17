import { csvParse } from 'd3-dsv';
import { Cliente, Conta, Agencia } from '@/types';

const URLS = {
  clientes: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes',
  contas: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas',
  agencias: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias'
};

// Função para transformar os dados CSV em objetos tipados
const parseClientes = (data: string): Cliente[] => {
  const parsedData = csvParse(data);
  
  return parsedData.map(row => ({
    id: row.id,
    cpfCnpj: row.cpfCnpj,
    rg: row.rg || undefined,
    dataNascimento: new Date(row.dataNascimento),
    nome: row.nome,
    nomeSocial: row.nomeSocial || undefined,
    email: row.email,
    endereco: row.endereco,
    rendaAnual: Number(row.rendaAnual),
    patrimonio: Number(row.patrimonio),
    estadoCivil: row.estadoCivil as "Solteiro" | "Casado" | "Viúvo" | "Divorciado",
    codigoAgencia: Number(row.codigoAgencia)
  }));
};

const parseContas = (data: string): Conta[] => {
  const parsedData = csvParse(data);
  
  return parsedData.map(row => ({
    id: row.id,
    cpfCnpjCliente: row.cpfCnpjCliente,
    tipo: row.tipo as "corrente" | "poupanca",
    saldo: Number(row.saldo),
    limiteCredito: Number(row.limiteCredito),
    creditoDisponivel: Number(row.creditoDisponivel)
  }));
};

const parseAgencias = (data: string): Agencia[] => {
  const parsedData = csvParse(data);
  
  return parsedData.map(row => ({
    id: row.id,
    codigo: Number(row.codigo),
    nome: row.nome,
    endereco: row.endereco
  }));
};

// Função para buscar os dados CSV e convertê-los
export const fetchClientes = async (): Promise<Cliente[]> => {
  try {
    const response = await fetch(URLS.clientes);
    const text = await response.text();
    return parseClientes(text);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }
};

export const fetchContas = async (): Promise<Conta[]> => {
  try {
    const response = await fetch(URLS.contas);
    const text = await response.text();
    return parseContas(text);
  } catch (error) {
    console.error('Erro ao buscar contas:', error);
    return [];
  }
};

export const fetchAgencias = async (): Promise<Agencia[]> => {
  try {
    const response = await fetch(URLS.agencias);
    const text = await response.text();
    return parseAgencias(text);
  } catch (error) {
    console.error('Erro ao buscar agências:', error);
    return [];
  }
};


export const getContasCliente = (contas: Conta[], cpfCnpj: string): Conta[] => {
  return contas.filter(conta => conta.cpfCnpjCliente === cpfCnpj);
};

export const getAgenciaPorCodigo = (agencias: Agencia[], codigo: number): Agencia | undefined => {
  return agencias.find(agencia => agencia.codigo === codigo);
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR');
};

