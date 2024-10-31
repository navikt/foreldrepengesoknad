import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{u as v,B as b,M as p,d as g,b as f}from"./Label-CXFT65WO.js";import{S as q,c as D,g as G,e as N}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{b as x}from"./barnetUtils-Dtg6gkcN.js";import{h as U,a as K,b as V,u as C}from"./hvemHarRettUtils-BiyQH6Vj.js";import"./index-CTjT7uj6.js";import{c as _}from"./stringUtils-DWuGC-tf.js";import{C as R}from"./CalendarIconLabel-DXHCxJg7.js";import{h as z,f as W}from"./uttakUtils-D2M1HdQ9.js";import{b as H}from"./BarnehageplassSteg-BkH-XQwV.js";import{F as P}from"./FamiliehendelseLabel-CamrjsPy.js";import{V as J,H as S}from"./VStack-DXwxFTIo.js";import{i as u}from"./VeiviserPage-BcsEgJcv.js";const Q="_srOnly_19lbm_1",M={srOnly:Q},A=({utenAktivitetskrav:e=!1,tekstPart1:t,isBluePanel:a=!1,startdato:n,sluttdato:i})=>{const s=v();return r.jsxs(R,{iconType:a?"blue":"green",children:[r.jsxs(b,{children:[" ",r.jsxs(r.Fragment,{children:[e&&r.jsx(p,{id:"OversiktSteg.UtenAktivitetskrav"}),!e&&r.jsx(p,{id:"OversiktSteg.MedAktivitetskrav"})]})]}),r.jsx("div",{className:M.srOnly,children:r.jsx(p,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:_(t),startdato:s.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:s.formatDate(i,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};A.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const h=({søkerTekst:e,startdato:t,sluttdato:a,isBluePanel:n=!1})=>{const i=v(),s=z(t,a);return r.jsxs(R,{iconType:n?"blue":"green",children:[r.jsx(b,{children:r.jsx(p,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:_(e)}})}),r.jsx("div",{className:M.srOnly,children:r.jsx(p,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:_(e),uker:s.uker,dager:s.dager,dato:i.formatDate(a,{day:"2-digit",month:"long",weekday:"long"})}})})]})};h.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const j=({barnet:e})=>{const t=v(),a=H(e);return r.jsx(R,{iconType:"purple",children:r.jsx(b,{children:r.jsx(p,{id:"BarnehageplassLabel.Barnehagestartdato",values:{dato:t.formatDate(a,{day:"2-digit",month:"short"})}})})})};j.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassLabel",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const L=({startdato:e,sluttdato:t})=>{const a=v();return r.jsxs(R,{iconType:"blue",children:[r.jsx(b,{children:r.jsx(p,{id:"OversiktSteg.ForeldrepengerLabel"})}),r.jsx("div",{className:M.srOnly,children:r.jsx(p,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:a.formatDate(e,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:a.formatDate(t,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};L.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const X=({barnet:e,uttaksdata:t,hvemPlanlegger:a,hvemHarRett:n})=>{const i=v(),s=x(e),d=a.type===q.FAR_OG_FAR,l=D(a,i),o=G(a,i),{startdatoPeriode1:c,sluttdatoPeriode1:y,startdatoPeriode2:m,sluttdatoPeriode2:k}=t,O=d&&!s,B=d&&s,E=!O&&(n==="beggeHarRett"||U(n,a)&&!B||K(n,a)),I=!O&&o&&m&&k&&(V(n,a)||n==="kunSøker1HarRett"&&B),T=n==="kunSøker1HarRett"&&B;return r.jsxs(J,{gap:"1",children:[E&&r.jsxs(S,{gap:"2",children:[r.jsx(h,{søkerTekst:l,startdato:c,sluttdato:y,isBluePanel:!0}),o&&n==="beggeHarRett"&&m&&k&&r.jsx(h,{søkerTekst:o,startdato:m,sluttdato:k}),r.jsx(P,{barnet:e}),!s&&r.jsx(j,{barnet:e})]}),I&&r.jsxs(S,{gap:"2",children:[r.jsx(A,{utenAktivitetskrav:!0,tekstPart1:T?l:o,startdato:c,sluttdato:y,isBluePanel:!0}),r.jsx(A,{tekstPart1:T?l:o,startdato:m,sluttdato:k}),r.jsx(P,{barnet:e}),!s&&r.jsx(j,{barnet:e})]}),O&&r.jsxs(S,{gap:"2",children:[r.jsx(L,{startdato:c,sluttdato:y}),r.jsx(P,{barnet:e}),!s&&r.jsx(j,{barnet:e})]})]})};X.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""}}};const Y=(e,t)=>[{fom:e,tom:e,color:u.PINK},{fom:g(e).add(1,"day").format(f),tom:t,color:u.BLUE}],w=(e,t,a,n,i,s)=>{const d=[];return e||d.push({fom:t,tom:g(n).subtract(1,"day").format(f),color:u.BLUE}),d.push({fom:n,tom:n,color:u.PINK}),d.push({fom:g(n).add(1,"day").format(f),tom:a,color:u.BLUE}),i&&s&&d.push({fom:i,tom:s,color:u.LIGHTGREEN}),d},Z=(e,t,a,n,i)=>[{fom:a,tom:a,color:u.PINK},{fom:e,tom:t,color:u.BLUE},{fom:n,tom:i,color:u.LIGHTGREEN}],$=(e,t,a)=>e.type===q.FAR_OG_FAR&&!a&&t!=="ingenHarRett",ee=(e,t)=>t==="kunSøker1HarRett"&&e.type===q.FAR_OG_FAR,re=(e,t)=>t==="kunSøker1HarRett"&&e.type===q.FAR,F=(e,t)=>{if(x(t))return e;const n=H(t),i={fom:n,tom:n,color:u.PURPLE};return e.reduce((l,o)=>g(i.fom).isBetween(o.fom,o.tom,"day","[]")?[...l,{fom:o.fom,tom:g(i.fom).subtract(1,"day").format(f),color:o.color},{fom:g(i.fom).add(1,"day").format(f),tom:o.tom,color:o.color}]:[...l,o],[]).concat(i).sort((l,o)=>g(l.fom).diff(g(o.fom)))},ye=(e,t,a,n,i)=>{const s=C(n),{startdatoPeriode1:d,sluttdatoPeriode1:l,familiehendelsedato:o,startdatoPeriode2:c,sluttdatoPeriode2:y}=W(s,a,e,t,i),m=x(t),k=c&&y;if($(a,s,m)||re(a,s))return F(Y(o,l),t);if(s==="beggeHarRett"&&k)return F(w(m,d,l,o,c,y),t);if(s==="kunSøker1HarRett"&&N(a))return F(w(m,d,l,o),t);if(k&&(s==="kunSøker2HarRett"||ee(a,s)||!m))return F(Z(d,l,o,c,y),t);throw Error("Ingen perioder finnes")};export{X as C,ye as l};
