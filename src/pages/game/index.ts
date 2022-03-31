import { state } from "../../state";

function botRandom(botOptions) {
	return botOptions[Math.floor(Math.random() * 3)];
}
var choices = ["piedra", "papel", "tijera"];
const botChoice = botRandom(choices);
export function initGame(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	let counter = 3;
	const countdown = setInterval(() => {
		counter--;
		const counterEl = div.querySelector(".countdown");
		counterEl.textContent = String(counter);
		if (counter < 1) {
			clearInterval(countdown);
		}
	}, 1000);

	style.innerHTML = `
  .countdown{
    font-size: 170px;
    padding:20px;
    margin-top: 130px;
    align-self: center;
  }
  @media(min-width: 679px){
    .countdown{
      font-size: 200px;
      margin-top: 0;

    } 
  }
  .game-container{
    height: 100vh;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: hidden;
  }
  .text{
    align-text: center;
    padding:15px;
  }
  .hand-view{
    position: relative;
    top: 0px;
    opacity: 0.5;
  }
  @media (min-width: 679px){
    .hand-view{
      position: relative;
      top: 40px;
      opacity: 0.5;
      
    } 
  }
  .hand-view:hover{
    top: 0px;
    opacity: 1;
    display: inherit;
    transform: translateY(-30px);
    transition: all 0.5s;
  }
  .hands-content{
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 20px;
  }
  .hand-select{
    display: flex;
    justify-content: center;
  }
  .bot-hands{
    display: none;
    flex-direction: row;
    justify-content: center;
    transform: rotate(180deg);
    margin-bottom: 50px;
    position: relative;
    top:-30px;
  }
  .bot__piedra, .bot__papel, .bot__tijera{
    display: none
  }
  .selected {
    position: absolut;
    opacity: 1;
    
  }
  `;
	div.innerHTML = `
  <div class="game-container">
    <div class="bot-hands">
      <hands-comp class="bot__piedra" hand="piedra"></hands-comp>
      <hands-comp class="bot__papel" hand="papel"></hands-comp>
      <hands-comp class="bot__tijera" hand="tijera"></hands-comp>
    </div>
    <div class="countdown">${counter}</div>
    <div class="hands-content">
      <hands-comp class="hand-view piedra" hand="piedra"></hands-comp>
      <hands-comp class="hand-view papel" hand="papel"></hands-comp>
      <hands-comp class="hand-view tijera" hand="tijera"></hands-comp>
    </div>
    </div>
    `;

	const countdownComp: any = div.querySelector(".countdown");
	const botHandsCont: any = div.querySelector(".bot-hands");

	const piedraBot: any = div.querySelector(".bot__piedra");
	const papelBot: any = div.querySelector(".bot__papel");
	const tijeraBot: any = div.querySelector(".bot__tijera");

	const handsCont: any = div.querySelector(".hands-content");
	const myPiedra: any = div.querySelector(".piedra");
	const myPapel: any = div.querySelector(".papel");
	const myTijera: any = div.querySelector(".tijera");

	function botGame(params) {
		if (params == "piedra") {
			piedraBot.style.display = "inherit";
			botHandsCont.style.display = "inherit";
			countdownComp.style.display = "none";
		} else if (params == "papel") {
			papelBot.style.display = "inherit";
			botHandsCont.style.display = "inherit";
			countdownComp.style.display = "none";
		} else if (params == "tijera") {
			tijeraBot.style.display = "inherit";
			botHandsCont.style.display = "inherit";
			countdownComp.style.display = "none";
		}
	}
	function playGame(hand) {
		if (hand == "piedra") {
			myPapel.style.display = "none";
			myTijera.style.display = "none";
			handsCont.style.justifyContent = "center";
			myPiedra.classList.remove(".hand-view");
			myPiedra.classList.add("selected");
			botGame(botChoice);
		} else if (hand == "papel") {
			myPiedra.style.display = "none";
			myTijera.style.display = "none";
			handsCont.style.justifyContent = "center";
			myPapel.classList.remove(".hand-view");
			myPapel.classList.add("selected");
			botGame(botChoice);
		} else if (hand == "tijera") {
			myPapel.style.display = "none";
			myPiedra.style.display = "none";
			handsCont.style.justifyContent = "center";
			myTijera.classList.remove(".hand-view");
			myTijera.classList.add("selected");
			botGame(botChoice);
		}
	}

	for (const h of handsCont.children) {
		h.addEventListener("click", () => {
			const select = h.getAttribute("hand");
			clearInterval(countdown);
			if (select == "piedra") {
				state.setMove("piedra");
				setTimeout(() => {
					playGame("piedra");
				}, 1000);
			} else if (select == "papel") {
				state.setMove("papel");
				setTimeout(() => {
					playGame("papel");
				}, 1000);
			} else if (select == "tijera") {
				state.setMove("tijera");
				setTimeout(() => {
					playGame("tijera");
				}, 1000);
			}
		});
	}

	const currentState = state.getState().currentGame;
	const botCurrentGame = (currentState.botPlay = botChoice);

	setTimeout(() => {
		params.goTo("/result");
	}, 5000);
	div.appendChild(style);
	return div;
}
