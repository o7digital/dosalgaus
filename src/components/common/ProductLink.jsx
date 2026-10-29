import Link from 'next/link';
import { cloneElement } from 'react';
import { ONLINE_SALES_ENABLED } from '@/src/lib/storefront';

export default function ProductLink({ href, children }) {
  if (!ONLINE_SALES_ENABLED) {
    // A placeholder anchor preserves the product image styles without navigation.
    return cloneElement(children, {
      href: undefined,
      'aria-disabled': true,
      className: children.props.className?.replace(/\bhover-underline\b/g, ''),
      style: { ...children.props.style, cursor: 'default' },
    });
  }

  return (
    <Link legacyBehavior href={href}>
      {children}
    </Link>
  );
}
