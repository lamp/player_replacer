/*
* Replaces all instances of videojuicerplayer with thumbnails of the same dimensions.
* When thumbnail is clicked it will replace it with a player instance, 
* and replace any active player instances with their respective thumbnail
* Requires jquery to be available.
*/
PlayerReplacer = function(){}

PlayerReplacer.configure = function(options){
  var replacer = new PlayerReplacer();
  replacer.selector = options.selector;
  replacer.seed_name = options.seed_name;
  replacer.dimensions = options.dimensions;
  replacer.replace();
  $('.replaced_thumb').live('click', function(e){
    e.preventDefault();
    replacer.switch_player(this);
  });
  return replacer;
};

PlayerReplacer.prototype = {
  presentations : {},
  replace : function(){
    var scope = this;
    $(this.selector).each(function(i, v){
      var id        = $(this).attr('data-id'),
          seed_name = $(this).attr('data-seed-name'),
          img       = '<img src="http://' + seed_name + '.thumbnails.videojuicer.com/' + seed_name + '/presentations/' + id + '.jpg?maxwidth=' + scope.dimensions.width + '&maxheight=' + scope.dimensions.height + '" class="replaced_thumb" />';

      scope.presentations[id] = { 'seed_name' : seed_name, 'img' : img };
      $(this).children().remove();
      $(this).html(img);
    });
  },

  switch_player : function(element){
    var parent    = $(element).parent(),
        id        = parent.attr('data-id'),
        seed_name = parent.attr('data-seed-name'),
        scope     = this;
    //replace all players with thumbnails
    this.replace();
    if(typeof(this.presentations[id].embed_code) == 'undefined'){
      var url = 'http://api.videojuicer.com/presentations/' + id + '.html?seed_name=' + seed_name;
      params = { 'url' : url,
                 'seed_name' : seed_name,
                 'format' : 'json',
                 'maxwidth' : this.dimensions.width,
                 'maxheight' : this.dimensions.height
                };
      $.getJSON('http://api.videojuicer.com/oembed?callback=?', params, function(data){
        scope.presentations[id].embed_code = data.html;
        parent.html(data.html);
      });
    }else{
      parent.html(this.presentations[id].embed_code);
    }  
  }
};