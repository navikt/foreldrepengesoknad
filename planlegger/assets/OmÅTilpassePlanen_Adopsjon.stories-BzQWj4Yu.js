import{j as X}from"./jsx-runtime-Du8NFWEI.js";import{A as e}from"./Arbeidssituasjon-Bw9oRg1d.js";import{S as r}from"./HvemPlanleggerUtils-CHTffTZd.js";import{O as Q}from"./OmÅTilpassePlanen-CoScbu9L.js";import"./index-Dl6G-zuu.js";import"./amplitude.esm-JOtNIP3j.js";import"./IconCircleWrapper-x91Dcw7p.js";import"./index-e2vXP8VC.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-Dvw973AZ.js";import"./VStack-C-EA7mzX.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./BabyWrapped-BX-BmTrK.js";import"./useId-BnKOV0D5.js";import"./Label-DKKZxAV5.js";import"./PersonPregnant-CZab5gFD.js";import"./PersonGroup-5deYFPGw.js";import"./ExpansionCard-Bwp0aZ3a.js";import"./ChevronDown-CY3RuW24.js";const Y=({hvemPlanlegger:U,barnet:V,arbeidssituasjon:W})=>X.jsx(Q,{arbeidssituasjon:W,hvemPlanlegger:U,barnet:V}),ce={title:"steg/OversiktSteg/components/OmÅTilpassePlanen - Adopsjon",component:Q,render:Y},a={args:{hvemPlanlegger:{type:r.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},n={args:{hvemPlanlegger:{type:r.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},s={args:{hvemPlanlegger:{type:r.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:e.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},t={args:{hvemPlanlegger:{type:r.MOR_OG_MEDMOR,navnPåMedmor:"Medmor",navnPåMor:"Mor"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},o={args:{hvemPlanlegger:{type:r.MOR_OG_MEDMOR,navnPåMedmor:"Medmor",navnPåMor:"Mor"},arbeidssituasjon:{status:e.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},d={args:{hvemPlanlegger:{type:r.MOR_OG_MEDMOR,navnPåMedmor:"Medmor",navnPåMor:"Mor"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},l={args:{hvemPlanlegger:{type:r.FAR_OG_FAR,navnPåMedfar:"Medfar",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},u={args:{hvemPlanlegger:{type:r.FAR_OG_FAR,navnPåMedfar:"Medfar",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},F={args:{hvemPlanlegger:{type:r.FAR_OG_FAR,navnPåMedfar:"Medfar",navnPåFar:"Far"},arbeidssituasjon:{status:e.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},m={args:{hvemPlanlegger:{type:r.MOR,navnPåMor:"Mor"},arbeidssituasjon:{status:e.JOBBER},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},p={args:{hvemPlanlegger:{type:r.FAR,navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER},barnet:{antallBarn:"1",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}};var i,g,M;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(M=(g=a.parameters)==null?void 0:g.docs)==null?void 0:M.source}}};var b,v,c;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(c=(v=n.parameters)==null?void 0:v.docs)==null?void 0:c.source}}};var B,P,j;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(j=(P=s.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var A,O,R;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_MEDMOR,
      navnPåMedmor: 'Medmor',
      navnPåMor: 'Mor'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(R=(O=t.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var f,x,E;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_MEDMOR,
      navnPåMedmor: 'Medmor',
      navnPåMor: 'Mor'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(E=(x=o.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var _,S,G;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_MEDMOR,
      navnPåMedmor: 'Medmor',
      navnPåMor: 'Mor'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    barnet: {
      antallBarn: '1',
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(G=(S=d.parameters)==null?void 0:S.docs)==null?void 0:G.source}}};var k,h,y;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(y=(h=l.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var H,J,K;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(K=(J=u.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var N,D,I;F.parameters={...F.parameters,docs:{...(N=F.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.FAR_OG_FAR,
      navnPåMedfar: 'Medfar',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(I=(D=F.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var T,q,w;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(w=(q=m.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,C,L;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...(L=(C=p.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};const Be=["AdopsjonMorOgFarBeggeHarRett","AdopsjonMorOgFarKunMorHarRett","AdopsjonMorOgFarKunFarHarRett","AdopsjonMorOgMedmorBeggeHarRett","AdopsjonMorOgMedmorKunMedmorHarRett","AdopsjonMorOgMedmorKunMorHarRett","AdopsjonFarOgFarBeggeHarRett","AdopsjonFarOgFarKunFar1HarRett","AdopsjonFarOgFarKunFar2HarRett","AdopsjonAleneforsørgerMor","AdopsjonAleneforsørgerFar"];export{p as AdopsjonAleneforsørgerFar,m as AdopsjonAleneforsørgerMor,l as AdopsjonFarOgFarBeggeHarRett,u as AdopsjonFarOgFarKunFar1HarRett,F as AdopsjonFarOgFarKunFar2HarRett,a as AdopsjonMorOgFarBeggeHarRett,s as AdopsjonMorOgFarKunFarHarRett,n as AdopsjonMorOgFarKunMorHarRett,t as AdopsjonMorOgMedmorBeggeHarRett,o as AdopsjonMorOgMedmorKunMedmorHarRett,d as AdopsjonMorOgMedmorKunMorHarRett,Be as __namedExportsOrder,ce as default};
