var promote = 
{
	package: "promote",
	author: "justrox",
	version: "1.0.0",
	animations:
	{
	},
	scenes:
	{
		root:
		{
			children: ["text_introducing","text_qanim_js",{package:"people",name:"people1"}],
		},
		text_introducing:
		{
			initial_vars:
			{
				opacity:0,
				x: 590,
				y: 120,
			},
			text: {val:"<p>Introducing</p>",property:{fontFamily:"'Fredoka One', cursive",fontSize:"30px"}},
		},
		text_qanim_js:
		{
			initial_vars:
			{
				x: -500,
				y: 200,
			},
			text: {val:"<h1>Qanim.js</h1>",property:{fontFamily:"'Bangers', cursive",fontSize:"50px",letterSpacing:"10px"}},
		}
	}
};