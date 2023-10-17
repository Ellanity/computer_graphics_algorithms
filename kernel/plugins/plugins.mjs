import {drawCircle} from "./circle/circle.js";
import {drawLineDDA} from "./lineDDA/lineDDA.js";
import {drawLineBresenham} from "./lineBresenham/lineBresenham.js";
import {drawLineVu} from "./lineVu/lineVu.js";
import {drawEllipse} from "./ellipse/ellipse.js";
import {drawParabola} from "./parabola/parabola.js";
import {drawHyperbola} from "./hyperbola/hyperbola.js";
import {drawCurveHermit} from "./curveHermit/curveHermit.js";
import {drawCurveBezier} from "./curveBezier/curveBezier.js";
import {drawCurveBSpline} from "./curveBSpline/curveBSpline.js";

export let Plugins = [
    {
        "name": "lineDDA",
        "execute": drawLineDDA,
        "form": "lineDDA/lineDDA.html",
        "chapter": "Отрезки"
    },
    {
        "name": "lineBresenham",
        "execute": drawLineBresenham,
        "form": "lineBresenham/lineBresenham.html",
        "chapter": "Отрезки"
    },
    {
        "name": "lineVu",
        "execute": drawLineVu,
        "form": "lineVu/lineVu.html",
        "chapter": "Отрезки"
    },
    {
        "name": "circle",
        "execute": drawCircle,
        "form": "circle/circle.html",
        "chapter": "Линии второго порядка"
    },
    {
        "name": "ellipse",
        "execute": drawEllipse,
        "form": "ellipse/ellipse.html",
        "chapter": "Линии второго порядка"
    },
    {
        "name": "parabola",
        "execute": drawParabola,
        "form": "parabola/parabola.html",
        "chapter": "Линии второго порядка"
    },
    {
        "name": "hyperbola",
        "execute": drawHyperbola,
        "form": "hyperbola/hyperbola.html",
        "chapter": "Линии второго порядка"
    },
    {
        "name": "curveHermit",
        "execute": drawCurveHermit,
        "form": "curveHermit/curveHermit.html",
        "chapter": "Параметрические кривые"
    },
    {
        "name": "curveBezier",
        "execute": drawCurveBezier,
        "form": "curveBezier/curveBezier.html",
        "chapter": "Параметрические кривые"
    },
    {
        "name": "curveBSpline",
        "execute": drawCurveBSpline,
        "form": "curveBSpline/curveBSpline.html",
        "chapter": "Параметрические кривые"
    },
]