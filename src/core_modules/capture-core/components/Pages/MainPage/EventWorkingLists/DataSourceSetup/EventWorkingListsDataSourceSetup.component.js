// @flow
import React, { useMemo } from 'react';
import log from 'loglevel';
import { errorCreator } from 'capture-core-utils';
import { convertClientToList } from '../../../../../converters';
import { EventWorkingListsTemplateSetup } from '../TemplateSetup';
import type { Props } from './eventWorkingListsDataSourceSetup.types';
import type { EventsMainProperties, EventsDataElementValues } from '../types';

export const EventWorkingListsDataSourceSetup = ({
    eventsMainProperties,
    eventsDataElementValues,
    columns,
    recordsOrder,
    ...passOnProps
}: Props) => {
    const dataSource = useMemo(() => Object
        .keys(eventsMainProperties || {})
        .map(key => ({
            ...(eventsMainProperties && eventsMainProperties[key]),
            ...(eventsDataElementValues && eventsDataElementValues[key]),
        }))
        // $FlowFixMe
        .reduce((accDataSource, clientRecord: EventsMainProperties & EventsDataElementValues) => {
            const listRecord = columns
                .filter(column => column.visible)
                // $FlowFixMe Flow error handled in later PR
                .reduce((acc, { id, options, optionSet, type }) => {
                    const clientValue = clientRecord[id];

                    // TODO: REFACTOR after fixing optionsets
                    if (options || optionSet) {
                        // TODO: Need is equal comparer for types
                        // Flow error handled in later PR
                        const option = options ?
                            options.find(o => o.value === clientValue) :
                            // $FlowFixMe Flow error handled in later PR
                            optionSet.getOption(clientValue);
                        if (!option) {
                            log.error(
                                errorCreator(
                                    'Missing value in options')(
                                    { id, clientValue, options, optionSet }),
                            );
                        } else {
                            acc[id] = option.text;
                        }
                    } else {
                        acc[id] = convertClientToList(clientValue, type);
                    }
                    return acc;
                }, {});

            accDataSource[clientRecord.eventId] = {
                ...listRecord,
                eventId: clientRecord.eventId, // used as rowkey
            };
            return accDataSource;
        }, {}), [
        eventsMainProperties,
        eventsDataElementValues,
        columns,
    ]);

    const dataSourceArray = useMemo(() =>
        recordsOrder && recordsOrder
            .map(id => dataSource[id]), [
        dataSource,
        recordsOrder,
    ]);

    return (
        <EventWorkingListsTemplateSetup
            {...passOnProps}
            dataSource={dataSourceArray}
            columns={columns}
            rowIdKey="eventId"
        />
    );
};
