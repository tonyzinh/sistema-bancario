import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/services/api';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";

interface ListaClientes {
  clientes: Cliente[];
}

export function ClientesList({ clientes }: ListaClientes) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cliente.cpfCnpj.includes(searchTerm)
  );

  // Calcular a paginação
  const total = Math.ceil(filteredClientes.length / itemsPerPage);
  const inicio = (currentPage - 1) * itemsPerPage;
  const final = inicio + itemsPerPage;
  const currentClientes = filteredClientes.slice(inicio, final);

  const identificador = (page: number) => {
    setCurrentPage(page);
  };

  const ver_detalhes = (clienteId: string) => {
    navigate(`/cliente/${clienteId}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
        <div className="flex items-center mt-4">
          <Input
            placeholder="Buscar por nome ou CPF/CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista de todos os clientes do banco</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Patrimônio</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClientes.length > 0 ? (
              currentClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell>{cliente.cpfCnpj}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{formatDate(cliente.dataNascimento)}</TableCell>
                  <TableCell>{formatCurrency(cliente.patrimonio)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => ver_detalhes(cliente.id)}
                    >
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {total > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => identificador(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => identificador(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => identificador(Math.min(total, currentPage + 1))}
                  className={currentPage === total ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}
