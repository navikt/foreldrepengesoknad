import{j as r}from"./jsx-runtime-Du8NFWEI.js";import{u as b,F as f}from"./index-e2vXP8VC.js";import{e as S,S as q,h as U,a as H,i as G,f as I}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as B}from"./barnetUtils-Dtg6gkcN.js";import{h as N,a as D,b as x,u as K}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as C,b as V,w as T,f as z}from"./uttakUtils-ViXZh0qG.js";import{I as c}from"./dateUtils-C_C2kvi-.js";import{d as v}from"./dayjs.min-a42Le6oL.js";import"./index-Dl6G-zuu.js";import{C as _}from"./CalendarIconLabel-C9DNWetD.js";import{B as P}from"./Label-DKKZxAV5.js";import{F as J}from"./FamiliehendelseLabel-C2nTOLX1.js";import{V as Q,H as w}from"./VStack-C-EA7mzX.js";import{D as a}from"./Calendar-Bhe1saZ-.js";const F=n=>n.charAt(0).toUpperCase()+n.slice(1),W="_srOnly_19lbm_1",A={srOnly:W},R=({utenAktivitetskrav:n=!1,annenPartTekst:i,startdato:e,sluttdato:u,isBluePanel:y=!1,valgtStønadskonto:s,hvemPlanlegger:l})=>{const o=b();return r.jsxs(_,{iconType:y?"blue":"green",children:[r.jsxs(P,{children:[n&&r.jsx(f,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:F(i),uker:C(s),erMorHovedsøker:S(l)}}),!n&&r.jsx(f,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:F(i),uker:V(s),erMorHovedsøker:S(l)}})]}),r.jsx("div",{className:A.srOnly,children:r.jsx(f,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:F(i),startdato:o.formatDate(e,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:o.formatDate(u,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};R.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},annenPartTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const O=({søkerTekst:n,startdato:i,sluttdato:e,isBluePanel:u=!1})=>{const y=b();return r.jsxs(_,{iconType:u?"blue":"green",children:[r.jsx(P,{children:r.jsx(f,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:F(n),uker:T(i,e),dato:y.formatDate(i,{day:"2-digit",month:"short",weekday:"long"})}})}),r.jsx("div",{className:A.srOnly,children:r.jsx(f,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:F(n),uker:T(i,e),dato:y.formatDate(e,{day:"2-digit",month:"short",weekday:"long"})}})})]})};O.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const h=({startdato:n,sluttdato:i})=>{const e=b();return r.jsxs(_,{iconType:"blue",children:[r.jsx(P,{children:r.jsx(f,{id:"OversiktSteg.ForeldrepengerLabel"})}),r.jsx("div",{className:A.srOnly,children:r.jsx(f,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:e.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:e.formatDate(i,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};h.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const X=({barnet:n,uttaksdata:i,hvemPlanlegger:e,hvemHarRett:u,valgtStønadskonto:y})=>{const s=b(),l=B(n),o=e.type===q.FAR_OG_FAR,t=o&&e.navnPåMedfar?U(e,s):H(s,e),m=o&&e.navnPåMedfar?G(e,s):I(s,e),{startdatoPeriode1:k,sluttdatoPeriode1:d,startdatoPeriode2:g,sluttdatoPeriode2:p}=i,M=o&&!l,j=o&&l,E=!M&&(u==="beggeHarRett"||N(u,e)&&!j||D(u,e)),L=!M&&m&&g&&p&&(x(u,e)||u==="kunSøker1HarRett"&&j);return r.jsxs(Q,{gap:{sm:"1",md:"2"},children:[E&&r.jsxs(w,{gap:"1",children:[r.jsx(O,{søkerTekst:t,startdato:k,sluttdato:d,isBluePanel:!0}),m&&u==="beggeHarRett"&&g&&p&&r.jsx(O,{søkerTekst:m,startdato:g,sluttdato:p})]}),L&&r.jsxs(r.Fragment,{children:[r.jsx(R,{utenAktivitetskrav:!0,valgtStønadskonto:y,hvemPlanlegger:e,annenPartTekst:u==="kunSøker1HarRett"&&j?t:m,startdato:k,sluttdato:d,isBluePanel:!0}),r.jsx(R,{valgtStønadskonto:y,hvemPlanlegger:e,annenPartTekst:u==="kunSøker1HarRett"&&j?t:m,startdato:g,sluttdato:p})]}),r.jsxs(w,{gap:"2",children:[M&&r.jsx(h,{startdato:k,sluttdato:d}),r.jsx(J,{barnet:n})]})]})};X.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""},uttaksdata:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    familiehendelsedato: string;
    startdatoPeriode1: string;
    sluttdatoPeriode1: string;
    startdatoPeriode2?: string;
    sluttdatoPeriode2?: string;
}`,signature:{properties:[{key:"familiehendelsedato",value:{name:"string",required:!0}},{key:"startdatoPeriode1",value:{name:"string",required:!0}},{key:"sluttdatoPeriode1",value:{name:"string",required:!0}},{key:"startdatoPeriode2",value:{name:"string",required:!1}},{key:"sluttdatoPeriode2",value:{name:"string",required:!1}}]}},description:""},hvemPlanlegger:{required:!0,tsType:{name:"union",raw:"MorOgFar | MorOgMedmor | FarOgFar | Mor | Far",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const me=(n,i,e,u,y)=>{const s=K(u),{startdatoPeriode1:l,sluttdatoPeriode1:o,familiehendelsedato:t,startdatoPeriode2:m,sluttdatoPeriode2:k}=z(s,e,n,i,y),d=B(i),g=e.type===q.FAR_OG_FAR;if(s==="beggeHarRett"){if(g&&!d)return[{fom:t,tom:t,color:a.PINK},{fom:v(t).add(1,"day").format(c),tom:o,color:a.BLUE}];if(m&&k){const p=[];return d||p.push({fom:l,tom:v(t).subtract(1,"day").format(c),color:a.BLUE}),p.concat({fom:t,tom:t,color:a.PINK},{fom:v(t).add(1,"day").format(c),tom:o,color:a.BLUE},{fom:m,tom:k,color:a.GREEN})}}if(s==="kunSøker1HarRett"&&S(e)){const p=[];return d||p.push({fom:l,tom:v(t).subtract(1,"day").format(c),color:a.BLUE}),p.concat([{fom:t,tom:t,color:a.PINK},{fom:v(t).add(1,"day").format(c),tom:o,color:a.BLUE}])}if(s==="kunSøker1HarRett"&&(e.type===q.FAR||g&&!d))return[{fom:t,tom:t,color:a.PINK},{fom:v(t).add(1,"day").format(c),tom:o,color:a.BLUE}];if(s==="kunSøker2HarRett"||s==="kunSøker1HarRett"&&e.type===q.FAR_OG_FAR||!d){if(g&&!d)return[{fom:t,tom:t,color:a.PINK},{fom:l,tom:o,color:a.BLUE}];if(m&&k)return[{fom:t,tom:t,color:a.PINK},{fom:l,tom:o,color:a.BLUE},{fom:m,tom:k,color:a.GREEN}]}if(x(s,e)&&d)return[{fom:t,tom:t,color:a.PINK},{fom:v(t).add(1,"day").format(c),tom:o,color:a.BLUE}];throw Error("Ingen perioder finnes")};export{X as C,me as l};
