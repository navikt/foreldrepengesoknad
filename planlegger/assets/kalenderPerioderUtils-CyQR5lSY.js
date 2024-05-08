import{j as n}from"./jsx-runtime-Du8NFWEI.js";import{u as j,F as c}from"./index-e2vXP8VC.js";import{S as q,h,i as U,e as I}from"./HvemPlanleggerUtils-CHTffTZd.js";import{b as B}from"./barnetUtils-Dtg6gkcN.js";import{h as K,a as N,b as x,u as D}from"./hvemHarRettUtils-Dvw973AZ.js";import{a as G,b as C,w as _,f as V}from"./uttakUtils-CrBM_WY2.js";import{I as v}from"./dateUtils-C_C2kvi-.js";import{d as f}from"./dayjs.min-a42Le6oL.js";import"./index-Dl6G-zuu.js";import{C as A}from"./CalendarIconLabel-C9DNWetD.js";import{B as T}from"./Label-DKKZxAV5.js";import{F as z}from"./FamiliehendelseLabel-BTP-zh4d.js";import{V as J,H as w}from"./VStack-C-EA7mzX.js";import{D as o}from"./Calendar-Bhe1saZ-.js";const y=r=>r.charAt(0).toUpperCase()+r.slice(1),Q="_srOnly_19lbm_1",M={srOnly:Q},P=({utenAktivitetskrav:r=!1,tekstPart1:e,tekstPart2:t,startdato:a,sluttdato:s,isBluePanel:i=!1,valgtStønadskonto:u})=>{const d=j();return n.jsxs(A,{iconType:i?"blue":"green",children:[n.jsxs(T,{children:[r&&n.jsx(c,{id:"OversiktSteg.UkerUtenAktivitetskrav",values:{hvem:y(e),uker:G(u),hvemPart2:y(t)}}),!r&&n.jsx(c,{id:"OversiktSteg.UkerMedAktivitetskrav",values:{hvem:y(e),uker:C(u),hvemPart2:y(t)}})]}),n.jsx("div",{className:M.srOnly,children:n.jsx(c,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:y(e),startdato:d.formatDate(a,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:d.formatDate(s,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};P.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},valgtStønadskonto:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    kontoer: Stønadskonto[];
    minsteretter: TilgjengeligeMinsterettskontoer;
}`,signature:{properties:[{key:"kontoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    konto: StønadskontoType;
    dager: number;
}`,signature:{properties:[{key:"konto",value:{name:"StønadskontoType",required:!0}},{key:"dager",value:{name:"number",required:!0}}]}}],raw:"Stønadskonto[]",required:!0}},{key:"minsteretter",value:{name:"signature",type:"object",raw:`{
    [MinsterettType.farRundtFødsel]: number;
    [MinsterettType.toTette]: number;
}`,signature:{properties:[]},required:!0}}]}},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},tekstPart2:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const O=({søkerTekst:r,startdato:e,sluttdato:t,isBluePanel:a=!1})=>{const s=j();return n.jsxs(A,{iconType:a?"blue":"green",children:[n.jsx(T,{children:n.jsx(c,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:y(r),uker:_(e,t),dato:s.formatDate(e,{day:"2-digit",month:"short",weekday:"long"})}})}),n.jsx("div",{className:M.srOnly,children:n.jsx(c,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:y(r),uker:_(e,t),dato:s.formatDate(t,{day:"2-digit",month:"short",weekday:"long"})}})})]})};O.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const H=({startdato:r,sluttdato:e})=>{const t=j();return n.jsxs(A,{iconType:"blue",children:[n.jsx(T,{children:n.jsx(c,{id:"OversiktSteg.ForeldrepengerLabel"})}),n.jsx("div",{className:M.srOnly,children:n.jsx(c,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:t.formatDate(r,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:t.formatDate(e,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};H.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const W=({barnet:r,uttaksdata:e,hvemPlanlegger:t,hvemHarRett:a,valgtStønadskonto:s})=>{const i=j(),u=B(r),d=t.type===q.FAR_OG_FAR,l=h(t,i),m=U(t,i),{startdatoPeriode1:k,sluttdatoPeriode1:p,startdatoPeriode2:g,sluttdatoPeriode2:F}=e,S=d&&!u,R=d&&u,E=!S&&(a==="beggeHarRett"||K(a,t)&&!R||N(a,t)),L=!S&&m&&g&&F&&(x(a,t)||a==="kunSøker1HarRett"&&R),b=a==="kunSøker1HarRett"&&R;return n.jsxs(J,{gap:{sm:"1",md:"2"},children:[E&&n.jsxs(w,{gap:"1",children:[n.jsx(O,{søkerTekst:l,startdato:k,sluttdato:p,isBluePanel:!0}),m&&a==="beggeHarRett"&&g&&F&&n.jsx(O,{søkerTekst:m,startdato:g,sluttdato:F})]}),L&&n.jsxs(n.Fragment,{children:[n.jsx(P,{utenAktivitetskrav:!0,valgtStønadskonto:s,tekstPart1:b?l:m,tekstPart2:b?m:l,startdato:k,sluttdato:p,isBluePanel:!0}),n.jsx(P,{valgtStønadskonto:s,tekstPart1:b?l:m,tekstPart2:b?m:l,startdato:g,sluttdato:F})]}),n.jsxs(w,{gap:"2",children:[S&&n.jsx(H,{startdato:k,sluttdato:p}),n.jsx(z,{barnet:r})]})]})};W.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]},required:!0}}]}},description:""}}};const X=(r,e)=>[{fom:r,tom:r,color:o.PINK},{fom:f(r).add(1,"day").format(v),tom:e,color:o.BLUE}],Y=(r,e,t,a,s,i)=>{const u=[];return r||u.push({fom:e,tom:f(a).subtract(1,"day").format(v),color:o.BLUE}),u.concat({fom:a,tom:a,color:o.PINK},{fom:f(a).add(1,"day").format(v),tom:t,color:o.BLUE},{fom:s,tom:i,color:o.GREEN})},Z=(r,e,t,a)=>{const s=[];return r||s.push({fom:e,tom:f(a).subtract(1,"day").format(v),color:o.BLUE}),s.concat([{fom:a,tom:a,color:o.PINK},{fom:f(a).add(1,"day").format(v),tom:t,color:o.BLUE}])},$=(r,e)=>[{fom:e,tom:e,color:o.PINK},{fom:f(e).add(1,"day").format(v),tom:r,color:o.BLUE}],ee=(r,e)=>[{fom:e,tom:e,color:o.PINK},{fom:f(e).add(1,"day").format(v),tom:r,color:o.BLUE}],re=(r,e,t,a,s)=>[{fom:t,tom:t,color:o.PINK},{fom:r,tom:e,color:o.BLUE},{fom:a,tom:s,color:o.GREEN}],te=(r,e,t)=>r.type===q.FAR_OG_FAR&&!t&&e!=="ingenHarRett",ne=(r,e)=>e==="kunSøker1HarRett"&&r.type===q.FAR_OG_FAR,fe=(r,e,t,a,s)=>{const i=D(a),{startdatoPeriode1:u,sluttdatoPeriode1:d,familiehendelsedato:l,startdatoPeriode2:m,sluttdatoPeriode2:k}=V(i,t,r,e,s),p=B(e),g=m&&k;if(te(t,i,p))return X(l,d);if(i==="beggeHarRett"&&g)return Y(p,u,d,l,m,k);if(i==="kunSøker1HarRett"&&I(t))return Z(p,u,d,l);if(i==="kunSøker1HarRett"&&t.type===q.FAR)return $(d,l);if((i==="kunSøker2HarRett"||ne(t,i)||!p)&&g)return re(u,d,l,m,k);if(x(i,t)&&p)return ee(d,l);throw Error("Ingen perioder finnes")};export{W as C,fe as l};
