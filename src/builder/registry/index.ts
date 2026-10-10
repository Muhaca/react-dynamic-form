import { GRID_COLUMNS } from '../../core';
import type { BuilderFieldRegistry } from '../types';
import { TextPropertyEditor } from './TextPropertyEditor';
import { NumberPropertyEditor } from './NumberPropertyEditor';
import { SelectPropertyEditor } from './SelectPropertyEditor';
import { DatePropertyEditor } from './DatePropertyEditor';
import { CheckboxPropertyEditor } from './CheckboxPropertyEditor';
import { ContainerPropertyEditor } from './ContainerPropertyEditor';
import { EmailPropertyEditor } from './EmailPropertyEditor';
import { PhonePropertyEditor } from './PhonePropertyEditor';
import { TimePropertyEditor } from './TimePropertyEditor';
import { YesNoPropertyEditor } from './YesNoPropertyEditor';
import { FilePropertyEditor } from './FilePropertyEditor';
import { RatingPropertyEditor } from './RatingPropertyEditor';
import { CurrencyPropertyEditor } from './CurrencyPropertyEditor';
import { AddressPropertyEditor } from './AddressPropertyEditor';
import { TablePropertyEditor } from './TablePropertyEditor';
import { HeadingPropertyEditor } from './HeadingPropertyEditor';
import { ChartPropertyEditor } from './ChartPropertyEditor';
import { DividerPropertyEditor } from './DividerPropertyEditor';
import {
    TextIcon,
    TextareaIcon,
    NumberIcon,
    SelectIcon,
    DateIcon,
    CheckboxIcon,
    ContainerIcon,
    EmailIcon,
    PhoneIcon,
    TimeIcon,
    RadioIcon,
    MultiSelectIcon,
    YesNoIcon,
    FileIcon,
    RatingIcon,
    CurrencyIcon,
    AddressIcon,
    TableIcon,
    HeadingIcon,
    DividerIcon,
    ChartIcon,
} from './icons';

export const defaultBuilderRegistry: BuilderFieldRegistry = {
    text: {
        type: 'text',
        paletteLabel: 'Input Teks',
        paletteIcon: TextIcon,
        createDefault: () => ({ type: 'text', label: 'Field Baru', required: false }),
        PropertyEditor: TextPropertyEditor,
    },
    textarea: {
        type: 'textarea',
        paletteLabel: 'Teks Panjang',
        paletteIcon: TextareaIcon,
        createDefault: () => ({ type: 'textarea', label: 'Field Baru', required: false }),
        PropertyEditor: TextPropertyEditor,
    },
    number: {
        type: 'number',
        paletteLabel: 'Angka',
        paletteIcon: NumberIcon,
        createDefault: () => ({ type: 'number', label: 'Field Baru', required: false }),
        PropertyEditor: NumberPropertyEditor,
    },
    select: {
        type: 'select',
        paletteLabel: 'Dropdown',
        paletteIcon: SelectIcon,
        createDefault: () => ({
            type: 'select',
            label: 'Field Baru',
            required: false,
            options: [{ label: 'Opsi 1', value: 'opsi_1' }],
        }),
        PropertyEditor: SelectPropertyEditor,
    },
    date: {
        type: 'date',
        paletteLabel: 'Tanggal',
        paletteIcon: DateIcon,
        createDefault: () => ({ type: 'date', label: 'Field Baru', required: false }),
        PropertyEditor: DatePropertyEditor,
    },
    checkbox: {
        type: 'checkbox',
        paletteLabel: 'Checkbox',
        paletteIcon: CheckboxIcon,
        createDefault: () => ({ type: 'checkbox', label: 'Field Baru', required: false, defaultValue: false }),
        PropertyEditor: CheckboxPropertyEditor,
    },
    container: {
        type: 'container',
        paletteLabel: 'Grup (Container)',
        paletteIcon: ContainerIcon,
        createDefault: () => ({
            type: 'container',
            label: 'Grup Baru',
            layout: { colSpan: GRID_COLUMNS },
            children: [],
        }),
        PropertyEditor: ContainerPropertyEditor,
    },
    email: {
        type: 'email',
        paletteLabel: 'Email',
        paletteIcon: EmailIcon,
        createDefault: () => ({
            type: 'email',
            label: 'Field Baru',
            required: false,
            placeholder: 'nama@email.com',
        }),
        PropertyEditor: EmailPropertyEditor,
    },
    phone: {
        type: 'phone',
        paletteLabel: 'Nomor Telepon',
        paletteIcon: PhoneIcon,
        createDefault: () => ({
            type: 'phone',
            label: 'Field Baru',
            required: false,
            placeholder: '08xx-xxxx-xxxx',
        }),
        PropertyEditor: PhonePropertyEditor,
    },
    time: {
        type: 'time',
        paletteLabel: 'Waktu',
        paletteIcon: TimeIcon,
        createDefault: () => ({ type: 'time', label: 'Field Baru', required: false }),
        PropertyEditor: TimePropertyEditor,
    },
    radio: {
        type: 'radio',
        paletteLabel: 'Pilihan (Radio)',
        paletteIcon: RadioIcon,
        createDefault: () => ({
            type: 'radio',
            label: 'Field Baru',
            required: false,
            options: [
                { label: 'Opsi 1', value: 'opsi_1' },
                { label: 'Opsi 2', value: 'opsi_2' },
            ],
        }),
        PropertyEditor: SelectPropertyEditor,
    },
    multiselect: {
        type: 'multiselect',
        paletteLabel: 'Pilihan Ganda',
        paletteIcon: MultiSelectIcon,
        createDefault: () => ({
            type: 'multiselect',
            label: 'Field Baru',
            required: false,
            options: [
                { label: 'Opsi 1', value: 'opsi_1' },
                { label: 'Opsi 2', value: 'opsi_2' },
            ],
            defaultValue: [],
        }),
        PropertyEditor: SelectPropertyEditor,
    },
    yesno: {
        type: 'yesno',
        paletteLabel: 'Ya / Tidak',
        paletteIcon: YesNoIcon,
        createDefault: () => ({ type: 'yesno', label: 'Field Baru', required: false, defaultValue: true }),
        PropertyEditor: YesNoPropertyEditor,
    },
    file: {
        type: 'file',
        paletteLabel: 'Upload File',
        paletteIcon: FileIcon,
        createDefault: () => ({ type: 'file', label: 'Field Baru', required: false, accept: '*' }),
        PropertyEditor: FilePropertyEditor,
    },
    rating: {
        type: 'rating',
        paletteLabel: 'Rating Bintang',
        paletteIcon: RatingIcon,
        createDefault: () => ({ type: 'rating', label: 'Field Baru', required: false, maxRating: 5, defaultValue: 0 }),
        PropertyEditor: RatingPropertyEditor,
    },
    currency: {
        type: 'currency',
        paletteLabel: 'Mata Uang',
        paletteIcon: CurrencyIcon,
        createDefault: () => ({ type: 'currency', label: 'Field Baru', required: false, symbol: 'Rp' }),
        PropertyEditor: CurrencyPropertyEditor,
    },
    address: {
        type: 'address',
        paletteLabel: 'Alamat',
        paletteIcon: AddressIcon,
        createDefault: () => ({
            type: 'address',
            label: 'Field Baru',
            required: false,
            placeholder: 'Jalan, kota, provinsi...',
        }),
        PropertyEditor: AddressPropertyEditor,
    },
    table: {
        type: 'table',
        paletteLabel: 'Tabel',
        paletteIcon: TableIcon,
        createDefault: () => ({ type: 'table', label: 'Field Baru', required: false, rows: 3, columns: 2 }),
        PropertyEditor: TablePropertyEditor,
    },
    heading: {
        type: 'heading',
        paletteLabel: 'Judul Teks',
        paletteIcon: HeadingIcon,
        createDefault: () => ({
            type: 'heading',
            label: 'Judul Bagian',
            textSize: 'h2',
            layout: { colSpan: GRID_COLUMNS },
        }),
        PropertyEditor: HeadingPropertyEditor,
    },
    divider: {
        type: 'divider',
        paletteLabel: 'Pembatas',
        paletteIcon: DividerIcon,
        createDefault: () => ({ type: 'divider', label: '', layout: { colSpan: GRID_COLUMNS } }),
        PropertyEditor: DividerPropertyEditor,
    },
    chart: {
        type: 'chart',
        paletteLabel: 'Grafik',
        paletteIcon: ChartIcon,
        createDefault: () => ({
            type: 'chart',
            label: 'Grafik',
            chartType: 'bar',
            chartHeight: 140,
            layout: { colSpan: GRID_COLUMNS },
        }),
        PropertyEditor: ChartPropertyEditor,
    },
};