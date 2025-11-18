import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

import {
    Periode,
    Situasjon,
    Tidsperiode,
    TidsperiodeDate,
    Utsettelsesperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '@navikt/fp-common';

import Block from '../../../common/block/Block';
import { dateToISOString, getTypedFormComponents } from '../../../formik-wrappers';
import {
    ISOStringToDate,
    andreAugust2022ReglerGjelder,
    dateRangeValidation,
    getFørsteUttaksdagPåEllerEtterFødsel,
} from '../../../utils/dateUtils';
import {
    DatoAvgrensninger,
    getDatoavgrensningerForBareFarMedmorHarRettWLB,
    getDatoavgrensningerForFarMedmorPeriodeRundtFødselWLB,
    getDatoavgrensningerForStønadskonto,
} from '../../../utils/datoAvgrensningerUtils';
import { mapTidsperiodeStringToTidsperiode } from '../../../utils/periodeUtils';
import { getFørsteMuligeUttaksdag } from '../../../utils/uttaksdatoerUtils';
import { isUttaksperiodeBareFarMedmorHarRett, isUttaksperiodeFarMedmorPgaFødsel } from '../../../utils/wlbUtils';

interface Props {
    periode?: Periode;
    tidsperiode: TidsperiodeDate;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[] | undefined;
    utsettelserIPlan: Utsettelsesperiode[];
    erFarEllerMedmor: boolean;
    morHarRett: boolean;
    onBekreft: (tidsperiode: Partial<Tidsperiode>) => void;
    onCancel?: () => void;
    initialMonth?: Date;
    termindato?: Date;
    situasjon: Situasjon;
    erFarMedmorOgHarAleneomsorg: boolean;
}

enum TidsperiodeFormFields {
    fom = 'fom',
    tom = 'tom',
}

export type TidsperiodeFormValues = Partial<Tidsperiode>;

const Form = getTypedFormComponents<TidsperiodeFormFields, TidsperiodeFormValues>();

const getDatoAvgrensninger = (
    periode: Periode | undefined,
    familiehendelsesdato: Date,
    fom: string | undefined,
    tom: string | undefined,
    tidsperiode: Partial<TidsperiodeDate>,
    ugyldigeTidsperioder: Tidsperiode[] | undefined,
    termindato: Date | undefined,
    erFarEllerMedmor: boolean,
    morHarRett: boolean,
    situasjon: Situasjon,
    erFarMedmorOgHarAleneomsorg: boolean,
): DatoAvgrensninger => {
    if (periode && !isUtsettelsesperiode(periode)) {
        if (
            isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato) &&
            andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            situasjon === 'fødsel'
        ) {
            return getDatoavgrensningerForFarMedmorPeriodeRundtFødselWLB(
                familiehendelsesdato,
                termindato,
                ugyldigeTidsperioder,
            );
        }
        if (
            isUttaksperiodeBareFarMedmorHarRett(periode, morHarRett) &&
            andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            situasjon === 'fødsel'
        ) {
            return getDatoavgrensningerForBareFarMedmorHarRettWLB(
                familiehendelsesdato,
                termindato,
                ugyldigeTidsperioder,
            );
        }
        return getDatoavgrensningerForStønadskonto(
            isUttaksperiode(periode) ? periode.konto : undefined,
            familiehendelsesdato,
            mapTidsperiodeStringToTidsperiode({ fom, tom }),
            ugyldigeTidsperioder,
            erFarEllerMedmor,
            termindato,
        );
    }

    const førsteMuligeUttaksdag = erFarMedmorOgHarAleneomsorg
        ? getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)
        : getFørsteMuligeUttaksdag(familiehendelsesdato, erFarEllerMedmor, termindato);

    return {
        fra: {
            minDato: førsteMuligeUttaksdag,
            maksDato: tidsperiode
                ? ISOStringToDate(tom)!
                : dayjs(familiehendelsesdato).add(3, 'years').subtract(1, 'day').toDate(),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: tidsperiode ? ISOStringToDate(fom)! : førsteMuligeUttaksdag,
            maksDato: dayjs(familiehendelsesdato).add(3, 'years').subtract(1, 'day').toDate(),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
    };
};
// eslint-disable-next-line @typescript-eslint/no-restricted-types
const TidsperiodeForm: React.FunctionComponent<Props> = ({
    periode,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
    utsettelserIPlan,
    initialMonth,
    termindato,
    erFarEllerMedmor,
    morHarRett,
    situasjon,
    onBekreft,
    onCancel,
    erFarMedmorOgHarAleneomsorg,
}) => {
    const intl = useIntl();

    return (
        <Form.FormikWrapper
            initialValues={{ fom: dateToISOString(tidsperiode.fom), tom: dateToISOString(tidsperiode.tom) }}
            onSubmit={onBekreft}
            enableReinitialize={true}
            renderForm={({ values }) => {
                const datoAvgrensninger = getDatoAvgrensninger(
                    periode,
                    familiehendelsesdato,
                    values.fom,
                    values.tom,
                    tidsperiode,
                    ugyldigeTidsperioder,
                    termindato,
                    erFarEllerMedmor,
                    morHarRett,
                    situasjon,
                    erFarMedmorOgHarAleneomsorg,
                );

                return (
                    <Form.Form onCancel={onCancel} includeButtons={false}>
                        <Block>
                            <Form.DateRangePicker
                                legend={intl.formatMessage({ id: 'utenlandsopphold.leggTilUtenlandsopphold.tidsrom' })}
                                fromInputProps={{
                                    name: TidsperiodeFormFields.fom,
                                    label: intl.formatMessage({
                                        id: 'utenlandsopphold.leggTilUtenlandsopphold.fraogmed',
                                    }),

                                    validate: (value) =>
                                        dateRangeValidation.validateFromDateInRange({
                                            intl,
                                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                            date: ISOStringToDate(value),
                                            minDate: datoAvgrensninger.fra.minDato,
                                            maxDate: datoAvgrensninger.fra.maksDato,
                                            errorKey: 'valideringsfeil.fraOgMedDato.førTilDato',
                                            toDate: ISOStringToDate(values.tom),
                                            disableWeekend: datoAvgrensninger.fra.helgedagerIkkeTillatt,
                                            utsettelserIPlan: utsettelserIPlan,
                                            periodeId: periode !== undefined ? periode.id : undefined,
                                        }),
                                    defaultMonth: initialMonth || familiehendelsesdato,
                                }}
                                toInputProps={{
                                    name: TidsperiodeFormFields.tom,
                                    label: intl.formatMessage({
                                        id: 'utenlandsopphold.leggTilUtenlandsopphold.tilogmed',
                                    }),

                                    validate: (value) =>
                                        dateRangeValidation.validateToDateInRange({
                                            intl,
                                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                            date: ISOStringToDate(value),
                                            minDate: datoAvgrensninger.til.minDato,
                                            maxDate: datoAvgrensninger.til.maksDato,
                                            errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                                            fromDate: ISOStringToDate(values.fom),
                                            disableWeekend: datoAvgrensninger.til.helgedagerIkkeTillatt,
                                            utsettelserIPlan: utsettelserIPlan,
                                            periodeId: periode !== undefined ? periode.id : undefined,
                                        }),
                                    defaultMonth: ISOStringToDate(values.fom),
                                }}
                                disableWeekends={true}
                                minDate={datoAvgrensninger.fra.minDato}
                                maxDate={datoAvgrensninger.til.maksDato}
                            />
                        </Block>
                        <Button type="submit">
                            <FormattedMessage id="uttaksplan.gåVidere" />
                        </Button>
                    </Form.Form>
                );
            }}
        />
    );
};
// eslint-disable-next-line import/no-default-export
export default TidsperiodeForm;
