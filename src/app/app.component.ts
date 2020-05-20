import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  randomNumber: number;
  player1num: string;
  player2num: string;
  winner: string;
  valCheck: boolean = false;

  getRandomIntInclusive() {
    this.randomNumber = Math.floor(Math.random() * 101);
    return this.randomNumber;
  }

  diffCheck(a, b) {
    return Math.abs(a - b);
  }

  valChanged() {
    this.valCheck = this.isValid(this.player1num, this.player2num);
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
    const p1Diff = this.diffCheck(this.player1num, this.randomNumber);
    const p2Diff = this.diffCheck(this.player2num, this.randomNumber);
    if (p1Diff === p2Diff) {
      this.winner = 'draw!';
    } else if (p1Diff < p2Diff) {
      this.winner = 'Player One won!';
    } else {
      this.winner = 'Player Two won!';
    }
  }

  resetHandler() {
    this.winner = null;
    this.randomNumber = null;
    this.player1num = null;
    this.player2num = null;
    this.valCheck = false;
  }
}
