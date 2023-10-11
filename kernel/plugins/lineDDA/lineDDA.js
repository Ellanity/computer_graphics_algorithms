export function drawLineDDA(editor, x1, y1, x2, y2) 
{
    let parsed_data = dataParserLineDDA(editor)
    x1 = parsed_data[0]
    y1 = parsed_data[1]
    x2 = parsed_data[2]
    y2 = parsed_data[3]

    let points = [];
    points.push({ x: x1, y: y1 });
    let length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    let dx = (x2 - x1) / length;
    let dy = (y2 - y1) / length;

    if (editor.debug) {
        editor.stepInfo.push("Start point: x=" + x1 + ", y=" + y1);
        let steps = [];
        steps.push({ x: parseInt(x1), y: parseInt(y1) });
        editor.stepPoints.push(steps);
    }

    let x = x1 + 0.5 * Math.sign(dx);
    let y = y1 + 0.5 * Math.sign(dy);

    points.push({ x: parseInt(x), y: parseInt(y) });

    if (editor.debug) {
        editor.stepInfo.push("Select start point " + "x=" + x1.toFixed(3) + ", y=" + y1.toFixed(3));
        let steps = [];

        if (x1 === x2) {
            steps.push({ x: parseInt(x), y: parseInt(y + Math.sign(dy)) });
        } else if (y1 === y2) {
            steps.push({ x: parseInt(x + Math.sign(dx)), y: parseInt(y) });
        } else {
            steps.push({ x: parseInt(x + Math.sign(dx)), y: parseInt(y) });
            steps.push({ x: parseInt(x), y: parseInt(y + Math.sign(dy)) });
            steps.push({ x: parseInt(x + Math.sign(dx)), y: parseInt(y + Math.sign(dy)) });
        }
        editor.stepPoints.push(steps);
    }

    let i = 1
    while (i <= length) {

        x += dx;
        y += dy;

        points.push({ x: parseInt(x), y: parseInt(y) });
        i++;

        if (editor.debug) {
            editor.stepInfo.push("Select current point, because x=" + x.toFixed(3) + ", y=" + y.toFixed(3));
            let steps = [];
            if (i <= length) {
                if (x1 === x2) {
                    steps.push({ x: parseInt(x), y: parseInt(y + Math.sign(dy)) });
                } else if (y1 === y2) {
                    steps.push({ x: parseInt(x + Math.sign(dx)), y: parseInt(y) });
                } else {
                    steps.push({ x: parseInt(x + Math.sign(dx)), y: parseInt(y) });
                    steps.push({ x: parseInt(x), y: parseInt(y + Math.sign(dy)) });
                    steps.push({ x: parseInt(x + Math.sign(dx)), y: parseInt(y + Math.sign(dy)) });
                }
                editor.stepPoints.push(steps);
            }
        }
    }

    if (!editor.debug) {
        editor.drawPoints(points);
    } else {
        editor.data = points;
        editor.numSteps = points.length;
        editor.curStep = 0;
        editor.drawStep(editor.stepPoints[editor.curStep]);
        editor.stepInfoLabel.innerHTML = editor.stepInfo[editor.curStep];
    }
}

function dataParserLineDDA(editor) {
    return [editor.startPoint.x, editor.startPoint.y, editor.endPoint.x, editor.endPoint.y]
}