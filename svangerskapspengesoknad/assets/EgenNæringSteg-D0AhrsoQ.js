import{j as r}from"./index-DDg3ir62.js";import{u as a,C as n,b as y,a as f}from"./routes-BC9Z9msW.js";import{u as E,a as S,b}from"./useSvpNavigator-CrWtNmvs.js";import{C as k,H as T,M as I}from"./VeiviserPage-BqWeAT9o.js";import{E as x}from"./EgenNæringPanel-Dj4KCbQq.js";import{n as s}from"./minMax-BhXEQI03.js";const _=({mellomlagreSøknadOgNaviger:o,avbrytSøknad:g,arbeidsforhold:t})=>{const u=E(t),e=S(o,t),d=a(n.EGEN_NÆRING),i=s(a(n.ARBEIDSFORHOLD_OG_INNTEKT)),m=s(a(n.OM_BARNET)),p=y(n.EGEN_NÆRING),v=c=>{p(c);const N=(i.harHattArbeidIUtlandet?f.ARBEID_I_UTLANDET:void 0)??b(m.termindato,t,i);return e.goToStep(N)},l=()=>{};return r.jsxs(k,{children:[r.jsx(T,{size:"large",children:r.jsx(I,{id:"søknad.pageheading"})}),r.jsx(x,{egenNæring:d,saveOnNext:v,saveOnPrevious:l,cancelApplication:g,onContinueLater:e.fortsettSøknadSenere,goToPreviousStep:e.goToPreviousDefaultStep,stepConfig:u,appOrigin:"svangerskapspengesoknad",onStepChange:e.goToStep})]})};_.__docgenInfo={description:"",methods:[],displayName:"EgenNæringSteg",props:{mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};export{_ as E};
