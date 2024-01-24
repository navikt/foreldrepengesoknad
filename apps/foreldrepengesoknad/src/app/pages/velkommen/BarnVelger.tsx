import { RegistrertAnnenForelder, Sak, formatDate } from '@navikt/fp-common';
import { FunctionComponent, ReactElement } from 'react';
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

const getRadioForNyttBarn = (intl: IntlShape): ReactElement => {
    return (
        <Radio
            key={SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN}
            value={SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN}
            description={intl.formatMessage({ id: 'velkommen.intro.harSaker.barnVelger.info' })}
        >
            <Label>
                <FormattedMessage id="omBarnet.gjelderAnnetBarn" />
            </Label>
        </Radio>
    );
};

const getRadioForUfødtBarn = (barn: SelectableBarn, intl: IntlShape): ReactElement => {
    const saksStatus = barn.sak !== undefined ? getStatusTekst(barn.sak.åpenBehandling === undefined, intl) : undefined;
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
};

const getStatusTekst = (åpenBehandling: boolean, intl: IntlShape) => {
    return åpenBehandling
        ? intl.formatMessage({ id: 'velkommen.sak.status.ferdigBehandlet' })
        : intl.formatMessage({ id: 'velkommen.sak.status.underBehandling' });
};

const getRadioForFødtEllerAdoptertBarn = (barn: SelectableBarn, intl: IntlShape): ReactElement => {
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
    const saksStatus = barn.sak !== undefined ? getStatusTekst(barn.sak.åpenBehandling === undefined, intl) : undefined;

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
};

const getCheckboxForBarn = (barn: SelectableBarn, intl: IntlShape): ReactElement => {
    const barnType = barn.type;
    switch (barnType) {
        case SelectableBarnType.FØDT:
        case SelectableBarnType.ADOPTERT:
        case SelectableBarnType.IKKE_UTFYLT:
            return getRadioForFødtEllerAdoptertBarn(barn, intl);
        case SelectableBarnType.UFØDT:
            return getRadioForUfødtBarn(barn, intl);
        default:
            throw Error('Missing barnType - Should never happen');
    }
};

interface Props {
    selectableBarn: SelectableBarn[];
}

const BarnVelger: FunctionComponent<Props> = ({ selectableBarn }) => {
    const intl = useIntl();

    if (selectableBarn.length === 0) {
        return null;
    }

    return (
        <RadioGroup
            name="valgteBarn"
            label={<FormattedMessage id="velkommen.intro.harSaker.barnVelger.label" />}
            validate={[isRequired(intl.formatMessage({ id: 'steg.footer.spørsmålMåBesvares' }))]}
        >
            {
                selectableBarn
                    .map((barnet) => getCheckboxForBarn(barnet, intl))
                    .concat([getRadioForNyttBarn(intl)]) as ReactElement[]
            }
        </RadioGroup>
    );
};

export default BarnVelger;
