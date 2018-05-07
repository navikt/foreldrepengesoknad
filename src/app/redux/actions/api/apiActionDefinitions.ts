import Person from '../../../types/Person';

export enum ApiActionKeys {
    'GET_PERSON' = 'getPerson',
    'GET_PERSON_SUCCESS' = 'getPersonSuccess',
    'GET_PERSON_FAILED' = 'getPersonFailed'
}

interface GetPerson {
    type: ApiActionKeys.GET_PERSON;
}

interface GetPersonSuccess {
    type: ApiActionKeys.GET_PERSON_SUCCESS;
    person: Person;
}

interface GetPersonFailed {
    type: ApiActionKeys.GET_PERSON_FAILED;
    error: any;
}

export type ApiActionTypes = GetPerson | GetPersonSuccess | GetPersonFailed;
