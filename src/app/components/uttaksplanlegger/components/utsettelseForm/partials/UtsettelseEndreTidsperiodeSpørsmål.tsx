import React from 'react';
import moment from 'moment';
import Modal from 'nav-frontend-modal';
import { useIntl } from 'react-intl';
import { Tidsperiode, TidsperiodeString } from 'common/types';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { getTidsperiode, Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import UkerDagerTeller from 'common/components/skjema/elements/uker-dager-teller/UkerDagerTeller';
import getMessage from 'common/util/i18nUtils';
import TidsperiodeForm from '../../tidsperiodeForm/TidsperiodeForm';

export interface Props {
    tidsperiode: Partial<TidsperiodeString>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[] | undefined;
    onBekreft: (tidsperiode: Partial<TidsperiodeString>) => void;
    changeTidsperiode: (tidsperiode: Partial<TidsperiodeString>) => void;
    onAvbryt: () => void;
    visible: boolean;
}

const UtsettelseEndreTidsperiodeSpørsmål: React.FunctionComponent<Props> = ({
    visible,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
    changeTidsperiode,
    onAvbryt,
    onBekreft,
}) => {
    const intl = useIntl();
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

    const getDagValue = (antallUker: number, antallDager: number): number => {
        if (antallDager >= 5) {
            return 0;
        }

        if (antallUker === 0 && antallDager === 0) {
            return 1;
        }

        return antallDager;
    };

    return (
        <>
            <Modal isOpen={visible} closeButton={true} onRequestClose={onAvbryt} contentLabel="Test">
                <TidsperiodeForm
                    familiehendelsesdato={familiehendelsesdato}
                    onBekreft={onBekreft}
                    tidsperiode={tidsperiode}
                    ugyldigeTidsperioder={ugyldigeTidsperioder}
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
                                fom: dateToISOString(date),
                                tom: dateToISOString(
                                    getTidsperiode(date, Math.min(nyUker, 200) * 5 + getDagValue(nyUker, dager)).tom
                                ),
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
                        const ekstraUke = nyDager === 5 ? 1 : 0;

                        if (date) {
                            changeTidsperiode({
                                fom: dateToISOString(date),
                                tom: dateToISOString(
                                    getTidsperiode(date, (uker + ekstraUke) * 5 + getDagValue(uker, nyDager)).tom
                                ),
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
