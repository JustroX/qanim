var timeline_main = 
{
	name: "main",
	version: "1.0.0",
	author: "JustroX",
	flow:
	{
		"2":
		[
			["promote","text_introducing",{opacity:0}],
		],
		"3":
		[
		],
		"4":
		[
		],
		"5":
		[
			["people","head",{skin:[["default"],"none"]}],
			["people","people1",{x:670}],
			["promote","text_introducing",{opacity:1}],
			["people","arm2",{x: 0,y:0,angle:[0,"swing",{amplitude:40,period:20}]}],
			["people","arm1",{x: 0,y:0,angle:[0,"swing",{amplitude:-40,period:20}]}],
			["people","leg1",{angle:[0,"swing",{amplitude:20,period:20}],x:0}],
			["people","leg2",{angle:[0,"swing",{amplitude:-20,period:20}],x:0}]
		],
		"6":
		[
			["people","arm2",{x: 0,y:0,angle:[30,"damped"]}],
			["people","arm1",{x: 0,y:0,angle:[-30,"damped"]}],
			["people","leg1",{angle:[-10,"damped2"]}],
			["people","leg2",{angle:[10,"damped2"]}]
		],
		"6.5":
		[
			["people","head",{angle:[0,"damped",{amplitude:2}]}],
		],
		"7":
		[
			["people","head",{skin:[["face_left"],"none"],angle:[-10,"damped"]}],
			["people","arm2",{skin:[["left"],"none"],x: 0,y:0,angle:[0,"damped"]}],
			["people","arm1",{						 x: 0,y:0,angle:[0,"damped"]}],
			["people","leg1",{skin:[["left"],"none"],x: 0,angle:[0,"damped"]}],
			["people","leg2",{						 x: 0,angle:[0,"damped"]}],	
		],
		"8":
		[
			["people","arm1",{x: [-7,"damped2"],y: [-5,"constant"],depth:[-2,"none"],angle:[-20,"damped"]}],
			["people","arm2",{x: [11,"damped2"],y: [-5,"constant"],angle:[20,"damped"],depth:[-2,"none"]}],

			["people","leg1",{angle:[0,"damped"],x:[-5,"damped"]}],
			["people","leg2",{angle:[0,"damped"],x:[5,"damped"]}],
			["people","head",{angle:[10,"damped"]}],
		],
		"8.5":
		[
			["promote","text_qanim_js",{x:-500,angle:10}],
		],
		"9":
		[
			["people","head",{angle:[-20,"damped"]}],
		],
		"9.5":
		[
			["people","head",{skin:[["default"],"none"],angle:[0,"damped"]}],
		],
		"10":
		[
			["people","arm2",{skin:[["right"],"none"],angle:20}],
			["promote","text_qanim_js",{x:[500,"damped"],angle:[0,"damped",{period:6}]}],
		],
		"11":
		[
			["people","arm2",{angle:[150,"swing",{amplitude:20}]}],
		]
	}
}