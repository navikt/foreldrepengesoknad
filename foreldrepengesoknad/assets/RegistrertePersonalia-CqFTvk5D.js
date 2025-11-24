import{l as e,cC as o,B as s,M as i}from"./iframe-DjmsUZSa.js";import{Z as u}from"./useFpNavigator-Bum2i6ng.js";import{S as d}from"./BabyWrapped-Bglncpj0.js";const v=({person:n,fødselsnummerForVisning:r,fødselsdatoForVisning:a,altTekstHvisUkjentNavn:t,visEtternavn:l})=>e.jsxs(o,{color:"blue",header:e.jsx(e.Fragment,{children:t??(n.navn?u(n.navn.fornavn,n.navn.etternavn,l,n.navn.mellomnavn):"")}),icon:e.jsx(d,{height:24,width:24,color:"#005B82"}),children:[r!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsnummer",values:{fnr:r}})}),!t&&a!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsdato",values:{fødselsdato:a}})})]});v.__docgenInfo={description:"",methods:[],displayName:"RegistrertePersonalia",props:{person:{required:!0,tsType:{name:"union",raw:"AnnenForelderDto_fpoversikt | BarnDto_fpoversikt",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fødselsdato?: string;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!1}}]},required:!1},{name:"signature",type:"object",raw:`{
    annenPart?: AnnenForelderDto_fpoversikt;
    dødsdato?: string;
    fnr: string;
    fødselsdato: string;
    kjønn: Kjønn_fpoversikt;
    navn?: Navn_fpoversikt;
}`,signature:{properties:[{key:"annenPart",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fødselsdato?: string;
    navn: Navn_fpoversikt;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!1}}]},required:!1}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"fnr",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K' | 'U'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"},{name:"literal",value:"'U'"}],required:!0}},{key:"navn",value:{name:"signature",type:"object",raw:`{
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]},required:!1}}]}}]},description:""},visEtternavn:{required:!0,tsType:{name:"boolean"},description:""},fødselsnummerForVisning:{required:!1,tsType:{name:"string"},description:""},fødselsdatoForVisning:{required:!1,tsType:{name:"string"},description:""},altTekstHvisUkjentNavn:{required:!1,tsType:{name:"string"},description:""}}};export{v as R};
