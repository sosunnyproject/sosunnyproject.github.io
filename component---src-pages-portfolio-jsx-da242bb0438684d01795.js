"use strict";(self.webpackChunksosunnyproject_gatsby_blog=self.webpackChunksosunnyproject_gatsby_blog||[]).push([[211],{3723:function(e,t,M){M.d(t,{G:function(){return Y},L:function(){return T},M:function(){return w},P:function(){return I},_:function(){return u},a:function(){return r},b:function(){return s},c:function(){return c},g:function(){return o},h:function(){return N}});var a=M(7294),n=(M(2369),M(5697)),i=M.n(n);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var M=arguments[t];for(var a in M)Object.prototype.hasOwnProperty.call(M,a)&&(e[a]=M[a])}return e},r.apply(this,arguments)}function u(e,t){if(null==e)return{};var M,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)t.indexOf(M=i[a])>=0||(n[M]=e[M]);return n}const N=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;const c=e=>{var t;return(e=>{var t,M;return Boolean(null==e||null==(t=e.images)||null==(M=t.fallback)?void 0:M.src)})(e)?e:(e=>Boolean(null==e?void 0:e.gatsbyImageData))(e)?e.gatsbyImageData:(e=>Boolean(null==e?void 0:e.gatsbyImage))(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function s(e,t,M,a,n){return void 0===n&&(n={}),r({},M,{loading:a,shouldLoad:e,"data-main-image":"",style:r({},n,{opacity:t?1:0})})}function o(e,t,M,a,n,i,u,N){const c={};i&&(c.backgroundColor=i,"fixed"===M?(c.width=a,c.height=n,c.backgroundColor=i,c.position="relative"):("constrained"===M||"fullWidth"===M)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),u&&(c.objectFit=u),N&&(c.objectPosition=N);const s=r({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:r({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return s}const l=["children"],g=function(e){let{layout:t,width:M,height:n}=e;return"fullWidth"===t?a.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/M*100+"%"}}):"constrained"===t?a.createElement("div",{style:{maxWidth:M,display:"block"}},a.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+n+"' width='"+M+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},T=function(e){let{children:t}=e,M=u(e,l);return a.createElement(a.Fragment,null,a.createElement(g,r({},M)),t,null)},j=["src","srcSet","loading","alt","shouldLoad"],L=["fallback","sources","shouldLoad"],z=function(e){let{src:t,srcSet:M,loading:n,alt:i="",shouldLoad:N}=e,c=u(e,j);return a.createElement("img",r({},c,{decoding:"async",loading:n,src:N?t:void 0,"data-src":N?void 0:t,srcSet:N?M:void 0,"data-srcset":N?void 0:M,alt:i}))},D=function(e){let{fallback:t,sources:M=[],shouldLoad:n=!0}=e,i=u(e,L);const N=i.sizes||(null==t?void 0:t.sizes),c=a.createElement(z,r({},i,t,{sizes:N,shouldLoad:n}));return M.length?a.createElement("picture",null,M.map((e=>{let{media:t,srcSet:M,type:i}=e;return a.createElement("source",{key:t+"-"+i+"-"+M,type:i,media:t,srcSet:n?M:void 0,"data-srcset":n?void 0:M,sizes:N})})),c):c};var y;z.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},D.displayName="Picture",D.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};const d=["fallback"],I=function(e){let{fallback:t}=e,M=u(e,d);return t?a.createElement(D,r({},M,{fallback:{src:t},"aria-hidden":!0,alt:""})):a.createElement("div",r({},M))};I.displayName="Placeholder",I.propTypes={fallback:n.string,sources:null==(y=D.propTypes)?void 0:y.sources,alt:function(e,t,M){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+M+"`. Validation failed."):null}};const w=function(e){return a.createElement(a.Fragment,null,a.createElement(D,r({},e)),a.createElement("noscript",null,a.createElement(D,r({},e,{shouldLoad:!0}))))};w.displayName="MainImage",w.propTypes=D.propTypes;const O=function(e,t,M){for(var a=arguments.length,n=new Array(a>3?a-3:0),r=3;r<a;r++)n[r-3]=arguments[r];return e.alt||""===e.alt?i().string.apply(i(),[e,t,M].concat(n)):new Error('The "alt" prop is required in '+M+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},E={image:i().object.isRequired,alt:O},m=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],A=["style","className"],x=new Set;let C,p;const k=function(e){let{as:t="div",image:n,style:i,backgroundColor:c,className:s,class:o,onStartLoad:l,onLoad:g,onError:T}=e,j=u(e,m);const{width:L,height:z,layout:D}=n,y=function(e,t,M){const a={};let n="gatsby-image-wrapper";return"fixed"===M?(a.width=e,a.height=t):"constrained"===M&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:a}}(L,z,D),{style:d,className:I}=y,w=u(y,A),O=(0,a.useRef)(),E=(0,a.useMemo)((()=>JSON.stringify(n.images)),[n.images]);o&&(s=o);const k=function(e,t,M){let a="";return"fullWidth"===e&&(a='<div aria-hidden="true" style="padding-top: '+M/t*100+'%;"></div>'),"constrained"===e&&(a='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+M+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),a}(D,L,z);return(0,a.useEffect)((()=>{C||(C=Promise.all([M.e(774),M.e(223)]).then(M.bind(M,8223)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:M}=e;return p=t,{renderImageToString:t,swapPlaceholderImage:M}})));const e=O.current.querySelector("[data-gatsby-image-ssr]");if(e&&N())return e.complete?(null==l||l({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==l||l({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void x.add(E);if(p&&x.has(E))return;let t,a;return C.then((e=>{let{renderImageToString:M,swapPlaceholderImage:u}=e;O.current&&(O.current.innerHTML=M(r({isLoading:!0,isLoaded:x.has(E),image:n},j)),x.has(E)||(t=requestAnimationFrame((()=>{O.current&&(a=u(O.current,E,x,i,l,g,T))}))))})),()=>{t&&cancelAnimationFrame(t),a&&a()}}),[n]),(0,a.useLayoutEffect)((()=>{x.has(E)&&p&&(O.current.innerHTML=p(r({isLoading:x.has(E),isLoaded:x.has(E),image:n},j)),null==l||l({wasCached:!0}),null==g||g({wasCached:!0}))}),[n]),(0,a.createElement)(t,r({},w,{style:r({},d,i,{backgroundColor:c}),className:I+(s?" "+s:""),ref:O,dangerouslySetInnerHTML:{__html:k},suppressHydrationWarning:!0}))},Y=(0,a.memo)((function(e){return e.image?(0,a.createElement)(k,e):null}));Y.propTypes=E,Y.displayName="GatsbyImage";const S=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],h=function(e,t){for(var M=arguments.length,a=new Array(M>2?M-2:0),n=2;n<M;n++)a[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(a)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},f=new Set(["fixed","fullWidth","constrained"]),Q={src:i().string.isRequired,alt:O,width:h,height:h,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!f.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},v=(U=Y,function(e){let{src:t,__imageData:M,__error:n}=e,i=u(e,S);return n&&console.warn(n),M?a.createElement(U,r({image:M},i)):(console.warn("Image not loaded",t),null)});var U;v.displayName="StaticImage",v.propTypes=Q},2369:function(e){const t=(e,t)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);if(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim(),0===e.length)return"";if(1===e.length)return t.pascalCase?e.toUpperCase():e.toLowerCase();return e!==e.toLowerCase()&&(e=(e=>{let t=!1,M=!1,a=!1;for(let n=0;n<e.length;n++){const i=e[n];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,n)+"-"+e.slice(n),t=!1,a=M,M=!0,n++):M&&a&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,n-1)+"-"+e.slice(n-1),a=M,M=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,a=M,M=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e})(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,((e,t)=>t.toUpperCase())).replace(/\d+(\w|$)/g,(e=>e.toUpperCase())),M=e,t.pascalCase?M.charAt(0).toUpperCase()+M.slice(1):M;var M};e.exports=t,e.exports.default=t},4108:function(e,t,M){M.d(t,{Z:function(){return i}});var a=M(7294),n=M(6717);function i(e){let{children:t}=e;return a.createElement("div",{className:n.q3},t)}},6498:function(e,t,M){M.d(t,{Z:function(){return r}});var a=M(7294),n=M(1883),i="header-module--navText--69ea8";function r(){return a.createElement("div",{className:"header-module--headerContainer--591af"},a.createElement("div",{className:"header-module--logoText--2a622"},a.createElement(n.Link,{to:"/"},"have so sunny day")),a.createElement("div",{className:"header-module--navContainer--caa58"},a.createElement(n.Link,{to:"/intro/",className:i},"intro"),a.createElement(n.Link,{to:"/portfolio/",className:i},"portfolio"),a.createElement(n.Link,{to:"/blog/",className:i},"blog"),a.createElement(n.Link,{to:"/vitae/",className:i},"vitae"),a.createElement("div",{className:"header-module--socialContainer--8d472"},a.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.instagram.com/sosunnyproject"},a.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMXB0IiB2aWV3Qm94PSIwIDAgNTExIDUxMS45IiB3aWR0aD0iNTExcHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTUxMC45NDkyMTkgMTUwLjVjLTEuMTk5MjE5LTI3LjE5OTIxOS01LjU5NzY1Ny00NS44OTg0MzgtMTEuODk4NDM4LTYyLjEwMTU2Mi02LjUtMTcuMTk5MjE5LTE2LjUtMzIuNTk3NjU3LTI5LjYwMTU2Mi00NS4zOTg0MzgtMTIuODAwNzgxLTEzLTI4LjMwMDc4MS0yMy4xMDE1NjItNDUuMzAwNzgxLTI5LjUtMTYuMjk2ODc2LTYuMzAwNzgxLTM0Ljg5ODQzOC0xMC42OTkyMTktNjIuMDk3NjU3LTExLjg5ODQzOC0yNy40MDIzNDMtMS4zMDA3ODEtMzYuMTAxNTYyLTEuNjAxNTYyLTEwNS42MDE1NjItMS42MDE1NjJzLTc4LjE5OTIxOS4zMDA3ODEtMTA1LjUgMS41Yy0yNy4xOTkyMTkgMS4xOTkyMTktNDUuODk4NDM4IDUuNjAxNTYyLTYyLjA5NzY1NyAxMS44OTg0MzgtMTcuMjAzMTI0IDYuNS0zMi42MDE1NjIgMTYuNS00NS40MDIzNDMgMjkuNjAxNTYyLTEzIDEyLjgwMDc4MS0yMy4wOTc2NTcgMjguMzAwNzgxLTI5LjUgNDUuMzAwNzgxLTYuMzAwNzgxIDE2LjMwMDc4MS0xMC42OTkyMTkgMzQuODk4NDM4LTExLjg5ODQzOCA2Mi4wOTc2NTctMS4zMDA3ODEgMjcuNDAyMzQzLTEuNjAxNTYyIDM2LjEwMTU2Mi0xLjYwMTU2MiAxMDUuNjAxNTYycy4zMDA3ODEgNzguMTk5MjE5IDEuNSAxMDUuNWMxLjE5OTIxOSAyNy4xOTkyMTkgNS42MDE1NjIgNDUuODk4NDM4IDExLjkwMjM0MyA2Mi4xMDE1NjIgNi41IDE3LjE5OTIxOSAxNi41OTc2NTcgMzIuNTk3NjU3IDI5LjU5NzY1NyA0NS4zOTg0MzggMTIuODAwNzgxIDEzIDI4LjMwMDc4MSAyMy4xMDE1NjIgNDUuMzAwNzgxIDI5LjUgMTYuMzAwNzgxIDYuMzAwNzgxIDM0Ljg5ODQzOCAxMC42OTkyMTkgNjIuMTAxNTYyIDExLjg5ODQzOCAyNy4yOTY4NzYgMS4yMDMxMjQgMzYgMS41IDEwNS41IDEuNXM3OC4xOTkyMTktLjI5Njg3NiAxMDUuNS0xLjVjMjcuMTk5MjE5LTEuMTk5MjE5IDQ1Ljg5ODQzOC01LjU5NzY1NyA2Mi4wOTc2NTctMTEuODk4NDM4IDM0LjQwMjM0My0xMy4zMDA3ODEgNjEuNjAxNTYyLTQwLjUgNzQuOTAyMzQzLTc0Ljg5ODQzOCA2LjI5Njg3Ni0xNi4zMDA3ODEgMTAuNjk5MjE5LTM0LjkwMjM0MyAxMS44OTg0MzgtNjIuMTAxNTYyIDEuMTk5MjE5LTI3LjMwMDc4MSAxLjUtMzYgMS41LTEwNS41cy0uMTAxNTYyLTc4LjE5OTIxOS0xLjMwMDc4MS0xMDUuNXptLTQ2LjA5NzY1NyAyMDljLTEuMTAxNTYyIDI1LTUuMzAwNzgxIDM4LjUtOC44MDA3ODEgNDcuNS04LjYwMTU2MiAyMi4zMDA3ODEtMjYuMzAwNzgxIDQwLTQ4LjYwMTU2MiA0OC42MDE1NjItOSAzLjUtMjIuNTk3NjU3IDcuNjk5MjE5LTQ3LjUgOC43OTY4NzYtMjcgMS4yMDMxMjQtMzUuMDk3NjU3IDEuNS0xMDMuMzk4NDM4IDEuNXMtNzYuNS0uMjk2ODc2LTEwMy40MDIzNDMtMS41Yy0yNS0xLjA5NzY1Ny0zOC41LTUuMjk2ODc2LTQ3LjUtOC43OTY4NzYtMTEuMDk3NjU3LTQuMTAxNTYyLTIxLjE5OTIxOS0xMC42MDE1NjItMjkuMzk4NDM4LTE5LjEwMTU2Mi04LjUtOC4zMDA3ODEtMTUtMTguMzAwNzgxLTE5LjEwMTU2Mi0yOS4zOTg0MzgtMy41LTktNy42OTkyMTktMjIuNjAxNTYyLTguNzk2ODc2LTQ3LjUtMS4yMDMxMjQtMjctMS41LTM1LjEwMTU2Mi0xLjUtMTAzLjQwMjM0M3MuMjk2ODc2LTc2LjUgMS41LTEwMy4zOTg0MzhjMS4wOTc2NTctMjUgNS4yOTY4NzYtMzguNSA4Ljc5Njg3Ni00Ny41IDQuMTAxNTYyLTExLjEwMTU2MiAxMC42MDE1NjItMjEuMTk5MjE5IDE5LjIwMzEyNC0yOS40MDIzNDMgOC4yOTY4NzYtOC41IDE4LjI5Njg3Ni0xNSAyOS4zOTg0MzgtMTkuMDk3NjU3IDktMy41IDIyLjYwMTU2Mi03LjY5OTIxOSA0Ny41LTguODAwNzgxIDI3LTEuMTk5MjE5IDM1LjEwMTU2Mi0xLjUgMTAzLjM5ODQzOC0xLjUgNjguNDAyMzQzIDAgNzYuNS4zMDA3ODEgMTAzLjQwMjM0MyAxLjUgMjUgMS4xMDE1NjIgMzguNSA1LjMwMDc4MSA0Ny41IDguODAwNzgxIDExLjA5NzY1NyA0LjA5NzY1NyAyMS4xOTkyMTkgMTAuNTk3NjU3IDI5LjM5ODQzOCAxOS4wOTc2NTcgOC41IDguMzAwNzgxIDE1IDE4LjMwMDc4MSAxOS4xMDE1NjIgMjkuNDAyMzQzIDMuNSA5IDcuNjk5MjE5IDIyLjU5NzY1NyA4LjgwMDc4MSA0Ny41IDEuMTk5MjE5IDI3IDEuNSAzNS4wOTc2NTcgMS41IDEwMy4zOTg0MzhzLS4zMDA3ODEgNzYuMzAwNzgxLTEuNSAxMDMuMzAwNzgxem0wIDAiLz48cGF0aCBkPSJtMjU2LjQ0OTIxOSAxMjQuNWMtNzIuNTk3NjU3IDAtMTMxLjUgNTguODk4NDM4LTEzMS41IDEzMS41czU4LjkwMjM0MyAxMzEuNSAxMzEuNSAxMzEuNWM3Mi42MDE1NjIgMCAxMzEuNS01OC44OTg0MzggMTMxLjUtMTMxLjVzLTU4Ljg5ODQzOC0xMzEuNS0xMzEuNS0xMzEuNXptMCAyMTYuODAwNzgxYy00Ny4wOTc2NTcgMC04NS4zMDA3ODEtMzguMTk5MjE5LTg1LjMwMDc4MS04NS4zMDA3ODFzMzguMjAzMTI0LTg1LjMwMDc4MSA4NS4zMDA3ODEtODUuMzAwNzgxYzQ3LjEwMTU2MiAwIDg1LjMwMDc4MSAzOC4xOTkyMTkgODUuMzAwNzgxIDg1LjMwMDc4MXMtMzguMTk5MjE5IDg1LjMwMDc4MS04NS4zMDA3ODEgODUuMzAwNzgxem0wIDAiLz48cGF0aCBkPSJtNDIzLjg1MTU2MiAxMTkuMzAwNzgxYzAgMTYuOTUzMTI1LTEzLjc0NjA5MyAzMC42OTkyMTktMzAuNzAzMTI0IDMwLjY5OTIxOS0xNi45NTMxMjYgMC0zMC42OTkyMTktMTMuNzQ2MDk0LTMwLjY5OTIxOS0zMC42OTkyMTkgMC0xNi45NTcwMzEgMTMuNzQ2MDkzLTMwLjY5OTIxOSAzMC42OTkyMTktMzAuNjk5MjE5IDE2Ljk1NzAzMSAwIDMwLjcwMzEyNCAxMy43NDIxODggMzAuNzAzMTI0IDMwLjY5OTIxOXptMCAwIi8+PC9zdmc+",alt:"instagram",width:"20px",height:"auto"})),a.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.youtube.com/channel/UCKNXAqIvqc25JJ1CWdayqBA"},a.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00OTAuMjQsMTEzLjkyYy0xMy44ODgtMjQuNzA0LTI4Ljk2LTI5LjI0OC01OS42NDgtMzAuOTc2QzM5OS45MzYsODAuODY0LDMyMi44NDgsODAsMjU2LjA2NCw4MA0KCQkJYy02Ni45MTIsMC0xNDQuMDMyLDAuODY0LTE3NC42NTYsMi45MTJjLTMwLjYyNCwxLjc2LTQ1LjcyOCw2LjI3Mi01OS43NDQsMzEuMDA4QzcuMzYsMTM4LjU5MiwwLDE4MS4wODgsMCwyNTUuOTA0DQoJCQlDMCwyNTUuOTY4LDAsMjU2LDAsMjU2YzAsMC4wNjQsMCwwLjA5NiwwLDAuMDk2djAuMDY0YzAsNzQuNDk2LDcuMzYsMTE3LjMxMiwyMS42NjQsMTQxLjcyOA0KCQkJYzE0LjAxNiwyNC43MDQsMjkuMDg4LDI5LjE4NCw1OS43MTIsMzEuMjY0QzExMi4wMzIsNDMwLjk0NCwxODkuMTUyLDQzMiwyNTYuMDY0LDQzMmM2Ni43ODQsMCwxNDMuODcyLTEuMDU2LDE3NC41Ni0yLjgxNg0KCQkJYzMwLjY4OC0yLjA4LDQ1Ljc2LTYuNTYsNTkuNjQ4LTMxLjI2NEM1MDQuNzA0LDM3My41MDQsNTEyLDMzMC42ODgsNTEyLDI1Ni4xOTJjMCwwLDAtMC4wOTYsMC0wLjE2YzAsMCwwLTAuMDY0LDAtMC4wOTYNCgkJCUM1MTIsMTgxLjA4OCw1MDQuNzA0LDEzOC41OTIsNDkwLjI0LDExMy45MnogTTE5MiwzNTJWMTYwbDE2MCw5NkwxOTIsMzUyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",alt:"youtube",width:"20px",height:"auto"})),a.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.github.com/sosunnyproject"},a.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yNTUuOTY4LDUuMzI5QzExNC42MjQsNS4zMjksMCwxMjAuNDAxLDAsMjYyLjM1M2MwLDExMy41MzYsNzMuMzQ0LDIwOS44NTYsMTc1LjEwNCwyNDMuODcyCgkJCWMxMi44LDIuMzY4LDE3LjQ3Mi01LjU2OCwxNy40NzItMTIuMzg0YzAtNi4xMTItMC4yMjQtMjIuMjcyLTAuMzUyLTQzLjcxMmMtNzEuMiwxNS41Mi04Ni4yNC0zNC40NjQtODYuMjQtMzQuNDY0CgkJCWMtMTEuNjE2LTI5LjY5Ni0yOC40MTYtMzcuNi0yOC40MTYtMzcuNmMtMjMuMjY0LTE1LjkzNiwxLjcyOC0xNS42MTYsMS43MjgtMTUuNjE2YzI1LjY5NiwxLjgyNCwzOS4yLDI2LjQ5NiwzOS4yLDI2LjQ5NgoJCQljMjIuODQ4LDM5LjI2NCw1OS45MzYsMjcuOTM2LDc0LjUyOCwyMS4zNDRjMi4zMDQtMTYuNjA4LDguOTI4LTI3LjkzNiwxNi4yNTYtMzQuMzY4CgkJCWMtNTYuODMyLTYuNDk2LTExNi42MDgtMjguNTQ0LTExNi42MDgtMTI3LjAwOGMwLTI4LjA2NCw5Ljk4NC01MS4wMDgsMjYuMzY4LTY4Ljk5MmMtMi42NTYtNi40OTYtMTEuNDI0LTMyLjY0LDIuNDk2LTY4CgkJCWMwLDAsMjEuNTA0LTYuOTEyLDcwLjQsMjYuMzM2YzIwLjQxNi01LjY5Niw0Mi4zMDQtOC41NDQsNjQuMDk2LTguNjRjMjEuNzI4LDAuMTI4LDQzLjY0OCwyLjk0NCw2NC4wOTYsOC42NzIKCQkJYzQ4Ljg2NC0zMy4yNDgsNzAuMzM2LTI2LjMzNiw3MC4zMzYtMjYuMzM2YzEzLjk1MiwzNS4zOTIsNS4xODQsNjEuNTA0LDIuNTYsNjhjMTYuNDE2LDE3Ljk4NCwyNi4zMDQsNDAuOTI4LDI2LjMwNCw2OC45OTIKCQkJYzAsOTguNzItNTkuODQsMTIwLjQ0OC0xMTYuODY0LDEyNi44MTZjOS4xODQsNy45MzYsMTcuMzc2LDIzLjYxNiwxNy4zNzYsNDcuNTg0YzAsMzQuMzY4LTAuMzIsNjIuMDgtMC4zMiw3MC40OTYKCQkJYzAsNi44OCw0LjYwOCwxNC44OCwxNy42LDEyLjM1MkM0MzguNzIsNDcyLjE0NSw1MTIsMzc1Ljg1Nyw1MTIsMjYyLjM1M0M1MTIsMTIwLjQwMSwzOTcuMzc2LDUuMzI5LDI1NS45NjgsNS4zMjl6Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",alt:"github",width:"20px",height:"auto"})),a.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.linkedin.com/in/sosunpark"},a.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY4MnB0IiB2aWV3Qm94PSItMjEgLTM1IDY4Mi42NjY2OSA2ODIiIHdpZHRoPSI2ODJwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNzcuNjEzMjgxLS42Njc5NjljLTQ2LjkyOTY4NyAwLTc3LjYxMzI4MSAzMC44MTY0MDctNzcuNjEzMjgxIDcxLjMyMDMxMyAwIDM5LjYwOTM3NSAyOS43Njk1MzEgNzEuMzA0Njg3IDc1LjgxMjUgNzEuMzA0Njg3aC44OTA2MjVjNDcuODQ3NjU2IDAgNzcuNjI1LTMxLjY5NTMxMiA3Ny42MjUtNzEuMzA0Njg3LS44OTQ1MzEtNDAuNTAzOTA2LTI5Ljc3NzM0NC03MS4zMjAzMTMtNzYuNzE0ODQ0LTcxLjMyMDMxM3ptMCAwIi8+PHBhdGggZD0ibTguMTA5Mzc1IDE5OC4zMTI1aDEzNy4xOTUzMTN2NDEyLjc1NzgxMmgtMTM3LjE5NTMxM3ptMCAwIi8+PHBhdGggZD0ibTQ4Mi4wNTQ2ODggMTg4LjYyNWMtNzQuMDExNzE5IDAtMTIzLjY0MDYyNiA2OS41NDY4NzUtMTIzLjY0MDYyNiA2OS41NDY4NzV2LTU5Ljg1OTM3NWgtMTM3LjE5OTIxOHY0MTIuNzU3ODEyaDEzNy4xOTE0MDZ2LTIzMC41YzAtMTIuMzM5ODQzLjg5NDUzMS0yNC42NjAxNTYgNC41MTk1MzEtMzMuNDg0Mzc0IDkuOTE3OTY5LTI0LjY0MDYyNiAzMi40ODgyODEtNTAuMTY3OTY5IDcwLjM5MDYyNS01MC4xNjc5NjkgNDkuNjQ0NTMyIDAgNjkuNSAzNy44NTE1NjIgNjkuNSA5My4zMzk4NDN2MjIwLjgxMjVoMTM3LjE4MzU5NHYtMjM2LjY2Nzk2OGMwLTEyNi43ODEyNS02Ny42ODc1LTE4NS43NzczNDQtMTU3Ljk0NTMxMi0xODUuNzc3MzQ0em0wIDAiLz48L3N2Zz4=",alt:"linkedin",width:"20px",height:"auto"})))))}},1701:function(e,t,M){M.r(t),M.d(t,{default:function(){return s}});var a=M(7294),n=M(6498),i=M(4108),r=M(6717),u=M(1883),N=M(3723);function c(e){var t,M,n;let{node:i}=e;const c=(0,N.c)(null===(t=i.frontmatter)||void 0===t?void 0:t.featuredImage);return a.createElement("div",{key:i.id,className:r.Ol},a.createElement(u.Link,{to:i.fields.slug},a.createElement(N.G,{image:c,alt:"",layout:"fullWidth",width:480,aspectRatio:16/9}),a.createElement("h3",null,null==i||null===(M=i.frontmatter)||void 0===M?void 0:M.title)),a.createElement("h4",null,null==i||null===(n=i.frontmatter)||void 0===n?void 0:n.date))}function s(e){let{data:t}=e;return a.createElement(i.Z,null,a.createElement(n.Z,null),a.createElement("div",{className:r.WD},t.allMarkdownRemark.edges.map((e=>{let{node:t}=e;return"portfolio"===t.frontmatter.category&&a.createElement(c,{node:t,key:t.id})}))))}},6717:function(e,t,M){M.d(t,{$z:function(){return l},JQ:function(){return a},Kz:function(){return i},Ol:function(){return c},SN:function(){return r},WD:function(){return s},bM:function(){return n},cN:function(){return g},lm:function(){return N},m5:function(){return o},q3:function(){return u}});var a="container-module--canvas--b2d32",n="container-module--highlightSpan--48ec8",i="container-module--index--10a43",r="container-module--indexBottom--7202d",u="container-module--innerLayout--cf7f9",N="container-module--jsText--7fc2a",c="container-module--portfolioCard--863e7",s="container-module--portfolioList--5fec2",o="container-module--portfolioWrapper--cf1f5",l="container-module--postList--0bde6",g="container-module--postWrapper--206d1"}}]);
//# sourceMappingURL=component---src-pages-portfolio-jsx-da242bb0438684d01795.js.map