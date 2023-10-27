import{j as i}from"./jsx-runtime-69eee039.js";import{a as l}from"./chunk-AY7I2SME-331d03ca.js";import{j as e,k as n,i as H,I as M}from"./IntlProvider-c3cd6f2c.js";import{A as E,S as m}from"./Attachment-0260a327.js";import{w as _}from"./withRouter-e4ca5e15.js";import{E as x}from"./EsContextStorybookHelper-574cc83d.js";import{P as K,E as t}from"./useEsNavigator-464ce34d.js";import{K as F}from"./Person-12835ba1.js";import{O as y}from"./OppsummeringSteg-8f8b54a2.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./_baseToString-8992fead.js";import"./_createSet-409f46e6.js";import"./index-b3a39e30.js";const C={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:F.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},G={erBarnetFødt:!0,antallBarn:1,fødselsdatoer:[{dato:e().subtract(10,"day").format(n)}]},J={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},V={vedlegg:[]},re={title:"OppsummeringSteg",component:y,decorators:[_],parameters:{routerDecoratorInitUrl:K.OPPSUMMERING}},p=({sendSøknad:B,omBarnet:b=G,utenlandsopphold:j=J,senereUtenlandsopphold:I,tidligereUtenlandsopphold:R,dokumentasjon:v=V})=>(H(),i.jsx(M,{språkkode:"nb",children:i.jsx(x,{initialState:{[t.OM_BARNET]:b,[t.UTENLANDSOPPHOLD]:j,[t.UTENLANDSOPPHOLD_SENERE]:I,[t.UTENLANDSOPPHOLD_TIDLIGERE]:R,[t.DOKUMENTASJON]:v},children:i.jsx(y,{person:C,sendSøknad:B})})})),o=p.bind({});o.args={sendSøknad:l("button-click")};const a=p.bind({});a.args={sendSøknad:l("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const r=p.bind({});r.args={sendSøknad:l("button-click"),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const s=p.bind({});s.args={sendSøknad:l("button-click"),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.TERMINBEKREFTELSE,skjemanummer:m.TERMINBEKREFTELSE}]}};const d=p.bind({});d.args={sendSøknad:l("button-click"),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:e().format(n),tom:e().add(100,"day").format(n),landkode:"SE"},{fom:e().add(101,"day").format(n),tom:e().add(200,"day").format(n),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:e().subtract(100,"day").format(n),tom:e().format(n),landkode:"IS"}]}};var u,S,k;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
}`,...(k=(S=o.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var D,O,T;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`({
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
}`,...(T=(O=a.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var N,f,g;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`({
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
}`,...(g=(f=r.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var c,A,U;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`({
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
}`,...(U=(A=s.parameters)==null?void 0:A.docs)==null?void 0:U.source}}};var P,h,L;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`({
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
}`,...(L=(h=d.parameters)==null?void 0:h.docs)==null?void 0:L.source}}};const se=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{a as AdopsjonAvEktefellesBarn,r as AdopsjonAvEktefellesFlereBarn,o as BarnetErFodt,s as BarnetErIkkeFodt,d as HarTidligereOgFremtidigeUtenlandsopphold,se as __namedExportsOrder,re as default};
//# sourceMappingURL=OppsummeringSteg.stories-e401557e.js.map
