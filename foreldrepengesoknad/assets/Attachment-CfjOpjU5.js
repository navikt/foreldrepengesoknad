import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{c as l}from"./index-CCQ3W5xA.js";import{u as d}from"./index-DSgjoNiG.js";import{L as m,V as o,S as p}from"./Tidsperioden-Dtf7_zpz.js";import"./index-CTjT7uj6.js";import{b as y}from"./globalUtil-BOzJJo7V.js";import"./Uttaksdagen-CXktmUXL.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import{b as g}from"./bemUtils-DmNyTjfb.js";import{L as k}from"./Link-D0RLsnK2.js";const i=({attachment:n,showFileSize:t,onDelete:a})=>{const s=d(),r=g("attachment"),u=l(r.block,{[r.modifier("pending")]:n.pending});return e.jsxs("div",{className:u,children:[n.pending&&e.jsx("div",{className:r.element("spinner"),children:e.jsx(m,{size:"small"})}),e.jsx(o,{className:r.element("icon"),width:20,height:20}),e.jsxs("div",{className:r.element("filename"),children:[n.url?e.jsx(k,{href:n.url,target:"_blank",children:n.filename}):e.jsx("span",{children:n.filename}),t&&e.jsx("div",{children:y(n.filesize)})]}),a&&e.jsx("span",{className:r.element("deleteButton"),children:e.jsx(p,{onClick:()=>a(n),ariaLabel:s.formatMessage({id:"vedlegg.arialabel.slett"},{navn:n.filename})})})]})},S=i;i.__docgenInfo={description:"",methods:[],displayName:"Attachment",props:{attachment:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: Tidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"Tidsperiode"}],raw:"Tidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}},description:""},showFileSize:{required:!1,tsType:{name:"boolean"},description:""},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: AttachmentType) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: AttachmentMetadataType;
    perioder?: Tidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"Tidsperiode"}],raw:"Tidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}},name:"file"}],return:{name:"void"}}},description:""}}};export{S as A};
