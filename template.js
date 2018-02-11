var def1 = 
{
	package: "def1",
	creator: "justroX",
	version: "1.0.0",
	animations:
	{
		swing:
		[
			[15,{angle:[0,"damped"],scaley:[2,"damped",{period:10}]}],
		],
	},
	transitions:
	{
		damped: function(a,b,t1,t2,t,o)
		{
			let period = o.period || (1/o.frequency) || 20;
			let amp = Math.exp(-(t-t1)*Math.log(Math.abs(10*(a-b)))/(t2-t1));
			return amp*(a-b)*qanim.cache.cos(360/period*(t-t1)) + b;
		}
	},
	scenes:
	{
		main: "pendulum",
		pendulum:
		{
			initial_vars : 
			{
				x: 600,
				y: 100,
				x_offset: 1,
				angle: -90,
			},
			sprite: "pendulum",
			animation: "swing",
			step: function(env){},
			draw: function(env){},
			children: [],
		},
	},
	resources:
	{
		pendulum:
		{
			dir: "dragon.svg",
			width: 2,
			height: 128,
		}
	}
}