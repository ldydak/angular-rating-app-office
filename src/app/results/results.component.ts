import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chart } from 'chart.js';


interface Ranks {
  rank: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  ranks: any;
  chart: any;
  question1: any = '';
  question2: any = '';
  question3: any = '';
  question4: any = '';
  tragic: number = null;
  bad: number = null;
  average: number = null;
  good: number = null;
  veryGood: number = null;
  page: number = 1;

  @ViewChild('lineChart') private chartRef;


  constructor(public db: AngularFirestore) {

    db.collection('questions').doc('1').valueChanges().subscribe(res => this.question1 = res);
    db.collection('questions').doc('2').valueChanges().subscribe(res => this.question2 = res);
    db.collection('questions').doc('3').valueChanges().subscribe(res => this.question3 = res);
    db.collection('questions').doc('4').valueChanges().subscribe(res => this.question4 = res);

    this.sortQuestion(0);

  }

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    setTimeout(() => {
      // Fix for Chart JS
      if (this.chart != undefined)
        this.chart.destroy();
      //
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Tragicznie', 'Źle', 'Średnio', 'Dobrze', 'Bardzo dobrze'],
          datasets: [{
            data: [this.tragic, this.bad, this.average, this.good, this.veryGood],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)'
            ]
          }]
        },
        options: {
          scales: {
            yAxes: [{
              display: false,
              // gridLines: {
              //   drawOnChartArea: false,
              //   lineWidth: 0
              // },
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              display: false,
              // gridLines: {
              //   drawOnChartArea: false,
              //   lineWidth: 0
              // }
            }]
          }
        }
      });
    }, 1000);

  }


  sortQuestion(event: number) {
    event = Number(event);


    if (event === 0) {
      this.ranks = this.db.collection('ranks', ref => ref.orderBy('time', 'desc')).valueChanges();

      this.db.collection('ranks', ref => ref.where('rank', "==", 'Tragicznie')).get().subscribe(
        (res) => {
          this.tragic = res.size;
        });
      this.db.collection('ranks', ref => ref.where('rank', "==", 'Źle')).get().subscribe(
        (res) => {
          this.bad = res.size;
        });
      this.db.collection('ranks', ref => ref.where('rank', "==", 'Średnio')).get().subscribe(
        (res) => {
          this.average = res.size;
        });
      this.db.collection('ranks', ref => ref.where('rank', "==", 'Dobrze')).get().subscribe(
        (res) => {
          this.good = res.size;
        });
      this.db.collection('ranks', ref => ref.where('rank', "==", 'Bardzo dobrze')).get().subscribe(
        (res) => {
          this.veryGood = res.size;
        });

    } else {
      this.ranks = this.db.collection('ranks', ref => ref.orderBy('time', 'desc').where('question', '==', event)).valueChanges();

      this.db.collection('ranks', ref => ref.where('question', '==', event).where('rank', '==', 'Tragicznie')).get().subscribe(
        (res) => {
          this.tragic = res.size;
        });
      this.db.collection('ranks', ref => ref.where('question', '==', event).where('rank', '==', 'Źle')).get().subscribe(
        (res) => {
          this.bad = res.size;
        });
      this.db.collection('ranks', ref => ref.where('question', '==', event).where('rank', '==', 'Średnio')).get().subscribe(
        (res) => {
          this.average = res.size;
        });
      this.db.collection('ranks', ref => ref.where('question', '==', event).where('rank', '==', 'Dobrze')).get().subscribe(
        (res) => {
          this.good = res.size;
        });
      this.db.collection('ranks', ref => ref.where('question', '==', event).where('rank', '==', 'Bardzo dobrze')).get().subscribe(
        (res) => {
          this.veryGood = res.size;
        });
    }
    this.loadChart();

  }
}