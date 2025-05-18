const prompt = require('prompt-sync')({ sigint: true });

const Direction = {
  Up: 'U',
  Down: 'D',
  Left: 'L',
  Right: 'R',
};

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this._field = field;
    this.locationX = 0;
    this.locationY = 0;
    this._field[0][0] = pathCharacter;
  }

  // print() {
  //   console.log(this.field.join(''));
  // }

  askQuesion() {
    const answer = prompt('Which way? ').toUpperCase();
    switch (answer) {
      case Direction.Up:
        this.locationY += 1;
        break;
      case Direction.Down:
        this.locationY -= 1;
        break;
      case Direction.Left:
        this.locationX -= 1;
        break;
      case Direction.Right:
        this.locationX += 1;
        break;
      default:
        console.log('Invalid direction. Please enter U, D, L, or R.');
        this.askQuesion();
        break;
    }
  }

  isHat() {
    return this._field[this.locationY][this.locationX] === hat;
  }
  isHat() {
    return this._field[this.locationY][this.locationX] === hole;
  }
}
