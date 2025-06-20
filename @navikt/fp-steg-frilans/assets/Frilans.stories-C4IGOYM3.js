import{I as P,d as s,D as g,i as j,u as O,a as A,j as r,S as D,R as E,V as q,E as x,b as _,c as h,e as w,f as l,M as d,g as M}from"./iframe-QU9TURvv.js";const b=e=>e==null||e.toString().trim().length===0,u=e=>a=>b(a)?e:null;s.extend(j);s().add(18,"week").add(3,"day").startOf("day").toDate();s().startOf("day").subtract(21,"days");s().add(1,"year").startOf("day").toDate();const R=e=>a=>b(a)||P.test(a)?null:e,V=e=>a=>s(a).isAfter(g)?e:null,f=({frilans:e,saveOnNext:a,saveOnPrevious:F,cancelApplication:y,onContinueLater:v,onStepChange:S,goToPreviousStep:T,stepConfig:k})=>{const n=O(),o=A({defaultValues:e});return r.jsx(D,{onCancel:y,steps:k,onContinueLater:v,onStepChange:S,children:r.jsx(E,{formMethods:o,onSubmit:a,children:r.jsxs(q,{gap:"10",children:[r.jsx(x,{}),r.jsx(_,{name:"oppstart",control:o.control,label:n.formatMessage({id:"FrilansPanel.Oppstart"}),validate:[u(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.Påkrevd"})),R(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.GyldigDato"})),V(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.ErIFremtiden"}))],maxDate:g,minDate:h,showMonthAndYearDropdowns:!0}),r.jsxs(w,{name:"jobberFremdelesSomFrilans",control:o.control,label:n.formatMessage({id:"FrilansPanel.JobberFremdelesSomFrilans"}),validate:[u(n.formatMessage({id:"FrilansPanel.Valideringsfeil.JobberFremdelesSomFrilans.Påkrevd"}))],children:[r.jsx(l,{value:!0,children:r.jsx(d,{id:"FrilansPanel.JobberFremdelesSomFrilans.Ja"})}),r.jsx(l,{value:!1,children:r.jsx(d,{id:"FrilansPanel.JobberFremdelesSomFrilans.Nei"})})]}),r.jsx(M,{goToPreviousStep:T,saveDataOnPreviousClick:F})]})})})};f.__docgenInfo={description:"",methods:[],displayName:"FrilansPanel",props:{frilans:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
}`,signature:{properties:[{key:"jobberFremdelesSomFrilans",value:{name:"boolean",required:!0}},{key:"oppstart",value:{name:"string",required:!0}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Frilans) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
}`,signature:{properties:[{key:"jobberFremdelesSomFrilans",value:{name:"boolean",required:!0}},{key:"oppstart",value:{name:"string",required:!0}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Frilans | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"Frilans | undefined",elements:[{name:"signature",type:"object",raw:`{
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
}`,signature:{properties:[{key:"jobberFremdelesSomFrilans",value:{name:"boolean",required:!0}},{key:"oppstart",value:{name:"string",required:!0}}]}},{name:"undefined"}]},name:"formValues"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""}}};const{action:t}=__STORYBOOK_MODULE_ACTIONS__,N={component:f},i={args:{saveOnNext:t("button-click"),saveOnPrevious:t("button-click"),cancelApplication:t("button-click"),goToPreviousStep:t("button-click"),onStepChange:t("button-click"),stepConfig:[{id:"BARNET_PATH",label:"Barnet",isSelected:!1},{id:"FRILANS",label:"Arbeid som frilanser",isSelected:!0}]}};var m,c,p;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
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
}`,...(p=(c=i.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const Y=["Default"];export{i as Default,Y as __namedExportsOrder,N as default};
