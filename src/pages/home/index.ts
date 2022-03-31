export function initHome(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");

	style.innerHTML = `
  .home-container{
    display:flex;
    flex-direction: column;
    padding: 25px 15px 0;
    overflow-y: hidden;
  }
  @media(min-width: 679px){
    .home-container{
      padding: 25px 45px 0;
    }
  }

  .start-button{
    margin: 50px 0;
  }
  @media(min-width: 679px){
    .start-button{
      align-self: center;
      width: 560px;
      margin: 40px 0;
    }
  }
  .hands-content{
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 30px;  
  }`;

	div.innerHTML = `
  <div class="home-container">
      <custom-text variant="titulo">Piedra, Papel o Tijera</custom-text>
      <custom-button class="start-button">Empezar</custom-button>
    <div class="hands-content">
      <hands-comp hand="piedra"></hands-comp>
      <hands-comp hand="papel"></hands-comp>
      <hands-comp hand="tijera"></hands-comp>
    </div>
  </div>`;
	const startButtonEl = div.querySelector(".start-button");
	startButtonEl.addEventListener("click", () => {
		params.goTo("/instructions");
	});
	div.appendChild(style);
	return div;
}