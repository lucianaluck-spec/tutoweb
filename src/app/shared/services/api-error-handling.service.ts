import { Injectable } from '@angular/core';
import { ErrorDTO, ErrorMessageDTO } from '../model/error.model';

@Injectable({ providedIn: 'root' })
export class ApiErrorHandlingService {

  private readonly _API_ERROR_SUMMARY = 'Erro API';
  private readonly _UNKNOWN_API_ERROR_DETAIL = 'A API retornou um erro desconhecido';
  private readonly _INTERNAL_API_ERROR_DETAIL = 'Erro interno do servidor';
  private readonly _ACCESS_DENIED_API_ERROR_DETAIL = 'Acesso negado';

  constructor() {}

  private _handleBadRequest(error: ErrorDTO): ErrorMessageDTO {
    if (error.type === 'ValidationFail') {
      return this._handleValidationBadRequest(error);
    } else {
      return {
        summary: this._API_ERROR_SUMMARY,
        detail: `${error.detail} (${error.type})`
      };
    }
  }

  private _handleValidationBadRequest(error: ErrorDTO): ErrorMessageDTO {
    let detail = 'Violações: ';
    error.violations!.forEach(item => detail += `${item.property} (${item.detail}); `);
    return {
      summary: this._API_ERROR_SUMMARY,
      detail
    };
  }

  extractMessageFromError(error: ErrorDTO) {
    switch (error.status) {
      case 400: {
        return this._handleBadRequest(error);
      }
      case 403: {
        return {
          summary: this._API_ERROR_SUMMARY,
          detail: this._ACCESS_DENIED_API_ERROR_DETAIL
        };
      }
      case 500: {
        return {
          summary: this._API_ERROR_SUMMARY,
          detail: this._INTERNAL_API_ERROR_DETAIL
        };
      }
      default: {
        return {
          summary: this._API_ERROR_SUMMARY,
          detail: `${this._UNKNOWN_API_ERROR_DETAIL} (${error.type})`
        };
      }
    }
  }
}
