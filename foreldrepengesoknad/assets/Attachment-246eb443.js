import{j as s}from"./jsx-runtime-1caa8f64.js";import{c as o}from"./index-753920cd.js";import{u as m,L as c,V as d,l as p,m as u,i as f,k as h}from"./Tidsperioden-806f28f3.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{L as x}from"./Link-d47e444a.js";const l=({attachment:e,showFileSize:t,onDelete:i})=>{const a=m(),n=h("attachment"),r=o(n.block,{[n.modifier("pending")]:e.pending});return s.jsxs("div",{className:r,children:[e.pending&&s.jsx("div",{className:n.element("spinner"),children:s.jsx(c,{size:"small"})}),s.jsx(d,{className:n.element("icon"),width:20,height:20}),s.jsxs("div",{className:n.element("filename"),children:[e.url?s.jsx(x,{href:e.url,target:"_blank",children:e.filename}):s.jsx("span",{children:e.filename}),t&&s.jsx("div",{children:p(e.filesize)})]}),i&&s.jsx("span",{className:n.element("deleteButton"),children:s.jsx(u,{onClick:()=>i(e),ariaLabel:f(a,"vedlegg.arialabel.slett",{navn:e.filename})})})]})},N=l;try{l.displayName="Attachment",l.__docgenInfo={description:"",displayName:"Attachment",props:{attachment:{defaultValue:null,description:"",name:"attachment",required:!0,type:{name:"Attachment"}},showFileSize:{defaultValue:null,description:"",name:"showFileSize",required:!1,type:{name:"boolean"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!1,type:{name:"((file: Attachment) => void)"}}}}}catch{}export{N as A};
