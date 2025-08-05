import{r as Z,a1 as Ae,j as e,aw as we,ax as le,ay as de,X as O,Y as L,a9 as ue,ac as M,Z as n,a2 as pe,a3 as u,a4 as B,a6 as J,a7 as X,az as ce,aa as te,W as j,af as C,aq as p,a5 as w,aB as ge,ab as z,ah as Me,aC as Se,k as ee,at as _e,aD as Re,aE as Ce}from"./iframe-7czCGN7b.js";import{u as h,C as f,c as He}from"./usePlanleggerNavigator-DYP19ueN.js";import{h as re,e as D,g as E,a as I,H as _,j as Pe,k as me}from"./HvemPlanleggerUtils-CeanplYH.js";import{b as ae,e as Q,m as Be}from"./barnetUtils-CJBenv_k.js";import{u as se,a as De,b as Ee}from"./hvemHarRettUtils-DJajuYJo.js";import{u as Ie}from"./useScrollBehaviour-DPu1hTQy.js";import{S as Le}from"./ShareDataInfobox-D0bcg1Yx.js";import{S as ye}from"./TasklistStart-CCVw0mVB.js";import{b as ze,g as Ge,a as Ue}from"./BarnehageplassSteg-BqxlIU_E.js";import{l as ie}from"./amplitudeUtils-1CrV70-o.js";import{f as R,a as ke}from"./satserUtils-DlluwObF.js";import{c as je,d as ve,e as $,g as Ne,a as Ke,l as Ve,h as Ze,i as We,j as W}from"./uttakUtils-BJA-dqt1.js";import{C as Ye}from"./CalendarLabels-BEC7VVuz.js";import{A as Je}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as Xe,a as $e}from"./Wallet-C15kOWb3.js";var Qe=function(a,s){var r={};for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&s.indexOf(t)<0&&(r[t]=a[t]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(a);i<t.length;i++)s.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(a,t[i])&&(r[t[i]]=a[t[i]]);return r};const er=Z.forwardRef((a,s)=>{var{title:r,titleId:t}=a,i=Qe(a,["title","titleId"]);let o=Ae();return o=r?t||"title-"+o:void 0,Z.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:s,"aria-labelledby":o},i),r?Z.createElement("title",{id:o},r):null,Z.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4.75 6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v9c0 .69-.56 1.25-1.25 1.25H9a.75.75 0 0 0-.386.107L4.75 18.675zM6 3.25A2.75 2.75 0 0 0 3.25 6v14a.75.75 0 0 0 1.136.643l4.822-2.893H18A2.75 2.75 0 0 0 20.75 15V6A2.75 2.75 0 0 0 18 3.25zm3 6.5a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M15 9.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),he=({children:a})=>e.jsx(we,{header:e.jsxs(e.Fragment,{children:[e.jsx(le,{below:"md",children:e.jsx(de,{children:e.jsxs(O,{gap:"4",align:"center",children:[e.jsx(L,{color:"lightBlue",size:"large",children:e.jsx(ue,{height:34,width:34,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(M,{size:"medium",children:e.jsx(n,{id:"OppsummeringHeader.Tittel"})})]})})}),e.jsx(le,{above:"md",children:e.jsx(de,{children:e.jsxs(O,{gap:"4",align:"center",children:[e.jsx(L,{color:"lightBlue",size:"large",children:e.jsx(ue,{height:30,width:30,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(M,{size:"medium",children:e.jsx(n,{id:"OppsummeringHeader.Tittel"})})]})})})]}),children:a});he.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHeader",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""}}};const fe=({erAlenesøker:a,barnet:s})=>e.jsx(pe,{header:e.jsx(n,{id:"SøkOmForeldrepenger.Tittel",values:{erAlenesøker:a}}),color:"gray",icon:e.jsx(ye,{"aria-hidden":!0,height:24,width:24}),children:e.jsxs(u,{gap:"4",children:[e.jsx(B,{children:e.jsx(n,{id:"SøkOmForeldrepenger.BasertPå",values:{erAlenesøker:a,erAdopsjon:Q(s),erFødt:ae(s)}})}),e.jsx(O,{children:e.jsx(J,{href:X.søknadForeldrepenger,target:"_blank",rel:"noreferrer",children:e.jsx(ce,{variant:"primary",children:e.jsx(n,{id:"SøkOmForeldrepenger.Søk"})})})})]})});fe.__docgenInfo={description:"",methods:[],displayName:"SøkOmForeldrepenger",props:{erAlenesøker:{required:!0,tsType:{name:"boolean"},description:""},barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const xe=({stønadskontoer:a,barnet:s,hvemPlanlegger:r,arbeidssituasjon:t,hvorLangPeriode:i,fordeling:o,satser:d})=>{const l=te(),v=ae(s),k=Q(s),y=s.antallBarn,x=re(r),g=D(r),c=E(r,l),F=I(r,l),T=()=>re(r)&&!r.navnPåFar?e.jsx(n,{id:"OppgittInformasjon.TekstFar1"}):E(r,l),m=()=>re(r)&&!r.navnPåMedfar?e.jsx(n,{id:"OppgittInformasjon.TekstFar2"}):I(r,l),H=T(),G=m(),A=se(t),N=a[i.dekningsgrad],q=je(N),K=ve(N),V=o?$(o.antallDagerSøker1):void 0,S=o?$(K.totaltAntallDager-o.antallDagerSøker1):void 0,P=r.type===_.FAR_OG_FAR&&!k,b=R(ke(d)/2);return e.jsx(u,{gap:"10",children:e.jsxs(j,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(O,{gap:"6",align:"center",wrap:!1,children:[e.jsx(L,{size:"medium",color:"lightBlue",children:e.jsx(er,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(n,{id:"OppgittInformasjon.OppgittInformasjon",values:{erAlenesøker:g}})})]})}),e.jsx(j.Content,{children:e.jsxs(u,{gap:"2",children:[e.jsx(C,{children:e.jsxs(u,{gap:"2",children:[e.jsx(M,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.Barnet.Tittel",values:{antallBarn:y}})}),s.erFødsel&&v&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:y,erFødt:v,dato:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato2:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),s.erFødsel&&!v&&!k&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarn",values:{antallBarn:y,erFødt:v,dato:l.formatDate(s.termindato,{day:"numeric",month:"short",year:"numeric"})}})}),k&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.InformasjonOmBarnAdopsjon",values:{antallBarn:y,dato2:l.formatDate(s.fødselsdato,{day:"numeric",month:"short",year:"numeric"}),dato:l.formatDate(s.overtakelsesdato,{day:"numeric",month:"short",year:"numeric"})}})})]})}),e.jsx(C,{children:e.jsxs(u,{gap:"2",children:[e.jsx(M,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.Arbeid.Tittel"})}),g&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:w(c),arbeidssituasjon:t.status,minsteInntekt:b}})}),!g&&F&&e.jsxs(e.Fragment,{children:[A==="beggeHarRett"&&e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonBeggeJobber",values:{navn:c,navn2:F,arbeidssituasjon:t.status,minsteInntekt:b}})}),A!=="beggeHarRett"&&x&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:H??w(c),arbeidssituasjon:t.status,minsteInntekt:b}})}),e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:G??w(F),arbeidssituasjon:t.jobberAnnenPart,minsteInntekt:b}})})]}),A!=="beggeHarRett"&&!x&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.Arbeidssituasjon",values:{navn:w(c),arbeidssituasjon:t.status,minsteInntekt:b}})}),e.jsx(p,{children:e.jsx(n,{id:"OppgittInformasjon.ArbeidssituasjonAnnenPart",values:{navn:w(F),arbeidssituasjon:t.jobberAnnenPart,minsteInntekt:b}})})]})]})]})}),e.jsx(C,{children:e.jsxs(u,{gap:"2",children:[e.jsx(M,{size:"xsmall",level:"4",children:e.jsx(n,{id:"OppgittInformasjon.LengdeOgFordeling",values:{kunEnPartSkalHa:A!=="beggeHarRett"}})}),e.jsxs(p,{children:[!P&&e.jsx(n,{id:"OppgittInformasjon.FordelingOptionsMedUker",values:{erAlenesøker:g,prosent:i.dekningsgrad,uker:q.uker,dager:q.dager,fellesuker:V?.uker||0,fellesdager:V?.dager||0,fellesuker2:S?.uker||0,fellesdager2:S?.dager||0,hvem:E(r,l),hvem2:I(r,l),kunEnPartSkalHa:A!=="beggeHarRett"}}),P&&e.jsx(n,{id:"OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel",values:{erAlenesøker:g,prosent:i.dekningsgrad,uker:q.uker,dager:q.dager}})]})]})})]})})]})})};xe.__docgenInfo={description:"",methods:[],displayName:"OppgittInformasjon",props:{stønadskontoer:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const be=({valgtStønadskonto:a,hvorLangPeriode:s,hvemPlanlegger:r,barnet:t,arbeidssituasjon:i,fordeling:o})=>{const d=te(),l=se(i),v=Ne(t),k=ve(a).totaltAntallDager,y=o?$(o.antallDagerSøker1):void 0,x=o?$(k-o.antallDagerSøker1):void 0,g=Ke(a),c=De(l,r)||Ee(l,r);let F;(r.type===_.MOR_OG_MEDMOR||r.type===_.MOR_OG_FAR)&&l==="kunSøker2HarRett"&&(F=ge(ge(v).denneEllerNeste()).leggTil(30));const T=Pe(r,l),m=Ve({erDeltUttak:o!==void 0,famDato:v,tilgjengeligeStønadskontoer:a.kontoer,fellesperiodeDagerMor:o?.antallDagerSøker1,bareFarMedmorHarRett:c,erAdopsjon:Q(t),erFarEllerMedmor:T,startdato:F,erMorUfør:i?.status===Je.UFØR,erAleneOmOmsorg:r.type===_.FAR||r.type===_.MOR,farOgFar:r.type===_.FAR_OG_FAR}),H=je(a),G=r.type===_.FAR_OG_FAR,A=E(r,d),N=me(A,d.locale),q=I(r,d),K=q?me(q,d.locale):void 0,V=ze(t),S=h(f.UTTAKSPLAN),P=z(h(f.TILPASS_PLAN)),b=S&&S.length>0?S[S.length-1]:[],oe=o!==void 0,Oe=Ze(oe,b,T),Te=We(oe,b,T);return e.jsx(u,{gap:"10",children:e.jsxs(j,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(O,{gap:"6",align:"center",wrap:!1,children:[e.jsx(L,{size:"medium",color:"lightBlue",children:e.jsx(Me,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(n,{id:"PlanenDeresOppsummering.Tittel",values:{erAlenesøker:D(r)}})})]})}),e.jsx(j.Content,{children:e.jsxs(u,{gap:"5",children:[l==="beggeHarRett"&&!G&&q&&K&&e.jsxs(C,{children:[e.jsxs(u,{gap:"2",children:[e.jsx(p,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgte",values:{prosent:s.dekningsgrad,antallUker:H.uker,antallDager:H.dager,hvem:E(r,d),hvem2:I(r,d),uker:y?.uker||0,dager:y?.dager||0,uker2:x?.uker||0,dager2:x?.dager||0}})}),e.jsx(p,{children:e.jsx(n,{id:"OppsummeringSteg.Periodene",values:{hvem:w(N),fom:d.formatDate(m.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(m.søker1[m.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:U=>e.jsx("b",{children:U})}})})]}),e.jsx(p,{children:e.jsx(n,{id:"OppsummeringSteg.Periodene",values:{hvem:w(K),fom:d.formatDate(m.søker2[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(m.søker2[m.søker2.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:U=>e.jsx("b",{children:U})}})})]}),(D(r)||G)&&e.jsx(C,{children:e.jsxs(u,{gap:"2",children:[e.jsx(B,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgteFedreEllerAlene",values:{prosent:s.dekningsgrad,erAlenesøker:D(r),antallUker:H.uker,antallDager:H.dager}})}),e.jsx(B,{children:e.jsx(n,{id:"OppsummeringSteg.Periode",values:{fom:d.formatDate(m.søker1[0].fom,{day:"2-digit",month:"short",year:"numeric"}),tom:d.formatDate(m.søker1[m.søker1.length-1].tom,{day:"2-digit",month:"short",year:"numeric"}),b:U=>e.jsx("b",{children:U})}})})]})}),l==="kunSøker2HarRett"&&!G&&q&&e.jsx(C,{children:e.jsx(u,{gap:"2",children:e.jsx(B,{children:e.jsx(n,{id:"OppsummeringSteg.DereValgteAktivitetskrav",values:{uker1:g.uker,dager1:g.dager,uker2:W(a).uker-g.uker,dager2:W(a).dager-g.dager,hvem:A,prosent:s.dekningsgrad,antallUker:W(a).uker,dager:W(a).dager}})})})}),e.jsx(Se,{bareFarMedmorHarRett:c,erFarEllerMedmor:T,harAktivitetskravIPeriodeUtenUttak:!1,søkersPerioder:P?Oe:m.søker1,annenPartsPerioder:P?Te:m.søker2,navnAnnenPart:"Test",barn:Be(t),planleggerLegend:e.jsx(Ye,{hvemPlanlegger:r,barnet:t,hvemHarRett:l,uttaksplan:P?b:[...m.søker1,...m.søker2]}),barnehagestartdato:V})]})})]})})};be.__docgenInfo={description:"",methods:[],displayName:"OppsummeringHarRett",props:{valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"antallDagerSøker1",value:{name:"number",required:!0}}]}},description:""}}};const ne=({satser:a,lønnSøker:s,fornavn:r})=>{const t=z(h(f.HVEM_PLANLEGGER)),i=D(t),d=6*ke(a),l=d/12,v=l/21.67,k=80/100,y=(g,c)=>Math.round(Math.min(g,l)*c),x=(g,c)=>Math.round(Math.min(g*12/260,v)*c);return e.jsx(u,{gap:"10",children:e.jsx(C,{children:e.jsxs(u,{gap:"2",children:[e.jsxs(O,{justify:"space-between",wrap:!1,children:[e.jsx(M,{size:"xsmall",level:"4",spacing:!0,children:e.jsx(n,{id:"HvorMyeOppsummering.DuVilFå",values:{hvem:w(r),erAlenesøker:i,utbetaling100:R(x(s,1)),utbetaling80:R(x(s,k))}})}),e.jsx(L,{size:"medium",color:"blue",children:e.jsx(Xe,{height:24,width:24,color:"#236B7D",fontSize:"1.5rem","aria-hidden":!0})})]}),e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.DetteBlir",values:{utbetaling100:R(y(s,1)),utbetaling80:R(y(s,k))}})}),s>=l&&e.jsxs(e.Fragment,{children:[e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.NAVDekker",values:{maksInntekt:R(d),a:g=>e.jsx(J,{href:X.grunnbeløpet,target:"_blank",rel:"noreferrer",children:g})}})}),e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.BasertPå",values:{hvem:r,erAlenesøker:i}})})]}),e.jsx(p,{children:e.jsx(n,{id:"HvorMyeOppsummering.DetteErBasertPå",values:{erAlenesøker:i,hvem:r,inntekt:R(y(s,1))}})})]})})})};ne.__docgenInfo={description:"",methods:[],displayName:"HvorMyePanel",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""},lønnSøker:{required:!0,tsType:{name:"number"},description:""},fornavn:{required:!0,tsType:{name:"string"},description:""}}};const Fe=({satser:a})=>{const s=te(),r=z(h(f.HVEM_PLANLEGGER)),t=z(h(f.HVOR_MYE)),i=E(r,s),o=I(r,s);return e.jsx(u,{gap:"10",children:(t.lønnSøker1!==void 0||t.lønnSøker2!==void 0)&&e.jsxs(j,{"aria-label":"",onToggle:ie("toggle-oppgitt-informasjon"),size:"small",children:[e.jsx(j.Header,{children:e.jsxs(O,{gap:"6",align:"center",wrap:!1,children:[e.jsx(L,{size:"medium",color:"lightBlue",children:e.jsx($e,{height:24,width:24,fontSize:"1.5rem","aria-hidden":!0})}),e.jsx(j.Title,{size:"small",children:e.jsx(n,{id:"HvorMyeOppsummering.Tittel"})})]})}),e.jsx(j.Content,{children:e.jsxs(u,{gap:"2",children:[t.lønnSøker1!==void 0&&i&&e.jsx(ne,{satser:a,fornavn:i,lønnSøker:t.lønnSøker1}),t.lønnSøker2!==void 0&&o&&e.jsx(ne,{satser:a,fornavn:o,lønnSøker:t.lønnSøker2})]})})]})})};Fe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeOppsummering",props:{satser:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}>`,required:!0}}]}},description:""}}};const qe=()=>e.jsxs("svg",{width:"43",height:"43",viewBox:"0 0 43 43",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsxs("g",{clipPath:"url(#clip0_2436_45089)",children:[e.jsx("rect",{x:"19.5898",y:"1.77783",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"19.5898",y:"30.5967",width:"3.09791",height:"10.2924",fill:"#FFECCC"}),e.jsx("rect",{x:"3.32617",y:"12.8975",width:"3.09791",height:"5.42135",transform:"rotate(-60 3.32617 12.8975)",fill:"#FFECCC"}),e.jsx("rect",{x:"32.502",y:"29.7422",width:"3.09791",height:"5.42135",transform:"rotate(-60 32.502 29.7422)",fill:"#FFECCC"}),e.jsx("rect",{x:"29.4727",y:"3.62402",width:"3.09791",height:"5.42135",transform:"rotate(30 29.4727 3.62402)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.627",y:"32.8003",width:"3.09791",height:"5.42135",transform:"rotate(30 12.627 32.8003)",fill:"#FFECCC"}),e.jsx("rect",{x:"9.91016",y:"5.17236",width:"3.09791",height:"5.42135",transform:"rotate(-30 9.91016 5.17236)",fill:"#FFECCC"}),e.jsx("rect",{x:"26.7539",y:"34.3486",width:"3.09791",height:"5.42135",transform:"rotate(-30 26.7539 34.3486)",fill:"#FFECCC"}),e.jsx("rect",{x:"37.1973",y:"10.207",width:"3.09791",height:"5.42135",transform:"rotate(60 37.1973 10.207)",fill:"#FFECCC"}),e.jsx("rect",{x:"8.02148",y:"27.0513",width:"3.09791",height:"5.42135",transform:"rotate(60 8.02148 27.0513)",fill:"#FFECCC"}),e.jsx("rect",{x:"40.8887",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 40.8887 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"12.0703",y:"19.7852",width:"3.09791",height:"10.2924",transform:"rotate(90 12.0703 19.7852)",fill:"#FFECCC"}),e.jsx("rect",{x:"30.444",y:"0.666667",width:"11.5556",height:"18.2222",rx:"5.77778",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M41.1931 5.7037C41.1931 8.49279 38.9598 10.7407 36.2209 10.7407C33.482 10.7407 31.2487 8.49279 31.2487 5.7037C31.2487 2.91462 33.482 0.666667 36.2209 0.666667C38.9598 0.666667 41.1931 2.91462 41.1931 5.7037Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-15-inside-1_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"34.6102",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M34.0825 5.70398C34.0825 5.43201 34.3044 5.18546 34.6102 5.18546V7.85212C35.8058 7.85212 36.7491 6.87596 36.7491 5.70398H34.0825ZM34.6102 5.18546C34.9161 5.18546 35.138 5.43201 35.138 5.70398H32.4714C32.4714 6.87596 33.4146 7.85212 34.6102 7.85212V5.18546ZM35.138 5.70398C35.138 5.97594 34.9161 6.22249 34.6102 6.22249V3.55583C33.4146 3.55583 32.4714 4.53199 32.4714 5.70398H35.138ZM34.6102 6.22249C34.3044 6.22249 34.0825 5.97594 34.0825 5.70398H36.7491C36.7491 4.53199 35.8058 3.55583 34.6102 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-15-inside-1_2436_45089)"}),e.jsx("mask",{id:"path-17-inside-2_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815"})}),e.jsx("ellipse",{cx:"37.8329",cy:"5.70398",rx:"0.805556",ry:"0.814815",fill:"#23262A"}),e.jsx("path",{d:"M37.3051 5.70398C37.3051 5.43201 37.5271 5.18546 37.8329 5.18546V7.85212C39.0285 7.85212 39.9718 6.87596 39.9718 5.70398H37.3051ZM37.8329 5.18546C38.1387 5.18546 38.3607 5.43201 38.3607 5.70398H35.694C35.694 6.87596 36.6373 7.85212 37.8329 7.85212V5.18546ZM38.3607 5.70398C38.3607 5.97594 38.1387 6.22249 37.8329 6.22249V3.55583C36.6373 3.55583 35.694 4.53199 35.694 5.70398H38.3607ZM37.8329 6.22249C37.5271 6.22249 37.3051 5.97594 37.3051 5.70398H39.9718C39.9718 4.53199 39.0285 3.55583 37.8329 3.55583V6.22249Z",fill:"#23262A",mask:"url(#path-17-inside-2_2436_45089)"}),e.jsx("path",{d:"M39.4451 9.582L31.9375 17.1084",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M0.912637 17.5765L13.9992 10.021L17.1486 15.4759C19.2351 19.0897 17.9969 23.7106 14.3831 25.797C10.7694 27.8834 6.14845 26.6452 4.06204 23.0315L0.912637 17.5765Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M27.9975 34.2706L14.9109 41.8262L11.7615 36.3713C9.6751 32.7575 10.9133 28.1366 14.527 26.0502C18.1408 23.9638 22.7617 25.2019 24.8481 28.8157L27.9975 34.2706Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M5.13281 23.5571L17.4496 16.446",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("path",{d:"M14.9111 41.8265L13.686 39.7045L18.0822 32.2078L26.7726 32.1489L27.9977 34.2709L14.9111 41.8265Z",stroke:"#23262A",strokeWidth:"1.33333"}),e.jsx("mask",{id:"path-24-inside-3_2436_45089",fill:"white",children:e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)"})}),e.jsx("ellipse",{cx:"14.4549",cy:"25.7589",rx:"1.1746",ry:"1.16828",transform:"rotate(-30 14.4549 25.7589)",fill:"#23262A"}),e.jsx("path",{d:"M14.3174 25.8383C14.2685 25.7535 14.3023 25.6564 14.3724 25.616L15.7057 27.9254C16.8994 27.2362 17.321 25.7073 16.6268 24.505L14.3174 25.8383ZM14.3724 25.616C14.4424 25.5756 14.5434 25.5948 14.5924 25.6796L12.283 27.0129C12.9771 28.2153 14.5121 28.6146 15.7057 27.9254L14.3724 25.616ZM14.5924 25.6796C14.6413 25.7644 14.6075 25.8614 14.5374 25.9019L13.2041 23.5925C12.0104 24.2816 11.5888 25.8105 12.283 27.0129L14.5924 25.6796ZM14.5374 25.9019C14.4674 25.9423 14.3664 25.9231 14.3174 25.8383L16.6268 24.505C15.9326 23.3026 14.3977 22.9033 13.2041 23.5925L14.5374 25.9019Z",fill:"#23262A",mask:"url(#path-24-inside-3_2436_45089)"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2436_45089",children:e.jsx("rect",{width:"42.6667",height:"42.6667",fill:"white"})})})]});qe.__docgenInfo={description:"",methods:[],displayName:"HvorMyeIkon"};const rr="_background_1y3o4_1",nr="_content_1y3o4_6",tr="_lenkepanel_1y3o4_12",ar="_panel_1y3o4_18",Y={background:rr,content:nr,lenkepanel:tr,panel:ar},sr=({stønadskontoer:a,satser:s})=>{const r=He();Ie();const t=z(h(f.HVEM_PLANLEGGER)),i=z(h(f.OM_BARNET)),o=h(f.HVOR_LANG_PERIODE),d=h(f.ARBEIDSSITUASJON),l=h(f.FORDELING),v=h(f.HVOR_MYE),k=D(t),y=a&&o?a[o.dekningsgrad]:void 0,x=ae(i)&&ee(i.fødselsdato).isBefore(_e),g=d?se(d):"ingenHarRett",c=!x&&g!=="ingenHarRett",F=Ge(i),T=ee().add(18,"weeks").add(3,"days").toDate(),m=Q(i);return e.jsxs(e.Fragment,{children:[e.jsx(he,{children:e.jsxs(u,{gap:"10",children:[e.jsxs(u,{gap:"5",children:[!c&&e.jsx(u,{gap:"5",children:e.jsxs(pe,{header:k?e.jsx(n,{id:"OppsummeringSteg.Infoboks.IngenHarRettDeg"}):e.jsx(n,{id:"OppsummeringSteg.Infoboks.IngenHarRett"}),icon:e.jsx(ye,{height:24,width:24,color:"#7F8900","aria-hidden":!0}),color:"green",children:[e.jsx(B,{children:e.jsx(n,{id:"OppsummeringSteg.Infoboks.BasertPåSvarene",values:{erAleneforsørger:k}})}),e.jsxs(B,{children:[e.jsx(n,{id:"OppsummeringSteg.Infoboks.Engangsstønad"}),e.jsx(J,{inlineText:!0,href:X.veiviser,children:e.jsx(n,{id:"OppsummeringSteg.Infoboks.Engangsstønad.Link"})}),"."]})]})}),a&&y&&o&&d&&e.jsxs(u,{gap:"2",children:[c&&e.jsx(be,{valgtStønadskonto:y,hvorLangPeriode:o,hvemPlanlegger:t,barnet:i,arbeidssituasjon:d,fordeling:l}),v&&e.jsx(Fe,{satser:s}),!m&&e.jsx(Ue,{hvemPlanlegger:t,barnet:i}),e.jsx(xe,{stønadskontoer:a,barnet:i,hvemPlanlegger:t,arbeidssituasjon:d,hvorLangPeriode:o,fordeling:l,satser:s})]}),e.jsx(Le,{erAlenesøker:k}),(c&&ee(F).isBefore(T)||c&&m)&&e.jsx(fe,{erAlenesøker:k,barnet:i})]}),e.jsx(u,{gap:"10",children:e.jsx(O,{children:e.jsx(ce,{variant:"secondary",onClick:r.goToPreviousDefaultStep,icon:e.jsx(Re,{"aria-hidden":!0,height:24,width:24}),children:e.jsx(n,{id:"OppsummeringSteg.TilbakeTil"})})})})]})}),e.jsx("div",{className:Y.background,children:e.jsxs(u,{gap:"4",className:Y.content,children:[e.jsx(M,{level:"2",size:"medium",children:e.jsx(n,{id:"OppsummeringSteg.AnnenVeiviser"})}),e.jsx(J,{inlineText:!0,href:X.veiviser,target:"_blank",rel:"noreferrer",className:Y.lenkepanel,children:e.jsx(Ce,{padding:"4",background:"surface-default",borderRadius:"xlarge",shadow:"medium",className:Y.panel,children:e.jsxs(O,{gap:"5",align:"center",children:[e.jsx(qe,{}),e.jsx(M,{level:"3",size:"small",children:e.jsx(n,{id:"OppsummeringSteg.VeiviserHvorMye"})})]})})})]})})]})};sr.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{stønadskontoer:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
