import { Component, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from './player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  valCheck: boolean = true;
  playerMax: number = 10;
  playerMaxArr: number[];
  players: Player[] = [];
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

  submitPlayersHandler(form: NgForm) {
    if (form.value.players < 2 || form.value.players > this.playerMax) return;
    for (let i = 0; i < +form.value.players; i++) {
      this.players.push(new Player(`Player ${i + 1}`, null, null));
      console.log(this.players);
    }
    this.choiceMode = false;
    console.log(this.players);
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

  isValid(playerNumbers: Player[]) {
    for (let i = 0; i < playerNumbers.length; i++) {
      if (!Number.isInteger(playerNumbers[i].number)) {
        console.log(
          'Not an int - ',
          `Player ${this.players[i].player} is `,
          playerNumbers[i].number
        );
        return false;
      }
    }
    return true;
  }

  submitNumbersHandler(form: NgForm) {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].number = form.value[`Player ${i + 1}`];
    }
    if (!this.isValid(this.players)) {
      return;
    }
    this.guessCount++;
    if (!this.randomNumber) {
      this.getRandomIntInclusive();
    }
    const check = this.checkClosest();
    console.log(check, this.randomNumber);
  }

  checkClosest() {
    let closest: Player[] = [];

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].intFromTarget = this.diffCheck(
        this.players[i].number,
        this.randomNumber
      );
      const player = this.players[i];
      if (
        closest.length === 0 ||
        player.intFromTarget === closest[0].intFromTarget
      ) {
        closest.push(this.players[i]);
      } else if (player.intFromTarget < closest[0].intFromTarget) {
        closest = [player];
      }
    }
    let result: string;
    if (this.guessCount < 3) {
      const winners = this.players.filter((item) => item.intFromTarget === 0);
      if (winners.length !== 0) {
        this.disablePlayAgain = true;
        result = `${winners
          .map((item) => item.player)
          .join(' and ')} guessed correctly!`;
      } else {
        result = `${closest.map(
          (item) => item.player
        )} win(s)! The number was ${this.randomNumber}!`;
      }
      return result;
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
