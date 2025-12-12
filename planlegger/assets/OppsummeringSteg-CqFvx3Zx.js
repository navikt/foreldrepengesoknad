import{r as k,a0 as Ae,a1 as j,aF as D,aG as he,aH as ye,aI as we,aE as Ie,aJ as qe,aK as _e,au as p,ac as w,j as e,aA as Le,aB as ce,aC as ge,W as I,X as B,a9 as pe,Y as i,a2 as Ee,a3 as c,a4 as M,a6 as se,a7 as X,aD as fe,aa as ie,V as f,ag as P,a5 as A,ai as Ke,aL as Pe,aM as Ne,ab as J,i as re,ax as Me,aN as He,aO as ve}from"./iframe-rDMSU5wM.js";import{u as O,C as R,c as Ve}from"./usePlanleggerNavigator-DoI6BNKf.js";import{h as ne,e as H,g as V,a as C,H as Q,j as Ce,k as je}from"./HvemPlanleggerUtils-DrG9Qoy-.js";import{b as oe,e as le,m as Be}from"./barnetUtils-RV3yWi__.js";import{u as de,a as ze,b as Ge}from"./hvemHarRettUtils-BuQOyYp6.js";import{u as Ue}from"./useScrollBehaviour-DlbfBFtR.js";import{S as Ye}from"./ShareDataInfobox-3Yp3oDPp.js";import{S as ke}from"./TasklistStart-CWyzGxRk.js";import{b as We,g as Xe,a as Je}from"./BarnehageplassSteg-DQS57p_6.js";import{f as K,a as be}from"./satserUtils-Dm5jK7Lk.js";import{c as xe,d as Oe,e as Z,a as $e,h as Qe,i as Ze,j as $}from"./uttakUtils-D9JrjcfG.js";import{l as ue}from"./umamiUtils-Bw37iN91.js";import{u as er}from"./useLagUttaksplanForslag-BRnO28UA.js";import{S as te,a as rr}from"./Wallet-9sscElhw.js";var nr=function(r,a){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&a.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)a.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(t[n[s]]=r[n[s]]);return t};const tr=k.forwardRef((r,a)=>{var{title:t,titleId:n}=r,s=nr(r,["title","titleId"]);let o=Ae();return o=t?n||"title-"+o:void 0,j.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:a,"aria-labelledby":o},s),t?j.createElement("title",{id:o},t):null,j.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});var me=function(r,a){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&a.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)a.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(t[n[s]]=r[n[s]]);return t};const[ar,sr]=he({name:"LinkAnchorOverlayContext"}),ir=k.forwardRef((r,a)=>{var{children:t,asChild:n,className:s,onClick:o}=r,l=me(r,["children","asChild","className","onClick"]);const{cn:d}=D(),m=k.useRef(null),v=n?ye:"div";return j.createElement(ar,{anchorRef:m},j.createElement(v,Object.assign({ref:a},l,{className:d("navds-link-anchor__overlay",s),onClick:we(o,u=>{var y;if(u.target===m.current||dr(m.current))return;const g=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,ctrlKey:u.ctrlKey,shiftKey:u.shiftKey,altKey:u.altKey,metaKey:u.metaKey,button:u.button,screenX:u.screenX,screenY:u.screenY,clientX:u.clientX,clientY:u.clientY});(y=m.current)===null||y===void 0||y.dispatchEvent(g)})}),t))}),or=k.forwardRef((r,a)=>{var{children:t,asChild:n,className:s}=r,o=me(r,["children","asChild","className"]);const{cn:l}=D(),d=sr(!1),m=_e(a,d?.anchorRef),v=n?ye:"a";return j.createElement(v,Object.assign({ref:m},o,{className:l("navds-link-anchor",s)}),t)}),lr=k.forwardRef((r,a)=>{var{className:t}=r,n=me(r,["className"]);const{cn:s}=D();return j.createElement(Ie,Object.assign({ref:a,"aria-hidden":!0,className:s("navds-link-anchor__arrow",t)},n))});function dr(r){var a,t;return!!(!((t=(a=qe(r))===null||a===void 0?void 0:a.getSelection())===null||t===void 0)&&t.toString())}var z=function(r,a){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&a.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(r);s<n.length;s++)a.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(r,n[s])&&(t[n[s]]=r[n[s]]);return t};const[ur,mr]=he({name:"LinkCardContextProvider"}),E=k.forwardRef((r,a)=>{var{children:t,className:n,arrow:s=!0,arrowPosition:o="baseline",size:l="medium"}=r,d=z(r,["children","className","arrow","arrowPosition","size"]);const{cn:m}=D();return j.createElement(ur,{size:l},j.createElement(ir,{asChild:!0},j.createElement(p,Object.assign({as:"div",size:l,ref:a,"data-color":"neutral",className:m("navds-link-card",n,`navds-link-card--${l}`),"data-align-arrow":o},d),t,s&&j.createElement(lr,{fontSize:l==="medium"?"1.75rem":"1.5rem",className:m("navds-link-card__arrow")}))))}),cr=k.forwardRef((r,a)=>{var{children:t,as:n="span",className:s}=r,o=z(r,["children","as","className"]);const{cn:l}=D(),d=mr();return j.createElement(w,Object.assign({ref:a,as:n,size:d.size==="medium"?"small":"xsmall",className:l("navds-link-card__title",s)},o),t)}),gr=or,pr=k.forwardRef((r,a)=>{var{children:t,className:n}=r,s=z(r,["children","className"]);const{cn:o}=D();return j.createElement("div",Object.assign({ref:a,className:o("navds-link-card__description",n)},s),t)}),vr=k.forwardRef((r,a)=>{var{children:t,className:n}=r,s=z(r,["children","className"]);const{cn:o}=D();return j.createElement("div",Object.assign({ref:a,className:o("navds-link-card__footer",n)},s),t)}),jr=k.forwardRef((r,a)=>{var{children:t,className:n}=r,s=z(r,["children","className"]);const{cn:o}=D();return j.createElement("div",Object.assign({ref:a,"aria-hidden":!0,className:o("navds-link-card__icon",n)},s),t)}),hr=k.forwardRef((r,a)=>{var{children:t,className:n,aspectRatio:s,style:o}=r,l=z(r,["children","className","aspectRatio","style"]);const{cn:d}=D();return j.createElement("div",Object.assign({ref:a,className:d("navds-link-card__image-container",n),style:Object.assign(Object.assign({},o),{aspectRatio:s})},l),t)});E.Title=cr;E.Anchor=gr;E.Description=pr;E.Footer=vr;E.Icon=jr;E.Image=hr;const Re=({children:r})=>e.jsx(Le,{header:e.jsxs(e.Fragment,{children:[e.jsx(ce,{below:"md",children:e.jsx(ge,{children:e.jsxs(I,{gap:"space-16",align:"center",children:[e.jsx(B,{color:"lightBlue",size:"large",children:e.jsx(pe,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(w,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(ce,{above:"md",children:e.jsx(ge,{children:e.jsxs(I,{gap:"space-16",align:"center",children:[e.jsx(B,{color:"lightBlue",size:"large",children:e.jsx(pe,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(w,{size:"medium",children:e.jsx(i,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:r});Re.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const Fe=({erAlenesøker:r,barnet:a})=>e.jsx(Ee,{header:e.jsx(i,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:r}}),color:"gray",icon:e.jsx(ke,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(c,{gap:"space-16",children:[e.jsx(M,{children:e.jsx(i,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:r,erAdopsjon:le(a),erFødt:oe(a)}})}),e.jsx(I,{children:e.jsx(se,{href:X.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(fe,{variant:"primary",children:e.jsx(i,{id:"SøkOmForeldrepenger.Søk"})})})})]})});Fe.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"OmBarnet"},description:""}}};const Te=({stønadskontoer:r,barnet:a,hvemPlanlegger:t,arbeidssituasjon:n,hvorLangPeriode:s,fordeling:o,satser:l})=>{const d=ie(),m=oe(a),v=le(a),u=a.antallBarn,y=ne(t),g=H(t),h=V(t,d),b=C(t,d),G=()=>ne(t)&&!t.navnPåFar?e.jsx(i,{id:"OppgittInformasjon.TekstFar1"}):V(t,d),F=()=>ne(t)&&!t.navnPåMedfar?e.jsx(i,{id:"OppgittInformasjon.TekstFar2"}):C(t,d),U=G(),Y=F(),q=de(n),S=r[s.dekningsgrad],_=xe(S),ee=Oe(S),N=o?Z(o.antallDagerSøker1):void 0,L=o?Z(ee.totaltAntallDager-o.antallDagerSøker1):void 0,T=t.type===Q.FAR_OG_FAR&&!v,x=K(be(l)/2);return e.jsx(c,{gap:"space-40",children:e.jsxs(f,{"aria-label":"",onToggle:ue("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(I,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(B,{size:"medium",color:"lightBlue",children:e.jsx(tr,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:g}})})]})}),e.jsx(f.Content,{children:e.jsxs(c,{gap:"space-8",children:[e.jsx(P,{children:e.jsxs(c,{gap:"space-8",children:[e.jsx(w,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:u}})}),a.erFødsel&&m&&e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:u,erFødt:m,dato:d.formatDate(a.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:d.formatDate(a.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),a.erFødsel&&!m&&!v&&e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:u,erFødt:m,dato:d.formatDate(a.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),v&&e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:u,dato2:d.formatDate(a.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:d.formatDate(a.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(P,{children:e.jsxs(c,{gap:"space-8",children:[e.jsx(w,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.Arbeid.Tittel"})}),g&&e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:A(h),arbeidssituasjon:n.status,minsteInntekt:x}})}),!g&&b&&e.jsxs(e.Fragment,{children:[q==="beggeHarRett"&&e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:h,navn2:b,arbeidssituasjon:n.status,minsteInntekt:x}})}),q!=="beggeHarRett"&&y&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:U??A(h),arbeidssituasjon:n.status,minsteInntekt:x}})}),e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:Y??A(b),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:x}})})]}),q!=="beggeHarRett"&&!y&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:A(h),arbeidssituasjon:n.status,minsteInntekt:x}})}),e.jsx(p,{children:e.jsx(i,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:A(b),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:x}})})]})]})]})}),e.jsx(P,{children:e.jsxs(c,{gap:"space-8",children:[e.jsx(w,{size:"xsmall",level:"4",children:e.jsx(i,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:q!=="beggeHarRett"}})}),e.jsxs(p,{children:[!T&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:g,prosent:s.dekningsgrad,uker:_.uker,dager:_.dager,fellesuker:N?.uker||0,fellesdager:N?.dager||0,fellesuker2:L?.uker||0,fellesdager2:L?.dager||0,hvem:V(t,d),hvem2:C(t,d),kunEnPartSkalHa:q!=="beggeHarRett"}}),T&&e.jsx(i,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:g,prosent:s.dekningsgrad,uker:_.uker,dager:_.dager}})]})]})})]})})]})})};Te.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:"{ '100': KontoBeregningDto; '80': KontoBeregningDto }",signature:{properties:[{key:"100",value:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]},required:!0}}]}},description:""},barnet:{required:!0,tsType:{name:"OmBarnet"},description:""},hvemPlanlegger:{required:!0,tsType:{name:"HvemPlanlegger"},description:""},arbeidssituasjon:{required:!0,tsType:{name:"Arbeidssituasjon"},description:""},hvorLangPeriode:{required:!0,tsType:{name:"HvorLangPeriode"},description:""},fordeling:{required:!1,tsType:{name:"Fordeling"},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const De=({valgtStønadskonto:r,hvorLangPeriode:a,hvemPlanlegger:t,barnet:n,arbeidssituasjon:s,fordeling:o})=>{const l=ie(),d=O(R.UTTAKSPLAN),m=de(s),v=Oe(r).totaltAntallDager,u=o?Z(o.antallDagerSøker1):void 0,y=o?Z(v-o.antallDagerSøker1):void 0,g=$e(r),h=ze(m,t)||Ge(m,t),b=Ce(t,m),G=t.type===Q.FAR||t.type===Q.MOR,F=xe(r),U=t.type===Q.FAR_OG_FAR,Y=V(t,l),q=je(Y,l.locale),S=C(t,l),_=S?je(S,l.locale):void 0,ee=We(n),N=o!==void 0,L=er(r),T=d?Qe(N,d,b):L.søker1,x=d?Ze(N,d,b):L.søker2;return e.jsx(c,{gap:"space-40",children:e.jsxs(f,{"aria-label":"",onToggle:ue("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(I,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(B,{size:"medium",color:"lightBlue",children:e.jsx(Ke,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:H(t)}})})]})}),e.jsx(f.Content,{children:e.jsxs(c,{gap:"space-20",children:[m==="beggeHarRett"&&!U&&S&&_&&e.jsxs(P,{children:[e.jsxs(c,{gap:"space-8",children:[e.jsx(p,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgte",values:{prosent:a.dekningsgrad,antallUker:F.uker,antallDager:F.dager,hvem:V(t,l),hvem2:C(t,l),uker:u?.uker||0,dager:u?.dager||0,uker2:y?.uker||0,dager2:y?.dager||0}})}),T.length>0&&e.jsx(p,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:A(q),fom:l.formatDate(T[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:l.formatDate(T.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})]}),e.jsx(e.Fragment,{children:x.length>0&&e.jsx(p,{children:e.jsx(i,{id:"OppsummeringSteg.Periodene",values:{hvem:A(_),fom:l.formatDate(x[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:l.formatDate(x.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})})]}),(H(t)||U)&&e.jsx(P,{children:e.jsxs(c,{gap:"space-8",children:[e.jsx(M,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:a.dekningsgrad,erAlenesøker:H(t),antallUker:F.uker,antallDager:F.dager}})}),T.length>0&&e.jsx(M,{children:e.jsx(i,{id:"OppsummeringSteg.Periode",values:{fom:l.formatDate(T[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:l.formatDate(T.at(-1).tom,{day:"2-digit",month:"short",year:"numeric"}),b:W=>e.jsx("b",{children:W})}})})]})}),m==="kunSøker2HarRett"&&!U&&S&&e.jsx(P,{children:e.jsx(c,{gap:"space-8",children:e.jsx(M,{children:e.jsx(i,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:g.uker,dager1:g.dager,uker2:$(r).uker-g.uker,dager2:$(r).dager-g.dager,hvem:Y,prosent:a.dekningsgrad,antallUker:$(r).uker,dager:$(r).dager}})})})}),e.jsx(Pe,{barn:Be(n),erFarEllerMedmor:b,navnPåForeldre:{farMedmor:S||"",mor:Y},modus:"planlegger",valgtStønadskonto:r,aleneOmOmsorg:G,erMedmorDelAvSøknaden:!1,bareFarMedmorHarRett:h,harAktivitetskravIPeriodeUtenUttak:!1,erDeltUttak:N,saksperioder:d??[...L.søker1,...L.søker2],children:e.jsx(Ne,{barnehagestartdato:ee,readOnly:!0})})]})})]})})};De.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"flerbarn",value:{name:"number",required:!0}},{key:"prematur",value:{name:"number",required:!0}}]},required:!1}}]}},description:""},hvorLangPeriode:{required:!0,tsType:{name:"HvorLangPeriode"},description:""},hvemPlanlegger:{required:!0,tsType:{name:"HvemPlanlegger"},description:""},barnet:{required:!0,tsType:{name:"OmBarnet"},description:""},arbeidssituasjon:{required:!0,tsType:{name:"Arbeidssituasjon"},description:""},fordeling:{required:!1,tsType:{name:"Fordeling"},description:""}}};const ae=({satser:r,lønnSøker:a,fornavn:t})=>{const n=J(O(R.HVEM_PLANLEGGER)),s=H(n),l=6*be(r),d=l/12,m=d/21.67,v=80/100,u=(g,h)=>Math.round(Math.min(g,d)*h),y=(g,h)=>Math.round(Math.min(g*12/260,m)*h);return e.jsx(c,{gap:"space-40",children:e.jsx(P,{children:e.jsxs(c,{gap:"space-8",children:[e.jsxs(I,{justify:"space-between",wrap:!1,children:[e.jsx(w,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(i,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:A(t),erAlenesøker:s,utbetaling100:K(y(a,1)),utbetaling80:K(y(a,v))}})}),e.jsx(B,{size:"medium",color:"blue",children:e.jsx(te,{height:24,width:24,color:"var(--ax-bg-accent-strong)",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(p,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:K(u(a,1)),utbetaling80:K(u(a,v))}})}),a>=d&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(i,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:K(l),a:g=>e.jsx(se,{href:X.grunnbeløpet,target:"_blank",rel:"noreferrer",children:g})}})}),e.jsx(p,{children:e.jsx(i,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:t,erAlenesøker:s}})})]}),e.jsx(p,{children:e.jsx(i,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:s,hvem:t,inntekt:K(u(a,1))}})})]})})})};ae.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Se=({satser:r})=>{const a=ie(),t=J(O(R.HVEM_PLANLEGGER)),n=J(O(R.HVOR_MYE)),s=V(t,a),o=C(t,a);return e.jsx(c,{gap:"space-40",children:(n.lønnSøker1!==void 0||n.lønnSøker2!==void 0)&&e.jsxs(f,{"aria-label":"",onToggle:ue("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(f.Header,{children:e.jsxs(I,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(B,{size:"medium",color:"lightBlue",children:e.jsx(rr,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(f.Title,{size:"small",children:e.jsx(i,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(f.Content,{children:e.jsxs(c,{gap:"space-8",children:[n.lønnSøker1!==void 0&&s&&e.jsx(ae,{satser:r,fornavn:s,lønnSøker:n.lønnSøker1}),n.lønnSøker2!==void 0&&o&&e.jsx(ae,{satser:r,fornavn:o,lønnSøker:n.lønnSøker2})]})})]})})};Se.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const yr=({stønadskontoer:r,satser:a})=>{const t=Ve();Ue();const n=J(O(R.HVEM_PLANLEGGER)),s=J(O(R.OM_BARNET)),o=O(R.HVOR_LANG_PERIODE),l=O(R.ARBEIDSSITUASJON),d=O(R.FORDELING),m=O(R.HVOR_MYE),v=H(n),u=r&&o?r[o.dekningsgrad]:void 0,y=oe(s)&&re(s.fødselsdato).isBefore(Me),g=l?de(l):"ingenHarRett",h=!y&&g!=="ingenHarRett",b=Xe(s),G=re().add(18,"weeks").add(3,"days").toDate(),F=le(s);return e.jsxs(e.Fragment,{children:[e.jsx(Re,{children:e.jsxs(c,{gap:"space-40",children:[e.jsxs(c,{gap:"space-20",children:[!h&&e.jsx(c,{gap:"space-20",children:e.jsxs(Ee,{header:v?e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(i,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(ke,{height:24,width:24,color:"var(--ax-bg-success-strong)","aria-hidden":!0}),color:"green",children:[e.jsx(M,{children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:v}})}),e.jsxs(M,{children:[e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(se,{inlineText:!0,href:X.veiviser,children:e.jsx(i,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),r&&u&&o&&l&&e.jsxs(c,{gap:"space-8",children:[h&&e.jsx(De,{valgtStønadskonto:u,hvorLangPeriode:o,hvemPlanlegger:n,barnet:s,arbeidssituasjon:l,fordeling:d}),m&&e.jsx(Se,{satser:a}),!F&&e.jsx(Je,{hvemPlanlegger:n,barnet:s}),e.jsx(Te,{stønadskontoer:r,barnet:s,hvemPlanlegger:n,arbeidssituasjon:l,hvorLangPeriode:o,fordeling:d,satser:a})]}),e.jsx(Ye,{erAlenesøker:v}),(h&&re(b).isBefore(G)||h&&F)&&e.jsx(Fe,{erAlenesøker:v,barnet:s})]}),e.jsx(c,{gap:"space-40",children:e.jsx(I,{children:e.jsx(fe,{variant:"secondary",onClick:t.goToPreviousDefaultStep,icon:e.jsx(He,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(i,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:"bg-ax-neutral-200 pb-4",children:e.jsxs(c,{gap:"space-16",className:"mx-auto max-w-[560px] px-8 py-4",children:[e.jsx(w,{level:"2",size:"medium",children:e.jsx(i,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsxs(E,{size:"small",children:[e.jsx(ve,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(E.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(E.Title,{children:e.jsx(E.Anchor,{href:X.hvorMye,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserHvorMye"})})})]}),e.jsxs(E,{size:"small",children:[e.jsx(ve,{asChild:!0,style:{backgroundColor:"var(--ax-bg-moderateA)"},children:e.jsx(E.Icon,{children:e.jsx(te,{height:43,width:43})})}),e.jsx(E.Title,{children:e.jsx(E.Anchor,{href:X.veiviser,target:"_blank",rel:"noreferrer",children:e.jsx(i,{id:"OppsummeringSteg.VeiviserFpEllerEs"})})})]})]})})]})};yr.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{yr as O};
