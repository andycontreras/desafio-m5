customElements.define(
	"custom-text",
	class textElement extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		render() {
			const variant = this.getAttribute("variant");
			const div = document.createElement("div");
			const style = document.createElement("style");
			const shadow = this.attachShadow({ mode: "open" });

			style.innerHTML = `
      .titulo{
        font-size: 65px;
        font-weight: bold;
        color: #4C9D0D;
        text-shadow: #000 2px 2px 4px;
				margin: 20px;
				text-align: center;
      }
      .body{
        font-size: 40px;
        color: #4C9D0D;
        text-shadow: #000 2px 1px;
      }`;
			div.className = variant;
			div.textContent = this.textContent;
			shadow.appendChild(div);
			shadow.appendChild(style);
		}
	}
);