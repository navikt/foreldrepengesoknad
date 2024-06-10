import{j as a}from"./jsx-runtime-_e34SzbC.js";import{c as v,b as h}from"./bemUtils-Wzdz5W7M.js";import{u as q}from"./index-CleeAgRW.js";import{S as x}from"./SlettKnapp-BcWldGC_.js";import{g as j}from"./index-DVXBtNgz.js";import{i as T}from"./intlUtils-C_Owl2LD.js";import{L as A}from"./Loader-B8w5ToFj.js";import{L as w}from"./Link-CceVKQrV.js";const p=e=>a.jsx("svg",{focusable:"false",role:"img","aria-hidden":"true",width:20,height:20,...e,children:a.jsx("path",{d:"M3.398 19.372c-.43 0-.843-.088-1.24-.264a3.57 3.57 0 0 1-1.084-.752C.358 17.64 0 16.771 0 15.75c0-1.022.358-1.891 1.074-2.607l11.23-11.915c.43-.442.915-.764 1.456-.966a4.034 4.034 0 0 1 1.66-.254c.566.032 1.13.182 1.69.449a5.93 5.93 0 0 1 1.581 1.123c.43.443.765.967 1.006 1.572.241.606.355 1.24.342 1.905a5.185 5.185 0 0 1-.39 1.894 4.908 4.908 0 0 1-1.016 1.563l-8.496 9.023a.614.614 0 0 1-.879.04.631.631 0 0 1-.186-.44.627.627 0 0 1 .166-.46l8.496-9.023a3.66 3.66 0 0 0 .762-1.191c.182-.456.28-.931.293-1.426 0-.495-.085-.967-.254-1.416-.17-.45-.417-.83-.742-1.143a4.283 4.283 0 0 0-2.207-1.2c-.872-.19-1.667.08-2.383.81L1.973 14a2.37 2.37 0 0 0-.723 1.738c0 .677.24 1.257.723 1.738.221.222.462.388.722.499.26.11.534.153.82.126.274-.013.55-.087.83-.224.28-.137.538-.329.772-.576l8.926-9.492c.17-.17.348-.427.537-.772.189-.345.114-.68-.225-1.006-.182-.195-.338-.303-.468-.322-.13-.02-.215-.03-.254-.03a1.005 1.005 0 0 0-.39.147 2.738 2.738 0 0 0-.45.342l-6.719 7.148a.556.556 0 0 1-.43.196.652.652 0 0 1-.449-.176.556.556 0 0 1-.195-.43c0-.17.059-.319.176-.449l6.719-7.168c.273-.26.543-.462.81-.605.267-.144.537-.228.81-.254.222-.013.482.02.782.097.3.078.612.28.937.606.495.482.713 1.048.655 1.699-.059.651-.375 1.263-.948 1.836L6.016 18.18a4.242 4.242 0 0 1-1.153.83 3.39 3.39 0 0 1-1.289.341.453.453 0 0 0-.088.01.453.453 0 0 1-.088.01z",fill:"#0067C5",fillRule:"evenodd"})});p.__docgenInfo={description:"",methods:[],displayName:"VedleggIkon"};var d={exports:{}};/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */d.exports=B;d.exports.format=f;d.exports.parse=y;var S=/\B(?=(\d{3})+(?!\d))/g,N=/(?:\.0*|(\.[^0]+)0+)$/,l={b:1,kb:1024,mb:1<<20,gb:1<<30,tb:Math.pow(1024,4),pb:Math.pow(1024,5)},M=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;function B(e,r){return typeof e=="string"?y(e):typeof e=="number"?f(e,r):null}function f(e,r){if(!Number.isFinite(e))return null;var n=Math.abs(e),t=r&&r.thousandsSeparator||"",s=r&&r.unitSeparator||"",m=r&&r.decimalPlaces!==void 0?r.decimalPlaces:2,g=!!(r&&r.fixedDecimals),i=r&&r.unit||"";(!i||!l[i.toLowerCase()])&&(n>=l.pb?i="PB":n>=l.tb?i="TB":n>=l.gb?i="GB":n>=l.mb?i="MB":n>=l.kb?i="KB":i="B");var b=e/l[i.toLowerCase()],u=b.toFixed(m);return g||(u=u.replace(N,"$1")),t&&(u=u.split(".").map(function(o,k){return k===0?o.replace(S,t):o}).join(".")),u+s+i}function y(e){if(typeof e=="number"&&!isNaN(e))return e;if(typeof e!="string")return null;var r=M.exec(e),n,t="b";return r?(n=parseFloat(r[1]),t=r[4].toLowerCase()):(n=parseInt(e,10),t="b"),isNaN(n)?null:Math.floor(l[t]*n)}var I=d.exports;const L=j(I),F=e=>L(e,{unitSeparator:" ",thousandsSeparator:" ",decimalPlaces:1,fixedDecimals:!1}),V=(e,r)=>e.filter(n=>n!==r),c=({attachment:e,showFileSize:r,onDelete:n})=>{const t=q(),s=h("attachment"),m=v(s.block,{[s.modifier("pending")]:e.pending});return a.jsxs("div",{className:m,children:[e.pending&&a.jsx("div",{className:s.element("spinner"),children:a.jsx(A,{size:"small"})}),a.jsx(p,{className:s.element("icon"),width:20,height:20}),a.jsxs("div",{className:s.element("filename"),children:[e.url?a.jsx(w,{href:e.url,target:"_blank",children:e.filename}):a.jsx("span",{children:e.filename}),r&&a.jsx("div",{children:F(e.filesize)})]}),n&&a.jsx("span",{className:s.element("deleteButton"),children:a.jsx(x,{onClick:()=>n(e),ariaLabel:T(t,"vedlegg.arialabel.slett",{navn:e.filename})})})]})},K=c;c.__docgenInfo={description:"",methods:[],displayName:"Attachment",props:{attachment:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"Tidsperiode"}],raw:"Tidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}},name:"file"}],return:{name:"void"}}},description:""}}};export{K as A,V as d};
