import {TitleComponent} from './intro/title.component';
import {TableOfContentComponent} from './intro/table-of-content.component';
import { section1 } from './content/section-1';
import { section2 } from './content/section-2';

export const intro = [
  TitleComponent,
  TableOfContentComponent,
];

export const slides = [
  intro,
  section1,
  section2,
];
