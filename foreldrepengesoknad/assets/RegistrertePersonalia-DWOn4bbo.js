import{j as e}from"./jsx-runtime-CLpGMVip.js";import{b as s,M as i}from"./index-CUhEbLO6.js";import{f as o}from"./useFpNavigator-D3Aim9gA.js";import{I as l}from"./Uttaksplan-BfWnJuI7.js";import"./dates-AkG-ZPn6.js";import{S as u}from"./BabyWrapped-zzWcAmSV.js";const m=({person:r,fødselsnummerForVisning:n,fødselsdatoForVisning:t,altTekstHvisUkjentNavn:a,visEtternavn:d})=>e.jsxs(l,{color:"blue",header:e.jsx(e.Fragment,{children:a??o(r.fornavn,r.etternavn,d,r.mellomnavn)}),icon:e.jsx(u,{height:24,width:24,color:"#005B82"}),children:[n!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsnummer",values:{fnr:n}})}),!a&&t!==void 0&&e.jsx(s,{children:e.jsx(i,{id:"registrertePersonalia.fødselsdato",values:{fødselsdato:t}})})]});m.__docgenInfo={description:"",methods:[],displayName:"RegistrertePersonalia",props:{person:{required:!0,tsType:{name:"union",raw:"AnnenForelderFrontend | BarnFrontend",elements:[{name:"signature",type:"object",raw:`{
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
    kjønn: string;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}]},description:""},visEtternavn:{required:!0,tsType:{name:"boolean"},description:""},fødselsnummerForVisning:{required:!1,tsType:{name:"string"},description:""},fødselsdatoForVisning:{required:!1,tsType:{name:"string"},description:""},altTekstHvisUkjentNavn:{required:!1,tsType:{name:"string"},description:""}}};export{m as R};
