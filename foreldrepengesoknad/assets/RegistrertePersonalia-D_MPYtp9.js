import{j as e}from"./jsx-runtime-_e34SzbC.js";import{k as l}from"./Tidsperioden-C-i4iOOf.js";import"./index--IHLcpuH.js";import"./index-DVXBtNgz.js";import{C as m}from"./index-L4B05WfX.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{B as u,H as g,V as p}from"./infobox.module-B8LgfpMa.js";import{b as v,B as s}from"./Link-SOWRV7cb.js";import{M as i}from"./message-2fcxXlkE.js";import{S as f}from"./BabyWrapped-CdeBIcQG.js";const c=({person:r,fødselsnummerForVisning:t,fødselsdatoForVisning:a,altTekstHvisUkjentNavn:n,visEtternavn:o})=>{const d=l("circle");return e.jsx(u,{padding:"4",background:"surface-alt-3-subtle",borderRadius:"medium",children:e.jsxs(g,{justify:"space-between",align:"start",children:[e.jsxs(p,{gap:"2",style:{width:"85%"},children:[e.jsx(v,{children:n!==void 0?n:m(r.fornavn,r.etternavn,o,r.mellomnavn)}),t!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsnummer",values:{fnr:t}})}),!n&&a!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsdato",values:{fødselsdato:a}})})]}),e.jsx("div",{className:d.block,children:e.jsx(f,{height:24,width:24,color:"#005B82"})})]})})};c.__docgenInfo={description:"",methods:[],displayName:"RegistrertePersonalia",props:{person:{required:!0,tsType:{name:"union",raw:"SøkerAnnenForelder | SøkerBarn",elements:[{name:"intersection",raw:`{
    fødselsdato?: string;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!1},{name:"intersection",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
}`,signature:{properties:[{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"intersection",raw:`{
    fødselsdato?: string;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]}]},description:""},visEtternavn:{required:!0,tsType:{name:"boolean"},description:""},fødselsnummerForVisning:{required:!1,tsType:{name:"string"},description:""},fødselsdatoForVisning:{required:!1,tsType:{name:"string"},description:""},altTekstHvisUkjentNavn:{required:!1,tsType:{name:"string"},description:""}}};export{c as R};
