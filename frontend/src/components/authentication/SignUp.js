import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useToast } from '@chakra-ui/react';

import axios from 'axios';
import { useHistory } from "react-router-dom";

const SignUp=()=>
{
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [pass,setPass]=useState();
    const [confirmPass,setConfirmPass]=useState();
    const [image,setImage]=useState();
    const [loading,setLoading]=useState(false);

    const toast=useToast(); //toast in chakra ui

    //routing in react when we want to redirect we use history hook from react router DOM
    const history=useHistory();

    const [show,setShow]=useState(false); //eye in password form

    const handleClick=()=>
    {
        setShow(!show);
    }
    
    const [show1,setShow1]=useState(false);

    const handleClick1=()=>
    {
        setShow1(!show1);
    }

    const postDetails=(images)=> //upload image to cloudinary
    {
        setLoading(true);

        if(images===undefined)
        {
            toast({
                title: 'Please Select an Image!',
                status: 'info',
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });

              return;
        }

        if(images.type==="image/jpeg" || images.type==="image/png")
        {
            const data=new FormData();
            data.append("file",images);
            data.append("upload_preset","MERN-ChatApp");
            data.append("cloud name","dnu4cv6yt");
            fetch("https://api.cloudinary.com/v1_1/dnu4cv6yt/image/upload",
            {
                method: "post",
                body: data
            })
            .then((result)=> result.json())
            .then(data=>
                {
                    setImage(data.url.toString());
                    // console.log(data.url.toString());
                    setLoading(false);
                })
            .catch(err=>
                {
                    console.log(err);
                    setLoading(false);
                })
        }
        else
        {
            toast({
                title: 'Please Select an Image!',
                status: 'info',
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });
              setLoading(false);
              return ;
        }
    }

    const submitHandler=async ()=>
    {
        setLoading(true);

        if(!name || !email || !pass || !confirmPass)
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

        if(pass!==confirmPass)
        {
            toast({
                title: 'Passwords do not match!',
                status: 'warning',
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

            const { data }=await axios.post("/api/user",
            {
                name: name,
                email: email,
                password: pass,
                imageURL: image
            },
            config);

            toast({
                title: 'Registration Successful!',
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
            <FormControl id='userName' isRequired>
                <FormLabel>Name:</FormLabel>
                <Input 
                    placeholder="Name"
                    onChange={(e)=>  //onChange(event); //handleChange(event) function
                    {
                        setName(e.target.value);
                    }}/>
            </FormControl>
            <FormControl id='userEmail' isRequired>
                <FormLabel>Email:</FormLabel>
                <Input 
                    placeholder="Email"
                    onChange={(e)=>
                    {
                        setEmail(e.target.value);
                    }}/>
            </FormControl>
            <FormControl id='pass' isRequired>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                    <Input
                        type={!show?"password":"text"}
                        placeholder="Password"
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
            <FormControl id='confirmPassword' isRequired>
                <FormLabel>Confirm Password:</FormLabel>
                <InputGroup>
                    <Input
                        type={!show1?"password":"text"}
                        placeholder="Confirm Password"
                        onChange={(e) => {
                            setConfirmPass(e.target.value);
                        }} />
                    <InputRightElement>
                    <Button onClick={handleClick1}>
                        {show1?<ViewOffIcon/>:<ViewIcon/>}
                    </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Upload your Profile Picture</FormLabel>
                <Input 
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e)=>
                    {
                        postDetails(e.target.files[0]);
                    }}
                />
            </FormControl>

            <Button 
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 25 }}
                onClick={submitHandler}
                isLoading= {loading}
            >
                SignUp
            </Button>
        </VStack>
    );
}

export default SignUp;