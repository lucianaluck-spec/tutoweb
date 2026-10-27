export class PaginacaoRequestDTO {
  paginaAtual?: number;
  itensPorPagina?: number;
  camposOrdenacao?: string[]
}

export class PaginacaoResponseDTO {
  paginaAtual?: number;
  itensPorPagina?: number;
  quantidadePaginas?: number;
  totalItens?: number
}
