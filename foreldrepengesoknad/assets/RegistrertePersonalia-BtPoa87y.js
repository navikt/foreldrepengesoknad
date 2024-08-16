import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import"./index-DSgjoNiG.js";import"./Tidsperioden-Cw9xAJ1Y.js";import"./index-CCQ3W5xA.js";import"./index-CTjT7uj6.js";import"./Uttaksdagen-CXktmUXL.js";import{s as d}from"./useFpNavigator-D6ug9ckv.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import{b as m}from"./bemUtils-DmNyTjfb.js";import{B as u,H as g,V as p}from"./VStack-C22gJDrI.js";import{L as v,B as s}from"./Label-C_UMiHsP.js";import{M as i}from"./message-CjkJih2D.js";import{S as f}from"./BabyWrapped-DwSJUg5x.js";const c=({person:r,fødselsnummerForVisning:n,fødselsdatoForVisning:t,altTekstHvisUkjentNavn:a,visEtternavn:o})=>{const l=m("circle");return e.jsx(u,{padding:"4",background:"surface-alt-3-subtle",borderRadius:"medium",children:e.jsxs(g,{justify:"space-between",align:"start",children:[e.jsxs(p,{gap:"2",style:{width:"85%"},children:[e.jsx(v,{children:a??d(r.fornavn,r.etternavn,o,r.mellomnavn)}),n!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsnummer",values:{fnr:n}})}),!a&&t!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsdato",values:{fødselsdato:t}})})]}),e.jsx("div",{className:l.block,children:e.jsx(f,{height:24,width:24,color:"#005B82"})})]})})};c.__docgenInfo={description:"",methods:[],displayName:"RegistrertePersonalia",props:{person:{required:!0,tsType:{name:"union",raw:"SøkerAnnenForelder | SøkerBarn",elements:[{name:"intersection",raw:`{
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
