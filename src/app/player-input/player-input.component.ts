import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css'],
})
export class PlayerInputComponent implements OnInit {
  @Output() playerNum: number;
  @Input() valChanged: Function;

  constructor() {}

  ngOnInit(): void {}
}
