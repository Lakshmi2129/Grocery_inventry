//Multi Line Chart
function multi_line_chart(chart_id, chartData, height) {
	// Data Type
	// series: [
	// 	{
	// 	  name: "High - 2013",
	// 	  data: [28, 29, 33, 36, 32, 32, 33]
	// 	},
	// 	{
	// 	  name: "Low - 2013",
	// 	  data: [12, 11, 14, 18, 17, 13, 13]
	// 	}
	//   ],
	// console.log(chartData['data'])

	chart_no_data(chartData,chart_id);


	// if (chartData.data.length >= 1) {
		var options = {
			chart: {
				type: "line",
				width: "100%",
				height: height,
				background: bg_color,
				redrawOnParentResize: false,
				zoom: {
					enabled: true,
				},
				toolbar: {
					show: true,
					tools: {
						reset: '<i class="mdi mdi-restart"></i>'
					}
				},
				dropShadow: {
					enabled: true,
				},
			},
			dataLabels: {
				enabled: true,
			},
			stroke: {
				width: 4
			},
			fill: {
				type: 'solid',
				opacity: 0.6
			},
			series: chartData['series'],
			theme: {
				mode: theme_mode,
			},
			yaxis: {
				title: {
					text: chartData['y_title'],
				},
			},
			tooltip: {
				y: {
					formatter: function (value) {
						return `${value}`;
					},
				},
			},
			xaxis: {
				labels: {
					rotate: -10
				},
				categories: chartData['x_axis'],
				tickPlacement: 'on',
				title: {
					text: chartData['x_title'],
				},
				hideOverlappingLabels: true,

			},
		};
		$(`#${chart_id}`).html("");
		var chart = new ApexCharts(document.querySelector(`#${chart_id}`), options);
		chart.render();
	// } else {
	// 	$(`#${chart_id}`).html('<div class="row align-items-center mb-3" style="min-height:30vh;"><div class="col-12 text-center"><h5> No Data Available </h5></div></div>')
	// }

	$(`#${chart_id}_loader`).empty();
}

// Gauge Chart
function gauge_chart(chart_id, data) {
	let element = document.querySelector(`#${chart_id}`);
	let options = {
		hasNeedle: true,
		needleColor: "black",
		needleStartValue: 0,
		arcColors: ["rgb(255,84,84)", "rgb(239,214,19)", "rgb(61,204,91)"],
		arcLabels: [40, 70],
		arcDelimiters: [40, 70],
		rangeLabel: ["0", "100"],
	};

	$(`#${chart_id}`).html("");
	GaugeChart.gaugeChart(element, 450, options).updateNeedle(data);
	$(`#${chart_id}_loader`).empty();
	if (theme_mode == "dark") {
		$('text').attr('fill', '#fff')
	}
}

//Bar Chart
function bar_chart(chart_id, chartData) {
	// Data Type
	// series: [{
	// 	data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
	//   }],

	// if (chartData.data.length >= 1) {

	chart_no_data(chartData,chart_id);

		var options = {
			series: [{
				name: chartData['y_title'],
				data: chartData['data']
			}],
			chart: {
				type: 'bar',
				height: 280,
				background: bg_color,
				redrawOnParentResize: false,
			},
			toolbar: {
				show: true,
			},
			// annotations: {
			//   yaxis: [{
			//     y:500,
			//     borderColor: '#f80000',
			//       label: {
			//         show: true,
			//         text: 'Support',
			//         style: {
			//           color: "#fff",
			//           background: '#00E396'
			//         }
			//       }
			//   }]
			// },
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '25%',
				},
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent']
			},
			xaxis: {
				categories: chartData['x_axis'],
				title: {
					text: chartData['x_title'],
				},
				tickPlacement:'on'
			},
			yaxis: {
				title: {
					text: chartData['y_title']
				}
			},
			theme: {
				mode: theme_mode,
			},
			fill: {
				opacity: 1
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return `${val}`
					}
				}
			}
		};
		$(`#${chart_id}`).html("");
		var chart = new ApexCharts(document.querySelector(`#${chart_id}`), options);
		chart.render();
	// } else {
	// 	$(`#${chart_id}`).html('<div class="row align-items-center mb-3" style="min-height:30vh;"><div class="col-12 text-center"><h5> No Data Available </h5></div></div>')
	// }
	$(`#${chart_id}_loader`).empty();
}

//Multiple Bar Chart
function multi_bar_chart(chart_id, chartData) {
	// Data Type
	// var chartData =	[{
	// 		name:'val1',
	// 		data: [44, 55, 41, 64, 22, 43, 21]
	// 	  }, {
	// 		name:'val2',
	// 		data: [53, 32, 33, 52, 13, 44, 32]
	// 	  }]	
	//   }],
	// 	  }],	

	chart_no_data(chartData,chart_id);

	var options = {
		series: chartData['series'],
		chart: {
			type: 'bar',
			height: 280,
			redrawOnParentResize: false,
			// zoom: {
			// 	enabled: true,
			// },
			
			// background: bg_color,
		},
		
		toolbar: {
			show: true,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '25%',
			},
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent']
		},
		xaxis: {
			categories: chartData['x_axis'],
			title: {
				text: chartData['x_title'],
			},
			tickPlacement:'on'
		},
		yaxis: {
			title: {
				text: chartData['y_title'],
			}
		},
		theme: {
			mode: theme_mode,
		},
		fill: {
			opacity: 1
		},
		tooltip: {
			y: {
				formatter: function (val) {

					return `${val} `
				}
			}
		}
	};
	$(`#${chart_id}`).html("");
	var chart = new ApexCharts(document.querySelector(`#${chart_id}`), options);
	chart.render();
	$(`#${chart_id}_loader`).empty();
}

//Donut Chart
function donut_chart(chart_id, chartData) {

	// const isAllZero = chartData.value.every(item => item === 0);
	chart_no_data(chartData,chart_id)
	// if (isAllZero == false) {
		var options = {
			series: chartData["data"], //[44, 55],
			// series: chartData["value"], //[44, 55],
			labels: chartData["label"], //['Critical', 'Moderate'],
			chart: {
				type: 'donut',
				height: 300,
				redrawOnParentResize: false,
				zoom: {
					enabled: false,
				},
				toolbar: {
					show: false,
				}
			},
			fill: {
				colors: ['#006811', '#d20000']
			},
			legend: {
				position: 'right',
			},
			tooltip: {
				enabled: true,
				fillSeriesColor: true,
			},
			theme: {
				mode: theme_mode,
			},
			colors: ['#006811', '#d20000'],
			responsive: [{
				breakpoint: 480,
				options: {
					chart: {
						width: 300,
					},
					legend: {
						position: 'bottom',
					},
				}
			}]
		};

		$(`#${chart_id}`).html(" ");
		var chart = new ApexCharts(document.querySelector(`#${chart_id}`), options);
		chart.render();
	// } else {
	// 	$(`#${chart_id}`).html('<div class="row align-items-center mb-3" style="min-height:30vh;"><div class="col-12 text-center"><h5> No Data Available </h5></div></div>')
	// }
	$(`#${chart_id}_loader`).empty();
}


//Pie Chart
function pie_chart(chart_id, chartData) {
	chart_no_data(chartData,chart_id)

	var options = {
		series: chartData['data'],
		chart: {
			width: 480,
			type: 'pie',
			height: 300,
			redrawOnParentResize: false,
		},
		fill: {
			colors: ['#50AAD0', '#2D4084']
		},
		colors: ['#50AAD0', '#2D4084'],
		labels: chartData['label'],
		toolbar: {
			show: false,
		},
		legend: {
			position: 'right'
		},
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				tooltip: {
					enabled: true,
					fillSeriesColor: true,
				},
				theme: {
					mode: theme_mode,
				},
			}
		}]
	};

	$(`#${chart_id}`).html(" ");
	var chart = new ApexCharts(document.querySelector(`#${chart_id}`), options);
	chart.render();

	$(`#${chart_id} > div`).css('margin','auto');
	$(`#${chart_id}_loader`).empty();
}


const chart_no_data = (chartData,chart_id) => {
	var index_val=0,obj_val=0;
	$(`.${chart_id}.chart_overlay`).remove();

	if(chartData['series']){
		let obj = chartData['series'].find((o, i) => {
			index_val++
			if (o.data.every(item => item === 0)) {
				obj_val++
			}
		});
		
		if(index_val == obj_val){
			$(`#${chart_id}`).after(`<div class="${chart_id} chart_overlay"><h5 class="col-12">No Data Available</h5></div>`);
		}
		
	} else{
		if (chartData['data'].every(item => item === 0)) {
			$(`#${chart_id}`).after(`<div class="${chart_id} chart_overlay"><h5 class="col-12">No Data Available</h5></div>`);
		}
	}
}

   
