import { intlUtils, Tidsperiode, TidsperiodeDate } from '@navikt/fp-common';
import Modal from 'nav-frontend-modal';
import { getTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { getUkerOgDagerFromDager } from 'app/utils/dateUtils';
import UkerDagerTeller from './../uker-dager-teller/UkerDagerTeller';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import { isForeldrepengerFørFødselUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import TidsperiodeForm, { TidsperiodeFormValues } from '../uttaks-forms/tidsperiode-form/TidsperiodeForm';
import { Situasjon } from 'app/types/Situasjon';

interface Props {
    periode: Periode;
    tidsperiode: TidsperiodeDate;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[];
    visible: boolean;
    erFarEllerMedmor: boolean;
    morHarRett: boolean;
    situasjon: Situasjon;
    erFarMedmorOgHarAleneomsorg: boolean;
    onAvbryt: () => void;
    onBekreft: (tidsperiode: TidsperiodeFormValues) => void;
    changeTidsperiode: (tidsperiode: Partial<TidsperiodeDate>) => void;
}

const UtsettelseEndreTidsperiodeSpørsmål: React.FunctionComponent<Props> = ({
    onBekreft,
    onAvbryt,
    changeTidsperiode,
    visible,
    periode,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
    erFarEllerMedmor,
    morHarRett,
    situasjon,
    erFarMedmorOgHarAleneomsorg,
}) => {
    const intl = useIntl();
    const erForeldrepengerFørFødsel = isForeldrepengerFørFødselUttaksperiode(periode);
    const initialMonth = erForeldrepengerFørFødsel ? familiehendelsesdato : undefined;
    const varighetIDager =
        tidsperiode &&
        tidsperiode.fom &&
        tidsperiode.tom &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
            ? Tidsperioden({
                  fom: tidsperiode.fom,
                  tom: tidsperiode.tom,
              }).getAntallUttaksdager()
            : undefined;
    const { uker, dager } = varighetIDager ? getUkerOgDagerFromDager(Math.abs(varighetIDager)) : { uker: 0, dager: 0 };
    const handleOnSubmit = (values: TidsperiodeFormValues) => {
        onBekreft(values);
    };

    const getDagValue = (uker: number, dager: number): number => {
        if (dager >= 5) {
            return 0;
        }

        if (uker === 0 && dager === 0) {
            return 1;
        }

        return dager;
    };

    return (
        <>
            <Modal isOpen={visible} closeButton={true} onRequestClose={onAvbryt} contentLabel="Test">
                <TidsperiodeForm
                    familiehendelsesdato={familiehendelsesdato}
                    onBekreft={handleOnSubmit}
                    periode={periode}
                    tidsperiode={tidsperiode}
                    ugyldigeTidsperioder={ugyldigeTidsperioder}
                    initialMonth={initialMonth}
                    erFarEllerMedmor={erFarEllerMedmor}
                    morHarRett={morHarRett}
                    situasjon={situasjon}
                    erFarMedmorOgHarAleneomsorg={erFarMedmorOgHarAleneomsorg}
                />
            </Modal>
            <UkerDagerTeller
                ukeLegend={intlUtils(intl, 'uker.label')}
                dagLegend={intlUtils(intl, 'dager.label')}
                ukeStepper={{
                    value: uker !== undefined ? uker : 0,
                    min: 0,
                    max: 100,
                    onChange: (nyUker: number) => {
                        const date = tidsperiode.fom;
                        if (date) {
                            changeTidsperiode({
                                fom: date,
                                tom: getTidsperiode(date, Math.min(nyUker, 200) * 5 + getDagValue(nyUker, dager)).tom,
                            });
                        }
                    },
                    increaseAriaLabel: 'Øk antall uker med en uke',
                    decreaseAriaLabel: 'Mink antall uker med en uke',
                }}
                dagStepper={{
                    value: getDagValue(uker, dager),
                    min: uker === 0 ? 1 : 0,
                    max: 5,
                    onChange: (nyDager: number) => {
                        const date = tidsperiode.fom;
                        const ekstraUke = nyDager === 5 ? 1 : 0;

                        if (date) {
                            changeTidsperiode({
                                fom: date,
                                tom: getTidsperiode(date, (uker + ekstraUke) * 5 + getDagValue(uker, nyDager)).tom,
                            });
                        }
                    },
                    increaseAriaLabel: 'Øk antall dager med en dag',
                    decreaseAriaLabel: 'Mink antall dager med en dag',
                }}
            />
        </>
    );
};

export default UtsettelseEndreTidsperiodeSpørsmål;
