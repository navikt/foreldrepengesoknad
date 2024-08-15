import { ExternalLinkIcon, FeedingBottleIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, Link, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    Barn,
    Dekningsgrad,
    Uttaksdagen,
    capitalizeFirstLetter,
    getAntallUker,
    getAntallUkerFraStønadskontoer,
    getVarighetString,
    isAdoptertBarn,
    isAnnenForelderOppgitt,
} from '@navikt/fp-common';
import { StønadskontoType, links } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { SøkersituasjonFp, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { bemUtils } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import PeriodeMedForeldrepenger from 'app/context/types/PeriodeMedForeldrepenger';
import { getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { førsteJuli2024ReglerGjelder } from 'app/utils/dateUtils';

import './panelWithCircleIcon.less';

const finnSisteDagMedForeldrepenger = (
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    barn: Barn,
): string | undefined => {
    const erAdopsjon = isAdoptertBarn(barn);
    const fødselsdato = getFødselsdato(barn);
    const termindato = getTermindato(barn);

    const dato = erAdopsjon ? barn.adopsjonsdato : termindato;

    if ((!erAdopsjon && !!fødselsdato) || !dato) {
        return undefined;
    }

    const dagerSomSkalLeggesTil =
        getAntallUkerFraStønadskontoer(
            stønadskontoer.kontoer.filter((s) => s.konto !== StønadskontoType.ForeldrepengerFørFødsel),
        ) * 5;

    const førsteDag = Uttaksdagen(dayjs(dato).toDate()).denneEllerNeste();
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
    stønadskonto100: TilgjengeligeStønadskontoerForDekningsgrad;
    stønadskonto80: TilgjengeligeStønadskontoerForDekningsgrad;
};

const getDekningsgradReadMoreTekst = (erDeltUttak: boolean, barn: Barn) => {
    if (!erDeltUttak) {
        return <FormattedMessage id="uttaksplaninfo.dekningsgrad.readmore.alene" />;
    }
    if (førsteJuli2024ReglerGjelder(barn)) {
        return <FormattedMessage id="uttaksplaninfo.dekningsgrad.readmore.etterFørsteJuli2024" />;
    }
    return <FormattedMessage id="uttaksplaninfo.dekningsgrad.readmore.førFørsteJuli2024" />;
};

const getDekningsgradInformasjonDeltUttak = (barn: Barn) => {
    if (førsteJuli2024ReglerGjelder(barn)) {
        return <FormattedMessage id="uttaksplaninfo.dekningsgrad.beskrivelse.etterFørsteJuli2024" />;
    }
    return <FormattedMessage id="uttaksplaninfo.dekningsgrad.beskrivelse.førFørsteJuli2024" />;
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
    const ekstraDagePrematur = stønadskonto100.tillegg?.prematur;

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
                                getDekningsgradInformasjonDeltUttak(barn)
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
                                    varighetString: getVarighetString(getAntallUker(stønadskonto100) * 5, intl),
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
                                    varighetString: getVarighetString(getAntallUker(stønadskonto80) * 5, intl),
                                }}
                            />
                        </Radio>
                    </RadioGroup>
                    <ReadMore
                        header={
                            erDeltUttak ? (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.readmore.header" />
                            ) : (
                                <FormattedMessage id="uttaksplaninfo.dekningsgrad.readmore.header.alene" />
                            )
                        }
                    >
                        {getDekningsgradReadMoreTekst(erDeltUttak, barn)}
                        <Link href={links.opphold} target="_blank">
                            <FormattedMessage id="uttaksplaninfo.dekningsgrad.readmore.link" />
                            <ExternalLinkIcon title="a11y-title" fontSize="1.5rem" />
                        </Link>
                    </ReadMore>
                </VStack>
                {!!ekstraDagePrematur && (
                    <Box padding="4" background="surface-alt-3-subtle">
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
                                            varighet: getVarighetString(ekstraDagePrematur, intl),
                                            soker: erDeltUttak
                                                ? intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.dere' })
                                                : intl.formatMessage({ id: 'uttaksplaninfo.Uker.soker.deg' }),
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                            <div className={bem.block}>
                                <FeedingBottleIcon height={24} width={24} color="#005B82" />
                            </div>
                        </HStack>
                    </Box>
                )}
                {barn.antallBarn > 1 && (
                    <Box padding="4" background="surface-alt-3-subtle">
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
                                            uker80: getVarighetString(stønadskonto80.tillegg?.flerbarn || 0, intl),
                                            uker100: getVarighetString(stønadskonto100.tillegg?.flerbarn || 0, intl),
                                            soker: søkerAntallTekst,
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                            <div className={bem.block}>
                                <FeedingBottleIcon height={24} width={24} color="#005B82" />
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
