import {
    mapFilTilVedlegg,
    isAttachmentWithError,
    lagSendSenereDokumentNårIngenAndreFinnes,
    mapAttachmentsToSøknadForInnsending,
} from './vedleggUtils';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Attachment, InnsendingsType } from 'app/types/Attachment';
import { BarnForInnsending, SøkerForInnsending, SøknadForInnsending } from 'app/api/apiUtils';
import { BarnType } from 'app/context/types/Barn';
import InformasjonOmUtenlandsopphold from 'app/context/types/InformasjonOmUtenlandsopphold';
import { Dekningsgrad } from 'app/types/Dekningsgrad';

describe('vedleggUtils', () => {
    it('skal mappe fil til vedlegg', () => {
        const file = { name: 'filnavn', size: 1234 } as any;
        const type = AttachmentType.ALENEOMSORG;
        const skjemanummer = Skjemanummer.DOK_AV_ALENEOMSORG;
        const innsendingsType = InnsendingsType.SEND_SENERE;

        const vedlegg = mapFilTilVedlegg(file, type, skjemanummer, innsendingsType);

        expect(vedlegg.filename).toBe('filnavn');
        expect(vedlegg.filesize).toBe(1234);
        expect(vedlegg.uploaded).toBe(false);
        expect(vedlegg.pending).toBe(false);
        expect(vedlegg.type).toBe(type);
        expect(vedlegg.skjemanummer).toBe(skjemanummer);
        expect(vedlegg.innsendingsType).toBe(innsendingsType);
    });

    it('skal ikke ha feil i vedlegg når den er opplastet og har størrelse over 0', () => {
        const vedlegg = {
            pending: false,
            uploaded: true,
            filesize: 1234,
        } as Attachment;

        const harFeil = isAttachmentWithError(vedlegg);

        expect(harFeil).toBe(false);
    });

    it('skal ha feil i vedlegg når den er forsøkt laster opp men ikke markert som opplastet', () => {
        const vedlegg = {
            pending: false,
            uploaded: false,
            filesize: 1234,
        } as Attachment;

        const harFeil = isAttachmentWithError(vedlegg);

        expect(harFeil).toBe(true);
    });

    it('skal ha feil i vedlegg når den er opplastet men har størrelse 0', () => {
        const vedlegg = {
            pending: false,
            uploaded: true,
            filesize: 0,
        } as Attachment;

        const harFeil = isAttachmentWithError(vedlegg);

        expect(harFeil).toBe(true);
    });

    it('skal lage "send senere" vedlegg som markerer at dette må sendes inn senere når ingen vedlegg er lastet opp', () => {
        const alleVedlegg = [] as Attachment[];

        const behandledeVedlegg = lagSendSenereDokumentNårIngenAndreFinnes(
            alleVedlegg,
            AttachmentType.ALENEOMSORG,
            Skjemanummer.DOK_AV_ALENEOMSORG
        );

        expect(behandledeVedlegg).toHaveLength(1);
        const sendSenereDokument = behandledeVedlegg[0];
        expect(sendSenereDokument.innsendingsType).toBe(InnsendingsType.SEND_SENERE);
        expect(sendSenereDokument.type).toBe(AttachmentType.ALENEOMSORG);
        expect(sendSenereDokument.skjemanummer).toBe(Skjemanummer.DOK_AV_ALENEOMSORG);
        expect(sendSenereDokument.filename).toBe('');
        expect(sendSenereDokument.filesize).toBe('');
    });

    it('skal returnere samme vedlegg når det kun er ett i listen (Da er det enten lastet opp frå før eller "send senere" dok er laget)', () => {
        const alleVedlegg = [
            {
                filename: 'test',
                filesize: 123,
            },
        ] as Attachment[];

        const behandledeVedlegg = lagSendSenereDokumentNårIngenAndreFinnes(
            alleVedlegg,
            AttachmentType.ALENEOMSORG,
            Skjemanummer.DOK_AV_ALENEOMSORG
        );

        expect(behandledeVedlegg).toHaveLength(1);
        const dokument = behandledeVedlegg[0];
        expect(dokument.innsendingsType).toBeUndefined();
        expect(dokument.filename).toBe('test');
        expect(dokument.filesize).toBe(123);
    });

    it('skal filtrere bort "send senere" vedlegg om dette finnes sammen med andre opplastede vedlegg', () => {
        const alleVedlegg = [
            {
                filename: 'test',
                filesize: 123,
            },
            {
                filename: 'test2',
                filesize: 433,
                innsendingsType: InnsendingsType.SEND_SENERE,
            },
        ] as Attachment[];

        const behandledeVedlegg = lagSendSenereDokumentNårIngenAndreFinnes(
            alleVedlegg,
            AttachmentType.ALENEOMSORG,
            Skjemanummer.DOK_AV_ALENEOMSORG
        );

        expect(behandledeVedlegg).toHaveLength(1);
        const dokument = behandledeVedlegg[0];
        expect(dokument.innsendingsType).toBeUndefined();
        expect(dokument.filename).toBe('test');
        expect(dokument.filesize).toBe(123);
    });

    it('skal flytte vedlegg fra der de ligger til rot i søknadsobjektet og kun beholde referanse ID der de var', () => {
        const vedleggId = 'V965800832305819623633073432860601988';

        const søknad: SøknadForInnsending = {
            type: 'foreldrepenger',
            harGodkjentVilkår: true,
            situasjon: 'adopsjon',
            annenForelder: {
                kanIkkeOppgis: true,
            },
            barn: {
                type: BarnType.ADOPTERT_STEBARN,
                adopsjonsdato: '2022-02-10T00:00:00.000Z',
                antallBarn: ' 1',
                fødselsdatoer: ['2022-02-10T00:00:00.000Z'],
                dokumentasjonAvAleneomsorg: [
                    {
                        id: vedleggId,
                        filename: 'test.png',
                    } as Attachment,
                ],
            } as BarnForInnsending,
            søker: {} as SøkerForInnsending,
            informasjonOmUtenlandsopphold: {} as InformasjonOmUtenlandsopphold,
            erEndringssøknad: false,
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            uttaksplan: [],
            harGodkjentOppsummering: false,
            vedlegg: [],
            tilleggsopplysninger: undefined!,
        };

        const søknadForInnsending = mapAttachmentsToSøknadForInnsending(søknad);

        expect(søknadForInnsending).toHaveProperty('vedlegg');
        expect(søknadForInnsending.vedlegg).toHaveLength(1);
        expect(søknadForInnsending.vedlegg[0].id).toEqual(vedleggId);
        expect(søknadForInnsending.barn.dokumentasjonAvAleneomsorg![0]).toEqual(vedleggId);
    });

    it('skal ikke gjøre noe dersom det ikke er noen vedlegg', () => {
        const søknad: SøknadForInnsending = {
            type: 'foreldrepenger',
            harGodkjentVilkår: true,
            situasjon: 'adopsjon',
            annenForelder: {
                kanIkkeOppgis: true,
            },
            barn: {
                type: BarnType.ADOPTERT_STEBARN,
                adopsjonsdato: '2022-02-10T00:00:00.000Z',
                antallBarn: ' 1',
                fødselsdatoer: ['2022-02-10T00:00:00.000Z'],
                dokumentasjonAvAleneomsorg: [],
            } as BarnForInnsending,
            søker: {} as SøkerForInnsending,
            informasjonOmUtenlandsopphold: {} as InformasjonOmUtenlandsopphold,
            erEndringssøknad: false,
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            uttaksplan: [],
            harGodkjentOppsummering: false,
            vedlegg: [],
            tilleggsopplysninger: undefined!,
        };

        const søknadForInnsending = mapAttachmentsToSøknadForInnsending(søknad);

        expect(søknadForInnsending).toHaveProperty('vedlegg');
        expect(søknadForInnsending.vedlegg).toHaveLength(0);
        expect(søknadForInnsending.barn.dokumentasjonAvAleneomsorg![0]).toEqual(undefined);
    });

    it('skal også mappe vedlegg av typen send senere', () => {
        const vedleggId = 'V2929901281987521738302824422140500220';

        const søknad: SøknadForInnsending = {
            type: 'foreldrepenger',
            harGodkjentVilkår: true,
            situasjon: 'adopsjon',
            annenForelder: {
                kanIkkeOppgis: true,
            },
            barn: {
                type: BarnType.ADOPTERT_STEBARN,
                adopsjonsdato: '2022-02-10T00:00:00.000Z',
                antallBarn: ' 1',
                fødselsdatoer: ['2022-02-10T00:00:00.000Z'],
                dokumentasjonAvAleneomsorg: [
                    {
                        id: vedleggId,
                        innsendingsType: 'SEND_SENERE',
                    } as Attachment,
                ],
            } as BarnForInnsending,
            søker: {} as SøkerForInnsending,
            informasjonOmUtenlandsopphold: {} as InformasjonOmUtenlandsopphold,
            erEndringssøknad: false,
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            uttaksplan: [],
            harGodkjentOppsummering: false,
            vedlegg: [],
            tilleggsopplysninger: undefined!,
        };

        const søknadForInnsending = mapAttachmentsToSøknadForInnsending(søknad);

        expect(søknadForInnsending).toHaveProperty('vedlegg');
        expect(søknadForInnsending.vedlegg).toHaveLength(1);
        expect(søknadForInnsending.vedlegg[0].id).toEqual(vedleggId);
        expect(søknadForInnsending.barn.dokumentasjonAvAleneomsorg![0]).toEqual(vedleggId);
    });
});
