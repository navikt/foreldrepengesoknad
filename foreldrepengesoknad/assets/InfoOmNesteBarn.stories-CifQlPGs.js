import{j as r}from"./tslib.es6-BMc9PpVS.js";import{B as F}from"./index-Dh_lE5Vb.js";import"./Tidsperioden-DbKFRn-R.js";import"./Uttaksdagen-B0FM17qM.js";import{F as B,C as n,B as x}from"./FpDataContext-wT6-gpAc.js";import"./index-BP8_t0zE.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import{I as T}from"./InfoOmNesteBarn-BF9lNl3S.js";import"./index-BxmsGmlx.js";import"./index-Snk9MO9S.js";import"./bemUtils-Cb0-YXpW.js";import"./dateFormValidation-Dz9wII_h.js";import"./barnUtils-BcuO7KJQ.js";import"./BabyWrapped-BVSSXAM5.js";const c=a=>r.jsx(F,{children:r.jsx(a,{})}),D=c;c.__docgenInfo={description:"",methods:[],displayName:"withRouterProvider"};const w={title:"components/InfoOmNesteBarn",component:T,decorators:[D]},l=({barnFraNesteSak:a})=>r.jsx(B,{initialState:{[n.OM_BARNET]:{type:x.FØDT,fødselsdatoer:["2023-03-15"],antallBarn:1},[n.BARN_FRA_NESTE_SAK]:a},children:r.jsx(T,{minsterettUkerToTette:8})}),t=l.bind({});t.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-01-01"),startdatoFørsteStønadsperiode:new Date("2023-12-20"),fnr:void 0,annenForelderFnr:void 0}};const e=l.bind({});e.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-05-01"),startdatoFørsteStønadsperiode:new Date("2024-05-01"),fnr:void 0,annenForelderFnr:void 0}};var o,s,i;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`({
  barnFraNesteSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2023-03-15'],
      antallBarn: 1
    },
    [ContextDataType.BARN_FRA_NESTE_SAK]: barnFraNesteSak
  }}>
            <InfoOmNesteBarn minsterettUkerToTette={8} />
        </FpDataContext>;
}`,...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var p,m,d;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`({
  barnFraNesteSak
}) => {
  return <FpDataContext initialState={{
    [ContextDataType.OM_BARNET]: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2023-03-15'],
      antallBarn: 1
    },
    [ContextDataType.BARN_FRA_NESTE_SAK]: barnFraNesteSak
  }}>
            <InfoOmNesteBarn minsterettUkerToTette={8} />
        </FpDataContext>;
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const g=["HarToTetteBarnOgMinsterett","HarEtIkkeTettBarnEtterDenne"];export{e as HarEtIkkeTettBarnEtterDenne,t as HarToTetteBarnOgMinsterett,g as __namedExportsOrder,w as default};
