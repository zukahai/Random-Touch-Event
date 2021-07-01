let game_W = 0, game_H = 0;
let Time = 5;
let count = 1;
A = [];
color = [];
N = 0;
class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();
        this.loop();
        this.listenTouch();
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            A = [];
            color = [];
            for (let i = 0; i < evt.touches.length; i++) {
                var x = evt.touches[i].pageX;
                var y = evt.touches[i].pageY;
                A.push({x, y});
                color.push(Math.floor(Math.random()*16777215).toString(16));
                if (A.length > 100) {
                    A.splice(0, 1);
                    color.splice(0, 1);
                }
            }
            if (evt.touches.length != N) {
                Time = 5;
                N = evt.touches.length;
            }
        })

        document.addEventListener("touchstart", evt => {
            A = [];
            color = [];
            for (let i = 0; i < evt.touches.length; i++) {
                var x = evt.touches[i].pageX;
                var y = evt.touches[i].pageY;
                A.push({x, y});
                color.push(Math.floor(Math.random()*16777215).toString(16));
                this.drawCircle(x, y);
            }
            if (evt.touches.length != N) {
                Time = 5;
                N = evt.touches.length;
            }
        })

        document.addEventListener("touchend", evt => {    
            A = [];
            color = [];
            if (evt.touches.length != N) {
                Time = 5;
                N = evt.touches.length;
            }
        })
    }


    loop() {
        this.update();
        setTimeout(() => this.loop(), 20);
    }

    update() {
        this.render();
        count++;
        if (count % 40 == 0 && Time > 0)
            Time --;
        this.clearScreen();
        if (Time == 0)
            this.draw();
        else
            this.drawTime();
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, game_W, game_H);
    }

    draw() {
        this.clearScreen();
        if (A.length > 0) {
            // let rd = Math.floor(Math.random * 100000000) % A.length;
            // rd = 0;
            for (let i = 100; i >= 30; i--)
                this.drawCircle(A[0].x, A[0].y, i, color[0]);
        }
    }

    drawTime() {
        this.context.fillStyle = "#CC0000";
        this.context.font = (Math.floor(this.getWidth() * 30 / 2)) + 'px Calibri';
        this.context.fillText(Time, game_W / 2 - this.getWidth() * 3.7, game_H / 2 + this.getWidth() * 4.3);
    }

    drawCircle(x, y, r, cl) {
        this.context.strokeStyle = '#' + cl;
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI);
        this.context.stroke();
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 400);
    }
}

var g = new game();
