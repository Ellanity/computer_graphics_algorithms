import {drawLineBresenham} from "../lineBresenham/lineBresenham.js";

export function drawLineVu(editor, x1, y1, x2, y2) {

    let parsed_data = dataParserLineVu(editor)
    x1 = parsed_data[0]
    y1 = parsed_data[1]
    x2 = parsed_data[2]
    y2 = parsed_data[3]

    let _x1 = x1, _y1 = y1, _x2 = x2, _y2 = y2;
    let points = [];

    points.push({ x: _x1, y: _y1, br: 1 });
    points.push({ x: _x1, y: _y1, br: 1 });

    if (editor.debug) {
        editor.stepInfo.push("Start point: x=" + x1.toFixed(3) + ", y=" + y1.toFixed(3));
        let steps = [];
        steps.push({ x: parseInt(x1), y: parseInt(y1) });
        editor.stepPoints.push(steps);

        editor.stepInfo.push("Select start point " + "x=" + x1.toFixed(3) + ", y=" + y1.toFixed(3));
        //let steps = [];
        steps.push({ x: parseInt(x1), y: parseInt(y1) });
        editor.stepPoints.push(steps);
    }

    let dx = x2 - x1;
    let dy = y2 - y1;
    let swapAxes = Math.abs(dx) < Math.abs(dy);

    if ((Math.abs(dx) === Math.abs(dy)) || (_x1 === _x2 || _y1 === _y2)) {
        drawLineBresenham(editor, _x1, _y1, _x2, _y2)
        // editor.drawLineBraz(_x1, _y1, _x2, _y2);
        return;
    }

    if (swapAxes) {
        let t = x1;
        x1 = y1;
        y1 = t;
        t = x2;
        x2 = y2;
        y2 = t;
        t = dx;
        dx = dy;
        dy = t;
    }
    if (x2 < x1) {
        let t = x1;
        x1 = x2;
        x2 = t;
        t = y1;
        y1 = y2;
        y2 = t;
    }

    let de = dy / dx;
    let ystart = y1 + de * (Math.round(x1) - x1);
    let e = ystart + de;
    for (let x = Math.round(x1) + 1; x <= Math.round(x2) - 1; x++) {
        let ipa = Math.trunc(e);

        if (!swapAxes) {
            points.push({ x: x, y: ipa, br: 1 - getDecimal(e) });
            points.push({ x: x, y: ipa + 1, br: getDecimal(e) });

            if (editor.debug) {
                editor.stepInfo.push("Select current point x=" + x.toFixed(3) +
                    ", y=" + ipa.toFixed(3) + "<hr/>with brigtness " + (1 - getDecimal(e)).toFixed(3));
                let steps = [];
                steps.push({ x: x, y: ipa + 1});
                editor.stepPoints.push(steps);
                editor.stepInfo.push("Select current point x=" + x.toFixed(3) +
                    ", y=" + (ipa + 1).toFixed(3) + "<hr/>with brigtness " + (getDecimal(e)).toFixed(3));
                //let steps = [];
                steps.push({ x: x + 1, y: Math.trunc(e + de)});
                editor.stepPoints.push(steps);
            }


        } else {
            points.push({ x: ipa, y: x, br: 1 - getDecimal(e) });
            points.push({ x: ipa + 1, y: x, br: getDecimal(e) });
        }

        e = e + de;
    }

    points.push({ x: _x2, y: _y2, br: 1 });

    if (editor.debug) {
        editor.stepInfo.push("End point: x=" + _x2.toFixed(3) + ", y=" + _y2.toFixed(3));
        let steps = [];
        steps.push({ x: parseInt(x1), y: parseInt(y1) });
        editor.stepPoints.push(steps);
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

function getDecimal(num) {
    let str = "" + num;
    let zeroPos = str.indexOf(".");
    if (zeroPos == -1) return 0;
    str = str.slice(zeroPos);
    return +str;
}


function dataParserLineVu(editor) {
    return [editor.startPoint.x, editor.startPoint.y, editor.endPoint.x, editor.endPoint.y]
}