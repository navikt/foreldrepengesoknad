import {
    AnnenForelder,
    Barn,
    Søkerrolle,
    isAnnenForelderIkkeOppgitt,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import SøkerData from 'app/context/types/SøkerData';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import OppsummeringAvDokumentasjon from '../uttaksplan-oppsummering/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import { BodyShort, VStack } from '@navikt/ds-react';

interface Props {
    annenForelder: AnnenForelder;
    søkerData: SøkerData;
    søkerrolle: Søkerrolle;
    barn: Barn;
    farMedmorErAleneOmOmsorg: boolean;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({
    annenForelder,
    søkerData,
    søkerrolle,
    barn,
    farMedmorErAleneOmOmsorg,
}) => {
    const intl = useIntl();
    const erFarEllerMedmor = isFarEllerMedmor(søkerrolle);
    const { dokumentasjonAvAleneomsorg } = barn;

    return (
        <VStack gap="4">
            {isAnnenForelderIkkeOppgitt(annenForelder) && (
                <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.annenForelder.ikkeOppgitt' })} />
            )}
            {isAnnenForelderOppgitt(annenForelder) && (
                <>
                    <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.annenForelder.navn' })}>
                        <BodyShort>{`${annenForelder.fornavn} ${annenForelder.etternavn}`}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.annenForelder.fnr' })}>
                        <BodyShort>{annenForelder.fnr}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={
                            !søkerData.erAleneOmOmsorg
                                ? intl.formatMessage({ id: 'oppsummering.annenForelder.fellesOmsorg.tittel' })
                                : intl.formatMessage({ id: 'oppsummering.annenForelder.aleneOmOmsorg.tittel' })
                        }
                    >
                        <BodyShort>
                            <FormattedMessage
                                id={
                                    !søkerData.erAleneOmOmsorg
                                        ? 'oppsummering.annenForelder.fellesOmsorg.tekst'
                                        : 'oppsummering.annenForelder.aleneOmOmsorg.tekst'
                                }
                            />
                        </BodyShort>
                    </OppsummeringsPunkt>
                    {!søkerData.erAleneOmOmsorg && (
                        <OppsummeringsPunkt
                            title={intl.formatMessage(
                                { id: 'oppsummering.annenForelder.rettPåForeldrepengerINorge' },
                                {
                                    navn: annenForelder.fornavn,
                                },
                            )}
                        >
                            <BodyShort>
                                <FormattedMessage id={annenForelder.harRettPåForeldrepengerINorge ? 'ja' : 'nei'} />
                            </BodyShort>
                        </OppsummeringsPunkt>
                    )}
                    {!søkerData.erAleneOmOmsorg && !annenForelder.harRettPåForeldrepengerINorge && (
                        <OppsummeringsPunkt
                            title={intl.formatMessage(
                                { id: 'oppsummering.annenForelder.harOppholdtSegIEØS' },
                                {
                                    navn: annenForelder.fornavn,
                                },
                            )}
                        >
                            <BodyShort>
                                <FormattedMessage id={annenForelder.harOppholdtSegIEØS ? 'ja' : 'nei'} />
                            </BodyShort>
                        </OppsummeringsPunkt>
                    )}
                    {!søkerData.erAleneOmOmsorg && annenForelder.harOppholdtSegIEØS === true && (
                        <OppsummeringsPunkt
                            title={intl.formatMessage(
                                { id: 'oppsummering.annenForelder.rettPåForeldrepengerIEØS' },
                                {
                                    navn: annenForelder.fornavn,
                                },
                            )}
                        >
                            <BodyShort>
                                <FormattedMessage id={annenForelder.harRettPåForeldrepengerIEØS ? 'ja' : 'nei'} />
                            </BodyShort>
                        </OppsummeringsPunkt>
                    )}
                    {erFarEllerMedmor &&
                        !søkerData.erAleneOmOmsorg &&
                        !annenForelder.harRettPåForeldrepengerINorge &&
                        !annenForelder.harRettPåForeldrepengerIEØS && (
                            <OppsummeringsPunkt
                                title={intl.formatMessage(
                                    { id: 'annenForelder.erMorUfør' },
                                    {
                                        navn: annenForelder.fornavn,
                                    },
                                )}
                            >
                                <BodyShort>
                                    <FormattedMessage id={annenForelder.erUfør ? 'ja' : 'nei'} />
                                </BodyShort>
                            </OppsummeringsPunkt>
                        )}
                </>
            )}
            {farMedmorErAleneOmOmsorg && erFarEllerMedmor && (
                <OppsummeringAvDokumentasjon
                    vedlegg={dokumentasjonAvAleneomsorg || []}
                    ledetekst={intl.formatMessage({ id: 'oppsummering.annenForelder.dokumentasjonAvAleneomsorg' })}
                />
            )}
        </VStack>
    );
};

export default AnnenForelderOppsummering;
