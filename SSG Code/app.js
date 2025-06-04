let game_sequence = [];
let user_sequence = [];
let game_start = false;
let level = 0;
let btns = ["color1", "color2", "color3", "color4"];
let alltimelevel = 0;
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function () {

    if (game_start == false) {
        game_start = true;
        levelup();
    }
});
function gameFlashbtn(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 500);
}

function userFlashbtn(btn) {
    btn.classList.add("user");
    setTimeout(() => {
        btn.classList.remove("user");
    }, 500);
}

function levelup() {
    level++;
    h3.innerText = `Level ${level}`;
    let ranIndx = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIndx];
    let ranbtns = document.querySelector(`.${ranColor}`);
    gameFlashbtn(ranbtns);
    game_sequence.push(ranColor);
    user_sequence = [];
}

function checkSequence(index) {
    if (user_sequence[index] == game_sequence[index]) {
        if (user_sequence.length == game_sequence.length) {
            setTimeout(() => {
                levelup();
            }, 1000);
        }
    }
    else {
        h3.innerHTML = `Game Over !! Current Score <b> Level ${level - 1} <b> <br> enter any key to start new game`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = 'white';

        }, 200);
        highScore(level - 1);
        reset();

    }

}

let allbtns = document.querySelectorAll(".btn");


for (btn of allbtns) {
    btn.addEventListener("click", function () {
        userFlashbtn(this);
        user_sequence.push(this.id);
        checkSequence(user_sequence.length - 1); // current index 
    })
}

function highScore(current) {
    if (alltimelevel < current) {
        alltimelevel = current;
        document.querySelector('h2').innerText = `High Score : ${alltimelevel}`;
    }
}
function reset() {
    level = 0;
    game_start = false;
    game_sequence = [];
    user_sequence = [];
}