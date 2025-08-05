import{aa as i,j as r,a4 as l,Z as t}from"./iframe-7czCGN7b.js";import{b as m,a as u,e as g}from"./barnetUtils-CJBenv_k.js";import{g as F}from"./uttakUtils-BJA-dqt1.js";import{C as p}from"./CalendarIconLabel-BMu8rANy.js";const y=({barnet:e})=>{const a=i(),n=m(e),s=u(e),o=g(e),d=F(e);return r.jsx(p,{iconType:"pink",children:r.jsxs(l,{children:[e.erFødsel&&n&&r.jsx(t,{id:"FamiliehendelseLabel.Fødselsdato",values:{mnd:d,dato:a.formatDate(e.fødselsdato,{day:"2-digit",month:"short"})}}),e.erFødsel&&s&&r.jsx(t,{id:"FamiliehendelseLabel.Termindato",values:{dato:a.formatDate(e.termindato,{day:"2-digit",month:"short"})}}),o&&r.jsx(t,{id:"FamiliehendelseLabel.Omsorgsovertakelse",values:{dato:a.formatDate(e.overtakelsesdato,{day:"2-digit",month:"short"})}})]})})};y.__docgenInfo={description:"",methods:[],displayName:"FamiliehendelseLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
