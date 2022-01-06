import { bemUtils, InfoBlock, intlUtils, Block } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { Periode } from 'uttaksplan/types/Periode';
import NyPeriode from '../uttaks-forms/ny-periode/NyPeriode';
import Periodeliste from './../periodeliste/Periodeliste';

import './planlegger.less';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: Date;
    handleUpdatePeriode: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    handleDeletePeriode: (periodeId: string) => void;
    handleAddPeriode: (nyPeriode: Periode) => void;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
}

const Planlegger: FunctionComponent<Props> = ({
    uttaksplan,
    familiehendelsesdato,
    handleUpdatePeriode,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
    arbeidsforhold,
    handleDeletePeriode,
    handleAddPeriode,
    erFarEllerMedmor,
    erFlerbarnssøknad,
    erAleneOmOmsorg,
    erDeltUttak,
    situasjon,
}) => {
    const intl = useIntl();
    const bem = bemUtils('planlegger');
    const [nyPeriodeFormIsVisible, setNyPeriodeFormIsVisible] = useState(false);
    const [isUtsettelse, setIsUtsettelse] = useState(false);

    return (
        <>
            <Block padBottom="l">
                <InfoBlock>
                    <Block padBottom="xl">
                        <section>
                            <div className={bem.element('tittel')}>
                                <Systemtittel>{intlUtils(intl, 'uttaksplan.dinPlan')}</Systemtittel>
                            </div>

                            <Periodeliste
                                uttaksplan={uttaksplan}
                                familiehendelsesdato={familiehendelsesdato}
                                handleUpdatePeriode={handleUpdatePeriode}
                                stønadskontoer={stønadskontoer}
                                navnPåForeldre={navnPåForeldre}
                                annenForelder={annenForelder}
                                arbeidsforhold={arbeidsforhold}
                                handleDeletePeriode={handleDeletePeriode}
                                erFarEllerMedmor={erFarEllerMedmor}
                                erFlerbarnssøknad={erFlerbarnssøknad}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                                erDeltUttak={erDeltUttak}
                                situasjon={situasjon}
                            />
                        </section>
                    </Block>
                    {nyPeriodeFormIsVisible && (
                        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
                            <NyPeriode
                                setNyPeriodeFormIsVisible={setNyPeriodeFormIsVisible}
                                annenForelder={annenForelder}
                                arbeidsforhold={arbeidsforhold}
                                familiehendelsesdato={familiehendelsesdato}
                                isUtsettelse={isUtsettelse}
                                navnPåForeldre={navnPåForeldre}
                                stønadskontoer={stønadskontoer}
                                handleAddPeriode={handleAddPeriode}
                                erFarEllerMedmor={erFarEllerMedmor}
                                erFlerbarnssøknad={erFlerbarnssøknad}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                                erDeltUttak={erDeltUttak}
                                situasjon={situasjon}
                            />
                        </div>
                    )}
                </InfoBlock>
            </Block>
            {!nyPeriodeFormIsVisible && (
                <Block padBottom="l">
                    <div className={bem.element('knapperad')}>
                        <Knapp
                            onClick={() => {
                                setNyPeriodeFormIsVisible(true);
                                setIsUtsettelse(false);
                            }}
                        >
                            Legg til ny periode
                        </Knapp>
                        <Knapp
                            onClick={() => {
                                setNyPeriodeFormIsVisible(true);
                                setIsUtsettelse(true);
                            }}
                        >
                            Legg til utsettelse
                        </Knapp>
                    </div>
                </Block>
            )}
        </>
    );
};

export default Planlegger;
