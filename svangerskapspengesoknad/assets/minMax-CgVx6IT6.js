import{f as n,w as m,_ as h,D,h as S,$ as f,a0 as E,a1 as A}from"./VeiviserPage-CWmrDm9h.js";import{c as y,g as R}from"./index-CTjT7uj6.js";const O=t=>t.charAt(0).toUpperCase()+t.slice(1),v=["og","and","i","in"],x=["as"],W=t=>{if(t)return t.toLowerCase().split(" ").map(e=>x.includes(e)?e.toUpperCase():v.includes(e)?e:O(e)).join(" ")},C=/[\p{Cf}\p{Zs}]/gu,k=t=>t===""?null:t.replace(C," "),w="nearing";var N=(t=>(t.FISKER="FISKE",t.JORDBRUK="JORDBRUK_SKOGBRUK",t.DAGMAMMA="DAGMAMMA",t.ANNET="ANNEN",t))(N||{});const U=t=>{if(t==null)throw Error("Data er ikke oppgitt");return t},j=t=>/\s/.test(t),B=/^[\p{N}\p{L}\p{Z}\p{Cf}\p{P}\p{Sc}\p{Sk}\n\r+]*$/u,M=/[\p{N}\p{L}\p{Z}\p{Cf}\p{P}\p{Sc}\p{Sk}\n\r+]*/gu,g=t=>t==null||t.toString().trim().length===0,I=t=>e=>g(e)?t:null,K=(t,e)=>s=>s===e?t:null,F=(t,e)=>s=>g(s)||s.toString().trim().length>=e?null:t,P=(t,e)=>s=>g(s)||s.toString().trim().length<=e?null:t,_=t=>{const e=t.replace(M,""),s=new Set(e.split(""));return Array.from(s).join("")},b=t=>e=>B.test(e)?null:t(_(e));n.extend(m);n().add(18,"week").add(3,"day").startOf("day").toDate();n().startOf("day").subtract(21,"days");n().add(1,"year").startOf("day").toDate();const $=t=>e=>g(e)||h.test(e)?null:t,q=t=>e=>n(e).isAfter(D)?t:null,V=(t,e)=>s=>e&&n(s).isAfter(e,"day")?t:null,Z=(t,e)=>s=>e&&n(s).isBefore(e,"day")?null:t,z=(t,e)=>s=>e&&n(s).isBefore(e,"day")?t:null,J=(t,e)=>s=>!e||n(s).isAfter(e,"day")?null:t,Y=(t,e)=>s=>e&&s&&n(e).isSame(s,"day")?t:null,H=t=>e=>n(e).isBefore(S(new Date),"day")?t:null,X=(t,e,s)=>r=>A(n(r).toDate(),e,s)?null:t,Q=(t,e,s)=>r=>{const c=s.filter(a=>a.fom).map(a=>({from:n(a.fom).toDate(),to:a.tom?n(a.tom).toDate():f})),i=e.isStartDate?r:e.date,o=c.concat({from:n(e.isStartDate?e.date:r).toDate(),to:i?n(i).toDate():f});return E(o)?t:null};var p={exports:{}};(function(t,e){(function(s,r){t.exports=r()})(y,function(){return function(s,r,c){var i=function(o,a){if(!a||!a.length||a.length===1&&!a[0]||a.length===1&&Array.isArray(a[0])&&!a[0].length)return null;var u;a.length===1&&a[0].length>0&&(a=a[0]),u=(a=a.filter(function(d){return d}))[0];for(var l=1;l<a.length;l+=1)a[l].isValid()&&!a[l][o](u)||(u=a[l]);return u};c.max=function(){var o=[].slice.call(arguments,0);return i("isAfter",o)},c.min=function(){var o=[].slice.call(arguments,0);return i("isBefore",o)}}})})(p);var L=p.exports;const tt=R(L);export{w as E,N,$ as a,q as b,H as c,Z as d,z as e,b as f,J as g,P as h,I as i,V as j,Q as k,W as l,tt as m,U as n,Y as o,X as p,g as q,K as r,j as s,F as t,k as u};
