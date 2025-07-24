class CollisionBlock {
  constructor({ position, height = 16 }) {
    this.position = position
    this.width = 16
    this.height = height
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravity
    this.velocity.y += 0.5; // Adjust gravity as needed

    this.isOnGround = true; // Reset each frame before checking

    platforms.forEach(platform => {
        if (
            this.position.y + this.height <= platform.position.y &&
            this.position.y + this.height + this.velocity.y >= platform.position.y &&
            this.position.x + this.width >= platform.position.x &&
            this.position.x <= platform.position.x + platform.width
        ) {
            this.velocity.y = 0;
            this.isOnGround = true;
            this.position.y = platform.position.y - this.height; // snap on top
        }
    });

    // Floor bounds
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0;
        this.isOnGround = true;
        this.position.y = canvas.height - this.height;
    }
  }
}
