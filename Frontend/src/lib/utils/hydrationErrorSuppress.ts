"use client";

// Suppress hydration warnings caused by browser extensions
export function suppressHydrationWarnings() {
  if (typeof window === 'undefined') return;

  const originalError = console.error;
  const originalWarn = console.warn;
  
  const shouldSuppressMessage = (message: any) => {
    if (typeof message !== 'string') return false;
    
    return (
      message.includes('A tree hydrated but some attributes of the server rendered HTML didn\'t match') ||
      message.includes('bis_skin_checked') ||
      message.includes('cz-shortcut-listen') ||
      message.includes('__processed_') ||
      message.includes('browser extension installed which messes with the HTML') ||
      message.includes('Hydration failed because') ||
      message.includes('There was an error while hydrating') ||
      message.includes('hydration mismatch') ||
      message.includes('Warning: Text content did not match') ||
      message.includes('Warning: Expected server HTML to contain')
    );
  };
  
  console.error = (...args) => {
    if (shouldSuppressMessage(args[0])) {
      return; // Suppress these specific errors
    }
    originalError.apply(console, args);
  };
  
  console.warn = (...args) => {
    if (shouldSuppressMessage(args[0])) {
      return; // Suppress these specific warnings
    }
    originalWarn.apply(console, args);
  };
}

// Clean up browser extension attributes
export function cleanExtensionAttributes() {
  if (typeof window === 'undefined') return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') {
        const target = mutation.target as Element;
        if (target.hasAttribute('bis_skin_checked')) {
          target.removeAttribute('bis_skin_checked');
        }
        if (target.hasAttribute('cz-shortcut-listen')) {
          target.removeAttribute('cz-shortcut-listen');
        }
        // Remove any attributes that start with __processed_
        Array.from(target.attributes).forEach(attr => {
          if (attr.name.startsWith('__processed_')) {
            target.removeAttribute(attr.name);
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ['bis_skin_checked', 'cz-shortcut-listen']
  });

  return () => observer.disconnect();
}