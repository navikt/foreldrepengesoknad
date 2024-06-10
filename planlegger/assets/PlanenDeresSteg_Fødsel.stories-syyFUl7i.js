import{j as c}from"./jsx-runtime-_e34SzbC.js";import{a as Re}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as ve,P as ce,C as d}from"./usePlanleggerNavigator-Cc6QDZDj.js";import{P as Oe}from"./routes-Cp-2uEwO.js";import{A as n,i as Ee}from"./Arbeidssituasjon-rAW6RSqH.js";import{D as xe}from"./Dekningsgrad-Bg_cIyqc.js";import{S as t}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as e}from"./uttakUtils-Bfxqkahw.js";import{P as ie}from"./PlanenDeresSteg-BI7Uyk4U.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./dayjs.min-Dkhc0ShP.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils--_TJ2jyJ.js";import"./amplitude.esm-BThBy0fb.js";import"./isoWeek-BYZtqGCG.js";import"./Infobox-4DkbJ68c.js";import"./IconCircleWrapper-C8foAhsL.js";import"./Box-DGewKQma.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./VStack-DzX3uTsq.js";import"./Label-DFEFJLqZ.js";import"./Calendar-vEapWlHS.js";import"./kalenderPerioderUtils-9-7Eb4xW.js";import"./index-Bomzi5Jd.js";import"./tslib.es6-pJfR_DrR.js";import"./hvemHarRettUtils-DP-A7Fyr.js";import"./CalendarIconLabel-D3VA8mep.js";import"./useId-DbilmxAP.js";import"./FamiliehendelseLabel-DWk2u28k.js";import"./PlanleggerStepPage-CG-Vt2ZG.js";import"./GreenHeading-B5QLwpFd.js";import"./infobox.module-COlA9bH3.js";import"./links-B0sJFGJm.js";import"./Button-DG980N3E.js";import"./useId-BuMKUBu9.js";import"./index-Dcs0RV0A.js";import"./ChevronDown-CcwFV5Ek.js";import"./PlanleggerPage-BF_Tk5Tl.js";import"./FordelingSteg-DmaCJcxD.js";import"./GreenPanel-h__UB972.js";import"./StepButtonsHookForm-D9EJb97s.js";import"./Select-Dt8IwbBp.js";import"./Calendar-DfqO_VWn.js";import"./index-Cbx7Fas8.js";import"./Responsive-CUg94mp6.js";import"./ArrowLeft-CBeUisJv.js";import"./ArrowRight-BQL9b638.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Spacer-CmfZYR-2.js";import"./OmÅTilpassePlanen-DPoipxP_.js";import"./BabyWrapped-Dn1_Bla9.js";import"./PersonPregnant-Barn0uDD.js";import"./PersonGroup-DiEFwi66.js";import"./ExpansionCard-_FY0jhnH.js";import"./UforutsetteEndringer-DDxf0ia_.js";import"./Information-DnqWs4L0.js";import"./extends-CF3RwP-h.js";const s={farRundtFødsel:10,toTette:0},Pe=({gåTilNesteSide:le=Re("button-click"),hvemPlanlegger:me,fordeling:pe,hvorLangPeriode:Fe,omBarnet:ke,arbeidssituasjon:ue,stønadskontoer:Me})=>(Ee(),c.jsx(ve,{initialEntries:[Oe.PLANEN_DERES],children:c.jsx(ce,{onDispatch:le,initialState:{[d.FORDELING]:pe,[d.HVOR_LANG_PERIODE]:Fe,[d.HVEM_PLANLEGGER]:me,[d.OM_BARNET]:ke,[d.ARBEIDSSITUASJON]:ue},children:c.jsx(ie,{stønadskontoer:Me})})})),Br={title:"steg/PlanenDeresSteg/Fødsel",component:ie,render:Pe},r={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:t.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-04-11",antallBarn:"1"},fordeling:{antallUkerSøker1:0},hvorLangPeriode:{dekningsgrad:xe.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},o={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:155},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},i={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},m={args:{...o.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},p={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},F={args:{...i.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}};var O;const k={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:t.MOR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(O=o.args)==null?void 0:O.stønadskontoer}},u={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:280}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:s}}}},a={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR}}},M={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1}}},R={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0}}},v={args:{...r.args,omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-04-11",fødselsdato:"2024-04-12",antallBarn:"1"}}};var E,x,P;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-04-11',
      antallBarn: '1'
    },
    fordeling: {
      antallUkerSøker1: 0
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
}`,...(P=(x=r.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var S,f,T;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(T=(f=o.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var b,A,B;g.parameters={...g.parameters,docs:{...(b=g.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
          dager: 155
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
          dager: 210
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 160
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
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
}`,...(D=(_=l.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var K,N,h;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(h=(N=m.parameters)==null?void 0:N.docs)==null?void 0:h.source}}};var G,I,J;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(J=(I=p.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var L,C,V;F.parameters={...F.parameters,docs:{...(L=F.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(V=(C=F.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var q,w,z;k.parameters={...k.parameters,docs:{...(q=k.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(X=(W=u.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,$;a.parameters={...a.parameters,docs:{...(Y=a.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    }
  }
}`,...($=(Z=a.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ne;M.parameters={...M.parameters,docs:{...(ee=M.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    }
  }
}`,...(ne=(re=M.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var te,oe,ae;R.parameters={...R.parameters,docs:{...(te=R.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    }
  }
}`,...(ae=(oe=R.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var se,de,ge;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(ge=(de=v.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};const Hr=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","BarnetErFødtDagenEtterTermindato"];export{u as BareFarSøkerOgHarRett,k as BareMorSøkerOgHarRett,v as BarnetErFødtDagenEtterTermindato,a as FarOgFarBeggeHarRett,M as FarOgFarKunFarHarRett,R as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,i as MorOgFarKunFarHarRettMorIngenAvDisse,g as MorOgFarKunFarHarRettMorUfør,o as MorOgFarKunMorHarRett,l as MorOgMedmorBeggeHarRett,F as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,p as MorOgMedmorKunMedmorHarRettMorUfør,m as MorOgMedmorKunMorHarRett,Hr as __namedExportsOrder,Br as default};
