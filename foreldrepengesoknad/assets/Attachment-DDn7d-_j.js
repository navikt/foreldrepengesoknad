import{j as e}from"./jsx-runtime-_e34SzbC.js";import{c as u}from"./index--IHLcpuH.js";import{u as d,L as m,V as o,n as p,i as y,k}from"./Tidsperioden-C-i4iOOf.js";import"./index-DVXBtNgz.js";import{b as g}from"./globalUtil-D7z5n6tA.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{L as f}from"./Link-SOWRV7cb.js";const i=({attachment:n,showFileSize:s,onDelete:a})=>{const t=d(),r=k("attachment"),l=u(r.block,{[r.modifier("pending")]:n.pending});return e.jsxs("div",{className:l,children:[n.pending&&e.jsx("div",{className:r.element("spinner"),children:e.jsx(m,{size:"small"})}),e.jsx(o,{className:r.element("icon"),width:20,height:20}),e.jsxs("div",{className:r.element("filename"),children:[n.url?e.jsx(f,{href:n.url,target:"_blank",children:n.filename}):e.jsx("span",{children:n.filename}),s&&e.jsx("div",{children:g(n.filesize)})]}),a&&e.jsx("span",{className:r.element("deleteButton"),children:e.jsx(p,{onClick:()=>a(n),ariaLabel:y(t,"vedlegg.arialabel.slett",{navn:n.filename})})})]})},x=i;i.__docgenInfo={description:"",methods:[],displayName:"Attachment",props:{attachment:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"Tidsperiode"}],raw:"Tidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}},name:"file"}],return:{name:"void"}}},description:""}}};export{x as A};
