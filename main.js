const prompt = require('prompt-sync')({ sigint: true });

const Direction = {
  Up: 'U',
  Down: 'D',
  Left: 'L',
  Right: 'R',
};

const MESSAGE = {
  OUT_OF_BOUND: 'This is out of bound',
  FALL_HOLE: 'You fell down a hole',
  FOUND_HAT: 'Congrat! You found a hat',
  INVALID_DIRECTION: 'Invalid direction. Please enter U, D, L, or R.',
  ASK_DIRECTION: 'Which way? ',
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

  runGame() {
    while (true) {
      this.print();
      this.askQuestion();

      if (this.isOutOfBounds()) {
        console.log(MESSAGE.OUT_OF_BOUND);
        return;
      }
      if (this.isHole()) {
        console.log(MESSAGE.FALL_HOLE);
        return;
      }
      if (this.isHat()) {
        console.log(MESSAGE.FOUND_HAT);
        return;
      }
      this._field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  print() {
    const map = this._field.map((row) => row.join('')).join('\n');
    console.log(map);
  }

  isOutOfBounds() {
    return (
      this.locationX < 0 ||
      this.locationY < 0 ||
      this.locationX >= this._field.length ||
      this.locationY >= this._field[0].length
    );
  }

  askQuestion() {
    const answer = prompt(MESSAGE.ASK_DIRECTION).toUpperCase();
    switch (answer) {
      case Direction.Up:
        this.locationY -= 1;
        break;
      case Direction.Down:
        this.locationY += 1;
        break;
      case Direction.Left:
        this.locationX -= 1;
        break;
      case Direction.Right:
        this.locationX += 1;
        break;
      default:
        console.log('Invalid direction. Please enter U, D, L, or R.');
        this.askQuestion();
        break;
    }
  }

  isHat() {
    return this._field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this._field[this.locationY][this.locationX] === hole;
  }

  static generateField(height, width, prob = 0.1) {
    const field = new Array(height).fill(0).map((el) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const random = Math.random();
        field[y][x] = random < prob ? hole : fieldCharacter;
      }
    }

    // Decide hat position
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
}

const field = new Field(Field.generateField(10, 10, 0.2));
field.runGame();
