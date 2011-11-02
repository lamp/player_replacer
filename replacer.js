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
  replacer.replace();
  $('.replaced_thumb').bind('click', replacer.switch_player);
  return replacer;
};

PlayerReplacer.prototype = {
 replace : function(){
    $(this.selector).each(function(i, v){
      var arr = $(this).children('object').attr('id').split('_'),
          id = arr[arr.length - 1];
      console.log(id);
    });
  }
}