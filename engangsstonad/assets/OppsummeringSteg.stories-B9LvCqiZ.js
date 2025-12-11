import{D as n,j as o,ag as a}from"./iframe-DOqWz-4m.js";import{M as A,P as k,E as j,C as r}from"./useEsNavigator-JUCI8XJR.js";import{S as i,A as p}from"./attachmentType-DJ1vFT-G.js";import{O as g}from"./OppsummeringSteg-CIw8oNQb.js";import"./preload-helper-PPVm8Dsz.js";const{action:B}=__STORYBOOK_MODULE_ACTIONS__,e=()=>()=>(B("button-click")(),Promise.resolve()),R={erBarnetFødt:!0,antallBarn:1,fødselsdato:n().subtract(9,"day").format(a),termindato:n().subtract(10,"day").format(a)},y={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},N={vedlegg:[]},D={title:"steg/OppsummeringSteg",component:g,render:({sendSøknad:f,omBarnet:E=R,utenlandsopphold:S=y,senereUtenlandsopphold:O,tidligereUtenlandsopphold:u,dokumentasjon:c=N,mellomlagreOgNaviger:T})=>o.jsx("div",{id:"app",children:o.jsx(A,{initialEntries:[k.OPPSUMMERING],children:o.jsx(j,{initialState:{[r.OM_BARNET]:E,[r.UTENLANDSOPPHOLD]:S,[r.UTENLANDSOPPHOLD_SENERE]:O,[r.UTENLANDSOPPHOLD_TIDLIGERE]:u,[r.DOKUMENTASJON]:c},children:o.jsx(g,{sendSøknad:f,mellomlagreOgNaviger:T})})})})},t={args:{sendSøknad:e(),mellomlagreOgNaviger:e()}},s={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,innsendingsType:"LASTET_OPP",uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},d={args:{sendSøknad:e(),omBarnet:{adopsjonAvEktefellesBarn:!0,antallBarn:1,adopsjonsdato:"2023-01-01",fødselsdatoer:[{dato:"2023-01-01"},{dato:"2020-01-01"}]},dokumentasjon:{vedlegg:[{id:"1",filename:"filnavn.pdf",innsendingsType:"LASTET_OPP",filesize:2323,file:{},pending:!1,uploaded:!0,type:p.OMSORGSOVERTAKELSE,skjemanummer:i.OMSORGSOVERTAKELSE}]},mellomlagreOgNaviger:e()}},l={args:{sendSøknad:e(),omBarnet:{erBarnetFødt:!1,antallBarn:1,termindato:"2023-01-02"},dokumentasjon:{terminbekreftelsedato:"2023-01-01",vedlegg:[{id:"1",filename:"filnavn.pdf",filesize:2323,file:{},pending:!1,innsendingsType:"LASTET_OPP",uploaded:!0,type:p.TERMINBEKREFTELSE,skjemanummer:i.TERMINBEKREFTELSE}]},mellomlagreOgNaviger:e()}},m={args:{sendSøknad:e(),utenlandsopphold:{harBoddUtenforNorgeSiste12Mnd:!0,skalBoUtenforNorgeNeste12Mnd:!0},senereUtenlandsopphold:[{fom:n().format(a),tom:n().add(100,"day").format(a),landkode:"SE"},{fom:n().add(101,"day").format(a),tom:n().add(200,"day").format(a),landkode:"DK"}],tidligereUtenlandsopphold:[{fom:n().subtract(100,"day").format(a),tom:n().format(a),landkode:"IS"}],mellomlagreOgNaviger:e()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    sendSøknad: promiseAction(),
    mellomlagreOgNaviger: promiseAction()
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
        innsendingsType: 'LASTET_OPP',
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
        innsendingsType: 'LASTET_OPP',
        filesize: 2323,
        file: {} as File,
        pending: false,
        uploaded: true,
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
        innsendingsType: 'LASTET_OPP',
        uploaded: true,
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE
      }]
    },
    mellomlagreOgNaviger: promiseAction()
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const P=["BarnetErFodt","AdopsjonAvEktefellesBarn","AdopsjonAvEktefellesFlereBarn","BarnetErIkkeFodt","HarTidligereOgFremtidigeUtenlandsopphold"];export{s as AdopsjonAvEktefellesBarn,d as AdopsjonAvEktefellesFlereBarn,t as BarnetErFodt,l as BarnetErIkkeFodt,m as HarTidligereOgFremtidigeUtenlandsopphold,P as __namedExportsOrder,D as default};
