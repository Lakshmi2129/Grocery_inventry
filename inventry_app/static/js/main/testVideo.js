const dollarLocal = document.querySelector.bind(document);
var vidLocal = document.getElementById("screenshotLocal");

let rectanglesLocal = [];
// DOM elements
const $screenshotLocal = dollarLocal("#screenshotLocal");
const $drawLocal = dollarLocal("#draw");
const marqueeLocal = dollarLocal("#marquee");
const $boxesLocal = dollarLocal("#boxes");

// Temp variables
let startXLocal = 0;
let startYLocal = 0;
const marqueeRectLocal = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

marqueeLocal.classList.add("hide");
$screenshotLocal.addEventListener("pointerdown", startDragLocal);

function startDragLocal(ev) {
  // middle button delete rect
  if (ev.button === 1) {
    const rect = hitTestLocal(ev.layerX, ev.layerY);
    if (rect) {
      rectanglesLocal.splice(rectanglesLocal.indexOf(rect), 1);
      redrawLocal();
    }
    return;
  }
  window.addEventListener("pointerup", stopDragLocal);
  $screenshotLocal.addEventListener("pointermove", moveDragLocal);
  marqueeLocal.classList.remove("hide");
  startXLocal = ev.layerX;
  startYLocal = ev.layerY;

  // drawRectLocal(marqueeLocal, startXLocal, startYLocal, 0, 0);
}

function stopDragLocal(ev) {
  $("#savebtn").show();
  marqueeLocal.classList.add("hide");
  window.removeEventListener("pointerup", stopDragLocal);
  $screenshotLocal.removeEventListener("pointermove", moveDragLocal);
  if (
    ev.target === $screenshotLocal &&
    marqueeRectLocal.width &&
    marqueeRectLocal.height
  ) {
    var tempCord = Object.assign({}, marqueeRectLocal);
    tempCord["canvasHeight"] = $screenshotLocal.offsetHeight;
    tempCord["canvaswidth"] = $screenshotLocal.offsetWidth;

    rectanglesLocal.push(tempCord);
    redrawLocal();
  }
}

function moveDragLocal(ev) {
  let x = ev.layerX;
  let y = ev.layerY;
  let width = startXLocal - x;
  let height = startYLocal - y;
  if (width < 0) {
    width *= -1;
    x -= width;
  }
  if (height < 0) {
    height *= -1;
    y -= height;
  }
  Object.assign(marqueeRectLocal, {
    x,
    y,
    width,
    height,
  });
  drawRectLocal(marqueeLocal, marqueeRectLocal);
}

function hitTestLocal(x, y) {
  return rectanglesLocal.find(
    (rect) =>
      x >= rect.x &&
      y >= rect.y &&
      x <= rect.x + rect.width &&
      y <= rect.y + rect.height
  );
}

function redrawLocal() {
  boxes.innerHTML = "";
  let row = "";
  rectanglesLocal.forEach((data, inx) => {
    // start
    if (inx == rectanglesLocal.length - 1) {
      let row = `<div class="form-group mt-2 row d-flex child">  <input name="sTime" type="number" class="form-range sTime" placeholder="Start Time" style="width:90px" value="${$(
        "#showduration"
      ).text()}" required/ hidden>
    <input name="x" type="number" class="form-range x" placeholder="Start Time" style="width:90px" value="${
      data["x"]
    }" required hidden />
    <input name="y" type="number" class="form-range y" placeholder="Start Time" style="width:90px" value="${
      data["y"]
    }" required hidden />
    <input name="height" type="number" class="form-range height" placeholder="Start Time" style="width:90px" value="${
      data["height"]
    }" required hidden />
    <input name="width" type="number" class="form-range width" placeholder="Start Time" style="width:90px" value="${
      data["width"]
    }" required  hidden />
    <input name="cam_name" type="text" class="form-range" placeholder="Start Time" style="width:90px" value="${
      data["cam_name"]
    }" required hidden />
    <input name="canvaHeight" type="text" class="form-range" placeholder="Start Time" style="width:90px" value="${
      data["canvasHeight"]
    }" required hidden />
    <input name="canvaWidth" type="text" class="form-range" placeholder="Start Time" style="width:90px" value="${
      data["canvaswidth"]
    }" required hidden />
    <div class="forms-group d-flex w-100">
        <input type="text"  name="boxes" type="text" class=" boxes" style="width:100% !important;height:2.4rem;padding:0.5rem" placeholder="Class Name" required="" autocomplete="off" 
        onkeyup = "if (event.keyCode == 13) {SearchAddress(option1.text)}
                else {showOptions(event)}" onfocus='showOptions(event)' submenu="collapsesub-input${inx}" required/>
                

        <span class="m-auto d-flex text-center">
        <div class="form-check mt-3" >
        <button class="btn p-0 border-rounded collapsed" type="button" data-toggle="collapse" data-target="#collapsesub-input${inx}" aria-expanded="false" aria-controls="collapseExample">
    <i class="mdi  mdi-plus-circle
 "></i></button>
       
        </div>
        <i class="mdi mdi-delete btn-lg btn gokulclass pb-0 mt-1" data-toggle="tooltip" data-placement="top" title="Delete"></i>
        </span>

    </div>
<div class="collapse w-100" id="collapsesub-input${inx}">
  <div class="cards card-body ">
  <div class="form-group">
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="Area" name="area_annotate" id="area_or_image" data-toggle="tooltip" data-placement="top" title="Add as Area">

    <label class="form-check-label" for="check1">Area</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value=""  name='caliberation'>
    <label class="form-check-label" for="check2">Calibration Frame</label>
  </div>
  <div class="form-check ">
    <input class="form-check-input relFrame" type="checkbox" value="" name="relativeFrame">
    <label class="form-check-label" for="check3">Relative Frame</label>
    <div class="forms-group d-flex w-100">
    <input  type="text" name="parent_id" class="parent" style="width:100% !important;height:2.4rem;padding:0.5rem; display:none"
            placeholder="Parent Name" required="" autocomplete="off" onkeyup="if (event.keyCode == 13) {SearchAddress(option1.text)}
            else {showOptions(event)}" onfocus="showOptions(event)" submenu="collapsesub-input0" >
</div>
  </div>
 
  
</div>
   
  </div>
</div>
    </div>`;

      $("#updateRow").prepend(row);
      bindRelativeFrameEvent()    
    }
    // end

    // <button class="btn btn-danger btn-rounded gokulclass" style="height:35px;width:35px !important;margin-top:0.5rem"><i class="fa-solid fa-xmark"></i></button>

    boxes.appendChild(
      drawRectLocal(
        document.createElementNS("http://www.w3.org/2000/svg", "rect"),
        data
      )
    );
  });
  vidLocal.pause();
}

function drawRectLocal(rect, data) {
  const { x, y, width, height } = data;

  id = Math.floor(Math.random() * 50) + 1;

  rect.setAttributeNS(null, "ids", "rt" + id.toString());

  rect.setAttributeNS(null, "width", width);
  rect.setAttributeNS(null, "height", height);
  rect.setAttributeNS(null, "x", x);
  rect.setAttributeNS(null, "y", y);

  return rect;
}

var video = document.getElementById("screenshotLocal");

function toggleControls() {
  if (video.hasAttribute("controls")) {
    // $('#draw').attr('width', vidLocal.videoWidth).attr('height', vidLocal.videoHeight);
    $("#draw-control").html('<i class="mdi mdi-play"></i>');
    vidLocal.pause();
    video.removeAttribute("controls");
  } else {
    $("#draw-control").html('<i class="mdi mdi-vector-square"></i>');
    vidLocal.play();

    video.setAttribute("controls", "controls");
  }
}
