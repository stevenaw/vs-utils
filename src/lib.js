const parseSemver = (versionString) => {
  const semverParts = versionString.split(/\./g);

  const major = parseInt(semverParts[0], 10);
  const minor = parseInt(semverParts[1], 10);
  const patch = parseInt(semverParts[2], 10);
  const build = parseInt(semverParts[3], 10);

  return {
    major,
    minor,
    patch,
    build,
    version: `${major}.${minor}.${patch}`
  };
};


module.exports = {
  parseSemver,
};
