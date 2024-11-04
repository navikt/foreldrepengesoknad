import{j as F}from"./jsx-runtime-Cw0GR0a5.js";import{a as q}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as w,P as z,C as p}from"./usePlanleggerNavigator-DW4nnOlQ.js";import{P as Q}from"./routes-gnI_NAHe.js";import{A as r}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as t}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-D2M1HdQ9.js";import"./Label-CXFT65WO.js";import{i as W}from"./amplitude-pNT9-8Af.js";import{H as m}from"./HvorLangPeriodeSteg-C6pKtsuk.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./VStack-DXwxFTIo.js";import"./VeiviserPage-BcsEgJcv.js";import"./index-BRV0Se7Z.js";import"./BlueRadioGroup-1oBjpYRH.js";import"./StepButtonsHookForm-HVapK_lG.js";import"./Responsive-ivt31A_p.js";import"./index-BbmHap-z.js";import"./ArrowLeft-BHWdNJf4.js";import"./ArrowRight-DYX3sAmv.js";import"./customErrorFormatter-BAPWT5E-.js";import"./PlanleggerStepPage-F7Yp21t3.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-DEZIZxBd.js";import"./PersonGroup-Dm-EwGRr.js";import"./Spacer-BW3tgveW.js";const n={farRundtFødsel:10,toTette:0},Me={title:"steg/HvorLangPeriodeSteg",component:m,render:({hvemPlanlegger:J,omBarnet:x,arbeidssituasjon:D,stønadskontoer:L,gåTilNesteSide:C=q("button-click"),locale:V})=>(W(),F.jsx(w,{initialEntries:[Q.HVOR_LANG_PERIODE],children:F.jsx(z,{initialState:{[p.HVEM_PLANLEGGER]:J,[p.OM_BARNET]:x,[p.ARBEIDSSITUASJON]:D},onDispatch:C,children:F.jsx(m,{stønadskontoer:L,locale:V})})}))},o={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-03",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},a={args:{...o.args,omBarnet:{...o.args.omBarnet,antallBarn:"2"},hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_MEDMOR},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:207},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:165},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},s={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},d={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!0,fødselsdato:"2024-07-01",erFødsel:!1,overtakelsesdato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},k={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!0,fødselsdato:"2024-01-01",erFødsel:!0,antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:250}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:200}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},i={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"2"},arbeidssituasjon:{status:r.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:n},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:n}}}},g={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}};var u,v,R;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
    omBarnet: {
      ...FlereForsørgereEttBarnKunMorHarRett.args.omBarnet,
      antallBarn: '2'
    },
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
}`,...(E=(B=a.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var c,S,b;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(b=(S=s.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var P,A,f;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(f=(A=d.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var M,y,O;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(O=(y=l.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var j,_,U;k.parameters={...k.parameters,docs:{...(j=k.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
    locale: 'nb',
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
    locale: 'nb',
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
}`,...(I=(G=g.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};const ye=["FlereForsørgereEttBarnKunMorHarRett","FlereForsørgereToBarn","AleneforsørgerMorEttBarn","FlereForsørgereKunFarHarRett","FlereForsørgereFarOgFarKunFar1HarRettAdopsjon","FlereForsørgereFarOgFarKunFar1HarRettFødsel","AleneforsørgerFarToBarn","FarOgFarBeggeHarRett"];export{i as AleneforsørgerFarToBarn,s as AleneforsørgerMorEttBarn,g as FarOgFarBeggeHarRett,o as FlereForsørgereEttBarnKunMorHarRett,l as FlereForsørgereFarOgFarKunFar1HarRettAdopsjon,k as FlereForsørgereFarOgFarKunFar1HarRettFødsel,d as FlereForsørgereKunFarHarRett,a as FlereForsørgereToBarn,ye as __namedExportsOrder,Me as default};
