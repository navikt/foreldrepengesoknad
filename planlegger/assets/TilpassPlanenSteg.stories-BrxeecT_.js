import{j as c}from"./jsx-runtime-CLpGMVip.js";import{a as ce}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as Oe,P as Pe,C as a}from"./usePlanleggerNavigator-A72G1pfO.js";import{P as fe}from"./routes-Cyl7_Mgv.js";import{A as n}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as Te}from"./Dekningsgrad-Bg_cIyqc.js";import{S as e}from"./KvoteOppsummering-bXhHuqXr.js";import"./VeiviserPage-CZP2D-AH.js";import{H as t}from"./HvemPlanleggerType-CugjyLV2.js";import{T as O}from"./TilpassPlanenSteg-CIKLAZko.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./HvemPlanleggerUtils-DVSnR1d3.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-icZA41Ug.js";import"./barnType-CnRI8jWg.js";import"./StepButtonsHookForm-Dugejak8.js";import"./VStack-2apmvZh_.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-B-Uwxu87.js";import"./validation-DYlyn1BB.js";import"./dateFormValidation-ZTysAgMu.js";import"./Briefcase-Dm7XPCF2.js";import"./ExpansionCard-X3_Md0Rz.js";import"./Checkmark-DkUBrDzq.js";import"./Exclamationmark-BUUUNLix.js";import"./hvemHarRettUtils-PL84_TMj.js";import"./uttakUtils-COdd5nxs.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./UttaksplanKalender-LmM9Ux3m.js";import"./iframe-BtEAGwgD.js";import"./CalendarLabels-bGrsRtya.js";import"./CalendarIconLabel-BOJSa9tn.js";import"./BarnehageplassSteg-CYt4O24N.js";import"./PlanleggerStepPage-C5NEoUlk.js";import"./BabyWrapped-DCZKpL80.js";import"./Information-QBdnpqYL.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FamiliehendelseLabel-CdR4AZND.js";import"./ToggleGroup-DsDSs3oZ.js";import"./HvaErMulig-BKCTGDf1.js";import"./PersonPregnant-D17zo54f.js";import"./PencilWriting-BJaABnDH.js";import"./PersonGroup-B--Zxy9X.js";const s={farRundtFødsel:10,toTette:0},Mr={title:"steg/TilpassPlanenSteg",component:O,render:({gåTilNesteSide:ie=ce("button-click"),hvemPlanlegger:le,fordeling:pe,hvorLangPeriode:me,omBarnet:ke,arbeidssituasjon:ue,stønadskontoer:Fe,locale:Me,uttaksplan:Re,originalUttaksplan:ve})=>c.jsx(Oe,{initialEntries:[fe.PLANEN_DERES],children:c.jsx(Pe,{onDispatch:ie,initialState:{[a.FORDELING]:pe,[a.HVOR_LANG_PERIODE]:me,[a.HVEM_PLANLEGGER]:le,[a.OM_BARNET]:ke,[a.ARBEIDSSITUASJON]:ue,[a.UTTAKSPLAN]:[Re],[a.ORIGINAL_UTTAKSPLAN]:[ve]},children:c.jsx(O,{stønadskontoer:Fe,locale:Me})})})},r={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:t.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-01",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:Te.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}},uttaksplan:[],originalUttaksplan:[]}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},d={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:166},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},i={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},p={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},m={args:{...d.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},k={args:{...i.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},u={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:t.MOR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0}}},F={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:s}}}},o={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR}}},M={args:{...o.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1}}},R={args:{...o.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0}}},v={args:{...r.args,omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-04-11",fødselsdato:"2024-04-12",antallBarn:"1"}}};var P,f,T;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
    },
    uttaksplan: [],
    originalUttaksplan: []
  }
}`,...(T=(f=r.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var E,S,H;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(H=(S=g.parameters)==null?void 0:S.docs)==null?void 0:H.source}}};var b,A,B;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(B=(A=d.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var y,U,j;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(j=(U=i.parameters)==null?void 0:U.docs)==null?void 0:j.source}}};var _,D,K;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(K=(D=l.parameters)==null?void 0:D.docs)==null?void 0:K.source}}};var N,I,h;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(h=(I=p.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};var G,J,L;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(L=(J=m.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};var x,C,V;k.parameters={...k.parameters,docs:{...(x=k.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(V=(C=k.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var q,w,z;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      type: HvemPlanleggerType.MOR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    }
  }
}`,...(z=(w=u.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var Q,W,X;F.parameters={...F.parameters,docs:{...(Q=F.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
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
}`,...(X=(W=F.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,$;o.parameters={...o.parameters,docs:{...(Y=o.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
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
}`,...(oe=(ae=R.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var se,ge,de;v.parameters={...v.parameters,docs:{...(se=v.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(de=(ge=v.parameters)==null?void 0:ge.docs)==null?void 0:de.source}}};const Rr=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","BarnetErFødtDagenEtterTermindato"];export{F as BareFarSøkerOgHarRett,u as BareMorSøkerOgHarRett,v as BarnetErFødtDagenEtterTermindato,o as FarOgFarBeggeHarRett,M as FarOgFarKunFarHarRett,R as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,i as MorOgFarKunFarHarRettMorIngenAvDisse,d as MorOgFarKunFarHarRettMorUfør,g as MorOgFarKunMorHarRett,l as MorOgMedmorBeggeHarRett,k as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,m as MorOgMedmorKunMedmorHarRettMorUfør,p as MorOgMedmorKunMorHarRett,Rr as __namedExportsOrder,Mr as default};
