import{j as s}from"./jsx-runtime-d079401a.js";import{c as o}from"./index-2d278ef6.js";import{u as m,o as c,V as d,p,q as u,i as f,h}from"./Tidsperioden-d39f673c.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{L as x}from"./Link-13f307fd.js";const i=({attachment:e,showFileSize:t,onDelete:l})=>{const a=m(),n=h("attachment"),r=o(n.block,{[n.modifier("pending")]:e.pending});return s.jsxs("div",{className:r,children:[e.pending&&s.jsx("div",{className:n.element("spinner"),children:s.jsx(c,{size:"small"})}),s.jsx(d,{className:n.element("icon"),width:20,height:20}),s.jsxs("div",{className:n.element("filename"),children:[e.url?s.jsx(x,{href:e.url,target:"_blank",children:e.filename}):s.jsx("span",{children:e.filename}),t&&s.jsx("div",{children:p(e.filesize)})]}),l&&s.jsx("span",{className:n.element("deleteButton"),children:s.jsx(u,{onClick:()=>l(e),ariaLabel:f(a,"vedlegg.arialabel.slett",{navn:e.filename})})})]})},N=i;try{i.displayName="Attachment",i.__docgenInfo={description:"",displayName:"Attachment",props:{attachment:{defaultValue:null,description:"",name:"attachment",required:!0,type:{name:"Attachment"}},showFileSize:{defaultValue:null,description:"",name:"showFileSize",required:!1,type:{name:"boolean"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!1,type:{name:"((file: Attachment) => void)"}}}}}catch{}export{N as A};
