import React from 'react';
import Modal from 'nav-frontend-modal';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import UkerDagerTeller from 'common/components/skjema/elements/uker-dager-teller/UkerDagerTeller';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import { isForeldrepengerFørFødselUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import dayjs from 'dayjs';
import { getTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import TidsperiodeForm, { TidsperiodeFormValues } from '../uttaks-forms/tidsperiode-form/TidsperiodeForm';
import { Tidsperiode, TidsperiodeDate } from '@navikt/fp-common';

interface Props {
    periode: Periode;
    tidsperiode: Partial<TidsperiodeDate>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[];
    visible: boolean;
    onAvbryt: () => void;
    onBekreft: (tidsperiode: Partial<Tidsperiode>) => void;
    changeTidsperiode: (tidsperiode: Partial<TidsperiodeDate>) => void;
}

const UttakEndreTidsperiodeSpørsmål: React.FunctionComponent<Props> = ({
    onBekreft,
    onAvbryt,
    changeTidsperiode,
    visible,
    periode,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
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
                />
            </Modal>
            <UkerDagerTeller
                ukeLegend={getMessage(intl, 'spørsmål.farFellesperiode.uker.label')}
                dagLegend={getMessage(intl, 'spørsmål.farFellesperiode.dager.label')}
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

export default UttakEndreTidsperiodeSpørsmål;
