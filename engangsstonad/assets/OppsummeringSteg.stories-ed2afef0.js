import{d as e,j as u}from"./fridagerUtils-35c8f66a.js";import{a as _}from"./chunk-AY7I2SME-331d03ca.js";import{A as E,S as m}from"./OmBarnet-2901dea5.js";import{P as H,I as n,i as b,E as x,b as a}from"./useEsNavigator-db4d2f83.js";import{w as K}from"./withRouter-7eddb714.js";import{O as y,K as F}from"./OppsummeringSteg-5c87a31f.js";import"./_createSet-a1fd5098.js";import"./_baseToString-53b0dbb2.js";import"./index-b613d0ba.js";import"./v4-a960c1f4.js";const p=()=>(...i)=>(_("button-click")(...i),Promise.resolve()),C={fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:F.KVINNE,fødselsdato:"1979-01-28",adresse:"Testadresse",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"}},G={erBarnetFødt:!0,antallBarn:1,fødselsdato:e().subtract(10,"day").format(n)},J={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},V={vedlegg:[]},ne={title:"OppsummeringSteg",component:y,decorators:[K],parameters:{routerDecoratorInitUrl:H.OPPSUMMERING}},l=({sendSøknad:i,omBarnet:R=G,utenlandsopphold:j=J,senereUtenlandsopphold:M,tidligereUtenlandsopphold:v,dokumentasjon:I=V})=>(b(),u.jsx(x,{initialState:{[a.OM_BARNET]:R,[a.UTENLANDSOPPHOLD]:j,[a.UTENLANDSOPPHOLD_SENERE]:M,[a.UTENLANDSOPPHOLD_TIDLIGERE]:v,[a.DOKUMENTASJON]:I},children:u.jsx(y,{person:C,sendSøknad:i})})),t=l.bind({});t.args={sendSøknad:p()};const o=l.bind({});o.args={sendSøknad:p(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const s=l.bind({});s.args={sendSøknad:p(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:m.OMSORGSOVERTAKELSE}]}};const d=l.bind({});d.args={sendSøknad:p(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.TERMINBEKREFTELSE,skjemanummer:m.TERMINBEKREFTELSE}]}};const r=l.bind({});r.args={sendSøknad:p(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:e().format(n),tom:e().add(100,"day").format(n),landkode:"SE"},{fom:e().add(101,"day").format(n),tom:e().add(200,"day").format(n),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:e().subtract(100,"day").format(n),tom:e().format(n),landkode:"IS"}]}};var D,S,O;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsDataContext initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsDataContext>;
}`,...(O=(S=t.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var T,N,g;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsDataContext initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsDataContext>;
}`,...(g=(N=o.parameters)==null?void 0:N.docs)==null?void 0:g.source}}};var f,k,A;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsDataContext initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsDataContext>;
}`,...(A=(k=s.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var c,U,h;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsDataContext initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsDataContext>;
}`,...(h=(U=d.parameters)==null?void 0:U.docs)==null?void 0:h.source}}};var L,B,P;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault
}) => {
  initAmplitude();
  return <EsDataContext initialState={{
    [EsDataType.OM_BARNET]: omBarnet,
    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
    [EsDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
    [EsDataType.DOKUMENTASJON]: dokumentasjon
  }}>
            <OppsummeringSteg person={person} sendSøknad={sendSøknad} />
        </EsDataContext>;
}`,...(P=(B=r.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};const ae=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{o as AdopsjonAvEktefellesBarn,s as AdopsjonAvEktefellesFlereBarn,t as BarnetErFodt,d as BarnetErIkkeFodt,r as HarTidligereOgFremtidigeUtenlandsopphold,ae as __namedExportsOrder,ne as default};
//# sourceMappingURL=OppsummeringSteg.stories-ed2afef0.js.map
