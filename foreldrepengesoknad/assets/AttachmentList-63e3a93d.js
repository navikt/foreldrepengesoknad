import{j as t}from"./jsx-runtime-1caa8f64.js";import{g as o}from"./Tidsperioden-806f28f3.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{A as m}from"./Attachment-246eb443.js";const e=a=>{const{attachments:i,showFileSize:n,onDelete:r}=a;return t.jsx("ul",{className:"attachmentList",children:i.map(s=>t.jsx("li",{children:t.jsx(m,{attachment:s,onDelete:r,showFileSize:n})},o()))})},A=e;try{e.displayName="AttachmentList",e.__docgenInfo={description:"",displayName:"AttachmentList",props:{attachments:{defaultValue:null,description:"",name:"attachments",required:!0,type:{name:"Attachment[]"}},showFileSize:{defaultValue:null,description:"",name:"showFileSize",required:!1,type:{name:"boolean"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!1,type:{name:"((file: Attachment) => void)"}}}}}catch{}export{A};
