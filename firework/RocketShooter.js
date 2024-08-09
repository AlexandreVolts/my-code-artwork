var RocketShooter = function()
{
	Rocket.call(this, Volts.Math.rand(1, 2));
	var rockets = [];
	var rocketSpeed = Volts.Math.rand(1, 5);

	this.explode = function(n)
	{
		n = Volts.Math.rand(2, 10);
		for(var i = 0; i < n; i++)
		{
			rockets.push(new Rocket(rocketSpeed / 2));
			with(rockets[i].getHead())
			{
				x = this.getHead().x;
				y = this.getHead().y;
				vx = Math.sin(Math.PI * 2 / n * i) * rocketSpeed;
				vy = Math.cos(Math.PI * 2 / n * i) * rocketSpeed;
			}
		}
		this.dead = true;
	}
	this.getRockets = function()
	{
		return rockets;
	}
}