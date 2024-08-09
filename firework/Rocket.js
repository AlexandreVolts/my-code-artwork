var Rocket = function(delay)
{
	const HEAD_RADIUS = Volts.Math.rand(6);
	const PARTICLE_SIZE = Volts.Math.rand(0.75, 2, false);
	const X_SPREAD = Volts.Math.rand(0.75, 3, false);
	const SPEED = Volts.Math.rand(3, 10, false);
	const PARTICLE_ALPHA_SPEED = Volts.Math.rand(0.01, 0.025, false);

	const EXPLOSION_COLOR = Volts.Color.getRandomColor(100, 250);
	const EXPLOSION_PARTICLE_SIZE = Volts.Math.rand(3, 6);
	const RANDOM_EXPLOSION_SIZE = Math.random() < 0.25;
	const EXPLOSION_SPEED_GROWTH = Math.random();

	var explosionSpeed = Volts.Math.rand(SPEED, SPEED * 1.5);

	var launcher = delay * 60 - SPEED * 2;
	var explosionLauncher = Volts.Math.rand(1, 30);
	var head = new Head(Volts.Math.rand(Rocket.PADDING, Firework.canvas.getWidth() - Rocket.PADDING), Firework.canvas.getHeight() + HEAD_RADIUS * 2, HEAD_RADIUS, Volts.Color.getRandomColor(50, 200), SPEED);
	var particles = [];
	this.dead = false;

	this.draw = function()
	{
		launcher--;
		if(launcher >= 0)
		{
			particles.push(new Particle(head.x, head.y, PARTICLE_SIZE, head.color, 0.025,X_SPREAD));
			head.draw();
		}
		else if(!head.dead)
		{
			head.dead = true;
			this.explode(Volts.Math.rand(HEAD_RADIUS, 30));
		}
		else
		{
			if(explosionLauncher != 0)
				this.explode(Volts.Math.rand(HEAD_RADIUS, 30));

			if(particles.length == 0)
				this.dead = true;
		}

		for(var i = particles.length - 1; i >= 0; i--)
		{
			if(particles[i].dead)
				particles.splice(i, 1);
			else
				particles[i].draw();
		}
	}
	this.explode = function(n)
	{
		explosionLauncher--;
		explosionSpeed += EXPLOSION_SPEED_GROWTH;
		for(var i = 0; i < n; i++)
		{
			if(RANDOM_EXPLOSION_SIZE)
				particles.push(new Particle(head.x, head.y, Volts.Math.rand(2, 6), EXPLOSION_COLOR, PARTICLE_ALPHA_SPEED, X_SPREAD));
			else
				particles.push(new Particle(head.x, head.y, EXPLOSION_PARTICLE_SIZE, EXPLOSION_COLOR, PARTICLE_ALPHA_SPEED, X_SPREAD));
			particles[particles.length - 1].vx = Math.sin(Math.PI * 2 / n * i) * explosionSpeed;
			particles[particles.length - 1].vy = Math.cos(Math.PI * 2 / n * i) * explosionSpeed;
		}
	}
	this.getHead = function()
	{
		return head;
	}
}
Rocket.PADDING = 50;