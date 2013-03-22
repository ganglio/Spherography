(function(){
	function $(expr, con) {
		return [].slice.call((con || document).querySelectorAll(expr));
	}

	var offsets = [];

	$("article[data-section]").map(function(art){
		offsets[art.getAttribute("data-section")]=art.offsetTop;
	});

	$(".big-dots").map(function(dot){
		dot.addEventListener("click",function(e){

			$(".big-dots").map(function(dot){
				var currentClass = dot.getAttribute("class").replace(" active","");
				dot.setAttribute("class",currentClass);
			});

			var currentClass = e.target.getAttribute("class");
			if (-1 == currentClass.indexOf("active"))
				currentClass += " active";
			e.target.setAttribute("class",currentClass);

			var sectionID = e.target.getAttribute("data-section");
			var fromOffset = window.scrollY;
			var toOffset = offsets[sectionID];
			var toDo = 10;
			var step = (toOffset-fromOffset)/toDo;


			var timer = window.setInterval(function(i){
				if (toDo-- != 0)
					window.scrollTo(0,window.scrollY+step);
				else {
					window.clearInterval(timer);
					window.scrollTo(0,toOffset);
				}
			},1000/60);

		})
	});

	window.addEventListener("scroll",function(e){
		var current = 10;
		offsets.filter(function(e){
			return e>window.scrollY+150;
		}).map(function(e){
			current = Math.min(current,offsets.indexOf(e));
		});

		$(".big-dots").map(function(dot){
			var currentClass = dot.getAttribute("class").replace(" active","");
			dot.setAttribute("class",currentClass);
		});

		var elem = $(".big-dots[data-section='"+(current-1)+"']")[0];
		elem.setAttribute("class",elem.getAttribute("class")+" active");
	});

})();