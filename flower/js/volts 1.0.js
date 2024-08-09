var Volts = {
	Array: 
	{
		getRandomItem: function(array)
		{
			return array[Math.floor(Math.random() * array.length)];
		},
		toTable: function(array, addIndex = false)
		{
			var table = document.createElement("table");

			if(Array.isArray(array))
			{
				var index = [];
				var max = 0;

				if(Array.isArray(array[0]))
				{
					for(var i = array.length - 1; i >= 0; i--)
					{
						if(array[i].length > max)
							max = array[i].length;
					}


					for(var i = 0, l = array.length; i < l; i++)
						table.appendChild(addTr(array[i], i));
				}
				else
				{
					max = array.length;
					table.appendChild(addTr(array, 0));
				}

				if(addIndex)
				{
					for(var i = 0; i <= max; i++)
						index[i] = i;
					table.insertBefore(addTr(index, -1), table.firstChild);
				}
			}

			function addTr(arr, i)
			{
				var tr = document.createElement("tr");
				var td;

				if(addIndex && i >= 0)
				{
					td = document.createElement("td");
					td.textContent = i;
					tr.appendChild(td);
				}

				for(var i = 0, l = arr.length; i < l; i++)
				{
					td = document.createElement("td");
					td.textContent = arr[i];
					tr.appendChild(td);
				}
				return tr;
			}

			return table;
		}
	},
	Geom:
	{
		rad: function(angle)
		{
			return (Math.PI / 180) * angle;
		},
		deg: function(angle)
		{
			return (180 / Math.PI) * angle;
		}
	},
	Math:
	{
		rand: function(min, max, round = true)
		{
			if(round)
			{
				if(max != undefined)
					return Math.floor(min + Math.random() * (max - min + 1));
				else
					return Math.floor(Math.random() * (min + 1));
			}
			else
			{
				if(max != undefined)
					return min + Math.random() * (max - min);
				else
					return Math.random() * min;
			}
		},
		integerRound: function(n, unity, strictlyInferior = false)
		{
			if(!strictlyInferior)
			{
				if(n % unity != 0)
				{
					if(n % unity >= unity / 2)
						n += unity;
				}
			}
			return Math.floor(n / unity) * unity;
		}
	},
	Canvas: function(c, width, height)
	{
		var self = this;
		var canvas = c;
		var context = canvas.getContext("2d");
		var font;
		var autoResize;
		var widthProportion, heightProportion;

		if(width != undefined)
		{
			if(typeof width == "number")
			{
				canvas.width = width;
				widthProportion = canvas.width / window.innerWidth;
				if(height != undefined)
					canvas.height = height;
				else
					canvas.height = width;

				heightProportion = canvas.height / window.innerHeight;
				autoResize = false;
			}
			else if(typeof width == "boolean")
			{
				autoResize = width;
				if(autoResize)
				{
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;
					widthProportion = heightProportion = 1;
					window.addEventListener("resize", applyResize);
				}
			}
		}

		function fill(isFilled)
		{
			if(isFilled != undefined)
			{
				if(isFilled)
					context.fill();
				else
					context.stroke();
			}
			else
			{
				context.fill();
				context.stroke();
			}
		}
		function applyResize()
		{
			canvas.width = window.innerWidth * widthProportion;
			canvas.height = window.innerHeight * heightProportion;
			self.setShadow(context.shadowOffsetX, context.shadowOffsetY, context.shadowBlur, context.shadowColor);
		}
		this.clearRect = function(x = 0, y = 0, width = canvas.width, height = canvas.height)
		{
			context.clearRect(x, y, width, height);
			return this;
		}
		this.drawArc = function(x, y, radius, beginAngle, endAngle, completeByCenter = true, isFilled = undefined)
		{
			context.beginPath();
			if(typeof beginAngle == "boolean" || beginAngle == undefined)
			{
				context.arc(x, y, radius, 0, Math.PI * 2);
				fill(beginAngle);
			}
			else
			{
				context.arc(x, y, radius, beginAngle, endAngle);
				if(completeByCenter)
					context.lineTo(x, y);

				fill(isFilled);
			}
			context.closePath();

			return this;
		}
		this.drawCurve = function(startX, startY, cX1, cY1, cX2, cY2, endX, endY, isFilled)
		{
			context.beginPath();
			context.moveTo(startX, startY);
			if(endX == undefined || typeof endX == "boolean")
			{
				context.quadraticCurveTo(cX1, cY1, cX2, cY2);
				fill(endX);
			}
			else
			{
				context.bezierCurveTo(cX1, cY1, cX2, cY2, endX, endY);
				fill(isFilled);
			}
			context.closePath();

			return this;
		}
		this.drawLine = function(startX, startY, endX, endY)
		{
			context.beginPath();
			context.moveTo(startX, startY);
			context.lineTo(endX, endY);
			context.stroke();
			context.closePath();

			return this;
		}
		this.drawPath = function(coords, close = false, isFilled = undefined)
		{
			context.beginPath();
			if(Array.isArray(coords[0]))
			{
				context.moveTo(coords[0][0], coords[0][1]);
				for(var i = 0, l = coords.length; i < l; i++)
				{
					switch(coords[i].length)
					{
						case 2:
							context.lineTo(coords[i][0], coords[i][1]);
							break;
						case 4:
							context.quadraticCurveTo(coords[i][0], coords[i][1], coords[i][2], coords[i][3]);
							break;
						case 5:
							context.arc(coords[i][0], coords[i][1], coords[i][2], coords[i][3], coords[i][4]);
							break;
						case 6:
							context.bezierCurveTo(coords[i][0], coords[i][1], coords[i][2], coords[i][3], coords[i][4], coords[i][5]);
							break;
					}
				}
			}
			else if(typeof coords[0] == "number")
			{
				context.moveTo(coords[0], coords[1]);
				for(var i = 0, l = coords.length; i < l; i += 2)
					context.lineTo(coords[i], coords[i + 1]);
			}
			else
				throw new Error("[Volts Library Error] The first argument of drawPath must be an Array or a bidimentionnal Array.");
				
			if(close)
				context.closePath();
			fill(isFilled);

			return this;
		}
		this.drawRect = function(x, y, width, height, isFilled)
		{
			if(isFilled != undefined)
			{
				if(isFilled)
					context.fillRect(x, y, width, height);
				else
					context.strokeRect(x, y, width, height);
			}
			else
			{
				context.fillRect(x, y, width, height);
				context.strokeRect(x, y, width, height);
			}

			return this;
		}
		this.drawText = function(text, x, y, isFilled)
		{
			if(isFilled || isFilled == undefined)
				context.fillText(text, x, y);
			else
				context.strokeText(text, x, y);

			return this;
		}
		this.measureText = function(str)
		{
			return context.measureText(str).width;
		}

		this.getAlpha = function()
		{
			return context.globalAlpha;
		}
		this.getContext = function()
		{
			return context;
		}
		this.getFill = function()
		{
			return context.fillStyle;
		}
		this.getFont = function()
		{
			return font;
		}
		this.getHeight = function()
		{
			return canvas.height;
		}
		this.getLineWidth = function()
		{
			return context.lineWidth;
		}
		this.getResize = function()
		{
			return autoResize;
		}
		this.getShadow = function()
		{
			return {
				color: context.shadowColor,
				offsetX: context.shadowOffsetX,
				offsetY: context.shadowOffsetY,
				blur: context.shadowBlur
			};
		}
		this.getStroke = function()
		{
			return context.strokeStyle;
		}
		this.getWidth = function()
		{
			return canvas.width;
		}

		this.setAlpha = function(alpha)
		{
			context.globalAlpha = alpha;

			return this;
		}
		this.setFill = function(fill)
		{
			if(typeof fill == "string")
				context.fillStyle = fill;
			else if(fill instanceof Volts.Color)
				context.fillStyle = fill.toString();

			return this;
		}
		this.setFont = function(fnt)
		{
			font = context.font = fnt.toString();
			return this;
		}
		this.setHeight = function(newHeight)
		{
			canvas.height = newHeight;
			heightProportion = newHeight / window.innerHeight;

			return this;
		}
		this.setLineCap = function(lineCap)
		{
			context.lineCap = lineCap;
			return this;
		}
		this.setLineJoin = function(lineJoin)
		{
			context.lineJoin = lineJoin;
			return this;
		}
		this.setLineWidth = function(lineWidth)
		{
			context.lineWidth = lineWidth;
			return this;
		}
		this.setResize = function(nAutoRes)
		{
			autoResize = nAutoRes;
			if(autoResize)
				window.addEventListener("resize", applyResize);
			else
				window.removeEventListener("resize", applyResize);

			return this;
		}
		this.setStroke = function(stroke)
		{
			if(typeof stroke == "string")
				context.strokeStyle = stroke;
			else if(stroke instanceof Volts.Color)
				context.strokeStyle = stroke.toString();

			return this;
		}
		this.setShadow = function(offsetX, offsetY, blur = 5, color = "black")
		{
			if(typeof color == "string")
				context.shadowColor = color;
			else if(color instanceof Volts.Color)
				context.shadowColor = color.toString();

			context.shadowOffsetX = offsetX;

			if(offsetY == undefined)
				context.shadowOffsetY = offsetX;
			else
				context.shadowOffsetY = offsetY;

			context.shadowBlur = blur;

			return this;
		}
		this.setWidth = function(newWidth)
		{
			canvas.width = newWidth;
			widthProportion = newWidth / window.innerWidth;

			return this;
		}
	},
	Color: function(r, g, b, a = 1)
	{
		const MAX = 255;
		var red = checkValue(r);
		var green = checkValue(g);
		var blue = checkValue(b);
		var alpha = a;

		function checkValue(value)
		{
			if(value >= 0 && value <= MAX)
				return value;
			else if(value >= MAX)
				return 255;
			else
				return 0;
		}
		this.brighter = function(intensity = 0.2, apply = true)
		{
			if(intensity >= 0 && intensity <= 1)
			{
				if(!apply)
					return new Volts.Color(Math.floor(MAX * intensity), Math.floor(MAX * intensity), Math.floor(MAX * intensity));
				else
				{
					red += Math.floor(MAX * intensity);
					green += Math.floor(MAX * intensity);
					blue += Math.floor(MAX * intensity);
				}
			}
			return this;
		}
		this.darker = function(intensity = 0.2, apply = true)
		{
			if(intensity >= 0 && intensity <= 1)
			{
				if(!apply)
					return new Volts.Color(red - Math.floor(MAX * intensity), green - Math.floor(MAX * intensity), blue - Math.floor(MAX * intensity));
				else
				{
					red = checkValue(red - Math.floor(MAX * intensity));
					green = checkValue(green - Math.floor(MAX * intensity));
					blue = checkValue(blue - Math.floor(MAX * intensity));
				}
			}
			return this;
		}
		this.grayScale = function(apply = true)
		{
			let gray = Math.floor((red + green + blue) / 3);

			if(!apply)
				return new Volts.Color(gray, gray, gray);
			else
			{
				red = green = blue = gray;
				return this;
			}
		}
		this.negative = function(apply = true)
		{
			if(!apply)
				return new Volts.Color(MAX - red, MAX - green, MAX - blue);
			else
			{
				red = MAX - red;
				green = MAX - green;
				blue = MAX - blue;

				return this;
			}
		}
		this.toString = function()
		{
			return "rgba(" + this.getRed() + ", " + this.getGreen() + ", " + this.getBlue() + ", " + this.getAlpha() + ")";
		}

		this.getRed = function()
		{
			return red;
		}
		this.getGreen = function()
		{
			return green;
		}
		this.getBlue = function()
		{
			return blue;
		}
		this.getAlpha = function()
		{
			return alpha;
		}

		this.setRed = function(r)
		{
			red = checkValue(r);
			
			return this;
		}
		this.setGreen = function(g)
		{
			green = checkValue(g);

			return this;
		}
		this.setBlue = function(b)
		{
			blue = checkValue(b);

			return this;
		}
		this.setAlpha = function(a)
		{
			if(a >= 0 && a <= 1)
				alpha = a;
			else
				alpha = 1;

			return this;
		}
	},
	Font: function(font, size = 15, ib = false, italicType = "normal", isc = false) 
	{
		this.font = font;
		this.size = size;
		this.isBold = ib;
		this.italicType = italicType;
		this.isSmallCaps = isc;

		this.toString = function() 
		{
			var f = this.size + "px " + this.font;

			if(this.isBold)
				f = "bold " + f;
			if(this.isSmallCaps)
				f = " small-caps " + f;

			f = this.italicType + " " + f;

			return f;
		}
	},
	Keyboard: function(k)
	{
		var self = this;
		var keysID = k;

		this.keys = [];
		for(var i = keysID.length - 1; i >= 0; i--)
		{
			this.keys.push(false);
		}

		window.addEventListener("keydown", detectKeys);
		window.addEventListener("keyup", detectKeys);

		function detectKeys(event)
		{
			event.preventDefault();

			for(var i = keysID.length - 1; i >= 0; i--)
			{
				if(event.keyCode == keysID[i] || event.key == keysID[i])
				{
					self.keys[i] = event.type == "keydown";
				}
			}
		}
	},
	Point: function(x, y, c = "black")
	{
		this.x = x;
		this.y = y;
		this.color = c;
	},
	Vector: function(x, y)
	{
		Volts.Point.call(this, x, y);

		this.add = function(vector, apply = false)
		{
			if(!apply)
				return new Volts.Vector(this.x + vector.x, this.y + vector.y);
			else
			{
				this.x += vector.x;
				this.y += vector.y;
				return this;
			}
		}
		this.subtract = function(vector, apply = false)
		{
			if(!apply)
				return new Volts.Vector(this.x - vector.x, this.y - vector.y);
			else
			{
				this.x -= vector.x;
				this.y -= vector.y;
				return this;
			}
		}
		this.scale = function(coef, apply = false)
		{
			if(!apply)
				return new Volts.Vector(this.x * coef, this.y * coef);
			else
			{
				this.x *= coef;
				this.y *= coef;
				return this;
			}
		}
		this.normalize = function(apply = false)
		{
			if(this.getModule() != 0)
			{
				if(!apply)
					return new Volts.Vector(this.x / this.getModule(), this.y / this.getModule());
				else
				{
					this.x /= this.getModule();
					this.y /= this.getModule();
				}
			}
			else
				throw new Error("[Volts Library Error] x or y must be different than 0 to use this method.");
			return this;
		}
		this.getAngle = function()
		{
			return Math.atan2(this.dx, this.dy);
		}
		this.getModule = function()
		{
			return Math.sqrt(this.dx*this.dx + this.dy*this.dy);
		}
	},
	Rectangle: function(x, y, w, h, c = "black")
	{
		Volts.Point.call(this, x, y, c);
		this.width = w;
		this.height = h;

		this.draw = function(c, filled = true)
		{
			var color;
			if(filled)
			{
				color = c.getFill();
				c.setFill(this.color);
			}
			else
			{
				color = c.getStroke();
				c.setStroke(this.color);
			}

			c.drawRect(this.x, this.y, this.width, this.height, filled);

			if(filled)
				c.setFill(color);
			else
				c.setStroke(color);
		}
		this.toHTML = function()
		{
			var rectangle = document.createElement("div");
			rectangle.style.position = "absolute";
			rectangle.style.left = this.x + "px";
			rectangle.style.top = this.y + "px";
			rectangle.style.width = this.width + "px";
			rectangle.style.height = this.height + "px";
			rectangle.style.backgroundColor = this.color;

			return rectangle;
		}
		this.hitTestPoint = function(point, y)
		{
			if(point instanceof Volts.Point)
				return (point.x >= this.x && point.x <= this.x + this.width && point.y >= this.y && point.y <= this.y + this.height);
			else
				return (point >= this.x && point <= this.x + this.width && y >= this.y && y <= this.y + this.height);
		}
		this.isContained = function(rect, y, w, h)
		{
			if(rect instanceof Volts.Rectangle)
				return (this.x >= rect.x && this.y >= rect.y && this.x + this.width <= rect.width && this.y + this.height <= rect.width);
			else if(typeof rect == "number")
				return (this.x >= rect && this.y >= y && this.x + this.width <= w && this.y + this.height <= h);
			else
				return false;
		}
	},
	Circle: function(x, y, r, c = "black")
	{
		Volts.Point.call(this, x, y, c);
		this.radius = r;

		this.draw = function(c, filled = true)
		{
			var color;
			if(filled)
			{
				color = c.getFill();
				c.setFill(this.color);
			}
			else
			{
				color = c.getStroke();
				c.setStroke(this.color);
			}

			c.drawArc(this.x, this.y, this.radius, filled);

			if(filled)
				c.setFill(color);
			else
				c.setStroke(color);
		}
		this.toHTML = function()
		{
			var circle = document.createElement("div");
			circle.style.position = "absolute";
			circle.style.left = (this.x - this.radius) + "px";
			circle.style.top = (this.y - this.radius) + "px";
			circle.style.width = (this.radius*2) + "px";
			circle.style.height = (this.radius*2) + "px";
			circle.style.backgroundColor = this.color;
			circle.style.borderRadius = this.radius + "px";

			return circle;
		}
		this.hitTestPoint = function(point, y)
		{
			if(point instanceof Volts.Point)
				return (point.x-this.x)*(point.x-this.x) + (point.y-this.y)*(point.y-this.y) < this.radius*this.radius;
			else
				return (point-this.x)*(point-this.x) + (y-this.y)*(y-this.y) < this.radius*this.radius;
		}
		this.isContained = function(rect, y, w, h)
		{
			if(rect instanceof Volts.Rectangle)
				return (this.x >= rect.x && this.y >= rect.y && this.x + this.radius * 2 <= rect.width && this.y + this.radius * 2 <= rect.width);
			else if(typeof rect == "number")
				return (this.x >= rect && this.y >= y && this.x + this.radius * 2 <= w && this.y + this.radius * 2 <= h);
			else
				return false;
		}
	},
	Image: function(url)
	{
		Volts.Rectangle.call(this, 0, 0, 0, 0);
		var self = this;
		var image = new Image();
		image.src = url;

		this.cutX = 0;
		this.cutY = 0;
		this.cutWidth;
		this.cutHeight;

		this.load = function(callback)
		{
			image.onload = function()
			{
				self.width = image.width;
				self.height = image.height;

				if(self.cutWidth == undefined)
					self.cutWidth = image.width;
				if(self.cutHeight == undefined)
					self.cutHeight = image.height;
				
				if(callback != undefined)
					callback.call();
			}
		}
		this.draw = function(canvas)
		{
			if(image.complete)
				canvas.getContext().drawImage(image, self.cutX, self.cutY, self.cutWidth, self.cutHeight, self.x, self.y, self.width, self.height);
		}
		this.toHTML = function()
		{
			return image;
		}
		this.getDefaultWidth = function()
		{
			return image.width;
		}
		this.getDefaultHeight = function()
		{
			return image.height;
		}
		this.getComplete = function()
		{
			return image.complete;
		}
	}
};

Volts.Color.getRandomDye = function(colors)
{
	if(Array.isArray(colors))
	{
		var rgb = [0, 0, 0];
		for(var i = 0, l = colors.length; i < l; i++)
		{
			switch(colors[i])
			{
				case "red":
					rgb[0] = Volts.Math.rand(255);
					break;
				case "green":
					rgb[1] = Volts.Math.rand(255);
					break;
				case "blue":
					rgb[2] = Volts.Math.rand(255);
					break;
			}
		}
		return new Volts.Color(rgb[0], rgb[1], rgb[2], 1);
	}
	else
		throw new Error("[Volts Library Error] Argument of getRandomDye must be an Array.");
}
Volts.Color.getRandomColor = function(startDye = 0, endDye = 255)
{
	if(startDye >= 0 && startDye < 255 && startDye <= endDye && endDye > 0 && endDye <= 255)
		return new Volts.Color(Volts.Math.rand(startDye, endDye), Volts.Math.rand(startDye, endDye), Volts.Math.rand(startDye, endDye));
	else
		return new Volts.Color(Volts.Math.rand(255), Volts.Math.rand(255), Volts.Math.rand(255));
}
Volts.Color.getRandomColorAlpha = function(startDye = 0, endDye = 255)
{
	var c = Volts.Color.getRandomColor(startDye, endDye);
	c.setAlpha(Math.random());
	return c;
}