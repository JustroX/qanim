var people = 
{
	package: "people",
	author: "justrox",
	version: "1.0.0",
	animations:
	{
		move_right:
		[
			[20,{x:1000}],
		],
		swing:
		[
			[20,{angle:[0,"damped"],opacity:[0,"damped"]}]
		],
		swing_big:
		[
			[100,{angle:[0,"damped",{frequency:0.06}]}]
		],

	},
	scenes:
	{
		people1:
		{
			initial_vars:
			{
				x: 500,
				y:300,
				x_offset: 32
			},
			sprite: "body",
			animation: "move_right",
			children: ["arm1","arm2","leg1","leg2","head"],
		},
		arm1:
		{
			initial_vars:
			{
				x_offset: 16,
				y:16,
				angle: 30,
				depth: -1
			},
			animation: "swing",
			sprite: "arm",
		},
		arm2:
		{
			initial_vars:
			{
				x_offset: 16,
				y:16,
				depth: 4,
				angle:-30,
			},
			animation: "swing",
			sprite: "arm",
		},
		leg1:
		{
			initial_vars:
			{
				depth:-0.5,
				x_offset:16,
				y:64,
				angle: 30,
			},
			sprite: "leg",
			animation: "swing_big"
		},
		leg2:
		{
			initial_vars:
			{
				depth:0.5,
				x_offset:16,
				y:64,
				angle: -30,
			},
			sprite: "leg",
			animation: "swing_big"
		},
		head:
		{
			initial_vars:
			{
				x_offset:16,
				y_offset:32,
				y:0
			},
			sprite: "head"
		}
	},
	resources:
	{
		head:
		{
			dir: "head.png",
			width: 32,
			height: 32,
		},
		body:
		{
			dir: "body.png",
			width: 64,
			height: 64,
		},
		arm:
		{
			dir: "arm.png",
			width: 32,
			height: 64,
		},
		leg:
		{
			dir: "leg.png",
			width: 32,
			height: 64,
		},
	},
};