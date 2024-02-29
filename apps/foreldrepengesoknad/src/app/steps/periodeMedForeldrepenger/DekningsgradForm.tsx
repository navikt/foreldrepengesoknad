import { ExternalLinkIcon, FeedingBottleIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, Link, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    Barn,
    Dekningsgrad,
    StønadskontoType,
    TilgjengeligStønadskonto,
    Uttaksdagen,
    bemUtils,
    capitalizeFirstLetter,
    getFlerbarnsuker,
    isAdoptertBarn,
    isAnnenForelderOppgitt,
} from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import PeriodeMedForeldrepenger from 'app/context/types/PeriodeMedForeldrepenger';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { getAntallPrematurdager, skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';

import './dekningsgradForm.less';

const finnSisteDagMedForeldrepenger = (stønadskontoer: TilgjengeligStønadskonto[], barn: Barn): string | undefined => {
    const erAdopsjon = isAdoptertBarn(barn);
    const fødselsdato = getFødselsdato(barn);
    const termindato = getTermindato(barn);

    const dato = erAdopsjon ? barn.adopsjonsdato : termindato;

    if ((!erAdopsjon && !!fødselsdato) || !dato) {
        return undefined;
    }

    const dagerSomSkalLeggesTil =
        getAntallUker(stønadskontoer.filter((s) => s.konto !== StønadskontoType.ForeldrepengerFørFødsel)) * 5;

    const førsteDag = Uttaksdagen(dato).denneEllerNeste();
    const sisteDag = Uttaksdagen(førsteDag).leggTil(dagerSomSkalLeggesTil - 1);
    return dayjs(sisteDag).format('dddd DD. MMMM YYYY');
};

const getRadioBeskrivelse = (
    intl: IntlShape,
    erAdopsjon: boolean,
    erFar: boolean,
    erFødsel: boolean,
    sisteDag?: string,
): string | undefined => {
    if (!erFar && erAdopsjon) {
        return intl.formatMessage({ id: 'uttaksplaninfo.Uker.beskrivelseOmsorgsovertakelse' }, { dato: sisteDag });
    }
    if (!erFar && !erFødsel) {
        return intl.formatMessage({ id: 'uttaksplaninfo.Uker.beskrivelseTermin' }, { dato: sisteDag });
    }
    return undefined;
};

const getSøkerAntallTekst = (intl: IntlShape, erDeltUttak: boolean) => {
    return erDeltUttak
        ? intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.dere' })
        : intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.du' });
};

type Props = {
    goToPreviousDefaultStep: () => Promise<void>;
    goToNextDefaultStep: () => Promise<void>;
    barn: Barn;
    søkersituasjon: SøkersituasjonFp;
    stønadskonto100: TilgjengeligStønadskonto[];
    stønadskonto80: TilgjengeligStønadskonto[];
};

const DekningsgradForm: React.FunctionComponent<Props> = ({
    goToPreviousDefaultStep,
    goToNextDefaultStep,
    barn,
    søkersituasjon,
    stønadskonto100,
    stønadskonto80,
}) => {
    const intl = useIntl();
    const bem = bemUtils('circle');

    const periodeMedForeldrepenger = useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const oppdaterPeriodeMedForeldrepenger = useContextSaveData(ContextDataType.PERIODE_MED_FORELDREPENGER);

    const formMethods = useForm<PeriodeMedForeldrepenger>({
        defaultValues: periodeMedForeldrepenger,
    });

    const onSubmit = (values: PeriodeMedForeldrepenger) => {
        oppdaterPeriodeMedForeldrepenger(values);
        return goToNextDefaultStep();
    };

    const erDeltUttak =
        isAnnenForelderOppgitt(annenForelder) &&
        (annenForelder.harRettPåForeldrepengerINorge === true || annenForelder.harRettPåForeldrepengerIEØS === true);

    const erAdopsjon = isAdoptertBarn(barn);
    const fødselsdato = getFødselsdato(barn);
    const termindato = getTermindato(barn);
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, søkersituasjon.situasjon);
    const ekstraDagerGrunnetPrematurFødsel =
        visInfoOmPrematuruker && fødselsdato && termindato
            ? getAntallPrematurdager(fødselsdato, termindato)
            : undefined;

    const sisteDag100Prosent = finnSisteDagMedForeldrepenger(stønadskonto100, barn);
    const sisteDag80Prosent = finnSisteDagMedForeldrepenger(stønadskonto80, barn);

    const søkerAntallTekst = getSøkerAntallTekst(intl, erDeltUttak);

    return (
        <Form formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="10">
                <ErrorSummaryHookForm />
                <VStack gap="4">
                    <RadioGroup
                        name="dekningsgrad"
                        description={
                            erDeltUttak ? (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.beskrivelse" />
                            ) : (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.beskrivelse.alene" />
                            )
                        }
                        label={
                            erDeltUttak ? (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.deltUttak" />
                            ) : (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.label.ikkeDeltUttak" />
                            )
                        }
                        validate={[
                            isRequired(
                                intl.formatMessage(
                                    { id: 'DekningsgradForm.MåOppgiDekningsgrad' },
                                    { soker: søkerAntallTekst },
                                ),
                            ),
                        ]}
                    >
                        <Radio
                            value={Dekningsgrad.HUNDRE_PROSENT}
                            description={getRadioBeskrivelse(
                                intl,
                                erAdopsjon,
                                søkersituasjon.rolle === 'far',
                                !!fødselsdato,
                                sisteDag100Prosent,
                            )}
                        >
                            <FormattedMessage
                                id="uttaksplaninfo.49Uker"
                                values={{
                                    antallUker: getAntallUker(stønadskonto100),
                                }}
                            />
                        </Radio>
                        <Radio
                            value={Dekningsgrad.ÅTTI_PROSENT}
                            description={getRadioBeskrivelse(
                                intl,
                                erAdopsjon,
                                søkersituasjon.rolle === 'far',
                                !!fødselsdato,
                                sisteDag80Prosent,
                            )}
                        >
                            <FormattedMessage
                                id="uttaksplaninfo.59Uker"
                                values={{
                                    antallUker: getAntallUker(stønadskonto80),
                                }}
                            />
                        </Radio>
                    </RadioGroup>
                    <ReadMore
                        header={
                            erDeltUttak ? (
                                <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad.header" />
                            ) : (
                                <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad.header.alene" />
                            )
                        }
                    >
                        <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad" />
                        <Link href={links.søknadsfrister} target="_blank">
                            <FormattedMessage id="uttaksplaninfo.veileder.dekningsgrad.link" />
                            <ExternalLinkIcon title="a11y-title" fontSize="1.5rem" />
                        </Link>
                    </ReadMore>
                </VStack>
                {visInfoOmPrematuruker && !!ekstraDagerGrunnetPrematurFødsel && (
                    <Box padding="4" background="surface-action-subtle">
                        <HStack justify="space-between" align="start">
                            <VStack gap="2" style={{ width: '85%' }}>
                                <Heading size="xsmall">
                                    <FormattedMessage
                                        id="DekningsgradForm.InformasjonPrematurukerHeader"
                                        values={{
                                            soker: capitalizeFirstLetter(søkerAntallTekst),
                                        }}
                                    />
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="DekningsgradForm.InformasjonPrematuruker"
                                        values={{
                                            uker: Math.floor(ekstraDagerGrunnetPrematurFødsel / 5),
                                            dager: ekstraDagerGrunnetPrematurFødsel % 5,
                                            soker: erDeltUttak
                                                ? intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.dere' })
                                                : intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.deg' }),
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                            <div className={bem.block}>
                                <FeedingBottleIcon height={24} width={24} color="#3386E0" />
                            </div>
                        </HStack>
                    </Box>
                )}
                {barn.antallBarn > 1 && (
                    <Box padding="4" background="surface-action-subtle">
                        <HStack justify="space-between" align="start">
                            <VStack gap="2" style={{ width: '85%' }}>
                                <Heading size="xsmall">
                                    {barn.antallBarn === 2 && (
                                        <FormattedMessage
                                            id="DekningsgradForm.InformasjonToBarn"
                                            values={{
                                                sokerStorBokstav: capitalizeFirstLetter(søkerAntallTekst),
                                                soker: søkerAntallTekst,
                                            }}
                                        />
                                    )}
                                    {barn.antallBarn > 2 && (
                                        <FormattedMessage
                                            id="DekningsgradForm.InformasjonFlereEnnToBarn"
                                            values={{
                                                sokerStorBokstav: capitalizeFirstLetter(søkerAntallTekst),
                                                soker: søkerAntallTekst,
                                            }}
                                        />
                                    )}
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="DekningsgradForm.InformasjonFlerbarnUker"
                                        values={{
                                            uker80: getFlerbarnsuker(Dekningsgrad.ÅTTI_PROSENT, barn.antallBarn),
                                            uker100: getFlerbarnsuker(Dekningsgrad.HUNDRE_PROSENT, barn.antallBarn),
                                            soker: søkerAntallTekst,
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                            <div className={bem.block}>
                                <FeedingBottleIcon height={24} width={24} color="#3386E0" />
                            </div>
                        </HStack>
                    </Box>
                )}
                <StepButtonsHookForm goToPreviousStep={goToPreviousDefaultStep} />
            </VStack>
        </Form>
    );
};

export default DekningsgradForm;
