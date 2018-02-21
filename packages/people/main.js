var people = 
{
	package: "people",
	author: "justrox",
	version: "1.0.0",
	animations:
	{
		people_move_right:
		[
			[5,{x:670}],
		],
		people_swing:
		[
			[0 , {angle:90}]
		],
		people_shake_body:
		[
			[5,{y:[1,"damped"]}],
		],
		people_swing_big:
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
//			animation: "move_right",
			children: ["body","arm1","arm2","leg1","leg2","head"],

		},
		body:
		{
			initial_vars:
			{
				x_offset:32,
				y_offset:16,
			},
			animation: "people_shake_body",
			sprite: "body",
		},
		arm1:
		{
			initial_vars:
			{
				angle: 30,
				depth: -1,
				x_offset: 32,
				y_offset: 3,
				skin: ["right"],
			},
			//animation: "people_swing",
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
				skin: ["right"],
			},
			//animation: "people_swing",
			sprite: "arm",
		},
		leg1:
		{
			initial_vars:
			{
				angle: 30,
				x_offset:32,
				y: 44,
				skin: ["right"],
			},
			sprite: "leg",
			//animation: "people_swing_big"
		},
		leg2:
		{
			initial_vars:
			{
				angle: -30,
				x_offset:32,
				y: 44,
				skin: ["right"],
			},
			sprite: "leg",
			//animation: "people_swing_big",
		},
		head:
		{
			initial_vars:
			{
				x_offset: 32,
				y_offset: 64,
				y: -13,
				x: -2,
				angle: 20,
				skin:["face_right"]
			},
			animation: 
			[
				[10,	{ angle:[0,"damped"] }],
	//			[7, {skin:[["default"],"none"]}],
			],

			sprite: "head",
		}
	},
	resources:
	{
		head:
		{
			src: 
			{
				default: "head.svg",
				face_right: "head_side.svg",
				face_left: "head_left.svg",
			},
			width: 64,
			height: 64,
		},
		body:
		{
			src: "body.svg",
			width: 64,
			height: 64,
		},
		arm:
		{
			src:
			{
			 	right:"arm.svg",
			 	left:"arm_left.svg",
			},
			width: 64,
			height: 64,
		},
		leg:
		{
			src: 
			{
				right:"leg.svg",
				left: "leg_left.svg"
			},
			width: 64,
			height: 64,
		},
		bg:
		{
			src: "bg.png",
			width: 1280,
			height:1024
		}
	},
};