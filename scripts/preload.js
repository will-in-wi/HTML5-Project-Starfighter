'use strict';

function PreloadImages(img_dir, preload_source) {

    var me = this;

    this.img_dir = img_dir;
    this.preload_source = preload_source;

    var images = {};

    this.preload = function() {
        Debug.log('Beginning image preload.');

        var httpRequest = new XMLHttpRequest();

        var promise = new Promise(function(resolve, reject){
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                    Debug.log('Image Preload JSON returned, beginning to preload images.');

                    var data = JSON.parse(httpRequest.responseText);

                    var promises = [];

                    for (var i = 0; i < data.length; i++) {
                        promises.push(me.load_object(data[i]));
                    }

                    Promise.all(promises).then(function(){
                        Debug.log('Image preload finished.');
                        resolve(images);
                    });
                }
            }
        });

        httpRequest.open('GET', this.img_dir + this.preload_source, true);
        httpRequest.send(null);

        return promise;
    }

    this.load_object = function(image) {
        var img = new Image();
        var promise = new Promise(function(resolve, reject) {
            img.onload = function() {
                images[image.substr(0, image.length - 4)] = img;
                resolve();
            }
        });

        img.src = '';
        img.src = this.img_dir + image;

        return promise;
    }
}
