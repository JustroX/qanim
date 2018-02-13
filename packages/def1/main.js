var def1 = 
{
	package: "def1",
	creator: "justroX",
	version: "1.0.0",
	animations:
	{
		fadeIn:
		[
			[0, {opacity: 0}],
			[1, {opacity: 1}]
		],
		fadeOut:
		[
			[0, {opacity: 1}],
			[1, {opacity: 0}]
		],
		fadeInFast:
		[
			[0, {opacity: 0}],
			[0.4, {opacity: 1}]
		],
		fadeOutFast:
		[
			[0, {opacity: 1}],
			[0.4, {opacity: 0}]
		],
		ascendIn:
		[
			[0,{y:10,animation_play:"fadeIn"}],
			[1,{y:0}]
		],
		shake:
		[
			[0,{angle:20}],
			[3,{angle:[0,"damped",{period:5}]}],
		]
	},
	transitions:
	{
		damped: function(a,b,t1,t2,t,o)
		{
			let period = o.period || (1/o.frequency) || 20;
			let base_amp = o.amplitude || 0;
			let amp = Math.exp(-(t-t1)*Math.log(Math.abs(10*(a-b)))/(t2-t1));
			return ((amp*(a-b)+base_amp)*qanim.cache.cos(360/period*(t-t1)) + b);
		},
		slow_in_out: function(a,b,t1,t2,t,o)
		{
			var tanh = function(x)
			{
				return x/(1+x*x/(3+x*x/(5+x*x/(7))));
			}
			let d = b-a;
			let xx  = t-t1;
			let tt = t2-t1;
			return a+d*(0.5*tanh(6*xx/tt-3)+0.5);
		}
	},
	scenes:
	{
		camera:
		{
			initial_vars:
			{
				x:0,
				y:0,
				width:0,
				height:0,
				angle: 0,
			},
			behaviors: ["act_as_camera"],
		}
	},
	behaviors:
	{
		act_as_camera: function(env,obj)
		{
			qanim.scene.camera.width = obj.width;
			qanim.scene.camera.height = obj.height;
			qanim.scene.camera.y = obj.y;
			qanim.scene.camera.x = obj.x;
			qanim.scene.camera.angle = obj.angle;
		}
	}
}