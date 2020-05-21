import { Component, Output, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Output() valCheck: boolean = false;

  randomNumber: number;
  player1Num: string;
  player2Num: string;
  winner: string;
  modalIsShown: boolean = false;

  getRandomIntInclusive() {
    this.randomNumber = Math.floor(Math.random() * 101);
    return this.randomNumber;
  }

  showModal() {
    if (this.valCheck) {
      return;
    }
    this.modalIsShown = true;
  }

  hideModal() {
    this.modalIsShown = false;
  }

  diffCheck(a, b) {
    return Math.abs(a - b);
  }

  playerNumChanged(pNum: string, variable: string) {
    if (variable === 'player1Num') {
      this.player1Num = pNum;
    } else {
      this.player2Num = pNum;
    }
    this.valCheck = this.isValid(this.player1Num, this.player2Num);
  }

  isValid(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      return false;
    }
    if (a === b || a < 0 || a > 100 || b < 0 || b > 100) {
      return false;
    }
    return true;
  }

  submitHandler() {
    this.getRandomIntInclusive();
    const p1Diff = this.diffCheck(this.player1Num, this.randomNumber);
    const p2Diff = this.diffCheck(this.player2Num, this.randomNumber);
    if (p1Diff === p2Diff) {
      this.winner = 'Draw!';
    } else if (p1Diff < p2Diff) {
      this.winner = 'Player One won!';
    } else {
      this.winner = 'Player Two won!';
    }
  }

  resetHandler() {
    this.winner = null;
    this.randomNumber = null;
    this.player1Num = null;
    this.player2Num = null;
    this.valCheck = false;
  }
}
