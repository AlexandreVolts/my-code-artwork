var Firework = 
{
	canvas: new Volts.Canvas(document.getElementsByTagName("canvas")[0], true),
	stars: [],
	rockets: [],
	intensityChanger: 10 * 60,
	intensityChangerLauncher: 0,
	maxIntensity: 10,
	minIntensity: 180,
	decrease: 7,
	intensity: 170,
	launcher: 0,

	animate: function() 
	{
		with(Firework)
		{
			canvas.clearRect();

			canvas.setFill("white");
			for(var i = stars.length - 1; i >= 0; i--)
				stars[i].draw(canvas);

			launcher++;
			if(launcher == intensity)
			{
				launcher = 0;
				if(Math.random() > 0.9)
					rockets.push(new RocketShooter());
				else
				rockets.push(new Rocket(Volts.Math.rand(1, 2.5, false)));
			}

			intensityChangerLauncher++;
			if(intensityChangerLauncher == intensityChanger)
			{
				minIntensity -= decrease;
				if(minIntensity <= maxIntensity * 2)
					minIntensity += decrease * (decrease / 2);

				launcher = 0;
				intensity = Volts.Math.rand(minIntensity, maxIntensity, true);
				intensityChangerLauncher = 0;
			}

			for(var i = rockets.length - 1; i >= 0; i--)
			{
				if(rockets[i].dead)
				{
					if(rockets[i] instanceof RocketShooter)
					{
						for(var j = rockets[i].getRockets().length - 1; j >= 0; j--)
							rockets.push(rockets[i].getRockets()[j]);
					}
					rockets.splice(i, 1);
				}
				else
					rockets[i].draw(canvas);
			}
		}
		requestAnimationFrame(Firework.animate);
	}
}
