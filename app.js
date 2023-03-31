const choice = document.querySelectorAll(".pick-card");
const opponentMove = document.querySelector(".card.opponent img");
const playerMove = document.querySelector(".card.player img")

const arr = ["rock", "paper", "scissors"];
let result = [];
let score = 0;

choice.forEach(el => {
    el.addEventListener("click", handleMove)

    function handleMove(e) {
        const displayResult = document.querySelector("h2:nth-child(3)")
        displayResult.textContent = "VS";
        displayResult.style.color = "black";
        result = [];
        opponentMove.src = "";
        playerMove.src = e.target.children[0].getAttribute("src");
        playerMove.setAttribute("data-attr", e.target.children[0].getAttribute("data-attr"))

        console.log(playerMove.getAttribute("data-attr"))

        result.push(e.target.children[0].getAttribute("data-attr"));

        setTimeout(() => {
            const randomNum = Math.trunc(Math.random() * 3)

            opponentMove.src = `ressources/${arr[randomNum]}.svg`
            opponentMove.setAttribute("data-attr", arr[randomNum])

            result.push(arr[randomNum])
            console.log(opponentMove.getAttribute("data-attr"))
            console.log(result)


            if (result[0] === "rock" && result[1] === "scissors") {
                winMove();
            } else if (result[0] === "paper" && result[1] === "rock") {
                winMove();
            } else if (result[0] === "scissors" && result[1] === "paper") {
                winMove();
            } else if (result[0] === result[1]) {
                displayResult.textContent = "DRAW";
                displayResult.style.color = "orange";
            } else {
                displayResult.textContent = "LOSE";
                displayResult.style.color = "red";
            }
        }, 1000)

        function winMove() {
            const scoreIncr = document.querySelector("#score")
            displayResult.textContent = "WIN";
            displayResult.style.color = "green";
            score++;
            scoreIncr.textContent = score
        }
    }
});