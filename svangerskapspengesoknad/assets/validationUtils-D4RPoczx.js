import{f as e}from"./VeiviserPage-C75wD2__.js";import{m as o}from"./minMax-DetDAlbJ.js";e.extend(o);const m=10,u=1e3,r=s=>s!==""&&s!==void 0&&s!==null,l=(s,t)=>{let a=t;if(s&&r(s)){const n=e.max([e(t),e(s)]);a=n?n.toDate():t}return a},d=(s,t)=>e().isBefore(e(s),"d")?t.formatMessage({id:"slutter"}):t.formatMessage({id:"sluttet"});export{u as T,m as a,d as b,l as g,r as h};
