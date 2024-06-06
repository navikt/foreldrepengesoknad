import{j as r}from"./jsx-runtime-Du8NFWEI.js";import{u as i,F as a}from"./index-e2vXP8VC.js";import{e as l,a as m,b as u}from"./barnetUtils-Dtg6gkcN.js";import{g}from"./uttakUtils-Cu5rmwRk.js";import{C as F}from"./CalendarIconLabel-C9DNWetD.js";import{B as p}from"./Label-DKKZxAV5.js";const y=({barnet:e})=>{const t=i(),n=l(e),s=m(e),o=u(e),d=g(e);return r.jsx(F,{iconType:"pink",children:r.jsxs(p,{children:[e.erFødsel&&n&&r.jsx(a,{id:"FamiliehendelseLabel.Fødselsdato",values:{mnd:d,dato:t.formatDate(e.fødselsdato,{day:"2-digit",month:"short"})}}),e.erFødsel&&s&&r.jsx(a,{id:"FamiliehendelseLabel.Termindato",values:{dato:t.formatDate(e.termindato,{day:"2-digit",month:"short"})}}),o&&r.jsx(a,{id:"FamiliehendelseLabel.Omsorgsovertakelse",values:{dato:t.formatDate(e.overtakelsesdato,{day:"2-digit",month:"short"})}})]})})};y.__docgenInfo={description:"",methods:[],displayName:"FamiliehendelseLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};export{y as F};
