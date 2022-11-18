import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { bemUtils } from '@navikt/fp-common';
import PeriodelisteItem from './../periodeliste-item/PeriodelisteItem';
import { isInfoPeriode, Periode, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';

import './periodeliste.less';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Situasjon } from 'app/types/Situasjon';
import { VeiledermeldingerPerPeriode } from 'uttaksplan/validering/veilederInfo/types';
import { getAnnenForelderSamtidigUttakPeriode } from 'uttaksplan/utils/periodeUtils';
import dayjs from 'dayjs';
import FamiliehendelsedatoDisplay from '../familiehendelsedato-display/FamiliehendelsedatoDisplay';
import Barn, { BarnFraNesteSak } from 'app/context/types/Barn';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: Date;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    handleDeletePeriode: (periodeId: string) => void;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
    meldingerPerPeriode: VeiledermeldingerPerPeriode;
    erMorUfør: boolean;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
    setPeriodeErGyldig: Dispatch<SetStateAction<boolean>>;
    erEndringssøknad: boolean;
    termindato: Date | undefined;
    antallBarn: number;
    utsettelserIPlan: Utsettelsesperiode[];
    barn: Barn;
    barnFraNesteSak: BarnFraNesteSak | undefined;
}

const getIndexOfFørstePeriodeEtterFødsel = (uttaksplan: Periode[], familiehendelsesdato: Date) => {
    return uttaksplan.findIndex((p) => dayjs(p.tidsperiode.fom).isSameOrAfter(familiehendelsesdato));
};

const getIndexOfSistePeriodeFørFamHendelseNesteBarn = (
    uttaksplan: Periode[],
    familiehendelsesdatoNesteBarn: Date | undefined
) => {
    if (familiehendelsesdatoNesteBarn !== undefined) {
        return (
            uttaksplan.filter((p) => dayjs(p.tidsperiode.tom).isBefore(familiehendelsesdatoNesteBarn, 'day')).length - 1
        );
    }
    return undefined;
};

const Periodeliste: FunctionComponent<Props> = ({
    uttaksplan,
    familiehendelsesdato,
    handleUpdatePeriode,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
    arbeidsforhold,
    handleDeletePeriode,
    erFarEllerMedmor,
    erFlerbarnssøknad,
    erAleneOmOmsorg,
    erDeltUttak,
    situasjon,
    meldingerPerPeriode,
    erMorUfør,
    søkerErFarEllerMedmorOgKunDeHarRett,
    setPeriodeErGyldig,
    erEndringssøknad,
    termindato,
    antallBarn,
    utsettelserIPlan,
    barn,
    barnFraNesteSak,
}) => {
    const [openPeriodeId, setOpenPeriodeId] = useState<string>(null!);
    const bem = bemUtils('periodeliste');

    const toggleIsOpen = (id: string) => {
        if (openPeriodeId === id) {
            setOpenPeriodeId(null!);
        } else {
            setOpenPeriodeId(id);
        }
    };

    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(uttaksplan, familiehendelsesdato);
    const indexOfSistePeriodeFørNesteBarn =
        barnFraNesteSak !== undefined
            ? getIndexOfSistePeriodeFørFamHendelseNesteBarn(uttaksplan, barnFraNesteSak?.familiehendelsesdato)
            : undefined;
    return (
        <div className={bem.block}>
            {uttaksplan.map((p, index) => {
                return (
                    <>
                        {indexOfFørstePeriodeEtterFødsel === index ? (
                            <FamiliehendelsedatoDisplay
                                barn={barn}
                                familiehendelsedato={familiehendelsesdato}
                                gjelderNesteSak={false}
                            />
                        ) : null}
                        <PeriodelisteItem
                            key={p.id}
                            egenPeriode={!isInfoPeriode(p)}
                            periode={p}
                            isOpen={openPeriodeId === p.id}
                            toggleIsOpen={toggleIsOpen}
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
                            meldinger={meldingerPerPeriode[p.id]}
                            erMorUfør={erMorUfør}
                            annenForelderSamtidigUttakPeriode={getAnnenForelderSamtidigUttakPeriode(p, uttaksplan)}
                            søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                            setPeriodeErGyldig={setPeriodeErGyldig}
                            erEndringssøknad={erEndringssøknad}
                            termindato={termindato}
                            antallBarn={antallBarn}
                            utsettelserIPlan={utsettelserIPlan}
                        />
                        {barnFraNesteSak !== undefined &&
                        indexOfSistePeriodeFørNesteBarn !== undefined &&
                        indexOfSistePeriodeFørNesteBarn === index ? (
                            <FamiliehendelsedatoDisplay
                                familiehendelsedato={barnFraNesteSak!.familiehendelsesdato}
                                barn={barnFraNesteSak}
                                gjelderNesteSak={true}
                            />
                        ) : null}
                    </>
                );
            })}
        </div>
    );
};

export default Periodeliste;
