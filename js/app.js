// Enemies our player must avoid
let seconds = 0;
setInterval(function() {
   seconds++;
   seconds.toFixed(2);
}, 1000);

const Enemy = function(y, speed) {
    this.x = -100;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    collectedItems = [];
 };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
    const collisionX = this.x >= player.x - 50 && this.x <= player.x + 50;
    const collisionY = this.y === player.y;
    if (collisionX && collisionY) {
      resetGame();
    }
    if (this.x > 505) {
      this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




const Player = function() {
    this.x = 200;
    this.y = 383;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  if (this.y === -32) {
    gameWon();
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(move) {
  if (move === 'left' && this.x !== 0) {
    this.x -= 100;
  } else if (move === 'right' && this.x !== 400) {
    this.x += 100;
  } else if (move === 'up' && this.y !== -32) {
    this.y -= 83;
  } else if(move === 'down' && this.y !== 383) {
    this.y += 83;
  }
}

// gets called when the player collide with a bug
function resetGame() {
  player.x = 200;
  player.y = 383;
}

// gets called when the player wins the gane
function gameWon() {
  resetGame();
  swal({
    title: "Good job!",
    text: `You won within ${seconds} seconds!`,
    icon: "success",
    button: "Aww yessss!",
  })
  .then(() => {
    seconds = 0;
  })
}

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(51, Math.random()*600 + 100);
const enemy11 = new Enemy(51, Math.random()*600 + 100);
const enemy2 = new Enemy(134, Math.random()*600 + 100);
const enemy22 = new Enemy(134, Math.random()*600 + 100);
const enemy3 = new Enemy(217, Math.random()*600 + 100);
let allEnemies = [enemy1, enemy11, enemy2, enemy22, enemy3];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
