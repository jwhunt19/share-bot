/* eslint-disable import/prefer-default-export */ // DELETE
/* eslint-disable no-console */
function buildCommand(text) {
  const reg = /^!send\s(.*)\sto\s<#(\d+)>$/;
  const ms = text.match(reg);

  if (!ms) {
    console.warn('no matches found');
    return [null, null];
  }

  return [ms[1], ms[2]];
}

export { buildCommand };
