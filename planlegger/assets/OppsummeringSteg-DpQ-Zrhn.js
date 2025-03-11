import{j as e}from"./jsx-runtime-CLpGMVip.js";import{b as q,C as w,u as qe}from"./usePlanleggerNavigator-CB5JmEPp.js";import{P as we,b as oe,d as z,H as O,M as t,h as me,B as I,L as re,l as W,j as pe,u as J,a as C,m as p,U as le,e as X,v as Ae,K as Me}from"./VeiviserPage-BEkP5Xgm.js";import{l as ee,b as D,c as P,g as L,S as H,h as Oe,r as ue}from"./HvemPlanleggerUtils-Bv9Egsad.js";import{b as $,e as te,m as Te}from"./barnetUtils-CWB0Dy58.js";import{u as ae,h as Se,a as _e}from"./hvemHarRettUtils-CG2w_MQ5.js";import{r as K}from"./index-CR__hKHy.js";import{u as Re}from"./useScrollBehaviour-Dvq8pEsj.js";import{n as N}from"./validation-DYlyn1BB.js";import"./dateFormValidation-DK8wrmQ9.js";import{S as Ce}from"./ShareDataInfobox-B6N0uX16.js";import{a as de,S as Be}from"./Responsive-B-Uwxu87.js";import{u as Ee,H as A,V as d}from"./VStack-2apmvZh_.js";import{S as ge}from"./Checkmark-DkUBrDzq.js";import{S as ce}from"./TasklistStart-BD91qhzY.js";import{b as He,g as Ie,a as De}from"./BarnehageplassSteg-DZVAH6G0.js";import{l as se}from"./amplitudeUtils-1CrV70-o.js";import{a as R,f as ye}from"./satserUtils-BANzfR7D.js";import{c as je,d as ke,h as Y,g as Pe,a as Le,l as ze,i as Z}from"./uttakUtils-qbhfq-Yv.js";import{c as M}from"./stringUtils-DApHD7Y2.js";import{E as h}from"./ExpansionCard-D1aJY806.js";import{C as Ge}from"./CalendarLabels-DD3DsyYa.js";import{A as Ne}from"./Arbeidssituasjon-i2z_eSVB.js";import{U as Ve}from"./UttaksplanKalender-BGTREnvf.js";import{S as Ke,a as Ze}from"./Wallet-CEpMmkt_.js";import{h as Ue}from"./StepButtonsHookForm-DKwXHReh.js";var We=function(a,s){var r={};for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&s.indexOf(n)<0&&(r[n]=a[n]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,n=Object.getOwnPropertySymbols(a);l<n.length;l++)s.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(a,n[l])&&(r[n[l]]=a[n[l]]);return r};const Ye=K.forwardRef((a,s)=>{var{title:r,titleId:n}=a,l=We(a,["title","titleId"]);let i=Ee();return i=r?n||"title-"+i:void 0,K.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":i},l),r?K.createElement("title",{id:i},r):null,K.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),ve=({children:a})=>e.jsx(we,{header:e.jsxs(e.Fragment,{children:[e.jsx(de,{below:"md",children:e.jsx(oe,{children:e.jsxs(A,{gap:"4",align:"center",children:[e.jsx(z,{color:"lightBlue",size:"large",children:e.jsx(ge,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(O,{size:"medium",children:e.jsx(t,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(de,{above:"md",children:e.jsx(oe,{children:e.jsxs(A,{gap:"4",align:"center",children:[e.jsx(z,{color:"lightBlue",size:"large",children:e.jsx(ge,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(O,{size:"medium",children:e.jsx(t,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:a});ve.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const he=({erAlenesøker:a,barnet:s})=>e.jsx(me,{header:e.jsx(t,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:a}}),color:"gray",icon:e.jsx(ce,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(d,{gap:"4",children:[e.jsx(I,{children:e.jsx(t,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:a,erAdopsjon:$(s),erFødt:te(s)}})}),e.jsx(A,{children:e.jsx(re,{href:W.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(pe,{variant:"primary",children:e.jsx(t,{id:"SøkOmForeldrepenger.Søk"})})})})]})});he.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const fe=({stønadskontoer:a,barnet:s,hvemPlanlegger:r,arbeidssituasjon:n,hvorLangPeriode:l,fordeling:i,satser:u})=>{const o=J(),f=o.locale,x=te(s),g=$(s),m=s.antallBarn,k=ee(r),c=D(r),y=P(r,o),b=L(r,o),j=()=>ee(r)&&!r.navnPåFar?e.jsx(t,{id:"OppgittInformasjon.TekstFar1"}):P(r,o),F=()=>ee(r)&&!r.navnPåMedfar?e.jsx(t,{id:"OppgittInformasjon.TekstFar2"}):L(r,o),G=j(),V=F(),T=ae(n),S=a[l.dekningsgrad],_=je(S),Q=ke(S),v=i?Y(i.antallDagerSøker1):void 0,B=i?Y(Q.totaltAntallDager-i.antallDagerSøker1):void 0,ie=r.type===H.FAR_OG_FAR&&!g,E=R(ye(u)/2,f);return e.jsx(d,{gap:"10",children:e.jsxs(h,{"aria-label":"",onToggle:se("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(h.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(z,{size:"medium",color:"lightBlue",children:e.jsx(Ye,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(h.Title,{size:"small",children:e.jsx(t,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:c}})})]})}),e.jsx(h.Content,{children:e.jsxs(d,{gap:"2",children:[e.jsx(C,{children:e.jsxs(d,{gap:"2",children:[e.jsx(O,{size:"xsmall",level:"4",children:e.jsx(t,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:m}})}),s.erFødsel&&x&&e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:m,erFødt:x,dato:o.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:o.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!x&&!g&&e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:m,erFødt:x,dato:o.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),g&&e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:m,dato2:o.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:o.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(C,{children:e.jsxs(d,{gap:"2",children:[e.jsx(O,{size:"xsmall",level:"4",children:e.jsx(t,{id:"OppgittInformasjon.Arbeid.Tittel"})}),c&&e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:M(y),arbeidssituasjon:n.status,minsteInntekt:E}})}),!c&&b&&e.jsxs(e.Fragment,{children:[T==="beggeHarRett"&&e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:y,navn2:b,arbeidssituasjon:n.status,minsteInntekt:E}})}),T!=="beggeHarRett"&&k&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:G??M(y),arbeidssituasjon:n.status,minsteInntekt:E}})}),e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:V??M(b),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:E}})})]}),T!=="beggeHarRett"&&!k&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:M(y),arbeidssituasjon:n.status,minsteInntekt:E}})}),e.jsx(p,{children:e.jsx(t,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:M(b),arbeidssituasjon:n.jobberAnnenPart,minsteInntekt:E}})})]})]})]})}),e.jsx(C,{children:e.jsxs(d,{gap:"2",children:[e.jsx(O,{size:"xsmall",level:"4",children:e.jsx(t,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:T!=="beggeHarRett"}})}),e.jsxs(p,{children:[!ie&&e.jsx(t,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:c,prosent:l.dekningsgrad,uker:_.uker,dager:_.dager,fellesuker:(v==null?void 0:v.uker)||0,fellesdager:(v==null?void 0:v.dager)||0,fellesuker2:(B==null?void 0:B.uker)||0,fellesdager2:(B==null?void 0:B.dager)||0,hvem:P(r,o),hvem2:L(r,o),kunEnPartSkalHa:T!=="beggeHarRett"}}),ie&&e.jsx(t,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:c,prosent:l.dekningsgrad,uker:_.uker,dager:_.dager}})]})]})})]})})]})})};fe.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},arbeidssituasjon:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const xe=({valgtStønadskonto:a,hvorLangPeriode:s,hvemPlanlegger:r,barnet:n,arbeidssituasjon:l,fordeling:i})=>{const u=J(),o=ae(l),f=Pe(n),x=ke(a).totaltAntallDager,g=i?Y(i.antallDagerSøker1):void 0,m=i?Y(x-i.antallDagerSøker1):void 0,k=Le(a),c=Se(o,r)||_e(o,r);let y;(r.type===H.MOR_OG_MEDMOR||r.type===H.MOR_OG_FAR)&&o==="kunSøker2HarRett"&&(y=le(le(f).denneEllerNeste()).leggTil(30));const b=Oe(r,o),j=ze({erDeltUttak:i!==void 0,famDato:f,tilgjengeligeStønadskontoer:a.kontoer,fellesperiodeDagerMor:i==null?void 0:i.antallDagerSøker1,bareFarMedmorHarRett:c,erAdopsjon:$(n),erFarEllerMedmor:b,startdato:y,erMorUfør:(l==null?void 0:l.status)===Ne.UFØR,erAleneOmOmsorg:r.type===H.FAR||r.type===H.MOR}),F=je(a),G=r.type===H.FAR_OG_FAR,V=P(r,u),T=ue(V,u.locale),S=L(r,u),_=S?ue(S,u.locale):void 0,Q=He(n);return e.jsx(d,{gap:"10",children:e.jsxs(h,{"aria-label":"",onToggle:se("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(h.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(z,{size:"medium",color:"lightBlue",children:e.jsx(Be,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(h.Title,{size:"small",children:e.jsx(t,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:D(r)}})})]})}),e.jsx(h.Content,{children:e.jsxs(d,{gap:"5",children:[o==="beggeHarRett"&&!G&&S&&_&&e.jsxs(C,{children:[e.jsxs(d,{gap:"2",children:[e.jsx(p,{children:e.jsx(t,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:F.uker,antallDager:F.dager,hvem:P(r,u),hvem2:L(r,u),uker:(g==null?void 0:g.uker)||0,dager:(g==null?void 0:g.dager)||0,uker2:(m==null?void 0:m.uker)||0,dager2:(m==null?void 0:m.dager)||0}})}),e.jsx(p,{children:e.jsx(t,{id:"OppsummeringSteg.Periodene",values:{hvem:M(T),fom:u.formatDate(j.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(j.søker1[j.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:v=>e.jsx("b",{children:v})}})})]}),e.jsx(p,{children:e.jsx(t,{id:"OppsummeringSteg.Periodene",values:{hvem:M(_),fom:u.formatDate(j.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(j.søker2[j.søker2.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:v=>e.jsx("b",{children:v})}})})]}),(D(r)||G)&&e.jsx(C,{children:e.jsxs(d,{gap:"2",children:[e.jsx(I,{children:e.jsx(t,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:D(r),antallUker:F.uker,antallDager:F.dager}})}),e.jsx(I,{children:e.jsx(t,{id:"OppsummeringSteg.Periode",values:{fom:u.formatDate(j.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:u.formatDate(j.søker1[j.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:v=>e.jsx("b",{children:v})}})})]})}),o==="kunSøker2HarRett"&&!G&&S&&e.jsx(C,{children:e.jsx(d,{gap:"2",children:e.jsx(I,{children:e.jsx(t,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:k.uker,dager1:k.dager,uker2:Z(a).uker-k.uker,dager2:Z(a).dager-k.dager,hvem:V,prosent:s.dekningsgrad,antallUker:Z(a).uker,dager:Z(a).dager}})})})}),e.jsx(Ve,{bareFarHarRett:c,erFarEllerMedmor:b,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:j.søker1,annenPartsPerioder:j.søker2,navnAnnenPart:"Test",barn:Te(n),planleggerLegend:e.jsx(Ge,{hvemPlanlegger:r,barnet:n,hvemHarRett:o}),barnehagestartdato:Q})]})})]})})};xe.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_FAR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåFar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR_OG_MEDMOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}},{key:"navnPåMedmor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR_OG_FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}},{key:"navnPåMedfar",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.MOR;
    navnPåMor?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.MOR",required:!0}},{key:"navnPåMor",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    type: Situasjon.FAR;
    navnPåFar?: string;
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const ne=({satser:a,lønnSøker:s,fornavn:r})=>{const n=J().locale,l=N(q(w.HVEM_PLANLEGGER)),i=D(l),o=6*ye(a),f=o/12,x=f/21.67,g=80/100,m=(c,y)=>Math.round(Math.min(c,f)*y),k=(c,y)=>Math.round(Math.min(c*12/260,x)*y);return e.jsx(d,{gap:"10",children:e.jsx(C,{children:e.jsxs(d,{gap:"2",children:[e.jsxs(A,{justify:"space-between",wrap:!1,children:[e.jsx(O,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(t,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:M(r),erAlenesøker:i,utbetaling100:R(k(s,1),n),utbetaling80:R(k(s,g),n)}})}),e.jsx(z,{size:"medium",color:"blue",children:e.jsx(Ke,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(p,{children:e.jsx(t,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:R(m(s,1),n),utbetaling80:R(m(s,g),n)}})}),s>=f&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(t,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:R(o,n),a:c=>e.jsx("a",{href:W.grunnbeløpet,target:"_blank",rel:"noreferrer",className:"lenke",children:c})}})}),e.jsx(p,{children:e.jsx(t,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:r,erAlenesøker:i}})})]}),e.jsx(p,{children:e.jsx(t,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:i,hvem:r,inntekt:R(m(s,1),n)}})})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const be=({satser:a})=>{const s=J(),r=N(q(w.HVEM_PLANLEGGER)),n=N(q(w.HVOR_MYE)),l=P(r,s),i=L(r,s);return e.jsx(d,{gap:"10",children:n.lønnSøker1&&e.jsxs(h,{"aria-label":"",onToggle:se("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(h.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(z,{size:"medium",color:"lightBlue",children:e.jsx(Ze,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(h.Title,{size:"small",children:e.jsx(t,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(h.Content,{children:e.jsxs(d,{gap:"2",children:[e.jsx(ne,{satser:a,fornavn:l,lønnSøker:n.lønnSøker1}),(n==null?void 0:n.lønnSøker2)&&n.lønnSøker2!==void 0&&i&&e.jsx(ne,{satser:a,fornavn:i,lønnSøker:n.lønnSøker2})]})})]})})};be.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const Fe=()=>e.jsxs("svg",{width:"43",height:"43",viewBox:"0 0 43 43",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsxs("g",{clipPath:"url(#clip0_2436_45089)",children:[e.jsx("rect",{x:"19.5898",y:"1.77783",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"19.5898",y:"30.5967",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"3.32617",y:"12.8975",width:"3.09791",height:"5.42135",transform:"rotate(-60 3.32617 12.8975)",fill:"#FFECCC"}),e.jsx("rect",{x:"32.502",y:"29.7422",width:"3.09791",height:"5.42135",transform:"rotate(-60 32.502 29.7422)",fill:"#FFECCC"}),e.jsx("rect",{x:"29.4727",y:"3.62402",width:"3.09791",height:"5.42135",transform:"rotate(30 29.4727 3.62402)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.627",y:"32.8003",width:"3.09791",height:"5.42135",transform:"rotate(30 12.627 32.8003)",fill:"#FFECCC"}),e.jsx("rect",{x:"9.91016",y:"5.17236",width:"3.09791",height:"5.42135",transform:"rotate(-30 9.91016 5.17236)",fill:"#FFECCC"}),e.jsx("rect",{x:"26.7539",y:"34.3486",width:"3.09791",height:"5.42135",transform:"rotate(-30 26.7539 34.3486)",fill:"#FFECCC"}),e.jsx("rect",{x:"37.1973",y:"10.207",width:"3.09791",height:"5.42135",transform:"rotate(60 37.1973 10.207)",fill:"#FFECCC"}),e.jsx("rect",{x:"8.02148",y:"27.0513",width:"3.09791",height:"5.42135",transform:"rotate(60 8.02148 27.0513)",fill:"#FFECCC"}),e.jsx("rect",{x:"40.8887",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 40.8887 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.0703",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 12.0703 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"30.444",y:"0.666667",width:"11.5556",height:"18.2222",rx:"5.77778",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M41.1931 5.7037C41.1931 8.49279 38.9598 10.7407 36.2209 10.7407C33.482 10.7407 31.2487 8.49279 31.2487 5.7037C31.2487 2.91462 33.482 0.666667 36.2209 0.666667C38.9598 0.666667 41.1931 2.91462 41.1931 5.7037Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-15-inside-1_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M34.0825 5.70398C34.0825 5.43201 34.3044 5.18546 34.6102 5.18546V7.85212C35.8058 7.85212 36.7491 6.87596 36.7491 5.70398H34.0825ZM34.6102 5.18546C34.9161 5.18546 35.138 5.43201 35.138 5.70398H32.4714C32.4714 6.87596 33.4146 7.85212 34.6102 7.85212V5.18546ZM35.138 5.70398C35.138 5.97594 34.9161 6.22249 34.6102 6.22249V3.55583C33.4146 3.55583 32.4714 4.53199 32.4714 5.70398H35.138ZM34.6102 6.22249C34.3044 6.22249 34.0825 5.97594 34.0825 5.70398H36.7491C36.7491 4.53199 35.8058 3.55583 34.6102 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-15-inside-1_2436_45089)"}),e.jsx("mask",{id:"path-17-inside-2_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M37.3051 5.70398C37.3051 5.43201 37.5271 5.18546 37.8329 5.18546V7.85212C39.0285 7.85212 39.9718 6.87596 39.9718 5.70398H37.3051ZM37.8329 5.18546C38.1387 5.18546 38.3607 5.43201 38.3607 5.70398H35.694C35.694 6.87596 36.6373 7.85212 37.8329 7.85212V5.18546ZM38.3607 5.70398C38.3607 5.97594 38.1387 6.22249 37.8329 6.22249V3.55583C36.6373 3.55583 35.694 4.53199 35.694 5.70398H38.3607ZM37.8329 6.22249C37.5271 6.22249 37.3051 5.97594 37.3051 5.70398H39.9718C39.9718 4.53199 39.0285 3.55583 37.8329 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-17-inside-2_2436_45089)"}),e.jsx("path",{d:"M39.4451 9.582L31.9375 17.1084",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M0.912637 17.5765L13.9992 10.021L17.1486 15.4759C19.2351 19.0897 17.9969 23.7106 14.3831 25.797C10.7694 27.8834 6.14845 26.6452 4.06204 23.0315L0.912637 17.5765Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M27.9975 34.2706L14.9109 41.8262L11.7615 36.3713C9.6751 32.7575 10.9133 28.1366 14.527 26.0502C18.1408 23.9638 22.7617 25.2019 24.8481 28.8157L27.9975 34.2706Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M5.13281 23.5571L17.4496 16.446",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M14.9111 41.8265L13.686 39.7045L18.0822 32.2078L26.7726 32.1489L27.9977 34.2709L14.9111 41.8265Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-24-inside-3_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)"})}),e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)",fill:"#23262A"}),e.jsx("path",{d:"M14.3174 25.8383C14.2685 25.7535 14.3023 25.6564 14.3724 25.616L15.7057 27.9254C16.8994 27.2362 17.321 25.7073 16.6268 24.505L14.3174 25.8383ZM14.3724 25.616C14.4424 25.5756 14.5434 25.5948 14.5924 25.6796L12.283 27.0129C12.9771 28.2153 14.5121 28.6146 15.7057 27.9254L14.3724 25.616ZM14.5924 25.6796C14.6413 25.7644 14.6075 25.8614 14.5374 25.9019L13.2041 23.5925C12.0104 24.2816 11.5888 25.8105 12.283 27.0129L14.5924 25.6796ZM14.5374 25.9019C14.4674 25.9423 14.3664 25.9231 14.3174 25.8383L16.6268 24.505C15.9326 23.3026 14.3977 22.9033 13.2041 23.5925L14.5374 25.9019Z",fill:"#23262A",mask:"url(#path-24-inside-3_2436_45089)"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2436_45089",children:e.jsx("rect",{width:"42.6667",height:"42.6667",fill:"white"})})})]});Fe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeIkon"};const Je="_background_1y3o4_1",$e="_content_1y3o4_6",Qe="_lenkepanel_1y3o4_12",Xe="_panel_1y3o4_18",er="_button_1y3o4_25",U={background:Je,content:$e,lenkepanel:Qe,panel:Xe,button:er},rr=({stønadskontoer:a,satser:s,locale:r})=>{const n=qe(r);Re();const l=N(q(w.HVEM_PLANLEGGER)),i=N(q(w.OM_BARNET)),u=q(w.HVOR_LANG_PERIODE),o=q(w.ARBEIDSSITUASJON),f=q(w.FORDELING),x=q(w.HVOR_MYE),g=D(l),m=a&&u?a[u.dekningsgrad]:void 0,k=te(i)&&X(i.fødselsdato).isBefore(Ae),c=o?ae(o):"ingenHarRett",y=!k&&c!=="ingenHarRett",b=Ie(i),j=X().add(18,"weeks").add(3,"days").toDate(),F=$(i);return e.jsxs(e.Fragment,{children:[e.jsx(ve,{children:e.jsxs(d,{gap:"10",children:[e.jsxs(d,{gap:"5",children:[!y&&e.jsx(d,{gap:"5",children:e.jsxs(me,{header:g?e.jsx(t,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(t,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(ce,{height:24,width:24,color:"#7F8900","aria-hidden":!0}),color:"green",children:[e.jsx(I,{children:e.jsx(t,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:g}})}),e.jsxs(I,{children:[e.jsx(t,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(re,{inlineText:!0,href:W.veiviser,children:e.jsx(t,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})})]})]})}),a&&m&&u&&o&&e.jsxs(d,{gap:"2",children:[y&&e.jsx(xe,{valgtStønadskonto:m,hvorLangPeriode:u,hvemPlanlegger:l,barnet:i,arbeidssituasjon:o,fordeling:f}),x&&e.jsx(be,{satser:s}),!F&&e.jsx(De,{hvemPlanlegger:l,barnet:i}),e.jsx(fe,{stønadskontoer:a,barnet:i,hvemPlanlegger:l,arbeidssituasjon:o,hvorLangPeriode:u,fordeling:f,satser:s})]}),e.jsx(Ce,{erAlenesøker:g}),(y&&X(b).isBefore(j)||y&&F)&&e.jsx(he,{erAlenesøker:g,barnet:i})]}),e.jsx(d,{gap:"10",children:e.jsx(A,{children:e.jsx(pe,{variant:"secondary",onClick:n.goToPreviousDefaultStep,icon:e.jsx(Ue,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(t,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:U.background,children:e.jsxs(d,{gap:"4",className:U.content,children:[e.jsx(O,{level:"2",size:"medium",children:e.jsx(t,{id:"OppsummeringSteg.AnnenVeiviser"})}),e.jsx(re,{inlineText:!0,href:W.veiviser,target:"_blank",rel:"noreferrer",className:U.lenkepanel,children:e.jsx(Me,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"medium",className:U.panel,children:e.jsxs(A,{gap:"5",align:"center",children:[e.jsx(Fe,{}),e.jsx(O,{level:"3",size:"small",children:e.jsx(t,{id:"OppsummeringSteg.VeiviserHvorMye"})})]})})})]})})]})};rr.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""}}};export{rr as O};
