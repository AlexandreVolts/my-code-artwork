var Particle = function(x, y, c)
{
	Volts.Circle.call(this, x, y, Volts.Math.rand(1, 3, false), c);
	var vector = new Volts.Vector(Math.cos(Volts.Math.rand(-Math.PI, Math.PI, false)) * 2, Math.sin(Volts.Math.rand(-Math.PI, Math.PI, false)) * 2);
	var isSapling = Math.random() < 0.05;

	this.draw = function()
	{
		this.x += vector.x;
		this.y += vector.y;
		vector.x *= 1.0025;
		vector.y *= 1.0025;
		Main.canvas.setFill(this.color).drawArc(this.x, this.y, this.radius, true);
	}

	this.getIsSapling = function()
	{
		return isSapling;
	}
}