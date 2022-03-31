import { state } from "./state";
import { initRouter } from "./router";
import "./components/button";
import "./components/text";
import "./components/hands";

(function main() {
	state.getStorage();
	const root = document.querySelector(".root");
	initRouter(root);
})();