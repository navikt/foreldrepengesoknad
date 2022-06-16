import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { ISOStringToDate } from 'app/utils/dateUtils';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import TidsperiodeDisplay from 'uttaksplan/components/tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from 'uttaksplan/components/uttak-endre-tidsperiode-spørsmål/UttakEndreTidsperiodeSpørsmål';
import { ForeldrepengerFørFødselUttaksperiode, Periode } from 'uttaksplan/types/Periode';
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
}

const PeriodeFørFødselForm: FunctionComponent<Props> = ({
    periode,
    familiehendelsesdato,
    handleUpdatePeriode,
    erFarEllerMedmor,
    morHarRett,
}) => {
    const { tidsperiode } = periode;
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const intl = useIntl();

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };

    const handleCleanup = (
        values: PeriodeFørFødselFormData,
        _visibility: QuestionVisibility<PeriodeFørFødselFormField, undefined>
    ): PeriodeFørFødselFormData => {
        return values;
    };

    return (
        <PeriodeFørFødselFormComponents.FormikWrapper
            initialValues={getPeriodeFørFødselFormInitialValues(periode)}
            onSubmit={(values) =>
                handleUpdatePeriode(mapPeriodeFørFødselFormToPeriode(values, periode), familiehendelsesdato)
            }
            renderForm={({ setFieldValue, values }) => {
                const visibility = periodeFørFødselFormQuestionsConfig.getVisbility(values);

                return (
                    <>
                        <Block
                            visible={
                                !isValidTidsperiode(tidsperiode) && visibility.isVisible(PeriodeFørFødselFormField.fom)
                            }
                            padBottom="l"
                        >
                            <TidsperiodeForm
                                tidsperiode={tidsperiode}
                                familiehendelsesdato={familiehendelsesdato}
                                onBekreft={(values) => {
                                    setFieldValue(PeriodeFørFødselFormField.fom, ISOStringToDate(values.fom));
                                    setFieldValue(PeriodeFørFødselFormField.tom, ISOStringToDate(values.tom));
                                }}
                                ugyldigeTidsperioder={undefined}
                                erFarEllerMedmor={erFarEllerMedmor}
                                morHarRett={morHarRett}
                            />
                        </Block>
                        <PeriodeFørFødselFormComponents.Form includeButtons={false}>
                            <SubmitListener cleanup={() => handleCleanup(values, visibility)} />

                            <Block
                                visible={
                                    isValidTidsperiode(tidsperiode) &&
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
                                    ugyldigeTidsperioder={[]}
                                    onBekreft={(values) => {
                                        toggleVisTidsperiode();
                                        setFieldValue(PeriodeFørFødselFormField.fom, values.fom);
                                        setFieldValue(PeriodeFørFødselFormField.tom, values.tom);
                                    }}
                                    changeTidsperiode={(values) => {
                                        setFieldValue(PeriodeFørFødselFormField.fom, values.fom);
                                        setFieldValue(PeriodeFørFødselFormField.tom, values.tom);
                                    }}
                                    tidsperiode={tidsperiode}
                                    onAvbryt={() => toggleVisTidsperiode()}
                                    visible={tidsperiodeIsOpen}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    morHarRett={morHarRett}
                                />
                            </Block>

                            <Block
                                visible={visibility.isVisible(PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin)}
                                padBottom="l"
                            >
                                <PeriodeFørFødselFormComponents.Checkbox
                                    name={PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin}
                                    label={intlUtils(intl, 'uttaksplan.periodeFørFødselForm.skalIkkeHaUttakFørTermin')}
                                />
                            </Block>
                        </PeriodeFørFødselFormComponents.Form>
                    </>
                );
            }}
        />
    );
};

export default PeriodeFørFødselForm;
