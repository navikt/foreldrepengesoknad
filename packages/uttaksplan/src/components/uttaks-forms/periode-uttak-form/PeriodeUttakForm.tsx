import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { FormattedMessage, IntlShape } from 'react-intl';

import { BodyLong, Button, GuidePanel } from '@navikt/ds-react';

import {
    ActionLink,
    AnnenForelder,
    Arbeidsforhold,
    Block,
    Forelder,
    ISOStringToDate,
    NavnPåForeldre,
    OpprinneligSøkt,
    Periode,
    PeriodeValidState,
    Periodetype,
    Situasjon,
    StønadskontoType,
    TidsperiodeDate,
    Utsettelsesperiode,
    andreAugust2022ReglerGjelder,
    bemUtils,
    formaterDatoKompakt,
    getFiltrerteVelgbareStønadskontotyper,
    getFørsteUttaksdag2UkerFørFødsel,
    getIsValidStateForPerioder,
    getSisteUttaksdag6UkerEtterFødsel,
    getSlettPeriodeTekst,
    getVelgbareStønadskontotyper,
    guid,
    intlUtils,
    isAnnenForelderOppgitt,
    isUttaksperiode,
    isValidTidsperiode,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
} from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/fp-formik';
import { Stønadskonto } from '@navikt/fp-types';

import TidsperiodeDisplay from '../../tidsperiode-display/TidsperiodeDisplay';
import UttakEndreTidsperiodeSpørsmål from '../../uttak-endre-tidsperiode-spørsmål/UttakEndreTidsperiodeSpørsmål';
import AktivitetskravSpørsmål from '../spørsmål/aktivitetskrav/AktivitetskravSpørsmål';
import ErMorForSykSpørsmål from '../spørsmål/er-mor-for-syk/ErMorForSykSpørsmål';
import FlerbarnsdagerSpørsmål from '../spørsmål/flerbarnsdager/FlerbarnsdagerSpørsmål';
import HvemSkalHaUttakSpørsmål from '../spørsmål/hvem-skal-ha-uttak/HvemSkalHaUttakSpørsmål';
import HvilkenKontoSpørsmål from '../spørsmål/hvilken-konto/HvilkenKontoSpørsmål';
import OverføringsårsakSpørsmål from '../spørsmål/overføringsårsak/OverføringsårsakSpørsmål';
import SamtidigUttakSpørsmål from '../spørsmål/samtidig-uttak/SamtidigUttakSpørsmål';
import SkalHaGraderingSpørsmål from '../spørsmål/skal-ha-gradering/SkalHaGraderingSpørsmål';
import UttakRundtFødselÅrsakSpørsmål from '../spørsmål/uttak-rundt-fødsel-årsak/UttakRundtFødselÅrsakSpørsmål';
import { SubmitListener } from '../submit-listener/SubmitListener';
import TidsperiodeForm from '../tidsperiode-form/TidsperiodeForm';
import './periodeUttakForm.less';
import { PeriodeUttakFormComponents, PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';
import {
    PeriodeUttakFormQuestionsPayload,
    periodeUttakFormQuestionsConfig,
    skalViseWLBInfoOmSamtidigUttakRundtFødsel,
} from './periodeUttakFormQuestionsConfig';
import {
    cleanPeriodeUttakFormData,
    getPeriodeUttakFormInitialValues,
    mapPeriodeUttakFormToPeriode,
} from './periodeUttakFormUtils';

interface Props {
    periode: Periode;
    erEndringssøknad: boolean;
    familiehendelsesdato: Date;
    stønadskontoer: Stønadskonto[];
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
    setPerioderErGyldige: React.Dispatch<React.SetStateAction<PeriodeValidState[]>>;
    termindato: Date | undefined;
    morHarRett: boolean;
    antallBarn: number;
    utsettelserIPlan: Utsettelsesperiode[];
    intl: IntlShape;
    isOpen: boolean;
}

const periodenGjelderAnnenForelder = (erFarEllerMedmor: boolean, forelder: Forelder): boolean => {
    return !((erFarEllerMedmor && forelder === Forelder.farMedmor) || (!erFarEllerMedmor && forelder === Forelder.mor));
};

const erUttakAvAnnenForeldersKvote = (konto: StønadskontoType | '', søkerErFarEllerMedmor: boolean): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor === true) ||
        (konto === StønadskontoType.Fedrekvote && søkerErFarEllerMedmor === false)
    );
};

const getPeriodeType = (
    periodenGjelder: Forelder | '',
    erFarEllerMedmor: boolean,
    konto: StønadskontoType | '',
    familiehendelsedato: Date,
    termindato: Date | undefined,
    tidsperiode: TidsperiodeDate,
): Periodetype => {
    if (
        erFarEllerMedmor &&
        erUttakAvAnnenForeldersKvote(konto, erFarEllerMedmor) &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(tidsperiode, familiehendelsedato, termindato)
    ) {
        return Periodetype.Overføring;
    }
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
    setPerioderErGyldige,
    termindato,
    morHarRett,
    antallBarn,
    utsettelserIPlan,
    intl,
    isOpen,
}) => {
    const [tidsperiodeIsOpen, setTidsperiodeIsOpen] = useState(false);
    const [periodeIsValid, setPeriodeIsValid] = useState(true);
    const bem = bemUtils('periodeUttakForm');
    const toggleVisTidsperiode = () => {
        setTidsperiodeIsOpen(!tidsperiodeIsOpen);
    };
    const forelder = erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    const annenForelderHarRettIEØS =
        isAnnenForelderOppgitt(annenForelder) && !!annenForelder.harRettPåForeldrepengerIEØS;

    useEffect(() => {
        setPerioderErGyldige((previousState: PeriodeValidState[]) => {
            return getIsValidStateForPerioder(previousState, periode, periodeIsValid);
        });
    }, [periodeIsValid, periode, setPerioderErGyldige]);

    const handleCleanup = (
        values: PeriodeUttakFormData,
        visibility: QuestionVisibility<PeriodeUttakFormField, undefined>,
    ): PeriodeUttakFormData => {
        return cleanPeriodeUttakFormData(
            values,
            visibility,
            erDeltUttak,
            forelder,
            erMorUfør,
            familiehendelsesdato,
            erFarEllerMedmor,
            annenForelderHarRettIEØS,
        );
    };
    const erDeltUttakINorge = erDeltUttak && !annenForelderHarRettIEØS;
    const velgbareStønadskontoer = getVelgbareStønadskontotyper(stønadskontoer);
    const navnPåAnnenForelder =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.fornavn !== undefined && annenForelder.fornavn !== ''
            ? annenForelder.fornavn
            : intlUtils(intl, 'annen.forelder');

    const startDatoPeriodeRundtFødselFarMedmor =
        erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato)
            ? getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato)
            : undefined;
    const sluttDatoPeriodeRundtFødselFarMedmor =
        erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato)
            ? getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato)
            : undefined;

    const erFarMedmorOgHarAleneomsorg = erFarEllerMedmor && erAleneOmOmsorg;
    const harOpprinneligSøktGradering =
        isUttaksperiode(periode) && periode.opprinneligSøkt === OpprinneligSøkt.Gradering;

    if (!isOpen) {
        return null;
    }

    return (
        <PeriodeUttakFormComponents.FormikWrapper
            initialValues={getPeriodeUttakFormInitialValues(
                periode,
                erDeltUttak,
                forelder,
                erMorUfør,
                familiehendelsesdato,
                erFarEllerMedmor,
                annenForelderHarRettIEØS,
            )}
            enableReinitialize={false}
            onSubmit={(values: Partial<PeriodeUttakFormData>) => {
                if (isNyPeriode) {
                    const periodetype = getPeriodeType(
                        values.hvemSkalTaUttak!,
                        erFarEllerMedmor,
                        values.konto!,
                        familiehendelsesdato,
                        termindato,
                        { fom: values.fom, tom: values.tom } as TidsperiodeDate,
                    );
                    setNyPeriodeFormIsVisible!(false);
                    handleAddPeriode!(
                        mapPeriodeUttakFormToPeriode(
                            values,
                            guid(),
                            periodetype,
                            familiehendelsesdato,
                            erFarEllerMedmor,
                            erDeltUttak,
                            situasjon,
                        ),
                        familiehendelsesdato,
                    );
                } else {
                    return handleUpdatePeriode(
                        mapPeriodeUttakFormToPeriode(
                            values,
                            periode.id,
                            getPeriodeType(
                                values.hvemSkalTaUttak!,
                                erFarEllerMedmor,
                                values.konto!,
                                familiehendelsesdato,
                                termindato,
                                { fom: values.fom, tom: values.tom } as TidsperiodeDate,
                            ),
                            familiehendelsesdato,
                            erFarEllerMedmor,
                            erDeltUttak,
                            situasjon,
                        ),
                        familiehendelsesdato,
                    );
                }
            }}
            renderForm={({ setFieldValue, values, isValid }) => {
                const periodetype = getPeriodeType(
                    values.hvemSkalTaUttak!,
                    erFarEllerMedmor,
                    values.konto!,
                    familiehendelsesdato,
                    termindato,
                    { fom: values.fom, tom: values.tom } as TidsperiodeDate,
                );
                const søkerOppgirAnnenForeldersPeriode =
                    (values.hvemSkalTaUttak === 'mor' && erFarEllerMedmor) ||
                    (values.hvemSkalTaUttak === 'farMedmor' && !erFarEllerMedmor);

                if (isValid !== periodeIsValid) {
                    setPeriodeIsValid(isValid);
                }
                const visibility = periodeUttakFormQuestionsConfig.getVisbility({
                    values,
                    regelProps: {
                        annenForelder,
                        erAleneOmOmsorg,
                        erDeltUttakINorge,
                        erFarEllerMedmor,
                        erFlerbarnssøknad,
                        familiehendelsesdato,
                        periodetype,
                        situasjon,
                        termindato,
                        morHarRett,
                        stønadskontoer,
                        antallBarn,
                    },
                } as PeriodeUttakFormQuestionsPayload);
                const filtrerteValgbareStønadskontoer = getFiltrerteVelgbareStønadskontotyper(
                    velgbareStønadskontoer,
                    values.fom,
                    familiehendelsesdato,
                );
                return (
                    <>
                        {harOpprinneligSøktGradering ? (
                            <Block padBottom="l">
                                <GuidePanel>
                                    <BodyLong>
                                        Du søkte om å kombinere foreldrepenger med delvis arbeid, men fikk dette
                                        avslått. I stedet fikk du delvis utbetaling og brukte fulle dager.
                                    </BodyLong>
                                </GuidePanel>
                            </Block>
                        ) : null}
                        <Block visible={!isValidTidsperiode({ fom: values.fom!, tom: values.tom! })} padBottom="xl">
                            <TidsperiodeForm
                                tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                familiehendelsesdato={familiehendelsesdato}
                                periode={periode}
                                onBekreft={(values) => {
                                    setFieldValue(PeriodeUttakFormField.fom, ISOStringToDate(values.fom));
                                    setFieldValue(PeriodeUttakFormField.tom, ISOStringToDate(values.tom));
                                }}
                                ugyldigeTidsperioder={undefined}
                                utsettelserIPlan={utsettelserIPlan}
                                termindato={termindato}
                                erFarEllerMedmor={erFarEllerMedmor}
                                morHarRett={morHarRett}
                                situasjon={situasjon}
                                erFarMedmorOgHarAleneomsorg={erFarMedmorOgHarAleneomsorg}
                            />
                        </Block>
                        <PeriodeUttakFormComponents.Form includeButtons={false}>
                            {!isNyPeriode && (
                                <SubmitListener
                                    cleanup={() => handleCleanup(values as PeriodeUttakFormData, visibility)}
                                />
                            )}

                            <Block visible={isValidTidsperiode({ fom: values.fom!, tom: values.tom! })} padBottom="xl">
                                <TidsperiodeDisplay
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                    toggleVisTidsperiode={toggleVisTidsperiode}
                                />
                                <UttakEndreTidsperiodeSpørsmål
                                    periode={periode}
                                    familiehendelsesdato={familiehendelsesdato}
                                    ugyldigeTidsperioder={undefined}
                                    utsettelserIPlan={utsettelserIPlan}
                                    onBekreft={(values) => {
                                        setTidsperiodeIsOpen(false);
                                        setFieldValue(PeriodeUttakFormField.fom, ISOStringToDate(values.fom));
                                        setFieldValue(PeriodeUttakFormField.tom, ISOStringToDate(values.tom));
                                    }}
                                    changeTidsperiode={(values) => {
                                        setTimeout(() => {
                                            setFieldValue(PeriodeUttakFormField.fom, values.fom);
                                            setFieldValue(PeriodeUttakFormField.tom, values.tom);
                                        }, 0);
                                    }}
                                    tidsperiode={{ fom: values.fom!, tom: values.tom! }}
                                    onAvbryt={() => setTidsperiodeIsOpen(false)}
                                    visible={tidsperiodeIsOpen}
                                    termindato={termindato}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    morHarRett={morHarRett}
                                    situasjon={situasjon}
                                    erFarMedmorOgHarAleneomsorg={erFarMedmorOgHarAleneomsorg}
                                />
                            </Block>
                            <Block padBottom="xl" visible={visibility.isVisible(PeriodeUttakFormField.hvemSkalTaUttak)}>
                                <HvemSkalHaUttakSpørsmål
                                    fieldName={PeriodeUttakFormField.hvemSkalTaUttak}
                                    erFarEllerMedmor={false}
                                    navnPåForeldre={navnPåForeldre}
                                />
                            </Block>
                            <Block padBottom="xl" visible={visibility.isVisible(PeriodeUttakFormField.konto)}>
                                <HvilkenKontoSpørsmål
                                    fieldName={PeriodeUttakFormField.konto}
                                    velgbareStønadskontoer={filtrerteValgbareStønadskontoer}
                                    erOppholdsperiode={søkerOppgirAnnenForeldersPeriode}
                                    navnPåForeldre={navnPåForeldre}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    erAleneOmOmsorg={erAleneOmOmsorg}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(PeriodeUttakFormField.overføringsårsak)}
                            >
                                <OverføringsårsakSpørsmål
                                    navnAnnenForelder={navnPåAnnenForelder}
                                    erEndringssøknad={erEndringssøknad}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(PeriodeUttakFormField.uttakRundtFødselÅrsak)}
                            >
                                <UttakRundtFødselÅrsakSpørsmål
                                    fieldName={PeriodeUttakFormField.uttakRundtFødselÅrsak}
                                />
                            </Block>
                            {startDatoPeriodeRundtFødselFarMedmor !== undefined &&
                                sluttDatoPeriodeRundtFødselFarMedmor !== undefined && (
                                    <Block
                                        padBottom="xl"
                                        visible={skalViseWLBInfoOmSamtidigUttakRundtFødsel(
                                            values as PeriodeUttakFormData,
                                            familiehendelsesdato,
                                            erFarEllerMedmor,
                                            erDeltUttak,
                                            situasjon,
                                        )}
                                    >
                                        <GuidePanel>
                                            <FormattedMessage
                                                id="uttaksplan.samtidigUttakVeileder"
                                                values={{
                                                    fomDato: formaterDatoKompakt(startDatoPeriodeRundtFødselFarMedmor),
                                                    tomDato: formaterDatoKompakt(sluttDatoPeriodeRundtFødselFarMedmor),
                                                }}
                                            />
                                        </GuidePanel>
                                    </Block>
                                )}
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(PeriodeUttakFormField.ønskerFlerbarnsdager)}
                            >
                                <FlerbarnsdagerSpørsmål fieldName={PeriodeUttakFormField.ønskerFlerbarnsdager} />
                            </Block>
                            <Block padBottom="xl" visible={visibility.isVisible(PeriodeUttakFormField.erMorForSyk)}>
                                <ErMorForSykSpørsmål fieldName={PeriodeUttakFormField.erMorForSyk} />
                            </Block>
                            <Block padBottom="xl" visible={visibility.isVisible(PeriodeUttakFormField.samtidigUttak)}>
                                <SamtidigUttakSpørsmål
                                    erFlerbarnssøknad={erFlerbarnssøknad}
                                    navnPåForeldre={navnPåForeldre}
                                    navnPåAnnenForelder={navnPåAnnenForelder}
                                    samtidigUttakProsentVisible={visibility.isVisible(
                                        PeriodeUttakFormField.samtidigUttakProsent,
                                    )}
                                    familiehendelsesdato={familiehendelsesdato}
                                    situasjon={situasjon}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(PeriodeUttakFormField.aktivitetskravMor)}
                            >
                                <AktivitetskravSpørsmål
                                    fieldName={PeriodeUttakFormField.aktivitetskravMor}
                                    navnPåForeldre={navnPåForeldre}
                                    FormComponents={PeriodeUttakFormComponents}
                                />
                            </Block>
                            <Block padBottom="xl" visible={visibility.isVisible(PeriodeUttakFormField.skalHaGradering)}>
                                <SkalHaGraderingSpørsmål
                                    graderingsprosentVisible={visibility.isVisible(
                                        PeriodeUttakFormField.stillingsprosent,
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
                                <div className={bem.element('knapperad-endre')}>
                                    <Button type="button" variant="secondary" onClick={() => toggleIsOpen!(periode.id)}>
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
                                <div className={bem.element('knapperad-legg-til')}>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setNyPeriodeFormIsVisible!(false)}
                                    >
                                        <FormattedMessage id="uttaksplan.avbryt" />
                                    </Button>
                                    {visibility.areAllQuestionsAnswered() ? (
                                        <Button type="submit">
                                            <FormattedMessage id="uttaksplan.leggTil" />
                                        </Button>
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
