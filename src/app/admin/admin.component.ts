import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  question1: any = '';
  question2: any = '';
  question3: any = '';
  question4: any = '';

  selectedQuestionId: any = null;
  selectedQuestionLength: number = null;
  selectedQuestion: any = '';

  inputTitle: any = '';
  inputQuestion: any = '';

  batch = this.db.firestore.batch();

  visible = false;
  editable = false;
  alert = false;

  constructor(public db: AngularFirestore) {
    db.collection('questions').doc('1').valueChanges().subscribe(res => this.question1 = res);
    db.collection('questions').doc('2').valueChanges().subscribe(res => this.question2 = res);
    db.collection('questions').doc('3').valueChanges().subscribe(res => this.question3 = res);
    db.collection('questions').doc('4').valueChanges().subscribe(res => this.question4 = res);
  }

  ngOnInit() {

  }

  selectQuestion(event: any) {
    this.visible = true;
    this.editable = false;
    this.alert = false;

    this.selectedQuestionId = event;
    if (event == 0) {
      return
    }
    this.db.collection('questions').doc(event).valueChanges().subscribe(res => this.selectedQuestion = res);

    this.db.collection('ranks', ref => ref.where('question', "==", Number(this.selectedQuestionId))).get().subscribe(
      (res) => {
        this.selectedQuestionLength = res.size;
      }
    )

  }

  editQuestion() {

    this.db.collection('ranks', ref => ref.where('question', "==", Number(this.selectedQuestionId))).get().subscribe(
      (res) => {
        this.selectedQuestionLength = res.size;
      }
    )

    if (this.selectedQuestionLength == 0) {
      this.editable = this.editable === true ? false : true;
    }
    else {
      this.alert = this.alert === true ? false : true;
    }
  }



  saveQuestion() {

    if (confirm('Potwierdź poprawność wpisanej treści.')) {
      if (this.inputQuestion != null && this.inputQuestion != null) {
        this.db.collection('ranks', ref => ref.where('question', "==", Number(this.selectedQuestionId))).get().subscribe(snapshot => {
          snapshot.docs.forEach(doc => {
            this.batch.delete(doc.ref);
          });
          return this.batch.commit();
        })
        this.db.collection('questions').doc(this.selectedQuestionId).update({ title: this.inputTitle });
        this.inputTitle = '';
        this.db.collection('questions').doc(this.selectedQuestionId).update({ question: this.inputQuestion });
        this.inputQuestion = '';
      }
    } else {
      return
    }

  }


  resetQuestion() {
    if (confirm('Usuwasz wszystkie oceny dla tego badania?')) {
      this.db.collection('ranks', ref => ref.where('question', "==", Number(this.selectedQuestionId))).get().subscribe(snapshot => {
        snapshot.docs.forEach(doc => {
          this.batch.delete(doc.ref);
        });
        return this.batch.commit();
      })
    } else {
      return
    }
    this.editable = false;
    this.alert = false;
  }



}
