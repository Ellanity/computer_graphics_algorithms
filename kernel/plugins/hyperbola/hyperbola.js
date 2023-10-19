export function drawHyperbola(editor, a, b) {
    let parsed_data = dataParserHyperbola()
    a = parsed_data[0]
    b = parsed_data[1]

    let x = 0;

    let y = b;
    let aPow2 = a*a;
    let bPow2 = b*b;

    let delta = aPow2 * (2 * b + 1) - bPow2;

    let info = "New hyperbola with " + "x = " + x.toString() + " y = " + y.toString() +
        "<hr/>" + "aPow2 = " + aPow2.toString() + " bPow2 = " + bPow2.toString() +
        "<hr/>" + "delta = " + delta.toString()
    editor.printInDebug(info)

    let points = [];
    points.push({ x: x, y: y, quadrants: [true, true, false, false] });

    while (y < editor.canvas.height - 1 && x < editor.canvas.width - 1) {
        let sigma = 2 * delta - aPow2 * (2 * y + 1);
        if (delta > 0 && sigma > 0) {
            x += 1;
            delta -= bPow2 * (2 * x + 1);
            points.push({ x: x, y: y, quadrants: [true, true, false, false] });
            continue;
        }
        let sigma_ = 2 * delta + bPow2 * (2 * x + 1);
        if (delta < 0 && sigma_ <= 0) {
            y += 1;
            delta += aPow2 * (2 * y + 1);
            points.push({ x: x, y: y, quadrants: [true, true, false, false] });
            continue;
        }
        x += 1;
        y += 1;
        delta += aPow2 * (2 * y + 1) - bPow2 * (2 * x + 1);
        points.push({ x: x, y: y, quadrants: [true, true, false, false] });
    }

    editor.drawPoints(points);
}

function dataParserHyperbola (editor) {
    let a = null;
    let b = null;
    document.getElementsByName("app_frame").forEach((sub_doc) => {
        let a_in_iframe = sub_doc.contentDocument.getElementById("hyperbola_a")
        if (a_in_iframe != null) {
            a = parseInt(a_in_iframe.value)
        }
        let b_in_iframe = sub_doc.contentDocument.getElementById("hyperbola_b")
        if (b_in_iframe != null) {
            b = parseInt(b_in_iframe.value)
        }
    })
    return [a, b]
}