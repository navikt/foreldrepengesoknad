import{d as a,i as n,I as o,D as i,S as l}from"./UttaksdagenString-CIHKv-n2.js";import"./index-CTjT7uj6.js";const r=s=>s==null||s.toString().trim().length===0,u=s=>e=>r(e)?s:null;a.extend(n);const d=a().add(18,"week").add(3,"day").startOf("day").toDate(),A=a().startOf("day").subtract(21,"days");a().add(1,"year").startOf("day").toDate();const O=s=>e=>r(e)||o.test(e)?null:s,y=s=>e=>a(e).isAfter(i)?s:null,E=(s,e)=>t=>e&&a(t).isAfter(e,"day")?s:null,S=s=>e=>a(e).isBefore(l)?s:null,T=(s,e)=>t=>e&&a(t).isBefore(e,"day")?s:null,_=s=>e=>a(e).isBefore(A)?s:null,D=s=>e=>a(e).isAfter(d)?s:null;export{r as a,O as b,S as c,T as d,E as e,y as f,D as g,_ as h,u as i};
