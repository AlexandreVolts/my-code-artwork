var Head = function(x, y, r, c, s)
{
	Particle.call(this, x, y, r, 0, c);
	const FRICTION = 0.995;
	this.vx = 0;
	this.vy = s;

	this.draw = function()
	{
		if(!this.dead)
		{
			this.x -= this.vx;
			this.y -= this.vy;
			this.vy *= FRICTION;
			Firework.canvas.setFill("white");
			Firework.canvas.drawArc(this.x, this.y, this.radius, true);
		}
	}
}