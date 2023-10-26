import{b as jt,c as _t,d as Bt,e as Vt,r as $t}from"./_baseIteratee-a07492a4.js";import{r as S}from"./index-7c191284.js";function yt(){return yt=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},yt.apply(this,arguments)}var at=function(t,e){return at=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,n){o.__proto__=n}||function(o,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(o[i]=n[i])},at(t,e)};function Ze(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");at(t,e);function o(){this.constructor=t}t.prototype=e===null?Object.create(e):(o.prototype=e.prototype,new o)}var vt=function(){return vt=Object.assign||function(e){for(var o,n=1,i=arguments.length;n<i;n++){o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},vt.apply(this,arguments)};function Je(t,e){var o={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(o[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(o[n[i]]=t[n[i]]);return o}function Qe(t,e,o){if(o||arguments.length===2)for(var n=0,i=e.length,r;n<i;n++)(r||!(n in e))&&(r||(r=Array.prototype.slice.call(e,0,n)),r[n]=e[n]);return t.concat(r||Array.prototype.slice.call(e))}function zt(t,e,o,n){for(var i=t.length,r=o+(n?1:-1);n?r--:++r<i;)if(e(t[r],r,t))return r;return-1}var Yt=zt;function qt(t){return t!==t}var Xt=qt;function Ut(t,e,o){for(var n=o-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var Gt=Ut,Kt=Yt,Zt=Xt,Jt=Gt;function Qt(t,e,o){return e===e?Jt(t,e,o):Kt(t,Zt,o)}var te=Qt,ee=te;function ne(t,e){var o=t==null?0:t.length;return!!o&&ee(t,e,0)>-1}var oe=ne;function ie(t,e,o){for(var n=-1,i=t==null?0:t.length;++n<i;)if(o(e,t[n]))return!0;return!1}var re=ie;function se(){}var ce=se,ft=jt,le=ce,fe=_t,ae=1/0,ue=ft&&1/fe(new ft([,-0]))[1]==ae?function(t){return new ft(t)}:le,de=ue,me=Bt,ge=oe,he=re,pe=Vt,xe=de,we=_t,ye=200;function ve(t,e,o){var n=-1,i=ge,r=t.length,s=!0,l=[],c=l;if(o)s=!1,i=he;else if(r>=ye){var f=e?null:xe(t);if(f)return we(f);s=!1,i=pe,c=new me}else c=e?[]:l;t:for(;++n<r;){var d=t[n],u=e?e(d):d;if(d=o||d!==0?d:0,s&&u===u){for(var m=c.length;m--;)if(c[m]===u)continue t;e&&c.push(u),l.push(d)}else i(c,u,o)||(c!==l&&c.push(u),l.push(d))}return l}var tn=ve;const be=["top","right","bottom","left"],V=Math.min,_=Math.max,nt=Math.round,tt=Math.floor,$=t=>({x:t,y:t}),Oe={left:"right",right:"left",bottom:"top",top:"bottom"},Ae={start:"end",end:"start"};function ut(t,e,o){return _(t,V(e,o))}function W(t,e){return typeof t=="function"?t(e):t}function H(t){return t.split("-")[0]}function K(t){return t.split("-")[1]}function mt(t){return t==="x"?"y":"x"}function gt(t){return t==="y"?"height":"width"}function Z(t){return["top","bottom"].includes(H(t))?"y":"x"}function ht(t){return mt(Z(t))}function Re(t,e,o){o===void 0&&(o=!1);const n=K(t),i=ht(t),r=gt(i);let s=i==="x"?n===(o?"end":"start")?"right":"left":n==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=ot(s)),[s,ot(s)]}function Ce(t){const e=ot(t);return[dt(t),e,dt(e)]}function dt(t){return t.replace(/start|end/g,e=>Ae[e])}function Se(t,e,o){const n=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:n:e?n:i;case"left":case"right":return e?r:s;default:return[]}}function Ee(t,e,o,n){const i=K(t);let r=Se(H(t),o==="start",n);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(dt)))),r}function ot(t){return t.replace(/left|right|bottom|top/g,e=>Oe[e])}function Pe(t){return{top:0,right:0,bottom:0,left:0,...t}}function Lt(t){return typeof t!="number"?Pe(t):{top:t,right:t,bottom:t,left:t}}function it(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function bt(t,e,o){let{reference:n,floating:i}=t;const r=Z(e),s=ht(e),l=gt(s),c=H(e),f=r==="y",d=n.x+n.width/2-i.width/2,u=n.y+n.height/2-i.height/2,m=n[l]/2-i[l]/2;let a;switch(c){case"top":a={x:d,y:n.y-i.height};break;case"bottom":a={x:d,y:n.y+n.height};break;case"right":a={x:n.x+n.width,y:u};break;case"left":a={x:n.x-i.width,y:u};break;default:a={x:n.x,y:n.y}}switch(K(e)){case"start":a[s]-=m*(o&&f?-1:1);break;case"end":a[s]+=m*(o&&f?-1:1);break}return a}const Te=async(t,e,o)=>{const{placement:n="bottom",strategy:i="absolute",middleware:r=[],platform:s}=o,l=r.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(e));let f=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:d,y:u}=bt(f,n,c),m=n,a={},g=0;for(let p=0;p<l.length;p++){const{name:y,fn:h}=l[p],{x:w,y:v,data:b,reset:x}=await h({x:d,y:u,initialPlacement:n,placement:m,strategy:i,middlewareData:a,rects:f,platform:s,elements:{reference:t,floating:e}});if(d=w??d,u=v??u,a={...a,[y]:{...a[y],...b}},x&&g<=50){g++,typeof x=="object"&&(x.placement&&(m=x.placement),x.rects&&(f=x.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):x.rects),{x:d,y:u}=bt(f,m,c)),p=-1;continue}}return{x:d,y:u,placement:m,strategy:i,middlewareData:a}};async function J(t,e){var o;e===void 0&&(e={});const{x:n,y:i,platform:r,rects:s,elements:l,strategy:c}=t,{boundary:f="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:m=!1,padding:a=0}=W(e,t),g=Lt(a),y=l[m?u==="floating"?"reference":"floating":u],h=it(await r.getClippingRect({element:(o=await(r.isElement==null?void 0:r.isElement(y)))==null||o?y:y.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(l.floating)),boundary:f,rootBoundary:d,strategy:c})),w=u==="floating"?{...s.floating,x:n,y:i}:s.reference,v=await(r.getOffsetParent==null?void 0:r.getOffsetParent(l.floating)),b=await(r.isElement==null?void 0:r.isElement(v))?await(r.getScale==null?void 0:r.getScale(v))||{x:1,y:1}:{x:1,y:1},x=it(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:v,strategy:c}):w);return{top:(h.top-x.top+g.top)/b.y,bottom:(x.bottom-h.bottom+g.bottom)/b.y,left:(h.left-x.left+g.left)/b.x,right:(x.right-h.right+g.right)/b.x}}const Ot=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:n,placement:i,rects:r,platform:s,elements:l}=e,{element:c,padding:f=0}=W(t,e)||{};if(c==null)return{};const d=Lt(f),u={x:o,y:n},m=ht(i),a=gt(m),g=await s.getDimensions(c),p=m==="y",y=p?"top":"left",h=p?"bottom":"right",w=p?"clientHeight":"clientWidth",v=r.reference[a]+r.reference[m]-u[m]-r.floating[a],b=u[m]-r.reference[m],x=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c));let O=x?x[w]:0;(!O||!await(s.isElement==null?void 0:s.isElement(x)))&&(O=l.floating[w]||r.floating[a]);const E=v/2-b/2,T=O/2-g[a]/2-1,M=V(d[y],T),F=V(d[h],T),R=M,N=O-g[a]-F,P=O/2-g[a]/2+E,C=ut(R,P,N),A=K(i)!=null&&P!=C&&r.reference[a]/2-(P<R?M:F)-g[a]/2<0?P<R?R-P:N-P:0;return{[m]:u[m]-A,data:{[m]:C,centerOffset:P-C+A}}}}),en=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o;const{placement:n,middlewareData:i,rects:r,initialPlacement:s,platform:l,elements:c}=e,{mainAxis:f=!0,crossAxis:d=!0,fallbackPlacements:u,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:a="none",flipAlignment:g=!0,...p}=W(t,e),y=H(n),h=H(s)===s,w=await(l.isRTL==null?void 0:l.isRTL(c.floating)),v=u||(h||!g?[ot(s)]:Ce(s));!u&&a!=="none"&&v.push(...Ee(s,g,a,w));const b=[s,...v],x=await J(e,p),O=[];let E=((o=i.flip)==null?void 0:o.overflows)||[];if(f&&O.push(x[y]),d){const R=Re(n,r,w);O.push(x[R[0]],x[R[1]])}if(E=[...E,{placement:n,overflows:O}],!O.every(R=>R<=0)){var T,M;const R=(((T=i.flip)==null?void 0:T.index)||0)+1,N=b[R];if(N)return{data:{index:R,overflows:E},reset:{placement:N}};let P=(M=E.filter(C=>C.overflows[0]<=0).sort((C,k)=>C.overflows[1]-k.overflows[1])[0])==null?void 0:M.placement;if(!P)switch(m){case"bestFit":{var F;const C=(F=E.map(k=>[k.placement,k.overflows.filter(A=>A>0).reduce((A,q)=>A+q,0)]).sort((k,A)=>k[1]-A[1])[0])==null?void 0:F[0];C&&(P=C);break}case"initialPlacement":P=s;break}if(n!==P)return{reset:{placement:P}}}return{}}}};function At(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Rt(t){return be.some(e=>t[e]>=0)}const nn=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:o}=e,{strategy:n="referenceHidden",...i}=W(t,e);switch(n){case"referenceHidden":{const r=await J(e,{...i,elementContext:"reference"}),s=At(r,o.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:Rt(s)}}}case"escaped":{const r=await J(e,{...i,altBoundary:!0}),s=At(r,o.floating);return{data:{escapedOffsets:s,escaped:Rt(s)}}}default:return{}}}}};async function _e(t,e){const{placement:o,platform:n,elements:i}=t,r=await(n.isRTL==null?void 0:n.isRTL(i.floating)),s=H(o),l=K(o),c=Z(o)==="y",f=["left","top"].includes(s)?-1:1,d=r&&c?-1:1,u=W(e,t);let{mainAxis:m,crossAxis:a,alignmentAxis:g}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...u};return l&&typeof g=="number"&&(a=l==="end"?g*-1:g),c?{x:a*d,y:m*f}:{x:m*f,y:a*d}}const on=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:o,y:n}=e,i=await _e(e,t);return{x:o+i.x,y:n+i.y,data:i}}}},rn=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:n,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:l={fn:y=>{let{x:h,y:w}=y;return{x:h,y:w}}},...c}=W(t,e),f={x:o,y:n},d=await J(e,c),u=Z(H(i)),m=mt(u);let a=f[m],g=f[u];if(r){const y=m==="y"?"top":"left",h=m==="y"?"bottom":"right",w=a+d[y],v=a-d[h];a=ut(w,a,v)}if(s){const y=u==="y"?"top":"left",h=u==="y"?"bottom":"right",w=g+d[y],v=g-d[h];g=ut(w,g,v)}const p=l.fn({...e,[m]:a,[u]:g});return{...p,data:{x:p.x-o,y:p.y-n}}}}},sn=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:o,y:n,placement:i,rects:r,middlewareData:s}=e,{offset:l=0,mainAxis:c=!0,crossAxis:f=!0}=W(t,e),d={x:o,y:n},u=Z(i),m=mt(u);let a=d[m],g=d[u];const p=W(l,e),y=typeof p=="number"?{mainAxis:p,crossAxis:0}:{mainAxis:0,crossAxis:0,...p};if(c){const v=m==="y"?"height":"width",b=r.reference[m]-r.floating[v]+y.mainAxis,x=r.reference[m]+r.reference[v]-y.mainAxis;a<b?a=b:a>x&&(a=x)}if(f){var h,w;const v=m==="y"?"width":"height",b=["top","left"].includes(H(i)),x=r.reference[u]-r.floating[v]+(b&&((h=s.offset)==null?void 0:h[u])||0)+(b?0:y.crossAxis),O=r.reference[u]+r.reference[v]+(b?0:((w=s.offset)==null?void 0:w[u])||0)-(b?y.crossAxis:0);g<x?g=x:g>O&&(g=O)}return{[m]:a,[u]:g}}}},cn=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){const{placement:o,rects:n,platform:i,elements:r}=e,{apply:s=()=>{},...l}=W(t,e),c=await J(e,l),f=H(o),d=K(o),u=Z(o)==="y",{width:m,height:a}=n.floating;let g,p;f==="top"||f==="bottom"?(g=f,p=d===(await(i.isRTL==null?void 0:i.isRTL(r.floating))?"start":"end")?"left":"right"):(p=f,g=d==="end"?"top":"bottom");const y=a-c[g],h=m-c[p],w=!e.middlewareData.shift;let v=y,b=h;if(u){const O=m-c.left-c.right;b=d||w?V(h,O):O}else{const O=a-c.top-c.bottom;v=d||w?V(y,O):O}if(w&&!d){const O=_(c.left,0),E=_(c.right,0),T=_(c.top,0),M=_(c.bottom,0);u?b=m-2*(O!==0||E!==0?O+E:_(c.left,c.right)):v=a-2*(T!==0||M!==0?T+M:_(c.top,c.bottom))}await s({...e,availableWidth:b,availableHeight:v});const x=await i.getDimensions(r.floating);return m!==x.width||a!==x.height?{reset:{rects:!0}}:{}}}};function z(t){return Mt(t)?(t.nodeName||"").toLowerCase():"#document"}function L(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function B(t){var e;return(e=(Mt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Mt(t){return t instanceof Node||t instanceof L(t).Node}function j(t){return t instanceof Element||t instanceof L(t).Element}function I(t){return t instanceof HTMLElement||t instanceof L(t).HTMLElement}function Ct(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof L(t).ShadowRoot}function Q(t){const{overflow:e,overflowX:o,overflowY:n,display:i}=D(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+o)&&!["inline","contents"].includes(i)}function Le(t){return["table","td","th"].includes(z(t))}function pt(t){const e=xt(),o=D(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(n=>(o.willChange||"").includes(n))||["paint","layout","strict","content"].some(n=>(o.contain||"").includes(n))}function Me(t){let e=G(t);for(;I(e)&&!ct(e);){if(pt(e))return e;e=G(e)}return null}function xt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function ct(t){return["html","body","#document"].includes(z(t))}function D(t){return L(t).getComputedStyle(t)}function lt(t){return j(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function G(t){if(z(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Ct(t)&&t.host||B(t);return Ct(e)?e.host:e}function Dt(t){const e=G(t);return ct(e)?t.ownerDocument?t.ownerDocument.body:t.body:I(e)&&Q(e)?e:Dt(e)}function rt(t,e){var o;e===void 0&&(e=[]);const n=Dt(t),i=n===((o=t.ownerDocument)==null?void 0:o.body),r=L(n);return i?e.concat(r,r.visualViewport||[],Q(n)?n:[]):e.concat(n,rt(n))}function kt(t){const e=D(t);let o=parseFloat(e.width)||0,n=parseFloat(e.height)||0;const i=I(t),r=i?t.offsetWidth:o,s=i?t.offsetHeight:n,l=nt(o)!==r||nt(n)!==s;return l&&(o=r,n=s),{width:o,height:n,$:l}}function wt(t){return j(t)?t:t.contextElement}function U(t){const e=wt(t);if(!I(e))return $(1);const o=e.getBoundingClientRect(),{width:n,height:i,$:r}=kt(e);let s=(r?nt(o.width):o.width)/n,l=(r?nt(o.height):o.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}const De=$(0);function It(t){const e=L(t);return!xt()||!e.visualViewport?De:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ke(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==L(t)?!1:e}function Y(t,e,o,n){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),r=wt(t);let s=$(1);e&&(n?j(n)&&(s=U(n)):s=U(t));const l=ke(r,o,n)?It(r):$(0);let c=(i.left+l.x)/s.x,f=(i.top+l.y)/s.y,d=i.width/s.x,u=i.height/s.y;if(r){const m=L(r),a=n&&j(n)?L(n):n;let g=m.frameElement;for(;g&&n&&a!==m;){const p=U(g),y=g.getBoundingClientRect(),h=D(g),w=y.left+(g.clientLeft+parseFloat(h.paddingLeft))*p.x,v=y.top+(g.clientTop+parseFloat(h.paddingTop))*p.y;c*=p.x,f*=p.y,d*=p.x,u*=p.y,c+=w,f+=v,g=L(g).frameElement}}return it({width:d,height:u,x:c,y:f})}function Ie(t){let{rect:e,offsetParent:o,strategy:n}=t;const i=I(o),r=B(o);if(o===r)return e;let s={scrollLeft:0,scrollTop:0},l=$(1);const c=$(0);if((i||!i&&n!=="fixed")&&((z(o)!=="body"||Q(r))&&(s=lt(o)),I(o))){const f=Y(o);l=U(o),c.x=f.x+o.clientLeft,c.y=f.y+o.clientTop}return{width:e.width*l.x,height:e.height*l.y,x:e.x*l.x-s.scrollLeft*l.x+c.x,y:e.y*l.y-s.scrollTop*l.y+c.y}}function Fe(t){return Array.from(t.getClientRects())}function Ft(t){return Y(B(t)).left+lt(t).scrollLeft}function Ne(t){const e=B(t),o=lt(t),n=t.ownerDocument.body,i=_(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),r=_(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let s=-o.scrollLeft+Ft(t);const l=-o.scrollTop;return D(n).direction==="rtl"&&(s+=_(e.clientWidth,n.clientWidth)-i),{width:i,height:r,x:s,y:l}}function We(t,e){const o=L(t),n=B(t),i=o.visualViewport;let r=n.clientWidth,s=n.clientHeight,l=0,c=0;if(i){r=i.width,s=i.height;const f=xt();(!f||f&&e==="fixed")&&(l=i.offsetLeft,c=i.offsetTop)}return{width:r,height:s,x:l,y:c}}function He(t,e){const o=Y(t,!0,e==="fixed"),n=o.top+t.clientTop,i=o.left+t.clientLeft,r=I(t)?U(t):$(1),s=t.clientWidth*r.x,l=t.clientHeight*r.y,c=i*r.x,f=n*r.y;return{width:s,height:l,x:c,y:f}}function St(t,e,o){let n;if(e==="viewport")n=We(t,o);else if(e==="document")n=Ne(B(t));else if(j(e))n=He(e,o);else{const i=It(t);n={...e,x:e.x-i.x,y:e.y-i.y}}return it(n)}function Nt(t,e){const o=G(t);return o===e||!j(o)||ct(o)?!1:D(o).position==="fixed"||Nt(o,e)}function je(t,e){const o=e.get(t);if(o)return o;let n=rt(t).filter(l=>j(l)&&z(l)!=="body"),i=null;const r=D(t).position==="fixed";let s=r?G(t):t;for(;j(s)&&!ct(s);){const l=D(s),c=pt(s);!c&&l.position==="fixed"&&(i=null),(r?!c&&!i:!c&&l.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||Q(s)&&!c&&Nt(t,s))?n=n.filter(d=>d!==s):i=l,s=G(s)}return e.set(t,n),n}function Be(t){let{element:e,boundary:o,rootBoundary:n,strategy:i}=t;const s=[...o==="clippingAncestors"?je(e,this._c):[].concat(o),n],l=s[0],c=s.reduce((f,d)=>{const u=St(e,d,i);return f.top=_(u.top,f.top),f.right=V(u.right,f.right),f.bottom=V(u.bottom,f.bottom),f.left=_(u.left,f.left),f},St(e,l,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Ve(t){return kt(t)}function $e(t,e,o){const n=I(e),i=B(e),r=o==="fixed",s=Y(t,!0,r,e);let l={scrollLeft:0,scrollTop:0};const c=$(0);if(n||!n&&!r)if((z(e)!=="body"||Q(i))&&(l=lt(e)),n){const f=Y(e,!0,r,e);c.x=f.x+e.clientLeft,c.y=f.y+e.clientTop}else i&&(c.x=Ft(i));return{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Et(t,e){return!I(t)||D(t).position==="fixed"?null:e?e(t):t.offsetParent}function Wt(t,e){const o=L(t);if(!I(t))return o;let n=Et(t,e);for(;n&&Le(n)&&D(n).position==="static";)n=Et(n,e);return n&&(z(n)==="html"||z(n)==="body"&&D(n).position==="static"&&!pt(n))?o:n||Me(t)||o}const ze=async function(t){let{reference:e,floating:o,strategy:n}=t;const i=this.getOffsetParent||Wt,r=this.getDimensions;return{reference:$e(e,await i(o),n),floating:{x:0,y:0,...await r(o)}}};function Ye(t){return D(t).direction==="rtl"}const qe={convertOffsetParentRelativeRectToViewportRelativeRect:Ie,getDocumentElement:B,getClippingRect:Be,getOffsetParent:Wt,getElementRects:ze,getClientRects:Fe,getDimensions:Ve,getScale:U,isElement:j,isRTL:Ye};function Xe(t,e){let o=null,n;const i=B(t);function r(){clearTimeout(n),o&&o.disconnect(),o=null}function s(l,c){l===void 0&&(l=!1),c===void 0&&(c=1),r();const{left:f,top:d,width:u,height:m}=t.getBoundingClientRect();if(l||e(),!u||!m)return;const a=tt(d),g=tt(i.clientWidth-(f+u)),p=tt(i.clientHeight-(d+m)),y=tt(f),w={rootMargin:-a+"px "+-g+"px "+-p+"px "+-y+"px",threshold:_(0,V(1,c))||1};let v=!0;function b(x){const O=x[0].intersectionRatio;if(O!==c){if(!v)return s();O?s(!1,O):n=setTimeout(()=>{s(!1,1e-7)},100)}v=!1}try{o=new IntersectionObserver(b,{...w,root:i.ownerDocument})}catch{o=new IntersectionObserver(b,w)}o.observe(t)}return s(!0),r}function ln(t,e,o,n){n===void 0&&(n={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=n,f=wt(t),d=i||r?[...f?rt(f):[],...rt(e)]:[];d.forEach(h=>{i&&h.addEventListener("scroll",o,{passive:!0}),r&&h.addEventListener("resize",o)});const u=f&&l?Xe(f,o):null;let m=-1,a=null;s&&(a=new ResizeObserver(h=>{let[w]=h;w&&w.target===f&&a&&(a.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{a&&a.observe(e)})),o()}),f&&!c&&a.observe(f),a.observe(e));let g,p=c?Y(t):null;c&&y();function y(){const h=Y(t);p&&(h.x!==p.x||h.y!==p.y||h.width!==p.width||h.height!==p.height)&&o(),p=h,g=requestAnimationFrame(y)}return o(),()=>{d.forEach(h=>{i&&h.removeEventListener("scroll",o),r&&h.removeEventListener("resize",o)}),u&&u(),a&&a.disconnect(),a=null,c&&cancelAnimationFrame(g)}}const Ue=(t,e,o)=>{const n=new Map,i={platform:qe,...o},r={...i.platform,_c:n};return Te(t,e,{...i,platform:r})},fn=t=>{function e(o){return{}.hasOwnProperty.call(o,"current")}return{name:"arrow",options:t,fn(o){const{element:n,padding:i}=typeof t=="function"?t(o):t;return n&&e(n)?n.current!=null?Ot({element:n.current,padding:i}).fn(o):{}:n?Ot({element:n,padding:i}).fn(o):{}}}};var et=typeof document<"u"?S.useLayoutEffect:S.useEffect;function st(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(typeof t=="function"&&t.toString()===e.toString())return!0;let o,n,i;if(t&&e&&typeof t=="object"){if(Array.isArray(t)){if(o=t.length,o!=e.length)return!1;for(n=o;n--!==0;)if(!st(t[n],e[n]))return!1;return!0}if(i=Object.keys(t),o=i.length,o!==Object.keys(e).length)return!1;for(n=o;n--!==0;)if(!{}.hasOwnProperty.call(e,i[n]))return!1;for(n=o;n--!==0;){const r=i[n];if(!(r==="_owner"&&t.$$typeof)&&!st(t[r],e[r]))return!1}return!0}return t!==t&&e!==e}function Ht(t){return typeof window>"u"?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function Pt(t,e){const o=Ht(t);return Math.round(e*o)/o}function Tt(t){const e=S.useRef(t);return et(()=>{e.current=t}),e}function an(t){t===void 0&&(t={});const{placement:e="bottom",strategy:o="absolute",middleware:n=[],platform:i,elements:{reference:r,floating:s}={},transform:l=!0,whileElementsMounted:c,open:f}=t,[d,u]=S.useState({x:0,y:0,strategy:o,placement:e,middlewareData:{},isPositioned:!1}),[m,a]=S.useState(n);st(m,n)||a(n);const[g,p]=S.useState(null),[y,h]=S.useState(null),w=S.useCallback(A=>{A!=O.current&&(O.current=A,p(A))},[p]),v=S.useCallback(A=>{A!==E.current&&(E.current=A,h(A))},[h]),b=r||g,x=s||y,O=S.useRef(null),E=S.useRef(null),T=S.useRef(d),M=Tt(c),F=Tt(i),R=S.useCallback(()=>{if(!O.current||!E.current)return;const A={placement:e,strategy:o,middleware:m};F.current&&(A.platform=F.current),Ue(O.current,E.current,A).then(q=>{const X={...q,isPositioned:!0};N.current&&!st(T.current,X)&&(T.current=X,$t.flushSync(()=>{u(X)}))})},[m,e,o,F]);et(()=>{f===!1&&T.current.isPositioned&&(T.current.isPositioned=!1,u(A=>({...A,isPositioned:!1})))},[f]);const N=S.useRef(!1);et(()=>(N.current=!0,()=>{N.current=!1}),[]),et(()=>{if(b&&(O.current=b),x&&(E.current=x),b&&x){if(M.current)return M.current(b,x,R);R()}},[b,x,R,M]);const P=S.useMemo(()=>({reference:O,floating:E,setReference:w,setFloating:v}),[w,v]),C=S.useMemo(()=>({reference:b,floating:x}),[b,x]),k=S.useMemo(()=>{const A={position:o,left:0,top:0};if(!C.floating)return A;const q=Pt(C.floating,d.x),X=Pt(C.floating,d.y);return l?{...A,transform:"translate("+q+"px, "+X+"px)",...Ht(C.floating)>=1.5&&{willChange:"transform"}}:{position:o,left:q,top:X}},[o,l,C.floating,d.x,d.y]);return S.useMemo(()=>({...d,update:R,refs:P,elements:C,floatingStyles:k}),[d,R,P,C,k])}export{yt as _,ln as a,cn as b,fn as c,vt as d,Je as e,en as f,Qe as g,nn as h,tn as i,Ze as j,rt as k,sn as l,on as o,rn as s,an as u};
//# sourceMappingURL=floating-ui.react-dom-b4774fa6.js.map