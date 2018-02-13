var people = 
{
	package: "people",
	author: "justrox",
	version: "1.0.0",
	animations:
	{
		move_right:
		[
			[5,{x:670}],
		],
		swing:
		[
			[10 , {angle:[0,"damped"]}],
		],
		shake_body:
		[
			[5,{y:[1,"damped"]}],
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
				x: 0,
				y: 400,
			},
			animation: "move_right",
			children: ["body","arm1","arm2","leg1","leg2","head"],

		},
		body:
		{
			initial_vars:
			{
				x_offset:32,
				y_offset:16,
			},
			animation: "shake_body",
			sprite: "body",
		},
		arm1:
		{
			initial_vars:
			{
				angle: 30,
				depth: -1,
				x_offset: 32,
				y_offset: 3
			},
			animation: "swing",
			sprite: "arm",
		},
		arm2:
		{
			initial_vars:
			{
				depth: 4,
				angle:-30,
				x_offset: 32,
				y_offset: 3,
			},
			animation: "swing",
			sprite: "arm",
		},
		leg1:
		{
			initial_vars:
			{
				angle: 30,
				x_offset:32,
				y: 44
			},
			sprite: "leg",
			animation: "swing_big"
		},
		leg2:
		{
			initial_vars:
			{
				angle: -30,
				x_offset:32,
				y: 44
			},
			sprite: "leg",
			animation: "swing_big",
		},
		head:
		{
			initial_vars:
			{
				x_offset: 32,
				y_offset: 64,
				y: -13,
				x: -2,
				angle: 15,
			},
			animation: 
			[
				[5,	{ angle:[0,"damped"] }]
			],
			sprite: "head",
		}
	},
	resources:
	{
		head:
		{
			dir: "head_side.svg",
			width: 64,
			height: 64,
		},
		body:
		{
			dir: "body.svg",
			width: 64,
			height: 64,
		},
		arm:
		{
			dir: "arm.svg",
			width: 64,
			height: 64,
		},
		leg:
		{
			dir: "leg.svg",
			width: 64,
			height: 64,
		},
		bg:
		{
			dir: "bg.png",
			width: 1280,
			height:1024
		}
	},
};