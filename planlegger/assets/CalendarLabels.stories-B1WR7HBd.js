import{l as e,a2 as r}from"./iframe-DXWlG1wZ.js";import{H as t}from"./HvemPlanleggerUtils-C5NuzGxi.js";import{C as a}from"./CalendarLabels-oQthmUBA.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-3oew4E7l.js";import"./hvemHarRettUtils-Cr6TJP8o.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-BNmk13lo.js";import"./BarnehageplassSteg-CoJAMo3q.js";import"./usePlanleggerNavigator-CgpHTw5j.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-Br1qO49-.js";import"./uttakUtils-DUqHDWDq.js";import"./useScrollBehaviour-CFdHoycy.js";import"./BabyWrapped-DwRDlYMS.js";import"./Information-D043TA08.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FamiliehendelseLabel-DK_tHPt-.js";const O={title:"CalendarLabels",component:a},o={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel},{fom:"2025-08-05",tom:"2025-11-17",forelder:r.mor,kontoType:e.Mødrekvote},{fom:"2025-11-18",tom:"2026-03-10",forelder:r.mor,kontoType:e.Fellesperiode},{fom:"2026-03-11",tom:"2026-06-24",forelder:r.farMedmor,kontoType:e.Fedrekvote}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},n={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel},{fom:"2025-08-04",tom:"2025-11-17",forelder:r.mor,kontoType:e.Mødrekvote},{fom:"2025-11-18",tom:"2026-03-10",forelder:r.mor,kontoType:e.Fellesperiode},{fom:"2026-03-11",tom:"2026-06-24",forelder:r.farMedmor,kontoType:e.Fedrekvote}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.ForeldrepengerFørFødsel
    },
    // legger inn tapt dag mellom termindato og første dag av mødrekvote
    {
      fom: '2025-08-05',
      tom: '2025-11-17',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Mødrekvote
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Fellesperiode
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: Forelder.farMedmor,
      kontoType: StønadskontoType.Fedrekvote
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
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.ForeldrepengerFørFødsel
    }, {
      fom: '2025-08-04',
      tom: '2025-11-17',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Mødrekvote
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Fellesperiode
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: Forelder.farMedmor,
      kontoType: StønadskontoType.Fedrekvote
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
}`,...n.parameters?.docs?.source}}};const h=["MorSøkerMedTapteDager","MorSøkerUtenTapteDager"];export{o as MorSøkerMedTapteDager,n as MorSøkerUtenTapteDager,h as __namedExportsOrder,O as default};
