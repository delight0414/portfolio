## 🚩Project - Portfolio

#### 📰 Intro 
React, CSS, Javascript로 개발한 포트폴리오 입니다. React-Router로 SPA 기능을 구현하고 Redux로 데이터 전역 상태관리를 하였습니다.
해당 프로젝트를 gh-pages로 배포한 후 새로고침을 하니 404 에러가 발생했습니다. 이 에러를 디버깅하기 위해 404 에러 발생 시 redirect 하는 방식을 사용하여 정상적으로 웹 페이지를 로드할 수 있게 수정했습니다.

##
#### 👩‍💻 Stack 
<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764abc?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/React router-ca4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572b6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
</div>
<div>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>
<div>
  <img src="https://img.shields.io/badge/gsap-0AE448?style=for-the-badge&logo=gsap&logoColor=white">
  <img src="https://img.shields.io/badge/swiper.js-6332F6?style=for-the-badge&logo=aos&logoColor=white">
  <img src="https://img.shields.io/badge/aos-1FA2ED?style=for-the-badge&logo=aos&logoColor=white">
</div>

##
#### 💻 Code review
🔸 빌드 후 index.html 파일을 404.html 파일로 복사하여 redirection 시켰다.
```javascript
//package.json에서 추가

"scripts": {
"postbuild": "copy build\\index.html build\\404.html",
  //window 환경에서는 copy build\\index.html build\\404.html
  //unix/Linux 환경에서는 cp build/index.html build/404.html
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```
🔸 useLocation을 사용해서 Sub Page에서 네비게이션을 눌렀을 때 Main Page에 있는 해당 섹션으로 갈 수 있게 했다.
```javascript
//src/component/Main.js
import { useLocation } from "react-router-dom";

function Main(){
  let location=useLocation();
  let link=location.state;
  .
  .
  .
  if(link){ // link가 null이 아닐때
    targety=sectionList[Number(link)].offsetTop;
    gsap.to(window, {scrollTo: targety, duration: 0.5});
  }
}
```
```javascript
//src/component/MaintoSub.js
import { useNavigate, useLocation } from "react-router-dom";

function Sub(){
  let navigate=useNavigate();
  let location=useLocation();

  for(let i=0; i<gnbLi.length; i++){
    gnbLi[i].addEventListener("click", function(e){
      e.preventDefault();
        navigate("/", {state: i.toString()});
    })
  }
}

```
