import {
    AnnenForelder,
    Søkerrolle,
    isAnnenForelderIkkeOppgitt,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import Søker from 'app/context/types/Søker';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { BodyShort, VStack } from '@navikt/ds-react';

interface Props {
    annenForelder: AnnenForelder;
    søker: Søker;
    søkerrolle: Søkerrolle;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({ annenForelder, søker, søkerrolle }) => {
    const intl = useIntl();
    const erFarEllerMedmor = isFarEllerMedmor(søkerrolle);

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
                            !søker.erAleneOmOmsorg
                                ? intl.formatMessage({ id: 'oppsummering.annenForelder.fellesOmsorg.tittel' })
                                : intl.formatMessage({ id: 'oppsummering.annenForelder.aleneOmOmsorg.tittel' })
                        }
                    >
                        <BodyShort>
                            <FormattedMessage
                                id={
                                    !søker.erAleneOmOmsorg
                                        ? 'oppsummering.annenForelder.fellesOmsorg.tekst'
                                        : 'oppsummering.annenForelder.aleneOmOmsorg.tekst'
                                }
                            />
                        </BodyShort>
                    </OppsummeringsPunkt>
                    {!søker.erAleneOmOmsorg && (
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
                    {!søker.erAleneOmOmsorg && !annenForelder.harRettPåForeldrepengerINorge && (
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
                    {!søker.erAleneOmOmsorg && annenForelder.harOppholdtSegIEØS === true && (
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
                        !søker.erAleneOmOmsorg &&
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
        </VStack>
    );
};

export default AnnenForelderOppsummering;
