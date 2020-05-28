import { Component, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from './player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  playerMax: number = 10;
  playerMaxArr: number[];
  players: Player[] = [];
  randomNumber: number;
  guessCount: number = 0;
  disablePlayAgain: boolean = false;
  choiceMode: boolean = true;
  closest: Player[] = [];

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
    }
    this.choiceMode = false;
  }

  diffCheck(a, b) {
    return Math.abs(a - b);
  }

  isValid(playerNumbers: Player[]) {
    for (let i = 0; i < playerNumbers.length; i++) {
      if (!Number.isInteger(playerNumbers[i].number)) {
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
  }

  checkClosest() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].intFromTarget = this.diffCheck(
        this.players[i].number,
        this.randomNumber
      );
      if (
        this.closest.length === 0 ||
        this.players[i].intFromTarget === this.closest[0].intFromTarget
      ) {
        this.closest = this.closest.filter(
          (item) => item.player !== this.players[i].player
        );
        this.closest.push(this.players[i]);
      } else if (
        this.players[i].intFromTarget < this.closest[0].intFromTarget
      ) {
        console.log(
          `${this.players[i].player} is ${this.players[i].intFromTarget} away from ${this.randomNumber}`
        );
        this.closest = [this.players[i]];
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
        this.disablePlayAgain = true;
      } else {
        result = `${this.closest
          .map((item) => item.player)
          .join(' and ')} was the closest!`;
      }
    } else {
      result = `${this.closest
        .map((item) => item.player)
        .join(' and ')} win(s)! The number was ${this.randomNumber}!`;
      this.disablePlayAgain = true;
    }
    return result;
  }

  resetHandler() {
    this.randomNumber = null;
    this.disablePlayAgain = false;
    this.choiceMode = true;
    this.closest = [];
  }
}
