var Particle = function(x, y, r, c, va, spread)
{
	Volts.Circle.call(this, x, y, r);
	this.color = c;
	this.dead = false;
	this.vx = Volts.Math.rand(-spread, spread, false);
	this.vy = Volts.Math.rand(1, 4);
	this.va = va;
	var alpha = 1;

	this.draw = function()
	{
		with(this)
		{
			Firework.canvas.setFill(color);
			x += vx;
			y += vy;
			alpha -= va;
			Firework.canvas.setAlpha(alpha);
			if(alpha <= va || x - radius < 0 || y - radius < 0 || x + radius > window.innerWidth || y + radius > window.innerHeight)
				dead = true;

			if(!dead)
				Firework.canvas.drawArc(x, y, radius, true);
		}
		Firework.canvas.setAlpha(1);
	}
}