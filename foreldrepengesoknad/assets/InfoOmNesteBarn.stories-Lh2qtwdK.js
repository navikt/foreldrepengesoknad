import{j as r}from"./Uttaksdagen-DrQ0Oxxl.js";import{B}from"./index-0Vf6ETgw.js";import{F,C as n,B as N}from"./FpDataContext-BW_0HfWx.js";import"./dateFormValidation-DXkRFCUV.js";import"./index-BP8_t0zE.js";import{I as T}from"./InfoOmNesteBarn-DZ4z1t8d.js";import"./index-BVEwUaSm.js";import"./Label-Uwu7Pz6v.js";import"./useMergeRefs-DNxXm0No.js";import"./barnUtils-CwWCeo2u.js";import"./BabyWrapped-D5KQAWQI.js";const c=a=>r.jsx(B,{children:r.jsx(a,{})}),D=c;c.__docgenInfo={description:"",methods:[],displayName:"withRouterProvider"};const O={title:"components/InfoOmNesteBarn",component:T,decorators:[D]},l=({barnFraNesteSak:a})=>r.jsx(F,{initialState:{[n.OM_BARNET]:{type:N.FØDT,fødselsdatoer:["2023-03-15"],antallBarn:1},[n.BARN_FRA_NESTE_SAK]:a},children:r.jsx(T,{minsterettUkerToTette:8})}),e=l.bind({});e.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-01-01"),startdatoFørsteStønadsperiode:new Date("2023-12-20"),fnr:void 0,annenForelderFnr:void 0}};const t=l.bind({});t.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-05-01"),startdatoFørsteStønadsperiode:new Date("2024-05-01"),fnr:void 0,annenForelderFnr:void 0}};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`({
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
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var p,d,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const I=["HarToTetteBarnOgMinsterett","HarEtIkkeTettBarnEtterDenne"];export{t as HarEtIkkeTettBarnEtterDenne,e as HarToTetteBarnOgMinsterett,I as __namedExportsOrder,O as default};
