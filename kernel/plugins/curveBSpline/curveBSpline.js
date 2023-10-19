export function drawCurveBSpline(editor, points) {
    let parsed_data = dataParserCurveBSpline()

    points = parsed_data[0]
    let pointResult = [];

    let n = points.length;

    let k = 0;
    let step = 0.01;

    let a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 0, 3, 0], [1, 4, 1, 0]]);

    let i = 1;
    while (i <= n-3) {
        let b = math.matrix([[points[i-1].x, points[i-1].y], [points[i].x, points[i].y],
            [points[i+1].x, points[i+1].y], [points[i+2].x, points[i+2].y]]);
        let c = math.multiply(a, b);
        let t = 0.0;
        while (t <= 1) {
            let tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
            let r = math.multiply(tMatrix, c);
            let x = math.subset(r, math.index(0, 0)) / 6;
            let y = math.subset(r, math.index(0, 1)) / 6;
            pointResult.push({ x: math.round(x), y: math.round(y) });
            t += step;
            k++;
        }
        i++;
    }

    editor.drawPoints(pointResult);
}

function dataParserCurveBSpline(editor) {

    let p1_x, p1_y, p2_x, p2_y, p3_x, p3_y, p4_x, p4_y, p5_x, p5_y, p6_x, p6_y;

    document.getElementsByName("app_frame").forEach((sub_doc) => {
        try { p1_x = parseInt(sub_doc.contentDocument.getElementById("bspline_1_x").value); } catch {}
        try { p1_y = parseInt(sub_doc.contentDocument.getElementById("bspline_1_y").value); } catch {}
        try { p2_x = parseInt(sub_doc.contentDocument.getElementById("bspline_2_x").value); } catch {}
        try { p2_y = parseInt(sub_doc.contentDocument.getElementById("bspline_2_y").value); } catch {}
        try { p3_x = parseInt(sub_doc.contentDocument.getElementById("bspline_3_x").value); } catch {}
        try { p3_y = parseInt(sub_doc.contentDocument.getElementById("bspline_3_y").value); } catch {}
        try { p4_x = parseInt(sub_doc.contentDocument.getElementById("bspline_4_x").value); } catch {}
        try { p4_y = parseInt(sub_doc.contentDocument.getElementById("bspline_4_y").value); } catch {}
        try { p5_x = parseInt(sub_doc.contentDocument.getElementById("bspline_5_x").value); } catch {}
        try { p5_y = parseInt(sub_doc.contentDocument.getElementById("bspline_5_y").value); } catch {}
        try { p6_x = parseInt(sub_doc.contentDocument.getElementById("bspline_6_x").value); } catch {}
        try { p6_y = parseInt(sub_doc.contentDocument.getElementById("bspline_6_y").value); } catch {}
    })

    let points = [
        { x: p1_x, y: p1_y },
        { x: p2_x, y: p2_y },
        { x: p3_x, y: p3_y },
        { x: p4_x, y: p4_y },
        { x: p5_x, y: p5_y },
        { x: p6_x, y: p6_y }
    ];

    points.forEach(elem => {
        let element = document.getElementsByClassName(elem.x + "_" + elem.y)[0];
        element.classList.add("end");
    });

    return [points]
}