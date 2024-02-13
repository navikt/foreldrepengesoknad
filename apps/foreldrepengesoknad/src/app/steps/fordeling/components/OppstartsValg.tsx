import { RadioGroup } from '@navikt/fp-form-hooks';
import { Radio, VStack } from '@navikt/ds-react';
import { isRequired, notEmpty } from '@navikt/fp-validation';
import { FormattedMessage, useIntl, IntlShape } from 'react-intl';
import FordelingFormValues, { OppstartValg } from 'app/steps/fordeling/FordelingFormValues';
import { useFormContext } from 'react-hook-form';
import {
    Barn,
    ISOStringToDate,
    NavnPåForeldre,
    andreAugust2022ReglerGjelder,
    formatDate,
    førsteOktober2021ReglerGjelder,
    intlUtils,
    isAdoptertAnnetBarn,
    isFarEllerMedmor,
    isFødtBarn,
} from '@navikt/fp-common';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

const getRadioOptionFarFødsel = (
    erBarnetFødt: boolean,
    familiehendelsesDato: Date,
    navnAnnenForelder: string,
    intl: IntlShape,
    førsteDagEtterAnnenForelder: Date | undefined,
): React.ReactElement[] => {
    const radioOptions = [];
    if (andreAugust2022ReglerGjelder(familiehendelsesDato)) {
        radioOptions.push(getRadioOptionFarPåFødselWLB(erBarnetFødt, intl));
        radioOptions.push(getRadioOptionFarRundtFødselWLB(erBarnetFødt, intl));
        radioOptions.push(getRadioOptionFarSenereWLB());
    }
    if (førsteDagEtterAnnenForelder) {
        radioOptions.push(getRadioOptionDagenEtterAnnenForelder(navnAnnenForelder, førsteDagEtterAnnenForelder));
    }
    if (!førsteOktober2021ReglerGjelder) {
        radioOptions.push(getRadioOptionAnnenDato());
    }
    return radioOptions;
};

const getRadioOptionMorFødsel = (erBarnetFødt: boolean, intl: IntlShape): React.ReactElement[] => [
    getRadioOptionTreUkerFørTermin(erBarnetFødt),
    getRadioOptionAnnenDatoMorFødsel(erBarnetFødt, intl),
];

const getRadioOptionAdopsjonOmsorgsovertakelse = (familiehendelsesdato: Date): React.ReactElement => {
    return (
        <Radio value={OppstartValg.FAMILIEHENDELSESDATO}>
            <FormattedMessage
                id="fordeling.oppstartValg.omsorgsovertakelsen"
                values={{ dato: formatDate(familiehendelsesdato) }}
            />
        </Radio>
    );
};

const getRadioOptionAdopsjonAnkomstNorge = (ankomstNorge: Date): React.ReactElement => {
    return (
        <Radio value={OppstartValg.ANKOMSTDATO_NORGE}>
            <FormattedMessage id="fordeling.oppstartValg.ankomstNorge" values={{ dato: formatDate(ankomstNorge) }} />
        </Radio>
    );
};

const getRadioOptionAdopsjon = (
    familiehendelsesdato: Date,
    navnAnnenForelder: string,
    førsteDagEtterAnnenForelder: Date | undefined,
    adoptertFraUtlandetDato: Date | undefined,
): React.ReactElement[] => {
    const radioOptions = [];
    radioOptions.push(getRadioOptionAdopsjonOmsorgsovertakelse(familiehendelsesdato));
    if (adoptertFraUtlandetDato) {
        radioOptions.push(getRadioOptionAdopsjonAnkomstNorge(familiehendelsesdato));
    }
    if (førsteDagEtterAnnenForelder) {
        radioOptions.push(getRadioOptionDagenEtterAnnenForelder(navnAnnenForelder, førsteDagEtterAnnenForelder));
    }
    radioOptions.push(getRadioOptionAnnenDato());
    return radioOptions;
};

const getRadioOptionFarPåFødselWLB = (erBarnetFødt: boolean, intl: IntlShape): React.ReactElement => {
    const description = intlUtils(intl, 'fordeling.oppstartValg.påFødsel.description');
    const tekstId = erBarnetFødt
        ? 'fordeling.oppstartValg.påFødsel.barnErFødt'
        : 'fordeling.oppstartValg.påFødsel.barnErIkkeFødt';
    return (
        <Radio value={OppstartValg.FAMILIEHENDELSESDATO} description={description}>
            <FormattedMessage id={tekstId} />
        </Radio>
    );
};

const getRadioOptionFarRundtFødselWLB = (erBarnetFødt: boolean, intl: IntlShape): React.ReactElement => {
    const description = erBarnetFødt
        ? intlUtils(intl, 'fordeling.oppstartValg.rundtFødsel')
        : intlUtils(intl, 'fordeling.oppstartValg.rundtTermin');
    const tekstId = erBarnetFødt
        ? 'fordeling.oppstartValg.rundtFødsel.description'
        : 'fordeling.oppstartValg.rundtTermin.description';
    return (
        <Radio value={OppstartValg.RUNDT_FØDSEL} description={description}>
            <FormattedMessage id={tekstId} />
        </Radio>
    );
};

const getRadioOptionFarSenereWLB = (): React.ReactElement => (
    <Radio value={OppstartValg.RUNDT_FØDSEL}>
        <FormattedMessage id="fordeling.oppstartValg.senereFar" />
    </Radio>
);

const getRadioOptionDagenEtterAnnenForelder = (
    annenForelderNavn: string,
    førsteDagEtterAnnenForelder: Date,
): React.ReactElement => (
    <Radio value={OppstartValg.DAGEN_ETTER_ANNEN_FORELDER}>
        <FormattedMessage
            id="fordeling.oppstartValg.dagenEtterAnnenForelder"
            values={{ annenForelderNavn, førsteDagEtterAnnenForelder }}
        />
    </Radio>
);

const getRadioOptionAnnenDato = (): React.ReactElement => (
    <Radio value={OppstartValg.ANNEN_DATO}>
        <FormattedMessage id="fordeling.oppstartValg.annenDato" />
    </Radio>
);

const getRadioOptionAnnenDatoMorFødsel = (erBarnetFødt: boolean, intl: IntlShape): React.ReactElement => {
    const description = erBarnetFødt
        ? intlUtils(intl, 'fordeling.oppstartValg.annenDato.description.fødsel')
        : intlUtils(intl, 'fordeling.oppstartValg.annenDato.description.termin');
    return (
        <Radio value={OppstartValg.ANNEN_DATO} description={description}>
            <FormattedMessage id="fordeling.oppstartValg.annenDato" />
        </Radio>
    );
};

const getRadioOptionTreUkerFørTermin = (erBarnetFødt: boolean): React.ReactElement => {
    return (
        <Radio value={OppstartValg.TRE_UKER_FØR_TERMIN}>
            {!erBarnetFødt && <FormattedMessage id="fordeling.oppstartValg.treUkerFørTermin" />}
            {erBarnetFødt && <FormattedMessage id="fordeling.oppstartValg.treUkerFørFødsel" />}
        </Radio>
    );
};

const getRadioOptionsForSituasjon = (
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    navnAnnenForelder: string,
    intl: IntlShape,
    førsteDagEtterAnnenForelder: Date | undefined,
): React.ReactElement[] => {
    const erBarnetFødt = isFødtBarn(barn);
    const adoptertFraUtlandetDato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erMor = !erFarEllerMedmor;
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    if (erMor && erFødsel) {
        return getRadioOptionMorFødsel(erBarnetFødt, intl);
    }
    if (erFarEllerMedmor && erFødsel) {
        return getRadioOptionFarFødsel(
            erBarnetFødt,
            familiehendelsesdato,
            navnAnnenForelder,
            intl,
            førsteDagEtterAnnenForelder,
        );
    }

    return getRadioOptionAdopsjon(
        familiehendelsesdato,
        navnAnnenForelder,
        førsteDagEtterAnnenForelder,
        adoptertFraUtlandetDato,
    );
};

interface Props {
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    barn: Barn;
    førsteDagEtterAnnenForelder: Date | undefined;
}

const Oppstartsvalg: React.FunctionComponent<Props> = ({
    barn,
    erFarEllerMedmor,
    navnPåForeldre,
    førsteDagEtterAnnenForelder,
}) => {
    const intl = useIntl();
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const { watch } = useFormContext<FordelingFormValues>();

    const oppstartValg = watch('oppstartAvForeldrepenger');
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const radioOptions = getRadioOptionsForSituasjon(
        søkersituasjon,
        barn,
        navnAnnenForelder,
        intl,
        førsteDagEtterAnnenForelder,
    );
    return (
        <VStack gap="5">
            {radioOptions && radioOptions.length > 1 && (
                <RadioGroup
                    name="oppstartAvForeldrepenger"
                    label={<FormattedMessage id="fordeling.oppstartValg.spørsmål" />}
                    description={<FormattedMessage id="fordeling.oppstartValg.description" />}
                    validate={[isRequired(intl.formatMessage({ id: 'fordeling.oppstartValg.måOppgis' }))]}
                >
                    {...radioOptions}
                </RadioGroup>
            )}
            {oppstartValg && <p>Du valgte noe! - TODO</p>}
        </VStack>
    );
};

export default Oppstartsvalg;
