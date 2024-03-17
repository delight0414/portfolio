window.addEventListener("load", function(){

	var swiper = new Swiper(".openSwiper", {
		slidesPerView: 3.5,
		spaceBetween: 30,
		grabCursor: true
	});

    let cursor=document.querySelector(".cursor");
	let gnbLi=document.querySelectorAll("#gnb > ul > li");

	let mobileTab=document.querySelector("header.top a.tab");
	let mobileMenu=document.querySelector("nav#mobile");
	let mobileList=mobileMenu.firstElementChild.children;

    for (let i=0; i<gnbLi.length; i++){
        gnbLi[3].classList.add("active");
        mobileList[3].classList.add("active");
    }
	mobileTab.addEventListener("click", function(e){
		e.preventDefault();
		if(!e.currentTarget.classList.contains("open")){
			e.currentTarget.classList.add("open");
			document.body.classList.add("stop-scrolling");
			
			gsap.fromTo(mobileMenu, {display: "block", opacity:0}, {opacity:1, duration: 0.3});
		}
		else {
			e.currentTarget.classList.remove("open");
			document.body.classList.remove("stop-scrolling");

			gsap.to(mobileMenu, {opacity:0, duration:0.3, oncComplete: function(){
				mobileMenu.style.display="none";
			}});
		}
	});

	for(let i=0; i<mobileList.length; i++){
		mobileList[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=sectionList[i].offsetTop;

			if(mobileTab.classList.contains("open")){
				mobileTab.classList.remove("open");
				document.body.classList.remove("stop-scrolling");
				mobileMenu.style.display="none";
				gsap.to(window, {scrollTo: targety, duration:0.7});
			}
		});
	}

	function resizeTrigger(){
		let winw=window.innerWidth;

		if(winw >= 720){
			if(document.body.classList.contains("stop-scrolling")){
				mobileTab.classList.remove("open");
				document.body.classList.remove("stop-scrolling");
				mobileMenu.style.display="none";
			}
			else return;
		}
	};

	window.addEventListener("resize", resizeTrigger);

	let projectList=document.querySelectorAll("ul.project > li");

	for(let i=0; i<projectList.length; i++){
		let projectImage=projectList[i].lastElementChild;
		projectList[i].addEventListener("mouseenter", function(){
			gsap.fromTo(projectImage, {display:"block", x:0}, {x:0, duration:0.9})
		});
		projectList[i].addEventListener("mouseleave", function(){
			gsap.to(projectImage, {x:0, duration:0, onComplete: function(){
				projectImage.removeAttribute("style");
			}})
		});
	}

});