// @flow
import React, { useMemo } from 'react';
import i18n from '@dhis2/d2-i18n';
import moment from 'moment';
import { Tag } from '@dhis2/ui';
import type { ApiTEIEvent } from 'capture-core/events/getEnrollmentEvents';
import type { apiDataElement } from 'capture-core/metaDataStoreLoaders/programs/quickStoreOperations/types';
import { convertValue as convertClientToList } from '../../../../converters/clientToList';
import { convertValue as convertServerToClient } from '../../../../converters/serverToClient';
import { statusTypes, dataElementTypes, translatedStatusTypes } from '../../../../metaData';
import { getEventDataWithSubValue } from './getEventDataWithSubValue';

export const DEFAULT_NUMBER_OF_ROW = 5;

export const isEventOverdue = (event: ApiTEIEvent) => moment(event.dueDate).isSameOrBefore(new Date())
    && event.status === statusTypes.SCHEDULE;

const getEventStatus = (event: ApiTEIEvent) => {
    if (isEventOverdue(event)) {
        return { status: statusTypes.OVERDUE, options: undefined };
    }
    if (event.status === statusTypes.SCHEDULE) {
        return { status: statusTypes.SCHEDULE, options: moment(event.eventDate).from(new Date()) };
    }
    return { status: event.status, options: undefined };
};

export const getValueByKeyFromEvent = (event: ApiTEIEvent, { id, resolveValue }: Object) => {
    if (resolveValue) {
        return resolveValue(event);
    }

    return event[id];
};

export const formatValueForView = (data: Array<apiDataElement>, type: string) =>
// $FlowFixMe
    convertClientToList(convertServerToClient(data, type), type);


export const sortDataFromEvent = (strA: any, strB: any, direction: string) => {
    if (direction === 'asc') {
        return strA < strB ? -1 : 1;
    }

    if (direction === 'desc') {
        return strA < strB ? 1 : -1;
    }

    return 0;
};

function convertStatusForView(event: ApiTEIEvent) {
    const { status, options } = getEventStatus(event);
    const isPositive = [statusTypes.COMPLETED].includes(status);
    const isNegative = [statusTypes.OVERDUE].includes(status);

    return (
        <Tag negative={isNegative} positive={isPositive}>
            {translatedStatusTypes(options)[status]}
        </Tag>
    );
}


export const useComputeDataFromEvent =
    (data: Array<apiDataElement>, events: Array<ApiTEIEvent>, headerColumns: Array<{id: string}>) => {
        const [dataSource, setDataSource] = React.useState([]);
        const computeData = async () => {
            const result = await events.reduce(async (acc, currentEvent) => {
                const predefinedFields = [
                    { id: 'status', type: dataElementTypes.UNKNOWN, resolveValue: convertStatusForView },
                    { id: 'eventDate', type: dataElementTypes.DATE },
                    { id: 'orgUnitName', type: dataElementTypes.TEXT }].map(field => ({
                    ...field,
                    value: formatValueForView(getValueByKeyFromEvent(currentEvent, field), field.type),
                }));

                const otherFields = await Promise.all(currentEvent.dataValues.map(async (item) => {
                    const dataInStage = data.find(el => el.id === item.dataElement);

                    if (dataInStage) {
                        // $FlowFixMe
                        const subValue = await getEventDataWithSubValue(dataInStage, item.value);
                        return {
                            id: item.dataElement,
                            type: dataInStage.valueType,
                            value: formatValueForView(subValue ?? item.value, dataInStage.valueType),
                        };
                    }
                    return {};
                }));

                const allFields = [...predefinedFields, ...otherFields];

                // $FlowFixMe
                const row = headerColumns.map((col) => {
                    const fields = allFields.find(f => f.id === col.id);
                    if (fields) {
                        return { ...fields };
                    }
                    return { id: col.id };
                });

                (await acc).push(row);
                return acc;
            }, []);

            setDataSource(result);
        };

        return { computeData, dataSource };
    };

export const useComputeHeaderColumn = (data: Array<apiDataElement>, events: Array<ApiTEIEvent>) => {
    const headerColumns = useMemo(() => {
        const defaultColumns = [
            { id: 'status', header: i18n.t('Status'), sortDirection: 'default' },
            { id: 'eventDate', header: i18n.t('Report date'), sortDirection: 'default' },
            { id: 'orgUnitName', header: i18n.t('Registering unit'), sortDirection: 'default',
            }];
        const dataElementHeaders = events.reduce((acc, currEvent) => {
            currEvent.dataValues.forEach((dataValue) => {
                const { dataElement: id } = dataValue;
                const dataInStage = data.find(el => el.id === id);
                if (dataInStage) {
                    if (!acc.find(item => item.id === dataValue.dataElement)) {
                        acc.push({ id, header: dataInStage.displayName, sortDirection: 'default' });
                    }
                }
            });
            return acc;
        }, []);
        return [...defaultColumns, ...dataElementHeaders];
    }, [data, events]);


    return headerColumns;
};
