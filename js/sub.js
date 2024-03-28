window.addEventListener("load", function(){
	AOS.init({
		easing: "Linear",
		once: true
	});

	var swiper = new Swiper(".openSwiper", {
		slidesPerView: 1.5,
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			499: {
				slidesPerView: 1.5,
				spaceBetween: 5
			},
			720: {
				slidesPerView: 2.5,
				spaceBetween: 10
			},
			940: {
				slidesPerView: 2.5,
				spaceBetween: 15
			},
			1280: {
				slidesPerView: 2.5,
				spaceBetween: 20
			}
		}
	});

    let cursor=document.querySelector(".cursor");
	let gnbLi=document.querySelectorAll("#gnb > ul > li");

	let scrollT;

	let section=[document.getElementById("project"), document.getElementById("contact")];

	let t=0;
	let n=3;
	let targety=0;
	let contactFlag=false;

	let mobileTab=document.querySelector("header.top a.tab");
	let mobileMenu=document.querySelector("nav#mobile");
	let mobileList=mobileMenu.firstElementChild.children;

	let casestudyList=document.querySelectorAll("#casestudy ul li");

	gnbLi[n].classList.add("active");
	mobileList[n].classList.add("active");

	let contactText=document.querySelector("#contact .text_wrap");
	let contactTextWrapper=document.querySelector("#contact .contact-top");

	window.addEventListener("scroll", scrollTrigger);

	function scrollTrigger(){
		let t=window.scrollY;
		let winh=window.innerHeight;

		if(t < section[1].offsetTop){
			n=3;
			if(window.innerHeight + t === document.body.scrollHeight){
				n=4;
			}
		}
		else{
			n=4;
		}

		if(n === 4){
			if(document.body.classList.contains("dark") == false){
				document.body.classList.add("dark");
				contactTextApplication();
			}
		}
		else{
			if(document.body.classList.contains("dark") == true){
				document.body.classList.remove("dark");
			}
		}

		for(let i=0; i<gnbLi.length; i++){
			if(i === n){
				if(!gnbLi[i].classList.contains("active")){
					gnbLi[i].classList.add("active");
					mobileList[i].classList.add("active");
				}
			}
			else {
				if(gnbLi[i].classList.contains("active")){
					gnbLi[i].classList.remove("active");
					mobileList[i].classList.remove("active");
				}
			}
		}
	};

	scrollTrigger();

	function contactTextApplication(){
		if(contactFlag) return;

		contactFlag = true;
	
		contactText.classList.add("active");

		setTimeout(function(){
			contactText.classList.remove("active");
		}, 1000);
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

	for(let i=0; i<section.length; i++){
		// let idx=i+3
		gnbLi[i+3].addEventListener("click", function(e){
			e.preventDefault();

			targety=section[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration:0.5});
		});
	}

	for(let i=0; i<section.length; i++){
		mobileList[i+3].addEventListener("click", function(e){
			e.preventDefault();
			targety=section[i].offsetTop;

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
		}
	};

	window.addEventListener("resize", resizeTrigger);

	for(let i=0; i<casestudyList.length; i++){
		casestudyList[i].addEventListener("click", function(e){
			let casestudyDesc=casestudyList[i].lastElementChild;
			e.currentTarget.classList.add("active");
			casestudyDesc.style.display="block";
		});
		
	}

});