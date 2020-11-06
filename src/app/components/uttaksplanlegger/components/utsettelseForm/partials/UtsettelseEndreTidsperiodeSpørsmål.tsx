import React from 'react';
import moment from 'moment';
import Modal from 'nav-frontend-modal';
import { useIntl } from 'react-intl';
import { Tidsperiode, TidsperiodeString } from 'common/types';
import { dateToISOString, getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { getTidsperiode, Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import UkerDagerTeller from 'common/components/skjema/elements/uker-dager-teller/UkerDagerTeller';
import getMessage from 'common/util/i18nUtils';
import { commonFieldErrorRenderer } from 'app/validation/fieldValidations';
import Block from 'common/components/block/Block';
import { dateRangeValidation } from 'app/util/dates/dates';

export interface Props {
    tidsperiode: Partial<TidsperiodeString>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder?: Tidsperiode[];
    onBekreft: (tidsperiode: Partial<TidsperiodeString>) => void;
    changeTidsperiode: (tidsperiode: Partial<TidsperiodeString>) => void;
    onAvbryt: () => void;
    visible: boolean;
}

enum TidsperiodeFormFields {
    fom = 'fom',
    tom = 'tom',
}

type TidsperiodeFormValues = Partial<TidsperiodeString>;

const Form = getTypedFormComponents<TidsperiodeFormFields, TidsperiodeFormValues>();

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

    return (
        <>
            <Modal isOpen={visible} closeButton={true} onRequestClose={onAvbryt} contentLabel="Test">
                <Form.FormikWrapper
                    initialValues={{ fom: tidsperiode.fom, tom: tidsperiode.tom }}
                    onSubmit={onBekreft}
                    enableReinitialize={true}
                    renderForm={({ values }) => {
                        const datoAvgrensninger = {
                            fra: {
                                minDato: familiehendelsesdato,
                                maksDato: tidsperiode ? ISOStringToDate(values.tom) : undefined,
                                ugyldigeTidsperioder,
                                helgedagerIkkeTillatt: true,
                            },
                            til: {
                                minDato: tidsperiode ? ISOStringToDate(values.fom) : undefined,
                                maksDato: moment(familiehendelsesdato).add(3, 'years').toDate(),
                                ugyldigeTidsperioder,
                                helgedagerIkkeTillatt: true,
                            },
                        };

                        return (
                            <Form.Form fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}>
                                <Block>
                                    <Form.DateIntervalPicker
                                        legend="Tidsrom"
                                        fromDatepickerProps={{
                                            name: TidsperiodeFormFields.fom,
                                            label: getMessage(intl, 'fraogmed'),
                                            fullscreenOverlay: true,
                                            minDate: datoAvgrensninger.fra.minDato,
                                            invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                            maxDate: ISOStringToDate(values.tom) || datoAvgrensninger.fra.maksDato,
                                            disableWeekend: datoAvgrensninger.fra.helgedagerIkkeTillatt,
                                            validate: (value) =>
                                                dateRangeValidation.validateFromDateUttak(
                                                    ISOStringToDate(value),
                                                    datoAvgrensninger.fra.minDato!,
                                                    datoAvgrensninger.fra.maksDato!,
                                                    ISOStringToDate(values.tom)
                                                ),
                                            dayPickerProps: {
                                                initialMonth: familiehendelsesdato,
                                            },
                                        }}
                                        toDatepickerProps={{
                                            name: TidsperiodeFormFields.tom,
                                            label: getMessage(intl, 'tilogmed'),
                                            fullscreenOverlay: true,
                                            minDate: ISOStringToDate(values.fom) || datoAvgrensninger.til.minDato,
                                            maxDate: datoAvgrensninger.til.maksDato,
                                            invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                            disableWeekend: datoAvgrensninger.fra.helgedagerIkkeTillatt,
                                            validate: (value) =>
                                                dateRangeValidation.validateToDateUttak(
                                                    ISOStringToDate(value),
                                                    datoAvgrensninger.til.minDato!,
                                                    datoAvgrensninger.til.maksDato!,
                                                    ISOStringToDate(values.fom)
                                                ),
                                        }}
                                    />
                                </Block>
                            </Form.Form>
                        );
                    }}
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
                                tom: dateToISOString(getTidsperiode(date, nyUker * 5 + dager).tom),
                            });
                        }
                    },
                    ariaLabel: 'Antall uker',
                    increaseAriaLabel: 'Øk antall uker med en uke',
                    decreaseAriaLabel: 'Mink antall uker med en uke',
                }}
                dagStepper={{
                    value: dager !== undefined && dager !== 5 ? dager : 0,
                    min: 0,
                    max: 5,
                    onChange: (nyDager: number) => {
                        const date = ISOStringToDate(tidsperiode.fom);
                        if (date) {
                            changeTidsperiode({
                                fom: dateToISOString(date),
                                tom: dateToISOString(getTidsperiode(date, uker * 5 + nyDager).tom),
                            });
                        }
                    },
                    ariaLabel: 'Antall dager',
                    increaseAriaLabel: 'Øk antall dager med en dag',
                    decreaseAriaLabel: 'Mink antall dager med en dag',
                }}
            />
        </>
    );
};

export default UtsettelseEndreTidsperiodeSpørsmål;
