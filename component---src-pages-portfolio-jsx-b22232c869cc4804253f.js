"use strict";(self.webpackChunksosunnyproject_gatsby_blog=self.webpackChunksosunnyproject_gatsby_blog||[]).push([[211],{3204:function(e){const t=(e,t)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);if(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim(),0===e.length)return"";if(1===e.length)return t.pascalCase?e.toUpperCase():e.toLowerCase();return e!==e.toLowerCase()&&(e=(e=>{let t=!1,M=!1,n=!1;for(let a=0;a<e.length;a++){const i=e[a];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,a)+"-"+e.slice(a),t=!1,n=M,M=!0,a++):M&&n&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,a-1)+"-"+e.slice(a-1),n=M,M=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,n=M,M=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e})(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,((e,t)=>t.toUpperCase())).replace(/\d+(\w|$)/g,(e=>e.toUpperCase())),M=e,t.pascalCase?M.charAt(0).toUpperCase()+M.slice(1):M;var M};e.exports=t,e.exports.default=t},3723:function(e,t,M){M.d(t,{G:function(){return S},L:function(){return j},M:function(){return w},P:function(){return I},_:function(){return N},a:function(){return r},b:function(){return s},c:function(){return o},g:function(){return c},h:function(){return u}});var n=M(7294),a=(M(3204),M(5697)),i=M.n(a);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var M=arguments[t];for(var n in M)Object.prototype.hasOwnProperty.call(M,n)&&(e[n]=M[n])}return e},r.apply(this,arguments)}function N(e,t){if(null==e)return{};var M,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(M=i[n])>=0||(a[M]=e[M]);return a}const u=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;const o=e=>{var t;return(e=>{var t,M;return Boolean(null==e||null==(t=e.images)||null==(M=t.fallback)?void 0:M.src)})(e)?e:(e=>Boolean(null==e?void 0:e.gatsbyImageData))(e)?e.gatsbyImageData:(e=>Boolean(null==e?void 0:e.gatsbyImage))(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function s(e,t,M,n,a){return void 0===a&&(a={}),r({},M,{loading:n,shouldLoad:e,"data-main-image":"",style:r({},a,{opacity:t?1:0})})}function c(e,t,M,n,a,i,N,u){const o={};i&&(o.backgroundColor=i,"fixed"===M?(o.width=n,o.height=a,o.backgroundColor=i,o.position="relative"):("constrained"===M||"fullWidth"===M)&&(o.position="absolute",o.top=0,o.left=0,o.bottom=0,o.right=0)),N&&(o.objectFit=N),u&&(o.objectPosition=u);const s=r({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:r({opacity:t?0:1,transition:"opacity 500ms linear"},o)});return s}const g=["children"],l=function(e){let{layout:t,width:M,height:a}=e;return"fullWidth"===t?n.createElement("div",{"aria-hidden":!0,style:{paddingTop:a/M*100+"%"}}):"constrained"===t?n.createElement("div",{style:{maxWidth:M,display:"block"}},n.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+a+"' width='"+M+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},j=function(e){let{children:t}=e,M=N(e,g);return n.createElement(n.Fragment,null,n.createElement(l,r({},M)),t,null)},L=["src","srcSet","loading","alt","shouldLoad"],D=["fallback","sources","shouldLoad"],T=function(e){let{src:t,srcSet:M,loading:a,alt:i="",shouldLoad:u}=e,o=N(e,L);return n.createElement("img",r({},o,{decoding:"async",loading:a,src:u?t:void 0,"data-src":u?void 0:t,srcSet:u?M:void 0,"data-srcset":u?void 0:M,alt:i}))},z=function(e){let{fallback:t,sources:M=[],shouldLoad:a=!0}=e,i=N(e,D);const u=i.sizes||(null==t?void 0:t.sizes),o=n.createElement(T,r({},i,t,{sizes:u,shouldLoad:a}));return M.length?n.createElement("picture",null,M.map((e=>{let{media:t,srcSet:M,type:i}=e;return n.createElement("source",{key:t+"-"+i+"-"+M,type:i,media:t,srcSet:a?M:void 0,"data-srcset":a?void 0:M,sizes:u})})),o):o};var y;T.propTypes={src:a.string.isRequired,alt:a.string.isRequired,sizes:a.string,srcSet:a.string,shouldLoad:a.bool},z.displayName="Picture",z.propTypes={alt:a.string.isRequired,shouldLoad:a.bool,fallback:a.exact({src:a.string.isRequired,srcSet:a.string,sizes:a.string}),sources:a.arrayOf(a.oneOfType([a.exact({media:a.string.isRequired,type:a.string,sizes:a.string,srcSet:a.string.isRequired}),a.exact({media:a.string,type:a.string.isRequired,sizes:a.string,srcSet:a.string.isRequired})]))};const d=["fallback"],I=function(e){let{fallback:t}=e,M=N(e,d);return t?n.createElement(z,r({},M,{fallback:{src:t},"aria-hidden":!0,alt:""})):n.createElement("div",r({},M))};I.displayName="Placeholder",I.propTypes={fallback:a.string,sources:null==(y=z.propTypes)?void 0:y.sources,alt:function(e,t,M){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+M+"`. Validation failed."):null}};const w=function(e){return n.createElement(n.Fragment,null,n.createElement(z,r({},e)),n.createElement("noscript",null,n.createElement(z,r({},e,{shouldLoad:!0}))))};w.displayName="MainImage",w.propTypes=z.propTypes;const E=function(e,t,M){for(var n=arguments.length,a=new Array(n>3?n-3:0),r=3;r<n;r++)a[r-3]=arguments[r];return e.alt||""===e.alt?i().string.apply(i(),[e,t,M].concat(a)):new Error('The "alt" prop is required in '+M+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},O={image:i().object.isRequired,alt:E},A=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],x=["style","className"],m=new Set;let C,p;const k=function(e){let{as:t="div",image:a,style:i,backgroundColor:o,className:s,class:c,onStartLoad:g,onLoad:l,onError:j}=e,L=N(e,A);const{width:D,height:T,layout:z}=a,y=function(e,t,M){const n={};let a="gatsby-image-wrapper";return"fixed"===M?(n.width=e,n.height=t):"constrained"===M&&(a="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:a,"data-gatsby-image-wrapper":"",style:n}}(D,T,z),{style:d,className:I}=y,w=N(y,x),E=(0,n.useRef)(),O=(0,n.useMemo)((()=>JSON.stringify(a.images)),[a.images]);c&&(s=c);const k=function(e,t,M){let n="";return"fullWidth"===e&&(n='<div aria-hidden="true" style="padding-top: '+M/t*100+'%;"></div>'),"constrained"===e&&(n='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+M+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),n}(z,D,T);return(0,n.useEffect)((()=>{C||(C=Promise.all([M.e(774),M.e(223)]).then(M.bind(M,8223)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:M}=e;return p=t,{renderImageToString:t,swapPlaceholderImage:M}})));const e=E.current.querySelector("[data-gatsby-image-ssr]");if(e&&u())return e.complete?(null==g||g({wasCached:!0}),null==l||l({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==g||g({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==l||l({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void m.add(O);if(p&&m.has(O))return;let t,n;return C.then((e=>{let{renderImageToString:M,swapPlaceholderImage:N}=e;E.current&&(E.current.innerHTML=M(r({isLoading:!0,isLoaded:m.has(O),image:a},L)),m.has(O)||(t=requestAnimationFrame((()=>{E.current&&(n=N(E.current,O,m,i,g,l,j))}))))})),()=>{t&&cancelAnimationFrame(t),n&&n()}}),[a]),(0,n.useLayoutEffect)((()=>{m.has(O)&&p&&(E.current.innerHTML=p(r({isLoading:m.has(O),isLoaded:m.has(O),image:a},L)),null==g||g({wasCached:!0}),null==l||l({wasCached:!0}))}),[a]),(0,n.createElement)(t,r({},w,{style:r({},d,i,{backgroundColor:o}),className:I+(s?" "+s:""),ref:E,dangerouslySetInnerHTML:{__html:k},suppressHydrationWarning:!0}))},S=(0,n.memo)((function(e){return e.image?(0,n.createElement)(k,e):null}));S.propTypes=O,S.displayName="GatsbyImage";const h=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],Y=function(e,t){for(var M=arguments.length,n=new Array(M>2?M-2:0),a=2;a<M;a++)n[a-2]=arguments[a];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(n)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},Q=new Set(["fixed","fullWidth","constrained"]),f={src:i().string.isRequired,alt:E,width:Y,height:Y,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!Q.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},U=(b=S,function(e){let{src:t,__imageData:M,__error:a}=e,i=N(e,h);return a&&console.warn(a),M?n.createElement(b,r({image:M},i)):(console.warn("Image not loaded",t),null)});var b;U.displayName="StaticImage",U.propTypes=f},4108:function(e,t,M){M.d(t,{Z:function(){return i}});var n=M(7294),a=M(6717);function i(e){let{children:t}=e;return n.createElement("div",{className:a.q3},t)}},6498:function(e,t,M){M.d(t,{Z:function(){return r}});var n=M(7294),a=M(1883),i="header-module--navText--69ea8";function r(){return n.createElement("div",{className:"header-module--headerContainer--591af"},n.createElement("div",{className:"header-module--logoText--2a622"},n.createElement(a.Link,{to:"/"},"have so sunny day")),n.createElement("div",{className:"header-module--navContainer--caa58"},n.createElement(a.Link,{to:"/portfolio/",className:i},"portfolio"),n.createElement(a.Link,{to:"/blog/",className:i},"blog"),n.createElement(a.Link,{to:"/vitae/",className:i},"vitae"),n.createElement("div",{className:"header-module--socialContainer--8d472"},n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.instagram.com/sosunnyproject"},n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMXB0IiB2aWV3Qm94PSIwIDAgNTExIDUxMS45IiB3aWR0aD0iNTExcHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTUxMC45NDkyMTkgMTUwLjVjLTEuMTk5MjE5LTI3LjE5OTIxOS01LjU5NzY1Ny00NS44OTg0MzgtMTEuODk4NDM4LTYyLjEwMTU2Mi02LjUtMTcuMTk5MjE5LTE2LjUtMzIuNTk3NjU3LTI5LjYwMTU2Mi00NS4zOTg0MzgtMTIuODAwNzgxLTEzLTI4LjMwMDc4MS0yMy4xMDE1NjItNDUuMzAwNzgxLTI5LjUtMTYuMjk2ODc2LTYuMzAwNzgxLTM0Ljg5ODQzOC0xMC42OTkyMTktNjIuMDk3NjU3LTExLjg5ODQzOC0yNy40MDIzNDMtMS4zMDA3ODEtMzYuMTAxNTYyLTEuNjAxNTYyLTEwNS42MDE1NjItMS42MDE1NjJzLTc4LjE5OTIxOS4zMDA3ODEtMTA1LjUgMS41Yy0yNy4xOTkyMTkgMS4xOTkyMTktNDUuODk4NDM4IDUuNjAxNTYyLTYyLjA5NzY1NyAxMS44OTg0MzgtMTcuMjAzMTI0IDYuNS0zMi42MDE1NjIgMTYuNS00NS40MDIzNDMgMjkuNjAxNTYyLTEzIDEyLjgwMDc4MS0yMy4wOTc2NTcgMjguMzAwNzgxLTI5LjUgNDUuMzAwNzgxLTYuMzAwNzgxIDE2LjMwMDc4MS0xMC42OTkyMTkgMzQuODk4NDM4LTExLjg5ODQzOCA2Mi4wOTc2NTctMS4zMDA3ODEgMjcuNDAyMzQzLTEuNjAxNTYyIDM2LjEwMTU2Mi0xLjYwMTU2MiAxMDUuNjAxNTYycy4zMDA3ODEgNzguMTk5MjE5IDEuNSAxMDUuNWMxLjE5OTIxOSAyNy4xOTkyMTkgNS42MDE1NjIgNDUuODk4NDM4IDExLjkwMjM0MyA2Mi4xMDE1NjIgNi41IDE3LjE5OTIxOSAxNi41OTc2NTcgMzIuNTk3NjU3IDI5LjU5NzY1NyA0NS4zOTg0MzggMTIuODAwNzgxIDEzIDI4LjMwMDc4MSAyMy4xMDE1NjIgNDUuMzAwNzgxIDI5LjUgMTYuMzAwNzgxIDYuMzAwNzgxIDM0Ljg5ODQzOCAxMC42OTkyMTkgNjIuMTAxNTYyIDExLjg5ODQzOCAyNy4yOTY4NzYgMS4yMDMxMjQgMzYgMS41IDEwNS41IDEuNXM3OC4xOTkyMTktLjI5Njg3NiAxMDUuNS0xLjVjMjcuMTk5MjE5LTEuMTk5MjE5IDQ1Ljg5ODQzOC01LjU5NzY1NyA2Mi4wOTc2NTctMTEuODk4NDM4IDM0LjQwMjM0My0xMy4zMDA3ODEgNjEuNjAxNTYyLTQwLjUgNzQuOTAyMzQzLTc0Ljg5ODQzOCA2LjI5Njg3Ni0xNi4zMDA3ODEgMTAuNjk5MjE5LTM0LjkwMjM0MyAxMS44OTg0MzgtNjIuMTAxNTYyIDEuMTk5MjE5LTI3LjMwMDc4MSAxLjUtMzYgMS41LTEwNS41cy0uMTAxNTYyLTc4LjE5OTIxOS0xLjMwMDc4MS0xMDUuNXptLTQ2LjA5NzY1NyAyMDljLTEuMTAxNTYyIDI1LTUuMzAwNzgxIDM4LjUtOC44MDA3ODEgNDcuNS04LjYwMTU2MiAyMi4zMDA3ODEtMjYuMzAwNzgxIDQwLTQ4LjYwMTU2MiA0OC42MDE1NjItOSAzLjUtMjIuNTk3NjU3IDcuNjk5MjE5LTQ3LjUgOC43OTY4NzYtMjcgMS4yMDMxMjQtMzUuMDk3NjU3IDEuNS0xMDMuMzk4NDM4IDEuNXMtNzYuNS0uMjk2ODc2LTEwMy40MDIzNDMtMS41Yy0yNS0xLjA5NzY1Ny0zOC41LTUuMjk2ODc2LTQ3LjUtOC43OTY4NzYtMTEuMDk3NjU3LTQuMTAxNTYyLTIxLjE5OTIxOS0xMC42MDE1NjItMjkuMzk4NDM4LTE5LjEwMTU2Mi04LjUtOC4zMDA3ODEtMTUtMTguMzAwNzgxLTE5LjEwMTU2Mi0yOS4zOTg0MzgtMy41LTktNy42OTkyMTktMjIuNjAxNTYyLTguNzk2ODc2LTQ3LjUtMS4yMDMxMjQtMjctMS41LTM1LjEwMTU2Mi0xLjUtMTAzLjQwMjM0M3MuMjk2ODc2LTc2LjUgMS41LTEwMy4zOTg0MzhjMS4wOTc2NTctMjUgNS4yOTY4NzYtMzguNSA4Ljc5Njg3Ni00Ny41IDQuMTAxNTYyLTExLjEwMTU2MiAxMC42MDE1NjItMjEuMTk5MjE5IDE5LjIwMzEyNC0yOS40MDIzNDMgOC4yOTY4NzYtOC41IDE4LjI5Njg3Ni0xNSAyOS4zOTg0MzgtMTkuMDk3NjU3IDktMy41IDIyLjYwMTU2Mi03LjY5OTIxOSA0Ny41LTguODAwNzgxIDI3LTEuMTk5MjE5IDM1LjEwMTU2Mi0xLjUgMTAzLjM5ODQzOC0xLjUgNjguNDAyMzQzIDAgNzYuNS4zMDA3ODEgMTAzLjQwMjM0MyAxLjUgMjUgMS4xMDE1NjIgMzguNSA1LjMwMDc4MSA0Ny41IDguODAwNzgxIDExLjA5NzY1NyA0LjA5NzY1NyAyMS4xOTkyMTkgMTAuNTk3NjU3IDI5LjM5ODQzOCAxOS4wOTc2NTcgOC41IDguMzAwNzgxIDE1IDE4LjMwMDc4MSAxOS4xMDE1NjIgMjkuNDAyMzQzIDMuNSA5IDcuNjk5MjE5IDIyLjU5NzY1NyA4LjgwMDc4MSA0Ny41IDEuMTk5MjE5IDI3IDEuNSAzNS4wOTc2NTcgMS41IDEwMy4zOTg0MzhzLS4zMDA3ODEgNzYuMzAwNzgxLTEuNSAxMDMuMzAwNzgxem0wIDAiLz48cGF0aCBkPSJtMjU2LjQ0OTIxOSAxMjQuNWMtNzIuNTk3NjU3IDAtMTMxLjUgNTguODk4NDM4LTEzMS41IDEzMS41czU4LjkwMjM0MyAxMzEuNSAxMzEuNSAxMzEuNWM3Mi42MDE1NjIgMCAxMzEuNS01OC44OTg0MzggMTMxLjUtMTMxLjVzLTU4Ljg5ODQzOC0xMzEuNS0xMzEuNS0xMzEuNXptMCAyMTYuODAwNzgxYy00Ny4wOTc2NTcgMC04NS4zMDA3ODEtMzguMTk5MjE5LTg1LjMwMDc4MS04NS4zMDA3ODFzMzguMjAzMTI0LTg1LjMwMDc4MSA4NS4zMDA3ODEtODUuMzAwNzgxYzQ3LjEwMTU2MiAwIDg1LjMwMDc4MSAzOC4xOTkyMTkgODUuMzAwNzgxIDg1LjMwMDc4MXMtMzguMTk5MjE5IDg1LjMwMDc4MS04NS4zMDA3ODEgODUuMzAwNzgxem0wIDAiLz48cGF0aCBkPSJtNDIzLjg1MTU2MiAxMTkuMzAwNzgxYzAgMTYuOTUzMTI1LTEzLjc0NjA5MyAzMC42OTkyMTktMzAuNzAzMTI0IDMwLjY5OTIxOS0xNi45NTMxMjYgMC0zMC42OTkyMTktMTMuNzQ2MDk0LTMwLjY5OTIxOS0zMC42OTkyMTkgMC0xNi45NTcwMzEgMTMuNzQ2MDkzLTMwLjY5OTIxOSAzMC42OTkyMTktMzAuNjk5MjE5IDE2Ljk1NzAzMSAwIDMwLjcwMzEyNCAxMy43NDIxODggMzAuNzAzMTI0IDMwLjY5OTIxOXptMCAwIi8+PC9zdmc+",alt:"instagram",width:"20px",height:"auto"})),n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.youtube.com/channel/UCKNXAqIvqc25JJ1CWdayqBA"},n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00OTAuMjQsMTEzLjkyYy0xMy44ODgtMjQuNzA0LTI4Ljk2LTI5LjI0OC01OS42NDgtMzAuOTc2QzM5OS45MzYsODAuODY0LDMyMi44NDgsODAsMjU2LjA2NCw4MA0KCQkJYy02Ni45MTIsMC0xNDQuMDMyLDAuODY0LTE3NC42NTYsMi45MTJjLTMwLjYyNCwxLjc2LTQ1LjcyOCw2LjI3Mi01OS43NDQsMzEuMDA4QzcuMzYsMTM4LjU5MiwwLDE4MS4wODgsMCwyNTUuOTA0DQoJCQlDMCwyNTUuOTY4LDAsMjU2LDAsMjU2YzAsMC4wNjQsMCwwLjA5NiwwLDAuMDk2djAuMDY0YzAsNzQuNDk2LDcuMzYsMTE3LjMxMiwyMS42NjQsMTQxLjcyOA0KCQkJYzE0LjAxNiwyNC43MDQsMjkuMDg4LDI5LjE4NCw1OS43MTIsMzEuMjY0QzExMi4wMzIsNDMwLjk0NCwxODkuMTUyLDQzMiwyNTYuMDY0LDQzMmM2Ni43ODQsMCwxNDMuODcyLTEuMDU2LDE3NC41Ni0yLjgxNg0KCQkJYzMwLjY4OC0yLjA4LDQ1Ljc2LTYuNTYsNTkuNjQ4LTMxLjI2NEM1MDQuNzA0LDM3My41MDQsNTEyLDMzMC42ODgsNTEyLDI1Ni4xOTJjMCwwLDAtMC4wOTYsMC0wLjE2YzAsMCwwLTAuMDY0LDAtMC4wOTYNCgkJCUM1MTIsMTgxLjA4OCw1MDQuNzA0LDEzOC41OTIsNDkwLjI0LDExMy45MnogTTE5MiwzNTJWMTYwbDE2MCw5NkwxOTIsMzUyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",alt:"youtube",width:"20px",height:"auto"})),n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.github.com/sosunnyproject"},n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yNTUuOTY4LDUuMzI5QzExNC42MjQsNS4zMjksMCwxMjAuNDAxLDAsMjYyLjM1M2MwLDExMy41MzYsNzMuMzQ0LDIwOS44NTYsMTc1LjEwNCwyNDMuODcyDQoJCQljMTIuOCwyLjM2OCwxNy40NzItNS41NjgsMTcuNDcyLTEyLjM4NGMwLTYuMTEyLTAuMjI0LTIyLjI3Mi0wLjM1Mi00My43MTJjLTcxLjIsMTUuNTItODYuMjQtMzQuNDY0LTg2LjI0LTM0LjQ2NA0KCQkJYy0xMS42MTYtMjkuNjk2LTI4LjQxNi0zNy42LTI4LjQxNi0zNy42Yy0yMy4yNjQtMTUuOTM2LDEuNzI4LTE1LjYxNiwxLjcyOC0xNS42MTZjMjUuNjk2LDEuODI0LDM5LjIsMjYuNDk2LDM5LjIsMjYuNDk2DQoJCQljMjIuODQ4LDM5LjI2NCw1OS45MzYsMjcuOTM2LDc0LjUyOCwyMS4zNDRjMi4zMDQtMTYuNjA4LDguOTI4LTI3LjkzNiwxNi4yNTYtMzQuMzY4DQoJCQljLTU2LjgzMi02LjQ5Ni0xMTYuNjA4LTI4LjU0NC0xMTYuNjA4LTEyNy4wMDhjMC0yOC4wNjQsOS45ODQtNTEuMDA4LDI2LjM2OC02OC45OTJjLTIuNjU2LTYuNDk2LTExLjQyNC0zMi42NCwyLjQ5Ni02OA0KCQkJYzAsMCwyMS41MDQtNi45MTIsNzAuNCwyNi4zMzZjMjAuNDE2LTUuNjk2LDQyLjMwNC04LjU0NCw2NC4wOTYtOC42NGMyMS43MjgsMC4xMjgsNDMuNjQ4LDIuOTQ0LDY0LjA5Niw4LjY3Mg0KCQkJYzQ4Ljg2NC0zMy4yNDgsNzAuMzM2LTI2LjMzNiw3MC4zMzYtMjYuMzM2YzEzLjk1MiwzNS4zOTIsNS4xODQsNjEuNTA0LDIuNTYsNjhjMTYuNDE2LDE3Ljk4NCwyNi4zMDQsNDAuOTI4LDI2LjMwNCw2OC45OTINCgkJCWMwLDk4LjcyLTU5Ljg0LDEyMC40NDgtMTE2Ljg2NCwxMjYuODE2YzkuMTg0LDcuOTM2LDE3LjM3NiwyMy42MTYsMTcuMzc2LDQ3LjU4NGMwLDM0LjM2OC0wLjMyLDYyLjA4LTAuMzIsNzAuNDk2DQoJCQljMCw2Ljg4LDQuNjA4LDE0Ljg4LDE3LjYsMTIuMzUyQzQzOC43Miw0NzIuMTQ1LDUxMiwzNzUuODU3LDUxMiwyNjIuMzUzQzUxMiwxMjAuNDAxLDM5Ny4zNzYsNS4zMjksMjU1Ljk2OCw1LjMyOXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==",alt:"github",width:"20px",height:"auto"})),n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.linkedin.com/in/sosunpark"},n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY4MnB0IiB2aWV3Qm94PSItMjEgLTM1IDY4Mi42NjY2OSA2ODIiIHdpZHRoPSI2ODJwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNzcuNjEzMjgxLS42Njc5NjljLTQ2LjkyOTY4NyAwLTc3LjYxMzI4MSAzMC44MTY0MDctNzcuNjEzMjgxIDcxLjMyMDMxMyAwIDM5LjYwOTM3NSAyOS43Njk1MzEgNzEuMzA0Njg3IDc1LjgxMjUgNzEuMzA0Njg3aC44OTA2MjVjNDcuODQ3NjU2IDAgNzcuNjI1LTMxLjY5NTMxMiA3Ny42MjUtNzEuMzA0Njg3LS44OTQ1MzEtNDAuNTAzOTA2LTI5Ljc3NzM0NC03MS4zMjAzMTMtNzYuNzE0ODQ0LTcxLjMyMDMxM3ptMCAwIi8+PHBhdGggZD0ibTguMTA5Mzc1IDE5OC4zMTI1aDEzNy4xOTUzMTN2NDEyLjc1NzgxMmgtMTM3LjE5NTMxM3ptMCAwIi8+PHBhdGggZD0ibTQ4Mi4wNTQ2ODggMTg4LjYyNWMtNzQuMDExNzE5IDAtMTIzLjY0MDYyNiA2OS41NDY4NzUtMTIzLjY0MDYyNiA2OS41NDY4NzV2LTU5Ljg1OTM3NWgtMTM3LjE5OTIxOHY0MTIuNzU3ODEyaDEzNy4xOTE0MDZ2LTIzMC41YzAtMTIuMzM5ODQzLjg5NDUzMS0yNC42NjAxNTYgNC41MTk1MzEtMzMuNDg0Mzc0IDkuOTE3OTY5LTI0LjY0MDYyNiAzMi40ODgyODEtNTAuMTY3OTY5IDcwLjM5MDYyNS01MC4xNjc5NjkgNDkuNjQ0NTMyIDAgNjkuNSAzNy44NTE1NjIgNjkuNSA5My4zMzk4NDN2MjIwLjgxMjVoMTM3LjE4MzU5NHYtMjM2LjY2Nzk2OGMwLTEyNi43ODEyNS02Ny42ODc1LTE4NS43NzczNDQtMTU3Ljk0NTMxMi0xODUuNzc3MzQ0em0wIDAiLz48L3N2Zz4=",alt:"linkedin",width:"20px",height:"auto"})))))}},1701:function(e,t,M){M.r(t),M.d(t,{default:function(){return s}});var n=M(7294),a=M(6498),i=M(4108),r=M(6717),N=M(1883),u=M(3723);function o(e){var t,M,a;let{node:i}=e;const o=(0,u.c)(null===(t=i.frontmatter)||void 0===t?void 0:t.featuredImage);return n.createElement("div",{key:i.id,className:r.Ol},n.createElement(N.Link,{to:i.fields.slug},n.createElement(u.G,{image:o,alt:"",layout:"fullWidth",width:480,aspectRatio:16/9}),n.createElement("h3",null,null==i||null===(M=i.frontmatter)||void 0===M?void 0:M.title)),n.createElement("h4",null,null==i||null===(a=i.frontmatter)||void 0===a?void 0:a.date))}function s(e){let{data:t}=e;return n.createElement(i.Z,null,n.createElement(a.Z,null),n.createElement("div",{className:r.WD},t.allMarkdownRemark.edges.map((e=>{let{node:t}=e;return"portfolio"===t.frontmatter.category&&n.createElement(o,{node:t,key:t.id})}))))}},6717:function(e,t,M){M.d(t,{$z:function(){return s},Kz:function(){return a},Ol:function(){return N},SN:function(){return i},WD:function(){return u},bM:function(){return n},cN:function(){return c},m5:function(){return o},q3:function(){return r}});var n="container-module--highlightSpan--48ec8",a="container-module--index--10a43",i="container-module--indexBottom--7202d",r="container-module--innerLayout--cf7f9",N="container-module--portfolioCard--863e7",u="container-module--portfolioList--5fec2",o="container-module--portfolioWrapper--cf1f5",s="container-module--postList--0bde6",c="container-module--postWrapper--206d1"}}]);
//# sourceMappingURL=component---src-pages-portfolio-jsx-b22232c869cc4804253f.js.map