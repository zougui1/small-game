import React, { useMemo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { isAbsoluteUrl, toUrlString } from '~/utils/url';
import type { UnknownObject } from '~/types/object';

const defaultHref = '#';

export const LinkRoot = React.forwardRef<HTMLAnchorElement, LinkRootProps>(({ to, params, disabled, ...props }, ref) => {
  const href = useMemo(() => {
    if (disabled) {
      return '#';
    }

    const maybeHref = to ? toUrlString(to, params) : to;
    return maybeHref || defaultHref;
  }, [disabled, to, params]);

  // the span is required as the Link from react-location
  // does not forward the ref
  return (
    <>
      {isAbsoluteUrl(to || '')
        ? <a {...props as ExternalLinkRootProps} ref={ref} href={href} rel="noreferrer" />
        : <Link {...props as InternalLinkRootProps} ref={ref} to={href} />
      }
    </>
  );
});

export interface ExternalLinkRootProps extends Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>, BaseLinkRootProps {
  to?: `http${string}` | undefined;
}

export interface InternalLinkRootProps extends Omit<LinkProps, 'to'>, BaseLinkRootProps {
  to?: string | undefined;
}

export interface BaseLinkRootProps {
  params?: UnknownObject | undefined;
  disabled?: boolean | undefined;
}

export type LinkRootProps = ExternalLinkRootProps | InternalLinkRootProps;
