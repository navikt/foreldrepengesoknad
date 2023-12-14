import {
    AnnenForelder,
    Søkerrolle,
    intlUtils,
    isAnnenForelderIkkeOppgitt,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import Søker from 'app/context/types/Søker';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    annenForelder: AnnenForelder;
    søker: Søker;
    søkerrolle: Søkerrolle;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({ annenForelder, søker, søkerrolle }) => {
    const intl = useIntl();
    const erFarEllerMedmor = isFarEllerMedmor(søkerrolle);

    return (
        <>
            {isAnnenForelderIkkeOppgitt(annenForelder) && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.annenForelder.ikkeOppgitt')} />
            )}
            {isAnnenForelderOppgitt(annenForelder) && (
                <>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.annenForelder.navn')}>
                        <BodyShort>{`${annenForelder.fornavn} ${annenForelder.etternavn}`}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.annenForelder.fnr')}>
                        <BodyShort>{annenForelder.fnr}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={
                            !søker.erAleneOmOmsorg
                                ? intlUtils(intl, 'oppsummering.annenForelder.fellesOmsorg.tittel')
                                : intlUtils(intl, 'oppsummering.annenForelder.aleneOmOmsorg.tittel')
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
                            title={intlUtils(intl, 'oppsummering.annenForelder.rettPåForeldrepengerINorge', {
                                navn: annenForelder.fornavn,
                            })}
                        >
                            <BodyShort>
                                <FormattedMessage id={annenForelder.harRettPåForeldrepengerINorge ? 'ja' : 'nei'} />
                            </BodyShort>
                        </OppsummeringsPunkt>
                    )}
                    {!søker.erAleneOmOmsorg && !annenForelder.harRettPåForeldrepengerINorge && (
                        <OppsummeringsPunkt
                            title={intlUtils(intl, 'oppsummering.annenForelder.harOppholdtSegIEØS', {
                                navn: annenForelder.fornavn,
                            })}
                        >
                            <BodyShort>
                                <FormattedMessage id={annenForelder.harOppholdtSegIEØS ? 'ja' : 'nei'} />
                            </BodyShort>
                        </OppsummeringsPunkt>
                    )}
                    {!søker.erAleneOmOmsorg && annenForelder.harOppholdtSegIEØS === true && (
                        <OppsummeringsPunkt
                            title={intlUtils(intl, 'oppsummering.annenForelder.rettPåForeldrepengerIEØS', {
                                navn: annenForelder.fornavn,
                            })}
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
                                title={intlUtils(intl, 'annenForelder.erMorUfør', {
                                    navn: annenForelder.fornavn,
                                })}
                            >
                                <BodyShort>
                                    <FormattedMessage id={annenForelder.erUfør ? 'ja' : 'nei'} />
                                </BodyShort>
                            </OppsummeringsPunkt>
                        )}
                </>
            )}
        </>
    );
};

export default AnnenForelderOppsummering;
