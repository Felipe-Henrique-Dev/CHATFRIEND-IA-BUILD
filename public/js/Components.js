export function Navigation() {
  return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement(NavLink, {
    href: "/"
  }, "Home"), /*#__PURE__*/React.createElement(NavLink, {
    href: "/about"
  }, "About"));
}
function NavLink({
  href,
  children
}) {
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: href
  }, children));
}
export function Comments() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Comments"), /*#__PURE__*/React.createElement(Comment, {
    text: "Hello!",
    author: "Sophie"
  }), /*#__PURE__*/React.createElement(Comment, {
    text: "How are you?",
    author: "Sunil"
  }));
}
function Comment({
  text,
  author
}) {
  return /*#__PURE__*/React.createElement("p", null, text, " \u2014 ", /*#__PURE__*/React.createElement("i", null, author));
}