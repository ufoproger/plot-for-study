var plotFunctions = [
	function(x) {
		return x;
	},
	function(x) {
		return Math.cos(x);
	}
];

var plotFuncS = [
	function(a, b) {
		return (b * b - a * a) * 0.5;
	},
	function(a, b) {
		return Math.sin(b) - Math.sin(a);
	}
];

var plotFuncArgs = {
	from: 0.0,
	to: 3.0,
	step: 0.1
};

function drawPlot()
{
	var myDiv = document.getElementById('myDiv');
	var d3 = Plotly.d3;
	var n = parseInt($("#fragmentsCount").val());
	var f = plotFunctions[$("#plotFunction").val()];
	var integralF = plotFuncS[$("#plotFunction").val()];


	var x = d3.range(plotFuncArgs.from, plotFuncArgs.to, plotFuncArgs.step);
	var y = d3.range(plotFuncArgs.from, plotFuncArgs.to, plotFuncArgs.step).map(f);

	var data = [{
		x: x, 
		y: y
	}];
/*
'shapes': [
	        {
	            'type': 'box',
	            'x0': 5,
	            'y0': 3,
	            'x1': 1,
	            'y1': 2,
	            'line': {
	                'color': 'rgb(55, 128, 191)',
	                'width': 1,
	            },
	        }]*/
	var shapes = [];
	var segmentLen = Math.abs(plotFuncArgs.from - plotFuncArgs.to) / n;
	var totalS = 0.0;

	for (var i = 0; i < n; ++i) {
		var startX = segmentLen * i;
		var endX = startX + segmentLen;
		var middleY = f(startX + 0.5 * segmentLen);

		totalS += middleY * segmentLen;

		shapes.push({
			type: 	"rect",
			x0: 	startX,
			y0: 	0.0,
			x1: 	endX,
			y1: 	middleY,
			fillcolor: (middleY > 0 ? 'red' : 'blue'),
			opacity: 0.3,
			line: {
				color: 'black',
				width: 1
			}
		});

		console.debug(segmentLen);
	}

	var legend = {
		//title: 'Интеграл Римана',
		xaxis: {
			title: 'x'
		},
		yaxis: {
			title: 'y'
		},
		shapes
	};

	var layout = {
		displaylogo: false
	};

	Plotly.newPlot(myDiv, data, legend, layout);

	$("#totalS").text(totalS);
	$("#integralS").text(integralF(plotFuncArgs.from, plotFuncArgs.to));
}

drawPlot();

/*myDiv.on('plotly_relayout',
function(eventdata){  
		alert( 'ZOOM!' + '\n\n' +
				'Event data:' + '\n' + 
				 JSON.stringify(eventdata) + '\n\n' +
				'x-axis start:' + eventdata['xaxis.range[0]'] + '\n' +
				'x-axis end:' + eventdata['xaxis.range[1]'] );
});*/

$("a#makePlot").click(function(e)
{
	e.preventDefault();
	console.debug("a#makePlot");
	drawPlot();
});