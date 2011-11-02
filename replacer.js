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
  $('.replaced_thumb').bind('click', replacer.switch_player);
  return replacer;
};

PlayerReplacer.prototype = {
 replace : function(){
   var scope = this;
    $(this.selector).each(function(i, v){
      var id        = $(this).attr('data-id'),
          seed_name = $(this).attr('data-seed-name');
      $(this).append('<img src="http://' + seed_name + '.thumbnails.videojuicer.com/' + seed_name + '/presentations' + id + '.jpg?maxwidth=' + scope.dimensions.width + '&maxheight=' + scope.dimensions.height + '" class="replaced_thumb" />')
    });
  },
  
  switch_player : function(){
    console.log('wowowowowowo')
  }
  
}