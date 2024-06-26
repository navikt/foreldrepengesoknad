import{j as r}from"./jsx-runtime-_e34SzbC.js";import{B as F}from"./index-B7VFGchK.js";import"./Tidsperioden-Dpr6goD7.js";import"./index--IHLcpuH.js";import{B}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./_baseToString-CUxX9raG.js";import"./_createSet-BJbToUt4.js";import{F as x,C as n}from"./FpDataContext-BcznBdmF.js";import{I as T}from"./InfoOmNesteBarn-d10MSiGq.js";import"./index-Cbx7Fas8.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./dateFormValidation-BYnct3TZ.js";import"./barnUtils-Bbng30qG.js";import"./VStack-DueXo9sZ.js";import"./message-9loiIMhz.js";import"./BabyWrapped-DlZDZu5T.js";const c=a=>r.jsx(F,{children:r.jsx(a,{})}),D=c;c.__docgenInfo={description:"",methods:[],displayName:"withRouterProvider"};const v={title:"components/InfoOmNesteBarn",component:T,decorators:[D]},l=({barnFraNesteSak:a})=>r.jsx(x,{initialState:{[n.OM_BARNET]:{type:B.FØDT,fødselsdatoer:["2023-03-15"],antallBarn:1},[n.BARN_FRA_NESTE_SAK]:a},children:r.jsx(T,{minsterettUkerToTette:8})}),t=l.bind({});t.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-01-01"),startdatoFørsteStønadsperiode:new Date("2023-12-20"),fnr:void 0,annenForelderFnr:void 0}};const e=l.bind({});e.args={barnFraNesteSak:{familiehendelsesdato:new Date("2024-05-01"),startdatoFørsteStønadsperiode:new Date("2024-05-01"),fnr:void 0,annenForelderFnr:void 0}};var o,s,i;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`({
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
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const M=["HarToTetteBarnOgMinsterett","HarEtIkkeTettBarnEtterDenne"];export{e as HarEtIkkeTettBarnEtterDenne,t as HarToTetteBarnOgMinsterett,M as __namedExportsOrder,v as default};
