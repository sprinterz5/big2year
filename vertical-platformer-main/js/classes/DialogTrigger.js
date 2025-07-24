class DialogTrigger extends Sprite {
    constructor({ position, imageSrc, dialogText }) {
        const image = new Image();
        image.src = imageSrc;
        console.log('Creating DialogTrigger with imageSrc:', imageSrc);
        super({ position, imageSrc }); // передаем image, как ожидает Sprite.js
        this.dialogText = dialogText;
        this.triggered = false;
        
    }
}

window.DialogTrigger = DialogTrigger;
