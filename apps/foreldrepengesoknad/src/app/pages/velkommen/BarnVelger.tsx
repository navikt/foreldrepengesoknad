import { RegistrertAnnenForelder, Sak, formatDate } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Label, Radio } from '@navikt/ds-react';
import { isRequired } from '@navikt/fp-validation';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { formaterFødselsdatoerPåBarn, formaterNavnPåBarn, getTekstForAntallBarn } from 'app/utils/barnUtils';

export enum SelectableBarnType {
    FØDT = 'født',
    UFØDT = 'ufødt',
    ADOPTERT = 'adoptert',
    IKKE_UTFYLT = 'ikkeUtfylt',
}

export enum SelectableBarnOptions {
    SØKNAD_GJELDER_NYTT_BARN = 'søknad_gjeder_nytt_barn',
}

export interface SelectableBarn {
    id: string;
    type: SelectableBarnType;
    antallBarn: number;
    sortableDato: Date;
    fnr?: string[];
    termindato?: Date;
    fødselsdatoer?: Date[];
    omsorgsovertagelse?: Date;
    fornavn?: string[];
    kanSøkeOmEndring?: boolean;
    sak?: Sak;
    annenForelder?: RegistrertAnnenForelder;
    familiehendelsesdato?: Date;
    startdatoFørsteStønadsperiode?: Date;
    alleBarnaLever: boolean;
}

const getTittelForUfødtBarn = (antallBarn: number, termindato: Date, intl: IntlShape): string => {
    return intl.formatMessage(
        { id: 'velkommen.barnVelger.ufødtBarn' },
        {
            antallBarnTekst: getTekstForAntallBarn(antallBarn, intl),
            termin: formatDate(termindato),
        },
    );
};

const getRadioForUfødtBarn = (barna: SelectableBarn[], intl: IntlShape) => {
    return barna.map((barn) => {
        const saksStatus =
            barn.sak !== undefined ? getStatusTekst(barn.sak.åpenBehandling === undefined, intl) : undefined;
        const saksnummerTekst =
            barn.sak !== undefined
                ? intl.formatMessage({ id: 'velkommen.barnVelger.saksnummer' }, { saksnummer: barn.sak.saksnummer })
                : '';

        return (
            <Radio
                key={barn.id}
                value={barn.id}
                description={barn.sak !== undefined ? `${saksnummerTekst}, ${saksStatus}` : saksnummerTekst}
            >
                <Label>{getTittelForUfødtBarn(barn.antallBarn, barn.termindato!, intl)}</Label>
            </Radio>
        );
    });
};

const getStatusTekst = (åpenBehandling: boolean, intl: IntlShape) => {
    return åpenBehandling
        ? intl.formatMessage({ id: 'velkommen.sak.status.ferdigBehandlet' })
        : intl.formatMessage({ id: 'velkommen.sak.status.underBehandling' });
};

const getRadioForFødtEllerAdoptertBarn = (barna: SelectableBarn[], intl: IntlShape) => {
    return barna.map((barn) => {
        const navnTekstEllerBarnMedUkjentNavnTekst = formaterNavnPåBarn(
            barn.fornavn,
            barn.fødselsdatoer,
            barn.omsorgsovertagelse,
            barn.alleBarnaLever,
            barn.antallBarn,
            intl,
        );
        const fødselsdatoerTekst = formaterFødselsdatoerPåBarn(barn.fødselsdatoer);
        const fødtAdoptertDatoTekst =
            barn.type === SelectableBarnType.FØDT || barn.type === SelectableBarnType.IKKE_UTFYLT
                ? fødselsdatoerTekst
                : formatDate(barn.omsorgsovertagelse!);
        const situasjonTekst =
            barn.type === SelectableBarnType.FØDT || barn.type === SelectableBarnType.IKKE_UTFYLT
                ? intl.formatMessage({ id: 'velkommen.barnVelger.født' })
                : intl.formatMessage({ id: 'velkommen.barnVelger.adopsjon' });

        const saksnummerTekst =
            barn.sak !== undefined
                ? intl.formatMessage({ id: 'velkommen.barnVelger.saksnummer' }, { saksnummer: barn.sak.saksnummer })
                : '';
        const saksStatus =
            barn.sak !== undefined ? getStatusTekst(barn.sak.åpenBehandling === undefined, intl) : undefined;

        return (
            <Radio
                key={barn.id}
                value={barn.id}
                description={saksStatus ? `${saksnummerTekst}, ${saksStatus}` : saksnummerTekst}
            >
                <Label>
                    {barn.alleBarnaLever
                        ? `${navnTekstEllerBarnMedUkjentNavnTekst} ${situasjonTekst} ${fødtAdoptertDatoTekst}`
                        : navnTekstEllerBarnMedUkjentNavnTekst}
                </Label>
            </Radio>
        );
    });
};

interface Props {
    selectableBarn: SelectableBarn[];
}

const BarnVelger: FunctionComponent<Props> = ({ selectableBarn }) => {
    const intl = useIntl();

    if (selectableBarn.length === 0) {
        return null;
    }

    const ufødteBarn = selectableBarn.filter((b) => b.type === SelectableBarnType.UFØDT);
    const fødteOgAdopterteBarn = selectableBarn.filter((b) => b.type !== SelectableBarnType.UFØDT);

    return (
        <RadioGroup
            name="valgteBarn"
            label={<FormattedMessage id="velkommen.intro.harSaker.barnVelger.label" />}
            validate={[isRequired(intl.formatMessage({ id: 'steg.footer.spørsmålMåBesvares' }))]}
        >
            {fødteOgAdopterteBarn.length > 0 && getRadioForFødtEllerAdoptertBarn(fødteOgAdopterteBarn, intl)}
            {ufødteBarn.length > 0 && getRadioForUfødtBarn(ufødteBarn, intl)}
            <Radio
                key={SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN}
                value={SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN}
                description={intl.formatMessage({ id: 'velkommen.intro.harSaker.barnVelger.info' })}
            >
                <Label>
                    <FormattedMessage id="omBarnet.gjelderAnnetBarn" />
                </Label>
            </Radio>
        </RadioGroup>
    );
};

export default BarnVelger;
