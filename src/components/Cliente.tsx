import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/services/api';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import { useMediaQuery } from "@/hooks/MediaQuery";
import { formatCnpjCpf } from "@/utils/formatacao";

interface ListaClientes {
  clientes: Cliente[];
}

export function ClientesList({ clientes }: ListaClientes) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const itemsPerPage = isMobile ? 5 : (isTablet ? 8 : 10);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpfCnpj.includes(searchTerm)
  );

  const total = Math.ceil(filteredClientes.length / itemsPerPage);
  const inicio = (currentPage - 1) * itemsPerPage;
  const final = inicio + itemsPerPage;
  const currentClientes = filteredClientes.slice(inicio, final);

  const identificador = (page: number) => setCurrentPage(page);
  const ver_detalhes = (clienteId: string) => navigate(`/cliente/${clienteId}`);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Clientes</CardTitle>
        <p className="text-sm text-muted-foreground"></p>
        <Input
          placeholder="Buscar por nome ou CPF/CNPJ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={isMobile ? "w-full" : "max-w-sm"}
        />
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <div className="space-y-4">
            {currentClientes.length > 0 ? (
              currentClientes.map((cliente) => (
                <Card key={cliente.id} className="p-3">
                  <h3 className="font-bold">{cliente.nome}</h3>
                  <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
                  <p>Email: {cliente.email}</p>
                  <p>Patrimônio: {formatCurrency(cliente.patrimonio)}</p>
                  <Button className="w-full mt-2" onClick={() => ver_detalhes(cliente.id)}>
                    Ver Detalhes
                  </Button>
                </Card>
              ))
            ) : (
              <p>Nenhum cliente encontrado</p>
            )}
          </div>
        ) : (
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                {!isTablet && <TableHead>Email</TableHead>}
                {!isTablet && <TableHead>Data de Nascimento</TableHead>}
                <TableHead>Patrimônio</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClientes.length > 0 ? (
                currentClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.nome}</TableCell>
                    <TableCell>{formatCnpjCpf(cliente.cpfCnpj)}</TableCell>
                    {!isTablet && <TableCell>{cliente.email}</TableCell>}
                    {!isTablet && <TableCell>{formatDate(cliente.dataNascimento)}</TableCell>}
                    <TableCell>{formatCurrency(cliente.patrimonio)}</TableCell>
                    <TableCell>
                      <Button onClick={() => ver_detalhes(cliente.id)}>
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>Nenhum cliente encontrado</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        {total > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => identificador(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => identificador(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => identificador(Math.min(total, currentPage + 1))}
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
