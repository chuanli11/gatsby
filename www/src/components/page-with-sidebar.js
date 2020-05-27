/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"

import { getItemList } from "../utils/sidebar/item-list"
import StickyResponsiveSidebar from "./sidebar/sticky-responsive-sidebar"

export default ({ children, enableScrollSync, location }) => {

  // CHUAN: Hacky solution to remove prefix-paths for sidebar to work
  // Otherwise itemList can not be found
  
  // Use this line for Lambda deployment
  const itemList = getItemList(location.pathname.split("/").slice(2, -1).join("/"))

  // Use this line for local test
  // const itemList = getItemList(location.pathname)

  if (!itemList) {
    return children
  }
  console.log(itemList)
  return (
    <Fragment>
      <div
        sx={{
          pl: [
            null,
            null,
            null,
            t => t.sizes.sidebarWidth.default,
            t => t.sizes.sidebarWidth.large,
          ],
        }}
      >
        {children}
      </div>
      <StickyResponsiveSidebar
        enableScrollSync={enableScrollSync}
        itemList={itemList.items}
        title={itemList.title}
        sidebarKey={itemList.key}
        disableExpandAll={itemList.disableExpandAll}
        disableAccordions={itemList.disableAccordions}
        key={location.pathname}
        location={location}
      />
    </Fragment>
  )
}
