import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem=({ user, handleFunction })=>
{
    return (
    <Box 
        onClick={handleFunction}
        cursor="pointer"
        bg="#E8E8E8"
        _hover=
        {
            {
                background: "#38B2AC",
                color: "white"
            }
        }
        w="100%"
        display="flex"
        alignItems="center"
        color="black"
        paddingX={3}
        paddingY={2}
        marginBottom={2}
        borderRadius="lg"
    >
        <Avatar 
            marginRight={2}
            size="sm"
            cursor="pointer"
            src={user.imageURL}
            name={user.name}
        />
        <Box>
            <Text>{user.name}</Text>
            <Text fontSize="xs" fontStyle="italic">  {user.email}</Text>
        </Box>
    </Box>);
}

export default UserListItem;