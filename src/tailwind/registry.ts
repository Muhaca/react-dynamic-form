import type { FieldRegistry } from '../react';
import { TextFieldRenderer } from './renderers/TextFieldRenderer';
import { NumberFieldRenderer } from './renderers/NumberFieldRenderer';
import { SelectFieldRenderer } from './renderers/SelectFieldRenderer';
import { DateFieldRenderer } from './renderers/DateFieldRenderer';
import { CheckboxFieldRenderer } from './renderers/CheckboxFieldRenderer';
import { ContainerRenderer } from './renderers/ContainerRenderer';
import { EmailFieldRenderer } from './renderers/EmailFieldRenderer';
import { PhoneFieldRenderer } from './renderers/PhoneFieldRenderer';
import { TimeFieldRenderer } from './renderers/TimeFieldRenderer';
import { RadioFieldRenderer } from './renderers/RadioFieldRenderer';
import { MultiSelectFieldRenderer } from './renderers/MultiSelectFieldRenderer';
import { YesNoFieldRenderer } from './renderers/YesNoFieldRenderer';
import { FileFieldRenderer } from './renderers/FileFieldRenderer';
import { RatingFieldRenderer } from './renderers/RatingFieldRenderer';
import { CurrencyFieldRenderer } from './renderers/CurrencyFieldRenderer';
import { AddressFieldRenderer } from './renderers/AddressFieldRenderer';
import { TableFieldRenderer } from './renderers/TableFieldRenderer';
import { HeadingFieldRenderer } from './renderers/HeadingFieldRenderer';
import { DividerFieldRenderer } from './renderers/DividerFieldRenderer';
import { ChartFieldRenderer } from './renderers/ChartFieldRenderer';

export const tailwindFieldRegistry: FieldRegistry = {
  text: TextFieldRenderer,
  textarea: TextFieldRenderer,
  number: NumberFieldRenderer,
  select: SelectFieldRenderer,
  date: DateFieldRenderer,
  checkbox: CheckboxFieldRenderer,
  container: ContainerRenderer,
  email: EmailFieldRenderer,
  phone: PhoneFieldRenderer,
  time: TimeFieldRenderer,
  radio: RadioFieldRenderer,
  multiselect: MultiSelectFieldRenderer,
  yesno: YesNoFieldRenderer,
  file: FileFieldRenderer,
  rating: RatingFieldRenderer,
  currency: CurrencyFieldRenderer,
  address: AddressFieldRenderer,
  table: TableFieldRenderer,
  heading: HeadingFieldRenderer,
  divider: DividerFieldRenderer,
  chart: ChartFieldRenderer,
};