import{j as k}from"./jsx-runtime-Cw0GR0a5.js";import{a as c}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as H,B as o}from"./Uttaksplan-BNLrPXqp.js";import{S as Q}from"./sivilstandType-DxfjzFEG.js";import"./Uttaksdagen-Uuolrvsk.js";import{F as V,C as m}from"./FpDataContext-DbGuQRR8.js";import{M as W,S as X}from"./useFpNavigator-DfIqg2gN.js";import{A as g}from"./AnnenForelderSteg-BCC-V8NL.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Label-DlDsESPM.js";import"./iframe-DX-DcUCh.js";import"../sb-preview/runtime.js";import"./links-DsaZ4ja0.js";import"./VStack-CrTlUGgl.js";import"./index-CYM-y3Gt.js";import"./index-BRV0Se7Z.js";import"./_baseAssignValue-BQNUR2Ll.js";import"./_overArg-BaVEvwpy.js";import"./ErrorSummaryHookForm-Du_dc4Cz.js";import"./barnUtils-D91UoMPO.js";import"./RegistrertePersonalia-Jum2Vimg.js";import"./BabyWrapped-BOgBzqLZ.js";const Z=()=>(...p)=>(c("button-click")(...p),Promise.resolve()),n={fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]},On={component:g,render:({søkersituasjon:p={situasjon:"fødsel",rolle:"mor"},barn:J={type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},annenForelder:q,gåTilNesteSide:w=c("button-click"),...z})=>(H(),k.jsx(W,{initialEntries:[X.ANNEN_FORELDER],children:k.jsx(V,{onDispatch:w,initialState:{[m.SØKERSITUASJON]:p,[m.OM_BARNET]:J,[m.ANNEN_FORELDER]:q},children:k.jsx(g,{...z})})}))},a={args:{barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkerInfo:{søker:n,arbeidsforhold:[]},mellomlagreSøknadOgNaviger:Z(),avbrytSøknad:c("button-click")}},r={args:{...a.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{kanIkkeOppgis:!1}}},t={args:{...r.args,søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]},annenForelder:{fornavn:"annen forelder",kanIkkeOppgis:!1}}},l={args:{...r.args,søkerInfo:{søker:{...n,barn:[{fornavn:"Ben",annenForelder:{fnr:"999999999",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"}}]},arbeidsforhold:[]},annenForelder:{fornavn:"Tom",fnr:"123456789",kanIkkeOppgis:!1}}},d={args:{...r.args,barn:{type:o.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,fnr:["21091981146"]},søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}]},arbeidsforhold:[]},annenForelder:void 0}},e={args:{...r.args,barn:{type:o.UFØDT,antallBarn:1,termindato:"2023-05-05"},annenForelder:{kanIkkeOppgis:!1},søkerInfo:{søker:{...n,barn:[]},arbeidsforhold:[]}}},i={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},søkerInfo:{søker:{...n,kjønn:"K",barn:[]},arbeidsforhold:[]}}},s={args:{...e.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[]},arbeidsforhold:[]}}},f={args:{...s.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{søker:{...n,fornavn:"LEALAUS",etternavn:"BÆREPOSE",kjønn:"M",barn:[],sivilstand:{type:Q.GIFT}},arbeidsforhold:[]}}};var u,S,F;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(F=(S=a.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var b,v,B;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(B=(v=r.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var E,O,T;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(T=(O=t.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var A,I,j;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...SkalOppgiPersonalia.args,
    søkerInfo: {
      søker: {
        ...defaultSøker,
        barn: ([{
          fornavn: 'Ben',
          annenForelder: {
            fnr: '999999999',
            fødselsdato: '1985-03-12',
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE'
          }
        }] as SøkerBarn[])
      },
      arbeidsforhold: []
    },
    annenForelder: {
      fornavn: 'Tom',
      fnr: '123456789',
      kanIkkeOppgis: false
    }
  }
}`,...(j=(I=l.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var L,U,P;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(P=(U=d.parameters)==null?void 0:U.docs)==null?void 0:P.source}}};var M,y,h;e.parameters={...e.parameters,docs:{...(M=e.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(h=(y=e.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var N,R,D;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(D=(R=i.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var K,G,x;s.parameters={...s.parameters,docs:{...(K=s.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(x=(G=s.parameters)==null?void 0:G.docs)==null?void 0:x.source}}};var _,C,Y;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(Y=(C=f.parameters)==null?void 0:C.docs)==null?void 0:Y.source}}};const Tn=["AnnenForelderFraOppgittBarn","SkalOppgiPersonalia","SkalOppgiPersonaliaNavnMangler","SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike","ForFar","MorUfødtBarn","MedmorUfødtBarn","FarUfødtBarn","FarGiftUfødtBarn"];export{a as AnnenForelderFraOppgittBarn,f as FarGiftUfødtBarn,s as FarUfødtBarn,d as ForFar,i as MedmorUfødtBarn,e as MorUfødtBarn,r as SkalOppgiPersonalia,l as SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike,t as SkalOppgiPersonaliaNavnMangler,Tn as __namedExportsOrder,On as default};
