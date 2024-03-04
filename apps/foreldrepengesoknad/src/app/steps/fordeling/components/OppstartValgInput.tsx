import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Radio } from '@navikt/ds-react';

import {
    Barn,
    ISOStringToDate,
    andreAugust2022ReglerGjelder,
    formatDate,
    førsteOktober2021ReglerGjelder,
    getFørsteUttaksdagForeldrepengerFørFødsel,
    intlUtils,
    isAdoptertAnnetBarn,
    isFarEllerMedmor,
    isFødtBarn,
} from '@navikt/fp-common';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { isRequired } from '@navikt/fp-validation';

import { OppstartValg } from 'app/context/types/Fordeling';
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
    }
    if (førsteDagEtterAnnenForelder) {
        radioOptions.push(getRadioOptionDagenEtterAnnenForelder(navnAnnenForelder, førsteDagEtterAnnenForelder));
    }
    if (førsteOktober2021ReglerGjelder(familiehendelsesDato)) {
        radioOptions.push(getRadioOptionAnnenDato());
    }
    return radioOptions;
};

const getRadioOptionMorFødsel = (
    erBarnetFødt: boolean,
    intl: IntlShape,
    familiehendelsesdato: Date,
): React.ReactElement[] => [
    getRadioOptionTreUkerFørTermin(erBarnetFødt, intl, familiehendelsesdato),
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
        radioOptions.push(getRadioOptionAdopsjonAnkomstNorge(adoptertFraUtlandetDato));
    }
    if (førsteDagEtterAnnenForelder) {
        radioOptions.push(getRadioOptionDagenEtterAnnenForelder(navnAnnenForelder, førsteDagEtterAnnenForelder));
    }
    radioOptions.push(getRadioOptionAnnenDato());
    return radioOptions;
};

const getRadioOptionFarPåFødselWLB = (erBarnetFødt: boolean, intl: IntlShape): React.ReactElement => {
    const description = erBarnetFødt
        ? intlUtils(intl, 'fordeling.oppstartValg.påFødsel.description.barnErFødt')
        : intlUtils(intl, 'fordeling.oppstartValg.påFødsel.description.barnErIkkeFødt');
    const tekstId = erBarnetFødt
        ? 'fordeling.oppstartValg.påFødsel.barnErFødt'
        : 'fordeling.oppstartValg.påFødsel.barnErIkkeFødt';
    return (
        <Radio value={OppstartValg.FAMILIEHENDELSESDATO} description={description}>
            <FormattedMessage id={tekstId} />
        </Radio>
    );
};

const getRadioOptionDagenEtterAnnenForelder = (
    navnAnnenForelder: string,
    førsteDagEtterAnnenForelder: Date,
): React.ReactElement => (
    <Radio value={OppstartValg.DAGEN_ETTER_ANNEN_FORELDER}>
        <FormattedMessage
            id="fordeling.oppstartValg.dagenEtterAnnenForelder"
            values={{ navnAnnenForelder, førsteDagEtterAnnenForelder: formatDate(førsteDagEtterAnnenForelder) }}
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

const getRadioOptionTreUkerFørTermin = (
    erBarnetFødt: boolean,
    intl: IntlShape,
    familiehendelsesdato: Date,
): React.ReactElement => {
    const førsteDagTreUkerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    return (
        <Radio
            value={OppstartValg.TRE_UKER_FØR_TERMIN}
            description={intlUtils(intl, 'fordeling.oppstartValg.treUkerFør.description', {
                dato: formatDate(førsteDagTreUkerFørFødsel),
            })}
        >
            {!erBarnetFødt && <FormattedMessage id="fordeling.oppstartValg.treUkerFørTermin" />}
            {erBarnetFødt && <FormattedMessage id="fordeling.oppstartValg.treUkerFørFødsel" />}
        </Radio>
    );
};

export const getRadioOptionsForSituasjon = (
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
        return getRadioOptionMorFødsel(erBarnetFødt, intl, familiehendelsesdato);
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
    oppstartsValgOptions: React.ReactElement[];
}

const OppstartValgInput: React.FunctionComponent<Props> = ({ oppstartsValgOptions }) => {
    const intl = useIntl();

    if (!oppstartsValgOptions || oppstartsValgOptions.length < 2) {
        return null;
    }
    return (
        <RadioGroup
            name="oppstartAvForeldrepengerValg"
            label={<FormattedMessage id="fordeling.oppstartValg.spørsmål" />}
            description={<FormattedMessage id="fordeling.oppstartValg.description" />}
            validate={[isRequired(intl.formatMessage({ id: 'fordeling.oppstartValg.måOppgis' }))]}
        >
            {...oppstartsValgOptions}
        </RadioGroup>
    );
};

export default OppstartValgInput;
