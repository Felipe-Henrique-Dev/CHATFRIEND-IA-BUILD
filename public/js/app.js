import React from 'react';
import { createRoot } from 'react-dom/client';
const navDomNode = document.getElementById('navigation');
const navRoot = createRoot(navDomNode);
navRoot.render( /*#__PURE__*/React.createElement(Navigation, null));
const commentDomNode = document.getElementById('comments');
const commentRoot = createRoot(commentDomNode);
commentRoot.render( /*#__PURE__*/React.createElement(Comments, null));