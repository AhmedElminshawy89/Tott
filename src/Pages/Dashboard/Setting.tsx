import {
  Tabs,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import AddAdmin from "./AddAdmin";
import AddUser from "./AddUser";
import Admins from "./Admins";
import Users from "./Users";
const Setting = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: SetStateAction<number>) => {
    setTabIndex(index);
  };
  return (
    <Tabs
      onChange={handleTabChange}
      index={tabIndex}
      position="relative"
      variant="unstyled"
      isLazy 
    >
      <TabList>
        <Tab onClick={() => setTabIndex(0)}>Add Admin</Tab>
        <Tab onClick={() => setTabIndex(1)}>Add User</Tab>
        <Tab onClick={() => setTabIndex(2)}>Admins</Tab>
        <Tab onClick={() => setTabIndex(3)}>Users</Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="#ca933f" borderRadius="1px" />
      <TabPanels>
        <TabPanel>
          <AddAdmin />
        </TabPanel>
        <TabPanel>
          <AddUser />
        </TabPanel>
        <TabPanel>
          <Admins />
        </TabPanel>
        <TabPanel>
          <Users />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Setting;
