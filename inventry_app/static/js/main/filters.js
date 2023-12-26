// const dateFilter = () => {
// 	var result = {}
// 	$.ajax({
// 		url: "shift_filter",
// 		async: false,
// 		success: function (res) {
// 			end_date = res['end_date']
// 			yesterday_yt =  moment(moment(end_date).subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"))

// 			start_date = res['date_filter']

// 			return $.each(start_date, (key, val) => {
// 				if(key == "Yesterday"){
// 					result[key] = [moment(val), yesterday_yt]
// 				} else{
// 					result[key] = [moment(val), moment(end_date)]
// 				}
// 			})
// 		}
// 	})
// 	return result
// }


function capitalize(str) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  
var datepicker = {};
// var date = dateFilter().Today
// var start = date[0];
// var end = date[1];
// var datepicker, options = '', options_1 = '';

var shift = '',area = '',cam = ''
// $(document).ready(function(){})
fetch('cusfilters')
	.then((res) => res.json())
	.then(
                (data) => {
                    out = `
                    <div class="d-flex align-items-end">


                        <select  class="initmultifilter form-control mt-2 w-auto select_option bg-white ml-0 mr-2 shift_filter" required >
                        ${
                            data['shift_list'].map((ele,inx)=>{
                                shift += ele[0] + ','
                                return `<option ${(inx==0)?'selected':' '} value="${ele[0]}" >${capitalize(ele[1])}</option>`
                            }).join(' ')
                            
                        }
                        ${
                            shift += `<option value="${shift}">All</option>`
                        }
                            </select>

                        <select class="initmultifilter form-control mt-2 w-auto select_option bg-white mx-2 cam_filter" required >
                        <option value="" disabled>Choose Camera</option>
                        ${  
                            data['cam_list'].map((ele,inx)=>{
                                cam += ele[0] + ','
                                return `<option ${(inx==0)?'selected':' '} value="${ele[0]}" >${capitalize(ele[1])}</option>`
                            }).join(' ')
                        }
                        ${
                            cam += `<option value="${cam}">All</option>`
                        }
                        </select>
                        
                        <select class="initmultifilter form-control mt-2 w-auto select_option bg-white mx-2 area_filter" required >
                        <option value="" disabled>Choose Area</option>
                        ${
                            data['area_list'].map((ele,inx)=>{
                                area += ele[0] + ','
                                return `<option ${(inx==0) ? 'selected':' '} value="${ele[0]}" >${capitalize(ele[0])}</option>`
                            }).join(' ')
                        }
                        ${
                            area += `<option value="${area}">All</option>`
                        }
                        </select>

                        <div id="date_range" class="date_range mt-2 bg-white mx-2 rounded" style="cursor: pointer; padding: 5px 10px; border: 1px solid #ced4da;width:none !important;">
                        <i class="mdi mdi-calendar"></i>&nbsp;
                        <span></span> 
                        <i class="mdi mdi-arrow-down-drop-circle"></i>
                        </div>

                        &nbsp;&nbsp;

                        <button type="submit" class="btn btn-primary mt-2 mx-2 filterbtn" id="filterbtn">Filter</button>

                        <div class="spinner-border text-center mx-3 text-primary mt-2" role="status" id="loading" style="display:none;">
                        <span class="sr-only">Loading...</span>
                        </div>

                    </div>`
            
                    $('.custom_filter').html(out)
                    // console.log(moment.now())
                // $('.initmultifilter').selectpicker();

                // function cb(start, end) {
                //     var start_date = start.format('DD/MM/YYYY')
                //     var end_date = end.format('DD/MM/YYYY')
                //     $(`.date_range span`).html(start_date + ' - ' + end_date);

                //     datepicker["start_time"] = start.format('YYYY-MM-DD')
                //     datepicker["end_time"] = end.format('YYYY-MM-DD')
                // }

                // setTimeout(() => {
                //     var start = moment();
                //     var end = start;
                //     $(`.date_range`).daterangepicker({
                //         timePicker: false,
                //         ranges: dateFilter()
                //     }, cb)
    
                //     cb(start, end);
    
                //     return datepicker
                // }, 500);

            }
        );


// $.get("cusfilters", function (data) {
//     // data['area_list'].map((ele,inx)=>{
//     //     console.log(inx,ele[0],"-----")
//     // })

    
//     out = `
//         <div class="d-flex align-items-end float-right">

//             <h6 class="mx-2"><i class="mdi mdi-filter"></i>Filters</h6>

//             <select  class="initmultifilter form-control mt-2 select_option bg-white mx-2 shift_filter" required>
//             ${
//                 data['shift_list'].map((ele,inx)=>{
//                     return `<option ${(inx==0)?'selected':' '} value="${ele[0]}" >${ele[1]}</option>`
//                 }).join(' a')
//             }</select>

//             <select class="initmultifilter form-control mt-2 select_option bg-white mx-2 area_filter" required>
//             ${
//                 data['area_list'].map((ele,inx)=>{
//                     return `<option ${(inx==0)?'selected':' '} value="${ele[0]}" >${ele[0]}</option>`
//                 }).join(' ')
//             }
//             </select>

//             <select class="initmultifilter form-control mt-2 select_option bg-white mx-2 cam_filter" required>
//             ${
//                 data['cam_list'].map((ele,inx)=>{
//                     return `<option ${(inx==0)?'selected':' '} value="${ele[0]}" >${ele[1]}</option>`
//                 }).join(' ')
//             }
//             </select>

//             <div id="date_range" class="date_range" class="mt-2 bg-white mx-2" style="cursor: pointer; padding: 5px 10px; border: 1px solid #ced4da;width:none !important;">
//             <i class="mdi mdi-calendar"></i>&nbsp;
//             <span></span> 
//             <i class="mdi mdi-arrow-down-drop-circle"></i>
//             </div>

//             &nbsp;&nbsp;

//             <button type="submit" class="btn btn-primary mt-2 mx-2 filterbtn" id="filterbtn">Filter</button>

//             <div class="spinner-border text-center mx-3 text-primary mt-2" role="status" id="loading" style="display:none;">
//             <span class="sr-only">Loading...</span>
//             </div>

//         </div>`
   
//         $('.custom_filter').html(out)
//         console.log(moment.now())
//     // $('.initmultifilter').selectpicker();

// function cb(start, end) {
//     var start_date = start.format('MMMM D, YYYY')
//     var end_date = end.format('MMMM D, YYYY')
//     $(`.date_range span`).html(start_date + ' - ' + end_date);

//     datepicker["start_time"] = start.format('YYYY-MM-DD')
//     datepicker["end_time"] = end.format('YYYY-MM-DD')


// }

// var start = moment();
// var end = start;
// $(`.date_range`).daterangepicker({
//     timePicker: false,
//     ranges: {
//         'Today': [moment(), moment()],
//         'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
//         'Last 7 Days': [moment().subtract(6, 'days'), moment()],
//         'Last 30 Days': [moment().subtract(29, 'days'), moment()],

//     }
// }, cb)

// cb(start, end);

// return datepicker
   
// })

const format_filter = () => {
var shifts = $('#shift_flt').val();
var cams = $('#cam_flt').val();

var shifts_name = ''
for (var i = 0; i < shifts.length; i++) {
    shifts_name += "'" + shifts[i] + "',"
}
var cam_names = ''
for (var i = 0; i < cams.length; i++) {
    cam_names += "'" + cams[i] + "',"
}

return [cam_names.slice(0, -1), shifts_name.slice(0, -1)]

}
