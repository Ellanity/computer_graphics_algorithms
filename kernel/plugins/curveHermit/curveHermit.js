export function drawCurveHermit(editor, points) {

    let parsed_data = dataParserCurveHermit()

    let pointResult = [];

    let p1 = parsed_data[0][0];
    let p4 = parsed_data[0][1];
    let r1 = parsed_data[0][2];
    let r4 = parsed_data[0][3];

    let i = 0;
    let t = 0.0;
    let step = 0.01;

    let a = math.matrix([[2, -2, 1, 1], [-3, 3, -2, -1], [0, 0, 1, 0], [1, 0, 0, 0]]);

    let b = math.matrix([[p1.x, p1.y], [p4.x, p4.y], [r1.x, r1.y], [r4.x, r4.y]]);

    let c = math.multiply(a, b);

    while (t <= 1) {
        let tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
        let r = math.multiply(tMatrix, c);
        let x = math.subset(r, math.index(0, 0));
        let y = math.subset(r, math.index(0, 1));
        pointResult.push({ x: math.round(x), y: math.round(y), br: 1});
        t += step;
        i++;
    }

    editor.drawPoints(pointResult);
}

function dataParserCurveHermit(editor) {

    let p1_x, p1_y, p4_x, p4_y, r1_x, r1_y, r4_x, r4_y;

    document.getElementsByName("app_frame").forEach((sub_doc) => {
        try { p1_x = parseInt(sub_doc.contentDocument.getElementById("hermit_1_x").value); } catch {}
        try { p1_y = parseInt(sub_doc.contentDocument.getElementById("hermit_1_y").value); } catch {}
        try { p4_x = parseInt(sub_doc.contentDocument.getElementById("hermit_2_x").value); } catch {}
        try { p4_y = parseInt(sub_doc.contentDocument.getElementById("hermit_2_y").value); } catch {}
        try { r1_x = parseInt(sub_doc.contentDocument.getElementById("hermit_3_x").value); } catch {}
        try { r1_y = parseInt(sub_doc.contentDocument.getElementById("hermit_3_y").value); } catch {}
        try { r4_x = parseInt(sub_doc.contentDocument.getElementById("hermit_4_x").value); } catch {}
        try { r4_y = parseInt(sub_doc.contentDocument.getElementById("hermit_4_y").value); } catch {}
    })

    let points = [
        { x: p1_x, y: p1_y },
        { x: p4_x, y: p4_y },
        { x: r1_x, y: r1_y },
        { x: r4_x, y: r4_y }
    ];

    points.forEach(elem => {
        let element = document.getElementsByClassName(elem.x + "_" + elem.y)[0];
        element.classList.add("end");
    });

    return [points]
}