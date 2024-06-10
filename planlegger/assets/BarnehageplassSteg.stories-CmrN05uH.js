import{j as e}from"./jsx-runtime-_e34SzbC.js";import{a as L}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{u as z,a as J,n as y,b as S,C as F,M as H,P as V}from"./usePlanleggerNavigator-Cc6QDZDj.js";import{P as W}from"./routes-Cp-2uEwO.js";import{b as A,S as f}from"./HvemPlanleggerUtils-CHTffTZd.js";import{i as Q}from"./Arbeidssituasjon-rAW6RSqH.js";import{P as X}from"./PlanleggerStepPage-CG-Vt2ZG.js";import{M as a}from"./index-Bomzi5Jd.js";import{S as Z}from"./infobox.module-COlA9bH3.js";import"./index-DVXBtNgz.js";import{D as c}from"./dateUtils--_TJ2jyJ.js";import{d as s}from"./dayjs.min-Dkhc0ShP.js";import"./amplitude.esm-BThBy0fb.js";import{u as $}from"./useScrollBehaviour-WVMBWXos.js";import{I as h}from"./Infobox-4DkbJ68c.js";import{e as k,a as x,b as w}from"./barnetUtils-Dtg6gkcN.js";import{L as B,l as v}from"./links-B0sJFGJm.js";import{V as i}from"./VStack-DzX3uTsq.js";import{a as d,H as ee}from"./Label-DFEFJLqZ.js";import{S as C}from"./BabyWrapped-Dn1_Bla9.js";import{S as G}from"./Information-DnqWs4L0.js";import"./v4-CQkTLCs1.js";import"./GreenHeading-B5QLwpFd.js";import"./Box-DGewKQma.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./PlanleggerPage-BF_Tk5Tl.js";import"./tslib.es6-pJfR_DrR.js";import"./Button-DG980N3E.js";import"./useId-BuMKUBu9.js";import"./useId-DbilmxAP.js";import"./index-Dcs0RV0A.js";import"./ChevronDown-CcwFV5Ek.js";import"./isoWeek-BYZtqGCG.js";import"./IconCircleWrapper-C8foAhsL.js";const I=r=>{const o=k(r),l=x(r),t=w(r);if(o||l||t){const n=t||o?r.fødselsdato:r.termindato;if(s(n).month()<8)return s(n).month(7).add(1,"year").format("MMMM YYYY");if(s(n).month()>=8&&s(n).month()<11)return s(n).add(1,"year").format("MMMM YYYY");if(s(n).month()===11)return s(n).startOf("year").add(2,"year").add(7,"months").format("MMMM YYYY")}},N=({barnet:r})=>{const o=k(r),l=x(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(a,{id:"AleneforsørgerBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(a,{id:"AleneforsørgerBarnehageplass.DatoTittel",values:{dato:I(r)}}),icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[o&&e.jsx(a,{id:"AleneforsørgerBarnehageplass.DatoTekst",values:{a:t=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:t}),dato:s(r.fødselsdato).format(c)}}),l&&e.jsx(a,{id:"AleneforsørgerBarnehageplass.DatoTekstTermin",values:{a:t=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:t}),dato:s(r.termindato).format(c)}})]})}),e.jsx(h,{header:e.jsx(a,{id:"AleneforsørgerBarnehageplass.BarnehageTittel"}),icon:e.jsx(G,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(d,{children:e.jsx(a,{id:"AleneforsørgerBarnehageplass.BarnehageTekst"})})})]})};N.__docgenInfo={description:"",methods:[],displayName:"AleneforsørgerBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const K=({barnet:r})=>{const o=k(r),l=x(r),t=w(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(a,{id:"FlereForsørgereBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(a,{id:"FlereForsørgereBarnehageplass.DatoTittel",values:{dato:I(r)}}),icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[(o||t)&&e.jsx(a,{id:"FlereForsørgereBarnehageplass.DatoTekst",values:{a:n=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:n}),dato:s(r.fødselsdato).format(c)}}),l&&e.jsx(a,{id:"FlereForsørgereBarnehageplass.DatoTekstTermin",values:{a:n=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:n}),dato:s(r.termindato).format(c)}})]})}),e.jsx(h,{header:e.jsx(a,{id:"FlereForsørgereBarnehageplass.BarnehageTittel"}),icon:e.jsx(G,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),isGray:!0,children:e.jsx(d,{children:e.jsx(a,{id:"FlereForsørgereBarnehageplass.BarnehageTekst"})})})]})};K.__docgenInfo={description:"",methods:[],displayName:"FlereForsørgereBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const j=()=>{const r=z(),o=J();$();const l=y(S(F.OM_BARNET)),t=y(S(F.HVEM_PLANLEGGER));return e.jsx(X,{steps:o,children:e.jsxs(i,{gap:"10",children:[e.jsx(ee,{size:"large",children:e.jsx(a,{id:"BarnehageplassSteg.Tittel"})}),e.jsxs(i,{gap:"10",children:[!A(t)&&e.jsx(K,{barnet:l}),A(t)&&e.jsx(N,{barnet:l})]}),e.jsx(i,{gap:"20",children:e.jsx(i,{children:e.jsx(Z,{nextButtonOnClick:r.goToNextDefaultStep,goToPreviousStep:r.goToPreviousDefaultStep,useSimplifiedTexts:!0})})})]})})};j.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassSteg"};const re=({hvemPlanlegger:r,omBarnet:o,gåTilNesteSide:l=L("button-click")})=>(Q(),e.jsx(H,{initialEntries:[W.ARBEIDSSITUASJON],children:e.jsx(V,{initialState:{[F.HVEM_PLANLEGGER]:r,[F.OM_BARNET]:o},onDispatch:l,children:e.jsx(j,{})})})),Ye={title:"steg/BarnehageplassSteg",component:j,render:re},m={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},u={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},g={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:f.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"1"}}},p={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"}}};var M,b,P;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(P=(b=m.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var T,E,_;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(R=(D=g.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var O,U,Y;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(Y=(U=p.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};const we=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartAugust"];export{g as AleneforsørgerBarnFødtJanuarStartAugust,p as FlereForsørgereAdoptertBarnFødtJanuarStartAugust,u as FlereForsørgereBarnFødtSeptemberStartSeptember,m as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,we as __namedExportsOrder,Ye as default};
