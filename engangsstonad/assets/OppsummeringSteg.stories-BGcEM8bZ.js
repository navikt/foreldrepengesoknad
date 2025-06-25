import{s as n,j as o,a4 as a}from"./iframe-BEE1zbdW.js";import{M as U,P as K,E as P,C as r}from"./useEsNavigator-DfTH_z0H.js";import{S as i,A as p}from"./attachmentType-DJ1vFT-G.js";import{O as f}from"./OppsummeringSteg-CnwqgZ7p.js";const{action:x}=__STORYBOOK_MODULE_ACTIONS__,e=()=>()=>(x("button-click")(),Promise.resolve()),G={erBarnetFødt:!0,antallBarn:1,fødselsdato:n().subtract(10,"day").format(a)},V={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},b={vedlegg:[]},Y={title:"steg/OppsummeringSteg",component:f,render:({sendSøknad:y,omBarnet:F=G,utenlandsopphold:_=V,senereUtenlandsopphold:D,tidligereUtenlandsopphold:h,dokumentasjon:L=b,mellomlagreOgNaviger:I})=>o.jsx("div",{id:"app",children:o.jsx(U,{initialEntries:[K.OPPSUMMERING],children:o.jsx(P,{initialState:{[r.OM_BARNET]:F,[r.UTENLANDSOPPHOLD]:_,[r.UTENLANDSOPPHOLD_SENERE]:D,[r.UTENLANDSOPPHOLD_TIDLIGERE]:h,[r.DOKUMENTASJON]:L},children:o.jsx(f,{sendSøknad:y,mellomlagreOgNaviger:I})})})})},t={args:{sendSøknad:e(),mellomlagreOgNaviger:e()}},s={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE,url:null}]},mellomlagreOgNaviger:e()}},d={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE,url:null}]},mellomlagreOgNaviger:e()}},l={args:{sendSøknad:e(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.TERMINBEKREFTELSE,skjemanummer:i.TERMINBEKREFTELSE,url:null}]},mellomlagreOgNaviger:e()}},m={args:{sendSøknad:e(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:[{fom:n().format(a),tom:n().add(100,"day").format(a),landkode:"SE"},{fom:n().add(101,"day").format(a),tom:n().add(200,"day").format(a),landkode:"DK"}],tidligereUtenlandsopphold:[{fom:n().subtract(100,"day").format(a),tom:n().format(a),landkode:"IS"}],mellomlagreOgNaviger:e()}};var g,E,u;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(u=(E=t.parameters)==null?void 0:E.docs)==null?void 0:u.source}}};var S,O,c;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
        file: {} as File,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
        url: null
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(c=(O=s.parameters)==null?void 0:O.docs)==null?void 0:c.source}}};var A,k,T;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
        file: {} as File,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
        url: null
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(T=(k=d.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var j,B,R;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
        file: {} as File,
        pending: false,
        uploaded: true,
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
        url: null
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...(R=(B=l.parameters)==null?void 0:B.docs)==null?void 0:R.source}}};var N,v,M;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(M=(v=m.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};const q=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{s as AdopsjonAvEktefellesBarn,d as AdopsjonAvEktefellesFlereBarn,t as BarnetErFodt,l as BarnetErIkkeFodt,m as HarTidligereOgFremtidigeUtenlandsopphold,q as __namedExportsOrder,Y as default};
