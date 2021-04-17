import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/models/apex-chart-model';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() height = 350;
  @Input() colors: string[] = [];
  @Input() columnWidth = '45%';
  @Input() categories: string[] = [];
  @Input() labelColors: string[] = [];
  @Input() data: ApexAxisChartSeries = [{ data: [0, 0, 0, 0, 0, 0] }];

  constructor() { }

  ngOnInit(): void {
    this.setDataFormInChart(this.data);
  }

  ngOnChanges() {
    this.setDataFormInChart(this.data);
  }

  private setDataFormInChart(data: ApexAxisChartSeries) {
    this.chartOptions = {
      series: data,
      chart: {
        height: this.height,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: this.colors,
      plotOptions: {
        bar: {
          columnWidth: this.columnWidth,
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
        categories: this.categories,
        labels: {
          style: {
            colors: this.labelColors,
            fontSize: '12px'
          }
        }
      }
    };
  }
}
