"use strict";(self.webpackChunksosunnyproject_gatsby_blog=self.webpackChunksosunnyproject_gatsby_blog||[]).push([[540],{3723:function(e,t,M){M.d(t,{G:function(){return k},L:function(){return T},M:function(){return w},P:function(){return I},_:function(){return u},a:function(){return r},b:function(){return o},c:function(){return N},g:function(){return s},h:function(){return c}});var n=M(7294),a=(M(2369),M(5697)),i=M.n(a);function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var M=arguments[t];for(var n in M)Object.prototype.hasOwnProperty.call(M,n)&&(e[n]=M[n])}return e},r.apply(this,arguments)}function u(e,t){if(null==e)return{};var M,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(M=i[n])>=0||(a[M]=e[M]);return a}const c=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;const N=e=>{var t;return(e=>{var t,M;return Boolean(null==e||null==(t=e.images)||null==(M=t.fallback)?void 0:M.src)})(e)?e:(e=>Boolean(null==e?void 0:e.gatsbyImageData))(e)?e.gatsbyImageData:(e=>Boolean(null==e?void 0:e.gatsbyImage))(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function o(e,t,M,n,a){return void 0===a&&(a={}),r({},M,{loading:n,shouldLoad:e,"data-main-image":"",style:r({},a,{opacity:t?1:0})})}function s(e,t,M,n,a,i,u,c){const N={};i&&(N.backgroundColor=i,"fixed"===M?(N.width=n,N.height=a,N.backgroundColor=i,N.position="relative"):("constrained"===M||"fullWidth"===M)&&(N.position="absolute",N.top=0,N.left=0,N.bottom=0,N.right=0)),u&&(N.objectFit=u),c&&(N.objectPosition=c);const o=r({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:r({opacity:t?0:1,transition:"opacity 500ms linear"},N)});return o}const l=["children"],g=function(e){let{layout:t,width:M,height:a}=e;return"fullWidth"===t?n.createElement("div",{"aria-hidden":!0,style:{paddingTop:a/M*100+"%"}}):"constrained"===t?n.createElement("div",{style:{maxWidth:M,display:"block"}},n.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+a+"' width='"+M+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},T=function(e){let{children:t}=e,M=u(e,l);return n.createElement(n.Fragment,null,n.createElement(g,r({},M)),t,null)},j=["src","srcSet","loading","alt","shouldLoad"],L=["fallback","sources","shouldLoad"],z=function(e){let{src:t,srcSet:M,loading:a,alt:i="",shouldLoad:c}=e,N=u(e,j);return n.createElement("img",r({},N,{decoding:"async",loading:a,src:c?t:void 0,"data-src":c?void 0:t,srcSet:c?M:void 0,"data-srcset":c?void 0:M,alt:i}))},D=function(e){let{fallback:t,sources:M=[],shouldLoad:a=!0}=e,i=u(e,L);const c=i.sizes||(null==t?void 0:t.sizes),N=n.createElement(z,r({},i,t,{sizes:c,shouldLoad:a}));return M.length?n.createElement("picture",null,M.map((e=>{let{media:t,srcSet:M,type:i}=e;return n.createElement("source",{key:t+"-"+i+"-"+M,type:i,media:t,srcSet:a?M:void 0,"data-srcset":a?void 0:M,sizes:c})})),N):N};var d;z.propTypes={src:a.string.isRequired,alt:a.string.isRequired,sizes:a.string,srcSet:a.string,shouldLoad:a.bool},D.displayName="Picture",D.propTypes={alt:a.string.isRequired,shouldLoad:a.bool,fallback:a.exact({src:a.string.isRequired,srcSet:a.string,sizes:a.string}),sources:a.arrayOf(a.oneOfType([a.exact({media:a.string.isRequired,type:a.string,sizes:a.string,srcSet:a.string.isRequired}),a.exact({media:a.string,type:a.string.isRequired,sizes:a.string,srcSet:a.string.isRequired})]))};const y=["fallback"],I=function(e){let{fallback:t}=e,M=u(e,y);return t?n.createElement(D,r({},M,{fallback:{src:t},"aria-hidden":!0,alt:""})):n.createElement("div",r({},M))};I.displayName="Placeholder",I.propTypes={fallback:a.string,sources:null==(d=D.propTypes)?void 0:d.sources,alt:function(e,t,M){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+M+"`. Validation failed."):null}};const w=function(e){return n.createElement(n.Fragment,null,n.createElement(D,r({},e)),n.createElement("noscript",null,n.createElement(D,r({},e,{shouldLoad:!0}))))};w.displayName="MainImage",w.propTypes=D.propTypes;const O=function(e,t,M){for(var n=arguments.length,a=new Array(n>3?n-3:0),r=3;r<n;r++)a[r-3]=arguments[r];return e.alt||""===e.alt?i().string.apply(i(),[e,t,M].concat(a)):new Error('The "alt" prop is required in '+M+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},E={image:i().object.isRequired,alt:O},m=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],A=["style","className"],x=new Set;let C,p;const Y=function(e){let{as:t="div",image:a,style:i,backgroundColor:N,className:o,class:s,onStartLoad:l,onLoad:g,onError:T}=e,j=u(e,m);const{width:L,height:z,layout:D}=a,d=function(e,t,M){const n={};let a="gatsby-image-wrapper";return"fixed"===M?(n.width=e,n.height=t):"constrained"===M&&(a="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:a,"data-gatsby-image-wrapper":"",style:n}}(L,z,D),{style:y,className:I}=d,w=u(d,A),O=(0,n.useRef)(),E=(0,n.useMemo)((()=>JSON.stringify(a.images)),[a.images]);s&&(o=s);const Y=function(e,t,M){let n="";return"fullWidth"===e&&(n='<div aria-hidden="true" style="padding-top: '+M/t*100+'%;"></div>'),"constrained"===e&&(n='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+M+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),n}(D,L,z);return(0,n.useEffect)((()=>{C||(C=Promise.all([M.e(774),M.e(223)]).then(M.bind(M,8223)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:M}=e;return p=t,{renderImageToString:t,swapPlaceholderImage:M}})));const e=O.current.querySelector("[data-gatsby-image-ssr]");if(e&&c())return e.complete?(null==l||l({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==l||l({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void x.add(E);if(p&&x.has(E))return;let t,n;return C.then((e=>{let{renderImageToString:M,swapPlaceholderImage:u}=e;O.current&&(O.current.innerHTML=M(r({isLoading:!0,isLoaded:x.has(E),image:a},j)),x.has(E)||(t=requestAnimationFrame((()=>{O.current&&(n=u(O.current,E,x,i,l,g,T))}))))})),()=>{t&&cancelAnimationFrame(t),n&&n()}}),[a]),(0,n.useLayoutEffect)((()=>{x.has(E)&&p&&(O.current.innerHTML=p(r({isLoading:x.has(E),isLoaded:x.has(E),image:a},j)),null==l||l({wasCached:!0}),null==g||g({wasCached:!0}))}),[a]),(0,n.createElement)(t,r({},w,{style:r({},y,i,{backgroundColor:N}),className:I+(o?" "+o:""),ref:O,dangerouslySetInnerHTML:{__html:Y},suppressHydrationWarning:!0}))},k=(0,n.memo)((function(e){return e.image?(0,n.createElement)(Y,e):null}));k.propTypes=E,k.displayName="GatsbyImage";const S=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],h=function(e,t){for(var M=arguments.length,n=new Array(M>2?M-2:0),a=2;a<M;a++)n[a-2]=arguments[a];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(n)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},f=new Set(["fixed","fullWidth","constrained"]),v={src:i().string.isRequired,alt:O,width:h,height:h,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!f.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},Q=(U=k,function(e){let{src:t,__imageData:M,__error:a}=e,i=u(e,S);return a&&console.warn(a),M?n.createElement(U,r({image:M},i)):(console.warn("Image not loaded",t),null)});var U;Q.displayName="StaticImage",Q.propTypes=v},2369:function(e){const t=(e,t)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);if(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim(),0===e.length)return"";if(1===e.length)return t.pascalCase?e.toUpperCase():e.toLowerCase();return e!==e.toLowerCase()&&(e=(e=>{let t=!1,M=!1,n=!1;for(let a=0;a<e.length;a++){const i=e[a];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,a)+"-"+e.slice(a),t=!1,n=M,M=!0,a++):M&&n&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,a-1)+"-"+e.slice(a-1),n=M,M=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,n=M,M=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e})(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,((e,t)=>t.toUpperCase())).replace(/\d+(\w|$)/g,(e=>e.toUpperCase())),M=e,t.pascalCase?M.charAt(0).toUpperCase()+M.slice(1):M;var M};e.exports=t,e.exports.default=t},4108:function(e,t,M){M.d(t,{Z:function(){return i}});var n=M(7294),a=M(6717);function i(e){let{children:t}=e;return n.createElement("div",{className:a.q3},t)}},6498:function(e,t,M){M.d(t,{Z:function(){return r}});var n=M(7294),a=M(1883),i="header-module--navText--69ea8";function r(e){let{location:t}=e;function M(e,t){var M;let{location:n}=e,a=!1;return null!=n&&null!==(M=n.pathname)&&void 0!==M&&M.includes(t)&&(a=!0),a?{className:"header-module--active--6bd37"}:null}return n.createElement("div",{className:"header-module--headerContainer--591af"},n.createElement("div",{className:"header-module--logoText--2a622"},n.createElement(a.Link,{to:"/"},"have so sunny day")),n.createElement("div",{className:"header-module--navContainer--caa58"},n.createElement(a.Link,{to:"/portfolio/main",getProps:e=>{let{location:t}=e;return M({location:t},"portfolio")},className:i},"portfolio"),n.createElement(a.Link,{to:"/cv",getProps:e=>{let{location:t}=e;return M({location:t},"cv")},className:i},"cv"),n.createElement(a.Link,{to:"/archive",getProps:e=>{let{location:t}=e;return M({location:t},"archive")},className:i},n.createElement("span",{role:"img","aria-label":"nerd-face  "},"🤓TIL🤓")),n.createElement("div",{className:"header-module--socialContainer--8d472"},n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.instagram.com/sosunnyproject"},n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMXB0IiB2aWV3Qm94PSIwIDAgNTExIDUxMS45IiB3aWR0aD0iNTExcHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTUxMC45NDkyMTkgMTUwLjVjLTEuMTk5MjE5LTI3LjE5OTIxOS01LjU5NzY1Ny00NS44OTg0MzgtMTEuODk4NDM4LTYyLjEwMTU2Mi02LjUtMTcuMTk5MjE5LTE2LjUtMzIuNTk3NjU3LTI5LjYwMTU2Mi00NS4zOTg0MzgtMTIuODAwNzgxLTEzLTI4LjMwMDc4MS0yMy4xMDE1NjItNDUuMzAwNzgxLTI5LjUtMTYuMjk2ODc2LTYuMzAwNzgxLTM0Ljg5ODQzOC0xMC42OTkyMTktNjIuMDk3NjU3LTExLjg5ODQzOC0yNy40MDIzNDMtMS4zMDA3ODEtMzYuMTAxNTYyLTEuNjAxNTYyLTEwNS42MDE1NjItMS42MDE1NjJzLTc4LjE5OTIxOS4zMDA3ODEtMTA1LjUgMS41Yy0yNy4xOTkyMTkgMS4xOTkyMTktNDUuODk4NDM4IDUuNjAxNTYyLTYyLjA5NzY1NyAxMS44OTg0MzgtMTcuMjAzMTI0IDYuNS0zMi42MDE1NjIgMTYuNS00NS40MDIzNDMgMjkuNjAxNTYyLTEzIDEyLjgwMDc4MS0yMy4wOTc2NTcgMjguMzAwNzgxLTI5LjUgNDUuMzAwNzgxLTYuMzAwNzgxIDE2LjMwMDc4MS0xMC42OTkyMTkgMzQuODk4NDM4LTExLjg5ODQzOCA2Mi4wOTc2NTctMS4zMDA3ODEgMjcuNDAyMzQzLTEuNjAxNTYyIDM2LjEwMTU2Mi0xLjYwMTU2MiAxMDUuNjAxNTYycy4zMDA3ODEgNzguMTk5MjE5IDEuNSAxMDUuNWMxLjE5OTIxOSAyNy4xOTkyMTkgNS42MDE1NjIgNDUuODk4NDM4IDExLjkwMjM0MyA2Mi4xMDE1NjIgNi41IDE3LjE5OTIxOSAxNi41OTc2NTcgMzIuNTk3NjU3IDI5LjU5NzY1NyA0NS4zOTg0MzggMTIuODAwNzgxIDEzIDI4LjMwMDc4MSAyMy4xMDE1NjIgNDUuMzAwNzgxIDI5LjUgMTYuMzAwNzgxIDYuMzAwNzgxIDM0Ljg5ODQzOCAxMC42OTkyMTkgNjIuMTAxNTYyIDExLjg5ODQzOCAyNy4yOTY4NzYgMS4yMDMxMjQgMzYgMS41IDEwNS41IDEuNXM3OC4xOTkyMTktLjI5Njg3NiAxMDUuNS0xLjVjMjcuMTk5MjE5LTEuMTk5MjE5IDQ1Ljg5ODQzOC01LjU5NzY1NyA2Mi4wOTc2NTctMTEuODk4NDM4IDM0LjQwMjM0My0xMy4zMDA3ODEgNjEuNjAxNTYyLTQwLjUgNzQuOTAyMzQzLTc0Ljg5ODQzOCA2LjI5Njg3Ni0xNi4zMDA3ODEgMTAuNjk5MjE5LTM0LjkwMjM0MyAxMS44OTg0MzgtNjIuMTAxNTYyIDEuMTk5MjE5LTI3LjMwMDc4MSAxLjUtMzYgMS41LTEwNS41cy0uMTAxNTYyLTc4LjE5OTIxOS0xLjMwMDc4MS0xMDUuNXptLTQ2LjA5NzY1NyAyMDljLTEuMTAxNTYyIDI1LTUuMzAwNzgxIDM4LjUtOC44MDA3ODEgNDcuNS04LjYwMTU2MiAyMi4zMDA3ODEtMjYuMzAwNzgxIDQwLTQ4LjYwMTU2MiA0OC42MDE1NjItOSAzLjUtMjIuNTk3NjU3IDcuNjk5MjE5LTQ3LjUgOC43OTY4NzYtMjcgMS4yMDMxMjQtMzUuMDk3NjU3IDEuNS0xMDMuMzk4NDM4IDEuNXMtNzYuNS0uMjk2ODc2LTEwMy40MDIzNDMtMS41Yy0yNS0xLjA5NzY1Ny0zOC41LTUuMjk2ODc2LTQ3LjUtOC43OTY4NzYtMTEuMDk3NjU3LTQuMTAxNTYyLTIxLjE5OTIxOS0xMC42MDE1NjItMjkuMzk4NDM4LTE5LjEwMTU2Mi04LjUtOC4zMDA3ODEtMTUtMTguMzAwNzgxLTE5LjEwMTU2Mi0yOS4zOTg0MzgtMy41LTktNy42OTkyMTktMjIuNjAxNTYyLTguNzk2ODc2LTQ3LjUtMS4yMDMxMjQtMjctMS41LTM1LjEwMTU2Mi0xLjUtMTAzLjQwMjM0M3MuMjk2ODc2LTc2LjUgMS41LTEwMy4zOTg0MzhjMS4wOTc2NTctMjUgNS4yOTY4NzYtMzguNSA4Ljc5Njg3Ni00Ny41IDQuMTAxNTYyLTExLjEwMTU2MiAxMC42MDE1NjItMjEuMTk5MjE5IDE5LjIwMzEyNC0yOS40MDIzNDMgOC4yOTY4NzYtOC41IDE4LjI5Njg3Ni0xNSAyOS4zOTg0MzgtMTkuMDk3NjU3IDktMy41IDIyLjYwMTU2Mi03LjY5OTIxOSA0Ny41LTguODAwNzgxIDI3LTEuMTk5MjE5IDM1LjEwMTU2Mi0xLjUgMTAzLjM5ODQzOC0xLjUgNjguNDAyMzQzIDAgNzYuNS4zMDA3ODEgMTAzLjQwMjM0MyAxLjUgMjUgMS4xMDE1NjIgMzguNSA1LjMwMDc4MSA0Ny41IDguODAwNzgxIDExLjA5NzY1NyA0LjA5NzY1NyAyMS4xOTkyMTkgMTAuNTk3NjU3IDI5LjM5ODQzOCAxOS4wOTc2NTcgOC41IDguMzAwNzgxIDE1IDE4LjMwMDc4MSAxOS4xMDE1NjIgMjkuNDAyMzQzIDMuNSA5IDcuNjk5MjE5IDIyLjU5NzY1NyA4LjgwMDc4MSA0Ny41IDEuMTk5MjE5IDI3IDEuNSAzNS4wOTc2NTcgMS41IDEwMy4zOTg0MzhzLS4zMDA3ODEgNzYuMzAwNzgxLTEuNSAxMDMuMzAwNzgxem0wIDAiLz48cGF0aCBkPSJtMjU2LjQ0OTIxOSAxMjQuNWMtNzIuNTk3NjU3IDAtMTMxLjUgNTguODk4NDM4LTEzMS41IDEzMS41czU4LjkwMjM0MyAxMzEuNSAxMzEuNSAxMzEuNWM3Mi42MDE1NjIgMCAxMzEuNS01OC44OTg0MzggMTMxLjUtMTMxLjVzLTU4Ljg5ODQzOC0xMzEuNS0xMzEuNS0xMzEuNXptMCAyMTYuODAwNzgxYy00Ny4wOTc2NTcgMC04NS4zMDA3ODEtMzguMTk5MjE5LTg1LjMwMDc4MS04NS4zMDA3ODFzMzguMjAzMTI0LTg1LjMwMDc4MSA4NS4zMDA3ODEtODUuMzAwNzgxYzQ3LjEwMTU2MiAwIDg1LjMwMDc4MSAzOC4xOTkyMTkgODUuMzAwNzgxIDg1LjMwMDc4MXMtMzguMTk5MjE5IDg1LjMwMDc4MS04NS4zMDA3ODEgODUuMzAwNzgxem0wIDAiLz48cGF0aCBkPSJtNDIzLjg1MTU2MiAxMTkuMzAwNzgxYzAgMTYuOTUzMTI1LTEzLjc0NjA5MyAzMC42OTkyMTktMzAuNzAzMTI0IDMwLjY5OTIxOS0xNi45NTMxMjYgMC0zMC42OTkyMTktMTMuNzQ2MDk0LTMwLjY5OTIxOS0zMC42OTkyMTkgMC0xNi45NTcwMzEgMTMuNzQ2MDkzLTMwLjY5OTIxOSAzMC42OTkyMTktMzAuNjk5MjE5IDE2Ljk1NzAzMSAwIDMwLjcwMzEyNCAxMy43NDIxODggMzAuNzAzMTI0IDMwLjY5OTIxOXptMCAwIi8+PC9zdmc+",alt:"instagram",width:"20px",height:"auto"})),n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.youtube.com/channel/UCKNXAqIvqc25JJ1CWdayqBA"},n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00OTAuMjQsMTEzLjkyYy0xMy44ODgtMjQuNzA0LTI4Ljk2LTI5LjI0OC01OS42NDgtMzAuOTc2QzM5OS45MzYsODAuODY0LDMyMi44NDgsODAsMjU2LjA2NCw4MA0KCQkJYy02Ni45MTIsMC0xNDQuMDMyLDAuODY0LTE3NC42NTYsMi45MTJjLTMwLjYyNCwxLjc2LTQ1LjcyOCw2LjI3Mi01OS43NDQsMzEuMDA4QzcuMzYsMTM4LjU5MiwwLDE4MS4wODgsMCwyNTUuOTA0DQoJCQlDMCwyNTUuOTY4LDAsMjU2LDAsMjU2YzAsMC4wNjQsMCwwLjA5NiwwLDAuMDk2djAuMDY0YzAsNzQuNDk2LDcuMzYsMTE3LjMxMiwyMS42NjQsMTQxLjcyOA0KCQkJYzE0LjAxNiwyNC43MDQsMjkuMDg4LDI5LjE4NCw1OS43MTIsMzEuMjY0QzExMi4wMzIsNDMwLjk0NCwxODkuMTUyLDQzMiwyNTYuMDY0LDQzMmM2Ni43ODQsMCwxNDMuODcyLTEuMDU2LDE3NC41Ni0yLjgxNg0KCQkJYzMwLjY4OC0yLjA4LDQ1Ljc2LTYuNTYsNTkuNjQ4LTMxLjI2NEM1MDQuNzA0LDM3My41MDQsNTEyLDMzMC42ODgsNTEyLDI1Ni4xOTJjMCwwLDAtMC4wOTYsMC0wLjE2YzAsMCwwLTAuMDY0LDAtMC4wOTYNCgkJCUM1MTIsMTgxLjA4OCw1MDQuNzA0LDEzOC41OTIsNDkwLjI0LDExMy45MnogTTE5MiwzNTJWMTYwbDE2MCw5NkwxOTIsMzUyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",alt:"youtube",width:"20px",height:"auto"})),n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.github.com/sosunnyproject"},n.createElement("img",{src:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yNTUuOTY4LDUuMzI5QzExNC42MjQsNS4zMjksMCwxMjAuNDAxLDAsMjYyLjM1M2MwLDExMy41MzYsNzMuMzQ0LDIwOS44NTYsMTc1LjEwNCwyNDMuODcyCgkJCWMxMi44LDIuMzY4LDE3LjQ3Mi01LjU2OCwxNy40NzItMTIuMzg0YzAtNi4xMTItMC4yMjQtMjIuMjcyLTAuMzUyLTQzLjcxMmMtNzEuMiwxNS41Mi04Ni4yNC0zNC40NjQtODYuMjQtMzQuNDY0CgkJCWMtMTEuNjE2LTI5LjY5Ni0yOC40MTYtMzcuNi0yOC40MTYtMzcuNmMtMjMuMjY0LTE1LjkzNiwxLjcyOC0xNS42MTYsMS43MjgtMTUuNjE2YzI1LjY5NiwxLjgyNCwzOS4yLDI2LjQ5NiwzOS4yLDI2LjQ5NgoJCQljMjIuODQ4LDM5LjI2NCw1OS45MzYsMjcuOTM2LDc0LjUyOCwyMS4zNDRjMi4zMDQtMTYuNjA4LDguOTI4LTI3LjkzNiwxNi4yNTYtMzQuMzY4CgkJCWMtNTYuODMyLTYuNDk2LTExNi42MDgtMjguNTQ0LTExNi42MDgtMTI3LjAwOGMwLTI4LjA2NCw5Ljk4NC01MS4wMDgsMjYuMzY4LTY4Ljk5MmMtMi42NTYtNi40OTYtMTEuNDI0LTMyLjY0LDIuNDk2LTY4CgkJCWMwLDAsMjEuNTA0LTYuOTEyLDcwLjQsMjYuMzM2YzIwLjQxNi01LjY5Niw0Mi4zMDQtOC41NDQsNjQuMDk2LTguNjRjMjEuNzI4LDAuMTI4LDQzLjY0OCwyLjk0NCw2NC4wOTYsOC42NzIKCQkJYzQ4Ljg2NC0zMy4yNDgsNzAuMzM2LTI2LjMzNiw3MC4zMzYtMjYuMzM2YzEzLjk1MiwzNS4zOTIsNS4xODQsNjEuNTA0LDIuNTYsNjhjMTYuNDE2LDE3Ljk4NCwyNi4zMDQsNDAuOTI4LDI2LjMwNCw2OC45OTIKCQkJYzAsOTguNzItNTkuODQsMTIwLjQ0OC0xMTYuODY0LDEyNi44MTZjOS4xODQsNy45MzYsMTcuMzc2LDIzLjYxNiwxNy4zNzYsNDcuNTg0YzAsMzQuMzY4LTAuMzIsNjIuMDgtMC4zMiw3MC40OTYKCQkJYzAsNi44OCw0LjYwOCwxNC44OCwxNy42LDEyLjM1MkM0MzguNzIsNDcyLjE0NSw1MTIsMzc1Ljg1Nyw1MTIsMjYyLjM1M0M1MTIsMTIwLjQwMSwzOTcuMzc2LDUuMzI5LDI1NS45NjgsNS4zMjl6Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==",alt:"github",width:"20px",height:"auto"})),n.createElement("a",{target:"_blank",rel:"noreferrer",href:"https://www.linkedin.com/in/sosunpark"},n.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjY4MnB0IiB2aWV3Qm94PSItMjEgLTM1IDY4Mi42NjY2OSA2ODIiIHdpZHRoPSI2ODJwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNzcuNjEzMjgxLS42Njc5NjljLTQ2LjkyOTY4NyAwLTc3LjYxMzI4MSAzMC44MTY0MDctNzcuNjEzMjgxIDcxLjMyMDMxMyAwIDM5LjYwOTM3NSAyOS43Njk1MzEgNzEuMzA0Njg3IDc1LjgxMjUgNzEuMzA0Njg3aC44OTA2MjVjNDcuODQ3NjU2IDAgNzcuNjI1LTMxLjY5NTMxMiA3Ny42MjUtNzEuMzA0Njg3LS44OTQ1MzEtNDAuNTAzOTA2LTI5Ljc3NzM0NC03MS4zMjAzMTMtNzYuNzE0ODQ0LTcxLjMyMDMxM3ptMCAwIi8+PHBhdGggZD0ibTguMTA5Mzc1IDE5OC4zMTI1aDEzNy4xOTUzMTN2NDEyLjc1NzgxMmgtMTM3LjE5NTMxM3ptMCAwIi8+PHBhdGggZD0ibTQ4Mi4wNTQ2ODggMTg4LjYyNWMtNzQuMDExNzE5IDAtMTIzLjY0MDYyNiA2OS41NDY4NzUtMTIzLjY0MDYyNiA2OS41NDY4NzV2LTU5Ljg1OTM3NWgtMTM3LjE5OTIxOHY0MTIuNzU3ODEyaDEzNy4xOTE0MDZ2LTIzMC41YzAtMTIuMzM5ODQzLjg5NDUzMS0yNC42NjAxNTYgNC41MTk1MzEtMzMuNDg0Mzc0IDkuOTE3OTY5LTI0LjY0MDYyNiAzMi40ODgyODEtNTAuMTY3OTY5IDcwLjM5MDYyNS01MC4xNjc5NjkgNDkuNjQ0NTMyIDAgNjkuNSAzNy44NTE1NjIgNjkuNSA5My4zMzk4NDN2MjIwLjgxMjVoMTM3LjE4MzU5NHYtMjM2LjY2Nzk2OGMwLTEyNi43ODEyNS02Ny42ODc1LTE4NS43NzczNDQtMTU3Ljk0NTMxMi0xODUuNzc3MzQ0em0wIDAiLz48L3N2Zz4=",alt:"linkedin",width:"20px",height:"auto"})))))}},9443:function(e,t,M){M.d(t,{Z:function(){return u}});var n=M(7294),a=M(1883),i=M(6717),r=M(3723);function u(e){var t,M;let{node:u}=e;const c=(0,r.c)(null===(t=u.frontmatter)||void 0===t?void 0:t.featuredImage);return n.createElement("div",{key:u.id,className:i.Ol},n.createElement(a.Link,{to:u.fields.slug},n.createElement(r.G,{image:c,alt:"",layout:"fullWidth",width:360,aspectratio:16/9}),n.createElement("h3",null,null==u||null===(M=u.frontmatter)||void 0===M?void 0:M.title)))}},6717:function(e,t,M){M.d(t,{$z:function(){return L},DS:function(){return l},Ip:function(){return s},Kz:function(){return a},Ol:function(){return g},SN:function(){return i},Sq:function(){return o},WD:function(){return T},bM:function(){return n},cN:function(){return z},gJ:function(){return N},k6:function(){return r},m5:function(){return j},q3:function(){return c},vV:function(){return u}});var n="container-module--highlightSpan--48ec8",a="container-module--index--10a43",i="container-module--indexBottom--7202d",r="container-module--indexVideo--05025",u="container-module--indexVideoWrapper--a2e1a",c="container-module--innerLayout--cf7f9",N="container-module--pf_header--7ea29",o="container-module--pf_subheader_btn--54f26",s="container-module--pf_subheader_selected--71c08",l="container-module--pf_subheader_wrapper--1b7f4",g="container-module--portfolioCard--863e7",T="container-module--portfolioList--5fec2",j="container-module--portfolioWrapper--cf1f5",L="container-module--postList--0bde6",z="container-module--postWrapper--206d1"}}]);
//# sourceMappingURL=63a01f01651d03b583be6ee7b76907d59042fba7-b0b9f1fc349d39925187.js.map