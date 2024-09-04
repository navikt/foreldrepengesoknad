import{j as r,V as L,H as j}from"./VStack-Bypcsavb.js";import{u as y,B as _,M as c,d as O,I as q}from"./Label-DrVT6kL1.js";import{S as v,c as E,g as I,e as G}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{b as H}from"./barnetUtils-Dtg6gkcN.js";import{h as U,a as N,b as D,u as K}from"./hvemHarRettUtils-HGT9ntnp.js";import"./index-CTjT7uj6.js";import{C as A}from"./CalendarIconLabel-Dcpp4ieL.js";import{e as C,f as V}from"./uttakUtils-BrvxP9lU.js";import{F as R}from"./FamiliehendelseLabel-Cq-Hyj2B.js";import{i as l}from"./Infobox-DOCbJzrs.js";const b=e=>e.charAt(0).toUpperCase()+e.slice(1),z="_srOnly_19lbm_1",M={srOnly:z},S=({utenAktivitetskrav:e=!1,tekstPart1:a,isBluePanel:t=!1,startdato:n,sluttdato:o})=>{const s=y();return r.jsxs(A,{iconType:t?"blue":"green",children:[r.jsxs(_,{children:[" ",r.jsxs(r.Fragment,{children:[e&&r.jsx(c,{id:"OversiktSteg.UtenAktivitetskrav"}),!e&&r.jsx(c,{id:"OversiktSteg.MedAktivitetskrav"})]})]}),r.jsx("div",{className:M.srOnly,children:r.jsx(c,{id:"OversiktSteg.PeriodeSrOnly",values:{hvem:b(a),startdato:s.formatDate(n,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:s.formatDate(o,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};S.__docgenInfo={description:"",methods:[],displayName:"AktivitetskravLabel",props:{utenAktivitetskrav:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},tekstPart1:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const P=({søkerTekst:e,startdato:a,sluttdato:t,isBluePanel:n=!1})=>{const o=y(),s=C(a,t);return r.jsxs(A,{iconType:n?"blue":"green",children:[r.jsx(_,{children:r.jsx(c,{id:"OversiktSteg.UkerForeldrepenger",values:{hvem:b(e)}})}),r.jsx("div",{className:M.srOnly,children:r.jsx(c,{id:"OversiktSteg.UkerForeldrepengerSlutter",values:{hvem:b(e),uker:s.uker,dager:s.dager,dato:o.formatDate(t,{day:"2-digit",month:"long",weekday:"long"})}})})]})};P.__docgenInfo={description:"",methods:[],displayName:"AntallUkerFpLabel",props:{søkerTekst:{required:!0,tsType:{name:"string"},description:""},startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""},isBluePanel:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const T=({startdato:e,sluttdato:a})=>{const t=y();return r.jsxs(A,{iconType:"blue",children:[r.jsx(_,{children:r.jsx(c,{id:"OversiktSteg.ForeldrepengerLabel"})}),r.jsx("div",{className:M.srOnly,children:r.jsx(c,{id:"OversiktSteg.ForeldrepengerSrOnly",values:{startdato:t.formatDate(e,{day:"2-digit",month:"long",weekday:"long",year:"numeric"}),sluttdato:t.formatDate(a,{day:"2-digit",month:"long",weekday:"long",year:"numeric"})}})})]})};T.__docgenInfo={description:"",methods:[],displayName:"ForeldrepengerLabel",props:{startdato:{required:!0,tsType:{name:"string"},description:""},sluttdato:{required:!0,tsType:{name:"string"},description:""}}};const W=({barnet:e,uttaksdata:a,hvemPlanlegger:t,hvemHarRett:n})=>{const o=y(),s=H(e),i=t.type===v.FAR_OG_FAR,m=E(t,o),d=I(t,o),{startdatoPeriode1:p,sluttdatoPeriode1:g,startdatoPeriode2:u,sluttdatoPeriode2:k}=a,f=i&&!s,F=i&&s,h=!f&&(n==="beggeHarRett"||U(n,t)&&!F||N(n,t)),w=!f&&d&&u&&k&&(D(n,t)||n==="kunSøker1HarRett"&&F),x=n==="kunSøker1HarRett"&&F;return r.jsxs(L,{gap:"1",children:[h&&r.jsxs(j,{gap:"2",children:[r.jsx(P,{søkerTekst:m,startdato:p,sluttdato:g,isBluePanel:!0}),d&&n==="beggeHarRett"&&u&&k&&r.jsx(P,{søkerTekst:d,startdato:u,sluttdato:k}),r.jsx(R,{barnet:e})]}),w&&r.jsxs(j,{gap:"2",children:[r.jsx(S,{utenAktivitetskrav:!0,tekstPart1:x?m:d,startdato:p,sluttdato:g,isBluePanel:!0}),r.jsx(S,{tekstPart1:x?m:d,startdato:u,sluttdato:k}),r.jsx(R,{barnet:e})]}),f&&r.jsxs(j,{gap:"2",children:[r.jsx(T,{startdato:p,sluttdato:g}),r.jsx(R,{barnet:e})]})]})};W.__docgenInfo={description:"",methods:[],displayName:"CalendarLabels",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"type",value:{name:"Situasjon.FAR",required:!0}},{key:"navnPåFar",value:{name:"string",required:!1}}]}}]},description:""},hvemHarRett:{required:!0,tsType:{name:"union",raw:"'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett'",elements:[{name:"literal",value:"'beggeHarRett'"},{name:"literal",value:"'kunSøker1HarRett'"},{name:"literal",value:"'kunSøker2HarRett'"},{name:"literal",value:"'ingenHarRett'"}]},description:""}}};const J=(e,a)=>[{fom:e,tom:e,color:l.PINK},{fom:O(e).add(1,"day").format(q),tom:a,color:l.BLUE}],B=(e,a,t,n,o,s)=>{const i=[];return e||i.push({fom:a,tom:O(n).subtract(1,"day").format(q),color:l.BLUE}),i.push({fom:n,tom:n,color:l.PINK}),i.push({fom:O(n).add(1,"day").format(q),tom:t,color:l.BLUE}),o&&s&&i.push({fom:o,tom:s,color:l.LIGHTGREEN}),i},Q=(e,a,t,n,o)=>[{fom:t,tom:t,color:l.PINK},{fom:e,tom:a,color:l.BLUE},{fom:n,tom:o,color:l.LIGHTGREEN}],X=(e,a,t)=>e.type===v.FAR_OG_FAR&&!t&&a!=="ingenHarRett",Y=(e,a)=>a==="kunSøker1HarRett"&&e.type===v.FAR_OG_FAR,Z=(e,a)=>a==="kunSøker1HarRett"&&e.type===v.FAR,ue=(e,a,t,n,o)=>{const s=K(n),{startdatoPeriode1:i,sluttdatoPeriode1:m,familiehendelsedato:d,startdatoPeriode2:p,sluttdatoPeriode2:g}=V(s,t,e,a,o),u=H(a),k=p&&g;if(X(t,s,u)||Z(t,s))return J(d,m);if(s==="beggeHarRett"&&k)return B(u,i,m,d,p,g);if(s==="kunSøker1HarRett"&&G(t))return B(u,i,m,d);if(k&&(s==="kunSøker2HarRett"||Y(t,s)||!u))return Q(i,m,d,p,g);throw Error("Ingen perioder finnes")};export{W as C,ue as l};
