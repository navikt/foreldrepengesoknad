import{j as P}from"./iframe-DwWxxAya.js";import{M,P as y,C as o}from"./usePlanleggerNavigator-ossaAdRq.js";import{P as B}from"./routes-gnI_NAHe.js";import{A as n,H as e}from"./HvemPlanleggerUtils-B-SNuSes.js";import{D as r}from"./satserUtils-DTonUwCu.js";import{O}from"./OppsummeringSteg-koT0EsqV.js";import"./preload-helper-PPVm8Dsz.js";import"./barnetUtils-BF8Zfmq2.js";import"./hvemHarRettUtils-DLrOKaW6.js";import"./useScrollBehaviour-CIrmMkFv.js";import"./ShareDataInfobox-BlwvdFxE.js";import"./umami-BV0wnPmZ.js";import"./TasklistStart-3p32I06v.js";import"./BarnehageplassSteg-CycMlQ8g.js";import"./PlanleggerStepPage-uuqHVgdp.js";import"./uttakUtils-SVWhwV3m.js";import"./BabyWrapped-CuSdT7Gy.js";import"./Information-CMdXCYmt.js";import"./umamiUtils-Bw37iN91.js";import"./useLagUttaksplanForslag-pizsrYI6.js";import"./Wallet-EODZgJQA.js";const t={farRundtFødsel:10,toTette:0},Z={title:"steg/OppsummeringSteg",component:O,render:({hvemPlanlegger:p,fordeling:u,hvorLangPeriode:v,omBarnet:f,arbeidssituasjon:_,stønadskontoer:D,satser:A,hvorMye:L,uttaksplan:S})=>P.jsx(M,{initialEntries:[B.OPPSUMMERING],children:P.jsx(y,{initialState:{[o.HVEM_PLANLEGGER]:p,[o.FORDELING]:u,[o.HVOR_LANG_PERIODE]:v,[o.OM_BARNET]:f,[o.ARBEIDSSITUASJON]:_,[o.HVOR_MYE]:L,[o.UTTAKSPLAN]:S},children:P.jsx(O,{stønadskontoer:D,satser:A})})})},a={args:{satser:r,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:e.MOR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:5e4,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:"100"},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2025-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},uttaksplan:[{fom:"2025-07-03",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",tom:"2025-07-23"},{fom:"2025-07-24",forelder:"MOR",kontoType:"MØDREKVOTE",tom:"2025-11-05"},{fom:"2025-11-06",forelder:"MOR",kontoType:"FELLESPERIODE",tom:"2025-12-10"},{fom:"2025-12-11",forelder:"FAR_MEDMOR",kontoType:"FELLESPERIODE",tom:"2026-02-25"},{fom:"2026-02-26",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",tom:"2026-06-10"}]}},s={args:{satser:r,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:e.MOR_OG_FAR},hvorMye:{lønnSøker2:1e3},hvorLangPeriode:{dekningsgrad:"100"},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:t},100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:t}},uttaksplan:[{fom:"2024-09-04",kontoType:"FORELDREPENGER",morsAktivitet:"IKKE_OPPGITT",tom:"2024-11-12"},{fom:"2024-11-13",kontoType:"FORELDREPENGER",morsAktivitet:"IKKE_OPPGITT",tom:"2025-06-10"}]}},E={args:{satser:r,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:e.FAR_OG_FAR},fordeling:void 0,hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:"100"},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-11-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:125},{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"FORELDREPENGER",dager:166},{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}},uttaksplan:[{fom:"2024-11-25",kontoType:"FORELDREPENGER",morsAktivitet:"IKKE_OPPGITT",tom:"2025-03-07"}]}},d={args:{satser:r,hvemPlanlegger:{type:e.FAR_OG_FAR},fordeling:void 0,hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:"100"},omBarnet:{erFødsel:!1,termindato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13",fødselsdato:"2024-07-24"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:261}],minsteretter:t},100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:200}],minsteretter:t}},uttaksplan:[{fom:"2024-10-14",kontoType:"FORELDREPENGER",morsAktivitet:"IKKE_OPPGITT",tom:"2025-07-18"}]}},R={args:{satser:r,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:e.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:"100"},omBarnet:{erFødsel:!1,erBarnetFødt:!1,fødselsdato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:a.args?.stønadskontoer,uttaksplan:[{fom:"2024-09-23",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",tom:"2024-10-11"},{fom:"2024-10-14",forelder:"MOR",kontoType:"MØDREKVOTE",tom:"2025-01-24"},{fom:"2025-01-27",forelder:"MOR",kontoType:"FELLESPERIODE",tom:"2025-02-28"},{fom:"2025-03-03",forelder:"FAR_MEDMOR",kontoType:"FELLESPERIODE",tom:"2025-05-16"},{fom:"2025-05-19",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",tom:"2025-08-29"}]}},l={args:{satser:r,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:e.MOR},hvorMye:{lønnSøker1:7e4},hvorLangPeriode:{dekningsgrad:"80"},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"2",fødselsdato:"2024-08-15"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:397},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:t},100:{kontoer:[{konto:"FORELDREPENGER",dager:315},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:t}},uttaksplan:[{fom:"2024-07-25",kontoType:"FORELDREPENGER_FØR_FØDSEL",morsAktivitet:void 0,tom:"2024-08-14"},{fom:"2024-08-15",kontoType:"FORELDREPENGER",morsAktivitet:void 0,tom:"2026-02-20"}]}},F={args:{satser:r,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:e.FAR},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:"80"},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"1",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:291}],minsteretter:t},100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:t}},uttaksplan:[{fom:"2024-08-12",kontoType:"FORELDREPENGER",morsAktivitet:void 0,tom:"2025-09-22"}]}},i={args:{satser:r,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:e.MOR_OG_MEDMOR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:"100"},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-10-10"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:a.args?.stønadskontoer,uttaksplan:[{fom:"2024-09-19",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",tom:"2024-10-09"},{fom:"2024-10-10",forelder:"MOR",kontoType:"MØDREKVOTE",tom:"2025-01-22"},{fom:"2025-01-23",forelder:"MOR",kontoType:"FELLESPERIODE",tom:"2025-02-26"},{fom:"2025-02-27",forelder:"FAR_MEDMOR",kontoType:"FELLESPERIODE",tom:"2025-05-14"},{fom:"2025-05-15",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",tom:"2025-08-27"}]}},m={args:{satser:r,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:e.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-010-10"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!1}}},k={args:{satser:r,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:e.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-12-01",fødselsdato:"2024-12-01",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:"100"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:230},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:"FORELDREPENGER",dager:291},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}},uttaksplan:[{fom:"2024-11-11",kontoType:"FORELDREPENGER_FØR_FØDSEL",morsAktivitet:void 0,tom:"2024-11-29"},{fom:"2024-12-02",kontoType:"FORELDREPENGER",morsAktivitet:void 0,tom:"2025-10-17"}]}},g={args:{satser:r,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:e.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:"100"},arbeidssituasjon:{status:n.UFØR}}},T={args:{satser:r,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:e.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:"100"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}},uttaksplan:[{fom:"2024-10-24",kontoType:"FORELDREPENGER",morsAktivitet:"IKKE_OPPGITT",tom:"2025-09-10"}]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorMye: {
      lønnSøker1: 50000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2025-07-24',
      antallBarn: '1'
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
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
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
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    },
    uttaksplan: [{
      fom: '2025-07-03',
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      tom: '2025-07-23'
    }, {
      fom: '2025-07-24',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE',
      tom: '2025-11-05'
    }, {
      fom: '2025-11-06',
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE',
      tom: '2025-12-10'
    }, {
      fom: '2025-12-11',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FELLESPERIODE',
      tom: '2026-02-25'
    }, {
      fom: '2026-02-26',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE',
      tom: '2026-06-10'
    }]
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    hvorMye: {
      lønnSøker2: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-07-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
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
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 150
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    },
    uttaksplan: [{
      fom: '2024-09-04',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: 'IKKE_OPPGITT',
      tom: '2024-11-12'
    }, {
      fom: '2024-11-13',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: 'IKKE_OPPGITT',
      tom: '2025-06-10'
    }]
  }
}`,...s.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    fordeling: undefined,
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-11-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
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
    },
    uttaksplan: [{
      fom: '2024-11-25',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: 'IKKE_OPPGITT',
      tom: '2025-03-07'
    }]
  }
}`,...E.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    fordeling: undefined,
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    omBarnet: {
      erFødsel: false,
      termindato: '2024-07-24',
      antallBarn: '1',
      overtakelsesdato: '2024-10-13',
      fødselsdato: '2024-07-24'
    },
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
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 200
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    },
    uttaksplan: [{
      fom: '2024-10-14',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: 'IKKE_OPPGITT',
      tom: '2025-07-18'
    }]
  }
}`,...d.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    omBarnet: {
      erFødsel: false,
      erBarnetFødt: false,
      fødselsdato: '2024-07-24',
      antallBarn: '1',
      overtakelsesdato: '2024-10-13'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer,
    uttaksplan: [{
      fom: '2024-09-23',
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      tom: '2024-10-11'
    }, {
      fom: '2024-10-14',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE',
      tom: '2025-01-24'
    }, {
      fom: '2025-01-27',
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE',
      tom: '2025-02-28'
    }, {
      fom: '2025-03-03',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FELLESPERIODE',
      tom: '2025-05-16'
    }, {
      fom: '2025-05-19',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE',
      tom: '2025-08-29'
    }]
  }
}`,...R.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    hvorMye: {
      lønnSøker1: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: '80'
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-10',
      antallBarn: '2',
      fødselsdato: '2024-08-15'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 397
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 315
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    },
    uttaksplan: [{
      fom: '2024-07-25',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      morsAktivitet: undefined,
      tom: '2024-08-14'
    }, {
      fom: '2024-08-15',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: undefined,
      tom: '2026-02-20'
    }]
  }
}`,...l.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: '80'
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-10',
      antallBarn: '1',
      fødselsdato: '2024-08-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 291
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 230
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    },
    uttaksplan: [{
      fom: '2024-08-12',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: undefined,
      tom: '2025-09-22'
    }]
  }
}`,...F.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåMedmor: 'Esther Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    omBarnet: {
      erFødsel: false,
      erBarnetFødt: true,
      fødselsdato: '2024-07-10',
      antallBarn: '1',
      overtakelsesdato: '2024-10-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer,
    uttaksplan: [{
      fom: '2024-09-19',
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      tom: '2024-10-09'
    }, {
      fom: '2024-10-10',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE',
      tom: '2025-01-22'
    }, {
      fom: '2025-01-23',
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE',
      tom: '2025-02-26'
    }, {
      fom: '2025-02-27',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FELLESPERIODE',
      tom: '2025-05-14'
    }, {
      fom: '2025-05-15',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE',
      tom: '2025-08-27'
    }]
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: false,
      erBarnetFødt: true,
      fødselsdato: '2024-07-10',
      antallBarn: '1',
      overtakelsesdato: '2024-010-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: false
    }
  }
}`,...m.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-12-01',
      fødselsdato: '2024-12-01',
      antallBarn: '1'
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 230
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        },
        tillegg: {
          flerbarn: 0,
          prematur: 0
        }
      },
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 291
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        },
        tillegg: {
          flerbarn: 0,
          prematur: 0
        }
      }
    },
    uttaksplan: [{
      fom: '2024-11-11',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      morsAktivitet: undefined,
      tom: '2024-11-29'
    }, {
      fom: '2024-12-02',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: undefined,
      tom: '2025-10-17'
    }]
  }
}`,...k.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-10-24',
      antallBarn: '1'
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR
    }
  }
}`,...g.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-10-24',
      antallBarn: '1'
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: '100'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    },
    uttaksplan: [{
      fom: '2024-10-24',
      kontoType: 'FORELDREPENGER',
      morsAktivitet: 'IKKE_OPPGITT',
      tom: '2025-09-10'
    }]
  }
}`,...T.parameters?.docs?.source}}};const $=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","FarOgFarAdopsjonBeggeHarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{F as AleneforsørgerFarÅttiProsentFødsel,g as AleneforsørgerMorErUfør,l as AleneforsørgerÅttiProsentFødselToBarn,R as FarOgFarAdopsjonBeggeHarRett,d as FarOgFarAdopsjonKunFar1HarRett,E as FarOgFarFødsel,i as FlereForsørgereHundreProsentAdopsjon,a as FlereForsørgereHundreProsentTermin,m as HarIkkeRett,k as KunMorHarRett,s as MorOgFarKunFarHarRett,T as OppsummeringFarOgFarKunFar2HarRett,$ as __namedExportsOrder,Z as default};
