import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css'],
})
export class PlayerInputComponent implements OnInit {
  @Input() playerName: string;
  @Input() playerNum: string;
  @Output() playerNumChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  valChanged() {
    this.playerNumChanged.emit(this.playerNum);
  }
}
