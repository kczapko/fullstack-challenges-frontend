const username = (user) => (user.name ? user.name : user.email);

const initials = (name) => {
  const firstLetters = name
    .toUpperCase()
    .split(' ')
    .map((l) => l[0])
    .join('');

  if (firstLetters.length > 1) {
    return `${firstLetters[0]}${firstLetters[firstLetters.length - 1]}`;
  }
  return firstLetters;
};

export { username, initials };
