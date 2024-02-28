window.addEventListener("load", function(){
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

	gnbLi[n].classList.add("active");

	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					y: 0.25
				}
			}
		},
		scroll: {
			callback: offset => scrollInteraction(offset.y)
		}
	});

	trigger.add(sectionList);

	function scrollInteraction(t){
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
			}
		}
		else {
			n=4;
		}
		
		for(let i=0; i<gnbLi.length; i++){
			if(i === n){
				if(!gnbLi[i].classList.contains("active")){
					gnbLi[i].classList.add("active");
				}
			}
			else {
				if(gnbLi[i].classList.contains("active")){
					gnbLi[i].classList.remove("active");
				}
			}
		}
	}
	
	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=sectionList[i].offsetTop;

			gsap.to(window, {scrollTo: targety, duration:0.7});
		});
	}

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

	let mobileTab=document.querySelector("#main a.tab");
	let mobileMenu=document.querySelector("nav#mobile");
	let mobileList=mobileMenu.firstElementChild.children;

	mobileTab.addEventListener("click", function(e){
		e.preventDefault();
		if(!e.currentTarget.classList.contains("open")){
			e.currentTarget.classList.add("open");
			document.body.classList.add("stop-scrolling");
			mobileMenu.style.display="block";
		}
		else {
			e.currentTarget.classList.remove("open");
			document.body.classList.remove("stop-scrolling");
			mobileMenu.style.display="none";
		}
	});

	for(let i=0; i<mobileList.length; i++){
		mobileList[i].addEventListener("click", function(e){
			e.preventDefault();
			targety=sectionList[i].offsetTop*0.9;

			if(mobileTab.classList.contains("open")){
				mobileTab.classList.remove("open");
				document.body.classList.remove("stop-scrolling");
				mobileMenu.style.display="none";
				gsap.to(window, {scrollTo: targety, duration:0.7});
			}
		});
	}
});