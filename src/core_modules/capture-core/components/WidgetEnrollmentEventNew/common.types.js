// @flow

export type OrgUnit = {
    id: string,
    name: string,
    code: string,
};

export type ExternalSaveHandler = (eventServerValues: Object) => void;

export type AttributeValueServerFormatted = {|
    id: string,
    value: string,
|};

export type EnrollmentData = {|
    enrollmentDate?: string,
    incidentDate?: string,
    enrollmentId: string,
|};

export type RulesExecutionDependencies = {|
    events: Array<ApiEnrollmentEvent>,
    attributeValues: Array<AttributeValueServerFormatted>,
    enrollmentData: EnrollmentData,
|};

export type EnrollmentEvent = {|
    eventId?: string,
    programId: string,
    programStageId: string,
    orgUnitId: string,
    orgUnitName: string,
    trackedEntityInstanceId: string,
    enrollmentId: string,
    enrollmentStatus: string,
    status: string,
    eventDate?: string,
    dueDate?: string,
    lastUpdated: string,
    notes?: Array<Object>,
    [dataElementId: string]: any,
|};

export type EnrollmentEvents = Array<EnrollmentEvent>;

export type AttributeValuesClientFormatted = {
    [id: string]: any,
};

export type RulesExecutionDependenciesClientFormatted = {|
    events: Array<EnrollmentEvent>,
    attributeValues: AttributeValuesClientFormatted,
    enrollmentData: EnrollmentData,
|};
