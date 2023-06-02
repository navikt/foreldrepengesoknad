import SøknadDTO, { Søknadstype, UferdigSøknad, Søknadsgrunnlag } from 'app/types/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { UferdigTilrettelegging } from '../types/Tilrettelegging';
import { TilretteleggingDTO } from '../types/TilretteleggingDTO';
import { Søker, SøkerDTO } from '../types/Søker';
import { mapTilretteleggingerTilDTO } from './tilretteleggingUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Språkkode } from 'common/types';
import { isISODateString } from '@navikt/ds-datepicker';
import { Utenlandsopphold, UtenlandsoppholdDTO } from 'app/types/InformasjonOmUtenlandsopphold';

const fjernForkastetTilrettelegging = (tilrettelegging: UferdigTilrettelegging[], søknadsgrunnlag: Søknadsgrunnlag[]) =>
    tilrettelegging.filter((t) => søknadsgrunnlag.some((g) => (g as any) === t.id));

const areDefined = (...items: any[]) => items.some((item) => item !== undefined);

const korrigerTilretteleggingArbeidsforhold = (
    tilrettelegging: UferdigTilrettelegging,
    arbeidsforhold: Arbeidsforhold[]
): UferdigTilrettelegging => {
    const forhold = tilrettelegging.arbeidsforhold.id
        ? arbeidsforhold.find((a) => a.guid === tilrettelegging.arbeidsforhold.id)
        : undefined;
    if (forhold) {
        return {
            ...tilrettelegging,
            arbeidsforhold: {
                ...tilrettelegging.arbeidsforhold,
                id: forhold.arbeidsgiverId,
            },
        };
    }
    return tilrettelegging;
};

const convertSpråkkode = (språkkode: Språkkode) => {
    if (språkkode === 'nn') {
        return 'NN';
    } else {
        return 'NB';
    }
};

const konverterStringDatoerIObjektTilDate = <T, U>(input: T): U => {
    const inputJSON = JSON.stringify(input);

    return JSON.parse(inputJSON, (_key, value) => {
        if (isISODateString(value)) {
            return new Date(value);
        }

        return value;
    });
};

export const processUtfyltSøknad = (
    utfyltSøknad: UferdigSøknad,
    vedlegg: Attachment[],
    arbeidsforhold: Arbeidsforhold[],
    språkkode: Språkkode
): SøknadDTO | undefined => {
    const { informasjonOmUtenlandsopphold: utland } = utfyltSøknad;
    const { fødselsdato: barnetsFødselsdato, ...utfyltBarn } = utfyltSøknad.barn;
    const søkerDto = konverterStringDatoerIObjektTilDate<Partial<Søker>, SøkerDTO>(utfyltSøknad.søker);

    if (!areDefined(utfyltBarn.erBarnetFødt, utfyltBarn.termindato)) {
        return undefined;
    }

    if (!utfyltBarn.termindato) {
        return undefined;
    }

    const tilrettelegging: TilretteleggingDTO[] = mapTilretteleggingerTilDTO(
        fjernForkastetTilrettelegging(utfyltSøknad.tilrettelegging, utfyltSøknad.søknadsgrunnlag).map((t) => {
            return korrigerTilretteleggingArbeidsforhold(t, arbeidsforhold);
        })
    );

    return {
        type: Søknadstype.SVANGERSKAPSPENGER,
        erEndringssøknad: false,
        informasjonOmUtenlandsopphold: {
            iNorgePåHendelsestidspunktet: !!utland.iNorgePåHendelsestidspunktet,
            iNorgeSiste12Mnd: !!utland.iNorgeSiste12Mnd,
            iNorgeNeste12Mnd: !!utland.iNorgeNeste12Mnd,
            jobbetINorgeSiste12Mnd: !!utland.jobbetINorgeSiste12Mnd,
            tidligereOpphold: konverterStringDatoerIObjektTilDate<Utenlandsopphold[], UtenlandsoppholdDTO[]>(
                utland.tidligereOpphold
            ),
            senereOpphold: konverterStringDatoerIObjektTilDate<Utenlandsopphold[], UtenlandsoppholdDTO[]>(
                utland.senereOpphold
            ),
        },
        barn: {
            ...utfyltBarn,
            erBarnetFødt: utfyltBarn.erBarnetFødt === undefined ? false : utfyltBarn.erBarnetFødt,
            termindato: new Date(utfyltBarn.termindato),
            fødselsdatoer: barnetsFødselsdato ? [new Date(barnetsFødselsdato)] : undefined,
        },
        vedlegg,
        søker: {
            ...søkerDto,
            språkkode: convertSpråkkode(språkkode),
        },
        tilrettelegging: tilrettelegging.map((t) => ({
            ...t,
            vedlegg: t.vedlegg.filter((vedleggId) => vedlegg.find((v) => v.id === vedleggId)),
        })),
    };
};
