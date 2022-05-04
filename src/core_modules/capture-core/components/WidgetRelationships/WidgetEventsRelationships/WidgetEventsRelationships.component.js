// @flow
import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { useEventsRelationships } from '../hooks/useEventsRelationships';
import { useLinkedEntityGroups } from '../hooks/useLinkedEntityGroups';
import { RelationshipsWidget } from '../RelationshipsComponent';

type Props = {|
    eventId: string,
    onAddRelationship: () => void
|}

export const WidgetEventsRelationships = ({ eventId, onAddRelationship }: Props) => {
    const { relationships } = useEventsRelationships(eventId);
    const { relationships: eventsRelationships } = useLinkedEntityGroups(eventId, relationships);

    return (
        <RelationshipsWidget
            title={i18n.t("Event's Relationships")}
            relationships={eventsRelationships}
            onAddRelationship={onAddRelationship}
        />
    );
};
