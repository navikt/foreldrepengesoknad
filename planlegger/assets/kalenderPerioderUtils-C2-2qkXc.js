import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{F as l,u as h}from"./index-e2vXP8VC.js";import{S as f,h as L,i as U,e as I}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as B}from"./barnetUtils-Dtg6gkcN.js";import{h as N,a as G,b as K,u as D}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as V,b as C,f as z}from"./uttakUtils-BkryVa93.js";import{I as S}from"./dateUtils-C_C2kvi-.js";import{d as R}from"./dayjs.min-a42Le6oL.js";import"./index-Dl6G-zuu.js";import{C as P}from"./CalendarIconLabel-C9DNWetD.js";import{B as M}from"./Label-DKKZxAV5.js";import{F as b}from"./FamiliehendelseLabel-Cu9KM8iZ.js";import{V as J,H as q}from"./VStack-C-EA7mzX.js";import{D as p}from"./Calendar-4ps_piA-.js";const k=r=>r.charAt(0).toUpperCase()+r.slice(1),Q="_srOnly_19lbm_1",_={srOnly:Q},O=({utenAktivitetskrav:r=!1,tekstPart1:n,tekstPart2:t,isBluePanel:a=!1,valgtStønadskonto:o,visUkerAktivitetskrav:s=!0})=>e.jsxs(P,{iconType:a?"blue":"green",children:[e.jsx(M,{children:s?e.jsxs(e.Fragment,{children:[r&&e.jsx(l,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:k(n),uker:V(o),hvemPart2:k(t)}}),!r&&e.jsx(l,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:k(n),uker:C(o),hvemPart2:k(t)}})]}):e.jsxs(e.Fragment,{children:[r&&e.jsx(l,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(l,{id:"OversiktSteg.MedAktivitetskrav"})]})}),e.jsx("div",{className:_.srOnly,children:e.jsx(l,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:k(n)}})})]});O.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},visUkerAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const A=({søkerTekst:r,isBluePanel:n=!1})=>e.jsxs(P,{iconType:n?"blue":"green",children:[e.jsx(M,{children:e.jsx(l,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:k(r)}})}),e.jsx("div",{className:_.srOnly,children:e.jsx(l,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:k(r)}})})]});A.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const w=({startdato:r,sluttdato:n})=>{const t=h();return e.jsxs(P,{iconType:"blue",children:[e.jsx(M,{children:e.jsx(l,{id:"OversiktSteg.ForeldrepengerLabel"})}),e.jsx("div",{className:_.srOnly,children:e.jsx(l,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:t.formatDate(r,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:t.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};w.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const W=({barnet:r,uttaksdata:n,hvemPlanlegger:t,hvemHarRett:a,valgtStønadskonto:o})=>{const s=h(),i=B(r),m=t.type===f.FAR_OG_FAR,d=L(t,s),u=U(t,s),{startdatoPeriode1:y,sluttdatoPeriode1:g,startdatoPeriode2:c,sluttdatoPeriode2:T}=n,F=m&&!i,j=m&&i,H=!F&&(a==="beggeHarRett"||N(a,t)&&!j||G(a,t)),E=!F&&u&&c&&T&&(K(a,t)||a==="kunSøker1HarRett"&&j),v=a==="kunSøker1HarRett"&&j;return e.jsxs(J,{gap:"1",children:[H&&e.jsxs(q,{gap:"2",children:[e.jsx(A,{søkerTekst:d,isBluePanel:!0}),u&&a==="beggeHarRett"&&c&&T&&e.jsx(A,{søkerTekst:u}),e.jsx(b,{barnet:r})]}),E&&e.jsxs(q,{gap:"2",children:[e.jsx(O,{utenAktivitetskrav:!0,valgtStønadskonto:o,tekstPart1:v?d:u,tekstPart2:v?u:d,isBluePanel:!0}),e.jsx(O,{valgtStønadskonto:o,tekstPart1:v?d:u,tekstPart2:v?u:d}),e.jsx(b,{barnet:r})]}),F&&e.jsxs(q,{gap:"2",children:[e.jsx(w,{startdato:y,sluttdato:g}),e.jsx(b,{barnet:r})]})]})};W.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const X=(r,n)=>[{fom:r,tom:r,color:p.PINK},{fom:R(r).add(1,"day").format(S),tom:n,color:p.BLUE}],x=(r,n,t,a,o,s)=>{const i=[];return r||i.push({fom:n,tom:R(a).subtract(1,"day").format(S),color:p.BLUE}),i.push({fom:a,tom:a,color:p.PINK}),i.push({fom:R(a).add(1,"day").format(S),tom:t,color:p.BLUE}),o&&s&&i.push({fom:o,tom:s,color:p.GREEN}),i},Y=(r,n,t,a,o)=>[{fom:t,tom:t,color:p.PINK},{fom:r,tom:n,color:p.BLUE},{fom:a,tom:o,color:p.GREEN}],Z=(r,n,t)=>r.type===f.FAR_OG_FAR&&!t&&n!=="ingenHarRett",$=(r,n)=>n==="kunSøker1HarRett"&&r.type===f.FAR_OG_FAR,ee=(r,n)=>n==="kunSøker1HarRett"&&r.type===f.FAR,ye=(r,n,t,a,o)=>{const s=D(a),{startdatoPeriode1:i,sluttdatoPeriode1:m,familiehendelsedato:d,startdatoPeriode2:u,sluttdatoPeriode2:y}=z(s,t,r,n,o),g=B(n),c=u&&y;if(Z(t,s,g)||ee(t,s))return X(d,m);if(s==="beggeHarRett"&&c)return x(g,i,m,d,u,y);if(s==="kunSøker1HarRett"&&I(t))return x(g,i,m,d);if(c&&(s==="kunSøker2HarRett"||$(t,s)||!g))return Y(i,m,d,u,y);throw Error("Ingen perioder finnes")};export{W as C,ye as l};
