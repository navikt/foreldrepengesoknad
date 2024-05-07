import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as q,F as v}from"./index-e2vXP8VC.js";import{S as j,h as U,i as H,e as I}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as w}from"./barnetUtils-Dtg6gkcN.js";import{h as N,a as D,b as x,u as G}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as K,b as C,w as M,f as V}from"./uttakUtils-CrBM_WY2.js";import{I as y}from"./dateUtils-C_C2kvi-.js";import{d as c}from"./dayjs.min-a42Le6oL.js";import"./index-Dl6G-zuu.js";import{C as A}from"./CalendarIconLabel-C9DNWetD.js";import{B as T}from"./Label-DKKZxAV5.js";import{F as z}from"./FamiliehendelseLabel-BTP-zh4d.js";import{V as J,H as h}from"./VStack-C-EA7mzX.js";import{D as a}from"./Calendar-Bhe1saZ-.js";const f=n=>n.charAt(0).toUpperCase()+n.slice(1),Q="_srOnly_19lbm_1",_={srOnly:Q},O=({utenAktivitetskrav:n=!1,tekstPart1:s,tekstPart2:t,startdato:o,sluttdato:m,isBluePanel:i=!1,valgtStønadskonto:p})=>{const d=q();return e.jsxs(A,{iconType:i?"blue":"green",children:[e.jsxs(T,{children:[n&&e.jsx(v,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:f(s),uker:K(p),hvemPart2:f(t)}}),!n&&e.jsx(v,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:f(s),uker:C(p),hvemPart2:f(t)}})]}),e.jsx("div",{className:_.srOnly,children:e.jsx(v,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:f(s),startdato:d.formatDate(o,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:d.formatDate(m,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};O.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const P=({søkerTekst:n,startdato:s,sluttdato:t,isBluePanel:o=!1})=>{const m=q();return e.jsxs(A,{iconType:o?"blue":"green",children:[e.jsx(T,{children:e.jsx(v,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:f(n),uker:M(s,t),dato:m.formatDate(s,{day:"2-digit",month:"short",weekday:"long"})}})}),e.jsx("div",{className:_.srOnly,children:e.jsx(v,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:f(n),uker:M(s,t),dato:m.formatDate(t,{day:"2-digit",month:"short",weekday:"long"})}})})]})};P.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const B=({startdato:n,sluttdato:s})=>{const t=q();return e.jsxs(A,{iconType:"blue",children:[e.jsx(T,{children:e.jsx(v,{id:"OversiktSteg.ForeldrepengerLabel"})}),e.jsx("div",{className:_.srOnly,children:e.jsx(v,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:t.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:t.formatDate(s,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};B.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const W=({barnet:n,uttaksdata:s,hvemPlanlegger:t,hvemHarRett:o,valgtStønadskonto:m})=>{const i=q(),p=w(n),d=t.type===j.FAR_OG_FAR,r=U(t,i),u=H(t,i),{startdatoPeriode1:k,sluttdatoPeriode1:g,startdatoPeriode2:F,sluttdatoPeriode2:l}=s,S=d&&!p,R=d&&p,L=!S&&(o==="beggeHarRett"||N(o,t)&&!R||D(o,t)),E=!S&&u&&F&&l&&(x(o,t)||o==="kunSøker1HarRett"&&R),b=o==="kunSøker1HarRett"&&R;return e.jsxs(J,{gap:{sm:"1",md:"2"},children:[L&&e.jsxs(h,{gap:"1",children:[e.jsx(P,{søkerTekst:r,startdato:k,sluttdato:g,isBluePanel:!0}),u&&o==="beggeHarRett"&&F&&l&&e.jsx(P,{søkerTekst:u,startdato:F,sluttdato:l})]}),E&&e.jsxs(e.Fragment,{children:[e.jsx(O,{utenAktivitetskrav:!0,valgtStønadskonto:m,tekstPart1:b?r:u,tekstPart2:b?u:r,startdato:k,sluttdato:g,isBluePanel:!0}),e.jsx(O,{valgtStønadskonto:m,tekstPart1:b?r:u,tekstPart2:b?u:r,startdato:F,sluttdato:l})]}),e.jsxs(h,{gap:"2",children:[S&&e.jsx(B,{startdato:k,sluttdato:g}),e.jsx(z,{barnet:n})]})]})};W.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const le=(n,s,t,o,m)=>{const i=G(o),{startdatoPeriode1:p,sluttdatoPeriode1:d,familiehendelsedato:r,startdatoPeriode2:u,sluttdatoPeriode2:k}=V(i,t,n,s,m),g=w(s);if(t.type===j.FAR_OG_FAR&&!g&&i!=="ingenHarRett")return[{fom:r,tom:r,color:a.PINK},{fom:c(r).add(1,"day").format(y),tom:d,color:a.BLUE}];if(i==="beggeHarRett"&&u&&k){const l=[];return g||l.push({fom:p,tom:c(r).subtract(1,"day").format(y),color:a.BLUE}),l.concat({fom:r,tom:r,color:a.PINK},{fom:c(r).add(1,"day").format(y),tom:d,color:a.BLUE},{fom:u,tom:k,color:a.GREEN})}if(i==="kunSøker1HarRett"&&I(t)){const l=[];return g||l.push({fom:p,tom:c(r).subtract(1,"day").format(y),color:a.BLUE}),l.concat([{fom:r,tom:r,color:a.PINK},{fom:c(r).add(1,"day").format(y),tom:d,color:a.BLUE}])}if(i==="kunSøker1HarRett"&&t.type===j.FAR)return[{fom:r,tom:r,color:a.PINK},{fom:c(r).add(1,"day").format(y),tom:d,color:a.BLUE}];if((i==="kunSøker2HarRett"||i==="kunSøker1HarRett"&&t.type===j.FAR_OG_FAR||!g)&&u&&k)return[{fom:r,tom:r,color:a.PINK},{fom:p,tom:d,color:a.BLUE},{fom:u,tom:k,color:a.GREEN}];if(x(i,t)&&g)return[{fom:r,tom:r,color:a.PINK},{fom:c(r).add(1,"day").format(y),tom:d,color:a.BLUE}];throw Error("Ingen perioder finnes")};export{W as C,le as l};
