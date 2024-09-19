import{j as Q}from"./jsx-runtime-Cw0GR0a5.js";import{A as r}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as e}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{O as F}from"./OmÅTilpassePlanen-Cmj1cF9o.js";import"./index-CTjT7uj6.js";import"./Label-R9sLPhMW.js";import"./VStack-BOynvu-T.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./amplitude-D8EMZzS9.js";import"./VeiviserPage-D3AeDTCR.js";import"./index-BRV0Se7Z.js";import"./BabyWrapped-BEcH1H8s.js";import"./PersonPregnant-CmbINfC2.js";import"./PersonGroup-D_DyOkqX.js";import"./ExpansionCard-D7K8ipSa.js";const ur={title:"steg/PlanenDeresSteg/components/OmÅTilpassePlanen - Fødsel",component:F,render:({hvemPlanlegger:z,barnet:C,arbeidssituasjon:L})=>Q.jsx(F,{arbeidssituasjon:L,hvemPlanlegger:z,barnet:C})},n={args:{hvemPlanlegger:{type:e.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},a={args:{hvemPlanlegger:{type:e.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},t={args:{hvemPlanlegger:{type:e.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},s={args:{hvemPlanlegger:{type:e.MOR_OG_MEDMOR,navnPåMor:"Mor",navnPåMedmor:"Medmor"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},o={args:{hvemPlanlegger:{type:e.MOR_OG_MEDMOR,navnPåMor:"Mor",navnPåMedmor:"Medmor"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},d={args:{hvemPlanlegger:{type:e.MOR_OG_MEDMOR,navnPåMor:"Mor",navnPåMedmor:"Medmor"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},l={args:{hvemPlanlegger:{type:e.FAR_OG_FAR,navnPåMedfar:"Medfar",navnPåFar:"Far"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},u={args:{hvemPlanlegger:{type:e.FAR_OG_FAR,navnPåMedfar:"Medfar",navnPåFar:"Far"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},m={args:{hvemPlanlegger:{type:e.MOR,navnPåMor:"Mor"},arbeidssituasjon:{status:r.JOBBER},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},i={args:{hvemPlanlegger:{type:e.FAR,navnPåFar:"Far"},arbeidssituasjon:{status:r.JOBBER},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}};var g,M,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_FAR,
      navnPåMor: 'Mor',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(b=(M=n.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var p,B,P;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_FAR,
      navnPåMor: 'Mor',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(P=(B=a.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var c,O,R;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_FAR,
      navnPåMor: 'Mor',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(R=(O=t.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var v,j,A;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_MEDMOR,
      navnPåMor: 'Mor',
      navnPåMedmor: 'Medmor'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(A=(j=s.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var f,_,E;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_MEDMOR,
      navnPåMor: 'Mor',
      navnPåMedmor: 'Medmor'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(E=(_=o.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var S,h,y;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_MEDMOR,
      navnPåMor: 'Mor',
      navnPåMedmor: 'Medmor'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(y=(h=d.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var G,H,J;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.FAR_OG_FAR,
      navnPåMedfar: 'Medfar',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(J=(H=l.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,N,D;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.FAR_OG_FAR,
      navnPåMedfar: 'Medfar',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(D=(N=u.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var x,I,T;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR,
      navnPåMor: 'Mor'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(T=(I=m.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var k,q,w;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.FAR,
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...(w=(q=i.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};const mr=["FødselMorOgFarBeggeHarRett","FødselMorOgFarKunMorHarRett","FødselMorOgFarKunFarHarRett","FødselMorOgMedmorBeggeHarRett","FødselMorOgMedmorKunMorHarRett","FødselMorOgMedmorKunMedmorHarRett","FødselFarOgFarBeggeHarRett","FødselFarOgFarKunFar1HarRett","FødselAleneforsørgerMor","FødselAleneforsørgerFar"];export{i as FødselAleneforsørgerFar,m as FødselAleneforsørgerMor,l as FødselFarOgFarBeggeHarRett,u as FødselFarOgFarKunFar1HarRett,n as FødselMorOgFarBeggeHarRett,t as FødselMorOgFarKunFarHarRett,a as FødselMorOgFarKunMorHarRett,s as FødselMorOgMedmorBeggeHarRett,d as FødselMorOgMedmorKunMedmorHarRett,o as FødselMorOgMedmorKunMorHarRett,mr as __namedExportsOrder,ur as default};
