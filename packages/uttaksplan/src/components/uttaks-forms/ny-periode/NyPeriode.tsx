import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { FormattedMessage, IntlShape } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import {
    AnnenForelder,
    NavnPåForeldre,
    Periode,
    PeriodeValidState,
    Periodetype,
    Situasjon,
    Utsettelsesperiode,
} from '@navikt/fp-common';
import { EksternArbeidsforholdDto_fpoversikt, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import Block from '../../../common/block/Block';
import PeriodeUtsettelseForm from '../periode-utsettelse-form/PeriodeUtsettelseForm';
import PeriodeUttakForm from '../periode-uttak-form/PeriodeUttakForm';

interface Props {
    familiehendelsesdato: Date;
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad;
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    setNyPeriodeFormIsVisible: Dispatch<SetStateAction<boolean>>;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
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

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
                stønadskontoer={stønadskontoer.kontoer}
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
                isOpen={true}
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
            situasjon={situasjon}
            utsettelserIPlan={utsettelserIPlan}
            setPerioderErGyldige={setPerioderErGyldige}
        />
    );
};
// eslint-disable-next-line import/no-default-export
export default NyPeriode;
