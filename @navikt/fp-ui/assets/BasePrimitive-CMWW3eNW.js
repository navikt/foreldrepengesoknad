import{R as M}from"./index-CZMpeKRu.js";import{a as N,u as W,S as q}from"./useId-U89bW7jp.js";function c(i,x,n,e){return e?typeof e=="string"?{[`--__${i}c-${x}-${n}-xs`]:e}:Object.fromEntries(Object.entries(e).map(([t,r])=>[`--__${i}c-${x}-${n}-${t}`,r])):{}}const z={"--ax-spacing-32":"--ax-space-128","--ax-spacing-24":"--ax-space-96","--ax-spacing-20":"--ax-space-80","--ax-spacing-18":"--ax-space-72","--ax-spacing-16":"--ax-space-64","--ax-spacing-14":"--ax-space-56","--ax-spacing-12":"--ax-space-48","--ax-spacing-11":"--ax-space-44","--ax-spacing-10":"--ax-space-40","--ax-spacing-9":"--ax-space-36","--ax-spacing-8":"--ax-space-32","--ax-spacing-7":"--ax-space-28","--ax-spacing-6":"--ax-space-24","--ax-spacing-5":"--ax-space-20","--ax-spacing-4":"--ax-space-16","--ax-spacing-3":"--ax-space-12","--ax-spacing-2":"--ax-space-8","--ax-spacing-1-alt":"--ax-space-6","--ax-spacing-1":"--ax-space-4","--ax-spacing-05":"--ax-space-2","--ax-spacing-0":"--ax-space-0"},C=(i,x,n,e,t,r)=>x.split(" ").map((s,d,f)=>{var l;if(i==="margin-inline"&&s==="full")return`calc((100vw - ${100/f.length}%)/-2)`;if(i==="padding-inline"&&s==="full")return`calc((100vw - ${100/f.length}%)/2)`;if(["mi","mb"].includes(i)&&s==="auto")return"auto";let b=`var(--${r}-${n}-${s})`;if(e.includes(s))b=s==="px"?"1px":s;else if(n==="spacing"&&s.startsWith("space"))b=`var(--${r}-${s})`;else if(n==="spacing"){const p=`--${r}-spacing-${s}`;b=`var(${(l=z[p])!==null&&l!==void 0?l:p})`}return t?s==="0"?"0":`calc(-1 * ${b})`:b}).join(" ");function g(i,x,n,e,t,r=!1,s=[]){if(!t)return{};if(typeof t=="string")return{[`--__${i}c-${x}-${n}-xs`]:C(n,t,e,s,r,i)};const d={};return Object.entries(t).forEach(([f,l])=>{d[`--__${i}c-${x}-${n}-${f}`]=C(n,l,e,s,r,i)}),d}const F=["className","padding","paddingInline","paddingBlock","margin","marginInline","marginBlock","width","minWidth","maxWidth","height","minHeight","maxHeight","position","inset","top","right","bottom","left","overflow","overflowX","overflowY","flexBasis","flexGrow","flexShrink","gridColumn"],G=({children:i,className:x,padding:n,paddingInline:e,paddingBlock:t,margin:r,marginInline:s,marginBlock:d,width:f,minWidth:l,maxWidth:b,height:p,minHeight:v,maxHeight:j,position:O,inset:m,top:$,right:h,left:w,bottom:o,overflow:u,overflowX:_,overflowY:R,flexBasis:y,flexGrow:S,flexShrink:T,gridColumn:I})=>{const E=N(!1),{cn:k}=W(),a=E?"ax":"a",B=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},g(a,"r","p","spacing",n)),g(a,"r","pi","spacing",e)),g(a,"r","pb","spacing",t)),g(a,"r","m","spacing",r)),g(a,"r","mi","spacing",s)),g(a,"r","mb","spacing",d)),c(a,"r","w",f)),c(a,"r","minw",l)),c(a,"r","maxw",b)),c(a,"r","h",p)),c(a,"r","minh",v)),c(a,"r","maxh",j)),c(a,"r","position",O)),g(a,"r","inset","spacing",m)),g(a,"r","top","spacing",$)),g(a,"r","right","spacing",h)),g(a,"r","bottom","spacing",o)),g(a,"r","left","spacing",w)),c(a,"r","overflow",u)),c(a,"r","overflowx",_)),c(a,"r","overflowy",R)),c(a,"r","flex-basis",y)),c(a,"r","flex-grow",S)),c(a,"r","flex-shrink",T)),c(a,"r","grid-column",I));return M.createElement(q,{className:k({className:x,"navds-r-p":n,"navds-r-pi":e,"navds-r-pb":t,"navds-r-m":r,"navds-r-mi":s,"navds-r-mb":d,"navds-r-w":f,"navds-r-minw":l,"navds-r-maxw":b,"navds-r-h":p,"navds-r-minh":v,"navds-r-maxh":j,"navds-r-position":O,"navds-r-inset":m,"navds-r-top":$,"navds-r-right":h,"navds-r-bottom":o,"navds-r-left":w,"navds-r-overflow":u,"navds-r-overflowx":_,"navds-r-overflowy":R,"navds-r-flex-basis":y,"navds-r-flex-grow":S,"navds-r-flex-shrink":T,"navds-r-grid-column":I}),style:B},i)};export{G as B,F as P,c as a,g};
