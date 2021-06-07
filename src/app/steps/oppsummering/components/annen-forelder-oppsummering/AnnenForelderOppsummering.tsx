import { intlUtils } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Søker from 'app/context/types/Søker';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    annenForelder: AnnenForelder;
    søker: Søker;
}

const AnnenForelderOppsummering: FunctionComponent<Props> = ({ annenForelder, søker }) => {
    const intl = useIntl();

    return (
        <>
            {isAnnenForelderIkkeOppgitt(annenForelder) && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.annenForelder.ikkeOppgitt')} />
            )}
            {isAnnenForelderOppgitt(annenForelder) && (
                <>
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.annenForelder.navn')}
                        text={`${annenForelder.fornavn} ${annenForelder.etternavn}`}
                    />
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.annenForelder.fnr')}
                        text={annenForelder.fnr}
                    />
                    <OppsummeringsPunkt
                        title={
                            !søker.erAleneOmOmsorg
                                ? intlUtils(intl, 'oppsummering.annenForelder.fellesOmsorg.tittel')
                                : intlUtils(intl, 'oppsummering.annenForelder.aleneOmOmsorg.tittel')
                        }
                        text={
                            !søker.erAleneOmOmsorg
                                ? intlUtils(intl, 'oppsummering.annenForelder.fellesOmsorg.tekst')
                                : intlUtils(intl, 'oppsummering.annenForelder.aleneOmOmsorg.tekst')
                        }
                    />
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.annenForelder.rettPåForeldrepenger', {
                            navn: annenForelder.fornavn,
                        })}
                        text={annenForelder.harRettPåForeldrepenger ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}
                    />
                </>
            )}
        </>
    );
};

export default AnnenForelderOppsummering;
