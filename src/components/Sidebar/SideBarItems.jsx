import CreatePost from "./CreatePost"
import FollowUsers from "./FollowUsers"
import HomeLink from "./HomeLink"
import Notification from "./Notification"
import ProfileLink from "./ProfileLink"
import Search from "./Search"


const SideBarItems = () => {
  return (
    <>
    <HomeLink/>
    <Search/>
    <Notification/>
    <CreatePost/>
    <ProfileLink/>
    <FollowUsers/>
    </>
  )
}

export default SideBarItems