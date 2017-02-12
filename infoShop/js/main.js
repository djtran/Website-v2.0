/**
 * Created by David on 10/31/2016.
 */
var titles = [
    "Controls",
    "Welcome!",
    "Unreal Engine 4",
    "Virtual Reality",
    "Apps and 2D Content"
];
var projects = [
    "Use the Arrow Keys to move. Holding down Up allows you to jump higher!",
    "Welcome to my Projects page! Take a look around and read about my different projects!",
    "I along with some others do indie game development for fun! Our current project is a medieval zombie defense game based on valuing every arrow, emphasizing well aimed long distance shots.",
    "As the co-chair of DeisVR at Brandeis University, I spearhead the development of the mechanical features of our projects. Our current project is a VR museum that will be filled with optimized high quality scans of real life retrieved artifacts. Some of the things I have to manage in that project are handling the artifacts with your hands, and displaying a short description of the object in a way that is intuitive and unobstructive in the virtual space.",
    "My friends and I frequently make simple apps. Some examples are BoxBox, a reflex-based sorting game, various Android applications from my first hackathons, and our Real Life Closed Captioning app for the Hololens, made recently at the Reality Virtually Hackathon at MIT. This info game in itself is another small app that I developed as a first glance at 2D HTML5 game development, coming from heavier 3D engines like Unreal and Unity."
];



var game = new Phaser.Game(800, 600, Phaser.AUTO, 'infoShop', {preload: preload, create: create, update: update});

function preload() {
    //file paths relative to URL, all pages ajaxed to the index.html page.
    game.load.image('bg', "infoShop/assets/bg.png");


    game.load.image('cloud1', 'infoShop/assets/Tiles/cloud2.png');
    game.load.image('cloud2', 'infoShop/assets/Tiles/cloud3.png');

    game.load.image('bush', 'infoShop/assets/Tiles/bush.png');
    game.load.image('cactus', 'infoShop/assets/Tiles/cactus.png');
    game.load.image('button', 'infoShop/assets/Tiles/buttonBlue.png');
    game.load.image('buttonP', 'infoShop/assets/Tiles/buttonBlue_pressed.png');

    //M Building
    game.load.image('building', 'infoShop/assets/MedBuild.png');

    ////////////////////
    //ground tiles, 70x70
    ////////////////////
    //x
    game.load.image('grassMid', 'infoShop/assets/Tiles/grassMid.png');
    //l
    game.load.image('grassLeft', 'infoShop/assets/Tiles/grassLeft.png');
    //r
    game.load.image('grassRight', 'infoShop/assets/Tiles/grassRight.png');
    //o
    game.load.image('grassCenter', 'infoShop/assets/Tiles/grassCenter.png');
    //>
    game.load.image('signR', 'infoShop/assets/Tiles/signRight.png');
    //#
    game.load.image('sign', 'infoShop/assets/Tiles/sign.png');


    //Not going to be used until I get Arcade Slopes plugin working
    // // /
    // game.load.image('grassHill1', 'assets/Tiles/grassHillLeft2.png');
    // // -
    // game.load.image('grassHill2', 'assets/Tiles/grassHillLeft.png');

    //player sprites
    game.load.atlas('player', 'infoShop/assets/p1_walk/pWalk.png', 'infoShop/assets/p1_walk/pWalk.json');

    //UI box
    game.load.image('UI', 'infoShop/assets/panel_brown_dia.png');

    //B - Boxbox
    game.load.image('BoxBox', 'infoShop/assets/BBAO.png');

    //t Torch
    game.load.image('torch', 'infoShop/assets/Tiles/tochLit.png')


}

/////////
// PERSISTING GAME OBJECTS
/////////

var platforms;
var airPlatforms;
var info;

var player;
var maxSpeed = 400;
var cursors;
var overlay;
var button;

function create() {

    //BG and Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 1680, 1200, 'bg');
    game.world.setBounds(0, 0, 1680, 1200);

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // ENVIRONMENT INITIALIZATION
    /////////////////////////////////////////////////////////////////////////////////////////////////

    //first line used as markers for the rest of the lines
    //24x70 = 1680px
    var level = [
        '123451234512345123451234',
        '          >             ',
        '  O       B     O       ',
        '#     B                C ',
        'B          O       lxxxx',
        'BB                 M    ',
        'BBB  #                  ',
        'xxxxxxr                 ',
        '          B             ',
        '               Bb# u    ',
        '              xxxxxxxxxx',
        ' # > b #  b  xoooooooooo',
        'xxxxxxxxxxxxxooooooooooo',
        'oooooooooooooooooooooooo'
    ];

    //group signs and enable physical body for overlap
    info = game.add.group();
    info.enableBody = true;
    button = game.add.group();
    button.enableBody = true;

    //group platforms and enable physical body for collision
    platforms = game.add.group();
    platforms.enableBody = true;
    airPlatforms = game.add.group();
    airPlatforms.enableBody = true;
    airPlatforms.visible = false;

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // ENVIRONMENT GENERATION
    /////////////////////////////////////////////////////////////////////////////////////////////////

    for (var y = level.length - 1; y > 0; y--) {
        for (var x = 0; x < level[y].length; x++) {
            var tile;
            var xCoord = x * 70;
            var yCoord = game.world.height - (70 * (level.length - y));
            //TERRAIN
            if (level[y][x] == 'x') {
                tile = platforms.create(xCoord, yCoord, 'grassMid');
            }
            else if (level[y][x] == 'o') {
                tile = platforms.create(xCoord, yCoord, 'grassCenter');
            }
            // else if(level[y][x]== '/')
            // {
            //     tile = platforms.create(xCoord,yCoord, 'grassHill1');
            // }
            // else if(level[y][x] == '-')
            // {
            //     tile = platforms.create(xCoord,yCoord, 'grassHill2');
            // }
            else if (level[y][x] == 'l') {
                tile = platforms.create(xCoord, yCoord, 'grassLeft');
            }
            else if (level[y][x] == 'r') {
                tile = platforms.create(xCoord, yCoord, 'grassRight');
            }
            else if(level[y][x] == "B")
            {
                tile = airPlatforms.create(xCoord, yCoord, 'BoxBox');
                tile.scale.setTo(0.143,0.149); // scale to 70 x 70

            }
            //NON TERRAIN
            else {
                if (level[y][x] == '>') {
                    tile = game.add.sprite(xCoord, yCoord, 'signR');
                }
                else if (level[y][x] == '#') {

                    tile = info.create(xCoord, yCoord, 'sign');
                    tile.title = titles[info.length - 1];
                    tile.text = projects[info.length - 1];
                }
                else if(level[y][x] == 't')
                {
                    tile = game.add.sprite(xCoord, yCoord, 'torch');
                }
                else if(level[y][x] == 'M')
                {
                    tile = game.add.sprite(xCoord, yCoord, 'building');
                }
                else if(level[y][x] == 'O')
                {
                    tile = game.add.sprite(xCoord, yCoord, 'cloud1');
                }
                else if(level[y][x] == 'O')
                {
                    tile = game.add.sprite(xCoord, yCoord, 'cloud2');
                }
                else if(level[y][x] == 'b')
                {
                    tile = game.add.sprite(xCoord, yCoord, 'bush');
                }
                else if(level[y][x] == 'C')
                {
                    tile = game.add.sprite(xCoord, yCoord, 'cactus');
                }
                else if(level[y][x] == 'u')
                {
                    tile = button.create(xCoord, yCoord, 'button');
                    tile.pressed = false;
                    tile.function = function(){
                        airPlatforms.visible = true;
                    }
                }



                continue;
            }
            tile.body.immovable = true;
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // SIGNS
    /////////////////////////////////////////////////////////////////////////////////////////////////

    overlay = game.add.sprite(45, 10, 'UI');
    overlay.fixedToCamera = true;
    overlay.visible = false;

    var titleStyle = {font: '25px Arial', fill: '#ffffff'};
    var descstyle = {font: "16px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 670};
    var text = game.add.text(20, 20, "Title plss s s s s s s s s s s s sssssssssssss ssssssssssss", titleStyle);
    var desc = game.add.text(20, 60, "words words words", descstyle);
    overlay.addChild(text);
    overlay.addChild(desc);
    overlay.text = text;
    overlay.desc = desc;


    /////////////////////////////////////////////////////////////////////////////////////////////////
    // PLAYER
    /////////////////////////////////////////////////////////////////////////////////////////////////

    player = game.add.sprite(70, game.world.height - 200, 'player');
    player.anchor.setTo(.5, .5);
    game.camera.focusOn(player);

    //player physics
    game.physics.arcade.enable(player);
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //player anims & camera
    player.animations.add('walk', Phaser.Animation.generateFrameNames('p1_walk', 1, 11), 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);


    game.input.keyboard.onUpCallback = function (e) {
        if (e.keyCode == Phaser.KeyCode.UP) {
            if (player.body.velocity.y < 0) {
                player.body.velocity.y /= 1.75;
            }
        }
    }
}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(platforms);
    overlay.visible = false;
    game.physics.arcade.overlap(player, info, showInfo, null, this);
    game.physics.arcade.overlap(player, button, pressButton, null, this);
    if(airPlatforms.visible)
    {
        var airPlat = game.physics.arcade.collide(player, airPlatforms);
        adjustSpeed(hitPlatform, airPlat);
    }
    else {
        adjustSpeed(hitPlatform, false);
    }


}

/////////////////////////////////////////////////////////////////////////////////////////////////
// GAME MECHANICS FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////

function adjustSpeed(onGround, onPlatform)
{
    if(onGround || onPlatform)
    {
        if (cursors.left.isDown) {
            player.animations.play('walk');
            player.scale.x = -1;
            if(player.body.velocity.x > -maxSpeed){
                player.body.velocity.x -= maxSpeed/10;
            }
            else {
                player.body.velocity.x = -maxSpeed;
            }
        }
        else if (cursors.right.isDown) {
            player.animations.play('walk');
            player.scale.x = 1;
            if(player.body.velocity.x < maxSpeed){

                player.body.velocity.x += maxSpeed/10;
            }
            else {
                player.body.velocity.x = maxSpeed;
            }
        }
        else {
            player.animations.stop();
            player.frame = 1;
            if(player.body.velocity.x > 20)
            {
                player.body.velocity.x -= maxSpeed/25;
            }
            else if(player.body.velocity.x < -20)
            {
                player.body.velocity.x += maxSpeed/25;
            }
            else {
                player.body.velocity.x = 0;
            }
        }
        //Jump if hit up key, player standing on something, and if that something is a platform.
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -700;
            player.animations.stop();
            game.add.tween(player).to({angle:(360*player.scale.x)}, 400, Phaser.Easing.Linear.None,true);
        }
    }
    else {
        if(cursors.left.isDown){
            player.scale.x = -1;
            if(player.body.velocity.x > -maxSpeed)
            {
                player.body.velocity.x -= maxSpeed/25;
            }
            else {
                player.body.velocity.x = -maxSpeed;
            }
        }
        else if (cursors.right.isDown) {
            player.scale.x = 1;
            if(player.body.velocity.x < maxSpeed){
                player.body.velocity.x += maxSpeed/25;
            }
            else {
                player.body.velocity.x = maxSpeed;
            }
        }
    }
}

function pressButton(player, button)
{
    if(!button.pressed)
    {
        button.loadTexture('buttonP');
        console.log("Press!");
        button.function();
        button.pressed = true;
    }
}

function showInfo(player, sign) {

    overlay.visible = true;
    if (overlay.hasOwnProperty('text')) {
        if(sign.hasOwnProperty('text'))
        {
            overlay.text.setText(sign.title);
            overlay.desc.setText(sign.text);
        }
        else {
            overlay.text.setText("No text!");
        }
    }
}