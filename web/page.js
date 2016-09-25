var myDiv = document.getElementById('myDiv');
var d3 = Plotly.d3;
var N = 100;
var x = d3.range(0, 4, 0.1);
var y = d3.range(0, 4, 0.1).map(
	function(value) {
		return Math.cos(value) + 3;
	}
);
var data = [{
	x: x, 
	y: y
}];

function drawPlot()
{
	var legend = {
		title: 'Интеграл Римана',
		xaxis: {
			title: 'x-axis title'
		},
		yaxis: {
			title: 'y-axis title'
		}	,
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
	        }]
	};

	var layout = {
		displaylogo: false
	};

	Plotly.plot(myDiv, data, legend, layout);
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