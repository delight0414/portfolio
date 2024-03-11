window.addEventListener("load", function(){
	AOS.init({
		easing: "linear"
	});

	const rellax=new Rellax(".rellax"); 
		

    const skillSwiper = new Swiper(".skillSwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    initialSlide: 0,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
		draggable: true,
		dragSize: 100,
    },
	breakpoints: {
		499: {
			slidesPerView: 1.4,
			spaceBetween: 5,
			scrollbar: {
				dragSize: 150
			}
		},
		720: {
			slidesPerView: 2,
			spaceBetween: 10,
			scrollbar: {
				dragSize: 200
			}
		},
		940: {
			slidesPerView: 2.5,
			spaceBetween: 15,
			scrollbar: {
				dragSize: 220
			}
		},
		1280: {
			slidesPerView: 3,
			spaceBetween: 20,
			scrollbar: {
				dragSize: 285
			}
		}
	}
    });

	let keyText=document.querySelector("#main .keytext_top");

	function keytextFill(){
		setTimeout(function(){
			keyText.children[0].classList.add("active");
			setTimeout(function(){
				keyText.children[1].classList.add("active");
			}, 500);
		}, 0);
		
		setTimeout(function(){
			keyText.children[0].classList.remove("active");
			setTimeout(function(){
				keyText.children[1].classList.remove("active");
			}, 500);
		}, 2000);
	};
	
	// keytextFill();

	document.querySelectorAll(".marquee-snap").forEach(function(element) {
		let track = element.querySelector(".marquee_track-snap");
		let items = element.querySelectorAll(".marquee_item-snap");
		let tl = gsap.timeline({ repeat: -1, defaults: { ease: "expo.inOut", duration: 1, delay: 1 } });
	
		items.forEach(function(item, index) {
		  let distance = (index + 1) * -100;
			tl.to(track, { yPercent: distance });
		});
	
		let clonedItem = items[0].cloneNode(true);
		track.appendChild(clonedItem);
		});

	let scrollT;
	let sectionList=[];
	sectionList[0]=document.getElementById("main");

	let section=document.querySelectorAll("section");
	let cursor=document.querySelector(".cursor");
	let gnbLi=document.querySelectorAll("#gnb > ul > li");

	for(let i=0; i<section.length; i++){ // 5
		sectionList.push(section[i]);
	}


	let t=0;
	let n=0;
	let targety=0;

	let mobileTab=document.querySelector("#main a.tab");
	let mobileMenu=document.querySelector("nav#mobile");
	let mobileList=mobileMenu.firstElementChild.children;

	function scrollTrigger(){
		let t=window.scrollY;
		let winh=window.innerHeight;

		if(t < sectionList[1].offsetTop){
			n=0;
		}
		else if(t < sectionList[2].offsetTop){
			n=1;
		}
		else if(t < sectionList[3].offsetTop){
			n=2;
		}
		else if(t < sectionList[4].offsetTop){
			n=3;

			if(window.innerHeight + t === document.body.scrollHeight){
				n=4;
				let contactText=document.querySelector("#contact .text_wrap");
				setTimeout(function(){
					contactText.classList.add("active");
					setTimeout(function(){
						contactText.classList.remove("active");
					}, 1000);
				}, 0);
			}
		}
		else {
			n=4;
		}
		if(t > sectionList[2].offsetTop + winh/2){
			if(document.body.classList.contains("dark") == false){
				document.body.classList.add("dark");

					let worksText=document.querySelector("#works .text_wrap");
					setTimeout(function(){
						worksText.classList.add("active");
						setTimeout(function(){
							worksText.classList.remove("active");
						}, 1000);
					}, 10);
			}
		}
		else {
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

	window.addEventListener("scroll", scrollTrigger);

	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();

			targety=sectionList[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration:0.5});
		});
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

	if(!isMobile){
		document.body.addEventListener("mousemove", function(e){
			gsap.to(cursor, {duration: 0.4, left: e.pageX-5, top: e.pageY-5});
		});

		sectionList[3].addEventListener("mouseenter", function(){;
			if(!cursor.classList.contains("active1")){
				cursor.classList.add("active1");
			}
		});
		sectionList[3].addEventListener("mouseleave", function(){
			if(cursor.classList.contains("active1")){
				cursor.classList.remove("active1");
			}
		});
	}
	else {
		document.querySelector(".cursor").style.display="none";
	}
});