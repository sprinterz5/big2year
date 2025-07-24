
let activeDialog = null;
let dialogStep = 0;


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
}

const aspectRatio = 16 / 9;
function resizeCanvasMaintainingAspect() {
    
    let newWidth = window.innerWidth;
    let newHeight = newWidth / aspectRatio;

    if (newHeight > window.innerHeight) {
        newHeight = window.innerHeight;
        newWidth = newHeight * aspectRatio;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    scaledCanvas.width = newWidth / 4;
    scaledCanvas.height = newHeight / 4;

    
}

canvas.height = window.innerHeight;
canvas.width = window.innerHeight * aspectRatio;
const camera = {
    position: {
        x: 0,
        y: 0,
    },
};
resizeCanvasMaintainingAspect();
window.addEventListener('resize', resizeCanvasMaintainingAspect);


const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        })
      )
    }
  })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
        })
      )
    }
  })
})

const gravity = 0.1

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionBlocks,
  platformCollisionBlocks,
  isOnGround: false,
  imageSrc: './img/warrior/Idle.png',
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: './img/warrior/Idle.png',
      frameRate: 8,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: './img/warrior/Run.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: './img/warrior/Jump.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: './img/warrior/Fall.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: './img/warrior/FallLeft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
    RunLeft: {
      imageSrc: './img/warrior/RunLeft.png',
      frameRate: 8,
      frameBuffer: 5,
    },
    IdleLeft: {
      imageSrc: './img/warrior/IdleLeft.png',
      frameRate: 8,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: './img/warrior/JumpLeft.png',
      frameRate: 2,
      frameBuffer: 3,
    },
  },
})
setInterval(() => {
    console.log(`Player position: x=${player.position.x}, y=${player.position.y}`);
}, 5000);

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
}

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
})

const backgroundImageHeight = 432
// Обновляем камеру под новые размеры
    camera.position.y = -backgroundImageHeight + scaledCanvas.height;
function openDialog(dialogArray) {
    const dialogBox = document.getElementById('dialogBox');
    const dialogText = document.getElementById('dialogText');
    const dialogHint = document.getElementById('dialogHint');

    dialogStep = 0;
    activeDialog = dialogArray;

    dialogText.textContent = activeDialog[dialogStep];
    dialogBox.style.display = 'block';
    dialogHint.style.display = 'block';
}


const dialogTriggers = [
    new DialogTrigger({
        position: { x: 400, y: 350 },
        imageSrc: './img/dialog-trigger.png',
        dialogText: ['Привет!', 'Ты нашел секрет.', 'Молодец!']

    })
];

function animate() {
  

  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
c.save();
const scaleX = canvas.width / scaledCanvas.width;
const scaleY = canvas.height / scaledCanvas.height;
c.scale(scaleX, scaleY);
c.translate(camera.position.x, camera.position.y);



  background.update()
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.update()
  // })

  // platformCollisionBlocks.forEach((block) => {
  //   block.update()
  // })

  player.checkForHorizontalCanvasCollision()
  player.update()
 dialogTriggers.forEach(trigger => {
    trigger.draw();

    const isColliding =
        player.hitbox.position.x < trigger.position.x + trigger.width &&
        player.hitbox.position.x + player.hitbox.width > trigger.position.x &&
        player.hitbox.position.y < trigger.position.y + trigger.height &&
        player.hitbox.position.y + player.hitbox.height > trigger.position.y;

    if (isColliding && !trigger.wasColliding && !activeDialog) {
    openDialog(trigger.dialogText);
}


    // Обновляем состояние на следующий кадр
    trigger.wasColliding = isColliding;
});



  player.velocity.x = 0
  if (keys.d.pressed) {
    player.switchSprite('Run')
    player.velocity.x = 2
    player.lastDirection = 'right'
    player.shouldPanCameraToTheLeft({ canvas, camera })
  } else if (keys.a.pressed) {
    player.switchSprite('RunLeft')
    player.velocity.x = -2
    player.lastDirection = 'left'
    player.shouldPanCameraToTheRight({ canvas, camera })
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === 'right') player.switchSprite('Idle')
    else player.switchSprite('IdleLeft')
  }

  if (player.velocity.y < 0) {
    player.shouldPanCameraDown({ camera, canvas })
    if (player.lastDirection === 'right') player.switchSprite('Jump')
    else player.switchSprite('JumpLeft')
  } else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ camera, canvas })
    if (player.lastDirection === 'right') player.switchSprite('Fall')
    else player.switchSprite('FallLeft')
  }

  c.restore()
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 'w':
      
                player.velocity.y = -4; // Adjust for desired jump strength
                
            break;
    case 'Enter':
      if (event.key === 'Enter' && activeDialog) {
        const dialogBox = document.getElementById('dialogBox');
        const dialogText = document.getElementById('dialogText');
        const dialogHint = document.getElementById('dialogHint');

        dialogStep++;
        if (dialogStep < activeDialog.length) {
            dialogText.textContent = activeDialog[dialogStep];
        } else {
            dialogBox.style.display = 'none';
            dialogHint.style.display = 'none';
            activeDialog = null;

            // Переход на другую страницу
            window.location.href = 'https://example.com/nextpage.html';
        }
      }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }
})
// touch управление
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (y < rect.height / 3) {
        player.velocity.y = -4; // прыжок
    } else if (x < rect.width / 2) {
        keys.a.pressed = true;  // влево
    } else {
        keys.d.pressed = true;  // вправо
    }
}

function handleTouchEnd(e) {
    keys.a.pressed = false;
    keys.d.pressed = false;
}

