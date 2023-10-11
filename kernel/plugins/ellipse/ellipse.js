export function drawEllipse(editor, x1, y1, x2, y2) {
    let parsed_data = dataParserEllipse(editor)
    x1 = parsed_data[0]
    y1 = parsed_data[1]
    x2 = parsed_data[2]
    y2 = parsed_data[3]

    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);

    let aPow2 = Math.pow(a, 2.0);
    let bPow2 = Math.pow(b, 2.0);
    let x = 0;
    let y = b;


    let delta = aPow2 + bPow2 - 2 * aPow2 * b;

    let info = "New ellipse with " + "a = " + a.toString() + " b = " + b.toString() +
        "<hr/>" + "x = " + x.toString() +" y = " + y.toString() + " delta = " + delta.toString()
    editor.printInDebug(info)

    let points = [];
    points.push({ x: x, y: y});

    while (y > 0) {
        let sigma = 2 * delta - 2 * x * bPow2 - 1;
        if (delta > 0 && sigma > 0) {
            y -= 1;
            delta += aPow2 - 2 * y * aPow2;
            points.push({ x: x, y: y});
            continue;
        }
        let sigma_ = 2 * delta + 2 * y * aPow2 - 1
        if (delta < 0 && sigma_ <= 0) {
            x += 1;
            delta += bPow2 + 2 * x * bPow2;
            points.push({ x: x, y: y});
            continue;
        }
        x += 1;
        y -= 1;
        delta += bPow2 * (2 * x + 1) + aPow2 * (1 - 2 * y);
        points.push({ x: x, y: y});
    }

    editor.drawPoints(points);
}

function dataParserEllipse(editor) {
    return [editor.startPoint.x, editor.startPoint.y, editor.endPoint.x, editor.endPoint.y]
}
