import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{B as F}from"./index-Bx-zz2o0.js";import"./Tidsperioden-BBrWkrto.js";import"./index-CCQ3W5xA.js";import{F as B,C as n,B as x}from"./FpDataContext-7C49oNtd.js";import"./index-CTjT7uj6.js";import"./Uttaksdagen-C7qvZjyy.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import{I as T}from"./InfoOmNesteBarn-DQecaY90.js";import"./index-9r8iugjR.js";import"./index-BRV0Se7Z.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./Link-D0RLsnK2.js";import"./Label-C_UMiHsP.js";import"./bemUtils-DmNyTjfb.js";import"./dateFormValidation-DamLOwkK.js";import"./barnUtils-B98nIsJr.js";import"./VStack-DmKyg8-d.js";import"./message-CjkJih2D.js";import"./BabyWrapped-BapiM48H.js";const c=a=>r.jsx(F,{children:r.jsx(a,{})}),D=c;c.__docgenInfo={description:"",methods:[],displayName:"withRouterProvider"};const U={title:"components/InfoOmNesteBarn",component:T,decorators:[D]},l=({barnFraNesteSak:a})=>r.jsx(B,{initialState:{[n.OM_BARNET]:{type:x.FØDT,fødselsdatoer:["2023-03-15"],antallBarn:1},[n.BARN_FRA_NESTE_SAK]:a},children:r.jsx(T,{minsterettUkerToTette:8})}),t=l.bind({});t.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-01-01"),startdatoFørsteStønadsperiode:new Date("2023-12-20"),fnr:void 0,annenForelderFnr:void 0}};const e=l.bind({});e.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-05-01"),startdatoFørsteStønadsperiode:new Date("2024-05-01"),fnr:void 0,annenForelderFnr:void 0}};var o,s,i;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`({
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
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const P=["HarToTetteBarnOgMinsterett","HarEtIkkeTettBarnEtterDenne"];export{e as HarEtIkkeTettBarnEtterDenne,t as HarToTetteBarnOgMinsterett,P as __namedExportsOrder,U as default};
