import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{u as W,a as X,b as D,C as x,c as U}from"./usePlanleggerNavigator-8nW0-4CR.js";import{l as Y,C as Z}from"./kalenderPerioderUtils-B4fys9h4.js";import{P as ee}from"./PlanleggerStepPage-C2oTxAXL.js";import{B as H,L as te,u as re,H as ne,M as S,e as ae}from"./Label-ChY0iN5k.js";import{g as oe,f as se}from"./FordelingSteg-BSY0jRpF.js";import{D as v}from"./Dekningsgrad-Bg_cIyqc.js";import{S as V,b as le,c as ie,g as ge}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{u as de}from"./hvemHarRettUtils-C9NLplHf.js";import{d as B,f as L,c as q}from"./uttakUtils-BBwp3s1E.js";import{k as ue,m as A,u as ce,d as z,C as pe,S as me}from"./Infobox-PMMp8zKu.js";import{r as y,R as b}from"./index-CTjT7uj6.js";import{u as fe}from"./useScrollBehaviour-OxYi0_Yo.js";import{n as E}from"./validation-4HO0J-zV.js";import{O as ke}from"./OmÅTilpassePlanen-TcHDip_3.js";import{U as ve}from"./UforutsetteEndringer-BGijdm7-.js";import{m as be,c as R,a as Se,V as F}from"./VStack-BOynvu-T.js";import{S as ye}from"./Information-3Bc-kubE.js";import{S as Te}from"./PersonGroup-D_DyOkqX.js";import{d as Oe,e as xe}from"./StepButtonsHookForm-CYXCOEZC.js";y.createContext(null);const[je,ot,he,De]=Oe(),[Ee,$]=ue({name:"ToggleGroupContext",hookName:"useToggleGroupContext",providerName:"ToggleGroupProvider",errorMessage:"<ToggleGroup.Item> needs to be wrapped within <ToggleGroup>"});function _e({value:e,disabled:a=!1,onFocus:o,onClick:t,onKeyDown:r},s){const{setSelectedValue:d,setFocusedValue:u,selectedValue:l,focusedValue:f}=$(),{register:T,descendants:g}=De({disabled:a,value:e}),k=e===l,j=()=>u(e),h=y.useCallback(p=>{const m=g.values().findIndex(i=>i.value===f),_={ArrowLeft:()=>{var i;const c=g.prevEnabled(m,!1);c&&((i=c.node)===null||i===void 0||i.focus())},ArrowRight:()=>{var i;const c=g.nextEnabled(m,!1);c&&((i=c.node)===null||i===void 0||i.focus())},Home:()=>{var i;const c=g.firstEnabled();c&&((i=c.node)===null||i===void 0||i.focus())},End:()=>{var i;const c=g.lastEnabled();c&&((i=c.node)===null||i===void 0||i.focus())}},G=p.shiftKey||p.ctrlKey||p.altKey||p.metaKey,w=_[p.key];w&&!G?(p.preventDefault(),w(p)):p.key==="Tab"&&l&&setTimeout(()=>u(l))},[g,f,l,u]);return{ref:be([T,s]),isSelected:k,isFocused:f===e,onClick:A(t,()=>l!==e&&d(e)),onFocus:a?void 0:A(o,j),onKeyDown:A(r,h)}}var we=function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const Fe=y.forwardRef((e,a)=>{var{className:o,children:t,icon:r,label:s,value:d,onClick:u,onFocus:l,onKeyDown:f}=e,T=we(e,["className","children","icon","label","value","onClick","onFocus","onKeyDown"]);const g=_e({value:d,onClick:u,onFocus:l,disabled:!1,onKeyDown:f},a),k=$();return b.createElement("button",Object.assign({},T,{ref:g.ref,className:R("navds-toggle-group__button",o),type:"button",role:"radio","aria-checked":g.isSelected,tabIndex:g.isFocused?0:-1,onClick:g.onClick,onFocus:g.onFocus,onKeyDown:g.onKeyDown}),b.createElement(H,{as:"span",className:"navds-toggle-group__button-inner",size:k==null?void 0:k.size},t??b.createElement(b.Fragment,null,r,s)))});function Re({onChange:e,value:a,defaultValue:o=""}){const[t,r]=y.useState(o),[s,d]=ce({defaultValue:o,value:a,onChange:e});return y.useEffect(()=>{a!=null&&r(a)},[a]),{selectedValue:s,setSelectedValue:d,focusedValue:t,setFocusedValue:r}}var Ne=function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)a.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const N=y.forwardRef((e,a)=>{var{className:o,children:t,onChange:r,size:s="medium",label:d,value:u,defaultValue:l,"aria-describedby":f,variant:T="action",fill:g=!1}=e,k=Ne(e,["className","children","onChange","size","label","value","defaultValue","aria-describedby","variant","fill"]);const j=he(),h=Re({defaultValue:l,value:u,onChange:r}),p=Object.assign(Object.assign({},h),{size:s}),m=Se();return!u&&!l&&console.error("ToggleGroup without value or defaultvalue is not allowed"),!u&&!l&&console.error("ToggleGroup needs either a value or defaultValue"),b.createElement(je,{value:j},b.createElement(Ee,Object.assign({},p),b.createElement("div",{className:R("navds-toggle-group__wrapper",o,{"navds-toggle-group__wrapper--fill":g})},d&&b.createElement(te,{size:s,className:"navds-toggle-group__label",id:m},d),b.createElement("div",Object.assign({},k,{ref:a,className:R("navds-toggle-group",`navds-toggle-group--${s}`,`navds-toggle-group--${T}`),"aria-describedby":R(f,!!d&&m)||void 0,role:"radiogroup"}),t))))});N.Item=Fe;const Pe=typeof window<"u"&&window.matchMedia===void 0,Ce=(e,a)=>{const[o,t]=y.useState(a);return y.useEffect(()=>{if(Pe)return;const r=window.matchMedia(e);t(r.matches);const s=d=>{t(d.matches)};return r.addEventListener("change",s),()=>{r.removeEventListener("change",s)}},[e]),o},Ie="_calendar_wfn3i_1",Ge={calendar:Ie},Ae=(e,a,o)=>{const t=B(e===v.HUNDRE_PROSENT?a[v.HUNDRE_PROSENT]:a[v.ÅTTI_PROSENT]);return o.antallDagerSøker1>t.totaltAntallDager?t.totaltAntallDager:o.antallDagerSøker1},He=({stønadskontoer:e})=>{const a=re(),o=W(),t=X();fe();const r=E(D(x.HVEM_PLANLEGGER)),s=E(D(x.OM_BARNET)),d=E(D(x.HVOR_LANG_PERIODE)),u=E(D(x.ARBEIDSSITUASJON)),l=D(x.FORDELING),f=U(x.FORDELING),T=E(U(x.HVOR_LANG_PERIODE)),g=e[v.HUNDRE_PROSENT],k=e[v.ÅTTI_PROSENT],j=d.dekningsgrad===v.HUNDRE_PROSENT?g:k,h=B(j),p=O=>{const K=O;T({dekningsgrad:K}),l&&f({antallDagerSøker1:Ae(K,e,l)})},m=de(u),M=r.type===V.FAR_OG_FAR&&(m==="kunSøker1HarRett"||m==="kunSøker2HarRett"),P=L(m,r,g,s),C=L(m,r,k,s),I=q(P),_=q(C),G=le(r),w=Y(j,s,r,u,l==null?void 0:l.antallDagerSøker1),i=ie(r,a),c=ge(r,a),J=!0,Q=Ce("screen and (min-width: 480)");return n.jsx("form",{children:n.jsx(ee,{steps:t,goToStep:o.goToNextStep,children:n.jsxs(F,{gap:"10",children:[n.jsx(ne,{size:"medium",spacing:!0,level:"2",children:n.jsx(S,{id:"OversiktSteg.Tittel",values:{erAleneforsørger:G}})}),n.jsx(z,{header:n.jsx(S,{id:"OversiktSteg.Infoboks.Utkast"}),color:"gray",icon:n.jsx(ye,{height:24,width:24,fontSize:"1-5rem","aria-hidden":!0}),children:n.jsx(ae,{children:n.jsx(S,{id:"OversiktSteg.Infoboks.Utkast.Tekst"})})}),M&&s.erFødsel&&n.jsx(z,{header:n.jsx(S,{id:"OversiktSteg.Infoboks.FarOgFar.DereHarOppgitt"}),icon:n.jsx(Te,{height:24,width:24,fontSize:"1.5rem",color:"#0067C5","aria-hidden":!0}),color:"green",children:n.jsxs("div",{children:[n.jsx(H,{children:n.jsx(S,{id:"OversiktSteg.Infoboks.FarOgFar.DenSomErBiologisk"})}),n.jsx(H,{children:n.jsx(S,{id:"OversiktSteg.Infoboks.FarOgFar.HvisDetErStebarnsadopsjon"})})]})}),n.jsxs(F,{gap:"1",children:[n.jsxs(N,{defaultValue:d==null?void 0:d.dekningsgrad,size:Q?"medium":"small",variant:"neutral",onChange:p,style:{width:"100%"},children:[n.jsx(N.Item,{value:v.HUNDRE_PROSENT,children:n.jsx(S,{id:"OversiktSteg.100",values:{uker:I.uker,dager:I.dager}})}),n.jsx(N.Item,{value:v.ÅTTI_PROSENT,children:n.jsx(S,{id:"OversiktSteg.80",values:{uker:_.uker,dager:_.dager}})})]}),m==="beggeHarRett"&&(!s.erFødsel||r.type!==V.FAR_OG_FAR)&&n.jsx(xe,{defaultValue:l==null?void 0:l.antallDagerSøker1,label:"",name:"antallDagerSøker1",onChange:O=>{f({antallDagerSøker1:parseInt(O.target.value,10)})},children:oe(h).map(O=>n.jsx("option",{value:O.antallUkerOgDagerSøker1.totaltAntallDager,children:se(a,O,r,i,c,J)},O.antallUkerOgDagerSøker1.totaltAntallDager))})]}),n.jsxs(F,{gap:"5",children:[n.jsx(Z,{uttaksdata:d.dekningsgrad===v.HUNDRE_PROSENT?P:C,hvemPlanlegger:r,barnet:s,hvemHarRett:m}),n.jsx("div",{className:Ge.calendar,children:n.jsx(pe,{periods:w})})]}),n.jsxs(F,{gap:"1",children:[n.jsx(ke,{arbeidssituasjon:u,barnet:s,hvemPlanlegger:r}),n.jsx(ve,{arbeidssituasjon:u,hvemPlanlegger:r,barnet:s})]}),n.jsx(me,{goToPreviousStep:o.goToPreviousDefaultStep,nextButtonOnClick:o.goToNextDefaultStep,useSimplifiedTexts:!0})]})})})};He.__docgenInfo={description:"",methods:[],displayName:"PlanenDeresSteg",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
