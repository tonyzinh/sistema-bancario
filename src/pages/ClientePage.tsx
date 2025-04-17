import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cliente, Conta, Agencia } from '@/types';
import { Detalhes } from '@/components/InfoCliente';
import { fetchClientes, fetchContas, fetchAgencias } from '@/services/api';
import { Button } from '@/components/ui/button';

export function ClientePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientesData, contasData, agenciasData] = await Promise.all([
          fetchClientes(),
          fetchContas(),
          fetchAgencias()
        ]);
        
        const foundCliente = clientesData.find(c => c.id === id);
        
        if (!foundCliente) {
          setError('Cliente não encontrado');
          return;
        }
        
        setCliente(foundCliente);
        setContas(contasData);
        setAgencias(agenciasData);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados. Por favor, tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !cliente) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Erro</h2>
          <p>{error || 'Cliente não encontrado'}</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            Voltar para Lista de Clientes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mr-4"
        >
          ← Voltar
        </Button>
        <h1 className="text-3xl font-bold">Detalhes do Cliente</h1>
      </div>
      
      <Detalhes 
        cliente={cliente} 
        contas={contas} 
        agencias={agencias} 
      /> 
    </div>
  );
}
