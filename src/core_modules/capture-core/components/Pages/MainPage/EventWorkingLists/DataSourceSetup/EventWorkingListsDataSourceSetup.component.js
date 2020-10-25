// @flow
import React, { useMemo } from 'react';
import log from 'loglevel';
import { errorCreator } from 'capture-core-utils';
import { convertClientToList } from '../../../../../converters';
import { EventWorkingListsTemplateSetup } from '../TemplateSetup';
import type { Props } from './eventWorkingListsDataSourceSetup.types';

export const EventWorkingListsDataSourceSetup = ({
    eventRecords,
    columns,
    recordsOrder,
    ...passOnProps
}: Props) => {
    const eventRecordsArray = useMemo(() =>
        recordsOrder && eventRecords && recordsOrder
            .map(eventId => ({
                ...eventRecords[eventId],
                eventId,
            })), [
        eventRecords,
        recordsOrder,
    ]);

    const dataSource = useMemo(() => eventRecordsArray && eventRecordsArray
        .map((eventRecord) => {
            const listRecord = columns
                .filter(column => column.visible)
                .reduce((acc, { id, options, type }) => {
                    const clientValue = eventRecord[id];

                    if (options) {
                        // TODO: Need is equal comparer for types
                        const option = options.find(o => o.value === clientValue);
                        if (!option) {
                            log.error(
                                errorCreator(
                                    'Missing value in options')(
                                    { id, clientValue, options }),
                            );
                        } else {
                            acc[id] = option.text;
                        }
                    } else {
                        acc[id] = convertClientToList(clientValue, type);
                    }
                    return acc;
                }, {});

            return {
                ...listRecord,
                eventId: eventRecord.eventId, // used as rowkey
            };
        }), [
        eventRecordsArray,
        columns,
    ]);

    return (
        <EventWorkingListsTemplateSetup
            {...passOnProps}
            dataSource={dataSource}
            columns={columns}
            rowIdKey="eventId"
        />
    );
};
