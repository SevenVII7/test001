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
	width: 830,
	height: 600,
	antialias: true,
	transparent: false,
    resolution: 1,
    backgroundColor: 0xffffff,
    roundPixels: true,
    autoDensity: true,
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
        x = 0, y = 0,
        anchorX = 0.5,
        anchorY = 0.5,
        angle = 0,
        alpha = 1,
        style,
    }) => {
        elem.text = text;
        style ? elem.style = style : '';
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
// *** 資料和控制function
// ***---***---***
// ===============

// 場景資料
const roomData = {
    nowRoomName: null,
    nowRoomIndex: null,
    roomScenes: [
        new CreateScene({
            name : 'bedroomA',
            cover: "bedroomA-cover",
            background: "bedroomA-main",
            walls: [
                {
                    wall: new Graphics(),
                    setWall: function(color, alpha){
                        this.wall.clear();
                        this.wall.alpha = alpha;
                        this.wall.beginFill(color);
                        this.wall.drawRect(0, 0, 350, 600);
                        this.wall.endFill();
                        this.wall.interactive = true;
                    },
                    cardCreate: () => { return $(createColorCard({x:3, y:20})).appendTo("#canvas_outer") },
                    card: null,
                },
                {
                    wall: new Graphics(),
                    setWall: function(color, alpha){
                        this.wall.clear();
                        this.wall.alpha = alpha;
                        this.wall.beginFill(color);
                        this.wall.drawRect(350, 0, 450, 600);
                        this.wall.endFill();
                        this.wall.interactive = true;
                    },
                    cardCreate: () => { return $(createColorCard({x:40, y:10})).appendTo("#canvas_outer") },
                    card: null,
                },
            ]
        }),
        new CreateScene({
            name : 'bedroomB',
            cover: "bedroomB-cover",
            background: "bedroomB-main",
            walls: [{
                wall: new Graphics(),
                setWall: function(color, alpha){
                    console.log(this);
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(0, 0, 830, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:25, y:30})).appendTo("#canvas_outer") },
                card: null,
            }],
        }),
        new CreateScene({
            name : 'bedroomC',
            cover: "bedroomC-cover",
            background: "bedroomC-main",
            walls: [{
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(0, 0, 200, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:1.5, y:10})).appendTo("#canvas_outer") },
                card: null,
            },
            {
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(200, 0, 630, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:22, y:35})).appendTo("#canvas_outer") },
                card: null,
            }],
        }),
        new CreateScene({
            name : 'bedroomD',
            cover: "bedroomD-cover",
            background: "bedroomD-main",
            walls: [{
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.moveTo(0, 0);
                    this.wall.lineTo(465, 0);
                    this.wall.lineTo(465, 356);
                    this.wall.lineTo(0, 390);
                    this.wall.lineTo(0, 0);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:3, y:20})).appendTo("#canvas_outer") },
                card: null,
            },
            {
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.moveTo(465, 0);
                    this.wall.lineTo(830, 0);
                    this.wall.lineTo(830, 373);
                    this.wall.lineTo(696, 367);
                    this.wall.lineTo(695, 17);
                    this.wall.lineTo(528, 52);
                    this.wall.lineTo(530, 358);
                    this.wall.lineTo(465, 356);
                    this.wall.lineTo(465, 0);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:47, y:8})).appendTo("#canvas_outer") },
                card: null,
            },
            {
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.moveTo(0, 390);
                    this.wall.lineTo(465, 356);
                    this.wall.lineTo(530, 358);
                    this.wall.lineTo(528, 52);
                    this.wall.lineTo(695, 17);
                    this.wall.lineTo(696, 367);
                    this.wall.lineTo(830, 373);
                    this.wall.lineTo(830, 600);
                    this.wall.lineTo(0, 600);
                    this.wall.lineTo(0, 390);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:57, y:42})).appendTo("#canvas_outer") },
                card: null,
            }],
        }),
        new CreateScene({
            name : 'dinningroomA',
            cover: "dinningroomA-cover",
            background: "dinningroomA-main",
            walls: [{
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(0, 0, 126, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:1.5, y:30})).appendTo("#canvas_outer") },
                card: null,
            },
            {
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.moveTo(126, 0);
                    this.wall.lineTo(685, 0);
                    this.wall.lineTo(687, 500);
                    this.wall.lineTo(126, 500);
                    this.wall.lineTo(126, 0);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:20, y:10})).appendTo("#canvas_outer") },
                card: null,
            },
            {
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.moveTo(685, 0);
                    this.wall.lineTo(830, 0);
                    this.wall.lineTo(830, 600);
                    this.wall.lineTo(687, 500);
                    this.wall.lineTo(685, 0);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:72, y:15})).appendTo("#canvas_outer") },
                card: null,
            }]
        }),
        new CreateScene({
            name : 'dinningroomB',
            cover: "dinningroomB-cover",
            background: "dinningroomB-main",
            walls: [{
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(0, 0, 405, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:4, y:15})).appendTo("#canvas_outer") },
                card: null,
            },
            {
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(405, 0, 830, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:52, y:25})).appendTo("#canvas_outer") },
                card: null,
            }]
        }),
        new CreateScene({
            name : 'livingroomB',
            cover: "livingroomB-cover",
            background: "livingroomB-main",
            walls: [{
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(0, 0, 318, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:4, y:10})).appendTo("#canvas_outer") },
                card: null,
            },
            {
                wall: new Graphics(),
                setWall: function(color, alpha){
                    this.wall.clear();
                    this.wall.alpha = alpha;
                    this.wall.beginFill(color);
                    this.wall.drawRect(318, 0, 830, 600);
                    this.wall.endFill();
                    this.wall.interactive = true;
                },
                cardCreate: () => { return $(createColorCard({x:42, y:20})).appendTo("#canvas_outer") },
                card: null,
            }]
        }),
    ]
};

// 油漆原始資料, 接json用
let paintData = [
    {
        index: 1,
        class: "淺",
        uuid: "OW041-4",
        colorName: "霜花白",
        colorNameEn: "Frost White",
        sR: 240,
        sG: 241,
        sB: 237
    },
];

// 要顯示的油漆資料
let showPaintData = [];

// 目前是否在我的最愛中
let ifInFav = false;

// 更換空間lightbox內的swiper的控制用變數
let roomSwiper = null;

// 載入場景
function gameSet(roomName, { index = 0 } = {}){
    // 將實體加載到html位置上
    $('#canvas_outer').append(app.view);
    if(index) {
        roomData.roomScenes[index].init();
        roomData.nowRoomName = roomData.roomScenes[index].name;
        roomData.nowRoomIndex = index;
    } else if(roomName) { 
        const roomIndex = (
            () => {
                return roomData.roomScenes.findIndex((elem) => {
                    return elem.name == roomName;
                });
            }
        )();
        roomData.roomScenes[roomIndex].init();
        roomData.nowRoomName = roomData.roomScenes[roomIndex].name;
        roomData.nowRoomIndex = roomIndex;
    }
}

// 移除現有場景
function removeRoom(){
    $('#canvas_outer').empty();
}

// 變換場景
function changeRoom(roomName){
    removeRoom();
    gameSet(roomName)
}

// 變換所選牆面的顏色, 掛在html上的function
function changeSelectWallColor(color){
    roomData.roomScenes[roomData.nowRoomIndex].changeWallColor(
        color,
        () => { hintbox('請先選擇區域'); }
    );
}

// 變換更換空間內的swiper
function changeRoomPreviewSwiper(rooms){
    $('#place_lightbox .room_preview .swiper_outer')
        .empty();
    $(createRoomPreviewSwiper({rooms}))
        .appendTo('#place_lightbox .room_preview .swiper_outer') ;

    roomSwiper = new Swiper('#place_lightbox .room_preview .swiper_outer .swiper', {
        loop: true,
        slidesPerView: 1,
        speed: 500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// 切換至我的最愛
function toggleFavMode(){
    if(ifInFav){
        $('#toggle_fav_mode').html(`
            <img src="img/icon/collect.svg" alt="">
            <p class="txt-grey txt-medium">
                我的清單色
            </p>
        `);
    } else {
        $('#toggle_fav_mode').html(`
            <p class="txt-grey txt-medium txt-center" style="width: 100%;">
                回到色彩清單
            </p>
        `)
    }
    ifInFav = !ifInFav;
    refreshPaint();
}

// 提示訊息
let hintboxTimtout = null;
function hintbox(hint){
    $('#hintbox').remove();
    $('#canvas_outer').append(createHintbox({hint}));
    clearTimeout(hintboxTimtout);
    hintboxTimtout = setTimeout(() => {
        closeHintbox();
    }, 5000);
}

// 關閉提示訊息
function closeHintbox(){
    $('#hintbox').fadeOut(300, () => { $('#hintbox').remove(); });
}

// 取得所有油漆資料 (執行一次)
function getAllPaint(method, url, fn){
    axios({
        method,
        url,
    })
    .then((response) => {
        console.log(response.data);
        paintData = [];
        paintData = response.data;
        showPaintData = [];
        showPaintData = response.data;
        if(fn){
            fn();
        }
    })
    .catch((error) => {console.log(error.message)})
}

// 刷新油漆色票
function refreshPaint(){
    // 我的最愛模式
    if(ifInFav){
        let myFav = JSON.parse(localStorage.getItem('myFav'));
        showPaintData = [];
        if(myFav){
            paintData.forEach((elemP) => {
                myFav.forEach((elemF) => {
                    if(elemP.uuid == elemF){
                        showPaintData.push(elemP);
                    }
                })
            });
        }
        setPaint(showPaintData);
    }
    // 一般模式
    else{
        showPaintData = paintData;
        setPaint(showPaintData);
    }
}

// 建立油漆items
function setPaint(paints){
    let coloritemStr = ''
    $('#color_menu .colors').empty();
    paints.forEach((elem) => {
        coloritemStr += createColorItem(
            {
                sR: elem.sR,
                sG: elem.sG,
                sB: elem.sB,
                colorName: elem.colorName,
                uuid: elem.uuid,
            }
        )
    });
    $(coloritemStr).appendTo('#color_menu .colors');
}

// 加入/移除我的最愛, 掛在html上的function
function changeFavState(uuid){
    let myFav = JSON.parse(localStorage.getItem('myFav'));
    let ifRepeat = false;
    let rerepeatIndex = null;
    console.log('init:', myFav);
    if(myFav && myFav.length){
        myFav.forEach((elem, i) => {
            console.log(elem)
            if(elem == uuid){
                ifRepeat = true;
                rerepeatIndex = i;
                return;
            }
        });
        if(ifRepeat){
            myFav.splice(rerepeatIndex, 1);
            localStorage.setItem('myFav', JSON.stringify(myFav));
            console.log('remove', uuid);
        } else {
            myFav.push(uuid);
            localStorage.setItem('myFav', JSON.stringify(myFav));
            console.log('push', uuid);
        }
    } else {
        console.log('first push:', uuid);
        localStorage.setItem('myFav', `["${uuid}"]`);
    }
    console.log('end:', JSON.parse(localStorage.getItem('myFav')));
    refreshPaint();
}

// 清除我的最愛
function clearFav(){
    localStorage.removeItem('myFav');
}


// ===============
// ***---***---***
// *** 建構式 or 創建html結構相關的function
// ***---***---***
// ===============

// 選擇顏色卡片的結構
function createColorCard({
    x = 0,
    y = 0,
} = {}){
    return colorCardStr = `
        <div class="color_card" style="top: ${y}%; left: ${x}%;">
            <figure>
                <img src="img/icon/prompt.svg" alt="">
                <div class="color_preview"></div>
            </figure>
            <p class="txt-center">
                選擇顏色
            </p>
            <img src="img/icon/add.svg" class="add" alt="">
        </div>
    `;
}

// 提示訊息
function createHintbox({
    hint = ''
} = {}){
    return `
        <div id="hintbox">
            <img
                src="img/icon/close.svg"
                class="close"
                onclick="closeHintbox();"
                alt="">
            <h6 class="txt-center">
                ${hint}
            </h6>
        </div>
    `
}

// 色票item的結構
function createColorItem({
    sR = 0,
    sG = 0,
    sB = 0,
    colorName = '',
    uuid = null,
} = {}){
    let myFav = JSON.parse(localStorage.getItem('myFav'));
    if(!myFav){
        myFav = [];
    }
    return colorCardStr = `
        <div
            class="color"
            style="background-color: rgba(${sR}, ${sG}, ${sB}, 1);">
                <small class="txt-white">
                    ${colorName}
                </small>
                <img
                    src="img/icon/add.svg"
                    class="change_color"
                    onclick="
                        changeSelectWallColor([${sR}, ${sG}, ${sB}]);
                    ">
                <button
                    type="button"
                    class="toggle_fav small"
                    onclick="
                        changeFavState('${uuid}');
                    ">
                    ${
                        (() => {
                            let str = '加入';
                            myFav.forEach((elem) => {
                                if(elem == uuid){
                                    str = '移除'
                                }
                            })

                            return str;
                        })()
                    }
                </button>
        </div>
    `;
}

// 更換空間swiper的結構
function createRoomPreviewSwiper({
    // 傳入rooms資料 若無 則用範例的rooms資料
    rooms = rooms || [
        {
            // roomName就是要連動的CreateScene實體的name屬性
            roomName: 'bedroomA',
            roomPic: 'img/paint/bedroom/a_main.png',
        }
    ]
} = {}){
    return roomPreviewSwiperStr = `
        <div class="swiper">
            <div class="swiper-wrapper">
            ${
                (() => {
                    let str = '';
                    rooms.forEach((elem) => {
                        str += `<div class="swiper-slide">
                                    <figure
                                        class="room_pic"
                                        style="background-image: url(${elem.roomPic});"
                                        data-room_name="${elem.roomName}">
                                    </figure>
                                </div>`;
                    })
                    return str;
                })()
            }
            </div>
            <div class="swiper-button-next">
                <img src="img/icon/arrow_r.svg">
            </div>
            <div class="swiper-button-prev">
                <img src="img/icon/arrow_l.svg">
            </div>
        </div>
    `;
}

// 場景
function CreateScene(
    {
        name = null,
        walls = null,
        cover = null,
        background = null,
    } = {}
){
    let self = this;

    this._ifInit = false;
    this.nowActive = null;
    this.name = name;
    this.cover = new Sprite();
    this.mainBackground = new Sprite();
    // 傳入walls資料 若無 則用範例的walls資料
    this.walls = walls || [
        {
            wall: new Graphics(),
            setWall: function(color, alpha){
                console.log(this);
                this.wall.alpha = alpha;
                this.wall.beginFill(color);
                this.wall.drawRect(0, 0, 830, 600);
                // this.wall.moveTo(0, 0);
                // this.wall.lineTo(200, 0);
                // this.wall.lineTo(200, 300);
                // this.wall.lineTo(400, 350);
                // this.wall.lineTo(400, 600);
                // this.wall.lineTo(0, 600);
                // this.wall.lineTo(0, 0);
                // this.wall.closePath();
                this.wall.endFill();
                this.wall.interactive = true;
            },
            cardCreate: () => { return $(createColorCard({x:5, y:25})).appendTo("#canvas_outer") },
            card: null,
        },
    ];
    this.init = function(){
        self.walls.forEach((elem, i) => {
            elem.setWall(0xff5555, 0);
            elem.wall.blendMode = PIXI.BLEND_MODES['MULTIPLY'];
            elem.card = elem.cardCreate();

            common.bindEvent(
                elem.card,
                'pointerdown',
                () => {
                    self.selectWall(i);
                    $(elem.card)
                        .addClass('active')
                        .siblings('.color_card')
                        .removeClass('active');
                    console.log('card:', elem.card, `nowActive: ${self.nowActive}`);
                }
            );
        });

        // 初次建立實體時做的事
        if(!self._ifInit){
            self._ifInit = true;
            common.setSprite({
                elem: self.cover,
                texture: resources[cover].texture || resources["bedroomA-cover"].texture,
                w: 830,
                h: 600,
                x: 0,
                y: 0,
                anchorX: 0,
                anchorY: 0,
                interactive: false,
                alpha: 1,
            });
            common.setSprite({
                elem: self.mainBackground,
                texture: resources[background].texture || resources["bedroomA-main"].texture,
                w: 830,
                h: 600,
                x: 0,
                y: 0,
                anchorX: 0,
                anchorY: 0,
                interactive: false,
                alpha: 1,
            });
        }

        common.addChildToContainer(
            app.stage,
            (() => {
                let arr = [];
                self.walls.forEach((elem) => {
                    arr.push(elem.wall);
                })
                arr.splice(0,0,self.mainBackground);
                arr.push(self.cover);
                return arr;
            })(),
        );
    }
    this.selectWall = function(index){
        self.nowActive = index;
        console.log('selectWall(): nowActive ', self.nowActive);
    }
    this.changeWallColor = function(color, errorFn){
        console.log(color);
        if(typeof(self.nowActive) == 'number'){
            self.walls[self.nowActive].setWall(`0x${
                rgbHex(
                    (color[0]>255) ? 255 : color[0],
                    (color[1]>255) ? 255 : color[1],
                    (color[2]>255) ? 255 : color[2],
                )}`, 1);
            self.walls[self.nowActive].card.find('.color_preview').css({'backgroundColor' : `#${
                rgbHex(
                    (color[0]>255) ? 255 : color[0],
                    (color[1]>255) ? 255 : color[1],
                    (color[2]>255) ? 255 : color[2],
                )
            }`});
        } else {
            errorFn();
        }
    }
}