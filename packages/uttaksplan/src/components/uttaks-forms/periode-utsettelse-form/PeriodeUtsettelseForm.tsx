import {
    bemUtils,
    Block,
    guid,
    hasValue,
    intlUtils,
    ActionLink,
    NavnPåForeldre,
    Situasjon,
    Arbeidsforhold,
    Periode,
    Utsettelsesperiode,
    førsteOktober2021ReglerGjelder,
    getIsValidStateForPerioder,
    Tidsperioden,
    isValidTidsperiode,
    ISOStringToDate,
    getSlettPeriodeTekst,
    PeriodeValidState,
} from '@navikt/fp-common';
import { Dispatch, FunctionComponent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormData,
    PeriodeUtsettelseFormField,
} from './periodeUtsettelseFormConfig';
import {
    cleanupPeriodeUtsettelseFormData,
    getPeriodeUtsettelseFormInitialValues,
    mapPeriodeUtsettelseFormToPeriode,
} from './periodeUtsettelseFormUtils';

import {
    PeriodeUtsettelseFormConfigPayload,
    periodeUtsettelseFormQuestionsConfig,
} from './periodeUtsettelseFormQuestionsConfig';
import UtsettelseÅrsakSpørsmål from '../spørsmål/utsettelse-årsak/UtsettelseÅrsakSpørsmål';
import AktivitetskravSpørsmål from '../spørsmål/aktivitetskrav/AktivitetskravSpørsmål';
import { Button } from '@navikt/ds-react';
import TidsperiodeDisplay from '../../tidsperiode-display/TidsperiodeDisplay';
import UtsettelseEndreTidsperiodeSpørsmål from '../../utsettelse-tidsperiode-spørsmål/UtsettelseTidsperiodeSpørsmål';

import './periodeUtsettelseForm.less';

interface Props {
    periode: Periode;
    familiehendelsesdato: Date;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
    handleAddPeriode?: (nyPeriode: Periode, familiehendelsedato: Date) => void;
    setNyPeriodeFormIsVisible?: Dispatch<React.SetStateAction<boolean>>;
    toggleIsOpen?: (id: string) => void;
    handleDeletePeriode?: (periodeId: string) => void;
    isNyPeriode?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erMorUfør: boolean;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
    arbeidsforhold: Arbeidsforhold[];
    situasjon: Situasjon;
    utsettelserIPlan: Utsettelsesperiode[];
    setPerioderErGyldige: React.Dispatch<React.SetStateAction<PeriodeValidState[]>>;
    isOpen: boolean;
}

const PeriodeUtsettelseForm: FunctionComponent<Props> = ({
    periode,
    familiehendelsesdato,
    handleUpdatePeriode,
    erFarEllerMedmor,
    erAleneOmOmsorg,
    handleAddPeriode,
    handleDeletePeriode,
    toggleIsOpen,
    isNyPeriode = false,
    setNyPeriodeFormIsVisible,
    navnPåForeldre,
    erMorUfør,
    søkerErFarEllerMedmorOgKunDeHarRett,
    situasjon,
    utsettelserIPlan,
    setPerioderErGyldige,
    isOpen,
}) => {
    const intl = useIntl();
    const [periodeIsValid, setPeriodeIsValid] = useState(true);
    const { id } = periode;
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const bem = bemUtils('periodeUtsettelseForm');
    const skalViseGamleUtsettelseÅrsaker = førsteOktober2021ReglerGjelder(familiehendelsesdato) === false; // Utsettelseårsaker som gjelder for søknader sendt før 1. oktober 2021
    const erFarMedmorOgHarAleneomsorg = erFarEllerMedmor && erAleneOmOmsorg;

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };

    useEffect(() => {
        setPerioderErGyldige((previousState: PeriodeValidState[]) => {
            return getIsValidStateForPerioder(previousState, periode, periodeIsValid);
        });
    }, [periodeIsValid, periode, setPerioderErGyldige]);

    return (
        <PeriodeUtsettelseFormComponents.FormikWrapper
            initialValues={getPeriodeUtsettelseFormInitialValues(periode)}
            onSubmit={(values) => {
                if (!isNyPeriode) {
                    handleUpdatePeriode(
                        mapPeriodeUtsettelseFormToPeriode(values, id, erFarEllerMedmor),
                        familiehendelsesdato,
                    );
                } else {
                    setNyPeriodeFormIsVisible!(false);
                    handleAddPeriode!(
                        mapPeriodeUtsettelseFormToPeriode(values, guid(), erFarEllerMedmor),
                        familiehendelsesdato,
                    );
                }
            }}
            renderForm={({ setFieldValue, values, isValid }) => {
                const visibility = periodeUtsettelseFormQuestionsConfig.getVisbility({
                    values,
                    erFarEllerMedmor,
                    erAleneOmOmsorg,
                    søkerErFarEllerMedmorOgKunDeHarRett,
                } as PeriodeUtsettelseFormConfigPayload);
                if (isValid !== periodeIsValid) {
                    setPeriodeIsValid(isValid);
                }
                const antallHelligdager = Tidsperioden({ fom: values.fom!, tom: values.tom! }).getAntallFridager();
                const antallUttaksdager = Tidsperioden({ fom: values.fom!, tom: values.tom! }).getAntallUttaksdager();
                const periodenErKunHelligdager = antallHelligdager === antallUttaksdager;
                return (
                    <>
                        <Block visible={!isValidTidsperiode({ fom: values.fom!, tom: values.tom! })} padBottom="xl">
                            <TidsperiodeForm
                                tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                familiehendelsesdato={familiehendelsesdato}
                                onBekreft={(values) => {
                                    setFieldValue(PeriodeUtsettelseFormField.fom, ISOStringToDate(values.fom));
                                    setFieldValue(PeriodeUtsettelseFormField.tom, ISOStringToDate(values.tom));
                                }}
                                ugyldigeTidsperioder={undefined}
                                utsettelserIPlan={utsettelserIPlan}
                                erFarEllerMedmor={erFarEllerMedmor}
                                morHarRett={!søkerErFarEllerMedmorOgKunDeHarRett}
                                situasjon={situasjon}
                                erFarMedmorOgHarAleneomsorg={erFarMedmorOgHarAleneomsorg}
                            />
                        </Block>
                        <PeriodeUtsettelseFormComponents.Form includeButtons={false}>
                            {!isNyPeriode && (
                                <SubmitListener
                                    cleanup={() =>
                                        cleanupPeriodeUtsettelseFormData(values as PeriodeUtsettelseFormData)
                                    }
                                />
                            )}

                            <Block visible={isValidTidsperiode({ fom: values.fom!, tom: values.tom! })} padBottom="xl">
                                <TidsperiodeDisplay
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                    toggleVisTidsperiode={toggleVisTidsperiode}
                                />
                                <UtsettelseEndreTidsperiodeSpørsmål
                                    periode={periode}
                                    familiehendelsesdato={familiehendelsesdato}
                                    ugyldigeTidsperioder={undefined}
                                    utsettelserIPlan={utsettelserIPlan}
                                    onBekreft={(values) => {
                                        setTidsperiodeIsOpen(false);
                                        setFieldValue(PeriodeUtsettelseFormField.fom, ISOStringToDate(values.fom));
                                        setFieldValue(PeriodeUtsettelseFormField.tom, ISOStringToDate(values.tom));
                                    }}
                                    changeTidsperiode={(values) => {
                                        setTimeout(() => {
                                            setFieldValue(PeriodeUtsettelseFormField.fom, values.fom);
                                            setFieldValue(PeriodeUtsettelseFormField.tom, values.tom);
                                        }, 0);
                                    }}
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                    onAvbryt={() => setTidsperiodeIsOpen(false)}
                                    visible={tidsperiodeIsOpen}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    morHarRett={!søkerErFarEllerMedmorOgKunDeHarRett}
                                    situasjon={situasjon}
                                    erFarMedmorOgHarAleneomsorg={erFarMedmorOgHarAleneomsorg}
                                />
                            </Block>
                            <Block visible={visibility.isVisible(PeriodeUtsettelseFormField.årsak)} padBottom="xl">
                                <UtsettelseÅrsakSpørsmål
                                    periodenErKunHelligdager={periodenErKunHelligdager}
                                    skalViseGamleUtsettelseÅrsaker={skalViseGamleUtsettelseÅrsaker}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    tidsperiodenErInnenforFørsteSeksUker={Tidsperioden({
                                        fom: values.fom!,
                                        tom: values.tom!,
                                    }).erInnenforFørsteSeksUker(familiehendelsesdato)}
                                    utsettelseårsak={values.årsak!}
                                    erMorUfør={erMorUfør}
                                    søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                                    isOpen={isOpen}
                                />
                            </Block>
                            <Block
                                visible={visibility.isVisible(PeriodeUtsettelseFormField.bekrefterArbeidIPerioden)}
                                padBottom="xl"
                            >
                                <PeriodeUtsettelseFormComponents.Checkbox
                                    name={PeriodeUtsettelseFormField.bekrefterArbeidIPerioden}
                                    label={intlUtils(intl, 'uttaksplan.bekrefterArbeidIPerioden')}
                                    validate={(value) => {
                                        if (!hasValue(value) || value === undefined || value === false) {
                                            return intlUtils(intl, 'uttaksplan.validering.bekrefterArbeidIPerioden');
                                        }

                                        return undefined;
                                    }}
                                />
                            </Block>
                            <Block
                                visible={visibility.isVisible(PeriodeUtsettelseFormField.morsAktivitetIPerioden)}
                                padBottom="xl"
                            >
                                <AktivitetskravSpørsmål
                                    aktivitetskravMorValue={values.morsAktivitetIPerioden!}
                                    fieldName={PeriodeUtsettelseFormField.morsAktivitetIPerioden}
                                    navnPåForeldre={navnPåForeldre}
                                    FormComponents={PeriodeUtsettelseFormComponents}
                                />
                            </Block>
                            <Block
                                visible={
                                    !isNyPeriode && handleDeletePeriode !== undefined && toggleIsOpen !== undefined
                                }
                            >
                                <div style={{ textAlign: 'center', position: 'relative' }}>
                                    <Button variant="secondary" onClick={() => toggleIsOpen!(periode.id)}>
                                        <FormattedMessage id="uttaksplan.lukk" />
                                    </Button>
                                    <div className={bem.element('slettPeriodeWrapper')}>
                                        <ActionLink
                                            onClick={() => handleDeletePeriode!(periode.id)}
                                            className={bem.element('slettPeriode')}
                                        >
                                            <FormattedMessage id={getSlettPeriodeTekst(periode.type)} />
                                        </ActionLink>
                                    </div>
                                </div>
                            </Block>
                            <Block
                                visible={
                                    isNyPeriode &&
                                    setNyPeriodeFormIsVisible !== undefined &&
                                    handleAddPeriode !== undefined
                                }
                            >
                                <div className={bem.element('knapperad')}>
                                    <Button variant="secondary" onClick={() => setNyPeriodeFormIsVisible!(false)}>
                                        <FormattedMessage id="uttaksplan.avbryt" />
                                    </Button>
                                    {visibility.areAllQuestionsAnswered() ? (
                                        <Button type="submit">
                                            <FormattedMessage id="uttaksplan.leggTil" />
                                        </Button>
                                    ) : null}
                                </div>
                            </Block>
                        </PeriodeUtsettelseFormComponents.Form>
                    </>
                );
            }}
        />
    );
};

export default PeriodeUtsettelseForm;
