import{u as pe,j as e,V as c,H as q}from"./VStack-WHXoK350.js";import{u as ge,n as W,b as _,C as R}from"./usePlanleggerNavigator-BbQYBIAD.js";import{u as $,d as ee,M as r,H as j,a as m,B as x,c as ce}from"./Label-8FC7ZTne.js";import{k as U,b as D,c as T,g as P,S as re,l as K}from"./HvemPlanleggerUtils-CBBhcrhA.js";import{e as ne,b as ke}from"./barnetUtils-Dtg6gkcN.js";import{u as N}from"./hvemHarRettUtils-DFppgErY.js";import{c as G,G as w,C as je,P as ye,a as J,A as he,L as E,l as H,d as xe,B as ve,i as Y}from"./Infobox-Bqsi6VYS.js";import{r as B}from"./index-DVXBtNgz.js";import{u as fe}from"./useScrollBehaviour-WVMBWXos.js";import{f as be,a as Fe,S as Q}from"./satserUtils-i7vs8qGY.js";import{d as te,e as v,h as Se,f as qe,a as we}from"./uttakUtils-CJz5obiz.js";import{l as Ae}from"./Arbeidssituasjon-Cg8qYJhm.js";import{E as L}from"./ExpansionCard-Bs2A7m_e.js";import{l as Ce,C as Oe}from"./kalenderPerioderUtils-DeQcfKuI.js";import{S as X}from"./Responsive-v0bO3VNk.js";import{S as Me}from"./TasklistStart-B0h6AqDi.js";import{S as _e}from"./ArrowLeft-Dtu47hhV.js";var Re=function(t,o){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&o.indexOf(a)<0&&(n[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,a=Object.getOwnPropertySymbols(t);d<a.length;d++)o.indexOf(a[d])<0&&Object.prototype.propertyIsEnumerable.call(t,a[d])&&(n[a[d]]=t[a[d]]);return n};const Te=B.forwardRef((t,o)=>{var{title:n,titleId:a}=t,d=Re(t,["title","titleId"]);let s=pe();return s=n?a||"title-"+s:void 0,B.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:o,"aria-labelledby":s},d),n?B.createElement("title",{id:s},n):null,B.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675V6ZM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25H6Zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5H9Zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5H15Z",fill:"currentColor"}))}),Pe=t=>{t&&Ae("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"toggle-oppgitt-informasjon"})},ae=({stønadskontoer:t,barnet:o,hvemPlanlegger:n,arbeidssituasjon:a,hvorLangPeriode:d,fordeling:s,satser:i})=>{const l=$(),u=ne(o),k=ke(o),y=o.antallBarn,f=U(n),p=D(n),h=T(n,l),A=P(n,l),C=()=>U(n)&&!n.navnPåFar?e.jsx(r,{id:"OppgittInformasjon.TekstFar1"}):T(n,l),I=()=>U(n)&&!n.navnPåMedfar?e.jsx(r,{id:"OppgittInformasjon.TekstFar2"}):P(n,l),b=C(),g=I(),O=t[d.dekningsgrad],le=te(O),Z=v(O),V=k?v(O)-Se(O):v(O),ue=s?s.antallUkerSøker1:"",me=s?le-s.antallUkerSøker1:"",M=N(a),z=n.type===re.FAR_OG_FAR&&!k,F=be(Fe(i,ee())/2);return e.jsx(c,{gap:"10",children:e.jsxs(L,{"aria-label":"",onToggle:Pe,size:"small",children:[e.jsx(L.Header,{children:e.jsxs(q,{gap:"6",align:"center",wrap:!1,children:[e.jsx(G,{size:"medium",color:"green",children:e.jsx(Te,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(L.Title,{size:"small",children:e.jsx(r,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:p}})})]})}),e.jsx(L.Content,{children:e.jsxs(c,{gap:"10",children:[e.jsx(w,{children:e.jsxs(e.Fragment,{children:[e.jsx(j,{size:"small",level:"4",children:e.jsx(r,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:y}})}),o.erFødsel&&u&&e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:y,erFødt:u,dato:l.formatDate(o.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:l.formatDate(o.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),o.erFødsel&&!u&&!k&&e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:y,erFødt:u,dato:l.formatDate(o.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),k&&e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:y,dato2:l.formatDate(o.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:l.formatDate(o.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(w,{children:e.jsxs(e.Fragment,{children:[e.jsx(j,{size:"small",level:"4",children:e.jsx(r,{id:"OppgittInformasjon.Arbeid.Tittel"})}),p&&e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:h,arbeidssituasjon:a.status,minsteInntekt:F}})}),!p&&e.jsxs(e.Fragment,{children:[M==="beggeHarRett"&&e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:h,navn2:A,arbeidssituasjon:a.status,minsteInntekt:F}})}),M!=="beggeHarRett"&&f&&e.jsxs(e.Fragment,{children:[e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:b||h,arbeidssituasjon:a.status,minsteInntekt:F}})}),e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:g||A,arbeidssituasjon:a.jobberAnnenPart,minsteInntekt:F}})})]}),M!=="beggeHarRett"&&!f&&e.jsxs(e.Fragment,{children:[e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:h,arbeidssituasjon:a.status,minsteInntekt:F}})}),e.jsx(m,{children:e.jsx(r,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:A,arbeidssituasjon:a.jobberAnnenPart,minsteInntekt:F}})})]})]})]})}),e.jsxs(w,{children:[e.jsx(j,{size:"small",level:"4",children:e.jsx(r,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:M!=="beggeHarRett"}})}),e.jsx(c,{gap:"5",children:e.jsxs(m,{children:[!z&&e.jsx(r,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:p,prosent:d.dekningsgrad,uker:k?V:Z,fellesuker:ue,fellesuker2:me,hvem:T(n,l),hvem2:P(n,l),kunEnPartSkalHa:M!=="beggeHarRett"}}),z&&e.jsx(r,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:p,prosent:d.dekningsgrad,uker:k?V:Z}})]})})]})]})})]})})};ae.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
    antallUkerSøker1: number;
}`,signature:{properties:[{key:"antallUkerSøker1",value:{name:"number",required:!0}}]}},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const se=({valgtStønadskonto:t,hvorLangPeriode:o,hvemPlanlegger:n,barnet:a,arbeidssituasjon:d,fordeling:s})=>{const i=$(),l=N(d),u=qe(l,n,t,a,s==null?void 0:s.antallUkerSøker1),k=te(t),y=s?s.antallUkerSøker1:"",f=s?k-s.antallUkerSøker1:"",p=we(t),h=v(t)-p,A=Ce(t,a,n,d,s==null?void 0:s.antallUkerSøker1),C=n.type===re.FAR_OG_FAR,I=T(n,i),b=P(n,i);return e.jsxs(c,{gap:"5",children:[l==="beggeHarRett"&&!C&&b&&e.jsxs(w,{children:[e.jsx(j,{level:"4",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.Perioden"})}),e.jsx(m,{children:e.jsx(r,{id:"OppsummeringSteg.DereValgte",values:{prosent:o.dekningsgrad,antallUker:v(t),hvem:T(n,i),hvem2:P(n,i),uker:y,uker2:f}})}),e.jsx(m,{children:e.jsx(r,{id:"OppsummeringSteg.Periodene",values:{hvem:K(I,i.locale),fom:i.formatDate(u.startdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),tom:i.formatDate(u.sluttdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})}),e.jsx(m,{children:e.jsx(r,{id:"OppsummeringSteg.Periodene",values:{hvem:K(b,i.locale),fom:i.formatDate(u.startdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),tom:i.formatDate(u.sluttdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})})]}),(D(n)||C)&&e.jsx(w,{children:e.jsxs(c,{gap:"2",children:[e.jsx(j,{level:"4",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.Perioden"})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:o.dekningsgrad,erAlenesøker:D(n),antallUker:v(t)}})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringSteg.Periode",values:{fom:i.formatDate(u.startdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),tom:i.formatDate(u.sluttdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})})]})}),l==="kunSøker2HarRett"&&!C&&b&&e.jsxs(w,{children:[e.jsxs(c,{gap:"2",children:[e.jsx(j,{level:"4",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.Perioden"})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:p,uker2:h,hvem:I,prosent:o.dekningsgrad,antallUker:v(t)}})}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringSteg.UtenAktivitetskrav",values:{fom:i.formatDate(u.startdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),tom:i.formatDate(u.sluttdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})})," "]}),e.jsx(x,{children:e.jsx(r,{id:"OppsummeringSteg.MedAktivitetskrav",values:{fom:i.formatDate(u.startdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),tom:i.formatDate(u.sluttdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),b:g=>e.jsx("b",{children:g})}})})]}),e.jsx(Oe,{uttaksdata:u,hvemPlanlegger:n,barnet:a,hvemHarRett:l}),e.jsx(je,{periods:A,useSmallerWidth:!0})]})};se.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},hvorLangPeriode:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
    antallUkerSøker1: number;
}`,signature:{properties:[{key:"antallUkerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const ie=({children:t})=>e.jsx(ye,{header:e.jsxs(e.Fragment,{children:[e.jsx(X,{below:"md",children:e.jsx(J,{isDarkGreen:!0,children:e.jsxs(q,{gap:"4",align:"center",children:[e.jsx(G,{color:"darkGreen",size:"large",children:e.jsx(Q,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j,{size:"medium",children:e.jsx(r,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(X,{above:"md",children:e.jsx(J,{children:e.jsxs(q,{gap:"4",align:"center",children:[e.jsx(G,{color:"darkGreen",size:"xl",children:e.jsx(Q,{height:40,width:40,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j,{size:"medium",children:e.jsx(r,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:t});ie.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader"};const oe=()=>e.jsxs("svg",{width:"43",height:"43",viewBox:"0 0 43 43",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsxs("g",{clipPath:"url(#clip0_2436_45092)",children:[e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M21.3322 27.4087C24.0323 27.4087 26.2211 29.5808 26.2211 32.2602C26.2211 34.9396 24.0323 37.1117 21.3322 37.1117C18.6322 37.1117 16.4434 34.9396 16.4434 32.2602C16.4434 29.5808 18.6322 27.4087 21.3322 27.4087Z",fill:"#CCE2F0"}),e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M21.3313 13.9394C19.5592 13.9394 18.666 15.1938 18.666 16.078H10.666C10.666 10.226 15.7526 6.00049 21.3313 6.00049C26.9097 6.00049 31.9993 10.2245 31.9993 16.078C31.9993 18.8697 30.7992 21.4443 28.7606 23.3131L28.7446 23.3278L28.7284 23.3423L28.6963 23.3708C28.7606 23.3131 28.7277 23.3429 28.7277 23.3429L28.7253 23.345L28.722 23.348L28.7145 23.3547L28.6963 23.3708C28.6828 23.3827 28.6665 23.397 28.6475 23.4135C28.6096 23.4464 28.5606 23.4883 28.5013 23.5379C28.3828 23.6369 28.2218 23.7678 28.0229 23.9206C27.6278 24.2241 27.0687 24.6255 26.3839 25.0399L26.347 25.0622C26.082 25.2225 25.824 25.3786 25.5625 25.5469C25.4782 25.6012 25.3985 25.6536 25.3235 25.704V26.1233H24.7589C24.7362 26.1433 24.7259 26.1531 24.7259 26.1531C24.7259 26.1531 24.7352 26.143 24.7519 26.1233H17.3235V24.9321L17.3406 24.2695C17.3533 22.7329 18.1283 21.6346 18.5155 21.1516C18.983 20.5684 19.5225 20.1053 19.9371 19.7809C20.7247 19.1643 21.6284 18.6185 22.1339 18.3131C22.1637 18.2951 22.1921 18.278 22.219 18.2617C22.6018 18.0301 22.9152 17.8047 23.1256 17.643C23.2295 17.5632 23.3045 17.5019 23.3464 17.4668C23.3526 17.4617 23.358 17.4571 23.3627 17.4532C23.8199 17.0206 23.9993 16.5386 23.9993 16.078C23.9993 15.1954 23.1065 13.9394 21.3313 13.9394Z",fill:"#CCE2F0"}),e.jsx("path",{d:"M3.16762 4.92043L4.30234 6.34635L6.99405 3.7364",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M7.59961 5.92627H12.6663",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M7.59961 10.0005L12.6663 10.0005",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M7.59961 14.0747L12.6663 14.0747",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-7-inside-1_2436_45092",fill:"white",children:e.jsx("rect",{y:"0.222656",width:"16.8889",height:"19.5556",rx:"0.888889"})}),e.jsx("rect",{y:"0.222656",width:"16.8889",height:"19.5556",rx:"0.888889",stroke:"#23262A",strokeWidth:"2.66667",mask:"url(#path-7-inside-1_2436_45092)"}),e.jsx("ellipse",{cx:"5.11155",cy:"10.0437",rx:"0.888889",ry:"0.8577",fill:"#23262A"}),e.jsx("ellipse",{cx:"5.11155",cy:"13.9461",rx:"0.888889",ry:"0.8577",fill:"#23262A"}),e.jsx("circle",{cx:"26.0009",cy:"27.556",r:"8.88889",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("line",{x1:"32.4714",y1:"33.5291",x2:"41.3603",y2:"42.418",stroke:"#23262A",strokeWidth:"1.33333"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2436_45092",children:e.jsx("rect",{width:"42.6667",height:"42.6667",fill:"white",transform:"translate(0 0.222656)"})})})]});oe.__docgenInfo={description:"",methods:[],displayName:"HvaSkjerNårIkon"};const de=()=>e.jsxs("svg",{width:"43",height:"43",viewBox:"0 0 43 43",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsxs("g",{clipPath:"url(#clip0_2436_45089)",children:[e.jsx("rect",{x:"19.5898",y:"1.77783",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"19.5898",y:"30.5967",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"3.32617",y:"12.8975",width:"3.09791",height:"5.42135",transform:"rotate(-60 3.32617 12.8975)",fill:"#FFECCC"}),e.jsx("rect",{x:"32.502",y:"29.7422",width:"3.09791",height:"5.42135",transform:"rotate(-60 32.502 29.7422)",fill:"#FFECCC"}),e.jsx("rect",{x:"29.4727",y:"3.62402",width:"3.09791",height:"5.42135",transform:"rotate(30 29.4727 3.62402)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.627",y:"32.8003",width:"3.09791",height:"5.42135",transform:"rotate(30 12.627 32.8003)",fill:"#FFECCC"}),e.jsx("rect",{x:"9.91016",y:"5.17236",width:"3.09791",height:"5.42135",transform:"rotate(-30 9.91016 5.17236)",fill:"#FFECCC"}),e.jsx("rect",{x:"26.7539",y:"34.3486",width:"3.09791",height:"5.42135",transform:"rotate(-30 26.7539 34.3486)",fill:"#FFECCC"}),e.jsx("rect",{x:"37.1973",y:"10.207",width:"3.09791",height:"5.42135",transform:"rotate(60 37.1973 10.207)",fill:"#FFECCC"}),e.jsx("rect",{x:"8.02148",y:"27.0513",width:"3.09791",height:"5.42135",transform:"rotate(60 8.02148 27.0513)",fill:"#FFECCC"}),e.jsx("rect",{x:"40.8887",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 40.8887 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.0703",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 12.0703 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"30.444",y:"0.666667",width:"11.5556",height:"18.2222",rx:"5.77778",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M41.1931 5.7037C41.1931 8.49279 38.9598 10.7407 36.2209 10.7407C33.482 10.7407 31.2487 8.49279 31.2487 5.7037C31.2487 2.91462 33.482 0.666667 36.2209 0.666667C38.9598 0.666667 41.1931 2.91462 41.1931 5.7037Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-15-inside-1_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M34.0825 5.70398C34.0825 5.43201 34.3044 5.18546 34.6102 5.18546V7.85212C35.8058 7.85212 36.7491 6.87596 36.7491 5.70398H34.0825ZM34.6102 5.18546C34.9161 5.18546 35.138 5.43201 35.138 5.70398H32.4714C32.4714 6.87596 33.4146 7.85212 34.6102 7.85212V5.18546ZM35.138 5.70398C35.138 5.97594 34.9161 6.22249 34.6102 6.22249V3.55583C33.4146 3.55583 32.4714 4.53199 32.4714 5.70398H35.138ZM34.6102 6.22249C34.3044 6.22249 34.0825 5.97594 34.0825 5.70398H36.7491C36.7491 4.53199 35.8058 3.55583 34.6102 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-15-inside-1_2436_45089)"}),e.jsx("mask",{id:"path-17-inside-2_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M37.3051 5.70398C37.3051 5.43201 37.5271 5.18546 37.8329 5.18546V7.85212C39.0285 7.85212 39.9718 6.87596 39.9718 5.70398H37.3051ZM37.8329 5.18546C38.1387 5.18546 38.3607 5.43201 38.3607 5.70398H35.694C35.694 6.87596 36.6373 7.85212 37.8329 7.85212V5.18546ZM38.3607 5.70398C38.3607 5.97594 38.1387 6.22249 37.8329 6.22249V3.55583C36.6373 3.55583 35.694 4.53199 35.694 5.70398H38.3607ZM37.8329 6.22249C37.5271 6.22249 37.3051 5.97594 37.3051 5.70398H39.9718C39.9718 4.53199 39.0285 3.55583 37.8329 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-17-inside-2_2436_45089)"}),e.jsx("path",{d:"M39.4451 9.582L31.9375 17.1084",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M0.912637 17.5765L13.9992 10.021L17.1486 15.4759C19.2351 19.0897 17.9969 23.7106 14.3831 25.797C10.7694 27.8834 6.14845 26.6452 4.06204 23.0315L0.912637 17.5765Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M27.9975 34.2706L14.9109 41.8262L11.7615 36.3713C9.6751 32.7575 10.9133 28.1366 14.527 26.0502C18.1408 23.9638 22.7617 25.2019 24.8481 28.8157L27.9975 34.2706Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M5.13281 23.5571L17.4496 16.446",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M14.9111 41.8265L13.686 39.7045L18.0822 32.2078L26.7726 32.1489L27.9977 34.2709L14.9111 41.8265Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-24-inside-3_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)"})}),e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)",fill:"#23262A"}),e.jsx("path",{d:"M14.3174 25.8383C14.2685 25.7535 14.3023 25.6564 14.3724 25.616L15.7057 27.9254C16.8994 27.2362 17.321 25.7073 16.6268 24.505L14.3174 25.8383ZM14.3724 25.616C14.4424 25.5756 14.5434 25.5948 14.5924 25.6796L12.283 27.0129C12.9771 28.2153 14.5121 28.6146 15.7057 27.9254L14.3724 25.616ZM14.5924 25.6796C14.6413 25.7644 14.6075 25.8614 14.5374 25.9019L13.2041 23.5925C12.0104 24.2816 11.5888 25.8105 12.283 27.0129L14.5924 25.6796ZM14.5374 25.9019C14.4674 25.9423 14.3664 25.9231 14.3174 25.8383L16.6268 24.505C15.9326 23.3026 14.3977 22.9033 13.2041 23.5925L14.5374 25.9019Z",fill:"#23262A",mask:"url(#path-24-inside-3_2436_45089)"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2436_45089",children:e.jsx("rect",{width:"42.6667",height:"42.6667",fill:"white"})})})]});de.__docgenInfo={description:"",methods:[],displayName:"HvorMyeIkon"};const Ie="_background_1yqen_1",Ee="_content_1yqen_6",He="_lenkepanel_1yqen_12",Be="_panel_1yqen_18",Le="_button_1yqen_24",S={background:Ie,content:Ee,lenkepanel:He,panel:Be,button:Le},De=({stønadskontoer:t,satser:o})=>{const n=ge();fe();const a=W(_(R.HVEM_PLANLEGGER)),d=W(_(R.OM_BARNET)),s=_(R.HVOR_LANG_PERIODE),i=_(R.ARBEIDSSITUASJON),l=_(R.FORDELING),u=D(a),k=t&&s?t[s.dekningsgrad]:void 0,y=ne(d)&&ee(d.fødselsdato).isBefore(ce),f=i?N(i):"ingenHarRett",p=!y&&f!=="ingenHarRett";return e.jsxs(e.Fragment,{children:[e.jsx(ie,{children:e.jsxs(c,{gap:"10",children:[e.jsxs(c,{gap:"5",children:[e.jsx(he,{variant:"info",children:e.jsx(x,{children:p?e.jsx(r,{id:"OppsummeringSteg.InformasjonPlanleggerErUnderUtvikling",values:{a:h=>e.jsx(E,{inlineText:!0,href:H.søknadForeldrepenger,target:"_blank",className:"lenke",rel:"noreferrer",children:h})}}):e.jsx(r,{id:"OppsummeringSteg.InformasjonPlanleggerErUnderUtviklingIkkeRett"})})}),!p&&e.jsx(c,{gap:"5",children:e.jsxs(xe,{header:u?e.jsx(r,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(r,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(Me,{height:24,width:24,color:"#236B7D","aria-hidden":!0}),children:[e.jsx(x,{children:e.jsx(r,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:u}})}),e.jsxs(x,{children:[e.jsx(r,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(E,{inlineText:!0,href:H.veiviser,children:e.jsx(r,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})})]})]})}),t&&k&&s&&i&&e.jsxs(c,{gap:"5",children:[e.jsx(ae,{stønadskontoer:t,barnet:d,hvemPlanlegger:a,arbeidssituasjon:i,hvorLangPeriode:s,fordeling:l,satser:o}),p&&e.jsx(se,{valgtStønadskonto:k,hvorLangPeriode:s,hvemPlanlegger:a,barnet:d,arbeidssituasjon:i,fordeling:l})]})]}),e.jsx(c,{gap:"10",children:e.jsx(q,{children:e.jsx(ve,{variant:"secondary",onClick:n.goToPreviousDefaultStep,icon:e.jsx(_e,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:S.background,children:e.jsxs(c,{gap:"4",className:S.content,children:[e.jsx(j,{level:"2",size:"medium",children:e.jsx(r,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsx(E,{inlineText:!0,href:H.veiviser,target:"_blank",rel:"noreferrer",className:S.lenkepanel,children:e.jsx(Y,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"medium",className:S.panel,children:e.jsxs(q,{gap:"5",align:"center",children:[e.jsx(de,{}),e.jsx(j,{level:"3",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.VeiviserHvorMye"})})]})})}),e.jsx(E,{inlineText:!0,href:H.hvaSkjerNår,target:"_blank",rel:"noreferrer",className:S.lenkepanel,children:e.jsx(Y,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"medium",className:S.panel,children:e.jsxs(q,{gap:"5",align:"center",children:[e.jsx(oe,{}),e.jsx(j,{level:"3",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.VeiviserHvaSkjerNår"})})]})})})]})})]})};De.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    '80': TilgjengeligeStønadskontoerForDekningsgrad;
    '100': TilgjengeligeStønadskontoerForDekningsgrad;
}`,signature:{properties:[{key:"80",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}},{key:"100",value:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]},required:!0}}]}},description:""},satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{De as O};
