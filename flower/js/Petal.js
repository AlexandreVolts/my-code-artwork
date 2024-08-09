var Petal = function(rs, color)
{
	var rotationSpeed = rs;
	var rotation = 0;
	
	this.color = color;

	this.getRotation = function()
	{
		rotation += rotationSpeed;
		return rotation;
	}
	this.setRotationSpeed = function(rs)
	{
		rotationSpeed = rs;
	}
}