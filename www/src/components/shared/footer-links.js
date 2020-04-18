/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from "../localized-link"
import { t, Trans } from "@lingui/macro"

// const links = [
//   { to: `https://lambdalabs.com/about`, text: t`About` },
//   { to: `/contributing/code-of-conduct/`, text: t`Code of Conduct` },
//   { to: `/guidelines/logo/`, text: t`Logo & Assets` },
// ]

const FooterLinks = props => (
  <footer>
    <ul
      sx={{
        background: props => (props.bg ? props.bg : `0`),
        borderColor: `ui.border`,
        borderTopStyle: `solid`,
        borderTopWidth: `1px`,
        fontSize: 1,
        listStyle: `none`,
        m: 0,
        mb: props => (props.bottomMargin ? props.bottomMargin : 0),
        mt: 9,
        px: 6,
        py: 9,
        textAlign: `center`,
        width: `100%`,
        "& li": {
          display: `inline-block`,
          "&:after": {
            color: `textMuted`,
            content: `"•"`,
            padding: 3,
          },
          "&:last-of-type:after": {
            content: `none`,
          },
          "& a": {
            color: `navigation.linkDefault`,
            borderColor: `transparent`,
            "&:hover": {
              color: `navigation.linkHover`,
              borderColor: `link.hoverBorder`,
            },
          },
        },
      }}
    >
      <li>
        <a href="https://deeptalk.lambdalabs.com/">Forum</a>
      </li>
      <li>
        <a href="https://lambdalabs.com/about">About</a>
      </li>
      <li>
        <a href="https://lambdalabs.com/blog/">Blog</a>
      </li>
      <li>
        <a href="https://lambdalabs.com/legal">Term of Sale</a>
      </li>                        
      <li>
        <a href="https://lambdalabs.com/careers">Careers</a>
      </li>
      <li>
        <a href="https://lambdalabs.com/contact">Contact</a>
      </li>      
    </ul>
  </footer>
)

export default FooterLinks
