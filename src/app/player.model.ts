export class Player {
  player: string;
  number: number;
  intFromTarget: number;

  constructor(player: string, number: number, intFromTarget: number) {
    this.player = player;
    this.number = number;
    this.intFromTarget = number;
  }
}
