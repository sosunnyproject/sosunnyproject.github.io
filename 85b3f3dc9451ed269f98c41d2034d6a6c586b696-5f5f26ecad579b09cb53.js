"use strict";(self.webpackChunksosunnyproject_gatsby_blog=self.webpackChunksosunnyproject_gatsby_blog||[]).push([[878],{3204:function(e){const t=(e,t)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);if(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim(),0===e.length)return"";if(1===e.length)return t.pascalCase?e.toUpperCase():e.toLowerCase();return e!==e.toLowerCase()&&(e=(e=>{let t=!1,r=!1,n=!1;for(let a=0;a<e.length;a++){const i=e[a];t&&/[a-zA-Z]/.test(i)&&i.toUpperCase()===i?(e=e.slice(0,a)+"-"+e.slice(a),t=!1,n=r,r=!0,a++):r&&n&&/[a-zA-Z]/.test(i)&&i.toLowerCase()===i?(e=e.slice(0,a-1)+"-"+e.slice(a-1),n=r,r=!1,t=!0):(t=i.toLowerCase()===i&&i.toUpperCase()!==i,n=r,r=i.toUpperCase()===i&&i.toLowerCase()!==i)}return e})(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,((e,t)=>t.toUpperCase())).replace(/\d+(\w|$)/g,(e=>e.toUpperCase())),r=e,t.pascalCase?r.charAt(0).toUpperCase()+r.slice(1):r;var r};e.exports=t,e.exports.default=t},3723:function(e,t,r){r.d(t,{G:function(){return q},L:function(){return m},M:function(){return L},P:function(){return E},_:function(){return s},a:function(){return o},b:function(){return u},c:function(){return c},g:function(){return d},h:function(){return l}});var n=r(7294),a=(r(3204),r(5697)),i=r.n(a);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}function s(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(r=i[n])>=0||(a[r]=e[r]);return a}const l=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;const c=e=>{var t;return(e=>{var t,r;return Boolean(null==e||null==(t=e.images)||null==(r=t.fallback)?void 0:r.src)})(e)?e:(e=>Boolean(null==e?void 0:e.gatsbyImageData))(e)?e.gatsbyImageData:(e=>Boolean(null==e?void 0:e.gatsbyImage))(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData};function u(e,t,r,n,a){return void 0===a&&(a={}),o({},r,{loading:n,shouldLoad:e,"data-main-image":"",style:o({},a,{opacity:t?1:0})})}function d(e,t,r,n,a,i,s,l){const c={};i&&(c.backgroundColor=i,"fixed"===r?(c.width=n,c.height=a,c.backgroundColor=i,c.position="relative"):("constrained"===r||"fullWidth"===r)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),s&&(c.objectFit=s),l&&(c.objectPosition=l);const u=o({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:o({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return u}const p=["children"],g=function(e){let{layout:t,width:r,height:a}=e;return"fullWidth"===t?n.createElement("div",{"aria-hidden":!0,style:{paddingTop:a/r*100+"%"}}):"constrained"===t?n.createElement("div",{style:{maxWidth:r,display:"block"}},n.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+a+"' width='"+r+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},m=function(e){let{children:t}=e,r=s(e,p);return n.createElement(n.Fragment,null,n.createElement(g,o({},r)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){let{src:t,srcSet:r,loading:a,alt:i="",shouldLoad:l}=e,c=s(e,f);return n.createElement("img",o({},c,{decoding:"async",loading:a,src:l?t:void 0,"data-src":l?void 0:t,srcSet:l?r:void 0,"data-srcset":l?void 0:r,alt:i}))},v=function(e){let{fallback:t,sources:r=[],shouldLoad:a=!0}=e,i=s(e,h);const l=i.sizes||(null==t?void 0:t.sizes),c=n.createElement(y,o({},i,t,{sizes:l,shouldLoad:a}));return r.length?n.createElement("picture",null,r.map((e=>{let{media:t,srcSet:r,type:i}=e;return n.createElement("source",{key:t+"-"+i+"-"+r,type:i,media:t,srcSet:a?r:void 0,"data-srcset":a?void 0:r,sizes:l})})),c):c};var b;y.propTypes={src:a.string.isRequired,alt:a.string.isRequired,sizes:a.string,srcSet:a.string,shouldLoad:a.bool},v.displayName="Picture",v.propTypes={alt:a.string.isRequired,shouldLoad:a.bool,fallback:a.exact({src:a.string.isRequired,srcSet:a.string,sizes:a.string}),sources:a.arrayOf(a.oneOfType([a.exact({media:a.string.isRequired,type:a.string,sizes:a.string,srcSet:a.string.isRequired}),a.exact({media:a.string,type:a.string.isRequired,sizes:a.string,srcSet:a.string.isRequired})]))};const w=["fallback"],E=function(e){let{fallback:t}=e,r=s(e,w);return t?n.createElement(v,o({},r,{fallback:{src:t},"aria-hidden":!0,alt:""})):n.createElement("div",o({},r))};E.displayName="Placeholder",E.propTypes={fallback:a.string,sources:null==(b=v.propTypes)?void 0:b.sources,alt:function(e,t,r){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+r+"`. Validation failed."):null}};const L=function(e){return n.createElement(n.Fragment,null,n.createElement(v,o({},e)),n.createElement("noscript",null,n.createElement(v,o({},e,{shouldLoad:!0}))))};L.displayName="MainImage",L.propTypes=v.propTypes;const C=function(e,t,r){for(var n=arguments.length,a=new Array(n>3?n-3:0),o=3;o<n;o++)a[o-3]=arguments[o];return e.alt||""===e.alt?i().string.apply(i(),[e,t,r].concat(a)):new Error('The "alt" prop is required in '+r+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},k={image:i().object.isRequired,alt:C},S=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],x=["style","className"],I=new Set;let T,O;const _=function(e){let{as:t="div",image:a,style:i,backgroundColor:c,className:u,class:d,onStartLoad:p,onLoad:g,onError:m}=e,f=s(e,S);const{width:h,height:y,layout:v}=a,b=function(e,t,r){const n={};let a="gatsby-image-wrapper";return"fixed"===r?(n.width=e,n.height=t):"constrained"===r&&(a="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:a,"data-gatsby-image-wrapper":"",style:n}}(h,y,v),{style:w,className:E}=b,L=s(b,x),C=(0,n.useRef)(),k=(0,n.useMemo)((()=>JSON.stringify(a.images)),[a.images]);d&&(u=d);const _=function(e,t,r){let n="";return"fullWidth"===e&&(n='<div aria-hidden="true" style="padding-top: '+r/t*100+'%;"></div>'),"constrained"===e&&(n='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+r+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),n}(v,h,y);return(0,n.useEffect)((()=>{T||(T=Promise.all([r.e(774),r.e(223)]).then(r.bind(r,8223)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:r}=e;return O=t,{renderImageToString:t,swapPlaceholderImage:r}})));const e=C.current.querySelector("[data-gatsby-image-ssr]");if(e&&l())return e.complete?(null==p||p({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==p||p({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void I.add(k);if(O&&I.has(k))return;let t,n;return T.then((e=>{let{renderImageToString:r,swapPlaceholderImage:s}=e;C.current&&(C.current.innerHTML=r(o({isLoading:!0,isLoaded:I.has(k),image:a},f)),I.has(k)||(t=requestAnimationFrame((()=>{C.current&&(n=s(C.current,k,I,i,p,g,m))}))))})),()=>{t&&cancelAnimationFrame(t),n&&n()}}),[a]),(0,n.useLayoutEffect)((()=>{I.has(k)&&O&&(C.current.innerHTML=O(o({isLoading:I.has(k),isLoaded:I.has(k),image:a},f)),null==p||p({wasCached:!0}),null==g||g({wasCached:!0}))}),[a]),(0,n.createElement)(t,o({},L,{style:o({},w,i,{backgroundColor:c}),className:E+(u?" "+u:""),ref:C,dangerouslySetInnerHTML:{__html:_},suppressHydrationWarning:!0}))},q=(0,n.memo)((function(e){return e.image?(0,n.createElement)(_,e):null}));q.propTypes=k,q.displayName="GatsbyImage";const N=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],W=function(e,t){for(var r=arguments.length,n=new Array(r>2?r-2:0),a=2;a<r;a++)n[a-2]=arguments[a];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(n)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},z=new Set(["fixed","fullWidth","constrained"]),A={src:i().string.isRequired,alt:C,width:W,height:W,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!z.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},R=(j=q,function(e){let{src:t,__imageData:r,__error:a}=e,i=s(e,N);return a&&console.warn(a),r?n.createElement(j,o({image:r},i)):(console.warn("Image not loaded",t),null)});var j;R.displayName="StaticImage",R.propTypes=A},8661:function(e,t,r){r.r(t),r.d(t,{default:function(){return s}});var n=r(7294),a=r(1883),i=r(6717),o=r(3723);function s(e){var t,r,s;let{node:l}=e;const c=(0,o.c)(null===(t=l.frontmatter)||void 0===t?void 0:t.featuredImage);return console.log(l.frontmatter),n.createElement("div",{key:l.id,className:i.Ol},n.createElement(a.Link,{to:l.fields.slug},n.createElement(o.G,{image:c,alt:"",layout:"fullWidth",width:480,aspectRatio:16/9}),n.createElement("h3",null,null==l||null===(r=l.frontmatter)||void 0===r?void 0:r.title)),n.createElement("h4",null,null==l||null===(s=l.frontmatter)||void 0===s?void 0:s.date))}},6717:function(e,t,r){r.d(t,{$z:function(){return u},Kz:function(){return a},Ol:function(){return s},SN:function(){return i},WD:function(){return l},bM:function(){return n},cN:function(){return d},m5:function(){return c},q3:function(){return o}});var n="container-module--highlightSpan--48ec8",a="container-module--index--10a43",i="container-module--indexBottom--7202d",o="container-module--innerLayout--cf7f9",s="container-module--portfolioCard--863e7",l="container-module--portfolioList--5fec2",c="container-module--portfolioWrapper--cf1f5",u="container-module--postList--0bde6",d="container-module--postWrapper--206d1"}}]);
//# sourceMappingURL=85b3f3dc9451ed269f98c41d2034d6a6c586b696-5f5f26ecad579b09cb53.js.map