import { initHome } from "./pages/home";
import { initInstructions } from "./pages/instructions";
import { initGame } from "./pages/game";
import { initResult } from "./pages/results";

const BASE_PATH = "/desafio-m5";

const routes = [
	{
		path: /\/home/,
		component: initHome,
	},
	{
		path: /\/instructions/,
		component: initInstructions,
	},
	{
		path: /\/game/,
		component: initGame,
	},
	{
		path: /\/result/,
		component: initResult,
	},
];

function isGitHubPages() {
	return location.host.includes("github.io");
}

export function initRouter(container: Element) {
	function goTo(path) {
		const completePath = isGitHubPages() ? BASE_PATH + path : path;
		history.pushState({}, "", completePath);
		handleRoute(path);
	}

	function handleRoute(route) {
		const newRoute = isGitHubPages() ? route.replace(BASE_PATH, "") : route;

		for (const r of routes) {
			if (r.path.test(newRoute)) {
				const el: any = r.component({ goTo: goTo });
				if (container.firstChild) {
					container.firstChild.remove();
				}
				container.appendChild(el);
			}
		}
	}

	if (location.pathname == "/") {
		goTo("/home");
	} else {
		handleRoute(location.pathname);
	}

	window.onpopstate = function () {
		handleRoute(location.pathname);
	};
}
