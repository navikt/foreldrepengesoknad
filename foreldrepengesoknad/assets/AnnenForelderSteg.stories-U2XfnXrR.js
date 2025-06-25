import{bm as o,_ as p}from"./iframe-C5y15oMk.js";import{F as H,C as k}from"./FpDataContext-IB0i85UD.js";import{M as Q,S as V}from"./useFpNavigator-DXfT-ElB.js";import{S as W}from"./sivilstandType-DxfjzFEG.js";import{A as g}from"./AnnenForelderSteg-elr97Xjk.js";import"./RegistrertePersonalia-BNJYB2Yj.js";import"./BabyWrapped-Di3N6zl3.js";import"./annenForelderUtils-lvjTX-jH.js";import"./List--KI15SmQ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,X=()=>()=>(c("button-click")(),Promise.resolve()),n={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},dn={title:"steps/AnnenForelderSteg",component:g,render:({søkersituasjon:Y={situasjon:"fødsel",rolle:"mor"},barn:J={type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:q,gåTilNesteSide:w=c("button-click"),...z})=>p.jsx(Q,{initialEntries:[V.ANNEN_FORELDER],children:p.jsx(H,{onDispatch:w,initialState:{[k.SØKERSITUASJON]:Y,[k.OM_BARNET]:J,[k.ANNEN_FORELDER]:q},children:p.jsx(g,{...z})})})},a={args:{barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkerInfo:{søker:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:X(),avbrytSøknad:c("button-click")}},r={args:{...a.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{kanIkkeOppgis:!1}}},t={args:{...r.args,søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},d={args:{...r.args,søkerInfo:{søker:{...n,barn:[{fornavn:"Ben",fnr:"1",etternavn:"Big",kjønn:"M",fødselsdato:"2021-03-15",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]},arbeidsforhold:[]},annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},l={args:{...r.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]},arbeidsforhold:[]},annenForelder:void 0}},e={args:{...r.args,barn:{type:o.UFØDT,antallBarn:1,termindato:"2023-05-05"},annenForelder:{kanIkkeOppgis:!1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]}}},f={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},søkerInfo:{søker:{...n,kjønn:"K",barn:[]},arbeidsforhold:[]}}},s={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]},arbeidsforhold:[]}}},i={args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:W.GIFT}},arbeidsforhold:[]}}};var m,u,S;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1,
      fnr: ['21091981146']
    },
    søkerInfo: {
      søker: defaultSøker,
      arbeidsforhold: []
    },
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...(S=(u=a.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var F,b,v;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...AnnenForelderFraOppgittBarn.args,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    },
    annenForelder: {
      kanIkkeOppgis: false
    }
  }
}`,...(v=(b=r.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var B,E,O;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    },
    annenForelder: {
      fornavn: 'annen forelder',
      kanIkkeOppgis: false
    }
  }
}`,...(O=(E=t.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var T,A,I;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: [{
          fornavn: 'Ben',
          fnr: '1',
          etternavn: 'Big',
          kjønn: 'M',
          fødselsdato: '2021-03-15',
          annenForelder: {
            fnr: '999999999',
            fødselsdato: '1985-03-12',
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE'
          }
        }] satisfies BarnFrontend[]
      },
      arbeidsforhold: []
    },
    annenForelder: {
      fornavn: 'Tom',
      fnr: '123456789',
      kanIkkeOppgis: false
    }
  }
}`,...(I=(A=d.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var j,L,U;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    barn: {
      type: BarnType.FØDT,
      fødselsdatoer: ['2021-03-15'],
      antallBarn: 1,
      fnr: ['21091981146']
    },
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: [{
          fnr: '21091981146',
          fødselsdato: '2021-03-15',
          annenForelder: {
            fnr: '12038517080',
            fødselsdato: '1985-03-12',
            fornavn: 'TALENTFULL',
            etternavn: 'MYGG'
          },
          fornavn: 'KLØKTIG',
          etternavn: 'MIDTPUNKT',
          kjønn: 'K'
        }]
      },
      arbeidsforhold: []
    },
    annenForelder: undefined
  }
}`,...(U=(L=l.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};var M,P,y;e.parameters={...e.parameters,docs:{...(M=e.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2023-05-05'
    },
    annenForelder: {
      kanIkkeOppgis: false
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...(y=(P=e.parameters)==null?void 0:P.docs)==null?void 0:y.source}}};var h,N,R;f.parameters={...f.parameters,docs:{...(h=f.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...MorUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'medmor'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        kjønn: 'K',
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...(R=(N=f.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var D,K,G;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...MorUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: []
      },
      arbeidsforhold: []
    }
  }
}`,...(G=(K=s.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var _,x,C;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...FarUfødtBarn.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      søker: {
        ...defaultSøker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: [],
        sivilstand: {
          type: SivilstandType.GIFT
        }
      },
      arbeidsforhold: []
    }
  }
}`,...(C=(x=i.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};const ln=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{a as AnnenForelderFraOppgittBarn,i as FarGiftUfødtBarn,s as FarUfødtBarn,l as ForFar,f as MedmorUfødtBarn,e as MorUfødtBarn,r as SkalOppgiPersonalia,d as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,t as SkalOppgiPersonaliaNavnMangler,ln as __namedExportsOrder,dn as default};
