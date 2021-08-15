import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dynamic-forms';
  extras: any[] = [];

  form: FormGroup;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProduct().subscribe((product) => {
      if (product) {
        this.extras = product.extras;
        if (this.extras) {
          let f: any = {};
          for (let i = 0; i < this.extras.length; i++) {
            if (this.extras[i].type === 'OPEN') {
              f[this.extras[i].name] = new FormControl('');
            } else if (this.extras[i].type === 'MULTIPLE') {
              this.createChecks(f, this.extras[i].name, this.extras[i].options);
            } else {
              f[this.extras[i].name] = new FormControl();
            }
          }
          this.form = new FormGroup(f);
        }
      }
    });
  }

  createChecks(f: any, name: any, options: any[]) {
    for (let option of options) {
      f[`${name}_${option.name}`] = new FormControl(false);
    }
  }

  onSubmit() {
    console.log(this.form);
  }
}
