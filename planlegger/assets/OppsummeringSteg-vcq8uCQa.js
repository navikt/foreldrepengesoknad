import{r as X,a3 as we,j as e,ay as Se,az as le,aA as de,Y as F,Z as N,ab as ue,ae as T,_ as n,a4 as ce,a5 as u,a6 as E,a8 as C,a9 as V,aB as ye,ac as te,X as v,ah as P,as as p,a7 as S,aD as ge,ad as U,aj as Me,aE as Re,k as ee,av as _e,aF as Pe,aG as me}from"./iframe-BEKC_1W-.js";import{u as b,C as f,c as Be}from"./usePlanleggerNavigator-DeJFaoMM.js";import{h as re,e as I,g as z,a as G,H as R,j as De,k as pe}from"./HvemPlanleggerUtils-ibJC3-zE.js";import{b as ae,e as Q,m as He}from"./barnetUtils-Bkg4acId.js";import{u as se,a as Ee,b as Ie}from"./hvemHarRettUtils-BIASkUEU.js";import{u as ze}from"./useScrollBehaviour-DIS0bImj.js";import{S as Ge}from"./ShareDataInfobox-s9yBPPSp.js";import{S as ke}from"./TasklistStart-BD3sUbTI.js";import{b as Ne,g as Ue,a as Ke}from"./BarnehageplassSteg-XoRRxzer.js";import{l as ie}from"./amplitudeUtils-1CrV70-o.js";import{f as _,a as ve}from"./satserUtils-CAfI6DpW.js";import{c as je,d as be,e as $,g as Le,a as Ce,l as Ve,h as We,i as Ye,j as Z}from"./uttakUtils-wg5hkjWY.js";import{C as Je}from"./CalendarLabels-DHpw3x3x.js";import{A as Xe}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as fe,a as Ze}from"./Wallet-DCAResKU.js";import{S as $e}from"./BabyWrapped-DqvvKDng.js";var Qe=function(a,s){var r={};for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&s.indexOf(t)<0&&(r[t]=a[t]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(a);i<t.length;i++)s.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(a,t[i])&&(r[t[i]]=a[t[i]]);return r};const er=X.forwardRef((a,s)=>{var{title:r,titleId:t}=a,i=Qe(a,["title","titleId"]);let o=we();return o=r?t||"title-"+o:void 0,X.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":o},i),r?X.createElement("title",{id:o},r):null,X.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),he=({children:a})=>e.jsx(Se,{header:e.jsxs(e.Fragment,{children:[e.jsx(le,{below:"md",children:e.jsx(de,{children:e.jsxs(F,{gap:"space-16",align:"center",children:[e.jsx(N,{color:"lightBlue",size:"large",children:e.jsx(ue,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(T,{size:"medium",children:e.jsx(n,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(le,{above:"md",children:e.jsx(de,{children:e.jsxs(F,{gap:"space-16",align:"center",children:[e.jsx(N,{color:"lightBlue",size:"large",children:e.jsx(ue,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(T,{size:"medium",children:e.jsx(n,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:a});he.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const xe=({erAlenesøker:a,barnet:s})=>e.jsx(ce,{header:e.jsx(n,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:a}}),color:"gray",icon:e.jsx(ke,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(u,{gap:"space-16",children:[e.jsx(E,{children:e.jsx(n,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:a,erAdopsjon:Q(s),erFødt:ae(s)}})}),e.jsx(F,{children:e.jsx(C,{href:V.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(ye,{variant:"primary",children:e.jsx(n,{id:"SøkOmForeldrepenger.Søk"})})})})]})});xe.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const Fe=({stønadskontoer:a,barnet:s,hvemPlanlegger:r,arbeidssituasjon:t,hvorLangPeriode:i,fordeling:o,satser:d})=>{const l=te(),j=ae(s),k=Q(s),y=s.antallBarn,h=re(r),g=I(r),c=z(r,l),q=G(r,l),A=()=>re(r)&&!r.navnPåFar?e.jsx(n,{id:"OppgittInformasjon.TekstFar1"}):z(r,l),m=()=>re(r)&&!r.navnPåMedfar?e.jsx(n,{id:"OppgittInformasjon.TekstFar2"}):G(r,l),B=A(),K=m(),w=se(t),W=a[i.dekningsgrad],O=je(W),Y=be(W),J=o?$(o.antallDagerSøker1):void 0,M=o?$(Y.totaltAntallDager-o.antallDagerSøker1):void 0,D=r.type===R.FAR_OG_FAR&&!k,x=_(ve(d)/2);return e.jsx(u,{gap:"space-40",children:e.jsxs(v,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(v.Header,{children:e.jsxs(F,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(N,{size:"medium",color:"lightBlue",children:e.jsx(er,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(v.Title,{size:"small",children:e.jsx(n,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:g}})})]})}),e.jsx(v.Content,{children:e.jsxs(u,{gap:"space-8",children:[e.jsx(P,{children:e.jsxs(u,{gap:"space-8",children:[e.jsx(T,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:y}})}),s.erFødsel&&j&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:y,erFødt:j,dato:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!j&&!k&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:y,erFødt:j,dato:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),k&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:y,dato2:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:l.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(P,{children:e.jsxs(u,{gap:"space-8",children:[e.jsx(T,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.Arbeid.Tittel"})}),g&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:S(c),arbeidssituasjon:t.status,minsteInntekt:x}})}),!g&&q&&e.jsxs(e.Fragment,{children:[w==="beggeHarRett"&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:c,navn2:q,arbeidssituasjon:t.status,minsteInntekt:x}})}),w!=="beggeHarRett"&&h&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:B??S(c),arbeidssituasjon:t.status,minsteInntekt:x}})}),e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:K??S(q),arbeidssituasjon:t.jobberAnnenPart,minsteInntekt:x}})})]}),w!=="beggeHarRett"&&!h&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:S(c),arbeidssituasjon:t.status,minsteInntekt:x}})}),e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:S(q),arbeidssituasjon:t.jobberAnnenPart,minsteInntekt:x}})})]})]})]})}),e.jsx(P,{children:e.jsxs(u,{gap:"space-8",children:[e.jsx(T,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:w!=="beggeHarRett"}})}),e.jsxs(p,{children:[!D&&e.jsx(n,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:g,prosent:i.dekningsgrad,uker:O.uker,dager:O.dager,fellesuker:J?.uker||0,fellesdager:J?.dager||0,fellesuker2:M?.uker||0,fellesdager2:M?.dager||0,hvem:z(r,l),hvem2:G(r,l),kunEnPartSkalHa:w!=="beggeHarRett"}}),D&&e.jsx(n,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:g,prosent:i.dekningsgrad,uker:O.uker,dager:O.dager}})]})]})})]})})]})})};Fe.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const qe=({valgtStønadskonto:a,hvorLangPeriode:s,hvemPlanlegger:r,barnet:t,arbeidssituasjon:i,fordeling:o})=>{const d=te(),l=se(i),j=Le(t),k=be(a).totaltAntallDager,y=o?$(o.antallDagerSøker1):void 0,h=o?$(k-o.antallDagerSøker1):void 0,g=Ce(a),c=Ee(l,r)||Ie(l,r);let q;(r.type===R.MOR_OG_MEDMOR||r.type===R.MOR_OG_FAR)&&l==="kunSøker2HarRett"&&(q=ge(ge(j).denneEllerNeste()).leggTil(30));const A=De(r,l),m=Ve({erDeltUttak:o!==void 0,famDato:j,tilgjengeligeStønadskontoer:a.kontoer,fellesperiodeDagerMor:o?.antallDagerSøker1,bareFarMedmorHarRett:c,erAdopsjon:Q(t),erFarEllerMedmor:A,startdato:q,erMorUfør:i?.status===Xe.UFØR,erAleneOmOmsorg:r.type===R.FAR||r.type===R.MOR,farOgFar:r.type===R.FAR_OG_FAR}),B=je(a),K=r.type===R.FAR_OG_FAR,w=z(r,d),W=pe(w,d.locale),O=G(r,d),Y=O?pe(O,d.locale):void 0,J=Ne(t),M=b(f.UTTAKSPLAN),D=U(b(f.TILPASS_PLAN)),x=M&&M.length>0?M[M.length-1]:[],oe=o!==void 0,Te=We(oe,x,A),Ae=Ye(oe,x,A);return e.jsx(u,{gap:"space-40",children:e.jsxs(v,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(v.Header,{children:e.jsxs(F,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(N,{size:"medium",color:"lightBlue",children:e.jsx(Me,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(v.Title,{size:"small",children:e.jsx(n,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:I(r)}})})]})}),e.jsx(v.Content,{children:e.jsxs(u,{gap:"space-20",children:[l==="beggeHarRett"&&!K&&O&&Y&&e.jsxs(P,{children:[e.jsxs(u,{gap:"space-8",children:[e.jsx(p,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:B.uker,antallDager:B.dager,hvem:z(r,d),hvem2:G(r,d),uker:y?.uker||0,dager:y?.dager||0,uker2:h?.uker||0,dager2:h?.dager||0}})}),e.jsx(p,{children:e.jsx(n,{id:"OppsummeringSteg.Periodene",values:{hvem:S(W),fom:d.formatDate(m.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(m.søker1[m.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:L=>e.jsx("b",{children:L})}})})]}),e.jsx(p,{children:e.jsx(n,{id:"OppsummeringSteg.Periodene",values:{hvem:S(Y),fom:d.formatDate(m.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(m.søker2[m.søker2.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:L=>e.jsx("b",{children:L})}})})]}),(I(r)||K)&&e.jsx(P,{children:e.jsxs(u,{gap:"space-8",children:[e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:I(r),antallUker:B.uker,antallDager:B.dager}})}),e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.Periode",values:{fom:d.formatDate(m.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(m.søker1[m.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:L=>e.jsx("b",{children:L})}})})]})}),l==="kunSøker2HarRett"&&!K&&O&&e.jsx(P,{children:e.jsx(u,{gap:"space-8",children:e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:g.uker,dager1:g.dager,uker2:Z(a).uker-g.uker,dager2:Z(a).dager-g.dager,hvem:w,prosent:s.dekningsgrad,antallUker:Z(a).uker,dager:Z(a).dager}})})})}),e.jsx(Re,{bareFarMedmorHarRett:c,erFarEllerMedmor:A,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:D?Te:m.søker1,annenPartsPerioder:D?Ae:m.søker2,navnAnnenPart:"Test",barn:He(t),planleggerLegend:e.jsx(Je,{hvemPlanlegger:r,barnet:t,hvemHarRett:l,uttaksplan:D?x:[...m.søker1,...m.søker2]}),barnehagestartdato:J})]})})]})})};qe.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const ne=({satser:a,lønnSøker:s,fornavn:r})=>{const t=U(b(f.HVEM_PLANLEGGER)),i=I(t),d=6*ve(a),l=d/12,j=l/21.67,k=80/100,y=(g,c)=>Math.round(Math.min(g,l)*c),h=(g,c)=>Math.round(Math.min(g*12/260,j)*c);return e.jsx(u,{gap:"space-40",children:e.jsx(P,{children:e.jsxs(u,{gap:"space-8",children:[e.jsxs(F,{justify:"space-between",wrap:!1,children:[e.jsx(T,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(n,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:S(r),erAlenesøker:i,utbetaling100:_(h(s,1)),utbetaling80:_(h(s,k))}})}),e.jsx(N,{size:"medium",color:"blue",children:e.jsx(fe,{height:24,width:24,color:"var(--ax-bg-accent-strong)",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:_(y(s,1)),utbetaling80:_(y(s,k))}})}),s>=l&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:_(d),a:g=>e.jsx(C,{href:V.grunnbeløpet,target:"_blank",rel:"noreferrer",children:g})}})}),e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:r,erAlenesøker:i}})})]}),e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:i,hvem:r,inntekt:_(y(s,1))}})})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Oe=({satser:a})=>{const s=te(),r=U(b(f.HVEM_PLANLEGGER)),t=U(b(f.HVOR_MYE)),i=z(r,s),o=G(r,s);return e.jsx(u,{gap:"space-40",children:(t.lønnSøker1!==void 0||t.lønnSøker2!==void 0)&&e.jsxs(v,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(v.Header,{children:e.jsxs(F,{gap:"space-24",align:"center",wrap:!1,children:[e.jsx(N,{size:"medium",color:"lightBlue",children:e.jsx(Ze,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(v.Title,{size:"small",children:e.jsx(n,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(v.Content,{children:e.jsxs(u,{gap:"space-8",children:[t.lønnSøker1!==void 0&&i&&e.jsx(ne,{satser:a,fornavn:i,lønnSøker:t.lønnSøker1}),t.lønnSøker2!==void 0&&o&&e.jsx(ne,{satser:a,fornavn:o,lønnSøker:t.lønnSøker2})]})})]})})};Oe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const rr="_background_1fv80_1",nr="_content_1fv80_6",tr="_lenkepanel_1fv80_12",ar="_panel_1fv80_18",H={background:rr,content:nr,lenkepanel:tr,panel:ar},sr=({stønadskontoer:a,satser:s})=>{const r=Be();ze();const t=U(b(f.HVEM_PLANLEGGER)),i=U(b(f.OM_BARNET)),o=b(f.HVOR_LANG_PERIODE),d=b(f.ARBEIDSSITUASJON),l=b(f.FORDELING),j=b(f.HVOR_MYE),k=I(t),y=a&&o?a[o.dekningsgrad]:void 0,h=ae(i)&&ee(i.fødselsdato).isBefore(_e),g=d?se(d):"ingenHarRett",c=!h&&g!=="ingenHarRett",q=Ue(i),A=ee().add(18,"weeks").add(3,"days").toDate(),m=Q(i);return e.jsxs(e.Fragment,{children:[e.jsx(he,{children:e.jsxs(u,{gap:"space-40",children:[e.jsxs(u,{gap:"space-20",children:[!c&&e.jsx(u,{gap:"space-20",children:e.jsxs(ce,{header:k?e.jsx(n,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(n,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(ke,{height:24,width:24,color:"var(--ax-bg-success-strong)","aria-hidden":!0}),color:"green",children:[e.jsx(E,{children:e.jsx(n,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:k}})}),e.jsxs(E,{children:[e.jsx(n,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(C,{inlineText:!0,href:V.veiviser,children:e.jsx(n,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),a&&y&&o&&d&&e.jsxs(u,{gap:"space-8",children:[c&&e.jsx(qe,{valgtStønadskonto:y,hvorLangPeriode:o,hvemPlanlegger:t,barnet:i,arbeidssituasjon:d,fordeling:l}),j&&e.jsx(Oe,{satser:s}),!m&&e.jsx(Ke,{hvemPlanlegger:t,barnet:i}),e.jsx(Fe,{stønadskontoer:a,barnet:i,hvemPlanlegger:t,arbeidssituasjon:d,hvorLangPeriode:o,fordeling:l,satser:s})]}),e.jsx(Ge,{erAlenesøker:k}),(c&&ee(q).isBefore(A)||c&&m)&&e.jsx(xe,{erAlenesøker:k,barnet:i})]}),e.jsx(u,{gap:"space-40",children:e.jsx(F,{children:e.jsx(ye,{variant:"secondary",onClick:r.goToPreviousDefaultStep,icon:e.jsx(Pe,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(n,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:H.background,children:e.jsxs(u,{gap:"space-16",className:H.content,children:[e.jsx(T,{level:"2",size:"medium",children:e.jsx(n,{id:"OppsummeringSteg.AndreVeivisere"})}),e.jsx(C,{inlineText:!0,href:V.hvorMye,target:"_blank",rel:"noreferrer",className:H.lenkepanel,children:e.jsx(me.New,{padding:"4",background:"default",borderRadius:"xlarge",shadow:"dialog",className:H.panel,children:e.jsxs(F,{gap:"5",align:"center",children:[e.jsx(fe,{height:43,width:43}),e.jsx(T,{level:"3",size:"small",children:e.jsx(n,{id:"OppsummeringSteg.VeiviserHvorMye"})})]})})}),e.jsx(C,{inlineText:!0,href:V.veiviser,target:"_blank",rel:"noreferrer",className:H.lenkepanel,children:e.jsx(me.New,{padding:"4",background:"default",borderRadius:"xlarge",shadow:"dialog",className:H.panel,children:e.jsxs(F,{gap:"space-20",align:"center",children:[e.jsx($e,{height:43,width:43}),e.jsx(T,{level:"3",size:"small",children:e.jsx(n,{id:"OppsummeringSteg.VeiviserFpEllerEs"})})]})})})]})})]})};sr.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
