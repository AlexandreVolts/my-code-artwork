var Main = function()
{
	var flowers = [new Flower(Volts.Math.rand(window.innerWidth), Volts.Math.rand(window.innerHeight))];
	var particles = [];

	window.addEventListener("mousedown", function(event)
	{
		window.addEventListener("mousemove", createParticles);
	});
	window.addEventListener("mouseup", function()
	{
		window.removeEventListener("mousemove", createParticles);
	})

	animate();

	function createParticles(event)
	{
		particles.push(new Particle(event.clientX, event.clientY, Volts.Color.getRandomColor()));
	}
	function createFlower(x, y)
	{
		flowers.push(new Flower(x, y));
	}

	function animate()
	{
		Main.canvas.setFill("rgba(0, 0, 0, 0.2)").drawRect(0, 0, Main.canvas.getWidth(), Main.canvas.getHeight(), true);

		for(var i = 0; i < particles.length; i++)
		{
			particles[i].draw();

			if(particles[i].x < 0 || particles[i].y < 0 || particles[i].x > Main.canvas.getWidth() || particles[i].y > Main.canvas.getHeight()) {
				particles.splice(i, 1);
			}
			else if(particles[i].getIsSapling())
			{
				createFlower(particles[i].x, particles[i].y);
				particles.splice(i, 1);
			}
		}

		for(var i = 0; i < flowers.length; i++)
		{
			flowers[i].draw(flowers.length - 1);
			if(flowers[i].getIsDead())
			{
				particles = particles.concat(flowers[i].getParticles());
				flowers.splice(i, 1);
			}
		}

		requestAnimationFrame(animate);
	}
}
Main.canvas = new Volts.Canvas(document.getElementsByTagName("canvas")[0], true);