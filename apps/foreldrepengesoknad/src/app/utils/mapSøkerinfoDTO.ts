import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold, SøkerinfoDTOBarn, SøkerinfoDTOSøker } from 'app/types/SøkerinfoDTO';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Arbeidsforhold, Person, RegistrertAnnenForelder, RegistrertBarn, Søkerinfo } from '@navikt/fp-types';

dayjs.extend(utc);
dayjs.extend(timezone);

const mapArbeidsforholdDTOToArbeidsforhold = (
    arbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined,
): Arbeidsforhold[] => {
    if (!arbeidsforhold) {
        return [];
    }

    return arbeidsforhold.map((arbforhold) => {
        return {
            arbeidsgiverId: arbforhold.arbeidsgiverId,
            arbeidsgiverIdType: arbforhold.arbeidsgiverIdType,
            arbeidsgiverNavn: arbforhold.arbeidsgiverNavn,
            fom: arbforhold.fom,
            stillingsprosent: arbforhold.stillingsprosent,
            tom: arbforhold.tom,
        };
    });
};

const mapSøkerinfoDTOSøkerToPerson = (personDTO: SøkerinfoDTOSøker): Person => {
    return {
        etternavn: personDTO.etternavn,
        fornavn: personDTO.fornavn,
        fnr: personDTO.fnr,
        fødselsdato: personDTO.fødselsdato,
        kjønn: personDTO.kjønn,
        bankkonto: personDTO.bankkonto,
        sivilstand: personDTO.sivilstand,
    };
};

const mapSøkerinfoDTOBarnToRegistrertBarn = (registrerteBarn: SøkerinfoDTOBarn[] | undefined): RegistrertBarn[] => {
    if (!registrerteBarn) {
        return [];
    }

    return registrerteBarn.map((barn) => {
        const { annenForelder } = barn;
        const oppgittAnnenForelder: RegistrertAnnenForelder | undefined = annenForelder
            ? {
                  etternavn: annenForelder.etternavn,
                  fnr: annenForelder.fnr,
                  fornavn: annenForelder.fornavn,
              }
            : undefined;

        return {
            etternavn: barn.etternavn,
            fnr: barn.fnr,
            fornavn: barn.fornavn,
            mellomnavn: barn.mellomnavn,
            fødselsdato: barn.fødselsdato,
            kjønn: barn.kjønn,
            annenForelder: oppgittAnnenForelder,
            dødsdato: barn.dødsdato,
        };
    });
};

const mapSøkerinfoDTOToSøkerinfo = (søkerinfoDTO: SøkerinfoDTO): Søkerinfo => {
    const arbeidsforhold = mapArbeidsforholdDTOToArbeidsforhold(søkerinfoDTO.arbeidsforhold);
    const person = mapSøkerinfoDTOSøkerToPerson(søkerinfoDTO.søker);
    const registrerteBarn = mapSøkerinfoDTOBarnToRegistrertBarn(søkerinfoDTO.søker.barn);

    return {
        arbeidsforhold,
        person,
        registrerteBarn,
    };
};

export default mapSøkerinfoDTOToSøkerinfo;
