import{i as E,j as t}from"./iframe-CiBBIibO.js";import{h as d,H as u}from"./index-Bx2ZTO5x.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-BQlYPBSj.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-BwtDIuMi.js";import"./useBackgroundColor-D5OPZaMp.js";import"./useSelectedSak-DmONFILP.js";import"./useQuery-Br7n5B-n.js";import"./api-Cu_i9nXP.js";import"./sakerUtils-D9CItECY.js";import"./Snarveier-f02VCDem.js";import"./LenkePanel-Dvq3RSsR.js";import"./Dokument-CSD-biYD.js";import"./dokumenterUtils-DkmFLu0M.js";import"./Tag-b1OeqJc3.js";import"./GrupperteDokumenter-CPjmt8xs.js";import"./guid-CsArkN6i.js";import"./Header-kbDqfvO0.js";import"./LayoutWrapper-CLy-ITXw.js";import"./StatusTag-CdxCSvKu.js";import"./Stroller-zxJ8LX8x.js";import"./NoeGikkGalt-B4AW46ex.js";import"./MinidialogSkjema--9YeLYHl.js";import"./skjemanummer-sUU-81t8.js";import"./BekreftelseSendtSøknad-DOqvm4GC.js";import"./KontonummerInfo-CITP48uy.js";import"./HarIkkeSaker-BNmVYppg.js";import"./SøkelenkerPanel-CgYrwgrn.js";import"./HarSaker-CsRqq6gK.js";import"./SakLink-BGR2nJyU.js";import"./ContentSection-CHbyUyyr.js";import"./Svangerskapspenger-DrdT5nXk.js";import"./DinPlan-CTucwqjP.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-BBTdjTto.js";import"./OppgaveLenkepanel-BzUjlSpH.js";import"./KontaktOss-DJvigY4g.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 200
        });
      })]
    }
  },
  args: {
    saker: {
      engangsstønad: [{
        ytelse: 'ENGANGSSTØNAD',
        saksnummer: '1',
        sakAvsluttet: false,
        gjelderAdopsjon: false,
        familiehendelse: {
          fødselsdato: '2020-01-01',
          antallBarn: 1
        },
        oppdatertTidspunkt: '2024-02-28T21:19:08.911'
      }],
      foreldrepenger: [],
      svangerskapspenger: []
    }
  }
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var i,l,g;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/engangsstonad/vedlegg\`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })]
    }
  },
  args: SkalIkkeFeileOpplasting.args
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};const ae=["SkalIkkeFeileOpplasting","SkalFeileOpplasting"];export{r as SkalFeileOpplasting,e as SkalIkkeFeileOpplasting,ae as __namedExportsOrder,ne as default};
