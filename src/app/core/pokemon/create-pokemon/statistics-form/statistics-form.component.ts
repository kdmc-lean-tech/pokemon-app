import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-statistics-form',
  templateUrl: './statistics-form.component.html',
  styleUrls: ['./statistics-form.component.scss']
})
export class StatisticsFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      speed: new FormControl(null, [Validators.required]),
      attack: new FormControl(null, [Validators.required]),
      defense: new FormControl(null, [Validators.required]),
      hp: new FormControl(null, [Validators.required]),
      spAttack: new FormControl(null, [Validators.required]),
      spDefense: new FormControl(null, [Validators.required])
    });
  }

  get speed() {
    return this.form.get('speed') as FormControl;
  }

  get attack() {
    return this.form.get('attack') as FormControl;
  }

  get defense() {
    return this.form.get('defense') as FormControl;
  }

  get hp() {
    return this.form.get('hp') as FormControl;
  }

  get spAttack() {
    return this.form.get('spAttack') as FormControl;
  }

  get spDefense() {
    return this.form.get('spDefense') as FormControl;
  }
}
