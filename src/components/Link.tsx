"use client";

import NextLink from "next/link";
import React from "react";
import isString from "src/utils/is-string";
import styled from "styled-components";
import { UrlObject } from "url";

export type Props = {
  as?: React.ElementType;
  /**
   * The link's href.
   */
  href?: string | UrlObject;

  /**
   * The link's locale.
   */
  locale?: string;

  /**
   * The link's classname.
   */
  className?: string;

  /**
   * The link's onClick.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;

  /**
   * The link's status (if it's disabled or not).
   */
  disabled?: boolean;
};

export type LinkProps = Props &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props>;

const Link = styled(
  ({
    as: Component = "a",
    href,
    locale,
    className,
    disabled,
    onClick,
    children,
    ...props
  }: LinkProps) => {
    disabled = disabled || (!onClick && !href);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) return event.preventDefault();
      if (onClick) onClick(event);
    };

    if (isString(href)) {
      href = href as string;

      const internal = href.match(/^(\/(?!\/)[^#]*|#.*)$/);
      if (!internal) {
        return (
          <Component
            href={href}
            className={className}
            target={"_blank"}
            rel={"noopener noreferrer"}
            onClick={handleClick}
            {...props}
          >
            {children}
          </Component>
        );
      }
    }

    if (href) {
      return (
        <NextLink
          href={href}
          locale={locale}
          className={className}
          onClick={handleClick}
          {...props}
        >
          {children}
        </NextLink>
      );
    }

    return (
      <Component
        className={className}
        onClick={handleClick}
        href={href}
        {...props}
      >
        {children}
      </Component>
    );
  },
)<LinkProps>`
  cursor: ${({ href, onClick }) => (href || onClick ? "pointer;" : "default;")};
`;

export default Link;
