import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import {
    AnnenForelder,
    Søkerrolle,
    isAnnenForelderIkkeOppgitt,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';

import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    annenForelder: AnnenForelder;
    søkerrolle: Søkerrolle;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({ annenForelder, søkerrolle }) => {
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
                            !annenForelder.erAleneOmOmsorg
                                ? intl.formatMessage({ id: 'oppsummering.annenForelder.fellesOmsorg.tittel' })
                                : intl.formatMessage({ id: 'oppsummering.annenForelder.aleneOmOmsorg.tittel' })
                        }
                    >
                        <BodyShort>
                            <FormattedMessage
                                id={
                                    !annenForelder.erAleneOmOmsorg
                                        ? 'oppsummering.annenForelder.fellesOmsorg.tekst'
                                        : 'oppsummering.annenForelder.aleneOmOmsorg.tekst'
                                }
                            />
                        </BodyShort>
                    </OppsummeringsPunkt>
                    {!annenForelder.erAleneOmOmsorg && (
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
                    {!annenForelder.erAleneOmOmsorg && !annenForelder.harRettPåForeldrepengerINorge && (
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
                    {!annenForelder.erAleneOmOmsorg && annenForelder.harOppholdtSegIEØS === true && (
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
                        !annenForelder.erAleneOmOmsorg &&
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
                                    <FormattedMessage id={annenForelder.erMorUfør ? 'ja' : 'nei'} />
                                </BodyShort>
                            </OppsummeringsPunkt>
                        )}
                </>
            )}
        </VStack>
    );
};

export default AnnenForelderOppsummering;
