# Sourcegraph Godocs Extension

**WORK IN PROGRESS**

This extension adds a convenience link to godocs.org for the current package.

## Known Issues

- The godoc link does not update when navigating from file to some other directory. This seems to be lacking subscribable event in sourcegraph API.

- The gopher icon does not appear in the link. Not sure why this doesn't work when `iconURL` is set on the action. ¯\_(ツ)_/¯
