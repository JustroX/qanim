# qanim
Modular HTML5 canvas animator 

**This is repository is not updated. Updated source code is in the author's local device.**

### Quick Basic
**HTML:**
```html
<script type="text/javascript" src="qanim.js"></script>
<script type="text/javascript" src="qanim_package_manager.js"></script>
<canvas id="my_canvas"></canvas>
```
**JS:**
```js
var canvas = document.getElementById('my_canvas');

let scene = qanim.scene;
let res = qanim.res;
let anim = qanim.anim;

qanim.init(canvas);
qpm.import(["people","def1"],function()     //import scenes
{
	qpm.set_main("people","root");          //set main scenes
	qanim.start();                          //start animation
});
```
Sample output:

![Screenshot](https://raw.githubusercontent.com/JustroX/qanim/master/readme.png)

Tutorials about creating scenes will be published later.
