import { IntegranteService } from '../cadastrar/services/integrante.service';
import { PaginacaoRequestDTO } from '../shared/model/paginacao.model';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConsultarIntegranteResponseDTO, ConsultarIntegranteRequestDTO, IntegranteDTO } from '../shared/model/integrante.model ';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-formimagem',
  standalone: true,
  imports: [TableModule, PanelModule],
  templateUrl: './investigacao.component.html',
  styleUrls: ['./investigacao.component.scss']
})

export class InvestigacaoComponent implements AfterViewInit {

  itemsPaginated: ConsultarIntegranteResponseDTO = new ConsultarIntegranteResponseDTO();
  records: IntegranteDTO[] = [];
  selectedRecords: IntegranteDTO[] = [];
  selectedRecord: IntegranteDTO = new IntegranteDTO();
  paginateFilter: ConsultarIntegranteRequestDTO = new ConsultarIntegranteRequestDTO();
  totalRecords: number = 0;
  pageActual: number = 0;
  rows: number = 0;
  loading: boolean = false;

  // public user: AuthenticatedUser;

  constructor(private integranteService: IntegranteService,
              private cdr: ChangeDetectorRef
  ) {
  }

    ngAfterViewInit() {
    setTimeout(() => {
            this.cdr.detectChanges();
            setTimeout(() => {

            });
        }, 100);

    this.paginateFilter = new ConsultarIntegranteRequestDTO();
    this.paginateFilter.paginacao = new PaginacaoRequestDTO();
    this.paginateFilter.paginacao.camposOrdenacao = ["nomeAtual"];
    this.rows = 10;
    this.pageActual = 1;

    this.loadRecordList();
    this.cdr.detectChanges();

  }

  loadRecordList(): void {
    this.loading = true;
    this.paginateFilter!.paginacao!.itensPorPagina = this.rows;
    this.paginateFilter.paginacao!.paginaAtual = this.pageActual;
    this.paginateFilter.idStatus = 3;

    this.paginateFilter.aceito = false;

    this.integranteService.listAll(this.paginateFilter)
      .then(item => {
        this.itemsPaginated = item;
        this.records = this.itemsPaginated.itens!;
        this.totalRecords = this.itemsPaginated.paginacao!.totalItens!;
        this.loading = false;
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.rows = event.rows!;
    this.pageActual = (event.first! / event.rows!) + 1;

    //Ordenação
    /*
    this.paginateFilter!.paginacao!.camposOrdenacao = [];
    if (event.sortField === undefined) {
      if (event.multiSortMeta !== undefined) {
        for (let i = 0; i < event.multiSortMeta!.length; i++) {
          this.paginateFilter!.paginacao!.camposOrdenacao![i] =
            event.multiSortMeta![i].order == 1
              ? event.multiSortMeta![i].field
              : event.multiSortMeta![i].field + " DESC";
        }
      } else this.paginateFilter!.paginacao!.camposOrdenacao![0] = event.sortField!;
    }
*/
    //Inicializa Filtro
    this.paginateFilter!.nomeAtual = "";
    this.paginateFilter.nomeConjuge = "";

    /*
    if (event.filters !== undefined) {
      for (let prop in event.filters) {
        let filterField: string = prop;
        let filterMeta = event.filters[filterField];
        if (filterMeta.value !== null) {
          if (filterField === 'nomeAtual') {
            this.paginateFilter.nomeAtual = filterMeta!.value;
          }
          if (filterField === 'nomeConjuge') {
            this.paginateFilter.nomeConjuge = filterMeta!.value;
          }

        }

      }
    }
      */
    this.loadRecordList();
  }



}