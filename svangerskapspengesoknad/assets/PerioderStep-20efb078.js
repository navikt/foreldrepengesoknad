import{B as G,c as se,u as le,j as t,H as W,a as M,X as me,F as X}from"./Modal-5f6515f6.js";import{r as $,R as J}from"./index-f1f2c4b1.js";import{c as k,I as pe,f as x,d,i as n,p as ee,q as Q,S as ge,B as f,F as ce,a as ve,b as fe,h as Te}from"./fridagerUtils-89ecc5b6.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{n as O}from"./validation-631bcf6e.js";import{p as y,g as T,o as C,u as ue,a1 as j,a2 as Se,a3 as he,a4 as Pe,a5 as ye,a6 as je,a7 as be,a8 as ke,a9 as xe,aa as De,N as Ee,f as Ie,ab as Fe,ac as _e}from"./useFortsettSøknadSenere-905f921d.js";import{u as N,C as b,a as R,b as L}from"./routes-345f7acb.js";import{B as Be}from"./Bedriftsbanner-c68625a7.js";import{g as Oe,b as Ge,c as Y}from"./dateUtils-a13b77b7.js";import{H as Ae}from"./HorizontalLine-831b0129.js";import{i as Me}from"./tilretteleggingValidation-c80987db.js";import{B as Ne}from"./BackButton-f80f5ffe.js";import{P as Re}from"./Plus-b48ff6db.js";import{A as Le}from"./Alert-cf9fd4d3.js";var $e=globalThis&&globalThis.__rest||function(e,i){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&i.indexOf(r)<0&&(a[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(e);s<r.length;s++)i.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(a[r[s]]=e[r[s]]);return a};const Ce=$.forwardRef((e,i)=>{var{children:a,className:r,variant:s,size:l="medium",icon:m}=e,v=$e(e,["children","className","variant","size","icon"]);return J.createElement(G,Object.assign({},v,{ref:i,as:"span",size:l==="medium"?"medium":"small",className:se("navds-tag",r,`navds-tag--${s}`,`navds-tag--${l}`)}),m&&J.createElement("span",{className:"navds-tag__icon--left"},m),a)}),we=Ce,Ue=(e,i,a,r)=>{if(e&&e.varierendePerioder&&e.varierendePerioder[i]&&e.varierendePerioder[i].fom&&k(e.varierendePerioder[i].fom)&&(e.varierendePerioder[i].tomType===y.SISTE_DAG_MED_SVP||e.varierendePerioder[i].tom&&k(e.varierendePerioder[i].tom))){const s=e.varierendePerioder[i].tomType===y.SISTE_DAG_MED_SVP?a:pe(e.varierendePerioder[i].tom);return`${x(e.varierendePerioder[i].fom)} - ${x(s)}`}return r.formatMessage({id:"ny.periode"})},ze=(e,i)=>d(e.fom).isBetween(i.fom,i.tom,"day","[]")||d(e.tom).isBetween(i.fom,i.tom,"day","[]")||d(i.fom).isBetween(e.fom,e.tom,"day","[]")||d(i.tom).isBetween(e.fom,e.tom,"day","[]"),Z=(e,i)=>({fom:e,tom:i}),He=(e,i,a,r,s,l,m,v)=>o=>{const p=a&&a.length>0?a[i].tom:void 0,u=a&&a.length>0?a[i].tomType:void 0;if(!T(o))return n(e,"valideringsfeil.periode.fom.påkrevd");if(T(o)&&!k(o))return n(e,"valideringsfeil.periode.fom.gyldigDato");if(T(o)&&p&&ee(p,o))return n(e,"valideringsfeil.periode.fom.førTilDato");if(T(o)&&T(r)&&d(o).isBefore(d(r),"d"))return n(e,"valideringsfeil.periode.fom.førBehovForTilretteleggingFom");if(T(o)&&d(o).isAfter(d(s),"d"))return v?n(e,"valideringsfeil.periode.fom.etterTreUkerFørTermin"):n(e,"valideringsfeil.periode.fom.etterFødsel");if(m&&d(o).isAfter(d(m),"d")){const h=C(m,e);return n(e,"valideringsfeil.periode.fom.etterSluttDatoArbeid",{dato:x(m),navn:l,slutteTekst:h})}const _=We(o,p,u,a,i,e,s);return _||Xe(o,a,s,e)},qe=(e,i,a,r,s,l,m)=>v=>{const o=a&&a.length>0?a[i].fom:void 0;if(!T(v))return n(e,"valideringsfeil.periode.tom.påkrevd");if(T(v)&&!k(v))return n(e,"valideringsfeil.periode.tom.gyldigDato");if(T(v)&&o&&ee(v,o))return n(e,"valideringsfeil.periode.tom.etterTilDato");if(T(v)&&d(v).isAfter(d(r),"d"))return m?n(e,"valideringsfeil.periode.tom.etterTreUkerFørTermin"):n(e,"valideringsfeil.periode.tom.etterFødsel");if(l&&d(v).isAfter(d(l),"d")){const p=C(l,e);return n(e,"valideringsfeil.periode.tom.etterSluttDatoArbeid",{dato:x(l),navn:s,slutteTekst:p})}},Ke=(e,i,a,r,s)=>l=>{if(!T(l))return s?n(e,"valideringsfeil.periode.tomType.påkrevd.termin"):n(e,"valideringsfeil.periode.tomType.påkrevd.fødsel");if(r&&l===y.SISTE_DAG_MED_SVP&&d(i).isAfter(d(r),"d")){const m=C(r,e);return n(e,"valideringsfeil.periode.tomType.etterSluttDatoArbeid",{navn:a,slutteTekst:m})}},We=(e,i,a,r,s,l,m)=>{if((T(i)||T(a))&&T(e)&&r&&r.length>0){const o=r.filter((p,u)=>u>s).filter(p=>{let u;return T(p.tomType)&&p.tomType===y.SISTE_DAG_MED_SVP&&(u=Q(m)),T(p.tom)&&(u=p.tom),u?ze(Z(e,i||Q(m)),Z(p.fom,u)):!1});if(o.length>0){const p=o[0].tom?o[0].tom:m;return n(l,"valideringsfeil.periode.overlapper",{fom:x(o[0].fom),tom:x(p)})}}},Xe=(e,i,a,r)=>{const s=i?i.filter(o=>o.fom&&k(o.fom)).map(o=>d(o.fom)):void 0,l=s?d.min(s):void 0;if(l&&d(e).isSameOrBefore(l,"day"))return;const m=i?i.filter(o=>o.tom&&k(o.tom)||o.tomType===y.SISTE_DAG_MED_SVP).map(o=>o.tomType===y.SISTE_DAG_MED_SVP?d(a):d(o.tom)):void 0;if(!(m?m.find(o=>d(e).subtract(1,"d").isSame(d(o),"day")):void 0))return n(r,"valideringsfeil.periode.ikkeSammenhengende")};const V=({mellomlagreSøknadOgNaviger:e,avbrytSøknad:i,arbeidsforhold:a})=>{const r=le(),s=Ie(),[l,m]=$.useState(!1),v=ue(r,a),o=Te("perioderStep"),p=O(N(b.TILRETTELEGGINGER)),u=O(N(b.OM_BARNET)),_=O(N(b.VALGT_TILRETTELEGGING_ID)),[h]=$.useState(_),w=R(b.APP_ROUTE),re=R(b.TILRETTELEGGINGER),U=R(b.VALGT_TILRETTELEGGING_ID),S=O(p.find(g=>g.id===h)),P=Oe(u),z=p.length>1,D=S.arbeidsforhold.sluttdato,E=Ge(u),B=D?d.min(d(P),d(D)).toDate():P,A=new Date(S.behovForTilretteleggingFom),te=g=>{m(!0);const I=Fe(h,g,p);re(I);const F=_e(p,h);F?(U(F),w(L.SKJEMA)):w(L.OPPSUMMERING),e()},ie=()=>(U(h),e());return t.jsx(j.FormikWrapper,{enableReinitialize:!0,initialValues:Se(S),onSubmit:te,renderForm:({values:g})=>{const I=he(g.varierendePerioder,S.arbeidsforhold.stillinger),F=Pe(g.varierendePerioder,I),oe=ye(g,P);return t.jsx(ge,{bannerTitle:n(r,"søknad.pageheading"),activeStepId:`periode-${h}`,pageTitle:je(z,S.arbeidsforhold.navn,r),onCancel:i,steps:v,onContinueLater:s,children:t.jsxs(j.Form,{includeButtons:!1,includeValidationSummary:!0,children:[z&&t.jsx(f,{padBottom:"xxl",children:t.jsx(Be,{arbeid:S.arbeidsforhold})}),t.jsxs(f,{padBottom:"xl",children:[t.jsx(W,{size:"small",children:n(r,"perioder.varierende.heading")}),t.jsx(G,{children:be(E,r)})]}),t.jsx(ce,{validateOnChange:!1,name:ke.varierendePerioder,render:H=>g.varierendePerioder&&g.varierendePerioder.length>0&&g.varierendePerioder.map((ne,c)=>{const q=xe(F,ne,I),K=De(g.varierendePerioder[c].fom,A),ae=Y(K,B);return t.jsxs("div",{children:[t.jsxs(f,{padBottom:"xxl",children:[t.jsx(Ae,{}),t.jsxs(f,{padBottom:"l",className:o.element("info"),children:[t.jsx(we,{variant:"info",className:o.element("tag"),children:Ue(g,c,P,r)}),c!==0&&t.jsx(M,{icon:t.jsx(me,{"aria-hidden":!0}),type:"button",variant:"tertiary",onClick:()=>H.remove(c),children:n(r,"perioder.varierende.slett")})]}),t.jsx(j.DatePicker,{minDate:A,maxDate:B,name:`varierendePerioder.${c}.fom`,label:n(r,"perioder.varierende.fom.label"),validate:He(r,c,g.varierendePerioder,S.behovForTilretteleggingFom,P,S.arbeidsforhold.navn,D,E),dayPickerProps:{defaultMonth:Y(A,B)},placeholder:"dd.mm.åååå"},`varierendePerioder.${c}.fom`)]}),t.jsx(f,{padBottom:"xxl",children:t.jsx(j.RadioGroup,{name:`varierendePerioder.${c}.tomType`,legend:n(r,"perioder.varierende.tomType.label"),radios:Ee(r,E),validate:Ke(r,P,S.arbeidsforhold.navn,D,E)},`varierendePerioder.${c}.tomType`)}),t.jsx(f,{padBottom:"xxl",visible:g.varierendePerioder[c].tomType===y.VALGFRI_DATO,children:t.jsx(j.DatePicker,{name:`varierendePerioder.${c}.tom`,label:n(r,"perioder.varierende.tom.label"),validate:qe(r,c,g.varierendePerioder,P,S.arbeidsforhold.navn,D,E),minDate:K,maxDate:B,dayPickerProps:{defaultMonth:ae},placeholder:"dd.mm.åååå"},`varierendePerioder.${c}.tom`)}),t.jsxs(f,{padBottom:"xxl",children:[t.jsx(f,{padBottom:"m",children:t.jsx(j.NumberInput,{name:`varierendePerioder.${c}.stillingsprosent`,label:n(r,"perioder.varierende.stillingsprosent.label"),description:n(r,"tilrettelegging.tilrettelagtArbeidType.description"),validate:Me(r,q,F,g.varierendePerioder,I),onClick:de=>de.preventDefault()},`varierendePerioder.${c}.stillingsprosent`)}),t.jsxs(ve,{size:"medium",header:n(r,"tilrettelegging.varierendePerioderStillingsprosent.info.tittel"),children:[t.jsx(f,{padBottom:"l",children:t.jsx(G,{children:t.jsx(X,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del1"})})}),t.jsx(f,{children:t.jsx(G,{children:t.jsx(X,{id:"tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del2"})})})]})]}),q&&t.jsx(f,{padBottom:"xxl",children:t.jsxs(Le,{variant:"warning",children:[t.jsx(f,{padBottom:"m",children:t.jsx(W,{size:"small",children:n(r,"perioder.alert.nySøknad.title")})}),t.jsx(f,{padBottom:"m",children:n(r,"perioder.alert.nySøknad.del1")}),t.jsx(f,{padBottom:"m",children:n(r,"perioder.alert.nySøknad.del2")})]})}),g.varierendePerioder&&c===g.varierendePerioder.length-1&&t.jsx(f,{padBottom:"xl",children:t.jsx(M,{icon:t.jsx(Re,{"aria-hidden":!0}),type:"button",variant:"secondary",onClick:()=>H.push({...oe}),children:n(r,"perioder.varierende.leggTil")})})]},c)})}),t.jsx(f,{padBottom:"l",children:t.jsxs(fe,{children:[t.jsx(Ne,{mellomlagreSøknadOgNaviger:ie,route:L.TILRETTELEGGING}),t.jsx(M,{type:"submit",disabled:l,loading:l,children:n(r,"søknad.gåVidere")})]})})]})})}})};try{V.displayName="PerioderStep",V.__docgenInfo={description:"",displayName:"PerioderStep",props:{mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => Promise<void>"}},arbeidsforhold:{defaultValue:null,description:"",name:"arbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}}}}}catch{}export{V as P};
