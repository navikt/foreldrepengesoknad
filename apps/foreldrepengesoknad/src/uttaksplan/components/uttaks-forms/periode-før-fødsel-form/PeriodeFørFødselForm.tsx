import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Situasjon } from 'app/types/Situasjon';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import TidsperiodeDisplay from 'uttaksplan/components/tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from 'uttaksplan/components/uttak-endre-tidsperiode-spørsmål/UttakEndreTidsperiodeSpørsmål';
import { ForeldrepengerFørFødselUttaksperiode, Periode, Utsettelsesperiode } from 'uttaksplan/types/Periode';
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

    const handleCleanup = (
        values: PeriodeFørFødselFormData,
        _visibility: QuestionVisibility<PeriodeFørFødselFormField, undefined>,
    ): PeriodeFørFødselFormData => {
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
                                utsettelserIPlan={utsettelserIPlan}
                                erFarEllerMedmor={erFarEllerMedmor}
                                morHarRett={morHarRett}
                                situasjon={situasjon}
                                erFarMedmorOgHarAleneomsorg={false}
                            />
                        </Block>
                        <PeriodeFørFødselFormComponents.Form includeButtons={false}>
                            <SubmitListener
                                cleanup={() => handleCleanup(values as PeriodeFørFødselFormData, visibility)}
                            />

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
                                    ugyldigeTidsperioder={undefined}
                                    utsettelserIPlan={utsettelserIPlan}
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
