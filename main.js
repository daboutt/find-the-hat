const prompt = require('prompt-sync')({ sigint: true });

const Direction = {
  UP: 'U',
  DOWN: 'D',
  LEFT: 'L',
  RIGHT: 'R',
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
  }
  isOutOfBounds() {
    return (
      this.locationX < 0 ||
      this.locationY < 0 ||
      this.locationY >= this._field.length ||
      this.locationX >= this._field[0].length
    );
  }

  isHat() {
    return this._field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this._field[this.locationY][this.locationX] === hole;
  }

  static generateField(height, width, prob = 0.1) {
    const fields = new Array(height).fill(9).map((item) => new Array(width));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        fields[y][x] = Math.random() <= prob ? hole : fieldCharacter;
      }
    }

    fields[0][0] = pathCharacter;

    const hatLocation = {
      locationX: Math.floor(Math.random() * width),
      locationY: Math.floor(Math.random() * height),
    };

    while (hatLocation.locationX > 0 && hatLocation.locationY > 0) {
      hatLocation.locationX = Math.floor(Math.random() * width);
      hatLocation.locationY = Math.floor(Math.random() * height);
    }
    fields[hatLocation.locationY][hatLocation.locationX] = hat;
    return fields;
  }
  print() {
    console.log(this._field.map((item) => item.join('')).join('\n'));
  }
  runGame() {
    while (true) {
      this.print();
      this.askQuestion();

      if (this.isOutOfBounds()) {
        console.log('You is out of bound');
        break;
      }
      if (this.isHole()) {
        console.log('You failed the hole');
        break;
      }
      if (this.isHat()) {
        console.log('Congrat. You win!');
        break;
      }
      this._field[this.locationY][this.locationX] = pathCharacter;
    }
  }
  askQuestion() {
    const input = prompt('Enter direction: ').toUpperCase();
    switch (input) {
      case Direction.UP:
        this.locationY -= 1;
        break;
      case Direction.DOWN:
        this.locationY += 1;
        break;
      case Direction.LEFT:
        this.locationX -= 1;
        break;
      case Direction.RIGHT:
        this.locationX += 1;
        break;
      default:
        console.log('Invalid direction. Enter U, D, L or R');
        break;
    }
  }
}
const fields = new Field(Field.generateField(5, 7, 0.2));
fields.runGame();
