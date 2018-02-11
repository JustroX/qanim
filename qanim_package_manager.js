var qpm = 
{
	PACKAGES: {},
	import: function(name,func_=function(){})
	{
		let import_one = function(i)
		{
			if(i>=name.length)
			{
				func_();
				return;
			}
			let script = document.createElement('script');
			script.onload = function () {
			    qpm.import_package(window[name[i]]);
			   	import_one(i+1);
			};
			script.src = "packages/"+name[i]+"/main.js";
			document.getElementsByTagName('head')[0].appendChild(script); 
		}
		if(!(name instanceof Array))
			name = [name];
		import_one(0);
	},
	set_main: function(package,name)
	{
		qanim.scene.set_main(qpm.PACKAGES[package].ref[name]);
	},
	import_package: function(pack)
	{
		let name = pack.package;
		if(pack.dependencies)
		for(let i in pack.dependencies)
		{
			if(qpm.PACKAGES[i])
			{
				let version = qpm.PACKAGES[i].version;
				if(!(pack.dependencies[i].match(version)))
				{
					console.log("ERR: Dependency not updated: "+i+" "+pack.dependencies[i]);
					return;
				}
			}
			else
			{
				console.log("ERR: Missing dependency: "+i);
				return;
			}
		}
		qpm.PACKAGES[name] = pack;
		if(pack.resources)
			qpm.import_resources(name,pack.resources);
		if(pack.animations)
			qpm.import_animations(name,pack.animations);
		if(pack.transitions)
			qpm.import_transitions(name,pack.transitions);
		if(pack.scenes)
			qpm.import_scenes(name,pack.scenes);
	},
	import_animations: function(d,animations)
	{
		for(let i in animations)
		{			qanim.anim.create(i);
			for(let j in animations[i])
			{
				let e = animations[i][j];
				qanim.anim.on(i,e[0],e[1]);
			}
		}
	},
	import_scenes: function(d,scene)
	{
		let ref = {};
		for(let i in scene)
		{
			if(i=="main") continue;
			let s = qanim.scene.add();
			if(scene[i].initial_vars)
			for(let j in scene[i].initial_vars)
			{
				s[j] = scene[i].initial_vars[j];
			}
			if(scene[i].animation)
				s.addAnimation(scene[i].animation);
			if(scene[i].step)
				s.define_step(scene[i].step);
				s.define_draw(function(env){
					qanim.res.draw_sprite(d+scene[i].sprite,env,s);
					if(scene[i].draw)
					scene[i].draw(env);
				});
			ref[i] = s;
			qpm.PACKAGES[d].ref = ref;
		}
		for(let i in scene)
		{
			let children = scene[i].children;
			for(let j in children)
			{
				let child_name = children[j].name || children[j];
				let foreign_pack = children[j].package || "none";

				if(foreign_pack == "none")
				{
					ref[i].addChildScene(ref[child_name]);
				}
				else
				{
					ref[i].addChildScene(qpm.PACKAGES[foreign_pack].ref[child_name]);
				}
			}
		}
		qanim.scene.set_main(ref[scene.main]);
	},
	import_resources: function(d,res)
	{
		for(let i in res)
		{
			let o = res[i];
			qanim.res.add_sprite(d+i,"packages/"+d+"/res/"+o.dir,o.width,o.height);
		}
	},
	import_transitions: function(d,trans)
	{
		for(let i in trans)
		{
			qanim.anim.trans[i] = trans[i];
		}
	}
}