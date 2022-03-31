import { state } from "../../state";
const results = {
	win: require("url:../../img/win.png"),
	lose: require("url:../../img/lose.png"),
	tie: require("url:../../img/tie.png"),
};

export function initResult(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");

	var myScore = state.getState().history.myScore;
	var botScore = state.getState().history.botScore;

	style.innerHTML = `
  .result-container{
    display:flex;
    flex-direction: column;
    padding: 15px 25px;
    align-items: center;
  }
  .win-sticker, .lose-sticker, .tie-sticker{
    width: 250px;
    height: 250px;
  }
  // .lose-b{
  //   display: none;
  //   background-color: #7e0b0b75;
  // }
  // .win-b{
  //   display: none;
  //   background-color: #4b9d0d75;
  // }
  // .tie-b{
  //   display: none;
  //   background-color: #3d569662;
  // }

  .win{
    display: none;
    padding: 20px;
  }
  .lose{
    display: none;
    padding: 20px;
  }
  .tie{
    display: none;
    padding: 20px;
  }

  .score{
    border: solid 6px;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px 70px;
    background-color: #fff
  }

  .points{
    font-size: 45px;
    padding: 0 15px 15px;
  }
  .text{
    padding: 0 25px;
    font-size: 25px;
  }

  .buttons{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  `;
	div.innerHTML = `
  <div class="result-container">
    <div class="win">
      <img class="win-sticker" src=${results.win}></img>
    </div>
    <div class="lose">
      <img class="lose-sticker" src=${results.lose}></img>
    </div>
    <div class="tie">
      <img class="tie-sticker" src=${results.tie}></img>
    </div>
    <div class="score">
      <h1 class="points">Puntajes</h1>
      <h3 class="text">Tú: ${myScore} pts.</h3>
      <h3 class="text">Bot: ${botScore} pts.</h3>
    </div>
    <div class="buttons">
      <custom-button class="back">Volver a jugar</custom-button>
      <custom-button class="inicio">Volver al inicio</custom-button>
    </div>
  </div>
  `;
	const currentGame = state.getState().currentGame;
	const myPlay = currentGame.myPlay;
	const botPlay = currentGame.botPlay;
	const whoWins = state.whoWhins(myPlay, botPlay);
	const win: any = div.querySelector(".win");
	const lose: any = div.querySelector(".lose");
	const tie: any = div.querySelector(".tie");

	if (whoWins == "win") {
		win.style.display = "inherit";
	} else if (whoWins == "lose") {
		lose.style.display = "inherit";
	} else if (whoWins == "tie") {
		tie.style.display = "inherit";
	}

	const back = div.querySelector(".back");
	const inicio = div.querySelector(".inicio");
	back.addEventListener("click", () => {
		params.goTo("/game");
	});
	inicio.addEventListener("click", () => {
		params.goTo("/home");
	});
	div.appendChild(style);
	return div;
}