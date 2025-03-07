import{j as d}from"./jsx-runtime-CLpGMVip.js";import{r as y,R as E}from"./index-CR__hKHy.js";import"./index-DjWdgH6H.js";import"./dates-Ch5Wtujs.js";import{D as A,R as T}from"./DekningsgradDTO-DRRk0ium.js";import"./UttaksdagenString-Du8CFmse.js";import{c as L,K as U,U as z,a as H}from"./UttaksplanKalender-BMfLm_CE.js";import{u as N}from"./useSelectedSak-cmBlo-Cd.js";import{Y as x}from"./Ytelse-7td-ciMh.js";import{c as C,d as $,u as Q}from"./sakerUtils-DRp6qHjv.js";import{u as I}from"./useQuery-D4bRZ7iC.js";import{b as q,c as Y}from"./api-BLZsujro.js";import{V as M,H as J}from"./VStack-BZkCtxmu.js";import{c as W,m as X,u as K,B as Z,L as ee,d as ne}from"./Label-vuqQZ1tj.js";import{B as te}from"./Button-DEopYVou.js";import{M as _}from"./message-CzTHpKKo.js";import{u as re,a as oe}from"./useId-CID_lvh_.js";import{c as k}from"./composeEventHandlers-BV8udL3-.js";import{u as ae}from"./ChevronDown-CtB47T9y.js";import{S as se}from"./dateFormValidation-AZDviDWU.js";var le=function(e,o){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)o.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(r[n[t]]=e[n[t]]);return r};const de=y.forwardRef((e,o)=>{var{title:r,titleId:n}=e,t=le(e,["title","titleId"]);let a=re();return a=r?n||"title-"+a:void 0,y.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":a},t),r?y.createElement("title",{id:a},r):null,y.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});y.createContext(null);const[ie,Ue,ce,ue]=L(),[fe,B]=W({name:"ToggleGroupContext",hookName:"useToggleGroupContext",providerName:"ToggleGroupProvider",errorMessage:"<ToggleGroup.Item> needs to be wrapped within <ToggleGroup>"});function me({value:e,disabled:o=!1,onFocus:r,onClick:n,onKeyDown:t},a){const{setSelectedValue:c,setFocusedValue:f,selectedValue:s,focusedValue:h}=B(),{register:b,descendants:i}=ue({disabled:o,value:e}),m=e===s,g=()=>f(e),v=y.useCallback(p=>{const O=i.values().findIndex(l=>l.value===h),w={ArrowLeft:()=>{var l;const u=i.prevEnabled(O,!1);(l=u==null?void 0:u.node)===null||l===void 0||l.focus()},ArrowRight:()=>{var l;const u=i.nextEnabled(O,!1);(l=u==null?void 0:u.node)===null||l===void 0||l.focus()},Home:()=>{var l;const u=i.firstEnabled();(l=u==null?void 0:u.node)===null||l===void 0||l.focus()},End:()=>{var l;const u=i.lastEnabled();(l=u==null?void 0:u.node)===null||l===void 0||l.focus()}},D=p.shiftKey||p.ctrlKey||p.altKey||p.metaKey,R=w[p.key];R&&!D?(p.preventDefault(),R(p)):p.key==="Tab"&&s&&setTimeout(()=>f(s))},[i,h,s,f]);return{ref:X([b,a]),isSelected:m,isFocused:h===e,onClick:k(n,()=>s!==e&&c(e)),onFocus:o?void 0:k(r,g),onKeyDown:k(t,v)}}var pe=function(e,o){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)o.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(r[n[t]]=e[n[t]]);return r};const ge=y.forwardRef((e,o)=>{var{className:r,children:n,icon:t,label:a,value:c,onClick:f,onFocus:s,onKeyDown:h}=e,b=pe(e,["className","children","icon","label","value","onClick","onFocus","onKeyDown"]);const{cn:i}=K(),m=me({value:c,onClick:f,onFocus:s,disabled:!1,onKeyDown:h},o),g=B();return E.createElement("button",Object.assign({},b,{ref:m.ref,className:i("navds-toggle-group__button",r),type:"button",role:"radio","aria-checked":m.isSelected,"data-selected":m.isSelected,tabIndex:m.isFocused?0:-1,onClick:m.onClick,onFocus:m.onFocus,onKeyDown:m.onKeyDown}),E.createElement(Z,{as:"span",className:i("navds-toggle-group__button-inner"),size:g==null?void 0:g.size},n??E.createElement(E.Fragment,null,t,a)))});function he({onChange:e,value:o,defaultValue:r=""}){const[n,t]=y.useState(r),[a,c]=ae({defaultValue:r,value:o,onChange:e});return y.useEffect(()=>{o!=null&&t(o)},[o]),{selectedValue:a,setSelectedValue:c,focusedValue:n,setFocusedValue:t}}var ye=function(e,o){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&o.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)o.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(r[n[t]]=e[n[t]]);return r};const S=y.forwardRef((e,o)=>{var{className:r,children:n,onChange:t,size:a="medium",label:c,value:f,defaultValue:s,"aria-describedby":h,variant:b="action",fill:i=!1}=e,m=ye(e,["className","children","onChange","size","label","value","defaultValue","aria-describedby","variant","fill"]);const{cn:g}=K(),v=ce(),p=he({defaultValue:s,value:f,onChange:t}),O=Object.assign(Object.assign({},p),{size:a}),j=oe();return!f&&!s&&console.error("ToggleGroup without value or defaultvalue is not allowed"),!f&&!s&&console.error("ToggleGroup needs either a value or defaultValue"),E.createElement(ie,{value:v},E.createElement(fe,Object.assign({},O),E.createElement("div",{className:g("navds-toggle-group__wrapper",r,{"navds-toggle-group__wrapper--fill":i})},c&&E.createElement(ee,{size:a,className:g("navds-toggle-group__label"),id:j},c),E.createElement("div",Object.assign({},m,{ref:o,className:g("navds-toggle-group",`navds-toggle-group--${a}`,`navds-toggle-group--${b}`),"aria-describedby":ne(h,!!c&&j)||void 0,role:"radiogroup"}),n))))});S.Item=ge;const be=typeof window<"u"&&window.matchMedia===void 0,Ee=(e,o)=>{const[r,n]=y.useState(o);return y.useEffect(()=>{if(be)return;const t=window.matchMedia(e);n(t.matches);const a=c=>{n(c.matches)};return t.addEventListener("change",a),()=>{t.removeEventListener("change",a)}},[e]),r};function ve(e){var a,c,f;const o=(e==null?void 0:e.ytelse)===x.FORELDREPENGER?C(e.familiehendelse):void 0,r=(e==null?void 0:e.ytelse)===x.FORELDREPENGER?(a=e.annenPart)==null?void 0:a.fnr:void 0,n=(e==null?void 0:e.ytelse)===x.FORELDREPENGER?(f=(c=e.barn)==null?void 0:c.find(s=>s.fnr!==void 0))==null?void 0:f.fnr:void 0,t=(e==null?void 0:e.ytelse)===x.FORELDREPENGER;return I({...q({annenPartFødselsnummer:r,barnFødselsnummer:n,familiehendelse:o}),enabled:t})}const V=()=>{const e=N();return e&&e.ytelse===x.FORELDREPENGER?d.jsx(Oe,{sak:e}):null},Oe=({sak:e})=>{var s,h,b,i,m;const o=((s=ve(e).data)==null?void 0:s.perioder)??[],r=I(Y({brukerrolle:e.forelder==="MOR"?"MOR":"FAR",morHarUføretrygd:e.morUføretrygd,rettighetstype:e.rettighetType,omsorgsovertakelseDato:e.familiehendelse.omsorgsovertakelse,antallBarn:e.familiehendelse.antallBarn,termindato:e.familiehendelse.termindato,fødselsdato:e.familiehendelse.omsorgsovertakelse?void 0:e.familiehendelse.fødselsdato})),n=e.dekningsgrad===A.HUNDRE_PROSENT?(h=r.data)==null?void 0:h["100"]:(b=r.data)==null?void 0:b["80"];if(!n)return null;const t=(i=e.gjeldendeVedtak)==null?void 0:i.perioder,a=(m=e.åpenBehandling)==null?void 0:m.søknadsperioder,f=[...t??a??[],...o].filter(g=>{var p;return!g.resultat?!0:(p=g.resultat)==null?void 0:p.innvilget});return d.jsx(U,{familiehendelse:e.familiehendelse,konto:n,perioder:f,rettighetType:e.rettighetType,forelder:e.forelder,visStatusIkoner:!1})};V.__docgenInfo={description:"",methods:[],displayName:"KvoteOversikt"};const xe=({annenPartsPerioder:e,navnPåForeldre:o})=>{var R,l;const r=N(),n=Ee("screen and (min-width: 768px)"),[t,a]=y.useState(!1);if(!r||r.ytelse!==x.FORELDREPENGER)return null;const c=(R=r.gjeldendeVedtak)==null?void 0:R.perioder,f=(l=r.åpenBehandling)==null?void 0:l.søknadsperioder,s=r.familiehendelse,h=r.sakTilhørerMor,b=r.gjelderAdopsjon,i=r.rettighetType,m=r.sakAvsluttet,g=c??f??[],v=!h,p=i===T.BARE_SØKER_RETT&&!h,O=i===T.BEGGE_RETT,j=h&&(T.BEGGE_RETT||T.BARE_SØKER_RETT),F=i===T.ALENEOMSORG,P=!O&&!j&&!F,G=C(s),w=$(s,b),D=Q(s,b);return d.jsxs(M,{gap:"10",children:[!m&&d.jsx(J,{children:d.jsx(te,{className:"mt-4",size:n?"small":"medium",variant:"secondary",onClick:()=>window.location.href="https://www.nav.no/foreldrepenger/soknad",children:d.jsx(_,{id:"DinPlan.EndrePlan"})})}),d.jsxs(M,{gap:"10",children:[d.jsxs(S,{defaultValue:t?"kalender":"plan",onChange:u=>a(u==="kalender"),fill:!0,children:[d.jsx(S.Item,{value:"plan",icon:d.jsx(de,{"aria-hidden":!0}),label:d.jsx(_,{id:"DinPlan.Liste"})}),d.jsx(S.Item,{value:"kalender",icon:d.jsx(se,{"aria-hidden":!0}),label:d.jsx(_,{id:"DinPlan.Kalender"})})]}),!t&&d.jsxs(d.Fragment,{children:[d.jsx(z,{barn:w,erFarEllerMedmor:v,familiehendelsedato:G,navnPåForeldre:o,annenPartsPerioder:e,søkersPerioder:g,gjelderAdopsjon:b,bareFarHarRett:p,familiesituasjon:D,førsteUttaksdagNesteBarnsSak:void 0,harAktivitetskravIPeriodeUtenUttak:P,modus:"innsyn",handleOnPlanChange:()=>null,valgtStønadskonto:{}}),d.jsx(V,{})]}),t&&d.jsx(H,{bareFarHarRett:p,barn:w,erFarEllerMedmor:v,harAktivitetskravIPeriodeUtenUttak:P,søkersPerioder:g,annenPartsPerioder:e,navnAnnenPart:v?o.mor:o.farMedmor})]})]})};xe.__docgenInfo={description:"",methods:[],displayName:"DinPlan",props:{navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},annenPartsPerioder:{required:!0,tsType:{name:"Array",elements:[{name:"SaksperiodeNy"}],raw:"SaksperiodeNy[]"},description:""}}};export{xe as D,ve as u};
