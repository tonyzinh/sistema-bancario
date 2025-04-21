import { Cliente, Conta, Agencia } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getContasCliente,
  getAgenciaPorCodigo,
  formatCurrency,
  formatDate,
} from "../services/api";
import { formatCnpjCpf } from "@/utils/formatacao";

interface Dados {
  cliente: Cliente;
  contas: Conta[];
  agencias: Agencia[];
  mobile: boolean;
}

export function Detalhes({ cliente, contas, agencias, mobile }: Dados) {
  const contasCliente = getContasCliente(contas, cliente.cpfCnpj);
  const agenciaCliente = getAgenciaPorCodigo(agencias, cliente.codigoAgencia);

  return (
    <div
      className={`grid gap-6 ${
        mobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Cliente</CardTitle>
          <CardDescription>
            Informações completas sobre {cliente.nome}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Informações Pessoais
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Nome:</span> {cliente.nome}
                </p>
                {cliente.nomeSocial && (
                  <p>
                    <span className="font-medium">Nome Social:</span>{" "}
                    {cliente.nomeSocial}
                  </p>
                )}
                <span className="font-medium">
                  CPF/CNPJ: {formatCnpjCpf(cliente.cpfCnpj)}
                </span>
                {cliente.rg && (
                  <p>
                    <span className="font-medium">RG:</span> {cliente.rg}
                  </p>
                )}
                <p>
                  <span className="font-medium">Data de Nascimento:</span>{" "}
                  {formatDate(cliente.dataNascimento)}
                </p>
                <p>
                  <span className="font-medium">Estado Civil:</span>{" "}
                  {cliente.estadoCivil}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Informações de Contato
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span> {cliente.email}
                </p>
                <p>
                  <span className="font-medium">Endereço:</span>{" "}
                  {cliente.endereco}
                </p>
              </div>

              <h3 className="text-lg font-semibold mt-4 mb-2">
                Informações Financeiras
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Renda Anual:</span>{" "}
                  {formatCurrency(cliente.rendaAnual)}
                </p>
                <p>
                  <span className="font-medium">Patrimônio:</span>{" "}
                  {formatCurrency(cliente.patrimonio)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="contas">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contas">Contas Bancárias</TabsTrigger>
          <TabsTrigger value="agencia">Agência</TabsTrigger>
        </TabsList>

        <TabsContent value="contas">
          <Card>
            <CardHeader>
              <CardTitle>Contas Bancárias</CardTitle>
              <CardDescription>
                Lista de todas as contas associadas a este cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contasCliente.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="notranslate">ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Saldo</TableHead>
                      <TableHead>Limite de Crédito</TableHead>
                      <TableHead>Crédito Disponível</TableHead>
                      <TableHead>CPF/CNPJ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contasCliente.map((conta) => (
                      <TableRow key={conta.id}>
                        <TableCell>{conta.id}</TableCell>
                        <TableCell className="capitalize">
                          {conta.tipo}
                        </TableCell>
                        <TableCell>{formatCurrency(conta.saldo)}</TableCell>
                        <TableCell>
                          {formatCurrency(conta.limiteCredito)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(conta.creditoDisponivel)}
                        </TableCell>
                        <TableCell>{formatCnpjCpf(cliente.cpfCnpj)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>Este cliente não possui contas cadastradas.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agencia">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Agência</CardTitle>
              <CardDescription>
                Detalhes da agência à qual o cliente está vinculado
              </CardDescription>
            </CardHeader>
            <CardContent>
              {agenciaCliente ? (
                <div className="space-y-4">
                  <p>
                    <span className="font-medium">Nome da Agência:</span>{" "}
                    {agenciaCliente.nome}
                  </p>
                  <p>
                    <span className="font-medium">Código:</span>{" "}
                    {agenciaCliente.codigo}
                  </p>
                  <p>
                    <span className="font-medium">Endereço:</span>{" "}
                    {agenciaCliente.endereco}
                  </p>
                </div>
              ) : (
                <p>Informações da agência não disponíveis.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
