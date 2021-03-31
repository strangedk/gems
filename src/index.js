import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import Swipe from "./swipe";

// region #Options and settings
const options = {
    width: 600,
    height: 600,
    antialias: true,
    transparent: true,
};

const params = {
    WIDTH : 8,
    HEIGHT : 8,
    IMG_WIDTH : 38,
    IMG_HEIGHT : 38,
    IMG_SCALE : 0.5,
}

const TINTS = [
    0xff0000,
    0x00ff00,
    0xff00ff,
    0x00ffff,
    0xffffff,
    0xffff00,
];
const randomTint = () => TINTS[Math.floor(Math.random() * TINTS.length)];
// endregion

class Item extends PIXI.Sprite {
    constructor() {
        super();

        this.gem = PIXI.Sprite.from('gem.png');
        this.gem.scale.set(params.IMG_SCALE);
        this.anchor.set(0.5);
        this.gem.anchor.set(0.5);

        this.interactive = true;
        this.buttonMode = true;

        this.gem.tint = randomTint();

        this.swipe = new Swipe(this);

        this.addChild(this.gem);
    }
}

// region #Main game container
class Main extends PIXI.Sprite {
    constructor() {
        super();

        const {WIDTH, HEIGHT, IMG_WIDTH, IMG_HEIGHT} = params;

        this.items = new Array(WIDTH * HEIGHT)
            .fill(true)
            .map((v,i) => {
                const item = new Item();
                item.x = (i % WIDTH) * IMG_WIDTH;
                item.y = (Math.floor(i / HEIGHT)) * IMG_HEIGHT;
                item.scale.set(0.1);
                item.on('swipe', this.swipeHandler.bind(this))
                this.addChild(item);

                gsap.to(item.scale, {x: 1, y: 1, duration: 1 + Math.random() * 2,})
            });

    }

    swipeHandler(event)  {
        console.log(event.detail.dir);
    }

    swipeItems(from, to) {

    }
}
// endregion

// region #PIXI application and renderer
const app = new PIXI.Application(options);
const main = new Main();

const animate = () => {
    requestAnimationFrame(animate);
    app.renderer.render(app.stage);
}

const init = () => {
    main.x = main.y = params.IMG_HEIGHT / 2;
    app.stage.addChild(main);
    document.body.appendChild(app.view);

    animate();
}
// endregion

init();