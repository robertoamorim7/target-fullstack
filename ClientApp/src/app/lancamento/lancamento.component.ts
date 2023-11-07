import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../models/lancamento';
import { LancamentoService } from './lancamento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from '../models/filter';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  public lancamentos: Lancamento[] = new Array<Lancamento>();
  public filter: Filter;
  public form: FormGroup;
  public isLoading = true;
  public totalValue: number;

  constructor(private lancamentoService: LancamentoService, private fb: FormBuilder) {
    this.setDefaultFilters()
  }

  async ngOnInit() {
    await this.setLancamentos();
  }

  private async setDefaultFilters() {
    this.form = this.fb.group({
      initialDate: [formatDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd', 'en')],
      endDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      includeValid: [true],
      includeAvulso: [true],
      includeNotAvulso: [true],
      includeCancelled: [true]
    })

    this.form.valueChanges.subscribe(async form => {
      await this.setLancamentos();
    })
  }

  private async setLancamentos() {
    this.lancamentos = new Array<Lancamento>();
    this.totalValue = 0;

    this.lancamentoService.getAllLancamentos({
      endDate: this.form.get("endDate").value,
      initialDate: this.form.get("initialDate").value,
      includeAvulso: this.form.get("includeAvulso").value,
      includeCancelled: this.form.get("includeCancelled").value,
      includeNotAvulso: this.form.get("includeNotAvulso").value,
      includeValid: this.form.get("includeValid").value
    }).subscribe(async res => {
      this.lancamentos = res;
      await Promise.all(this.lancamentos.map(async l => {
        l.data = new Date(l.data).toISOString();
        this.totalValue += l.valor;
      }));
      this.isLoading = false;
    })
  }

  public async delete(id: string) {
    await this.lancamentoService.deleteLancamentoById(id).subscribe(res => {
      this.setLancamentos();
    })
  }

}
