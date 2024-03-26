window.addEventListener("load", function(){
	AOS.init({
		easing: "Linear"
	});

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
			spaceBetween: 10,
			scrollbar: {
				dragSize: 150
			}
		},
		720: {
			slidesPerView: 2,
			spaceBetween: 15,
			scrollbar: {
				dragSize: 200
			}
		},
		940: {
			slidesPerView: 2.5,
			spaceBetween: 20,
			scrollbar: {
				dragSize: 220
			}
		},
		1280: {
			slidesPerView: 3,
			spaceBetween: 25,
			scrollbar: {
				dragSize: 285
			}
		}
	}
    });
	let mainTextFlag=false;

	function mainTextApplication(){
		if(mainTextFlag) return;

		mainTextFlag = true;
			
			let mainText=document.querySelectorAll("#main .text_wrap");

			setTimeout(function(){
				mainText[0].classList.add("active");
			}, 0)
			setTimeout(function(){
				mainText[1].classList.add("active");
			},1000)
			

			setTimeout(function(){
				mainText[0].classList.remove("active");
			}, 1000)
			setTimeout(function(){
				mainText[1].classList.remove("active");
			},2000)
	}

	mainTextApplication();

	let track=document.querySelector(".marquee_track-snap");
	let items=document.querySelectorAll(".marquee_item-snap");
	let tl=gsap.timeline({ repeat: -1, defaults: { ease: "expo.inOut", duration: 1, delay: 1 } });

	for(let i=0; i<items.length; i++){
		let distance=(i+1) * -100;
		tl.to(track, {yPercent: distance});
	}

	let clonedItem = items[0].cloneNode(true);
		track.appendChild(clonedItem);
////

function randomText(str, dom){
	let fake="A!@<>"; // you can customize what letters it will cycle through
	let text=str; // your text
	let speed=30;
	let increment= 2; // frames per step. must be 2

	let length=text.length;
	let si=0;
	let stri=0;
	let block="";
	let fixed="";

	// call self x times, whole function wrapped in setTimeout
	(function rustle(i){
		setTimeout(function(){
			if(--i){
				rustle(i);
			}
			nextFrame(i);
			si=si+1;
		}, speed);

	})(length*increment+1);

	function nextFrame(pos){
		for(let i=0; i<length-stri; i++){
			let num=Math.floor(fake.length * Math.random()); // random number
			let letter=fake.charAt(num); // get random letter
			block=block+letter;
		}

		if(si == (increment-1)){
			stri++;
		}

		if(si == increment){
			// add a letter, every speed*10 ms
			fixed=fixed+text.charAt(stri-1);
			si=0;
		}

		dom.innerHTML=fixed+block;

		block="";
	}
}

let randomFlag=false;

function randomTextApplication(){
	if(randomFlag) return;

	randomFlag=true;

	randomText("어려운 것을 쉽게,", dom[0]);

	setTimeout(function(){
		randomText("쉬운 것을 깊게,", dom[1]);
	}, 500);

	setTimeout(function(){
		randomText("깊은 것을 유쾌하게!", dom[2]);
	}, 1000);
}

let dom=document.querySelectorAll(".about-headline strong");

////
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

	let worksFlag=false;

	function worksTextApplication(){
		if(worksFlag) return;

		worksFlag = true;
			
			let worksText=document.querySelector("#works .text_wrap");
			worksText.classList.add("active");

			setTimeout(function(){
				worksText.classList.remove("active");
			}, 1000);
	}

	let contactFlag=false;

	function contactTextApplication(){
		if(contactFlag) return;

		contactFlag = true;
	
		let contactText=document.querySelector("#contact .text_wrap");
		contactText.classList.add("active");

		setTimeout(function(){
			contactText.classList.remove("active");
		}, 1000);
	}

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
			worksTextApplication();
			if(window.innerHeight + t === document.body.scrollHeight){
				n=4;
				contactTextApplication();
			}
		}
		else {
			n=4;
		}
		if(t > sectionList[0].offsetTop + winh/2){
			randomTextApplication();
		}
		if(t > sectionList[2].offsetTop + winh/2){
			if(document.body.classList.contains("dark") == false){
				document.body.classList.add("dark");
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

			gsap.to(mobileMenu, {opacity:0, duration:0.3, onComplete: function(){
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

});