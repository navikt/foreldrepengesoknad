import{j as S}from"./index-0dcb57ee.js";import{a as v}from"./chunk-AY7I2SME-331d03ca.js";import{A as E,S as m}from"./attachmentApi-249da397.js";import{P as I,o as e,I as n,i as _,g as t}from"./useEsNavigator-60ac581c.js";import{w as x}from"./withRouter-11978fbf.js";import{E as K}from"./EsContextStorybookHelper-674339d0.js";import{O as P,K as F}from"./Person-7b6be2f6.js";import"./index-7c191284.js";import"./tslib.es6-c380bd65.js";import"./v4-a960c1f4.js";import"./index-b3a39e30.js";import"./_baseToString-8992fead.js";import"./_createSet-216b1892.js";const p=()=>(...i)=>(v("button-click")(...i),Promise.resolve()),C={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:F.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},G={erBarnetFødt:!0,antallBarn:1,fødselsdato:e().subtract(10,"day").format(n)},J={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},V={vedlegg:[]},oe={title:"OppsummeringSteg",component:P,decorators:[x],parameters:{routerDecoratorInitUrl:I.OPPSUMMERING}},l=({sendSøknad:i,omBarnet:R=G,utenlandsopphold:j=J,senereUtenlandsopphold:H,tidligereUtenlandsopphold:b,dokumentasjon:M=V})=>(_(),S.jsx(K,{initialState:{[t.OM_BARNET]:R,[t.UTENLANDSOPPHOLD]:j,[t.UTENLANDSOPPHOLD_SENERE]:H,[t.UTENLANDSOPPHOLD_TIDLIGERE]:b,[t.DOKUMENTASJON]:M},children:S.jsx(P,{person:C,sendSøknad:i})})),a=l.bind({});a.args={sendSøknad:p()};const o=l.bind({});o.args={sendSøknad:p(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const s=l.bind({});s.args={sendSøknad:p(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const r=l.bind({});r.args={sendSøknad:p(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.TERMINBEKREFTELSE,skjemanummer:m.TERMINBEKREFTELSE}]}};const d=l.bind({});d.args={sendSøknad:p(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:e().format(n),tom:e().add(100,"day").format(n),landkode:"SE"},{fom:e().add(101,"day").format(n),tom:e().add(200,"day").format(n),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:e().subtract(100,"day").format(n),tom:e().format(n),landkode:"IS"}]}};var u,D,O;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsContextStorybookHelper initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsContextStorybookHelper>;
}`,...(O=(D=a.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var T,k,N;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsContextStorybookHelper initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsContextStorybookHelper>;
}`,...(N=(k=o.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var g,f,A;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsContextStorybookHelper initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsContextStorybookHelper>;
}`,...(A=(f=s.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var c,U,h;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsContextStorybookHelper initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsContextStorybookHelper>;
}`,...(h=(U=r.parameters)==null?void 0:U.docs)==null?void 0:h.source}}};var L,y,B;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsContextStorybookHelper initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsContextStorybookHelper>;
}`,...(B=(y=d.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};const se=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{o as AdopsjonAvEktefellesBarn,s as AdopsjonAvEktefellesFlereBarn,a as BarnetErFodt,r as BarnetErIkkeFodt,d as HarTidligereOgFremtidigeUtenlandsopphold,se as __namedExportsOrder,oe as default};
//# sourceMappingURL=OppsummeringSteg.stories-cda72bef.js.map
