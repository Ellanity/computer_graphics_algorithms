import {math} from "../../math";

export function drawCurveHermit(editor, points) {
    let parsed_data = dataParserCurveHermit()

    let pointResult = [];

    let p1 = points[0];
    let p4 = points[1];
    let r1 = points[2];
    let r4 = points[3];

    let i = 0;
    let t = 0.0;
    let step = 0.01;

    let a = math.matrix([[2, -2, 1, 1], [-3, 3, -2, -1], [0, 0, 1, 0], [1, 0, 0, 0]]);

    let b = math.matrix([[p1.x, p1.y], [p4.x, p4.y], [r1.x, r1.y], [r4.x, r4.y]]);

    let c = math.multiply(a, b);

    while (t <= 1) {
        let tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
        let r = math.multiply(tMatrix, c);
        let x = math.subset(r, math.index(0, 0));
        let y = math.subset(r, math.index(0, 1));
        pointResult.push({ x: Math.round(x), y: Math.round(y) });
        t += step;
        i++;
    }

    editor.drawPoints(pointResult);
}

function dataParserCurveHermit(editor) {

}