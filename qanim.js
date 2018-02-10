var qanim = 
{
	canvas: 0,
	canvas_src: 0,
	init: function(canvas)
	{
		qanim.canvas = canvas.getContext('2d');
		qanim.canvas_src = canvas;
		canvas.width = screen.width;
		canvas.height = screen.height;
	},
	start: function(func_)
	{
		func_();
		qanim.res.init();
		qanim.scene.play();
	},
	scene: 
	{
		SCENES: [],
		FPS: 30,
		main: 0,
		env:
		{
			x: 0,
			y: 0,
			x_offset: 0,
			y_offset: 0,
			angle: 0,
		},
		add: function()
		{
			var a = 
			{
				children: [],
				animations: [],
				time: [],
				x: 0,
				y: 0,
				x_offset: 0,
				y_offset: 0,
				angle: 0,
				scale:1,
				parent:0,
				addChildScene: function(scene)
				{
					a.children.push(scene);
					scene.parent = a;
				},
				addAnimation: function(animation)
				{
					var anim = Object.assign({},qanim.anim.ANIMATIONS[animation]);
					a.animations.push(anim);
				},

				begin_step: function(env){},
				step: function(env){},
				end_step: function(env){},
				draw: function(env){},

				define_step: function(_func){a.step = _func;},
				define_begin_step: function(_func){a.begin_step = _func;},
				define_end_step: function(_func){a.end_step = _func;},
				define_draw: function(_func){a.draw= _func;},

				adjust: function(env)
				{
					var b = {};
					b.x =env.x+ a.x + a.x_offset;
					b.y =env.y+ a.y + a.y_offset;
					b.angle =env.angle+ a.angle;
					return b;
				},

				run_step: function(env)
				{
					for(var i in a.animations)
					{
						a.animations[i].step(env,a);
					}
					a.step(env);
					env = a.adjust(env);
					for(var i in a.entities)
					{
						let e =	a.entities[i];
						e.step(env);
					}
					for(var i in a.children)
					{
						let e =	a.children[i];
						e.run_step(env);
					}
				},
				run_draw: function(env)
				{
					a.draw(env,qanim.canvas);
					env = a.adjust(env);	
					for(var i in a.entities)
					{
						let e =	a.entities[i];
						e.draw(env);
					}
					for(var i in a.children)
					{
						let e =	a.children[i];
						e.run_draw(env);
					}
				}

			};
			qanim.scene.SCENES.push(a);
			return a;
		},
		set_main: function(s)
		{
			qanim.scene.main  = s;
		},
		play: function()
		{
			if(qanim.scene.main)
				qanim.scene.loop();
			else
				console.log("ERR: Main scene is not defined");
		},
		loop: function()
		{
			let fps = qanim.scene.FPS;
			let c = qanim.canvas_src;
			qanim.canvas.clearRect(0,0,c.width,c.height);
			qanim.scene.main.run_step(qanim.scene.env);
			qanim.scene.main.run_draw(qanim.scene.env);
			setTimeout(qanim.scene.loop,1000/fps);
		},
	},
	anim:
	{
		ANIMATIONS: {},
		trans:
		{
			smooth: function(a,b,t1,t2,t,o)
			{
				var dt = t2-t1;
				var dy = b-a;
				var c = -Math.log(10*dy)/dt;
				return b-dy*Math.exp(c*(t-t1));
			},
			constant: function(a,b,t1,t2,t,o)
			{
				return a+(b-a)/(t2-t1)*(t-t1);
			},
			none: function(a,b,t1,t2,t,o)
			{
				return ((t-t1)>=t2-1) ? b:a;
			}
		},
		create: function(name)
		{
			var a =
			{
				name: name,
				anchors: {_pos:{},},
				/*
					{
						_pos: {x:1},
						x: [{time:100,val:2,trans:"none"}],
					}
				*/
				pos: 0,
				time: 0,
				host: 0,
				first_anchor: {},
				step: function(env,obj)
				{
					for(var i in a.anchors)
					{
						if(i=="_pos") continue;
						let pos = a.anchors._pos[i]+1;
						var anchor_init = 0;
						if(!(a.first_anchor[i]))
							a.first_anchor[i] = {time:0,val:obj[i],trans:"none"};						
						if(pos==0)
							anchor_init =a.first_anchor[i];
						else
							anchor_init = a.anchors[i][pos-1];
						if(pos<a.anchors[i].length)
						{
							let anchor_final = a.anchors[i][pos];
							let _a = anchor_init.val;
							let _b = anchor_final.val;
							let _t1 = anchor_init.time;
							let _t2 = anchor_final.time;
							let _o = anchor_final.param;
							obj[i] = qanim.anim.trans[anchor_final.trans](_a,_b,_t1,_t2,a.time,_o);
							if(a.time>_t2)
								a.anchors._pos[i]+=1;
						}
					}
					a.time++;
				}
			};
			qanim.anim.ANIMATIONS[name] = a;
		},
		/*
			{x:[2,"smooth",param],y:[30,"constant",param]}
		*/
		on: function(name,time,value)
		{
			let anim = qanim.anim.ANIMATIONS[name];
			for(var i in value)
			{
				if(!(anim.anchors[i]))
				{
					anim.anchors[i] = [];
					anim.anchors._pos[i] = -1;
				}
				anim.anchors[i].push({
					time: 	30*time,
					trans: 	value[i][1] || "constant",
					val: 	value[i][0] | value[i],
					param: value[i][2] || {},
				});
				anim.anchors[i].sort(function(a,b){return a.time-b.time;});
			}
		}
	},
	cache:
	{
		sin: [],
		cos: [],
		tan: [],
		init : function()
		{
			let cache = qanim.cache;
			for(var i=0; i<359; i++)
			{
				cache.sin.push(Math.sin(i));
				cache.cos.push(Math.cos(i));
				cache.tan.push(Math.tan(i));
			}
		},
		sin: function(x){return qanim.cache.sin[Math.floor(x) % 360];},
		cos: function(x){return qanim.cache.cos[Math.floor(x) % 360];},
		tan: function(x){return qanim.cache.tan[Math.floor(x) % 360];},
	},
	res:
	{
		SPRITES: {},
		sprlen: 0,
		loaded: 0,

		add_sprite: function(name,dir,width,height)
		{
			var img = new Image();
			img.onload = function()
			{
				img.ready = true;
				var ratio = img.width/img.height; 
				height = height | width/ratio;
				img.width = width;
				img.height = height;
				qanim.res.loaded+=1;
			}
			img.src  = dir;
			qanim.res.SPRITES[name] = img;
			qanim.res.sprlen+=1;
		},
		draw_sprite(name,env,obj)
		{
			if(!(qanim.res.SPRITES[name].ready)) return;
			let ctx = qanim.canvas;
			ctx.save();
			ctx.translate(Math.floor(env.x+obj.x),Math.floor(env.y+obj.y));
//			ctx.translate(Math.floor(obj.x_offset*obj.scale),Math.floor(obj.y_offset*obj.scale));
			ctx.rotate(((Math.floor(env.angle+obj.angle)+360)%360)/180*Math.PI);
			let img = qanim.res.SPRITES[name];
			ctx.drawImage(img,Math.floor(-obj.x_offset*obj.scale),Math.floor(-obj.y_offset*obj.scale),Math.floor(img.width*obj.scale),Math.floor(img.height*obj.scale));
			ctx.restore();
		},
		init: function(){},
		set_sprites: function(func_)
		{
			qanim.res.init = func_;
		},

	}
}