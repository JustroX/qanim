var qanim = 
{
	canvas: 0,
	canvas_src: 0,
	init: function(canvas,param={})
	{
		qanim.cache.init();
		qanim.canvas = canvas.getContext('2d');
		qanim.canvas_src = canvas;
		canvas.width = param.width || screen.width;
		canvas.height = param.height || screen.height;
	},
	start: function(func_=function(){;})
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
			gscalex: 1,
			gscaley: 1,
		},
		camera:
		{
			x: 60,
			y: 0,
			width: 0,
			height: 0,
			angle: 0,
			init: function()
			{
				let c = qanim.scene.camera;
				c.width = c.width || qanim.canvas_src.width;
				c.height = c.height || qanim.canvas_src.height;
				let nenv = JSON.parse(JSON.stringify(qanim.scene.env));
			//	nenv.angle += c.angle;
				nenv.gscalex = qanim.canvas_src.width/c.width;
				nenv.gscaley = qanim.canvas_src.height/c.height;
			//	nenv.x -= c.x;
			//	nenv.y -= c.y;
				return nenv;
			}
		},
		add: function()
		{
			let a = 
			{
				children: [],
				animations: [],
				behaviors: [],
				time: [],
				x: 0,
				y: 0,
				x_offset: 0,
				y_offset: 0,
				angle: 0,
				scale:1,
				scalex:1,
				scaley:1,
				gscalex: 1,
				gscaley: 1,
				parent:0,
				depth:0,
				opacity: 1,
				addChildScene: function(scene)
				{
					a.children.push(scene);
					scene.parent = a;
				},
				addAnimation: function(animation)
				{
					if(!(qanim.anim.ANIMATIONS[animation]))
					{
						console.log("ERR: Animation "+animation+" is not defined");
						return;
					}
					let anim = Object.assign({},qanim.anim.ANIMATIONS[animation]);
					anim.first_anchor = JSON.parse(JSON.stringify(anim.first_anchor));
					a.animations.push(anim);
				},
				addBehavior: function(behavior)
				{
					a.behaviors.push(behavior);
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
					let b = {};
					b.x =env.x+ a.x ;//+ a.x_offset;
					b.y =env.y+ a.y ;//+ a.y_offset;
					b.angle =env.angle+ a.angle;
					b.gscalex = a.gscalex * env.gscalex;
					b.gscaley = a.gscaley * env.gscaley;

					return b;
				},

				run_step: function(env)
				{
					for(let i in a.animations)
					{
						a.animations[i].step(env,a,i);
					}
					//execute all behaviors
					for(let i in a.behaviors)
					{
						if(qanim.behaviors.BEHAVIORS[a.behaviors[i]])
							qanim.behaviors.BEHAVIORS[a.behaviors[i]](env,a);
					}
					a.step(env);
					env = a.adjust(env);
					for(let i in a.children)
					{
						let e =	a.children[i];
						e.run_step(env);
					}
				},
				run_draw: function(env)
				{
					let todrawlater = [];
					let start_env =Object.assign({},env);
					env = a.adjust(env);
					a.children.sort(function(a,b){return -a.depth+b.depth;});
					for(let i in a.children)
					{
						let e =	a.children[i];
						if(e.depth<=a.depth)
							todrawlater.push(e);
						e.run_draw(env);
					}
					todrawlater.sort(function(a,b){return -a.depth+b.depth;});
					a.draw(start_env,qanim.canvas);	
					for(let i in todrawlater)
					{
						let e =	todrawlater[i];
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
			let cenv = qanim.scene.camera.init();
			qanim.canvas.clearRect(0,0,c.width,c.height);
			qanim.scene.main.run_step(cenv);
			qanim.scene.main.run_draw(cenv);
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
				let dt = t2-t1;
				let dy = b-a;
				let c = -Math.log(10*dy)/dt;
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
			let a =
			{
				name: name,
				anchors: {_pos:{},},
				/*
					{
						_pos: {x:1,play_animation,},
						x: [{time:100,val:2,trans:"none"}],
						play_animation: [{time:100,val:"animation_name"}]
					}
				*/
				animations: {},
				pos: 0,
				time: 0,
				host: 0,
				stopped: 0,
				first_anchor: {},
				step: function(env,obj,c,parent=null)
				{
					parent = parent || obj;
					if(parent.animations[c].stopped) return;
					for(let i in parent.animations[c].anchors)
					{
						if(i=="animation_play")
						{
							for(let j in parent.animations[c].animations) //for each animation
							{
								for(let k in parent.animations[c].anchors[i]) //for each achor  point
								{
									if(parent.animations[c].anchors[i][k].val == j)
									if(parent.animations[c].time>=parent.animations[c].anchors[i][k].time)
									{	
										let child_anim = parent.animations[c].animations[j];
										child_anim.step(env,obj,j,parent.animations[c]);
									}
								}
							}
							continue;
						}
						if(i=="animation_stop")
						{
							for(let k in parent.animations[c].anchors[i])
							{
								let w = parent.animations[c].anchors[i][k];
								if(w.time<=parent.animations[c].time)
								{
									for(let j in parent.animations[c].animations) //for each animation
									{
										if(parent.animations[c].anchors[i][k].val == j)
											parent.animations[c].animations[j].stopped=1;	
									}
								}
							}
						}
						if(i=="_pos") continue;
						let pos = parent.animations[c].anchors._pos[i]+1;
						let anchor_init = 0;
						if(!(parent.animations[c].first_anchor[i]))
							parent.animations[c].first_anchor[i] = {time:0,val:obj[i],trans:"none"};						
						if(pos==0)
							anchor_init =parent.animations[c].first_anchor[i];
						else
							anchor_init = parent.animations[c].anchors[i][pos-1];
						if(pos<parent.animations[c].anchors[i].length)
						{
							let anchor_final = parent.animations[c].anchors[i][pos];
							let _a = anchor_init.val;
							let _b = anchor_final.val;
							let _t1 = anchor_init.time;
							let _t2 = anchor_final.time;
							let _o = anchor_final.param;
							obj[i] = qanim.anim.trans[anchor_final.trans](_a,_b,_t1,_t2,parent.animations[c].time,_o);
							if(parent.animations[c].time>_t2)
								parent.animations[c].anchors._pos[i]+=1;
						}
					}
					parent.animations[c].time++;
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
			for(let i in value)
			{
				if(!(value[i] instanceof Array))
					value[i] = [value[i]];
				if(i=="animation_play")
				{
					if(qanim.anim.ANIMATIONS[value[i][0]])
					{						
						let temp_anim = Object.assign({},qanim.anim.ANIMATIONS[value[i][0]]);
						temp_anim.first_anchor = JSON.parse(JSON.stringify(temp_anim.first_anchor));
						anim.animations[value[i][0]] = temp_anim;
					}
					else
					{
						console.log("ERR: Animation "+(value[i][0])+" is not defined.");
						continue;
					}
				}
				if(!(anim.anchors[i]))
				{
					anim.anchors[i] = [];
					anim.anchors._pos[i] = -1;
				}
				anim.anchors[i].push({
					time: 	30*time,
					trans: 	value[i][1] || "constant",
					val: 	value[i][0],
					param: value[i][2] || {},
				});
				anim.anchors[i].sort(function(a,b){return a.time-b.time;});
			}
		}
	},
	cache:
	{
		sin_: [],
		cos_: [],
		tan_: [],
		init : function()
		{
			let cache = qanim.cache;
			for(let i=0; i<359; i++)
			{
				cache.sin_.push(Math.sin(i/180*Math.PI));
				cache.cos_.push(Math.cos(i/180*Math.PI));
				cache.tan_.push(Math.tan(i/180*Math.PI));
			}
		},
		sin: function(x){return qanim.cache.sin_[Math.floor(x+360) % 360];},
		cos: function(x){return qanim.cache.cos_[Math.floor(x+360) % 360];},
		tan: function(x){return qanim.cache.tan_[Math.floor(x+360) % 360];},
	},
	behaviors:
	{
		BEHAVIORS: {},
		add: function(name,func)
		{
			qanim.behaviors.BEHAVIORS[name] = func;
		},
	},
	res:
	{
		SPRITES: {},
		sprlen: 0,
		loaded: 0,

		add_sprite: function(name,dir,width,height)
		{
			let img = new Image();
			img.onload = function()
			{
				img.ready = true;
				let ratio = img.width/img.height; 
				height = height | width/ratio;
				img.width = width;
				img.height = height;
				qanim.res.loaded+=1;
			}
			img.src  = dir;
			qanim.res.SPRITES[name] = img;
			qanim.res.sprlen+=1;
		},
		draw_sprite: function(name,env,obj)
		{
			
			if(!(qanim.res.SPRITES[name].ready)) return;
			let ctx = qanim.canvas;
			ctx.save();
			//matrix
			let _a = qanim.cache.sin(qanim.scene.camera.angle);
			let _b = qanim.cache.cos(qanim.scene.camera.angle);
			
			let _cx = qanim.scene.camera.x;
			let _cy = qanim.scene.camera.y;

			let xxx = -_cx*_b - _cy*_a;
			let yyy = -_cx*_a + _cy*_b;
			//end matrix
			ctx.translate(xxx,yyy);


			let w = qanim.scene.camera.width/2;
			let h = qanim.scene.camera.height/2;

			ctx.translate(w,h);
			//matrix

			let _xx = -w*_b + h*_a;
			let _yy = -w*_a - h*_b;

			ctx.translate(_xx,_yy);
			//end matrix
			ctx.rotate(((Math.floor(qanim.scene.camera.angle)+360)%360)/180*Math.PI);

			ctx.rotate(((-Math.floor(env.angle)+360)%360)/180*Math.PI);
			let _x = Math.floor((env.x+obj.x)*env.gscalex);
			let _y = Math.floor((env.y+obj.y)*env.gscaley);
			ctx.translate(_x,_y);
			ctx.rotate(((-Math.floor(obj.angle)+360)%360)/180*Math.PI);
			let img = qanim.res.SPRITES[name];
			ctx.globalAlpha = obj.opacity;
			let xx = Math.floor(-obj.x_offset*obj.scale*obj.scalex*env.gscalex);
			let yy = Math.floor(-obj.y_offset*obj.scale*obj.scaley*env.gscaley);
			ctx.drawImage(img,xx,yy,Math.floor(img.width*obj.scale*obj.scalex*env.gscalex),Math.floor(img.height*obj.scale*obj.scaley*env.gscaley));
			
			ctx.restore();
		},
		draw_text: function(text,x,y,abs)
		{
			let ctx = qanim.canvas;
			
		},
		shape:
		{
			SHAPES: {},
			add: function(name,path,closed)
			{
				qanim.res.shape.SHAPES[name] = {path:path,closed:closed};
			},
		},
		font:
		{
			FONTS: [],
			add: function(fonts)
			{
				qanim.res.font.FONTS = qanim.res.font.FONT.concat(fonts); 
			},
			init : function()
			{
				if(!(WebFont)) return;
				WebFont.load({
					google:
					{
					  families: qanim.res.font.FONTS,
					},
					timeout:5000,
					fontactive: function(familyName,fvd){;},
				});
			}
		},
		init: function(){},
		set_sprites: function(func_)
		{
			qanim.res.init = func_;
		},
	}
}