import en from '@/messages/en.json';
import es from '@/messages/es.json';
import sv from '@/messages/sv.json';
import type {Locale} from './navigation';

const dictionaries = {sv, es, en};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
