// DISPLAY RULE
window.addEventListener("load", () => {alert("The rule is simple, you need to reach the score of 5 before the opponent to win the game")})

const choice = document.querySelectorAll(".pick-card");
const opponentMove = document.querySelector(".card.opponent img");
const playerMove = document.querySelector(".card.player img")

const arr = ["rock", "paper", "scissors"];
let result = [];
let playerScore = 0;
let opponentScore = 0;
let lock = false;
let intervalId;

choice.forEach(el => {
    el.addEventListener("click", handleMove)
    
    function handleMove(e) {
        if(lock) return;

        lock = true;
        const displayResult = document.querySelector("h2:nth-child(4)");
        
        // RESET VALUES
        resultMove("VS", "black", "scale(1)");
        opponentMove.src = "";
        playerMove.src = "";

        // TIMER BEFORE RESULT
        let i = 3;
        displayResult.textContent = "SHI";
        intervalId = setInterval(() => {
            i--;
            switch (i) {
                case 2:
                    displayResult.textContent = "FU"
                    break;
                case 1:
                    displayResult.textContent = "MI"
                    break;
                case 0:
                    clearInterval(intervalId);
                    compareResults();
                    break;
                default:
                    console.log("SWITCH CASE ERROR - I = " + i)
            }
        },500)

        const playerScoreTxt = document.querySelector("#playerScore")
        const opponentScoreTxt = document.querySelector("#opponentScore")
        function compareResults(){
            
            playerMove.src = e.target.children[0].getAttribute("src");
            playerMove.setAttribute("data-attr", e.target.children[0].getAttribute("data-attr"))
    
            result.push(e.target.children[0].getAttribute("data-attr"));
    
            const randomNum = Math.trunc(Math.random() * 3)
    
            opponentMove.src = `ressources/${arr[randomNum]}.svg`
            opponentMove.setAttribute("data-attr", arr[randomNum])
    
            result.push(arr[randomNum])
            
            // CHECK RESULT
            if (result[0] === "rock" && result[1] === "scissors") {
                resultMove("WIN", "green", "scale(1.5)")
                incrPlayerScore()
            } else if (result[0] === "paper" && result[1] === "rock") {
                resultMove("WIN", "green", "scale(1.5)")
                incrPlayerScore()
            } else if (result[0] === "scissors" && result[1] === "paper") {
                resultMove("WIN", "green", "scale(1.5)")
                incrPlayerScore()
            } else if (result[0] === result[1]) {
                resultMove ("DRAW", "orange", "scale(1.5)")
            } else {
                resultMove("LOSE", "red", "scale(1.5)");
                opponentScore++;
                opponentScoreTxt.textContent = opponentScore;
            }

            if(playerScore === 5) {
                alert("! CONGRATULATIONS ! YOU WON THE GAME !")
                location.reload();// REFRESH THE PAGE
            } else if (opponentScore === 5) {
                alert ("! YOU'VE LOST THE GAME - TRY AGAIN !")
                location.reload();// REFRESH THE PAGE
            }

            result = [];// EMPTY RESULT ARRAY
            lock = false;
        }

        function incrPlayerScore() {
            playerScore++;
            playerScoreTxt.textContent = playerScore;
        }
        
        function resultMove(txtResult, txtColor, txtScale) {
            displayResult.textContent = txtResult;
            displayResult.style.color = txtColor;
            displayResult.style.transform = txtScale
        }
    }
});