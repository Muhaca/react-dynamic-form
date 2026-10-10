import type { ReactNode } from 'react';

function IconBase({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

export function TextIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M4 7V4h16v3" />
            <path d="M9 20h6" />
            <path d="M12 4v16" />
        </IconBase>
    );
}

export function TextareaIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M4 6h16" />
            <path d="M4 11h16" />
            <path d="M4 16h10" />
        </IconBase>
    );
}

export function NumberIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M4 9h16" />
            <path d="M4 15h16" />
            <path d="M10 3L8 21" />
            <path d="M16 3l-2 18" />
        </IconBase>
    );
}

export function SelectIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M7 8l5-5 5 5" />
            <path d="M7 16l5 5 5-5" />
        </IconBase>
    );
}

export function DateIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M3 10h18" />
        </IconBase>
    );
}

export function CheckboxIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </IconBase>
    );
}

export function ContainerIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M2.5 7l9.5-5 9.5 5-9.5 5-9.5-5z" />
            <path d="M2.5 12l9.5 5 9.5-5" />
            <path d="M2.5 17l9.5 5 9.5-5" />
        </IconBase>
    );
}

export function EmailIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <circle cx="12" cy="12" r="4" />
            <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.28" />
        </IconBase>
    );
}

export function PhoneIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </IconBase>
    );
}

export function TimeIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </IconBase>
    );
}

export function RadioIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        </IconBase>
    );
}

export function MultiSelectIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M8 6h13" />
            <path d="M8 12h13" />
            <path d="M8 18h13" />
            <path d="M3 6h.01" />
            <path d="M3 12h.01" />
            <path d="M3 18h.01" />
        </IconBase>
    );
}

export function YesNoIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <rect x="1" y="5" width="22" height="14" rx="7" />
            <circle cx="7" cy="12" r="3" fill="currentColor" stroke="none" />
        </IconBase>
    );
}

export function FileIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="M17 8l-5-5-5 5" />
            <path d="M12 3v12" />
        </IconBase>
    );
}

export function RatingIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.24L7 14.13l-5-4.87 6.91-1L12 2z" />
        </IconBase>
    );
}

export function CurrencyIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M12 1v22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </IconBase>
    );
}

export function AddressIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </IconBase>
    );
}

export function TableIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </IconBase>
    );
}

export function HeadingIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M4 3h4v7h8V3h4v18h-4v-7H8v7H4V3z" />
        </IconBase>
    );
}

export function DividerIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M5 12h14" />
        </IconBase>
    );
}

export function ChartIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M12 20V10" />
            <path d="M18 20V4" />
            <path d="M6 20v-6" />
        </IconBase>
    );
}

export function GripIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <circle cx="9" cy="6" r="1" />
            <circle cx="15" cy="6" r="1" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="9" cy="18" r="1" />
            <circle cx="15" cy="18" r="1" />
        </IconBase>
    );
}

export function CopyIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </IconBase>
    );
}

export function StarIcon({ className, fill = 'none' }: { className?: string; fill?: string }) {
    return (
        <IconBase className={className}>
            <path
                d="M12 3l2.7 5.3 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.2l6-.9z"
                fill={fill}
            />
        </IconBase>
    );
}

export function TrashIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
        </IconBase>
    );
}

export function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M6 9l6 6 6-6" />
        </IconBase>
    );
}

export function ChevronLeftIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M15 18l-6-6 6-6" />
        </IconBase>
    );
}

export function ChevronRightIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M9 6l6 6-6 6" />
        </IconBase>
    );
}

export function PlusIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </IconBase>
    );
}

export function GearIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </IconBase>
    );
}

export function EditIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
        </IconBase>
    );
}

export function LayersIcon({ className }: { className?: string }) {
    return (
        <IconBase className={className}>
            <path d="M12 2 2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </IconBase>
    );
}