import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{u as F,F as m}from"./index-e2vXP8VC.js";import{S as j,h as L,i as U,e as I}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as w}from"./barnetUtils-Dtg6gkcN.js";import{h as D,a as N,b as G,u as K}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as V,b as C,w as z,f as J}from"./uttakUtils-CrBM_WY2.js";import{I as O}from"./dateUtils-C_C2kvi-.js";import{d as A}from"./dayjs.min-a42Le6oL.js";import"./index-Dl6G-zuu.js";import{C as M}from"./CalendarIconLabel-C9DNWetD.js";import{B as _}from"./Label-DKKZxAV5.js";import{F as S}from"./FamiliehendelseLabel-BTP-zh4d.js";import{V as Q,H as R}from"./VStack-C-EA7mzX.js";import{D as p}from"./Calendar-Ch2XM6dt.js";const c=r=>r.charAt(0).toUpperCase()+r.slice(1),W="_srOnly_19lbm_1",x={srOnly:W},P=({utenAktivitetskrav:r=!1,tekstPart1:a,tekstPart2:t,isBluePanel:n=!1,valgtStønadskonto:o,startdato:s,sluttdato:i,visUkerAktivitetskrav:l=!0})=>{const u=F();return e.jsxs(M,{iconType:n?"blue":"green",children:[e.jsx(_,{children:l?e.jsxs(e.Fragment,{children:[r&&e.jsx(m,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:c(a),uker:V(o),hvemPart2:c(t)}}),!r&&e.jsx(m,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:c(a),uker:C(o),hvemPart2:c(t)}})]}):e.jsxs(e.Fragment,{children:[r&&e.jsx(m,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(m,{id:"OversiktSteg.MedAktivitetskrav"})]})}),e.jsx("div",{className:x.srOnly,children:e.jsx(m,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:c(a),startdato:u.formatDate(s,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:u.formatDate(i,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};P.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},visUkerAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const T=({søkerTekst:r,startdato:a,sluttdato:t,isBluePanel:n=!1})=>{const o=F();return e.jsxs(M,{iconType:n?"blue":"green",children:[e.jsx(_,{children:e.jsx(m,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:c(r)}})}),e.jsx("div",{className:x.srOnly,children:e.jsx(m,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:c(r),uker:z(a,t),dato:o.formatDate(t,{day:"2-digit",month:"long",weekday:"long"})}})})]})};T.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const B=({startdato:r,sluttdato:a})=>{const t=F();return e.jsxs(M,{iconType:"blue",children:[e.jsx(_,{children:e.jsx(m,{id:"OversiktSteg.ForeldrepengerLabel"})}),e.jsx("div",{className:x.srOnly,children:e.jsx(m,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:t.formatDate(r,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:t.formatDate(a,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};B.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const X=({barnet:r,uttaksdata:a,hvemPlanlegger:t,hvemHarRett:n,valgtStønadskonto:o})=>{const s=F(),i=w(r),l=t.type===j.FAR_OG_FAR,u=L(t,s),d=U(t,s),{startdatoPeriode1:k,sluttdatoPeriode1:g,startdatoPeriode2:y,sluttdatoPeriode2:v}=a,b=l&&!i,q=l&&i,H=!b&&(n==="beggeHarRett"||D(n,t)&&!q||N(n,t)),E=!b&&d&&y&&v&&(G(n,t)||n==="kunSøker1HarRett"&&q),f=n==="kunSøker1HarRett"&&q;return e.jsxs(Q,{gap:"1",children:[H&&e.jsxs(R,{gap:"2",children:[e.jsx(T,{søkerTekst:u,startdato:k,sluttdato:g,isBluePanel:!0}),d&&n==="beggeHarRett"&&y&&v&&e.jsx(T,{søkerTekst:d,startdato:y,sluttdato:v}),e.jsx(S,{barnet:r})]}),E&&e.jsxs(R,{gap:"2",children:[e.jsx(P,{utenAktivitetskrav:!0,valgtStønadskonto:o,tekstPart1:f?u:d,tekstPart2:f?d:u,startdato:k,sluttdato:g,isBluePanel:!0}),e.jsx(P,{valgtStønadskonto:o,tekstPart1:f?u:d,tekstPart2:f?d:u,startdato:y,sluttdato:v}),e.jsx(S,{barnet:r})]}),b&&e.jsxs(R,{gap:"2",children:[e.jsx(B,{startdato:k,sluttdato:g}),e.jsx(S,{barnet:r})]})]})};X.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const Y=(r,a)=>[{fom:r,tom:r,color:p.PINK},{fom:A(r).add(1,"day").format(O),tom:a,color:p.BLUE}],h=(r,a,t,n,o,s)=>{const i=[];return r||i.push({fom:a,tom:A(n).subtract(1,"day").format(O),color:p.BLUE}),i.push({fom:n,tom:n,color:p.PINK}),i.push({fom:A(n).add(1,"day").format(O),tom:t,color:p.BLUE}),o&&s&&i.push({fom:o,tom:s,color:p.GREEN}),i},Z=(r,a,t,n,o)=>[{fom:t,tom:t,color:p.PINK},{fom:r,tom:a,color:p.BLUE},{fom:n,tom:o,color:p.GREEN}],$=(r,a,t)=>r.type===j.FAR_OG_FAR&&!t&&a!=="ingenHarRett",ee=(r,a)=>a==="kunSøker1HarRett"&&r.type===j.FAR_OG_FAR,re=(r,a)=>a==="kunSøker1HarRett"&&r.type===j.FAR,ce=(r,a,t,n,o)=>{const s=K(n),{startdatoPeriode1:i,sluttdatoPeriode1:l,familiehendelsedato:u,startdatoPeriode2:d,sluttdatoPeriode2:k}=J(s,t,r,a,o),g=w(a),y=d&&k;if($(t,s,g)||re(t,s))return Y(u,l);if(s==="beggeHarRett"&&y)return h(g,i,l,u,d,k);if(s==="kunSøker1HarRett"&&I(t))return h(g,i,l,u);if(y&&(s==="kunSøker2HarRett"||ee(t,s)||!g))return Z(i,l,u,d,k);throw Error("Ingen perioder finnes")};export{X as C,ce as l};
