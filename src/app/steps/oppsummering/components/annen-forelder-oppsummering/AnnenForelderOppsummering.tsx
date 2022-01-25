import { intlUtils } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Søker from 'app/context/types/Søker';
import { Søkerrolle } from 'app/types/Søkerrolle';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    annenForelder: AnnenForelder;
    søker: Søker;
    søkerrolle: Søkerrolle;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({ annenForelder, søker, søkerrolle }) => {
    const intl = useIntl();
    const erFarEllerMedMor = isFarEllerMedmor(søkerrolle);
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
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.annenForelder.rettPåForeldrepenger', {
                            navn: annenForelder.fornavn,
                        })}
                    >
                        <Normaltekst>
                            <FormattedMessage id={annenForelder.harRettPåForeldrepenger ? 'ja' : 'nei'} />
                        </Normaltekst>
                    </OppsummeringsPunkt>
                    {erFarEllerMedMor && (
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
        </>
    );
};

export default AnnenForelderOppsummering;
