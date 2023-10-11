import { Plugins } from "./plugins/plugins.mjs";

class Canvas {
    constructor() {
        this.width = 51
        this.height = 51
        this.tableCreate(this.width, this.height);
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
        this.numSteps = 0;
        this.currentStep = 0;

        this.stepInfoLabel = document.getElementById("stepInfo");

        // plugins
        let linesChoices = document.getElementById('menu');
        let chaptersInMenu = new Set();
        Plugins.forEach((plugin) => {
            chaptersInMenu.add(plugin.chapter)
        })
        chaptersInMenu.forEach((chapter)=> {
            let chap = chapter.toString()
            linesChoices.innerHTML +=
            '<div class="header_choice" id="header_choice_' + chap + '">' +
                '<div style="margin-bottom: 14px;">' + chap+ '</div>' +
            '</div>'
        })

        Plugins.forEach((plugin) => {
            let chapter = document.getElementById(('header_choice_' + plugin.chapter.toString()));
            chapter.innerHTML +=  '<iframe src="plugins/' + plugin.form + '" name="app_frame" scrolling="false"></iframe>'
        });

        // event listener
        document.addEventListener("click", e => {

            switch (e.target.tagName) {
                case "TD":
                    // GETTING RADIO BUTTONS FROM FORMS
                    let checkBoxButtons = Array()
                    document.getElementsByName("app_frame").forEach((sub_doc) => {
                        checkBoxButtons = checkBoxButtons.concat(
                            Array.prototype.slice.call(
                                sub_doc.contentDocument.getElementsByClassName("choice")
                            )
                        )
                    })
                    let type = 0;
                    for (let x = 0; x < checkBoxButtons.length; x++) {
                        if (checkBoxButtons[x].checked) {
                            type = checkBoxButtons[x].value;
                        }
                    }

                    // WORK WITH POINTS
                    const coord_x = parseInt(e.target.getAttribute("coord_x"));
                    const coord_y = parseInt(e.target.getAttribute("coord_y"));
                    if (this.endPoint) {
                        this.startPoint = null;
                        this.endPoint = null;
                    }
                    if (!this.startPoint) {
                        this.startPoint = { x: coord_x, y: coord_y };
                        // this.drawPoint(x, y, 10)
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
                default:
                    break;
            }

            switch (e.target.id.toString()) {
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
                    this.currentStep = 0
                default:
                    break;
            }
        });
    }

    printInDebug(text, separator="\n") {
        this.stepInfoLabel.innerHTML += text + separator
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
        if (typeof (this.currentStep) !== "number" ||
            this.currentStep === this.numSteps - 1 ||
            this.stepInfo.length === 0)
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


// PLUGINS IFRAMES RESIZE ONLOAD
/*
function resizeIFrameToFitContent( iFrame ) {

    iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}

window.addEventListener('DOMContentLoaded', function(e) {
    // or, to resize all iframes:
    let iframes = document.querySelectorAll("iframe");
    for( let i = 0; i < iframes.length; i++) {
        resizeIFrameToFitContent( iframes[i] );
    }
} );*/
