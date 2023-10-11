export function drawLineBresenham(editor, x1, y1, x2, y2) {

    let parsed_data = dataParserLineBresenham(editor)
    x1 = parsed_data[0]
    y1 = parsed_data[1]
    x2 = parsed_data[2]
    y2 = parsed_data[3]

    let points = [];

    let x = x1;
    let y = y1;
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let signX = Math.sign(x2 - x1);
    let signY = Math.sign(y2 - y1);

    let reverse = dy > dx;
    if (reverse) {
        let temp = dx;
        dx = dy;
        dy = temp;
    }

    let e = 2 * dy - dx;

    points.push({ x: x, y: y });
    points.push({ x: x, y: y });

    if (editor.debug) {
        editor.stepInfo.push("Start point: x=" + x.toFixed(3) + ", y=" + y.toFixed(3));
        let steps = [];
        steps.push({ x: x, y: y });
        editor.stepPoints.push(steps);

        editor.stepInfo.push("Select start point " + "x=" + x.toFixed(3) + ", y=" + y.toFixed(3));

        // let steps = [];
        if (x1 === x2) {
            steps.push({ x: parseInt(x), y: parseInt(y + signY) });
        } else if (y1 === y2) {
            steps.push({ x: parseInt(x + signX), y: parseInt(y) });
        } else {
            steps.push({ x: parseInt(x + signX), y: parseInt(y) });
            steps.push({ x: parseInt(x), y: parseInt(y + signY) });
            steps.push({ x: parseInt(x + signX), y: parseInt(y + signY) });
        }
        editor.stepPoints.push(steps);
    }

    for (let i = 1; i <= dx; i++) {

        if (e >= 0) {
            if (reverse) x += signX;
            else y += signY;
            e -= 2 * dx;
        }
        if (reverse) y += signY;
        else x += signX;

        e += 2 * dy;

        points.push({ x: x, y: y });

        if (editor.debug) {
            editor.stepInfo.push("Select current point, because e < 0, when x=" + x.toFixed(3) + ", y=" + y.toFixed(3));
            let steps = [];
            if (i < dx) {
                if (x1 === x2) {
                    steps.push({ x: parseInt(x), y: parseInt(y + signY) });
                } else if (y1 === y2) {
                    steps.push({ x: parseInt(x + signX), y: parseInt(y) });
                } else {
                    steps.push({ x: parseInt(x + signX), y: parseInt(y) });
                    steps.push({ x: parseInt(x), y: parseInt(y + signY) });
                    steps.push({ x: parseInt(x + signX), y: parseInt(y + signY) });
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

function dataParserLineBresenham(editor) {
    return [editor.startPoint.x, editor.startPoint.y, editor.endPoint.x, editor.endPoint.y]
}