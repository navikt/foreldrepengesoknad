import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{L as m}from"./index-BD0lb3_z.js";import{g as d,e as p}from"./Uttaksdagen-Bkz5oXqd.js";import"./dates-DUtd6zgH.js";import{r as i}from"./index-CTjT7uj6.js";import{O as c}from"./routes-Run26EI7.js";import{L as s}from"./LinkPanel-BH3zccDo.js";import{u as f}from"./useId-BHtrcvnP.js";var v=function(r,n){var e={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&n.indexOf(t)<0&&(e[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(r);l<t.length;l++)n.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(r,t[l])&&(e[t[l]]=r[t[l]]);return e};const h=i.forwardRef((r,n)=>{var{title:e,titleId:t}=r,l=v(r,["title","titleId"]);let a=f();return a=e?t||"title-"+a:void 0,i.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:n,"aria-labelledby":a},l),e?i.createElement("title",{id:a},e):null,i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0 4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H7l-7 5V4Zm21.994-.15A2 2 0 0 0 20 2l-16.15.005A2 2 0 0 0 2 4v16l4-3h14c1.035-.076 2-.946 2-2l-.006-11.15ZM10.5 13.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM11 4h2v6h-2V4Z",fill:"currentColor"}))}),u=({tittel:r,minidialogInnslag:n})=>{const e=p("oppgave-lenkepanel");return o.jsx(s,{as:m,to:`${c.OPPGAVER}/${n.dialogId}`,border:!1,className:e.element("linkPanel"),children:o.jsxs("div",{className:e.element("content"),children:[o.jsx(h,{className:e.element("icon"),"aria-hidden":!0}),o.jsxs("div",{children:[o.jsx(s.Title,{as:"h3",className:e.element("title"),children:r}),o.jsx(s.Description,{children:o.jsx("div",{className:e.block,children:d(n.opprettet)})})]})]})})};u.__docgenInfo={description:"",methods:[],displayName:"OppgaveLenkepanel"};export{u as O};
