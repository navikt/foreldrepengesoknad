import{s as n,j as o,a3 as a}from"./iframe-BvA25SOq.js";import{M as U,P as K,E as P,C as r}from"./useEsNavigator-BD0NlNbO.js";import{S as p,A as f}from"./attachmentType-DJ1vFT-G.js";import{O as g}from"./OppsummeringSteg-mAzwx9qT.js";const{action:x}=__STORYBOOK_MODULE_ACTIONS__,e=()=>(...i)=>(x("button-click")(...i),Promise.resolve()),G={erBarnetFødt:!0,antallBarn:1,fødselsdato:n().subtract(10,"day").format(a)},V={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},b={vedlegg:[]},Y={title:"steg/OppsummeringSteg",component:g,render:({sendSøknad:i,omBarnet:_=G,utenlandsopphold:D=V,senereUtenlandsopphold:F,tidligereUtenlandsopphold:h,dokumentasjon:L=b,mellomlagreOgNaviger:I})=>o.jsx("div",{id:"app",children:o.jsx(U,{initialEntries:[K.OPPSUMMERING],children:o.jsx(P,{initialState:{[r.OM_BARNET]:_,[r.UTENLANDSOPPHOLD]:D,[r.UTENLANDSOPPHOLD_SENERE]:F,[r.UTENLANDSOPPHOLD_TIDLIGERE]:h,[r.DOKUMENTASJON]:L},children:o.jsx(g,{sendSøknad:i,mellomlagreOgNaviger:I})})})})},t={args:{sendSøknad:e(),mellomlagreOgNaviger:e()}},s={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:f.OMSORGSOVERTAKELSE,skjemanummer:p.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},d={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:f.OMSORGSOVERTAKELSE,skjemanummer:p.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},l={args:{sendSøknad:e(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:f.TERMINBEKREFTELSE,skjemanummer:p.TERMINBEKREFTELSE}]},mellomlagreOgNaviger:e()}},m={args:{sendSøknad:e(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:[{fom:n().format(a),tom:n().add(100,"day").format(a),landkode:"SE"},{fom:n().add(101,"day").format(a),tom:n().add(200,"day").format(a),landkode:"DK"}],tidligereUtenlandsopphold:[{fom:n().subtract(100,"day").format(a),tom:n().format(a),landkode:"IS"}],mellomlagreOgNaviger:e()}};var E,S,u;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(u=(S=t.parameters)==null?void 0:S.docs)==null?void 0:u.source}}};var O,c,A;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    omBarnet: {
      adopsjonAvEktefellesBarn: true,
      antallBarn: 1,
      adopsjonsdato: '2023-01-01',
      fødselsdatoer: [{
        dato: '2023-01-01'
      }]
    },
    dokumentasjon: {
      vedlegg: [{
        id: '1',
        filename: 'filnavn.pdf',
        filesize: 2323,
        file: {} as any,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(A=(c=s.parameters)==null?void 0:c.docs)==null?void 0:A.source}}};var k,T,j;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    omBarnet: {
      adopsjonAvEktefellesBarn: true,
      antallBarn: 1,
      adopsjonsdato: '2023-01-01',
      fødselsdatoer: [{
        dato: '2023-01-01'
      }, {
        dato: '2020-01-01'
      }]
    },
    dokumentasjon: {
      vedlegg: [{
        id: '1',
        filename: 'filnavn.pdf',
        filesize: 2323,
        file: {} as any,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(j=(T=d.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var B,R,N;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    omBarnet: {
      erBarnetFødt: false,
      antallBarn: 1,
      termindato: '2023-01-02'
    },
    dokumentasjon: {
      terminbekreftelsedato: '2023-01-01',
      vedlegg: [{
        id: '1',
        filename: 'filnavn.pdf',
        filesize: 2323,
        file: {} as any,
        pending: false,
        uploaded: true,
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(N=(R=l.parameters)==null?void 0:R.docs)==null?void 0:N.source}}};var v,M,y;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    utenlandsopphold: {
      harBoddUtenforNorgeSiste12Mnd: true,
      skalBoUtenforNorgeNeste12Mnd: true
    },
    senereUtenlandsopphold: [{
      fom: dayjs().format(ISO_DATE_FORMAT),
      tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
      landkode: 'SE'
    }, {
      fom: dayjs().add(101, 'day').format(ISO_DATE_FORMAT),
      tom: dayjs().add(200, 'day').format(ISO_DATE_FORMAT),
      landkode: 'DK'
    }],
    tidligereUtenlandsopphold: [{
      fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
      tom: dayjs().format(ISO_DATE_FORMAT),
      landkode: 'IS'
    }],
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(y=(M=m.parameters)==null?void 0:M.docs)==null?void 0:y.source}}};const q=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{s as AdopsjonAvEktefellesBarn,d as AdopsjonAvEktefellesFlereBarn,t as BarnetErFodt,l as BarnetErIkkeFodt,m as HarTidligereOgFremtidigeUtenlandsopphold,q as __namedExportsOrder,Y as default};
