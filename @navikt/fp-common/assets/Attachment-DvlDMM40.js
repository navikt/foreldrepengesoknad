import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{c as v,b as h}from"./bemUtils-BssjAfnF.js";import{u as q}from"./index-D7P32T3h.js";import{S as x}from"./SlettKnapp-C0vA1gk3.js";import{g as j}from"./index-CTjT7uj6.js";import{i as T}from"./intlUtils-C_Owl2LD.js";import{L as A}from"./Loader-Bk4YieMA.js";import{L as M}from"./Link-D0Z4KE89.js";const p=e=>n.jsx("svg",{focusable:"false",role:"img","aria-hidden":"true",width:20,height:20,...e,children:n.jsx("path",{d:"M3.398 19.372c-.43 0-.843-.088-1.24-.264a3.57 3.57 0 0 1-1.084-.752C.358 17.64 0 16.771 0 15.75c0-1.022.358-1.891 1.074-2.607l11.23-11.915c.43-.442.915-.764 1.456-.966a4.034 4.034 0 0 1 1.66-.254c.566.032 1.13.182 1.69.449a5.93 5.93 0 0 1 1.581 1.123c.43.443.765.967 1.006 1.572.241.606.355 1.24.342 1.905a5.185 5.185 0 0 1-.39 1.894 4.908 4.908 0 0 1-1.016 1.563l-8.496 9.023a.614.614 0 0 1-.879.04.631.631 0 0 1-.186-.44.627.627 0 0 1 .166-.46l8.496-9.023a3.66 3.66 0 0 0 .762-1.191c.182-.456.28-.931.293-1.426 0-.495-.085-.967-.254-1.416-.17-.45-.417-.83-.742-1.143a4.283 4.283 0 0 0-2.207-1.2c-.872-.19-1.667.08-2.383.81L1.973 14a2.37 2.37 0 0 0-.723 1.738c0 .677.24 1.257.723 1.738.221.222.462.388.722.499.26.11.534.153.82.126.274-.013.55-.087.83-.224.28-.137.538-.329.772-.576l8.926-9.492c.17-.17.348-.427.537-.772.189-.345.114-.68-.225-1.006-.182-.195-.338-.303-.468-.322-.13-.02-.215-.03-.254-.03a1.005 1.005 0 0 0-.39.147 2.738 2.738 0 0 0-.45.342l-6.719 7.148a.556.556 0 0 1-.43.196.652.652 0 0 1-.449-.176.556.556 0 0 1-.195-.43c0-.17.059-.319.176-.449l6.719-7.168c.273-.26.543-.462.81-.605.267-.144.537-.228.81-.254.222-.013.482.02.782.097.3.078.612.28.937.606.495.482.713 1.048.655 1.699-.059.651-.375 1.263-.948 1.836L6.016 18.18a4.242 4.242 0 0 1-1.153.83 3.39 3.39 0 0 1-1.289.341.453.453 0 0 0-.088.01.453.453 0 0 1-.088.01z",fill:"#0067C5",fillRule:"evenodd"})});p.__docgenInfo={description:"",methods:[],displayName:"VedleggIkon"};var d={exports:{}};/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */d.exports=B;d.exports.format=f;d.exports.parse=y;var w=/\B(?=(\d{3})+(?!\d))/g,S=/(?:\.0*|(\.[^0]+)0+)$/,l={b:1,kb:1024,mb:1<<20,gb:1<<30,tb:Math.pow(1024,4),pb:Math.pow(1024,5)},N=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;function B(e,r){return typeof e=="string"?y(e):typeof e=="number"?f(e,r):null}function f(e,r){if(!Number.isFinite(e))return null;var a=Math.abs(e),i=r&&r.thousandsSeparator||"",s=r&&r.unitSeparator||"",m=r&&r.decimalPlaces!==void 0?r.decimalPlaces:2,g=!!(r&&r.fixedDecimals),t=r&&r.unit||"";(!t||!l[t.toLowerCase()])&&(a>=l.pb?t="PB":a>=l.tb?t="TB":a>=l.gb?t="GB":a>=l.mb?t="MB":a>=l.kb?t="KB":t="B");var b=e/l[t.toLowerCase()],u=b.toFixed(m);return g||(u=u.replace(S,"$1")),i&&(u=u.split(".").map(function(o,k){return k===0?o.replace(w,i):o}).join(".")),u+s+t}function y(e){if(typeof e=="number"&&!isNaN(e))return e;if(typeof e!="string")return null;var r=N.exec(e),a,i="b";return r?(a=parseFloat(r[1]),i=r[4].toLowerCase()):(a=parseInt(e,10),i="b"),isNaN(a)?null:Math.floor(l[i]*a)}var I=d.exports;const L=j(I),F=e=>L(e,{unitSeparator:" ",thousandsSeparator:" ",decimalPlaces:1,fixedDecimals:!1}),c=({attachment:e,showFileSize:r,onDelete:a})=>{const i=q(),s=h("attachment"),m=v(s.block,{[s.modifier("pending")]:e.pending});return n.jsxs("div",{className:m,children:[e.pending&&n.jsx("div",{className:s.element("spinner"),children:n.jsx(A,{size:"small"})}),n.jsx(p,{className:s.element("icon"),width:20,height:20}),n.jsxs("div",{className:s.element("filename"),children:[e.url?n.jsx(M,{href:e.url,target:"_blank",children:e.filename}):n.jsx("span",{children:e.filename}),r&&n.jsx("div",{children:F(e.filesize)})]}),a&&n.jsx("span",{className:s.element("deleteButton"),children:n.jsx(x,{onClick:()=>a(e),ariaLabel:T(i,"vedlegg.arialabel.slett",{navn:e.filename})})})]})},V=c;c.__docgenInfo={description:"",methods:[],displayName:"Attachment",props:{attachment:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}},description:""},showFileSize:{required:!1,tsType:{name:"boolean"},description:""},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: AttachmentType) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
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
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}},name:"file"}],return:{name:"void"}}},description:""}}};export{V as A};
