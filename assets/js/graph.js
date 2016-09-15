var dataset = [
	{
		value: 10,
		color: 'red'
	},
	{
		value: 60,
		color: 'green'
	},
	{
		value: 90,
		color: 'blue'
	},
	{
		value: 40,
		color: 'orange'
	},
]

var w = 400
var h = 500
var spacing = 10
var barWidth = 40
var padding = 20
var gutter = 50

var svg = d3.select('#graph')
	.append('svg')
	.attr('width', w)
	.attr('height', h)
	
var yAxisGroup = svg.append('g')

function drawGraph() {
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, (d) => d.value)])
		.range([h - padding * 2, 0])
		
	var yAxis = d3.axisLeft()
		.scale(yScale)
		
	yAxisGroup
		.attr('transform', 'translate('+(gutter-padding)+','+padding+')')
		.call(yAxis)
		
	var bars = svg.selectAll('rect')
		.data(dataset)
		
	// update bars
	bars
		.transition()
		.duration(1000)
		// .delay((d, i) => i * 100)
		.attr('y',      (d, i) => yScale(d.value) + padding)
		.attr('height', (d, i) => yScale(0) - yScale(d.value))
		.attr('fill',   (d, i) => d.color)
		
	// new bars	
	bars
		.enter()
		.append('rect')
		.attr('width', barWidth)
		.attr('y', h - padding)
		.attr('x',      (d, i) => gutter + (barWidth + spacing) * i)
		.attr('fill',   (d, i) => d.color)
		.transition()
			.duration(1000)
			// .delay((d, i) => i * 100)
			.attr('y',      (d, i) => yScale(d.value) + padding)
			.attr('height', (d, i) => yScale(0) - yScale(d.value))
			
	
	// remove old bars
	bars
		.exit()
		.remove()
	
}

drawGraph()

$('#add_bar_form').on('submit', function(event) {
	event.preventDefault()
	
	// put a new piece of data into the dataset
	dataset.push({
		value: $('#value').val(), // with the value from the form
		color: $('#color').val()  // and the color from the form
	})
	
	// reset the inputs
	$('#value').val('')
	$('#color').val('')
	
	// redraw the graph with any changes
	drawGraph()
	
	// redraw the bar forms
	drawForms()
})

function drawForms() {
	
	$('.bar_forms').empty()
	
	dataset.forEach(function(data, i) {
		$('.bar_forms')
			.append('<form data-i="'+i+'">')
		
		$('.bar_forms form:last-of-type')
			.append(
				'<input type="text" class="value" value="'+data.value+'"> ' +
				'<input type="text" class="color" value="'+data.color+'"> ' +
				'<button class="delete">Delete Bar</button>'
			)
	})
	
}

drawForms()

// listen for a keyup event on any value inputs that exist now, or might exist in the future
$(document).on('keyup', 'form[data-i] input.value', function() {
	
	var form = $(this).parent()
	
	// get the index of this piece of data in the dataset, from the form
	var index = form.data('i')
	
	var newVal = parseInt($(this).val())
	
	if(isNaN(newVal)) {
		newVal = 0
	}
	
	// set this piece of data's value to the new value
	dataset[index].value = newVal
	
	// redraw the graph with the new changes
	drawGraph()
})

$(document).on('keyup', 'form[data-i] input.color', function() {
	
	var form = $(this).parent()
	var index = form.data('i')
	
	dataset[index].color = $(this).val()
	drawGraph()
})

$(document).on('click', 'form[data-i] .delete', function(event) {
	event.preventDefault()
	
	var form = $(this).parent()
	var index = form.data('i')
	
	// dataset[index].color = $(this).val()
	
	dataset.splice(index, 1)
	
	drawGraph()
	drawForms()
})
