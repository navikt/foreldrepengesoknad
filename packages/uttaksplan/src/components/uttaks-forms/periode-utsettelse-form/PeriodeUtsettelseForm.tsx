import { Dispatch, FunctionComponent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { NavnPåForeldre, Periode, PeriodeValidState, Situasjon, Utsettelsesperiode } from '@navikt/fp-common';
import { Tidsperioden, isValidTidsperiodeString } from '@navikt/fp-utils';

import ActionLink from '../../../common/action-link/ActionLink';
import Block from '../../../common/block/Block';
import { ISOStringToDate, førsteOktober2021ReglerGjelder } from '../../../utils/dateUtils';
import { getUttaksdagerSomErFridager } from '../../../utils/getUttaksdagerSomErFridager';
import { guid } from '../../../utils/guid';
import { getIsValidStateForPerioder, getSlettPeriodeTekst } from '../../../utils/periodeUtils';
import planBemUtils from '../../../utils/planBemUtils';
import TidsperiodeDisplay from '../../tidsperiode-display/TidsperiodeDisplay';
import UtsettelseEndreTidsperiodeSpørsmål from '../../utsettelse-tidsperiode-spørsmål/UtsettelseTidsperiodeSpørsmål';
import AktivitetskravSpørsmål from '../spørsmål/aktivitetskrav/AktivitetskravSpørsmål';
import UtsettelseÅrsakSpørsmål from '../spørsmål/utsettelse-årsak/UtsettelseÅrsakSpørsmål';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import './periodeUtsettelseForm.less';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormData,
    PeriodeUtsettelseFormField,
} from './periodeUtsettelseFormConfig';
import {
    PeriodeUtsettelseFormConfigPayload,
    periodeUtsettelseFormQuestionsConfig,
} from './periodeUtsettelseFormQuestionsConfig';
import {
    cleanupPeriodeUtsettelseFormData,
    getPeriodeUtsettelseFormInitialValues,
    mapPeriodeUtsettelseFormToPeriode,
} from './periodeUtsettelseFormUtils';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

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
    situasjon: Situasjon;
    utsettelserIPlan: Utsettelsesperiode[];
    setPerioderErGyldige: React.Dispatch<React.SetStateAction<PeriodeValidState[]>>;
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
}) => {
    const intl = useIntl();
    const [periodeIsValid, setPeriodeIsValid] = useState(true);
    const { id } = periode;
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const bem = planBemUtils('periodeUtsettelseForm');

    // Utsettelseårsaker som gjelder for søknader sendt før 1. oktober 2021
    const skalViseGamleUtsettelseÅrsaker = førsteOktober2021ReglerGjelder(familiehendelsesdato) === false;

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
                const antallHelligdager = getUttaksdagerSomErFridager({ fom: values.fom!, tom: values.tom! }).length;
                const antallUttaksdager = Tidsperioden({ fom: values.fom!, tom: values.tom! }).getAntallUttaksdager();
                const periodenErKunHelligdager = antallHelligdager === antallUttaksdager;
                return (
                    <>
                        <Block
                            visible={!isValidTidsperiodeString({ fom: values.fom!, tom: values.tom! })}
                            padBottom="xl"
                        >
                            <TidsperiodeForm
                                tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                familiehendelsesdato={familiehendelsesdato}
                                onBekreft={(currentValues) => {
                                    setFieldValue(PeriodeUtsettelseFormField.fom, ISOStringToDate(currentValues.fom));
                                    setFieldValue(PeriodeUtsettelseFormField.tom, ISOStringToDate(currentValues.tom));
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

                            <Block
                                visible={isValidTidsperiodeString({ fom: values.fom!, tom: values.tom! })}
                                padBottom="xl"
                            >
                                <TidsperiodeDisplay
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                    toggleVisTidsperiode={toggleVisTidsperiode}
                                />
                                <UtsettelseEndreTidsperiodeSpørsmål
                                    periode={periode}
                                    familiehendelsesdato={familiehendelsesdato}
                                    ugyldigeTidsperioder={undefined}
                                    utsettelserIPlan={utsettelserIPlan}
                                    onBekreft={(currentValues) => {
                                        setTidsperiodeIsOpen(false);
                                        setFieldValue(
                                            PeriodeUtsettelseFormField.fom,
                                            ISOStringToDate(currentValues.fom),
                                        );
                                        setFieldValue(
                                            PeriodeUtsettelseFormField.tom,
                                            ISOStringToDate(currentValues.tom),
                                        );
                                    }}
                                    changeTidsperiode={(currentValues) => {
                                        setTimeout(() => {
                                            setFieldValue(PeriodeUtsettelseFormField.fom, currentValues.fom);
                                            setFieldValue(PeriodeUtsettelseFormField.tom, currentValues.tom);
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
                                    erMorUfør={erMorUfør}
                                    søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                                />
                            </Block>
                            <Block
                                visible={visibility.isVisible(PeriodeUtsettelseFormField.bekrefterArbeidIPerioden)}
                                padBottom="xl"
                            >
                                <PeriodeUtsettelseFormComponents.Checkbox
                                    name={PeriodeUtsettelseFormField.bekrefterArbeidIPerioden}
                                    label={intl.formatMessage({ id: 'uttaksplan.bekrefterArbeidIPerioden' })}
                                    validate={(value) => {
                                        if (!hasValue(value) || value === undefined || value === false) {
                                            return intl.formatMessage({
                                                id: 'uttaksplan.validering.bekrefterArbeidIPerioden',
                                            });
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
                                            {/* @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart */}
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
