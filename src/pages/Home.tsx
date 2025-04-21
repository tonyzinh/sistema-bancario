import { useEffect, useState } from 'react';
import { Cliente } from '@/types';
import { ClientesList } from '@/components/Cliente';
import { fetchClientes } from '@/services/api';

export function Home() { 
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientesData = await fetchClientes();
        setClientes(clientesData);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados. Por favor, tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Erro</h2>
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <ClientesList clientes={clientes} />
    </div>
  );
}
