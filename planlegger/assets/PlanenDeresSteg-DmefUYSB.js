import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{u as W,a as X,b as D,C as x,c as U}from"./usePlanleggerNavigator-bfolbdq0.js";import{l as Y,C as Z}from"./kalenderPerioderUtils-BZu-wC2J.js";import{P as ee}from"./PlanleggerStepPage-B-k2kdCS.js";import{B as A,L as te,u as re,H as ne,M as S,e as ae}from"./Label-ne8aFYav.js";import{g as oe,f as se}from"./FordelingSteg-usvyZjwg.js";import{D as k}from"./Dekningsgrad-Bg_cIyqc.js";import{S as V,b as le,c as ie,g as ge}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as de}from"./hvemHarRettUtils-uG_MphPR.js";import{d as z,f as K,c as L}from"./uttakUtils-N7tKg55S.js";import{j as ue,k as G,u as ce,d as q,C as pe,S as me}from"./Infobox-CtPDPZ_e.js";import{r as y,R as v}from"./index-CTjT7uj6.js";import{u as fe}from"./useScrollBehaviour-CuUH4c1L.js";import{n as E}from"./validation-4HO0J-zV.js";import{O as ke}from"./OmÅTilpassePlanen-ChgPk1Km.js";import{U as ve}from"./UforutsetteEndringer-Bsnm2FgC.js";import{m as be,c as F,a as Se,V as w}from"./useId-Dvu9sbXS.js";import{S as ye}from"./Information-PkRAsrj3.js";import{S as Te}from"./PersonGroup-bIWPBeqr.js";import{d as Oe,e as xe}from"./StepButtonsHookForm-Dttpjjrm.js";y.createContext(null);const[je,ot,he,De]=Oe(),[Ee,B]=ue({name:"ToggleGroupContext",hookName:"useToggleGroupContext",providerName:"ToggleGroupProvider",errorMessage:"<ToggleGroup.Item> needs to be wrapped within <ToggleGroup>"});function _e({value:e,disabled:a=!1,onFocus:o,onClick:t,onKeyDown:r},s){const{setSelectedValue:d,setFocusedValue:u,selectedValue:l,focusedValue:m}=B(),{register:T,descendants:g}=De({disabled:a,value:e}),f=e===l,j=()=>u(e),h=y.useCallback(b=>{const p=g.values().findIndex(i=>i.value===m),_={ArrowLeft:()=>{var i;const c=g.prevEnabled(p,!1);c&&((i=c.node)===null||i===void 0||i.focus())},ArrowRight:()=>{var i;const c=g.nextEnabled(p,!1);c&&((i=c.node)===null||i===void 0||i.focus())},Home:()=>{var i;const c=g.firstEnabled();c&&((i=c.node)===null||i===void 0||i.focus())},End:()=>{var i;const c=g.lastEnabled();c&&((i=c.node)===null||i===void 0||i.focus())}}[b.key];_?(b.preventDefault(),_(b)):b.key==="Tab"&&l&&setTimeout(()=>u(l))},[g,m,l,u]);return{ref:be([T,s]),isSelected:f,isFocused:m===e,onClick:G(t,()=>l!==e&&d(e)),onFocus:a?void 0:G(o,j),onKeyDown:G(r,h)}}var we=function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const Fe=y.forwardRef((e,a)=>{var{className:o,children:t,icon:r,label:s,value:d,onClick:u,onFocus:l,onKeyDown:m}=e,T=we(e,["className","children","icon","label","value","onClick","onFocus","onKeyDown"]);const g=_e({value:d,onClick:u,onFocus:l,disabled:!1,onKeyDown:m},a),f=B();return v.createElement("button",Object.assign({},T,{ref:g.ref,className:F("navds-toggle-group__button",o),type:"button",role:"radio","aria-checked":g.isSelected,tabIndex:g.isFocused?0:-1,onClick:g.onClick,onFocus:g.onFocus,onKeyDown:g.onKeyDown}),v.createElement(A,{as:"span",className:"navds-toggle-group__button-inner",size:f==null?void 0:f.size},t??v.createElement(v.Fragment,null,r,s)))});function Re({onChange:e,value:a,defaultValue:o=""}){const[t,r]=y.useState(o),[s,d]=ce({defaultValue:o,value:a,onChange:e});return y.useEffect(()=>{a!=null&&r(a)},[a]),{selectedValue:s,setSelectedValue:d,focusedValue:t,setFocusedValue:r}}var Ne=function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const R=y.forwardRef((e,a)=>{var{className:o,children:t,onChange:r,size:s="medium",label:d,value:u,defaultValue:l,"aria-describedby":m,variant:T="action",fill:g=!1}=e,f=Ne(e,["className","children","onChange","size","label","value","defaultValue","aria-describedby","variant","fill"]);const j=he(),h=Re({defaultValue:l,value:u,onChange:r}),b=Object.assign(Object.assign({},h),{size:s}),p=Se();return!u&&!l&&console.error("ToggleGroup without value or defaultvalue is not allowed"),!u&&!l&&console.error("ToggleGroup needs either a value or defaultValue"),v.createElement(je,{value:j},v.createElement(Ee,Object.assign({},b),v.createElement("div",{className:F("navds-toggle-group__wrapper",o,{"navds-toggle-group__wrapper--fill":g})},d&&v.createElement(te,{size:s,className:"navds-toggle-group__label",id:p},d),v.createElement("div",Object.assign({},f,{ref:a,className:F("navds-toggle-group",`navds-toggle-group--${s}`,`navds-toggle-group--${T}`),"aria-describedby":F(m,!!d&&p)||void 0,role:"radiogroup"}),t))))});R.Item=Fe;const Pe=typeof window<"u"&&window.matchMedia===void 0,Ce=(e,a)=>{const[o,t]=y.useState(a);return y.useEffect(()=>{if(Pe)return;const r=window.matchMedia(e);t(r.matches);const s=d=>{t(d.matches)};return r.addEventListener("change",s),()=>{r.removeEventListener("change",s)}},[e]),o},Ie="_calendar_wfn3i_1",Ge={calendar:Ie},Ae=(e,a,o)=>{const t=z(e===k.HUNDRE_PROSENT?a[k.HUNDRE_PROSENT]:a[k.ÅTTI_PROSENT]);return o.antallDagerSøker1>t.totaltAntallDager?t.totaltAntallDager:o.antallDagerSøker1},He=({stønadskontoer:e})=>{const a=re(),o=W(),t=X();fe();const r=E(D(x.HVEM_PLANLEGGER)),s=E(D(x.OM_BARNET)),d=E(D(x.HVOR_LANG_PERIODE)),u=E(D(x.ARBEIDSSITUASJON)),l=D(x.FORDELING),m=U(x.FORDELING),T=E(U(x.HVOR_LANG_PERIODE)),g=e[k.HUNDRE_PROSENT],f=e[k.ÅTTI_PROSENT],j=d.dekningsgrad===k.HUNDRE_PROSENT?g:f,h=z(j),b=O=>{const M=O;T({dekningsgrad:M}),l&&m({antallDagerSøker1:Ae(M,e,l)})},p=de(u),H=r.type===V.FAR_OG_FAR&&(p==="kunSøker1HarRett"||p==="kunSøker2HarRett"),N=K(p,r,g,s),P=K(p,r,f,s),C=L(N),I=L(P),_=le(r),i=Y(j,s,r,u,l==null?void 0:l.antallDagerSøker1),c=ie(r,a),$=ge(r,a),J=!0,Q=Ce("screen and (min-width: 480)");return n.jsx("form",{children:n.jsx(ee,{steps:t,goToStep:o.goToNextStep,children:n.jsxs(w,{gap:"10",children:[n.jsx(ne,{size:"medium",spacing:!0,level:"2",children:n.jsx(S,{id:"OversiktSteg.Tittel",values:{erAleneforsørger:_}})}),n.jsx(q,{header:n.jsx(S,{id:"OversiktSteg.Infoboks.Utkast"}),color:"gray",icon:n.jsx(ye,{height:24,width:24,fontSize:"1-5rem","aria-hidden":!0}),children:n.jsx(ae,{children:n.jsx(S,{id:"OversiktSteg.Infoboks.Utkast.Tekst"})})}),H&&s.erFødsel&&n.jsx(q,{header:n.jsx(S,{id:"OversiktSteg.Infoboks.FarOgFar.DereHarOppgitt"}),icon:n.jsx(Te,{height:24,width:24,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0}),color:"green",children:n.jsxs("div",{children:[n.jsx(A,{children:n.jsx(S,{id:"OversiktSteg.Infoboks.FarOgFar.DenSomErBiologisk"})}),n.jsx(A,{children:n.jsx(S,{id:"OversiktSteg.Infoboks.FarOgFar.HvisDetErStebarnsadopsjon"})})]})}),n.jsxs(w,{gap:"1",children:[n.jsxs(R,{defaultValue:d==null?void 0:d.dekningsgrad,size:Q?"medium":"small",variant:"neutral",onChange:b,style:{width:"100%"},children:[n.jsx(R.Item,{value:k.HUNDRE_PROSENT,children:n.jsx(S,{id:"OversiktSteg.100",values:{uker:C.uker,dager:C.dager}})}),n.jsx(R.Item,{value:k.ÅTTI_PROSENT,children:n.jsx(S,{id:"OversiktSteg.80",values:{uker:I.uker,dager:I.dager}})})]}),p==="beggeHarRett"&&(!s.erFødsel||r.type!==V.FAR_OG_FAR)&&n.jsx(xe,{defaultValue:l==null?void 0:l.antallDagerSøker1,label:"",name:"antallDagerSøker1",onChange:O=>{m({antallDagerSøker1:parseInt(O.target.value,10)})},children:oe(h).map(O=>n.jsx("option",{value:O.antallUkerOgDagerSøker1.totaltAntallDager,children:se(a,O,r,c,$,J)},O.antallUkerOgDagerSøker1.totaltAntallDager))})]}),n.jsxs(w,{gap:"5",children:[n.jsx(Z,{uttaksdata:d.dekningsgrad===k.HUNDRE_PROSENT?N:P,hvemPlanlegger:r,barnet:s,hvemHarRett:p}),n.jsx("div",{className:Ge.calendar,children:n.jsx(pe,{periods:i})})]}),n.jsxs(w,{gap:"1",children:[n.jsx(ke,{arbeidssituasjon:u,barnet:s,hvemPlanlegger:r}),n.jsx(ve,{arbeidssituasjon:u,hvemPlanlegger:r,barnet:s})]}),n.jsx(me,{goToPreviousStep:o.goToPreviousDefaultStep,nextButtonOnClick:o.goToNextDefaultStep,useSimplifiedTexts:!0})]})})})};He.__docgenInfo={description:"",methods:[],displayName:"PlanenDeresSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
}`,signature:{properties:[]},required:!1}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
    tillegg?: TilgjengeligeKontoTillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    [KontoTilleggType.prematur]: number;
    [KontoTilleggType.flerbarn]: number;
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""}}};export{He as P};
