import React from 'react';
import moment from 'moment';
import Modal from 'nav-frontend-modal';
import { useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Tidsperiode, TidsperiodeString } from 'common/types';
import { UttakFormPeriodeType } from '../UttakForm';
import { isForeldrepengerFørFødselUttaksperiode, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { Tidsperioden, getTidsperiode } from 'app/util/uttaksplan/Tidsperioden';
import { getDatoavgrensningerForStønadskonto } from 'app/util/uttaksplan/uttaksperiodeUtils';
import { mapTidsperiodeStringToTidsperiode } from 'app/util/tidsperiodeUtils';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { dateRangeValidation } from 'app/util/dates/dates';
import UkerDagerTeller from 'common/components/skjema/elements/uker-dager-teller/UkerDagerTeller';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import { commonFieldErrorRenderer } from 'app/validation/fieldValidations';

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

enum TidsperiodeFormFields {
    fom = 'fom',
    tom = 'tom',
}

type TidsperiodeFormValues = Partial<TidsperiodeString>;

const Form = getTypedFormComponents<TidsperiodeFormFields, TidsperiodeFormValues>();

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
                <Form.FormikWrapper
                    initialValues={{ fom: tidsperiode.fom, tom: tidsperiode.tom }}
                    onSubmit={handleOnSubmit}
                    enableReinitialize={true}
                    renderForm={({ values }) => {
                        const datoAvgrensninger = getDatoavgrensningerForStønadskonto(
                            isUttaksperiode(periode) ? periode.konto : undefined,
                            familiehendelsesdato,
                            mapTidsperiodeStringToTidsperiode({ fom: values.fom, tom: values.tom }),
                            ugyldigeTidsperioder
                        );

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
                                            maxDate: ISOStringToDate(values.tom) || datoAvgrensninger.fra.maksDato,
                                            invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                            disableWeekend: datoAvgrensninger.fra.helgedagerIkkeTillatt,
                                            validate: (value) =>
                                                dateRangeValidation.validateFromDateUttak(
                                                    ISOStringToDate(value),
                                                    datoAvgrensninger.fra.minDato!,
                                                    datoAvgrensninger.fra.maksDato!,
                                                    ISOStringToDate(values.tom)
                                                ),
                                            dayPickerProps: {
                                                initialMonth,
                                            },
                                        }}
                                        toDatepickerProps={{
                                            name: TidsperiodeFormFields.tom,
                                            label: getMessage(intl, 'tilogmed'),
                                            fullscreenOverlay: true,
                                            minDate: ISOStringToDate(values.fom) || datoAvgrensninger.til.minDato,
                                            maxDate: datoAvgrensninger.til.maksDato,
                                            invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                            disableWeekend: datoAvgrensninger.til.helgedagerIkkeTillatt,
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
                                tom: getTidsperiode(date, uker * 5 + nyDager).tom,
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
