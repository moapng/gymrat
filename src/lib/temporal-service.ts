import { Temporal } from '@js-temporal/polyfill';

export const DEFAULT_TIMEZONE = 'Europe/Stockholm';


export const toZonedDateTime = (
    date: string | Temporal.Instant | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined,
    timezone: string = DEFAULT_TIMEZONE
): Temporal.ZonedDateTime | undefined => {
    if (!date) return undefined;

    if (date instanceof Temporal.ZonedDateTime) {
        return date;
    } else if (date instanceof Temporal.PlainDateTime) {
        return date.toZonedDateTime(timezone);
    } else if (date instanceof Temporal.Instant) {
        return date.toZonedDateTimeISO(timezone);
    } else if (typeof date === 'string') {
        try {
            return Temporal.Instant.from(date).toZonedDateTimeISO(timezone);
        } catch (e) {
            try {
                return Temporal.PlainDateTime.from(date).toZonedDateTime(timezone);
            } catch (e) {
                console.error('Could not parse date:', date, e);
                return undefined;
            }
        }
    }

    return undefined;
};

export const formatDate = (
    date: Temporal.ZonedDateTime | undefined,
    options: Intl.DateTimeFormatOptions = { dateStyle: 'short', timeStyle: 'short' }
): string => {
    if (!date) return '';
    return date.toLocaleString('sv-SE', options);
};

export const formatForSupabase = (date: Temporal.ZonedDateTime | Temporal.PlainDateTime | Date): string => {
    if (date instanceof Temporal.ZonedDateTime) {
        return date.toInstant().toString();
    } else if (date instanceof Temporal.PlainDateTime) {
        return date.toString();
    } else if (date instanceof Date) {
        return date.toISOString();
    }
    return new Date().toISOString();
};

export const processWorkoutData = <T extends { created_at?: any, achieved_at?: any }>(data: T[]): T[] => {
    if (!data) return [];

    return data.map(item => {
        const processed = { ...item };
        if (item.created_at) {
            processed.created_at = toZonedDateTime(item.created_at);
        }
        if (item.achieved_at) {
            processed.achieved_at = toZonedDateTime(item.achieved_at);
        }
        return processed;
    });
};

export const processBlockData = <T extends { started_at?: any }>(data: T): T => {
    if (!data) return data;

    const processed = { ...data };
    if (data.started_at) {
        processed.started_at = toZonedDateTime(data.started_at);
    }
    return processed;
};

export const getStartOfDay = (): string => {
    const now = Temporal.Now.plainDateISO();
    return now.toString() + 'T00:00:00';
};

export const getEndOfDay = (): string => {
    const now = Temporal.Now.plainDateISO();
    return now.toString() + 'T23:59:59';
};

export const getDateRanges = () => {
    const now = Temporal.Now.zonedDateTimeISO(DEFAULT_TIMEZONE);

    return {
        sevenDaysAgo: now.subtract({ days: 7 }),
        thirtyDaysAgo: now.subtract({ days: 30 }),
        yearAgo: now.subtract({ days: 365 })
    };
};

export const createTimestamp = (): string => {
    return new Date().toISOString();
};