export function drawParabola(editor, a) {

    let parsed_data = dataParserParabola()
    a = parsed_data[0]

    let x = 0;
    let y = editor.canvas.height - 1;

    let delta = 1 - 2 * a;

    let info = "New parabola with " + "x = " + x.toString() + " y = " + y.toString() +
        "<hr/>delta = " + delta.toString()
    editor.printInDebug(info)

    let points = [];
    points.push({ x: x, y: y});

    while (y > 0) {
        let sigma = 2 * delta - 2 * x - 1;
        if (delta > 0 && sigma > 0) {
            y -= 1;
            delta -= 2 * a;
            points.push({ x: x, y: y});
            continue;
        }
        let sigma_ = 2 * delta + 2 * a
        if (delta < 0 && sigma_ <= 0) {
            x += 1;
            delta += 2 * x + 1;
            points.push({ x: x, y: y});
            continue;
        }
        x += 1;
        y -= 1;
        delta += 2 * x + 1 - 2 * a;
        points.push({ x: x, y: y});
    }

    editor.drawPoints(points);
}

function dataParserParabola(editor) {
    let a = null;
    document.getElementsByName("app_frame").forEach((sub_doc) => {
        let a_in_iframe = sub_doc.contentDocument.getElementById("parabola_a")
        if (a_in_iframe != null) {
            a = parseInt(a_in_iframe.value)
        }
    })
    return [a]
}
