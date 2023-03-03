import { intlUtils } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Barn from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import { Søkerrolle } from 'app/types/Søkerrolle';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import OppsummeringAvDokumentasjon from '../uttaksplan-oppsummering/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface Props {
    annenForelder: AnnenForelder;
    søker: Søker;
    søkerrolle: Søkerrolle;
    barn: Barn;
    farMedmorErAleneOmOmsorg: boolean;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({
    annenForelder,
    søker,
    søkerrolle,
    barn,
    farMedmorErAleneOmOmsorg,
}) => {
    const intl = useIntl();
    const erFarEllerMedmor = isFarEllerMedmor(søkerrolle);
    const { dokumentasjonAvAleneomsorg } = barn;

    return (
        <>
            {isAnnenForelderIkkeOppgitt(annenForelder) && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.annenForelder.ikkeOppgitt')} />
            )}
            {isAnnenForelderOppgitt(annenForelder) && (
                <>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.annenForelder.navn')}>
                        <Normaltekst>{`${annenForelder.fornavn} ${annenForelder.etternavn}`}</Normaltekst>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.annenForelder.fnr')}>
                        <Normaltekst>{annenForelder.fnr}</Normaltekst>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={
                            !søker.erAleneOmOmsorg
                                ? intlUtils(intl, 'oppsummering.annenForelder.fellesOmsorg.tittel')
                                : intlUtils(intl, 'oppsummering.annenForelder.aleneOmOmsorg.tittel')
                        }
                    >
                        <Normaltekst>
                            <FormattedMessage
                                id={
                                    !søker.erAleneOmOmsorg
                                        ? 'oppsummering.annenForelder.fellesOmsorg.tekst'
                                        : 'oppsummering.annenForelder.aleneOmOmsorg.tekst'
                                }
                            />
                        </Normaltekst>
                    </OppsummeringsPunkt>
                    {!søker.erAleneOmOmsorg && (
                        <OppsummeringsPunkt
                            title={intlUtils(intl, 'oppsummering.annenForelder.rettPåForeldrepengerINorge', {
                                navn: annenForelder.fornavn,
                            })}
                        >
                            <Normaltekst>
                                <FormattedMessage id={annenForelder.harRettPåForeldrepengerINorge ? 'ja' : 'nei'} />
                            </Normaltekst>
                        </OppsummeringsPunkt>
                    )}
                    {!søker.erAleneOmOmsorg && !annenForelder.harRettPåForeldrepengerINorge && (
                        <OppsummeringsPunkt
                            title={intlUtils(intl, 'oppsummering.annenForelder.harOppholdtSegIEØS', {
                                navn: annenForelder.fornavn,
                            })}
                        >
                            <Normaltekst>
                                <FormattedMessage id={annenForelder.harOppholdtSegIEØS ? 'ja' : 'nei'} />
                            </Normaltekst>
                        </OppsummeringsPunkt>
                    )}
                    {!søker.erAleneOmOmsorg && annenForelder.harOppholdtSegIEØS === true && (
                        <OppsummeringsPunkt
                            title={intlUtils(intl, 'oppsummering.annenForelder.rettPåForeldrepengerIEØS', {
                                navn: annenForelder.fornavn,
                            })}
                        >
                            <Normaltekst>
                                <FormattedMessage id={annenForelder.harRettPåForeldrepengerIEØS ? 'ja' : 'nei'} />
                            </Normaltekst>
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
                                <Normaltekst>
                                    <FormattedMessage id={annenForelder.erUfør ? 'ja' : 'nei'} />
                                </Normaltekst>
                            </OppsummeringsPunkt>
                        )}
                </>
            )}
            {farMedmorErAleneOmOmsorg && erFarEllerMedmor && (
                <OppsummeringAvDokumentasjon
                    vedlegg={dokumentasjonAvAleneomsorg || []}
                    ledetekst={intlUtils(intl, 'oppsummering.annenForelder.dokumentasjonAvAleneomsorg')}
                />
            )}
        </>
    );
};

export default AnnenForelderOppsummering;
