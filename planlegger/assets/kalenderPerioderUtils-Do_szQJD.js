import{j as t}from"./jsx-runtime-Du8NFWEI.js";import{u as F,F as c}from"./index-e2vXP8VC.js";import{S as b,h as L,i as U,e as D}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as x}from"./barnetUtils-Dtg6gkcN.js";import{h as I,a as N,b as G,u as K}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as C,b as V,w as M,f as z}from"./uttakUtils-tmh3HbG4.js";import{I as R}from"./dateUtils-5Hvu9v6e.js";import{d as S}from"./dayjs.min-C_lTf2E1.js";import"./index-Dl6G-zuu.js";import{C as A}from"./CalendarIconLabel-C9DNWetD.js";import{B as T}from"./Label-DKKZxAV5.js";import{F as J}from"./FamiliehendelseLabel-Cy9qczV3.js";import{V as Q,H as h}from"./VStack-C-EA7mzX.js";import{D as m}from"./Calendar-Dp41EVdM.js";const y=e=>e.charAt(0).toUpperCase()+e.slice(1),W="_srOnly_19lbm_1",_={srOnly:W},O=({utenAktivitetskrav:e=!1,tekstPart1:n,tekstPart2:r,startdato:a,sluttdato:i,isBluePanel:s=!1,valgtStønadskonto:o})=>{const d=F();return t.jsxs(A,{iconType:s?"blue":"green",children:[t.jsxs(T,{children:[e&&t.jsx(c,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:y(n),uker:C(o),hvemPart2:y(r)}}),!e&&t.jsx(c,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:y(n),uker:V(o),hvemPart2:y(r)}})]}),t.jsx("div",{className:_.srOnly,children:t.jsx(c,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:y(n),startdato:d.formatDate(a,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:d.formatDate(i,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};O.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const P=({søkerTekst:e,startdato:n,sluttdato:r,isBluePanel:a=!1})=>{const i=F();return t.jsxs(A,{iconType:a?"blue":"green",children:[t.jsx(T,{children:t.jsx(c,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:y(e),uker:M(n,r),dato:i.formatDate(n,{day:"2-digit",month:"short",weekday:"long"})}})}),t.jsx("div",{className:_.srOnly,children:t.jsx(c,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:y(e),uker:M(n,r),dato:i.formatDate(r,{day:"2-digit",month:"short",weekday:"long"})}})})]})};P.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const B=({startdato:e,sluttdato:n})=>{const r=F();return t.jsxs(A,{iconType:"blue",children:[t.jsx(T,{children:t.jsx(c,{id:"OversiktSteg.ForeldrepengerLabel"})}),t.jsx("div",{className:_.srOnly,children:t.jsx(c,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:r.formatDate(e,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:r.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};B.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const X=({barnet:e,uttaksdata:n,hvemPlanlegger:r,hvemHarRett:a,valgtStønadskonto:i})=>{const s=F(),o=x(e),d=r.type===b.FAR_OG_FAR,l=L(r,s),u=U(r,s),{startdatoPeriode1:g,sluttdatoPeriode1:p,startdatoPeriode2:k,sluttdatoPeriode2:v}=n,j=d&&!o,q=d&&o,H=!j&&(a==="beggeHarRett"||I(a,r)&&!q||N(a,r)),E=!j&&u&&k&&v&&(G(a,r)||a==="kunSøker1HarRett"&&q),f=a==="kunSøker1HarRett"&&q;return t.jsxs(Q,{gap:"1",children:[H&&t.jsxs(h,{gap:"1",children:[t.jsx(P,{søkerTekst:l,startdato:g,sluttdato:p,isBluePanel:!0}),u&&a==="beggeHarRett"&&k&&v&&t.jsx(P,{søkerTekst:u,startdato:k,sluttdato:v})]}),E&&t.jsxs(t.Fragment,{children:[t.jsx(O,{utenAktivitetskrav:!0,valgtStønadskonto:i,tekstPart1:f?l:u,tekstPart2:f?u:l,startdato:g,sluttdato:p,isBluePanel:!0}),t.jsx(O,{valgtStønadskonto:i,tekstPart1:f?l:u,tekstPart2:f?u:l,startdato:k,sluttdato:v})]}),t.jsxs(h,{gap:"2",children:[j&&t.jsx(B,{startdato:g,sluttdato:p}),t.jsx(J,{barnet:e})]})]})};X.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const Y=(e,n)=>[{fom:e,tom:e,color:m.PINK},{fom:S(e).add(1,"day").format(R),tom:n,color:m.BLUE}],w=(e,n,r,a,i,s)=>{const o=[];return e||o.push({fom:n,tom:S(a).subtract(1,"day").format(R),color:m.BLUE}),o.push({fom:a,tom:a,color:m.PINK}),o.push({fom:S(a).add(1,"day").format(R),tom:r,color:m.BLUE}),i&&s&&o.push({fom:i,tom:s,color:m.GREEN}),o},Z=(e,n,r,a,i)=>[{fom:r,tom:r,color:m.PINK},{fom:e,tom:n,color:m.BLUE},{fom:a,tom:i,color:m.GREEN}],$=(e,n,r)=>e.type===b.FAR_OG_FAR&&!r&&n!=="ingenHarRett",ee=(e,n)=>n==="kunSøker1HarRett"&&e.type===b.FAR_OG_FAR,re=(e,n)=>n==="kunSøker1HarRett"&&e.type===b.FAR,ce=(e,n,r,a,i)=>{const s=K(a),{startdatoPeriode1:o,sluttdatoPeriode1:d,familiehendelsedato:l,startdatoPeriode2:u,sluttdatoPeriode2:g}=z(s,r,e,n,i),p=x(n),k=u&&g;if($(r,s,p)||re(r,s))return Y(l,d);if(s==="beggeHarRett"&&k)return w(p,o,d,l,u,g);if(s==="kunSøker1HarRett"&&D(r))return w(p,o,d,l);if(k&&(s==="kunSøker2HarRett"||ee(r,s)||!p))return Z(o,d,l,u,g);throw Error("Ingen perioder finnes")};export{X as C,ce as l};
