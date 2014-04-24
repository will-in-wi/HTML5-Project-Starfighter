'use strict';

function PreloadImages(img_dir, preload_source) {

    var me = this;

    this.img_dir = img_dir;
    this.preload_source = preload_source;

    var masterDeferred = new jQuery.Deferred();

    var images = {};

    this.preload = function() {
        Debug.log('Beginning image preload.');

        $.getJSON(this.img_dir + this.preload_source, function(data) {

            Debug.log('Image Preload JSON returned, beginning to preload images.');

            var promises = [];

            for (var i = 0; i < data.length; i++) {
                promises.push(me.load_object(data[i]));
            }

            $.when.apply($, promises).done(function(){
                Debug.log('Image preload finished.');
                masterDeferred.resolve(images);
            });
        });

        return masterDeferred;
    }

    this.load_object = function(image) {
        var deferred = new jQuery.Deferred();
        var img = new Image();
        $(img).load(function() {
            images[image.substr(0, image.length - 4)] = img;
            deferred.resolve();
        });
        img.src = '';
        img.src = this.img_dir + image;
        return deferred;
    }
}
