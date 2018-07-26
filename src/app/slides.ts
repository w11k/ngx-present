import {TitleComponent} from './intro/title.component';
import {IntroComponent} from './intro/intro.component';
import { section1 } from './content/section-1';
import { section2 } from './content/section-2';

export const intro = [
  TitleComponent,
  IntroComponent,
];

export const slides = [
  intro,
  section1,
  section2,
];
