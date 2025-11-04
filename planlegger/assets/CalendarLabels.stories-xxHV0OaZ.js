import"./iframe-XGK4EWHO.js";import{H as n}from"./HvemPlanleggerUtils-Bb38QmLx.js";import{C as t}from"./CalendarLabels-CIgyajHS.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-Be6XyooX.js";import"./hvemHarRettUtils-B4mbOgxC.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-DozuJo-B.js";import"./BarnehageplassSteg-CZrDknfW.js";import"./usePlanleggerNavigator-D5BlZ87I.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-DcZC-mzf.js";import"./uttakUtils-LkQAyLc0.js";import"./useScrollBehaviour-5MXSj2uO.js";import"./BabyWrapped-C2oqtKSi.js";import"./Information-D_uyVbYK.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FamiliehendelseLabel-oxS_S95Z.js";const P={title:"CalendarLabels",component:t},e={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-05",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},r={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-04",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL'
    },
    // legger inn tapt dag mellom termindato og første dag av mødrekvote
    {
      fom: '2025-08-05',
      tom: '2025-11-17',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE'
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE'
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE'
    }] satisfies SaksperiodeNy[],
    barnet: {
      erFødsel: true,
      antallBarn: '1',
      erBarnetFødt: true,
      fødselsdato: '2025-08-03',
      termindato: '2025-08-03'
    },
    hvemHarRett: 'beggeHarRett',
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
      navnPåMor: 'Kari',
      navnPåFar: 'Ola'
    },
    inneholderTapteDager: true
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL'
    }, {
      fom: '2025-08-04',
      tom: '2025-11-17',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE'
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE'
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE'
    }] satisfies SaksperiodeNy[],
    barnet: {
      erFødsel: true,
      antallBarn: '1',
      erBarnetFødt: true,
      fødselsdato: '2025-08-04',
      termindato: '2025-08-04'
    },
    hvemHarRett: 'beggeHarRett',
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
      navnPåMor: 'Kari',
      navnPåFar: 'Ola'
    },
    inneholderTapteDager: false
  }
}`,...r.parameters?.docs?.source}}};const _=["MorSøkerMedTapteDager","MorSøkerUtenTapteDager"];export{e as MorSøkerMedTapteDager,r as MorSøkerUtenTapteDager,_ as __namedExportsOrder,P as default};
