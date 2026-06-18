import type { UploadProvider } from "./types";
import { BarclaysCsvProvider } from "./barclays-csv";
import { BarclaysPdfProvider } from "./barclays-pdf";

const providers: UploadProvider[] = [
  new BarclaysCsvProvider(),
  new BarclaysPdfProvider(),
];

export function getProviders(): UploadProvider[] {
  return providers;
}

export function detectProvider(fileName: string): UploadProvider | undefined {
  return providers.find(p => p.detectByExtension(fileName));
}
