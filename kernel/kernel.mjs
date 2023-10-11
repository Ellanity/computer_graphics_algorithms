import { Plugins } from "./plugins/plugins.mjs";

class Canvas {
    constructor() {
        this.tableCreate(51, 51);
    }

    tableCreate(n, m) {
        let body = document.getElementById('canvas');
        let tbl = document.createElement('table');

        tbl.setAttribute('border', '1');
        let tbody = document.createElement('tbody');

        for (let i = 0; i < n; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < m; j++) {
                let td = document.createElement('td');
                let y = n - i - 1;
                let x = j;
                td.setAttribute('coord_x', x);
                td.setAttribute('coord_y', y);
                td.className = x + "_" + y;
                td.title = "x=" + x + ", " + "y=" + y;
                td.appendChild(document.createTextNode('\u0020'))
                tr.appendChild(td)
            }
            tbody.appendChild(tr);
        }

        tbl.appendChild(tbody);
        body.appendChild(tbl)
    }
}

class Editor {
    constructor() {
        // canvas
        this.canvas = new Canvas();

        // debug
        this.debug = false;

        // work with points data
        this.data = [];
        this.stepInfo = [];
        this.stepPoints = [];
        this.startPoint = null;
        this.endPoint = null;
        this.numSteps;
        this.currentStep;

        this.stepInfoLabel = document.getElementById("stepInfo");

        // plugins
        let linesChoices = document.getElementById('menu');
        Plugins.forEach((plugin) => {
                linesChoices.innerHTML +=  '<iframe src="plugins/' + plugin.form + '" name="app_frame" scrolling="false"></iframe>'
            }
        );

        // event listener
        document.addEventListener("click", e => {

            switch (e.target.tagName) {
                case "TD":
                    // GETTING RADIO BUTTONS FROM FORMS
                    let radioButtons = Array()
                    document.getElementsByName("app_frame").forEach((sub_doc) => {
                        radioButtons = radioButtons.concat(
                            Array.prototype.slice.call(
                                sub_doc.contentDocument.getElementsByClassName("choice")
                            )
                        )
                    })
                    let type = 0;
                    for (let x = 0; x < radioButtons.length; x++) {
                        if (radioButtons[x].checked) {
                            type = radioButtons[x].value;
                        }
                    }
                    const coord_x = parseInt(e.target.getAttribute("coord_x"));
                    const coord_y = parseInt(e.target.getAttribute("coord_y"));
                    if (this.endPoint) {
                        this.startPoint = null;
                        this.endPoint = null;
                    }
                    if (!this.startPoint) {
                        this.startPoint = { x: coord_x, y: coord_y };
                        return;
                    } else {
                        this.endPoint = { x: coord_x, y: coord_y };
                        if (this.debug) {
                            this.clearData();
                            this.clearStep();
                            this.clearEnd();
                            let element = document.getElementsByClassName(coord_x + "_" + coord_y)[0];
                            element.classList.add("end");
                        }
                    }
                    if (this.startPoint.x === this.endPoint.x && this.startPoint.y === this.endPoint.y) {
                        return;
                    }
                    // ADDING PLUGINS
                    Plugins.forEach((plugin) => {
                        if (plugin.name.toString() === type.toString()) {
                            plugin.execute(this)
                        }
                    });
                    /*
                    switch (type) {
                        case "CDA":
                            this.drawLineDDA(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                            break;
                        case "Brezenchema":
                            this.drawLineBraz(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                            break;
                        case "Vu":
                            this.drawLineVu(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                            break;
                        case "Circle":
                            this.drawCircle(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                            break;
                        case "Ellipse":
                            this.drawEllipse(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                            break;
                        case "Hyperbola":
                            let a = parseInt(document.getElementById("giperbola_A").value);
                            let b = parseInt(document.getElementById("giperbola_B").value);
                            this.drawHyperbola(a, b);
                            break;
                        case "Parabola":
                            let a = parseInt(document.getElementById("parabola_A").value);
                            this.drawParabola(a);
                            break;
                        case "CurveErmit":
                            let p1_x = parseInt(document.getElementById("ermit_1_x").value);
                            let p1_y = parseInt(document.getElementById("ermit_1_y").value);
                            let p4_x = parseInt(document.getElementById("ermit_2_x").value);
                            let p4_y = parseInt(document.getElementById("ermit_2_y").value);
                            let r1_x = parseInt(document.getElementById("ermit_3_x").value);
                            let r1_y = parseInt(document.getElementById("ermit_3_y").value);
                            let r4_x = parseInt(document.getElementById("ermit_4_x").value);
                            let r4_y = parseInt(document.getElementById("ermit_4_y").value);
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
                            this.drawCurveErmit(points);
                            break;
                        case "CurveBezie":
                            let p1_x = parseInt(document.getElementById("bezie_1_x").value);
                            let p1_y = parseInt(document.getElementById("bezie_1_y").value);
                            let p2_x = parseInt(document.getElementById("bezie_2_x").value);
                            let p2_y = parseInt(document.getElementById("bezie_2_y").value);
                            let p3_x = parseInt(document.getElementById("bezie_3_x").value);
                            let p3_y = parseInt(document.getElementById("bezie_3_y").value);
                            let p4_x = parseInt(document.getElementById("bezie_4_x").value);
                            let p4_y = parseInt(document.getElementById("bezie_4_y").value);
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
                            this.drawCurveBezie(points);
                            break;
                        case "B_spline":
                            let p1_x = parseInt(document.getElementById("bspline_1_x").value);
                            let p1_y = parseInt(document.getElementById("bspline_1_y").value);
                            let p2_x = parseInt(document.getElementById("bspline_2_x").value);
                            let p2_y = parseInt(document.getElementById("bspline_2_y").value);
                            let p3_x = parseInt(document.getElementById("bspline_3_x").value);
                            let p3_y = parseInt(document.getElementById("bspline_3_y").value);
                            let p4_x = parseInt(document.getElementById("bspline_4_x").value);
                            let p4_y = parseInt(document.getElementById("bspline_4_y").value);
                            let p5_x = parseInt(document.getElementById("bspline_5_x").value);
                            let p5_y = parseInt(document.getElementById("bspline_5_y").value);
                            let p6_x = parseInt(document.getElementById("bspline_6_x").value);
                            let p6_y = parseInt(document.getElementById("bspline_6_y").value);
                            let points = [
                                { x: p1_x, y: p1_y },
                                { x: p2_x, y: p2_y },
                                { x: p3_x, y: p3_y },
                                { x: p4_x, y: p4_y },
                                { x: p5_x, y: p5_y },
                                { x: p6_x, y: p6_y }
                            ];
                            console.log(points);
                            points.forEach(elem => {
                                let element = document.getElementsByClassName(elem.x + "_" + elem.y)[0];
                                element.classList.add("end");
                            });
                            this.drawCurveBSpline(points);
                            break;
                        default:
                            alert("Error" + type);
                            break;
                    }

                    break;*/
                default:
                    break;
            }


            switch (e.target.id) {
                case "clearPoints":
                    this.clearColored();
                    break;
                case "debugTrigger":
                    this.turnDebug(e.target.checked);
                    break;
                case "prevPoint":
                    this.prevPoint();
                    break;
                case "nextPoint":
                    this.nextPoint();
                    break;
                case "finishDebug":
                    this.clearStep();
                    this.stepInfoLabel.innerHTML = '';
                    this.currentStep = this.numSteps - 1;
                    this.drawPoints(this.data);
                default:
                    break;
            }
        });
    }

    turnDebug(value) {
        this.debug = value;
        document.getElementById("prevPoint").disabled = !value;
        document.getElementById("nextPoint").disabled = !value;
        document.getElementById("finishDebug").disabled = !value;
        this.stepInfoLabel.hidden = !value;
        this.clearData();
    }

    prevPoint() {
        if (typeof (this.currentStep) !== "number" || this.currentStep === 0)
            return;

        this.clearStep();

        this.clearPoint(this.data[this.currentStep].x, this.data[this.currentStep].y);
        this.currentStep--;

        if (this.stepInfo[this.currentStep]) {
            this.drawStep(this.stepPoints[this.currentStep]);
            this.stepInfoLabel.innerHTML = this.stepInfo[this.currentStep];
        }
    }

    nextPoint() {
        this.clearStep();
        if (typeof (this.currentStep) !== "number" || this.currentStep === this.numSteps - 1)
            return;

        this.currentStep++;
        this.drawPoint(this.data[this.currentStep].x, this.data[this.currentStep].y, this.data[this.currentStep].br || null);


        if (this.stepInfo[this.currentStep]) {
            this.drawStep(this.stepPoints[this.currentStep]);
            this.stepInfoLabel.innerHTML = this.stepInfo[this.currentStep];
        }
    }

    drawStep(points) {
        if (!points) return;
        this.stepInfoLabel.value = "";
        points.forEach(point => {
            let element = document.getElementsByClassName(point.x + "_" + point.y)[0];
            if (!element) return;
            element.classList.add("step");
        });
    }

    drawPoints(points) {
        if (!points || !(points.length > 0)) return;
        if (points[0].br) {
            points.forEach(point => {
                this.drawPoint(point.x, point.y, point.br);
            });
        } else {
            points.forEach(point => {
                this.drawPoint(point.x, point.y);
            });
        }
    }

    drawPoint(x, y, br) {
        if (br) {
            let element = document.getElementsByClassName(x + "_" + y)[0];
            if (!element) return;
            element.style.backgroundColor = "hsla(0, 0%, 0%, " + br.toFixed(2) + ")";
        } else {
            let element = document.getElementsByClassName(x + "_" + y)[0];
            if (!element) return;

            element.classList.add("colored");
        }
    }

    clearPoint(x, y) {
        let element = document.getElementsByClassName(x + "_" + y)[0];
        element.classList.remove("colored");
        element.style.backgroundColor = '';
    }

    clearStep() {
        let points = document.getElementsByTagName('td');

        Array.prototype.forEach.call(points, point => {
            point.classList.remove("step");
        });
    }

    clearEnd() {
        let points = document.getElementsByTagName('td');

        Array.prototype.forEach.call(points, point => {
            point.classList.remove("end");
        });
    }

    clearColored() {
        let points = document.getElementsByTagName('td');

        Array.prototype.forEach.call(points, point => {
            point.classList.remove("colored");
            point.classList.remove("end");
            point.classList.remove("step");
            point.style.backgroundColor = '';
        });
        this.clearData();
    }

    clearData() {
        this.data = [];
        this.stepInfo = [];
        this.stepPoints = [];
        this.stepInfoLabel.innerHTML = '';
    }
}

window.onload = () => {
    const editor = new Editor();
};
