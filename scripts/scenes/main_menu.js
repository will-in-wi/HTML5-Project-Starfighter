'use strict';

function MainMenu() {

    Debug.log('Initializing Main Menu.');

    var me = this;

    var state = window.game_state;
    state.reset();

    this.main_loop_interval = null;

    // Insert 16 bad guys
    for (var i=0;i<=5;i=i+1) {
        var loc = new Point(Math.random()*800, Math.random()*600);
        var ai = new MenuAI(100, loc);
        var badguy = new EnemyShip(ai, "eliteFighter", 1);
        badguy.noShield = true;
        badguy.speed = Math.random()*6;
        state.drawObjects.push(badguy);
    }
    for (var i=0;i<=5;i=i+1) {
        var loc = new Point(Math.random()*800, Math.random()*600);
        var ai = new MenuAI(100, loc);
        var badguy = new EnemyShip(ai, "dualFighter", 1);
        badguy.speed = Math.random()*6;
        badguy.noShield = true;
        state.drawObjects.push(badguy);
    }
    for (var i=0;i<=5;i=i+1) {
        var loc = new Point(Math.random()*800, Math.random()*600);
        var ai = new MenuAI(100, loc);
        var badguy = new EnemyShip(ai, "missileBoat", 1);
        badguy.speed = Math.random()*6;
        badguy.noShield = true;
        state.drawObjects.push(badguy);
    }
    for (var i=0;i<=5;i=i+1) {
        var loc = new Point(Math.random()*800, Math.random()*600);
        var ai = new MenuAI(100, loc);
        var badguy = new EnemyShip(ai, "miner", 1);
        badguy.speed = Math.random()*6;
        badguy.noShield = true;
        state.drawObjects.push(badguy);
    }

    var dom_game = document.getElementById('game');

    // Draw Menu
    $('#game').after('<div id="main-menu"></div>');
    main_menu_menu();

    // draw starfield
    var starfield = [];
    for (var i=0;i<=70;i=i+1) {
        starfield.push([Math.random()*800, Math.random()*600]);
    }

    function main_menu_menu() {
        Debug.log('Drawing main menu click menu.');

        // Draw Menu
        $('#main-menu').html('<ul><li><a href="#" id="start-game">START NEW GAME</a></li><li><a href="#" id="load-game">LOAD GAME</a></li><li><a href="#" id="continue-game">CONTINUE CURRENT GAME</a></li><li><a href="#" id="options">OPTIONS</a></li></ul><audio autoplay loop><source src="data/music/Platinum.ogg" type="audio/ogg" /><source src="data/music/Platinum.mp3" type="audio/mpeg" /></audio>');

        $("#start-game").click(function() {
            Debug.log('Game start event.');
            clearInterval(me.main_loop_interval);
            $("#main-menu").remove();

            var t = new Tracker();
            t.loadStory('story').then(function(){
                t.next_scene();
            });
        });

        $("#options").click(function() {
            options();
        });
    }

    this.options = function () {
        // TODO
    }

    this.draw = function () {
        // clear canvas
        state.ctx.clearRect(0, 0, dom_game.offsetWidth, dom_game.offsetHeight);

        // create background
        state.ctx.drawImage(gameImages["spirit"], 0, 0);

        // draw starfield
        state.ctx.fillStyle = "gray";
        for (var i=starfield.length-1; i>=0; --i) {
            var star = starfield[i];
            state.ctx.fillRect(star[0], star[1], 1, 1);
        }

        // Reap objects
        state.drawObjects.forEach(function(obj, i, arr) {
            if (obj.reapMe == true) {
                arr.splice(i, 1);
            }
        });

        // Draw all other objects
        state.drawObjects.forEach(function(obj) {
            obj.draw(state.ctx);
        });
    }

    this.main_loop = function() {
        Debug.log('Starting main menu render loop.');
        me.main_loop_interval = setInterval(function() {
            me.draw();
        }, 40);
    }
}
