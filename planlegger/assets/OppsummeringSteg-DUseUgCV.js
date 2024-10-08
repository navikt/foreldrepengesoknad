import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{b as F,C as w,u as xe}from"./usePlanleggerNavigator-ykRWW_nA.js";import{H as x,M as r,u as $,c as p,B as C,d as fe,g as be}from"./Label-BZeSnhnH.js";import{k as U,b as P,c as E,g as B,S as ie,m as re}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{e as oe,b as Fe}from"./barnetUtils-Dtg6gkcN.js";import{u as Q}from"./hvemHarRettUtils-BiyQH6Vj.js";import{P as we,a as ne,c as D,B as O,C as qe,l as Z,d as Ae,L as Y,e as Me,o as te}from"./VeiviserPage-RPc-Ebv7.js";import{r as V}from"./index-CTjT7uj6.js";import{u as Ce}from"./useScrollBehaviour-DHGEE0Vi.js";import{n as L}from"./validation-4HO0J-zV.js";import"./dateFormValidation-BCNomYDE.js";import{S as Oe}from"./ShareDataInfobox-YsA2gwmn.js";import{a as ae,S as Se}from"./Responsive-C8snjzxo.js";import{u as Te,H as A,V as c}from"./VStack-CHPVCYB5.js";import{S as se}from"./Checkmark-CHF9SNUp.js";import{b as _e,f as le,a as R}from"./satserUtils-RIH-5EbV.js";import{f as de,c as ue,d as ge,h as W,a as Re,i as K}from"./uttakUtils-B2_fABpb.js";import{l as X}from"./amplitude-DHAkK6DW.js";import{c as q}from"./stringUtils-DWuGC-tf.js";import{E as v}from"./ExpansionCard-9a8rhr3u.js";import{l as He,C as Pe}from"./kalenderPerioderUtils-DnS_JPNz.js";import{S as Ee}from"./SackKroner-DzHmr5wB.js";import{S as Be}from"./TasklistStart-O5RifqLr.js";import{S as Ie}from"./ArrowLeft-l9pGEy0M.js";var De=function(t,s){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&s.indexOf(a)<0&&(n[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,a=Object.getOwnPropertySymbols(t);d<a.length;d++)s.indexOf(a[d])<0&&Object.prototype.propertyIsEnumerable.call(t,a[d])&&(n[a[d]]=t[a[d]]);return n};const Le=V.forwardRef((t,s)=>{var{title:n,titleId:a}=t,d=De(t,["title","titleId"]);let i=Te();return i=n?a||"title-"+i:void 0,V.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":i},d),n?V.createElement("title",{id:i},n):null,V.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),me=({children:t})=>e.jsx(we,{header:e.jsxs(e.Fragment,{children:[e.jsx(ae,{below:"md",children:e.jsx(ne,{children:e.jsxs(A,{gap:"4",align:"center",children:[e.jsx(D,{color:"lightBlue",size:"large",children:e.jsx(se,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(x,{size:"medium",children:e.jsx(r,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(ae,{above:"md",children:e.jsx(ne,{children:e.jsxs(A,{gap:"4",align:"center",children:[e.jsx(D,{color:"lightBlue",size:"large",children:e.jsx(se,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(x,{size:"medium",children:e.jsx(r,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:t});me.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader"};const ze=t=>{t&&X("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"toggle-oppgitt-informasjon"})},pe=({stønadskontoer:t,barnet:s,hvemPlanlegger:n,arbeidssituasjon:a,hvorLangPeriode:d,fordeling:i,satser:o})=>{const l=$(),u=oe(s),f=Fe(s),g=s.antallBarn,y=U(n),m=P(n),j=E(n,l),h=B(n,l),I=()=>U(n)&&!n.navnPåFar?e.jsx(r,{id:"OppgittInformasjon.TekstFar1"}):E(n,l),z=()=>U(n)&&!n.navnPåMedfar?e.jsx(r,{id:"OppgittInformasjon.TekstFar2"}):B(n,l),N=I(),M=z(),b=Q(a),k=t[d.dekningsgrad],ke=de(b,n,k,s,i==null?void 0:i.antallDagerSøker1),G=ue(ke),ve=ge(k),S=i?W(i.antallDagerSøker1):void 0,T=i?W(ve.totaltAntallDager-i.antallDagerSøker1):void 0,ee=n.type===ie.FAR_OG_FAR&&!f,_=_e(le(o)/2);return e.jsx(c,{gap:"10",children:e.jsxs(v,{"aria-label":"",onToggle:ze,size:"small",children:[e.jsx(v.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(D,{size:"medium",color:"lightBlue",children:e.jsx(Le,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(v.Title,{size:"small",children:e.jsx(r,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:m}})})]})}),e.jsx(v.Content,{children:e.jsxs(c,{gap:"2",children:[e.jsx(O,{children:e.jsxs(e.Fragment,{children:[e.jsx(x,{size:"small",level:"4",children:e.jsx(r,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:g}})}),s.erFødsel&&u&&e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:g,erFødt:u,dato:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!u&&!f&&e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:g,erFødt:u,dato:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),f&&e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:g,dato2:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:l.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(O,{children:e.jsxs(e.Fragment,{children:[e.jsx(x,{size:"small",level:"4",children:e.jsx(r,{id:"OppgittInformasjon.Arbeid.Tittel"})}),m&&e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:q(j),arbeidssituasjon:a.status,minsteInntekt:_}})}),!m&&h&&e.jsxs(e.Fragment,{children:[b==="beggeHarRett"&&e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:j,navn2:h,arbeidssituasjon:a.status,minsteInntekt:_}})}),b!=="beggeHarRett"&&y&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:N||q(j),arbeidssituasjon:a.status,minsteInntekt:_}})}),e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:M||q(h),arbeidssituasjon:a.jobberAnnenPart,minsteInntekt:_}})})]}),b!=="beggeHarRett"&&!y&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:q(j),arbeidssituasjon:a.status,minsteInntekt:_}})}),e.jsx(p,{children:e.jsx(r,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:q(h),arbeidssituasjon:a.jobberAnnenPart,minsteInntekt:_}})})]})]})]})}),e.jsxs(O,{children:[e.jsx(x,{size:"small",level:"4",children:e.jsx(r,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:b!=="beggeHarRett"}})}),e.jsx(c,{gap:"5",children:e.jsxs(p,{children:[!ee&&e.jsx(r,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:m,prosent:d.dekningsgrad,uker:G.uker,dager:G.dager,fellesuker:(S==null?void 0:S.uker)||0,fellesdager:(S==null?void 0:S.dager)||0,fellesuker2:(T==null?void 0:T.uker)||0,fellesdager2:(T==null?void 0:T.dager)||0,hvem:E(n,l),hvem2:B(n,l),kunEnPartSkalHa:b!=="beggeHarRett"}}),ee&&e.jsx(r,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:m,prosent:d.dekningsgrad,uker:G.uker,dager:G.dager}})]})})]})]})})]})})};pe.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const Ne=t=>{t&&X("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"toggle-oppgitt-informasjon"})},ce=({valgtStønadskonto:t,hvorLangPeriode:s,hvemPlanlegger:n,barnet:a,arbeidssituasjon:d,fordeling:i})=>{const o=$(),l=Q(d),u=de(l,n,t,a,i==null?void 0:i.antallDagerSøker1),f=ge(t).totaltAntallDager,g=i?W(i.antallDagerSøker1):void 0,y=i?W(f-i.antallDagerSøker1):void 0,m=Re(t),j=He(t,a,n,d,i==null?void 0:i.antallDagerSøker1),h=ue(u),I=n.type===ie.FAR_OG_FAR,z=E(n,o),N=re(z,o.locale),M=B(n,o),b=M?re(M,o.locale):void 0;return e.jsx(c,{gap:"10",children:e.jsxs(v,{"aria-label":"",onToggle:Ne,size:"small",children:[e.jsx(v.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(D,{size:"medium",color:"lightBlue",children:e.jsx(Se,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(v.Title,{size:"small",children:e.jsx(r,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:P(n)}})})]})}),e.jsx(v.Content,{children:e.jsxs(c,{gap:"5",children:[l==="beggeHarRett"&&!I&&M&&b&&e.jsxs(O,{children:[e.jsx(x,{level:"4",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.Perioden"})}),e.jsx(p,{children:e.jsx(r,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:h.uker,antallDager:h.dager,hvem:E(n,o),hvem2:B(n,o),uker:(g==null?void 0:g.uker)||0,dager:(g==null?void 0:g.dager)||0,uker2:(y==null?void 0:y.uker)||0,dager2:(y==null?void 0:y.dager)||0}})}),e.jsx(p,{children:e.jsx(r,{id:"OppsummeringSteg.Periodene",values:{hvem:q(N),fom:o.formatDate(u.startdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(u.sluttdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),b:k=>e.jsx("b",{children:k})}})}),e.jsx(p,{children:e.jsx(r,{id:"OppsummeringSteg.Periodene",values:{hvem:q(b),fom:o.formatDate(u.startdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(u.sluttdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),b:k=>e.jsx("b",{children:k})}})})]}),(P(n)||I)&&e.jsx(O,{children:e.jsxs(c,{gap:"2",children:[e.jsx(x,{level:"4",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.Perioden"})}),e.jsx(C,{children:e.jsx(r,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:P(n),antallUker:h.uker,antallDager:h.dager}})}),e.jsx(C,{children:e.jsx(r,{id:"OppsummeringSteg.Periode",values:{fom:o.formatDate(u.startdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(u.sluttdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),b:k=>e.jsx("b",{children:k})}})})]})}),l==="kunSøker2HarRett"&&!I&&M&&e.jsxs(O,{children:[e.jsxs(c,{gap:"2",children:[e.jsx(x,{level:"4",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.Perioden"})}),e.jsx(C,{children:e.jsx(r,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:m.uker,dager1:m.dager,uker2:K(t).uker-m.uker,dager2:K(t).dager-m.dager,hvem:z,prosent:s.dekningsgrad,antallUker:K(t).uker,dager:K(t).dager}})}),e.jsx(C,{children:e.jsx(r,{id:"OppsummeringSteg.UtenAktivitetskrav",values:{fom:o.formatDate(u.startdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(u.sluttdatoPeriode1,{day:"2-digit",month:"short",year:"numeric"}),b:k=>e.jsx("b",{children:k})}})})," "]}),e.jsx(C,{children:e.jsx(r,{id:"OppsummeringSteg.MedAktivitetskrav",values:{fom:o.formatDate(u.startdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),tom:o.formatDate(u.sluttdatoPeriode2,{day:"2-digit",month:"short",year:"numeric"}),b:k=>e.jsx("b",{children:k})}})})]}),e.jsx(Pe,{uttaksdata:u,hvemPlanlegger:n,barnet:a,hvemHarRett:l}),e.jsx(qe,{periods:j,useSmallerWidth:!0})]})})]})})};ce.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const J=({satser:t,lønnSøker:s,fornavn:n})=>{const a=L(F(w.HVEM_PLANLEGGER)),d=P(a),o=6*le(t),l=o/12,u=l/21.67,f=80/100,g=(m,j)=>Math.round(Math.min(m,l)*j),y=(m,j)=>Math.round(Math.min(m*12/260,u)*j);return e.jsx(c,{gap:"10",children:e.jsx(O,{children:e.jsxs(e.Fragment,{children:[e.jsx(x,{size:"small",level:"4",children:e.jsx(r,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:q(n),erAlenesøker:d,utbetaling100:R(y(s,1)),utbetaling80:R(y(s,f))}})}),e.jsx(p,{children:e.jsx(r,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:R(g(s,1)),utbetaling80:R(g(s,f))}})}),s>=l&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(r,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:R(o),a:m=>e.jsx("a",{href:Z.grunnbeløpet,target:"_blank",rel:"noreferrer",children:m})}})}),e.jsx(p,{children:e.jsx(r,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:n,erAlenesøker:d}})})]}),e.jsx(p,{children:e.jsx(r,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:d,hvem:n,inntekt:R(g(s,1))}})})]})})})};J.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Ge=t=>{t&&X("applikasjon-hendelse",{app:"planlegger",team:"foreldrepenger",pageKey:"toggle-oppgitt-informasjon"})},ye=({satser:t})=>{const s=$(),n=L(F(w.HVEM_PLANLEGGER)),a=L(F(w.HVOR_MYE)),d=E(n,s),i=B(n,s);return e.jsx(c,{gap:"10",children:a.lønnSøker1&&e.jsxs(v,{"aria-label":"",onToggle:Ge,size:"small",children:[e.jsx(v.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(D,{size:"medium",color:"lightBlue",children:e.jsx(Ee,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(v.Title,{size:"small",children:e.jsx(r,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(v.Content,{children:e.jsxs(c,{gap:"2",children:[e.jsx(J,{satser:t,fornavn:d,lønnSøker:a.lønnSøker1}),(a==null?void 0:a.lønnSøker2)&&a.lønnSøker2!==void 0&&i&&e.jsx(J,{satser:t,fornavn:i,lønnSøker:a.lønnSøker2})]})})]})})};ye.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const je=()=>e.jsxs("svg",{width:"43",height:"43",viewBox:"0 0 43 43",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsxs("g",{clipPath:"url(#clip0_2436_45092)",children:[e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M21.3322 27.4087C24.0323 27.4087 26.2211 29.5808 26.2211 32.2602C26.2211 34.9396 24.0323 37.1117 21.3322 37.1117C18.6322 37.1117 16.4434 34.9396 16.4434 32.2602C16.4434 29.5808 18.6322 27.4087 21.3322 27.4087Z",fill:"#CCE2F0"}),e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M21.3313 13.9394C19.5592 13.9394 18.666 15.1938 18.666 16.078H10.666C10.666 10.226 15.7526 6.00049 21.3313 6.00049C26.9097 6.00049 31.9993 10.2245 31.9993 16.078C31.9993 18.8697 30.7992 21.4443 28.7606 23.3131L28.7446 23.3278L28.7284 23.3423L28.6963 23.3708C28.7606 23.3131 28.7277 23.3429 28.7277 23.3429L28.7253 23.345L28.722 23.348L28.7145 23.3547L28.6963 23.3708C28.6828 23.3827 28.6665 23.397 28.6475 23.4135C28.6096 23.4464 28.5606 23.4883 28.5013 23.5379C28.3828 23.6369 28.2218 23.7678 28.0229 23.9206C27.6278 24.2241 27.0687 24.6255 26.3839 25.0399L26.347 25.0622C26.082 25.2225 25.824 25.3786 25.5625 25.5469C25.4782 25.6012 25.3985 25.6536 25.3235 25.704V26.1233H24.7589C24.7362 26.1433 24.7259 26.1531 24.7259 26.1531C24.7259 26.1531 24.7352 26.143 24.7519 26.1233H17.3235V24.9321L17.3406 24.2695C17.3533 22.7329 18.1283 21.6346 18.5155 21.1516C18.983 20.5684 19.5225 20.1053 19.9371 19.7809C20.7247 19.1643 21.6284 18.6185 22.1339 18.3131C22.1637 18.2951 22.1921 18.278 22.219 18.2617C22.6018 18.0301 22.9152 17.8047 23.1256 17.643C23.2295 17.5632 23.3045 17.5019 23.3464 17.4668C23.3526 17.4617 23.358 17.4571 23.3627 17.4532C23.8199 17.0206 23.9993 16.5386 23.9993 16.078C23.9993 15.1954 23.1065 13.9394 21.3313 13.9394Z",fill:"#CCE2F0"}),e.jsx("path",{d:"M3.16762 4.92043L4.30234 6.34635L6.99405 3.7364",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M7.59961 5.92627H12.6663",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M7.59961 10.0005L12.6663 10.0005",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M7.59961 14.0747L12.6663 14.0747",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-7-inside-1_2436_45092",fill:"white",children:e.jsx("rect",{y:"0.222656",width:"16.8889",height:"19.5556",rx:"0.888889"})}),e.jsx("rect",{y:"0.222656",width:"16.8889",height:"19.5556",rx:"0.888889",stroke:"#23262A",strokeWidth:"2.66667",mask:"url(#path-7-inside-1_2436_45092)"}),e.jsx("ellipse",{cx:"5.11155",cy:"10.0437",rx:"0.888889",ry:"0.8577",fill:"#23262A"}),e.jsx("ellipse",{cx:"5.11155",cy:"13.9461",rx:"0.888889",ry:"0.8577",fill:"#23262A"}),e.jsx("circle",{cx:"26.0009",cy:"27.556",r:"8.88889",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("line",{x1:"32.4714",y1:"33.5291",x2:"41.3603",y2:"42.418",stroke:"#23262A",strokeWidth:"1.33333"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2436_45092",children:e.jsx("rect",{width:"42.6667",height:"42.6667",fill:"white",transform:"translate(0 0.222656)"})})})]});je.__docgenInfo={description:"",methods:[],displayName:"HvaSkjerNårIkon"};const he=()=>e.jsxs("svg",{width:"43",height:"43",viewBox:"0 0 43 43",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsxs("g",{clipPath:"url(#clip0_2436_45089)",children:[e.jsx("rect",{x:"19.5898",y:"1.77783",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"19.5898",y:"30.5967",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"3.32617",y:"12.8975",width:"3.09791",height:"5.42135",transform:"rotate(-60 3.32617 12.8975)",fill:"#FFECCC"}),e.jsx("rect",{x:"32.502",y:"29.7422",width:"3.09791",height:"5.42135",transform:"rotate(-60 32.502 29.7422)",fill:"#FFECCC"}),e.jsx("rect",{x:"29.4727",y:"3.62402",width:"3.09791",height:"5.42135",transform:"rotate(30 29.4727 3.62402)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.627",y:"32.8003",width:"3.09791",height:"5.42135",transform:"rotate(30 12.627 32.8003)",fill:"#FFECCC"}),e.jsx("rect",{x:"9.91016",y:"5.17236",width:"3.09791",height:"5.42135",transform:"rotate(-30 9.91016 5.17236)",fill:"#FFECCC"}),e.jsx("rect",{x:"26.7539",y:"34.3486",width:"3.09791",height:"5.42135",transform:"rotate(-30 26.7539 34.3486)",fill:"#FFECCC"}),e.jsx("rect",{x:"37.1973",y:"10.207",width:"3.09791",height:"5.42135",transform:"rotate(60 37.1973 10.207)",fill:"#FFECCC"}),e.jsx("rect",{x:"8.02148",y:"27.0513",width:"3.09791",height:"5.42135",transform:"rotate(60 8.02148 27.0513)",fill:"#FFECCC"}),e.jsx("rect",{x:"40.8887",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 40.8887 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.0703",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 12.0703 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"30.444",y:"0.666667",width:"11.5556",height:"18.2222",rx:"5.77778",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M41.1931 5.7037C41.1931 8.49279 38.9598 10.7407 36.2209 10.7407C33.482 10.7407 31.2487 8.49279 31.2487 5.7037C31.2487 2.91462 33.482 0.666667 36.2209 0.666667C38.9598 0.666667 41.1931 2.91462 41.1931 5.7037Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-15-inside-1_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M34.0825 5.70398C34.0825 5.43201 34.3044 5.18546 34.6102 5.18546V7.85212C35.8058 7.85212 36.7491 6.87596 36.7491 5.70398H34.0825ZM34.6102 5.18546C34.9161 5.18546 35.138 5.43201 35.138 5.70398H32.4714C32.4714 6.87596 33.4146 7.85212 34.6102 7.85212V5.18546ZM35.138 5.70398C35.138 5.97594 34.9161 6.22249 34.6102 6.22249V3.55583C33.4146 3.55583 32.4714 4.53199 32.4714 5.70398H35.138ZM34.6102 6.22249C34.3044 6.22249 34.0825 5.97594 34.0825 5.70398H36.7491C36.7491 4.53199 35.8058 3.55583 34.6102 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-15-inside-1_2436_45089)"}),e.jsx("mask",{id:"path-17-inside-2_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M37.3051 5.70398C37.3051 5.43201 37.5271 5.18546 37.8329 5.18546V7.85212C39.0285 7.85212 39.9718 6.87596 39.9718 5.70398H37.3051ZM37.8329 5.18546C38.1387 5.18546 38.3607 5.43201 38.3607 5.70398H35.694C35.694 6.87596 36.6373 7.85212 37.8329 7.85212V5.18546ZM38.3607 5.70398C38.3607 5.97594 38.1387 6.22249 37.8329 6.22249V3.55583C36.6373 3.55583 35.694 4.53199 35.694 5.70398H38.3607ZM37.8329 6.22249C37.5271 6.22249 37.3051 5.97594 37.3051 5.70398H39.9718C39.9718 4.53199 39.0285 3.55583 37.8329 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-17-inside-2_2436_45089)"}),e.jsx("path",{d:"M39.4451 9.582L31.9375 17.1084",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M0.912637 17.5765L13.9992 10.021L17.1486 15.4759C19.2351 19.0897 17.9969 23.7106 14.3831 25.797C10.7694 27.8834 6.14845 26.6452 4.06204 23.0315L0.912637 17.5765Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M27.9975 34.2706L14.9109 41.8262L11.7615 36.3713C9.6751 32.7575 10.9133 28.1366 14.527 26.0502C18.1408 23.9638 22.7617 25.2019 24.8481 28.8157L27.9975 34.2706Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M5.13281 23.5571L17.4496 16.446",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M14.9111 41.8265L13.686 39.7045L18.0822 32.2078L26.7726 32.1489L27.9977 34.2709L14.9111 41.8265Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-24-inside-3_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)"})}),e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)",fill:"#23262A"}),e.jsx("path",{d:"M14.3174 25.8383C14.2685 25.7535 14.3023 25.6564 14.3724 25.616L15.7057 27.9254C16.8994 27.2362 17.321 25.7073 16.6268 24.505L14.3174 25.8383ZM14.3724 25.616C14.4424 25.5756 14.5434 25.5948 14.5924 25.6796L12.283 27.0129C12.9771 28.2153 14.5121 28.6146 15.7057 27.9254L14.3724 25.616ZM14.5924 25.6796C14.6413 25.7644 14.6075 25.8614 14.5374 25.9019L13.2041 23.5925C12.0104 24.2816 11.5888 25.8105 12.283 27.0129L14.5924 25.6796ZM14.5374 25.9019C14.4674 25.9423 14.3664 25.9231 14.3174 25.8383L16.6268 24.505C15.9326 23.3026 14.3977 22.9033 13.2041 23.5925L14.5374 25.9019Z",fill:"#23262A",mask:"url(#path-24-inside-3_2436_45089)"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2436_45089",children:e.jsx("rect",{width:"42.6667",height:"42.6667",fill:"white"})})})]});he.__docgenInfo={description:"",methods:[],displayName:"HvorMyeIkon"};const Ve="_background_1y3o4_1",Ke="_content_1y3o4_6",Ze="_lenkepanel_1y3o4_12",We="_panel_1y3o4_18",Ue="_button_1y3o4_25",H={background:Ve,content:Ke,lenkepanel:Ze,panel:We,button:Ue},Ye=({stønadskontoer:t,satser:s,locale:n})=>{const a=xe(n);Ce();const d=L(F(w.HVEM_PLANLEGGER)),i=L(F(w.OM_BARNET)),o=F(w.HVOR_LANG_PERIODE),l=F(w.ARBEIDSSITUASJON),u=F(w.FORDELING),f=F(w.HVOR_MYE),g=P(d),y=t&&o?t[o.dekningsgrad]:void 0,m=oe(i)&&fe(i.fødselsdato).isBefore(be),j=l?Q(l):"ingenHarRett",h=!m&&j!=="ingenHarRett";return e.jsxs(e.Fragment,{children:[e.jsx(me,{children:e.jsxs(c,{gap:"10",children:[e.jsxs(c,{gap:"5",children:[!h&&e.jsx(c,{gap:"5",children:e.jsxs(Ae,{header:g?e.jsx(r,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(r,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(Be,{height:24,width:24,color:"#7F8900","aria-hidden":!0}),color:"green",children:[e.jsx(C,{children:e.jsx(r,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:g}})}),e.jsxs(C,{children:[e.jsx(r,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(Y,{inlineText:!0,href:Z.veiviser,children:e.jsx(r,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})})]})]})}),t&&y&&o&&l&&e.jsxs(c,{gap:"5",children:[h&&e.jsx(ce,{valgtStønadskonto:y,hvorLangPeriode:o,hvemPlanlegger:d,barnet:i,arbeidssituasjon:l,fordeling:u}),f&&e.jsx(ye,{satser:s}),e.jsx(pe,{stønadskontoer:t,barnet:i,hvemPlanlegger:d,arbeidssituasjon:l,hvorLangPeriode:o,fordeling:u,satser:s})]}),e.jsx(Oe,{erAlenesøker:g})]}),e.jsx(c,{gap:"10",children:e.jsx(A,{children:e.jsx(Me,{variant:"secondary",onClick:a.goToPreviousDefaultStep,icon:e.jsx(Ie,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(r,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:H.background,children:e.jsxs(c,{gap:"4",className:H.content,children:[e.jsx(x,{level:"2",size:"medium",children:e.jsx(r,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsx(Y,{inlineText:!0,href:Z.hvorMye,target:"_blank",rel:"noreferrer",className:H.lenkepanel,children:e.jsx(te,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"medium",className:H.panel,children:e.jsxs(A,{gap:"5",align:"center",children:[e.jsx(he,{}),e.jsx(x,{level:"3",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.VeiviserHvorMye"})})]})})}),e.jsx(Y,{inlineText:!0,href:Z.hvaSkjerNår,target:"_blank",rel:"noreferrer",className:H.lenkepanel,children:e.jsx(te,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"medium",className:H.panel,children:e.jsxs(A,{gap:"5",align:"center",children:[e.jsx(je,{}),e.jsx(x,{level:"3",size:"small",children:e.jsx(r,{id:"OppsummeringSteg.VeiviserHvaSkjerNår"})})]})})})]})})]})};Ye.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""}}};export{Ye as O};
