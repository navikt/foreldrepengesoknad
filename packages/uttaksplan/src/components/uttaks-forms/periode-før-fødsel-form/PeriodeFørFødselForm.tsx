import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

import { ForeldrepengerFørFødselUttaksperiode, Periode, Situasjon, Utsettelsesperiode } from '@navikt/fp-common';
import { isValidTidsperiodeString } from '@navikt/fp-utils';

import Block from '../../../common/block/Block';
import { ISOStringToDate } from '../../../utils/dateUtils';
import TidsperiodeDisplay from '../../tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from '../../uttak-endre-tidsperiode-spørsmål/UttakEndreTidsperiodeSpørsmål';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import {
    PeriodeFørFødselFormComponents,
    PeriodeFørFødselFormData,
    PeriodeFørFødselFormField,
} from './periodeFørFødselFormConfig';
import { periodeFørFødselFormQuestionsConfig } from './periodeFørFødselFormQuestionsConfig';
import { getPeriodeFørFødselFormInitialValues, mapPeriodeFørFødselFormToPeriode } from './periodeFørFødselFormUtils';

interface Props {
    periode: ForeldrepengerFørFødselUttaksperiode;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
    familiehendelsesdato: Date;
    erFarEllerMedmor: boolean;
    morHarRett: boolean;
    situasjon: Situasjon;
    utsettelserIPlan: Utsettelsesperiode[];
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const PeriodeFørFødselForm: FunctionComponent<Props> = ({
    periode,
    familiehendelsesdato,
    handleUpdatePeriode,
    erFarEllerMedmor,
    morHarRett,
    situasjon,
    utsettelserIPlan,
}) => {
    const { tidsperiode } = periode;
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const intl = useIntl();

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };

    const handleCleanup = (values: PeriodeFørFødselFormData): PeriodeFørFødselFormData => {
        return values;
    };

    return (
        <PeriodeFørFødselFormComponents.FormikWrapper
            initialValues={getPeriodeFørFødselFormInitialValues(periode, familiehendelsesdato)}
            onSubmit={(values) =>
                handleUpdatePeriode(mapPeriodeFørFødselFormToPeriode(values, periode), familiehendelsesdato)
            }
            renderForm={({ setFieldValue, values }) => {
                const visibility = periodeFørFødselFormQuestionsConfig.getVisbility(values as PeriodeFørFødselFormData);

                return (
                    <>
                        <Block
                            visible={
                                !isValidTidsperiodeString(tidsperiode) &&
                                visibility.isVisible(PeriodeFørFødselFormField.fom)
                            }
                            padBottom="l"
                        >
                            <TidsperiodeForm
                                tidsperiode={tidsperiode}
                                familiehendelsesdato={familiehendelsesdato}
                                onBekreft={(currentValues) => {
                                    setFieldValue(PeriodeFørFødselFormField.fom, ISOStringToDate(currentValues.fom));
                                    setFieldValue(PeriodeFørFødselFormField.tom, ISOStringToDate(currentValues.tom));
                                }}
                                ugyldigeTidsperioder={undefined}
                                utsettelserIPlan={utsettelserIPlan}
                                erFarEllerMedmor={erFarEllerMedmor}
                                morHarRett={morHarRett}
                                situasjon={situasjon}
                                erFarMedmorOgHarAleneomsorg={false}
                            />
                        </Block>
                        <PeriodeFørFødselFormComponents.Form includeButtons={false}>
                            <SubmitListener cleanup={() => handleCleanup(values as PeriodeFørFødselFormData)} />

                            <Block
                                visible={
                                    isValidTidsperiodeString(tidsperiode) &&
                                    visibility.isVisible(PeriodeFørFødselFormField.fom)
                                }
                                padBottom="l"
                            >
                                <TidsperiodeDisplay
                                    tidsperiode={tidsperiode}
                                    toggleVisTidsperiode={toggleVisTidsperiode}
                                />
                                <UttakEndreTidsperiodeSpørsmål
                                    periode={periode}
                                    familiehendelsesdato={familiehendelsesdato}
                                    ugyldigeTidsperioder={undefined}
                                    utsettelserIPlan={utsettelserIPlan}
                                    onBekreft={(currentValues) => {
                                        setTidsperiodeIsOpen(false);
                                        setFieldValue(PeriodeFørFødselFormField.fom, currentValues.fom);
                                        setFieldValue(PeriodeFørFødselFormField.tom, currentValues.tom);
                                    }}
                                    changeTidsperiode={(currentValues) => {
                                        setFieldValue(PeriodeFørFødselFormField.fom, currentValues.fom);
                                        setFieldValue(PeriodeFørFødselFormField.tom, currentValues.tom);
                                    }}
                                    tidsperiode={tidsperiode}
                                    onAvbryt={() => setTidsperiodeIsOpen(false)}
                                    visible={tidsperiodeIsOpen}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    morHarRett={morHarRett}
                                    situasjon={situasjon}
                                    erFarMedmorOgHarAleneomsorg={false}
                                />
                            </Block>

                            <Block
                                visible={visibility.isVisible(PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin)}
                                padBottom="l"
                            >
                                <PeriodeFørFødselFormComponents.Checkbox
                                    name={PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin}
                                    label={intl.formatMessage({
                                        id: 'uttaksplan.periodeFørFødselForm.skalIkkeHaUttakFørTermin',
                                    })}
                                />
                            </Block>
                        </PeriodeFørFødselFormComponents.Form>
                    </>
                );
            }}
        />
    );
};
// eslint-disable-next-line import/no-default-export
export default PeriodeFørFødselForm;
