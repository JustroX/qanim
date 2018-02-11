var def1 = 
{
	package: "def1",
	creator: "justroX",
	version: "1.0.0",
	transitions:
	{
		damped: function(a,b,t1,t2,t,o)
		{
			let period = o.period || (1/o.frequency) || 20;
			let amp = Math.exp(-(t-t1)*Math.log(Math.abs(10*(a-b)))/(t2-t1));
			return (amp*(a-b)*qanim.cache.cos(360/period*(t-t1)) + b);
		}
	},
}