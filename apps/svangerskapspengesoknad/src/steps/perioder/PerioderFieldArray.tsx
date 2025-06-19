import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Barn } from 'types/Barn';
import { PeriodeMedVariasjon, TilOgMedDatoType, Tilretteleggingstype } from 'types/Tilrettelegging';
import { getDefaultMonth, getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import {
    getArbeidsgiverNavnForTilrettelegging,
    getArbeidsgiverStillingerForTilrettelegging,
    getOpprinneligStillingsprosent,
    getPeriodeForTilrettelegging,
} from 'utils/tilretteleggingUtils';

import { Alert, BodyShort, Button, HStack, Heading, Radio, ReadMore, Tag, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfRadioGroup, RhfTextField } from '@navikt/fp-form-hooks';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { NæringFormValues } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold, Frilans } from '@navikt/fp-types';
import { HorizontalLine } from '@navikt/fp-ui';
import { isAfterOrSame, isBeforeOrSame, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import {
    getMinDatoTom,
    getMåSendeNySøknad,
    getPeriodeDerSøkerErTilbakeIFullStilling,
    getPeriodeInfoTekst,
    getUferdigPeriodeInput,
} from './perioderStegUtils';
import {
    validatePeriodeFom,
    validatePeriodeTom,
    validatePeriodeTomType,
    validateStillingsprosentPåPerioder,
} from './perioderValidation';

export const NEW_PERIODE = {
    type: Tilretteleggingstype.DELVIS,
    fom: '',
    tom: '',
    stillingsprosent: '',
    tomType: undefined!,
} as PeriodeMedVariasjon;

type PerioderFormValues = {
    varierendePerioder: PeriodeMedVariasjon[];
};

interface Props {
    barn: Barn;
    valgtTilretteleggingId: string;
    kanHaSVPFremTilTreUkerFørTermin: boolean;
    behovForTilretteleggingFom: string;
    arbeidsforhold: Arbeidsforhold[];
    egenNæring?: NæringFormValues;
    frilans?: Frilans;
}

export const PerioderFieldArray = ({
    barn,
    valgtTilretteleggingId,
    kanHaSVPFremTilTreUkerFørTermin,
    behovForTilretteleggingFom,
    arbeidsforhold,
    egenNæring,
    frilans,
}: Props) => {
    const intl = useIntl();

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);

    const navnArbeidsgiver = getArbeidsgiverNavnForTilrettelegging(intl, valgtTilretteleggingId, arbeidsforhold);
    const stillinger = getArbeidsgiverStillingerForTilrettelegging(
        barn.termindato,
        valgtTilretteleggingId,
        arbeidsforhold,
        egenNæring,
        frilans,
    );
    const periode = getPeriodeForTilrettelegging(
        barn.termindato,
        valgtTilretteleggingId,
        arbeidsforhold,
        egenNæring,
        frilans,
    );

    const formMethods = useFormContext<PerioderFormValues>();
    const { fields, append, remove } = useFieldArray({
        name: 'varierendePerioder',
        control: formMethods.control,
    });

    const alleVarierendePerioder = formMethods.watch(`varierendePerioder`);

    const maxDato = periode.tom
        ? notEmpty(dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(periode.tom)))
        : sisteDagForSvangerskapspenger;

    const opprinneligStillingsprosent = getOpprinneligStillingsprosent(alleVarierendePerioder, stillinger);
    const periodeDerSøkerErTilbakeIOpprinneligStilling = getPeriodeDerSøkerErTilbakeIFullStilling(
        alleVarierendePerioder,
        opprinneligStillingsprosent,
    );

    const uferdigDelvisTilretteleggingInput = getUferdigPeriodeInput(
        sisteDagForSvangerskapspenger,
        alleVarierendePerioder,
    );

    return (
        <>
            {fields.map((field, index) => {
                const måSendeNySøknad = getMåSendeNySøknad(
                    periodeDerSøkerErTilbakeIOpprinneligStilling,
                    alleVarierendePerioder[index],
                    opprinneligStillingsprosent,
                );
                const minDatoTom = getMinDatoTom(alleVarierendePerioder[index].fom, behovForTilretteleggingFom);
                const defaultMonthTom = getDefaultMonth(minDatoTom, maxDato);

                return (
                    <Fragment key={field.id}>
                        <VStack gap="1">
                            <HorizontalLine />
                            <HStack justify="space-between" align="center">
                                <Tag variant="info-moderate">
                                    {getPeriodeInfoTekst(
                                        index,
                                        sisteDagForSvangerskapspenger,
                                        intl,
                                        kanHaSVPFremTilTreUkerFørTermin,
                                        alleVarierendePerioder,
                                    )}
                                </Tag>
                                {index !== 0 && (
                                    <Button
                                        icon={<XMarkIcon aria-hidden />}
                                        type="button"
                                        variant="tertiary"
                                        onClick={() => remove(index)}
                                    >
                                        <FormattedMessage id="perioder.varierende.slett" />
                                    </Button>
                                )}
                            </HStack>
                        </VStack>
                        <RhfDatepicker
                            name={`varierendePerioder.${index}.fom`}
                            label={intl.formatMessage({ id: 'perioder.varierende.fom.label' })}
                            minDate={behovForTilretteleggingFom}
                            maxDate={maxDato}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.periode.fom.påkrevd' })),
                                isValidDate(intl.formatMessage({ id: 'valideringsfeil.periode.fom.gyldigDato' })),
                                isBeforeOrSame(
                                    intl.formatMessage({ id: 'valideringsfeil.periode.fom.førTilDato' }),
                                    alleVarierendePerioder[index].tom,
                                ),
                                isBeforeOrSame(
                                    kanHaSVPFremTilTreUkerFørTermin
                                        ? intl.formatMessage({
                                              id: 'valideringsfeil.periode.fom.etterTreUkerFørTermin',
                                          })
                                        : intl.formatMessage({ id: 'valideringsfeil.periode.fom.etterFødsel' }),
                                    sisteDagForSvangerskapspenger,
                                ),
                                validatePeriodeFom(
                                    intl,
                                    index,
                                    alleVarierendePerioder,
                                    behovForTilretteleggingFom,
                                    sisteDagForSvangerskapspenger,
                                    navnArbeidsgiver || '',
                                    periode.tom,
                                ),
                            ]}
                            defaultMonth={getDefaultMonth(behovForTilretteleggingFom, maxDato)}
                        />
                        <RhfRadioGroup
                            name={`varierendePerioder.${index}.tomType`}
                            label={<FormattedMessage id="perioder.varierende.tomType.label" />}
                            validate={[
                                isRequired(
                                    kanHaSVPFremTilTreUkerFørTermin
                                        ? intl.formatMessage({ id: 'valideringsfeil.periode.tomType.påkrevd.termin' })
                                        : intl.formatMessage({ id: 'valideringsfeil.periode.tomType.påkrevd.fødsel' }),
                                ),
                                validatePeriodeTomType(
                                    intl,
                                    sisteDagForSvangerskapspenger,
                                    navnArbeidsgiver || '',
                                    periode.tom,
                                ),
                            ]}
                        >
                            <Radio value={TilOgMedDatoType.VALGFRI_DATO}>
                                <FormattedMessage id="perioder.varierende.tomType.valgfriDato" />
                            </Radio>
                            <Radio value={TilOgMedDatoType.SISTE_DAG_MED_SVP}>
                                {kanHaSVPFremTilTreUkerFørTermin ? (
                                    <FormattedMessage id="perioder.varierende.tomType.treUkerFørTermin" />
                                ) : (
                                    <FormattedMessage id="perioder.varierende.tomType.dagenFørFødsel" />
                                )}
                            </Radio>
                        </RhfRadioGroup>
                        {alleVarierendePerioder[index].tomType === TilOgMedDatoType.VALGFRI_DATO && (
                            <RhfDatepicker
                                name={`varierendePerioder.${index}.tom`}
                                label={intl.formatMessage({ id: 'perioder.varierende.tom.label' })}
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'valideringsfeil.periode.tom.påkrevd' })),
                                    isValidDate(intl.formatMessage({ id: 'valideringsfeil.periode.tom.gyldigDato' })),
                                    isAfterOrSame(
                                        intl.formatMessage({ id: 'valideringsfeil.periode.tom.etterTilDato' }),
                                        alleVarierendePerioder[index].fom,
                                    ),
                                    isBeforeOrSame(
                                        kanHaSVPFremTilTreUkerFørTermin
                                            ? intl.formatMessage({
                                                  id: 'valideringsfeil.periode.tom.etterTreUkerFørTermin',
                                              })
                                            : intl.formatMessage({ id: 'valideringsfeil.periode.tom.etterFødsel' }),
                                        sisteDagForSvangerskapspenger,
                                    ),
                                    validatePeriodeTom(intl, navnArbeidsgiver || '', periode.tom),
                                ]}
                                minDate={minDatoTom}
                                maxDate={maxDato}
                                defaultMonth={defaultMonthTom}
                            />
                        )}
                        <div>
                            <RhfTextField
                                name={`varierendePerioder.${index}.stillingsprosent`}
                                label={intl.formatMessage({ id: 'perioder.varierende.stillingsprosent.label' })}
                                style={{ maxWidth: '450px' }}
                                description={intl.formatMessage({
                                    id: 'tilrettelegging.tilrettelagtArbeidType.description',
                                })}
                                validate={[
                                    validateStillingsprosentPåPerioder(
                                        intl,
                                        måSendeNySøknad,
                                        periodeDerSøkerErTilbakeIOpprinneligStilling,
                                        alleVarierendePerioder,
                                        opprinneligStillingsprosent,
                                    ),
                                ]}
                            />
                            <ReadMore
                                onOpenChange={(open) =>
                                    loggAmplitudeEvent({
                                        origin: 'svangerskapspengesoknad',
                                        eventName: open ? 'readmore åpnet' : 'readmore lukket',
                                        eventData: {
                                            tittel: 'tilrettelegging.varierendePerioderStillingsprosent.info.tittel',
                                        },
                                    })
                                }
                                size="medium"
                                header={intl.formatMessage({
                                    id: 'tilrettelegging.varierendePerioderStillingsprosent.info.tittel',
                                })}
                            >
                                <VStack gap="2">
                                    <BodyShort>
                                        <FormattedMessage id="tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del1"></FormattedMessage>
                                    </BodyShort>
                                    <BodyShort>
                                        <FormattedMessage id="tilrettelegging.varierendePerioderStillingsprosent.info.tekst.del2"></FormattedMessage>
                                    </BodyShort>
                                </VStack>
                            </ReadMore>
                        </div>
                        {måSendeNySøknad && (
                            <Alert variant="warning">
                                <VStack gap="4">
                                    <Heading size="small">
                                        <FormattedMessage id="perioder.alert.nySøknad.title" />
                                    </Heading>
                                    <div>
                                        <FormattedMessage id="perioder.alert.nySøknad.del1" />
                                    </div>
                                    <FormattedMessage id="perioder.alert.nySøknad.del2" />
                                </VStack>
                            </Alert>
                        )}
                        {alleVarierendePerioder && index === alleVarierendePerioder.length - 1 && (
                            <HStack>
                                <Button
                                    icon={<PlusIcon aria-hidden />}
                                    type="button"
                                    variant="secondary"
                                    onClick={() => append(uferdigDelvisTilretteleggingInput)}
                                >
                                    <FormattedMessage id="perioder.varierende.leggTil" />
                                </Button>
                            </HStack>
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};
