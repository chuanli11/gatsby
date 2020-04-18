/** @jsx jsx */
import { jsx } from "theme-ui"
import { useColorMode } from "theme-ui"
import { withI18n } from "@lingui/react"
import { t, Trans } from "@lingui/macro"
import { GoMarkGithub as GithubIcon } from "react-icons/go"
import {
  FaTwitter as TwitterIcon,
  FaFacebook as FacebookIcon,
  FaHome as HomeIcon,
} from "react-icons/fa"

import Link from "./localized-link"
import SearchForm from "./search-form"
import logo from "../assets/lambda-labs-logo.png"
import logoInverted from "../assets/lambda-labs-logo.png"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"
import { breakpointGutter } from "../utils/styles"
import DarkModeToggle from "./dark-mode-toggle"

// what we need to nudge down the navItems to sit
// on the baseline of the logo's wordmark
const navItemTopOffset = `0.4rem`
// theme-ui values
const navItemHorizontalSpacing = [1, null, 2]

const overrideDefaultMdLineHeight = {
  [mediaQueries.md]: {
    lineHeight: t => t.sizes.headerHeight,
  },
}

const navItemStyles = {
  borderBottom: `2px solid transparent`,
  color: `navigation.linkDefault`,
  display: `block`,
  fontSize: 3,
  lineHeight: t => t.sizes.headerHeight,
  [mediaQueries.md]: {
    lineHeight: t => `calc(${t.sizes.headerHeight} - ${navItemTopOffset})`,
  },
  position: `relative`,
  textDecoration: `none`,
  zIndex: 1,
  "&:hover, &:focus": { color: `navigation.linkHover` },
}

const NavItem = ({ linkTo, children }) => (
  <li
    sx={{
      display: `block`,
      m: 0,
      mx: navItemHorizontalSpacing,
    }}
  >
    <Link
      to={linkTo}
      activeClassName="active"
      partiallyActive={true}
      sx={{
        ...navItemStyles,
        "&.active": {
          borderBottomColor: `lilac`,
          color: `navigation.linkActive`,
        },
      }}
    >
      {children}
    </Link>
  </li>
)

const SocialNavItem = ({ href, title, children }) => (
  <a
    href={href}
    title={title}
    sx={{
      ...navItemStyles,
      ...overrideDefaultMdLineHeight,
      color: `navigation.socialLink`,
      px: navItemHorizontalSpacing,
    }}
  >
    {children}
  </a>
)

const navItems = [
  { id: "benchmarks", text: t`Benchmarks` },
  { id: "gpus", text: t`GPUs` },
  { id: "models", text: t`Models` },
]

const Navigation = ({ pathname, i18n }) => {
  const [colorMode] = useColorMode()
  const isHomepage = pathname === `/`

  return (
    <header
      sx={{
        bg: `navigation.background`,
        height: `headerHeight`,
        left: 0,
        px: `env(safe-area-inset-left)`,
        position: `relative`,
        right: 0,
        top: t => t.sizes.bannerHeight,
        zIndex: `navigation`,
        // use this to test if the header items are properly aligned to the logo
        // wordmark
        // "&:before": {
        //   content: `''`,
        //   position: `absolute`,
        //   bottom: `1.5rem`,
        //   left: 0,
        //   right: 0,
        //   width: `100%`,
        //   height: 1,
        //   zIndex: 10,
        //   background: `red`,
        // },
        [breakpointGutter]: {
          position: isHomepage ? `absolute` : `fixed`,
        },
      }}
    >
      <div
        sx={{
          alignItems: `center`,
          display: `flex`,
          fontFamily: `heading`,
          height: `100%`,
          margin: `0 auto`,
          px: 6,
          position: `relative`,
          width: `100%`,
          "&:after": {
            bg: isHomepage ? `transparent` : `ui.border`,
            bottom: 0,
            content: `''`,
            height: 1,
            left: 0,
            position: `absolute`,
            right: 0,
            zIndex: -1,
          },
        }}
      >
        <Link
          to="/"
          sx={{
            alignItems: `center`,
            color: `inherit`,
            display: `flex`,
            flexShrink: 0,
            height: `logo`,
            mr: [1, null, 3],
            textDecoration: `none`,
            /* chop logo down to just the monogram for small screens */
            width: [`24px`, null, `auto`],
            overflow: [`hidden`, null, `visible`],
          }}
          aria-label={i18n._(t`Gatsby, Back to homepage`)}
        >
          <img
            src={colorMode === `light` ? logo : logoInverted}
            sx={{
              height: `logo`,
              width: `auto`,
              maxWidth: `none`,
              m: 0,
            }}
            alt={i18n._(t`Gatsby Logo`)}
            aria-hidden="true"
          />
        </Link>
        <nav
          className="navigation"
          aria-label={i18n._(t`Primary Navigation`)}
          sx={{
            display: `none`,
            [mediaQueries.md]: {
              alignSelf: `flex-end`,
              display: `flex`,
              flexGrow: 1,
              flexShrink: 1,
              m: 0,
              minWidth: 0,
              mr: `auto`,
            },
          }}
        >
          <ul
            sx={{
              display: `none`,
              [mediaQueries.md]: {
                alignSelf: `flex-end`,
                display: `flex`,
                listStyle: `none`,
                m: 0,
                maskImage: t =>
                  `linear-gradient(to right, transparent, white ${t.space[1]}, white 98%, transparent)`,
                overflowX: `auto`,
              },
            }}
          >
            {navItems.map(({ id, text }) => (
              <NavItem key={id} linkTo={`/${id}/`}>
                <Trans id={text} />
              </NavItem>
            ))}
          </ul>
        </nav>
        {/* <SearchForm key="SearchForm" offsetVertical={navItemTopOffset} /> */}
        <div
          sx={{
            alignSelf: `flex-end`,
            display: `flex`,
          }}
        >
          <SocialNavItem
            href="https://github.com/lambdal/"
            title="GitHub"
          >
            <GithubIcon />
          </SocialNavItem>
          <div
            sx={{
              display: `none`,
              [mediaQueries.xl]: { display: `flex` },
            }}
          >
            <SocialNavItem href="https://twitter.com/lambdaapi?lang=en" title="Twitter">
              <TwitterIcon />
            </SocialNavItem>
            <SocialNavItem href="https://www.facebook.com/lambdalabs/" title="Facebook">
              <FacebookIcon />
            </SocialNavItem>            
            <SocialNavItem href="https://lambdalabs.com" title="Homepage">
              <HomeIcon />
            </SocialNavItem>
            
          </div>
          <div
            sx={{
              ...navItemStyles,
              ...overrideDefaultMdLineHeight,
              color: `navigation.socialLink`,
              ml: navItemHorizontalSpacing,
              "&:hover": {
                color: `navigation.linkHover`,
              },
            }}
          >
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default withI18n()(Navigation)
