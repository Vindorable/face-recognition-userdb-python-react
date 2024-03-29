


// ---------------------------------------------------------

const ROOTS_WEBPAGE = "/";

function path(root, sublink) {
  return `${root}${sublink}`;
}


// ---------------------------------------------------------

export const PATH_WEBPAGE = {
  root: ROOTS_WEBPAGE,
  general: {
    home: path(ROOTS_WEBPAGE, "home"),
    login: path(ROOTS_WEBPAGE, "login"),
    signUp: path(ROOTS_WEBPAGE, "sign-up"),
  },
};