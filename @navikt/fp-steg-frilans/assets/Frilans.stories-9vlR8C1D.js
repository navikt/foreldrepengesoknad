import{I as P,d as s,D as p,i as j,u as O,a as A,j as a,S as D,R as E,V as q,E as x,b as _,c as h,e as w,f as o,M as l,g as M}from"./iframe-DWrq58t0.js";const g=e=>e==null||e.toString().trim().length===0,d=e=>r=>g(r)?e:null;s.extend(j);s().add(18,"week").add(3,"day").startOf("day").toDate();s().startOf("day").subtract(21,"days");s().add(1,"year").startOf("day").toDate();const R=e=>r=>g(r)||P.test(r)?null:e,V=e=>r=>s(r).isAfter(p)?e:null,b=({frilans:e,saveOnNext:r,saveOnPrevious:f,cancelApplication:F,onContinueLater:y,onStepChange:v,goToPreviousStep:S,stepConfig:T})=>{const n=O(),k=A({defaultValues:e});return a.jsx(D,{onCancel:F,steps:T,onContinueLater:y,onStepChange:v,children:a.jsx(E,{formMethods:k,onSubmit:r,children:a.jsxs(q,{gap:"10",children:[a.jsx(x,{}),a.jsx(_,{name:"oppstart",label:n.formatMessage({id:"FrilansPanel.Oppstart"}),validate:[d(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.Påkrevd"})),R(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.GyldigDato"})),V(n.formatMessage({id:"FrilansPanel.Valideringsfeil.FraOgMedDato.ErIFremtiden"}))],maxDate:p,minDate:h,showMonthAndYearDropdowns:!0}),a.jsxs(w,{name:"jobberFremdelesSomFrilans",label:n.formatMessage({id:"FrilansPanel.JobberFremdelesSomFrilans"}),validate:[d(n.formatMessage({id:"FrilansPanel.Valideringsfeil.JobberFremdelesSomFrilans.Påkrevd"}))],children:[a.jsx(o,{value:!0,children:a.jsx(l,{id:"FrilansPanel.JobberFremdelesSomFrilans.Ja"})}),a.jsx(o,{value:!1,children:a.jsx(l,{id:"FrilansPanel.JobberFremdelesSomFrilans.Nei"})})]}),a.jsx(M,{goToPreviousStep:S,saveDataOnPreviousClick:f})]})})})};b.__docgenInfo={description:"",methods:[],displayName:"FrilansPanel",props:{frilans:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""}}};const{action:t}=__STORYBOOK_MODULE_ACTIONS__,N={component:b},i={args:{saveOnNext:t("button-click"),saveOnPrevious:t("button-click"),cancelApplication:t("button-click"),goToPreviousStep:t("button-click"),onStepChange:t("button-click"),stepConfig:[{id:"BARNET_PATH",label:"Barnet",isSelected:!1},{id:"FRILANS",label:"Arbeid som frilanser",isSelected:!0}]}};var u,m,c;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(c=(m=i.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const Y=["Default"];export{i as Default,Y as __namedExportsOrder,N as default};
