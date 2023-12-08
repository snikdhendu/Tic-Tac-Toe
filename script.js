window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var canvas, ctx, w, h, particles = [], probability = 0.04,
    xPoint, yPoint;





function onLoad() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();

    window.requestAnimationFrame(updateWorld);
}

function resizeCanvas() {
    if (!!canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
}

function updateWorld() {
    update();
    paint();
    window.requestAnimationFrame(updateWorld);
}

function update() {
    if (particles.length < 500 && Math.random() < probability) {
        createFirework();
    }
    var alive = [];
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].move()) {
            alive.push(particles[i]);
        }
    }
    particles = alive;
}

function paint() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
    }
}

function createFirework() {
    xPoint = Math.random() * (w - 200) + 100;
    yPoint = Math.random() * (h - 200) + 100;
    var nFire = Math.random() * 50 + 100;
    var c = "rgb(" + (~~(Math.random() * 200 + 55)) + ","
        + (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
    for (var i = 0; i < nFire; i++) {
        var particle = new Particle();
        particle.color = c;
        var vy = Math.sqrt(25 - particle.vx * particle.vx);
        if (Math.abs(particle.vy) > vy) {
            particle.vy = particle.vy > 0 ? vy : -vy;
        }
        particles.push(particle);
    }
}

function Particle() {
    this.w = this.h = Math.random() * 4 + 1;

    this.x = xPoint - this.w / 2;
    this.y = yPoint - this.h / 2;

    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;

    this.alpha = Math.random() * .5 + .5;

    this.color;
}

Particle.prototype = {
    gravity: 0.05,
    move: function () {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.01;
        if (this.x <= -this.w || this.x >= screen.width ||
            this.y >= screen.height ||
            this.alpha <= 0) {
            return false;
        }
        return true;
    },
    draw: function (c) {
        c.save();
        c.beginPath();

        c.translate(this.x + this.w / 2, this.y + this.h / 2);
        c.arc(0, 0, this.w, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;

        c.closePath();
        c.fill();
        c.restore();
    }
}














const box = document.querySelectorAll('.box');
let celeb=document.querySelector('canvas')
let home=document.querySelector('#game')
let text=document.querySelector('#resulttext')
let turn0 = true;
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    
]
box.forEach(function (val) {
    val.addEventListener('click', function () {
        // console.log("clicked")
        if (turn0) {
            val.innerHTML = "O"
            turn0 = false;
            val.disabled = true;
            checkwinner(val)
            // text.innerHTML = `<h1> ${val.innerHTML} Turn</h1>`;
        }
        else {
            val.innerHTML = "X";
            turn0 = true;
            val.disabled = true;
            checkwinner(val)
            // text.innerHTML = `<h1> ${val.innerHTML} Turn</h1>`;
        }
    })
})
const disable_buttons=()=>{
    for (const boxes of box) {
        boxes.disabled=true;
    }
}
const enable_buttons=()=>{
    for (const boxes of box) {
        boxes.disabled=false;
    }
}
const checkwinner = () => {
    let isDraw = true;
    let filledBoxes = 0;

    for (let pattern of win) {
        let pos1val = box[pattern[0]].innerHTML;
        let pos2val = box[pattern[1]].innerHTML;
        let pos3val = box[pattern[2]].innerHTML;

        if (pos1val !== '' && pos1val === pos2val && pos2val === pos3val) {
            let winner = pos1val;
            text.innerHTML = `<h1>Hurray ${winner} won the game</h1>`;
            disable_buttons();
            celeb.style.display = 'block';
            home.style.background = 'transparent';
            return; // Exit the function if a winner is found
        }
    }

    // Check for a draw
    for (const boxes of box) {
        if (boxes.innerHTML === '') {
            isDraw = false;
        } else {
            filledBoxes++;
        }
    }

    if (isDraw && filledBoxes === box.length) {
        text.innerHTML = `<h1>The Game is Draw</h1>`;

    }
};
