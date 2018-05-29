var carousel = {
	nowIndex: 0,
	len: $('.ul-img li').length - 1,
	$width: $('.ul-img li').width(),
	flag: true,
	timer: null,
	//入口函数
	init: function (){
		if(this.len > 1){
			this.createDom();
			this.bindEvent();
			this.sliderAuto();
		}
	},
	//动态的生成小圆点和左右按钮
	createDom: function (){
		var str = '',
			strBtn = '';
		for(var i=0; i<this.len; i++){
			if(i == 0){
				str += '<li class="active"></li>';
			}else{
				str += '<li></li>';
			}
		}
		str = '<div class="order"><ul>' + str +'</ul></div>';
		strBtn +=  '<div class="btn">\
						<span class="prevBtn">&lt;</span>\
						<span class="nextBtn">&gt;</span>\
					</div>';
		$('.wrapper').append(str).append(strBtn); 
	},
	bindEvent: function (){
		var self = this;
		$('.order li').add($('.prevBtn')).add($('.nextBtn')).on('click', function (){
			if($(this).attr('class') == 'prevBtn'){
				self.tools('left');
			}else if($(this).attr('class') == 'nextBtn'){
				self.tools('right');
			}else{
				self.tools($(this).index());
			}
		})	
	},
	changeActive: function (){
		$('.active').removeClass('active');
		$('.order li').eq(this.nowIndex).addClass('active');
	},
	slider: function (){
		var self = this;
		$('.ul-img').animate({left: -this.nowIndex * this.$width}, function (){
			self.flag = true;
			self.sliderAuto();
		})
	},
	getIndex: function (dir){
		var self = this;
		if(dir == 'left'){
			if(self.nowIndex == 0){
				$('.ul-img').css('left', -self.len * self.$width);
				self.nowIndex = self.len - 1;
			}else{
				self.nowIndex --;
			}
		}else if(dir == 'right'){
			if(self.nowIndex == self.len - 1){
				$('.ul-img').animate({'left': -self.len * self.$width}, function (){
					$('.ul-img').css('left', 0);
				});
				// $('.ul-img').css('left', 0);
				self.nowIndex = 0;
			}else{
				self.nowIndex ++;
			}
		}else{
			self.nowIndex = dir;
		}
	},
	tools: function (text){
		if(this.flag){
			this.flag = false;
			this.getIndex(text);
			this.slider();
			this.changeActive();
		}
	},
	sliderAuto: function (){
		var self = this;
		clearTimeout(self.timer);
		self.timer = setTimeout(function (){
			self.tools('right');
		}, 2000);
	}
};

carousel.init();