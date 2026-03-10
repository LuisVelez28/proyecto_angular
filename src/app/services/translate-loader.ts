import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TranslationEntry {
  lang: string;
  key: string;
  value: string;
}

export class ApiTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Record<string, string>> {
    return this.http
      .get<TranslationEntry[]>(`http://localhost:3000/api/translation?lang=${lang}`)
      .pipe(
        map(items => items.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {} as Record<string, string>))
      );
  }
}

export function createTranslateLoader(http: HttpClient): ApiTranslateLoader {
  return new ApiTranslateLoader(http);
}
