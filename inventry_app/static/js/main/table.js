let companyLogo;
let seewiseLogo;
// console.log(top_heading)

var boolean, lists;
fetch('dashboard/ml_models/json/operations_params.json')
	.then((response) => response.json())
	.then((json) => {
		boolean = json.UI_design.live_page.boolean
		lists = json.UI_design.live_page.lists
	});

$.ajax({
  type: "GET",
  url: "./static/js/main/logo-company.txt",
  datatype: "json",
  async: true,
  success: (data) => {
    companyLogo = data;
  },
});
$.ajax({
  type: "GET",
  url: "./static/js/main/seewise-logo.txt",
  datatype: "json",
  async: true,
  success: (data) => {
    seewiseLogo = data;
  },
});

function toggleDis (id,tabId){

	if($(`#${id}-text`).is(':visible') != false || $(`.${id}-text`).is(':visible') != false){

		// $(`#${tabId}`).append(	`<a class="dropdown-item" href="javascript:void(0)" id="${id}-id" textQ= '${id}'>${id}</a>`)
		$(`#${id}-id`).show()
		$(`.${id}-id`).show()

	}
	$(`#${id}-input`).val('')
	$(`#${id}-input`).keyup()
  placeHolder = id.split('-')
	$(`#${id}-input`).attr("placeholder", `${placeHolder[placeHolder.length-1]}`);
  $(`#${id}-text`).hide()
	$(`.${id}-text`).hide()
}

var myGlyph = new Image();
myGlyph.crossOrigin = "anonymous";
myGlyph.src = '../static/images/base/success.png';

var failed = new Image();
failed.crossOrigin = "anonymous";
failed.src = '../static/images/base/failed.png';

var none = new Image();
none.crossOrigin = "anonymous";
none.src = '../static/images/base/none.png';

var NA = new Image();
NA.crossOrigin = "anonymous";
NA.src = '../static/images/base/NA.png';

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = 60;
    canvas.height = 35;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 5, 0, 40, 40);
    return canvas.toDataURL("image/png");
}


function Data_Table_Custome(
  tabId,
  main_url,
  param,
  options,
  pdfSize = "LEGAL",
  hide_filter=[],
  imageClass = "hes-div",
  HidecolList = [],
  excelExportCol = "",
  excelPdfCol = "",
  imageDictKey = false,
  top_heading = "",
  infoJSON = {},
  icon = "",
) {

  var a = $("#" + tabId)
    .DataTable()
    .destroy();

  $("#" + tabId + " thead tr")
    .clone(true)
    .addClass(`filters ${tabId}-filters d-none`)
    .appendTo("#" + tabId + " thead");

  // $(`#${tabId} thead tr.filters th`).each(function () {
  //   var title = $(`#${tabId} thead th`).eq($(this).index()).text();
  //   $(this).html('<input type="text" placeholder="Search ' + title + '" />');
  // });
  var val;

  var testTable = $("#" + tabId).DataTable({
    dom: '<"toolbar">lfrtip',
    lengthMenu: [
      [5, 10, 25, 50, -1],
      ["5", "10", "25", "50", "All"],
    ],
    processing: true,
    serverSide: true,
    aaSorting: [],
    ajax: {
      type: "POST",
      url: main_url,
      data: param,
    },
    destroy: true,
    deferRender: true,
    searching: true,
    ordering: true,
    columnDefs: HidecolList.map((colId) => {
      return {
        targets: [colId],
        visible: false,
        searchable: true,
      };
    }),
    orderCellsTop: true,
    fixedHeader: true,
    // drawCallback : function(response) {
    //   if(!response.json.data.length){
    //     val = false;
    //   }
    //   else{
    //     val = true;
    //   }
    // },
    // "ordering": val,
    initComplete: function () {
    //   $(`#${tabId}_filter`).html(`<div class="mt-4">
	// 		<button class="btn btn-sm btn-primary dropdown-toggle" type="button"  data-toggle="dropdown">
	// 		 Filter <i class="mdi  mdi-filter icon-sm"></i>
	// 		</button>
	// 		<div class="dropdown-menu" id="${tabId}-li">
	// 		</div>
	// 	  </div>`);

    $(`#${tabId}`).before(`
		  <button class="btn btn-sm btn-primary dropdown-toggle d-none" type="button"  data-toggle="dropdown" style="position:absolute;left:0;top: 4.2rem">
		   Filter <i class="mdi  mdi-filter icon-sm"></i>
		  </button>
		  <div class="dropdown-menu" id="${tabId}-li" style="max-height:12rem;overflow-y:scroll;"></div>
		`);

    $(`.sample`).remove()

		  $(`#${tabId}`).before(`<tr class="filters sample row " style="width:100%;"> </tr>`);
      $(`.sample`).html(' ')
      var api = this.api();
      // For each column
      api
        .columns()
        .eq(0)
        .each(function (colIdx) {
          // Set the header cell to contain the input element
          var cell = $(`.${tabId}-filters th`).eq(
            $(api.column(colIdx).header()).index()
          );

          var title = $(cell).text();
          // arr.includes(title) != true ? arr.push(title) :void 0;


      // if(title != "S No" || title != "S.no" || title != "s no" || title != "s.no"){
        $(`.sample`).append(`<div id="${tabId+'-'+title.split(" ").join("")}-text" style="display: none;" class="row ${tabId+'-'+title.split(" ").join("")}-text py-2 pl-0 pr-2"><div class='d-flex'><input type="text" class="form-control" id="${tabId+'-'+title.split(" ").join("")}-input" placeholder="${title}" />&nbsp;&nbsp;<button class="btn btn-outline-primary btn-sm" onclick="toggleDis('${tabId+'-'+title.split(" ").join("")}','${tabId}-li')" style=" border-radius: 45%;"><i class="mdi mdi-minus icons-lg"></i></button></div>
        </div>`);
      // }
		  
          // $(cell).html('<input type="text" placeholder="' + title + '" />');
          
          // On every keypress in this input
          // $('input', $('.filters th').eq($(api.column(colIdx).header()).index())).off('keyup change').on('keyup change', function (e) {
          // 	console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLL111111111111")
          // 	e.stopPropagation();
          // 	// Get the search value
          // 	$(this).attr('title', $(this).val());
          // 	var regexr = '({search})'; //$(this).parents('th').find('select').val();

          // 	var cursorPosition = this.selectionStart;
          // 	// Search the column for that value
          // 	api
          // 		.column(colIdx)
          // 		.search(
          // 			this.value != '' ?
          // 			regexr.replace('{search}', '(((' + this.value + ')))') :
          // 			'',
          // 			this.value != '',
          // 			this.value == ''
          // 		)
          // 		.draw();

          // 	$(this)
          // 		.focus()[0]
          // 		.setSelectionRange(cursorPosition, cursorPosition);
          // });
          // On every keypress in this input
          $(".sample input").eq($(api.column(colIdx).header()).index()).off("keyup change") .on("keyup change", function (e) {
              e.stopPropagation();
              // Get the search value
              $(this).attr("title", $(this).val());
              var regexr = "({search})"; //$(this).parents('th').find('select').val();

              var cursorPosition = this.selectionStart;
              // Search the column for that value
              api
                .column(colIdx)
                .search(
                  this.value != ""
                    ? regexr.replace("{search}", "(((" + this.value + ")))")
                    : "",
                  this.value != "",
                  this.value == ""
                )
                .draw();

              $(this)
                .focus()[0]
                .setSelectionRange(cursorPosition, cursorPosition);
            });

          var temp = "";
            // var arr = [];
            count=0

         

          $(".sample input").map((inx, ele) => {
            
            var condition = ele.placeholder.replace(/[^A-Z0-9]/ig, "").toLowerCase()
            // Filter value Hide
            var hideFilter =   hide_filter.find(element => element == inx);

            if(inx <= ($(`#${tabId} thead tr th`).length)/2 - 1 && condition != 'sno' && !hideFilter){
                temp += `<a class="dropdown-item ${tabId+'-'+ele.placeholder.split(" ").join("")}-id" href="javascript:void(0)" id="${tabId+'-'+ele.placeholder.split(" ").join("")}-id" textQ= '${ele.placeholder}'>${ele.placeholder}</a>`;
            }
          });

          // if($(`#${tabId}-li`).html() == ''){
            $(`#${tabId}-li`).html(temp);
          // }

			$(`#${tabId}-li a`).click(function(e){
				//Show 
				var id =e.target.id 
				id = id.split('-id')[0]
				if($(`#${id}-text`).is(':visible')==false){
					$(`#${e.target.id}`).hide()
          // console.log(`#${id }-text`)
					$(`#${id}-text`).show()
					$(`.${id}-text`).show()
					
			
				}

			});
        });
    },
    dom: "lBfrtip",
    fnInitComplete: function (oSettings, json) {
      $("#" + tabId).on("click", `.${imageClass}`, function (e) {
        $("#hg-subtext").css("display", "none");
        $("#zoom-out").attr("src", $(event.target).attr("src"));
        $("#hg-pic").attr("src", $(event.target).attr("src"));

        $("#zoom-out").trigger("click");
      });
    },
    buttons: {
      dom: {
        button: {
          tag: "button",
          className: "",
        },
      },
      buttons: [
        {
          
          messageTop: top_heading,
          className: "buttons-excel buttons-html5 btn badge-blue border btn-sm  btn-icon-text my-3 mx-2",
          text: '<i class="mdi mdi-refresh" style="font-size:24px;"></i> Refresh',
          action: function ( e, dt, node, config ) {
              dt.ajax.reload(null, false);
            }
        },
        {
          extend: "excelHtml5",
          messageTop: top_heading,
          className: "btn badge-green border btn-sm  btn-icon-text my-3 mx-2",
          text: '<i class="mdi mdi-file-excel" style="font-size:24px;"></i> Download as Excel',
          filename: options.title + `-${moment().format('hh-mm-ss D MMM, YYYY')} - ${$('#user_name_display').text()}`,
          title: options.title + `-${moment().format('hh-mm-ss D MMM, YYYY')} - ${$('#user_name_display').text()}`,
          scrollable: false,
          exportOptions: {
            columns: excelExportCol,
          },
          customize: function (xlsx) {
            if (top_heading != "") {

              var ocellXfs = $("cellXfs", xlsx.xl["styles.xml"]);
              ocellXfs.append(
                '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">' +
                  '<alignment vertical="top" wrapText="1" />' +
                  "</xf>"
              );
              ocellXfs.attr("count", ocellXfs.attr("count") + 1);
              var oxf = $("xf", xlsx.xl["styles.xml"]);
              var styleIndex = oxf.length;
              var sheet = xlsx.xl.worksheets["sheet1.xml"];

              var row = 0;


              // wrap legend text
              $("row:nth-child(2) c", sheet).eq(0).attr("s", "12");

              // top vertical alignment
              $("row:nth-child(2) c", sheet)
                .eq(0)
                .attr("s", styleIndex - 2);

              // set height
              $("row:nth-child(2)", sheet).attr("ht", "45");
              $("row:nth-child(2)", sheet).attr("customHeight", 1);
            }
          },
          customizeData: function (dataForExport) {
            // dataForExport.header.push("Header line 1");
            // dataForExport.header.push("Header line 2");
            // dataForExport.header.push("Header line 3");
            console.log(dataForExport.content)
          },
        },
        {
          extend: "pdfHtml5",
          messageTop: top_heading,
          className: "btn badge-red btn-sm border  btn-icon-text my-3 mx-2",
          orientation: "landscape",
          text: '<i class="mdi mdi-file-pdf" style="font-size:24px;"></i> Download as PDF ',
          pageSize: pdfSize,
          title: options.title + `-${moment().format('hh-mm-ss D MMM, YYYY')} - ${$('#user_name_display').text()}`,
          filename: options.title + `-${moment().format('hh-mm-ss D MMM, YYYY')} - ${$('#user_name_display').text()}`,
          scrollable: false,
          exportOptions: {
            columns: excelPdfCol,
          },

          customize: function (doc) {
            doc.images = doc.images || {};

            //build dictionary
            doc.images['myGlyph'] = getBase64Image(myGlyph);
            doc.images['failed'] = getBase64Image(failed);
            doc.images['none'] = getBase64Image(none);
            doc.images['NA'] = getBase64Image(NA);

            doc.content.splice(0, 1);
            try {
              var roNo = doc.content[1].table.body;
            } catch (e) {
              roNo = doc.content[0].table.body;
            }
            
            
            if (doc && imageDictKey) {
              var c = 0;
              var arr2 = roNo.map((elem, val) => {
                $(".pdf-btn").html(
                  '<span><i class="mdi mdi-file-pdf" style="font-size:24px;"></i>Processing... </span>'
                  );
                  imageDictKey.map(img_index=>{

                    if (elem[img_index].style != "tableHeader") {
                      doc.content[0].table.body[val][img_index] = {
                        image: elem[img_index].text,
                        width: 50,
                      };

                    }
                  }) 
                  // console.log(elem,"+_+_+_+_+_+")
                if (val === roNo.length - 1) {
                  // console.log("satesfied", val);
                }
              });
            }
           
            //delete doc.content[0]
            var now = new Date();
            doc.pageMargins = [20, 10, 20, 30];
            // Set the font size fot the entire document
            doc.defaultStyle.fontSize = 15;
            // Set the fontsize for the table header
            doc.styles.tableHeader.fontSize = 18;
            doc.defaultStyle.alignment = "center";
            doc.content.unshift(
              {
                columns: [{
                  alignment:"right",
                  image: seewiseLogo,
                  width: 250,
                  height: 50,
                  margin: (pdfSize == 'A2' ? [-80, 0, -650, -130] : [-80,0,-1000,-130]),
                }],
                margin: [20, 20, 20, 30],
              }, 
              {
                columns: [
                  {
                    alignment: "left",
                    image: companyLogo,
                    width: 250,
                    height: 60,
                    margin: [10, -20, 0, 0],
                  },
                ],
                
              },
              {
                columns: [
                  {
                    alignment: "center",
                    fontSize: 23,
                    text: options.title + `\n ${moment().format('hh:mm:ss DD/ MMM/ YYYY')} - ${$('#user_name_display').text()}`,
                    bold: true,
                    margin: [0, 0, 0, 10],
                  },
                ],
                
              },
              
              {
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2: 965,
                    y2: 0,
                  },
                ],
                margin: [0, 20, 0, 20],
              }
            );
            var objLayout = {};
            objLayout["hLineWidth"] = function (i) {
              return 1;
            };
            objLayout["vLineWidth"] = function (i) {
              return 1;
            };
            objLayout["hLineColor"] = function (i) {
              return "#aaa";
            };
            objLayout["vLineColor"] = function (i) {
              return "#aaa";
            };
            objLayout["paddingLeft"] = function (i) {
              return 14;
            };
            objLayout["paddingRight"] = function (i) {
              return 14;
            };
            objLayout["paddingTop"] = function (i) {
              return 10;
            };
            objLayout["paddingBottom"] = function (i) {
              return 10;
            };
            
            table = doc.content.length;
            for(i = 0; i < doc.content[table - 1].table.body[0].length; i++){
              doc.content[table - 1].table.body[0][i]['fillColor'] = "#343C76"
            }
            
            doc.content[table - 1].layout = objLayout;

            doc.content[table - 1].table.widths = Array(
              doc.content[table - 1].table.body[0].length + 1
            )
              .join("*")
              .split("");

              if(icon == ""){
                for (var i = 1; i < doc.content[4].table.body.length; i++) {
                  for (var j = 0; j < doc.content[4].table.body[i].length; j++) {
                      if (doc.content[4].table.body[i][j].text == "True") {
                          delete doc.content[4].table.body[i][j].text;
                          doc.content[4].table.body[i][j].image = 'myGlyph';
                      } else if (doc.content[4].table.body[i][j].text == "False") {
                          delete doc.content[4].table.body[i][j].text;
                          doc.content[4].table.body[i][j].image = 'failed';
                      } else if (doc.content[4].table.body[i][j].text == "None") {
                        delete doc.content[4].table.body[i][j].text;
                        doc.content[4].table.body[i][j].image = 'none';
                      } else if (doc.content[4].table.body[i][j].text == "NA") {
                          delete doc.content[4].table.body[i][j].text;
                          doc.content[4].table.body[i][j].image = 'NA';
                      }
  
                  }
                }
              }
          },
        },
      ],
    },
  });
  

  $(`.dt-buttons`).css("float", "right");
  $(
    `.cr_table_dt_buttons .buttons-excel buttons-html5 btn badge-green border btn-sm btn-icon-text my-3 mx-2`
  ).css("position", "fixed");
  $(`.dt-buttons buttons`).css("position", "fixed");
  $(`.dt-buttons`).css("float", "right");
  $(`#oee_table_length`).css("position", "static");
  $(`#oee_table_filter`).css("padding", "1px");
  $(`#oee_table_filter label`).css("position", "static");
  $(`#cr_table_filter label`).css("position", "static");
  $(`#power_alert_table_filter label`).css("position", "static");
  $(`#power_alert_table_filter label`).css("position", "static");
  $(`#cr_table_filter`).css("padding", "1px");
  $(`#power_alert_table_filter`).css("padding", "1px");
  $(`#temp_alert_table_filter`).css("padding", "1px");
  $(`.dataTables_info`).css("position", "static");
  $(`.dataTables_paginate a`).css("position", "static");
  $(`#cr_table_length`).css("position", "static");
  $(`#power_alert_table_length`).css("position", "static");
  $(`#temp_alert_table_length`).css("position", "static");
  $(`.dt-buttons`).addClass(tabId + "_dt_buttons");
  $("#" + tabId + "_length").addClass("my-4 col-4 px-0");
  

  $(document).ajaxComplete(function () {
    if($(`#${tabId}_paginate span`).find('a').length != 0){
      $('.dropdown-toggle').removeClass('d-none')
      $(`#${tabId} thead`).attr('style','pointer-events: auto;')
    } else{
      $('.dropdown-toggle').addClass('d-none')
      $(`#${tabId} thead`).attr('style','pointer-events: none;')
    }
  });
  $(".wrapper").hide();
}