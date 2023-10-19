import{j as p}from"./jsx-runtime-69eee039.js";import{a as s}from"./chunk-AY7I2SME-331d03ca.js";import{I as R}from"./IntlProvider-4e33f46c.js";import{A as l,S as i}from"./Attachment-77c59016.js";import{w as j}from"./withRouter-ff9807a0.js";import{E as H}from"./EsContextStorybookHelper-cfbae3fa.js";import{E as e}from"./useEsNavigator-418925c5.js";import{K as M}from"./Person-12835ba1.js";import{P as _}from"./paths-6fc4bb0b.js";import{O as h}from"./OppsummeringSteg-652d1509.js";import{i as x}from"./amplitude-a97f1527.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./extends-2f8ee675.js";import"./index-ecbee218.js";import"./index-b3a39e30.js";import"./dateUtils-eef781fc.js";import"./StepButtons-a9eb5602.js";const K={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:M.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},F={erBarnetFødt:!0,antallBarn:1,fødselsdatoer:[{dato:"2023-01-01"}]},C={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},G={vedlegg:[]},de={title:"OppsummeringSteg",component:h,decorators:[j],parameters:{routerDecoratorInitUrl:_.OPPSUMMERING}},d=({sendSøknad:L,omBarnet:y=F,utenlandsopphold:B=C,senereUtenlandsopphold:b,tidligereUtenlandsopphold:v,dokumentasjon:I=G})=>(x(),p.jsx(R,{språkkode:"nb",children:p.jsx(H,{initialState:{[e.OM_BARNET]:y,[e.UTENLANDSOPPHOLD]:B,[e.UTENLANDSOPPHOLD_SENERE]:b,[e.UTENLANDSOPPHOLD_TIDLIGERE]:v,[e.DOKUMENTASJON]:I},children:p.jsx(h,{person:K,sendSøknad:L})})})),n=d.bind({});n.args={sendSøknad:s("button-click")};const t=d.bind({});t.args={sendSøknad:s("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:l.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]}};const o=d.bind({});o.args={sendSøknad:s("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:l.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]}};const a=d.bind({});a.args={sendSøknad:s("button-click"),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:l.TERMINBEKREFTELSE,skjemanummer:i.TERMINBEKREFTELSE}]}};const r=d.bind({});r.args={sendSøknad:s("button-click"),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:"2025-01-01",tom:"2026-01-01",landkode:"SE"},{fom:"2027-01-01",tom:"2028-01-01",landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:"2021-01-01",tom:"2022-01-01",landkode:"IS"}]}};var E,m,u;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var S,k,D;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(D=(k=t.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var O,T,N;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(N=(T=o.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var g,f,c;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(c=(f=a.parameters)==null?void 0:f.docs)==null?void 0:c.source}}};var U,A,P;r.parameters={...r.parameters,docs:{...(U=r.parameters)==null?void 0:U.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <IntlProvider språkkode="nb">
            <EsContextStorybookHelper initialState={{
      [EsDataType.OM_BARNET]: omBarnet,
      [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
      [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
      [EsDataType.DOKUMENTASJON]: dokumentasjon
    }}>
                <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
            </EsContextStorybookHelper>
        </IntlProvider>;
}`,...(P=(A=r.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};const pe=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{t as AdopsjonAvEktefellesBarn,o as AdopsjonAvEktefellesFlereBarn,n as BarnetErFodt,a as BarnetErIkkeFodt,r as HarTidligereOgFremtidigeUtenlandsopphold,pe as __namedExportsOrder,de as default};
//# sourceMappingURL=OppsummeringSteg.stories-14a67efd.js.map
