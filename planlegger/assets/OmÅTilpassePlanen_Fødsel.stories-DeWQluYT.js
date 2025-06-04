import{j as Q}from"./jsx-runtime-D_zvdyIk.js";import{A as e}from"./Arbeidssituasjon-i2z_eSVB.js";import"./VeiviserPage-_pnwesxq.js";import{H as r}from"./HvemPlanleggerUtils-CID24uWy.js";import{O as F}from"./OmÅTilpassePlanen-xJ9vYZna.js";import"./index-DQLiH3RP.js";import"./VStack-05Ww9A8B.js";import"./stringUtils-DApHD7Y2.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./barnetUtils-Dt6imNNn.js";import"./barnType-CnRI8jWg.js";import"./hvemHarRettUtils-D25Zomat.js";import"./BabyWrapped-DYJcH_DD.js";import"./PersonPregnant-DPU01SlN.js";import"./Briefcase-Cq2QXhIu.js";import"./PencilWriting-njUDx9TT.js";import"./PersonGroup-_nGe72we.js";import"./ExpansionCard-pmjQE8YQ.js";const Fe={title:"steg/PlanenDeresSteg/components/OmÅTilpassePlanen - Fødsel",component:F,render:({hvemPlanlegger:z,barnet:C,arbeidssituasjon:L})=>Q.jsx(F,{arbeidssituasjon:L,hvemPlanlegger:z,barnet:C})},n={args:{hvemPlanlegger:{type:r.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},a={args:{hvemPlanlegger:{type:r.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},t={args:{hvemPlanlegger:{type:r.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:e.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},s={args:{hvemPlanlegger:{type:r.MOR_OG_MEDMOR,navnPåMor:"Mor",navnPåMedmor:"Medmor"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},o={args:{hvemPlanlegger:{type:r.MOR_OG_MEDMOR,navnPåMor:"Mor",navnPåMedmor:"Medmor"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},d={args:{hvemPlanlegger:{type:r.MOR_OG_MEDMOR,navnPåMor:"Mor",navnPåMedmor:"Medmor"},arbeidssituasjon:{status:e.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},l={args:{hvemPlanlegger:{type:r.FAR_OG_FAR,navnPåMedfar:"Medfar",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},u={args:{hvemPlanlegger:{type:r.FAR_OG_FAR,navnPåMedfar:"Medfar",navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},m={args:{hvemPlanlegger:{type:r.MOR,navnPåMor:"Mor"},arbeidssituasjon:{status:e.JOBBER},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},g={args:{hvemPlanlegger:{type:r.FAR,navnPåFar:"Far"},arbeidssituasjon:{status:e.JOBBER},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}};var i,M,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
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
}`,...(p=(M=n.parameters)==null?void 0:M.docs)==null?void 0:p.source}}};var P,b,B;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
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
}`,...(B=(b=a.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var c,O,R;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
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
}`,...(R=(O=t.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var v,A,f;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_MEDMOR,
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
}`,...(f=(A=s.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var j,_,y;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_MEDMOR,
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
}`,...(y=(_=o.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var E,H,h;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_MEDMOR,
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
}`,...(h=(H=d.parameters)==null?void 0:H.docs)==null?void 0:h.source}}};var G,J,T;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.FAR_OG_FAR,
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
}`,...(T=(J=l.parameters)==null?void 0:J.docs)==null?void 0:T.source}}};var S,K,N;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.FAR_OG_FAR,
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
}`,...(N=(K=u.parameters)==null?void 0:K.docs)==null?void 0:N.source}}};var D,x,I;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR,
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
}`,...(I=(x=m.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var k,q,w;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.FAR,
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
}`,...(w=(q=g.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};const ie=["FødselMorOgFarBeggeHarRett","FødselMorOgFarKunMorHarRett","FødselMorOgFarKunFarHarRett","FødselMorOgMedmorBeggeHarRett","FødselMorOgMedmorKunMorHarRett","FødselMorOgMedmorKunMedmorHarRett","FødselFarOgFarBeggeHarRett","FødselFarOgFarKunFar1HarRett","FødselAleneforsørgerMor","FødselAleneforsørgerFar"];export{g as FødselAleneforsørgerFar,m as FødselAleneforsørgerMor,l as FødselFarOgFarBeggeHarRett,u as FødselFarOgFarKunFar1HarRett,n as FødselMorOgFarBeggeHarRett,t as FødselMorOgFarKunFarHarRett,a as FødselMorOgFarKunMorHarRett,s as FødselMorOgMedmorBeggeHarRett,d as FødselMorOgMedmorKunMedmorHarRett,o as FødselMorOgMedmorKunMorHarRett,ie as __namedExportsOrder,Fe as default};
