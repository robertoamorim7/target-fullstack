import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentoService } from '../lancamento/lancamento.service';
import { Lancamento } from '../models/lancamento';
import { DatePipe } from '@angular/common';
import { convertYYYYMMddToIsosString } from '../shared/utils/date-format';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit {
  public form: FormGroup;
  public isCreating: boolean;
  public isLoading = true;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private lancamentoService: LancamentoService, private datePipe: DatePipe) {
    this.isCreating = this.router.url.includes("new");
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.initializeForm(id);
  }

  private async initializeForm(id: string) {
    this.form = this.fb.group({
      id: [],
      descricao: [{ value: "", disabled: !this.isCreating }, Validators.required],
      valor: [null, [Validators.required]],
      data: [undefined, this.isCreating ? new Date() : Validators.required]
    })

    if (this.isCreating) {
      this.isLoading = false;
      return;
    }

    await this.lancamentoService.getLancamentoById(id).subscribe(res => {
      this.form.patchValue(res);
      const date = new Date(res.data);
      this.form.get("data").setValue(this.datePipe.transform(date, 'yyyy-MM-dd'));
      this.isLoading = false;
    })
  }

  public create() {
    let newLancamento = new Lancamento();
    newLancamento.descricao = this.form.get("descricao").value;
    newLancamento.valor = this.form.get("valor").value;
    newLancamento.data = new Date().toISOString();
    this.lancamentoService.createLancamento(newLancamento).subscribe(res => {
      this.router.navigate(["/"]);
    })
  }

  public update() {
    let lancamentoToUpdate = new Lancamento();
    lancamentoToUpdate.id = this.form.get("id").value;
    lancamentoToUpdate.descricao = this.form.get("descricao").value;
    lancamentoToUpdate.valor = this.form.get("valor").value;
    lancamentoToUpdate.data = convertYYYYMMddToIsosString(this.form.get("data").value);
    this.lancamentoService.updateLancamento(lancamentoToUpdate).subscribe(res => {
      this.router.navigate(["/"]);
    });
  }

  public keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z0-9\s]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
