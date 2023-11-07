export class Lancamento {
  id?: string;
  descricao: string = "";
  data: string;
  valor: number;
  avulso: boolean = true;
  status: Status = Status.Valido
}


export enum Status {
  Valido = 0,
  Cancelado = 1
}
