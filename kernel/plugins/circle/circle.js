export function drawCircle(editor, Ox=0, Oy=0, x1=10, y1=10)
{
    let parsed_data = dataParserCircle(editor)

    Ox = parsed_data[0]
    Oy = parsed_data[1]
    x1 = parsed_data[2]
    y1 = parsed_data[3]
    let radius = calcRadius(Ox, Oy, x1, y1);

    let info = "New circle with radius " + "r = " + radius.toString()
    editor.printInDebug(info)

    let x = 0;
    let y = radius;
    let limit = y - radius;
    let delta = 2 - 2 * radius;

    let points = [];
    points.push({ x: parseInt(x), y: parseInt(y), quadrants: [true, true, true, true]});

    while (y > limit) {
        let sigma = 2 * delta - 2 * x - 1;
        if (delta > 0 && sigma > 0) {
            y -= 1;
            delta += 1 - 2 * y;
            points.push({ x: parseInt(x), y: parseInt(y), quadrants: [true, true, true, true]});
            continue;
        }
        let sigma_ = 2 * delta + 2 * y - 1

        if (delta < 0 && sigma_ <= 0) {
            x += 1;
            delta += 1 + 2 * x;
            points.push({ x: parseInt(x), y: parseInt(y), quadrants: [true, true, true, true]});
            continue;
        }
        x += 1;
        y -= 1;
        delta += 2 * x - 2 * y + 2;
        points.push({ x: parseInt(x), y: parseInt(y), quadrants: [true, true, true, true]});
    }
    editor.drawPoints(points);
}

function calcRadius(Ox, Oy, x, y) {
    let max = Math.max(Math.abs(x - Ox), Math.abs(y - Oy));
    let min = Math.min(Math.abs(x - Ox), Math.abs(y - Oy));
    return Math.sqrt(Math.pow(max,2.0) + Math.pow(min,2.0)).toFixed(0);
}

function dataParserCircle(editor) {
    return [editor.startPoint.x, editor.startPoint.y, editor.endPoint.x, editor.endPoint.y]
}