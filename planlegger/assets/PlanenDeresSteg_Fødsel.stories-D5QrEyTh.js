import{j as c}from"./jsx-runtime-Cw0GR0a5.js";import{a as Re}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as ve,P as ce,C as d}from"./usePlanleggerNavigator-jDt0wNwG.js";import{P as Oe}from"./routes-Cp-2uEwO.js";import{A as n,i as Ee}from"./Arbeidssituasjon-CAHwRJI2.js";import{D as xe}from"./Dekningsgrad-Bg_cIyqc.js";import{S as t}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-OWE-GiZC.js";import"./Label-Gfmvfmi8.js";import{P as ie}from"./PlanenDeresSteg-BC9CUMsH.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-DVjx-NGR.js";import"./VStack-BOynvu-T.js";import"./index-BRV0Se7Z.js";import"./tslib.es6-pJfR_DrR.js";import"./kalenderPerioderUtils-D21Rn_hm.js";import"./hvemHarRettUtils-tzuypzxl.js";import"./CalendarIconLabel-DLHk2Wi7.js";import"./FamiliehendelseLabel-B_I5S8Sy.js";import"./PlanleggerStepPage-BRIf6pRN.js";import"./FordelingSteg-BO6l_HPZ.js";import"./StepButtonsHookForm-BYB95tLj.js";import"./Calendar-BSTiMy7q.js";import"./index-9r8iugjR.js";import"./Responsive-CQFMNo-p.js";import"./ArrowLeft-KWMC2j3U.js";import"./useScrollBehaviour-CRQH3sGQ.js";import"./validation-4HO0J-zV.js";import"./Spacer-BW3tgveW.js";import"./OmÅTilpassePlanen-mo1P-JWh.js";import"./BabyWrapped-BEcH1H8s.js";import"./PersonPregnant-CmbINfC2.js";import"./PersonGroup-D_DyOkqX.js";import"./ExpansionCard-By81LWUv.js";import"./UforutsetteEndringer-Dq51YtlK.js";import"./Information-3Bc-kubE.js";const s={farRundtFødsel:10,toTette:0},Pe=({gåTilNesteSide:le=Re("button-click"),hvemPlanlegger:Fe,fordeling:me,hvorLangPeriode:pe,omBarnet:ke,arbeidssituasjon:ue,stønadskontoer:Me})=>(Ee(),c.jsx(ve,{initialEntries:[Oe.PLANEN_DERES],children:c.jsx(ce,{onDispatch:le,initialState:{[d.FORDELING]:me,[d.HVOR_LANG_PERIODE]:pe,[d.HVEM_PLANLEGGER]:Fe,[d.OM_BARNET]:ke,[d.ARBEIDSSITUASJON]:ue},children:c.jsx(ie,{stønadskontoer:Me})})})),gr={title:"steg/PlanenDeresSteg/Fødsel",component:ie,render:Pe},r={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:t.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-01",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:xe.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},a={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:166},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},i={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},F={args:{...a.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},m={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},p={args:{...i.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}};var O;const k={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:t.MOR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(O=a.args)==null?void 0:O.stønadskontoer}},u={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:s}}}},o={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR}}},M={args:{...o.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1}}},R={args:{...o.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0}}},v={args:{...r.args,omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-04-11",fødselsdato:"2024-04-12",antallBarn:"1"}}};var E,x,P;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-07-01',
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
}`,...(P=(x=r.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var S,f,T;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
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
}`,...(T=(f=a.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var b,A,B;g.parameters={...g.parameters,docs:{...(b=g.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 166
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 95
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 125
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 75
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(B=(A=g.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var H,j,y;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
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
}`,...(y=(j=i.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var U,_,D;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(D=(_=l.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var K,N,h;F.parameters={...F.parameters,docs:{...(K=F.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(h=(N=F.parameters)==null?void 0:N.docs)==null?void 0:h.source}}};var G,I,J;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(J=(I=m.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var L,C,V;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(V=(C=p.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var q,w,z;k.parameters={...k.parameters,docs:{...(q=k.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      type: Situasjon.MOR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    },
    stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer
  }
}`,...(z=(w=k.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var Q,W,X;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.FAR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
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
}`,...(X=(W=u.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,$;o.parameters={...o.parameters,docs:{...(Y=o.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    }
  }
}`,...($=(Z=o.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ne;M.parameters={...M.parameters,docs:{...(ee=M.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    }
  }
}`,...(ne=(re=M.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var te,ae,oe;R.parameters={...R.parameters,docs:{...(te=R.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    }
  }
}`,...(oe=(ae=R.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var se,de,ge;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-04-11',
      fødselsdato: '2024-04-12',
      antallBarn: '1'
    }
  }
}`,...(ge=(de=v.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};const ir=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","BarnetErFødtDagenEtterTermindato"];export{u as BareFarSøkerOgHarRett,k as BareMorSøkerOgHarRett,v as BarnetErFødtDagenEtterTermindato,o as FarOgFarBeggeHarRett,M as FarOgFarKunFarHarRett,R as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,i as MorOgFarKunFarHarRettMorIngenAvDisse,g as MorOgFarKunFarHarRettMorUfør,a as MorOgFarKunMorHarRett,l as MorOgMedmorBeggeHarRett,p as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,m as MorOgMedmorKunMedmorHarRettMorUfør,F as MorOgMedmorKunMorHarRett,ir as __namedExportsOrder,gr as default};
