import { ViewIcon } from "@chakra-ui/icons";
import { ViewOffIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { useToast } from '@chakra-ui/react';
import axios from "axios";

import { useHistory } from 'react-router-dom';

const Login=()=>
{
    const [email,setEmail]=useState();
    const [pass,setPass]=useState();

    const [show,setShow]=useState(false);

    //toast
    const toast=useToast();

    //routing in react when we want to redirect we use history hook from react router DOM
    const history=useHistory();

    //loading
    const [loading,setLoading]=useState(false);

    const handleClick=()=>
    {
        setShow(!show);
    }

    const submitHandler=async ()=>
    {
        setLoading(true);

        if(!email || !pass)
        {
            toast({
                title: 'Please Enter all the fields!',
                status: 'info',
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });
              setLoading(false);
              return;
        }

        try
        {
            const config=
            {
                headers:
                {
                    "Content-type": "application/json"
                }
            };

            const { data }=await axios.post('/api/user/login',
            {
                email: email,
                password: pass
            },
            config);

            toast({
                title: 'Login Successful!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "top"
              });

              localStorage.setItem("userInfo",JSON.stringify(data));

              setLoading(false);
              history.push('/chats');
        }
        catch(err)
        {
            toast({
                title: 'Oops! An error occured!',
                description: err.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });

              setLoading(false);
        }
    }

    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email:</FormLabel>
                <Input 
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>
                    {
                        setEmail(e.target.value);
                    }}/>
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                    <Input
                        type={!show?"password":"text"}
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }} />
                    <InputRightElement>
                    <Button onClick={handleClick}>
                        {show?<ViewOffIcon/>:<ViewIcon/>}
                    </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button 
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 25 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button 
                colorScheme="red"
                width="100%"
                onClick={()=>
                {
                    setEmail("guestemail@chat.app");
                    setPass("anonymous");
                }}
            >
                Enter as Guest User
            </Button>
        </VStack>
    );
}

export default Login;