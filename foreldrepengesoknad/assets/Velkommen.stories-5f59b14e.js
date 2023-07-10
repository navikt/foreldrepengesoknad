import{j as w}from"./jsx-runtime-670450c2.js";import{w as Gr}from"./withIntl-386fbff7.js";import{w as Dr,F as Lr}from"./ForeldrepengerStateMock-2db4abe4.js";import{D as Tr,R as Br}from"./eksisterendeSakUtils-18463ac8.js";import{w as Hr}from"./withRouter-28f7e065.js";import{V as mr}from"./Velkommen-ef2d926a.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";import"./IntlProvider-c8b29a86.js";import"./validationUtils-00d66cf2.js";import"./index-4d501b15.js";import"./Link-40b5f3c6.js";import"./clsx.m-266f4de0.js";import"./index-7e4e529b.js";import"./Label-bbf0f831.js";import"./index-96c5f47c.js";import"./extends-98964cd2.js";import"./mapSøkerinfoDTO-adbe2fb9.js";import"./getTypedFormComponents-a42e978b.js";import"./dateUtils-becbdc23.js";import"./Dekningsgrad-fced8842.js";import"./Periodene-dd720f95.js";import"./periodeUtils-1a4dc73e.js";import"./useSøknad-54892a90.js";import"./velkommenUtils-40bb4bde.js";import"./index-47edccfa.js";import"./personUtils-c468cfc0.js";import"./AnnenForelder-5c5d4f7f.js";import"./useOnValidSubmit-0d8cf87d.js";import"./api-dc1b3239.js";import"./apiInterceptor-0530a171.js";import"./useSaveLoadedRoute-352242ea.js";import"./globalUtil-9d9e0ee4.js";import"./vedleggUtils-c5e558a5.js";import"./Attachment-a8e5b8d1.js";import"./DinePlikter-c0bbb3d4.js";import"./links-b36d21ab.js";import"./DinePersonopplysningerModal-99592e53.js";import"./useSøkerinfo-4e57f087.js";var I=(r=>(r.TIDLIG_SØKNAD="VENT_TIDLIG_SØKNAD",r.VENTER_PÅ_INNTEKTSMELDING="VENT_INNTEKTSMELDING",r.VENTER_PÅ_DOKUMENTASJON="VENT_DOKUMENTASJON",r.UNDER_BEHANDLING="UNDER_BEHANDLING",r))(I||{});const Hn={title:"pages/Velkommen",component:mr,decorators:[Gr,Dr,Hr]},t={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[]}},e=({harGodkjentVilkår:r,saker:x,søkerinfo:P})=>w(Lr,{søknad:{søknad:{harGodkjentVilkår:r,søker:{språkkode:"nb"}}},søkerinfo:P,children:w(mr,{fornavn:"Espen",onChangeLocale:()=>{},locale:"nb",saker:x,fnr:"123"})}),Sr=(r,x)=>{const P=x.map(br=>({fnr:br}));return{...r,barn:P}},o=r=>({dekningsgrad:Tr.HUNDRE_PROSENT,familiehendelse:{fødselsdato:r.fødselsdato,omsorgsovertakelse:r.omsorgsovertakelse,antallBarn:r.antallBarn,termindato:r.termindato},gjeldendeVedtak:{perioder:[]},harAnnenForelderTilsvarendeRettEØS:!1,gjelderAdopsjon:r.gjelderAdopsjon,kanSøkeOmEndring:r.kanSøkeOmEndring,morUføretrygd:!1,rettighetType:Br.BEGGE_RETT,sakAvsluttet:r.sakErAvsluttet,sakTilhørerMor:!0,saksnummer:"123456",ønskerJustertUttakVedFødsel:!1,sisteSøknadMottattDato:"2022-05-06",åpenBehandling:r.åpenbehandlingTilstand!==void 0?{tilstand:r.åpenbehandlingTilstand,søknadsperioder:[]}:void 0,annenPart:{fnr:"123456789"}}),n=r=>({...t,søker:{...t.søker,barn:r}}),a="2022-12-06",Cr="2022-12-08",O={fnr:"1",fornavn:"Oriental",etternavn:"Bokhylle",fødselsdato:a,kjønn:"K"},ur={...O,dødsdato:"2022-12-07"},Er={fnr:"2",fornavn:"Vakker",etternavn:"Bokhylle",fødselsdato:a},vr={...Er,dødsdato:"2022-12-07"},A={fødselsdato:a,dødsdato:a},Fr=!1,s={type:"person",fnr:"3",fornavn:"Evig",mellomnavn:"Lykkelig",etternavn:"Vår",fødselsdato:a,kjønn:"M"},U={...s,mellomnavn:void 0,fnr:"4",fornavn:"Grønn"},Ar={...s,mellomnavn:void 0,fnr:"5",fornavn:"Sommerlig"},_=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Fr,fødselsdato:a}),hr=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:Fr,termindato:a,åpenbehandlingTilstand:I.UNDER_BEHANDLING}),Or=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:Cr,fødselsdato:a,åpenbehandlingTilstand:I.UNDER_BEHANDLING}),Ir=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!0,fødselsdato:a}),Nr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:1,sakErAvsluttet:!1,fødselsdato:a}),R=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!0,antallBarn:1,sakErAvsluttet:!1,omsorgsovertakelse:a,fødselsdato:a}),N=o({kanSøkeOmEndring:!1,gjelderAdopsjon:!1,antallBarn:2,sakErAvsluttet:!1,fødselsdato:a,åpenbehandlingTilstand:I.UNDER_BEHANDLING}),xr=Sr(N,["1","2"]),Pr=Sr(N,["1"]),Mr=o({kanSøkeOmEndring:!0,gjelderAdopsjon:!1,antallBarn:3,sakErAvsluttet:!1,fødselsdato:a}),Ur=[_,{...hr,saksnummer:"555555"}],Vr=[],k=e.bind({});k.args={harGodkjentVilkår:!1,saker:Vr,søkerinfo:t};const d=e.bind({});d.args={harGodkjentVilkår:!0,saker:Vr,søkerinfo:t};const l=e.bind({});l.args={saker:[_],søkerinfo:n([s])};const i=e.bind({});i.args={saker:[hr],søkerinfo:t};const c=e.bind({});c.args={saker:[Or],søkerinfo:n([s])};const p=e.bind({});p.args={saker:[Ir],søkerinfo:n([s])};const g=e.bind({});g.args={saker:Ur,søkerinfo:n([s])};const f=e.bind({});f.args={saker:[Nr],søkerinfo:t};const m=e.bind({});m.args={saker:[R],søkerinfo:t};const S=e.bind({});S.args={saker:[R],søkerinfo:n([s])};const u=e.bind({});u.args={saker:[N],søkerinfo:n([s,U])};const E=e.bind({});E.args={saker:[Mr],søkerinfo:n([s,U,Ar])};const _r=n([O]),jr=n([O,Er]),K=n([ur]),Rr=n([ur,vr]),Kr=n([A]),yr=n([A,A]),y=n([O,A]),wr=n([O,vr]),v=e.bind({});v.args={saker:[],søkerinfo:_r};const F=e.bind({});F.args={saker:[],søkerinfo:jr};const h=e.bind({});h.args={saker:[],søkerinfo:K};const M=e.bind({});M.args={saker:[],søkerinfo:Rr};const V=e.bind({});V.args={saker:[],søkerinfo:Kr};const j=e.bind({});j.args={saker:[],søkerinfo:yr};const b=e.bind({});b.args={saker:[],søkerinfo:y};const G=e.bind({});G.args={saker:[],søkerinfo:wr};const D=e.bind({});D.args={saker:[N],søkerinfo:y};const L=e.bind({});L.args={saker:[_],søkerinfo:K};const T=e.bind({});T.args={saker:[R],søkerinfo:K};const B=e.bind({});B.args={saker:[xr],søkerinfo:jr};const H=e.bind({});H.args={saker:[Pr],søkerinfo:y};const C=e.bind({});C.args={saker:[Mr],søkerinfo:n([s,U,A])};var J,Y,q;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(q=(Y=k.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var z,Q,W;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(W=(Q=d.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,$;l.parameters={...l.parameters,docs:{...(X=l.parameters)==null?void 0:X.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...($=(Z=l.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ne;i.parameters={...i.parameters,docs:{...(ee=i.parameters)==null?void 0:ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(ne=(re=i.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ae,se,oe;c.parameters={...c.parameters,docs:{...(ae=c.parameters)==null?void 0:ae.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(oe=(se=c.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var te,ke,de;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(de=(ke=p.parameters)==null?void 0:ke.docs)==null?void 0:de.source}}};var le,ie,ce;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(ce=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var pe,ge,fe;f.parameters={...f.parameters,docs:{...(pe=f.parameters)==null?void 0:pe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(fe=(ge=f.parameters)==null?void 0:ge.docs)==null?void 0:fe.source}}};var me,Se,ue;m.parameters={...m.parameters,docs:{...(me=m.parameters)==null?void 0:me.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(ue=(Se=m.parameters)==null?void 0:Se.docs)==null?void 0:ue.source}}};var Ee,ve,Fe;S.parameters={...S.parameters,docs:{...(Ee=S.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Fe=(ve=S.parameters)==null?void 0:ve.docs)==null?void 0:Fe.source}}};var he,Me,Ve;u.parameters={...u.parameters,docs:{...(he=u.parameters)==null?void 0:he.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ve=(Me=u.parameters)==null?void 0:Me.docs)==null?void 0:Ve.source}}};var je,be,Ge;E.parameters={...E.parameters,docs:{...(je=E.parameters)==null?void 0:je.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ge=(be=E.parameters)==null?void 0:be.docs)==null?void 0:Ge.source}}};var De,Le,Te;v.parameters={...v.parameters,docs:{...(De=v.parameters)==null?void 0:De.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Te=(Le=v.parameters)==null?void 0:Le.docs)==null?void 0:Te.source}}};var Be,He,Ce;F.parameters={...F.parameters,docs:{...(Be=F.parameters)==null?void 0:Be.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ce=(He=F.parameters)==null?void 0:He.docs)==null?void 0:Ce.source}}};var Ae,Oe,Ie;h.parameters={...h.parameters,docs:{...(Ae=h.parameters)==null?void 0:Ae.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Ie=(Oe=h.parameters)==null?void 0:Oe.docs)==null?void 0:Ie.source}}};var Ne,xe,Pe;M.parameters={...M.parameters,docs:{...(Ne=M.parameters)==null?void 0:Ne.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Pe=(xe=M.parameters)==null?void 0:xe.docs)==null?void 0:Pe.source}}};var Ue,_e,Re;V.parameters={...V.parameters,docs:{...(Ue=V.parameters)==null?void 0:Ue.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(Re=(_e=V.parameters)==null?void 0:_e.docs)==null?void 0:Re.source}}};var Ke,ye,we;j.parameters={...j.parameters,docs:{...(Ke=j.parameters)==null?void 0:Ke.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(we=(ye=j.parameters)==null?void 0:ye.docs)==null?void 0:we.source}}};var Je,Ye,qe;b.parameters={...b.parameters,docs:{...(Je=b.parameters)==null?void 0:Je.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(qe=(Ye=b.parameters)==null?void 0:Ye.docs)==null?void 0:qe.source}}};var ze,Qe,We;G.parameters={...G.parameters,docs:{...(ze=G.parameters)==null?void 0:ze.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(We=(Qe=G.parameters)==null?void 0:Qe.docs)==null?void 0:We.source}}};var Xe,Ze,$e;D.parameters={...D.parameters,docs:{...(Xe=D.parameters)==null?void 0:Xe.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...($e=(Ze=D.parameters)==null?void 0:Ze.docs)==null?void 0:$e.source}}};var er,rr,nr;L.parameters={...L.parameters,docs:{...(er=L.parameters)==null?void 0:er.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(nr=(rr=L.parameters)==null?void 0:rr.docs)==null?void 0:nr.source}}};var ar,sr,or;T.parameters={...T.parameters,docs:{...(ar=T.parameters)==null?void 0:ar.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(or=(sr=T.parameters)==null?void 0:sr.docs)==null?void 0:or.source}}};var tr,kr,dr;B.parameters={...B.parameters,docs:{...(tr=B.parameters)==null?void 0:tr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(dr=(kr=B.parameters)==null?void 0:kr.docs)==null?void 0:dr.source}}};var lr,ir,cr;H.parameters={...H.parameters,docs:{...(lr=H.parameters)==null?void 0:lr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(cr=(ir=H.parameters)==null?void 0:ir.docs)==null?void 0:cr.source}}};var pr,gr,fr;C.parameters={...C.parameters,docs:{...(pr=C.parameters)==null?void 0:pr.docs,source:{originalSource:`({
  harGodkjentVilkår,
  saker,
  søkerinfo
}) => {
  return <ForeldrepengerStateMock søknad={({
    søknad: {
      harGodkjentVilkår,
      søker: {
        språkkode: 'nb'
      }
    }
  } as ForeldrepengesøknadContextState)} søkerinfo={søkerinfo}>
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" saker={saker} fnr={'123'} />
        </ForeldrepengerStateMock>;
}`,...(fr=(gr=C.parameters)==null?void 0:gr.docs)==null?void 0:fr.source}}};const Cn=["Default","HarAlleredeLestOgForstått","HarOpprettetFPSakFødselMedBarnetIPDL","HarFPSakUnderBehandlingTermin","HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL","HarAvsluttetFPSak","HarFlereSaker","HarSakFødselUtenBarnIPDL","HarSakAdopsjonUtenBarnIPDL","HarSakAdopsjonMedBarnIPDL","HarSakFødselTvillinger","HarSakFødselTrillinger","HarIngenSakerOgEttBarn","HarIngenSakerOgTvillinger","HarIngenSakerOgEttDødtBarn","HarIngenSakerOgToDødeTvillinger","HarIngenSakerOgEtDødfødtBarn","HarIngenSakerOgToDødfødteBarn","HarIngenSakerMedEnLevendeOgEnDødfødtTvilling","HarIngenSakerMedEnLevendeOgEnDødTvilling","HarSakMedEnLevendeOgEnDødfødtTvilling","HarSakMedEtDødtBarn","HarSakAdopsjonMedEtDødtBarn","HarSakMedOppgittBarnTvillingerAlleLever","HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling","HarSakMedTrillingerEnErDød"];export{k as Default,d as HarAlleredeLestOgForstått,p as HarAvsluttetFPSak,c as HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,i as HarFPSakUnderBehandlingTermin,g as HarFlereSaker,G as HarIngenSakerMedEnLevendeOgEnDødTvilling,b as HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,V as HarIngenSakerOgEtDødfødtBarn,v as HarIngenSakerOgEttBarn,h as HarIngenSakerOgEttDødtBarn,M as HarIngenSakerOgToDødeTvillinger,j as HarIngenSakerOgToDødfødteBarn,F as HarIngenSakerOgTvillinger,l as HarOpprettetFPSakFødselMedBarnetIPDL,S as HarSakAdopsjonMedBarnIPDL,T as HarSakAdopsjonMedEtDødtBarn,m as HarSakAdopsjonUtenBarnIPDL,E as HarSakFødselTrillinger,u as HarSakFødselTvillinger,f as HarSakFødselUtenBarnIPDL,D as HarSakMedEnLevendeOgEnDødfødtTvilling,L as HarSakMedEtDødtBarn,H as HarSakMedOppgittBarnMedEnLevendeOgEnDødfødtTvilling,B as HarSakMedOppgittBarnTvillingerAlleLever,C as HarSakMedTrillingerEnErDød,Cn as __namedExportsOrder,Hn as default};
//# sourceMappingURL=Velkommen.stories-5f59b14e.js.map
