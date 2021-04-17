import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { maxNumber, minNumber } from 'src/app/shared/validators/form-validators.utils';
import { PokemonDetail } from '../../../../models/pokemon.model';
import { AppState } from '../../../../store/models/app.model';
import {
  ApexAxisChartSeries,
  ChartComponent
} from 'ng-apexcharts';
import { ChartOptions } from 'src/app/models/apex-chart-model';


@Component({
  selector: 'app-statistics-form',
  templateUrl: './statistics-form.component.html',
  styleUrls: ['./statistics-form.component.scss']
})
export class StatisticsFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subscriptions = new Subscription();
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getPokemon();
    this.setDataFormInChart([{ data: [0, 0, 0, 0, 0, 0] }]);
    this.listenChangesInChart();
  }

  private getPokemon() {
    this.subscriptions.add(
      this.store.select('pokemon').subscribe(({ pokemon }) => {
        pokemon && this.populateForm(pokemon);
      })
    );
  }

  private createForm() {
    this.form = this.fb.group({
      speed: new FormControl(0, [Validators.required, maxNumber(10), minNumber(0)]),
      attack: new FormControl(0, [Validators.required, maxNumber(10), minNumber(0)]),
      defense: new FormControl(0, [Validators.required, maxNumber(10), minNumber(0)]),
      hp: new FormControl(0, [Validators.required, maxNumber(10), minNumber(0)]),
      spAttack: new FormControl(0, [Validators.required, maxNumber(10), minNumber(0)]),
      spDefense: new FormControl(0, [Validators.required, maxNumber(10), minNumber(0)])
    });
  }

  private populateForm(pokemon: PokemonDetail) {
    const { pokemonStatistics } = pokemon;
    this.form.patchValue({
      speed: pokemonStatistics.speed,
      attack: pokemonStatistics.attack,
      defense: pokemonStatistics.defense,
      hp: pokemonStatistics.hp,
      spAttack: pokemonStatistics.spAttack,
      spDefense: pokemonStatistics.spDefense
    });
  }

  private setDataFormInChart(data: ApexAxisChartSeries) {
    this.chartOptions = {
      series: data,
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A'
      ],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          'Speed',
          'Attack',
          'Life Points',
          'Special Attack',
          'Defense',
          'Special Defense',
        ],
        labels: {
          style: {
            colors: [
              '#008FFB',
              '#00E396',
              '#FEB019',
              '#FF4560',
              '#775DD0',
              '#546E7A',
              '#26a69a',
              '#D10CE8'
            ],
            fontSize: '12px'
          }
        }
      }
    };
  }

  private listenChangesInChart() {
    this.subscriptions.add(
      this.form.valueChanges.subscribe((
        { speed, attack, defense, hp, spAttack, spDefense }) => {
          const data = [speed, attack, defense, hp, spAttack, spDefense];
          this.setDataFormInChart([{ data }]);
      })
    );
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
