import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Drawer,  DrawerBody,  DrawerContent,  DrawerHeader,  DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import React, {  useCallback, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserList/UserListItem";

const SideDrawer=()=>
{
    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [loading,setLoading]=useState(false);
    const [loadingChat,setLoadingChat]=useState(false);

    const { user, setSelectedChat, chats, setChats }=ChatState();
    const history=useHistory();

    const { isOpen, onOpen, onClose }=useDisclosure();

    const logOutHandler=()=>
    {
        localStorage.removeItem("userInfo");
        history.push("/");
    }

    const toast=useToast();

    const handleSearch=async ()=>
    {
        if(!search)
        {
            toast({
                title: 'Please Enter Search Input!',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "bottom"
              });
              return;
        }

        try
        {
            setLoading(true);

            const config=
            {
                headers:
                {
                    Authorization: `Bearer ${user.token}`
                }
            };

            //API Request
            const { data }=await axios.get(`/api/user?search=${search}`,config);

            setLoading(false);
            setSearchResult(data);
            
        }
        catch(err)
        {
            toast({
                title: 'Oops! An error occured!',
                description: err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
              });
        }
        finally
        {
            setLoading(false);
        }
    }

    const accessChat=async (userId)=>
    {
        try
        {
            setLoadingChat(true);

            const config=
            {
                headers:
                {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            //API Request
            const { data }=await axios.post('/api/chat',
            {
                userId
            },config);

            setLoadingChat(false);
            setSelectedChat(data);

            onClose();
        }
        catch(err)
        {
            toast({
                title: 'Error fetching the chat!',
                description: err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "bottom"
              });
        }
        finally
        {
            setLoadingChat(false);
        }
    }

    return (
    <>
        <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            bg="white"  
            p="0.5rem 0.5rem 0.5rem 0.5rem"
            m="0.5rem 0.5rem 0.5rem 0.5rem"
            borderRadius="1rem">
            <Tooltip label="Search User" hasArrow placement="bottom">
                <Button variant="ghost" borderRadius="0.5rem" onClick={onOpen}>
                    <Search2Icon/>
                    <Text display={{ base:"none" ,md:"flex" }} px="4">
                        {/* not display on smaller screens base: "none"  medium-screen: display: flex*/}
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text display={{base: "none",md:"block"}} fontSize="2xl" fontFamily="Work Sans" fontWeight="extrabold">
                SPEAKSTER
            </Text>
            <Box display="flex" justifyContent="space-between">
                <Menu>
                    <MenuButton fontSize="2xl" marginTop="-0.5rem" marginEnd="1rem">
                        <BellIcon />
                    </MenuButton>
                    <MenuList></MenuList>
                </Menu>
                <Menu>
                    <MenuButton>
                        <Box display="flex" justifyContent="space-between">
                            <Avatar
                                name={user.name}
                                src={user.imageURL}
                                boxSize="2.1rem"
                                size="2rem"
                                marginEnd="0.5rem"
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Text display={{ base: "none", md: "flex" }} marginTop="0.2rem" marginEnd="0.5rem">{user.name}</Text>
                                <ChevronDownIcon marginTop="0.5rem" />
                            </Box>
                        </Box>
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuItem onClick={logOutHandler}>LogOut</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px" fontFamily="Work Sans">
                    Search Users 
                </DrawerHeader>
                <DrawerBody>
                    <Box display="flex" paddingBottom={2}>
                        <Input 
                            placeholder="Search by name or email"
                            marginStart={-2}
                            mr={1.5}
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearch} type="submit">Go</Button>
                    </Box>
                    {loading?<ChatLoading/>:(searchResult?.map(user=>
                        (
                            <UserListItem 
                                key={user._id}
                                user={user}
                                handleFunction={accessChat(user._id)}
                            />
                        ))
                        )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
    );
}

export default SideDrawer;