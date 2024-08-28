import{t as w,d as u,z as M,A as G,D as I,C as P,T as B,E as Z}from"./Uttaksdagen-CHlL4_FN.js";import{a as O,r as p}from"./index-BP8_t0zE.js";import{t as _,w as W}from"./Tidsperioden-CRlAJzBJ.js";function c(s,t,a){return a?typeof a=="string"?{[`--__ac-${s}-${t}-xs`]:a}:Object.fromEntries(Object.entries(a).map(([e,n])=>[`--__ac-${s}-${t}-${e}`,n])):{}}const U=s=>{switch(s){case"px":return"1px"}return s},V=(s,t,a,e,n)=>t.split(" ").map((r,o,i)=>{if(s==="margin-inline"&&r==="full")return`calc((100vw - ${100/i.length}%)/-2)`;if(s==="padding-inline"&&r==="full")return`calc((100vw - ${100/i.length}%)/2)`;if(["mi","mb"].includes(s)&&r==="auto")return"auto";let l=`var(--a-${a}-${r})`;return e.includes(r)&&(l=U(r)),n?r==="0"?"0":`calc(-1 * ${l})`:l}).join(" ");function d(s,t,a,e,n=!1,r=[]){if(!e)return{};if(typeof e=="string")return{[`--__ac-${s}-${t}-xs`]:V(t,e,a,r,n)};const o={};return Object.entries(e).forEach(([i,l])=>{o[`--__ac-${s}-${t}-${i}`]=V(t,l,a,r,n)}),o}const q=["className","padding","paddingInline","paddingBlock","margin","marginInline","marginBlock","width","minWidth","maxWidth","height","minHeight","maxHeight","position","inset","top","right","bottom","left","overflow","overflowX","overflowY","flexBasis","flexGrow","flexShrink","gridColumn"],z=({children:s,className:t,padding:a,paddingInline:e,paddingBlock:n,margin:r,marginInline:o,marginBlock:i,width:l,minWidth:f,maxWidth:g,height:m,minHeight:b,maxHeight:v,position:j,inset:y,top:x,right:S,left:E,bottom:k,overflow:$,overflowX:R,overflowY:D,flexBasis:C,flexGrow:A,flexShrink:T,gridColumn:N})=>{const L=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},d("r","p","spacing",a)),d("r","pi","spacing",e)),d("r","pb","spacing",n)),d("r","m","spacing",r)),d("r","mi","spacing",o)),d("r","mb","spacing",i)),c("r","w",l)),c("r","minw",f)),c("r","maxw",g)),c("r","h",m)),c("r","minh",b)),c("r","maxh",v)),c("r","position",j)),d("r","inset","spacing",y)),d("r","top","spacing",x)),d("r","right","spacing",S)),d("r","bottom","spacing",k)),d("r","left","spacing",E)),c("r","overflow",$)),c("r","overflowx",R)),c("r","overflowy",D)),c("r","flex-basis",C)),c("r","flex-grow",A)),c("r","flex-shrink",T)),c("r","grid-column",N));return O.createElement(_,{className:w({className:t,"navds-r-p":a,"navds-r-pi":e,"navds-r-pb":n,"navds-r-m":r,"navds-r-mi":o,"navds-r-mb":i,"navds-r-w":l,"navds-r-minw":f,"navds-r-maxw":g,"navds-r-h":m,"navds-r-minh":b,"navds-r-maxh":v,"navds-r-position":j,"navds-r-inset":y,"navds-r-top":x,"navds-r-right":S,"navds-r-bottom":k,"navds-r-left":E,"navds-r-overflow":$,"navds-r-overflowx":R,"navds-r-overflowy":D,"navds-r-flex-basis":C,"navds-r-flex-grow":A,"navds-r-flex-shrink":T,"navds-r-grid-column":N}),style:L},s)};var X=function(s,t){var a={};for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&t.indexOf(e)<0&&(a[e]=s[e]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(s);n<e.length;n++)t.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(s,e[n])&&(a[e[n]]=s[e[n]]);return a};const es=p.forwardRef((s,t)=>{var{children:a,className:e,as:n="div",background:r,borderColor:o,borderWidth:i,borderRadius:l,shadow:f,style:g,asChild:m}=s,b=X(s,["children","className","as","background","borderColor","borderWidth","borderRadius","shadow","style","asChild"]);const v=Object.assign(Object.assign(Object.assign({},g),{"--__ac-box-background":r?`var(--a-${r})`:void 0,"--__ac-box-shadow":f?`var(--a-shadow-${f})`:void 0,"--__ac-box-border-color":o?`var(--a-${o})`:void 0,"--__ac-box-border-width":i?i.split(" ").map(y=>`${y}px`).join(" "):void 0}),d("box","border-radius","border-radius",l,!1,["0"])),j=m?_:n;return O.createElement(z,Object.assign({},b),O.createElement(j,Object.assign({},W(b,q),{ref:t,style:v,className:w("navds-box",e,{"navds-box-bg":r,"navds-box-border-color":o,"navds-box-border-width":i,"navds-box-border-radius":l,"navds-box-shadow":f})}),a))});var Y=function(s,t){var a={};for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&t.indexOf(e)<0&&(a[e]=s[e]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(s);n<e.length;n++)t.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(s,e[n])&&(a[e[n]]=s[e[n]]);return a};const H=p.forwardRef((s,t)=>{var{children:a,className:e,as:n="div",align:r,justify:o,wrap:i=!0,gap:l,style:f,direction:g="row",asChild:m}=s,b=Y(s,["children","className","as","align","justify","wrap","gap","style","direction","asChild"]);const v=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},f),d("stack","gap","spacing",l)),c("stack","direction",g)),c("stack","align",r)),c("stack","justify",o)),j=m?_:n;return O.createElement(z,Object.assign({},b),O.createElement(j,Object.assign({},W(b,q),{ref:t,style:v,className:w("navds-stack",e,{"navds-vstack":g==="column","navds-hstack":g==="row","navds-stack-gap":l,"navds-stack-align":r,"navds-stack-justify":o,"navds-stack-direction":g,"navds-stack-wrap":i})}),a))}),F=p.forwardRef((s,t)=>O.createElement(H,Object.assign({},s,{ref:t,direction:"row"}))),ns=F,rs=p.forwardRef((s,t)=>O.createElement(H,Object.assign({},s,{ref:t,direction:"column",wrap:!1}))),is=s=>{if(s==null)throw Error("Data er ikke oppgitt");return s},cs=s=>/\s/.test(s),J=/^[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*$/,K=/[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*/g,h=s=>s==null||s.toString().trim().length===0,os=s=>t=>h(t)?s:null,us=(s,t)=>a=>a===t?s:null,ls=(s,t)=>a=>h(a)||a.toString().trim().length>=t?null:s,ds=(s,t)=>a=>h(a)||a.toString().trim().length<=t?null:s,Q=s=>{const t=s.replace(K,""),a=new Set(t.split(""));return Array.from(a).join("")},fs=s=>t=>J.test(t)?null:s(Q(t));u.extend(M);u().add(18,"week").add(3,"day").startOf("day").toDate();u().startOf("day").subtract(21,"days");u().add(1,"year").startOf("day").toDate();const gs=s=>t=>h(t)||G.test(t)?null:s,bs=s=>t=>u(t).isAfter(I)?s:null,Os=s=>t=>u(t).isBefore(I)?null:s,ms=(s,t)=>a=>t&&u(a).isAfter(t,"day")?s:null,vs=(s,t)=>a=>t&&u(a).isBefore(t,"day")?s:null,js=(s,t)=>a=>!t||u(a).isAfter(t,"day")?null:s,ys=(s,t)=>a=>t&&a&&u(t).isSame(a,"day")?s:null,ps=(s,t,a)=>e=>P(u(e).toDate(),t,a)?null:s,hs=(s,t,a)=>e=>{const n=a.filter(i=>i.fom).map(i=>({from:u(i.fom).toDate(),to:i.tom?u(i.tom).toDate():B})),r=t.isStartDate?e:t.date,o=n.concat({from:u(t.isStartDate?t.date:e).toDate(),to:r?u(r).toDate():B});return Z(o)?s:null};export{es as B,ns as H,q as P,rs as V,gs as a,bs as b,h as c,ms as d,us as e,cs as f,js as g,vs as h,os as i,ds as j,ls as k,fs as l,ys as m,is as n,ps as o,hs as p,Os as q,d as r,c as s,z as t};
