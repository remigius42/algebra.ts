const LINT_STAGED_CONFIG = {
  "**/*": [
    files =>
      mapFilesToInvocations(
        "prettier --no-error-on-unmatched-pattern --ignore-unknown --list-different",
        files
      ),
    files =>
      mapFilesToInvocations(
        "cspell --dot --no-must-find-files --no-progress",
        files
      )
  ],
  "**/*.{js}": [
    files => mapFilesToInvocations("jshint", files),
    () => "jasmine --config=jasmine.json --fail-fast" // run all tests, since Jasmine doesn't support `--find-related-tests` like Jest
  ],
  "**/*.md": files => mapFilesToInvocations("markdownlint-cli2", files)
}

/**
 * Map the given files to chunks of individual command invocations to
 * prevent issues with too long command lines.
 *
 * See for example https://github.com/okonet/lint-staged/issues/147
 *
 * @param {string} command the command to be run with the given files
 * @param {string[]} files the files to be distributed onto command invocations
 * @returns {string[]} list of commands to be executed
 */
function mapFilesToInvocations(command, files) {
  const CHUNK_SIZE = 10
  const invocations = []

  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    const currentFilesSlice = files.slice(i, i + CHUNK_SIZE)
    invocations.push(`${command} ${currentFilesSlice.join(" ")}`)
  }

  return invocations
}

export default LINT_STAGED_CONFIG
