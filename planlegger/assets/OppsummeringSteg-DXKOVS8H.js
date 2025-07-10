import{r as U,a1 as we,j as e,aw as Me,ax as le,ay as de,X as A,Y as z,a9 as ue,ac as R,Z as n,a2 as pe,a3 as u,a4 as E,a6 as J,a7 as X,az as ce,aa as te,W as j,af as H,aq as c,a5 as _,aB as ge,ab as G,ah as Oe,aC as _e,k as ee,at as Re,aD as Se,aE as Ce}from"./iframe-CRvMeerX.js";import{u as x,C as b,c as He}from"./usePlanleggerNavigator-CPyje46K.js";import{h as re,e as D,g as I,a as L,H as S,j as Pe,k as me}from"./HvemPlanleggerUtils-6KuuBP0g.js";import{b as ae,e as Q,m as Be}from"./barnetUtils-bDKrTgG9.js";import{u as se,a as Ee,b as De}from"./hvemHarRettUtils-CYbG3O6f.js";import{u as Ie}from"./useScrollBehaviour-C4yw0GP1.js";import{S as Le}from"./ShareDataInfobox-Ps_NTfu-.js";import{S as ye}from"./TasklistStart-QaMSerDO.js";import{b as ze,g as Ge,a as Ne}from"./BarnehageplassSteg-DbSkRR9l.js";import{l as ie}from"./amplitudeUtils-1CrV70-o.js";import{f as C,a as ke}from"./satserUtils-CEIo-dLj.js";import{c as ve,d as je,e as $,g as Ke,a as Ve,l as Ze,h as Ue,i as We,j as W}from"./uttakUtils-CaJVb0Bt.js";import{C as Ye}from"./CalendarLabels-DFkv4LGL.js";import{A as Je}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as Xe,a as $e}from"./Wallet-BWw5VW1q.js";var Qe=function(a,s){var r={};for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&s.indexOf(t)<0&&(r[t]=a[t]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(a);i<t.length;i++)s.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(a,t[i])&&(r[t[i]]=a[t[i]]);return r};const er=U.forwardRef((a,s)=>{var{title:r,titleId:t}=a,i=Qe(a,["title","titleId"]);let o=we();return o=r?t||"title-"+o:void 0,U.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":o},i),r?U.createElement("title",{id:o},r):null,U.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),he=({children:a})=>e.jsx(Me,{header:e.jsxs(e.Fragment,{children:[e.jsx(le,{below:"md",children:e.jsx(de,{children:e.jsxs(A,{gap:"4",align:"center",children:[e.jsx(z,{color:"lightBlue",size:"large",children:e.jsx(ue,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(R,{size:"medium",children:e.jsx(n,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(le,{above:"md",children:e.jsx(de,{children:e.jsxs(A,{gap:"4",align:"center",children:[e.jsx(z,{color:"lightBlue",size:"large",children:e.jsx(ue,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(R,{size:"medium",children:e.jsx(n,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:a});he.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const fe=({erAlenesøker:a,barnet:s})=>e.jsx(pe,{header:e.jsx(n,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:a}}),color:"gray",icon:e.jsx(ye,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(u,{gap:"4",children:[e.jsx(E,{children:e.jsx(n,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:a,erAdopsjon:Q(s),erFødt:ae(s)}})}),e.jsx(A,{children:e.jsx(J,{href:X.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(ce,{variant:"primary",children:e.jsx(n,{id:"SøkOmForeldrepenger.Søk"})})})})]})});fe.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const xe=({stønadskontoer:a,barnet:s,hvemPlanlegger:r,arbeidssituasjon:t,hvorLangPeriode:i,fordeling:o,satser:d})=>{const l=te(),h=ae(s),v=Q(s),g=s.antallBarn,k=re(r),m=D(r),y=I(r,l),q=L(r,l),w=()=>re(r)&&!r.navnPåFar?e.jsx(n,{id:"OppgittInformasjon.TekstFar1"}):I(r,l),p=()=>re(r)&&!r.navnPåMedfar?e.jsx(n,{id:"OppgittInformasjon.TekstFar2"}):L(r,l),P=w(),N=p(),M=se(t),V=a[i.dekningsgrad],T=ve(V),Z=je(V),O=o?$(o.antallDagerSøker1):void 0,f=o?$(Z.totaltAntallDager-o.antallDagerSøker1):void 0,B=r.type===S.FAR_OG_FAR&&!v,F=C(ke(d)/2);return e.jsx(u,{gap:"10",children:e.jsxs(j,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(z,{size:"medium",color:"lightBlue",children:e.jsx(er,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(n,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:m}})})]})}),e.jsx(j.Content,{children:e.jsxs(u,{gap:"2",children:[e.jsx(H,{children:e.jsxs(u,{gap:"2",children:[e.jsx(R,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:g}})}),s.erFødsel&&h&&e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:g,erFødt:h,dato:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!h&&!v&&e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:g,erFødt:h,dato:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),v&&e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:g,dato2:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:l.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(H,{children:e.jsxs(u,{gap:"2",children:[e.jsx(R,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.Arbeid.Tittel"})}),m&&e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:_(y),arbeidssituasjon:t.status,minsteInntekt:F}})}),!m&&q&&e.jsxs(e.Fragment,{children:[M==="beggeHarRett"&&e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:y,navn2:q,arbeidssituasjon:t.status,minsteInntekt:F}})}),M!=="beggeHarRett"&&k&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:P??_(y),arbeidssituasjon:t.status,minsteInntekt:F}})}),e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:N??_(q),arbeidssituasjon:t.jobberAnnenPart,minsteInntekt:F}})})]}),M!=="beggeHarRett"&&!k&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:_(y),arbeidssituasjon:t.status,minsteInntekt:F}})}),e.jsx(c,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:_(q),arbeidssituasjon:t.jobberAnnenPart,minsteInntekt:F}})})]})]})]})}),e.jsx(H,{children:e.jsxs(u,{gap:"2",children:[e.jsx(R,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:M!=="beggeHarRett"}})}),e.jsxs(c,{children:[!B&&e.jsx(n,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:m,prosent:i.dekningsgrad,uker:T.uker,dager:T.dager,fellesuker:(O==null?void 0:O.uker)||0,fellesdager:(O==null?void 0:O.dager)||0,fellesuker2:(f==null?void 0:f.uker)||0,fellesdager2:(f==null?void 0:f.dager)||0,hvem:I(r,l),hvem2:L(r,l),kunEnPartSkalHa:M!=="beggeHarRett"}}),B&&e.jsx(n,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:m,prosent:i.dekningsgrad,uker:T.uker,dager:T.dager}})]})]})})]})})]})})};xe.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const be=({valgtStønadskonto:a,hvorLangPeriode:s,hvemPlanlegger:r,barnet:t,arbeidssituasjon:i,fordeling:o})=>{const d=te(),l=se(i),h=Ke(t),v=je(a).totaltAntallDager,g=o?$(o.antallDagerSøker1):void 0,k=o?$(v-o.antallDagerSøker1):void 0,m=Ve(a),y=Ee(l,r)||De(l,r);let q;(r.type===S.MOR_OG_MEDMOR||r.type===S.MOR_OG_FAR)&&l==="kunSøker2HarRett"&&(q=ge(ge(h).denneEllerNeste()).leggTil(30));const w=Pe(r,l),p=Ze({erDeltUttak:o!==void 0,famDato:h,tilgjengeligeStønadskontoer:a.kontoer,fellesperiodeDagerMor:o==null?void 0:o.antallDagerSøker1,bareFarMedmorHarRett:y,erAdopsjon:Q(t),erFarEllerMedmor:w,startdato:q,erMorUfør:(i==null?void 0:i.status)===Je.UFØR,erAleneOmOmsorg:r.type===S.FAR||r.type===S.MOR,farOgFar:r.type===S.FAR_OG_FAR}),P=ve(a),N=r.type===S.FAR_OG_FAR,M=I(r,d),V=me(M,d.locale),T=L(r,d),Z=T?me(T,d.locale):void 0,O=ze(t),f=x(b.UTTAKSPLAN),B=G(x(b.TILPASS_PLAN)),F=f&&f.length>0?f[f.length-1]:[],oe=o!==void 0,Te=Ue(oe,F,w),Ae=We(oe,F,w);return e.jsx(u,{gap:"10",children:e.jsxs(j,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(z,{size:"medium",color:"lightBlue",children:e.jsx(Oe,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(n,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:D(r)}})})]})}),e.jsx(j.Content,{children:e.jsxs(u,{gap:"5",children:[l==="beggeHarRett"&&!N&&T&&Z&&e.jsxs(H,{children:[e.jsxs(u,{gap:"2",children:[e.jsx(c,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:P.uker,antallDager:P.dager,hvem:I(r,d),hvem2:L(r,d),uker:(g==null?void 0:g.uker)||0,dager:(g==null?void 0:g.dager)||0,uker2:(k==null?void 0:k.uker)||0,dager2:(k==null?void 0:k.dager)||0}})}),e.jsx(c,{children:e.jsx(n,{id:"OppsummeringSteg.Periodene",values:{hvem:_(V),fom:d.formatDate(p.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(p.søker1[p.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:K=>e.jsx("b",{children:K})}})})]}),e.jsx(c,{children:e.jsx(n,{id:"OppsummeringSteg.Periodene",values:{hvem:_(Z),fom:d.formatDate(p.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(p.søker2[p.søker2.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:K=>e.jsx("b",{children:K})}})})]}),(D(r)||N)&&e.jsx(H,{children:e.jsxs(u,{gap:"2",children:[e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:D(r),antallUker:P.uker,antallDager:P.dager}})}),e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.Periode",values:{fom:d.formatDate(p.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(p.søker1[p.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:K=>e.jsx("b",{children:K})}})})]})}),l==="kunSøker2HarRett"&&!N&&T&&e.jsx(H,{children:e.jsx(u,{gap:"2",children:e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:m.uker,dager1:m.dager,uker2:W(a).uker-m.uker,dager2:W(a).dager-m.dager,hvem:M,prosent:s.dekningsgrad,antallUker:W(a).uker,dager:W(a).dager}})})})}),e.jsx(_e,{bareFarMedmorHarRett:y,erFarEllerMedmor:w,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:B?Te:p.søker1,annenPartsPerioder:B?Ae:p.søker2,navnAnnenPart:"Test",barn:Be(t),planleggerLegend:e.jsx(Ye,{hvemPlanlegger:r,barnet:t,hvemHarRett:l,uttaksplan:B?F:[...p.søker1,...p.søker2]}),barnehagestartdato:O})]})})]})})};be.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const ne=({satser:a,lønnSøker:s,fornavn:r})=>{const t=G(x(b.HVEM_PLANLEGGER)),i=D(t),d=6*ke(a),l=d/12,h=l/21.67,v=80/100,g=(m,y)=>Math.round(Math.min(m,l)*y),k=(m,y)=>Math.round(Math.min(m*12/260,h)*y);return e.jsx(u,{gap:"10",children:e.jsx(H,{children:e.jsxs(u,{gap:"2",children:[e.jsxs(A,{justify:"space-between",wrap:!1,children:[e.jsx(R,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(n,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:_(r),erAlenesøker:i,utbetaling100:C(k(s,1)),utbetaling80:C(k(s,v))}})}),e.jsx(z,{size:"medium",color:"blue",children:e.jsx(Xe,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(c,{children:e.jsx(n,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:C(g(s,1)),utbetaling80:C(g(s,v))}})}),s>=l&&e.jsxs(e.Fragment,{children:[e.jsx(c,{children:e.jsx(n,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:C(d),a:m=>e.jsx(J,{href:X.grunnbeløpet,target:"_blank",rel:"noreferrer",children:m})}})}),e.jsx(c,{children:e.jsx(n,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:r,erAlenesøker:i}})})]}),e.jsx(c,{children:e.jsx(n,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:i,hvem:r,inntekt:C(g(s,1))}})})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Fe=({satser:a})=>{const s=te(),r=G(x(b.HVEM_PLANLEGGER)),t=G(x(b.HVOR_MYE)),i=I(r,s),o=L(r,s);return e.jsx(u,{gap:"10",children:(t.lønnSøker1!==void 0||t.lønnSøker2!==void 0)&&e.jsxs(j,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(A,{gap:"6",align:"center",wrap:!1,children:[e.jsx(z,{size:"medium",color:"lightBlue",children:e.jsx($e,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(n,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(j.Content,{children:e.jsxs(u,{gap:"2",children:[t.lønnSøker1!==void 0&&i&&e.jsx(ne,{satser:a,fornavn:i,lønnSøker:t.lønnSøker1}),t.lønnSøker2!==void 0&&o&&e.jsx(ne,{satser:a,fornavn:o,lønnSøker:t.lønnSøker2})]})})]})})};Fe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const qe=()=>e.jsxs("svg",{width:"43",height:"43",viewBox:"0 0 43 43",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsxs("g",{clipPath:"url(#clip0_2436_45089)",children:[e.jsx("rect",{x:"19.5898",y:"1.77783",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"19.5898",y:"30.5967",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"3.32617",y:"12.8975",width:"3.09791",height:"5.42135",transform:"rotate(-60 3.32617 12.8975)",fill:"#FFECCC"}),e.jsx("rect",{x:"32.502",y:"29.7422",width:"3.09791",height:"5.42135",transform:"rotate(-60 32.502 29.7422)",fill:"#FFECCC"}),e.jsx("rect",{x:"29.4727",y:"3.62402",width:"3.09791",height:"5.42135",transform:"rotate(30 29.4727 3.62402)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.627",y:"32.8003",width:"3.09791",height:"5.42135",transform:"rotate(30 12.627 32.8003)",fill:"#FFECCC"}),e.jsx("rect",{x:"9.91016",y:"5.17236",width:"3.09791",height:"5.42135",transform:"rotate(-30 9.91016 5.17236)",fill:"#FFECCC"}),e.jsx("rect",{x:"26.7539",y:"34.3486",width:"3.09791",height:"5.42135",transform:"rotate(-30 26.7539 34.3486)",fill:"#FFECCC"}),e.jsx("rect",{x:"37.1973",y:"10.207",width:"3.09791",height:"5.42135",transform:"rotate(60 37.1973 10.207)",fill:"#FFECCC"}),e.jsx("rect",{x:"8.02148",y:"27.0513",width:"3.09791",height:"5.42135",transform:"rotate(60 8.02148 27.0513)",fill:"#FFECCC"}),e.jsx("rect",{x:"40.8887",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 40.8887 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.0703",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 12.0703 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"30.444",y:"0.666667",width:"11.5556",height:"18.2222",rx:"5.77778",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M41.1931 5.7037C41.1931 8.49279 38.9598 10.7407 36.2209 10.7407C33.482 10.7407 31.2487 8.49279 31.2487 5.7037C31.2487 2.91462 33.482 0.666667 36.2209 0.666667C38.9598 0.666667 41.1931 2.91462 41.1931 5.7037Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-15-inside-1_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M34.0825 5.70398C34.0825 5.43201 34.3044 5.18546 34.6102 5.18546V7.85212C35.8058 7.85212 36.7491 6.87596 36.7491 5.70398H34.0825ZM34.6102 5.18546C34.9161 5.18546 35.138 5.43201 35.138 5.70398H32.4714C32.4714 6.87596 33.4146 7.85212 34.6102 7.85212V5.18546ZM35.138 5.70398C35.138 5.97594 34.9161 6.22249 34.6102 6.22249V3.55583C33.4146 3.55583 32.4714 4.53199 32.4714 5.70398H35.138ZM34.6102 6.22249C34.3044 6.22249 34.0825 5.97594 34.0825 5.70398H36.7491C36.7491 4.53199 35.8058 3.55583 34.6102 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-15-inside-1_2436_45089)"}),e.jsx("mask",{id:"path-17-inside-2_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M37.3051 5.70398C37.3051 5.43201 37.5271 5.18546 37.8329 5.18546V7.85212C39.0285 7.85212 39.9718 6.87596 39.9718 5.70398H37.3051ZM37.8329 5.18546C38.1387 5.18546 38.3607 5.43201 38.3607 5.70398H35.694C35.694 6.87596 36.6373 7.85212 37.8329 7.85212V5.18546ZM38.3607 5.70398C38.3607 5.97594 38.1387 6.22249 37.8329 6.22249V3.55583C36.6373 3.55583 35.694 4.53199 35.694 5.70398H38.3607ZM37.8329 6.22249C37.5271 6.22249 37.3051 5.97594 37.3051 5.70398H39.9718C39.9718 4.53199 39.0285 3.55583 37.8329 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-17-inside-2_2436_45089)"}),e.jsx("path",{d:"M39.4451 9.582L31.9375 17.1084",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M0.912637 17.5765L13.9992 10.021L17.1486 15.4759C19.2351 19.0897 17.9969 23.7106 14.3831 25.797C10.7694 27.8834 6.14845 26.6452 4.06204 23.0315L0.912637 17.5765Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M27.9975 34.2706L14.9109 41.8262L11.7615 36.3713C9.6751 32.7575 10.9133 28.1366 14.527 26.0502C18.1408 23.9638 22.7617 25.2019 24.8481 28.8157L27.9975 34.2706Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M5.13281 23.5571L17.4496 16.446",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M14.9111 41.8265L13.686 39.7045L18.0822 32.2078L26.7726 32.1489L27.9977 34.2709L14.9111 41.8265Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-24-inside-3_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)"})}),e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)",fill:"#23262A"}),e.jsx("path",{d:"M14.3174 25.8383C14.2685 25.7535 14.3023 25.6564 14.3724 25.616L15.7057 27.9254C16.8994 27.2362 17.321 25.7073 16.6268 24.505L14.3174 25.8383ZM14.3724 25.616C14.4424 25.5756 14.5434 25.5948 14.5924 25.6796L12.283 27.0129C12.9771 28.2153 14.5121 28.6146 15.7057 27.9254L14.3724 25.616ZM14.5924 25.6796C14.6413 25.7644 14.6075 25.8614 14.5374 25.9019L13.2041 23.5925C12.0104 24.2816 11.5888 25.8105 12.283 27.0129L14.5924 25.6796ZM14.5374 25.9019C14.4674 25.9423 14.3664 25.9231 14.3174 25.8383L16.6268 24.505C15.9326 23.3026 14.3977 22.9033 13.2041 23.5925L14.5374 25.9019Z",fill:"#23262A",mask:"url(#path-24-inside-3_2436_45089)"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2436_45089",children:e.jsx("rect",{width:"42.6667",height:"42.6667",fill:"white"})})})]});qe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeIkon"};const rr="_background_1y3o4_1",nr="_content_1y3o4_6",tr="_lenkepanel_1y3o4_12",ar="_panel_1y3o4_18",Y={background:rr,content:nr,lenkepanel:tr,panel:ar},sr=({stønadskontoer:a,satser:s})=>{const r=He();Ie();const t=G(x(b.HVEM_PLANLEGGER)),i=G(x(b.OM_BARNET)),o=x(b.HVOR_LANG_PERIODE),d=x(b.ARBEIDSSITUASJON),l=x(b.FORDELING),h=x(b.HVOR_MYE),v=D(t),g=a&&o?a[o.dekningsgrad]:void 0,k=ae(i)&&ee(i.fødselsdato).isBefore(Re),m=d?se(d):"ingenHarRett",y=!k&&m!=="ingenHarRett",q=Ge(i),w=ee().add(18,"weeks").add(3,"days").toDate(),p=Q(i);return e.jsxs(e.Fragment,{children:[e.jsx(he,{children:e.jsxs(u,{gap:"10",children:[e.jsxs(u,{gap:"5",children:[!y&&e.jsx(u,{gap:"5",children:e.jsxs(pe,{header:v?e.jsx(n,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(n,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(ye,{height:24,width:24,color:"#7F8900","aria-hidden":!0}),color:"green",children:[e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:v}})}),e.jsxs(E,{children:[e.jsx(n,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(J,{inlineText:!0,href:X.veiviser,children:e.jsx(n,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),a&&g&&o&&d&&e.jsxs(u,{gap:"2",children:[y&&e.jsx(be,{valgtStønadskonto:g,hvorLangPeriode:o,hvemPlanlegger:t,barnet:i,arbeidssituasjon:d,fordeling:l}),h&&e.jsx(Fe,{satser:s}),!p&&e.jsx(Ne,{hvemPlanlegger:t,barnet:i}),e.jsx(xe,{stønadskontoer:a,barnet:i,hvemPlanlegger:t,arbeidssituasjon:d,hvorLangPeriode:o,fordeling:l,satser:s})]}),e.jsx(Le,{erAlenesøker:v}),(y&&ee(q).isBefore(w)||y&&p)&&e.jsx(fe,{erAlenesøker:v,barnet:i})]}),e.jsx(u,{gap:"10",children:e.jsx(A,{children:e.jsx(ce,{variant:"secondary",onClick:r.goToPreviousDefaultStep,icon:e.jsx(Se,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(n,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:Y.background,children:e.jsxs(u,{gap:"4",className:Y.content,children:[e.jsx(R,{level:"2",size:"medium",children:e.jsx(n,{id:"OppsummeringSteg.AnnenVeiviser"})}),e.jsx(J,{inlineText:!0,href:X.veiviser,target:"_blank",rel:"noreferrer",className:Y.lenkepanel,children:e.jsx(Ce,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"medium",className:Y.panel,children:e.jsxs(A,{gap:"5",align:"center",children:[e.jsx(qe,{}),e.jsx(R,{level:"3",size:"small",children:e.jsx(n,{id:"OppsummeringSteg.VeiviserHvorMye"})})]})})})]})})]})};sr.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};export{sr as O};
