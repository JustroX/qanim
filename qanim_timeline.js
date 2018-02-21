var qt = 
{
	set: function(string,func_=function(){;})
	{
		let script = document.createElement('script');
		script.onload = function()
		{
			qt.assign(window["timeline_"+string],func_);
		};
		script.src = "timelines/timeline_"+string+".js";
		document.getElementsByTagName('head')[0].appendChild(script); 
	},
	assign: function(timeline,func_)
	{
		let temp = {};
		for(let i in timeline.flow)
		{
			let event = timeline.flow[i];
			for(let j in event)
			{
				let scene = event[j];
				let package  = scene[0];
				let sname = scene[1];
				let property = scene[2];
				
				if(!temp[package]) temp[package]={};
				if(!temp[package][sname]) temp[package][sname] = [];
				temp[package][sname].push([parseInt(i),property]);
			}
		}
		for( let pack in temp)
		{
			for( let sc in temp[pack])
			{
				let temp_anim_name = "timeline_"+timeline.name +"_"+ qpm.util.hash();
				let e_anim = temp[pack][sc];
				qanim.anim.create(temp_anim_name);
				for(let anchor in e_anim)
				{
					let e = e_anim[anchor];
					qanim.anim.on(temp_anim_name,e[0],e[1]);
				}
				let s = qpm.PACKAGES[pack].ref[sc];
				s.addAnimation(temp_anim_name);
			}
		}
		func_();
	}

}