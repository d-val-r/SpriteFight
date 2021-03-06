
// timer controls
let timerValue = 60;
const timer = document.querySelector("#timer");
timer.textContent = timerValue
let timerId;

// animation controls
let frame = 0;

// game over screen
const winnerMessage = document.querySelector("#winner-message");
winnerMessage.textContent = "";


// ensures that after a player wins,
// the other player cannot win by attaking after the game stops
let gameOver = false;


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    s: {
        pressed: false
    },
    w: {
        pressed: false
    },
    rightArrow: {
        pressed: false
    },
    leftArrow: {
        pressed: false
    },
    upArrow: {
        pressed: false
    },
    downArrow: {
        pressed: false
    }
}

canvas.width = 1024;
canvas.height = 576;

// render a rectangle at (0,0), filling the whole canvas
ctx.fillRect(0,0, canvas.width, canvas.height);

const background = new Sprite(
    1024,
    576,
    {
        x: 0,
        y: 0
    },
    "./assets/background/PNG/cyberpunk-street.png"
)





// const player1 = new Player(
//     50,
//     170,
//     {
//         x: 0,
//         y: canvas.height - 250
//     },
//     {
//         x:0,
//         y:0
//     },
//     "right",
//     "./assets/characters/cyborg/Cyborg_idle.png",
//     4.0,
//     4,
//     0
// );


const player1 = new Player(
    50, 
    150, 
    {x:0, y:canvas.height - 300}, 
    {x: 0, y:0},
    "right",
    "./assets/characters/cyborg/Cyborg_idle.png",
    4.0,
    4,
    0,
    {
        "idle_right": {
            src: "./assets/characters/cyborg/Cyborg_idle.png",
            mod: 17
        },
        "idle_left": {
            src: "./assets/characters/cyborg/Cyborg_idle_inverted.png",
            mod: 17
        },
        "run_right": {
            src: "./assets/characters/cyborg/Cyborg_run.png",
            mod: 7
        },
        "run_left": {
            src: "./assets/characters/cyborg/Cyborg_run_inverted.png",
            mod: 7
        },
        "attack_right": {
            src: "./assets/characters/cyborg/Cyborg_attack1.png",
            mod: 7
        },
        "jump_right": {
            src: "./assets/characters/cyborg/Cyborg_jump.png",
            mod: 23
        },
        "jump_left": {
            src: "./assets/characters/cyborg/Cyborg_jump_inverted.png",
            mod: 37
        },
        "punch_right": {
            src: "./assets/characters/cyborg/Cyborg_attack1.png",
            mod: 3
        },
        "punch_left": {
            src: "./assets/characters/cyborg/Cyborg_attack1_inverted.png",
            mod: 3
        }
    },
    "wasd"
);

// player1.rectangle = true;

// const player1 = new Fighter(
//     50, 
//     150, 
//     {
//         position: 
//             {x:0, y:canvas.height - 150}, 
//         velocity: 
//             {x: 0, y:0}
//     },
//     "right");


// const player2 = new Fighter(
//     50, 
//     150, 
//     {
//         position: 
//             {x:canvas.width - 50, y:canvas.height - 150}, 
//         velocity: 
//             {x:0, y:0}
//     }, 
//     "left");



const player2 = new Player(
    50, 
    150, 
    {x:canvas.width - 250, y:canvas.height - 300},
    {x: 0, y:0},
    "left",
    "./assets/characters/biker/Biker_idle_inverted.png",
    4.0,
    4,
    0,
    {
        "idle_left": {
            
            // stance is used for comparison purposes, as the filename 
            // recieves an added prefix after becoming the image source
            src: "./assets/characters/biker/Biker_idle_inverted.png",
            mod: 17
        },
        "idle_right": {
            src: "./assets/characters/biker/Biker_idle.png",
            mod: 17
        },
        "run_right": {
            src: "./assets/characters/biker/Biker_run.png",
            mod: 7
        },
        "run_left": {
            src: "./assets/characters/biker/Biker_run_inverted.png",
            mod: 7
        },
        "jump_left": {
            src: "./assets/characters/biker/Biker_jump_inverted.png",
            mod: 27
        },
        "jump_right": {
            src: "./assets/characters/biker/Biker_jump.png",
            mod: 23
        },
        "punch_right": {
            src: "./assets/characters/biker/Biker_attack1.png",
            mod: 3
        },
        "punch_left": {
            src: "./assets/characters/biker/Biker_attack1_inverted.png",
            mod: 3
        }
    },
    "arrows"
);

// player2.rectangle = true;

player2.draw();


// create an infinite animation loop that relies on the velocities 
// of the sprites to animate them; keypresses alter the velocity
const animate = () => {


    window.requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // ctx.fillStyle = 'black';
    // ctx.fillRect(0,0, canvas.width, canvas.height);
    background.update();
    // cyborg.update();
    player1.update();
    player2.update();



    
    // player 1 animation controls

    // horizontal controls
    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5;
        player1.switchSprite("run_left");
        player1.changeDirection("left");
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5;
        player1.switchSprite("run_right");
        player1.changeDirection("right");
    } else {
        player1.velocity.x = 0;
        player1.switchSprite(player1.direction === "left" ? "idle_left" : "idle_right");
    }

    // crouch and jump controls
    if (keys.s.pressed && !player1.crouch) {
        player1.height /= 2;
        player1.position.y += player1.height;
        player1.crouch = true
    } else if (!keys.s.pressed && player1.crouch) {
        player1.height *= 2;
        player1.position.y -= player1.height / 2;
        player1.crouch = false;
    }

    if (keys.w.pressed && !player1.falling) {
        player1.velocity.y = -5;
    } 


    // player2 animation controls

    // horizontal controls
    if (keys.leftArrow.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5;
        player2.switchSprite("run_left")
        player2.changeDirection("left");
    } else if (keys.rightArrow.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5;
        player2.switchSprite("run_right")
        player2.changeDirection("right");
    } else {
        player2.velocity.x = 0;
        player2.switchSprite(player2.direction === "left" ? "idle_left" : "idle_right");
    }

    // crouch and jump controls
    if (keys.downArrow.pressed && !player2.crouch) {
        player2.height /= 2;
        player2.position.y += player2.height;
        player2.crouch = true
    } else if (!keys.downArrow.pressed && player2.crouch) {
        player2.height *= 2;
        player2.position.y -= player2.height / 2;
        player2.crouch = false;
    }

    if (keys.upArrow.pressed && !player2.falling) {
        player2.velocity.y = -5;
    } 


    if (player1.velocity.y === 0) {
        // player1.switchSprite("jump");
        player1.jumping = false;
    }

    if (player2.velocity.y === 0) {
        // player2.switchSprite("jump");
        player2.jumping = false;
    }


    // attacking controls for player 1
    if (player1.attackBox.position.x + player1.attackBox.width >= player2.hitbox.position.x 
        && player1.attackBox.position.x <= player2.hitbox.position.x + player2.hitbox.width
        && player1.attackBox.position.y + player1.attackBox.height >= player2.hitbox.position.y 
        && player1.attackBox.position.y <= player2.hitbox.position.y + player2.hitbox.height
        && player1.isAttacking) {
            console.log("Player1 attacks!");
            player1.isAttacking = false;
            player2.health -= 5;
            document.querySelector("#health2").style.width = `${player2.health}%`;
        } 

    // attack controls for player 2
    if (player2.attackBox.position.x <= player1.hitbox.position.x + player1.hitbox.width
        && player2.attackBox.position.x >= player1.hitbox.position.x
        && player2.attackBox.position.y + player2.attackBox.height >= player1.hitbox.position.y
        && player2.attackBox.position.y <= player1.hitbox.position.y + player1.hitbox.height
        && player2.isAttacking) {
            console.log("Player2 attacks!");
            player2.isAttacking = false;
            player1.health -= 5;
            document.querySelector("#health1").style.width = `${player1.health}%`;
    }

    // end game based on player health
    if (player1.health === 0 || player2.health === 0) determineWinner(player1, player2, timerId);


}

// movement while key is held
window.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player1.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true;
            player1.lastKey = 'a';
            break
        case 's':
            keys.s.pressed = true;
            break;
        case 'w':
            keys.w.pressed = true;

            // set the sprite's falling variable to true; that way, the user cannot
            // keep clicking 'w' (or up arrow) to "double jump"
            player1.falling = true;
            player1.jumping = true;
            player1.switchSprite(`jump_${player1.direction}`);
            break;
        case 'ArrowRight':
            keys.rightArrow.pressed = true;
            player2.lastKey = 'ArrowRight';
            break
        case 'ArrowLeft':
            keys.leftArrow.pressed = true;
            player2.lastKey = 'ArrowLeft';
            break
        case 'ArrowDown':
            keys.downArrow.pressed = true;
            break;
        case 'ArrowUp':
            keys.upArrow.pressed = true;
            player2.falling = true;
            player2.jumping = true;
            player2.switchSprite(`jump_${player2.direction}`);
            break;
        case 'f':
            player1.switchSprite(`punch_${player1.direction}`);
            player1.attack();
            break;
        case ' ':
            player2.switchSprite(`punch_${player2.direction}`);
            player2.attack();
            break;
    }
});

// reset velocity to 0 when the key is let go
window.addEventListener('keyup', (event) => {

    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            
            // reset the last key to the opposite key so that if
            // both keys are held the character will move in the correct direction
            player1.lastKey = 'a';
            break
        case 'a':
            keys.a.pressed = false;
            player1.lastKey = 'd';
            break
        case 's':
            keys.s.pressed = false;
            break;
        case 'ArrowRight':
            keys.rightArrow.pressed = false;
            break
        case 'ArrowLeft':
            keys.leftArrow.pressed = false;
            player2.lastKey = 'ArrowRight';
            break
        case 'ArrowDown':
            keys.downArrow.pressed = false;
            break;
    }
});

const determineWinner = (p1, p2, timerId) => {
    // stop the function if the game is over
    if (gameOver) return;

    if (p1.health > p2.health) {
        winnerMessage.textContent = "Player 1 Wins!";
    } else if (p1.health < p2.health){
        winnerMessage.textContent = "Player 2 Wins!"
    } else {
        winnerMessage.textContent = "Tie Game!";
    }

    // 
    gameOver = true;

    // stop the timer
    clearTimeout(timerId);
}


const decreaseTime = () => {
    if (timerValue > 0) {
        timerValue--;
        timerId = setTimeout(decreaseTime, 1000)
        timer.textContent = timerValue;
    } else { // time is up
        determineWinner(player1, player2);
    }
}


animate();
decreaseTime();