import{j as s}from"./jsx-runtime-DoxjgJx5.js";import{u as _,k as V,b as d,l as k,i as f}from"./Tidsperioden-BXZJ7Xx1.js";import{r as L}from"./index-Cu9bd8lq.js";import"./index-C-6Uy6j4.js";import{d as B}from"./globalUtil-C9WE76GY.js";import{i as R,m as T}from"./attachmentType-bBGQaA6h.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{S as w}from"./Step-DsnOrs4A.js";import{E as D}from"./Environment-O62Hvuhd.js";import{g as N}from"./apiInterceptor-D_vgNGab.js";import{A as U}from"./AttachmentList-WdtErbjc.js";import{B as b}from"./Link-BqZ6CohM.js";function C(e){const t={withCredentials:!0,timeout:45e3,headers:{"content-type":"multipart/form-data"}},i=new FormData;i.append("id",e.id),i.append("vedlegg",e.file,e.filename);const r=`${D.REST_API_URL}/storage/foreldrepenger/vedlegg`;return N().post(r,i,t)}const z={saveAttachment:C},h=[".pdf",".jpeg",".jpg",".png"],x=16,G=x*1024*1024,M=(e,t,i)=>e.map(r=>{const n=T(r,t,i);return n.pending=!0,n}),X=e=>{const t=e.split(".").pop();return h.includes(`.${t.toLowerCase()}`)},$=e=>e<=G,O=(e,t,i)=>e.filter(r=>{const n=X(r.filename);n||t(o=>o.concat(f(i,"vedlegg.feilmelding.ugyldig.type",{filename:r.filename})));const a=$(r.filesize);return a||t(o=>o.concat(f(i,"vedlegg.feilmelding.ugyldig.størrelse",{filename:r.filename,maxStørrelse:x}))),n&&a}),P=(e,t,i,r,n,a)=>{e.forEach(async(o,c)=>{try{const m=await z.saveAttachment(o);o.pending=!1,o.url=m.headers.location,o.uploaded=!0,o.uuid=m.data,t(n+c,o)}catch{i(n+c),r(p=>p.concat(f(a,"vedlegg.feilmelding.opplasting.feilet",{filename:o.filename})))}})},S=({attachments:e,name:t,onFileInputClick:i,attachmentType:r,skjemanummer:n,label:a,legend:o,...c})=>{const m=_(),{setFieldValue:p}=V(),[u,g]=L.useState([]);return s.jsxs(s.Fragment,{children:[s.jsx(d,{padBottom:"xl",children:s.jsx(k,{legend:o,buttonLabel:a,name:t,accept:h.join(", "),onFilesSelect:(l,{push:y,replace:E,remove:j})=>{const A=M(l,r,n),F=O(A,g,m);F.forEach(I=>y(I)),P(F,E,j,g,e.length,m)},onClick:i,error:u.length>0?u.map(l=>s.jsx(b,{children:l},l)):void 0,...c})}),s.jsx(d,{padBottom:"xl",visible:e.length>0,children:s.jsx(U,{attachments:e.filter(l=>!R(l)),showFileSize:!0,onDelete:l=>{p(t,B(e,l))}})}),s.jsx(d,{padBottom:"l",children:s.jsx(w,{})})]})},re=S;S.__docgenInfo={description:"",methods:[],displayName:"FormikFileUploader"};export{re as F};
