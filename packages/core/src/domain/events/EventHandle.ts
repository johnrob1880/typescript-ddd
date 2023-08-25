import { DomainEvent } from "./DomainEvent";

export interface EventHandle<T extends DomainEvent> {
    setupSubscriptions(): void;
}