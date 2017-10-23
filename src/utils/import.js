export default function getChallenge(challenge) {
  return import(`../days/${challenge}/index`)
    .then((s) => s.default)
    .catch(error => 'An error occurred while loading the script');
}
