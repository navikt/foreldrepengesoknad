import{I as S,d as s,D as m,i as T,u as k,a as O,j as r,S as P,R as j,V as A,E as D,b as E,c as q,e as x,f as l,M as u,g as _}from"./iframe-CXKzFYka.js";import"./preload-helper-PPVm8Dsz.js";const c=e=>e==null||e.toString().trim().length===0,d=e=>a=>c(a)?e:null;s.extend(T);s().add(18,"week").add(3,"day").startOf("day").toDate();s().startOf("day").subtract(21,"days");s().add(1,"year").startOf("day").toDate();const h=e=>a=>c(a)||S.test(a)?null:e,w=e=>a=>s(a).isAfter(m)?e:null,p=({frilans:e,saveOnNext:a,saveOnPrevious:g,onAvsluttOgSlett:b,onFortsettSenere:f,onStepChange:F,goToPreviousStep:v,stepConfig:y})=>{const n=k(),o=O({defaultValues:e});return r.jsx(P,{steps:y,onStepChange:F,children:r.jsx(j,{formMethods:o,onSubmit:a,children:r.jsxs(A,{gap:"space-40",children:[r.jsx(D,{}),r.jsx(E,{name:"oppstart",control:o.control,label:n.formatMessage({id:"FrilansPanel.Oppstart"}),validate:[d(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.Påkrevd"})),h(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.GyldigDato"})),w(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.ErIFremtiden"}))],maxDate:m,minDate:q,showMonthAndYearDropdowns:!0}),r.jsxs(x,{name:"jobberFremdelesSomFrilans",control:o.control,label:n.formatMessage({id:"FrilansPanel.JobberFremdelesSomFrilans"}),validate:[d(n.formatMessage({id:"FrilansPanel.Valideringsfeil.JobberFremdelesSomFrilans.Påkrevd"}))],children:[r.jsx(l,{value:!0,children:r.jsx(u,{id:"FrilansPanel.JobberFremdelesSomFrilans.Ja"})}),r.jsx(l,{value:!1,children:r.jsx(u,{id:"FrilansPanel.JobberFremdelesSomFrilans.Nei"})})]}),r.jsx(_,{onAvsluttOgSlett:b,onFortsettSenere:f,goToPreviousStep:v,saveDataOnPreviousClick:g})]})})})};p.__docgenInfo={description:"",methods:[],displayName:"FrilansPanel",props:{frilans:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
}`,signature:{properties:[{key:"jobberFremdelesSomFrilans",value:{name:"boolean",required:!0}},{key:"oppstart",value:{name:"string",required:!0}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Frilans) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
}`,signature:{properties:[{key:"jobberFremdelesSomFrilans",value:{name:"boolean",required:!0}},{key:"oppstart",value:{name:"string",required:!0}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Frilans | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"Frilans | undefined",elements:[{name:"signature",type:"object",raw:`{
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
}`,signature:{properties:[{key:"jobberFremdelesSomFrilans",value:{name:"boolean",required:!0}},{key:"oppstart",value:{name:"string",required:!0}}]}},{name:"undefined"}]},name:"formValues"}],return:{name:"void"}}},description:""},onAvsluttOgSlett:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onFortsettSenere:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""}}};const{action:t}=__STORYBOOK_MODULE_ACTIONS__,V={component:p},i={args:{saveOnNext:t("button-click"),saveOnPrevious:t("button-click"),onAvsluttOgSlett:t("button-click"),goToPreviousStep:t("button-click"),onStepChange:t("button-click"),stepConfig:[{id:"BARNET_PATH",label:"Barnet",isSelected:!1},{id:"FRILANS",label:"Arbeid som frilanser",isSelected:!0}]}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    onAvsluttOgSlett: action('button-click'),
    goToPreviousStep: action('button-click'),
    onStepChange: action('button-click'),
    stepConfig: [{
      id: 'BARNET_PATH',
      label: 'Barnet',
      isSelected: false
    }, {
      id: 'FRILANS',
      label: 'Arbeid som frilanser',
      isSelected: true
    }]
  }
}`,...i.parameters?.docs?.source}}};const N=["Default"];export{i as Default,N as __namedExportsOrder,V as default};
