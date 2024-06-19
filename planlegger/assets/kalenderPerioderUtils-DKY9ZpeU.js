import{j as e,V as E,H as S}from"./VStack-WHXoK350.js";import{u as F,B as M,M as p,d as O,I as P}from"./Label-fr1ceDiJ.js";import{S as j,c as U,d as I,e as G}from"./HvemPlanleggerUtils-B2i4COBs.js";import{b as w}from"./barnetUtils-Dtg6gkcN.js";import{h as N,a as K,b as D,u as V}from"./hvemHarRettUtils-BQIASNgG.js";import{a as C,b as z,w as J,f as Q}from"./uttakUtils-Bwre5uei.js";import"./index-DVXBtNgz.js";import{C as _}from"./CalendarIconLabel-DdIu2HNU.js";import{F as R}from"./FamiliehendelseLabel-DTN_qf_m.js";import{h as m}from"./Infobox-qElkb4kf.js";const c=r=>r.charAt(0).toUpperCase()+r.slice(1),W="_srOnly_19lbm_1",x={srOnly:W},A=({utenAktivitetskrav:r=!1,tekstPart1:a,tekstPart2:t,isBluePanel:n=!1,valgtStønadskonto:o,startdato:s,sluttdato:i,visUkerAktivitetskrav:l=!0})=>{const u=F();return e.jsxs(_,{iconType:n?"blue":"green",children:[e.jsx(M,{children:l?e.jsxs(e.Fragment,{children:[r&&e.jsx(p,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:c(a),uker:C(o),hvemPart2:c(t)}}),!r&&e.jsx(p,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:c(a),uker:z(o),hvemPart2:c(t)}})]}):e.jsxs(e.Fragment,{children:[r&&e.jsx(p,{id:"OversiktSteg.UtenAktivitetskrav"}),!r&&e.jsx(p,{id:"OversiktSteg.MedAktivitetskrav"})]})}),e.jsx("div",{className:x.srOnly,children:e.jsx(p,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:c(a),startdato:u.formatDate(s,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:u.formatDate(i,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};A.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},visUkerAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const T=({søkerTekst:r,startdato:a,sluttdato:t,isBluePanel:n=!1})=>{const o=F();return e.jsxs(_,{iconType:n?"blue":"green",children:[e.jsx(M,{children:e.jsx(p,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:c(r)}})}),e.jsx("div",{className:x.srOnly,children:e.jsx(p,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:c(r),uker:J(a,t),dato:o.formatDate(t,{day:"2-digit",month:"long",weekday:"long"})}})})]})};T.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const B=({startdato:r,sluttdato:a})=>{const t=F();return e.jsxs(_,{iconType:"blue",children:[e.jsx(M,{children:e.jsx(p,{id:"OversiktSteg.ForeldrepengerLabel"})}),e.jsx("div",{className:x.srOnly,children:e.jsx(p,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:t.formatDate(r,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:t.formatDate(a,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};B.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const X=({barnet:r,uttaksdata:a,hvemPlanlegger:t,hvemHarRett:n,valgtStønadskonto:o})=>{const s=F(),i=w(r),l=t.type===j.FAR_OG_FAR,u=U(t,s),d=I(t,s),{startdatoPeriode1:k,sluttdatoPeriode1:g,startdatoPeriode2:y,sluttdatoPeriode2:v}=a,b=l&&!i,q=l&&i,H=!b&&(n==="beggeHarRett"||N(n,t)&&!q||K(n,t)),L=!b&&d&&y&&v&&(D(n,t)||n==="kunSøker1HarRett"&&q),f=n==="kunSøker1HarRett"&&q;return e.jsxs(E,{gap:"1",children:[H&&e.jsxs(S,{gap:"2",children:[e.jsx(T,{søkerTekst:u,startdato:k,sluttdato:g,isBluePanel:!0}),d&&n==="beggeHarRett"&&y&&v&&e.jsx(T,{søkerTekst:d,startdato:y,sluttdato:v}),e.jsx(R,{barnet:r})]}),L&&e.jsxs(S,{gap:"2",children:[e.jsx(A,{utenAktivitetskrav:!0,valgtStønadskonto:o,tekstPart1:f?u:d,tekstPart2:f?d:u,startdato:k,sluttdato:g,isBluePanel:!0}),e.jsx(A,{valgtStønadskonto:o,tekstPart1:f?u:d,tekstPart2:f?d:u,startdato:y,sluttdato:v}),e.jsx(R,{barnet:r})]}),b&&e.jsxs(S,{gap:"2",children:[e.jsx(B,{startdato:k,sluttdato:g}),e.jsx(R,{barnet:r})]})]})};X.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const Y=(r,a)=>[{fom:r,tom:r,color:m.PINK},{fom:O(r).add(1,"day").format(P),tom:a,color:m.BLUE}],h=(r,a,t,n,o,s)=>{const i=[];return r||i.push({fom:a,tom:O(n).subtract(1,"day").format(P),color:m.BLUE}),i.push({fom:n,tom:n,color:m.PINK}),i.push({fom:O(n).add(1,"day").format(P),tom:t,color:m.BLUE}),o&&s&&i.push({fom:o,tom:s,color:m.LIGHTGREEN}),i},Z=(r,a,t,n,o)=>[{fom:t,tom:t,color:m.PINK},{fom:r,tom:a,color:m.BLUE},{fom:n,tom:o,color:m.LIGHTGREEN}],$=(r,a,t)=>r.type===j.FAR_OG_FAR&&!t&&a!=="ingenHarRett",ee=(r,a)=>a==="kunSøker1HarRett"&&r.type===j.FAR_OG_FAR,re=(r,a)=>a==="kunSøker1HarRett"&&r.type===j.FAR,me=(r,a,t,n,o)=>{const s=V(n),{startdatoPeriode1:i,sluttdatoPeriode1:l,familiehendelsedato:u,startdatoPeriode2:d,sluttdatoPeriode2:k}=Q(s,t,r,a,o),g=w(a),y=d&&k;if($(t,s,g)||re(t,s))return Y(u,l);if(s==="beggeHarRett"&&y)return h(g,i,l,u,d,k);if(s==="kunSøker1HarRett"&&G(t))return h(g,i,l,u);if(y&&(s==="kunSøker2HarRett"||ee(t,s)||!g))return Z(i,l,u,d,k);throw Error("Ingen perioder finnes")};export{X as C,me as l};
