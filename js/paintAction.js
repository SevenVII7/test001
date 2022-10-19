// ===============
// ***---***---***
// *** pixi loader載入資源 and 載入後執行
// ***---***---***
// ===============

loader
    .add([
        { name: "bedroomA-cover", url: "img/paint/bedroom/a_cover.png" },
        { name: "bedroomA-main", url: "img/paint/bedroom/a_main.png" },
        { name: "bedroomB-cover", url: "img/paint/bedroom/b_cover.png" },
        { name: "bedroomB-main", url: "img/paint/bedroom/b_main.png" },
        { name: "bedroomC-cover", url: "img/paint/bedroom/c_cover.png" },
        { name: "bedroomC-main", url: "img/paint/bedroom/c_main.png" },
        { name: "bedroomD-cover", url: "img/paint/bedroom/d_cover.png" },
        { name: "bedroomD-main", url: "img/paint/bedroom/d_main.png" },
        { name: "dinningroomA-cover", url: "img/paint/dinningroom/a_cover.png" },
        { name: "dinningroomA-main", url: "img/paint/dinningroom/a_main.png" },
        { name: "dinningroomB-cover", url: "img/paint/dinningroom/b_cover.png" },
        { name: "dinningroomB-main", url: "img/paint/dinningroom/b_main.png" },
        { name: "dinningroomC-cover", url: "img/paint/dinningroom/c_cover.png" },
        { name: "dinningroomC-main", url: "img/paint/dinningroom/c_main.png" },
        { name: "dinningroomD-cover", url: "img/paint/dinningroom/d_cover.png" },
        { name: "dinningroomD-main", url: "img/paint/dinningroom/d_main.png" },
        { name: "livingroomA-cover", url: "img/paint/livingroom/a_cover.png" },
        { name: "livingroomA-main", url: "img/paint/livingroom/a_main.png" },
        { name: "livingroomB-cover", url: "img/paint/livingroom/b_cover.png" },
        { name: "livingroomB-main", url: "img/paint/livingroom/b_main.png" },
        { name: "livingroomC-cover", url: "img/paint/livingroom/c_cover.png" },
        { name: "livingroomC-main", url: "img/paint/livingroom/c_main.png" },
        { name: "livingroomD-cover", url: "img/paint/livingroom/d_cover.png" },
        { name: "livingroomD-main", url: "img/paint/livingroom/d_main.png" },
    ])
    .load(() => { 
        changeRoom('bedroomD');
        getAllPaint('get', 'js/allPaint.json');
        changeRoomPreviewSwiper([
            {
                roomName: 'bedroomA',
                roomPic: 'img/paint/bedroom/a_main.png',
            },
            {
                roomName: 'bedroomB',
                roomPic: 'img/paint/bedroom/b_main.png',
            },
            {
                roomName: 'bedroomC',
                roomPic: 'img/paint/bedroom/c_main.png',
            },
            {
                roomName: 'bedroomD',
                roomPic: 'img/paint/bedroom/d_main.png',
            },
        ]);
    });


// ===============
// ***---***---***
// *** 其他的執行時機
// ***---***---***
// ===============

// 開啟更換空間lightbox
$('#btn-change_space').on('click', function(){
    $('#place_lightbox').addClass('active');
});

// 關閉更換空間lightbox
$('#place_lightbox .close').on('click', function(){
    $('#place_lightbox').removeClass('active');
});

// swiper切換到客廳
$('#btn-select_room_class1').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
    changeRoomPreviewSwiper([
        {
            roomName: 'bedroomA',
            roomPic: 'img/paint/bedroom/a_main.png',
        },
        {
            roomName: 'bedroomB',
            roomPic: 'img/paint/bedroom/b_main.png',
        },
        {
            roomName: 'bedroomC',
            roomPic: 'img/paint/bedroom/c_main.png',
        },
        {
            roomName: 'bedroomD',
            roomPic: 'img/paint/bedroom/d_main.png',
        },
    ]);
})

// swiper切換到餐廳
$('#btn-select_room_class2').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
    changeRoomPreviewSwiper([
        {
            roomName: 'dinningroomA',
            roomPic: 'img/paint/dinningroom/a_main.png',
        },
        {
            roomName: 'dinningroomB',
            roomPic: 'img/paint/dinningroom/b_main.png',
        },
        // {
        //     roomName: 'dinningroomC',
        //     roomPic: 'img/paint/dinningroom/c_main.png',
        // },
        // {
        //     roomName: 'dinningroomD',
        //     roomPic: 'img/paint/dinningroom/d_main.png',
        // },
    ]);
})

// swiper切換到臥室
$('#btn-select_room_class3').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
    changeRoomPreviewSwiper([
      // {
      //   roomName: 'livingroomA',
      //   roomPic: 'img/paint/livingroom/a_main.png',
      // },
      {
        roomName: 'livingroomB',
        roomPic: 'img/paint/livingroom/b_main.png',
      },
      // {
      //   roomName: 'livingroomC',
      //   roomPic: 'img/paint/livingroom/c_main.png',
      // },
      // {
      //   roomName: 'livingroomD',
      //   roomPic: 'img/paint/livingroom/d_main.png',
      // },
    ]);
})

// swiper切換到小孩房
$('#btn-select_room_class4').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
    changeRoomPreviewSwiper([]);
})

// swiper切換到辦公空間
$('#btn-select_room_class5').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
    changeRoomPreviewSwiper([]);
})

// 確認選擇當前swiper顯示的空間
$('#btn-select_room').on('click', function(){
    const roomName = $('#place_lightbox .room_preview .swiper .swiper-slide-active .room_pic').data('room_name');
    $('#place_lightbox').removeClass('active');
    if(roomName){
        changeRoom(roomName);
    }
});