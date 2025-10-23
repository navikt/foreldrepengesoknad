import{r as F,a3 as Ee,a4 as k,aE as A,aF as fe,aG as be,aH as De,aD as He,aI as Be,at as c,af as P,j as e,az as Ie,aA as pe,aB as ce,Y as _,Z as G,ac as ye,_ as i,a5 as he,a6 as g,a7 as C,a9 as ie,aa as X,aC as xe,ad as oe,X as h,ai as H,a8 as M,aJ as ve,ae as K,ak as Ce,aK as Ne,k as ne,aw as ze,aL as Le,aM as ke}from"./iframe-Bd_yl_7Z.js";import{u as x,C as O,c as Ge}from"./usePlanleggerNavigator-CsHpz8td.js";import{h as te,e as N,g as z,a as L,H as E,j as Ke,k as je}from"./HvemPlanleggerUtils-Cl4FCups.js";import{b as le,e as re,m as Ue}from"./barnetUtils-Bue87cV1.js";import{u as de,a as Ve,b as Ye}from"./hvemHarRettUtils-2VQ3lvRb.js";import{u as Xe}from"./useScrollBehaviour-CK77PxSt.js";import{S as $e}from"./ShareDataInfobox-AKGEhn8c.js";import{S as Oe}from"./TasklistStart-vnXaaq1h.js";import{b as Je,g as We,a as Ze}from"./BarnehageplassSteg-D9YdsIaN.js";import{l as ue}from"./amplitudeUtils-CfsYsBK0.js";import{f as D,a as Fe}from"./satserUtils-yPZSF8qc.js";import{c as Te,d as qe,e as ee,g as Qe,a as er,l as rr,h as nr,i as tr,j as Q}from"./uttakUtils-xZCfNEGy.js";import{C as ar}from"./CalendarLabels-Dm26R3HD.js";import{A as sr}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as ae,a as ir}from"./Wallet-uufjYCJy.js";var or=function(r,s){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(r);a<n.length;a++)s.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(r,n[a])&&(t[n[a]]=r[n[a]]);return t};const lr=F.forwardRef((r,s)=>{var{title:t,titleId:n}=r,a=or(r,["title","titleId"]);let o=Ee();return o=t?n||"title-"+o:void 0,k.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":o},a),t?k.createElement("title",{id:o},t):null,k.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var ge=function(r,s){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(r);a<n.length;a++)s.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(r,n[a])&&(t[n[a]]=r[n[a]]);return t};const[dr,ur]=fe({name:"LinkAnchorOverlayContext"}),gr=F.forwardRef((r,s)=>{var{children:t,asChild:n,className:a,onClick:o}=r,d=ge(r,["children","asChild","className","onClick"]);const{cn:l}=A(),m=F.useRef(null),y=n?be:"div";return k.createElement(dr,{anchorRef:m},k.createElement(y,Object.assign({ref:s},d,{className:l("navds-link-anchor__overlay",a),onClick:De(o,u=>{var f;if(u.target===m.current||cr())return;const p=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,ctrlKey:u.ctrlKey,shiftKey:u.shiftKey,altKey:u.altKey,metaKey:u.metaKey,button:u.button,screenX:u.screenX,screenY:u.screenY,clientX:u.clientX,clientY:u.clientY});(f=m.current)===null||f===void 0||f.dispatchEvent(p)})}),t))}),mr=F.forwardRef((r,s)=>{var{children:t,asChild:n,className:a}=r,o=ge(r,["children","asChild","className"]);const{cn:d}=A(),l=ur(!1),m=Be(s,l?.anchorRef),y=n?be:"a";return k.createElement(y,Object.assign({ref:m},o,{className:d("navds-link-anchor",a)}),t)}),pr=F.forwardRef((r,s)=>{var{className:t}=r,n=ge(r,["className"]);const{cn:a}=A();return k.createElement(He,Object.assign({ref:s,"aria-hidden":!0,className:a("navds-link-anchor__arrow",t)},n))});function cr(){var r;return typeof window>"u"?!1:!!(!((r=window.getSelection())===null||r===void 0)&&r.toString())}var U=function(r,s){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&s.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(r);a<n.length;a++)s.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(r,n[a])&&(t[n[a]]=r[n[a]]);return t};const[yr,vr]=fe({name:"LinkCardContextProvider"}),b=F.forwardRef((r,s)=>{var{children:t,className:n,arrow:a=!0,arrowPosition:o="baseline",size:d="medium"}=r,l=U(r,["children","className","arrow","arrowPosition","size"]);const{cn:m}=A();return k.createElement(yr,{size:d},k.createElement(gr,{asChild:!0},k.createElement(c,Object.assign({as:"div",size:d,ref:s,"data-color":"neutral",className:m("navds-link-card",n,`navds-link-card--${d}`),"data-align-arrow":o},l),t,a&&k.createElement(pr,{fontSize:d==="medium"?"1.75rem":"1.5rem",className:m("navds-link-card__arrow")}))))}),kr=F.forwardRef((r,s)=>{var{children:t,as:n="span",className:a}=r,o=U(r,["children","as","className"]);const{cn:d}=A(),l=vr();return k.createElement(P,Object.assign({ref:s,as:n,size:l.size==="medium"?"small":"xsmall",className:d("navds-link-card__title",a)},o),t)}),jr=mr,fr=F.forwardRef((r,s)=>{var{children:t,className:n}=r,a=U(r,["children","className"]);const{cn:o}=A();return k.createElement("div",Object.assign({ref:s,className:o("navds-link-card__description",n)},a),t)}),br=F.forwardRef((r,s)=>{var{children:t,className:n}=r,a=U(r,["children","className"]);const{cn:o}=A();return k.createElement("div",Object.assign({ref:s,className:o("navds-link-card__footer",n)},a),t)}),hr=F.forwardRef((r,s)=>{var{children:t,className:n}=r,a=U(r,["children","className"]);const{cn:o}=A();return k.createElement("div",Object.assign({ref:s,"aria-hidden":!0,className:o("navds-link-card__icon",n)},a),t)}),xr=F.forwardRef((r,s)=>{var{children:t,className:n,aspectRatio:a,style:o}=r,d=U(r,["children","className","aspectRatio","style"]);const{cn:l}=A();return k.createElement("div",Object.assign({ref:s,className:l("navds-link-card__image-container",n),style:Object.assign(Object.assign({},o),{aspectRatio:a})},d),t)});b.Title=kr;b.Anchor=jr;b.Description=fr;b.Footer=br;b.Icon=hr;b.Image=xr;const we=({children:r})=>e.jsx(Ie,{header:e.jsxs(e.Fragment,{children:[e.jsx(pe,{below:"md",children:e.jsx(ce,{children:e.jsxs(_,{gap:"space-16",align:"center",children:[e.jsx(G,{color:"lightBlue",size:"large",children:e.jsx(ye,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(P,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(pe,{above:"md",children:e.jsx(ce,{children:e.jsxs(_,{gap:"space-16",align:"center",children:[e.jsx(G,{color:"lightBlue",size:"large",children:e.jsx(ye,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(P,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:r});we.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const Ae=({erAlenesøker:r,barnet:s})=>e.jsx(he,{header:e.jsx(i,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:r}}),color:"gray",icon:e.jsx(Oe,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(g,{gap:"space-16",children:[e.jsx(C,{children:e.jsx(i,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:r,erAdopsjon:re(s),erFødt:le(s)}})}),e.jsx(_,{children:e.jsx(ie,{href:X.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(xe,{variant:"primary",children:e.jsx(i,{id:"SøkOmForeldrepenger.Søk"})})})})]})});Ae.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const Se=({stønadskontoer:r,barnet:s,hvemPlanlegger:t,arbeidssituasjon:n,hvorLangPeriode:a,fordeling:o,satser:d})=>{const l=oe(),m=le(s),y=re(s),u=s.antallBarn,f=te(t),p=N(t),v=z(t,l),q=L(t,l),S=()=>te(t)&&!t.navnPåFar?e.jsx(i,{id:"OppgittInformasjon.TekstFar1"}):z(t,l),j=()=>te(t)&&!t.navnPåMedfar?e.jsx(i,{id:"OppgittInformasjon.TekstFar2"}):L(t,l),B=S(),V=j(),R=de(n),$=r[a.dekningsgrad],w=Te($),J=qe($),W=o?ee(o.antallDagerSøker1):void 0,Z=o?ee(J.totaltAntallDager-o.antallDagerSøker1):void 0,I=t.type===E.FAR_OG_FAR&&!y,T=D(Fe(d)/2);return e.jsx(g,{gap:"space-40",children:e.jsxs(h,{"aria-label":"",onToggle:ue("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(h.Header,{children:e.jsxs(_,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(lr,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(h.Title,{size:"small",children:e.jsx(i,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:p}})})]})}),e.jsx(h.Content,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(H,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(P,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:u}})}),s.erFødsel&&m&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:u,erFødt:m,dato:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!m&&!y&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:u,erFødt:m,dato:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),y&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:u,dato2:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:l.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(H,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(P,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Arbeid.Tittel"})}),p&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:M(v),arbeidssituasjon:n.status,minsteInntekt:T}})}),!p&&q&&e.jsxs(e.Fragment,{children:[R==="beggeHarRett"&&e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:v,navn2:q,arbeidssituasjon:n.status,minsteInntekt:T}})}),R!=="beggeHarRett"&&f&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:B??M(v),arbeidssituasjon:n.status,minsteInntekt:T}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:V??M(q),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:T}})})]}),R!=="beggeHarRett"&&!f&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:M(v),arbeidssituasjon:n.status,minsteInntekt:T}})}),e.jsx(c,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:M(q),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:T}})})]})]})]})}),e.jsx(H,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(P,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:R!=="beggeHarRett"}})}),e.jsxs(c,{children:[!I&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:p,prosent:a.dekningsgrad,uker:w.uker,dager:w.dager,fellesuker:W?.uker||0,fellesdager:W?.dager||0,fellesuker2:Z?.uker||0,fellesdager2:Z?.dager||0,hvem:z(t,l),hvem2:L(t,l),kunEnPartSkalHa:R!=="beggeHarRett"}}),I&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:p,prosent:a.dekningsgrad,uker:w.uker,dager:w.dager}})]})]})})]})})]})})};Se.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"dekningsgrad",value:{name:"Dekningsgrad",required:!0}}]}},description:""},fordeling:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const Re=({valgtStønadskonto:r,hvorLangPeriode:s,hvemPlanlegger:t,barnet:n,arbeidssituasjon:a,fordeling:o})=>{const d=oe(),l=de(a),m=Qe(n),y=qe(r).totaltAntallDager,u=o?ee(o.antallDagerSøker1):void 0,f=o?ee(y-o.antallDagerSøker1):void 0,p=er(r),v=Ve(l,t)||Ye(l,t);let q;(t.type===E.MOR_OG_MEDMOR||t.type===E.MOR_OG_FAR)&&l==="kunSøker2HarRett"&&(q=ve(ve(m).denneEllerNeste()).leggTil(30));const S=Ke(t,l),j=rr({erDeltUttak:o!==void 0,famDato:m,tilgjengeligeStønadskontoer:r.kontoer,fellesperiodeDagerMor:o?.antallDagerSøker1,bareFarMedmorHarRett:v,erAdopsjon:re(n),erFarEllerMedmor:S,startdato:q,erMorUfør:a?.status===sr.UFØR,erAleneOmOmsorg:t.type===E.FAR||t.type===E.MOR,farOgFar:t.type===E.FAR_OG_FAR}),B=Te(r),V=t.type===E.FAR_OG_FAR,R=z(t,d),$=je(R,d.locale),w=L(t,d),J=w?je(w,d.locale):void 0,W=Je(n),Z=x(O.UTTAKSPLAN),I=K(x(O.TILPASS_PLAN)),T=Z?.at(-1)??[],me=o!==void 0,Pe=nr(me,T,S),_e=tr(me,T,S);return e.jsx(g,{gap:"space-40",children:e.jsxs(h,{"aria-label":"",onToggle:ue("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(h.Header,{children:e.jsxs(_,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(Ce,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(h.Title,{size:"small",children:e.jsx(i,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:N(t)}})})]})}),e.jsx(h.Content,{children:e.jsxs(g,{gap:"space-20",children:[l==="beggeHarRett"&&!V&&w&&J&&e.jsxs(H,{children:[e.jsxs(g,{gap:"space-8",children:[e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:B.uker,antallDager:B.dager,hvem:z(t,d),hvem2:L(t,d),uker:u?.uker||0,dager:u?.dager||0,uker2:f?.uker||0,dager2:f?.dager||0}})}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:M($),fom:d.formatDate(j.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(j.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:Y=>e.jsx("b",{children:Y})}})})]}),e.jsx(c,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:M(J),fom:d.formatDate(j.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(j.søker2.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:Y=>e.jsx("b",{children:Y})}})})]}),(N(t)||V)&&e.jsx(H,{children:e.jsxs(g,{gap:"space-8",children:[e.jsx(C,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:N(t),antallUker:B.uker,antallDager:B.dager}})}),e.jsx(C,{children:e.jsx(i,{id:"OppsummeringSteg.Periode",values:{fom:d.formatDate(j.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(j.søker1.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:Y=>e.jsx("b",{children:Y})}})})]})}),l==="kunSøker2HarRett"&&!V&&w&&e.jsx(H,{children:e.jsx(g,{gap:"space-8",children:e.jsx(C,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:p.uker,dager1:p.dager,uker2:Q(r).uker-p.uker,dager2:Q(r).dager-p.dager,hvem:R,prosent:s.dekningsgrad,antallUker:Q(r).uker,dager:Q(r).dager}})})})}),e.jsx(Ne,{bareFarMedmorHarRett:v,erFarEllerMedmor:S,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:I?Pe:j.søker1,annenPartsPerioder:I?_e:j.søker2,navnAnnenPart:"Test",barn:Ue(n),planleggerLegend:e.jsx(ar,{hvemPlanlegger:t,barnet:n,hvemHarRett:l,uttaksplan:I?T:[...j.søker1,...j.søker2]}),barnehagestartdato:W})]})})]})})};Re.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]}},description:""},hvorLangPeriode:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    dekningsgrad: Dekningsgrad;
}`,signature:{properties:[{key:"dekningsgrad",value:{name:"Dekningsgrad",required:!0}}]}},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const se=({satser:r,lønnSøker:s,fornavn:t})=>{const n=K(x(O.HVEM_PLANLEGGER)),a=N(n),d=6*Fe(r),l=d/12,m=l/21.67,y=80/100,u=(p,v)=>Math.round(Math.min(p,l)*v),f=(p,v)=>Math.round(Math.min(p*12/260,m)*v);return e.jsx(g,{gap:"space-40",children:e.jsx(H,{children:e.jsxs(g,{gap:"space-8",children:[e.jsxs(_,{justify:"space-between",wrap:!1,children:[e.jsx(P,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(i,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:M(t),erAlenesøker:a,utbetaling100:D(f(s,1)),utbetaling80:D(f(s,y))}})}),e.jsx(G,{size:"medium",color:"blue",children:e.jsx(ae,{height:24,width:24,color:"var(--ax-bg-accent-strong)",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:D(u(s,1)),utbetaling80:D(u(s,y))}})}),s>=l&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:D(d),a:p=>e.jsx(ie,{href:X.grunnbeløpet,target:"_blank",rel:"noreferrer",children:p})}})}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:t,erAlenesøker:a}})})]}),e.jsx(c,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:a,hvem:t,inntekt:D(u(s,1))}})})]})})})};se.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Me=({satser:r})=>{const s=oe(),t=K(x(O.HVEM_PLANLEGGER)),n=K(x(O.HVOR_MYE)),a=z(t,s),o=L(t,s);return e.jsx(g,{gap:"space-40",children:(n.lønnSøker1!==void 0||n.lønnSøker2!==void 0)&&e.jsxs(h,{"aria-label":"",onToggle:ue("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(h.Header,{children:e.jsxs(_,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"lightBlue",children:e.jsx(ir,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(h.Title,{size:"small",children:e.jsx(i,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(h.Content,{children:e.jsxs(g,{gap:"space-8",children:[n.lønnSøker1!==void 0&&a&&e.jsx(se,{satser:r,fornavn:a,lønnSøker:n.lønnSøker1}),n.lønnSøker2!==void 0&&o&&e.jsx(se,{satser:r,fornavn:o,lønnSøker:n.lønnSøker2})]})})]})})};Me.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const Or=({stønadskontoer:r,satser:s})=>{const t=Ge();Xe();const n=K(x(O.HVEM_PLANLEGGER)),a=K(x(O.OM_BARNET)),o=x(O.HVOR_LANG_PERIODE),d=x(O.ARBEIDSSITUASJON),l=x(O.FORDELING),m=x(O.HVOR_MYE),y=N(n),u=r&&o?r[o.dekningsgrad]:void 0,f=le(a)&&ne(a.fødselsdato).isBefore(ze),p=d?de(d):"ingenHarRett",v=!f&&p!=="ingenHarRett",q=We(a),S=ne().add(18,"weeks").add(3,"days").toDate(),j=re(a);return e.jsxs(e.Fragment,{children:[e.jsx(we,{children:e.jsxs(g,{gap:"space-40",children:[e.jsxs(g,{gap:"space-20",children:[!v&&e.jsx(g,{gap:"space-20",children:e.jsxs(he,{header:y?e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(Oe,{height:24,width:24,color:"var(--ax-bg-success-strong)","aria-hidden":!0}),color:"green",children:[e.jsx(C,{children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:y}})}),e.jsxs(C,{children:[e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(ie,{inlineText:!0,href:X.veiviser,children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),r&&u&&o&&d&&e.jsxs(g,{gap:"space-8",children:[v&&e.jsx(Re,{valgtStønadskonto:u,hvorLangPeriode:o,hvemPlanlegger:n,barnet:a,arbeidssituasjon:d,fordeling:l}),m&&e.jsx(Me,{satser:s}),!j&&e.jsx(Ze,{hvemPlanlegger:n,barnet:a}),e.jsx(Se,{stønadskontoer:r,barnet:a,hvemPlanlegger:n,arbeidssituasjon:d,hvorLangPeriode:o,fordeling:l,satser:s})]}),e.jsx($e,{erAlenesøker:y}),(v&&ne(q).isBefore(S)||v&&j)&&e.jsx(Ae,{erAlenesøker:y,barnet:a})]}),e.jsx(g,{gap:"space-40",children:e.jsx(_,{children:e.jsx(xe,{variant:"secondary",onClick:t.goToPreviousDefaultStep,icon:e.jsx(Le,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(i,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:"bg-ax-neutral-200 pb-4",children:e.jsxs(g,{gap:"space-16",className:"mx-auto max-w-[560px] px-8 py-4",children:[e.jsx(P,{level:"2",size:"medium",children:e.jsx(i,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsxs(b,{size:"small",children:[e.jsx(ke,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(b.Icon,{children:e.jsx(ae,{height:43,width:43})})}),e.jsx(b.Title,{children:e.jsx(b.Anchor,{href:X.hvorMye,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserHvorMye"})})})]}),e.jsxs(b,{size:"small",children:[e.jsx(ke,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(b.Icon,{children:e.jsx(ae,{height:43,width:43})})}),e.jsx(b.Title,{children:e.jsx(b.Anchor,{href:X.veiviser,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserFpEllerEs"})})})]})]})})]})};Or.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!1}}]},required:!0}}]}},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
