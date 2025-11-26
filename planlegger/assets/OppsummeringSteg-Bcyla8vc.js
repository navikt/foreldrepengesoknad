import{r as O,$ as _e,a0 as k,aB as q,aC as be,aD as je,aE as Me,aA as Ie,aF as Le,aG as Be,aq as c,ab as S,j as e,aw as He,ax as ge,ay as pe,V as P,W as C,a8 as ce,X as i,a1 as fe,a2 as g,a3 as K,a5 as ie,a6 as X,az as Ee,a9 as le,U as f,af as L,a4 as D,aH as ve,aa as z,ah as Ke,aI as Ne,aJ as Ve,i as ne,at as Ge,aK as Ce,aL as ye}from"./iframe-zmjYcO9I.js";import{u as E,C as h,c as ze}from"./usePlanleggerNavigator-Bf01xAyW.js";import{h as ae,e as N,g as V,a as G,H as M,j as Ue,A as Ye,k as ke}from"./HvemPlanleggerUtils-C_6u9qRw.js";import{b as oe,e as Z,m as We}from"./barnetUtils-_VBoVJ7V.js";import{u as ue,a as Xe,b as $e}from"./hvemHarRettUtils-BedZ6-kg.js";import{u as Je}from"./useScrollBehaviour-B08UCJVd.js";import{S as Qe}from"./ShareDataInfobox-D8NUDyWO.js";import{S as he}from"./TasklistStart-BnnzxlqI.js";import{b as Ze,g as er,a as rr}from"./BarnehageplassSteg-BtVExF1n.js";import{f as I,a as Oe}from"./satserUtils-D2DNsN7v.js";import{c as Fe,d as Re,e as Q,g as nr,a as ar,l as tr,h as J}from"./uttakUtils-BUQgDoiV.js";import{l as de}from"./umamiUtils-Bw37iN91.js";import{S as te,a as sr}from"./Wallet-dSMKM-df.js";var ir=function(r,t){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(a[n[s]]=r[n[s]]);return a};const lr=O.forwardRef((r,t)=>{var{title:a,titleId:n}=r,s=ir(r,["title","titleId"]);let l=_e();return l=a?n||"title-"+l:void 0,k.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":l},s),a?k.createElement("title",{id:l},a):null,k.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var me=function(r,t){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(a[n[s]]=r[n[s]]);return a};const[or,ur]=be({name:"LinkAnchorOverlayContext"}),dr=O.forwardRef((r,t)=>{var{children:a,asChild:n,className:s,onClick:l}=r,u=me(r,["children","asChild","className","onClick"]);const{cn:o}=q(),m=O.useRef(null),v=n?je:"div";return k.createElement(or,{anchorRef:m},k.createElement(v,Object.assign({ref:t},u,{className:o("navds-link-anchor__overlay",s),onClick:Me(l,d=>{var b;if(d.target===m.current||pr(m.current))return;const p=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,ctrlKey:d.ctrlKey,shiftKey:d.shiftKey,altKey:d.altKey,metaKey:d.metaKey,button:d.button,screenX:d.screenX,screenY:d.screenY,clientX:d.clientX,clientY:d.clientY});(b=m.current)===null||b===void 0||b.dispatchEvent(p)})}),a))}),mr=O.forwardRef((r,t)=>{var{children:a,asChild:n,className:s}=r,l=me(r,["children","asChild","className"]);const{cn:u}=q(),o=ur(!1),m=Be(t,o?.anchorRef),v=n?je:"a";return k.createElement(v,Object.assign({ref:m},l,{className:u("navds-link-anchor",s)}),a)}),gr=O.forwardRef((r,t)=>{var{className:a}=r,n=me(r,["className"]);const{cn:s}=q();return k.createElement(Ie,Object.assign({ref:t,"aria-hidden":!0,className:s("navds-link-anchor__arrow",a)},n))});function pr(r){var t,a;return!!(!((a=(t=Le(r))===null||t===void 0?void 0:t.getSelection())===null||a===void 0)&&a.toString())}var U=function(r,t){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(a[n[s]]=r[n[s]]);return a};const[cr,vr]=be({name:"LinkCardContextProvider"}),j=O.forwardRef((r,t)=>{var{children:a,className:n,arrow:s=!0,arrowPosition:l="baseline",size:u="medium"}=r,o=U(r,["children","className","arrow","arrowPosition","size"]);const{cn:m}=q();return k.createElement(cr,{size:u},k.createElement(dr,{asChild:!0},k.createElement(c,Object.assign({as:"div",size:u,ref:t,"data-color":"neutral",className:m("navds-link-card",n,`navds-link-card--${u}`),"data-align-arrow":l},o),a,s&&k.createElement(gr,{fontSize:u==="medium"?"1.75rem":"1.5rem",className:m("navds-link-card__arrow")}))))}),yr=O.forwardRef((r,t)=>{var{children:a,as:n="span",className:s}=r,l=U(r,["children","as","className"]);const{cn:u}=q(),o=vr();return k.createElement(S,Object.assign({ref:t,as:n,size:o.size==="medium"?"small":"xsmall",className:u("navds-link-card__title",s)},l),a)}),kr=mr,br=O.forwardRef((r,t)=>{var{children:a,className:n}=r,s=U(r,["children","className"]);const{cn:l}=q();return k.createElement("div",Object.assign({ref:t,className:l("navds-link-card__description",n)},s),a)}),jr=O.forwardRef((r,t)=>{var{children:a,className:n}=r,s=U(r,["children","className"]);const{cn:l}=q();return k.createElement("div",Object.assign({ref:t,className:l("navds-link-card__footer",n)},s),a)}),fr=O.forwardRef((r,t)=>{var{children:a,className:n}=r,s=U(r,["children","className"]);const{cn:l}=q();return k.createElement("div",Object.assign({ref:t,"aria-hidden":!0,className:l("navds-link-card__icon",n)},s),a)}),Er=O.forwardRef((r,t)=>{var{children:a,className:n,aspectRatio:s,style:l}=r,u=U(r,["children","className","aspectRatio","style"]);const{cn:o}=q();return k.createElement("div",Object.assign({ref:t,className:o("navds-link-card__image-container",n),style:Object.assign(Object.assign({},l),{aspectRatio:s})},u),a)});j.Title=yr;j.Anchor=kr;j.Description=br;j.Footer=jr;j.Icon=fr;j.Image=Er;const xe=({children:r})=>e.jsx(He,{header:e.jsxs(e.Fragment,{children:[e.jsx(ge,{below:"md",children:e.jsx(pe,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(C,{color:"lightBlue",size:"large",children:e.jsx(ce,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(S,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(ge,{above:"md",children:e.jsx(pe,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(C,{color:"lightBlue",size:"large",children:e.jsx(ce,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(S,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:r});xe.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const qe=({erAlenesøker:r,barnet:t})=>e.jsx(fe,{header:e.jsx(i,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:r}}),color:"gray",icon:e.jsx(he,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(g,{gap:"space-16",children:[e.jsx(K,{children:e.jsx(i,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:r,erAdopsjon:Z(t),erFødt:oe(t)}})}),e.jsx(P,{children:e.jsx(ie,{href:X.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(Ee,{variant:"primary",children:e.jsx(i,{id:"SøkOmForeldrepenger.Søk"})})})})]})});qe.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const Te=({stønadskontoer:r,barnet:t,hvemPlanlegger:a,arbeidssituasjon:n,hvorLangPeriode:s,fordeling:l,satser:u})=>{const o=le(),m=oe(t),v=Z(t),d=t.antallBarn,b=ae(a),p=N(a),y=V(a,o),x=G(a,o),B=()=>ae(a)&&!a.navnPåFar?e.jsx(i,{id:"OppgittInformasjon.TekstFar1"}):V(a,o),_=()=>ae(a)&&!a.navnPåMedfar?e.jsx(i,{id:"OppgittInformasjon.TekstFar2"}):G(a,o),ee=B(),F=_(),R=ue(n),H=r[s.dekningsgrad],T=Fe(H),re=Re(H),w=l?Q(l.antallDagerSøker1):void 0,Y=l?Q(re.totaltAntallDager-l.antallDagerSøker1):void 0,$=a.type===M.FAR_OG_FAR&&!v,A=I(Oe(u)/2);return e.jsx(g,{gap:"space-40",children:e.jsxs(f,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(C,{size:"medium",color:"lightBlue",children:e.jsx(lr,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:p}})})]})}),e.jsx(f.Content,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:d}})}),t.erFødsel&&m&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:m,dato:o.formatDate(t.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:o.formatDate(t.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),t.erFødsel&&!m&&!v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:m,dato:o.formatDate(t.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:d,dato2:o.formatDate(t.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:o.formatDate(t.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Arbeid.Tittel"})}),p&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:D(y),arbeidssituasjon:n.status,minsteInntekt:A}})}),!p&&x&&e.jsxs(e.Fragment,{children:[R==="beggeHarRett"&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:y,navn2:x,arbeidssituasjon:n.status,minsteInntekt:A}})}),R!=="beggeHarRett"&&b&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:ee??D(y),arbeidssituasjon:n.status,minsteInntekt:A}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:F??D(x),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:A}})})]}),R!=="beggeHarRett"&&!b&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:D(y),arbeidssituasjon:n.status,minsteInntekt:A}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:D(x),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:A}})})]})]})]})}),e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:R!=="beggeHarRett"}})}),e.jsxs(c,{children:[!$&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:p,prosent:s.dekningsgrad,uker:T.uker,dager:T.dager,fellesuker:w?.uker||0,fellesdager:w?.dager||0,fellesuker2:Y?.uker||0,fellesdager2:Y?.dager||0,hvem:V(a,o),hvem2:G(a,o),kunEnPartSkalHa:R!=="beggeHarRett"}}),$&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:p,prosent:s.dekningsgrad,uker:T.uker,dager:T.dager}})]})]})})]})})]})})};Te.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto; '80': KontoBeregningDto }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const we=({valgtStønadskonto:r,hvorLangPeriode:t,hvemPlanlegger:a,barnet:n,arbeidssituasjon:s,fordeling:l})=>{const u=le(),o=ue(s),m=nr(n),v=Re(r).totaltAntallDager,d=l?Q(l.antallDagerSøker1):void 0,b=l?Q(v-l.antallDagerSøker1):void 0,p=ar(r),y=Xe(o,a)||$e(o,a);let x;(a.type===M.MOR_OG_MEDMOR||a.type===M.MOR_OG_FAR)&&o==="kunSøker2HarRett"&&(x=ve(ve(m).denneEllerNeste()).leggTil(30));const B=Ue(a,o),_=a.type===M.FAR||a.type===M.MOR,ee=Z(n),F=tr({erDeltUttak:l!==void 0,famDato:m,tilgjengeligeStønadskontoer:r.kontoer,fellesperiodeDagerMor:l?.antallDagerSøker1,bareFarMedmorHarRett:y,erAdopsjon:ee,erFarEllerMedmor:B,startdato:x,erMorUfør:s?.status===Ye.UFØR,erAleneOmOmsorg:_,farOgFar:a.type===M.FAR_OG_FAR}),R=Fe(r),H=a.type===M.FAR_OG_FAR,T=V(a,u),re=ke(T,u.locale),w=G(a,u),Y=w?ke(w,u.locale):void 0,$=Ze(n),A=E(h.UTTAKSPLAN),De=z(E(h.TILPASS_PLAN)),Se=A?.at(-1)??[],Pe=l!==void 0;return e.jsx(g,{gap:"space-40",children:e.jsxs(f,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(C,{size:"medium",color:"lightBlue",children:e.jsx(Ke,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:N(a)}})})]})}),e.jsx(f.Content,{children:e.jsxs(g,{gap:"space-20",children:[o==="beggeHarRett"&&!H&&w&&Y&&e.jsxs(L,{children:[e.jsxs(g,{gap:"space-8",children:[e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgte",values:{prosent:t.dekningsgrad,antallUker:R.uker,antallDager:R.dager,hvem:V(a,u),hvem2:G(a,u),uker:d?.uker||0,dager:d?.dager||0,uker2:b?.uker||0,dager2:b?.dager||0}})}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:D(re),fom:u.formatDate(F.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(F.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})]}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:D(Y),fom:u.formatDate(F.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(F.søker2.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})]}),(N(a)||H)&&e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:t.dekningsgrad,erAlenesøker:N(a),antallUker:R.uker,antallDager:R.dager}})}),e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.Periode",values:{fom:u.formatDate(F.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(F.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})]})}),o==="kunSøker2HarRett"&&!H&&w&&e.jsx(L,{children:e.jsx(g,{gap:"space-8",children:e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:p.uker,dager1:p.dager,uker2:J(r).uker-p.uker,dager2:J(r).dager-p.dager,hvem:T,prosent:t.dekningsgrad,antallUker:J(r).uker,dager:J(r).dager}})})})}),e.jsx(Ne,{barn:We(n),erFarEllerMedmor:B,navnPåForeldre:{farMedmor:w||"",mor:T},modus:"planlegger",valgtStønadskonto:{},aleneOmOmsorg:_,erMedmorDelAvSøknaden:!1,bareFarMedmorHarRett:y,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:Pe,saksperioder:De?Se:[...F.søker1,...F.søker2],children:e.jsx(Ve,{barnehagestartdato:$,readOnly:!0})})]})})]})})};we.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const se=({satser:r,lønnSøker:t,fornavn:a})=>{const n=z(E(h.HVEM_PLANLEGGER)),s=N(n),u=6*Oe(r),o=u/12,m=o/21.67,v=80/100,d=(p,y)=>Math.round(Math.min(p,o)*y),b=(p,y)=>Math.round(Math.min(p*12/260,m)*y);return e.jsx(g,{gap:"space-40",children:e.jsx(L,{children:e.jsxs(g,{gap:"space-8",children:[e.jsxs(P,{justify:"space-between",wrap:!1,children:[e.jsx(S,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(i,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:D(a),erAlenesøker:s,utbetaling100:I(b(t,1)),utbetaling80:I(b(t,v))}})}),e.jsx(C,{size:"medium",color:"blue",children:e.jsx(te,{height:24,width:24,color:"var(--ax-bg-accent-strong)",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:I(d(t,1)),utbetaling80:I(d(t,v))}})}),t>=o&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:I(u),a:p=>e.jsx(ie,{href:X.grunnbeløpet,target:"_blank",rel:"noreferrer",children:p})}})}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:a,erAlenesøker:s}})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:s,hvem:a,inntekt:I(d(t,1))}})})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Ae=({satser:r})=>{const t=le(),a=z(E(h.HVEM_PLANLEGGER)),n=z(E(h.HVOR_MYE)),s=V(a,t),l=G(a,t);return e.jsx(g,{gap:"space-40",children:(n.lønnSøker1!==void 0||n.lønnSøker2!==void 0)&&e.jsxs(f,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(C,{size:"medium",color:"lightBlue",children:e.jsx(sr,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(f.Content,{children:e.jsxs(g,{gap:"space-8",children:[n.lønnSøker1!==void 0&&s&&e.jsx(se,{satser:r,fornavn:s,lønnSøker:n.lønnSøker1}),n.lønnSøker2!==void 0&&l&&e.jsx(se,{satser:r,fornavn:l,lønnSøker:n.lønnSøker2})]})})]})})};Ae.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const hr=({stønadskontoer:r,satser:t})=>{const a=ze();Je();const n=z(E(h.HVEM_PLANLEGGER)),s=z(E(h.OM_BARNET)),l=E(h.HVOR_LANG_PERIODE),u=E(h.ARBEIDSSITUASJON),o=E(h.FORDELING),m=E(h.HVOR_MYE),v=N(n),d=r&&l?r[l.dekningsgrad]:void 0,b=oe(s)&&ne(s.fødselsdato).isBefore(Ge),p=u?ue(u):"ingenHarRett",y=!b&&p!=="ingenHarRett",x=er(s),B=ne().add(18,"weeks").add(3,"days").toDate(),_=Z(s);return e.jsxs(e.Fragment,{children:[e.jsx(xe,{children:e.jsxs(g,{gap:"space-40",children:[e.jsxs(g,{gap:"space-20",children:[!y&&e.jsx(g,{gap:"space-20",children:e.jsxs(fe,{header:v?e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(he,{height:24,width:24,color:"var(--ax-bg-success-strong)","aria-hidden":!0}),color:"green",children:[e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:v}})}),e.jsxs(K,{children:[e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(ie,{inlineText:!0,href:X.veiviser,children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),r&&d&&l&&u&&e.jsxs(g,{gap:"space-8",children:[y&&e.jsx(we,{valgtStønadskonto:d,hvorLangPeriode:l,hvemPlanlegger:n,barnet:s,arbeidssituasjon:u,fordeling:o}),m&&e.jsx(Ae,{satser:t}),!_&&e.jsx(rr,{hvemPlanlegger:n,barnet:s}),e.jsx(Te,{stønadskontoer:r,barnet:s,hvemPlanlegger:n,arbeidssituasjon:u,hvorLangPeriode:l,fordeling:o,satser:t})]}),e.jsx(Qe,{erAlenesøker:v}),(y&&ne(x).isBefore(B)||y&&_)&&e.jsx(qe,{erAlenesøker:v,barnet:s})]}),e.jsx(g,{gap:"space-40",children:e.jsx(P,{children:e.jsx(Ee,{variant:"secondary",onClick:a.goToPreviousDefaultStep,icon:e.jsx(Ce,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(i,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:"bg-ax-neutral-200 pb-4",children:e.jsxs(g,{gap:"space-16",className:"mx-auto max-w-[560px] px-8 py-4",children:[e.jsx(S,{level:"2",size:"medium",children:e.jsx(i,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsxs(j,{size:"small",children:[e.jsx(ye,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(j.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(j.Title,{children:e.jsx(j.Anchor,{href:X.hvorMye,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserHvorMye"})})})]}),e.jsxs(j,{size:"small",children:[e.jsx(ye,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(j.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(j.Title,{children:e.jsx(j.Anchor,{href:X.veiviser,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserFpEllerEs"})})})]})]})})]})};hr.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{hr as O};
