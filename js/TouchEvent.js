let game_W = 0, game_H = 0;
let Time = 5;
let count = 1;
let RD = -1;
A = [];
color = [];
N = 0;
widthLine = 30;
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

        for (let i = 2 * Math.floor(Math.sqrt(game_W * game_W + game_H * game_H)); i >= 0; i--)
            color.push(Math.floor(Math.random()*16777215).toString(16));

        this.loop();
        this.listenTouch();
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            A = [];
            for (let i = 0; i < evt.touches.length; i++) {
                var x = evt.touches[i].pageX;
                var y = evt.touches[i].pageY;
                A.push({x, y});
                if (A.length > 100) {
                    A.splice(0, 1);
                    color.splice(0, 1);
                }
            }
            if (evt.touches.length != N) {
                Time = 5;
                N = evt.touches.length;
                RD = -1;
            }
        })

        document.addEventListener("touchstart", evt => {
            A = [];
            for (let i = 0; i < evt.touches.length; i++) {
                var x = evt.touches[i].pageX;
                var y = evt.touches[i].pageY;
                A.push({x, y});
                this.drawCircle(x, y);
            }
            if (evt.touches.length != N) {
                Time = 5;
                N = evt.touches.length;
                RD = -1;
            }
        })

        document.addEventListener("touchend", evt => {    
            A = [];
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
        else {
            this.drawArrayTouch();
            this.drawTime();
        }
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;
        widthLine = this.getWidth();
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, game_W, game_H);
    }

    draw() {
        this.clearScreen();
        if (A.length > 0) {
            if (RD == -1)
                RD = Math.floor(Math.random() * 100000000) % A.length;
            for (let i = Math.floor(2 * Math.sqrt(game_W * game_W + game_H * game_H)); i >= 70; i -= widthLine)
                this.drawCircle(A[RD].x, A[RD].y, i, color[i - 70]);
        }
    }

    drawTime() {
        this.context.fillStyle = "#CC0000";
        this.context.font = (Math.floor(widthLine * 30 / 2)) + 'px Calibri';
        this.context.fillText(Time, game_W / 2 - widthLine * 3.8, game_H / 2 + widthLine * 4.3);
    }

    drawArrayTouch() {
        for (let i = 0; i < A.length; i++) {
            for (let j = 75; j >= 70; j -= widthLine)
            this.drawCircle(A[i].x, A[i].y, j, color[j]);
        }
    }

    drawCircle(x, y, r, cl) {
        this.context.strokeStyle = '#' + cl;
        this.context.beginPath();
        this.context.lineWidth = widthLine;
        this.context.arc(x, y, r, 0, 2 * Math.PI);
        this.context.stroke();
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.floor(Math.sqrt(area / 400));
    }
}

var g = new game();
