var Flower = function(x, y)
{
	Volts.Point.call(this, x, y);
	var self = this;

	const RADIUS = Math.random() * 10;
	const PETALS_NUMBER = Volts.Math.rand(3, 20);
	const ANGLE_PORTION = Math.PI * 2 / PETALS_NUMBER;
	const GROWTH_LIMIT = Volts.Math.rand(Main.canvas.getHeight() / 3, Main.canvas.getHeight() / 2);
	const SPEED = Volts.Math.rand(0.15, 0.3, false);
	const ROTATION_SPEED = (ANGLE_PORTION * SPEED * Volts.Array.getRandomItem([-1, 1])) / 1000;
	const SPECIAL = (PETALS_NUMBER < 12 && Math.random() < 0.33);

	const IS_MULTICOLORED = Math.random() < 0.1 && !SPECIAL;
	const DOUBLE_ROTATION = Math.random() < 0.1 && PETALS_NUMBER % 2 == 0;

	var petalLength = 1;
	var color = Volts.Color.getRandomColor(128, 255).setAlpha(Volts.Math.rand(0.1, 0.5, false));
	var reverse = false;
	var isDead = false;

	var petals = [];
	var particles = [];

	initPetals();

	function initPetals()
	{
		for(var i = 0; i < PETALS_NUMBER; i++)
		{
			petals.push(new Petal(ROTATION_SPEED, color));

			if(IS_MULTICOLORED)
			{
				petals[i].color = Volts.Color.getRandomColor(128, 255).setAlpha(color.getAlpha());
			}

			if(DOUBLE_ROTATION)
			{
				if(i % 2 == 0)
					petals[i].setRotationSpeed(ANGLE_PORTION * SPEED * -1 / 1000);
			}
		}
	}
	function createPoint(value, id)
	{
		return [Math.cos(ANGLE_PORTION * value + petals[id].getRotation()), Math.sin(ANGLE_PORTION * value + petals[id].getRotation())];
	}

	this.draw = function(flowerNumber)
	{
		var angle, middleAngle, nextAngle;

		Main.canvas.setStroke(color).setFill(color).setLineWidth(1);
		if(SPECIAL)
		{
			Main.canvas.setLineWidth(petalLength / 2);
		}

		for(var i = 0; i < PETALS_NUMBER; i++)
		{
			angle = createPoint(i, i);
			middleAngle = createPoint(i + 0.5, i);
			nextAngle = createPoint(i + 1, i);

			if(IS_MULTICOLORED)
			{
				Main.canvas.setStroke("rgba(0, 0, 0, 0)").setFill(petals[i].color);
			}
			Main.canvas.drawCurve(this.x + angle[0], this.y + angle[1], this.x + angle[0] * petalLength, this.y + angle[1] * petalLength, this.x + middleAngle[0] * petalLength, this.y + middleAngle[1] * petalLength)
			.drawCurve(this.x + nextAngle[0], this.y + nextAngle[1], this.x + nextAngle[0] * petalLength, this.y + nextAngle[1] * petalLength, this.x + middleAngle[0] * petalLength, this.y + middleAngle[1] * petalLength);
		}

		if(petalLength < GROWTH_LIMIT && !reverse)
		{
			petalLength += SPEED;
		}
		else if(!isDead)
		{
			reverse = true;
			petalLength -= SPEED * 1.5;

			if(Math.random() * flowerNumber < 1)
			{
				particles.push(new Particle(this.x, this.y, color));
			}

			for(var i = particles.length - 1; i >= 0; i--)
			{
				particles[i].draw();
				if(particles[i].x < 0 || particles[i].y < 0 || particles[i].x > Main.canvas.getWidth() || particles[i].y > Main.canvas.getHeight())
				{
					particles.splice(i, 1);
				}
			}

			if(petalLength < 1)
			{
				isDead = true;
			}
		}
	}
	this.getIsDead = function()
	{
		return isDead;
	}
	this.getParticles = function()
	{
		return particles;
	}
}