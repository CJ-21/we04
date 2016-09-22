var canvas = document.querySelector('#stage')
var canvas2 = document.querySelector('#stage2')

var ctx = canvas.getContext('2d')

var dots = []

var mouse = {
	x: 0,
	y: 0,
	ox: 0,
	oy: 0
}



window.addEventListener('resize', function() {
	var width = window.innerWidth


	if(width > 1200) {
		canvas.width = 1200
		canvas.height = 500

	} else if(width > 1023) {
		canvas.width = 1000
		canvas.height = 350

	} else if(width > 767) {
		canvas.width = 500
		canvas.height = 250
	}
})

window.dispatchEvent(new Event('resize'))



canvas.addEventListener('mousemove', draw)	
canvas.addEventListener('touchmove', draw)

function draw(event){
	
	mouse.ox = mouse.x
	mouse.oy = mouse.y

if(event.touches){
	mouse.x = event.touches[0].pageX - canvas.offsetLeft
	mouse.y = event.touches[0].pageY - canvas.offsetTop
} else {
	mouse.x = event.pageX - canvas.offsetLeft 
	mouse.y = event.pageY - canvas.offsetTop
}

	console.log('draw', mouse.x, mouse.y)
	console.log(event)

	var size = Math.random() * 10

	var color = '#'+Math.floor(Math.random()*16777215).toString(16);

	dots.push({
		size: size,
		color: color,
		x: mouse.x,
		y: mouse.y,
		gravity: 0.1,
		xVel: (mouse.x - mouse.ox) / 10,
		yVel: (mouse.y - mouse.oy) / 10
	})
}

setInterval(function(){

	ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	dots.forEach(function(dot){

		dot.yVel += dot.gravity
		dot.y += dot.yVel
		dot.x += dot.xVel

		ctx.beginPath()
		ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI, false)
		ctx.fillStyle = dot.color
		ctx.fill()
	})	

}, 1000/60)