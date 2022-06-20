import { bemUtils, Block } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Forelder } from 'app/types/Forelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import LinkButton from 'uttaksplan/components/link-button/LinkButton';
import TidsperiodeDisplay from 'uttaksplan/components/tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from 'uttaksplan/components/uttak-endre-tidsperiode-spørsmål/UttakEndreTidsperiodeSpørsmål';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getVelgbareStønadskontotyper } from 'uttaksplan/utils/stønadskontoerUtils';
import ErMorForSykSpørsmål from '../spørsmål/er-mor-for-syk/ErMorForSykSpørsmål';
import FlerbarnsdagerSpørsmål from '../spørsmål/flerbarnsdager/FlerbarnsdagerSpørsmål';
import HvemSkalHaUttakSpørsmål from '../spørsmål/hvem-skal-ha-uttak/HvemSkalHaUttakSpørsmål';
import HvilkenKontoSpørsmål from '../spørsmål/hvilken-konto/HvilkenKontoSpørsmål';
import UttakRundtFødselÅrsakSpørsmål from '../spørsmål/uttak-rundt-fødsel-årsak/UttakRundtFødselÅrsakSpørsmål';
import OverføringsårsakSpørsmål from '../spørsmål/overføringsårsak/OverføringsårsakSpørsmål';
import SamtidigUttakSpørsmål from '../spørsmål/samtidig-uttak/SamtidigUttakSpørsmål';
import SkalHaGraderingSpørsmål from '../spørsmål/skal-ha-gradering/SkalHaGraderingSpørsmål';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import { PeriodeUttakFormComponents, PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';
import {
    periodeUttakFormQuestionsConfig,
    skalViseInfoOmSamtidigUttakRundtFødsel as skalViseWLBInfoOmSamtidigUttakRundtFødsel,
} from './periodeUttakFormQuestionsConfig';
import {
    cleanPeriodeUttakFormData,
    getPeriodeUttakFormInitialValues,
    mapPeriodeUttakFormToPeriode,
} from './periodeUttakFormUtils';

import './periodeUttakForm.less';
import { FormattedMessage } from 'react-intl';
import { getSlettPeriodeTekst } from 'uttaksplan/utils/periodeUtils';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Situasjon } from 'app/types/Situasjon';
import { ISOStringToDate } from 'app/utils/dateUtils';
import AktivitetskravSpørsmål from '../spørsmål/aktivitetskrav/AktivitetskravSpørsmål';
import { guid } from 'nav-frontend-js-utils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';

interface Props {
    periode: Periode;
    erEndringssøknad: boolean;
    familiehendelsesdato: Date;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
    handleAddPeriode?: (nyPeriode: Periode, familiehendelsedato: Date) => void;
    setNyPeriodeFormIsVisible?: Dispatch<SetStateAction<boolean>>;
    toggleIsOpen?: (id: string) => void;
    handleDeletePeriode?: (periodeId: string) => void;
    isNyPeriode?: boolean;
    erMorUfør: boolean;
    setPeriodeErGyldig: Dispatch<SetStateAction<boolean>>;
    termindato: Date | undefined;
    morHarRett: boolean;
}

const periodenGjelderAnnenForelder = (erFarEllerMedmor: boolean, forelder: Forelder): boolean => {
    return (erFarEllerMedmor && forelder === Forelder.farMedmor) || (!erFarEllerMedmor && forelder === Forelder.mor)
        ? false
        : true;
};

const erUttakAvAnnenForeldersKvote = (konto: StønadskontoType | '', søkerErFarEllerMedmor: boolean): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

const getPeriodeType = (
    periodenGjelder: Forelder | '',
    erFarEllerMedmor: boolean,
    konto: StønadskontoType | ''
): Periodetype => {
    if (periodenGjelder === '' || konto === '') {
        return Periodetype.Uttak;
    }

    if (periodenGjelderAnnenForelder(erFarEllerMedmor, periodenGjelder)) {
        return Periodetype.Opphold;
    }

    if (erUttakAvAnnenForeldersKvote(konto, erFarEllerMedmor)) {
        return Periodetype.Overføring;
    }

    return Periodetype.Uttak;
};

const PeriodeUttakForm: FunctionComponent<Props> = ({
    familiehendelsesdato,
    periode,
    handleUpdatePeriode,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
    toggleIsOpen,
    arbeidsforhold,
    handleDeletePeriode,
    setNyPeriodeFormIsVisible,
    handleAddPeriode,
    isNyPeriode = false,
    erFarEllerMedmor,
    erFlerbarnssøknad,
    erAleneOmOmsorg,
    erDeltUttak,
    situasjon,
    erMorUfør,
    erEndringssøknad,
    setPeriodeErGyldig,
    termindato,
    morHarRett,
}) => {
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const bem = bemUtils('periodeUttakForm');

    useEffect(() => {
        return () => {
            setPeriodeErGyldig(true);
        };
    }, [setPeriodeErGyldig]);

    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };
    const forelder = erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;

    const handleCleanup = (
        values: PeriodeUttakFormData,
        visibility: QuestionVisibility<PeriodeUttakFormField, undefined>
    ): PeriodeUttakFormData => {
        return cleanPeriodeUttakFormData(values, visibility, erDeltUttak, forelder, erMorUfør);
    };

    const velgbareStønadskontoer = getVelgbareStønadskontotyper(stønadskontoer);
    const navnPåAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : undefined;

    return (
        <PeriodeUttakFormComponents.FormikWrapper
            initialValues={getPeriodeUttakFormInitialValues(periode, erDeltUttak, forelder, erMorUfør)}
            enableReinitialize={false}
            onSubmit={(values: Partial<PeriodeUttakFormData>) =>
                handleUpdatePeriode(
                    mapPeriodeUttakFormToPeriode(
                        values,
                        periode.id,
                        getPeriodeType(values.hvemSkalTaUttak!, erFarEllerMedmor, values.konto!),
                        familiehendelsesdato,
                        erFarEllerMedmor,
                        morHarRett,
                        situasjon
                    ),
                    familiehendelsesdato
                )
            }
            renderForm={({ setFieldValue, values, isValid }) => {
                const periodetype = getPeriodeType(values.hvemSkalTaUttak!, erFarEllerMedmor, values.konto!);
                setPeriodeErGyldig(isValid);

                const visibility = periodeUttakFormQuestionsConfig.getVisbility({
                    values,
                    regelProps: {
                        annenForelder,
                        erAleneOmOmsorg,
                        erDeltUttak,
                        erFarEllerMedmor,
                        erFlerbarnssøknad,
                        familiehendelsesdato,
                        periodetype,
                        situasjon,
                        termindato,
                        morHarRett,
                        stønadskontoer,
                    },
                });

                return (
                    <>
                        <Block visible={!isValidTidsperiode({ fom: values.fom!, tom: values.tom! })} padBottom="l">
                            <TidsperiodeForm
                                tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                familiehendelsesdato={familiehendelsesdato}
                                periode={periode}
                                onBekreft={(values) => {
                                    setFieldValue(PeriodeUttakFormField.fom, ISOStringToDate(values.fom));
                                    setFieldValue(PeriodeUttakFormField.tom, ISOStringToDate(values.tom));
                                }}
                                ugyldigeTidsperioder={undefined}
                                termindato={termindato}
                                erFarEllerMedmor={erFarEllerMedmor}
                                morHarRett={morHarRett}
                                situasjon={situasjon}
                            />
                        </Block>
                        <PeriodeUttakFormComponents.Form includeButtons={false}>
                            {!isNyPeriode && <SubmitListener cleanup={() => handleCleanup(values, visibility)} />}

                            <Block visible={isValidTidsperiode({ fom: values.fom!, tom: values.tom! })} padBottom="l">
                                <TidsperiodeDisplay
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                    toggleVisTidsperiode={toggleVisTidsperiode}
                                />
                                <UttakEndreTidsperiodeSpørsmål
                                    periode={periode}
                                    familiehendelsesdato={familiehendelsesdato}
                                    ugyldigeTidsperioder={[]}
                                    onBekreft={(values) => {
                                        toggleVisTidsperiode();
                                        setFieldValue(PeriodeUttakFormField.fom, ISOStringToDate(values.fom));
                                        setFieldValue(PeriodeUttakFormField.tom, ISOStringToDate(values.tom));
                                    }}
                                    changeTidsperiode={(values) => {
                                        setFieldValue(PeriodeUttakFormField.fom, values.fom);
                                        setFieldValue(PeriodeUttakFormField.tom, values.tom);
                                    }}
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                    onAvbryt={() => toggleVisTidsperiode()}
                                    visible={tidsperiodeIsOpen}
                                    termindato={termindato}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    morHarRett={morHarRett}
                                    situasjon={situasjon}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.hvemSkalTaUttak)}>
                                <HvemSkalHaUttakSpørsmål
                                    fieldName={PeriodeUttakFormField.hvemSkalTaUttak}
                                    erFarEllerMedmor={false}
                                    navnPåForeldre={navnPåForeldre}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.konto)}>
                                <HvilkenKontoSpørsmål
                                    fieldName={PeriodeUttakFormField.konto}
                                    velgbareStønadskontoer={velgbareStønadskontoer}
                                    erOppholdsperiode={false}
                                    navnPåForeldre={navnPåForeldre}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    situasjon={situasjon}
                                    erAleneOmOmsorg={erAleneOmOmsorg}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.overføringsårsak)}>
                                <OverføringsårsakSpørsmål
                                    vedlegg={values.overføringsdokumentasjon}
                                    navnAnnenForelder={navnPåAnnenForelder!}
                                    erEndringssøknad={erEndringssøknad}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(PeriodeUttakFormField.ønskerFlerbarnsdager)}
                            >
                                <FlerbarnsdagerSpørsmål fieldName={PeriodeUttakFormField.ønskerFlerbarnsdager} />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.erMorForSyk)}>
                                <ErMorForSykSpørsmål
                                    fieldName={PeriodeUttakFormField.erMorForSyk}
                                    erMorForSyk={values.erMorForSyk}
                                    navnMor={navnPåForeldre.mor}
                                    vedlegg={values.erMorForSykDokumentasjon}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(PeriodeUttakFormField.uttakRundtFødselÅrsak)}
                            >
                                <UttakRundtFødselÅrsakSpørsmål
                                    fieldName={PeriodeUttakFormField.uttakRundtFødselÅrsak}
                                    uttakRundtFødselÅrsak={values.uttakRundtFødselÅrsak}
                                    navnMor={navnPåForeldre.mor}
                                    vedlegg={values.erMorForSykDokumentasjon}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={skalViseWLBInfoOmSamtidigUttakRundtFødsel(
                                    values,
                                    familiehendelsesdato,
                                    erFarEllerMedmor,
                                    erDeltUttak,
                                    situasjon
                                )}
                            >
                                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                    <FormattedMessage id="uttaksplan.samtidigUttakVeileder" />
                                </Veilederpanel>
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.samtidigUttak)}>
                                <SamtidigUttakSpørsmål
                                    erFlerbarnssøknad={true}
                                    navnPåForeldre={navnPåForeldre}
                                    navnPåAnnenForelder={navnPåAnnenForelder}
                                    samtidigUttakProsentVisible={visibility.isVisible(
                                        PeriodeUttakFormField.samtidigUttakProsent
                                    )}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(PeriodeUttakFormField.aktivitetskravMor)}
                            >
                                <AktivitetskravSpørsmål
                                    fieldName={PeriodeUttakFormField.aktivitetskravMor}
                                    navnPåForeldre={navnPåForeldre}
                                    aktivitetskravMorValue={values.aktivitetskravMor}
                                    aktivitetskravVedlegg={values.aktivitetskravMorDokumentasjon}
                                    FormComponents={PeriodeUttakFormComponents}
                                    vedleggFieldName={PeriodeUttakFormField.aktivitetskravMorDokumentasjon}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(PeriodeUttakFormField.skalHaGradering)}>
                                <SkalHaGraderingSpørsmål
                                    graderingsprosentVisible={visibility.isVisible(
                                        PeriodeUttakFormField.stillingsprosent
                                    )}
                                    arbeidsforhold={arbeidsforhold}
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                />
                            </Block>
                            <Block
                                visible={
                                    !isNyPeriode && handleDeletePeriode !== undefined && toggleIsOpen !== undefined
                                }
                            >
                                <div style={{ textAlign: 'center', position: 'relative' }}>
                                    <Knapp htmlType="button" onClick={() => toggleIsOpen!(periode.id)}>
                                        <FormattedMessage id="uttaksplan.lukk" />
                                    </Knapp>
                                    <div className={bem.element('slettPeriodeWrapper')}>
                                        <LinkButton
                                            onClick={() => handleDeletePeriode!(periode.id)}
                                            className={bem.element('slettPeriode')}
                                        >
                                            <FormattedMessage id={getSlettPeriodeTekst(periode.type)} />
                                        </LinkButton>
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
                                    <Knapp htmlType="button" onClick={() => setNyPeriodeFormIsVisible!(false)}>
                                        <FormattedMessage id="uttaksplan.avbryt" />
                                    </Knapp>
                                    {visibility.areAllQuestionsAnswered() ? (
                                        <Hovedknapp
                                            htmlType="button"
                                            onClick={() => {
                                                handleAddPeriode!(
                                                    mapPeriodeUttakFormToPeriode(
                                                        values,
                                                        guid(),
                                                        periodetype,
                                                        familiehendelsesdato,
                                                        erFarEllerMedmor,
                                                        morHarRett,
                                                        situasjon
                                                    ),
                                                    familiehendelsesdato
                                                );
                                                setNyPeriodeFormIsVisible!(false);
                                            }}
                                        >
                                            <FormattedMessage id="uttaksplan.leggTil" />
                                        </Hovedknapp>
                                    ) : null}
                                </div>
                            </Block>
                        </PeriodeUttakFormComponents.Form>
                    </>
                );
            }}
        />
    );
};

export default PeriodeUttakForm;
