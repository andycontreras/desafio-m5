customElements.define(
	"custom-button",
	class initButton extends HTMLElement {
		shadow: ShadowRoot;
		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: "open" });
			this.render();
		}
		render() {
			const button = document.createElement("button");
			const style = document.createElement("style");
			button.className = "root";
			style.innerHTML = `
			.root{
				font: bold;
				border: solid 3px #000;
				border-radius: 9px;
				padding: 17px 13px;
				font-size: 35px;
				width:100%;
				font-family: "Ubuntu", sans-serif;
				background-color: #3D5696; 
				color:#f1f1f1;
			}`;

			button.textContent = this.textContent;
			this.shadow.appendChild(button);
			this.shadow.appendChild(style);
		}
	}
);
