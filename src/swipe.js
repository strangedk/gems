import gsap from 'gsap';

class Swipe {
    constructor(target) {
        this.offset = 20;
        this.target = target;
        this.sourceX = 0;
        this.sourceY = 0;

        this.target.on('pointerdown', e => {
            this.sourceX = this.target.x;
            this.sourceY = this.target.y;

            console.log('sourceXY::: ', e, this.sourceX, this.sourceY);

            document.addEventListener('pointermove', this.onPointerMove);
            document.addEventListener('pointerup', this.onPointerUp);
        });

        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.moveX = this.moveX.bind(this);
        this.moveY = this.moveY.bind(this);
        this.setX = this.setX.bind(this);
        this.setY = this.setY.bind(this);
    }

    onPointerMove(e) {
        let diffX = e.clientX - this.sourceX;
        let diffY = e.clientY - this.sourceY;
        console.log('pointermove::::', diffX, diffY);
        this.moveX(e.clientX).moveY(e.clientY);
    };

    onPointerUp(e) {
        console.log('pointerup::::', e);
        gsap.to(this.target, {x: this.sourceX, y: this.sourceY });
        document.removeEventListener('pointermove', this.onPointerMove);
    };

    setX(value) {
        this.target.x = value;
        return this;
    }

    setY(value) {
        this.target.y = value;
        return this;
    }

    moveX(value) {
        this.target.x = value - this.offset;
        return this;
    }

    moveY(value) {
        this.target.y = value - this.offset;
        return this;
    }
}

export default Swipe;

let initialPoint, finalPoint;
let bunny = {};

bunny.touchstart = function (interactionData) {
    initialPoint = interactionData.getLocalPosition(this.parent);
}

bunny.touchend = bunny.touchendoutside = function (interactionData) {
    finalPoint = interactionData.getLocalPosition(this.parent);

    let xAbs = Math.abs(initialPoint.x - finalPoint.x);
    let yAbs = Math.abs(initialPoint.y - finalPoint.y);

    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.x < initialPoint.x)
                console.log("swap left");
            else
                console.log("swap right");
        } else {
            if (finalPoint.y < initialPoint.y)
                console.log("swap up");
            else
                console.log("swap down");
        }
    }
}