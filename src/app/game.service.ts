import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { NgForm } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly PLAYER_MIN_NUMBER = 2;
  private readonly PLAYER_MAX_NUMBER = 10;
  private readonly RANDOM_MIN_NUMBER = 0;
  private readonly RANDOM_MAX_NUMBER = 1000000;
  private readonly GUESS_MIN_NUMBER = 1;
  private readonly GUESS_MAX_NUMBER = 10;
  private playerNumChoice: number;
  private highestNumChoice: number;
  private guessNumberChoice: number;
  private playerMaxArr: number[];
  private players: Player[] = [];
  private randomNumber: number;
  private guessCount: number = 0;
  private disablePlayAgain: boolean = false;
  private choiceMode: boolean = true;
  private closest: Player[] = [];

  constructor() {
    this.playerMaxArr = Array(this.PLAYER_MAX_NUMBER - 1)
      .fill(0)
      .map((item, index) => index + 2);
  }

  playerChoiceCheck(numPlayers, maxNum, guessNum) {
    if (
      !Number.isInteger(numPlayers) ||
      !Number.isInteger(maxNum) ||
      !Number.isInteger(guessNum)
    ) {
      return false;
    }
    return (
      numPlayers >= this.PLAYER_MIN_NUMBER &&
      numPlayers <= this.PLAYER_MAX_NUMBER &&
      maxNum >= this.RANDOM_MIN_NUMBER &&
      maxNum <= this.RANDOM_MAX_NUMBER &&
      guessNum >= this.GUESS_MIN_NUMBER &&
      guessNum <= this.GUESS_MAX_NUMBER
    );
  }

  playerNumbersCheck(form: NgForm) {
    for (const [, value] of Object.entries(form.value)) {
      if (
        !Number.isInteger(+value) ||
        +value > this.highestNumChoice ||
        +value < 0
      ) {
        return false;
      }
    }
    return true;
  }

  getRandomIntInclusive() {
    this.randomNumber = Math.floor(Math.random() * (this.highestNumChoice + 1));
    return this.randomNumber;
  }

  submitPlayersHandler(form: NgForm) {
    if (form.value.players < 2 || form.value.players > this.PLAYER_MAX_NUMBER)
      return;
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
      if (
        !Number.isInteger(playerNumbers[i].number) ||
        playerNumbers[i].number > this.highestNumChoice ||
        playerNumbers[i].number < 0
      ) {
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
    this.checkClosest();
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
        this.closest = [this.players[i]];
      }
    }
    let result: string;
    if (this.guessCount < this.guessNumberChoice) {
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
    this.playerNumChoice = null;
    this.highestNumChoice = null;
    this.guessNumberChoice = null;
    this.playerMaxArr = null;
    this.players = [];
    this.randomNumber = null;
    this.guessCount = 0;
    this.disablePlayAgain = false;
    this.choiceMode = true;
    this.closest = [];
  }
}
