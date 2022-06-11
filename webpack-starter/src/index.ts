import { generateJoke } from "./generateJoke"
import "./styles/main.scss"
const laughing = require("./assets/laughing.svg")

const laughImg = document.getElementById("laughImg") as HTMLImageElement
laughImg.src = laughing
generateJoke()
const jokeBtn = document.getElementById("jokeBtn") as HTMLButtonElement
jokeBtn.addEventListener("click", generateJoke)
