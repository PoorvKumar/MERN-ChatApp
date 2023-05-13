import { Box, Container, Text,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SignUp from '../components/authentication/SignUp';
import Login from '../components/authentication/Login';

import { useHistory } from "react-router-dom";

const Homepage=()=> //react functions names must start with capital letters
{
    const history=useHistory();

    useEffect(()=>
    {
        const user=JSON.parse(localStorage.getItem("userInfo"));

        if(user)
        {
            history.push('/chats');
        }
    },[history]);

    return (
        <Container maxW='xl' centerContent>
            <Box
                d="flex"
                justifyContent="center"
                textAlign="center"
                p={3}
                bg={"white"}
                w="100%"
                m="4vw 0 0.5vw 0"
                borderRadius="2xl"
                borderWidth="2px"
            >
                <Text fontSize="2xl" fontWeight="bold"  className='title'>SPEAKSTER</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="2xl" borderWidth="2px">
                <Tabs variant='soft-rounded' >
                    <TabList mb='1rem'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <SignUp/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}

export default Homepage;