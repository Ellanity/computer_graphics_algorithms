export function drawCurveBezier(editor, points) {
    let parsed_data = dataParserCurveBezier()

    let pointResult = [];

    let p1 = parsed_data[0][0];
    let p2 = parsed_data[0][1];
    let p3 = parsed_data[0][2];
    let p4 = parsed_data[0][3];

    let i = 0;
    let t = 0.0;
    let step = 0.005;

    let a = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 3, 0, 0], [1, 0, 0, 0]]);

    let b = math.matrix([[p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y], [p4.x, p4.y]]);

    let c = math.multiply(a, b);

    while (t <= 1) {
        let tMatrix = math.matrix([[t * t * t, t * t, t, 1]]);
        let r = math.multiply(tMatrix, c);
        let x = math.subset(r, math.index(0, 0));
        let y = math.subset(r, math.index(0, 1));
        pointResult.push({ x: math.round(x), y: math.round(y) });
        t += step;
        i++;
    }

    editor.drawPoints(pointResult);
}

function dataParserCurveBezier(editor){

    let p1_x, p1_y, p2_x, p2_y, p3_x, p3_y, p4_x, p4_y;

    document.getElementsByName("app_frame").forEach((sub_doc) => {
        try { p1_x = parseInt(sub_doc.contentDocument.getElementById("bezie_1_x").value); } catch {}
        try { p1_y = parseInt(sub_doc.contentDocument.getElementById("bezie_1_y").value); } catch {}
        try { p2_x = parseInt(sub_doc.contentDocument.getElementById("bezie_2_x").value); } catch {}
        try { p2_y = parseInt(sub_doc.contentDocument.getElementById("bezie_2_y").value); } catch {}
        try { p3_x = parseInt(sub_doc.contentDocument.getElementById("bezie_3_x").value); } catch {}
        try { p3_y = parseInt(sub_doc.contentDocument.getElementById("bezie_3_y").value); } catch {}
        try { p4_x = parseInt(sub_doc.contentDocument.getElementById("bezie_4_x").value); } catch {}
        try { p4_y = parseInt(sub_doc.contentDocument.getElementById("bezie_4_y").value); } catch {}
    })

    let points = [
        { x: p1_x, y: p1_y },
        { x: p2_x, y: p2_y },
        { x: p3_x, y: p3_y },
        { x: p4_x, y: p4_y }
    ];

    points.forEach(elem => {
        let element = document.getElementsByClassName(elem.x + "_" + elem.y)[0];
        element.classList.add("end");
    });

    return [points]
}