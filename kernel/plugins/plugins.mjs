import {drawCircle} from "./circle/circle.js";
import {drawLineDDA} from "./lineDDA/lineDDA.js";

export let Plugins = [
    {
        "name": "lineDDA",
        "execute": drawLineDDA,
        "form": "lineDDA/lineDDA.html",
        "chapter": "Линии первого порядка"
    },
    {
        "name": "circle",
        "execute": drawCircle,
        "form": "circle/circle.html",
        "chapter": "Линии второго порядка"
    },
]