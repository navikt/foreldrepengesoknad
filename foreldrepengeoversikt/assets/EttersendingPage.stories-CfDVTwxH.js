import{i as E,j as t}from"./iframe-CIPZDtdN.js";import{h as d,H as u}from"./index-T3pbIxcm.js";import{O as n}from"./routes-C7yRzVAD.js";import{E as a}from"./ForeldrepengeoversiktRoutes-DeGhmbpI.js";import{M as S,R as h,a as R}from"./chunk-NL6KNZEE-DcbOj75j.js";import"./useBackgroundColor-Qx1_2YzP.js";import"./useSelectedSak-C7oV8fjW.js";import"./useQuery-BOq07a3w.js";import"./api-CvzksYAK.js";import"./sakerUtils-JSxeetNo.js";import"./Snarveier-sjKOqc-Q.js";import"./LenkePanel-CofnvOjm.js";import"./Dokument-CV-Qn1O4.js";import"./dokumenterUtils-Do7ROMEf.js";import"./Tag-DedQvT1q.js";import"./GrupperteDokumenter-B3jS0krr.js";import"./guid-CsArkN6i.js";import"./Header-Dfw-UMJB.js";import"./LayoutWrapper-CK1_Zq9f.js";import"./StatusTag-IUqF0hh5.js";import"./Stroller-CPSAJJvU.js";import"./NoeGikkGalt-yNnKRrke.js";import"./MinidialogSkjema-DG4B2oFQ.js";import"./skjemanummer-I4gNwOYL.js";import"./BekreftelseSendtSøknad-CFZ9adDm.js";import"./KontonummerInfo-jkhTQ0EQ.js";import"./HarIkkeSaker-Cys1Agt3.js";import"./SøkelenkerPanel-ByNUH3IP.js";import"./HarSaker-wYbuovkZ.js";import"./SakLink-p-f3UfU7.js";import"./ContentSection-a6JFxM3k.js";import"./Svangerskapspenger-Bw8l6SAh.js";import"./DinPlan-DDVbAb1q.js";import"./RettighetType-BD_oerVS.js";import"./Oppgaver-C2Eo-Um0.js";import"./OppgaveLenkepanel-DDgUPEzM.js";import"./KontaktOss-C_KXkpnV.js";const ne={title:"EttersendingPage",component:a,decorators:[E],render:k=>{const{skjematypeQueryParamValue:s,...c}=k,f=s?`?skjematype=${s}`:"";return t.jsx(S,{initialEntries:[`/${n.ETTERSEND}/1${f}`],children:t.jsx(h,{children:t.jsx(R,{element:t.jsx(a,{...c}),path:`/${n.ETTERSEND}/:saksnummer`})})})}},e={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:200}))]}},args:{saker:{engangsstønad:[{ytelse:"ENGANGSSTØNAD",saksnummer:"1",sakAvsluttet:!1,gjelderAdopsjon:!1,familiehendelse:{fødselsdato:"2020-01-01",antallBarn:1},oppdatertTidspunkt:"2024-02-28T21:19:08.911"}],foreldrepenger:[],svangerskapspenger:[]}}},r={parameters:{msw:{handlers:[d.post(".//rest/storage/engangsstonad/vedlegg",()=>new u(null,{status:400}))]}},args:e.args};var o,p,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
