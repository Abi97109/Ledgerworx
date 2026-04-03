import { useLayoutEffect } from "react";
import headerCss from "../styles/header.css?raw";
import adminThemeCss from "../styles/admin_theme.css?raw";

const styleRegistry = new Map();

function attachStyle(id, cssText) {
  if (!cssText || typeof document === "undefined") {
    return () => {};
  }

  let entry = styleRegistry.get(id);

  if (!entry) {
    const element = document.createElement("style");
    element.setAttribute("data-admin-style", id);
    element.textContent = cssText;
    document.head.appendChild(element);

    entry = {
      count: 0,
      cssText,
      element
    };

    styleRegistry.set(id, entry);
  } else if (entry.cssText !== cssText) {
    entry.cssText = cssText;
    entry.element.textContent = cssText;
  }

  entry.count += 1;

  return () => {
    const currentEntry = styleRegistry.get(id);

    if (!currentEntry) {
      return;
    }

    currentEntry.count -= 1;

    if (currentEntry.count <= 0) {
      currentEntry.element.remove();
      styleRegistry.delete(id);
    }
  };
}

export function useAdminPageStyles({
  pageKey,
  pageCssText,
  includeHeader = true,
  includeTheme = true
}) {
  useLayoutEffect(() => {
    const cleanups = [];

    if (includeHeader) {
      cleanups.push(attachStyle("admin-shared-header", headerCss));
    }

    if (pageKey && pageCssText) {
      cleanups.push(attachStyle(`admin-page-${pageKey}`, pageCssText));
    }

    if (includeTheme) {
      cleanups.push(attachStyle("admin-shared-theme", adminThemeCss));
    }

    return () => {
      for (let index = cleanups.length - 1; index >= 0; index -= 1) {
        cleanups[index]();
      }
    };
  }, [includeHeader, includeTheme, pageCssText, pageKey]);
}
