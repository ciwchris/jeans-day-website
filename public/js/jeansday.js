/**
 * jQuery bxSlider v3.0
 * http://bxslider.com
 *
 * Copyright 2010, Steven Wanderski
 * http://stevenwanderski.com
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */
(function($){$.fn.bxSlider=function(options){var defaults={mode:'horizontal',infiniteLoop:true,hideControlOnEnd:false,controls:true,speed:500,easing:'swing',pager:false,pagerSelector:null,pagerType:'full',pagerLocation:'bottom',pagerShortSeparator:'/',pagerActiveClass:'pager-active',nextText:'next',nextImage:'',nextSelector:null,prevText:'prev',prevImage:'',prevSelector:null,captions:false,captionsSelector:null,auto:false,autoDirection:'next',autoControls:false,autoControlsSelector:null,autoStart:true,autoHover:false,autoDelay:0,pause:3000,startText:'start',startImage:'',stopText:'stop',stopImage:'',ticker:false,tickerSpeed:5000,tickerDirection:'next',tickerHover:false,wrapperClass:'bx-wrapper',startingSlide:0,displaySlideQty:1,moveSlideQty:1,randomStart:false,onBeforeSlide:function(){},onAfterSlide:function(){},onLastSlide:function(){},onFirstSlide:function(){},onNextSlide:function(){},onPrevSlide:function(){},buildPager:null}
var options=$.extend(defaults,options);var base=this;var $parent='';var $origElement='';var $children='';var $outerWrapper='';var $firstChild='';var childrenWidth='';var childrenOuterWidth='';var wrapperWidth='';var wrapperHeight='';var $pager='';var interval='';var $autoControls='';var $stopHtml='';var $startContent='';var $stopContent='';var autoPlaying=true;var loaded=false;var childrenMaxWidth=0;var childrenMaxHeight=0;var currentSlide=0;var origLeft=0;var origTop=0;var origShowWidth=0;var origShowHeight=0;var tickerLeft=0;var tickerTop=0;var isWorking=false;var firstSlide=0;var lastSlide=$children.length-1;this.goToSlide=function(number,stopAuto){if(!isWorking){isWorking=true;currentSlide=number;options.onBeforeSlide(currentSlide,$children.length,$children.eq(currentSlide));if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
if(stopAuto){if(options.auto){base.stopShow(true);}}
slide=number;if(slide==firstSlide){options.onFirstSlide(currentSlide,$children.length,$children.eq(currentSlide));}
if(slide==lastSlide){options.onLastSlide(currentSlide,$children.length,$children.eq(currentSlide));}
if(options.mode=='horizontal'){$parent.animate({'left':'-'+getSlidePosition(slide,'left')+'px'},options.speed,options.easing,function(){isWorking=false;options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='vertical'){$parent.animate({'top':'-'+getSlidePosition(slide,'top')+'px'},options.speed,options.easing,function(){isWorking=false;options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='fade'){setChildrenFade();}
checkEndControls();if(options.moveSlideQty>1){number=Math.floor(number/options.moveSlideQty);}
makeSlideActive(number);showCaptions();}}
this.goToNextSlide=function(stopAuto){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
if(stopAuto){if(options.auto){base.stopShow(true);}}
if(!options.infiniteLoop){if(!isWorking){var slideLoop=false;currentSlide=(currentSlide+(options.moveSlideQty));if(currentSlide<=lastSlide){checkEndControls();options.onNextSlide(currentSlide,$children.length,$children.eq(currentSlide));base.goToSlide(currentSlide);}else{currentSlide-=options.moveSlideQty;}}}else{if(!isWorking){isWorking=true;var slideLoop=false;currentSlide=(currentSlide+options.moveSlideQty);if(currentSlide>lastSlide){currentSlide=currentSlide%$children.length;slideLoop=true;}
options.onNextSlide(currentSlide,$children.length,$children.eq(currentSlide));options.onBeforeSlide(currentSlide,$children.length,$children.eq(currentSlide));if(options.mode=='horizontal'){var parentLeft=(options.moveSlideQty*childrenOuterWidth);$parent.animate({'left':'-='+parentLeft+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('left','-'+getSlidePosition(currentSlide,'left')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='vertical'){var parentTop=(options.moveSlideQty*childrenMaxHeight);$parent.animate({'top':'-='+parentTop+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('top','-'+getSlidePosition(currentSlide,'top')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='fade'){setChildrenFade();}
if(options.moveSlideQty>1){makeSlideActive(Math.ceil(currentSlide/options.moveSlideQty));}else{makeSlideActive(currentSlide);}
showCaptions();}}}
this.goToPreviousSlide=function(stopAuto){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
if(stopAuto){if(options.auto){base.stopShow(true);}}
if(!options.infiniteLoop){if(!isWorking){var slideLoop=false;currentSlide=currentSlide-options.moveSlideQty;if(currentSlide<0){currentSlide=0;if(options.hideControlOnEnd){$('.bx-prev',$outerWrapper).hide();}}
checkEndControls();options.onPrevSlide(currentSlide,$children.length,$children.eq(currentSlide));base.goToSlide(currentSlide);}}else{if(!isWorking){isWorking=true;var slideLoop=false;currentSlide=(currentSlide-(options.moveSlideQty));if(currentSlide<0){negativeOffset=(currentSlide%$children.length);if(negativeOffset==0){currentSlide=0;}else{currentSlide=($children.length)+negativeOffset;}
slideLoop=true;}
options.onPrevSlide(currentSlide,$children.length,$children.eq(currentSlide));options.onBeforeSlide(currentSlide,$children.length,$children.eq(currentSlide));if(options.mode=='horizontal'){var parentLeft=(options.moveSlideQty*childrenOuterWidth);$parent.animate({'left':'+='+parentLeft+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('left','-'+getSlidePosition(currentSlide,'left')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='vertical'){var parentTop=(options.moveSlideQty*childrenMaxHeight);$parent.animate({'top':'+='+parentTop+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('top','-'+getSlidePosition(currentSlide,'top')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='fade'){setChildrenFade();}
if(options.moveSlideQty>1){makeSlideActive(Math.ceil(currentSlide/options.moveSlideQty));}else{makeSlideActive(currentSlide);}
showCaptions();}}}
this.goToFirstSlide=function(stopAuto){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
base.goToSlide(firstSlide,stopAuto);}
this.goToLastSlide=function(){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
base.goToSlide(lastSlide,stopAuto);}
this.getCurrentSlide=function(){return currentSlide;}
this.getSlideCount=function(){return $children.length;}
this.stopShow=function(changeText){clearInterval(interval);if(typeof(changeText)=='undefined'){var changeText=true;}
if(changeText&&options.autoControls){$autoControls.html($startContent).removeClass('stop').addClass('start');autoPlaying=false;}}
this.startShow=function(changeText){if(typeof(changeText)=='undefined'){var changeText=true;}
setAutoInterval();if(changeText&&options.autoControls){$autoControls.html($stopContent).removeClass('start').addClass('stop');autoPlaying=true;}}
this.stopTicker=function(changeText){$parent.stop();if(typeof(changeText)=='undefined'){var changeText=true;}
if(changeText&&options.ticker){$autoControls.html($startContent).removeClass('stop').addClass('start');autoPlaying=false;}}
this.startTicker=function(changeText){if(options.mode=='horizontal'){if(options.tickerDirection=='next'){var stoppedLeft=parseInt($parent.css('left'));var remainingDistance=(origShowWidth+stoppedLeft)+$children.eq(0).width();}else if(options.tickerDirection=='prev'){var stoppedLeft=-parseInt($parent.css('left'));var remainingDistance=(stoppedLeft)-$children.eq(0).width();}
var finishingSpeed=(remainingDistance*options.tickerSpeed)/origShowWidth;moveTheShow(tickerLeft,remainingDistance,finishingSpeed);}else if(options.mode=='vertical'){if(options.tickerDirection=='next'){var stoppedTop=parseInt($parent.css('top'));var remainingDistance=(origShowHeight+stoppedTop)+$children.eq(0).height();}else if(options.tickerDirection=='prev'){var stoppedTop=-parseInt($parent.css('top'));var remainingDistance=(stoppedTop)-$children.eq(0).height();}
var finishingSpeed=(remainingDistance*options.tickerSpeed)/origShowHeight;moveTheShow(tickerTop,remainingDistance,finishingSpeed);if(typeof(changeText)=='undefined'){var changeText=true;}
if(changeText&&options.ticker){$autoControls.html($stopContent).removeClass('start').addClass('stop');autoPlaying=true;}}}
this.initShow=function(){$parent=$(this);$origElement=$parent.clone();$children=$parent.children();$outerWrapper='';$firstChild=$parent.children(':first');childrenWidth=$firstChild.width();childrenMaxWidth=0;childrenOuterWidth=$firstChild.outerWidth();childrenMaxHeight=0;wrapperWidth=getWrapperWidth();wrapperHeight=getWrapperHeight();isWorking=false;$pager='';currentSlide=0;origLeft=0;origTop=0;interval='';$autoControls='';$stopHtml='';$startContent='';$stopContent='';autoPlaying=true;loaded=false;origShowWidth=0;origShowHeight=0;tickerLeft=0;tickerTop=0;firstSlide=0;lastSlide=$children.length-1;$children.each(function(index){if($(this).outerHeight()>childrenMaxHeight){childrenMaxHeight=$(this).outerHeight();}
if($(this).outerWidth()>childrenMaxWidth){childrenMaxWidth=$(this).outerWidth();}});if(options.randomStart){var randomNumber=Math.floor(Math.random()*$children.length);currentSlide=randomNumber;origLeft=childrenOuterWidth*(options.moveSlideQty+randomNumber);origTop=childrenMaxHeight*(options.moveSlideQty+randomNumber);}else{currentSlide=options.startingSlide;origLeft=childrenOuterWidth*(options.moveSlideQty+options.startingSlide);origTop=childrenMaxHeight*(options.moveSlideQty+options.startingSlide);}
initCss();if(options.pager&&!options.ticker){if(options.pagerType=='full'){showPager('full');}else if(options.pagerType=='short'){showPager('short');}}
if(options.controls&&!options.ticker){setControlsVars();}
if(options.auto||options.ticker){if(options.autoControls){setAutoControlsVars();}
if(options.autoStart){setTimeout(function(){base.startShow(true);},options.autoDelay);}else{base.stopShow(true);}
if(options.autoHover&&!options.ticker){setAutoHover();}}
if(options.moveSlideQty>1){makeSlideActive(Math.ceil(currentSlide/options.moveSlideQty));}else{makeSlideActive(currentSlide);}
checkEndControls();if(options.captions){showCaptions();}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));}
this.destroyShow=function(){clearInterval(interval);$('.bx-next, .bx-prev, .bx-pager, .bx-auto',$outerWrapper).remove();$parent.unwrap().unwrap().removeAttr('style');$parent.children().removeAttr('style').not('.pager').remove();$children.removeClass('pager');}
this.reloadShow=function(){base.destroyShow();base.initShow();}
function initCss(){setChildrenLayout(options.startingSlide);if(options.mode=='horizontal'){$parent.wrap('<div class="'+options.wrapperClass+'" style="width:'+wrapperWidth+'px; position:relative;"></div>').wrap('<div class="bx-window" style="position:relative; overflow:hidden; width:'+wrapperWidth+'px;"></div>').css({width:'99999px',position:'relative',left:'-'+(origLeft)+'px'});$parent.children().css({width:childrenWidth,'float':'left',listStyle:'none'});$outerWrapper=$parent.parent().parent();$children.addClass('pager');}else if(options.mode=='vertical'){$parent.wrap('<div class="'+options.wrapperClass+'" style="width:'+childrenMaxWidth+'px; position:relative;"></div>').wrap('<div class="bx-window" style="width:'+childrenMaxWidth+'px; height:'+wrapperHeight+'px; position:relative; overflow:hidden;"></div>').css({height:'99999px',position:'relative',top:'-'+(origTop)+'px'});$parent.children().css({listStyle:'none',height:childrenMaxHeight});$outerWrapper=$parent.parent().parent();$children.addClass('pager');}else if(options.mode=='fade'){$parent.wrap('<div class="'+options.wrapperClass+'" style="width:'+childrenMaxWidth+'px; position:relative;"></div>').wrap('<div class="bx-window" style="height:'+childrenMaxHeight+'px; width:'+childrenMaxWidth+'px; position:relative; overflow:hidden;"></div>');$parent.children().css({listStyle:'none',position:'absolute',top:0,left:0,zIndex:98});$outerWrapper=$parent.parent().parent();$children.not(':eq('+currentSlide+')').fadeTo(0,0);$children.eq(currentSlide).css('zIndex',99);}
if(options.captions&&options.captionsSelector==null){$outerWrapper.append('<div class="bx-captions"></div>');}}
function setChildrenLayout(){if(options.mode=='horizontal'||options.mode=='vertical'){var $prependedChildren=getArraySample($children,0,options.moveSlideQty,'backward');$.each($prependedChildren,function(index){$parent.prepend($(this));});var totalNumberAfterWindow=($children.length+options.moveSlideQty)-1;var pagerExcess=$children.length-options.displaySlideQty;var numberToAppend=totalNumberAfterWindow-pagerExcess;var $appendedChildren=getArraySample($children,0,numberToAppend,'forward');if(options.infiniteLoop){$.each($appendedChildren,function(index){$parent.append($(this));});}}}
function setControlsVars(){if(options.nextImage!=''){nextContent=options.nextImage;nextType='image';}else{nextContent=options.nextText;nextType='text';}
if(options.prevImage!=''){prevContent=options.prevImage;prevType='image';}else{prevContent=options.prevText;prevType='text';}
showControls(nextType,nextContent,prevType,prevContent);}
function setAutoInterval(){if(options.auto){if(!options.infiniteLoop){if(options.autoDirection=='next'){interval=setInterval(function(){currentSlide+=options.moveSlideQty;if(currentSlide>lastSlide){currentSlide=currentSlide%$children.length;}
base.goToSlide(currentSlide,false);},options.pause);}else if(options.autoDirection=='prev'){interval=setInterval(function(){currentSlide-=options.moveSlideQty;if(currentSlide<0){negativeOffset=(currentSlide%$children.length);if(negativeOffset==0){currentSlide=0;}else{currentSlide=($children.length)+negativeOffset;}}
base.goToSlide(currentSlide,false);},options.pause);}}else{if(options.autoDirection=='next'){interval=setInterval(function(){base.goToNextSlide(false);},options.pause);}else if(options.autoDirection=='prev'){interval=setInterval(function(){base.goToPreviousSlide(false);},options.pause);}}}else if(options.ticker){options.tickerSpeed*=10;$('.pager',$outerWrapper).each(function(index){origShowWidth+=$(this).width();origShowHeight+=$(this).height();});if(options.tickerDirection=='prev'&&options.mode=='horizontal'){$parent.css('left','-'+(origShowWidth+origLeft)+'px');}else if(options.tickerDirection=='prev'&&options.mode=='vertical'){$parent.css('top','-'+(origShowHeight+origTop)+'px');}
if(options.mode=='horizontal'){tickerLeft=parseInt($parent.css('left'));moveTheShow(tickerLeft,origShowWidth,options.tickerSpeed);}else if(options.mode=='vertical'){tickerTop=parseInt($parent.css('top'));moveTheShow(tickerTop,origShowHeight,options.tickerSpeed);}
if(options.tickerHover){setTickerHover();}}}
function moveTheShow(leftCss,distance,speed){if(options.mode=='horizontal'){if(options.tickerDirection=='next'){$parent.animate({'left':'-='+distance+'px'},speed,'linear',function(){$parent.css('left',leftCss);moveTheShow(leftCss,origShowWidth,options.tickerSpeed);});}else if(options.tickerDirection=='prev'){$parent.animate({'left':'+='+distance+'px'},speed,'linear',function(){$parent.css('left',leftCss);moveTheShow(leftCss,origShowWidth,options.tickerSpeed);});}}else if(options.mode=='vertical'){if(options.tickerDirection=='next'){$parent.animate({'top':'-='+distance+'px'},speed,'linear',function(){$parent.css('top',leftCss);moveTheShow(leftCss,origShowHeight,options.tickerSpeed);});}else if(options.tickerDirection=='prev'){$parent.animate({'top':'+='+distance+'px'},speed,'linear',function(){$parent.css('top',leftCss);moveTheShow(leftCss,origShowHeight,options.tickerSpeed);});}}}
function setAutoControlsVars(){if(options.startImage!=''){startContent=options.startImage;startType='image';}else{startContent=options.startText;startType='text';}
if(options.stopImage!=''){stopContent=options.stopImage;stopType='image';}else{stopContent=options.stopText;stopType='text';}
showAutoControls(startType,startContent,stopType,stopContent);}
function setAutoHover(){$outerWrapper.find('.bx-window').hover(function(){if(autoPlaying){base.stopShow(false);}},function(){if(autoPlaying){base.startShow(false);}});}
function setTickerHover(){$parent.hover(function(){if(autoPlaying){base.stopTicker(false);}},function(){if(autoPlaying){base.startTicker(false);}});}
function setChildrenFade(){$children.not(':eq('+currentSlide+')').fadeTo(options.speed,0).css('zIndex',98);$children.eq(currentSlide).css('zIndex',99).fadeTo(options.speed,1,function(){isWorking=false;options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});};function makeSlideActive(number){if(options.pagerType=='full'&&options.pager){$('a',$pager).removeClass(options.pagerActiveClass);$('a',$pager).eq(number).addClass(options.pagerActiveClass);}else if(options.pagerType=='short'&&options.pager){$('.bx-pager-current',$pager).html(currentSlide+1);}}
function showControls(nextType,nextContent,prevType,prevContent){var $nextHtml=$('<a href="" class="bx-next"></a>');var $prevHtml=$('<a href="" class="bx-prev"></a>');if(nextType=='text'){$nextHtml.html(nextContent);}else{$nextHtml.html('<img src="'+nextContent+'" />');}
if(prevType=='text'){$prevHtml.html(prevContent);}else{$prevHtml.html('<img src="'+prevContent+'" />');}
if(options.prevSelector){$(options.prevSelector).append($prevHtml);}else{$outerWrapper.append($prevHtml);}
if(options.nextSelector){$(options.nextSelector).append($nextHtml);}else{$outerWrapper.append($nextHtml);}
$nextHtml.click(function(){base.goToNextSlide();return false;});$prevHtml.click(function(){base.goToPreviousSlide();return false;});}
function showPager(type){var pagerQty=$children.length;if(options.moveSlideQty>1){if($children.length%options.moveSlideQty!=0){pagerQty=Math.ceil($children.length/options.moveSlideQty);}else{pagerQty=$children.length/options.moveSlideQty;}}
var pagerString='';if(options.buildPager){for(var i=0;i<pagerQty;i++){pagerString+=options.buildPager(i,$children.eq(i*options.moveSlideQty));}}else if(type=='full'){for(var i=1;i<=pagerQty;i++){pagerString+='<a href="" class="pager-link pager-'+i+'">'+i+'</a>';}}else if(type=='short'){pagerString='<span class="bx-pager-current">'+(options.startingSlide+1)+'</span> '+options.pagerShortSeparator+' <span class="bx-pager-total">'+$children.length+'<span>';}
if(options.pagerSelector){$(options.pagerSelector).append(pagerString);$pager=$(options.pagerSelector);}else{var $pagerContainer=$('<div class="bx-pager"></div>');$pagerContainer.append(pagerString);if(options.pagerLocation=='top'){$outerWrapper.prepend($pagerContainer);}else if(options.pagerLocation=='bottom'){$outerWrapper.append($pagerContainer);}
$pager=$('.bx-pager',$outerWrapper);}
$pager.children().click(function(){if(options.pagerType=='full'){var slideIndex=$pager.children().index(this);if(options.moveSlideQty>1){slideIndex*=options.moveSlideQty;}
base.goToSlide(slideIndex);}
return false;});}
function showCaptions(){var caption=$('img',$children.eq(currentSlide)).attr('title');if(caption!=''){if(options.captionsSelector){$(options.captionsSelector).html(caption);}else{$('.bx-captions',$outerWrapper).html(caption);}}else{if(options.captionsSelector){$(options.captionsSelector).html(' ');}else{$('.bx-captions',$outerWrapper).html(' ');}}}
function showAutoControls(startType,startContent,stopType,stopContent){$autoControls=$('<a href="" class="bx-start"></a>');if(startType=='text'){$startContent=startContent;}else{$startContent='<img src="'+startContent+'" />';}
if(stopType=='text'){$stopContent=stopContent;}else{$stopContent='<img src="'+stopContent+'" />';}
if(options.autoControlsSelector){$(options.autoControlsSelector).append($autoControls);}else{$outerWrapper.append('<div class="bx-auto"></div>');$('.bx-auto',$outerWrapper).html($autoControls);}
$autoControls.click(function(){if(options.ticker){if($(this).hasClass('stop')){base.stopTicker();}else if($(this).hasClass('start')){base.startTicker();}}else{if($(this).hasClass('stop')){base.stopShow(true);}else if($(this).hasClass('start')){base.startShow(true);}}
return false;});}
function checkEndControls(){if(!options.infiniteLoop&&options.hideControlOnEnd){if(currentSlide==firstSlide){$('.bx-prev',$outerWrapper).hide();}else{$('.bx-prev',$outerWrapper).show();}
if(currentSlide==lastSlide){$('.bx-next',$outerWrapper).hide();}else{$('.bx-next',$outerWrapper).show();}}}
function getSlidePosition(number,side){if(side=='left'){var position=$('.pager',$outerWrapper).eq(number).position().left;}else if(side=='top'){var position=$('.pager',$outerWrapper).eq(number).position().top;}
return position;}
function getWrapperWidth(){var wrapperWidth=$firstChild.outerWidth()*options.displaySlideQty;return wrapperWidth;}
function getWrapperHeight(){var wrapperHeight=$firstChild.outerHeight()*options.displaySlideQty;return wrapperHeight;}
function getArraySample(array,start,length,direction){var sample=[];var loopLength=length;var startPopulatingArray=false;if(direction=='backward'){array=$.makeArray(array);array.reverse();}
while(loopLength>0){$.each(array,function(index,val){if(loopLength>0){if(!startPopulatingArray){if(index==start){startPopulatingArray=true;sample.push($(this).clone());loopLength--;}}else{sample.push($(this).clone());loopLength--;}}else{return false;}});}
return sample;}
this.each(function(){base.initShow();});return this;}})(jQuery);


(function(a){a.fn.backgroundCanvas=function(){a(this).each(function(){var e=a(this);a.browser.version=a.browser.msie&&parseInt(a.browser.version)==6&&window.XMLHttpRequest?"7.0":a.browser.version;e.css("background-color","transparent");e.css("border-color","transparent");e.css("background-image","none");e.wrapInner('<div class="jbgContentDiv" style="width:auto; height:auto; border: 0px transparent solid; margin: 0 0 0 0; display:block; position:relative;"></div>');var d=e.children(".jbgContentDiv");if(a.browser.msie){if(!window.XMLHttpRequest){e.css("border-color","#fac2f5");e.css("filter","chroma(color=#fac2f5)");if(!e.get(0).hasLayout){e.css("zoom","1")}}var b=document.createElement("div");b.className="jbgCanvasDiv";b.style.position="relative";b.style.display="block";b.style.height="0px";b.style.width="0px";var c=document.createElement("canvas");c.className="jbgCanvas";c.style.height="0px";c.style.width="0px";c.style.position="absolute";c=G_vmlCanvasManager.initElement(c);e.get(0).insertBefore(b,e.get(0).firstChild);b.appendChild(c)}else{e.prepend('<div class="jbgCanvasDiv" style="display:block; position:relative; width:0px; height:0px; padding: 0 0 0 0; margin: 0 0 0 0;"><canvas class="jbgCanvas" style="position:absolute; width:0px; height:0px;" ></canvas></div>')}});return this};a.fn.backgroundCanvasPaint=function(b){a(this).each(function(){var m=a(this);var p=m.children(".jbgCanvasDiv");var n=p.children(".jbgCanvas");var c=m.children(".jbgContentDiv");if(n.length==0){return this}var g=n.get(0);var e=m.outerWidth();var q=m.outerHeight();n.width(e+".4px");n.height(q+".4px");var s=parseFloat(m.css("padding-top"));var f=parseFloat(m.css("padding-bottom"));var i=parseFloat(m.css("padding-left"));var h=parseFloat(m.css("padding-right"));var j=m.css("border-top-width");if(m.css("border-top-style")=="none"){j="0"}var l=m.css("border-bottom-width");if(m.css("border-bottom-style")=="none"){l="0"}var k=m.css("border-left-width");if(m.css("border-left-style")=="none"){k="0"}var o=m.css("border-right-width");if(m.css("border-right-style")=="none"){o="0"}if(a.browser.msie){switch(j){case"thin":j="2";break;case"medium":j="4";break;case"thick":j="6";break}switch(l){case"thin":l="2";break;case"medium":l="4";break;case"thick":l="6";break}switch(k){case"thin":k="2";break;case"medium":k="4";break;case"thick":k="6";break}switch(o){case"thin":o="2";break;case"medium":o="4";break;case"thick":o="6";break}n.children("div").width(e+".4px");n.children("div").height(q+".4px")}j=parseFloat(j);l=parseFloat(l);k=parseFloat(k);o=parseFloat(o);p.css("top",-(j+s)+"px");p.css("left",-(k+i)+"px");if(g.getContext){g.width=e;g.height=q;var r=g.getContext("2d");var d={canvas:g,$canvas:n,$canvasDiv:p,$content:c,$this:m,borderLeft:k,borderRight:o,borderTop:j,borderBottom:l,paddingTop:s,paddingBottom:f,paddingLeft:i,paddingRight:h};b(r,e,q,d)}else{alert("can't create context")}});return this};a.canvasPaint={roundedRect:function(j,k){k=jQuery.extend({width:0,radius:0,border:0,stroke:false,fill:true,adjustRadius:true},k);k=jQuery.extend({x:0,y:0,height:k.width,radiusTL:k.radius,radiusTR:k.radius,radiusBL:k.radius,radiusBR:k.radius,borderL:k.border,borderR:k.border,borderT:k.border,borderB:k.border},k);if(k.adjustRadius){k.radiusTL=Math.max(k.radiusTL-((k.borderT+k.borderL)/2),0);k.radiusTR=Math.max(k.radiusTR-((k.borderT+k.borderR)/2),0);k.radiusBL=Math.max(k.radiusBL-((k.borderB+k.borderL)/2),0);k.radiusBR=Math.max(k.radiusBR-((k.borderB+k.borderR)/2),0)}var f=k.x+k.borderL;var e=k.y+k.borderT;var c=k.width-k.borderL-k.borderR;var i=k.height-k.borderT-k.borderB;var h=k.radiusTL*0.3333;var d=k.radiusTR*0.3333;var b=k.radiusBL*0.3333;var g=k.radiusBR*0.3333;j.beginPath();j.moveTo(f,e+k.radiusTL);j.lineTo(f,e+i-k.radiusBL);j.bezierCurveTo(f,e+i-b,f+b,e+i,f+k.radiusBL,e+i);j.lineTo(f+c-k.radiusBR,e+i);j.bezierCurveTo(f+c-g,e+i,f+c,e+i-g,f+c,e+i-k.radiusBR);j.lineTo(f+c,e+k.radiusTR);j.bezierCurveTo(f+c,e+d,f+c-d,e,f+c-k.radiusTR,e);j.lineTo(f+k.radiusTL,e);j.bezierCurveTo(f+h,e,f,e+h,f,e+k.radiusTL);if(k.stroke){j.stroke()}if(k.fill){j.fill()}},roundTab:function(m,n){n=jQuery.extend({x:0,y:0,width:0,radiusLeft:0,radiusRight:0,bottomRadiusLeft:0,bottomRadiusRight:0,offsetLeft:0,offsetRight:0,border:0,stroke:false,fill:true,adjustRadius:true},n);n=jQuery.extend({height:n.width},n);if(n.adjustRadius){n.radiusLeft=n.radiusLeft-n.border;n.radiusRight=n.radiusRight-n.border;n.bottomRadiusLeft=n.bottomRadiusLeft-n.border;n.bottomRadiusRight=n.bottomRadiusRight-n.border}var k=n.x+n.border;var h=n.y+n.border;var b=n.width-n.border-n.border;var l=n.height-n.border;var c=Math.sqrt((l*l)+(n.offsetLeft*n.offsetLeft));var i=Math.sqrt((l*l)+(n.offsetRight*n.offsetRight));m.beginPath();var j=(n.radiusLeft*n.offsetLeft)/c;var e=(n.radiusLeft*l)/c;var f=n.radiusLeft*0.3333;var g=j*0.3333;var d=e*0.3333;m.moveTo(k+n.offsetLeft-j,h+e);m.bezierCurveTo(k+n.offsetLeft-g,h+d,k+n.offsetLeft+f,h,k+n.offsetLeft+n.radiusLeft,h);var j=(n.radiusRight*n.offsetRight)/i;var e=(n.radiusRight*l)/i;var f=n.radiusRight*0.3333;var g=j*0.3333;var d=e*0.3333;m.lineTo(k+b-n.offsetRight-n.radiusRight,h);m.bezierCurveTo(k+b-n.offsetRight-f,h,k+b-n.offsetRight+g,h+d,k+b-n.offsetRight+j,h+e);var j=(n.bottomRadiusRight*n.offsetRight)/i;var e=(n.bottomRadiusRight*l)/i;var f=n.bottomRadiusRight*0.3333;var g=j*0.3333;var d=e*0.3333;m.lineTo(k+b-j,h+l-e);m.bezierCurveTo(k+b-g,h+l-d,k+b+f,h+l,k+b+n.bottomRadiusRight,h+l);var j=(n.bottomRadiusLeft*n.offsetLeft)/c;var e=(n.bottomRadiusLeft*l)/c;var f=n.bottomRadiusLeft*0.3333;var g=j*0.3333;var d=e*0.3333;m.lineTo(k-n.bottomRadiusLeft,h+l);m.bezierCurveTo(k-f,h+l,k+g,h+l-d,k+j,h+l-e);if(n.stroke){m.stroke()}if(n.fill){m.fill()}}}})(jQuery);


(function(a){a.fn.reverseOrder=function(){return this.each(function(){a(this).prependTo(a(this).parent())})}})(jQuery);jQuery.fn.reverse=function(){return this.pushStack(this.get().reverse(),arguments)};jQuery.fn.sort=function(){return this.pushStack([].sort.apply(this,arguments),[])};


var jeanDates;
var currentDate;

$(document).ready( function() {
	   $.ajax({
		  type: "get",
		  url: "jeansday.json",
		  dataType: "json",
		  success: function(data) { setDates(data); },
		  error: function() { $('.date').html('Sorry, could not make it happen'); }
		});

		$(".sliderWrapper").backgroundCanvas();

		$('#slider').bxSlider({
			speed: 1000,
			onNextSlide: function(currentSlideNumber) {
				currentDate.setDate((currentDate.getDate()+1));
				setAnswer(3);
				setDay(3);
				setAnswer(currentSlideNumber + 1);
				setDay(currentSlideNumber + 1);
			},
			onPrevSlide: function(currentSlideNumber) {
				currentDate.setDate((currentDate.getDate()-1));
				setAnswer(0);
				setDay(0);
				setAnswer(currentSlideNumber + 1);
				setDay(currentSlideNumber + 1);
			}
		});
});

function setDates(dates) {
	jeanDates = dates;
	currentDate = new Date();
	setAnswer(1);
	setDay(1);
}

function setAnswer(index) {
	var key = currentDate.getFullYear() + '-' + padDateNumber(currentDate.getMonth() +1) + '-' + padDateNumber(currentDate.getDate());
	var answer; var title;
	if (jeanDates[key] == undefined) {
		answer = "No"; title = "";
	} else {
		answer = "Yes"; title = jeanDates[key];
	}
	$('.answer:eq(' + index + ')').html(answer);
	$('.title:eq(' + index + ')').html(title);
}

function padDateNumber(dateNumber) {
	return dateNumber < 9 ? '0' + dateNumber : dateNumber;
}

function setDay(index) {
	$('.date:eq(' + index + ')').html(getDayName(currentDate.getDay()) + ' ' + getMonthName(currentDate.getMonth()) + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear());
}

function getDayName(dayNumber) {
	if (dayNumber == 0) return "Sunday";
	if (dayNumber == 1) return "Monday";
	if (dayNumber == 2) return "Tuesday";
	if (dayNumber == 3) return "Wednesday";
	if (dayNumber == 4) return "Thursday";
	if (dayNumber == 5) return "Friday";
	if (dayNumber == 6) return "Saturday";
	return "";
}

function getMonthName(monthNumber) {
	if (monthNumber == 0) return "January";
	if (monthNumber == 1) return "February";
	if (monthNumber == 2) return "March";
	if (monthNumber == 3) return "April";
	if (monthNumber == 4) return "May";
	if (monthNumber == 5) return "June";
	if (monthNumber == 6) return "July";
	if (monthNumber == 7) return "August";
	if (monthNumber == 8) return "September";
	if (monthNumber == 9) return "October";
	if (monthNumber == 10) return "November";
	if (monthNumber == 11) return "December";
	return "";
}

function DrawBackground() {
	$(".sliderWrapper").backgroundCanvasPaint(BackgroundPaintFkt);
}

$(window).load(function () { DrawBackground(); });
$(window).resize(function() { DrawBackground(); });

function BackgroundPaintFkt(context, width, height, elementInfo)
{
	var options = {x:0, height: height, width: width, radius:14, border: 0 };

	// Draw the border rectangle
	context.fillStyle = "#ccc";
	$.canvasPaint.roundedRect(context,options);

	// Draw the gradient filled inner rectangle
	var backgroundGradient = context.createLinearGradient(0, 0, 0, height - 10);
	backgroundGradient.addColorStop(0 ,'#fff');
	backgroundGradient.addColorStop(1, '#eee');
	options.border = 1;
	context.fillStyle = backgroundGradient;
	$.canvasPaint.roundedRect(context,options);
}
