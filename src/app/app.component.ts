import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fourier';
  
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;

  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "x"
  yAxisLabel: string = "f(x)";
  multi: any[] = [];
  view: [number, number] = [1300, 300];

  colorScheme = '#5AA454';
  range: number = 10;
  kValue: number = 2;
  constructor() {}
  ngOnInit(){
    const xValues = this.fillXValues(-12, 12);
    const yValues: number[] = this.Fourier(xValues, this.range, this.kValue);
    const graphic: any[] = [];
    for (let i = 0; i < xValues.length; i++){
      graphic.push({"name": xValues[i].toString(), "value": yValues[i]});
    }
    this.multi = [
      {
        "name": "fourier",
        series: graphic
      }
    ];
  }
  calcular(){
    this.multi = [];
    const xValues: number[] = this.fillXValues(-12, 12);
    const yValues: number[] = this.Fourier(xValues, this.range, this.kValue);
    const graphic: any[] = [];
    for (let i = 0; i < xValues.length; i++){
      graphic.push({"name": xValues[i].toString(), "value": yValues[i]});
    }
    this.multi = [
      {
        "name": "fourier",
        series: graphic
      }
    ];
    return;
  }
  Fourier(xValues: number[], range:number, kValue: number): number[]{
    let result = 0;
    const values: number[] = [];
    xValues.forEach(x => {
      result = 0;
      for(let n = 1; n < range; n++){
        result = result + ((((-4)*kValue) * Math.cos(((2*n)-1)*Math.PI*x))/(Math.pow(((2*n)-1), 2) * (Math.pow(Math.PI,2))));
      }
      values.push(result + (kValue/2));
    });
    return values;
  }
  fillXValues(j: number, k: number): number[]{
    let values = [];
    for (let i = j; i < k; ){
      values.push(parseFloat(i.toFixed(1)));
      i = i + 0.1;
    }
    return values;
  }
}
