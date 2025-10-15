import{l as e,a2 as r}from"./iframe-DMjR5zJp.js";import{H as t}from"./HvemPlanleggerUtils-FmAHV5TN.js";import{C as a}from"./CalendarLabels-DmzBiFlF.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-CFOtHNM8.js";import"./hvemHarRettUtils-Dth0aJl-.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-lbBQPi52.js";import"./BarnehageplassSteg-h1oel86k.js";import"./usePlanleggerNavigator-fce4_mez.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-DCTHONNL.js";import"./uttakUtils-RZEI38-d.js";import"./useScrollBehaviour-JvNfIY5k.js";import"./BabyWrapped-Cee8FrKo.js";import"./Information-BvMm_DSP.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FamiliehendelseLabel-B92j8m9f.js";const O={title:"CalendarLabels",component:a},o={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel},{fom:"2025-08-05",tom:"2025-11-17",forelder:r.mor,kontoType:e.Mødrekvote},{fom:"2025-11-18",tom:"2026-03-10",forelder:r.mor,kontoType:e.Fellesperiode},{fom:"2026-03-11",tom:"2026-06-24",forelder:r.farMedmor,kontoType:e.Fedrekvote}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},n={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel},{fom:"2025-08-04",tom:"2025-11-17",forelder:r.mor,kontoType:e.Mødrekvote},{fom:"2025-11-18",tom:"2026-03-10",forelder:r.mor,kontoType:e.Fellesperiode},{fom:"2026-03-11",tom:"2026-06-24",forelder:r.farMedmor,kontoType:e.Fedrekvote}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
