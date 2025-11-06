import"./iframe-C53Y_tsP.js";import{H as n}from"./HvemPlanleggerUtils-CgylmF95.js";import{C as t}from"./CalendarLabels-ZJPl5EX6.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-BqEgQFzE.js";import"./hvemHarRettUtils-ufiij2CG.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-D5fwn9eS.js";import"./BarnehageplassSteg-Bbm4U7W3.js";import"./usePlanleggerNavigator-bFAnPask.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-BxclBB3Q.js";import"./uttakUtils-93unqIkh.js";import"./useScrollBehaviour-Chg05p7v.js";import"./BabyWrapped-BiAMNF6N.js";import"./Information-DvpOalms.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FamiliehendelseLabel-CyJAdUPg.js";const P={title:"CalendarLabels",component:t},e={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-05",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},r={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-04",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
