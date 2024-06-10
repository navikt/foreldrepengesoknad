import{j as k}from"./jsx-runtime-_e34SzbC.js";import{a as J}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as D,P as L,C as p}from"./usePlanleggerNavigator-Cc6QDZDj.js";import{P as C}from"./routes-Cp-2uEwO.js";import{A as r,i as V}from"./Arbeidssituasjon-rAW6RSqH.js";import{S as t}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as e}from"./uttakUtils-Bfxqkahw.js";import{H as h}from"./HvorLangPeriodeSteg-CYcJJtXJ.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./dayjs.min-Dkhc0ShP.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils--_TJ2jyJ.js";import"./amplitude.esm-BThBy0fb.js";import"./isoWeek-BYZtqGCG.js";import"./Infobox-4DkbJ68c.js";import"./IconCircleWrapper-C8foAhsL.js";import"./Box-DGewKQma.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./VStack-DzX3uTsq.js";import"./Label-DFEFJLqZ.js";import"./GreenRadioGroup-dZQly406.js";import"./StepButtonsHookForm-D9EJb97s.js";import"./useId-BuMKUBu9.js";import"./Button-DG980N3E.js";import"./Select-Dt8IwbBp.js";import"./useId-DbilmxAP.js";import"./ChevronDown-CcwFV5Ek.js";import"./Calendar-DfqO_VWn.js";import"./index-Cbx7Fas8.js";import"./links-B0sJFGJm.js";import"./Responsive-CUg94mp6.js";import"./ArrowLeft-CBeUisJv.js";import"./ArrowRight-BQL9b638.js";import"./infobox.module-COlA9bH3.js";import"./index-Bomzi5Jd.js";import"./tslib.es6-pJfR_DrR.js";import"./index-Dcs0RV0A.js";import"./GreenPanel-h__UB972.js";import"./PlanleggerStepPage-CG-Vt2ZG.js";import"./GreenHeading-B5QLwpFd.js";import"./PlanleggerPage-BF_Tk5Tl.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./hvemHarRettUtils-DP-A7Fyr.js";import"./useScrollBehaviour-WVMBWXos.js";import"./PersonGroup-DiEFwi66.js";import"./Spacer-CmfZYR-2.js";const n={farRundtFødsel:10,toTette:0},q=({hvemPlanlegger:N,omBarnet:H,arbeidssituasjon:I,stønadskontoer:G,gåTilNesteSide:K=J("button-click")})=>(V(),k.jsx(D,{initialEntries:[C.HVOR_LANG_PERIODE],children:k.jsx(L,{initialState:{[p.HVEM_PLANLEGGER]:N,[p.OM_BARNET]:H,[p.ARBEIDSSITUASJON]:I},onDispatch:K,children:k.jsx(h,{stønadskontoer:G})})})),Je={title:"steg/HvorLangPeriodeSteg",component:h,render:q},o={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},a={args:{...o.args,hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_MEDMOR},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},s={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}},d={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:250}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:200}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},F={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!0,fødselsdato:"2024-01-01",erFødsel:!1,overtakelsesdato:"2024-01-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:250}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:200}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},arbeidssituasjon:{status:r.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:280}],minsteretter:n},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:n}}}},i={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:n}}}};var g,m,u;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
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
          dager: 90
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
}`,...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var x,v,E;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
          dager: 90
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
}`,...(E=(v=a.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};var R,T,B;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 280
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
}`,...(B=(T=s.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var S,c,M;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
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
}`,...(M=(c=d.parameters)==null?void 0:c.docs)==null?void 0:M.source}}};var P,y,A;F.parameters={...F.parameters,docs:{...(P=F.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      fødselsdato: '2024-01-01',
      erFødsel: false,
      overtakelsesdato: '2024-01-01',
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
}`,...(A=(y=F.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var b,f,O;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
      antallBarn: '2'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 280
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
}`,...(O=(f=l.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var j,_,U;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
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
          dager: 90
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
}`,...(U=(_=i.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};const De=["FlereForsørgereEttBarnKunMorHarRett","FlereForsørgereToBarn","AleneforsørgerMorEttBarn","FlereForsørgereKunFarHarRett","FlereForsørgereFarOgFarKunFar1HarRettAdopsjon","AleneforsørgerFarToBarn","FarOgFarBeggeHarRett"];export{l as AleneforsørgerFarToBarn,s as AleneforsørgerMorEttBarn,i as FarOgFarBeggeHarRett,o as FlereForsørgereEttBarnKunMorHarRett,F as FlereForsørgereFarOgFarKunFar1HarRettAdopsjon,d as FlereForsørgereKunFarHarRett,a as FlereForsørgereToBarn,De as __namedExportsOrder,Je as default};
