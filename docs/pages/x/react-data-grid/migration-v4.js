import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docsx/data/data-grid/getting-started/migration-v4.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
