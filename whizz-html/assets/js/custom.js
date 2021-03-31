;(function ($, window, document, undefined) {
    'use strict';
    $(window).on('load',function(){$('.dgwt-jg-gallery:not(.gallery_masonry)').each(function(){
        var $gallery=$(this),$item=$gallery.find('.dgwt-jg-item');
        if($gallery.length>0&&$item.length>0){$gallery.lightGallery({thumbnail:!0,download:!1,closable:!1});
        $item.children('img').each(function(){if(typeof $(this).attr('srcset')!=='undefined'){
            $(this).attr('data-jg-srcset',$(this).attr('srcset'));
            $(this).removeAttr('srcset')}});
        $gallery.justifiedGallery({
            lastRow:'nojustify',captions:!1,margins:3,rowHeight:$gallery.data('height'),maxRowHeight:-1,thumbnailPath:function(currentPath,width,height,$image){
                if(typeof $image.data('jg-srcset')==='undefined'){
                    return currentPath}
                var srcset=$image.data('jg-srcset');
                if($image.length>0&&srcset.length>0){
                    var path,sizes=[],sizesTemp=[],urls=srcset.split(",");
                    if(urls.length>0){
                        for(i=0;i<urls.length;i++){
                            var url,sizeW,item=urls[i].trim().split(" ");
                            if(typeof item[0]!='undefined'&&typeof item[1]!='undefined'){
                                var sizeW=item[1].replace('w','');
                                sizesTemp[sizeW]={width:item[1].replace('w',''),url:item[0]}
                            }
                        }
                        for(i=0;i<sizesTemp.length;i++){
                            if(sizesTemp[i]){
                                sizes.push(sizesTemp[i])
                            }
                        }
                    }
                    for(i=0;i<sizes.length;i++){
                        if(sizes[i].width>=width){
                            return sizes[i].url
                        }
                    }return currentPath
                }else{
                    return currentPath}}}).on('jg.complete',function(e){
                        $item.each(function(){
                            $(this).on('mouseenter mouseleave',function(e){
                                var $this=$(this),width=$this.width(),height=$this.height();
                                var x=(e.pageX-$this.offset().left-(width/2))*(width>height?(height/width):1),y=(e.pageY-$this.offset().top-(height/2))*(height>width?(width/height):1);
                                var dir_num=Math.round((((Math.atan2(y,x)*(180/Math.PI))+180)/90)+3)%4,directions=['top','right','bottom','left'];
                                if(e.type==='mouseenter'){
                                    $this.removeClass(function(index,css){
                                        return(css.match(/(^|\s)hover-out-\S+/g)||[]).join(' ')
                                    });
                                    $this.addClass('hover-in-'+directions[dir_num])
                                }
                                if(e.type==='mouseleave'){
                                    $this.removeClass(function(index,css){
                                        return(css.match(/(^|\s)hover-in-\S+/g)||[]).join(' ')
                                    });
                                    $this.addClass('hover-out-'+directions[dir_num])
                                }
                            }
                            )
                        }
                        )
                    }
                    )
        }
    }
    )
    }
    )
})(jQuery, window, document);