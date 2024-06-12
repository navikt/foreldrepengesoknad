import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Button, HStack, Heading, Radio, ReadMore, Tag, VStack } from '@navikt/ds-react';

import { Datepicker, RadioGroup, TextField } from '@navikt/fp-form-hooks';
import { HorizontalLine } from '@navikt/fp-ui';
import { bemUtils } from '@navikt/fp-utils';
import { isAfterOrSame, isBeforeOrSame, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { Barn } from 'app/types/Barn';
import Tilrettelegging, {
    PeriodeMedVariasjon,
    TilOgMedDatoType,
    TilretteleggingstypeOptions,
} from 'app/types/Tilrettelegging';
import { getDefaultMonth, getSisteDagForSvangerskapspenger } from 'app/utils/dateUtils';
import { getOpprinneligStillingsprosent } from 'app/utils/tilretteleggingUtils';

import './perioderFieldArray.css';
import {
    getMinDatoTom,
    getMåSendeNySøknad,
    getPeriodeDerSøkerErTilbakeIFullStilling,
    getPeriodeInfoTekst,
    getUferdigPeriodeInput,
} from './perioderStepUtils';
import {
    validatePeriodeFom,
    validatePeriodeTom,
    validatePeriodeTomType,
    validateStillingsprosentPåPerioder,
} from './perioderValidation';

export type PerioderFormData = {
    varierendePerioder: PeriodeMedVariasjon[];
};

export const NEW_PERIODE = {
    type: TilretteleggingstypeOptions.DELVIS,
    fom: '',
    tom: '',
    stillingsprosent: '',
    tomType: undefined!,
} as PeriodeMedVariasjon;

interface Props {
    tilrettelegginger: Tilrettelegging[];
    barn: Barn;
    valgtTilretteleggingId: string;
    kanHaSVPFremTilTreUkerFørTermin: boolean;
}

const PerioderFieldArray: React.FunctionComponent<Props> = ({
    tilrettelegginger,
    barn,
    valgtTilretteleggingId,
    kanHaSVPFremTilTreUkerFørTermin,
}) => {
    const bem = bemUtils('perioderStep');
    const intl = useIntl();

    const formMethods = useFormContext<PerioderFormData>();
    const { fields, append, remove } = useFieldArray({
        name: 'varierendePerioder',
        control: formMethods.control,
    });

    const alleVarierendePerioder = formMethods.watch(`varierendePerioder`);

    const valgtTilrettelegging = notEmpty(tilrettelegginger.find((t) => t.id === valgtTilretteleggingId));
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const sluttDatoArbeid = valgtTilrettelegging.arbeidsforhold.sluttdato;

    const maxDato = sluttDatoArbeid
        ? notEmpty(dayjs.min(dayjs(sisteDagForSvangerskapspenger), dayjs(sluttDatoArbeid)))
        : sisteDagForSvangerskapspenger;
    const minDatoFom = new Date(valgtTilrettelegging.behovForTilretteleggingFom);

    const opprinneligStillingsprosent = getOpprinneligStillingsprosent(
        alleVarierendePerioder,
        valgtTilrettelegging.arbeidsforhold.stillinger,
    );
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
                const minDatoTom = getMinDatoTom(alleVarierendePerioder[index].fom, minDatoFom);
                const defaultMonthTom = getDefaultMonth(minDatoTom, maxDato);

                return (
                    <Fragment key={field.id}>
                        <VStack gap="1">
                            <HorizontalLine />
                            <HStack justify="space-between" align="center">
                                <Tag variant="info-moderate" className={bem.element('tag')}>
                                    {getPeriodeInfoTekst(
                                        index,
                                        sisteDagForSvangerskapspenger,
                                        intl,
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
                        <Datepicker
                            name={`varierendePerioder.${index}.fom`}
                            label={intl.formatMessage({ id: 'perioder.varierende.fom.label' })}
                            minDate={minDatoFom}
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
                                    valgtTilrettelegging.behovForTilretteleggingFom,
                                    sisteDagForSvangerskapspenger,
                                    valgtTilrettelegging.arbeidsforhold.navn || '',
                                    sluttDatoArbeid,
                                ),
                            ]}
                            defaultMonth={getDefaultMonth(minDatoFom, maxDato)}
                        />
                        <RadioGroup
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
                                    valgtTilrettelegging.arbeidsforhold.navn || '',
                                    sluttDatoArbeid,
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
                        </RadioGroup>
                        {alleVarierendePerioder[index].tomType === TilOgMedDatoType.VALGFRI_DATO && (
                            <Datepicker
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
                                    validatePeriodeTom(
                                        intl,
                                        valgtTilrettelegging.arbeidsforhold.navn || '',
                                        sluttDatoArbeid,
                                    ),
                                ]}
                                minDate={minDatoTom}
                                maxDate={maxDato}
                                defaultMonth={defaultMonthTom}
                            />
                        )}
                        <div>
                            <TextField
                                name={`varierendePerioder.${index}.stillingsprosent`}
                                label={intl.formatMessage({ id: 'perioder.varierende.stillingsprosent.label' })}
                                className={bem.element('stillingsprosent')}
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

export default PerioderFieldArray;
