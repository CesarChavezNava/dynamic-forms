import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms';
  extras: any[] = [];
  product: any;

  form: FormGroup;
  quantity: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProduct().subscribe((product) => {
      if (product) {
        this.product = product;
        this.extras = product.extras;
        let formAux: any = {};

        this.InitializeForm(formAux);

        if (this.extras) {
          for (let i = 0; i < this.extras.length; i++) {
            if (this.extras[i].type === 'OPEN') {
              this.createOpenField(formAux, this.extras[i].idExtra);
            } else if (this.extras[i].type === 'MULTIPLE') {
              this.createMultipleField(
                formAux,
                this.extras[i].idExtra,
                this.extras[i].options
              );
            } else {
              this.createUniqueField(formAux, this.extras[i].idExtra);
            }
          }

          this.form = new FormGroup(formAux);
        }
      }
    });
  }

  InitializeForm(form: any) {
    form['quantity'] = new FormControl(0, [Validators.required]);
  }

  createOpenField(form: any, idExtra: any) {
    form[idExtra] = new FormControl('');
  }

  createMultipleField(form: any, idExtra: any, options: any[]) {
    for (let option of options) {
      form[`${idExtra}_${option.idOption}`] = new FormControl(false);
    }
  }

  createUniqueField(form: any, idExtra: any) {
    form[idExtra] = new FormControl();
  }

  onChangeMultiple(e, price: any) {
    if (e.target.checked) {
      this.product.price += price;
    } else {
      this.product.price -= price;
    }
  }

  private prevPrice: any;
  onChangeUnique(e, price: any) {
    if (this.prevPrice) {
      this.product.price -= this.prevPrice;
    }

    this.prevPrice = price;
    this.product.price += price;
  }

  onSubmit() {}
}
