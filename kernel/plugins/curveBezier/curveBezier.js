import {math} from "../../math";

export function drawCurveBezier(editor, points) {
    let parsed_data = dataParserCurveBezier()


    let pointResult = [];

    let p1 = points[0];
    let p2 = points[1];
    let p3 = points[2];
    let p4 = points[3];

    let i = 0;
    let t = 0.0;
    let step = 0.005;

    let a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 3, 0, 0], [1, 0, 0, 0]]);

    let b = math.matrix([[p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y], [p4.x, p4.y]]);

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

function dataParserCurveBezier(editor){

}