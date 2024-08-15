import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{a as L}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{u as z,a as J,b as y,C as c,M as H,P as V}from"./usePlanleggerNavigator-Dxj9XEcs.js";import{P as W}from"./routes-Cp-2uEwO.js";import{b as S,S as f}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{i as Q}from"./Arbeidssituasjon-iffByo3T.js";import{P as X}from"./PlanleggerStepPage-D4oNrs4o.js";import{e as d,M as a,d as s,f as F,H as Z}from"./Label-cZWDpmVx.js";import{d as h,L as B,l as v,S as $}from"./Infobox-CF3er5gd.js";import"./index-CTjT7uj6.js";import{u as ee}from"./useScrollBehaviour-CS4WEBxz.js";import{n as A}from"./validation-4HO0J-zV.js";import{e as x,a as k,b as w}from"./barnetUtils-Dtg6gkcN.js";import{V as i}from"./VStack-BTp1Z9Zd.js";import{S as C}from"./BabyWrapped-BL47-253.js";import{S as N}from"./Information-RqxmfIOz.js";import"./v4-CQkTLCs1.js";import"./tslib.es6-CMwweBXX.js";import"./index-BRV0Se7Z.js";const I=r=>{const o=x(r),l=k(r),t=w(r);if(o||l||t){const n=t||o?r.fødselsdato:r.termindato;if(s(n).month()<8)return s(n).month(7).add(1,"year").format("MMMM YYYY");if(s(n).month()>=8&&s(n).month()<11)return s(n).add(1,"year").format("MMMM YYYY");if(s(n).month()===11)return s(n).startOf("year").add(2,"year").add(7,"months").format("MMMM YYYY")}},G=({barnet:r})=>{const o=x(r),l=k(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(a,{id:"AleneforsørgerBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(a,{id:"AleneforsørgerBarnehageplass.DatoTittel",values:{dato:I(r)}}),color:"green",icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[o&&e.jsx(a,{id:"AleneforsørgerBarnehageplass.DatoTekst",values:{a:t=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:t}),dato:s(r.fødselsdato).format(F)}}),l&&e.jsx(a,{id:"AleneforsørgerBarnehageplass.DatoTekstTermin",values:{a:t=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:t}),dato:s(r.termindato).format(F)}})]})}),e.jsx(h,{header:e.jsx(a,{id:"AleneforsørgerBarnehageplass.BarnehageTittel"}),icon:e.jsx(N,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(d,{children:e.jsx(a,{id:"AleneforsørgerBarnehageplass.BarnehageTekst"})})})]})};G.__docgenInfo={description:"",methods:[],displayName:"AleneforsørgerBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const K=({barnet:r})=>{const o=x(r),l=k(r),t=w(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(a,{id:"FlereForsørgereBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(a,{id:"FlereForsørgereBarnehageplass.DatoTittel",values:{dato:I(r)}}),color:"green",icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[(o||t)&&e.jsx(a,{id:"FlereForsørgereBarnehageplass.DatoTekst",values:{a:n=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:n}),dato:s(r.fødselsdato).format(F)}}),l&&e.jsx(a,{id:"FlereForsørgereBarnehageplass.DatoTekstTermin",values:{a:n=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:n}),dato:s(r.termindato).format(F)}})]})}),e.jsx(h,{header:e.jsx(a,{id:"FlereForsørgereBarnehageplass.BarnehageTittel"}),icon:e.jsx(N,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(d,{children:e.jsx(a,{id:"FlereForsørgereBarnehageplass.BarnehageTekst"})})})]})};K.__docgenInfo={description:"",methods:[],displayName:"FlereForsørgereBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const j=()=>{const r=z(),o=J();ee();const l=A(y(c.OM_BARNET)),t=A(y(c.HVEM_PLANLEGGER));return e.jsx(X,{steps:o,goToStep:r.goToNextStep,children:e.jsxs(i,{gap:"10",children:[e.jsx(Z,{size:"large",children:e.jsx(a,{id:"BarnehageplassSteg.Tittel"})}),e.jsxs(i,{gap:"10",children:[!S(t)&&e.jsx(K,{barnet:l}),S(t)&&e.jsx(G,{barnet:l})]}),e.jsx(i,{gap:"20",children:e.jsx(i,{children:e.jsx($,{nextButtonOnClick:r.goToNextDefaultStep,goToPreviousStep:r.goToPreviousDefaultStep,useSimplifiedTexts:!0})})})]})})};j.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassSteg"};const re=({hvemPlanlegger:r,omBarnet:o,gåTilNesteSide:l=L("button-click")})=>(Q(),e.jsx(H,{initialEntries:[W.ARBEIDSSITUASJON],children:e.jsx(V,{initialState:{[c.HVEM_PLANLEGGER]:r,[c.OM_BARNET]:o},onDispatch:l,children:e.jsx(j,{})})})),ke={title:"steg/BarnehageplassSteg",component:j,render:re},u={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},g={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},m={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:f.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"1"}}},p={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"}}};var M,b,T;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-12-01',
      antallBarn: '1'
    }
  }
}`,...(T=(b=u.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var P,E,_;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      erFødsel: true,
      fødselsdato: '2024-09-01',
      termindato: '2024-09-03',
      antallBarn: '1'
    }
  }
}`,...(_=(E=g.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var q,D,R;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    omBarnet: {
      erBarnetFødt: true,
      erFødsel: true,
      fødselsdato: '2024-01-01',
      termindato: '2023-08-01',
      antallBarn: '1'
    }
  }
}`,...(R=(D=m.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var O,U,Y;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      antallBarn: '1',
      erFødsel: false,
      erBarnetFødt: true,
      fødselsdato: '2026-01-11',
      overtakelsesdato: '2026-03-01'
    }
  }
}`,...(Y=(U=p.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};const je=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartAugust"];export{m as AleneforsørgerBarnFødtJanuarStartAugust,p as FlereForsørgereAdoptertBarnFødtJanuarStartAugust,g as FlereForsørgereBarnFødtSeptemberStartSeptember,u as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,je as __namedExportsOrder,ke as default};
