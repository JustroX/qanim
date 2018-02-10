var qpm = 
{
	import(pack)
	{
		var name = pack.package;
		qpm.import_resources(name,pack.resources);
		qpm.import_animations(name,pack.animations);
		qpm.import_transitions(name,pack.transitions);
		qpm.import_scenes(name,pack.scenes);
	},
	import_animations: function(d,animations)
	{
		for(var i in animations)
		{
			console.log(i);
			qanim.anim.create(i);
			for(var j in animations[i])
			{
				let e = animations[i][j];
				qanim.anim.on(i,e[0],e[1]);
			}
		}
	},
	import_scenes: function(d,scene)
	{
		var ref = {};
		for(var i in scene)
		{
			if(i=="main") continue;
			var s = qanim.scene.add();
			for(var j in scene[i].initial_vars)
			{
				s[j] = scene[i].initial_vars[j];
			}
			s.addAnimation(scene[i].animation);
			s.define_step(scene[i].step);
			s.define_draw(function(env){
				qanim.res.draw_sprite(d+scene[i].sprite,env,s);
				scene[i].draw(env);
			});
			ref[i] = s;
		}
		for(var i in scene)
		{
			let children = scene[i].children;
			for(var j in children)
			{
				ref[i].addChildScene(ref[children[j]]);
			}
		}
		qanim.scene.set_main(ref[scene.main]);
	},
	import_resources: function(d,res)
	{
		for(var i in res)
		{
			let o = res[i];
			qanim.res.add_sprite(d+i,o.dir,o.width,o.height);
		}
	},
	import_transitions: function(d,trans)
	{
		for(var i in trans)
		{
			qanim.anim.trans[i] = trans[i];
		}
	}
}