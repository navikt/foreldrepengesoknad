import{j as i}from"./jsx-runtime-CLpGMVip.js";import{r as g,R as E}from"./index-CR__hKHy.js";import"./index-DjWdgH6H.js";import"./dates-BoUBb6Xm.js";import{D as A,R as T}from"./DekningsgradDTO-DRRk0ium.js";import"./UttaksdagenString-ClXtFMGX.js";import{c as L,K as U,S as z,U as H,a as $}from"./UttaksplanKalender-CEvSC5OW.js";import{u as C}from"./useSelectedSak-C3cMD7ir.js";import{Y as x}from"./Ytelse-7td-ciMh.js";import{c as K,d as Q,u as q}from"./sakerUtils-Bk_ymF95.js";import{u as I}from"./useQuery-D4bRZ7iC.js";import{b as Y,c as J}from"./api-DD3Y1hVe.js";import{c as W,m as X,V as N,H as Z}from"./VStack-8aKLoWqK.js";import{B as ee}from"./Button-CDknUoqM.js";import{M as _}from"./message-CzTHpKKo.js";import{c as R,B as te,L as ne}from"./Label-uxnjPK_2.js";import{u as re,a as oe}from"./useId-CID_lvh_.js";import{c as k}from"./composeEventHandlers-BV8udL3-.js";import{u as ae}from"./ChevronDown-CtB47T9y.js";var se=function(e,o){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const le=g.forwardRef((e,o)=>{var{title:r,titleId:t}=e,n=se(e,["title","titleId"]);let a=re();return a=r?t||"title-"+a:void 0,g.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":a},n),r?g.createElement("title",{id:a},r):null,g.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});g.createContext(null);const[de,Ae,ie,ce]=L(),[ue,B]=W({name:"ToggleGroupContext",hookName:"useToggleGroupContext",providerName:"ToggleGroupProvider",errorMessage:"<ToggleGroup.Item> needs to be wrapped within <ToggleGroup>"});function fe({value:e,disabled:o=!1,onFocus:r,onClick:t,onKeyDown:n},a){const{setSelectedValue:c,setFocusedValue:f,selectedValue:l,focusedValue:p}=B(),{register:h,descendants:s}=ce({disabled:o,value:e}),y=e===l,b=()=>f(e),v=g.useCallback(m=>{const O=s.values().findIndex(d=>d.value===p),w={ArrowLeft:()=>{var d;const u=s.prevEnabled(O,!1);(d=u==null?void 0:u.node)===null||d===void 0||d.focus()},ArrowRight:()=>{var d;const u=s.nextEnabled(O,!1);(d=u==null?void 0:u.node)===null||d===void 0||d.focus()},Home:()=>{var d;const u=s.firstEnabled();(d=u==null?void 0:u.node)===null||d===void 0||d.focus()},End:()=>{var d;const u=s.lastEnabled();(d=u==null?void 0:u.node)===null||d===void 0||d.focus()}},D=m.shiftKey||m.ctrlKey||m.altKey||m.metaKey,j=w[m.key];j&&!D?(m.preventDefault(),j(m)):m.key==="Tab"&&l&&setTimeout(()=>f(l))},[s,p,l,f]);return{ref:X([h,a]),isSelected:y,isFocused:p===e,onClick:k(t,()=>l!==e&&c(e)),onFocus:o?void 0:k(r,b),onKeyDown:k(n,v)}}var me=function(e,o){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const pe=g.forwardRef((e,o)=>{var{className:r,children:t,icon:n,label:a,value:c,onClick:f,onFocus:l,onKeyDown:p}=e,h=me(e,["className","children","icon","label","value","onClick","onFocus","onKeyDown"]);const s=fe({value:c,onClick:f,onFocus:l,disabled:!1,onKeyDown:p},o),y=B();return E.createElement("button",Object.assign({},h,{ref:s.ref,className:R("navds-toggle-group__button",r),type:"button",role:"radio","aria-checked":s.isSelected,"data-selected":s.isSelected,tabIndex:s.isFocused?0:-1,onClick:s.onClick,onFocus:s.onFocus,onKeyDown:s.onKeyDown}),E.createElement(te,{as:"span",className:"navds-toggle-group__button-inner",size:y==null?void 0:y.size},t??E.createElement(E.Fragment,null,n,a)))});function ge({onChange:e,value:o,defaultValue:r=""}){const[t,n]=g.useState(r),[a,c]=ae({defaultValue:r,value:o,onChange:e});return g.useEffect(()=>{o!=null&&n(o)},[o]),{selectedValue:a,setSelectedValue:c,focusedValue:t,setFocusedValue:n}}var he=function(e,o){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const P=g.forwardRef((e,o)=>{var{className:r,children:t,onChange:n,size:a="medium",label:c,value:f,defaultValue:l,"aria-describedby":p,variant:h="action",fill:s=!1}=e,y=he(e,["className","children","onChange","size","label","value","defaultValue","aria-describedby","variant","fill"]);const b=ie(),v=ge({defaultValue:l,value:f,onChange:n}),m=Object.assign(Object.assign({},v),{size:a}),O=oe();return!f&&!l&&console.error("ToggleGroup without value or defaultvalue is not allowed"),!f&&!l&&console.error("ToggleGroup needs either a value or defaultValue"),E.createElement(de,{value:b},E.createElement(ue,Object.assign({},m),E.createElement("div",{className:R("navds-toggle-group__wrapper",r,{"navds-toggle-group__wrapper--fill":s})},c&&E.createElement(ne,{size:a,className:"navds-toggle-group__label",id:O},c),E.createElement("div",Object.assign({},y,{ref:o,className:R("navds-toggle-group",`navds-toggle-group--${a}`,`navds-toggle-group--${h}`),"aria-describedby":R(p,!!c&&O)||void 0,role:"radiogroup"}),t))))});P.Item=pe;const ye=typeof window<"u"&&window.matchMedia===void 0,be=(e,o)=>{const[r,t]=g.useState(o);return g.useEffect(()=>{if(ye)return;const n=window.matchMedia(e);t(n.matches);const a=c=>{t(c.matches)};return n.addEventListener("change",a),()=>{n.removeEventListener("change",a)}},[e]),r};function Ee(e){var a,c,f;const o=(e==null?void 0:e.ytelse)===x.FORELDREPENGER?K(e.familiehendelse):void 0,r=(e==null?void 0:e.ytelse)===x.FORELDREPENGER?(a=e.annenPart)==null?void 0:a.fnr:void 0,t=(e==null?void 0:e.ytelse)===x.FORELDREPENGER?(f=(c=e.barn)==null?void 0:c.find(l=>l.fnr!==void 0))==null?void 0:f.fnr:void 0,n=(e==null?void 0:e.ytelse)===x.FORELDREPENGER;return I({...Y({annenPartFødselsnummer:r,barnFødselsnummer:t,familiehendelse:o}),enabled:n})}const V=()=>{const e=C();return e&&e.ytelse===x.FORELDREPENGER?i.jsx(ve,{sak:e}):null},ve=({sak:e})=>{var l,p,h,s,y;const o=((l=Ee(e).data)==null?void 0:l.perioder)??[],r=I(J({brukerrolle:e.forelder==="MOR"?"MOR":"FAR",morHarUføretrygd:e.morUføretrygd,rettighetstype:e.rettighetType,omsorgsovertakelseDato:e.familiehendelse.omsorgsovertakelse,antallBarn:e.familiehendelse.antallBarn,termindato:e.familiehendelse.termindato,fødselsdato:e.familiehendelse.omsorgsovertakelse?void 0:e.familiehendelse.fødselsdato})),t=e.dekningsgrad===A.HUNDRE_PROSENT?(p=r.data)==null?void 0:p["100"]:(h=r.data)==null?void 0:h["80"];if(!t)return null;const n=(s=e.gjeldendeVedtak)==null?void 0:s.perioder,a=(y=e.åpenBehandling)==null?void 0:y.søknadsperioder,f=[...n??a??[],...o].filter(b=>{var m;return!b.resultat?!0:(m=b.resultat)==null?void 0:m.innvilget});return i.jsx(U,{konto:t,perioder:f,rettighetType:e.rettighetType,forelder:e.forelder})};V.__docgenInfo={description:"",methods:[],displayName:"KvoteOversikt"};const Oe=({annenPartsPerioder:e,navnPåForeldre:o})=>{var j,d;const r=C(),t=be("screen and (min-width: 768px)"),[n,a]=g.useState(!1);if(!r||r.ytelse!==x.FORELDREPENGER)return null;const c=(j=r.gjeldendeVedtak)==null?void 0:j.perioder,f=(d=r.åpenBehandling)==null?void 0:d.søknadsperioder,l=r.familiehendelse,p=r.sakTilhørerMor,h=r.gjelderAdopsjon,s=r.rettighetType,y=r.sakAvsluttet,b=c??f??[],v=!p,m=s===T.BARE_SØKER_RETT&&!p,O=s===T.BEGGE_RETT,F=p&&(T.BEGGE_RETT||T.BARE_SØKER_RETT),G=s===T.ALENEOMSORG,S=!O&&!F&&!G,M=K(l),w=Q(l,h),D=q(l,h);return i.jsxs(N,{gap:"10",children:[!y&&i.jsx(Z,{children:i.jsx(ee,{className:"mt-4",size:t?"small":"medium",variant:"secondary",onClick:()=>window.location.href="https://www.nav.no/foreldrepenger/soknad",children:i.jsx(_,{id:"DinPlan.EndrePlan"})})}),i.jsxs(N,{gap:"10",children:[i.jsxs(P,{defaultValue:n?"kalender":"plan",onChange:u=>a(u==="kalender"),fill:!0,children:[i.jsx(P.Item,{value:"plan",icon:i.jsx(le,{"aria-hidden":!0}),label:i.jsx(_,{id:"DinPlan.Liste"})}),i.jsx(P.Item,{value:"kalender",icon:i.jsx(z,{"aria-hidden":!0}),label:i.jsx(_,{id:"DinPlan.Kalender"})})]}),!n&&i.jsxs(i.Fragment,{children:[i.jsx(H,{barn:w,erFarEllerMedmor:v,familiehendelsedato:M,navnPåForeldre:o,annenPartsPerioder:e,søkersPerioder:b,gjelderAdopsjon:h,bareFarHarRett:m,familiesituasjon:D,førsteUttaksdagNesteBarnsSak:void 0,harAktivitetskravIPeriodeUtenUttak:S,modus:"innsyn",handleOnPlanChange:()=>null}),i.jsx(V,{})]}),n&&i.jsx($,{bareFarHarRett:m,barn:w,erFarEllerMedmor:v,harAktivitetskravIPeriodeUtenUttak:S,søkersPerioder:b,annenPartsPerioder:e,navnAnnenPart:v?o.mor:o.farMedmor})]})]})};Oe.__docgenInfo={description:"",methods:[],displayName:"DinPlan",props:{navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""},annenPartsPerioder:{required:!0,tsType:{name:"Array",elements:[{name:"SaksperiodeNy"}],raw:"SaksperiodeNy[]"},description:""}}};export{Oe as D,Ee as u};
