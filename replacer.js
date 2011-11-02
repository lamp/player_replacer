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
  $('.replaced_thumb').click(function(e){
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
      $(this).html(img)
    });
  },

  switch_player : function(element){
    var parent    = $(element).parent(),
        id        = parent.attr('data-id'),
        seed_name = parent.attr('data-seed-name');
    //replace all players with thumbnails
    this.replace();
    console.log(id);
    if(typeof(this.presentations[id].embed_code) == 'undefined'){
      
    }else{
      parent.html(this.presentations[id].embed_code);
    }  
  }
};