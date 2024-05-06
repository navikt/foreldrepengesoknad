import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{a as L}from"./chunk-MZXVCX43-DWuJqIWT.js";import{u as z,a as J,n as y,b as S,C as F,M as H,P as V}from"./usePlanleggerNavigator-Bv5BjPTg.js";import{P as W}from"./routes-DI-Woyga.js";import{b as A,S as f}from"./HvemPlanleggerUtils-CHTffTZd.js";import{i as Q}from"./Arbeidssituasjon-Bw9oRg1d.js";import{P as X}from"./PlanleggerStepPage-CgQnGAng.js";import{F as t}from"./index-e2vXP8VC.js";import{u as Z}from"./useScrollBehaviour-BhOrFi8k.js";import{S as $}from"./calendarLabel.module-Bk8mFlZK.js";import"./index-Dl6G-zuu.js";import{D as c}from"./dateUtils-C_C2kvi-.js";import{d as o}from"./dayjs.min-a42Le6oL.js";import"./amplitude.esm-JOtNIP3j.js";import{I as h}from"./Infobox-DBiJWQmR.js";import{e as k,a as x,b as Y}from"./barnetUtils-Dtg6gkcN.js";import{L as B,l as v}from"./links-BAR-PZvy.js";import{V as i}from"./VStack-C-EA7mzX.js";import{a as d,H as ee}from"./Label-DKKZxAV5.js";import{B as w}from"./BabyWrapped-BX-BmTrK.js";import{I as C}from"./Information-DAbMiAfI.js";import"./v4-D8aEg3BZ.js";import"./GreenHeading-DE0ffLfD.js";import"./Box-DoqHmnCA.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./PlanleggerPage-D5WS1JMY.js";import"./Button-BJE2r0D8.js";import"./useId-zmAp5ghi.js";import"./useId-BnKOV0D5.js";import"./index-BfyspvgH.js";import"./ChevronDown-CY3RuW24.js";import"./isoWeek-tto3dG8J.js";import"./IconCircleWrapper-x91Dcw7p.js";const G=r=>{const n=k(r),l=x(r),s=Y(r);if(n||l||s){const a=s||n?r.fødselsdato:r.termindato;if(o(a).month()<8)return o(a).month(7).add(1,"year").format("MMMM YYYY");if(o(a).month()>=8&&o(a).month()<11)return o(a).add(1,"year").format("MMMM YYYY");if(o(a).month()===11)return o(a).startOf("year").add(2,"year").add(7,"months").format("MMMM YYYY")}},N=({barnet:r})=>{const n=k(r),l=x(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(t,{id:"AleneforsørgerBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(t,{id:"AleneforsørgerBarnehageplass.DatoTittel",values:{dato:G(r)}}),icon:e.jsx(w,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[n&&e.jsx(t,{id:"AleneforsørgerBarnehageplass.DatoTekst",values:{a:s=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:s}),dato:o(r.fødselsdato).format(c)}}),l&&e.jsx(t,{id:"AleneforsørgerBarnehageplass.DatoTekstTermin",values:{a:s=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:s}),dato:o(r.termindato).format(c)}})]})}),e.jsx(h,{header:e.jsx(t,{id:"AleneforsørgerBarnehageplass.BarnehageTittel"}),icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(d,{children:e.jsx(t,{id:"AleneforsørgerBarnehageplass.BarnehageTekst"})})})]})};N.__docgenInfo={description:"",methods:[],displayName:"AleneforsørgerBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const K=({barnet:r})=>{const n=k(r),l=x(r),s=Y(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(t,{id:"FlereForsørgereBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(t,{id:"FlereForsørgereBarnehageplass.DatoTittel",values:{dato:G(r)}}),icon:e.jsx(w,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[(n||s)&&e.jsx(t,{id:"FlereForsørgereBarnehageplass.DatoTekst",values:{a:a=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),dato:o(r.fødselsdato).format(c)}}),l&&e.jsx(t,{id:"FlereForsørgereBarnehageplass.DatoTekstTermin",values:{a:a=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),dato:o(r.termindato).format(c)}})]})}),e.jsx(h,{header:e.jsx(t,{id:"FlereForsørgereBarnehageplass.BarnehageTittel"}),icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(d,{children:e.jsx(t,{id:"FlereForsørgereBarnehageplass.BarnehageTekst"})})})]})};K.__docgenInfo={description:"",methods:[],displayName:"FlereForsørgereBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const j=({locale:r})=>{const n=z(r),l=J();Z();const s=y(S(F.OM_BARNET)),a=y(S(F.HVEM_PLANLEGGER));return e.jsx(X,{steps:l,children:e.jsxs(i,{gap:"10",children:[e.jsx(ee,{size:"large",children:e.jsx(t,{id:"BarnehageplassSteg.Tittel"})}),e.jsxs(i,{gap:"10",children:[!A(a)&&e.jsx(K,{barnet:s}),A(a)&&e.jsx(N,{barnet:s})]}),e.jsx(i,{gap:"20",children:e.jsx(i,{children:e.jsx($,{nextButtonOnClick:n.goToNextDefaultStep,goToPreviousStep:n.goToPreviousDefaultStep,useSimplifiedTexts:!0})})})]})})};j.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassSteg"};const re=({hvemPlanlegger:r,omBarnet:n,gåTilNesteSide:l=L("button-click")})=>(Q(),e.jsx(H,{initialEntries:[W.ARBEIDSSITUASJON],children:e.jsx(V,{initialState:{[F.HVEM_PLANLEGGER]:r,[F.OM_BARNET]:n},onDispatch:l,children:e.jsx(j,{locale:"nb"})})})),Ie={title:"steg/BarnehageplassSteg",component:j,render:re},m={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},u={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},g={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:f.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"1"}}},p={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"}}};var b,M,P;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(P=(M=m.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var T,E,_;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(_=(E=u.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var q,D,R;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(R=(D=g.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var O,I,U;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(U=(I=p.parameters)==null?void 0:I.docs)==null?void 0:U.source}}};const Ue=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartAugust"];export{g as AleneforsørgerBarnFødtJanuarStartAugust,p as FlereForsørgereAdoptertBarnFødtJanuarStartAugust,u as FlereForsørgereBarnFødtSeptemberStartSeptember,m as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,Ue as __namedExportsOrder,Ie as default};
