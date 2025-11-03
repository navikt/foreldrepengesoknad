import{j as F}from"./iframe-DP_t9eBI.js";import{M as A,P as K,C as o}from"./usePlanleggerNavigator-HIxNafAn.js";import{P as D}from"./routes-Cyl7_Mgv.js";import{A as t}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as _}from"./Dekningsgrad-Bg_cIyqc.js";import{H as r}from"./HvemPlanleggerUtils-B1CZvnnv.js";import{P as p}from"./PlanenDeresSteg-WdJUxds-.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-CzGrketS.js";import"./PlanleggerStepPage-smRU_v4S.js";import"./FordelingSteg-thi5WbKi.js";import"./customErrorFormatter-mERXjlIT.js";import"./hvemHarRettUtils-DhODSxxA.js";import"./uttakUtils-B4VmJN73.js";import"./useScrollBehaviour-B3xlcG3h.js";import"./Spacer-CqudP2l5.js";import"./CalendarLabels-C1D4x2_n.js";import"./CalendarIconLabel-DbaK0a2O.js";import"./BarnehageplassSteg-BjEAa2Sa.js";import"./BabyWrapped-DdqVJKbl.js";import"./Information-J0UM-40J.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FamiliehendelseLabel-BiO0oXfd.js";import"./OmÅTilpassePlanen-B0DUzrV5.js";import"./PersonPregnant-BygM_M92.js";import"./PencilWriting-BgJyQoSl.js";import"./PersonGroup-C9YlW0xD.js";import"./UforutsetteEndringer-BstjpSda.js";import"./ToggleGroup-Cg3_y8Wy.js";const{action:b}=__STORYBOOK_MODULE_ACTIONS__,k={farRundtFødsel:0,toTette:0},de={title:"steg/PlanenDeresSteg/Adopsjon",component:p,render:({gåTilNesteSide:T=b("button-click"),hvemPlanlegger:v,fordeling:P,hvorLangPeriode:c,omBarnet:f,arbeidssituasjon:H,stønadskontoer:I})=>F.jsx(A,{initialEntries:[D.PLANEN_DERES],children:F.jsx(K,{onDispatch:T,initialState:{[o.FORDELING]:P,[o.HVOR_LANG_PERIODE]:c,[o.HVEM_PLANLEGGER]:v,[o.OM_BARNET]:f,[o.ARBEIDSSITUASJON]:H},children:F.jsx(p,{stønadskontoer:I})})})},e={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-08",fødselsdato:"2020-04-11",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:_.HUNDRE_PROSENT},arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80}],minsteretter:k},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101}],minsteretter:k}}}},n={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:k},80:{kontoer:[{konto:"FORELDREPENGER",dager:291}],minsteretter:k}}}},s={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:t.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:125},{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"FORELDREPENGER",dager:166},{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},g={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:t.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},d={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},i={args:{...n.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},R={args:{...s.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},l={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},E={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:r.MOR},fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:void 0},stønadskontoer:n.args?.stønadskontoer}},m={args:{...e.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:void 0},stønadskontoer:n.args?.stønadskontoer}},a={args:{...e.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR}}},O={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:261}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:200}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},u={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:t.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},M={args:{...n.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-07",fødselsdato:"2020-04-11",antallBarn:"1"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: false,
      overtakelsesdato: '2024-07-08',
      fødselsdato: '2020-04-11',
      antallBarn: '1'
    },
    fordeling: {
      antallDagerSøker1: 0
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: 'MØDREKVOTE',
          dager: 75
        }, {
          konto: 'FEDREKVOTE',
          dager: 75
        }, {
          konto: 'FELLESPERIODE',
          dager: 80
        }],
        minsteretter: MINSTERETTER
      },
      '80': {
        kontoer: [{
          konto: 'MØDREKVOTE',
          dager: 95
        }, {
          konto: 'FEDREKVOTE',
          dager: 95
        }, {
          konto: 'FELLESPERIODE',
          dager: 101
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 230
        }],
        minsteretter: MINSTERETTER
      },
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 291
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 125
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 75
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 166
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 95
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...s.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 150
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 211
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...i.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorErUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...R.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...l.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      type: HvemPlanleggerType.MOR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    },
    stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer
  }
}`,...E.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    },
    stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer
  }
}`,...m.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    }
  }
}`,...a.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 261
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 200
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...O.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 211
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 150
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...u.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    },
    omBarnet: {
      erFødsel: false,
      overtakelsesdato: '2024-07-07',
      fødselsdato: '2020-04-11',
      antallBarn: '1'
    }
  }
}`,...M.parameters?.docs?.source}}};const ie=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorErUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorErUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen"];export{m as BareFarSøkerOgHarRett,E as BareMorSøkerOgHarRett,a as FarOgFarBeggeHarRett,O as FarOgFarKunFarHarRett,u as FarOgFarKunMedfarHarRett,e as MorOgFarBeggeHarRett,s as MorOgFarKunFarHarRettMorErUfør,g as MorOgFarKunFarHarRettMorIngenAvDisse,n as MorOgFarKunMorHarRett,d as MorOgMedmorBeggeHarRett,R as MorOgMedmorKunMedmorHarRettMorErUfør,l as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,i as MorOgMedmorKunMorHarRett,M as MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen,ie as __namedExportsOrder,de as default};
