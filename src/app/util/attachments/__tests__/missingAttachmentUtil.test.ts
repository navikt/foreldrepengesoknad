import { findMissingAttachmentsForBarn, shouldPeriodeHaveAttachment } from '../missingAttachmentUtil';
import { Søkerinfo } from 'app/types/søkerinfo';
import mockSøknad from 'app/testdata/soknad.data';
import Søknad, { Skjemanummer, SøkerRolle, Søkersituasjon } from 'app/types/søknad/Søknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Person, { RegistrertBarn } from 'app/types/Person';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { InfoPeriode, Periodetype } from 'app/types/uttaksplan/periodetyper';
import { Søknadsinfo } from 'app/selectors/types';
import { createDatoInputVerdiFromDate } from '../../../../common/components/skjema/elements/dato-input/datoInputUtils';

describe('missingAttachmentUtil', () => {
    describe('barn', () => {
        let søkerinfo: Søkerinfo;
        beforeEach(() => {
            søkerinfo = {
                person: {} as Person,
                registrerteBarn: [] as RegistrertBarn[],
                arbeidsforhold: [] as Arbeidsforhold[],
            };
        });

        it('Skal oppdage at terminbekreftelse mangler hvis søker ikke har løpende arbeidsforhold og fødsel er frem i tid', () => {
            expect(
                findMissingAttachmentsForBarn(
                    {
                        ...mockSøknad,
                        barn: {
                            erBarnetFødt: false,
                        },
                    } as Søknad,
                    søkerinfo
                )
            ).toEqual([
                {
                    skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                    type: AttachmentType.TERMINBEKREFTELSE,
                },
            ]);
        });

        it('Skal oppdage at dokumentasjon av omsorgsovertakslesesdato mangler', () => {
            const forventetResultat = [
                {
                    skjemanummer: Skjemanummer.OMSORGSOVERTAKELSESDATO,
                    type: AttachmentType.OMSORGSOVERTAKELSE,
                },
            ];

            expect(
                findMissingAttachmentsForBarn(
                    {
                        ...mockSøknad,
                        erEndringssøknad: false,
                        barn: {
                            adopsjonsdato: new Date(),
                            antallBarn: 1,
                            adoptertIUtlandet: false,
                            adopsjonAvEktefellesBarn: false,
                            fødselsdatoer: [new Date()],
                            ...mockSøknad.barn,
                        },
                        situasjon: Søkersituasjon.ADOPSJON,
                    } as Søknad,
                    søkerinfo
                )
            ).toEqual(forventetResultat);

            expect(
                findMissingAttachmentsForBarn(
                    {
                        ...mockSøknad,
                        erEndringssøknad: false,
                        barn: {
                            adopsjonsdato: new Date(),
                            antallBarn: 1,
                            adoptertIUtlandet: false,
                            adopsjonAvEktefellesBarn: true,
                            fødselsdatoer: [new Date()],
                            ...mockSøknad.barn,
                        },
                        situasjon: Søkersituasjon.ADOPSJON,
                    } as Søknad,
                    søkerinfo
                )
            ).toEqual(forventetResultat);
        });

        it('Skal oppdage at dokumentasjon for aleneomsorg mangler farmedmor har aleneomsorg i førtegangssøknad', () => {
            expect(
                findMissingAttachmentsForBarn(
                    {
                        ...mockSøknad,
                        søker: {
                            erAleneOmOmsorg: true,
                            rolle: SøkerRolle.FAR,
                        },
                        barn: {
                            datoForAleneomsorg: createDatoInputVerdiFromDate(new Date()),
                        },
                    } as Søknad,
                    søkerinfo
                )
            ).toEqual([
                {
                    skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
                    type: AttachmentType.ALENEOMSORG,
                },
            ]);
        });
    });

    describe('shouldPeriodeHaveAttachment', () => {
        it('infoperioder skal ikke behøve vedlegg', () => {
            const infoperiode = {
                type: Periodetype.Info,
            } as InfoPeriode;
            expect(shouldPeriodeHaveAttachment(infoperiode, {} as Søknadsinfo)).toBeFalsy();
        });
    });
});
