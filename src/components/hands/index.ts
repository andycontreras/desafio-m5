const hands = {
	piedra: require("url:../../img/piedra.png"),
	papel: require("url:../../img/papel.png"),
	tijera: require("url:../../img/tijera.png"),
};
customElements.define(
	"hands-comp",
	class initHands extends HTMLElement {
		shadow: ShadowRoot;
		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: "open" });
			this.render();
		}
		render() {
			const div = document.createElement("div");
			const style = document.createElement("style");
			const hand = this.getAttribute("hand");
			style.innerHTML = `
      .hand{
        width: 90px;
        height: 200px;
      }`;
			div.innerHTML = `
      <img class="hand" src=${hands[hand]}></img>`;

			this.shadow.appendChild(style);
			this.shadow.appendChild(div);
		}
	}
);