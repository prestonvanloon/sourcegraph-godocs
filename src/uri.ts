// COPIED FROM
// https://raw.githubusercontent.com/sourcegraph/sourcegraph-codecov/27dba4387b853e79ffd3281f5dd7a2e9c170ed75/src/uri.ts

/**
 * A resolved URI identifies a path in a repository at a specific revision.
 */
export interface ResolvedURI {
  repo: string;
  rev: string;
  path: string;
}

/**
 * Resolve a URI of the forms git://github.com/owner/repo?rev#path and
 * file:///path to an absolute reference, using the given base (root) URI.
 */
export function resolveURI(uri: string): ResolvedURI {
  const url = new URL(uri);
  if (url.protocol === 'git:') {
    return {
      repo: (url.host + url.pathname).replace(/^\/*/, '').toLowerCase(),
      rev: url.search.slice(1).toLowerCase(),
      path: url.hash.slice(1),
    };
  }
  throw new Error(
      `unrecognized URI: ${JSON.stringify(uri)} (supported URI schemes: git)`);
}
