import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as b,F as k}from"./index-e2vXP8VC.js";import{S as q,h as L,i as D,e as I}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as H}from"./barnetUtils-Dtg6gkcN.js";import{h as N,a as G,b as K,u as V}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as C,b as z,w as h,f as J}from"./uttakUtils-CrBM_WY2.js";import{I as O}from"./dateUtils-C_C2kvi-.js";import{d as P}from"./dayjs.min-a42Le6oL.js";import"./index-Dl6G-zuu.js";import{C as T}from"./CalendarIconLabel-C9DNWetD.js";import{B as M}from"./Label-DKKZxAV5.js";import{F as Q}from"./FamiliehendelseLabel-BTP-zh4d.js";import{V as W,H as w}from"./VStack-C-EA7mzX.js";import{D as g}from"./Calendar-C0tOnmix.js";const v=t=>t.charAt(0).toUpperCase()+t.slice(1),X="_srOnly_19lbm_1",_={srOnly:X},j=({utenAktivitetskrav:t=!1,tekstPart1:a,tekstPart2:r,startdato:n,sluttdato:s,isBluePanel:o=!1,valgtStønadskonto:i,visUkerAktivitetskrav:m=!0})=>{const l=b();return e.jsxs(T,{iconType:o?"blue":"green",children:[e.jsx(M,{children:m?e.jsxs(e.Fragment,{children:[t&&e.jsx(k,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:v(a),uker:C(i),hvemPart2:v(r)}}),!t&&e.jsx(k,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:v(a),uker:z(i),hvemPart2:v(r)}})]}):e.jsxs(e.Fragment,{children:[t&&e.jsx(k,{id:"OversiktSteg.UtenAktivitetskrav"}),!t&&e.jsx(k,{id:"OversiktSteg.MedAktivitetskrav"})]})}),e.jsx("div",{className:_.srOnly,children:e.jsx(k,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:v(a),startdato:l.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:l.formatDate(s,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};j.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},visUkerAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const A=({søkerTekst:t,startdato:a,sluttdato:r,isBluePanel:n=!1})=>{const s=b();return e.jsxs(T,{iconType:n?"blue":"green",children:[e.jsx(M,{children:e.jsx(k,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:v(t),uker:h(a,r),dato:s.formatDate(a,{day:"2-digit",month:"short",weekday:"long"})}})}),e.jsx("div",{className:_.srOnly,children:e.jsx(k,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:v(t),uker:h(a,r),dato:s.formatDate(r,{day:"2-digit",month:"short",weekday:"long"})}})})]})};A.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const U=({startdato:t,sluttdato:a})=>{const r=b();return e.jsxs(T,{iconType:"blue",children:[e.jsx(M,{children:e.jsx(k,{id:"OversiktSteg.ForeldrepengerLabel"})}),e.jsx("div",{className:_.srOnly,children:e.jsx(k,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:r.formatDate(t,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:r.formatDate(a,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};U.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const Y=({barnet:t,uttaksdata:a,hvemPlanlegger:r,hvemHarRett:n,valgtStønadskonto:s,erOppsummering:o})=>{const i=b(),m=H(t),l=r.type===q.FAR_OG_FAR,d=L(r,i),u=D(r,i),{startdatoPeriode1:p,sluttdatoPeriode1:c,startdatoPeriode2:f,sluttdatoPeriode2:F}=a,R=l&&!m,S=l&&m,E=!R&&(n==="beggeHarRett"||N(n,r)&&!S||G(n,r)),x=!R&&u&&f&&F&&(K(n,r)||n==="kunSøker1HarRett"&&S),y=n==="kunSøker1HarRett"&&S;return e.jsxs(W,{gap:"1",children:[E&&e.jsxs(w,{gap:"1",children:[e.jsx(A,{søkerTekst:d,startdato:p,sluttdato:c,isBluePanel:!0}),u&&n==="beggeHarRett"&&f&&F&&e.jsx(A,{søkerTekst:u,startdato:f,sluttdato:F})]}),x&&!o&&e.jsxs(e.Fragment,{children:[e.jsx(j,{utenAktivitetskrav:!0,valgtStønadskonto:s,tekstPart1:y?d:u,tekstPart2:y?u:d,startdato:p,sluttdato:c,isBluePanel:!0}),e.jsx(j,{valgtStønadskonto:s,tekstPart1:y?d:u,tekstPart2:y?u:d,startdato:f,sluttdato:F})]}),x&&o&&e.jsxs(e.Fragment,{children:[e.jsx(j,{utenAktivitetskrav:!0,valgtStønadskonto:s,tekstPart1:y?d:u,tekstPart2:y?u:d,startdato:p,sluttdato:c,isBluePanel:!0,visUkerAktivitetskrav:!1}),e.jsx(j,{valgtStønadskonto:s,tekstPart1:y?d:u,tekstPart2:y?u:d,startdato:f,sluttdato:F,visUkerAktivitetskrav:!1})]}),e.jsxs(w,{gap:"2",children:[R&&e.jsx(U,{startdato:p,sluttdato:c}),e.jsx(Q,{barnet:t})]})]})};Y.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]}},description:""},erOppsummering:{required:!1,tsType:{name:"boolean"},description:""}}};const Z=(t,a)=>[{fom:t,tom:t,color:g.PINK},{fom:P(t).add(1,"day").format(O),tom:a,color:g.BLUE}],B=(t,a,r,n,s,o)=>{const i=[];return t||i.push({fom:a,tom:P(n).subtract(1,"day").format(O),color:g.BLUE}),i.push({fom:n,tom:n,color:g.PINK}),i.push({fom:P(n).add(1,"day").format(O),tom:r,color:g.BLUE}),s&&o&&i.push({fom:s,tom:o,color:g.GREEN}),i},$=(t,a,r,n,s)=>[{fom:r,tom:r,color:g.PINK},{fom:t,tom:a,color:g.BLUE},{fom:n,tom:s,color:g.GREEN}],ee=(t,a,r)=>t.type===q.FAR_OG_FAR&&!r&&a!=="ingenHarRett",te=(t,a)=>a==="kunSøker1HarRett"&&t.type===q.FAR_OG_FAR,re=(t,a)=>a==="kunSøker1HarRett"&&t.type===q.FAR,ve=(t,a,r,n,s)=>{const o=V(n),{startdatoPeriode1:i,sluttdatoPeriode1:m,familiehendelsedato:l,startdatoPeriode2:d,sluttdatoPeriode2:u}=J(o,r,t,a,s),p=H(a),c=d&&u;if(ee(r,o,p)||re(r,o))return Z(l,m);if(o==="beggeHarRett"&&c)return B(p,i,m,l,d,u);if(o==="kunSøker1HarRett"&&I(r))return B(p,i,m,l);if(c&&(o==="kunSøker2HarRett"||te(r,o)||!p))return $(i,m,l,d,u);throw Error("Ingen perioder finnes")};export{Y as C,ve as l};
