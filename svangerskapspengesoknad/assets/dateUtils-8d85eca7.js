import{d as e,b as d,c as o}from"./fridagerUtils-57eeeb7b.js";e.extend(d);e.extend(o);const F=t=>e(t).startOf("day").add(9,"months").toDate(),m=t=>e(t).startOf("day").subtract(1,"year").add(1,"day").toDate(),u=t=>e(t).startOf("day").subtract(1,"month").toDate(),D=t=>e(t).startOf("day").subtract(10,"month").toDate(),g=t=>e(t).startOf("day").subtract(1,"year").subtract(6,"months").toDate(),y=e().subtract(4,"year").startOf("day").toDate(),c=t=>e(t).startOf("day").subtract(3,"weeks").toDate(),O=()=>e().startOf("day").subtract(5,"month").toDate(),s=t=>e(t).startOf("day").toDate(),n=t=>e(c(new Date(t))).subtract(1,"d"),i=t=>{if(t.erBarnetFødt&&t.fødselsdato){const a=n(t.termindato),r=s(new Date(t.fødselsdato));return e(a).isSameOrBefore(r)}return!0},S=t=>{const a=n(t.termindato);return i(t)||!t.fødselsdato?a.toDate():s(new Date(t.fødselsdato))},l=(t,a)=>e().isBetween(e(t),e(a),"d")?e().toDate():a;export{y as a,i as b,l as c,s as d,u as e,m as f,S as g,g as h,O as i,F as n,D as t};
