import{r as R,a0 as _e,a1 as k,aB as T,aC as je,aD as fe,aE as Me,aA as Ie,aF as Le,aq as c,ac as S,j as e,aw as Be,ax as pe,ay as ce,W as P,X as G,a9 as ve,Y as i,a2 as Ee,a3 as m,a4 as H,a6 as ie,a7 as X,az as he,aa as le,V as E,af as I,a5 as D,aG as ye,ab as C,ah as He,aH as Ke,k as ne,at as Ne,aI as Ve,aJ as ke}from"./iframe-D8mjBvJA.js";import{u as h,C as O,c as Ge}from"./usePlanleggerNavigator-CinR9LHG.js";import{h as ae,e as K,g as N,a as V,H as _,j as Ce,k as be}from"./HvemPlanleggerUtils-BiD0mqJ_.js";import{b as oe,e as re,m as ze}from"./barnetUtils-DdBsnp7q.js";import{u as ue,a as Ue,b as Ye}from"./hvemHarRettUtils-CtA2zEDd.js";import{u as Xe}from"./useScrollBehaviour-BMpvn4dU.js";import{S as We}from"./ShareDataInfobox-DbXwSXLt.js";import{S as Oe}from"./TasklistStart-C2kmxcjd.js";import{b as $e,g as Je,a as Qe}from"./BarnehageplassSteg-xRmilAnR.js";import{f as M,a as Re}from"./satserUtils-0x2nuqUk.js";import{c as Fe,d as xe,e as ee,g as Ze,a as er,l as rr,h as nr,i as ar,j as Z}from"./uttakUtils-B8HHfy4f.js";import{l as de}from"./umamiUtils-DYttlg2n.js";import{C as tr}from"./CalendarLabels-BQLCrKyd.js";import{A as sr}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as te,a as ir}from"./Wallet-D2grH7Vp.js";var lr=function(r,s){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(r);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(r,n[t])&&(a[n[t]]=r[n[t]]);return a};const or=R.forwardRef((r,s)=>{var{title:a,titleId:n}=r,t=lr(r,["title","titleId"]);let l=_e();return l=a?n||"title-"+l:void 0,k.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":l},t),a?k.createElement("title",{id:l},a):null,k.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var me=function(r,s){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(r);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(r,n[t])&&(a[n[t]]=r[n[t]]);return a};const[ur,dr]=je({name:"LinkAnchorOverlayContext"}),mr=R.forwardRef((r,s)=>{var{children:a,asChild:n,className:t,onClick:l}=r,u=me(r,["children","asChild","className","onClick"]);const{cn:o}=T(),g=R.useRef(null),v=n?fe:"div";return k.createElement(ur,{anchorRef:g},k.createElement(v,Object.assign({ref:s},u,{className:o("navds-link-anchor__overlay",t),onClick:Me(l,d=>{var j;if(d.target===g.current||cr())return;const p=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,ctrlKey:d.ctrlKey,shiftKey:d.shiftKey,altKey:d.altKey,metaKey:d.metaKey,button:d.button,screenX:d.screenX,screenY:d.screenY,clientX:d.clientX,clientY:d.clientY});(j=g.current)===null||j===void 0||j.dispatchEvent(p)})}),a))}),gr=R.forwardRef((r,s)=>{var{children:a,asChild:n,className:t}=r,l=me(r,["children","asChild","className"]);const{cn:u}=T(),o=dr(!1),g=Le(s,o?.anchorRef),v=n?fe:"a";return k.createElement(v,Object.assign({ref:g},l,{className:u("navds-link-anchor",t)}),a)}),pr=R.forwardRef((r,s)=>{var{className:a}=r,n=me(r,["className"]);const{cn:t}=T();return k.createElement(Ie,Object.assign({ref:s,"aria-hidden":!0,className:t("navds-link-anchor__arrow",a)},n))});function cr(){var r;return typeof window>"u"?!1:!!(!((r=window.getSelection())===null||r===void 0)&&r.toString())}var z=function(r,s){var a={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(a[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(r);t<n.length;t++)s.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(r,n[t])&&(a[n[t]]=r[n[t]]);return a};const[vr,yr]=je({name:"LinkCardContextProvider"}),f=R.forwardRef((r,s)=>{var{children:a,className:n,arrow:t=!0,arrowPosition:l="baseline",size:u="medium"}=r,o=z(r,["children","className","arrow","arrowPosition","size"]);const{cn:g}=T();return k.createElement(vr,{size:u},k.createElement(mr,{asChild:!0},k.createElement(c,Object.assign({as:"div",size:u,ref:s,"data-color":"neutral",className:g("navds-link-card",n,`navds-link-card--${u}`),"data-align-arrow":l},o),a,t&&k.createElement(pr,{fontSize:u==="medium"?"1.75rem":"1.5rem",className:g("navds-link-card__arrow")}))))}),kr=R.forwardRef((r,s)=>{var{children:a,as:n="span",className:t}=r,l=z(r,["children","as","className"]);const{cn:u}=T(),o=yr();return k.createElement(S,Object.assign({ref:s,as:n,size:o.size==="medium"?"small":"xsmall",className:u("navds-link-card__title",t)},l),a)}),br=gr,jr=R.forwardRef((r,s)=>{var{children:a,className:n}=r,t=z(r,["children","className"]);const{cn:l}=T();return k.createElement("div",Object.assign({ref:s,className:l("navds-link-card__description",n)},t),a)}),fr=R.forwardRef((r,s)=>{var{children:a,className:n}=r,t=z(r,["children","className"]);const{cn:l}=T();return k.createElement("div",Object.assign({ref:s,className:l("navds-link-card__footer",n)},t),a)}),Er=R.forwardRef((r,s)=>{var{children:a,className:n}=r,t=z(r,["children","className"]);const{cn:l}=T();return k.createElement("div",Object.assign({ref:s,"aria-hidden":!0,className:l("navds-link-card__icon",n)},t),a)}),hr=R.forwardRef((r,s)=>{var{children:a,className:n,aspectRatio:t,style:l}=r,u=z(r,["children","className","aspectRatio","style"]);const{cn:o}=T();return k.createElement("div",Object.assign({ref:s,className:o("navds-link-card__image-container",n),style:Object.assign(Object.assign({},l),{aspectRatio:t})},u),a)});f.Title=kr;f.Anchor=br;f.Description=jr;f.Footer=fr;f.Icon=Er;f.Image=hr;const qe=({children:r})=>e.jsx(Be,{header:e.jsxs(e.Fragment,{children:[e.jsx(pe,{below:"md",children:e.jsx(ce,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(G,{color:"lightBlue",size:"large",children:e.jsx(ve,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(S,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(pe,{above:"md",children:e.jsx(ce,{children:e.jsxs(P,{gap:"space-16",align:"center",children:[e.jsx(G,{color:"lightBlue",size:"large",children:e.jsx(ve,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(S,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:r});qe.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const Te=({erAlenesøker:r,barnet:s})=>e.jsx(Ee,{header:e.jsx(i,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:r}}),color:"gray",icon:e.jsx(Oe,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(m,{gap:"space-16",children:[e.jsx(H,{children:e.jsx(i,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:r,erAdopsjon:re(s),erFødt:oe(s)}})}),e.jsx(P,{children:e.jsx(ie,{href:X.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(he,{variant:"primary",children:e.jsx(i,{id:"SøkOmForeldrepenger.Søk"})})})})]})});Te.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const we=({stønadskontoer:r,barnet:s,hvemPlanlegger:a,arbeidssituasjon:n,hvorLangPeriode:t,fordeling:l,satser:u})=>{const o=le(),g=oe(s),v=re(s),d=s.antallBarn,j=ae(a),p=K(a),y=N(a,o),x=V(a,o),w=()=>ae(a)&&!a.navnPåFar?e.jsx(i,{id:"OppgittInformasjon.TekstFar1"}):N(a,o),b=()=>ae(a)&&!a.navnPåMedfar?e.jsx(i,{id:"OppgittInformasjon.TekstFar2"}):V(a,o),L=w(),U=b(),A=ue(n),W=r[t.dekningsgrad],q=Fe(W),$=xe(W),J=l?ee(l.antallDagerSøker1):void 0,Q=l?ee($.totaltAntallDager-l.antallDagerSøker1):void 0,B=a.type===_.FAR_OG_FAR&&!v,F=M(Re(u)/2);return e.jsx(m,{gap:"space-40",children:e.jsxs(E,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(E.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(or,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(E.Title,{size:"small",children:e.jsx(i,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:p}})})]})}),e.jsx(E.Content,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(I,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:d}})}),s.erFødsel&&g&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:g,dato:o.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:o.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!g&&!v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:d,erFødt:g,dato:o.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),v&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:d,dato2:o.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:o.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(I,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Arbeid.Tittel"})}),p&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:D(y),arbeidssituasjon:n.status,minsteInntekt:F}})}),!p&&x&&e.jsxs(e.Fragment,{children:[A==="beggeHarRett"&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:y,navn2:x,arbeidssituasjon:n.status,minsteInntekt:F}})}),A!=="beggeHarRett"&&j&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:L??D(y),arbeidssituasjon:n.status,minsteInntekt:F}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:U??D(x),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:F}})})]}),A!=="beggeHarRett"&&!j&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:D(y),arbeidssituasjon:n.status,minsteInntekt:F}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:D(x),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:F}})})]})]})]})}),e.jsx(I,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(S,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:A!=="beggeHarRett"}})}),e.jsxs(c,{children:[!B&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:p,prosent:t.dekningsgrad,uker:q.uker,dager:q.dager,fellesuker:J?.uker||0,fellesdager:J?.dager||0,fellesuker2:Q?.uker||0,fellesdager2:Q?.dager||0,hvem:N(a,o),hvem2:V(a,o),kunEnPartSkalHa:A!=="beggeHarRett"}}),B&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:p,prosent:t.dekningsgrad,uker:q.uker,dager:q.dager}})]})]})})]})})]})})};we.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto; '80': KontoBeregningDto }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const Ae=({valgtStønadskonto:r,hvorLangPeriode:s,hvemPlanlegger:a,barnet:n,arbeidssituasjon:t,fordeling:l})=>{const u=le(),o=ue(t),g=Ze(n),v=xe(r).totaltAntallDager,d=l?ee(l.antallDagerSøker1):void 0,j=l?ee(v-l.antallDagerSøker1):void 0,p=er(r),y=Ue(o,a)||Ye(o,a);let x;(a.type===_.MOR_OG_MEDMOR||a.type===_.MOR_OG_FAR)&&o==="kunSøker2HarRett"&&(x=ye(ye(g).denneEllerNeste()).leggTil(30));const w=Ce(a,o),b=rr({erDeltUttak:l!==void 0,famDato:g,tilgjengeligeStønadskontoer:r.kontoer,fellesperiodeDagerMor:l?.antallDagerSøker1,bareFarMedmorHarRett:y,erAdopsjon:re(n),erFarEllerMedmor:w,startdato:x,erMorUfør:t?.status===sr.UFØR,erAleneOmOmsorg:a.type===_.FAR||a.type===_.MOR,farOgFar:a.type===_.FAR_OG_FAR}),L=Fe(r),U=a.type===_.FAR_OG_FAR,A=N(a,u),W=be(A,u.locale),q=V(a,u),$=q?be(q,u.locale):void 0,J=$e(n),Q=h(O.UTTAKSPLAN),B=C(h(O.TILPASS_PLAN)),F=Q?.at(-1)??[],ge=l!==void 0,Se=nr(ge,F,w),Pe=ar(ge,F,w);return e.jsx(m,{gap:"space-40",children:e.jsxs(E,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(E.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(He,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(E.Title,{size:"small",children:e.jsx(i,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:K(a)}})})]})}),e.jsx(E.Content,{children:e.jsxs(m,{gap:"space-20",children:[o==="beggeHarRett"&&!U&&q&&$&&e.jsxs(I,{children:[e.jsxs(m,{gap:"space-8",children:[e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:L.uker,antallDager:L.dager,hvem:N(a,u),hvem2:V(a,u),uker:d?.uker||0,dager:d?.dager||0,uker2:j?.uker||0,dager2:j?.dager||0}})}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:D(W),fom:u.formatDate(b.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(b.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:Y=>e.jsx("b",{children:Y})}})})]}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:D($),fom:u.formatDate(b.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(b.søker2.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:Y=>e.jsx("b",{children:Y})}})})]}),(K(a)||U)&&e.jsx(I,{children:e.jsxs(m,{gap:"space-8",children:[e.jsx(H,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:K(a),antallUker:L.uker,antallDager:L.dager}})}),e.jsx(H,{children:e.jsx(i,{id:"OppsummeringSteg.Periode",values:{fom:u.formatDate(b.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(b.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:Y=>e.jsx("b",{children:Y})}})})]})}),o==="kunSøker2HarRett"&&!U&&q&&e.jsx(I,{children:e.jsx(m,{gap:"space-8",children:e.jsx(H,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:p.uker,dager1:p.dager,uker2:Z(r).uker-p.uker,dager2:Z(r).dager-p.dager,hvem:A,prosent:s.dekningsgrad,antallUker:Z(r).uker,dager:Z(r).dager}})})})}),e.jsx(Ke,{bareFarMedmorHarRett:y,erFarEllerMedmor:w,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:B?Se:b.søker1,annenPartsPerioder:B?Pe:b.søker2,navnAnnenPart:"Test",barn:ze(n),planleggerLegend:e.jsx(tr,{hvemPlanlegger:a,barnet:n,hvemHarRett:o,uttaksplan:B?F:[...b.søker1,...b.søker2]}),barnehagestartdato:J})]})})]})})};Ae.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const se=({satser:r,lønnSøker:s,fornavn:a})=>{const n=C(h(O.HVEM_PLANLEGGER)),t=K(n),u=6*Re(r),o=u/12,g=o/21.67,v=80/100,d=(p,y)=>Math.round(Math.min(p,o)*y),j=(p,y)=>Math.round(Math.min(p*12/260,g)*y);return e.jsx(m,{gap:"space-40",children:e.jsx(I,{children:e.jsxs(m,{gap:"space-8",children:[e.jsxs(P,{justify:"space-between",wrap:!1,children:[e.jsx(S,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(i,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:D(a),erAlenesøker:t,utbetaling100:M(j(s,1)),utbetaling80:M(j(s,v))}})}),e.jsx(G,{size:"medium",color:"blue",children:e.jsx(te,{height:24,width:24,color:"var(--ax-bg-accent-strong)",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:M(d(s,1)),utbetaling80:M(d(s,v))}})}),s>=o&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:M(u),a:p=>e.jsx(ie,{href:X.grunnbeløpet,target:"_blank",rel:"noreferrer",children:p})}})}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:a,erAlenesøker:t}})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:t,hvem:a,inntekt:M(d(s,1))}})})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const De=({satser:r})=>{const s=le(),a=C(h(O.HVEM_PLANLEGGER)),n=C(h(O.HVOR_MYE)),t=N(a,s),l=V(a,s);return e.jsx(m,{gap:"space-40",children:(n.lønnSøker1!==void 0||n.lønnSøker2!==void 0)&&e.jsxs(E,{"aria-label":"",onToggle:de("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(E.Header,{children:e.jsxs(P,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(ir,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(E.Title,{size:"small",children:e.jsx(i,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(E.Content,{children:e.jsxs(m,{gap:"space-8",children:[n.lønnSøker1!==void 0&&t&&e.jsx(se,{satser:r,fornavn:t,lønnSøker:n.lønnSøker1}),n.lønnSøker2!==void 0&&l&&e.jsx(se,{satser:r,fornavn:l,lønnSøker:n.lønnSøker2})]})})]})})};De.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const Or=({stønadskontoer:r,satser:s})=>{const a=Ge();Xe();const n=C(h(O.HVEM_PLANLEGGER)),t=C(h(O.OM_BARNET)),l=h(O.HVOR_LANG_PERIODE),u=h(O.ARBEIDSSITUASJON),o=h(O.FORDELING),g=h(O.HVOR_MYE),v=K(n),d=r&&l?r[l.dekningsgrad]:void 0,j=oe(t)&&ne(t.fødselsdato).isBefore(Ne),p=u?ue(u):"ingenHarRett",y=!j&&p!=="ingenHarRett",x=Je(t),w=ne().add(18,"weeks").add(3,"days").toDate(),b=re(t);return e.jsxs(e.Fragment,{children:[e.jsx(qe,{children:e.jsxs(m,{gap:"space-40",children:[e.jsxs(m,{gap:"space-20",children:[!y&&e.jsx(m,{gap:"space-20",children:e.jsxs(Ee,{header:v?e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(Oe,{height:24,width:24,color:"var(--ax-bg-success-strong)","aria-hidden":!0}),color:"green",children:[e.jsx(H,{children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:v}})}),e.jsxs(H,{children:[e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(ie,{inlineText:!0,href:X.veiviser,children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),r&&d&&l&&u&&e.jsxs(m,{gap:"space-8",children:[y&&e.jsx(Ae,{valgtStønadskonto:d,hvorLangPeriode:l,hvemPlanlegger:n,barnet:t,arbeidssituasjon:u,fordeling:o}),g&&e.jsx(De,{satser:s}),!b&&e.jsx(Qe,{hvemPlanlegger:n,barnet:t}),e.jsx(we,{stønadskontoer:r,barnet:t,hvemPlanlegger:n,arbeidssituasjon:u,hvorLangPeriode:l,fordeling:o,satser:s})]}),e.jsx(We,{erAlenesøker:v}),(y&&ne(x).isBefore(w)||y&&b)&&e.jsx(Te,{erAlenesøker:v,barnet:t})]}),e.jsx(m,{gap:"space-40",children:e.jsx(P,{children:e.jsx(he,{variant:"secondary",onClick:a.goToPreviousDefaultStep,icon:e.jsx(Ve,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(i,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:"bg-ax-neutral-200 pb-4",children:e.jsxs(m,{gap:"space-16",className:"mx-auto max-w-[560px] px-8 py-4",children:[e.jsx(S,{level:"2",size:"medium",children:e.jsx(i,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsxs(f,{size:"small",children:[e.jsx(ke,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(f.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(f.Title,{children:e.jsx(f.Anchor,{href:X.hvorMye,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserHvorMye"})})})]}),e.jsxs(f,{size:"small",children:[e.jsx(ke,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(f.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(f.Title,{children:e.jsx(f.Anchor,{href:X.veiviser,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserFpEllerEs"})})})]})]})})]})};Or.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{Or as O};
