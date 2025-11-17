import{r as O,$ as _e,a0 as k,aC as q,aD as be,aE as fe,aF as Me,aB as Ie,aG as Le,ar as c,ab as S,j as e,ax as Be,ay as ge,az as pe,V as P,W as C,a8 as ce,X as i,a1 as je,a2 as m,a3 as K,a5 as ie,a6 as $,aA as Ee,a9 as le,U as j,af as L,a4 as D,aH as ve,aa as z,ai as He,aI as Ke,aJ as Ne,i as ne,au as Ve,aK as Ge,aL as ye}from"./iframe-CWVJK1FM.js";import{u as E,C as h,c as Ce}from"./usePlanleggerNavigator-WbqkBMqr.js";import{h as ae,e as N,g as V,a as G,H as M,j as ze,A as Ue,k as ke}from"./HvemPlanleggerUtils-BZWijMz7.js";import{b as oe,e as Z,m as Ye}from"./barnetUtils-BwuZAmP7.js";import{u as ue,a as Xe,b as $e}from"./hvemHarRettUtils-Bm8Xp99V.js";import{u as We}from"./useScrollBehaviour-DROkofBD.js";import{S as Je}from"./ShareDataInfobox-20A63J78.js";import{S as he}from"./TasklistStart-DEFi6Pcj.js";import{b as Qe,g as Ze,a as er}from"./BarnehageplassSteg-BoLeISWr.js";import{f as I,a as Oe}from"./satserUtils-CfqJyRrq.js";import{c as Fe,d as Re,e as Q,g as rr,a as nr,l as ar,h as J}from"./uttakUtils-CWP4weDH.js";import{l as de}from"./umamiUtils-DYttlg2n.js";import{S as te,a as tr}from"./Wallet-CazvNZVQ.js";var sr=function(r,s){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(r);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(r,n[t])&&(a[n[t]]=r[n[t]]);return a};const ir=O.forwardRef((r,s)=>{var{title:a,titleId:n}=r,t=sr(r,["title","titleId"]);let l=_e();return l=a?n||"title-"+l:void 0,k.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":l},t),a?k.createElement("title",{id:l},a):null,k.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var me=function(r,s){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(r);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(r,n[t])&&(a[n[t]]=r[n[t]]);return a};const[lr,or]=be({name:"LinkAnchorOverlayContext"}),ur=O.forwardRef((r,s)=>{var{children:a,asChild:n,className:t,onClick:l}=r,u=me(r,["children","asChild","className","onClick"]);const{cn:o}=q(),g=O.useRef(null),v=n?fe:"div";return k.createElement(lr,{anchorRef:g},k.createElement(v,Object.assign({ref:s},u,{className:o("navds-link-anchor__overlay",t),onClick:Me(l,d=>{var b;if(d.target===g.current||gr())return;const p=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,ctrlKey:d.ctrlKey,shiftKey:d.shiftKey,altKey:d.altKey,metaKey:d.metaKey,button:d.button,screenX:d.screenX,screenY:d.screenY,clientX:d.clientX,clientY:d.clientY});(b=g.current)===null||b===void 0||b.dispatchEvent(p)})}),a))}),dr=O.forwardRef((r,s)=>{var{children:a,asChild:n,className:t}=r,l=me(r,["children","asChild","className"]);const{cn:u}=q(),o=or(!1),g=Le(s,o?.anchorRef),v=n?fe:"a";return k.createElement(v,Object.assign({ref:g},l,{className:u("navds-link-anchor",t)}),a)}),mr=O.forwardRef((r,s)=>{var{className:a}=r,n=me(r,["className"]);const{cn:t}=q();return k.createElement(Ie,Object.assign({ref:s,"aria-hidden":!0,className:t("navds-link-anchor__arrow",a)},n))});function gr(){var r;return typeof window>"u"?!1:!!(!((r=window.getSelection())===null||r===void 0)&&r.toString())}var U=function(r,s){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(r);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(r,n[t])&&(a[n[t]]=r[n[t]]);return a};const[pr,cr]=be({name:"LinkCardContextProvider"}),f=O.forwardRef((r,s)=>{var{children:a,className:n,arrow:t=!0,arrowPosition:l="baseline",size:u="medium"}=r,o=U(r,["children","className","arrow","arrowPosition","size"]);const{cn:g}=q();return k.createElement(pr,{size:u},k.createElement(ur,{asChild:!0},k.createElement(c,Object.assign({as:"div",size:u,ref:s,"data-color":"neutral",className:g("navds-link-card",n,`navds-link-card--${u}`),"data-align-arrow":l},o),a,t&&k.createElement(mr,{fontSize:u==="medium"?"1.75rem":"1.5rem",className:g("navds-link-card__arrow")}))))}),vr=O.forwardRef((r,s)=>{var{children:a,as:n="span",className:t}=r,l=U(r,["children","as","className"]);const{cn:u}=q(),o=cr();return k.createElement(S,Object.assign({ref:s,as:n,size:o.size==="medium"?"small":"xsmall",className:u("navds-link-card__title",t)},l),a)}),yr=dr,kr=O.forwardRef((r,s)=>{var{children:a,className:n}=r,t=U(r,["children","className"]);const{cn:l}=q();return k.createElement("div",Object.assign({ref:s,className:l("navds-link-card__description",n)},t),a)}),br=O.forwardRef((r,s)=>{var{children:a,className:n}=r,t=U(r,["children","className"]);const{cn:l}=q();return k.createElement("div",Object.assign({ref:s,className:l("navds-link-card__footer",n)},t),a)}),fr=O.forwardRef((r,s)=>{var{children:a,className:n}=r,t=U(r,["children","className"]);const{cn:l}=q();return k.createElement("div",Object.assign({ref:s,"aria-hidden":!0,className:l("navds-link-card__icon",n)},t),a)}),jr=O.forwardRef((r,s)=>{var{children:a,className:n,aspectRatio:t,style:l}=r,u=U(r,["children","className","aspectRatio","style"]);const{cn:o}=q();return k.createElement("div",Object.assign({ref:s,className:o("navds-link-card__image-container",n),style:Object.assign(Object.assign({},l),{aspectRatio:t})},u),a)});f.Title=vr;f.Anchor=yr;f.Description=kr;f.Footer=br;f.Icon=fr;f.Image=jr;const xe=({children:r})=>e.jsx(Be,{header:e.jsxs(e.Fragment,{children:[e.jsx(ge,{below:"md",children:e.jsx(pe,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(C,{color:"lightBlue",size:"large",children:e.jsx(ce,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(S,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(ge,{above:"md",children:e.jsx(pe,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(C,{color:"lightBlue",size:"large",children:e.jsx(ce,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(S,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:r});xe.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const qe=({erAlenesøker:r,barnet:s})=>e.jsx(je,{header:e.jsx(i,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:r}}),color:"gray",icon:e.jsx(he,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(m,{gap:"space-16",children:[e.jsx(K,{children:e.jsx(i,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:r,erAdopsjon:Z(s),erFødt:oe(s)}})}),e.jsx(P,{children:e.jsx(ie,{href:$.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(Ee,{variant:"primary",children:e.jsx(i,{id:"SøkOmForeldrepenger.Søk"})})})})]})});qe.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const Te=({stønadskontoer:r,barnet:s,hvemPlanlegger:a,arbeidssituasjon:n,hvorLangPeriode:t,fordeling:l,satser:u})=>{const o=le(),g=oe(s),v=Z(s),d=s.antallBarn,b=ae(a),p=N(a),y=V(a,o),x=G(a,o),B=()=>ae(a)&&!a.navnPåFar?e.jsx(i,{id:"OppgittInformasjon.TekstFar1"}):V(a,o),_=()=>ae(a)&&!a.navnPåMedfar?e.jsx(i,{id:"OppgittInformasjon.TekstFar2"}):G(a,o),ee=B(),F=_(),R=ue(n),H=r[t.dekningsgrad],T=Fe(H),re=Re(H),w=l?Q(l.antallDagerSøker1):void 0,Y=l?Q(re.totaltAntallDager-l.antallDagerSøker1):void 0,W=a.type===M.FAR_OG_FAR&&!v,A=I(Oe(u)/2);return e.jsx(m,{gap:"space-40",children:e.jsxs(j,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(C,{size:"medium",color:"lightBlue",children:e.jsx(ir,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(i,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:p}})})]})}),e.jsx(j.Content,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(L,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:d}})}),s.erFødsel&&g&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:g,dato:o.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:o.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!g&&!v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:g,dato:o.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:d,dato2:o.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:o.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(L,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Arbeid.Tittel"})}),p&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:D(y),arbeidssituasjon:n.status,minsteInntekt:A}})}),!p&&x&&e.jsxs(e.Fragment,{children:[R==="beggeHarRett"&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:y,navn2:x,arbeidssituasjon:n.status,minsteInntekt:A}})}),R!=="beggeHarRett"&&b&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:ee??D(y),arbeidssituasjon:n.status,minsteInntekt:A}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:F??D(x),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:A}})})]}),R!=="beggeHarRett"&&!b&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:D(y),arbeidssituasjon:n.status,minsteInntekt:A}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:D(x),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:A}})})]})]})]})}),e.jsx(L,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:R!=="beggeHarRett"}})}),e.jsxs(c,{children:[!W&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:p,prosent:t.dekningsgrad,uker:T.uker,dager:T.dager,fellesuker:w?.uker||0,fellesdager:w?.dager||0,fellesuker2:Y?.uker||0,fellesdager2:Y?.dager||0,hvem:V(a,o),hvem2:G(a,o),kunEnPartSkalHa:R!=="beggeHarRett"}}),W&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:p,prosent:t.dekningsgrad,uker:T.uker,dager:T.dager}})]})]})})]})})]})})};Te.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto; '80': KontoBeregningDto }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const we=({valgtStønadskonto:r,hvorLangPeriode:s,hvemPlanlegger:a,barnet:n,arbeidssituasjon:t,fordeling:l})=>{const u=le(),o=ue(t),g=rr(n),v=Re(r).totaltAntallDager,d=l?Q(l.antallDagerSøker1):void 0,b=l?Q(v-l.antallDagerSøker1):void 0,p=nr(r),y=Xe(o,a)||$e(o,a);let x;(a.type===M.MOR_OG_MEDMOR||a.type===M.MOR_OG_FAR)&&o==="kunSøker2HarRett"&&(x=ve(ve(g).denneEllerNeste()).leggTil(30));const B=ze(a,o),_=a.type===M.FAR||a.type===M.MOR,ee=Z(n),F=ar({erDeltUttak:l!==void 0,famDato:g,tilgjengeligeStønadskontoer:r.kontoer,fellesperiodeDagerMor:l?.antallDagerSøker1,bareFarMedmorHarRett:y,erAdopsjon:ee,erFarEllerMedmor:B,startdato:x,erMorUfør:t?.status===Ue.UFØR,erAleneOmOmsorg:_,farOgFar:a.type===M.FAR_OG_FAR}),R=Fe(r),H=a.type===M.FAR_OG_FAR,T=V(a,u),re=ke(T,u.locale),w=G(a,u),Y=w?ke(w,u.locale):void 0,W=Qe(n),A=E(h.UTTAKSPLAN),De=z(E(h.TILPASS_PLAN)),Se=A?.at(-1)??[],Pe=l!==void 0;return e.jsx(m,{gap:"space-40",children:e.jsxs(j,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(C,{size:"medium",color:"lightBlue",children:e.jsx(He,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(i,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:N(a)}})})]})}),e.jsx(j.Content,{children:e.jsxs(m,{gap:"space-20",children:[o==="beggeHarRett"&&!H&&w&&Y&&e.jsxs(L,{children:[e.jsxs(m,{gap:"space-8",children:[e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:R.uker,antallDager:R.dager,hvem:V(a,u),hvem2:G(a,u),uker:d?.uker||0,dager:d?.dager||0,uker2:b?.uker||0,dager2:b?.dager||0}})}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:D(re),fom:u.formatDate(F.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(F.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:X=>e.jsx("b",{children:X})}})})]}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:D(Y),fom:u.formatDate(F.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(F.søker2.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:X=>e.jsx("b",{children:X})}})})]}),(N(a)||H)&&e.jsx(L,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:N(a),antallUker:R.uker,antallDager:R.dager}})}),e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.Periode",values:{fom:u.formatDate(F.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(F.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:X=>e.jsx("b",{children:X})}})})]})}),o==="kunSøker2HarRett"&&!H&&w&&e.jsx(L,{children:e.jsx(m,{gap:"space-8",children:e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:p.uker,dager1:p.dager,uker2:J(r).uker-p.uker,dager2:J(r).dager-p.dager,hvem:T,prosent:s.dekningsgrad,antallUker:J(r).uker,dager:J(r).dager}})})})}),e.jsx(Ke,{barn:Ye(n),erFarEllerMedmor:B,navnPåForeldre:{farMedmor:w||"",mor:T},modus:"planlegger",valgtStønadskonto:{},aleneOmOmsorg:_,erMedmorDelAvSøknaden:!1,bareFarMedmorHarRett:y,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:Pe,saksperioder:De?Se:[...F.søker1,...F.søker2],children:e.jsx(Ne,{barnehagestartdato:W,readOnly:!0})})]})})]})})};we.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const se=({satser:r,lønnSøker:s,fornavn:a})=>{const n=z(E(h.HVEM_PLANLEGGER)),t=N(n),u=6*Oe(r),o=u/12,g=o/21.67,v=80/100,d=(p,y)=>Math.round(Math.min(p,o)*y),b=(p,y)=>Math.round(Math.min(p*12/260,g)*y);return e.jsx(m,{gap:"space-40",children:e.jsx(L,{children:e.jsxs(m,{gap:"space-8",children:[e.jsxs(P,{justify:"space-between",wrap:!1,children:[e.jsx(S,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(i,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:D(a),erAlenesøker:t,utbetaling100:I(b(s,1)),utbetaling80:I(b(s,v))}})}),e.jsx(C,{size:"medium",color:"blue",children:e.jsx(te,{height:24,width:24,color:"var(--ax-bg-accent-strong)",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:I(d(s,1)),utbetaling80:I(d(s,v))}})}),s>=o&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:I(u),a:p=>e.jsx(ie,{href:$.grunnbeløpet,target:"_blank",rel:"noreferrer",children:p})}})}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:a,erAlenesøker:t}})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:t,hvem:a,inntekt:I(d(s,1))}})})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Ae=({satser:r})=>{const s=le(),a=z(E(h.HVEM_PLANLEGGER)),n=z(E(h.HVOR_MYE)),t=V(a,s),l=G(a,s);return e.jsx(m,{gap:"space-40",children:(n.lønnSøker1!==void 0||n.lønnSøker2!==void 0)&&e.jsxs(j,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(C,{size:"medium",color:"lightBlue",children:e.jsx(tr,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(i,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(j.Content,{children:e.jsxs(m,{gap:"space-8",children:[n.lønnSøker1!==void 0&&t&&e.jsx(se,{satser:r,fornavn:t,lønnSøker:n.lønnSøker1}),n.lønnSøker2!==void 0&&l&&e.jsx(se,{satser:r,fornavn:l,lønnSøker:n.lønnSøker2})]})})]})})};Ae.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const Er=({stønadskontoer:r,satser:s})=>{const a=Ce();We();const n=z(E(h.HVEM_PLANLEGGER)),t=z(E(h.OM_BARNET)),l=E(h.HVOR_LANG_PERIODE),u=E(h.ARBEIDSSITUASJON),o=E(h.FORDELING),g=E(h.HVOR_MYE),v=N(n),d=r&&l?r[l.dekningsgrad]:void 0,b=oe(t)&&ne(t.fødselsdato).isBefore(Ve),p=u?ue(u):"ingenHarRett",y=!b&&p!=="ingenHarRett",x=Ze(t),B=ne().add(18,"weeks").add(3,"days").toDate(),_=Z(t);return e.jsxs(e.Fragment,{children:[e.jsx(xe,{children:e.jsxs(m,{gap:"space-40",children:[e.jsxs(m,{gap:"space-20",children:[!y&&e.jsx(m,{gap:"space-20",children:e.jsxs(je,{header:v?e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(he,{height:24,width:24,color:"var(--ax-bg-success-strong)","aria-hidden":!0}),color:"green",children:[e.jsx(K,{children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:v}})}),e.jsxs(K,{children:[e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(ie,{inlineText:!0,href:$.veiviser,children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),r&&d&&l&&u&&e.jsxs(m,{gap:"space-8",children:[y&&e.jsx(we,{valgtStønadskonto:d,hvorLangPeriode:l,hvemPlanlegger:n,barnet:t,arbeidssituasjon:u,fordeling:o}),g&&e.jsx(Ae,{satser:s}),!_&&e.jsx(er,{hvemPlanlegger:n,barnet:t}),e.jsx(Te,{stønadskontoer:r,barnet:t,hvemPlanlegger:n,arbeidssituasjon:u,hvorLangPeriode:l,fordeling:o,satser:s})]}),e.jsx(Je,{erAlenesøker:v}),(y&&ne(x).isBefore(B)||y&&_)&&e.jsx(qe,{erAlenesøker:v,barnet:t})]}),e.jsx(m,{gap:"space-40",children:e.jsx(P,{children:e.jsx(Ee,{variant:"secondary",onClick:a.goToPreviousDefaultStep,icon:e.jsx(Ge,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(i,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:"bg-ax-neutral-200 pb-4",children:e.jsxs(m,{gap:"space-16",className:"mx-auto max-w-[560px] px-8 py-4",children:[e.jsx(S,{level:"2",size:"medium",children:e.jsx(i,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsxs(f,{size:"small",children:[e.jsx(ye,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(f.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(f.Title,{children:e.jsx(f.Anchor,{href:$.hvorMye,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserHvorMye"})})})]}),e.jsxs(f,{size:"small",children:[e.jsx(ye,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(f.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(f.Title,{children:e.jsx(f.Anchor,{href:$.veiviser,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserFpEllerEs"})})})]})]})})]})};Er.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{Er as O};
