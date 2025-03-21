import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { Modal } from '@navikt/ds-react';

import {
    Periode,
    Situasjon,
    Tidsperiode,
    TidsperiodeDate,
    Utsettelsesperiode,
    isForeldrepengerFørFødselUttaksperiode,
} from '@navikt/fp-common';
import { Tidsperioden, getTidsperiode } from '@navikt/fp-utils';

import { getUkerOgDagerFromDager } from '../../components/periodeliste-item-header/PeriodelisteItemHeader';
import TidsperiodeForm, { TidsperiodeFormValues } from '../uttaks-forms/tidsperiode-form/TidsperiodeForm';
import UkerDagerTeller from './../uker-dager-teller/UkerDagerTeller';

interface Props {
    periode: Periode;
    tidsperiode: TidsperiodeDate;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[] | undefined;
    utsettelserIPlan: Utsettelsesperiode[];
    visible: boolean;
    erFarEllerMedmor: boolean;
    morHarRett: boolean;
    situasjon: Situasjon;
    erFarMedmorOgHarAleneomsorg: boolean;
    onAvbryt: () => void;
    onBekreft: (tidsperiode: TidsperiodeFormValues) => void;
    changeTidsperiode: (tidsperiode: Partial<TidsperiodeDate>) => void;
}
// eslint-disable-next-line @typescript-eslint/no-restricted-types
const UtsettelseEndreTidsperiodeSpørsmål: React.FunctionComponent<Props> = ({
    onBekreft,
    onAvbryt,
    changeTidsperiode,
    visible,
    periode,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
    utsettelserIPlan,
    erFarEllerMedmor,
    morHarRett,
    situasjon,
    erFarMedmorOgHarAleneomsorg,
}) => {
    const intl = useIntl();
    const erForeldrepengerFørFødsel = isForeldrepengerFørFødselUttaksperiode(periode);
    const initialMonth = erForeldrepengerFørFødsel ? familiehendelsesdato : undefined;
    const varighetIDager =
        tidsperiode?.fom && tidsperiode?.tom && dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
            ? Tidsperioden({
                  fom: tidsperiode.fom,
                  tom: tidsperiode.tom,
              }).getAntallUttaksdager()
            : undefined;
    const { uker, dager } = varighetIDager ? getUkerOgDagerFromDager(Math.abs(varighetIDager)) : { uker: 0, dager: 0 };
    const handleOnSubmit = (values: TidsperiodeFormValues) => {
        onBekreft(values);
    };

    const getDagValue = (ukerValue: number, dagerValue: number): number => {
        if (dagerValue >= 5) {
            return 0;
        }

        if (ukerValue === 0 && dagerValue === 0) {
            return 1;
        }

        return dagerValue;
    };

    return (
        <>
            <Modal open={visible} onClose={onAvbryt} aria-label="Endre tidsperiode" portal>
                <Modal.Body>
                    <TidsperiodeForm
                        familiehendelsesdato={familiehendelsesdato}
                        onBekreft={handleOnSubmit}
                        periode={periode}
                        tidsperiode={tidsperiode}
                        ugyldigeTidsperioder={ugyldigeTidsperioder}
                        utsettelserIPlan={utsettelserIPlan}
                        initialMonth={initialMonth}
                        erFarEllerMedmor={erFarEllerMedmor}
                        morHarRett={morHarRett}
                        situasjon={situasjon}
                        erFarMedmorOgHarAleneomsorg={erFarMedmorOgHarAleneomsorg}
                    />
                </Modal.Body>
            </Modal>
            <UkerDagerTeller
                ukeLegend={intl.formatMessage({ id: 'uker.label' })}
                dagLegend={intl.formatMessage({ id: 'dager.label' })}
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
// eslint-disable-next-line import/no-default-export
export default UtsettelseEndreTidsperiodeSpørsmål;
