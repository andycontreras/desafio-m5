type Played = "piedra" | "papel" | "tijera";

const state = {
	data: {
		currentGame: {
			myPlay: "",
			botPlay: "",
		},
		history: {
			myScore: 0,
			botScore: 0,
		},
	},

	listeners: [],

	getStorage() {
		const localData = JSON.parse(localStorage.getItem("data"));
		if (localStorage.getItem("data")) {
			return (this.data.history = localData);
		}
		console.log(localData);
	},

	// se optiene el estado de la web
	getState() {
		return this.data;
	},

	setState(newState) {
		this.data = newState;
		for (const cb of this.listeners) {
			cb();
		}
		this.savedData();
	},

	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},

	setMove(move: Played) {
		const currentState = this.getState();
		currentState.currentGame.myPlay = move;
		this.setScore();
	},

	setScore() {
		const currentState = this.getState();

		//Datos de jugadas
		const myPlay = currentState.currentGame.myPlay;
		const botPlay = currentState.currentGame.botPlay;
		const currentWhoWins = this.whoWhins(myPlay, botPlay);
		//Datos de puntajes
		const myScore = currentState.history.myScore;
		const botScore = currentState.history.botScore;

		if (currentWhoWins == "win") {
			return this.setState({
				...currentState,
				history: {
					myScore: myScore + 1,
					botScore: botScore,
				},
			});
		} else if (currentWhoWins == "lose") {
			return this.setState({
				...currentState,
				history: {
					myScore: myScore,
					botScore: botScore + 1,
				},
			});
		}
	},
	whoWhins(myPlay: Played, botPlay: Played) {
		//Datos de ganadas
		const winPiedra: boolean = myPlay == "piedra" && botPlay == "tijera";
		const winPapel: boolean = myPlay == "papel" && botPlay == "piedra";
		const winTijera: boolean = myPlay == "tijera" && botPlay == "papel";
		const win = [winPiedra, winPapel, winTijera].includes(true);
		//Datos de perdidas
		const losePiedra: boolean = myPlay == "piedra" && botPlay == "papel";
		const losePapel: boolean = myPlay == "papel" && botPlay == "tijera";
		const loseTijera: boolean = myPlay == "tijera" && botPlay == "piedra";
		const lose = [losePiedra, losePapel, loseTijera].includes(true);

		if (win == true) {
			return "win";
		} else if (lose == true) {
			return "lose";
		} else {
			return "tie";
		}
	},

	savedData() {
		const currentHistory = this.getState().history;
		localStorage.setItem("data", JSON.stringify(currentHistory));
	},
};

export { state };