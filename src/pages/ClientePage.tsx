import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cliente, Conta, Agencia } from '@/types';
import { Detalhes } from '@/components/InfoCliente';
import { fetchClientes, fetchContas, fetchAgencias } from '@/services/api';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from "@/hooks/MediaQuery";

export function ClientePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width: 640px)");

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
    <div className={`container mx-auto px-2 ${mobile ? 'space-y-4' : 'space-y-8'} py-4`}>
      <Button onClick={() => navigate('/')} className="mr-4">
        ← Voltar
      </Button>
      <h1 className={`font-bold ${mobile ? 'text-xl' : 'text-2xl'}`}>
        Detalhes do Cliente
      </h1>
      {!loading && !error && cliente && (
        <Detalhes cliente={cliente} contas={contas} agencias={agencias} mobile={mobile} />
      )}
    </div>
  );
}
