import{j as e}from"./jsx-runtime-1caa8f64.js";import{ac as $,u as H,b as l,R as q,D as ae,H as b,U as L,d as re,l as J,A as se,S as oe,m as le}from"./dates-83aa686a.js";import{k as A,q as Q,r as W,p as X,j as ie,s as de,o as ue}from"./barnUtils-d0e8071c.js";import{D as d}from"./Dekningsgrad-fced8842.js";import{D as C}from"./eksisterendeSakUtils-259ea0dd.js";import"./index-753920cd.js";import{r as m}from"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{n as R,i as ge}from"./dateFormValidation-41a63f4e.js";import{u as S,C as u,a as ee}from"./FpDataContext-9c963fd7.js";import{s as ce,g as pe,a as K,u as me,b as _,c as ke,d as G,e as fe}from"./uttaksplanInfoUtils-9cf6bae6.js";import{R as ve}from"./useRequest-603f2ddc.js";import{u as Se,F as je,E as xe,R as Pe,S as he,a as Ee}from"./ErrorSummaryHookForm-d98d31a9.js";import{S as Fe}from"./Perioden-2b8e5e5b.js";import{c as O}from"./stringUtils-9a57a903.js";import{V as E,a as De,H as I,S as Te}from"./IntlProvider-39316729.js";import{g as y}from"./stønadskontoer-26d2a195.js";import{L as Re,B as V}from"./Link-d47e444a.js";import{B as M}from"./Box-580da37f.js";import{u as Ne,a as ye}from"./useFpNavigator-58f46fe6.js";var Ae=globalThis&&globalThis.__rest||function(t,s){var a={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&s.indexOf(n)<0&&(a[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(t);r<n.length;r++)s.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(t,n[r])&&(a[n[r]]=t[n[r]]);return a};const _e=m.forwardRef((t,s)=>{var{title:a,titleId:n}=t,r=Ae(t,["title","titleId"]);let o=$();return o=a?n||"title-"+o:void 0,m.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:s,"aria-labelledby":o},r),a?m.createElement("title",{id:o},a):null,m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M20.532 3.471A.748.748 0 0 1 20.75 4v7.5a.75.75 0 0 1-1.5 0V5.81l-8.72 8.72a.75.75 0 1 1-1.06-1.06l8.72-8.72H12.5a.75.75 0 0 1 0-1.5H20c.206 0 .393.083.529.218l.001.002.002.001ZM4.75 9A.25.25 0 0 1 5 8.75h7a.75.75 0 0 0 0-1.5H5A1.75 1.75 0 0 0 3.25 9v10c0 .966.784 1.75 1.75 1.75h10A1.75 1.75 0 0 0 16.75 19v-7a.75.75 0 0 0-1.5 0v7a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.25V9Z",fill:"currentColor"}))}),Oe=_e;var be=globalThis&&globalThis.__rest||function(t,s){var a={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&s.indexOf(n)<0&&(a[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(t);r<n.length;r++)s.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(t,n[r])&&(a[n[r]]=t[n[r]]);return a};const Ie=m.forwardRef((t,s)=>{var{title:a,titleId:n}=t,r=be(t,["title","titleId"]);let o=$();return o=a?n||"title-"+o:void 0,m.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:s,"aria-labelledby":o},r),a?m.createElement("title",{id:o},a):null,m.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M19.939 2.293a2.25 2.25 0 0 0-2.592 1.554 3.751 3.751 0 0 0-3.468.971l-.349-.348a.75.75 0 1 0-1.06 1.06l.216.217-2.127.912a2.75 2.75 0 0 0-.862.583l-6.02 6.02a1.75 1.75 0 0 0 0 2.475l4.586 4.586a1.75 1.75 0 0 0 2.474 0l6.021-6.02a2.75 2.75 0 0 0 .583-.862l.912-2.127.217.216a.75.75 0 1 0 1.06-1.06l-.348-.349a3.75 3.75 0 0 0 .971-3.468 2.249 2.249 0 0 0 .938-3.744 2.25 2.25 0 0 0-1.152-.616ZM19.5 5.25a.75.75 0 1 0-.75-.75 3.76 3.76 0 0 1 .75.75Zm-1.379 3.81A2.25 2.25 0 0 0 14.94 5.88L18.12 9.06ZM11.15 8.038l2.679-1.149 3.282 3.282-.034.079H8.81l1.947-1.947a1.25 1.25 0 0 1 .392-.265Zm-6.413 6.285 2.574-2.573h9.123l-.472 1.1a1.25 1.25 0 0 1-.265.392l-6.02 6.02a.25.25 0 0 1-.354 0l-4.586-4.585a.25.25 0 0 1 0-.354Z",fill:"currentColor"}))}),Z=Ie;const z=(t,s)=>{const a=Q(s),n=W(s),r=X(s),o=a?s.adopsjonsdato:r;if(!a&&n||!o)return;const i=y(t.filter(g=>g.konto!==Fe.ForeldrepengerFørFødsel))*5,k=L(o).denneEllerNeste(),f=L(k).leggTil(i-1);return re(f).format("dddd DD. MMMM YYYY")},Y=(t,s,a,n,r)=>{if(!a&&s)return t.formatMessage({id:"uttaksplaninfo.Uker.beskrivelseOmsorgsovertakelse"},{dato:r});if(!a&&!n)return t.formatMessage({id:"uttaksplaninfo.Uker.beskrivelseTermin"},{dato:r})},Ve=(t,s)=>s?t.formatMessage({id:"uttaksplaninfo.Uker.soker.dere"}):t.formatMessage({id:"uttaksplaninfo.Uker.soker.du"}),w=({goToPreviousDefaultStep:t,goToNextDefaultStep:s,barn:a,søkersituasjon:n,stønadskonto100:r,stønadskonto80:o})=>{const i=H(),k=J("circle"),f=S(u.PERIODE_MED_FORELDREPENGER),g=R(S(u.ANNEN_FORELDER)),F=ee(u.PERIODE_MED_FORELDREPENGER),P=Se({defaultValues:f}),c=ne=>(F(ne),s()),j=A(g)&&(g.harRettPåForeldrepengerINorge===!0||g.harRettPåForeldrepengerIEØS===!0),D=Q(a),v=W(a),h=X(a),T=ce(v,h,n.situasjon),p=T&&v&&h?pe(v,h):void 0,N=z(r,a),te=z(o,a),x=Ve(i,j);return e.jsx(je,{formMethods:P,onSubmit:c,children:e.jsxs(E,{gap:"10",children:[e.jsx(xe,{}),e.jsxs(E,{gap:"4",children:[e.jsxs(Pe,{name:"dekningsgrad",description:j?e.jsx(l,{id:"uttaksplaninfo.dekningsgrad.beskrivelse"}):e.jsx(l,{id:"uttaksplaninfo.dekningsgrad.beskrivelse.alene"}),label:j?e.jsx(l,{id:"uttaksplaninfo.dekningsgrad.label.deltUttak"}):e.jsx(l,{id:"uttaksplaninfo.dekningsgrad.label.ikkeDeltUttak"}),validate:[ge(i.formatMessage({id:"DekningsgradForm.MåOppgiDekningsgrad"},{soker:x}))],children:[e.jsx(q,{value:d.HUNDRE_PROSENT,description:Y(i,D,n.rolle==="far",!!v,N),children:e.jsx(l,{id:"uttaksplaninfo.49Uker",values:{antallUker:y(r)}})}),e.jsx(q,{value:d.ÅTTI_PROSENT,description:Y(i,D,n.rolle==="far",!!v,te),children:e.jsx(l,{id:"uttaksplaninfo.59Uker",values:{antallUker:y(o)}})})]}),e.jsxs(ae,{header:j?e.jsx(l,{id:"uttaksplaninfo.veileder.dekningsgrad.header"}):e.jsx(l,{id:"uttaksplaninfo.veileder.dekningsgrad.header.alene"}),children:[e.jsx(l,{id:"uttaksplaninfo.veileder.dekningsgrad"}),e.jsxs(Re,{href:De.søknadsfrister,target:"_blank",children:[e.jsx(l,{id:"uttaksplaninfo.veileder.dekningsgrad.link"}),e.jsx(Oe,{title:"a11y-title",fontSize:"1.5rem"})]})]})]}),T&&!!p&&e.jsx(M,{padding:"4",background:"surface-action-subtle",children:e.jsxs(I,{justify:"space-between",align:"start",children:[e.jsxs(E,{gap:"2",style:{width:"85%"},children:[e.jsx(b,{size:"xsmall",children:e.jsx(l,{id:"DekningsgradForm.InformasjonPrematurukerHeader",values:{soker:O(x)}})}),e.jsx(V,{children:e.jsx(l,{id:"DekningsgradForm.InformasjonPrematuruker",values:{uker:Math.floor(p/5),dager:p%5,soker:j?i.formatMessage({id:"uttaksplaninfo.Uker.soker.dere"}):i.formatMessage({id:"uttaksplaninfo.Uker.soker.deg"})}})})]}),e.jsx("div",{className:k.block,children:e.jsx(Z,{height:24,width:24,color:"#3386E0"})})]})}),a.antallBarn>1&&e.jsx(M,{padding:"4",background:"surface-action-subtle",children:e.jsxs(I,{justify:"space-between",align:"start",children:[e.jsxs(E,{gap:"2",style:{width:"85%"},children:[e.jsxs(b,{size:"xsmall",children:[a.antallBarn===2&&e.jsx(l,{id:"DekningsgradForm.InformasjonToBarn",values:{sokerStorBokstav:O(x),soker:x}}),a.antallBarn>2&&e.jsx(l,{id:"DekningsgradForm.InformasjonFlereEnnToBarn",values:{sokerStorBokstav:O(x),soker:x}})]}),e.jsx(V,{children:e.jsx(l,{id:"DekningsgradForm.InformasjonFlerbarnUker",values:{uker80:K(d.ÅTTI_PROSENT,a.antallBarn),uker100:K(d.HUNDRE_PROSENT,a.antallBarn),soker:x}})})]}),e.jsx("div",{className:k.block,children:e.jsx(Z,{height:24,width:24,color:"#3386E0"})})]})}),e.jsx(he,{goToPreviousStep:t})]})})};try{w.displayName="DekningsgradForm",w.__docgenInfo={description:"",displayName:"DekningsgradForm",props:{goToPreviousDefaultStep:{defaultValue:null,description:"",name:"goToPreviousDefaultStep",required:!0,type:{name:"() => Promise<void>"}},goToNextDefaultStep:{defaultValue:null,description:"",name:"goToNextDefaultStep",required:!0,type:{name:"() => Promise<void>"}},barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}},søkersituasjon:{defaultValue:null,description:"",name:"søkersituasjon",required:!0,type:{name:"SøkersituasjonFp"}},stønadskonto100:{defaultValue:null,description:"",name:"stønadskonto100",required:!0,type:{name:"TilgjengeligStønadskonto[]"}},stønadskonto80:{defaultValue:null,description:"",name:"stønadskonto80",required:!0,type:{name:"TilgjengeligStønadskonto[]"}}}}}catch{}const B=({goToPreviousDefaultStep:t,goToNextDefaultStep:s,fornavnAnnenForelder:a,kjønnAnnenForelder:n,dekningsgrad:r,valgtStønadskonto:o})=>{const i=H(),k=J("circle"),f=ee(u.PERIODE_MED_FORELDREPENGER),[g,F]=m.useState(!1),P=()=>(F(!0),f({dekningsgrad:r}),s()),c=y(o);return e.jsxs(E,{gap:"10",children:[e.jsx(M,{padding:"4",background:"surface-action-subtle",children:e.jsxs(I,{justify:"space-between",align:"start",children:[e.jsxs(E,{gap:"2",style:{width:"85%"},children:[e.jsx(b,{size:"xsmall",children:e.jsx(l,{id:"DekningsgradValgtAvAnnenPartPanel.Heading",values:{uker:se(c*5,i),dekningsgrad:r}})}),e.jsx(V,{children:n==="M"?e.jsx(l,{id:"DekningsgradValgtAvAnnenPartPanel.ValgtAvHans",values:{navn:a}}):e.jsx(l,{id:"DekningsgradValgtAvAnnenPartPanel.ValgtAvHennes",values:{navn:a}})})]}),e.jsx("div",{className:k.block,children:e.jsx(Ee,{height:24,width:24,color:"#3386E0"})})]})}),e.jsx(Te,{isDisabledAndLoading:g,nextButtonOnClick:P,goToPreviousStep:t})]})};try{B.displayName="DekningsgradValgtAvAnnenPartPanel",B.__docgenInfo={description:"",displayName:"DekningsgradValgtAvAnnenPartPanel",props:{goToPreviousDefaultStep:{defaultValue:null,description:"",name:"goToPreviousDefaultStep",required:!0,type:{name:"() => Promise<void>"}},goToNextDefaultStep:{defaultValue:null,description:"",name:"goToNextDefaultStep",required:!0,type:{name:"() => Promise<void>"}},fornavnAnnenForelder:{defaultValue:null,description:"",name:"fornavnAnnenForelder",required:!0,type:{name:"string"}},kjønnAnnenForelder:{defaultValue:null,description:"",name:"kjønnAnnenForelder",required:!1,type:{name:"enum",value:[{value:'"M"'},{value:'"K"'}]}},dekningsgrad:{defaultValue:null,description:"",name:"dekningsgrad",required:!0,type:{name:"enum",value:[{value:'"80"'},{value:'"100"'}]}},valgtStønadskonto:{defaultValue:null,description:"",name:"valgtStønadskonto",required:!0,type:{name:"TilgjengeligStønadskonto[]"}}}}}catch{}const Me=(t,s)=>{var r;const a=A(t)&&t.utenlandskFnr===!1?t.fnr:void 0,n=de(s)&&s.fnr!==void 0&&((r=s.fnr)==null?void 0:r.length)>0?s.fnr[0]:void 0;return{annenPartFødselsnummer:a,barnFødselsnummer:n,familiehendelse:ue(s)}},we=t=>{const s=A(t)&&t.utenlandskFnr!==!0?t.fnr:void 0;return!(s!==void 0&&s!=="")},U=({mellomlagreSøknadOgNaviger:t,avbrytSøknad:s})=>{const a=H(),n=Ne(),r=ye(t),o=R(S(u.ANNEN_FORELDER)),i=R(S(u.OM_BARNET)),k=R(S(u.SØKER_DATA)),f=R(S(u.SØKERSITUASJON)),g=S(u.BARN_FRA_NESTE_SAK),F=S(u.EKSISTERENDE_SAK),P=we(o),{data:c,requestStatus:j}=me(_.ANNEN_PART_VEDTAK,Me(o,i),P),D=ke(i,o,f,k,g,c,F),v=P?!1:j!==ve.FINISHED,{data:h}=G(_.STØNADSKONTOER_80,D.stønadskontoParams80,v),{data:T}=G(_.STØNADSKONTOER_100,D.stønadskontoParams100,v),p=h&&T?fe(h,T):void 0,N=c&&c.perioder.length>0;return e.jsxs(oe,{bannerTitle:a.formatMessage({id:"søknad.pageheading"}),onCancel:s,onContinueLater:r.fortsettSøknadSenere,steps:n,children:[!p&&e.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:e.jsx(le,{size:"2xlarge"})}),p&&e.jsxs(e.Fragment,{children:[N&&A(o)&&e.jsx(B,{goToPreviousDefaultStep:r.goToPreviousDefaultStep,goToNextDefaultStep:r.goToNextDefaultStep,fornavnAnnenForelder:o.fornavn,kjønnAnnenForelder:ie(o),dekningsgrad:c.dekningsgrad===C.HUNDRE_PROSENT?d.HUNDRE_PROSENT:d.ÅTTI_PROSENT,valgtStønadskonto:p[c.dekningsgrad===C.HUNDRE_PROSENT?d.HUNDRE_PROSENT:d.ÅTTI_PROSENT]}),!N&&e.jsx(w,{goToPreviousDefaultStep:r.goToPreviousDefaultStep,goToNextDefaultStep:r.goToNextDefaultStep,barn:i,søkersituasjon:f,stønadskonto100:p[d.HUNDRE_PROSENT],stønadskonto80:p[d.ÅTTI_PROSENT]})]})]})},st=U;try{U.displayName="PeriodeMedForeldrepengerSteg",U.__docgenInfo={description:"",displayName:"PeriodeMedForeldrepengerSteg",props:{mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}export{st as P};
