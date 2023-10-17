import {math} from "../../math";

export function drawCurveBSpline(editor, points) {
    let parsed_data = dataParserCurveBSpline()

    let pointResult = [];

    let n = points.length;

    let k = 0;
    let step = 0.01;

    let a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 0, 3, 0], [1, 4, 1, 0]]);

    let i = 1;
    while (i <= n-3) {
        let b = math.matrix([[points[i-1].x, points[i-1].y], [points[i].x, points[i].y],
            [points[i+1].x, points[i+1].y], [points[i+2].x, points[i+2].y]]);
        let c = math.multiply(a, b);
        let t = 0.0;
        while (t <= 1) {
            let tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
            let r = math.multiply(tMatrix, c);
            let x = math.subset(r, math.index(0, 0)) / 6;
            let y = math.subset(r, math.index(0, 1)) / 6;
            pointResult.push({ x: Math.round(x), y: Math.round(y) });
            t += step;
            k++;
        }
        i++;
    }

    editor.drawPoints(pointResult);
}

function dataParserCurveBSpline(editor) {

}