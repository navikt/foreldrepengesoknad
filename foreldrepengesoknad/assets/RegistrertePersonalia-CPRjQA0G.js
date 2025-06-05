import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{a as s,M as i}from"./index-BLIM7tmH.js";import{f as o}from"./useFpNavigator-Byynlfe_.js";import{I as d}from"./Uttaksplan-C-N2USpD.js";import"./dates-iBrNYYBq.js";import{S as u}from"./BabyWrapped-Bwbwz0XW.js";const m=({person:r,fødselsnummerForVisning:n,fødselsdatoForVisning:a,altTekstHvisUkjentNavn:t,visEtternavn:l})=>e.jsxs(d,{color:"blue",header:e.jsx(e.Fragment,{children:t??o(r.fornavn,r.etternavn,l,r.mellomnavn)}),icon:e.jsx(u,{height:24,width:24,color:"#005B82"}),children:[n!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsnummer",values:{fnr:n}})}),!t&&a!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsdato",values:{fødselsdato:a}})})]});m.__docgenInfo={description:"",methods:[],displayName:"RegistrertePersonalia",props:{person:{required:!0,tsType:{name:"union",raw:"AnnenForelderFrontend | BarnFrontend",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: 'M' | 'K' | 'U';
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}]},description:""},visEtternavn:{required:!0,tsType:{name:"boolean"},description:""},fødselsnummerForVisning:{required:!1,tsType:{name:"string"},description:""},fødselsdatoForVisning:{required:!1,tsType:{name:"string"},description:""},altTekstHvisUkjentNavn:{required:!1,tsType:{name:"string"},description:""}}};export{m as R};
