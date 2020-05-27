import { Component, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Output() valCheck: boolean = false;

  playerMax: number = 10;
  playerMaxArr: number[];
  playerNumbers: object[];
  players: object[] = [];
  randomNumber: number;
  player1Num: string;
  player2Num: string;
  winner: string;
  modalIsShown: boolean = false;
  guessCount: number = 0;
  disablePlayAgain: boolean = false;
  choiceMode: boolean = true;

  constructor() {
    this.playerMaxArr = Array(this.playerMax - 1)
      .fill(0)
      .map((item, index) => index + 2);
  }

  getRandomIntInclusive() {
    this.randomNumber = Math.floor(Math.random() * 101);
    return this.randomNumber;
  }

  playerNumHandler(form: NgForm) {
    if (form.value.players < 0 || form.value.players > this.playerMax) return;
    for (let i = 0; i < +form.value.players; i++) {
      let temp = `Player ${i + 1}`;
      this.players.push({ player: temp, num: null });
    }
    for (let i = 0; i < this.playerMax; i++) {
      let temp = { player: `Player ${i + 1}`, number: null };
      this.playerNumbers.push(temp);
    }
    this.choiceMode = false;
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
    this.guessCount++;
    if (!this.randomNumber) {
      this.getRandomIntInclusive();
    }
    this.checkClosest();
  }

  checkClosest() {
    if (this.guessCount < 3) {
      if (+this.player1Num === this.randomNumber) {
        this.disablePlayAgain = true;
        return (this.winner = 'Player One guessed correctly!');
      } else if (+this.player2Num === this.randomNumber) {
        this.disablePlayAgain = true;
        return (this.winner = 'Player Two guesses correctly!');
      }
    }
    let draw = 'You are equally close!';
    let p1Win = 'Player One is closer!';
    let p2Win = 'Player Two is closer!';
    const p1Diff = this.diffCheck(this.player1Num, this.randomNumber);
    const p2Diff = this.diffCheck(this.player2Num, this.randomNumber);
    if (this.guessCount === 3) {
      draw = 'You have a draw!';
      p1Win = 'Player One wins!';
      p2Win = 'Player Two wins!';
      this.disablePlayAgain = true;
    }
    if (p1Diff === p2Diff) {
      this.winner = draw;
    } else if (p1Diff < p2Diff) {
      this.winner = p1Win;
    } else {
      this.winner = p2Win;
    }
  }

  resetHandler() {
    this.winner = null;
    this.randomNumber = null;
    this.player1Num = null;
    this.player2Num = null;
    this.valCheck = false;
    this.disablePlayAgain = false;
    this.choiceMode = true;
  }
}
