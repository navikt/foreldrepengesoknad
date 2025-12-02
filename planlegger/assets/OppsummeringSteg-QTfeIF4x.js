import{r as h,$ as Ae,a0 as y,aB as T,aC as ke,aD as be,aE as De,aA as Pe,aF as Se,aG as _e,aq as c,ab as D,j as e,aw as Me,ax as ge,ay as pe,V as P,W as G,a8 as ce,X as i,a1 as je,a2 as g,a3 as K,a5 as se,a6 as X,az as fe,a9 as ie,U as f,af as L,a4 as A,ah as Ie,aH as Le,aI as Be,aa as $,i as re,at as Ke,aJ as He,aK as ve}from"./iframe-BmBYrKFm.js";import{u as x,C as F,c as Ne}from"./usePlanleggerNavigator-DvYqRITx.js";import{h as ne,e as H,g as N,a as V,H as Q,j as Ve,k as ye}from"./HvemPlanleggerUtils-CdgfqY0S.js";import{b as le,e as oe,m as Ge}from"./barnetUtils-CDOjzT0b.js";import{u as ue,a as Ce,b as ze}from"./hvemHarRettUtils-DUoilJO5.js";import{u as Ue}from"./useScrollBehaviour-BvR4DsZ2.js";import{S as Ye}from"./ShareDataInfobox-qlyv28Ql.js";import{S as he}from"./TasklistStart-YLpD0qMo.js";import{b as We,g as Xe,a as $e}from"./BarnehageplassSteg-DTuwyHvJ.js";import{f as I,a as Ee}from"./satserUtils-CMa7w1al.js";import{c as Oe,d as xe,e as Z,a as Je,h as Qe,i as Ze,j as J}from"./uttakUtils-Zq1lGIMm.js";import{l as de}from"./umamiUtils-Bw37iN91.js";import{u as er}from"./useLagUttaksplanForslag-C4oiT_Kn.js";import{S as ae,a as rr}from"./Wallet-C9qoxy1m.js";var nr=function(r,t){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(a[n[s]]=r[n[s]]);return a};const ar=h.forwardRef((r,t)=>{var{title:a,titleId:n}=r,s=nr(r,["title","titleId"]);let l=Ae();return l=a?n||"title-"+l:void 0,y.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":l},s),a?y.createElement("title",{id:l},a):null,y.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var me=function(r,t){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(a[n[s]]=r[n[s]]);return a};const[tr,sr]=ke({name:"LinkAnchorOverlayContext"}),ir=h.forwardRef((r,t)=>{var{children:a,asChild:n,className:s,onClick:l}=r,o=me(r,["children","asChild","className","onClick"]);const{cn:u}=T(),m=h.useRef(null),v=n?be:"div";return y.createElement(tr,{anchorRef:m},y.createElement(v,Object.assign({ref:t},o,{className:u("navds-link-anchor__overlay",s),onClick:De(l,d=>{var b;if(d.target===m.current||ur(m.current))return;const p=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,ctrlKey:d.ctrlKey,shiftKey:d.shiftKey,altKey:d.altKey,metaKey:d.metaKey,button:d.button,screenX:d.screenX,screenY:d.screenY,clientX:d.clientX,clientY:d.clientY});(b=m.current)===null||b===void 0||b.dispatchEvent(p)})}),a))}),lr=h.forwardRef((r,t)=>{var{children:a,asChild:n,className:s}=r,l=me(r,["children","asChild","className"]);const{cn:o}=T(),u=sr(!1),m=_e(t,u?.anchorRef),v=n?be:"a";return y.createElement(v,Object.assign({ref:m},l,{className:o("navds-link-anchor",s)}),a)}),or=h.forwardRef((r,t)=>{var{className:a}=r,n=me(r,["className"]);const{cn:s}=T();return y.createElement(Pe,Object.assign({ref:t,"aria-hidden":!0,className:s("navds-link-anchor__arrow",a)},n))});function ur(r){var t,a;return!!(!((a=(t=Se(r))===null||t===void 0?void 0:t.getSelection())===null||a===void 0)&&a.toString())}var C=function(r,t){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(a[n[s]]=r[n[s]]);return a};const[dr,mr]=ke({name:"LinkCardContextProvider"}),j=h.forwardRef((r,t)=>{var{children:a,className:n,arrow:s=!0,arrowPosition:l="baseline",size:o="medium"}=r,u=C(r,["children","className","arrow","arrowPosition","size"]);const{cn:m}=T();return y.createElement(dr,{size:o},y.createElement(ir,{asChild:!0},y.createElement(c,Object.assign({as:"div",size:o,ref:t,"data-color":"neutral",className:m("navds-link-card",n,`navds-link-card--${o}`),"data-align-arrow":l},u),a,s&&y.createElement(or,{fontSize:o==="medium"?"1.75rem":"1.5rem",className:m("navds-link-card__arrow")}))))}),gr=h.forwardRef((r,t)=>{var{children:a,as:n="span",className:s}=r,l=C(r,["children","as","className"]);const{cn:o}=T(),u=mr();return y.createElement(D,Object.assign({ref:t,as:n,size:u.size==="medium"?"small":"xsmall",className:o("navds-link-card__title",s)},l),a)}),pr=lr,cr=h.forwardRef((r,t)=>{var{children:a,className:n}=r,s=C(r,["children","className"]);const{cn:l}=T();return y.createElement("div",Object.assign({ref:t,className:l("navds-link-card__description",n)},s),a)}),vr=h.forwardRef((r,t)=>{var{children:a,className:n}=r,s=C(r,["children","className"]);const{cn:l}=T();return y.createElement("div",Object.assign({ref:t,className:l("navds-link-card__footer",n)},s),a)}),yr=h.forwardRef((r,t)=>{var{children:a,className:n}=r,s=C(r,["children","className"]);const{cn:l}=T();return y.createElement("div",Object.assign({ref:t,"aria-hidden":!0,className:l("navds-link-card__icon",n)},s),a)}),kr=h.forwardRef((r,t)=>{var{children:a,className:n,aspectRatio:s,style:l}=r,o=C(r,["children","className","aspectRatio","style"]);const{cn:u}=T();return y.createElement("div",Object.assign({ref:t,className:u("navds-link-card__image-container",n),style:Object.assign(Object.assign({},l),{aspectRatio:s})},o),a)});j.Title=gr;j.Anchor=pr;j.Description=cr;j.Footer=vr;j.Icon=yr;j.Image=kr;const Fe=({children:r})=>e.jsx(Me,{header:e.jsxs(e.Fragment,{children:[e.jsx(ge,{below:"md",children:e.jsx(pe,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(G,{color:"lightBlue",size:"large",children:e.jsx(ce,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(D,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(ge,{above:"md",children:e.jsx(pe,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(G,{color:"lightBlue",size:"large",children:e.jsx(ce,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(D,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:r});Fe.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const Re=({erAlenesøker:r,barnet:t})=>e.jsx(je,{header:e.jsx(i,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:r}}),color:"gray",icon:e.jsx(he,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(g,{gap:"space-16",children:[e.jsx(K,{children:e.jsx(i,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:r,erAdopsjon:oe(t),erFødt:le(t)}})}),e.jsx(P,{children:e.jsx(se,{href:X.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(fe,{variant:"primary",children:e.jsx(i,{id:"SøkOmForeldrepenger.Søk"})})})})]})});Re.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const qe=({stønadskontoer:r,barnet:t,hvemPlanlegger:a,arbeidssituasjon:n,hvorLangPeriode:s,fordeling:l,satser:o})=>{const u=ie(),m=le(t),v=oe(t),d=t.antallBarn,b=ne(a),p=H(a),k=N(a,u),E=V(a,u),z=()=>ne(a)&&!a.navnPåFar?e.jsx(i,{id:"OppgittInformasjon.TekstFar1"}):N(a,u),R=()=>ne(a)&&!a.navnPåMedfar?e.jsx(i,{id:"OppgittInformasjon.TekstFar2"}):V(a,u),U=z(),Y=R(),S=ue(n),w=r[s.dekningsgrad],_=Oe(w),ee=xe(w),B=l?Z(l.antallDagerSøker1):void 0,M=l?Z(ee.totaltAntallDager-l.antallDagerSøker1):void 0,q=a.type===Q.FAR_OG_FAR&&!v,O=I(Ee(o)/2);return e.jsx(g,{gap:"space-40",children:e.jsxs(f,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(ar,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:p}})})]})}),e.jsx(f.Content,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(D,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:d}})}),t.erFødsel&&m&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:m,dato:u.formatDate(t.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:u.formatDate(t.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),t.erFødsel&&!m&&!v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:m,dato:u.formatDate(t.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:d,dato2:u.formatDate(t.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:u.formatDate(t.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(D,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Arbeid.Tittel"})}),p&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:A(k),arbeidssituasjon:n.status,minsteInntekt:O}})}),!p&&E&&e.jsxs(e.Fragment,{children:[S==="beggeHarRett"&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:k,navn2:E,arbeidssituasjon:n.status,minsteInntekt:O}})}),S!=="beggeHarRett"&&b&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:U??A(k),arbeidssituasjon:n.status,minsteInntekt:O}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:Y??A(E),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:O}})})]}),S!=="beggeHarRett"&&!b&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:A(k),arbeidssituasjon:n.status,minsteInntekt:O}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:A(E),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:O}})})]})]})]})}),e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(D,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:S!=="beggeHarRett"}})}),e.jsxs(c,{children:[!q&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:p,prosent:s.dekningsgrad,uker:_.uker,dager:_.dager,fellesuker:B?.uker||0,fellesdager:B?.dager||0,fellesuker2:M?.uker||0,fellesdager2:M?.dager||0,hvem:N(a,u),hvem2:V(a,u),kunEnPartSkalHa:S!=="beggeHarRett"}}),q&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:p,prosent:s.dekningsgrad,uker:_.uker,dager:_.dager}})]})]})})]})})]})})};qe.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto; '80': KontoBeregningDto }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}},{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""},hvorLangPeriode:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    dekningsgrad: Dekningsgrad;
}`,signature:{properties:[{key:"dekningsgrad",value:{name:"union",raw:"'80' | '100'",elements:[{name:"literal",value:"'80'"},{name:"literal",value:"'100'"}],required:!0}}]}},description:""},fordeling:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    antallDagerSøker1: number;
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""}}};const Te=({valgtStønadskonto:r,hvorLangPeriode:t,hvemPlanlegger:a,barnet:n,arbeidssituasjon:s,fordeling:l})=>{const o=ie(),u=x(F.UTTAKSPLAN),m=ue(s),v=xe(r).totaltAntallDager,d=l?Z(l.antallDagerSøker1):void 0,b=l?Z(v-l.antallDagerSøker1):void 0,p=Je(r),k=Ce(m,a)||ze(m,a),E=Ve(a,m),z=a.type===Q.FAR||a.type===Q.MOR,R=Oe(r),U=a.type===Q.FAR_OG_FAR,Y=N(a,o),S=ye(Y,o.locale),w=V(a,o),_=w?ye(w,o.locale):void 0,ee=We(n),B=l!==void 0,M=er(r),q=u?Qe(B,u,E):M.søker1,O=u?Ze(B,u,E):M.søker2;return e.jsx(g,{gap:"space-40",children:e.jsxs(f,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(Ie,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:H(a)}})})]})}),e.jsx(f.Content,{children:e.jsxs(g,{gap:"space-20",children:[m==="beggeHarRett"&&!U&&w&&_&&e.jsxs(L,{children:[e.jsxs(g,{gap:"space-8",children:[e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgte",values:{prosent:t.dekningsgrad,antallUker:R.uker,antallDager:R.dager,hvem:N(a,o),hvem2:V(a,o),uker:d?.uker||0,dager:d?.dager||0,uker2:b?.uker||0,dager2:b?.dager||0}})}),q.length>0&&e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:A(S),fom:o.formatDate(q[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(q.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})]}),e.jsx(e.Fragment,{children:O.length>0&&e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:A(_),fom:o.formatDate(O[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(O.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})})]}),(H(a)||U)&&e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:t.dekningsgrad,erAlenesøker:H(a),antallUker:R.uker,antallDager:R.dager}})}),q.length>0&&e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.Periode",values:{fom:o.formatDate(q[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(q.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})]})}),m==="kunSøker2HarRett"&&!U&&w&&e.jsx(L,{children:e.jsx(g,{gap:"space-8",children:e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:p.uker,dager1:p.dager,uker2:J(r).uker-p.uker,dager2:J(r).dager-p.dager,hvem:Y,prosent:t.dekningsgrad,antallUker:J(r).uker,dager:J(r).dager}})})})}),e.jsx(Le,{barn:Ge(n),erFarEllerMedmor:E,navnPåForeldre:{farMedmor:w||"",mor:Y},modus:"planlegger",valgtStønadskonto:r,aleneOmOmsorg:z,erMedmorDelAvSøknaden:!1,bareFarMedmorHarRett:k,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:B,saksperioder:u??[...M.søker1,...M.søker2],children:e.jsx(Be,{barnehagestartdato:ee,readOnly:!0})})]})})]})})};Te.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]}},description:""},hvorLangPeriode:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    dekningsgrad: Dekningsgrad;
}`,signature:{properties:[{key:"dekningsgrad",value:{name:"union",raw:"'80' | '100'",elements:[{name:"literal",value:"'80'"},{name:"literal",value:"'100'"}],required:!0}}]}},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: HvemPlanleggerType.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"HvemPlanleggerType.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    fødselsdato: string;
    termindato?: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    erBarnetFødt: boolean;
    termindato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"erBarnetFødt",value:{name:"boolean",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    erFødsel: boolean;
    antallBarn: string;
    overtakelsesdato: string;
    fødselsdato: string;
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    status?: Arbeidsstatus;
    jobberAnnenPart?: boolean;
}`,signature:{properties:[{key:"status",value:{name:"Arbeidsstatus",required:!1}},{key:"jobberAnnenPart",value:{name:"boolean",required:!1}}]}},description:""},fordeling:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    antallDagerSøker1: number;
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const te=({satser:r,lønnSøker:t,fornavn:a})=>{const n=$(x(F.HVEM_PLANLEGGER)),s=H(n),o=6*Ee(r),u=o/12,m=u/21.67,v=80/100,d=(p,k)=>Math.round(Math.min(p,u)*k),b=(p,k)=>Math.round(Math.min(p*12/260,m)*k);return e.jsx(g,{gap:"space-40",children:e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsxs(P,{justify:"space-between",wrap:!1,children:[e.jsx(D,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(i,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:A(a),erAlenesøker:s,utbetaling100:I(b(t,1)),utbetaling80:I(b(t,v))}})}),e.jsx(G,{size:"medium",color:"blue",children:e.jsx(ae,{height:24,width:24,color:"var(--ax-bg-accent-strong)",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:I(d(t,1)),utbetaling80:I(d(t,v))}})}),t>=u&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:I(o),a:p=>e.jsx(se,{href:X.grunnbeløpet,target:"_blank",rel:"noreferrer",children:p})}})}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:a,erAlenesøker:s}})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:s,hvem:a,inntekt:I(d(t,1))}})})]})})})};te.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const we=({satser:r})=>{const t=ie(),a=$(x(F.HVEM_PLANLEGGER)),n=$(x(F.HVOR_MYE)),s=N(a,t),l=V(a,t);return e.jsx(g,{gap:"space-40",children:(n.lønnSøker1!==void 0||n.lønnSøker2!==void 0)&&e.jsxs(f,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(rr,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(f.Content,{children:e.jsxs(g,{gap:"space-8",children:[n.lønnSøker1!==void 0&&s&&e.jsx(te,{satser:r,fornavn:s,lønnSøker:n.lønnSøker1}),n.lønnSøker2!==void 0&&l&&e.jsx(te,{satser:r,fornavn:l,lønnSøker:n.lønnSøker2})]})})]})})};we.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""}}};const br=({stønadskontoer:r,satser:t})=>{const a=Ne();Ue();const n=$(x(F.HVEM_PLANLEGGER)),s=$(x(F.OM_BARNET)),l=x(F.HVOR_LANG_PERIODE),o=x(F.ARBEIDSSITUASJON),u=x(F.FORDELING),m=x(F.HVOR_MYE),v=H(n),d=r&&l?r[l.dekningsgrad]:void 0,b=le(s)&&re(s.fødselsdato).isBefore(Ke),p=o?ue(o):"ingenHarRett",k=!b&&p!=="ingenHarRett",E=Xe(s),z=re().add(18,"weeks").add(3,"days").toDate(),R=oe(s);return e.jsxs(e.Fragment,{children:[e.jsx(Fe,{children:e.jsxs(g,{gap:"space-40",children:[e.jsxs(g,{gap:"space-20",children:[!k&&e.jsx(g,{gap:"space-20",children:e.jsxs(je,{header:v?e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(he,{height:24,width:24,color:"var(--ax-bg-success-strong)","aria-hidden":!0}),color:"green",children:[e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:v}})}),e.jsxs(K,{children:[e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(se,{inlineText:!0,href:X.veiviser,children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),r&&d&&l&&o&&e.jsxs(g,{gap:"space-8",children:[k&&e.jsx(Te,{valgtStønadskonto:d,hvorLangPeriode:l,hvemPlanlegger:n,barnet:s,arbeidssituasjon:o,fordeling:u}),m&&e.jsx(we,{satser:t}),!R&&e.jsx($e,{hvemPlanlegger:n,barnet:s}),e.jsx(qe,{stønadskontoer:r,barnet:s,hvemPlanlegger:n,arbeidssituasjon:o,hvorLangPeriode:l,fordeling:u,satser:t})]}),e.jsx(Ye,{erAlenesøker:v}),(k&&re(E).isBefore(z)||k&&R)&&e.jsx(Re,{erAlenesøker:v,barnet:s})]}),e.jsx(g,{gap:"space-40",children:e.jsx(P,{children:e.jsx(fe,{variant:"secondary",onClick:a.goToPreviousDefaultStep,icon:e.jsx(He,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(i,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:"bg-ax-neutral-200 pb-4",children:e.jsxs(g,{gap:"space-16",className:"mx-auto max-w-[560px] px-8 py-4",children:[e.jsx(D,{level:"2",size:"medium",children:e.jsx(i,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsxs(j,{size:"small",children:[e.jsx(ve,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(j.Icon,{children:e.jsx(ae,{height:43,width:43})})}),e.jsx(j.Title,{children:e.jsx(j.Anchor,{href:X.hvorMye,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserHvorMye"})})})]}),e.jsxs(j,{size:"small",children:[e.jsx(ve,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(j.Icon,{children:e.jsx(ae,{height:43,width:43})})}),e.jsx(j.Title,{children:e.jsx(j.Anchor,{href:X.veiviser,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserFpEllerEs"})})})]})]})})]})};br.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    80: KontoBeregningDto;
    100: KontoBeregningDto;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: KontoDto[];
    minsteretter: Minsteretter;
    tillegg?: Tillegg;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dager: number;
    konto: KontoTypeUttak;
}`,signature:{properties:[{key:"dager",value:{name:"number",required:!0}},{key:"konto",value:{name:"union",raw:`| 'MØDREKVOTE'
| 'FEDREKVOTE'
| 'FELLESPERIODE'
| 'FORELDREPENGER'
| 'FORELDREPENGER_FØR_FØDSEL'
| 'AKTIVITETSFRI_KVOTE'`,elements:[{name:"literal",value:"'MØDREKVOTE'"},{name:"literal",value:"'FEDREKVOTE'"},{name:"literal",value:"'FELLESPERIODE'"},{name:"literal",value:"'FORELDREPENGER'"},{name:"literal",value:"'FORELDREPENGER_FØR_FØDSEL'"},{name:"literal",value:"'AKTIVITETSFRI_KVOTE'"}],required:!0}}]}}],raw:"KontoDto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    farRundtFødsel: number;
    toTette: number;
}`,signature:{properties:[{key:"farRundtFødsel",value:{name:"number",required:!0}},{key:"toTette",value:{name:"number",required:!0}}]},required:!0}},{key:"tillegg",value:{name:"signature",type:"object",raw:`{
    flerbarn: number;
    prematur: number;
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    engangstønad: Array<{
        fom: string;
        verdi: number;
    }>;
    grunnbeløp: Array<{
        fom: string;
        verdi: number;
    }>;
}`,signature:{properties:[{key:"engangstønad",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}},{key:"grunnbeløp",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    verdi: number;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"verdi",value:{name:"number",required:!0}}]}}],raw:`Array<{
    fom: string;
    verdi: number;
}>`,required:!0}}]}},description:""}}};export{br as O};
