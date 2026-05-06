import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Fordeling, OppstartValg } from 'types/Fordeling';
import { getDatoForAleneomsorg, getIsDeltUttak } from 'utils/annenForelderUtils';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'utils/barnUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getKunFarHarRett } from 'utils/personUtils';

import { Radio } from '@navikt/ds-react';

import { RhfRadioGroup } from '@navikt/fp-form-hooks';
import { Barn, NavnPåForeldre, SøkersituasjonFp, isAdoptertAnnetBarn, isFødtBarn } from '@navikt/fp-types';
import { formatDateExtended } from '@navikt/fp-utils';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { getFørsteUttaksdagForeldrepengerFørFødsel } from './MorOppstartInformasjon';

const getOppstartsvalgFarFødsel = (
    familiehendelsesDato: string,
    førsteDagEtterAnnenForelder: string | undefined,
): OppstartValg[] => {
    const radioOptions = [] as OppstartValg[];
    const erFødselsdatoOverTreMånederTilbakeITid = dayjs(familiehendelsesDato).isBefore(
        dayjs().startOf('month').subtract(3, 'months').toDate(),
    );
    if (!erFødselsdatoOverTreMånederTilbakeITid) {
        radioOptions.push(OppstartValg.FAMILIEHENDELSESDATO);
    }
    if (førsteDagEtterAnnenForelder) {
        radioOptions.push(OppstartValg.DAGEN_ETTER_ANNEN_FORELDER);
    }

    radioOptions.push(OppstartValg.ANNEN_DATO);

    return radioOptions;
};

const getOppstartsvalgFarAleneomsorg = () => {
    return [OppstartValg.DATO_FOR_ALENEOMSORG, OppstartValg.ANNEN_DATO];
};

const getErBarnetFødtMerEnnTolvUkerFørTermin = (
    erBarnetFødt: boolean,
    termindato: string | undefined,
    fødselsdato: string | undefined,
) => {
    const tolvUkerFørTermin = dayjs(termindato).subtract(12, 'weeks');
    return erBarnetFødt && termindato && dayjs(fødselsdato).isBefore(tolvUkerFørTermin, 'd');
};

export const getErBarnetFødtInnenTreUkerFørTermin = (
    erBarnetFødt: boolean,
    termindato: string | undefined,
    fødselsdato: string | undefined,
) => {
    const treUkerFørTermin = dayjs(termindato).subtract(3, 'weeks');
    return erBarnetFødt && termindato && dayjs(fødselsdato).isSameOrAfter(treUkerFørTermin, 'd');
};

const getErBarnetFødtMerEnnTreUkerFørTermin = (
    erBarnetFødt: boolean,
    termindato: string | undefined,
    fødselsdato: string | undefined,
) => {
    const treUkerFørTermin = dayjs(termindato).subtract(3, 'weeks');
    return erBarnetFødt && treUkerFørTermin && dayjs(fødselsdato).isBefore(treUkerFørTermin, 'd');
};

const getOppstartsValgMorFødsel = (barn: Barn) => {
    const erBarnetFødt = isFødtBarn(barn);
    const termindato = getTermindato(barn);
    const fødselsdato = getFødselsdato(barn);

    if (getErBarnetFødtMerEnnTolvUkerFørTermin(erBarnetFødt, termindato, fødselsdato)) {
        return [OppstartValg.FAMILIEHENDELSESDATO];
    }
    if (getErBarnetFødtMerEnnTreUkerFørTermin(erBarnetFødt, termindato, fødselsdato)) {
        return [OppstartValg.FAMILIEHENDELSESDATO, OppstartValg.ANNEN_DATO];
    }
    if (getErBarnetFødtInnenTreUkerFørTermin(erBarnetFødt, termindato, fødselsdato)) {
        return [OppstartValg.TRE_UKER_FØR_FØDSEL, OppstartValg.ANNEN_DATO];
    }
    return [OppstartValg.TRE_UKER_FØR_TERMIN, OppstartValg.ANNEN_DATO];
};

const getOppstartsvalgAdopsjon = (
    førsteDagEtterAnnenForelder: string | undefined,
    adoptertFraUtlandetDato: string | undefined,
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

const getRadioOptionForDatoForAleneomsorg = (datoForAleneomsorg: string | undefined): React.ReactElement => {
    if (!datoForAleneomsorg) {
        throw new Error('Mangler dato for aleneomsorg');
    }
    if (dayjs().isAfter(dayjs(datoForAleneomsorg), 'd')) {
        return (
            <Radio key={OppstartValg.DATO_FOR_ALENEOMSORG} value={OppstartValg.DATO_FOR_ALENEOMSORG}>
                <FormattedMessage
                    id="fordeling.oppstartValg.datoForAleneomsorg.iFortid"
                    values={{ dato: formatDateExtended(datoForAleneomsorg) }}
                />
            </Radio>
        );
    }
    return (
        <Radio key={OppstartValg.DATO_FOR_ALENEOMSORG} value={OppstartValg.DATO_FOR_ALENEOMSORG}>
            <FormattedMessage
                id="fordeling.oppstartValg.datoForAleneomsorg.iFremtid"
                values={{ dato: formatDateExtended(datoForAleneomsorg) }}
            />
        </Radio>
    );
};

const getRadioOptionAdopsjon = (familiehendelsesdato: string): React.ReactElement => {
    return (
        <Radio key={OppstartValg.FAMILIEHENDELSESDATO} value={OppstartValg.FAMILIEHENDELSESDATO}>
            <FormattedMessage
                id="fordeling.oppstartValg.omsorgsovertakelsen"
                values={{ dato: formatDateExtended(familiehendelsesdato) }}
            />
        </Radio>
    );
};

const getRadioOptionAdopsjonAnkomstNorge = (ankomstNorge: string | undefined): React.ReactElement => {
    if (!ankomstNorge) {
        throw new Error('Ukjent ankomstdato til Norge');
    }
    return (
        <Radio key={OppstartValg.ANKOMSTDATO_NORGE} value={OppstartValg.ANKOMSTDATO_NORGE}>
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
    deltUttak: boolean,
    intl: IntlShape,
): React.ReactElement => {
    if (erBarnetFødt) {
        const description = deltUttak
            ? intl.formatMessage(
                  { id: 'fordeling.oppstartValg.påFødsel.description.barnErFødt' },
                  {
                      antallBarn,
                  },
              )
            : '';
        return (
            <Radio
                key={OppstartValg.FAMILIEHENDELSESDATO}
                value={OppstartValg.FAMILIEHENDELSESDATO}
                description={description}
            >
                <FormattedMessage id="fordeling.oppstartValg.påFødsel.barnErFødt" values={{ antallBarn }} />
            </Radio>
        );
    } else {
        const description = deltUttak
            ? intl.formatMessage({ id: 'fordeling.oppstartValg.påFødsel.description.barnErIkkeFødt' })
            : '';
        return (
            <Radio
                key={OppstartValg.FAMILIEHENDELSESDATO}
                value={OppstartValg.FAMILIEHENDELSESDATO}
                description={description}
            >
                <FormattedMessage id="fordeling.oppstartValg.påFødsel.barnErIkkeFødt" />
            </Radio>
        );
    }
};

const getRadioOptionMorFødsel = (antallBarn: number) => {
    return (
        <Radio key={OppstartValg.FAMILIEHENDELSESDATO} value={OppstartValg.FAMILIEHENDELSESDATO}>
            <FormattedMessage id="fordeling.oppstartValg.påFødsel.barnErFødt" values={{ antallBarn }} />
        </Radio>
    );
};

const getRadioOptionDagenEtterAnnenForelder = (
    navnAnnenForelder: string,
    førsteDagEtterAnnenForelder: string | undefined,
): React.ReactElement => {
    if (!førsteDagEtterAnnenForelder) {
        throw new Error('Mangler dato for oppstart etter annen forelder.');
    }
    return (
        <Radio key={OppstartValg.DAGEN_ETTER_ANNEN_FORELDER} value={OppstartValg.DAGEN_ETTER_ANNEN_FORELDER}>
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
    <Radio key={OppstartValg.ANNEN_DATO} value={OppstartValg.ANNEN_DATO}>
        <FormattedMessage id="fordeling.oppstartValg.annenDato" />
    </Radio>
);

const getRadioOptionAnnenDatoMorFødsel = (): React.ReactElement => {
    return (
        <Radio key={OppstartValg.ANNEN_DATO} value={OppstartValg.ANNEN_DATO}>
            <FormattedMessage id="fordeling.oppstartValg.annenDato" />
        </Radio>
    );
};

const getRadioOptionTreUkerFørTermin = (barn: Barn): React.ReactElement => {
    const termindato = getTermindato(barn);
    const førsteDagTreUkerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(termindato);
    return (
        <Radio key={OppstartValg.TRE_UKER_FØR_TERMIN} value={OppstartValg.TRE_UKER_FØR_TERMIN}>
            <FormattedMessage
                id="fordeling.oppstartValg.treUkerFørTermin"
                values={{ dato: formatDateExtended(førsteDagTreUkerFørFødsel) }}
            />
        </Radio>
    );
};

const getRadioOptionTreUkerFørFødsel = (barn: Barn): React.ReactElement => {
    const fødselsdato = getFødselsdato(barn);
    const førsteDagTreUkerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(fødselsdato);
    return (
        <Radio key={OppstartValg.TRE_UKER_FØR_FØDSEL} value={OppstartValg.TRE_UKER_FØR_FØDSEL}>
            <FormattedMessage
                id="fordeling.oppstartValg.treUkerFørFødsel"
                values={{ dato: formatDateExtended(førsteDagTreUkerFørFødsel) }}
            />
        </Radio>
    );
};

export const getValgOptionsForOppstart = (
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    deltUttak: boolean,
    førsteDagEtterAnnenForelder: string | undefined,
    datoForAleneomsorg: string | undefined,
): OppstartValg[] => {
    const adoptertFraUtlandetDato = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erMor = !erFarEllerMedmor;
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    if (erMor && erFødsel) {
        return getOppstartsValgMorFødsel(barn);
    }
    if (erFarEllerMedmor && !deltUttak && datoForAleneomsorg && erFødsel) {
        return getOppstartsvalgFarAleneomsorg();
    }
    if (erFarEllerMedmor && erFødsel) {
        return getOppstartsvalgFarFødsel(familiehendelsesdato, førsteDagEtterAnnenForelder);
    }
    return getOppstartsvalgAdopsjon(førsteDagEtterAnnenForelder, adoptertFraUtlandetDato);
};

const getRadioOptionFamiliehendelsesdato = (
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    erFødsel: boolean,
    erBarnetFødt: boolean,
    familiehendelsesdato: string,
    antallBarn: number,
    deltUttak: boolean,
) => {
    if (erFarEllerMedmor && erFødsel) {
        return getRadioOptionFarPåFødselWLB(erBarnetFødt, antallBarn, deltUttak, intl);
    }
    if (!erFarEllerMedmor && erFødsel) {
        return getRadioOptionMorFødsel(antallBarn);
    }
    return getRadioOptionAdopsjon(familiehendelsesdato);
};

const getRadioOptionForAnnenDato = (erFarEllerMedmor: boolean, erFødsel: boolean) => {
    if (!erFarEllerMedmor && erFødsel) {
        return getRadioOptionAnnenDatoMorFødsel();
    }
    return getRadioOptionAnnenDato();
};

const mapOppstartValgToRadioOption = (
    valg: OppstartValg,
    barn: Barn,
    erFødsel: boolean,
    erFarEllerMedmor: boolean,
    datoForAleneomsorg: string | undefined,
    navnAnnenForelder: string,
    førsteDagEtterAnnenForelder: string | undefined,
    deltUttak: boolean,
    intl: IntlShape,
) => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erBarnetFødt = isFødtBarn(barn);
    const ankomstNorge = isAdoptertAnnetBarn(barn) ? barn.ankomstdato : undefined;
    switch (valg) {
        case OppstartValg.FAMILIEHENDELSESDATO:
            return getRadioOptionFamiliehendelsesdato(
                erFarEllerMedmor,
                intl,
                erFødsel,
                erBarnetFødt,
                familiehendelsesdato,
                barn.antallBarn,
                deltUttak,
            );
        case OppstartValg.TRE_UKER_FØR_TERMIN:
            return getRadioOptionTreUkerFørTermin(barn);
        case OppstartValg.TRE_UKER_FØR_FØDSEL:
            return getRadioOptionTreUkerFørFødsel(barn);
        case OppstartValg.DATO_FOR_ALENEOMSORG:
            return getRadioOptionForDatoForAleneomsorg(datoForAleneomsorg);
        case OppstartValg.DAGEN_ETTER_ANNEN_FORELDER:
            return getRadioOptionDagenEtterAnnenForelder(navnAnnenForelder, førsteDagEtterAnnenForelder);
        case OppstartValg.ANKOMSTDATO_NORGE:
            return getRadioOptionAdopsjonAnkomstNorge(ankomstNorge);
        case OppstartValg.ANNEN_DATO:
            return getRadioOptionForAnnenDato(erFarEllerMedmor, erFødsel);
    }
};

interface Props {
    oppstartsvalg: OppstartValg[];
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    navnPåForeldre: NavnPåForeldre;
    førsteDagEtterAnnenForelder: string | undefined;
}

export const OppstartValgInput = ({
    oppstartsvalg,
    erFarEllerMedmor,
    erAleneOmOmsorg,
    navnPåForeldre,
    førsteDagEtterAnnenForelder,
}: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const { control } = useFormContext<Fordeling>();

    if (!oppstartsvalg || oppstartsvalg.length <= 1) {
        return null;
    }

    const bareFarHarRett = getKunFarHarRett(erFarEllerMedmor, annenForelder, erAleneOmOmsorg);
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const deltUttak = getIsDeltUttak(annenForelder);
    const datoForAleneomsorg = getDatoForAleneomsorg(annenForelder);

    const erMorFødsel = !erFarEllerMedmor && erFødsel;

    const getDescription = () => {
        if (erFarEllerMedmor && !erAleneOmOmsorg && !bareFarHarRett) {
            return <FormattedMessage id="fordeling.oppstartValg.description.fedreWLB" />;
        }
        if (erMorFødsel) {
            const erBarnetFødt = isFødtBarn(barn);
            return erBarnetFødt ? (
                <FormattedMessage id="fordeling.oppstartValg.description.morFødsel" />
            ) : (
                <FormattedMessage id="fordeling.oppstartValg.description.morFødselTermin" />
            );
        }
        return undefined;
    };

    return (
        <RhfRadioGroup
            name="oppstartAvForeldrepengerValg"
            control={control}
            label={<FormattedMessage id="fordeling.oppstartValg.spørsmål" />}
            description={getDescription()}
            validate={[isRequired(intl.formatMessage({ id: 'fordeling.oppstartValg.måOppgis' }))]}
        >
            {oppstartsvalg.map((valg) =>
                mapOppstartValgToRadioOption(
                    valg,
                    barn,
                    erFødsel,
                    erFarEllerMedmor,
                    datoForAleneomsorg,
                    navnAnnenForelder,
                    førsteDagEtterAnnenForelder,
                    deltUttak,
                    intl,
                ),
            )}
        </RhfRadioGroup>
    );
};
