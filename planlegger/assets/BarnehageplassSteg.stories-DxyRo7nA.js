import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{a as L}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{u as z,a as J,b as y,C as c,M as H,P as V}from"./usePlanleggerNavigator-BxLWF0Om.js";import{P as W}from"./routes-Cp-2uEwO.js";import{b as S,S as f}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{i as Q}from"./amplitude-Bv8r3B70.js";import{P as X}from"./PlanleggerStepPage-6lWWXmw2.js";import{c as d,M as t,d as o,e as F,H as Z}from"./Label-Cpj7GWrI.js";import{d as h,L as B,l as v,S as $}from"./VeiviserPage-h3YymeZ1.js";import"./index-CTjT7uj6.js";import{u as ee}from"./dateFormValidation-BiF3bZPS.js";import{n as b}from"./validation-4HO0J-zV.js";import{e as x,a as j,b as w}from"./barnetUtils-Dtg6gkcN.js";import{V as i}from"./VStack-CHPVCYB5.js";import{S as C}from"./BabyWrapped-cMFYh14d.js";import{S as N}from"./Information-DTjzskpf.js";import"./v4-CQkTLCs1.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./index-BRV0Se7Z.js";const I=r=>{const s=x(r),l=j(r),n=w(r);if(s||l||n){const a=n||s?r.fødselsdato:r.termindato;if(o(a).month()<8)return o(a).month(7).add(1,"year").format("MMMM YYYY");if(o(a).month()>=8&&o(a).month()<11)return o(a).add(1,"year").format("MMMM YYYY");if(o(a).month()===11)return o(a).startOf("year").add(2,"year").add(7,"months").format("MMMM YYYY")}},G=({barnet:r})=>{const s=x(r),l=j(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(t,{id:"AleneforsørgerBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(t,{id:"AleneforsørgerBarnehageplass.DatoTittel",values:{dato:I(r)}}),color:"green",icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[s&&e.jsx(t,{id:"AleneforsørgerBarnehageplass.DatoTekst",values:{a:n=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:n}),dato:o(r.fødselsdato).format(F)}}),l&&e.jsx(t,{id:"AleneforsørgerBarnehageplass.DatoTekstTermin",values:{a:n=>e.jsx(B,{href:v.barnehageloven,target:"_blank",inlineText:!0,children:n}),dato:o(r.termindato).format(F)}})]})}),e.jsx(h,{header:e.jsx(t,{id:"AleneforsørgerBarnehageplass.BarnehageTittel"}),icon:e.jsx(N,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(d,{children:e.jsx(t,{id:"AleneforsørgerBarnehageplass.BarnehageTekst"})})})]})};G.__docgenInfo={description:"",methods:[],displayName:"AleneforsørgerBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const K=({barnet:r})=>{const s=x(r),l=j(r),n=w(r);return e.jsxs(i,{gap:"10",children:[e.jsx(d,{children:e.jsx(t,{id:"FlereForsørgereBarnehageplass.KommuneTekstDeg"})}),e.jsx(h,{header:e.jsx(t,{id:"FlereForsørgereBarnehageplass.DatoTittel",values:{dato:I(r)}}),color:"green",icon:e.jsx(C,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),children:e.jsxs(d,{children:[(s||n)&&e.jsx(t,{id:"FlereForsørgereBarnehageplass.DatoTekst",values:{a:a=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),dato:o(r.fødselsdato).format(F)}}),l&&e.jsx(t,{id:"FlereForsørgereBarnehageplass.DatoTekstTermin",values:{a:a=>e.jsx(B,{inlineText:!0,href:v.barnehageloven,className:"lenke",rel:"noreferrer",target:"_blank",children:a}),dato:o(r.termindato).format(F)}})]})}),e.jsx(h,{header:e.jsx(t,{id:"FlereForsørgereBarnehageplass.BarnehageTittel"}),icon:e.jsx(N,{height:24,width:24,color:"#020C1CAD",fontSize:"1.5rem","aria-hidden":!0}),color:"gray",children:e.jsx(d,{children:e.jsx(t,{id:"FlereForsørgereBarnehageplass.BarnehageTekst"})})})]})};K.__docgenInfo={description:"",methods:[],displayName:"FlereForsørgereBarnehageplass",props:{barnet:{required:!0,tsType:{name:"union",raw:"Fødsel | BarnetErAdoptert",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"erFødsel",value:{name:"boolean",required:!0}},{key:"antallBarn",value:{name:"string",required:!0}},{key:"overtakelsesdato",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}}]}}]},description:""}}};const k=({locale:r})=>{const s=z(r),l=J();ee();const n=b(y(c.OM_BARNET)),a=b(y(c.HVEM_PLANLEGGER));return e.jsx(X,{steps:l,goToStep:s.goToNextStep,children:e.jsxs(i,{gap:"10",children:[e.jsx(Z,{size:"large",children:e.jsx(t,{id:"BarnehageplassSteg.Tittel"})}),e.jsxs(i,{gap:"10",children:[!S(a)&&e.jsx(K,{barnet:n}),S(a)&&e.jsx(G,{barnet:n})]}),e.jsx(i,{gap:"20",children:e.jsx(i,{children:e.jsx($,{nextButtonOnClick:s.goToNextDefaultStep,goToPreviousStep:s.goToPreviousDefaultStep,useSimplifiedTexts:!0})})})]})})};k.__docgenInfo={description:"",methods:[],displayName:"BarnehageplassSteg"};const ke={title:"steg/BarnehageplassSteg",component:k,render:({hvemPlanlegger:r,omBarnet:s,gåTilNesteSide:l=L("button-click"),locale:n})=>(Q(),e.jsx(H,{initialEntries:[W.ARBEIDSSITUASJON],children:e.jsx(V,{initialState:{[c.HVEM_PLANLEGGER]:r,[c.OM_BARNET]:s},onDispatch:l,children:e.jsx(k,{locale:n})})}))},u={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},g={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:f.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},m={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:f.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"1"}}},p={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:f.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"}}};var A,M,T;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(T=(M=u.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var P,_,q;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(q=(_=g.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var D,E,O;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(O=(E=m.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var R,U,Y;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(Y=(U=p.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};const xe=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartAugust"];export{m as AleneforsørgerBarnFødtJanuarStartAugust,p as FlereForsørgereAdoptertBarnFødtJanuarStartAugust,g as FlereForsørgereBarnFødtSeptemberStartSeptember,u as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,xe as __namedExportsOrder,ke as default};
