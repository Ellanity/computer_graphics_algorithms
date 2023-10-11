export function drawCircle(editor, Ox=0, Oy=0, x1=10, y1=10)
{
    let parsed_data = dataParserCircle(editor)
    console.log(parsed_data)
    console.log(calcRadius(parsed_data[0],parsed_data[1],parsed_data[2],parsed_data[3]))

    /*Ox = parsed_data[0]
    Oy = parsed_data[2]
    x1 = parsed_data[3]
    y1 = parsed_data[4]
    let radius = calcRadius(Ox, Oy, x1, y1);*/
    let radius = calcRadius(parsed_data[0],parsed_data[1],parsed_data[2],parsed_data[3])

    let x = 0;
    let y = radius;
    let limit = y - radius;
    let delta = 2 - 2 * radius;

    let points = [];
    points.push({ x: x, y: y});

    while (y > limit) {
        let sigma = 2 * delta - 2 * x - 1;
        if (delta > 0 && sigma > 0) {
            y -= 1;
            delta += 1 - 2 * y;
            points.push({ x: x, y: y});
            continue;
        }
        let sigma_ = 2 * delta + 2 * y - 1

        if (delta < 0 && sigma_ <= 0) {
            x += 1;
            delta += 1 + 2 * x;
            points.push({ x: x, y: y});
            continue;
        }
        x += 1;
        y -= 1;
        delta += 2 * x - 2 * y + 2;
        points.push({ x: x, y: y});
    }
    editor.drawPoints(points);
}

function calcRadius(Ox, Oy, x, y) {
    var max = Math.max(Math.abs(x - Ox), Math.abs(y - Oy));
    var min = Math.min(Math.abs(x - Ox), Math.abs(y - Oy));
    return Math.sqrt(Math.pow(max,2.0) + Math.pow(min,2.0)).toFixed(0);
}

function dataParserCircle(editor) {
    return [editor.startPoint.x, editor.startPoint.y, editor.endPoint.x, editor.endPoint.y]
}