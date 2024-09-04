import{h as u,k as h,l as F,m as D,j as a,b as H,V as b,M as s,n as z,o as V,p as U,L as _,q as P}from"./CalendarLabel-BEI7redc.js";import{g as $,F as L,E as Y,R as E,i as k,l as S,j as G,k as d}from"./dateFormValidation-B9mZPwn8.js";import{u as J}from"./index-B254x7wL.js";import{r as p,R as i}from"./index-uubelm5h.js";import"./index-D3eZ-H7s.js";import"./index-BdzLX9oW.js";import"./v4-CQkTLCs1.js";const y=p.createContext({open:!1,toggleOpen:()=>{},size:"medium"});var K=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const Q=p.forwardRef((n,o)=>{var{children:r,className:e}=n,t=K(n,["children","className"]);const l=p.useContext(y);return l===null?(console.error("<ExpansionCard.Content> has to be used within an <ExpansionCard>"),null):i.createElement(u,Object.assign({},t,{ref:o,as:"div",className:h("navds-expansioncard__content",e,{"navds-expansioncard__content--closed":!l.open}),"aria-hidden":!l.open,size:l.size}),i.createElement("div",{className:"navds-expansioncard__content-inner"},r))});var W=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const X=p.forwardRef((n,o)=>{var{className:r}=n,e=W(n,["className"]);const t=p.useContext(y);return t===null?(console.error("<ExpansionCard.Description> has to be used within an <ExpansionCard>"),null):i.createElement(u,Object.assign({},e,{as:"p",ref:o,className:h("navds-link-panel__description",r),size:t.size}))});var Z=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const ee=p.forwardRef((n,o)=>{var{children:r,className:e}=n,t=Z(n,["children","className"]);const l=p.useContext(y);return l===null?(console.error("<ExpansionCard.Header> has to be used within an <ExpansionCard>"),null):i.createElement("div",Object.assign({ref:o},t,{className:h("navds-expansioncard__header",e)}),i.createElement("div",{className:"navds-expansioncard__header-content"},r),i.createElement("button",{className:"navds-expansioncard__header-button",onClick:()=>l.toggleOpen(),type:"button","aria-expanded":l.open},i.createElement(F,{className:"navds-expansioncard__header-chevron",title:"Vis mer"})))});var ne=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const te=p.forwardRef((n,o)=>{var{className:r,as:e="h3",size:t="medium"}=n,l=ne(n,["className","as","size"]);return i.createElement(e,Object.assign({},l,{ref:o,className:h("navds-expansioncard__title",`navds-expansioncard__title--${t}`,"navds-heading",`navds-heading--${t}`,r)}))});var ae=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const c=p.forwardRef((n,o)=>{var{className:r,onToggle:e,open:t,defaultOpen:l=!1,size:x="medium"}=n,j=ae(n,["className","onToggle","open","defaultOpen","size"]);const g=p.useRef(!(t||l)),[f,O]=D({value:t,onChange:N=>{e==null||e(N),g.current=!0},defaultValue:l});return i.createElement(y.Provider,{value:{open:t??f,toggleOpen:()=>O(N=>!N),size:x}},i.createElement("section",Object.assign({},j,{className:h("navds-expansioncard",r,`navds-expansioncard--${x}`,{"navds-expansioncard--open":t??f,"navds-expansioncard--no-animation":!g.current}),ref:o})))});c.Header=ee;c.Content=Q;c.Title=te;c.Description=X;const A=({utenlandsopphold:n,saveOnNext:o,saveOnPrevious:r,cancelApplication:e,onContinueLater:t,onStepChange:l,goToPreviousStep:x,stepConfig:j,stønadstype:g})=>{const f=J(),O=$({defaultValues:n});return a.jsx(H,{steps:j,onCancel:e,onContinueLater:t,onStepChange:l,children:a.jsx(L,{formMethods:O,onSubmit:o,children:a.jsxs(b,{gap:"10",children:[a.jsx(Y,{}),a.jsxs(E,{name:"harBoddUtenforNorgeSiste12Mnd",label:a.jsx(s,{id:"UtenlandsoppholdSteg.Siste12Måneder.Spørsmål"}),validate:[k(f.formatMessage({id:"UtenlandsoppholdSteg.Siste12Måneder.IsRequired"}))],children:[a.jsx(S,{value:!1,children:a.jsx(s,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddINorge"})}),a.jsx(S,{value:!0,children:a.jsx(s,{id:"UtenlandsoppholdSteg.Siste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),a.jsxs(E,{name:"skalBoUtenforNorgeNeste12Mnd",label:a.jsx(s,{id:"UtenlandsoppholdSteg.Neste12Måneder.Spørsmål"}),validate:[k(f.formatMessage({id:"UtenlandsoppholdSteg.Neste12Måneder.IsRequired"}))],children:[a.jsx(S,{value:!1,children:a.jsx(s,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddINorge"})}),a.jsx(S,{value:!0,children:a.jsx(s,{id:"UtenlandsoppholdSteg.Neste12MånederInfotekst.Radiobutton.BoddIUtlandet"})})]}),a.jsxs(c,{size:"small","aria-label":f.formatMessage({id:"UtenlandsoppholdSteg.StotteFraNav"}),children:[a.jsx(c.Header,{children:a.jsx(c.Title,{size:"small",children:a.jsx(s,{id:"UtenlandsoppholdSteg.StotteFraNav"})})}),a.jsx(c.Content,{children:a.jsxs(b,{gap:"10",children:[a.jsxs(b,{gap:"5",children:[a.jsx(u,{children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del1"})}),a.jsx(u,{children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del2"})}),a.jsx(u,{children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del3"})}),a.jsx(u,{children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del4"})})]}),a.jsxs(b,{gap:"5",children:[a.jsx(z,{size:"small",level:"4",children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Undertittel"})}),a.jsx(u,{children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del5"})}),a.jsxs(V,{gap:"1",children:[a.jsx(U,{children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del6"})}),a.jsxs(U,{children:[g==="Engangsstønad"&&a.jsx(_,{href:P.engangsstonadHvem,target:"_blank",children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del7.es"})}),g==="Foreldrepenger"&&a.jsx(_,{href:P.foreldrepengerUtland,target:"_blank",children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del7.fp"})}),g==="Svangerskapspenger"&&a.jsx(_,{href:P.svangerskapspengerUtland,target:"_blank",children:a.jsx(s,{id:"UtenlandsoppholdSteg.Info.Del7.svp"})})]})]})]})]})})]}),a.jsx(G,{goToPreviousStep:x,saveDataOnPreviousClick:r})]})})})},q=A;A.__docgenInfo={description:"",methods:[],displayName:"UtenlandsoppholdPanel",props:{utenlandsopphold:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
}`,signature:{properties:[{key:"harBoddUtenforNorgeSiste12Mnd",value:{name:"boolean",required:!0}},{key:"skalBoUtenforNorgeNeste12Mnd",value:{name:"boolean",required:!0}}]}},description:""},saveOnNext:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Utenlandsopphold) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
}`,signature:{properties:[{key:"harBoddUtenforNorgeSiste12Mnd",value:{name:"boolean",required:!0}},{key:"skalBoUtenforNorgeNeste12Mnd",value:{name:"boolean",required:!0}}]}},name:"formValues"}],return:{name:"void"}}},description:""},saveOnPrevious:{required:!0,tsType:{name:"signature",type:"function",raw:"(formValues: Utenlandsopphold | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"Utenlandsopphold | undefined",elements:[{name:"signature",type:"object",raw:`{
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
}`,signature:{properties:[{key:"harBoddUtenforNorgeSiste12Mnd",value:{name:"boolean",required:!0}},{key:"skalBoUtenforNorgeNeste12Mnd",value:{name:"boolean",required:!0}}]}},{name:"undefined"}]},name:"formValues"}],return:{name:"void"}}},description:""},cancelApplication:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},stepConfig:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},stønadstype:{required:!0,tsType:{name:"union",raw:"'Engangsstønad' | 'Foreldrepenger' | 'Svangerskapspenger'",elements:[{name:"literal",value:"'Engangsstønad'"},{name:"literal",value:"'Foreldrepenger'"},{name:"literal",value:"'Svangerskapspenger'"}]},description:""}}};const ce={title:"UtenlandsoppholdPanel",component:q},R=({saveOnNext:n,saveOnPrevious:o,cancelApplication:r,goToPreviousStep:e,onStepChange:t})=>a.jsx(q,{saveOnNext:n,saveOnPrevious:o,onStepChange:t,cancelApplication:r,goToPreviousStep:e,stepConfig:[{id:"BARNET_PATH",label:"Barnet",isSelected:!1},{id:"BO_I_UTLANDET_PATH",label:"Bo i utlandet",isSelected:!0}],stønadstype:"Engangsstønad"}),m=R.bind({});m.args={saveOnNext:d("button-click"),saveOnPrevious:d("button-click"),cancelApplication:d("button-click"),goToPreviousStep:d("button-click"),onStepChange:d("button-click")};const v=R.bind({});v.args={saveOnNext:d("button-click"),saveOnPrevious:d("button-click"),cancelApplication:d("button-click"),goToPreviousStep:d("button-click"),onStepChange:d("button-click")};var C,T,w;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`({
  saveOnNext,
  saveOnPrevious,
  cancelApplication,
  goToPreviousStep,
  onStepChange
}) => {
  return <UtenlandsoppholdPanel saveOnNext={saveOnNext} saveOnPrevious={saveOnPrevious} onStepChange={onStepChange} cancelApplication={cancelApplication} goToPreviousStep={goToPreviousStep} stepConfig={[{
    id: 'BARNET_PATH',
    label: 'Barnet',
    isSelected: false
  }, {
    id: 'BO_I_UTLANDET_PATH',
    label: 'Bo i utlandet',
    isSelected: true
  }]} stønadstype="Engangsstønad" />;
}`,...(w=(T=m.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var B,I,M;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`({
  saveOnNext,
  saveOnPrevious,
  cancelApplication,
  goToPreviousStep,
  onStepChange
}) => {
  return <UtenlandsoppholdPanel saveOnNext={saveOnNext} saveOnPrevious={saveOnPrevious} onStepChange={onStepChange} cancelApplication={cancelApplication} goToPreviousStep={goToPreviousStep} stepConfig={[{
    id: 'BARNET_PATH',
    label: 'Barnet',
    isSelected: false
  }, {
    id: 'BO_I_UTLANDET_PATH',
    label: 'Bo i utlandet',
    isSelected: true
  }]} stønadstype="Engangsstønad" />;
}`,...(M=(I=v.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};const ue=["ForFødsel","ForAdopsjon"];export{v as ForAdopsjon,m as ForFødsel,ue as __namedExportsOrder,ce as default};
