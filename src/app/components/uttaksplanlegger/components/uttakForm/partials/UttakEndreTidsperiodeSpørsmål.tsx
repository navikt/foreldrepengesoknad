import React from 'react';
import moment from 'moment';
import Modal from 'nav-frontend-modal';
import { useIntl } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Tidsperiode, TidsperiodeString } from 'common/types';
import { UttakFormPeriodeType } from '../UttakForm';
import { isForeldrepengerFørFødselUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { Tidsperioden, getTidsperiode } from 'app/util/uttaksplan/Tidsperioden';
import { mapTidsperiodeStringToTidsperiode } from 'app/util/tidsperiodeUtils';
import getMessage from 'common/util/i18nUtils';
import UkerDagerTeller from 'common/components/skjema/elements/uker-dager-teller/UkerDagerTeller';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import UtsettelseEndreTidsperiodeForm, { TidsperiodeFormValues } from '../../tidsperiodeForm/TidsperiodeForm';

interface Props {
    periode: UttakFormPeriodeType;
    tidsperiode: Partial<TidsperiodeString>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[];
    visible: boolean;
    onAvbryt: () => void;
    onBekreft: (tidsperiode: Partial<Tidsperiode>) => void;
    changeTidsperiode: (tidsperiode: Partial<Tidsperiode>) => void;
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
        moment(ISOStringToDate(tidsperiode.fom)).isSameOrBefore(ISOStringToDate(tidsperiode.tom), 'day')
            ? Tidsperioden({
                  fom: ISOStringToDate(tidsperiode.fom),
                  tom: ISOStringToDate(tidsperiode.tom),
              }).getAntallUttaksdager()
            : undefined;
    const { uker, dager } = varighetIDager ? getUkerOgDagerFromDager(Math.abs(varighetIDager)) : { uker: 0, dager: 0 };
    const handleOnSubmit = (values: TidsperiodeFormValues) => {
        onBekreft(mapTidsperiodeStringToTidsperiode(values));
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
                <UtsettelseEndreTidsperiodeForm
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
                        const date = ISOStringToDate(tidsperiode.fom);
                        if (date) {
                            changeTidsperiode({
                                fom: date,
                                tom: getTidsperiode(date, nyUker * 5 + getDagValue(nyUker, dager)).tom,
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
                        const date = ISOStringToDate(tidsperiode.fom);
                        if (date) {
                            changeTidsperiode({
                                fom: date,
                                tom: getTidsperiode(date, uker * 5 + getDagValue(uker, nyDager)).tom,
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
