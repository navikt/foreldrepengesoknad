import{d as e,I as n,i as I,j as i}from"./dateFormValidation-CSo1Ghro.js";import{a as _}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as H,P as G,E as b,C as a}from"./useEsNavigator-DL6e_ycb.js";import{A as E,S as g}from"./OmBarnet-BV6De4cI.js";import{O as L}from"./OppsummeringSteg-YTtDtTwT.js";import"./index-CTjT7uj6.js";import"./index-BRV0Se7Z.js";import"./index-CYM-y3Gt.js";import"./v4-CQkTLCs1.js";import"./BoIUtlandetOppsummeringspunkt-BBqZ1K-p.js";import"./apiInterceptor-DfqAa4et.js";import"./ConfirmationPanel-CMnGIRc5.js";const t=()=>(...m)=>(_("button-click")(...m),Promise.resolve()),F={erBarnetFødt:!0,antallBarn:1,fødselsdato:e().subtract(10,"day").format(n)},K={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},J={vedlegg:[]},te={title:"OppsummeringSteg",component:L},p=({sendSøknad:m,omBarnet:y=F,utenlandsopphold:v=K,senereUtenlandsopphold:x,tidligereUtenlandsopphold:B,dokumentasjon:C=J,mellomlagreOgNaviger:j=t()})=>(I(),i.jsx("div",{id:"app",children:i.jsx(H,{initialEntries:[G.OPPSUMMERING],children:i.jsx(b,{initialState:{[a.OM_BARNET]:y,[a.UTENLANDSOPPHOLD]:v,[a.UTENLANDSOPPHOLD_SENERE]:x,[a.UTENLANDSOPPHOLD_TIDLIGERE]:B,[a.DOKUMENTASJON]:C},children:i.jsx(L,{sendSøknad:m,mellomlagreOgNaviger:j})})})})),o=p.bind({});o.args={sendSøknad:t()};const r=p.bind({});r.args={sendSøknad:t(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:g.OMSORGSOVERTAKELSE}]}};const d=p.bind({});d.args={sendSøknad:t(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.OMSORGSOVERTAKELSE,skjemanummer:g.OMSORGSOVERTAKELSE}]}};const s=p.bind({});s.args={sendSøknad:t(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:E.TERMINBEKREFTELSE,skjemanummer:g.TERMINBEKREFTELSE}]}};const l=p.bind({});l.args={sendSøknad:t(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:{utenlandsoppholdNeste12Mnd:[{fom:e().format(n),tom:e().add(100,"day").format(n),landkode:"SE"},{fom:e().add(101,"day").format(n),tom:e().add(200,"day").format(n),landkode:"DK"}]},tidligereUtenlandsopphold:{utenlandsoppholdSiste12Mnd:[{fom:e().subtract(100,"day").format(n),tom:e().format(n),landkode:"IS"}]}};var u,O,D;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(D=(O=o.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var S,N,T;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(T=(N=r.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var f,A,c;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(c=(A=d.parameters)==null?void 0:A.docs)==null?void 0:c.source}}};var U,P,h;s.parameters={...s.parameters,docs:{...(U=s.parameters)==null?void 0:U.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(h=(P=s.parameters)==null?void 0:P.docs)==null?void 0:h.source}}};var k,M,R;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`({
  sendSøknad,
  omBarnet = barnet,
  utenlandsopphold = utenlandsoppholdDefault,
  senereUtenlandsopphold,
  tidligereUtenlandsopphold,
  dokumentasjon = vedleggDefault,
  mellomlagreOgNaviger = promiseAction()
}) => {
  initAmplitude();
  return <div id="app">
            <MemoryRouter initialEntries={[Path.OPPSUMMERING]}>
                <EsDataContext initialState={{
        [ContextDataType.OM_BARNET]: omBarnet,
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: senereUtenlandsopphold,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: tidligereUtenlandsopphold,
        [ContextDataType.DOKUMENTASJON]: dokumentasjon
      }}>
                    <OppsummeringSteg sendSøknad={sendSøknad} mellomlagreOgNaviger={mellomlagreOgNaviger} />
                </EsDataContext>
            </MemoryRouter>
        </div>;
}`,...(R=(M=l.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};const ae=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{r as AdopsjonAvEktefellesBarn,d as AdopsjonAvEktefellesFlereBarn,o as BarnetErFodt,s as BarnetErIkkeFodt,l as HarTidligereOgFremtidigeUtenlandsopphold,ae as __namedExportsOrder,te as default};
