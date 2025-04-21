export function formatCnpjCpf(value: string | number | undefined | null): string {
    if (!value) return '';
    const cnpjCpf = String(value).replace(/\D/g, '');
    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    if (cnpjCpf.length === 14) {
      return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    return cnpjCpf;
  }
  