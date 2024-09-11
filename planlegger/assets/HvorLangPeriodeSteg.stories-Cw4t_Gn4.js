import{j as F}from"./VStack-Bypcsavb.js";import{a as V}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as q,P as w,C as p}from"./usePlanleggerNavigator-CxWpgFWI.js";import{P as z}from"./routes-Cp-2uEwO.js";import{i as Q,A as r}from"./Arbeidssituasjon-DYW0AKuv.js";import{S as t}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-BrvxP9lU.js";import"./Label-DrVT6kL1.js";import{H as m}from"./HvorLangPeriodeSteg-yq0ZWs6Z.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-DvorYMl9.js";import"./index-BRV0Se7Z.js";import"./BlueRadioGroup-QOHHAivH.js";import"./StepButtonsHookForm-DfQPjeBl.js";import"./Calendar-CdedEl02.js";import"./index-CYM-y3Gt.js";import"./Responsive-CMY18hyE.js";import"./ArrowLeft-C03Jdrb8.js";import"./PlanleggerStepPage-BSnpvmzS.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./hvemHarRettUtils-DRb4IBc1.js";import"./useScrollBehaviour-CknwOGzw.js";import"./validation-4HO0J-zV.js";import"./PersonGroup-BZgbcndd.js";import"./Spacer-BW3tgveW.js";const n={farRundtFødsel:10,toTette:0},ce={title:"steg/HvorLangPeriodeSteg",component:m,render:({hvemPlanlegger:J,omBarnet:x,arbeidssituasjon:D,stønadskontoer:L,gåTilNesteSide:C=V("button-click")})=>(Q(),F.jsx(q,{initialEntries:[z.HVOR_LANG_PERIODE],children:F.jsx(w,{initialState:{[p.HVEM_PLANLEGGER]:J,[p.OM_BARNET]:x,[p.ARBEIDSSITUASJON]:D},onDispatch:C,children:F.jsx(m,{stønadskontoer:L})})}))},o={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-03",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},a={args:{...o.args,hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_MEDMOR},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:207},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},s={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},d={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!0,fødselsdato:"2024-07-01",erFødsel:!1,overtakelsesdato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},k={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!0,fødselsdato:"2024-01-01",erFødsel:!0,antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:250}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:200}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},i={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"2"},arbeidssituasjon:{status:r.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:n},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:n}}}},g={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}};var u,v,R;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-03',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 101
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 80
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(R=(v=o.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var T,B,E;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...FlereForsørgereEttBarnKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMedmor: 'Esther Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 207
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 165
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(E=(B=a.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var S,c,P;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 291
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(P=(c=s.parameters)==null?void 0:c.docs)==null?void 0:P.source}}};var A,f,M;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 211
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 150
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(M=(f=d.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var y,b,O;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      fødselsdato: '2024-07-01',
      erFødsel: false,
      overtakelsesdato: '2024-07-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 211
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 150
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(O=(b=l.parameters)==null?void 0:b.docs)==null?void 0:O.source}}};var j,_,U;k.parameters={...k.parameters,docs:{...(j=k.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      fødselsdato: '2024-01-01',
      erFødsel: true,
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 250
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 200
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(U=(_=k.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var K,h,H;i.parameters={...i.parameters,docs:{...(K=i.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '2'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 291
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(H=(h=i.parameters)==null?void 0:h.docs)==null?void 0:H.source}}};var N,G,I;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 101
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 80
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(I=(G=g.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};const Pe=["FlereForsørgereEttBarnKunMorHarRett","FlereForsørgereToBarn","AleneforsørgerMorEttBarn","FlereForsørgereKunFarHarRett","FlereForsørgereFarOgFarKunFar1HarRettAdopsjon","FlereForsørgereFarOgFarKunFar1HarRettFødsel","AleneforsørgerFarToBarn","FarOgFarBeggeHarRett"];export{i as AleneforsørgerFarToBarn,s as AleneforsørgerMorEttBarn,g as FarOgFarBeggeHarRett,o as FlereForsørgereEttBarnKunMorHarRett,l as FlereForsørgereFarOgFarKunFar1HarRettAdopsjon,k as FlereForsørgereFarOgFarKunFar1HarRettFødsel,d as FlereForsørgereKunFarHarRett,a as FlereForsørgereToBarn,Pe as __namedExportsOrder,ce as default};
