import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{A as k}from"./Attachment-DvlDMM40.js";import{g as v}from"./guid-CsArkN6i.js";import"./index-CTjT7uj6.js";import"./bemUtils-BssjAfnF.js";import"./index-D7P32T3h.js";import"./tslib.es6-BntfKcQG.js";import"./SlettKnapp-C0vA1gk3.js";import"./intlUtils-C_Owl2LD.js";import"./Loader-Bk4YieMA.js";import"./clsx-B-dksMZM.js";import"./useId-Did2T99i.js";import"./Link-D0Z4KE89.js";const l=t=>{const{attachments:y,showFileSize:c,onDelete:g}=t;return r.jsx("ul",{className:"attachmentList",children:y.map(f=>r.jsx("li",{children:r.jsx(k,{attachment:f,onDelete:g,showFileSize:c})},v()))})},o=l;l.__docgenInfo={description:"",methods:[],displayName:"AttachmentList",props:{attachments:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]"},description:""},showFileSize:{required:!1,tsType:{name:"boolean"},description:""},onDelete:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: Attachment) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"AttachmentMetadataType",required:!0}},{key:"perioder",value:{name:"Array",elements:[{name:"AttachmentMetadataTidsperiode"}],raw:"AttachmentMetadataTidsperiode[]",required:!1}},{key:"arbeidsforhold",value:{name:"any",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"url",value:{name:"string",required:!1}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"InnsendingsType",required:!1}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}},name:"file"}],return:{name:"void"}}},description:""}}};const D={title:"components/AttachmentList",component:o},p=t=>r.jsx(o,{...t}),e=p.bind({});e.args={attachments:[{id:"1",filename:"Dette er et filnavn",filesize:123,pending:!0},{id:"2",filename:"Annet filnavn",filesize:456,pending:!1}]};const n=p.bind({});n.args={attachments:[{id:"1",filename:"Dette er et filnavn",filesize:123,pending:!0},{id:"2",filename:"Annet filnavn",filesize:456,pending:!1}],showFileSize:!0};var a,i,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"args => <AttachmentList {...args} />",...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var m,u,d;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:"args => <AttachmentList {...args} />",...(d=(u=n.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const I=["Default","VedleggListeMedFilstørrelse"];export{e as Default,n as VedleggListeMedFilstørrelse,I as __namedExportsOrder,D as default};
