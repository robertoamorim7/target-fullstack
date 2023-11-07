//export class Filter {
//  initialDate: string = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
//  endDate: string = new Date().toISOString();
//  includeCancelled: boolean = true;
//  includeValid: boolean = true;
//  includeAvulso: boolean = true;
//  includeNotAvulso: boolean = true;
//}

export interface Filter {
  initialDate: string
  endDate: string
  includeCancelled: boolean
  includeValid: boolean
  includeAvulso: boolean
  includeNotAvulso: boolean
}
