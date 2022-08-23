// ===============
// ***---***---***
// *** 開始設定pixi.js與定義常用簡寫變數, 將實體輸出至畫面
// ***---***---***
// ===============

// pixi type
(function(){
    let type = "WebGL"
    if (!PIXI.utils.isWebGLSupported()) { type = "canvas" }
    PIXI.utils.sayHello(type)
})();

// Aliases
const Application = PIXI.Application;

const devicePixelRatio = $(window).devicePixelRatio;

// Create a Pixi Application
const app = new Application({
	width: 800,
	height: 500,
	antialias: false,
	transparent: false,
    resolution: 1,
    backgroundColor: 0x91CC60,
    roundPixels: true,
});

// Aliases
const Container = PIXI.Container,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    appWidth = app.renderer.view.width,
    appHeight = app.renderer.view.height;

// 將實體加載到html位置上
$('#canvas_outer').append(app.view);

// ===============
// ***---***---***
// *** 一些常用的功能整理成function
// ***---***---***
// ===============

const common = {
    // 如果暫時不要接 api, ifDev改成 true, 會跳過所有 api環節用預寫好的 data做開發
    ifDev: true,
    // 把東西加到container或stage
    addChildToContainer: (container, elems) => {
        elems.forEach(elem => {
            container.addChild(elem);
        });
    },
    // 把東西從container或stage移除
    removeChildFromContainer: (container, elems) => {
        elems.forEach(elem => {
            container.removeChild(elem);
        });
    },
    // 設定Sprite
    setSprite: ({
            elem,
            texture,
            interactive,
            w = 0, h = 0, x = 0, y = 0,
            anchorX = 0.5,
            anchorY = 0.5,
            angle = 0,
            rotation = 0,
            alpha = 1,
            func = null,
        }) => {
        texture ? elem.texture = texture : '';
        interactive ? elem.interactive = interactive : '';
        elem.width = w;
        elem.height = h;
        elem.position.set(x, y);
        elem.anchor.set(anchorX, anchorY);
        elem.angle = angle;
        elem.rotation = rotation;
        elem.alpha = alpha;
        if(func){
            func();
        }
    },
    setText: ({
        elem,
        text,
        // w = 0, h = 0, 
        x = 0, y = 0,
        anchorX = 0.5,
        anchorY = 0.5,
        angle = 0,
        alpha = 1,
        style,
    }) => {
        elem.text = text;
        style ? elem.style = style : '';
        // elem.width = w;
        // elem.height = h;
        elem.position.set(x, y);
        elem.anchor.set(anchorX, anchorY);
        elem.angle = angle;
        elem.alpha = alpha;
    },
    // 綁事件
    bindEvent: (target, e, toDoFunction) => {
        target.on(e, function(){
            toDoFunction();
        });
    },
    // 改變Sprite
    changeTexture: function(sprite, texture){
        sprite.texture = texture
    },
    changeSize: function(sprite, {w, h}){
        w ? sprite.width = w : '';
        h ? sprite.height = h : '';
    },
    changePosition: function(sprite, {x, y}){
        x ? sprite.x = x : '';
        y ? sprite.y = y : '';
    },
    changeInteractive: function(sprite, interactive){
        sprite.interactive = interactive;
    },
}

// ===============
// ***---***---***
// *** loader先載入資源
// ***---***---***
// ===============

loader
    .add([
    ])
    .load(() => { 

    });



// 暫時
const Scene1 = new CreateScene1();
Scene1.init();


// ===============
// ***---***---***
// *** 建構式
// ***---***---***
// ===============

// 背景
function CreateScene1(){
    let self = this;

    this.nowActive = null;
    this.wall1 = new Graphics();
    this.wall2 = new Graphics();
    this.wall3 = new Graphics();
    this.init = function(){
        self.setWall1(0xeeeeee);
        common.bindEvent(
            self.wall1,
            'pointerdown',
            () => {
                self.selectWall(0);
            }
        );

        self.setWall2(0xd3d3d3);
        common.bindEvent(
            self.wall2,
            'pointerdown',
            () => {
                self.selectWall(1);
            }
        );

        self.setWall3(0xdddddd);
        common.bindEvent(
            self.wall3,
            'pointerdown',
            () => {
                self.selectWall(2);
            }
        );

        common.addChildToContainer(app.stage, [self.wall1, self.wall2, self.wall3]);
    }
    this.setWall1 = function(color){
        self.wall1.beginFill(color);
        // self.wall1.drawRect(0, 0, 200, 500);
        self.wall1.moveTo(0, 0);
        self.wall1.lineTo(200, 0);
        self.wall1.lineTo(200, 300);
        self.wall1.lineTo(400, 350);
        self.wall1.lineTo(400, 500);
        self.wall1.lineTo(0, 500);
        self.wall1.lineTo(0, 0);
        self.wall1.closePath();
        self.wall1.endFill();
        self.wall1.interactive = true;
    }
    this.setWall2 = function(color){
        self.wall2.beginFill(color);
        // self.wall2.drawRect(200, 0, 400, 500);
        self.wall2.moveTo(200, 0);
        self.wall2.lineTo(600, 0);
        self.wall2.lineTo(600, 500);
        self.wall2.lineTo(400, 500);
        self.wall2.lineTo(400, 350);
        self.wall2.lineTo(200, 300);
        self.wall2.lineTo(200, 0);
        self.wall2.endFill();
        self.wall2.interactive = true;
    }
    this.setWall3 = function(color){
        self.wall3.beginFill(color);
        self.wall3.drawRect(600, 0, 200, 500);
        self.wall3.endFill();
        self.wall3.interactive = true;
    }
    this.selectWall = function(index){
        self.nowActive = index;
        console.log(self.nowActive);
    }
    this.changeWallColor = function(color){
        if(typeof(self.nowActive) == 'number'){
            const walls = [self.setWall1, self.setWall2, self.setWall3];
     
            walls[self.nowActive](color);
        }
    }
}