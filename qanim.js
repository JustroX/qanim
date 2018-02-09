var qanim = 
{
	scene: 
	{
		SCENES: [],
		add: function()
		{
			var a = 
			{
				entities: [],
				children: [],
				time: [],
				x: 0,
				y: 0,
				x_offset: 0,
				y_offset: 0,
				angle: 0,
			};
			return a;
		}
	},
	entity:
	{
		add: function()
		{
			var a = 
			{
				x: 0,
				y: 0,
				x_offset: 0,
				y_offset: 0,
				angle: 0,
				res:
				{
					image: 0,
				},
				temp: {},
				step: function()
				{
					
				}
			}
			return a;
		},
		show: function()
		{

		},
	},
	move:
	{

	},
	cache:
	{
		sin: [],
		cos: [],
		tan: [],
		init : function()
		{

		},
	}
}