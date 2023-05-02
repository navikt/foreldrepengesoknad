import { Block } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { Periode, Periodetype, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import PeriodeUttakForm from '../periode-uttak-form/PeriodeUttakForm';
import PeriodeUtsettelseForm from '../periode-utsettelse-form/PeriodeUtsettelseForm';
import { FormattedMessage, IntlShape } from 'react-intl';
import { Situasjon } from 'app/types/Situasjon';
import { Heading } from '@navikt/ds-react';
import { PeriodeValidState } from 'uttaksplan/Uttaksplan';

interface Props {
    familiehendelsesdato: Date;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    setNyPeriodeFormIsVisible: Dispatch<SetStateAction<boolean>>;
    arbeidsforhold: Arbeidsforhold[];
    isUtsettelse: boolean;
    handleAddPeriode: (nyPeriode: Periode, familiehendelsedato: Date) => void;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
    erMorUfør: boolean;
    setPerioderErGyldige: React.Dispatch<React.SetStateAction<PeriodeValidState[]>>;
    nesteLedigeUttaksdato: Date | undefined;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
    erEndringssøknad: boolean;
    termindato: Date | undefined;
    antallBarn: number;
    utsettelserIPlan: Utsettelsesperiode[];
    intl: IntlShape;
}

const NyPeriode: FunctionComponent<Props> = ({
    setNyPeriodeFormIsVisible,
    isUtsettelse,
    annenForelder,
    arbeidsforhold,
    navnPåForeldre,
    stønadskontoer,
    familiehendelsesdato,
    handleAddPeriode,
    erFarEllerMedmor,
    erFlerbarnssøknad,
    erAleneOmOmsorg,
    erDeltUttak,
    situasjon,
    erMorUfør,
    setPerioderErGyldige,
    nesteLedigeUttaksdato,
    søkerErFarEllerMedmorOgKunDeHarRett,
    erEndringssøknad,
    termindato,
    antallBarn,
    utsettelserIPlan,
    intl,
}) => {
    const [periode, setPeriode] = useState<Periode>({
        type: isUtsettelse ? Periodetype.Utsettelse : Periodetype.Uttak,
        tidsperiode: { fom: isUtsettelse ? undefined : nesteLedigeUttaksdato },
    } as Periode);

    return !isUtsettelse ? (
        <>
            <Block padBottom="xl">
                <Heading size="small">
                    <FormattedMessage id="uttaksplan.nyPeriode.tittel" />
                </Heading>
            </Block>
            <PeriodeUttakForm
                periode={periode}
                handleUpdatePeriode={setPeriode}
                handleAddPeriode={handleAddPeriode}
                annenForelder={annenForelder}
                arbeidsforhold={arbeidsforhold}
                familiehendelsesdato={familiehendelsesdato}
                navnPåForeldre={navnPåForeldre}
                stønadskontoer={stønadskontoer}
                setNyPeriodeFormIsVisible={setNyPeriodeFormIsVisible}
                isNyPeriode={true}
                erFarEllerMedmor={erFarEllerMedmor}
                erFlerbarnssøknad={erFlerbarnssøknad}
                erAleneOmOmsorg={erAleneOmOmsorg}
                erDeltUttak={erDeltUttak}
                situasjon={situasjon}
                erMorUfør={erMorUfør}
                setPerioderErGyldige={setPerioderErGyldige}
                erEndringssøknad={erEndringssøknad}
                termindato={termindato}
                morHarRett={!søkerErFarEllerMedmorOgKunDeHarRett}
                antallBarn={antallBarn}
                utsettelserIPlan={utsettelserIPlan}
                intl={intl}
            />
        </>
    ) : (
        <PeriodeUtsettelseForm
            periode={periode}
            familiehendelsesdato={familiehendelsesdato}
            handleUpdatePeriode={setPeriode}
            erFarEllerMedmor={erFarEllerMedmor}
            erAleneOmOmsorg={erAleneOmOmsorg}
            handleAddPeriode={handleAddPeriode}
            setNyPeriodeFormIsVisible={setNyPeriodeFormIsVisible}
            isNyPeriode={true}
            navnPåForeldre={navnPåForeldre}
            erMorUfør={erMorUfør}
            søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
            arbeidsforhold={arbeidsforhold}
            situasjon={situasjon}
            utsettelserIPlan={utsettelserIPlan}
            setPerioderErGyldige={setPerioderErGyldige}
        />
    );
};

export default NyPeriode;
