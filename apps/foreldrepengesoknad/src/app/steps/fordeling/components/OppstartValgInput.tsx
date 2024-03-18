import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { Radio } from '@navikt/ds-react';

import {
    Barn,
    ISOStringToDate,
    NavnPåForeldre,
    andreAugust2022ReglerGjelder,
    formatDateExtended,
    førsteOktober2021ReglerGjelder,
    getFørsteUttaksdagForeldrepengerFørFødsel,
    intlUtils,
    isAdoptertAnnetBarn,
    isFarEllerMedmor,
    isFødtBarn,
} from '@navikt/fp-common';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { OppstartValg } from 'app/context/types/Fordeling';
import { getDatoForAleneomsorg } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';

const getOppstartsvalgFarFødsel = (
    familiehendelsesDato: Date,
    førsteDagEtterAnnenForelder: Date | undefined,
): OppstartValg[] => {
    const radioOptions = [] as OppstartValg[];
    if (andreAugust2022ReglerGjelder(familiehendelsesDato)) {
        radioOptions.push(OppstartValg.FAMILIEHENDELSESDATO);
    }
    if (førsteDagEtterAnnenForelder) {
        radioOptions.push(OppstartValg.DAGEN_ETTER_ANNEN_FORELDER);
    }
    if (førsteOktober2021ReglerGjelder(familiehendelsesDato)) {
        radioOptions.push(OppstartValg.ANNEN_DATO);
    }
    return radioOptions;
};

const getOppstartsvalgFarAleneomsorg = (familiehendelsesdato: Date) => {
    const radioOptions = [OppstartValg.OMSORGSOVERTAKELSE];
    if (førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        radioOptions.push(OppstartValg.ANNEN_DATO);
    }
    return radioOptions;
};

export const getErBarnetFødtFørEllerPåTermin = (barn: Barn) => {
    const erBarnetFødt = isFødtBarn(barn);
    const termindato = getTermindato(barn);
    const fødselsdato = getFødselsdato(barn);
    return (erBarnetFødt && termindato && dayjs(fødselsdato).isSameOrBefore(termindato, 'd')) || !termindato;
};

const getOppstartsValgMorFødsel = (barn: Barn) => {
    if (getErBarnetFødtFørEllerPåTermin(barn)) {
        return [OppstartValg.TRE_UKER_FØR_FØDSEL, OppstartValg.ANNEN_DATO];
    }
    return [OppstartValg.TRE_UKER_FØR_TERMIN, OppstartValg.ANNEN_DATO];
};

const getOppstartsvalgAdopsjon = (
    førsteDagEtterAnnenForelder: Date | undefined,
    adoptertFraUtlandetDato: Date | undefined,
): OppstartValg[] => {
    const radioOptions = [OppstartValg.FAMILIEHENDELSESDATO];
    if (adoptertFraUtlandetDato) {
        radioOptions.push(OppstartValg.ANKOMSTDATO_NORGE);
    }
    if (førsteDagEtterAnnenForelder) {
        radioOptions.push(OppstartValg.DAGEN_ETTER_ANNEN_FORELDER);
    }
    radioOptions.push(OppstartValg.ANNEN_DATO);
    return radioOptions;
};

const getRadioOptionForDatoForAleneomsorg = (datoForAleneomsorg: Date | undefined): React.ReactElement => {
    if (!datoForAleneomsorg) {
        throw new Error('Mangler dato for aleneomsorg');
    }
    return (
        <Radio value={OppstartValg.OMSORGSOVERTAKELSE}>
            <FormattedMessage
                id="fordeling.oppstartValg.omsorgsovertakelsen"
                values={{ dato: formatDateExtended(datoForAleneomsorg) }}
            />
        </Radio>
    );
};

const getRadioOptionAdopsjonOmsorgsovertakelse = (familiehendelsesdato: Date): React.ReactElement => {
    return (
        <Radio value={OppstartValg.FAMILIEHENDELSESDATO}>
            <FormattedMessage
                id="fordeling.oppstartValg.omsorgsovertakelsen"
                values={{ dato: formatDateExtended(familiehendelsesdato) }}
            />
        </Radio>
    );
};

const getRadioOptionAdopsjonAnkomstNorge = (ankomstNorge: Date | undefined): React.ReactElement => {
    if (!ankomstNorge) {
        throw new Error('Ukjent ankomstdato til Norge');
    }
    return (
        <Radio value={OppstartValg.ANKOMSTDATO_NORGE}>
            <FormattedMessage
                id="fordeling.oppstartValg.ankomstNorge"
                values={{ dato: formatDateExtended(ankomstNorge) }}
            />
        </Radio>
    );
};

const getRadioOptionFarPåFødselWLB = (
    erBarnetFødt: boolean,
    antallBarn: number,
    intl: IntlShape,
): React.ReactElement => {
    const barnetEllerBarna = antallBarn > 1 ? intlUtils(intl, 'barnet') : intlUtils(intl, 'barna');

    if (erBarnetFødt) {
        return (
            <Radio
                value={OppstartValg.FAMILIEHENDELSESDATO}
                description={intlUtils(intl, 'fordeling.oppstartValg.påFødsel.description.barnErFødt', {
                    barnetEllerBarna,
                })}
            >
                <FormattedMessage id="fordeling.oppstartValg.påFødsel.barnErFødt" values={{ barnetEllerBarna }} />
            </Radio>
        );
    } else {
        return (
            <Radio
                value={OppstartValg.FAMILIEHENDELSESDATO}
                description={intlUtils(intl, 'fordeling.oppstartValg.påFødsel.description.barnErIkkeFødt')}
            >
                <FormattedMessage id="fordeling.oppstartValg.påFødsel.barnErIkkeFødt" />
            </Radio>
        );
    }
};

const getRadioOptionDagenEtterAnnenForelder = (
    navnAnnenForelder: string,
    førsteDagEtterAnnenForelder: Date | undefined,
): React.ReactElement => {
    if (!førsteDagEtterAnnenForelder) {
        throw new Error('Mangler dato for oppstart etter annen forelder.');
    }
    return (
        <Radio value={OppstartValg.DAGEN_ETTER_ANNEN_FORELDER}>
            <FormattedMessage
                id="fordeling.oppstartValg.dagenEtterAnnenForelder"
                values={{
                    navnAnnenForelder,
                    førsteDagEtterAnnenForelder: formatDateExtended(førsteDagEtterAnnenForelder),
                }}
            />
        </Radio>
    );
};

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

const getRadioOptionTreUkerFørTermin = (intl: IntlShape, barn: Barn): React.ReactElement => {
    const termindato = ISOStringToDate(getTermindato(barn));
    if (!termindato) {
        throw new Error('Ukjent termindato for barnet.');
    }
    const førsteDagTreUkerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(termindato);
    return (
        <Radio
            value={OppstartValg.TRE_UKER_FØR_TERMIN}
            description={intlUtils(intl, 'fordeling.oppstartValg.treUkerFør.description', {
                dato: formatDateExtended(førsteDagTreUkerFørFødsel),
            })}
        >
            <FormattedMessage id="fordeling.oppstartValg.treUkerFørTermin" />
        </Radio>
    );
};

const getRadioOptionTreUkerFørFødsel = (intl: IntlShape, barn: Barn): React.ReactElement => {
    const fødselsdato = ISOStringToDate(getFødselsdato(barn));
    if (!fødselsdato) {
        throw new Error('Ukjent fødselsdato for barnet.');
    }
    const førsteDagTreUkerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(fødselsdato);
    return (
        <Radio
            value={OppstartValg.TRE_UKER_FØR_FØDSEL}
            description={intlUtils(intl, 'fordeling.oppstartValg.treUkerFør.description', {
                dato: formatDateExtended(førsteDagTreUkerFørFødsel),
            })}
        >
            <FormattedMessage id="fordeling.oppstartValg.treUkerFørFødsel" />
        </Radio>
    );
};

export const getValgOptionsForOppstart = (
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    deltUttak: boolean,
    førsteDagEtterAnnenForelder: Date | undefined,
    datoForAleneomsorg: Date | undefined,
): OppstartValg[] => {
    const adoptertFraUtlandetDato = isAdoptertAnnetBarn(barn) ? ISOStringToDate(barn.ankomstdato) : undefined;
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erMor = !erFarEllerMedmor;
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    if (erMor && erFødsel) {
        return getOppstartsValgMorFødsel(barn);
    }
    if (erFarEllerMedmor && !deltUttak && datoForAleneomsorg) {
        return getOppstartsvalgFarAleneomsorg(familiehendelsesdato);
    }
    if (erFarEllerMedmor && erFødsel) {
        return getOppstartsvalgFarFødsel(
            familiehendelsesdato,

            førsteDagEtterAnnenForelder,
        );
    }
    return getOppstartsvalgAdopsjon(førsteDagEtterAnnenForelder, adoptertFraUtlandetDato);
};

const getRadioOptionFamiliehendelsesdato = (
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    erFødsel: boolean,
    erBarnetFødt: boolean,
    familiehendelsesdato: Date,
    antallBarn: number,
) => {
    if (erFarEllerMedmor && erFødsel) {
        return getRadioOptionFarPåFødselWLB(erBarnetFødt, antallBarn, intl);
    }
    return getRadioOptionAdopsjonOmsorgsovertakelse(familiehendelsesdato);
};

const getRadioOptionForAnnenDato = (
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    erFødsel: boolean,
    erBarnetFødt: boolean,
) => {
    if (!erFarEllerMedmor && erFødsel) {
        return getRadioOptionAnnenDatoMorFødsel(erBarnetFødt, intl);
    }
    return getRadioOptionAnnenDato();
};

export const mapOppstartValgToRadioOption = (
    valg: OppstartValg,
    barn: Barn,
    erFødsel: boolean,
    erFarEllerMedmor: boolean,
    datoForAleneomsorg: Date | undefined,
    navnAnnenForelder: string,
    førsteDagEtterAnnenForelder: Date | undefined,
    intl: IntlShape,
) => {
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const erBarnetFødt = isFødtBarn(barn);
    const ankomstNorge = isAdoptertAnnetBarn(barn) ? ISOStringToDate(barn.ankomstdato)! : undefined;
    switch (valg) {
        case OppstartValg.FAMILIEHENDELSESDATO:
            return getRadioOptionFamiliehendelsesdato(
                erFarEllerMedmor,
                intl,
                erFødsel,
                erBarnetFødt,
                familiehendelsesdato,
                barn.antallBarn,
            );
        case OppstartValg.TRE_UKER_FØR_TERMIN:
            return getRadioOptionTreUkerFørTermin(intl, barn);
        case OppstartValg.TRE_UKER_FØR_FØDSEL:
            return getRadioOptionTreUkerFørFødsel(intl, barn);
        case OppstartValg.OMSORGSOVERTAKELSE:
            return getRadioOptionForDatoForAleneomsorg(datoForAleneomsorg);
        case OppstartValg.DAGEN_ETTER_ANNEN_FORELDER:
            return getRadioOptionDagenEtterAnnenForelder(navnAnnenForelder, førsteDagEtterAnnenForelder);
        case OppstartValg.ANKOMSTDATO_NORGE:
            return getRadioOptionAdopsjonAnkomstNorge(ankomstNorge);
        case OppstartValg.ANNEN_DATO:
            return getRadioOptionForAnnenDato(erFarEllerMedmor, intl, erFødsel, erBarnetFødt);
    }
};

export const getOppstartsValgeneToRadioOptions = (
    oppstartsvalg: OppstartValg[],
    barn: Barn,
    erFødsel: boolean,
    erFarEllerMedmor: boolean,
    datoForAleneomsorg: Date | undefined,
    navnAnnenForelder: string,
    førsteDagEtterAnnenForelder: Date | undefined,
    intl: IntlShape,
): React.ReactElement[] => {
    return oppstartsvalg.map((valg) =>
        mapOppstartValgToRadioOption(
            valg,
            barn,
            erFødsel,
            erFarEllerMedmor,
            datoForAleneomsorg,
            navnAnnenForelder,
            førsteDagEtterAnnenForelder,
            intl,
        ),
    );
};

interface Props {
    oppstartsvalg: OppstartValg[];
    erFarEllerMedmor: boolean;
    familiehendelsesdato: Date;
    erAleneOmOmsorg: boolean;
    navnPåForeldre: NavnPåForeldre;
    førsteDagEtterAnnenForelder: Date | undefined;
}

const OppstartValgInput: React.FunctionComponent<Props> = ({
    oppstartsvalg,
    erFarEllerMedmor,
    familiehendelsesdato,
    erAleneOmOmsorg,
    navnPåForeldre,
    førsteDagEtterAnnenForelder,
}) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    if (!oppstartsvalg || oppstartsvalg.length < 2) {
        return null;
    }
    const datoForAleneomsorg = ISOStringToDate(getDatoForAleneomsorg(annenForelder));
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const oppstartsValgOptions = getOppstartsValgeneToRadioOptions(
        oppstartsvalg,
        barn,
        erFødsel,
        erFarEllerMedmor,
        datoForAleneomsorg,
        navnAnnenForelder,
        førsteDagEtterAnnenForelder,
        intl,
    );

    const descriptionId =
        erFarEllerMedmor && andreAugust2022ReglerGjelder(familiehendelsesdato) && !erAleneOmOmsorg
            ? 'fordeling.oppstartValg.description.fedreWLB'
            : 'fordeling.description.kanEndresSenere';
    return (
        <RadioGroup
            name="oppstartAvForeldrepengerValg"
            label={<FormattedMessage id="fordeling.oppstartValg.spørsmål" />}
            description={<FormattedMessage id={descriptionId} />}
            validate={[isRequired(intl.formatMessage({ id: 'fordeling.oppstartValg.måOppgis' }))]}
        >
            {...oppstartsValgOptions}
        </RadioGroup>
    );
};

export default OppstartValgInput;
